// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddlewares = require('../middlewares/authMiddlewares');
const generalController = require('../controllers/generalController');

router.get('/', generalController.getHome);

router.get('/home', generalController.getHome);

router.get('/logout', generalController.getLogout);

router.get('/login', authMiddlewares.redirigerSiconnectee, (req, res) => {
  // Code de gestion de la page de connexion
  res.status(200).render('index', { statu:"", page:"login", errorMessage:"", successMessage:"" });
});

router.get('/register', authMiddlewares.redirigerSiconnectee, (req, res) => {
  // Code de gestion de la page d'inscription
  res.status(200).render('index', { statu:"", page:"register", errorMessage:"", successMessage:"" });
});

router.get('/reset', authMiddlewares.redirigerSiconnectee, (req, res) => {
  // Code de gestion de la page d'inscription
  res.status(200).render('index', { statu:"", page:"reset", errorMessage:"", successMessage:"" });
});

router.get('*', (req, res) => {
  // Code de gestion de la page de réinitialisation
  res.status(404).render('index', { statu:"404 Page not found", page:"erreur", errorMessage:"", successMessage:"" });
});

router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.post('/reset', authController.postReset);

module.exports = router;
