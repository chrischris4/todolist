const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware pour parsing JSON
app.use(express.json());

app.use(cors());

// Connection a la base de données
mongoose
  .connect(
    `mongodb+srv://chrissk:VPBhNlPS95x3x1TC@clustertodolist.ylkqf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterToDoList
`
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
