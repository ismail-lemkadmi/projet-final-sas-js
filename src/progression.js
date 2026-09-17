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
