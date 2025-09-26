import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastHost from '../components/ToastHost';
import ServiceWorkerRegister from '../components/ServiceWorkerRegister';
import { LightboxProvider } from '../components/Lightbox';
import PerfBudgetClient from '../components/PerfBudgetClient';

export const metadata: Metadata = {
  title: {
    default: 'Om Oberoi | Portfolio',
    template: '%s | Om Oberoi'
  },
  description: 'Electronics & Communication Engineer | Web Developer | Innovator',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Om Oberoi | Portfolio',
    description: 'Electronics & Communication Engineer | Web Developer | Innovator',
    url: '/',
    siteName: 'Om Oberoi Portfolio',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Oberoi | Portfolio',
    description: 'Electronics & Communication Engineer | Web Developer | Innovator'
  },
  icons: { icon: '/favicon.ico' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-bg-root)] text-[var(--color-text-primary)] antialiased">
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem themes={['light','dark','dim','contrast']}> 
          <LightboxProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
            <ToastHost />
            <ServiceWorkerRegister />
            <PerfBudgetClient />
          </LightboxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
