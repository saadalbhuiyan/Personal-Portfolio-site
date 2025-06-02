import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../utils/api';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('No blog ID provided.');
            return;
        }

        // Fetch blog details by ID
        const fetchBlog = async () => {
            try {
                const response = await getBlogById(id);
                setBlog(response.data);
                setError(null);
            } catch {
                setError('Failed to load blog details');
            }
        };

        fetchBlog();
    }, [id]);

    // Show loading while fetching data
    if (!blog && !error) {
        return (
            <div className="p-4 md:p-6 text-center text-[var(--text-primary)] text-body-mobile md:text-body-desktop" role="status" aria-live="polite">
                Loading...
            </div>
        );
    }

    return (
        <main className="p-4 md:p-6 max-w-[1200px] mx-auto" role="main" aria-label="Blog Detail">
            {/* Page title */}
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6">
                Blog Details
            </h1>

            {/* Error message */}
            {error && (
                <p className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mb-6" role="alert" aria-live="assertive">
                    {error}
                </p>
            )}

            {/* Blog content */}
            {blog && (
                <article className="bg-[var(--card-bg)] shadow-card rounded-lg p-5">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/projects/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                        loading="lazy"
                    />
                    <h2 className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading text-[var(--text-primary)] mb-2">
                        {blog.title}
                    </h2>
                    <p className="text-body-mobile md:text-body-desktop text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                        {blog.content}
                    </p>
                </article>
            )}
        </main>
    );
};

export default BlogDetail;
