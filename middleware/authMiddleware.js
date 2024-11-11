const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};
