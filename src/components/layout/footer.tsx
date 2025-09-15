import Link from 'next/link';
import React from 'react';
import { PandaIcon } from '../icons/panda-icon';

const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="space-y-4 md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2">
                <PandaIcon className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold text-foreground">ShrinkWrap</h1>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered file compression for everyone. Fast, secure, and easy to use.
            </p>
          </div>
          <div className="md:col-start-2">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">About Us</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Privacy Policy</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Blogs</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  All Posts
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-primary/10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShrinkWrap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
