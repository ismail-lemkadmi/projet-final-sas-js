const apprenants = require("./data");


function normaliserNom(nom){
    nom = nom.trim()
    nom = nom.toLowerCase();
    return nom;
console.log(normaliserNom("  riougo @uigh ie ierugi "));

}
function validerResultat(jour, exercicesTermines,totalExercices){
    if (jour < 1 || jour > 7) {
    console.log("Erreur : le jour doit être compris entre 1 et 7.");
    return false;
}
if (exercicesTermines > totalExercices) {
    console.log("Erreur : les exercices terminés ne peuvent pas dépasser le total.");
    return false;
}
if (exercicesTermines < 0 || totalExercices < 0) {
    console.log("Erreur : les nombres d'exercices ne peuvent pas être négatifs.");
    return false;
}
return true;
}
function ajouterApprenant(id, nomComplet, ville) {
for (let i = 0 ; i < apprenants.length; i++) {
    if (apprenants[i].id === id) {
    console.log("Erreur : cet identifiant existe déjà.");
    return false;
}
}
const nouvelApprenant = {
    id: id,
    nomComplet: normaliserNom(nomComplet),
    ville: ville,
    resultats: []
};
apprenants.push(nouvelApprenant);
return true;
}
function rechercherApprenant(id) {
for (let i = 0; i < apprenants.length; i++) {
    if (apprenants[i].id === id) {
    return apprenants[i];
}
}
return null;
}
function enregistrerResultat(id, jour, exercicesTermines, totalExercices, challengeTermine) {
const apprenant = rechercherApprenant(id);
if (apprenant === null) {
    console.log("Erreur : apprenant introuvable.");
    return false;
}
if (!validerResultat(jour, exercicesTermines, totalExercices)) {
    return false;
}
const nouveauResultat = {
    jour: jour,
    exercicesTermines: exercicesTermines,
    totalExercices: totalExercices,
    challengeTermine: challengeTermine
};
for (let i = 0; i < apprenant.resultats.length; i++) {
if (apprenant.resultats[i].jour === jour) {
    apprenant.resultats[i] = nouveauResultat;
    return true;
}
}
apprenant.resultats.push(nouveauResultat);
return true;

}
function calculerProgression(apprenant) {
let totalTermines = 0;
let totalProposes = 0;
let challengesTermines = 0;
for (let i = 0; i < apprenant.resultats.length; i++) {
    totalTermines += apprenant.resultats[i].exercicesTermines;
    totalProposes += apprenant.resultats[i].totalExercices;
    if (apprenant.resultats[i].challengeTermine === true) {
    challengesTermines++;
}
}
let journeesRenseignees = apprenant.resultats.length;
let progression = 0;

if (totalProposes > 0) {
    progression = (totalTermines / totalProposes) * 100;
}
let niveau = "";

if (progression >= 80) {
    niveau = "Solide";
} else if (progression >= 50) {
    niveau = "En progression";
} else {
    niveau = "À renforcer";
}
return {
    totalTermines: totalTermines,
    totalProposes: totalProposes,
    progression: progression,
    challengesTermines: challengesTermines,
    journeesRenseignees: journeesRenseignees,
    niveau: niveau
};
}       
function rechercherParNom(nom) {
    const nomRecherche = normaliserNom(nom);
    const resultatsRecherche = [];
    for (let i = 0; i < apprenants.length; i++) {
        const nomApprenant = normaliserNom(apprenants[i].nomComplet);
        if (nomApprenant.includes(nomRecherche)) {
            resultatsRecherche.push(apprenants[i]);
}   
}
return resultatsRecherche;
}

function filtrerParNiveau(niveauRecherche) {
const apprenantsFiltres = [];
for (let i = 0; i < apprenants.length; i++) {
    const progressionApprenant = calculerProgression(apprenants[i]);
    if (progressionApprenant.niveau === niveauRecherche) {
        apprenantsFiltres.push(apprenants[i]);
}
}
return apprenantsFiltres;
}
function trierParProgression() {
    apprenants.sort(function(a, b) {
        const progressionA = calculerProgression(a).progression;
        const progressionB = calculerProgression(b).progression;

        return progressionB - progressionA;
    });
    return apprenants;
}

function trierParNom() {
apprenants.sort(function(a, b) {
if (a.nomComplet < b.nomComplet) {
    return -1;
}
if (a.nomComplet > b.nomComplet) {
    return 1;
}
return 0;
});
return apprenants;
}

function afficherTableauDeBord() {
    const totalApprenants = apprenants.length;

    let sommeProgressions = 0;
    let nombreSolide = 0;
    let nombreEnProgression = 0;
    let nombreARenforcer = 0;

    for (let i = 0; i < apprenants.length; i++) {
        const progressionApprenant = calculerProgression(apprenants[i]);

        sommeProgressions += progressionApprenant.progression;

        if (progressionApprenant.niveau === "Solide") {
            nombreSolide++;
        } else if (progressionApprenant.niveau === "En progression") {
            nombreEnProgression++;
        } else {
            nombreARenforcer++;
        }
    }

    let moyenneProgression = 0;

    if (totalApprenants > 0) {
        moyenneProgression = sommeProgressions / totalApprenants;
    }

    console.log("===== TABLEAU DE BORD =====");
    console.log("Total apprenants :", totalApprenants);
    console.log("Moyenne du groupe :", moyenneProgression + "%");
    console.log("Solide :", nombreSolide);
    console.log("En progression :", nombreEnProgression);
    console.log("À renforcer :", nombreARenforcer);

    console.log("");

    const apprenantsTries = trierParProgression();

    console.log("===== LISTE DES APPRENANTS =====");

    for (let i = 0; i < apprenantsTries.length; i++) {
        const progressionApprenant =
            calculerProgression(apprenantsTries[i]);

        const joursManquants =
            7 - progressionApprenant.journeesRenseignees;

        const challengesNonTermines =
            progressionApprenant.journeesRenseignees -
            progressionApprenant.challengesTermines;

        console.log(
            apprenantsTries[i].nomComplet,
            "-",
            progressionApprenant.progression + "%",
            "-",
            progressionApprenant.niveau,
            "- Jours renseignés :",
            progressionApprenant.journeesRenseignees + "/7",
            "- Jours manquants :",
            joursManquants,
            "- Challenges terminés :",
            progressionApprenant.challengesTermines,
            "- Challenges non terminés :",
            challengesNonTermines
        );
    }
}

