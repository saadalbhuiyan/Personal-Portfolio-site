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

        const fetchBlog = async () => {
            try {
                const response = await getBlogById(id);
                setBlog(response.data);
            } catch (err) {
                setError('Failed to load blog details');
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog && !error) {
        return (
            <div className="p-4 md:p-6 text-center text-[var(--text-primary)] text-body-mobile md:text-body-desktop">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6">
                Blog Details
            </h1>
            {error && (
                <p className="text-error text-body-mobile md:text-body-desktop text-center mb-6">{error}</p>
            )}
            {blog && (
                <div className="bg-[var(--card-bg)] shadow-card rounded-lg p-5">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/projects/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                        loading="lazy"
                    />
                    <h2 className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading text-[var(--text-primary)] mb-2">
                        {blog.title}
                    </h2>
                    <p className="text-body-mobile md:text-body-desktop text-[var(--text-primary)] leading-relaxed">
                        {blog.content}
                    </p>
                </div>
            )}
        </div>
    );
};

export default BlogDetail;
