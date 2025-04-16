'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  type: 'books' | 'reviews';
  count?: number;
}

export function LoadingState({ type, count = 3 }: LoadingStateProps) {
  if (type === 'books') {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(count).fill(0).map((_, index) => (
          <Card key={index} className="border shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
              <Skeleton className="w-16 h-24 flex-shrink-0" />
              <div className="space-y-2 flex-grow">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {Array(count).fill(0).map((_, index) => (
        <Card key={index} className="border shadow-sm overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-12" />
            </div>
          </CardHeader>
          <CardContent className="py-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-20 mt-2" />
          </CardContent>
          <CardFooter className="flex justify-between pt-3 border-t bg-muted/50">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
