"use client";

import { PandaIcon } from '@/components/icons/panda-icon';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#faq', label: 'FAQs' },
    { href: '/blog', label: 'Blogs' },
    { href: '/contact', label: 'Contact Us' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b relative">
        <div className="max-w-7xl mx-auto">
            <nav className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <PandaIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    <h1 className="text-lg sm:text-xl font-bold text-foreground">ShrinkWrap</h1>
                </Link>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4 md:gap-6 text-sm font-medium">
                    {navLinks.map(({href, label}) => (
                         <Link key={label} href={href} className="text-muted-foreground hover:text-foreground transition-colors">
                            {label}
                       </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 absolute top-full left-0 w-full bg-background border-b z-50">
                    <div className="flex flex-col items-center gap-4 py-4">
                        {navLinks.map(({href, label}) => (
                            <Link key={label} href={href} onClick={closeMenu} className="text-lg text-muted-foreground hover:text-foreground transition-colors">
                                {label}
                           </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </header>
  );
};

export default Navbar;
