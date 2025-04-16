import { z } from 'zod';

// Auth validations
export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Book validations
export const bookSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  author: z.string().min(1, { message: 'Author is required' }),
  cover: z.string().url({ message: 'Please enter a valid URL for the cover image' }).optional().or(z.literal('')),
  genre: z.string().min(1, { message: 'Genre is required' }),
});

// Review validations
export const reviewSchema = z.object({
  bookId: z.string().min(1, { message: 'Book is required' }),
  rating: z.number().min(1, { message: 'Rating must be at least 1' }).max(5, { message: 'Rating must be at most 5' }),
  content: z.string().min(1, { message: 'Review content is required' }).max(1000, { message: 'Review content must be at most 1000 characters' }),
});

// Types
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type BookFormValues = z.infer<typeof bookSchema>;
export type ReviewFormValues = z.infer<typeof reviewSchema>;
