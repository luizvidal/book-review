'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Book, BookOpen, ChevronRight, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Abstract data into objects and arrays
const heroContent = {
  title: 'Discover and Review Your Favorite Books',
  subtitle: 'Join our community of book lovers to discover new reads, share your thoughts, and connect with fellow readers.',
};

const actionButtons = [
  {
    href: '/books',
    label: 'Browse Books',
    icon: Book,
    variant: 'default' as const,
  },
  {
    href: '/register',
    label: 'Join Now',
    icon: Star,
    variant: 'outline' as const,
  },
];

const features = [
  {
    title: 'Discover',
    description: 'Find your next favorite book from our growing collection.',
    icon: BookOpen,
  },
  {
    title: 'Review',
    description: 'Share your thoughts and rate books you\'ve read.',
    icon: Star,
  },
  {
    title: 'Connect',
    description: 'See what others are reading and their recommendations.',
    icon: Users,
  },
];

// Reusable components
function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 animate-scale-in h-full">
      <CardContent className="p-6 space-y-4">
        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold">{feature.title}</h3>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  );
}

function ActionButton({ button }: { button: typeof actionButtons[0] }) {
  const Icon = button.icon;

  return (
    <Link href={button.href}>
      <Button
        size="lg"
        variant={button.variant}
        className={cn(
          "w-full sm:w-auto group transition-all duration-300",
          button.variant === 'default' ? 'hover:bg-primary/90' : 'hover:bg-accent'
        )}
      >
        <Icon className="mr-2 h-5 w-5" />
        {button.label}
        <ChevronRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </Button>
    </Link>
  );
}

// Scroll to top button component
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${isVisible ? 'opacity-100' : 'opacity-0'} fixed bottom-8 right-8 bg-primary text-primary-foreground p-3 rounded-full shadow-lg transition-opacity duration-300 z-50 hover:bg-primary/90`}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}

export default function Home() {
  return (
    <>
      {/* Scroll to top button */}
      <ScrollToTopButton />

      {/* Hero section with gradient background */}
      <section className="w-full bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="flex justify-center mb-8">
              <div className="bg-primary text-primary-foreground p-5 rounded-full shadow-lg animate-scale-in">
                <Book className="h-12 w-12" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-up">
              {heroContent.title}
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up delay-100">
              {heroContent.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-up delay-200">
              {actionButtons.map((button, index) => (
                <ActionButton key={index} button={button} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">Why Book Review?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`animate-fade-up delay-${index * 100}`}>
                <FeatureCard feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="w-full bg-primary/5 py-16 mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold animate-fade-up">Ready to start your reading journey?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-100">
              Join thousands of readers who are discovering new books and sharing their thoughts every day.
            </p>
            <div className="pt-4 animate-fade-up delay-200">
              <Link href="/register">
                <Button size="lg" className="px-8 group transition-all duration-300 hover:bg-primary/90">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
