'use client';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLink: string;
  actionText: string;
  icon: LucideIcon;
}

export function EmptyState({ title, description, actionLink, actionText, icon: Icon }: EmptyStateProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-3 border-t bg-muted/50">
        <Link href={actionLink}>
          <Button>
            <Icon className="mr-2 h-4 w-4" />
            {actionText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
