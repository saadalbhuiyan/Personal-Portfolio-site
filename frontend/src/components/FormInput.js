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
    // Base classes for input and textarea styling:
    // - Full width
    // - Border with color from CSS var
    // - Padding for spacing inside
    // - Rounded corners for smooth edges
    // - Text color from --text-primary
    // - Placeholder color from --text-secondary
    // - Focus outline and ring for accessibility
    const baseClasses = `w-full border p-2 rounded-md 
    text-[var(--text-primary)] placeholder-[var(--text-secondary)] 
    focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]`;

    // Additional classes when input is disabled:
    // - Background and text color from --disabled variable
    // - Cursor style to not-allowed
    const disabledClasses = disabled
        ? 'bg-[var(--disabled)] text-[var(--disabled)] cursor-not-allowed'
        : '';

    return (
        <div className="mb-6">
            {/* Label associated with input via htmlFor */}
            <label
                htmlFor={name}
                className="block text-[var(--text-primary)] mb-1 font-medium"
            >
                {label}
                {/* Optional asterisk for required fields can be added here if needed */}
            </label>

            {/* Conditionally render textarea or input */}
            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    // Compose className from base and disabled classes
                    className={`${baseClasses} border-[var(--border)] ${disabledClasses}`}
                    aria-required={required}
                    rows={4} // Default rows for textarea for better UX
                />
            ) : (
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
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
