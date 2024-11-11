const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const admin = new Admin({ name, email, password });
        await admin.save();
        res.status(201).send({ message: 'Admin created' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
