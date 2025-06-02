import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import { submitContact } from '../utils/api';

const Contact = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // State for error and success messages
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle input change for controlled inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Name, Email, and Message are required.');
            return;
        }

        try {
            await submitContact(formData);
            setSuccess('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch {
            setError('Failed to send message. Please try again later.');
        }
    };

    return (
        <main
            className="p-4 md:p-6 max-w-[1200px] mx-auto"
            role="main"
            aria-label="Contact form"
        >
            {/* Page title */}
            <h1
                className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6"
            >
                Contact Me
            </h1>

            {/* Form container */}
            <section
                className="bg-[var(--bg-light)] shadow-card rounded-lg p-5 max-w-md mx-auto"
                aria-live="polite"
            >
                <form onSubmit={handleSubmit} noValidate>
                    {/* Name input */}
                    <FormInput
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Email input */}
                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Message textarea */}
                    <FormInput
                        label="Message"
                        type="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-white p-3 rounded-md
                       hover:bg-[var(--secondary)] transition-colors duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent)] min-h-[44px]"
                        aria-label="Submit contact form"
                    >
                        Submit
                    </button>
                </form>

                {/* Error message */}
                {error && (
                    <p
                        className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mt-6"
                        role="alert"
                        aria-live="assertive"
                    >
                        {error}
                    </p>
                )}

                {/* Success message */}
                {success && (
                    <p
                        className="text-[var(--success)] text-body-mobile md:text-body-desktop text-center mt-6"
                        role="status"
                        aria-live="polite"
                    >
                        {success}
                    </p>
                )}
            </section>
        </main>
    );
};

export default Contact;
