const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        const message = "L'utilisateur demandé n'éxiste pas!";
        return res.status(404).json({ message });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        const message = "Le mot de passe n'est pas correct.";
        return res.status(401).json({ message });
      }

      // JWT
      const token = jwt.sign({ userId: user.id }, privateKey, {
        expiresIn: "24h",
      });

      const message = "L'utilisateur s'est connecté avec succès!";
      return res.json({ message, data: user, token });
    } catch (error) {
      const message = "L'utilisateur n'a pas pu être connecté.";
      return res.status(500).json({ message, data: error });
    }
  });
};
