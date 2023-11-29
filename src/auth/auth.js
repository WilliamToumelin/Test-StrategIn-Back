const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  try {
    if (!authorizationHeader) {
      throw new Error(
        "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête."
      );
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);

    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error("L'identifiant de l'utilisateur est invalide.");
    }

    next();
  } catch (error) {
    const message =
      error.message ||
      "Erreur lors de la vérification du jeton d'authentification.";
    res.status(403).json({ message });
  }
};
