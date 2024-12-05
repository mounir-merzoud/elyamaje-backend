const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Tentative de connexion avec :", { email, password });

    if (!email || !password) {
      console.log("Champs manquants");
      return res
        .status(400)
        .json({ error: "L'email et le mot de passe sont requis" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Email introuvable :", email);
      return res.status(400).json({ error: "Email ou mot de passe invalide" });
    }

    const isPasswordValid = await admin.isValidPassword(password);
    if (!isPasswordValid) {
      console.log("Mot de passe incorrect pour :", email);
      return res.status(400).json({ error: "Email ou mot de passe invalide" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Connexion réussie, token généré");
    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
