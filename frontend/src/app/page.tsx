'use client';

import { Button } from '@/components/ui/button';
import { Book, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
      <div className="max-w-3xl space-y-6">
        <div className="flex justify-center mb-6">
          <div className="bg-primary text-primary-foreground p-4 rounded-full">
            <Book className="h-12 w-12" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Discover and Review Your Favorite Books
        </h1>

        <p className="text-xl text-muted-foreground">
          Join our community of book lovers to discover new reads, share your thoughts, and connect with fellow readers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/books">
            <Button size="lg" className="w-full sm:w-auto">
              <Book className="mr-2 h-5 w-5" />
              Browse Books
            </Button>
          </Link>

          <Link href="/register">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Star className="mr-2 h-5 w-5" />
              Join Now
            </Button>
          </Link>
        </div>

        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Discover</h3>
            <p className="text-muted-foreground">Find your next favorite book from our growing collection.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">Review</h3>
            <p className="text-muted-foreground">Share your thoughts and rate books you've read.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">Connect</h3>
            <p className="text-muted-foreground">See what others are reading and their recommendations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
