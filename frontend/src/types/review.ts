import { Book } from './book';

export interface Review {
  id: string;
  rating: number;
  content: string;
  book: Book;
  createdAt: string;
}
