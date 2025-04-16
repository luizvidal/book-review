'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Review } from '@/types/review';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface ReviewCardProps {
  review: Review;
  onDelete: (id: string) => void;
}

export function ReviewCard({ review, onDelete }: ReviewCardProps) {
  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1 text-lg">{review.book.title}</CardTitle>
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
      <CardContent className="py-3">
        <p className="text-sm">{review.content}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {formatDate(review.createdAt)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-3 border-t bg-muted/50">
        <Link href={`/books/${review.book.id}`}>
          <Button variant="outline" size="sm">
            View Book
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(review.id)}
        >
          Delete Review
        </Button>
      </CardFooter>
    </Card>
  );
}
