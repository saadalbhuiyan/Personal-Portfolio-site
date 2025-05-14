module.exports = async (req, res, next) => {
    const { email, password } = req.headers;
    const Admin = require('../models/Admin');

    if (!email || !password) {
        return res.status(400).json({ message: 'ইমেইল ও পাসওয়ার্ড হেডারে দিতে হবে।' });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(401).json({ message: 'অ্যাডমিন পাওয়া যায়নি।' });

    if (admin.password !== password) {
        return res.status(401).json({ message: 'পাসওয়ার্ড ভুল।' });
    }

    req.admin = admin;
    next();
};
