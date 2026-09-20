const apprenants = require("./data");

function normaliserNom(nom) {
    nom = nom.trim();
    nom = nom.toLowerCase();
    return nom;
}

function validerResultat(jour, exercicesTermines, totalExercices) {

    if (isNaN(jour) || jour < 1 || jour > 7 || jour % 1 !== 0) {
        console.log("Erreur : jour invalide.");
        return false;
    }

    if (isNaN(exercicesTermines) || isNaN(totalExercices)) {
        console.log("Erreur : nombre d'exercices invalide.");
        return false;
    }

    if (exercicesTermines < 0 || totalExercices < 0) {
        console.log("Erreur : les exercices ne peuvent pas être négatifs.");
        return false;
    }

    if (exercicesTermines > totalExercices) {
        console.log("Erreur : les exercices terminés dépassent le total.");
        return false;
    }

    return true;
}

function ajouterApprenant(id, nomComplet, ville) {

    if (isNaN(id) || id <= 0 || id % 1 !== 0) {
        console.log("Erreur : identifiant invalide.");
        return false;
    }

    if (nomComplet.trim() === "") {
        console.log("Erreur : nom invalide.");
        return false;
    }

    if (ville.trim() === "") {
        console.log("Erreur : ville invalide.");
        return false;
    }

    for (let i = 0; i < apprenants.length; i++) {

        if (apprenants[i].id === id) {
            console.log("Erreur : cet identifiant existe déjà.");
            return false;
        }
    }

    const nouvelApprenant = {
        id: id,
        nomComplet: nomComplet.trim(),
        ville: ville.trim(),
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

    if (nomRecherche === "") {
        return resultatsRecherche;
    }

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

        const nomA = normaliserNom(a.nomComplet);
        const nomB = normaliserNom(b.nomComplet);

        if (nomA < nomB) {
            return -1;
        }

        if (nomA > nomB) {
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

    console.log("");
    console.log("----------------------------------------------");
    console.log("               TABLEAU DE BORD");
    console.log("----------------------------------------------");
    console.log("Total apprenants :", totalApprenants);
    console.log("Moyenne du groupe :", moyenneProgression + "%");
    console.log("Solide :", nombreSolide);
    console.log("En progression :", nombreEnProgression);
    console.log("À renforcer :", nombreARenforcer);
    console.log("");

    const apprenantsTries = trierParProgression();

    for (let i = 0; i < apprenantsTries.length; i++) {

        const progressionApprenant = calculerProgression(apprenantsTries[i]);

        const joursManquants = [];
        const challengesNonTermines = [];

        for (let jour = 1; jour <= 7; jour++) {

            let jourExiste = false;

            for (let j = 0; j < apprenantsTries[i].resultats.length; j++) {

                if (apprenantsTries[i].resultats[j].jour === jour) {
                    jourExiste = true;
                }
            }

            if (jourExiste === false) {
                joursManquants.push(jour);
            }
        }

        for (let j = 0; j < apprenantsTries[i].resultats.length; j++) {

            if (apprenantsTries[i].resultats[j].challengeTermine === false) {
                challengesNonTermines.push(
                    apprenantsTries[i].resultats[j].jour
                );
            }
        }

        console.log("----------------------------------------------");
        console.log("Nom :", apprenantsTries[i].nomComplet);
        console.log("Progression :", progressionApprenant.progression + "%");
        console.log("Niveau :", progressionApprenant.niveau);
        console.log("Jours renseignés :", progressionApprenant.journeesRenseignees + "/7");
        console.log("Jours non renseignés :", joursManquants);
        console.log("Challenges terminés :", progressionApprenant.challengesTermines);
        console.log("Challenges non terminés :", challengesNonTermines);
    }

    console.log("----------------------------------------------");
}

module.exports = {
    normaliserNom,
    validerResultat,
    ajouterApprenant,
    rechercherApprenant,
    enregistrerResultat,
    calculerProgression,
    rechercherParNom,
    filtrerParNiveau,
    trierParProgression,
    trierParNom,
    afficherTableauDeBord
};