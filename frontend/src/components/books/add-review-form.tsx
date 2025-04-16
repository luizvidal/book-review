'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema } from '@/lib/validations';
import { reviewsApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

interface AddReviewFormProps {
  bookId: string;
  onSuccess: (review: any) => void;
  onCancel: () => void;
}

export default function AddReviewForm({ bookId, onSuccess, onCancel }: AddReviewFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      bookId,
      rating: 0,
      content: '',
    },
  });

  async function onSubmit(values: any) {
    try {
      setIsLoading(true);
      const newReview = await reviewsApi.create({
        bookId: values.bookId,
        rating: values.rating,
        content: values.content,
      });
      onSuccess(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      toast({
        title: 'Error',
        description: 'Failed to create review',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleRatingClick = (value: number) => {
    setRating(value);
    form.setValue('rating', value);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleRatingClick(value)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              value <= rating
                                ? 'text-primary fill-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your review here..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" type="button" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
