const mysql = require('mysql');
const { lestables, sibasededonneexiste } = require('./creationtable');

const globale_bd = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

globale_bd.connect((err) => {
  if (err) {
    console.log(err);
    return
  }
  sibasededonneexiste("csca", lestables, globale_bd)

})
const csca_bd = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "csca",
})
csca_bd.connect((err) => {
  if (err) { console.log(err) }
  else { console.log("Tena connecte tokoa") }
})

function selecteUtilisateur(nom_de_la_table, callback) {
  csca_bd.query(`SELECT * FROM \`${nom_de_la_table}\``, (err, datas) => {
    if (err) {
      callback(err, null)
    }
    else {
      callback(null, datas)
    }
  })
}
function selecteDonnee(nom_de_la_table, callback) {
  csca_bd.query(`SELECT * FROM \`${nom_de_la_table}\``, (err, datas) => {
    if (err) {
      callback(err, null)
    }
    else {
      callback(null, datas)
    }
  })
}

// function selecteDossier_by_Id(id,callback) {
//   csca_bd.query(`SELECT * FROM ajoutdedossier WHERE id=?`,[id], (err, datas) => {
//     if (err) {
//       callback(err, null)
//     }
//     else {
//       callback(null, datas)
//     }
//   })
// }
// const selecteDossier_by_Id = function(id) {
//   // try {
//   //   const result = csca_bd.query(`SELECT * FROM ajoutdedossier WHERE id = ?`, [id]);
//   //   if (result.length === 0) {
//   //     throw new Error(`Dossier introuvable avec l'identifiant ${id}`);
//   //   }
//   //   return result;
//   // } catch (error) {
//   //   console.error(error);
//   //   throw error;
//   // }
// csca_bd.query(`SELECT * FROM ajoutdedossier WHERE id = ?`, [id], (err, datas) => {
//     if (err) {
//       console.log(err);
//     } else {
//       return datas
//     }
//   });
// }
const selecteDossier_by_Id = async function (id) {
  return new Promise((resolve, reject) => {
    csca_bd.query(`SELECT * FROM ajoutdedossier WHERE id = ?`, [id], (err, datas) => {
      if (err) {
        reject(err);
      } else {
        resolve(datas);
      }
    });
  });
};
const LesEntites_by_Id = function (nom_de_la_table, id) {
  return new Promise((resolve, reject) => {
    csca_bd.query(`SELECT * FROM \`${nom_de_la_table}\` WHERE referencecsca = ?`, [id], function (err, datas) {
      if (err) {
        reject(err);
      } else {
        resolve(datas)
      }
    });
  })
};

function selecteDonnee_by_refCsca(nom_de_la_table, referencecsca, callback) {
  csca_bd.query(`SELECT * FROM \`${nom_de_la_table}\` WHERE referencecsca=?`, [referencecsca], (err, datas) => {
    if (err) {
      callback(err, null)
    }
    else {
      callback(null, datas)
    }
  })
}
function registerUtilisateur(datas) {
  csca_bd.query("INSERT INTO lesutilisateurs(id, pseudo, email, motdepasse) VALUES (?,?,?,?)", datas, (err) => {
    if (err) throw err
  })
}
function adminCurrent(id, callback) {
  csca_bd.query(`SELECT * FROM admin_login WHERE id = ?`, [id], (err, datas) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, datas);
    }
  });
};
function userCurrent(id, callback) {
  csca_bd.query(`SELECT * FROM lesutilisateurs WHERE id = ?`, [id], (err, datas) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, datas);
    }
  });
};
async function essai(id) {
  csca_bd.query('SELECT * FROM lesutilisateurs WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      if (result.length === 0) {
        callback(new Error('Utilisateur non trouvé'), null);
      } else {
        const user = {
          id: result[0].id,
          motdepasse: result[0].motdepasse
        };
        callback(null, user);
      }
    }
  });
};
function userCurrentmdp(id, callback) {
  csca_bd.query('SELECT id, motdepasse FROM lesutilisateurs WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      if (result.length === 0) {
        callback(new Error('Utilisateur non trouvé'), null);
      } else {
        const user = {
          id: result[0].id,
          motdepasse: result[0].motdepasse
        };
        callback(null, user);
      }
    }
  });
}

module.exports = { LesEntites_by_Id, essai, csca_bd, adminCurrent, selecteUtilisateur, registerUtilisateur, userCurrent, userCurrentmdp, selecteDonnee, selecteDonnee_by_refCsca, selecteDossier_by_Id }