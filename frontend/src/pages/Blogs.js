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
                setError(null);
            } catch (err) {
                setError('Failed to load blogs');
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6">
                My Blogs
            </h1>
            {error && (
                <p className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mb-6">
                    {error}
                </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id || blog._id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
