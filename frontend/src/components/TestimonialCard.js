import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestimonialCard = ({ testimonial }) => {
    const navigate = useNavigate();
    return (
        <div
            className="w-full md:w-1/3 p-4 shadow-md rounded-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(`/testimonials/${testimonial.id}`)}
        >
            <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold p-2 text-center">{testimonial.name}</h3>
            <p className="text-gray-600 p-2 text-center">{testimonial.review}</p>
        </div>
    );
};

export default TestimonialCard;