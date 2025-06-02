import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();

    return (
        <div
            /*
             * Card container styling:
             * - Light background from CSS variable
             * - Padding and rounded corners
             * - Custom subtle shadow with rgba
             * - On hover: stronger shadow + slight scale-up for interaction feedback
             * - Smooth transform transition (duration 200ms, corrected from 220)
             * - Cursor pointer to indicate clickability
             * - Full width inside container with responsive max widths and horizontal centering
             */
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-[0_4px_14px_rgba(18,78,102,0.15)]
                 hover:shadow-[0_6px_20px_rgba(18,78,102,0.2)] hover:scale-105
                 transition-transform duration-200 cursor-pointer w-full max-w-sm mx-auto
                 sm:max-w-md md:max-w-lg"

            // Navigate to service detail page on click
            onClick={() => navigate(`/services/${service._id}`)}

            // Accessibility for keyboard and screen readers
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate(`/services/${service._id}`)}
            aria-label={`View service titled ${service.title}`}
        >
            <img
                // Image source: full URL if starts with http, else constructed from env variable
                src={
                    service.image.startsWith('http')
                        ? service.image
                        : `${process.env.REACT_APP_API_URL}/uploads/projects/${service.image}`
                }
                alt={service.title}
                // Image styling for consistent size and shape
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4"
                loading="lazy" // Lazy loading for performance
            />
            <h3
                // Title styling: centered, primary color, bold, responsive size
                className="text-center text-[var(--text-primary)] font-bold text-lg sm:text-xl md:text-2xl"
            >
                {service.title}
            </h3>
            <p
                // Description styling: centered, secondary text color, margin top for spacing
                className="text-center text-[var(--text-secondary)] mt-2"
            >
                {service.description}
            </p>
        </div>
    );
};

export default ServiceCard;
