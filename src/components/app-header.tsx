
import Link from 'next/link';
import { Droplets, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border/40 bg-background/80 px-4 md:px-6 backdrop-blur-sm">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className='flex items-center gap-2'>
              <Droplets className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Glycemia Tracker</span>
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost">
              <Link href="/dashboard">
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
              </Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
