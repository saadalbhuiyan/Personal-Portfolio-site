import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestimonialCard = ({ testimonial }) => {
    const navigate = useNavigate();

    // Use direct image URL if starts with http(s), else prepend backend API URL
    const imageUrl = testimonial.image.startsWith('http')
        ? testimonial.image
        : `${process.env.REACT_APP_API_URL}/uploads/projects/${testimonial.image}`;

    return (
        <div
            /*
             * Card container styling:
             * - Light background
             * - Padding and rounded corners
             * - Shadow with hover effects for depth and scaling
             * - Cursor pointer for interactivity
             * - Full width, with left accent border for emphasis
             * - Accessible with role and keyboard handling
             */
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-md
                 hover:shadow-lg hover:scale-105 transition-transform duration-200
                 cursor-pointer w-full border-l-4 border-[var(--accent)] max-w-sm mx-auto
                 sm:max-w-md md:max-w-lg"
            onClick={() => navigate(`/testimonials/${testimonial._id}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate(`/testimonials/${testimonial._id}`)}
            aria-label={`View testimonial by ${testimonial.name}`}
        >
            <img
                src={imageUrl}
                alt={testimonial.name}
                // Circular image centered horizontally with fixed size, margin bottom and border
                className="w-[120px] h-[120px] rounded-full mx-auto mb-4 border-2 border-[var(--primary)]"
                loading="lazy"
            />
            <h3
                // Testimonial giver's name: centered, primary text color, bold, larger font
                className="text-center text-[var(--text-primary)] font-bold text-lg sm:text-xl md:text-2xl"
            >
                {testimonial.name}
            </h3>
            <p
                // Comment text: italic style, primary color, centered with margin top
                className="text-[var(--text-primary)] italic text-center mt-2 text-sm sm:text-base"
            >
                {testimonial.comment}
            </p>
        </div>
    );
};

export default TestimonialCard;
