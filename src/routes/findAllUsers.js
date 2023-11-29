const express = require("express");
const auth = require("../auth/auth");
const User = require("../models/User");

module.exports = (app) => {
  app.get("/api/users", auth, async (req, res) => {
    try {
      // Implémentez la vérification du token ici
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
