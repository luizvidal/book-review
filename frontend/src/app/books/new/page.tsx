'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { booksApi } from '@/lib/api';
import { BookFormValues, bookSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const genres = [
  'Fiction',
  'Non-fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Horror',
  'Biography',
  'History',
  'Self-help',
  'Business',
  'Children',
  'Young Adult',
  'Poetry',
  'Other',
];

export default function NewBookPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      cover: '',
      genre: '',
    },
  });

  async function onSubmit(values: BookFormValues) {
    try {
      setIsLoading(true);
      const newBook = await booksApi.create(values);
      toast({
        title: 'Success',
        description: 'Book created successfully',
      });
      router.push(`/books/${newBook.id}`);
    } catch (error) {
      console.error('Error creating book:', error);
      toast({
        title: 'Error',
        description: 'Failed to create book',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto">
        <Card>
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
          <CardDescription>
            Enter the details of the book you want to add
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter book title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter cover image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2 pt-4">
                <Link href="/books">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Book'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </ProtectedRoute>
  );
}
