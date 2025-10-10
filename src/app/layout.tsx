
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://shrinkwrap.app'),
  title: {
    default: 'ShrinkWrap | Free Online PNG & JPG Image Compressor',
    template: '%s | ShrinkWrap',
  },
  description: 'ShrinkWrap is a free, AI-powered online image compressor for PNG & JPG files. Reduce image sizes by up to 80% without losing quality. Our tool is fast, secure, and processes all files directly in your browser—no signup required.',
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EK72MNN2R9"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EK72MNN2R9');
        `}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5530405178327113"
     crossOrigin="anonymous"></script>
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
