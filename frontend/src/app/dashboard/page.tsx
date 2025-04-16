'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { booksApi, reviewsApi } from '@/lib/api';
import { Book, Plus, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
}

interface Review {
  id: string;
  rating: number;
  content: string;
  book: Book;
  createdAt: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [booksData, reviewsData] = await Promise.all([
          booksApi.getAll(),
          reviewsApi.getMyReviews(),
        ]);

        console.log('Books API response:', booksData);
        console.log('Reviews API response:', reviewsData);

        // Handle books data
        if (Array.isArray(booksData)) {
          setBooks(booksData);
        } else if (booksData && typeof booksData === 'object') {
          // If it's an object with books property
          if (Array.isArray(booksData.books)) {
            setBooks(booksData.books);
          } else {
            // Convert object to array if needed
            const booksArray = Object.values(booksData).filter(item =>
              item && typeof item === 'object' && 'id' in item
            );
            setBooks(booksArray as Book[]);
          }
        } else {
          // Fallback to empty array
          console.error('Unexpected books data format:', booksData);
          setBooks([]);
        }

        // Handle reviews data
        if (Array.isArray(reviewsData)) {
          setReviews(reviewsData);
        } else if (reviewsData && typeof reviewsData === 'object') {
          // If it's an object with reviews property
          if (Array.isArray(reviewsData.reviews)) {
            setReviews(reviewsData.reviews);
          } else {
            // Convert object to array if needed
            const reviewsArray = Object.values(reviewsData).filter(item =>
              item && typeof item === 'object' && 'id' in item
            );
            setReviews(reviewsArray as Review[]);
          }
        } else {
          // Fallback to empty array
          console.error('Unexpected reviews data format:', reviewsData);
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
        // Set empty arrays on error
        setBooks([]);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [toast]);

  async function handleDeleteReview(id: string) {
    try {
      await reviewsApi.delete(id);
      setReviews(reviews.filter(review => review.id !== id));
      toast({
        title: 'Success',
        description: 'Review deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete review',
        variant: 'destructive',
      });
    }
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link href="/books/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Book
              </Button>
            </Link>
          </div>
        </div>

      <Tabs defaultValue="books" className="space-y-4">
        <TabsList>
          <TabsTrigger value="books">
            <Book className="mr-2 h-4 w-4" />
            My Books
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <Star className="mr-2 h-4 w-4" />
            My Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading books...</p>
            </div>
          ) : books.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No books found</CardTitle>
                <CardDescription>
                  You haven&apos;t added any books yet.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/books/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Book
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <Card key={book.id}>
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="w-16 h-24 bg-muted rounded overflow-hidden">
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary">
                          <Book className="h-8 w-8 text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        by {book.author}
                      </CardDescription>
                      <CardDescription className="line-clamp-1">
                        {book.genre}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Link href={`/books/${book.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No reviews found</CardTitle>
                <CardDescription>
                  You haven&apos;t written any reviews yet.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/books">
                  <Button>
                    <Book className="mr-2 h-4 w-4" />
                    Browse Books
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid gap-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="line-clamp-1">{review.book.title}</CardTitle>
                        <CardDescription className="line-clamp-1">
                          by {review.book.author}
                        </CardDescription>
                      </div>
                      <div className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <span>{review.rating}/5</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{review.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={`/books/${review.book.id}`}>
                      <Button variant="outline" size="sm">
                        View Book
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      Delete Review
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
    </ProtectedRoute>
  );
}
