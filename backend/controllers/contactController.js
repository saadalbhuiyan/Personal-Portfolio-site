const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
        }

        await Contact.create({ name, email, message });

        res.status(201).json({ message: 'Message sent successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve contact messages.' });
    }
};
