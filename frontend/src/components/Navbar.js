import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    // State to track mobile menu open/close
    const [isOpen, setIsOpen] = useState(false);

    // React Router hook to get current location for active link highlighting
    const location = useLocation();

    // Navigation links with path and label
    const links = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Me' },
        { path: '/projects', label: 'Projects' },
        { path: '/blogs', label: 'Blogs' },
        { path: '/services', label: 'Services' },
        { path: '/testimonials', label: 'Testimonials' },
        { path: '/contact', label: 'Contact' },
        { path: '/admin', label: 'Admin' },
    ];

    return (
        <nav
            // Navbar container styling:
            // - Dark background (black or charcoal)
            // - Light text (white)
            // - Padding and sticky top with shadow for separation
            className="bg-[var(--bg-dark)] text-[var(--bg-light)] p-4 sticky top-0 z-50 shadow-md"
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                {/* Logo container */}
                <div className="h-12 flex items-center">
                    <img
                        src="/assets/logo.png"
                        alt="Logo"
                        className="h-full"
                        style={{ margin: '0 48px' }} // Horizontal margin around logo
                    />
                </div>

                {/* Mobile menu toggle button (hamburger icon) */}
                <button
                    className="sm:hidden w-11 h-11 flex items-center justify-center
                     focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        {/* Hamburger or close icon path depending on isOpen */}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                                isOpen
                                    ? 'M6 18L18 6M6 6l12 12' // X icon (close)
                                    : 'M4 6h16M4 12h16M4 18h16' // Hamburger icon (menu)
                            }
                        />
                    </svg>
                </button>

                {/* Navigation links container */}
                <div
                    className={`
            sm:flex flex-col sm:flex-row gap-6
            absolute sm:static top-16 left-0 w-full sm:w-auto
            bg-[var(--bg-dark)] sm:bg-transparent p-4 sm:p-0
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-200%] opacity-0'}
            sm:opacity-100 sm:translate-y-0
          `}
                    // When mobile menu is closed, hide links by moving them off-screen and setting opacity to 0
                    // On larger screens (sm and up), show links normally and static positioning
                >
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            // Base styles for links:
                            // - Font size & weight
                            // - Hover color accent
                            // - Transition for color changes
                            // Active link highlighted with accent color and underline
                            className={`text-base font-medium hover:text-[var(--accent)] transition-colors duration-200 ${
                                location.pathname === link.path ? 'text-[var(--accent)] underline' : ''
                            }`}
                            onClick={() => setIsOpen(false)} // Close mobile menu when link is clicked
                            aria-current={location.pathname === link.path ? 'page' : undefined} // Accessibility for current page
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
