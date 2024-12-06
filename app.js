require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const employeeRoutes = require("./routes/employee");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Middleware pour analyser les données JSON dans les requêtes
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Connexion à MongoDB
const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        "La variable MONGODB_URI est manquante dans le fichier .env"
      );
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connecté à MongoDB avec succès !");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error.message);
    process.exit(1); // Quitte l'application en cas d'échec critique
  }
};

connectToDatabase();

// Routes
app.use("/admin", adminRoutes); // Routes pour les administrateurs
app.use("/employee", authMiddleware, employeeRoutes); // Routes pour les employés protégées par un middleware

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Export de l'application pour être utilisé dans d'autres fichiers
module.exports = app;
