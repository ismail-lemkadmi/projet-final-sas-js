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
        console.log("Erreur : nombre négatif.");
        return false;
    }

    if (exercicesTermines % 1 !== 0 || totalExercices % 1 !== 0) {
        console.log("Erreur : utilisez des nombres entiers.");
        return false;
    }

    if (exercicesTermines > totalExercices) {
        console.log("Erreur : les exercices terminés dépassent le total.");
        return false;
    }

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
function ajouterApprenant(id, nomComplet, ville) {
    if (isNaN(id) || id <= 0 || id % 1 !== 0) {
        console.log("Erreur : identifiant invalide.");
        return false;
    }

    if (nomComplet.trim() === "" || ville.trim() === "") {
        console.log("Erreur : le nom et la ville sont obligatoires.");
        return false;
    }

    if (rechercherApprenant(id) !== null) {
        console.log("Erreur : cet identifiant existe déjà.");
        return false;
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
function enregistrerResultat(id, jour, exercicesTermines, totalExercices, challengeTermine) {
    const apprenant = rechercherApprenant(id);

    if (apprenant === null) {
        console.log("Erreur : apprenant introuvable.");
        return false;
    }

    if (validerResultat(jour, exercicesTermines, totalExercices) === false) {
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
        journeesRenseignees: apprenant.resultats.length,
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
    for (let i = 0; i < apprenants.length - 1; i++) {
        for (let j = 0; j < apprenants.length - 1 - i; j++) {
            const progressionA = calculerProgression(apprenants[j]).progression;
            const progressionB = calculerProgression(apprenants[j + 1]).progression;

            if (progressionA < progressionB) {
                const temporaire = apprenants[j];
                apprenants[j] = apprenants[j + 1];
                apprenants[j + 1] = temporaire;
            }
        }
    }

    return apprenants;
}
function trierParNom() {
    for (let i = 0; i < apprenants.length - 1; i++) {
        for (let j = 0; j < apprenants.length - 1 - i; j++) {
            const nomA = normaliserNom(apprenants[j].nomComplet);
            const nomB = normaliserNom(apprenants[j + 1].nomComplet);

            if (nomA > nomB) {
                const temporaire = apprenants[j];
                apprenants[j] = apprenants[j + 1];
                apprenants[j + 1] = temporaire;
            }
        }
    }

    return apprenants;
}
function trouverJoursManquants(apprenant) {
    const joursManquants = [];

    for (let jour = 1; jour <= 7; jour++) {
        let jourExiste = false;

        for (let i = 0; i < apprenant.resultats.length; i++) {
            if (apprenant.resultats[i].jour === jour) {
                jourExiste = true;
            }
        }

        if (jourExiste === false) {
            joursManquants.push(jour);
        }
    }

    return joursManquants;
}
function trouverChallengesNonTermines(apprenant) {
    const jours = [];

    for (let i = 0; i < apprenant.resultats.length; i++) {
        if (apprenant.resultats[i].challengeTermine === false) {
            jours.push(apprenant.resultats[i].jour);
        }
    }

    return jours;
}
function afficherTableauDeBord() {
    let sommeProgressions = 0;
    let nombreSolide = 0;
    let nombreEnProgression = 0;
    let nombreARenforcer = 0;

    for (let i = 0; i < apprenants.length; i++) {
        const progression = calculerProgression(apprenants[i]);

        sommeProgressions += progression.progression;

        if (progression.niveau === "Solide") {
            nombreSolide++;
        } else if (progression.niveau === "En progression") {
            nombreEnProgression++;
        } else {
            nombreARenforcer++;
        }
    }

    let moyenne = 0;

    if (apprenants.length > 0) {
        moyenne = sommeProgressions / apprenants.length;
    }

    console.log("");
    console.log("--------------- TABLEAU DE BORD ---------------");
    console.log("Total apprenants :", apprenants.length);
    console.log("Moyenne du groupe :", moyenne + "%");
    console.log("Solide :", nombreSolide);
    console.log("En progression :", nombreEnProgression);
    console.log("À renforcer :", nombreARenforcer);

    const liste = trierParProgression();

    for (let i = 0; i < liste.length; i++) {
        const progression = calculerProgression(liste[i]);

        console.log("-----------------------------------------------");
        console.log("Nom :", liste[i].nomComplet);
        console.log("Progression :", progression.progression + "%");
        console.log("Niveau :", progression.niveau);
        console.log(
            "Jours renseignés :",
            progression.journeesRenseignees + "/7"
        );
        console.log(
            "Jours non renseignés :",
            trouverJoursManquants(liste[i])
        );
        console.log(
            "Challenges terminés :",
            progression.challengesTermines
        );
        console.log(
            "Challenges non terminés :",
            trouverChallengesNonTermines(liste[i])
        );
    }

    console.log("-----------------------------------------------");
}

module.exports = {
    normaliserNom: normaliserNom,
    validerResultat: validerResultat,
    ajouterApprenant: ajouterApprenant,
    rechercherApprenant: rechercherApprenant,
    enregistrerResultat: enregistrerResultat,
    calculerProgression: calculerProgression,
    rechercherParNom: rechercherParNom,
    filtrerParNiveau: filtrerParNiveau,
    trierParProgression: trierParProgression,
    trierParNom: trierParNom,
    afficherTableauDeBord: afficherTableauDeBord
};
