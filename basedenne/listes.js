exports.LesEntites={
    siege:{
    "Confirmation de saisie":['Date d’arrivée à la CSCA','Infraction','Numero de PV','Decision','Demandeur'],
    "Mainlevée":['Date d’arrivée à la CSCA','Demandé par','Décision'],
    "Opposition aux opérations suspects":['Date d’arrivée à la CSCA','Demande','Décisions Prorogation'],
    "Confiscaton CSCA":['Décisions Prorogation','Date de Jugement','Nature du Jugement','Demandé par','Décisions'],
    "Oposition aux Confiscaton CSCA":['Date d’arrivée à la CSCA','Date d’opposition','N° Décision Objet d’opposition','Demandé par','Décisions'],
},
    parquet:{
        "Bien Mobilier":['Type','Marque','Immatriculation','Nature','Valeur estimative'],
        "Bien Immobilier":['Type','Nature','Titre','Nature','Valeur estimative'],
        "Compte Bancaire":['Nature du compte','Numéro de Compte','Domiciliations','Valeur gelée estimée'],
        "Personne physique":["Nom de l'individu",'Âge','Sexe','CIN ou Passeport','Nationalité',"Fonction de l'individu"],
        "Personne Morale":['Raison sociale','Forme juridique','Numéro carte fiscale','Numéro carte fiscale statistique'],
    },
}
const tabs ={
        'parquet':['bienmobilier',
        'bienimmobilier',
        'comptebancaire',
        'personnephysique',
        'personnemorale',],
        'siege':['confirmationdesaisie',
        'mainlevee',
        'oppositionauxos',
        'confiscationcsca',
        'oppositionauxconfiscationcsca']}