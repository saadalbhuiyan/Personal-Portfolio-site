const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const protectAdmin = require('../middlewares/authMiddleware');

// Public route
router.post('/', submitContact);

// Admin-only route
router.get('/', protectAdmin, getContacts);

module.exports = router;
