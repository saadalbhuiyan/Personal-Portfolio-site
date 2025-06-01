import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import { submitContact } from '../utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        website: '',
        message: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitContact(formData);
            setSuccess('Message sent successfully!');
            setFormData({ fullName: '', email: '', website: '', message: '' });
            setError(null);
        } catch (err) {
            setError('Failed to send message');
            setSuccess(null);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Contact Me</h1>
            <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
                <FormInput
                    label="Full Name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <FormInput
                    label="Website Link"
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required={false}
                />
                <FormInput
                    label="Message"
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
            </form>
        </div>
    );
};

export default Contact;