const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Vérification si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Cet email est déjà utilisé." });
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création d'un nouvel utilisateur + mdp haché
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "Utilisateur enregistré avec succès" });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
      res.status(500).json({
        error: "Erreur inconnue lors de l'enregistrement de l'utilisateur.",
      });
    }
  });
};
