'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth-context';
import { LogOut, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Book Review</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/books" className="text-sm font-medium transition-colors hover:text-primary">
            Books
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                Login
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col space-y-4">
            <Link href="/books" className="text-sm font-medium transition-colors hover:text-primary">
              Books
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                  Dashboard
                </Link>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
