const apprenants = require("./data");


function normaliserNom(nom){
    nom = nom.trim()
    nom = nom.toLowerCase();
    return nom;
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