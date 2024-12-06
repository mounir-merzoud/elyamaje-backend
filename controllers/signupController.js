const Admin = require("../models/Admin");

exports.signup = async (req, res) => {
  try {
    const { lastname, firstname, email, password, type } = req.body;

    console.log("Données reçues :", {
      lastname,
      firstname,
      email,
      password,
      type,
    });

    // Vérifier que tous les champs sont fournis
    if (!lastname || !firstname || !email || !password || !type) {
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
    const newAdmin = new Admin({ lastname, firstname, email, password, type });
    await newAdmin.save();
    console.log("Admin créé avec succès :", newAdmin);

    // Répondre avec succès
    res.status(201).json({ message: "Compte administrateur créé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
