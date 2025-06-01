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
        fetchTestimonial();
    }, [id]);

    if (!testimonial && !error) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Testimonial Details</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {testimonial && (
                <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                    <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-center mb-2">{testimonial.name}</h2>
                    <p className="text-gray-700 text-center">{testimonial.review}</p>
                </div>
            )}
        </div>
    );
};

export default TestimonialDetail;