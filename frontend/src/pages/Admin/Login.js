import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import { loginAdmin } from '../../utils/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await loginAdmin(formData.email, formData.password);
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                navigate('/admin/dashboard');
            } else {
                setError('Login failed: No token received');
            }
        } catch {
            setError('Login failed: Invalid email or password');
        }
    };

    return (
        <div className="p-6 max-w-[1200px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-center text-[var(--text-primary)] mb-8">
                Admin Login
            </h1>
            <div className="bg-[var(--bg-light)] shadow-md rounded-lg p-6 max-w-md mx-auto">
                <form onSubmit={handleSubmit} noValidate>
                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-[var(--bg-light)] p-3 rounded-md hover:bg-[var(--secondary)] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)] min-h-[44px]"
                        aria-label="Login to admin"
                    >
                        Login
                    </button>
                    {error && (
                        <p className="text-[var(--error)] text-base md:text-lg text-center mt-6">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
