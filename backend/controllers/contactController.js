const Contact = require('../models/Contact');

// Submit a new contact message (public)
exports.submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
        }

        const newContact = await Contact.create({ name, email, message });

        res.status(201).json({ message: 'Message sent successfully.', contact: newContact });
    } catch (err) {
        console.error('submitContact error:', err);
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
};

// Get all contact messages (admin only)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (err) {
        console.error('getContacts error:', err);
        res.status(500).json({ message: 'Failed to retrieve contact messages.' });
    }
};

// Delete a contact message by ID (admin only)
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Contact.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Contact message not found.' });
        }

        res.status(200).json({ message: 'Contact message deleted successfully.' });
    } catch (err) {
        console.error('deleteContact error:', err);
        res.status(500).json({ message: 'Failed to delete contact message.' });
    }
};
