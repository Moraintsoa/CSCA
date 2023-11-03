const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const { selecteUtilisateur, registerUtilisateur, csca_bd,userCurent } = require('../basedenne/Mon_dataBase');

// ...

// Gestion de la soumission du formulaire d'inscription
exports.postRegister = (req, res) => {
  const nip = `${req.body.organisation}-${req.body.nip}`;
  const email = req.body.email;
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
            const donnees = [null, nip, nom, prenom, email, hash];
            csca_bd.query("INSERT INTO lesutilisateurs(id, nip, nom, prenom, email, motdepasse) VALUES (?, ?, ?, ?, ?, ?)", donnees, (err) => {
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
        // Comparer le mot de passe haché avec le mot de passe saisi
        bcrypt.compare(motDePasse, utilisateurTrouve.motdepasse, (err, result) => {
          if (result) {
            req.session.userId = utilisateurTrouve.id;
            res.redirect("/home");
          } else {
            res.render("index", { page: "login", statu: "", errorMessage: "Mot de passe incorrect" });
          }
        });
      } else {
        res.render("index", { page: "login", statu: "", errorMessage: "Cette adresse email n'est pas reconnue" });
      }
    }
  });
};

// Gestion de reinitialisation de mot de passe
// exports.postReset = (req, res) => {
//   const nipreset = `${req.body.organisationreset}-${req.body.nipreset}`;
//   const emailreset = req.body.emailreset;

//   selecteUtilisateur("lesutilisateurs", (err, datas) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Erreur serveur");
//     }else {
//       const utilisateurExistantNIP = datas.find((element) => element.nip === nipreset);
//       const utilisateurExistantEmail = datas.find((element) => element.email === emailreset);
//       if (utilisateurExistantNIP && utilisateurExistantEmail) {
//         // Le NIP et l'email existent
//         // Ici je veux un code qui réinitialise le mot de passe de l'utilisateur. un mot de passe generer automatique composee des 10 caractere exadecimal.
//         // mais avant de l'enregistere il faut que le mot de passe soit hasher par bcrypt.
//         // et que un email qui contient le mot de passe claire soit envoyer a l'utilisateur pour qu'il puisse reinitialiser son mot de passe.
//         res.render("index", { page: "reset", errorMessage:"",successMessage:`Votre mot de passe a été réinitialisé, veuillez consulter votre boîte mail: \(${emailreset}\)`});
//       } else if (utilisateurExistantNIP && !utilisateurExistantEmail) {
//         // Seul le NIP existe déjà
//         res.render("index", { page: "reset", errorMessage: "L'email n'est pas reconnu.", successMessage: "" });
//       } else if (utilisateurExistantEmail && !utilisateurExistantNIP) {
//         // Seul l'email existe déjà
//         res.render("index", { page: "reset", errorMessage: "Le numéro d'identification personnel n'est pas reconnu.", successMessage: "" });
//       } else {
//         res.render("index", { page: "reset", errorMessage: "Le numéro d'identification personnel et email ne sont pas reconnu.", successMessage: "" });
//       }
//     }
//   })
// }
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

        // Générer un mot de passe aléatoire de 10 caractères hexadécimaux
        const newPassword = generateRandomPassword(10);

        // Hacher le mot de passe avec bcrypt
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
          if (err) {
            console.error(err);
            res.status(500).send("Erreur serveur");
          } else {
            // Mise à jour du mot de passe dans la base de données
            const sql = `UPDATE lesutilisateurs SET motdepasse = ? WHERE nip = ? AND email = ?`;
            csca_bd.query(sql, [hashedPassword, nipreset, emailreset], (error, results) => {
              if (error) {
                console.error(error);
                res.status(500).send("Erreur serveur");
              } else {
                // Envoyer un e-mail à l'utilisateur avec le mot de passe clair
                sendEmail(emailreset, newPassword);

                res.render("index", { page: "reset", errorMessage: "", successMessage: `Votre mot de passe a été réinitialisé, veuillez consulter votre boîte mail: (${emailreset})` });
              }
            });
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
  function sendEmail(email, password) {
    // Configurer le transporteur SMTP pour l'envoi d'e-mails (utilisez vos propres informations SMTP)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,//587
      secure: true, // Utilisation d'une connexion sécurisée avec SSL/TLS
      auth: {
        user: 'renelmoraintsoa@gmail.com',
        pass: 'renelavao0310..'
      }
    });

    const mailOptions = {
      from: 'renelmoraintsoa@gmail.com',
      to: email,
      subject: 'Réinitialisation de mot de passe',
      text: `Votre nouveau mot de passe est : ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        // Gérer les erreurs d'envoi d'e-mail ici
      } else {
        console.log('E-mail envoyé : ' + info.response);
      }
    });
  }
}
