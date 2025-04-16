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
import { cn } from '@/lib/utils';
import { BookOpen, LogOut, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Abstract navigation links into an array
const navLinks = [
  { href: '/books', label: 'Books', icon: BookOpen },
  { href: '/dashboard', label: 'Dashboard', icon: User, requiresAuth: true },
];

// Abstract user dropdown menu items into an array
type MenuItemWithHref = { href: string; label: string; icon: React.ElementType; action?: never };
type MenuItemWithAction = { action: string; label: string; icon: React.ElementType; href?: never };
type MenuItem = MenuItemWithHref | MenuItemWithAction;

const userMenuItems: MenuItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: User },
  { action: 'logout', label: 'Log out', icon: LogOut },
];

// Abstract auth buttons into an array
const authButtons = [
  { href: '/login', label: 'Login', variant: 'ghost' as const },
  { href: '/register', label: 'Sign Up', variant: 'default' as const },
];

// Reusable components
type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
};

function NavLink({ href, label, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        className
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle logout with redirection
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Filter navigation links based on authentication status
  const filteredNavLinks = navLinks.filter(
    (link) => !link.requiresAuth || (link.requiresAuth && isAuthenticated)
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Book Review</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Navigation Links */}
          {filteredNavLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}

          {/* Authentication Section */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {/* User Info */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Menu Items */}
                {userMenuItems.map((item) => {
                  if ('action' in item && item.action === 'logout') {
                    return (
                      <DropdownMenuItem key={item.label} onClick={handleLogout}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  } else if ('href' in item) {
                    const linkItem = item as MenuItemWithHref;
                    return (
                      <DropdownMenuItem key={linkItem.label} asChild>
                        <Link href={linkItem.href}>
                          <linkItem.icon className="mr-2 h-4 w-4" />
                          <span>{linkItem.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  }
                  return null;
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              {authButtons.map((button) => (
                <Link key={button.href} href={button.href}>
                  <Button variant={button.variant}>{button.label}</Button>
                </Link>
              ))}
            </div>
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col space-y-4">
            {/* Navigation Links */}
            {filteredNavLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                {authButtons.map((button) => (
                  <Link key={button.href} href={button.href}>
                    <Button
                      variant={button.variant}
                      className="w-full"
                    >
                      {button.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
