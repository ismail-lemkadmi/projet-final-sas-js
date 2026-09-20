const apprenants = require("../src/data");

const {
    normaliserNom,
    validerResultat,
    ajouterApprenant,
    rechercherApprenant,
    enregistrerResultat,
    calculerProgression,
    rechercherParNom
} = require("../src/progression");

let nombreTests = 0;
let testsReussis = 0;

function afficherTest(nom, resultat) {
    nombreTests++;
    console.log("");
    console.log("TEST " + nombreTests + " - " + nom);

    if (resultat === true) {
        console.log("OK");
        testsReussis++;
    } else {
        console.log("ERREUR");
    }
}

const sara = rechercherApprenant(1);
let saraCorrecte = false;

if (sara !== null) {
    const progressionSara = calculerProgression(sara);

    saraCorrecte =
        sara.nomComplet === "Sara El Amrani" &&
        progressionSara.totalTermines === 32 &&
        progressionSara.totalProposes === 40 &&
        progressionSara.progression === 80 &&
        progressionSara.niveau === "Solide" &&
        progressionSara.challengesTermines === 1 &&
        progressionSara.journeesRenseignees === 2;
}

afficherTest("Progression de Sara El Amrani", saraCorrecte);

const recherche = rechercherParNom("  eL aMr  ");

afficherTest(
    "Recherche partielle de Sara avec une casse différente",
    recherche.length === 1 && recherche[0].id === 1
);

const nomNormalise = normaliserNom("  SaRa   EL   AmRaNi  ");

afficherTest(
    "Nettoyage des espaces et des majuscules",
    nomNormalise === "sara el amrani"
);

let idTest = 1;

for (let i = 0; i < apprenants.length; i++) {
    if (apprenants[i].id >= idTest) {
        idTest = apprenants[i].id + 1;
    }
}

const nombreAvantAjout = apprenants.length;
const ajout = ajouterApprenant(idTest, "  Hamza   Benali  ", "  Nador  ");
const apprenantTest = rechercherApprenant(idTest);

afficherTest(
    "Ajouter Hamza Benali et nettoyer ses informations",
    ajout === true &&
    apprenants.length === nombreAvantAjout + 1 &&
    apprenantTest !== null &&
    apprenantTest.nomComplet === "Hamza Benali" &&
    apprenantTest.ville === "Nador" &&
    apprenantTest.resultats.length === 0
);

const premierResultat = enregistrerResultat(idTest, 1, 10, 20, false);
const modification = enregistrerResultat(idTest, 1, 15, 20, true);

afficherTest(
    "Ajouter puis modifier une journée sans doublon",
    premierResultat === true &&
    modification === true &&
    apprenantTest !== null &&
    apprenantTest.resultats.length === 1 &&
    apprenantTest.resultats[0].jour === 1 &&
    apprenantTest.resultats[0].exercicesTermines === 15 &&
    apprenantTest.resultats[0].totalExercices === 20 &&
    apprenantTest.resultats[0].challengeTermine === true
);

const nombreAvantDoublon = apprenants.length;
const doublon = ajouterApprenant(idTest, "Anas Alaoui", "Oujda");

afficherTest(
    "Refuser un identifiant déjà utilisé",
    doublon === false && apprenants.length === nombreAvantDoublon
);

const jourInvalide = enregistrerResultat(idTest, 9, 10, 20, true);

afficherTest(
    "Refuser un jour en dehors de 1 à 7",
    jourInvalide === false &&
    apprenantTest !== null &&
    apprenantTest.resultats.length === 1
);

const resultatIncoherent = enregistrerResultat(idTest, 1, 25, 20, true);

afficherTest(
    "Refuser trop d'exercices terminés et garder l'ancien résultat",
    resultatIncoherent === false &&
    apprenantTest !== null &&
    apprenantTest.resultats.length === 1 &&
    apprenantTest.resultats[0].exercicesTermines === 15
);

const resultatDecimal = validerResultat(1, 2.5, 20);

afficherTest(
    "Refuser un nombre d'exercices avec une virgule",
    resultatDecimal === false
);

const nombresEnTexte = validerResultat(1, "10", "20");

afficherTest(
    "Refuser des textes à la place des nombres",
    nombresEnTexte === false
);

const nombreAvantIdTexte = apprenants.length;
const idEnTexte = ajouterApprenant("1", "Anas Alaoui", "Nador");

afficherTest(
    "Refuser un identifiant de type string",
    idEnTexte === false && apprenants.length === nombreAvantIdTexte
);

const challengeInvalide = enregistrerResultat(idTest, 1, 20, 20, "oui");

afficherTest(
    "Refuser un challenge qui n'est pas un booléen",
    challengeInvalide === false &&
    apprenantTest !== null &&
    apprenantTest.resultats[0].exercicesTermines === 15 &&
    apprenantTest.resultats[0].challengeTermine === true
);

const lina = rechercherApprenant(5);
let linaCorrecte = false;

if (lina !== null) {
    const progressionLina = calculerProgression(lina);

    linaCorrecte =
        lina.nomComplet === "Lina Berrada" &&
        progressionLina.totalTermines === 0 &&
        progressionLina.totalProposes === 0 &&
        progressionLina.progression === 0 &&
        progressionLina.niveau === "À renforcer" &&
        progressionLina.journeesRenseignees === 0 &&
        progressionLina.challengesTermines === 0;
}

afficherTest("Lina Berrada sans journée renseignée", linaCorrecte);

const profilLimite = {
    id: idTest + 1,
    nomComplet: "Youssef El Fassi",
    ville: "Nador",
    resultats: [
        {
            jour: 1,
            exercicesTermines: 0,
            totalExercices: 0,
            challengeTermine: false
        }
    ]
};

const totalNul = calculerProgression(profilLimite);

afficherTest(
    "Total proposé égal à zéro",
    totalNul.totalTermines === 0 &&
    totalNul.totalProposes === 0 &&
    totalNul.progression === 0 &&
    totalNul.niveau === "À renforcer" &&
    totalNul.journeesRenseignees === 1
);

const casLimites = [
    { exercicesTermines: 499, progression: 49.9, niveau: "À renforcer" },
    { exercicesTermines: 500, progression: 50, niveau: "En progression" },
    { exercicesTermines: 799, progression: 79.9, niveau: "En progression" },
    { exercicesTermines: 800, progression: 80, niveau: "Solide" }
];

for (let i = 0; i < casLimites.length; i++) {
    profilLimite.resultats[0].exercicesTermines = casLimites[i].exercicesTermines;
    profilLimite.resultats[0].totalExercices = 1000;

    const progressionLimite = calculerProgression(profilLimite);

    afficherTest(
        "Progression de " + casLimites[i].progression + "% : " + casLimites[i].niveau,
        progressionLimite.progression === casLimites[i].progression &&
        progressionLimite.niveau === casLimites[i].niveau
    );
}

console.log("");
console.log("----------------------------------------------");
console.log("Tests réussis :", testsReussis + "/" + nombreTests);
console.log("Tests échoués :", nombreTests - testsReussis);
console.log("----------------------------------------------");