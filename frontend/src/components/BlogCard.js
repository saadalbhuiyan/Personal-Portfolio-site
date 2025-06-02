import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const blogId = blog.id || blog._id;

    return (
        <div
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer w-full"
            onClick={() => blogId && navigate(`/blogs/${blogId}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && blogId && navigate(`/blogs/${blogId}`)}
            aria-label={`View blog titled ${blog.title}`}
        >
            <img
                src={`${process.env.REACT_APP_API_URL}/uploads/projects/${blog.image}`}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                loading="lazy"
            />
            <h3 className="text-center text-[var(--text-primary)] font-bold text-xl">{blog.title}</h3>
        </div>
    );
};

export default BlogCard;
