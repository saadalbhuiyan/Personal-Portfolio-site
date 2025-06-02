import React, { useState } from 'react';
import FormInput from '../../components/FormInput';
import { updatePassword } from '../../utils/api';

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await updatePassword(newPassword);
            setSuccess('Password updated successfully!');
            setNewPassword('');
        } catch {
            setError('Failed to update password');
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-[var(--text-primary)] text-center mb-6">
                Update Password
            </h1>
            <div className="bg-[var(--card-bg)] shadow-card rounded-lg p-6 max-w-md mx-auto">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="New Password"
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-[var(--card-bg)] p-3 rounded-md hover:bg-[var(--secondary)] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)] min-h-[44px]"
                        aria-label="Update password"
                    >
                        Update Password
                    </button>
                </form>
                {error && (
                    <p className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mt-6">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="text-[var(--success)] text-body-mobile md:text-body-desktop text-center mt-6">
                        {success}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UpdatePassword;
