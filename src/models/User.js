const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number, auto: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // convertir l'e-mail en minuscules
    trim: true, // supprimer les espaces avant et après
    match: [/^\S+@\S+\.\S+$/, "Le format de l'e-mail n'est pas valide."],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Le mot de passe doit comporter au moins 8 caractères."],
    validate: {
      validator: function (value) {
        // Vous pouvez ajouter des règles de validation personnalisées ici
        // Retourne true si la validation réussit, sinon false
        // Exemple : vérifier si le mot de passe contient au moins une majuscule, une minuscule et un chiffre
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(value);
      },
      message: "Le mot de passe n'est pas valide.",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
