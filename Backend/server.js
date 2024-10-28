const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Charge les variables d'environnement

// Middleware pour parsing JSON
app.use(express.json());

app.use(cors());

// Connection a la base de données
mongoose
  .connect(process.env.MONGODB_URI) // Utilise la variable d'environnement
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
