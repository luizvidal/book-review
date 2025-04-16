'use client';

import AddReviewForm from '@/components/books/add-review-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { booksApi, reviewsApi } from '@/lib/api';
import { Book, Edit, Star, Trash } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BookDetails {
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
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const bookId = params.id as string;

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        setIsLoading(true);
        const bookData = await booksApi.getById(bookId);
        console.log('Book details API response:', bookData);

        // Handle book data
        if (bookData && typeof bookData === 'object' && 'id' in bookData) {
          setBook(bookData as BookDetails);
        } else {
          console.error('Unexpected book data format:', bookData);
          toast({
            title: 'Error',
            description: 'Failed to load book details',
            variant: 'destructive',
          });
          router.push('/books');
          return;
        }

        // Fetch reviews for this book
        const reviewsData = await reviewsApi.getAll();
        console.log('Reviews API response:', reviewsData);

        // Handle reviews data
        let bookReviews: Review[] = [];

        if (Array.isArray(reviewsData)) {
          bookReviews = reviewsData.filter(review =>
            review && typeof review === 'object' &&
            review.book && typeof review.book === 'object' &&
            'id' in review.book && review.book.id === bookId
          );
        } else if (reviewsData && typeof reviewsData === 'object') {
          // If it's an object with reviews property
          if (Array.isArray(reviewsData.reviews)) {
            bookReviews = reviewsData.reviews.filter(review =>
              review && typeof review === 'object' &&
              review.book && typeof review.book === 'object' &&
              'id' in review.book && review.book.id === bookId
            );
          } else {
            // Convert object to array if needed
            const reviewsArray = Object.values(reviewsData).filter(item =>
              item && typeof item === 'object' && 'id' in item
            );
            bookReviews = reviewsArray.filter(review =>
              review && typeof review === 'object' &&
              review.book && typeof review.book === 'object' &&
              'id' in review.book && review.book.id === bookId
            ) as Review[];
          }
        }

        setReviews(bookReviews);

        // Check if the current user has already reviewed this book
        if (isAuthenticated && user) {
          const hasReviewed = bookReviews.some(review =>
            review.user && typeof review.user === 'object' &&
            'id' in review.user && review.user.id === user.id
          );
          setUserHasReviewed(hasReviewed);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        toast({
          title: 'Error',
          description: 'Failed to load book details',
          variant: 'destructive',
        });
        router.push('/books');
      } finally {
        setIsLoading(false);
      }
    }

    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId, router, toast, isAuthenticated, user]);

  const handleDeleteBook = async () => {
    if (!book) return;

    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      try {
        await booksApi.delete(book.id);
        toast({
          title: 'Success',
          description: 'Book deleted successfully',
        });
        router.push('/books');
      } catch (error) {
        console.error('Error deleting book:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete book',
          variant: 'destructive',
        });
      }
    }
  };

  const handleAddReview = (newReview: any) => {
    setReviews([...reviews, newReview]);
    setUserHasReviewed(true);
    setShowAddReview(false);
    toast({
      title: 'Success',
      description: 'Review added successfully',
    });
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await reviewsApi.delete(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
      setUserHasReviewed(false);
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
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center py-8">
        <p>Book not found</p>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <div className="aspect-[2/3] relative bg-muted">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Book className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>by {book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Genre:</span>
                  <span className="text-sm">{book.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex items-center">
                    <Star className={`h-4 w-4 mr-1 ${averageRating > 0 ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm">
                      {averageRating > 0
                        ? `${averageRating.toFixed(1)}/5 (${reviews.length})`
                        : 'No ratings'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="flex space-x-2 w-full">
                <Link href="/books" className="flex-1">
                  <Button variant="outline" className="w-full">Back to Books</Button>
                </Link>
                {isAuthenticated && (
                  <Link href={`/books/${book.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                )}
              </div>
              {isAuthenticated && (
                <Button variant="destructive" className="w-full" onClick={handleDeleteBook}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Book
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reviews</CardTitle>
              {isAuthenticated && !userHasReviewed && !showAddReview && (
                <Button onClick={() => setShowAddReview(true)}>Add Review</Button>
              )}
            </CardHeader>
            <CardContent>
              {showAddReview && (
                <div className="mb-6">
                  <AddReviewForm bookId={book.id} onSuccess={handleAddReview} onCancel={() => setShowAddReview(false)} />
                </div>
              )}

              {reviews.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{review.user.name}</CardTitle>
                          <div className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded">
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            <span>{review.rating}/5</span>
                          </div>
                        </div>
                        <CardDescription>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p>{review.content}</p>
                      </CardContent>
                      {isAuthenticated && user?.id === review.user.id && (
                        <CardFooter className="pt-2 flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            Delete Review
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
