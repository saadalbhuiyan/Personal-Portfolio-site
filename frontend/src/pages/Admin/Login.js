import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import { loginAdmin } from '../../utils/api';

const Login = () => {
    // State for form data and error message
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Update form data state on input change
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle form submission for login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Call API login function
            const response = await loginAdmin(formData.email, formData.password);
            const token = response.data.token;

            if (token) {
                // Save token locally and navigate to admin dashboard
                localStorage.setItem('token', token);
                navigate('/admin/dashboard');
            } else {
                setError('Login failed: No token received');
            }
        } catch {
            // Show error message on failed login
            setError('Login failed: Invalid email or password');
        }
    };

    return (
        <div className="p-6 max-w-[1200px] mx-auto">
            {/* Page title */}
            <h1
                className="text-3xl md:text-4xl font-bold tracking-wide text-center text-[var(--text-primary)] mb-8"
            >
                Admin Login
            </h1>

            {/* Form container with light background, shadow, rounded corners, centered with max width */}
            <div className="bg-[var(--bg-light)] shadow-md rounded-lg p-6 max-w-md mx-auto">
                <form onSubmit={handleSubmit} noValidate>
                    {/* Email input field */}
                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {/* Password input field */}
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {/* Submit button styled with primary color background and accessible focus ring */}
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-[var(--bg-light)] p-3 rounded-md
                       hover:bg-[var(--secondary)] transition-colors duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent)] min-h-[44px]"
                        aria-label="Login to admin"
                    >
                        Login
                    </button>

                    {/* Display error message if any */}
                    {error && (
                        <p
                            className="text-[var(--error)] text-base md:text-lg text-center mt-6"
                            role="alert"
                            aria-live="assertive"
                        >
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
