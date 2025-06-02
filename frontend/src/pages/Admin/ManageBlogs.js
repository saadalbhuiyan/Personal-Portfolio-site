import React, { useState, useEffect } from 'react';
import { getBlogs, addBlog, updateBlog, deleteBlog } from '../../utils/api';

const ManageBlogs = () => {
    // State to hold blogs data, loading & error status
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form data state: id (for editing), title, content
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        content: '',
    });
    // Image file for new or updated blog
    const [imageFile, setImageFile] = useState(null);

    // Track whether form is in edit mode
    const [isEditing, setIsEditing] = useState(false);

    // Fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Fetch all blogs from API
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await getBlogs();
            setBlogs(response.data);
            setError(null);
        } catch {
            setError('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    // Update form data fields on input change
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle image file selection
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0] || null);
    };

    // Submit form: add or update blog
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields; image is required only for new blogs
        if (
            !formData.title.trim() ||
            !formData.content.trim() ||
            (!imageFile && !isEditing)
        ) {
            alert('Title, content and image are required.');
            return;
        }

        // Prepare form data to send multipart/form-data
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            if (isEditing) {
                await updateBlog(formData.id, data);
                setIsEditing(false);
            } else {
                await addBlog(data);
            }
            // Reset form after submission
            setFormData({ id: null, title: '', content: '' });
            setImageFile(null);
            // Refresh blog list
            fetchBlogs();
        } catch {
            alert('Failed to save blog');
        }
    };

    // Populate form for editing selected blog
    const handleEdit = (blog) => {
        setFormData({
            id: blog._id,
            title: blog.title,
            content: blog.content,
        });
        setImageFile(null);
        setIsEditing(true);
    };

    // Delete selected blog with confirmation
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            await deleteBlog(id);
            fetchBlogs();
        } catch {
            alert('Failed to delete blog');
        }
    };

    return (
        <div
            className="max-w-4xl mx-auto p-6 bg-[var(--bg-light)] rounded-lg shadow-md"
            role="main"
            aria-label="Manage Blogs"
        >
            {/* Page heading */}
            <h1
                className="text-[var(--text-primary)] text-3xl md:text-4xl font-bold mb-8 text-center"
            >
                Manage Blogs
            </h1>

            {/* Blog form for add/update */}
            <form
                onSubmit={handleSubmit}
                className="mb-10 p-6 bg-[var(--card-bg)] rounded-lg shadow"
                noValidate
            >
                <h2 className="text-xl text-[var(--text-primary)] font-semibold mb-6">
                    {isEditing ? 'Edit Blog' : 'Add New Blog'}
                </h2>

                {/* Title input */}
                <label
                    htmlFor="title"
                    className="block mb-2 font-medium text-[var(--text-primary)]"
                >
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 mb-5 border border-[var(--border)] rounded
                     focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    required
                    aria-required="true"
                />

                {/* Content textarea */}
                <label
                    htmlFor="content"
                    className="block mb-2 font-medium text-[var(--text-primary)]"
                >
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-2 mb-5 border border-[var(--border)] rounded
                     focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    required
                    aria-required="true"
                />

                {/* Image file input */}
                <label
                    htmlFor="image"
                    className="block mb-2 font-medium text-[var(--text-primary)]"
                >
                    Image {isEditing ? '(leave empty to keep current)' : '(required)'}
                </label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-6"
                    {...(!isEditing && { required: true })}
                    aria-required={!isEditing}
                />

                {/* Submit and Cancel buttons */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="bg-[var(--primary)] text-[var(--bg-light)] px-6 py-2 rounded
                       hover:bg-[var(--secondary)] transition-colors duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    >
                        {isEditing ? 'Update Blog' : 'Add Blog'}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setFormData({ id: null, title: '', content: '' });
                                setImageFile(null);
                            }}
                            className="px-5 py-2 border rounded hover:bg-[var(--bg-light)]
                         focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Blog list */}
            {loading ? (
                <p className="text-center text-[var(--text-secondary)]">Loading blogs...</p>
            ) : error ? (
                <p className="text-center text-[var(--error)]">{error}</p>
            ) : blogs.length === 0 ? (
                <p className="text-center text-[var(--text-secondary)]">No blogs found.</p>
            ) : (
                <table
                    className="w-full border border-[var(--border)] rounded border-collapse"
                    role="table"
                    aria-label="List of blogs"
                >
                    <thead>
                    <tr className="bg-[var(--bg-light)] text-[var(--text-primary)] font-semibold">
                        <th className="border border-[var(--border)] p-3 text-left">Title</th>
                        <th className="border border-[var(--border)] p-3 text-left">Image</th>
                        <th className="border border-[var(--border)] p-3 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blogs.map((blog) => (
                        <tr
                            key={blog._id}
                            className="border-t border-[var(--border)]"
                        >
                            <td className="border border-[var(--border)] p-3">{blog.title}</td>
                            <td className="border border-[var(--border)] p-3">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/projects/${blog.image}`}
                                    alt={blog.title}
                                    className="w-24 h-16 object-cover rounded"
                                />
                            </td>
                            <td className="border border-[var(--border)] p-3 space-x-3">
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="text-[var(--primary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    aria-label={`Edit blog titled ${blog.title}`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="text-[var(--error)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    aria-label={`Delete blog titled ${blog.title}`}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageBlogs;
