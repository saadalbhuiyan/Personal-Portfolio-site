const Admin = require('../models/Admin');

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email ও Password দিতে হবে।' });
        }

        const admin = await Admin.findOne({ email });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Email বা Password সঠিক নয়।' });
        }

        res.status(200).json({ message: 'লগইন সফল', email: admin.email });
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার সমস্যা হয়েছে।' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const admin = req.admin;

        if (admin.password !== oldPassword) {
            return res.status(400).json({ message: 'পুরনো Password মিলছে না।' });
        }

        admin.password = newPassword;
        await admin.save();

        res.status(200).json({ message: 'Password সফলভাবে আপডেট হয়েছে।' });
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার সমস্যা হয়েছে।' });
    }
};
