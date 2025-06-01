const express = require('express');
const router = express.Router();

const { submitContact, getContacts } = require('../controllers/contactController');
const protectAdmin = require('../middlewares/authMiddleware');

router.post('/', submitContact);

router.get('/', protectAdmin, getContacts);

module.exports = router;
