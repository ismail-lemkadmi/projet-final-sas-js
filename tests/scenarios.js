const {
    ajouterApprenant,
    rechercherApprenant,
    enregistrerResultat,
    calculerProgression,
    rechercherParNom
} = require("../src/progression");


console.log("TEST 1 - Progression de Sara");

const sara = rechercherApprenant(1);
const progressionSara = calculerProgression(sara);

console.log(
    progressionSara.progression === 80
        ? "OK"
        : "ERREUR"
);


console.log("");


console.log("TEST 2 - Recherche partielle");

const recherche = rechercherParNom("SaR");

console.log(
    recherche.length > 0
        ? "OK"
        : "ERREUR"
);


console.log("");


console.log("TEST 3 - Ajouter un apprenant");

const ajout = ajouterApprenant(
    3,
    "Test User",
    "Nador"
);

console.log(
    ajout === true &&
    rechercherApprenant(3) !== null
        ? "OK"
        : "ERREUR"
);


console.log("");


console.log("TEST 4 - Mise à jour sans doublon");

enregistrerResultat(
    3,
    1,
    10,
    20,
    false
);

enregistrerResultat(
    3,
    1,
    15,
    20,
    true
);

const testUser = rechercherApprenant(3);

console.log(
    testUser.resultats.length === 1 &&
    testUser.resultats[0].exercicesTermines === 15
        ? "OK"
        : "ERREUR"
);


console.log("");


console.log("TEST 5 - Identifiant déjà utilisé");

const doublon = ajouterApprenant(
    3,
    "Autre User",
    "Oujda"
);

console.log(
    doublon === false
        ? "OK"
        : "ERREUR"
);


console.log("");


console.log("TEST 6 - Résultat invalide");

const resultatInvalide = enregistrerResultat(
    3,
    9,
    25,
    20,
    true
);

console.log(
    resultatInvalide === false
        ? "OK"
        : "ERREUR"
);