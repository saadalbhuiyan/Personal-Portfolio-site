import React, { useState, useEffect } from 'react';
import { getContacts, deleteContact } from '../../utils/api';

const ManageContacts = () => {
    // State to hold contacts and error message
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch contacts on component mount
    useEffect(() => {
        fetchContacts();
    }, []);

    // Fetch contacts from API and handle errors
    const fetchContacts = async () => {
        try {
            const response = await getContacts();
            setContacts(response.data);
            setError(null);
        } catch {
            setError('Failed to load contacts');
        }
    };

    // Delete contact with confirmation and refresh list
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) return;
        try {
            await deleteContact(id);
            fetchContacts();
        } catch {
            alert('Failed to delete contact');
        }
    };

    return (
        <div
            className="p-6 max-w-[1200px] mx-auto bg-[var(--bg-light)] rounded-lg shadow-md"
            role="main"
            aria-label="Manage Contacts"
        >
            {/* Page Heading */}
            <h1
                className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-8"
            >
                Manage Contacts
            </h1>

            {/* Error Message */}
            {error && (
                <p
                    className="text-center text-[var(--error)] text-body-mobile md:text-body-desktop mb-6"
                    role="alert"
                    aria-live="assertive"
                >
                    {error}
                </p>
            )}

            {/* Contacts Table Container with horizontal scrolling for small screens */}
            <div className="bg-[var(--card-bg)] shadow-card rounded-lg p-6 overflow-x-auto">
                <table
                    className="w-full border-collapse border border-[var(--border)] rounded"
                    role="table"
                    aria-label="Contacts list"
                >
                    <thead>
                    <tr className="bg-[var(--bg-light)]">
                        {/* Table Headers */}
                        {['Name', 'Email', 'Message', 'Actions'].map((header) => (
                            <th
                                key={header}
                                className="p-3 text-left text-h3-mobile md:text-h3-desktop font-bold tracking-heading text-[var(--text-primary)] border border-[var(--border)]"
                                scope="col"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.length === 0 ? (
                        <tr>
                            <td
                                colSpan="4"
                                className="p-3 text-center text-[var(--text-secondary)]"
                            >
                                No contacts found.
                            </td>
                        </tr>
                    ) : (
                        contacts.map((contact) => (
                            <tr
                                key={contact._id}
                                className="border-t border-[var(--border)]"
                            >
                                <td className="p-3 text-body-mobile md:text-body-desktop text-[var(--text-primary)]">
                                    {contact.name}
                                </td>
                                <td className="p-3 text-body-mobile md:text-body-desktop text-[var(--text-primary)]">
                                    {contact.email}
                                </td>
                                <td className="p-3 text-body-mobile md:text-body-desktop text-[var(--text-primary)]">
                                    {contact.message}
                                </td>
                                <td className="p-3 text-body-mobile md:text-body-desktop space-x-3">
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
                                        aria-label={`Delete contact from ${contact.name}`}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContacts;
