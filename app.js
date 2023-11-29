const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./src/db/db.js");
const dotenv = require("dotenv");

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000", // Ajoutez le domaine réel de votre application frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("Connexion à MongoDB établie avec succès !");
});

app.use(express.json());
app.use(cors(corsOptions));

console.log(process.env.MONGODB_URI);
console.log(process.env.PRIVATE_KEY);

// Les routes de l'application
require("./src/routes/register")(app);
require("./src/routes/login")(app);
require("./src/routes/findAllUsers")(app);

// Gestion des 404
app.use(({ res }) => {
  const message = "Impossible de trouver la ressource demandée!";
  res.status(404).json({ message });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Le serveur tourne actuellement sur le port: ${PORT}`);
});
