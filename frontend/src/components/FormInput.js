import React from 'react';

const FormInput = ({
                       label,
                       type,
                       value,
                       onChange,
                       name,
                       required = true,
                       disabled = false,
                   }) => {
    const baseClasses = `w-full border p-2 rounded-md text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]`;
    const disabledClasses = disabled
        ? 'bg-[var(--disabled)] text-[var(--disabled)] cursor-not-allowed'
        : '';

    return (
        <div className="mb-6">
            <label
                className="block text-[var(--text-primary)] mb-1 font-medium"
                htmlFor={name}
            >
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`${baseClasses} border-[var(--border)] ${disabledClasses}`}
                    aria-required={required}
                />
            ) : (
                <input
                    id={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    name={name}
                    required={required}
                    disabled={disabled}
                    className={`${baseClasses} border-[var(--border)] ${disabledClasses}`}
                    aria-required={required}
                />
            )}
        </div>
    );
};

export default FormInput;
