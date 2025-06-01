import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput';
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, uploadImage } from '../../utils/api';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: '', review: '', image: '' });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await getTestimonials();
                setTestimonials(response.data);
            } catch (err) {
                setError('Failed to load testimonials');
            }
        };
        fetchTestimonials();
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
                await updateTestimonial(editId, formData);
                setEditId(null);
            } else {
                await addTestimonial(formData);
            }
            setFormData({ name: '', review: '', image: '' });
            const response = await getTestimonials();
            setTestimonials(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to save testimonial');
        }
    };

    const handleEdit = (testimonial) => {
        setFormData({ name: testimonial.name, review: testimonial.review, image: testimonial.image });
        setEditId(testimonial.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteTestimonial(id);
            const response = await getTestimonials();
            setTestimonials(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to delete testimonial');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Manage Testimonials</h1>
            <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mb-6" onSubmit={handleSubmit}>
                <FormInput label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
                <FormInput label="Review" type="text" name="review" value={formData.review} onChange={handleChange} />
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Image</label>
                    <input type="file" onChange={handleImage} className="w-full p-2" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    {editId ? 'Update' : 'Add'} Testimonial
                </button>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-4 bg-white shadow-md rounded-lg">
                        <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto" />
                        <h3 className="text-xl font-semibold p-2 text-center">{testimonial.name}</h3>
                        <div className="flex gap-2 justify-center">
                            <button onClick={() => handleEdit(testimonial)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(testimonial.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageTestimonials;