const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or malformed.' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({ message: 'Admin not found.' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        console.error('Authentication error:', err);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
