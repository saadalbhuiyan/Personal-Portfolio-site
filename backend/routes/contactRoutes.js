const express = require('express');
const router = express.Router();

const { submitContact, getContacts, deleteContact } = require('../controllers/contactController');
const protectAdmin = require('../middlewares/authMiddleware'); // Your admin auth middleware

// Public route to submit a contact message
router.post('/', submitContact);

// Admin-protected route to get all contacts
router.get('/', protectAdmin, getContacts);

// Admin-protected route to delete a contact message by ID
router.delete('/:id', protectAdmin, deleteContact);

module.exports = router;
