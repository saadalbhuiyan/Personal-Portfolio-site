import React from 'react';

const Footer = () => {
    return (
        <footer
            // Footer container with:
            // - Background color as primary (black in your scheme)
            // - Text color as light (white)
            // - Padding for spacing
            // - Centered text alignment
            // - Semantic role for accessibility
            className="bg-[var(--primary)] text-[var(--bg-light)] p-6 text-center"
            role="contentinfo"
        >
            <p
                // Small text size for footer note
                // select-none to prevent text selection (optional UX choice)
                className="text-sm select-none"
            >
                &copy; 2025 Personal Portfolio. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
