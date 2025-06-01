const express = require('express');
const router = express.Router();

const { loginAdmin, updatePassword } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', loginAdmin);

router.put('/password', authMiddleware, updatePassword);

module.exports = router;
