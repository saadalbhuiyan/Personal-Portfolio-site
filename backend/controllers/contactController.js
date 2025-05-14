const Contact = require('../models/Contact');

// @desc Submit contact form
exports.submitContact = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Message sent successfully' });
};

// @desc Get all contact messages (admin only)
exports.getContacts = async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
};
