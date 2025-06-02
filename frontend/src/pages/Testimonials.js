import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import { getTestimonials } from '../utils/api';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await getTestimonials();
                setTestimonials(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load testimonials');
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6">
                Testimonials
            </h1>
            {error && (
                <p className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mb-6">
                    {error}
                </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
