import React, { useState, useEffect } from 'react';
import { getContacts } from '../../utils/api';

const ManageContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await getContacts();
                setContacts(response.data);
            } catch (err) {
                setError('Failed to load contacts');
            }
        };
        fetchContacts();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Manage Contacts</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="max-w-4xl mx-auto">
                <table className="w-full bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Website</th>
                        <th className="p-2 text-left">Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id} className="border-t">
                            <td className="p-2">{contact.fullName}</td>
                            <td className="p-2">{contact.email}</td>
                            <td className="p-2">{contact.website || 'N/A'}</td>
                            <td className="p-2">{contact.message}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContacts;