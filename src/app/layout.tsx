import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://shrinkwrap.app'),
  title: {
    default: 'ShrinkWrap - Free Online PNG & JPG Compressor Tool',
    template: '%s | ShrinkWrap',
  },
  description: 'ShrinkWrap is a free online PNG and JPG compressor tool. Reduce image file size without losing quality. Fast, secure, and easy-to-use image optimization for web and mobile.',
  keywords: ['ShrinkWrap', 'PNG compressor', 'JPG compressor', 'image compressor online', 'reduce image size', 'compress png free', 'compress jpg free', 'online image optimizer', 'photo size reducer', 'webp converter', 'shrink images', 'optimize images for web'],
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
