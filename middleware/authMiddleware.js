const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    try {
        // Extraire le token de l'en-tête Authorization
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send({ error: 'Token missing. Please authenticate.' });
        }

        // Vérifier et décoder le token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        // Vérifier si l'admin existe dans la base de données
        if (!admin) {
            return res.status(401).send({ error: 'Admin not found. Please authenticate.' });
        }

        req.admin = admin; // Ajouter l'admin dans la requête pour les prochaines étapes
        next(); // Continuer vers la route suivante
    } catch (error) {
        console.error('Erreur d\'authentification :', error.message);
        res.status(401).send({ error: 'Invalid token. Please authenticate.' });
    }
};
