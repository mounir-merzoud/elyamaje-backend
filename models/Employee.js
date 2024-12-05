const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
  poste: { type: String, required: true, default: "employées" },
  dateOfEntry: { type: Date, required: true, default: Date.now }, // Changement du nom ici pour correspondre au contrôleur
  profileImage: { type: String, default: null },
});

module.exports = mongoose.model("Employee", employeeSchema);
