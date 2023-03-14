import localFont from 'next/font/local';
import { ThemeProvider } from '~/components/theme-provider';
import { Inter as FontSans } from 'next/font/google';
import React from 'react';
import { Toaster } from '~/components/ui/toaster';
import { cn } from '~/lib/utils';
import '~/styles/globals.css';

const objektSans = localFont({
  src: [{ weight: '400', path: '../../public/PPObjectSans-Regular.woff2', style: 'normal' }],
});

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
        <body
          className={cn(
            'min-h-screen bg-black font-sans text-slate-50 antialiased',
            fontSans.variable,
            objektSans.className,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="h-screen">{children}</div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
