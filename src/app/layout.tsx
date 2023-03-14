import { ThemeProvider } from '~/components/theme-provider';
import { Inter as FontSans } from 'next/font/google';
import React from 'react';
import { Toaster } from '~/components/ui/toaster';
import { cn } from '~/lib/utils';
import '~/styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-black font-sans text-slate-50 antialiased', fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="h-screen">{children}</div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
