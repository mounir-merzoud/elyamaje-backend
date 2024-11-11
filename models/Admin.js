const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator'); // Importer le plugin

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique validator sur l'email
    password: { type: String, required: true },
});

// Utiliser le plugin unique-validator sur le schéma
adminSchema.plugin(uniqueValidator, { message: '{PATH} doit être unique.' });

// Hashing du mot de passe avant la sauvegarde
adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('Admin', adminSchema);
