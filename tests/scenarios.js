const apprenants = require("../src/data");
const fonctions = require("../src/progression");

let totalTests = 0;
let testsReussis = 0;

function tester(nom, condition) {
    totalTests++;

    console.log("TEST " + totalTests + " - " + nom);

    if (condition === true) {
        console.log("OK");
        testsReussis++;
    } else {
        console.log("ERREUR");
    }

    console.log("");
}

const sara = fonctions.rechercherApprenant(1);
const progressionSara = fonctions.calculerProgression(sara);

tester(
    "Calculer la progression de Sara",
    progressionSara.progression === 80 &&
    progressionSara.niveau === "Solide"
);

const recherche = fonctions.rechercherParNom("el amr");

tester(
    "Rechercher avec une partie du nom",
    recherche.length === 1 &&
    recherche[0].id === 1
);

const ajout = fonctions.ajouterApprenant(
    10,
    "Hamza Benali",
    "Nador"
);

const hamza = fonctions.rechercherApprenant(10);

tester(
    "Ajouter un apprenant",
    ajout === true &&
    hamza !== null
);

const nombreAvantDoublon = apprenants.length;

const doublon = fonctions.ajouterApprenant(
    10,
    "Anas Alaoui",
    "Oujda"
);

tester(
    "Refuser un identifiant déjà utilisé",
    doublon === false &&
    apprenants.length === nombreAvantDoublon
);

const jourInvalide = fonctions.enregistrerResultat(
    10,
    9,
    10,
    20,
    true
);

tester(
    "Refuser un jour invalide",
    jourInvalide === false &&
    hamza.resultats.length === 0
);

fonctions.enregistrerResultat(
    10,
    1,
    10,
    20,
    false
);

fonctions.enregistrerResultat(
    10,
    1,
    15,
    20,
    true
);

tester(
    "Modifier une journée sans doublon",
    hamza.resultats.length === 1 &&
    hamza.resultats[0].exercicesTermines === 15 &&
    hamza.resultats[0].challengeTermine === true
);

console.log(
    "Tests réussis : " +
    testsReussis +
    "/" +
    totalTests
);