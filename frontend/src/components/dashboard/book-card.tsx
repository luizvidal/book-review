'use client';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from '@/types/book';
import { Book as BookIcon } from 'lucide-react';
import Link from 'next/link';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="h-full flex flex-col border shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
        <div className="w-16 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <BookIcon className="h-8 w-8 text-secondary-foreground" />
            </div>
          )}
        </div>
        <div className="space-y-1 flex-grow">
          <CardTitle className="line-clamp-1 text-lg">{book.title}</CardTitle>
          <CardDescription className="line-clamp-1">
            by {book.author}
          </CardDescription>
          <CardDescription className="line-clamp-2 text-xs">
            {book.description || 'No description'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="mt-auto p-4 pt-0">
        <Link href={`/books/${book.id}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
