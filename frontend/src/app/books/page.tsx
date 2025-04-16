'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { booksApi } from '@/lib/api';
import { Book, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BookWithRating {
  id: string;
  title: string;
  author: string;
  cover?: string;
  genre: string;
  averageRating?: number;
  reviewCount?: number;
}

export default function BooksPage() {
  const { toast } = useToast();
  const [books, setBooks] = useState<BookWithRating[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setIsLoading(true);
        // Use getAll instead of getAllWithRatings since the endpoint might not exist
        const data = await booksApi.getAll();
        console.log('API response:', data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          setBooks(data);
        } else if (data && typeof data === 'object') {
          // If it's an object with books property
          if (Array.isArray(data.books)) {
            setBooks(data.books);
          } else {
            // Convert object to array if needed
            const booksArray = Object.values(data).filter(item =>
              item && typeof item === 'object' && 'id' in item
            );
            setBooks(booksArray as BookWithRating[]);
          }
        } else {
          // Fallback to empty array
          console.error('Unexpected data format:', data);
          setBooks([]);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        toast({
          title: 'Error',
          description: 'Failed to load books',
          variant: 'destructive',
        });
        // Set empty array on error
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, [toast]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Books</h1>
        <Link href="/books/new">
          <Button>Add Book</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <p>Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No books found</CardTitle>
            <CardDescription>
              There are no books in the database yet.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/books/new">
              <Button>Add the first book</Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <div className="aspect-[2/3] relative bg-muted">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Book className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1 text-lg">{book.title}</CardTitle>
                <CardDescription className="line-clamp-1">
                  by {book.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{book.genre}</span>
                <div className="flex items-center">
                  <Star className={`h-4 w-4 mr-1 ${book.averageRating && book.averageRating > 0 ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                  <span className="text-sm">
                    {book.averageRating && book.averageRating > 0
                      ? `${book.averageRating.toFixed(1)}/5 (${book.reviewCount || 0})`
                      : 'No ratings'}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/books/${book.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
