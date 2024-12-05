const Admin = require("../models/Admin");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Données reçues :", { name, email, password });

    // Vérifier que tous les champs sont fournis
    if (!name || !email || !password) {
      console.log("Champs manquants");
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    // Vérifier si l'email existe déjà
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Email déjà existant :", email);
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    // Créer un nouvel administrateur
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();
    console.log("Admin créé avec succès :", newAdmin);

    // Répondre avec succès
    res.status(201).json({ message: "Compte administrateur créé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
