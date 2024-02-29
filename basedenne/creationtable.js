const mysql = require('mysql');
// const csca_bd = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "csca",
// })
// csca_bd.connect()
const admin_login = `CREATE TABLE admin_login (
  id int NOT NULL AUTO_INCREMENT,
  pseudo varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  password varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  photo varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (id)
 ) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const ajoutdedossier = `CREATE TABLE ajoutdedossier (
 id int NOT NULL AUTO_INCREMENT,
 datearrivee varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
 numeropv varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
 numerorp varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
 infraction varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
 demandeur varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
 objetdedemande varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
 date1ere varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
 date2eme varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
 lieu varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
 entite varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
 PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const bienimmobilier = `CREATE TABLE bienimmobilier (
  referencecsca varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  type varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  nature varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  superficie varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  titre varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  valeurestimatif varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'parquet',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`


const bienmobilier = `CREATE TABLE bienmobilier (
  referencecsca varchar(24) COLLATE utf8mb4_general_ci NOT NULL,
  type varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  marque varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  Immatriculation varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  valeurestimatif varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  Nature varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'parquet',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`


const comptebancaire = `CREATE TABLE comptebancaire (
  referencecsca varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  naturecompte varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  numcompte varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  domiciliations varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  valeurgeleestimee varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'parquet',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const confirmationdesaisie = `CREATE TABLE confirmationdesaisie (
  referencecsca varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  datearrivee varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  infraction varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  numpv varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  decision varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  demande varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'siege',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const confiscationcsca = `CREATE TABLE confiscationcsca (
  referencecsca varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  datearrivee varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  datejugement varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  nature varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  demande varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  decision varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'siege',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const lesutilisateurs = `CREATE TABLE lesutilisateurs (
  id int NOT NULL AUTO_INCREMENT,
  nip varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  fonction varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  nom text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  prenom text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  email varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  motdepasse varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  photo varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'profil.png',
  conncte_stat tinyint(1) DEFAULT '0',
  etat_du_compte varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'enattente',
  nb_connecte int DEFAULT '0',
  needreinitialisation int NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
 ) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const mainlevee = `CREATE TABLE mainlevee (
  referencecsca varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  datearrivee varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  demande varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  decision varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'siege',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const oppositionauxconfiscationcsca = `CREATE TABLE oppositionauxconfiscationcsca (
  referencecsca varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  datearrivee varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  dateopposition varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  numdecisionobjetopposition varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  demande varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  decision varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'siege',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const oppositionauxos = `CREATE TABLE oppositionauxos (
  referencecsca varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  datearrivee varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  demande varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  decision varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'siege',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const personnemorale = `CREATE TABLE personnemorale (
  referencecsca varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  raisonsociale varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  formejuridique varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  numerofiscale varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  numerocartestatistique varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'parquet',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const personnephysique = `CREATE TABLE personnephysique (
  referencecsca varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  nom varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  age varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  sexe varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  cinpasseport varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  nationalite varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  fonction varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  entite varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'parquet',
  PRIMARY KEY (referencecsca)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

const lestables = {'admin_login':admin_login, 'ajoutdedossier': ajoutdedossier, 'bienimmobilier': bienimmobilier, 'bienmobilier': bienmobilier, 'comptebancaire': comptebancaire, 'confirmationdesaisie': confirmationdesaisie, 'confiscationcsca': confiscationcsca, 'lesutilisateurs': lesutilisateurs, 'mainlevee': mainlevee, 'oppositionauxconfiscationcsca': oppositionauxconfiscationcsca, 'oppositionauxos': oppositionauxos, 'personnemorale': personnemorale, 'personnephysique': personnephysique }

// Vérifie si la base de données existe déjà
function sibasededonneexiste(base_de_donnee, lestables, globale_bd) {

  let query = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${base_de_donnee}'`;
  globale_bd.query(query, (err, result) => {
    if (err) {
      console.log(" ()=> " + err);
      return;
    }
    if (result.length === 0) {
      // La base de données n'existe pas, on la crée
      let createDbQuery = `CREATE DATABASE ${base_de_donnee}`;
      globale_bd.query(createDbQuery, (err, result) => {
        if (err) {
          console.log("Erreur de creation de Base de données : " + err);
          return;
        }
        console.log(`Base de données '${base_de_donnee}' créée`);
      });
    } else {
      console.log(`Base de données '${base_de_donnee}' déjà existante`);
    }
  });
  // Vérifie si la table ajoutdossier existe déjà
  const new_bd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: base_de_donnee,
  })
  // let etat_bd=''
  for (let [nom_letable, creat_letable] of Object.entries(lestables)) {
    query = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${nom_letable}' AND TABLE_SCHEMA = '${base_de_donnee}'`;
    new_bd.query(query, (err, result) => {
      if (err) {
        console.log("Erreur de connexion Globale : " + err);
        return;
      }
      if (result.length === 0) {
        // La table n'existe pas, on la crée
        new_bd.query(creat_letable, (err, result) => {
          if (err) {
            console.log("Erreur de creation de Table : " + err);
            etat_bd='non ok'
            return;
          }
          console.log(`Table '${nom_letable}' créée`);
          // etat_bd='ok'
        });
      } else {
        console.log(`Table '${nom_letable}' déjà existante`);
        // etat_bd='ok'
      }
    });
  }
}
module.exports = { lestables, sibasededonneexiste }