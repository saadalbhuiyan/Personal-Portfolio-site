import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput';
import { getProjects, addProject, updateProject, deleteProject } from '../../utils/api';

const ManageProjects = () => {
    // States to hold projects list, loading status, error messages
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form data state for project input fields
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        description: '',
        image: '',
    });
    // State for selected image file (when adding or editing)
    const [imageFile, setImageFile] = useState(null);

    // Flag to check if currently editing an existing project
    const [isEditing, setIsEditing] = useState(false);

    // Fetch projects when component mounts
    useEffect(() => {
        fetchProjects();
    }, []);

    // Function to fetch projects from API and handle loading/error states
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await getProjects();
            setProjects(response.data);
            setError(null);
        } catch {
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes for controlled form inputs
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle image file input changes
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0] || null);
    };

    // Handle form submission for adding or updating a project
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields, image required only when adding
        if (!formData.title.trim() || !formData.description.trim() || (!imageFile && !isEditing)) {
            alert('Title, description, and image are required.');
            return;
        }

        let dataToSend;
        if (imageFile) {
            // Use FormData to upload file along with other fields
            dataToSend = new FormData();
            dataToSend.append('title', formData.title);
            dataToSend.append('description', formData.description);
            dataToSend.append('image', imageFile);
        } else {
            // Editing without changing image — send JSON data
            dataToSend = {
                title: formData.title,
                description: formData.description,
                image: formData.image,
            };
        }

        try {
            if (isEditing) {
                await updateProject(formData.id, dataToSend);
                setIsEditing(false);
            } else {
                await addProject(dataToSend);
            }
            // Reset form after submission
            setFormData({ id: null, title: '', description: '', image: '' });
            setImageFile(null);
            fetchProjects();
        } catch {
            alert('Failed to save project');
        }
    };

    // Populate form for editing selected project
    const handleEdit = (project) => {
        setFormData({
            id: project._id,
            title: project.title,
            description: project.description,
            image: project.image,
        });
        setImageFile(null);
        setIsEditing(true);
        setError(null);
    };

    // Delete project after user confirmation
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await deleteProject(id);
            fetchProjects();
        } catch {
            alert('Failed to delete project');
        }
    };

    return (
        <div
            className="max-w-4xl mx-auto p-6 bg-[var(--bg-light)] rounded-lg shadow-md"
            role="main"
            aria-label="Manage Projects"
        >
            {/* Page title */}
            <h1
                className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-[var(--text-primary)] mb-8 text-center"
            >
                Manage Projects
            </h1>

            {/* Form for adding/updating project */}
            <form
                onSubmit={handleSubmit}
                className="mb-10 p-6 bg-[var(--card-bg)] rounded-lg shadow"
                noValidate
            >
                <h2
                    className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading mb-6"
                >
                    {isEditing ? 'Edit Project' : 'Add New Project'}
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
                    className="mb-6 w-full p-2 border border-[var(--border)] rounded"
                    {...(!isEditing && { required: true })}
                    aria-required={!isEditing}
                />

                {/* Submit and Cancel buttons */}
                <button
                    type="submit"
                    className="bg-[var(--primary)] text-[var(--bg-light)] px-6 py-3 rounded-md hover:bg-[var(--secondary)] transition-colors duration-200 font-semibold"
                >
                    {isEditing ? 'Update Project' : 'Add Project'}
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
            </form>

            {/* Loading, error, or projects table */}
            {loading ? (
                <p className="text-center text-[var(--text-secondary)]">Loading projects...</p>
            ) : error ? (
                <p className="text-center text-[var(--error)]">{error}</p>
            ) : projects.length === 0 ? (
                <p className="text-center text-[var(--text-secondary)]">No projects found.</p>
            ) : (
                <table
                    className="w-full border-collapse border border-[var(--border)] rounded"
                    role="table"
                    aria-label="List of projects"
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
                    {projects.map((project) => (
                        <tr
                            key={project._id}
                            className="border-t border-[var(--border)]"
                        >
                            <td className="border border-[var(--border)] p-3 text-[var(--text-primary)]">
                                {project.title}
                            </td>
                            <td className="border border-[var(--border)] p-3">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/projects/${project.image}`}
                                    alt={project.title}
                                    className="w-24 h-16 object-cover rounded"
                                    loading="lazy"
                                />
                            </td>
                            <td className="border border-[var(--border)] p-3 text-[var(--text-primary)]">
                                {project.description}
                            </td>
                            <td className="border border-[var(--border)] p-3 space-x-4">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="text-[var(--primary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    aria-label={`Edit project titled ${project.title}`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="text-[var(--error)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    aria-label={`Delete project titled ${project.title}`}
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

export default ManageProjects;
