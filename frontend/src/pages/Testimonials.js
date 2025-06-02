import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import { getTestimonials } from '../utils/api';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch testimonials on component mount
        const fetchTestimonials = async () => {
            try {
                const response = await getTestimonials();
                setTestimonials(response.data);
                setError(null);
            } catch {
                setError('Failed to load testimonials');
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <main
            className="p-4 md:p-6 max-w-[1200px] mx-auto"
            role="main"
            aria-label="Testimonials list"
        >
            {/* Page title */}
            <h1
                className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6"
            >
                Testimonials
            </h1>

            {/* Error message */}
            {error && (
                <p
                    className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mb-6"
                    role="alert"
                    aria-live="assertive"
                >
                    {error}
                </p>
            )}

            {/* Testimonials grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                ))}
            </div>
        </main>
    );
};

export default Testimonials;
