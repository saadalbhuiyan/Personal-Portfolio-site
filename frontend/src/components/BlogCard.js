import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Use either blog.id or blog._id depending on data source
    const blogId = blog.id || blog._id;

    return (
        <div
            // Card container styling with background, padding, rounded corners, and shadows
            // Hover effect for scaling and shadow to provide interactivity feedback
            // Cursor pointer for clickable UI
            // Width full to take container width
            // Responsive max-width for larger screens
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-md
                 hover:shadow-lg hover:scale-105 transition-transform duration-200
                 cursor-pointer w-full max-w-sm mx-auto
                 sm:max-w-md md:max-w-lg"

            // Navigate to blog detail page on click if blogId exists
            onClick={() => blogId && navigate(`/blogs/${blogId}`)}

            // Accessibility roles & keyboard navigation
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && blogId && navigate(`/blogs/${blogId}`)}
            aria-label={`View blog titled ${blog.title}`}
        >
            <img
                // Blog image from backend URL
                src={`${process.env.REACT_APP_API_URL}/uploads/projects/${blog.image}`}
                alt={blog.title}
                // Image styling to cover container area with rounded corners and margin bottom
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4"
                loading="lazy"
            />
            <h3
                // Centered title with primary text color, bold, and responsive font size
                className="text-center text-[var(--text-primary)] font-bold text-lg sm:text-xl md:text-2xl"
            >
                {blog.title}
            </h3>
        </div>
    );
};

export default BlogCard;
