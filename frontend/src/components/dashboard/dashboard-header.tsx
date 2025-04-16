'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
  title: string;
  actionLink?: string;
  actionText?: string;
}

export function DashboardHeader({ title, actionLink, actionText }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {actionLink && actionText && (
        <div className="flex items-center gap-2">
          <Link href={actionLink}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {actionText}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
