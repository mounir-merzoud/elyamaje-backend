const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/signupController");
const { login } = require("../controllers/loginController");

// Route pour l'inscription
router.post("/signup", signup);

// Route pour la connexion
router.post("/login", login);

module.exports = router;
