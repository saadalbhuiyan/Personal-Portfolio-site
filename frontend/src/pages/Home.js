import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    // Navigation cards data
    const cards = [
        {
            to: "/about",
            title: "About Me",
            description: "Learn about my background and skills.",
        },
        {
            to: "/projects",
            title: "Projects",
            description: "Check out my recent projects.",
        },
        {
            to: "/blogs",
            title: "Blogs",
            description: "Read my latest blog posts.",
        },
        {
            to: "/services",
            title: "Services",
            description: "Explore services I offer.",
        },
        {
            to: "/testimonials",
            title: "Testimonials",
            description: "See what others say about me.",
        },
        {
            to: "/contact",
            title: "Contact",
            description: "Get in touch with me.",
        },
    ];

    return (
        <main
            className="p-4 md:p-6 max-w-[1200px] mx-auto"
            role="main"
            aria-label="Homepage"
        >
            {/* Main heading */}
            <h1
                className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6"
            >
                Welcome to My Portfolio
            </h1>

            {/* Intro paragraph */}
            <p
                className="text-body-mobile md:text-body-desktop text-[var(--text-secondary)] leading-relaxed text-center mb-6"
            >
                Explore my work, skills, and experiences below!
            </p>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {cards.map(({ to, title, description }) => (
                    <Link
                        key={to}
                        to={to}
                        role="listitem"
                        className="bg-[var(--bg-light)] shadow-card rounded-lg p-5
                       hover:scale-105 transition-transform duration-200 ease-in-out"
                        aria-label={`Navigate to ${title} page`}
                    >
                        <h2
                            className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading text-[var(--text-primary)] text-center"
                        >
                            {title}
                        </h2>
                        <p
                            className="text-body-mobile md:text-body-desktop text-[var(--text-secondary)] leading-relaxed text-center"
                        >
                            {description}
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default Home;
