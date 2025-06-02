import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput';
import {
    getServices,
    addService,
    updateService,
    deleteService,
} from '../../utils/api';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        id: null,
        title: '',
        description: '',
        image: '',
    });
    const [imageFile, setImageFile] = useState(null);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await getServices();
            setServices(response.data);
            setError(null);
        } catch {
            setError('Failed to load services');
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
            !formData.title.trim() ||
            !formData.description.trim() ||
            (!imageFile && !isEditing)
        ) {
            alert('Title, description, and image are required.');
            return;
        }

        let dataToSend;
        if (imageFile) {
            dataToSend = new FormData();
            dataToSend.append('title', formData.title);
            dataToSend.append('description', formData.description);
            dataToSend.append('image', imageFile);
        } else {
            dataToSend = {
                title: formData.title,
                description: formData.description,
                image: formData.image,
            };
        }

        try {
            if (isEditing) {
                await updateService(formData.id, dataToSend);
                setIsEditing(false);
            } else {
                await addService(dataToSend);
            }
            setFormData({ id: null, title: '', description: '', image: '' });
            setImageFile(null);
            fetchServices();
        } catch {
            alert('Failed to save service');
        }
    };

    const handleEdit = (service) => {
        setFormData({
            id: service._id,
            title: service.title,
            description: service.description,
            image: service.image,
        });
        setImageFile(null);
        setIsEditing(true);
        setError(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await deleteService(id);
            fetchServices();
        } catch {
            alert('Failed to delete service');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-[var(--bg-light)] rounded-lg shadow-md">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-[var(--text-primary)] mb-8 text-center">
                Manage Services
            </h1>

            <form onSubmit={handleSubmit} className="mb-10 p-6 bg-[var(--card-bg)] rounded-lg shadow">
                <h2 className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading mb-6">
                    {isEditing ? 'Edit Service' : 'Add New Service'}
                </h2>

                <FormInput
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    label="Description"
                    type="text"
                    name="description"
                    value={formData.description}
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
                    {isEditing ? 'Update Service' : 'Add Service'}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            setFormData({ id: null, title: '', description: '', image: '' });
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
                <p className="text-center text-[var(--text-secondary)]">Loading services...</p>
            ) : services.length === 0 ? (
                <p className="text-center text-[var(--text-secondary)]">No services found.</p>
            ) : (
                <table className="w-full border-collapse border border-[var(--border)] rounded">
                    <thead>
                    <tr className="bg-[var(--bg-light)]">
                        <th className="border border-[var(--border)] p-3 text-left text-h3-mobile md:text-h3-desktop font-semibold text-[var(--text-primary)]">
                            Title
                        </th>
                        <th className="border border-[var(--border)] p-3 text-left text-h3-mobile md:text-h3-desktop font-semibold text-[var(--text-primary)]">
                            Image
                        </th>
                        <th className="border border-[var(--border)] p-3 text-left text-h3-mobile md:text-h3-desktop font-semibold text-[var(--text-primary)]">
                            Description
                        </th>
                        <th className="border border-[var(--border)] p-3 text-left text-h3-mobile md:text-h3-desktop font-semibold text-[var(--text-primary)]">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {services.map(service => (
                        <tr key={service._id} className="border-t border-[var(--border)]">
                            <td className="border border-[var(--border)] p-3 text-[var(--text-primary)]">{service.title}</td>
                            <td className="border border-[var(--border)] p-3">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/projects/${service.image}`}
                                    alt={service.title}
                                    className="w-24 h-16 object-cover rounded"
                                    loading="lazy"
                                />
                            </td>
                            <td className="border border-[var(--border)] p-3 text-[var(--text-primary)]">{service.description}</td>
                            <td className="border border-[var(--border)] p-3 space-x-4">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="text-[var(--primary)] hover:underline focus:outline-none"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
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

export default ManageServices;
