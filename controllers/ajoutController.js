const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const http = require('http');
const url = require('url');
const { selecteUtilisateur,registerUtilisateur, csca_bd, userCurent, userCurrentmdp,selecteDonnee } = require('../basedenne/Mon_dataBase');


exports.postAjoutdossier = async  (req, res) => {
    const entiteUser = req.session.userEntite
    const datearrivee = req.body.datearrivee
    const numeropv = req.body.numeropv
    const numerorp = req.body.numerorp
    const infraction = req.body.infraction
    const demandeur = req.body.demandeur
    const objetdedemande = req.body.objetdedemande
    const date1ere = req.body.date1ere
    const date2eme = req.body.date2eme
    const lieu = req.body.lieu
    const datas = ['', datearrivee, numeropv, numerorp, infraction, demandeur, objetdedemande, date1ere, date2eme, lieu, entiteUser]
    csca_bd.query("INSERT INTO ajoutdedossier(id, datearrivee, numeropv, numerorp, infraction, demandeur, objetdedemande, date1ere, date2eme, lieu, entite) VALUES (?,?,?,?,?,?,?,?,?,?,?)", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            let tabs = []
                if(req.session.userEntite==="siege"){
                tabs = [
                'confirmationdesaisie',
                'mainlevee',
                'oppositionauxos',
                'confiscationcsca',
                'oppositionauxconfiscationcsca']
                }
                else if(req.session.userEntite==="parquet"){
                tabs = [
                'bienmobilier',
                'bienimmobilier',
                'comptebancaire',
                'personnephysique',
                'personnemorale']
                }
                selecteDonnee('ajoutdedossier',(err,lesdonnees)=>{
                    if(err){
                      console.log(err)
                    }
                    else{
                        let lasteId=333
                        lesdonnees.forEach((ledonnee)=>{
                            lasteId=ledonnee.id
                        })
                        tabs.forEach((tab)=>{
                            csca_bd.query(`INSERT INTO ${tab}(referencecsca) VALUES (?)`,[`${lasteId}/CSCA`], (err) => {  })
                        })
                    }
                })
            res.redirect("/listeDossier")
        }
    })
}
exports.postModificationdossier = (req, res) => {
    const id_dossier = parseInt(req.body.id_dossier)
    const datearrivee = req.body.datearrivee
    const numeropv = req.body.numeropv
    const numerorp = req.body.numerorp
    const infraction = req.body.infraction
    const demandeur = req.body.demandeur
    const objetdedemande = req.body.objetdedemande
    const date1ere = req.body.date1ere
    const date2eme = req.body.date2eme
    const lieu = req.body.lieu
    const datas = [datearrivee, numeropv, numerorp, infraction, demandeur, objetdedemande, date1ere, date2eme, lieu,id_dossier]
    csca_bd.query("UPDATE ajoutdedossier SET datearrivee=?,numeropv=?,numerorp=?,infraction=?,demandeur=?,objetdedemande=?,date1ere=?,date2eme=?,lieu=? WHERE id=?", datas, (err,sesultat) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/listeDossier")
        }
    })
}
exports.postbienMobilier = (req, res) => {
    const referencecsca = req.body.id_csca
    const type = req.body.type
    const marque = req.body.marque
    const immatriculation = req.body.immatriculation
    const nature = req.body.nature
    const valeur_estimative = req.body.valeur_estimative
    const datas = [type, marque, immatriculation, valeur_estimative, nature,referencecsca]
    csca_bd.query("UPDATE bienmobilier SET type=?, marque=?, Immatriculation=?, valeurestimatif=?, Nature=? WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/parquet?d=${d}&ajout=BienMobilier`)
        }
    })
}
exports.postbienImmobilier = (req, res) => {
    const referencecsca = req.body.id_csca
    const type = req.body.type
    const nature = req.body.nature
    const titre = req.body.titre
    const superficie = req.body.superficie
    const valeur_estimative = req.body.valeur_estimative
    const datas = [type, nature, superficie, titre, valeur_estimative,referencecsca]
    csca_bd.query("UPDATE bienimmobilier SET type=?, nature=?, superficie=?, titre=?, valeurestimatif=? WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/parquet?d=${d}&ajout=BienImmobilier`)
        }
    })
}
exports.postcompteBancaire = (req, res) => {
    const referencecsca = req.body.id_csca
    const natureducompte = req.body.natureducompte
    const numerodecompte = req.body.numerodecompte
    const domiciliations = req.body.domiciliations
    const valeurgeleeestimee = req.body.valeurgeleeestimee
    const datas = [natureducompte, numerodecompte, valeurgeleeestimee, domiciliations,referencecsca]
    csca_bd.query("UPDATE comptebancaire SET naturecompte=?, numcompte=?, domiciliations=?, valeurgeleestimee=? WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/parquet?d=${d}&ajout=CompteBancaire`)
        }
    })
}
exports.postpersonnePhysique = (req, res) => {
    const referencecsca = req.body.id_csca
    const nomindividu = req.body.nomindividu
    const age = req.body.age
    const sexe = req.body.sexe
    const cinpasseport = req.body.cinpasseport
    const nationalite = req.body.nationalite
    const fonctionindividu = req.body.fonctionindividu
    const datas = [nomindividu, age, sexe, cinpasseport, nationalite, fonctionindividu,referencecsca]
    csca_bd.query("UPDATE personnephysique SET nom=?, age=?, sexe=?, cinpasseport=?, nationalite=?, fonction=? WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/parquet?d=${d}&ajout=Personnephysique`)
        }
    })
}
exports.postpersonneMorale = (req, res) => {
    const referencecsca = req.body.id_csca
    const raisonsociale = req.body.raisonsociale
    const formejuridique = req.body.formejuridique
    const numerocartefiscale = req.body.numerocartefiscale
    const numerocartefiscalestatistique = req.body.numerocartefiscalestatistique
    const datas = [raisonsociale, formejuridique, numerocartefiscale, numerocartefiscalestatistique,referencecsca]
    csca_bd.query("UPDATE personnemorale SET raisonsociale=?, formejuridique=?, numerofiscale=?, numerocartestatistique=? WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/parquet?d=${d}&ajout=PersonneMorale`)
        }
    })
}
exports.postConfirmationdesaisie = (req, res) => {
    const referencecsca = req.body.id_csca
    const datearrivee = req.body.datearrivee
    const infraction = req.body.infraction
    const numeropv = req.body.numeropv
    const decision = req.body.decision
    const demandeur = req.body.demandeur
    const datas = [datearrivee, infraction, numeropv, decision, demandeur,referencecsca]
    csca_bd.query("UPDATE confirmationdesaisie SET datearrivee=? ,infraction=? ,numpv=? ,decision=? ,demande=?  WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/siege?d=${d}&ajout=Confirmationdesaisie`)
        }
    })
}
exports.postMainlevee = (req, res) => {
    const referencecsca = req.body.id_csca
    const datearrivee = req.body.datearrivee
    const demandepar = req.body.demandepar
    const decision = req.body.decision
    const datas = [datearrivee, demandepar, decision,referencecsca]
    csca_bd.query("UPDATE mainlevee SET datearrivee=?, demande=?, decision=? WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/siege?d=${d}&ajout=Mainlevée`)
        }
    })
}
exports.postOOS = (req, res) => {
    const referencecsca = req.body.id_csca
    const datearrivee = req.body.datearrivee
    const demande = req.body.demande
    const decision = req.body.decision
    const datas = [datearrivee, demande, decision,referencecsca]
    csca_bd.query("UPDATE oppositionauxos SET datearrivee=?, demande=?, decision=? WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/siege?d=${d}&ajout=Oppositionauxopérationssuspects`)
        }
    })
}
exports.postConfiscatonCSCA = (req, res) => {
    const referencecsca = req.body.id_csca
    const datearrivee = req.body.datearrivee
    const dateJugement = req.body.dateJugement
    const natureJugement = req.body.natureJugement
    const demandePar = req.body.demandePar
    const decision = req.body.decision
    const datas = [datearrivee, dateJugement, natureJugement, demandePar, decision,referencecsca]
    csca_bd.query("UPDATE confiscationcsca SET datearrivee=?, datejugement=?, nature=?, demande=?, decision=? WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/siege?d=${d}&ajout=ConfiscatonCSCA`)
        }
    })
}
exports.postOpositionauxConfiscatonCSCA = (req, res) => {
    const referencecsca = req.body.id_csca
    const dateArriveeCSCA = req.body.dateArriveeCSCA
    const dateOpposition = req.body.dateOpposition
    const numeroDecisionObjetOpposition = req.body.numeroDecisionObjetOpposition
    const demandePar = req.body.demandePar
    const decision = req.body.decision
    const datas = [dateArriveeCSCA, dateOpposition, numeroDecisionObjetOpposition, demandePar, decision,referencecsca]
    csca_bd.query("UPDATE oppositionauxconfiscationcsca SET datearrivee=?, dateopposition=?, numdecisionobjetopposition=?, demande=?, decision=? WHERE referencecsca=?", datas, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            d=parseInt(referencecsca.split("/")[0])
            res.redirect(`/siege?d=${d}&ajout=OpositionauxConfiscatonCSCA`)
        }
    })
}