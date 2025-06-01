import React from 'react';

const FormInput = ({ label, type, value, onChange, name, required = true }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                required={required}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default FormInput;