import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput';
import { getServices, addService, updateService, deleteService, uploadImage } from '../../utils/api';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response.data);
            } catch (err) {
                setError('Failed to load services');
            }
        };
        fetchServices();
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
                await updateService(editId, formData);
                setEditId(null);
            } else {
                await addService(formData);
            }
            setFormData({ title: '', description: '', image: '' });
            const response = await getServices();
            setServices(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to save service');
        }
    };

    const handleEdit = (service) => {
        setFormData({ title: service.title, description: service.description, image: service.image });
        setEditId(service.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteService(id);
            const response = await getServices();
            setServices(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to delete service');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Manage Services</h1>
            <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mb-6" onSubmit={handleSubmit}>
                <FormInput label="Title" type="text" name="title" value={formData.title} onChange={handleChange} />
                <FormInput label="Description" type="text" name="description" value={formData.description} onChange={handleChange} />
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Image</label>
                    <input type="file" onChange={handleImage} className="w-full p-2" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    {editId ? 'Update' : 'Add'} Service
                </button>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="p-4 bg-white shadow-md rounded-lg">
                        <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-lg" />
                        <h3 className="text-xl font-semibold p-2">{service.title}</h3>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(service)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(service.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageServices;