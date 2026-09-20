const prompt = require("prompt-sync")({ sigint: true });
const apprenants = require("./data");

const {
    ajouterApprenant,
    rechercherApprenant,
    enregistrerResultat,
    calculerProgression,
    rechercherParNom,
    filtrerParNiveau,
    trierParProgression,
    trierParNom,
    afficherTableauDeBord
} = require("./progression");

function lireNombre(message) {

    let saisie = prompt(message);
    saisie = saisie.trim();

    if (saisie === "") {
        return NaN;
    }

    return Number(saisie);
}

function afficherMenu() {

    console.log("");
    console.log("----------------------------------------------");
    console.log("             SAS PROGRESS CONSOLE");
    console.log("----------------------------------------------");
    console.log(" [1] Tableau de bord");
    console.log(" [2] Liste des apprenants");
    console.log(" [3] Ajouter un apprenant");
    console.log(" [4] Consulter un apprenant par identifiant");
    console.log(" [5] Ajouter / modifier un résultat");
    console.log(" [6] Rechercher un apprenant par nom");
    console.log(" [7] Filtrer les apprenants par niveau");
    console.log(" [8] Trier par progression décroissante");
    console.log(" [9] Trier par ordre alphabétique");
    console.log(" [0] Quitter");
    console.log("----------------------------------------------");
}

function afficherListe(liste) {

    if (liste.length === 0) {
        console.log("Aucun apprenant trouvé.");
        return;
    }

    for (let i = 0; i < liste.length; i++) {

        const progression = calculerProgression(liste[i]);

        console.log("----------------------------------------------");
        console.log("ID          :", liste[i].id);
        console.log("Nom         :", liste[i].nomComplet);
        console.log("Ville       :", liste[i].ville);
        console.log("Progression :", progression.progression + "%");
        console.log("Niveau      :", progression.niveau);
    }

    console.log("----------------------------------------------");
}

function afficherDetails(apprenant) {

    const progression = calculerProgression(apprenant);

    console.log("----------------------------------------------");
    console.log("ID                  :", apprenant.id);
    console.log("Nom                 :", apprenant.nomComplet);
    console.log("Ville               :", apprenant.ville);
    console.log("Exercices terminés  :", progression.totalTermines + "/" + progression.totalProposes);
    console.log("Progression         :", progression.progression + "%");
    console.log("Niveau              :", progression.niveau);
    console.log("Journées renseignées:", progression.journeesRenseignees + "/7");
    console.log("Challenges terminés :", progression.challengesTermines);
    console.log("----------------------------------------------");
}

let continuer = true;

while (continuer === true) {

    afficherMenu();

    let choix = prompt("Votre choix : ");
    choix = choix.trim();

    console.log("");

    if (choix === "1") {

        afficherTableauDeBord();

    } else if (choix === "2") {

        console.log("LISTE DES APPRENANTS");
        afficherListe(apprenants);

    } else if (choix === "3") {

        console.log("AJOUTER UN APPRENANT");

        const id = lireNombre("Identifiant : ");
        const nomComplet = prompt("Nom complet : ");
        const ville = prompt("Ville : ");

        const ajout = ajouterApprenant(id, nomComplet, ville);

        if (ajout === true) {
            console.log("Apprenant ajouté avec succès.");
        }

    } else if (choix === "4") {

        console.log("CONSULTER UN APPRENANT");

        const id = lireNombre("Identifiant : ");

        if (id % 1 !== 0 || id <= 0) {
            console.log("Erreur : identifiant invalide.");
        } else {

            const apprenant = rechercherApprenant(id);

            if (apprenant === null) {
                console.log("Erreur : apprenant introuvable.");
            } else {
                afficherDetails(apprenant);
            }
        }

    } else if (choix === "5") {

        console.log("AJOUTER / MODIFIER UN RÉSULTAT");

        const id = lireNombre("Identifiant de l'apprenant : ");

        if (id % 1 !== 0 || id <= 0) {
            console.log("Erreur : identifiant invalide.");
        } else {

            const apprenant = rechercherApprenant(id);

            if (apprenant === null) {
                console.log("Erreur : apprenant introuvable.");
            } else {

                console.log("Apprenant trouvé :", apprenant.nomComplet);

                const jour = lireNombre("Jour (1 à 7) : ");
                const exercicesTermines = lireNombre("Exercices terminés : ");
                const totalExercices = lireNombre("Total des exercices : ");

                let reponseChallenge = prompt("Challenge terminé ? (oui/non) : ");
                reponseChallenge = reponseChallenge.trim();
                reponseChallenge = reponseChallenge.toLowerCase();

                if (reponseChallenge !== "oui" && reponseChallenge !== "non") {
                    console.log("Erreur : veuillez répondre par oui ou non.");
                } else {

                    let challengeTermine = false;

                    if (reponseChallenge === "oui") {
                        challengeTermine = true;
                    }

                    const resultat = enregistrerResultat(
                        id,
                        jour,
                        exercicesTermines,
                        totalExercices,
                        challengeTermine
                    );

                    if (resultat === true) {
                        console.log("Résultat enregistré avec succès.");
                        afficherDetails(apprenant);
                    }
                }
            }
        }

    } else if (choix === "6") {

        console.log("RECHERCHE PAR NOM");

        let nom = prompt("Nom ou partie du nom : ");
        nom = nom.trim();

        if (nom === "") {
            console.log("Erreur : saisissez un nom ou une partie du nom.");
        } else {

            const resultats = rechercherParNom(nom);
            afficherListe(resultats);
        }

    } else if (choix === "7") {

        console.log("FILTRER PAR NIVEAU");
        console.log(" [1] Solide");
        console.log(" [2] En progression");
        console.log(" [3] À renforcer");

        let choixNiveau = prompt("Votre choix : ");
        choixNiveau = choixNiveau.trim();

        let niveauRecherche = "";

        if (choixNiveau === "1") {
            niveauRecherche = "Solide";
        } else if (choixNiveau === "2") {
            niveauRecherche = "En progression";
        } else if (choixNiveau === "3") {
            niveauRecherche = "À renforcer";
        } else {
            console.log("Erreur : niveau invalide.");
        }

        if (niveauRecherche !== "") {

            console.log("Niveau :", niveauRecherche);

            const resultats = filtrerParNiveau(niveauRecherche);
            afficherListe(resultats);
        }

    } else if (choix === "8") {

        console.log("TRI PAR PROGRESSION");

        const apprenantsTries = trierParProgression();
        afficherListe(apprenantsTries);

    } else if (choix === "9") {

        console.log("TRI ALPHABÉTIQUE");

        const apprenantsTries = trierParNom();
        afficherListe(apprenantsTries);

    } else if (choix === "0") {

        continuer = false;

        console.log("----------------------------------------------");
        console.log("Merci d'avoir utilisé SAS Progress Console.");
        console.log("Au revoir !");
        console.log("----------------------------------------------");

    } else {

        console.log("Erreur : choisissez une option entre 0 et 9.");
    }

    if (continuer === true) {
        console.log("");
        prompt("Appuyez sur Entrée pour revenir au menu...");
    }
}