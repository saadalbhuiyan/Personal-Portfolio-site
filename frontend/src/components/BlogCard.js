import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    return (
        <div
            className="w-full md:w-1/3 p-4 shadow-md rounded-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(`/blogs/${blog.id}`)}
        >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-xl font-semibold p-2 text-center">{blog.title}</h3>
        </div>
    );
};

export default BlogCard;