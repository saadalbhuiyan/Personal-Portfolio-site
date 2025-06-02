import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div
            // Card container styling:
            // - Light background color from CSS variable
            // - Padding and rounded corners for spacing and shape
            // - Custom shadow with rgba for subtle depth
            // - Hover shadow and scale effect for interactivity feedback
            // - Smooth transition on transform with 200ms duration
            // - Cursor pointer to indicate clickable area
            // - Full width inside container
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-[0_4px_14px_rgba(18,78,102,0.15)]
                 hover:shadow-[0_6px_20px_rgba(18,78,102,0.2)] hover:scale-105
                 transition-transform duration-200 cursor-pointer w-full max-w-sm mx-auto
                 sm:max-w-md md:max-w-lg"

            // Navigate to project details on click
            onClick={() => navigate(`/projects/${project._id}`)}

            // Accessibility roles and keyboard navigation support
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate(`/projects/${project._id}`)}
            aria-label={`View project titled ${project.title}`}
        >
            <img
                // Show full URL if image already starts with http, otherwise construct URL from environment variable
                src={
                    project.image.startsWith('http')
                        ? project.image
                        : `${process.env.REACT_APP_API_URL}/uploads/projects/${project.image}`
                }
                alt={project.title}
                // Image styling with full width, fixed height, object cover for aspect ratio, rounded corners, and margin below
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4"
                loading="lazy" // Lazy load for performance
            />
            <h3
                // Title styling:
                // - Center aligned text
                // - Primary text color from CSS variable
                // - Bold font weight
                // - Responsive font sizes
                className="text-center text-[var(--text-primary)] font-bold text-lg sm:text-xl md:text-2xl"
            >
                {project.title}
            </h3>
        </div>
    );
};

export default ProjectCard;
