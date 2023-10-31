const express = require('express');
const {selecteUtilisateur,registerUtilisateur} = require('./basedenne/Mon_dataBase');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 8000;

app.use(session({
    secret: "my-secret-key",
    resave: true,
    saveUninitialized: true,
  }));

app.use(express.urlencoded({extended:false}))


app.use(express.static("./static/"))

app.set("view engine","ejs")
app.set("views","./")

app.get('/', (req, res) => {
    res.status(200).redirect("/login")
});
app.get('/:page', (req, res) => {
    let { page } = req.params;
    let statu = '';
    let trouve=true
    if (page === 'login') {statu = "Je dois me connecter";}
    else if (page === 'register'){statu = "Je dois m'inscrire";}
    else if (page === 'home'){statu = "Connecté";}
    else if (page === 'reset'){statu = "reset";}
    else {
        statu = "404 - Page not found";
        page="erreur"
        res.status(404).render('index', { statu, page });
        trouve=false
    }
    if(trouve===true){res.status(200).render('index', { statu, page });}
});

app.post("/login",(req,res)=>{
    selecteUtilisateur("lesutilisateurs",(err,datas)=>{
        let userFound = false;
        for(const element of datas){
                if(element.pseudo === req.body.pseudoutilisateur || element.email === req.body.pseudoutilisateur){
                    if(element.motdepasse===req.body.motdepassutilisateur){
                        userFound = true;
                        res.redirect("/home")
                        return;
                    }

                }
         }
         if (!userFound) {
            res.redirect("/login")}
    })
})

app.post("/register",(req,res)=>{
    let donnes = ["",req.body.pseudo,req.body.email,req.body.motdepass]
    try{
        registerUtilisateur(donnes)
        res.redirect("/register")
    }catch{
        console.log("misy erreur")
    }
})

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});