import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput';
import {
    getServices,
    addService,
    updateService,
    deleteService,
} from '../../utils/api';

const ManageServices = () => {
    // State to store list of services, loading and error states
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form data for service add/edit
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        description: '',
        image: '',
    });

    // State to hold image file if selected
    const [imageFile, setImageFile] = useState(null);

    // Flag to indicate if editing mode is active
    const [isEditing, setIsEditing] = useState(false);

    // Fetch services on component mount
    useEffect(() => {
        fetchServices();
    }, []);

    // Function to fetch service data from API
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

    // Update form field values on input change
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Update imageFile state on file selection
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0] || null);
    };

    // Handle form submission to add or update a service
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields (image required only if adding new service)
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
            // Prepare form data for file upload
            dataToSend = new FormData();
            dataToSend.append('title', formData.title);
            dataToSend.append('description', formData.description);
            dataToSend.append('image', imageFile);
        } else {
            // Editing without changing image
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
            // Reset form and image state after submission
            setFormData({ id: null, title: '', description: '', image: '' });
            setImageFile(null);
            fetchServices();
        } catch {
            alert('Failed to save service');
        }
    };

    // Populate form for editing a selected service
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

    // Delete service with confirmation prompt
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
        <div
            className="max-w-4xl mx-auto p-6 bg-[var(--bg-light)] rounded-lg shadow-md"
            role="main"
            aria-label="Manage Services"
        >
            {/* Page heading */}
            <h1
                className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-[var(--text-primary)] mb-8 text-center"
            >
                Manage Services
            </h1>

            {/* Form for adding/editing a service */}
            <form
                onSubmit={handleSubmit}
                className="mb-10 p-6 bg-[var(--card-bg)] rounded-lg shadow"
                noValidate
            >
                <h2
                    className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading mb-6"
                >
                    {isEditing ? 'Edit Service' : 'Add New Service'}
                </h2>

                {/* Title input */}
                <FormInput
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                {/* Description input */}
                <FormInput
                    label="Description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                {/* Image upload input */}
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
                    className="mb-6 w-full p-2 border border-[var(--border)] rounded"
                    {...(!isEditing && { required: true })}
                    aria-required={!isEditing}
                />

                {/* Submit and cancel buttons */}
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

                {/* Display error message */}
                {error && (
                    <p className="text-red-600 mt-4 text-center" role="alert" aria-live="assertive">
                        {error}
                    </p>
                )}
            </form>

            {/* Loading indicator, empty state, or services table */}
            {loading ? (
                <p className="text-center text-[var(--text-secondary)]">Loading services...</p>
            ) : services.length === 0 ? (
                <p className="text-center text-[var(--text-secondary)]">No services found.</p>
            ) : (
                <table
                    className="w-full border-collapse border border-[var(--border)] rounded"
                    role="table"
                    aria-label="List of services"
                >
                    <thead>
                    <tr className="bg-[var(--bg-light)]">
                        {['Title', 'Image', 'Description', 'Actions'].map((header) => (
                            <th
                                key={header}
                                className="border border-[var(--border)] p-3 text-left text-h3-mobile md:text-h3-desktop font-semibold text-[var(--text-primary)]"
                                scope="col"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {services.map(service => (
                        <tr
                            key={service._id}
                            className="border-t border-[var(--border)]"
                        >
                            <td className="border border-[var(--border)] p-3 text-[var(--text-primary)]">
                                {service.title}
                            </td>
                            <td className="border border-[var(--border)] p-3">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/projects/${service.image}`}
                                    alt={service.title}
                                    className="w-24 h-16 object-cover rounded"
                                    loading="lazy"
                                />
                            </td>
                            <td className="border border-[var(--border)] p-3 text-[var(--text-primary)]">
                                {service.description}
                            </td>
                            <td className="border border-[var(--border)] p-3 space-x-4">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="text-[var(--primary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    aria-label={`Edit service titled ${service.title}`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className="text-[var(--error)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    aria-label={`Delete service titled ${service.title}`}
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
