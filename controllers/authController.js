const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer')
const { selecteUtilisateur, registerUtilisateur, csca_bd, userCurent, userCurrentmdp } = require('../basedenne/Mon_dataBase');

// Configuration de Multer pour gérer les fichiers téléchargés

// Gestion de la soumission du formulaire de connexion
exports.postAdmin = (req, res) => {
  const pseudo = req.body.pseudoadmin;
  const password = req.body.motdepassadmin;
  const juridiction = req.body.Juridiction;

  // Récupérer l'utilisateur depuis la base de données en fonction de l'email
  selecteUtilisateur("admin_login", (err, datas) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    } else {
      const utilisateurTrouve = datas.find((element) => {
        return element.pseudo === pseudo && element.password === password
      });

      if (utilisateurTrouve) {
        req.session.adminId = utilisateurTrouve.id;
        res.redirect("/admin_login");
        // Comparer le mot de passe haché avec le mot de passe saisi
        // bcrypt.compare(password, utilisateurTrouve.motdepasse, (err, result) => {
        //   if (result) {
        //     // res.render("index", { page: "admin", statu: "", errorMessage: "" });
        //     // req.session.userId = utilisateurTrouve.id;
        //     res.redirect("/admin");
        //   } else {
        //     // res.render("index", { page: "admin_login", statu: "", errorMessage: "Mot de passe incorrect" });
        //     res.redirect("/admin_login");
        //   }
        // });
      } else {
        res.render("index", { page: "admin_login", statu: "", errorMessage: `Pseudo ou Mot de passe incorrecte` });
        // res.redirect("/admin_login");
      }
    }
  });
};

// Gestion de la soumission du formulaire d'inscription
exports.postRegister = (req, res) => {
  const nip = `${req.body.organisation}-${req.body.nip}`;
  const email = req.body.email;
  const fonction = req.body.fonction;
  const entite = req.body.entite;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const motDePasse = req.body.motdepass;

  // Générer un sel (salt) pour le hachage
  const saltRounds = 10;

  // Vérifier si le NIP ou l'email existe déjà dans la base de données
  selecteUtilisateur("lesutilisateurs", (err, datas) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    }
    else {
      const utilisateurExistantNIP = datas.find((element) => element.nip === nip);
      const utilisateurExistantEmail = datas.find((element) => element.email === email);

      if (utilisateurExistantNIP && utilisateurExistantEmail) {
        // Le NIP et l'email existent déjà
        res.render("index", { page: "register", errorMessage: "Le NIP et l'email sont déjà enregistrés. Veuillez en choisir d'autres.", successMessage: "" });
      } else if (utilisateurExistantNIP && !utilisateurExistantEmail) {
        // Seul le NIP existe déjà
        res.render("index", { page: "register", errorMessage: "Le NIP est déjà enregistré. Veuillez en choisir un autre.", successMessage: "" });
      } else if (utilisateurExistantEmail && !utilisateurExistantNIP) {
        // Seul l'email existe déjà
        res.render("index", { page: "register", errorMessage: "L'email est déjà enregistré. Veuillez en choisir un autre.", successMessage: "" });
      } else {
        // Ni le NIP ni l'email n'existent pas, hachez le mot de passe
        bcrypt.hash(motDePasse, saltRounds, (err, hash) => {
          if (err) {
            console.error(err);
            res.status(500).send("Erreur serveur");
          } else {
            // Insérer le nouvel utilisateur dans la base de données
            const donnees = [null, nip, fonction, entite, nom, prenom, email, hash];
            csca_bd.query("INSERT INTO lesutilisateurs(id, nip, fonction, entite, nom, prenom, email, motdepasse) VALUES (?, ?,?, ?, ?, ?, ?, ?)", donnees, (err) => {
              if (err) {
                console.error(err);
                res.status(500).send("Erreur serveur");
              } else {
                res.render("index", { page: "register", successMessage: "Inscription réussie. Vous pouvez maintenant vous connecter.", errorMessage: "" });
              }
            });
          }
        });
      }
    }
  });
};


exports.postUpdateprofile = (req, res) => {
  const userId = req.session.userId;
  const photo = req.file; // Contient les informations sur le fichier téléchargé

  if (photo && photo.filename && photo.path) {
    // Insérez le nom de fichier dans la base de données
    const query = 'UPDATE lesutilisateurs SET photo = ? WHERE id = ?';
    csca_bd.query(query, [photo.filename, userId], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données :', err);
        res.redirect('/');
      } else {
        // Copiez le fichier dans le dossier "img"
        const sourcePath = photo.path;
        const destPath = path.join(__dirname, '../static', 'img/profil', photo.filename);

        fs.copyFile(sourcePath, destPath, (errCopy) => {
          if (errCopy) {
            console.error('Erreur lors de la copie du fichier :', errCopy);
          } else {
            console.log('Fichier copié dans le dossier "img"');

            // Supprimer le fichier source après la copie réussie
            // fs.unlink(sourcePath, (errUnlink) => {
            //   if (errUnlink) {
            //     console.error('Erreur lors de la suppression du fichier temporaire :', errUnlink);
            //   } else {
            //     console.log('Fichier temporaire supprimé');
            //   }
            // });
          }

          res.redirect('/userprofile');
        });
      }
    });
  } else {
    console.error('Les propriétés nécessaires de la photo ne sont pas définies.');
    res.redirect('/userprofile');
  }

}

exports.postupdateNomprenom = (req, res) => {
  const userId = req.session.userId
  const nomedit = req.body.nomedit
  const prenomedit = req.body.prenomedit
  if (nomedit !== "") {
    csca_bd.query("UPDATE lesutilisateurs SET nom=?,prenom=? WHERE id=?", [nomedit, prenomedit, userId], (err) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Nom et prenom a ete bien mise a jour")
        res.redirect('/userprofile');
      }
    })
  }
}
exports.postupdatEmail = (req, res) => {
  const userId = req.session.userId
  const emailedit = req.body.emailedit
  if (emailedit !== "") {
    csca_bd.query("UPDATE lesutilisateurs SET email=? WHERE id=?", [emailedit, userId], (err) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log("email a ete bien mise a jour")
        res.redirect('/userprofile');
      }
    })
  }
}
exports.postupdatMdp = (req, res) => {
  const userId = req.session.userId;
  const mdpancienedit = req.body.mdpancienedit;
  const nvmdpedit = req.body.nvmdpedit;
  const cnvmdpedit = req.body.cnvmdpedit;
  const saltRounds = 10

  userCurrentmdp(userId, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    } else {
      bcrypt.compare(mdpancienedit, user.motdepasse, (err, passwordsMatch) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Erreur lors de la validation de l\'ancien mot de passe' });
        }

        if (passwordsMatch) {
          if (nvmdpedit === cnvmdpedit) {
            bcrypt.hash(nvmdpedit, saltRounds, (err, hash) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erreur lors du hachage du nouveau mot de passe' });
              }

              csca_bd.query("UPDATE lesutilisateurs SET motdepasse = ? WHERE id = ?", [hash, userId], (err) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe' });
                }
                console.log('Votre mot de passe a été mis à jour avec succès');
                res.redirect('/userprofile');
              });
            });
          } else {
            return res.status(400).json({ error: 'Le nouveau mot de passe et la confirmation ne correspondent pas' });
          }
        } else {
          return res.status(401).json({ error: 'L\'ancien mot de passe ne correspond pas' });
        }
      });
    }
  });
};


// Gestion de la soumission du formulaire de connexion
exports.postLogin = (req, res) => {
  const email = req.body.emailutilisateur;
  const motDePasse = req.body.motdepassutilisateur;

  // Récupérer l'utilisateur depuis la base de données en fonction de l'email
  selecteUtilisateur("lesutilisateurs", (err, datas) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    } else {
      const utilisateurTrouve = datas.find((element) => {
        return element.email === email;
      });

      if (utilisateurTrouve) {
        if (utilisateurTrouve.etat_du_compte === "utilisateur") {
          // Comparer le mot de passe haché avec le mot de passe saisi
          bcrypt.compare(motDePasse, utilisateurTrouve.motdepasse, (err, result) => {
            if (result) {
              req.session.userId = utilisateurTrouve.id;
              req.session.userEntite = utilisateurTrouve.entite;
              connecte_statut_on(req.session.userId)
              res.redirect("/");
            } else {
              res.render("index", { page: "login", statu: "", errorMessage: "Mot de passe incorrect" });
            }
          });
        }
        else if (utilisateurTrouve.etat_du_compte === "enattente") {
          res.render("index", { page: "login", statu: "", errorMessage: "Votre compte est en cours de validation" });
        }
        else if (utilisateurTrouve.etat_du_compte === "bloquee") {
          res.render("index", { page: "login", statu: "", errorMessage: "Votre compte est bloqué" });
        }





      } else {
        res.render("index", { page: "login", statu: "", errorMessage: "Cette adresse email n'est pas reconnue" });
      }
    }
  });
};

exports.postReset = (req, res) => {
  const nipreset = `${req.body.organisationreset}-${req.body.nipreset}`;
  const emailreset = req.body.emailreset;
  let newPassword;
  selecteUtilisateur("lesutilisateurs", (err, datas) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    } else {
      const utilisateurExistant = datas.find((element) => element.nip === nipreset && element.email === emailreset);
      if (utilisateurExistant) {
        // Le NIP et l'e-mail existent

        // Hacher le mot de passe avec bcrypt

        // Mise à jour du mot de passe dans la base de données
        const sql = `UPDATE lesutilisateurs SET needreinitialisation=? WHERE id=?`;
        csca_bd.query(sql, [1, utilisateurExistant.id], (error) => {
          if (error) {
            console.error(error);
            res.status(500).send("Erreur serveur");
          } else {
            res.render("index", { page: "reset", errorMessage: "", successMessage: `Nous allons réinitialiser votre mot de passe, veuillez consulter votre boîte mail plus tard: (${utilisateurExistant.email})` });
          }
        });
      } else {
        res.render("index", { page: "reset", errorMessage: "Le numéro d'identification personnel et/ou email ne sont pas reconnus.", successMessage: "" });
      }
    }
  });

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

  // Fonction pour envoyer un e-mail
  
}
function connecte_statut_on(id) {
  csca_bd.query("UPDATE lesutilisateurs SET conncte_stat=? WHERE id=?", [1, id], (err) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(`${id} est connecté`)
    }
  })
}
