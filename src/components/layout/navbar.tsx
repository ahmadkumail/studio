import { PandaIcon } from '@/components/icons/panda-icon';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b">
        <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <PandaIcon className="w-10 h-10 text-primary" />
                <h1 className="text-xl font-bold text-foreground">ShrinkWrap</h1>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
               </Link>
               <Link href="/#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQs
               </Link>
               <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blogs
               </Link>
               <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
               </Link>
            </div>
        </nav>
    </header>
  );
};

export default Navbar;
