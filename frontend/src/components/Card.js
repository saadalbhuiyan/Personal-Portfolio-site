import React from 'react';

const Card = ({ image, title, onClick }) => {
    return (
        <div
            /*
             * Card container styles:
             * - Background from CSS variable (--bg-light)
             * - Padding for spacing
             * - Rounded corners for smooth edges
             * - Shadow for subtle depth, with stronger shadow and scale on hover for interactivity
             * - Cursor pointer to indicate clickability
             * - Full width inside container
             * - Smooth transition for transform effects
             * - Responsive max-width and centered horizontally (for better layout control on large screens)
             */
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-md
                 hover:shadow-lg hover:scale-105 transition-transform duration-200
                 cursor-pointer w-full max-w-sm mx-auto
                 sm:max-w-md md:max-w-lg"

            // Accessibility: role button for screen readers and keyboard navigation
            role="button"
            tabIndex={0}

            // Click handler on card
            onClick={onClick}

            // Keyboard interaction: Enter key triggers onClick
            onKeyPress={(e) => e.key === 'Enter' && onClick()}

            // ARIA label for screen readers
            aria-label={`View ${title}`}
        >
            <img
                src={image}
                alt={title}
                /*
                 * Image styles:
                 * - Full width to fill container horizontally
                 * - Fixed height with responsive variants for larger screens
                 * - Object cover to maintain aspect ratio and fill area
                 * - Rounded corners matching container
                 * - Margin bottom to separate from title
                 */
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4"
                loading="lazy"  // Lazy load for performance
            />
            <h3
                /*
                 * Title styles:
                 * - Center aligned text
                 * - Primary text color from CSS variable
                 * - Bold font weight
                 * - Responsive font sizes for readability across devices
                 */
                className="text-center text-[var(--text-primary)] font-bold text-lg sm:text-xl md:text-2xl"
            >
                {title}
            </h3>
        </div>
    );
};

export default Card;
