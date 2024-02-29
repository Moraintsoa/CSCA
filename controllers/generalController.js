// Importez les modules nécessaires
const bcrypt = require('bcrypt');
const fs = require("fs")
const MonPdf = require("pdf-creator-node")
const { creationdepdf } = require("../pdf/creationDePdf")
const { LesEntites } = require("../basedenne/listes")
const nodemailer = require('nodemailer')
// const {imprimerDossier} = require("../pdf/pdfcreat")
const { LesEntites_by_Id, selecteUtilisateur, adminCurrent, registerUtilisateur, csca_bd, userCurrent, selecteDonnee, selecteDonnee_by_refCsca, selecteDossier_by_Id } = require('../basedenne/Mon_dataBase');
const { ifError } = require('assert');

// Définissez les fonctions de contrôle pour les routes générales
// Exemple : getHome, getLogout, getNotFound
// exports.postImpression = async (req,res)=>{
//   console.log("ato aho")
//   imprimerDossier(req.params.id,req.session.userEntite)
// }
exports.getAdmin = (req, res) => {
  if (req.session.adminId) {
    adminCurrent(req.session.adminId, (err, datas) => {
      if (err) {
        console.log("Une erreur s'est produite :", err);
      }
      else {
        selecteUtilisateur("lesutilisateurs", (errutlrs, lesutilisateurs) => {
          if (errutlrs) {
            console.log("Une erreur de recuperation des utilisateurs :", errutlrs);
          }
          else {
            let lespages = "utilisateurs"
            // Continuez avec le reste de votre code
            if (req.query.p === "Utilisateurs") {
              lespages = "utilisateurs"
            }
            else if (req.query.p === "Demandes") {
              lespages = "demandes"

            }
            else if (req.query.p === "Réinitialisation") {
              lespages = "reinitialisation"

            }
            else if (req.query.p === "ComptesBloqué") {
              lespages = "comptesbloque"

            }
            res.status(200).render('index', { userId: req.session.userId, lesutilisateurs, statu: "connectee", page: "admin", errorMessage: "", successMessage: "", datas, mainsection: `./admin/${lespages}.ejs`, navmenu: `` });
            //eto
          }
        })
      }
    });
  } else {
    res.status(200).redirect('/admin_login');
  }
};

const grandTabs = {
  'parquet': ['bienmobilier',
    'bienimmobilier',
    'comptebancaire',
    'personnephysique',
    'personnemorale'],
  'siege': ['confirmationdesaisie',
    'mainlevee',
    'oppositionauxos',
    'confiscationcsca',
    'oppositionauxconfiscationcsca']
}

exports.getPDF = async function (req, res) {
  const UnDossier = await selecteDossier_by_Id(req.query.id);

  let confirmationdesaisie = await LesEntites_by_Id('confirmationdesaisie', `${req.query.id}/CSCA`)
  let mainlevee = await LesEntites_by_Id('mainlevee', `${req.query.id}/CSCA`)
  let oppositionauxos = await LesEntites_by_Id('oppositionauxos', `${req.query.id}/CSCA`)
  let confiscationcsca = await LesEntites_by_Id('confiscationcsca', `${req.query.id}/CSCA`)
  let oppositionauxconfiscationcsca = await LesEntites_by_Id('oppositionauxconfiscationcsca', `${req.query.id}/CSCA`)

  let bienmobilier = await LesEntites_by_Id('bienmobilier', `${req.query.id}/CSCA`)
  let bienimmobilier = await LesEntites_by_Id('bienimmobilier', `${req.query.id}/CSCA`)
  let comptebancaire = await LesEntites_by_Id('comptebancaire', `${req.query.id}/CSCA`)
  let personnephysique = await LesEntites_by_Id('personnephysique', `${req.query.id}/CSCA`)
  let personnemorale = await LesEntites_by_Id('personnemorale', `${req.query.id}/CSCA`)

  res.status(200).render('index', { confirmationdesaisie, mainlevee, oppositionauxos, confiscationcsca, oppositionauxconfiscationcsca, bienmobilier, bienimmobilier, comptebancaire, personnephysique, personnemorale, UnDossier, LesEntites, page: "imprimer" });

};

exports.getHome = (req, res) => {
  if (req.session.userId) {
    userCurrent(req.session.userId, (err, datas) => {
      if (err) {
        console.log("Une erreur s'est produite :", err);
      }
      else {
        // if (datas[0].photo) {
        //   // Spécifiez le chemin de destination du fichier où vous souhaitez enregistrer l'image
        //   //const filePath = `static/img/${datas[0].photo}`; // Remplacez par le chemin et le nom de fichier appropriés

        //   // Enregistrez le contenu du buffer dans le fichier
        //   //fs.writeFileSync(filePath, datas[0].photo);

        //   // Maintenant, vous avez enregistré l'image dans un fichier (par exemple, image.jpg)
        //   res.status(200).render('index', { statu: "connectee", page: "home", errorMessage: "", successMessage: "", datas, mainsection: `./accueil/ajoutdossier.ejs`, navmenu: `` });

        // } else {
        //   res.status(200).render('index', { statu: "connectee", page: "home", errorMessage: "", successMessage: "", datas, mainsection: `./accueil/ajoutdossier.ejs`, navmenu: `` });
        // }
        res.status(200).redirect('/ajoutDossier');
      }
    });
  } else {
    res.status(200).redirect('/login');
  }
};

exports.getuserprofile = (req, res) => {
  if (req.session.userId) {
    userCurrent(req.session.userId, (err, datas) => {
      if (err) {
        console.log("Une erreur s'est produite :", err);
      }
      else {
        res.status(200).render('index', { statu: "connectee", page: "home", errorMessage: "", successMessage: "", datas, mainsection: "userprofile/mainsection.ejs", navmenu: "./userprofile/navmenu.ejs" });
      }
    });
  } else {
    res.status(200).redirect('/login');
  }
}
exports.getajoutDossier = (req, res) => {
  if (req.session.userId) {
    userCurrent(req.session.userId, (err, datas) => {
      if (err) {
        console.log("Une erreur s'est produite :", err);
      }
      else {
        res.status(200).render('index', { datas, statu: "connectee", page: "home", errorMessage: "", successMessage: "", mainsection: "accueil/ajoutdossier.ejs" });
      }
    });
  } else {
    res.status(200).redirect('/login');
  }
}
exports.getlisteDossier = (req, res) => {
  if (req.session.userId) {
    userCurrent(req.session.userId, (err, datas) => {
      if (err) {
        console.log("Une erreur s'est produite :", err);
      }
      else {
        selecteDonnee("ajoutdedossier", (err, lesdonnees) => {
          if (err) {
            console.log(err)
          }
          else {
            res.status(200).render('index', { entiteUser: req.session.userEntite, lesdonnees, datas, statu: "connectee", page: "home", errorMessage: "", successMessage: "", mainsection: "accueil/liste.ejs" });
          }
        })
      }
    })
  } else {
    res.status(200).redirect('/login');
  }
}
exports.getParquet = (req, res) => {
  if (req.session.userId) {
    userCurrent(req.session.userId, (err, datas) => {
      if (err) {
        console.log("Une erreur s'est produite :", err);
      }
      else {
        // let table = "bienmobilier"
        let table = "bienmobilier"
        // Continuez avec le reste de votre code
        if (req.query.ajout === "BienMobilier") {
          table = "bienmobilier"

        }
        else if (req.query.ajout === "BienImmobilier") {
          table = "bienimmobilier"

        }
        else if (req.query.ajout === "CompteBancaire") {
          table = "comptebancaire"

        }
        else if (req.query.ajout === "Personnephysique") {
          table = "personnephysique"

        }
        else if (req.query.ajout === "PersonneMorale") {
          table = "personneMorale"

        }
        selecteDonnee_by_refCsca(table, `${req.query.d}/CSCA`, (err, lesdonnees) => {
          if (err) {
            console.log(err)
          }
          else {
            let hita = false
            lesdonnees.forEach(ledonnee => {
              if (ledonnee.referencecsca === parseInt(req.query.d) + "/CSCA") {
                hita = true
                return
              }
            });
            if (hita === true) {
              id_dossier = `${req.query.d}/CSCA`
              res.status(200).render('index', { id_dossier, lesdonnees, datas, statu: "connectee", page: "home", errorMessage: "", successMessage: "", mainsection: `./parquet/mainsection.ejs`, navmenu: `./parquet/navmenu.ejs` });
            } else {
              res.status(200).redirect("/listeDossier")
            }
          }
        })
      }
    })
  } else {
    res.status(200).redirect('/login');
  }
}
exports.getSiege = (req, res) => {
  if (req.session.userId) {
    userCurrent(req.session.userId, (err, datas) => {
      if (err) {
        console.log("Une erreur s'est produite :", err);
      }
      else {
        let table = "confirmationdesaisie"
        // Continuez avec le reste de votre code
        if (req.query.ajout === "Confirmationdesaisie") {
          table = "confirmationdesaisie"
        }
        else if (req.query.ajout === "Mainlevée") {
          table = "mainlevee"
        }
        else if (req.query.ajout === "Oppositionauxopérationssuspects") {
          table = "oppositionauxos"
        }
        else if (req.query.ajout === "ConfiscatonCSCA") {
          table = "confiscationcsca"
        }
        else if (req.query.ajout === "OpositionauxConfiscatonCSCA") {
          table = "oppositionauxconfiscationcsca"
        }
        selecteDonnee_by_refCsca(table, `${req.query.d}/CSCA`, (err, lesdonnees) => {
          if (err) {
            console.log(err)
          }
          else {
            let hita = false
            lesdonnees.forEach(ledonnee => {
              if (ledonnee.referencecsca === parseInt(req.query.d) + "/CSCA") {
                hita = true
                return
              }
            });
            if (hita === true) {
              id_dossier = `${req.query.d}/CSCA`
              res.status(200).render('index', { id_dossier, lesdonnees, datas, statu: "connectee", page: "home", errorMessage: "", successMessage: "", mainsection: `./siege1ere/mainsection.ejs`, navmenu: `./siege1ere/navmenu.ejs` });
            } else {
              res.status(200).redirect("/listeDossier")
            }
          }
        })
      }
    })
  } else {
    res.status(200).redirect('/login');
  }
}
exports.postAccepter = (req, res) => {
  let id = req.params.id
  csca_bd.query("UPDATE lesutilisateurs SET etat_du_compte = ? WHERE id = ?", ["utilisateur", id], (err) => {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).redirect('/admin?g=u&p=Demandes');
    }
  });
}
exports.postDebloquer = (req, res) => {
  let id = req.params.id
  csca_bd.query("UPDATE lesutilisateurs SET etat_du_compte = ? WHERE id = ?", ["enattente", id], (err) => {
    if (err) {
      console.log(err);
    }
    else {
      // res.status(404).send("utilisateur non trouver dans la session activ")

      res.status(200).redirect('/admin?g=u&p=ComptesBloqué');
    }
  });
}
exports.postBloquer = (req, res) => {
  let id = req.params.id
  csca_bd.query("UPDATE lesutilisateurs SET etat_du_compte = ? WHERE id = ?", ["bloquee", id], (err) => {
    if (err) {
      console.log(err);
    }
    else {
      // for(const sessionId in req.sessionStore.sessions){
      //   const session=JSON.parse(req.sessionStore.sessions[sessionId])
      //   if(session && session.userId === id){
      //     req.sessionStore.destroy(sessionId, (err)=>{
      //       if(err){
      //         res.status(500).send("err lors de la deconnexion de l'utilisateur")
      //         return
      //       }
      //       res.send("l'utilisateur a ete de connecte ave succes")
      //     })
      //     return
      //   }
      // }
      res.status(200).redirect('/admin?g=u&p=Utilisateurs');
    }
  });
}
exports.postEffaceUtilisateur = (req, res) => {
  let id = req.params.id
  csca_bd.query("DELETE FROM `lesutilisateurs` WHERE id=?", [id], (er, sesultat) => {
    if (er) {
      console.log(er)
    }
    else {
      res.status(200).redirect('/admin?g=u&p=ComptesBloqué');
    }
  })
}
exports.postReinitialiser = (req, res) => {
  let id = req.params.id
  let mdp = req.params.mdp
  let mail = req.params.mail
  console.log(`${id}-${mdp}-${mail}`)
  // let newPassword= generateRandomPassword(10);
  // Hacher le mot de passe avec bcrypt
  bcrypt.hash(mdp, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    } else {
      // Mise à jour du mot de passe dans la base de données
      csca_bd.query("UPDATE lesutilisateurs SET motdepasse=?, needreinitialisation=? WHERE id=?", [hashedPassword, 0, id], (erreur) => {
        if (erreur) {
          console.error(erreur);
          res.status(500).send("Erreur serveur");
        } else {
          console.log(mdp)
          sendEmail( mail, mdp)
          // Envoyer un e-mail à l'utilisateur avec le mot de passe clair
          // sendEmail(emailreset, newPassword);
          res.status(200).redirect(`/admin?g=u&p=Réinitialisation`);
        }
      });
    }
  });
}
function sendEmail(email, password) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    Animateur: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "renelmoraintsoa@gmail.com",
      pass: "xzkq trbm yita syjl",
    },
  });

  const mailOptions = {
    from: 'renelmoraintsoa@gmail.com',
    to: email,
    subject: `Compte CSCA`,
    text: `Votre nouvelle mot de passe : ${password}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
// Fonction pour générer un mot de passe aléatoire
function generateRandomPassword(length) {
  const characters = '0123456789ABCDEF'; // Caractères hexadécimaux
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}
exports.deleteDossier = (req, res) => {
  let id = req.params.id
  csca_bd.query("DELETE FROM `ajoutdedossier` WHERE id=?", [id], (er, sesultat) => {
    if (er) {
      console.log(er)
    }
    else {
      const tabs = ['bienmobilier',
        'bienimmobilier',
        'comptebancaire',
        'personnephysique',
        'personnemorale',
        'confirmationdesaisie',
        'mainlevee',
        'oppositionauxos',
        'confiscationcsca',
        'oppositionauxconfiscationcsca']
      let doitEnvoyerReponse = true;
      tabs.forEach((tab) => {
        csca_bd.query(`DELETE FROM ${tab} WHERE referencecsca=?`, [`${id}/CSCA`], (err, resultat) => {
          if (err) {
            console.log(err)
            doitEnvoyerReponse = false;
          }
        })
      })
      if (doitEnvoyerReponse) {
        res.status(200).redirect('/listeDossier')
      }
    }
  })
}
exports.getLogout = (req, res) => {
  if (req.session.userId) {
    connecte_statut_off(req.session.userId)
    req.session.userId = null;
    req.session.userEntite = null;
    res.status(200).redirect('/login');
  }
};

exports.getLogoutadmin = (req, res) => {
  if (req.session.adminId) {
    req.session.adminId = null;
    res.status(200).redirect('/admin_login');
  }
};
function connecte_statut_off(id) {
  csca_bd.query("UPDATE lesutilisateurs SET conncte_stat=? WHERE id=?", [0, id], (err) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(`${id} est Deconnecté`)
    }
  })
}

// Les autres méthodes pour le contrôleur général
