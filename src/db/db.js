const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const mongoUri = `mongodb+srv://willToumelin:${password}@cluster0.03uhndw.mongodb.net/Test`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("Connexion à MongoDB établie avec succès !");
});

module.exports = db;
