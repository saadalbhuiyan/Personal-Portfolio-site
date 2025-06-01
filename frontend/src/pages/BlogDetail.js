import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../utils/api';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
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

    if (!blog && !error) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Blog Details</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {blog && (
                <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                    <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-700">{blog.content}</p>
                </div>
            )}
        </div>
    );
};

export default BlogDetail;