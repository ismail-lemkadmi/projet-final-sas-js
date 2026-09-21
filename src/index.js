const prompt = require("prompt-sync")();
const apprenants = require("./data");
const fonctions = require("./progression");

function lireNombre(message) {
    const saisie = prompt(message);

    if (saisie.trim() === "") {
        return NaN;
    }

    return Number(saisie);
}

function afficherMenu() {
    console.log("");
    console.log("------------- SAS PROGRESS CONSOLE -------------");
    console.log("1. Afficher le tableau de bord");
    console.log("2. Afficher la liste des apprenants");
    console.log("3. Ajouter un apprenant");
    console.log("4. Consulter un apprenant par identifiant");
    console.log("5. Ajouter ou modifier un résultat");
    console.log("6. Rechercher un apprenant par nom");
    console.log("7. Filtrer les apprenants par niveau");
    console.log("8. Trier par progression décroissante");
    console.log("9. Trier par ordre alphabétique");
    console.log("0. Quitter");
    console.log("------------------------------------------------");
}

function afficherApprenant(apprenant) {
    const progression = fonctions.calculerProgression(apprenant);

    console.log("-----------------------------------------------");
    console.log("ID :", apprenant.id);
    console.log("Nom :", apprenant.nomComplet);
    console.log("Ville :", apprenant.ville);
    console.log("Exercices :", progression.totalTermines + "/" + progression.totalProposes);
    console.log("Progression :", progression.progression + "%");
    console.log("Niveau :", progression.niveau);
    console.log("Journées renseignées :", progression.journeesRenseignees + "/7");
    console.log("Challenges terminés :", progression.challengesTermines);
}

function afficherListe(liste) {
    if (liste.length === 0) {
        console.log("Aucun apprenant trouvé.");
        return;
    }

    for (let i = 0; i < liste.length; i++) {
        afficherApprenant(liste[i]);
    }

    console.log("-----------------------------------------------");
}

let choix = "";

while (choix !== "0") {
    afficherMenu();
    choix = prompt("Votre choix : ").trim();
    console.log("");

    if (choix === "1") {
        fonctions.afficherTableauDeBord();
    } else if (choix === "2") {
        afficherListe(apprenants);
    } else if (choix === "3") {
        const id = lireNombre("Identifiant : ");
        const nomComplet = prompt("Nom complet : ");
        const ville = prompt("Ville : ");

        const ajout = fonctions.ajouterApprenant(id, nomComplet, ville);

        if (ajout === true) {
            console.log("Apprenant ajouté avec succès.");
        }
    } else if (choix === "4") {
        const id = lireNombre("Identifiant : ");
        const apprenant = fonctions.rechercherApprenant(id);

        if (apprenant === null) {
            console.log("Erreur : apprenant introuvable.");
        } else {
            afficherApprenant(apprenant);
        }
    } else if (choix === "5") {
        const id = lireNombre("Identifiant de l'apprenant : ");
        const apprenant = fonctions.rechercherApprenant(id);

        if (apprenant === null) {
            console.log("Erreur : apprenant introuvable.");
        } else {
            console.log("Apprenant trouvé :", apprenant.nomComplet);

            const jour = lireNombre("Jour (1 à 7) : ");
            const exercicesTermines = lireNombre("Exercices terminés : ");
            const totalExercices = lireNombre("Total des exercices : ");
            const reponse = prompt("Challenge terminé ? (oui/non) : ").trim().toLowerCase();

            if (reponse !== "oui" && reponse !== "non") {
                console.log("Erreur : répondez par oui ou non.");
            } else {
                let challengeTermine = false;

                if (reponse === "oui") {
                    challengeTermine = true;
                }

                const resultat = fonctions.enregistrerResultat(
                    id,
                    jour,
                    exercicesTermines,
                    totalExercices,
                    challengeTermine
                );

                if (resultat === true) {
                    console.log("Résultat enregistré avec succès.");
                }
            }
        }
    } else if (choix === "6") {
        const nom = prompt("Nom ou partie du nom : ");

        if (nom.trim() === "") {
            console.log("Erreur : nom invalide.");
        } else {
            afficherListe(fonctions.rechercherParNom(nom));
        }
    } else if (choix === "7") {
        console.log("1. Solide");
        console.log("2. En progression");
        console.log("3. À renforcer");

        const choixNiveau = prompt("Votre choix : ").trim();
        let niveau = "";

        if (choixNiveau === "1") {
            niveau = "Solide";
        } else if (choixNiveau === "2") {
            niveau = "En progression";
        } else if (choixNiveau === "3") {
            niveau = "À renforcer";
        }

        if (niveau === "") {
            console.log("Erreur : niveau invalide.");
        } else {
            afficherListe(fonctions.filtrerParNiveau(niveau));
        }
    } else if (choix === "8") {
        afficherListe(fonctions.trierParProgression());
    } else if (choix === "9") {
        afficherListe(fonctions.trierParNom());
    } else if (choix === "0") {
        console.log("Au revoir !");
    } else {
        console.log("Erreur : choisissez une option entre 0 et 9.");
    }

    if (choix !== "0") {
        console.log("");
        prompt("Appuyez sur Entrée pour revenir au menu...");
    }
}
