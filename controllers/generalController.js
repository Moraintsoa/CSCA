// Importez les modules nécessaires
const { selecteUtilisateur, registerUtilisateur, csca_bd, userCurrent } = require('../basedenne/Mon_dataBase');

// Définissez les fonctions de contrôle pour les routes générales
// Exemple : getHome, getLogout, getNotFound
exports.getHome = (req, res) => {
    if (req.session.userId) {
      userCurrent(req.session.userId, (err, datas) => {
        if (err) {
          console.log("Une erreur s'est produite :", err);
        } else {
          res.status(200).render('index', { statu: "connectee", page: "home", errorMessage: "", successMessage: "", datas});
        }
      });    
    
    } else {
      res.status(200).redirect('/login');
    }
  };

exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/login');
      }
    });
  };
  
  // Les autres méthodes pour le contrôleur général
  