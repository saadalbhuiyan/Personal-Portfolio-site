import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestimonialCard = ({ testimonial }) => {
    const navigate = useNavigate();

    // যদি testimonial.image http/https দিয়ে শুরু হয়, তাহলে সেটাকে সরাসরি ইউজ করো,
    // নাহলে REACT_APP_API_URL দিয়ে ফুল URL তৈরি করো
    const imageUrl = testimonial.image.startsWith('http')
        ? testimonial.image
        : `${process.env.REACT_APP_API_URL}/uploads/projects/${testimonial.image}`;

    return (
        <div
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer w-full border-l-4 border-[var(--accent)]"
            onClick={() => navigate(`/testimonials/${testimonial._id}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate(`/testimonials/${testimonial._id}`)}
            aria-label={`View testimonial by ${testimonial.name}`}
        >
            <img
                src={imageUrl}
                alt={testimonial.name}
                className="w-[120px] h-[120px] rounded-full mx-auto mb-4 border-2 border-[var(--primary)]"
                loading="lazy"
            />
            <h3 className="text-center text-[var(--text-primary)] font-bold text-xl">{testimonial.name}</h3>
            <p className="text-[var(--text-primary)] italic text-center mt-2">{testimonial.comment}</p>
        </div>
    );
};

export default TestimonialCard;
