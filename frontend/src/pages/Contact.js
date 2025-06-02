import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import { submitContact } from '../utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!formData.name || !formData.email || !formData.message) {
            setError('Name, Email, and Message are required.');
            return;
        }

        try {
            await submitContact(formData);
            setSuccess('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6">
                Contact Me
            </h1>
            <div className="bg-[var(--background-light)] shadow-card rounded-lg p-5 max-w-md mx-auto">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        label="Message"
                        type="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-white p-3 rounded-md hover:bg-[var(--secondary)] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)] min-h-[44px]"
                        aria-label="Submit contact form"
                    >
                        Submit
                    </button>
                </form>
                {error && (
                    <p className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mt-6">{error}</p>
                )}
                {success && (
                    <p className="text-[var(--success)] text-body-mobile md:text-body-desktop text-center mt-6">{success}</p>
                )}
            </div>
        </div>
    );
};

export default Contact;
