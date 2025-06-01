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
            } catch (err) {
                setError('Failed to load testimonials');
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Testimonials</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;