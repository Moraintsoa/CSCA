
const PDFDocument = require("pdfkit")
const {} = require("puppeteer")
const fs = require("fs")
const path = require("path")
const {Contenue_Dossier} = require("./Les_textes")
const {csca_bd,selecteDonnee_by_refCsca,selecteDossier_by_Id} = require("../basedenne/Mon_dataBase")
const bleu = "#032F54"






const LeDossier = new PDFDocument({ size: "A4",font:"Times-Roman",align:"center"});

// Création du document PDF A4 595x842

function Entete() { 
        // Ajout de lesimage
const justice = path.join(__dirname, '../static', 'img/pdf_image/justice.png')
const republique = path.join(__dirname, '../static', 'img/pdf_image/republique.jpg')
const pac = path.join(__dirname, '../static', 'img/pdf_image/pac.png')
LeDossier
        .image(justice, 35, 70, {fit:[60,60]})
        .image(republique, 248.1, 20, {fit:[98.79,70]})
        .image(pac, 500, 70, {fit:[60,60]});
        // LeDossier.y=110
LeDossier.font("Times-Roman")
        .fontSize(12)
        .text("DIRECTION DE COORDINATION NATIONALE DES PÔLES ANTI-CORRUPTION",172.5,110,{width:250,align:"center",})
LeDossier.text("------------------------",172.5,140,{width:250,align:"center",})
LeDossier.font("Times-Bold")
        .fontSize(14)
        .text("CHAMBRE DE SAISIE ET CONFISCATION DES AVOIRS (CSCA)",172.5,170,{width:250,align:"center"})
}
        



        
        

function remplieDossier(idio){
selecteDossier_by_Id(idio,(err,donnees)=>{
        if(err){throw err}
        else{
LeDossier.font("Times-Bold")
        .fontSize(12)
        .text(`${donnees.datearrivee}`,135,271,{})
        .text(`${donnees.numeropv}`,313,271,{})
        .text(`${donnees.numerorp}`,498,271,{width:50})
        .text(`${donnees.infraction}`,115,285,{})
        .text(`${donnees.demandeur}`,145,298,{})
        .text(`${donnees.objetdedemande}`,385,298,{})
        .text(`${donnees.date1ere}`,155,311,{})
        .text(`${donnees.date2eme}`,385,311,{})
        .text(`${donnees.lieu}`,165,324,{})
}})}
function Parquet(id){
console.log("De niditra am Parquet")
Entete()
remplieDossier(id)
LeDossier.font("Times-Roman")
        .fontSize(12)
        .text(`Dossier N°${id}/CSCA/Parquet`,172.5,220,{width:250,align:"center",})
        
        LeDossier.font("Times-Roman")
        .fontSize(12)
        .text(Contenue_Dossier,35,270,{width:525,align:"left",})
        
selecteDonnee_by_refCsca('bienmobilier',`${id}/CSCA`,(err,donnees)=>{
if(err){throw err}
else{
LeDossier
        .rect(35,360,525,30)
        .fillColor(bleu)
        .fill()
        .font("Times-Bold")
        .fontSize(14)
        .fillColor("white")
        .text("Bien Mobilier",45,370,{})
LeDossier
.rect(35,390,525,150)
.fillOpacity(.5)
.fillColor(bleu)
.fill()
.fillOpacity(1)
.font("Times-Roman")
.fontSize(12)
.fillColor("black")
.text(`Type : ${donnees.type}`,45,400,{})
.text(`Marque : ${donnees.marque}`,300,400,{})
.text(`Immatriculation : ${donnees.Immatriculation}`,45,450,{})
.text(`Nature : ${donnees.Nature}`,300,450,{})
.text(`Valeur estimative : ${donnees.valeurestimatif}`,45,500,{}) }})

selecteDonnee_by_refCsca('bienimmobilier',`${id}/CSCA`,(err,donnees)=>{
        if(err){throw err}
        else{
LeDossier
        .rect(35,560,525,30)
        .fillColor(bleu)
        .fill()
        .font("Times-Bold")
        .fontSize(14)
        .fillColor("white")
        .text("Bien Immobilier",45,570,{})
LeDossier
.rect(35,590,525,150)
.fillOpacity(.5)
.fillColor(bleu)
.fill()
.fillOpacity(1)
.font("Times-Roman")
.fontSize(12)
.fillColor("black")
.text(`Villa : ${donnees.type}`,45,600,{})
.text(`Nature : ${donnees.nature}`,300,600,{})
.text(`Titre : ${donnees.titre}`,45,650,{})
.text(`Superficie : ${donnees.superficie}`,300,650,{})
.text(`Valeur estimative : ${donnees.valeurestimatif}`,45,700,{})}})


LeDossier.addPage()
selecteDonnee_by_refCsca('comptebancaire',`${id}/CSCA`,(err,donnees)=>{
        if(err){throw err}
        else{
LeDossier
        .rect(35,40,525,30)
        .fillColor(bleu)
        .fill()
        .font("Times-Bold")
        .fontSize(14)
        .fillColor("white")
        .text("Compte Bancaire",45,50,{})
LeDossier
.rect(35,70,525,150)
.fillOpacity(.5)
.fillColor(bleu)
.fill()
.fillOpacity(1)
.font("Times-Roman")
.fontSize(12)
.fillColor("black")
.text(`Nature du compte : ${donnees.naturecompte}`,45,80,{})
.text(`Numéro de Compte : ${donnees.numcompte}`,300,80,{})
.text(`Domiciliations : ${donnees.domiciliations}`,45,130,{})
.text(`Valeur gelée estimée : ${donnees.valeurgeleestimee}`,300,130,{})}})

selecteDonnee_by_refCsca('personnephysique',`${id}/CSCA`,(err,donnees)=>{
        if(err){throw err}
        else{
LeDossier
        .rect(35,300,525,30)
        .fillColor(bleu)
        .fill()
        .font("Times-Bold")
        .fontSize(14)
        .fillColor("white")
        .text("Personne physique",45,310,{})
LeDossier
.rect(35,330,525,150)
.fillOpacity(.5)
.fillColor(bleu)
.fill()
.fillOpacity(1)
.font("Times-Roman")
.fontSize(12)
.fillColor("black")
.text(`Nom de l'individu : ${donnees.nom}`,45,340,{})
.text(`Âge : ${donnees.age}`,300,340,{})
.text(`Sexe : ${donnees.sexe}`,45,390,{})
.text(`CIN ou Passeport : ${donnees.cinpasseport}`,300,390,{})
.text(`Nationalité : ${donnees.nationalite}`,45,440,{})
.text(`Fonction de l'individu : ${donnees.fonction}`,300,440,{})}})


selecteDonnee_by_refCsca('personnemorale',`${id}/CSCA`,(err,donnees)=>{
        if(err){throw err}
        else{
LeDossier
        .rect(35,550,525,30)
        .fillColor(bleu)
        .fill()
        .font("Times-Bold")
        .fontSize(14)
        .fillColor("white")
        .text("Personne morale",45,560,{})
LeDossier
.rect(35,580,525,150)
.fillOpacity(.5)
.fillColor(bleu)
.fill()
.fillOpacity(1)
.font("Times-Roman")
.fontSize(12)
.fillColor("black")
.text(`Raison sociale : ${donnees.raisonsociale}`,45,590,{})
.text(`Forme juridique : ${donnees.formejuridique}`,300,590,{})
.text(`Numéro carte fiscale : ${donnees.numerofiscale}`,45,640,{})
.text(`Numéro carte fiscale statistique : ${donnees.numerocartestatistique}`,300,640,{})}})

// Enregistrement du document
LeDossier.pipe(fs.createWriteStream("Parquet_Document.pdf"));
LeDossier.end();
}

function Siege(id){
Entete()
remplieDossier(id)
    LeDossier.font("Times-Roman")
            .fontSize(12)
            .text(`Dossier N°${id}/CSCA/Siege`,172.5,220,{width:250,align:"center",})
    
    LeDossier.font("Times-Roman")
            .fontSize(12)
            .text(Contenue_Dossier,35,270,{width:525,align:"left",})
    
selecteDonnee_by_refCsca('confirmationdesaisie',`${id}/CSCA`,(err,donnees)=>{
if(err){throw err}
else{
    LeDossier
            .rect(35,360,525,30)
            .fillColor(bleu)
            .fill()
            .font("Times-Bold")
            .fontSize(14)
            .fillColor("white")
            .text("Confirmation de saisie",45,370,{})
    LeDossier
    .rect(35,390,525,150)
    .fillOpacity(.5)
    .fillColor(bleu)
    .fill()
    .fillOpacity(1)
    .font("Times-Roman")
    .fontSize(12)
    .fillColor("black")
    .text(`Date d’arrivée à la CSCA : ${donnees.datearrivee}`,45,400,{})
    .text(`Infraction : ${donnees.infraction}`,300,400,{})
    .text(`Numero de PV : ${donnees.numpv}`,45,450,{})
    .text(`Decision : ${donnees.decision}`,300,450,{})
    .text(`Demandeur : ${donnees.demande}`,45,500,{})}})
    
selecteDonnee_by_refCsca('mainlevee',`${id}/CSCA`,(err,donnees)=>{
        if(err){throw err}
        else{
    LeDossier
            .rect(35,560,525,30)
            .fillColor(bleu)
            .fill()
            .font("Times-Bold")
            .fontSize(14)
            .fillColor("white")
            .text("Mainlevée",45,570,{})
    LeDossier
    .rect(35,590,525,150)
    .fillOpacity(.5)
    .fillColor(bleu)
    .fill()
    .fillOpacity(1)
    .font("Times-Roman")
    .fontSize(12)
    .fillColor("black")
    .text(`Date d’arrivée à la CSCA : ${donnees.datearrivee}`,45,600,{})
    .text(`Demandé par : ${donnees.demande}`,300,600,{})
    .text(`Décision : ${donnees.decision}`,45,650,{})}})
    
    
    LeDossier.addPage()
selecteDonnee_by_refCsca('oppositionauxos',`${id}/CSCA`,(err,donnees)=>{
        if(err){throw err}
        else{
    LeDossier
            .rect(35,40,525,30)
            .fillColor(bleu)
            .fill()
            .font("Times-Bold")
            .fontSize(14)
            .fillColor("white")
            .text("Opposition aux opérations suspects",45,50,{})
    LeDossier
    .rect(35,70,525,150)
    .fillOpacity(.5)
    .fillColor(bleu)
    .fill()
    .fillOpacity(1)
    .font("Times-Roman")
    .fontSize(12)
    .fillColor("black")
    .text(`Date d’arrivée à la CSCA : ${donnees.datearrivee}`,45,80,{})
    .text(`Demande : ${donnees.demande}`,300,80,{})
    .text(`Décisions Prorogation : ${donnees.decision}`,45,130,{})}})
    
selecteDonnee_by_refCsca('confiscationcsca',`${id}/CSCA`,(err,donnees)=>{
        if(err){throw err}
        else{
    LeDossier
            .rect(35,300,525,30)
            .fillColor(bleu)
            .fill()
            .font("Times-Bold")
            .fontSize(14)
            .fillColor("white")
            .text("Confiscaton CSCA",45,310,{})
    LeDossier
    .rect(35,330,525,150)
    .fillOpacity(.5)
    .fillColor(bleu)
    .fill()
    .fillOpacity(1)
    .font("Times-Roman")
    .fontSize(12)
    .fillColor("black")
    .text(`Date d’arrivée à la CSCA : ${donnees.datearrivee}`,45,340,{})
    .text(`Date de Jugement : ${donnees.datejugement}`,300,340,{})
    .text(`Nature du Jugement : ${donnees.nature}`,45,390,{})
    .text(`Demandé par : ${donnees.demande}`,300,390,{})
    .text(`Décisions : ${donnees.decision}`,45,440,{})}})
    
    
selecteDonnee_by_refCsca('oppositionauxconfiscationcsca',`${id}/CSCA`,(err,donnees)=>{
        if(err){throw err}
        else{
    LeDossier
            .rect(35,550,525,30)
            .fillColor(bleu)
            .fill()
            .font("Times-Bold")
            .fontSize(14)
            .fillColor("white")
            .text("Oposition aux Confiscaton CSCA",45,560,{})
    LeDossier
    .rect(35,580,525,150)
    .fillOpacity(.5)
    .fillColor(bleu)
    .fill()
    .fillOpacity(1)
    .font("Times-Roman")
    .fontSize(12)
    .fillColor("black")
    .text(`Date d’arrivée à la CSCA : ${donnees.datearrivee}`,45,590,{})
    .text(`Date d’opposition : ${donnees.dateopposition}`,300,590,{})
    .text(`N° Décision Objet d’opposition : ${donnees.numdecisionobjetopposition}`,45,640,{})
    .text(`Demandé par : ${donnees.demande}`,300,640,{})
    .text(`Décisions : ${donnees.decision}`,45,690,{})}})

    
    // Enregistrement du document
    LeDossier.pipe(fs.createWriteStream("Siege_Document.pdf"));
    LeDossier.end();
    }
function imprimerDossier(id,entite){
    if(entite==='siege'){
        console.log("entite==='siege'")
        Siege(id)
    }
    else if(entite==='parquet'){
        console.log("entite==='parquet'")
        Parquet(id)
    }
    console.log("De ato koa")
}
module.exports={imprimerDossier}












































// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const { Contenue_Dossier } = require("./Les_textes");
// const { csca_bd,selecteDonnee } = require("../basedenne/Mon_dataBase");
// const bleu = "#032F54";


// const LeDossier = new PDFDocument({ size: "A4" });

// function Entete() {
//     LeDossier
//         .image("../static/img/pdf_image/justice.png", 35, 70, { fit: [60, 60] })
//         .image("../static/img/pdf_image/republique.jpg", 248.1, 20, { fit: [98.79, 70] })
//         .image("../static/img/pdf_image/pac.png", 500, 70, { fit: [60, 60] });

//     LeDossier.font("Times-Roman")
//         .fontSize(12)
//         .text("DIRECTION DE COORDINATION NATIONALE DES PÔLES ANTI-CORRUPTION", 172.5, 110, { width: 250, align: "center" })
//         .text("------------------------", 172.5, 140, { width: 250, align: "center" })
//         .font("Times-Bold")
//         .fontSize(14)
//         .text("CHAMBRE DE SAISIE ET CONFISCATION DES AVOIRS (CSCA)", 172.5, 170, { width: 250, align: "center" });
// }

// // function remplieDossier(idio) {
// //     selecteDossier_by_Id(idio, (err, donnees) => {
// //         if (err) {
// //             throw err;
// //         } else {
// //             const positions = {
// //                 datearrivee: [135, 271],
// //                 numeropv: [313, 271],
// //                 numerorp: [498, 271, { width: 50 }],
// //                 infraction: [115, 285],
// //                 demandeur: [145, 298],
// //                 objetdedemande: [385, 298],
// //                 date1ere: [155, 311],
// //                 date2eme: [385, 311],
// //                 lieu: [165, 324],
// //             };

// //             LeDossier.font("Times-Bold")
// //                 .fontSize(12);

// //             Object.entries(positions).forEach(([key, position]) => {
// //                 LeDossier.text(`${donnees[key]}`, ...position);
// //             });
// //         }
// //     });
// // }
// function remplieDossier(id) {
// selecteDonnee("ajoutdedossier", (err, lesdonnees) => {
//         if (err) {
//           console.log(err)
//         }
//         else {
//         const LeDossierId = lesdonnees.find((element) => element.id === id);
//         const positions = {
//                 datearrivee: [135, 271],
//                 numeropv: [313, 271],
//                 numerorp: [498, 271, { width: 50 }],
//                 infraction: [115, 285],
//                 demandeur: [145, 298],
//                 objetdedemande: [385, 298],
//                 date1ere: [155, 311],
//                 date2eme: [385, 311],
//                 lieu: [165, 324],
//             };
      
//           LeDossier.font("Times-Bold")
//             .fontSize(12);
      
//             for (const [key, position] of Object.entries(positions)) {
//                 if (LeDossierId.id) {
//                     LeDossier.text(`${LeDossierId.id}`, ...position);
//                 } else {
//                     console.warn(`Valeur manquante pour la clé "${key}" du dossier`);
//                 }
//             }

//         }
// })
// }
// // function remplieDossier(id) {
// //         try {
// //         //   const dossier = await selecteDossier_by_Id(id);
// //         //   const dossier = ["FEFELA","Coucou","Coucou","Coucou","Coucou","Coucou","Coucou","Coucou","Coucou"]
      
// //           if (!dossier) {
// //             console.error(`Dossier introuvable avec l'identifiant ${id}`);
// //             return;
// //           }
          
// //         } catch (error) {
// //           console.error(error);
// //         }
// //       }
      

// function ajouterSection(title, donnees, positionY) {
//     LeDossier
//         .rect(35, positionY, 525, 30)
//         .fillColor(bleu)
//         .fill()
//         .font("Times-Bold")
//         .fontSize(14)
//         .fillColor("white")
//         .text(title, 45, positionY + 10, {});

//     LeDossier
//         .rect(35, positionY + 30, 525, 150)
//         .fillOpacity(0.5)
//         .fillColor(bleu)
//         .fill()
//         .fillOpacity(1)
//         .font("Times-Roman")
//         .fontSize(12)
//         .fillColor("black");

//     Object.entries(donnees).forEach(([key, value], index) => {
//         LeDossier.text(`${key} : ${value}`, 45, positionY + 40 + index * 50, {});
//     });
// }

// function generateDocument(id, type, sections) {
//         Entete();
//         remplieDossier(id);
    
//         LeDossier.font("Times-Roman")
//             .fontSize(12)
//             .text(`Dossier N°${id}/CSCA/${type}`, 172.5, 220, { width: 250, align: "center" });
    
//         LeDossier.font("Times-Roman")
//             .fontSize(12)
//             .text(Contenue_Dossier, 35, 270, { width: 525, align: "left" });
//         let sautpage=0
//         sections.forEach(({ title, data, positionY }) => {
//         sautpage++
//         ajouterSection(title, data, positionY);
//         if(sautpage===2){LeDossier.addPage();}
//         });
    
//         LeDossier.pipe(fs.createWriteStream(`${type}_Document.pdf`));
//         LeDossier.end();
//     }
    

// const sectionsParquet = [
//     { title: "Bien Mobilier", data: {}, positionY: 360 },
//     { title: "Bien Immobilier", data: {}, positionY: 560 },
//     { title: "Compte Bancaire", data: {}, positionY: 40 },
//     { title: "Personne Physique", data: {}, positionY: 300 },
//     { title: "Personne Morale", data: {}, positionY: 550 },
// ];

// const sectionsSiege = [
//     { title: "Confirmation de saisie", data: {}, positionY: 360 },
//     { title: "Mainlevée", data: {}, positionY: 560 },
//     { title: "Opposition aux opérations suspects", data: {}, positionY: 40 },
//     { title: "Confiscation CSCA", data: {}, positionY: 300 },
//     { title: "Opposition aux Confiscation CSCA", data: {}, positionY: 550 },
// ];
// generateDocument(23, "Parquet", sectionsParquet);
// // generateDocument(16, "Siege", sectionsSiege);

