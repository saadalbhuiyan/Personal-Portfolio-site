import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput';
import {
    getTestimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
} from '../../utils/api';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        comment: '',
        image: '',
    });
    const [imageFile, setImageFile] = useState(null);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const response = await getTestimonials();
            setTestimonials(response.data);
            setError(null);
        } catch {
            setError('Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0] || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.comment.trim() ||
            (!imageFile && !isEditing)
        ) {
            alert('Name, comment, and image are required.');
            return;
        }

        let dataToSend;
        if (imageFile) {
            dataToSend = new FormData();
            dataToSend.append('name', formData.name);
            dataToSend.append('comment', formData.comment);
            dataToSend.append('image', imageFile);
        } else {
            dataToSend = {
                name: formData.name,
                comment: formData.comment,
                image: formData.image,
            };
        }

        try {
            if (isEditing) {
                await updateTestimonial(formData.id, dataToSend);
                setIsEditing(false);
            } else {
                await addTestimonial(dataToSend);
            }
            setFormData({ id: null, name: '', comment: '', image: '' });
            setImageFile(null);
            fetchTestimonials();
        } catch {
            alert('Failed to save testimonial');
        }
    };

    const handleEdit = (testimonial) => {
        setFormData({
            id: testimonial._id,
            name: testimonial.name,
            comment: testimonial.comment,
            image: testimonial.image,
        });
        setImageFile(null);
        setIsEditing(true);
        setError(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await deleteTestimonial(id);
            fetchTestimonials();
        } catch {
            alert('Failed to delete testimonial');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-[var(--bg-light)] rounded-lg shadow-md">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-[var(--text-primary)] mb-8 text-center">
                Manage Testimonials
            </h1>

            <form onSubmit={handleSubmit} className="mb-10 p-6 bg-[var(--card-bg)] rounded-lg shadow">
                <h2 className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading mb-6">
                    {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>

                <FormInput
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    label="Comment"
                    type="text"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                />

                <label className="block mb-2 font-medium text-[var(--text-primary)]">
                    Image {isEditing ? '(leave empty to keep current)' : '(required)'}
                </label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-6 w-full p-2 border border-[var(--border)] rounded"
                    {...(!isEditing && { required: true })}
                />

                <button
                    type="submit"
                    className="bg-[var(--primary)] text-[var(--bg-light)] px-6 py-3 rounded-md hover:bg-[var(--secondary)] transition-colors duration-200 font-semibold"
                >
                    {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            setFormData({ id: null, name: '', comment: '', image: '' });
                            setImageFile(null);
                        }}
                        className="ml-4 px-5 py-3 border border-[var(--border)] rounded-md hover:bg-[var(--bg-light)] transition-colors duration-200"
                    >
                        Cancel
                    </button>
                )}

                {error && (
                    <p className="text-red-600 mt-4 text-center">{error}</p>
                )}
            </form>

            {loading ? (
                <p className="text-center text-[var(--text-secondary)]">Loading testimonials...</p>
            ) : testimonials.length === 0 ? (
                <p className="text-center text-[var(--text-secondary)]">No testimonials found.</p>
            ) : (
                <table className="w-full border-collapse border border-[var(--border)] rounded">
                    <thead>
                    <tr className="bg-[var(--bg-light)]">
                        <th className="border border-[var(--border)] p-3 text-left text-h3-mobile md:text-h3-desktop font-semibold text-[var(--text-primary)]">
                            Name
                        </th>
                        <th className="border border-[var(--border)] p-3 text-left text-h3-mobile md:text-h3-desktop font-semibold text-[var(--text-primary)]">
                            Image
                        </th>
                        <th className="border border-[var(--border)] p-3 text-left text-h3-mobile md:text-h3-desktop font-semibold text-[var(--text-primary)]">
                            Comment
                        </th>
                        <th className="border border-[var(--border)] p-3 text-left text-h3-mobile md:text-h3-desktop font-semibold text-[var(--text-primary)]">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {testimonials.map(testimonial => (
                        <tr key={testimonial._id} className="border-t border-[var(--border)]">
                            <td className="border border-[var(--border)] p-3 text-[var(--text-primary)]">{testimonial.name}</td>
                            <td className="border border-[var(--border)] p-3">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/projects/${testimonial.image}`}
                                    alt={testimonial.name}
                                    className="w-24 h-16 object-cover rounded"
                                    loading="lazy"
                                />
                            </td>
                            <td className="border border-[var(--border)] p-3 text-[var(--text-primary)]">{testimonial.comment}</td>
                            <td className="border border-[var(--border)] p-3 space-x-4">
                                <button
                                    onClick={() => handleEdit(testimonial)}
                                    className="text-[var(--primary)] hover:underline focus:outline-none"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(testimonial._id)}
                                    className="text-[var(--error)] hover:underline focus:outline-none"
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

export default ManageTestimonials;
