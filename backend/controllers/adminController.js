const Admin = require('../models/Admin');

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const admin = await Admin.findOne({ email });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful.', email: admin.email });
    } catch (err) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const admin = req.admin;

        if (admin.password !== oldPassword) {
            return res.status(400).json({ message: 'Old password is incorrect.' });
        }

        admin.password = newPassword;
        await admin.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
