import React from 'react';

const Footer = () => {
    return (
        <footer
            className="bg-[var(--primary)] text-[var(--bg-light)] p-6 text-center"
            role="contentinfo"
        >
            <p className="text-sm select-none">
                &copy; 2025 Personal Portfolio. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
