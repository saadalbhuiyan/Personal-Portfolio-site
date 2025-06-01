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
        try {
            await updatePassword(newPassword);
            setSuccess('Password updated successfully!');
            setNewPassword('');
            setError(null);
        } catch (err) {
            setError('Failed to update password');
            setSuccess(null);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Update Password</h1>
            <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
                <FormInput
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Update Password
                </button>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
            </form>
        </div>
    );
};

export default UpdatePassword;