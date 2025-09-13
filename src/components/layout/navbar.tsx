import { PandaIcon } from '@/components/icons/panda-icon';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b">
        <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <PandaIcon className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold text-foreground">ShrinkWrap</h1>
            </Link>
            <div className="flex items-center gap-4">
               {/* Add nav links here if needed in the future */}
            </div>
        </nav>
    </header>
  );
};

export default Navbar;
