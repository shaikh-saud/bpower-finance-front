
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import CTAButton from './CTAButton';
import { Menu, X } from 'lucide-react';

const NavBar = () => {

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [scrolled]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ",
                "bg-white shadow-md py-3", "py-5 "
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <span className={cn(
                        "font-bold text-2xl transition-colors duration-300",
                        "text-bpower-blue"
                    )}>
                        B-Power
                    </span>
                    <span className="ml-1 bg-bpower-gold text-bpower-blue px-2 py-0.5 text-xs font-bold rounded">
                        Industries
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        to="/"
                        className={cn(
                            "font-medium hover:text-bpower-green transition-colors",
                            "text-gray-700"
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        to="#"
                        className={cn(
                            "font-medium hover:text-bpower-green transition-colors",
                            "text-gray-700"
                        )}
                    >
                        Products
                    </Link>
                    <Link
                        to="/admin"
                        className={cn(
                            "font-medium hover:text-bpower-green transition-colors",
                            "text-gray-700"
                        )}
                    >
                        Admin
                    </Link>
                    <Link
                        to="/marketplace"
                        className={cn(
                            "font-medium hover:text-bpower-green transition-colors",
                            "text-gray-700"
                        )}
                    >
                        Marketplace
                    </Link>
                    <Link
                        to="/blog"
                        className={cn(
                            "font-medium hover:text-bpower-green transition-colors",
                            "text-gray-700"
                        )}
                    >
                        Blog
                    </Link>
                    {/* <CTAButton text="Join Now" size="sm" /> */}
                    <Button asChild className="bg-bpower-blue hover:bg-bpower-green text-white px-7  rounded-full transition-all ease-in-out duration-500">
                        <Link to="/signup">Signup</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={cn(
                        "md:hidden p-2 rounded-full",
                        "text-bpower-blue"
                    )}
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4">
                    <div className="flex flex-col space-y-4">
                        <Link
                            to="/"
                            className="font-medium text-gray-700 hover:text-bpower-green transition-colors p-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/"
                            className="font-medium text-gray-700 hover:text-bpower-green transition-colors p-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            to="/admin"
                            className="font-medium text-gray-700 hover:text-bpower-green transition-colors p-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Admin
                        </Link>
                        <Link
                            to="/marketplace"
                            className="font-medium text-gray-700 hover:text-bpower-green transition-colors p-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Marketplace
                        </Link>
                        <Link
                            to="/blog"
                            className="font-medium text-gray-700 hover:text-bpower-green transition-colors p-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        {/* <CTAButton text="Join Now" size="sm" className="w-full" /> */}
                        <Button asChild className="bg-bpower-blue hover:bg-bpower-green text-white px-7  rounded-full transition-all ease-in-out duration-500 w-full">
                            <Link to="/signup">Signup</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>)
}

export default NavBar