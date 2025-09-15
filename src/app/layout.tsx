import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://shrinkwrap.app'),
  title: {
    default: 'ShrinkWrap | AI-Powered PNG & JPG Image Compression',
    template: '%s | ShrinkWrap',
  },
  description: 'Compress PNG & JPG files with our AI-powered tool for the best quality and compression. Reduce image file sizes online for free, quickly, and securely.',
  keywords: ['Image Compression', 'PNG Compressor', 'JPG Compressor', 'File Shrinker', 'Optimize Images', 'Reduce File Size', 'AI Compression'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <div className="flex flex-col h-full">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
