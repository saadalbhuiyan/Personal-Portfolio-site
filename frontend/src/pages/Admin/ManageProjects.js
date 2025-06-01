import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput';
import { getProjects, addProject, updateProject, deleteProject, uploadImage } from '../../utils/api';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response.data);
            } catch (err) {
                setError('Failed to load projects');
            }
        };
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImage = async (e) => {
        try {
            const file = e.target.files[0];
            const response = await uploadImage(file);
            setFormData({ ...formData, image: response.data.url });
        } catch (err) {
            setError('Failed to upload image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateProject(editId, formData);
                setEditId(null);
            } else {
                await addProject(formData);
            }
            setFormData({ title: '', description: '', image: '' });
            const response = await getProjects();
            setProjects(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to save project');
        }
    };

    const handleEdit = (project) => {
        setFormData({ title: project.title, description: project.description, image: project.image });
        setEditId(project.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProject(id);
            const response = await getProjects();
            setProjects(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to delete project');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Manage Projects</h1>
            <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mb-6" onSubmit={handleSubmit}>
                <FormInput label="Title" type="text" name="title" value={formData.title} onChange={handleChange} />
                <FormInput label="Description" type="text" name="description" value={formData.description} onChange={handleChange} />
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Image</label>
                    <input type="file" onChange={handleImage} className="w-full p-2" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    {editId ? 'Update' : 'Add'} Project
                </button>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="p-4 bg-white shadow-md rounded-lg">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg" />
                        <h3 className="text-xl font-semibold p-2">{project.title}</h3>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(project)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(project.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;