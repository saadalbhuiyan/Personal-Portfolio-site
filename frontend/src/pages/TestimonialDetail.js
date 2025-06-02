import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTestimonialById } from '../utils/api';

const TestimonialDetail = () => {
    const { id } = useParams();
    const [testimonial, setTestimonial] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonial = async () => {
            try {
                const response = await getTestimonialById(id);
                setTestimonial(response.data);
            } catch (err) {
                setError('Failed to load testimonial details');
            }
        };
        if (id) {
            fetchTestimonial();
        }
    }, [id]);

    if (!testimonial && !error)
        return (
            <div className="p-4 md:p-6 text-center text-[var(--text-primary)] text-body-mobile md:text-body-desktop">
                Loading...
            </div>
        );

    return (
        <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6">
                Testimonial Details
            </h1>
            {error && (
                <p className="text-error text-body-mobile md:text-body-desktop text-center mb-6">
                    {error}
                </p>
            )}
            {testimonial && (
                <div className="bg-[var(--card-bg)] shadow-card rounded-lg p-5 border-l-4 border-[var(--accent)]">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-[120px] h-[120px] rounded-full mx-auto mb-4"
                        loading="lazy"
                    />
                    <h2 className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading text-[var(--text-primary)] text-center mb-2">
                        {testimonial.name}
                    </h2>
                    <p className="text-body-mobile md:text-body-desktop text-[var(--text-primary)] line-height-body italic text-center">
                        "{testimonial.review}"
                    </p>
                </div>
            )}
        </div>
    );
};

export default TestimonialDetail;
