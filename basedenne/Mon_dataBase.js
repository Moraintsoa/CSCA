const mysql = require('mysql');
const csca_bd = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"csca",
})

csca_bd.connect((err)=>{
    if(err){console.log(err)}
    else{console.log("Tena connecte tokoa")}
})
function selecteUtilisateur(nom_de_la_table,callback){
    csca_bd.query(`SELECT * FROM \`${nom_de_la_table}\``,(err,datas)=>{
        if(err){
            callback(err,null)
        }
        else{
            callback(null,datas)
        }
    })
}
function registerUtilisateur(datas){
    csca_bd.query("INSERT INTO lesutilisateurs(id, pseudo, email, motdepasse) VALUES (?,?,?,?)",datas,(err)=>{
        if(err)throw err
    })
}
function userCurrent(id, callback){
    csca_bd.query(`SELECT * FROM lesutilisateurs WHERE id = ?`, [id], (err, datas) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, datas);
      }
    });
  };
  
module.exports={csca_bd,selecteUtilisateur,registerUtilisateur,userCurrent}