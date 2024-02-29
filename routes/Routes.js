// authRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../static', 'img/profil')); // Emplacement où les fichiers seront stockés temporairement
  },
  filename: (req, file, cb) => {
    // Nom du fichier avec le timestamp actuel pour le rendre unique
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fileExtension = path.extname(file.originalname);
    const fileName = `${req.session.userId}_${timestamp}${fileExtension}`;
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });


const authController = require('../controllers/authController');
const ajoutController = require('../controllers/ajoutController');
const authMiddlewares = require('../middlewares/authMiddlewares');
const generalController = require('../controllers/generalController');
const creationDePdf = require('../pdf/creationDePdf');

router.get('/', generalController.getHome);
router.get('/home', generalController.getHome);
router.get('/topdf', generalController.getPDF);
router.get('/imprimerpdf', creationDePdf.creationdepdf);
router.get('/admin', generalController.getAdmin);

router.get('/userprofile', generalController.getuserprofile);
router.get('/ajoutDossier', generalController.getajoutDossier);
router.get('/listeDossier', generalController.getlisteDossier);
router.get('/parquet', generalController.getParquet);
router.get('/siege', generalController.getSiege);


router.get('/logout', generalController.getLogout);
router.get('/logoutadmin', generalController.getLogoutadmin);

router.get('/admin_login', authMiddlewares.redirigerSiconnecteeadmin, (req, res)=>{
  // Code de gestion de la page de admin
  res.status(200).render('index', { statu:"", page:"admin_login", errorMessage:"", successMessage:"" });
});
// router.get('/admin', authMiddlewares.redirigerSinepasConnecteeadmin, (req, res)=>{
//   // Code de gestion de la page de admin
//   res.status(200).render('index', { statu:"", page:"admin", errorMessage:"", successMessage:"", mainsection: "admin/utilisateurs.ejs"  });
// });
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

router.post('/admin', authController.postAdmin);
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.post('/reset', authController.postReset);

router.post('/updatephoto', upload.single('photoedit'), authController.postUpdateprofile);
// router.post('/updatephoto',authController.postUpdateprofile);
router.post('/updatenomprenom', authController.postupdateNomprenom)
router.post('/updatemail', authController.postupdatEmail)
router.post('/updatmdp', authController.postupdatMdp)


router.post('/ajoutdossier', ajoutController.postAjoutdossier)
router.post('/bienMobilier', ajoutController.postbienMobilier)
router.post('/bienImmobilier', ajoutController.postbienImmobilier)
router.post('/compteBancaire', ajoutController.postcompteBancaire)
router.post('/personnephysique', ajoutController.postpersonnePhysique)
router.post('/personnemorale', ajoutController.postpersonneMorale)

router.post('/confirmationdesaisie', ajoutController.postConfirmationdesaisie)
router.post('/mainlevee', ajoutController.postMainlevee)
router.post('/oos', ajoutController.postOOS)
router.post('/confiscatoncsca', ajoutController.postConfiscatonCSCA)
router.post('/opositionauxconfiscatoncsca', ajoutController.postOpositionauxConfiscatonCSCA)
router.post('/bloquer/:id', generalController.postBloquer)
router.post('/debloquer/:id', generalController.postDebloquer)
router.post('/accepter/:id', generalController.postAccepter)
router.post('/supprimerUtilisateur/:id', generalController.postEffaceUtilisateur)
router.post('/reinitialiser/:id/:mdp/:mail', generalController.postReinitialiser)
// router.post('/imprimer/:id', generalController.postImpression)postPDF
// router.post('/affichepdf/:id', generalController.postPDF)



router.post('/modifierdossier', ajoutController.postModificationdossier)
router.delete('/supprimer/:id', generalController.deleteDossier)



module.exports = router;
