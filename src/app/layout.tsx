
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Glycemia Tracker',
  description: 'Track your blood glucose levels and get AI-powered suggestions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            defaultTheme="light"
            storageKey="glycemia-tracker-theme"
        >
            <div 
              className="fixed inset-0 -z-10 h-full w-full bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-20" 
              style={{backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-6ab18a5d7814?q=80&w=1974&auto=format&fit=crop')"}} 
              data-ai-hint="medical research"
            ></div>
            <div className="relative flex min-h-screen w-full flex-col bg-transparent">
              <AppHeader />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
