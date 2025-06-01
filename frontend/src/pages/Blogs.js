import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../utils/api';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs();
                setBlogs(response.data);
            } catch (err) {
                setError('Failed to load blogs');
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">My Blogs</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;