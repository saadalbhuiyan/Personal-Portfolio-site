import React, { useState, useEffect } from 'react';
import { getContacts, deleteContact } from '../../utils/api'; // deleteContact import করা হয়েছে

const ManageContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await getContacts();
            setContacts(response.data);
            setError(null);
        } catch {
            setError('Failed to load contacts');
        }
    };

    // Delete handler function
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) return;
        try {
            await deleteContact(id);
            fetchContacts(); // ডিলিটের পর আবার কন্টাক্ট লিস্ট রিফ্রেশ করানো
        } catch {
            alert('Failed to delete contact');
        }
    };

    return (
        <div className="p-6 max-w-[1200px] mx-auto bg-[var(--bg-light)] rounded-lg shadow-md">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-8">
                Manage Contacts
            </h1>
            {error && (
                <p className="text-center text-[var(--error)] text-body-mobile md:text-body-desktop mb-6">
                    {error}
                </p>
            )}
            <div className="bg-[var(--card-bg)] shadow-card rounded-lg p-6 overflow-x-auto">
                <table className="w-full border-collapse border border-[var(--border)] rounded">
                    <thead>
                    <tr className="bg-[var(--bg-light)]">
                        <th className="p-3 text-left text-h3-mobile md:text-h3-desktop font-bold tracking-heading text-[var(--text-primary)] border border-[var(--border)]">Name</th>
                        <th className="p-3 text-left text-h3-mobile md:text-h3-desktop font-bold tracking-heading text-[var(--text-primary)] border border-[var(--border)]">Email</th>
                        <th className="p-3 text-left text-h3-mobile md:text-h3-desktop font-bold tracking-heading text-[var(--text-primary)] border border-[var(--border)]">Message</th>
                        <th className="p-3 text-left text-h3-mobile md:text-h3-desktop font-bold tracking-heading text-[var(--text-primary)] border border-[var(--border)]">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact._id} className="border-t border-[var(--border)]">
                            <td className="p-3 text-body-mobile md:text-body-desktop text-[var(--text-primary)]">{contact.name}</td>
                            <td className="p-3 text-body-mobile md:text-body-desktop text-[var(--text-primary)]">{contact.email}</td>
                            <td className="p-3 text-body-mobile md:text-body-desktop text-[var(--text-primary)]">{contact.message}</td>
                            <td className="p-3 text-body-mobile md:text-body-desktop space-x-3">
                                <button
                                    onClick={() => handleDelete(contact._id)}
                                    className="text-red-600 hover:underline focus:outline-none"
                                    aria-label={`Delete contact from ${contact.name}`}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContacts;
