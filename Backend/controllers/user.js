require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUserName = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({
      lastName: user.lastName,
      firstName: user.firstName,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'utilisateur",
      error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName');
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

const checkUsers = async () => {
  try {
    const users = await User.find({});
    console.log(users);
  } catch (error) {
    console.error('Erreur lors de la vérification des users', error);
  }
};
checkUsers();

// (async () => {
//   try {
//     // Supprimez tous les user existants
//     await User.deleteMany({});
//     console.log('Tous les users existants ont été supprimés.');
//   } catch (error) {
//     console.error(
//       'Erreur lors de la suppression des users au démarrage:',
//       error
//     );
//   }
// })();
