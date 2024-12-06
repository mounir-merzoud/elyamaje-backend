const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

// Schéma Admin
const adminSchema = new mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: false },
});

// Plugin pour s'assurer que l'email est unique
adminSchema.plugin(uniqueValidator, { message: "{PATH} doit être unique." });

// Middleware pour hacher le mot de passe avant de sauvegarder
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Méthode pour vérifier le mot de passe
adminSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Exporter le modèle Admin
module.exports = mongoose.model("Admin", adminSchema);
