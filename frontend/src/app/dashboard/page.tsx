'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { BookCard } from '@/components/dashboard/book-card';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { EmptyState } from '@/components/dashboard/empty-state';
import { LoadingState } from '@/components/dashboard/loading-state';
import { ReviewCard } from '@/components/dashboard/review-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { Book, Plus, Star } from 'lucide-react';

export default function DashboardPage() {
  const { books, reviews, isLoading, handleDeleteReview } = useDashboardData();

  return (
    <ProtectedRoute>
      <div>
        <DashboardHeader
          title="Dashboard"
          actionLink="/books/new"
          actionText="Add Book"
        />

        <Tabs defaultValue="books" className="mt-6 space-y-4">
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
              <LoadingState type="books" count={6} />
            ) : books.length === 0 ? (
              <EmptyState
                title="No books found"
                description="You haven't added any books yet."
                actionLink="/books/new"
                actionText="Add Book"
                icon={Plus}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {isLoading ? (
              <LoadingState type="reviews" count={3} />
            ) : reviews.length === 0 ? (
              <EmptyState
                title="No reviews found"
                description="You haven't written any reviews yet."
                actionLink="/books"
                actionText="Browse Books"
                icon={Book}
              />
            ) : (
              <div className="grid gap-4">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onDelete={handleDeleteReview}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
