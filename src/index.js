const prompt = require("prompt-sync")();
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


function afficherMenu() {
    console.log("");
    console.log("----------------------------------------------");
    console.log("             SAS PROGRESS CONSOLE");
    console.log("----------------------------------------------");
    console.log("");
    console.log(" [1] Tableau de bord");
    console.log(" [2] Liste des apprenants");
    console.log(" [3] Ajouter un apprenant");
    console.log(" [4] Consulter un apprenant par identifiant");
    console.log(" [5] Ajouter / modifier un résultat");
    console.log(" [6] Rechercher un apprenant par nom");
    console.log(" [7] Filtrer les apprenants par niveau");
    console.log(" [8] Trier par progression décroissante");
    console.log(" [9] Trier par ordre alphabétique");
    console.log("");
    console.log(" [0] Quitter");
    console.log("");
}


function afficherListe(liste) {
    if (liste.length === 0) {
        console.log("Aucun apprenant trouvé.");
        return;
    }

    console.log("----------------------------------------------");

    for (let i = 0; i < liste.length; i++) {
        const progression = calculerProgression(liste[i]);

        console.log("ID          :", liste[i].id);
        console.log("Nom         :", liste[i].nomComplet);
        console.log("Ville       :", liste[i].ville);
        console.log("Progression :", progression.progression + "%");
        console.log("Niveau      :", progression.niveau);

        console.log("----------------------------------------------");
    }
}


let continuer = true;

while (continuer) {
    afficherMenu();

    const choix = prompt("Votre choix : ");

    console.log("");

    if (choix === "1") {
        afficherTableauDeBord();


    } else if (choix === "2") {
        console.log("LISTE DES APPRENANTS");
        console.log("");

        afficherListe(apprenants);


    } else if (choix === "3") {
        console.log("AJOUTER UN APPRENANT");
        console.log("");

        const id = Number(
            prompt("Identifiant : ")
        );

        const nomComplet =
            prompt("Nom complet : ");

        const ville =
            prompt("Ville : ");

        const ajout = ajouterApprenant(
            id,
            nomComplet,
            ville
        );

        if (ajout === true) {
            console.log("");
            console.log("Apprenant ajouté avec succès.");
        }


    } else if (choix === "4") {
        console.log("CONSULTER UN APPRENANT");
        console.log("");

        const id = Number(
            prompt("Identifiant : ")
        );

        const apprenant =
            rechercherApprenant(id);

        if (apprenant === null) {
            console.log(
                "Erreur : apprenant introuvable."
            );
        } else {
            const progression =
                calculerProgression(apprenant);

            console.log("");
            console.log("----------------------------------------------");
            console.log("ID                  :", apprenant.id);
            console.log("Nom                 :", apprenant.nomComplet);
            console.log("Ville               :", apprenant.ville);
            console.log(
                "Exercices terminés  :",
                progression.totalTermines +
                "/" +
                progression.totalProposes
            );
            console.log(
                "Progression         :",
                progression.progression + "%"
            );
            console.log(
                "Niveau              :",
                progression.niveau
            );
            console.log(
                "Journées renseignées:",
                progression.journeesRenseignees + "/7"
            );
            console.log(
                "Challenges terminés :",
                progression.challengesTermines
            );
            console.log("----------------------------------------------");
        }


    } else if (choix === "5") {
        console.log("AJOUTER / MODIFIER UN RÉSULTAT");
        console.log("");

        const id = Number(
            prompt("Identifiant de l'apprenant : ")
        );

        const jour = Number(
            prompt("Jour (1 à 7) : ")
        );

        const exercicesTermines = Number(
            prompt("Exercices terminés : ")
        );

        const totalExercices = Number(
            prompt("Total des exercices : ")
        );

        const reponseChallenge = prompt(
            "Challenge terminé ? (oui/non) : "
        )
            .trim()
            .toLowerCase();

        if (
            reponseChallenge !== "oui" &&
            reponseChallenge !== "non"
        ) {
            console.log(
                "Erreur : veuillez répondre par oui ou non."
            );
        } else {
            const challengeTermine =
                reponseChallenge === "oui";

            const resultat = enregistrerResultat(
                id,
                jour,
                exercicesTermines,
                totalExercices,
                challengeTermine
            );

            if (resultat === true) {
                console.log("");
                console.log(
                    "Résultat enregistré avec succès."
                );

                const apprenant =
                    rechercherApprenant(id);

                const progression =
                    calculerProgression(apprenant);

                console.log(
                    "Progression actuelle :",
                    progression.totalTermines +
                    "/" +
                    progression.totalProposes,
                    "=",
                    progression.progression + "%"
                );

                console.log(
                    "Niveau :",
                    progression.niveau
                );
            }
        }


    } else if (choix === "6") {
        console.log("RECHERCHE PAR NOM");
        console.log("");

        const nom = prompt(
            "Nom ou partie du nom : "
        );

        const resultats =
            rechercherParNom(nom);

        console.log("");

        afficherListe(resultats);


    } else if (choix === "7") {
        console.log("FILTRER PAR NIVEAU");
        console.log("");
        console.log(" [1] Solide");
        console.log(" [2] En progression");
        console.log(" [3] À renforcer");
        console.log("");

        const choixNiveau =
            prompt("Votre choix : ");

        let niveauRecherche = "";

        if (choixNiveau === "1") {
            niveauRecherche = "Solide";

        } else if (choixNiveau === "2") {
            niveauRecherche = "En progression";

        } else if (choixNiveau === "3") {
            niveauRecherche = "À renforcer";

        } else {
            console.log(
                "Erreur : niveau invalide."
            );
        }

        if (niveauRecherche !== "") {
            const resultats =
                filtrerParNiveau(niveauRecherche);

            console.log("");
            console.log(
                "Niveau :",
                niveauRecherche
            );
            console.log("");

            afficherListe(resultats);
        }


    } else if (choix === "8") {
        console.log("TRI PAR PROGRESSION");
        console.log("");

        const apprenantsTries =
            trierParProgression();

        afficherListe(apprenantsTries);


    } else if (choix === "9") {
        console.log("TRI ALPHABÉTIQUE");
        console.log("");

        const apprenantsTries =
            trierParNom();

        afficherListe(apprenantsTries);


    } else if (choix === "0") {
        continuer = false;

        console.log("----------------------------------------------");
        console.log("Merci d'avoir utilisé SAS Progress Console.");
        console.log("Au revoir !");
        console.log("----------------------------------------------");


    } else {
        console.log(
            "Erreur : choisissez une option entre 0 et 9."
        );
    }


    if (continuer === true) {
        console.log("");

        prompt(
            "Appuyez sur Entrée pour revenir au menu..."
        );
    }
}