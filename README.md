# SAS Progress Console

## Présentation

SAS Progress Console est une application JavaScript exécutée dans le terminal avec Node.js, réalisée dans le cadre du SAS à YouCode Nador.

Elle permet de gérer des apprenants et leurs résultats sur les 7 journées du SAS, puis d'afficher leur progression.

Les noms et les résultats sont fictifs. Les niveaux affichés sont des repères pédagogiques : le programme ne décide jamais de l'admission d'une personne.

## Fonctionnalités et menu

| Choix | Action |
| --- | --- |
| 1 | Afficher le tableau de bord du groupe. |
| 2 | Afficher la liste des apprenants. |
| 3 | Ajouter un apprenant avec un identifiant, un nom complet et une ville. |
| 4 | Consulter un apprenant par identifiant. |
| 5 | Ajouter ou modifier le résultat d'une journée. |
| 6 | Rechercher un apprenant par tout ou partie de son nom. |
| 7 | Filtrer les apprenants selon leur niveau. |
| 8 | Trier les apprenants par progression décroissante. |
| 9 | Trier les apprenants par ordre alphabétique. |
| 0 | Quitter le programme. |

Après une action, appuyer sur Entrée pour revenir au menu. Une saisie incorrecte provoque un message d'erreur et les données incorrectes ne sont pas enregistrées.

## Organisation du projet

| Fichier | Rôle |
| --- | --- |
| `src/data.js` | Contient les données fictives de départ. |
| `src/progression.js` | Contient les fonctions de validation, de gestion, de calcul, de recherche, de tri et du tableau de bord. |
| `src/index.js` | Gère le menu et les saisies de l'utilisateur. |
| `tests/scenarios.js` | Vérifie le comportement des fonctions avec 18 scénarios. |
| `package.json` | Déclare la dépendance utilisée pour la saisie. |
| `package-lock.json` | Fixe les versions des dépendances installées. |
| `README.md` | Explique le fonctionnement et les commandes du projet. |

## Installation et lancement

Node.js et npm doivent être installés. Ouvrir un terminal dans le dossier du projet, puis installer les dépendances :

```bash
npm install
```

Lancer l'application :

```bash
node src/index.js
```

Cette version utilise `prompt-sync` pour lire les réponses au clavier. Le PDF demande un projet sans dépendance externe : l'autorisation d'utiliser `prompt-sync` reste à confirmer avec le formateur.

## Structure des données

Un apprenant est un objet contenant :

- `id` : un nombre entier positif et unique ;
- `nomComplet` : une chaîne de caractères ;
- `ville` : une chaîne de caractères ;
- `resultats` : un tableau de résultats journaliers.

Chaque résultat journalier est un objet contenant :

- `jour` : un entier entre 1 et 7 ;
- `exercicesTermines` : le nombre d'exercices terminés ;
- `totalExercices` : le nombre d'exercices proposés ;
- `challengeTermine` : un booléen, `true` ou `false`.

Au démarrage, les données fournies donnent les résultats suivants :

| Identifiant | Nom complet | Progression | Niveau |
| --- | --- | --- | --- |
| 1 | Sara El Amrani | 80 % | Solide |
| 2 | Yassine Bennani | 60 % | En progression |
| 3 | Imane El Idrissi | 90 % | Solide |
| 4 | Omar Ait Ali | 35 % | À renforcer |
| 5 | Lina Berrada | 0 % | À renforcer |

Lina possède un tableau `resultats` vide. Son pourcentage de 0 % correspond à la convention utilisée pour un profil sans résultat.

## Nettoyage et validation

Les noms sont nettoyés avec `trim()` pour retirer les espaces au début et à la fin. Les espaces ordinaires répétés entre les mots sont remplacés par un seul espace.

Pour la recherche et le tri, `normaliserNom` transforme aussi les noms en minuscules avec `toLowerCase()`. La recherche accepte un nom complet ou partiel. La casse du nom est conservée pour l'affichage.

Avant un enregistrement, le programme vérifie que :

- l'identifiant est un entier positif et n'est pas déjà utilisé lors d'un ajout ;
- le nom et la ville sont des textes non vides ;
- l'apprenant existe avant d'enregistrer ses résultats ;
- le jour est un entier compris entre 1 et 7 ;
- les nombres d'exercices sont des entiers positifs ou nuls ;
- le nombre d'exercices terminés ne dépasse pas le total proposé ;
- `challengeTermine` est un booléen.

Le menu convertit les saisies numériques en nombres. Une saisie numérique vide est refusée. La réponse `oui` ou `non` au challenge est convertie en booléen.

Si une journée existe déjà pour un apprenant, son résultat est remplacé. La journée n'est pas ajoutée une deuxième fois.

## Calcul de la progression individuelle

Le programme calcule depuis les journées renseignées :

- le total des exercices terminés ;
- le total des exercices proposés ;
- le nombre de challenges terminés, avec `challengeTermine === true` ;
- le nombre de journées renseignées, avec la longueur du tableau `resultats`.

La formule du pourcentage est :

```text
Progression = (total terminé / total proposé) × 100
```

Par exemple, Sara a terminé 18 + 14 = 32 exercices sur 40 proposés. Sa progression est de 80 %, avec 1 challenge terminé et 2 journées renseignées.

Si le total proposé est égal à zéro, la progression est fixée à 0 % pour éviter une division par zéro.

### Niveaux et pourcentages décimaux

Le niveau est calculé avec le pourcentage non arrondi.

| Niveau | Condition |
| --- | --- |
| Solide | Progression supérieure ou égale à 80 %. |
| En progression | Progression supérieure ou égale à 50 % et strictement inférieure à 80 %. |
| À renforcer | Progression strictement inférieure à 50 %. |

Les limites sont testées : 49,9 % donne « À renforcer », 50 % et 79,9 % donnent « En progression », et 80 % donne « Solide ».

## Tableau de bord et moyenne du groupe

Le tableau de bord affiche le nombre d'apprenants, la moyenne du groupe, le nombre de profils de chaque niveau et la liste des apprenants triée par progression décroissante.

Chaque profil affiche aussi son niveau, ses journées renseignées, ses journées non renseignées, le nombre de challenges terminés et les jours des challenges non terminés.

La moyenne du groupe est la moyenne des pourcentages individuels. Chaque apprenant compte une fois :

```text
Moyenne du groupe = somme des progressions / nombre d'apprenants
```

Un apprenant sans résultat compte avec une progression de 0 %. Si le groupe est vide, la moyenne est fixée à 0 %.

Avec les cinq profils de départ :

```text
(80 + 60 + 90 + 35 + 0) / 5 = 53 %
```

Le tableau de bord affiche donc 5 apprenants : 2 profils « Solide », 1 profil « En progression » et 2 profils « À renforcer ».

## Journées absentes et challenges

Une journée absente du tableau `resultats` est une journée non renseignée. Elle n'ajoute aucun exercice aux totaux.

Un résultat avec `challengeTermine: false` correspond à une journée renseignée dont le challenge n'est pas terminé. Seules ces journées apparaissent dans la liste des challenges non terminés.

Un profil sans résultat possède 0 journée renseignée, 0 challenge terminé et une progression de 0 %. Les sept journées sont alors non renseignées.

Une journée enregistrée avec 0 exercice proposé et 0 terminé compte comme une journée renseignée, même si elle n'ajoute rien aux totaux.

## Conservation des données

Les ajouts et modifications effectués depuis le menu restent en mémoire pendant l'exécution. Ils ne sont pas écrits dans `src/data.js`.

Après la fermeture du programme, ces modifications sont perdues. Au prochain lancement, les données définies dans `src/data.js` sont chargées à nouveau.

## Tests

Depuis le dossier du projet, lancer :

```bash
node tests/scenarios.js
```

Le fichier contient 18 scénarios :

1. Vérifier les indicateurs de Sara : 32 exercices sur 40, 80 %, 1 challenge terminé et 2 journées renseignées.
2. Retrouver Sara avec une recherche partielle utilisant une casse différente.
3. Nettoyer les espaces et normaliser les majuscules dans un nom.
4. Ajouter un apprenant et nettoyer son nom et sa ville.
5. Ajouter puis modifier une journée sans créer de doublon.
6. Refuser un identifiant déjà utilisé.
7. Refuser un jour en dehors de 1 à 7.
8. Refuser un nombre d'exercices terminés supérieur au total, en conservant l'ancien résultat.
9. Refuser un nombre d'exercices décimal.
10. Refuser des textes à la place des nombres dans la fonction de validation.
11. Refuser un identifiant de type string dans la fonction d'ajout.
12. Refuser un challenge qui n'est pas un booléen.
13. Traiter un apprenant sans journée renseignée.
14. Traiter un total d'exercices proposés égal à zéro.
15. Classer une progression de 49,9 % dans « À renforcer ».
16. Classer une progression de 50 % dans « En progression ».
17. Classer une progression de 79,9 % dans « En progression ».
18. Classer une progression de 80 % dans « Solide ».

Le résumé attendu est :

```text
Tests réussis : 18/18
Tests échoués : 0
```

Les messages d'erreur affichés pendant les cas invalides sont attendus : ils montrent que les données incorrectes sont refusées. Le résumé permet de vérifier que les 18 tests ont réussi.

## Notions utilisées

Le projet met en pratique les variables, les types, les opérateurs, les conditions, les boucles, les fonctions, les chaînes de caractères, les tableaux, les objets, la recherche et le tri.