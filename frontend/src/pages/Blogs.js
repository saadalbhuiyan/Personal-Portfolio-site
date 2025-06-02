import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../utils/api';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all blogs on component mount
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs();
                setBlogs(response.data);
                setError(null);
            } catch {
                setError('Failed to load blogs');
            }
        };

        fetchBlogs();
    }, []);

    return (
        <main
            className="p-4 md:p-6 max-w-[1200px] mx-auto"
            role="main"
            aria-label="Blogs List"
        >
            {/* Page title */}
            <h1
                className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6"
            >
                My Blogs
            </h1>

            {/* Error message */}
            {error && (
                <p
                    className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mb-6"
                    role="alert"
                    aria-live="assertive"
                >
                    {error}
                </p>
            )}

            {/* Blog cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id || blog._id} blog={blog} />
                ))}
            </div>
        </main>
    );
};

export default Blogs;
