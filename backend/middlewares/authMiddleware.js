const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    try {
        const { email, password } = req.headers;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password must be provided in headers.' });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: 'Admin not found.' });
        }

        if (admin.password !== password) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        res.status(500).json({ message: 'Authentication failed due to server error.' });
    }
};
