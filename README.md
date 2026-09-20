# SAS Progress Console

## Présentation

SAS Progress Console est une application JavaScript qui fonctionne dans le terminal avec Node.js.

Le projet permet de gérer les apprenants pendant les 7 jours du SAS, d'enregistrer leurs résultats et de suivre leur progression.

Toutes les données utilisées dans ce projet sont fictives.

---

## Fonctionnalités

L'application permet de :

- afficher un tableau de bord ;
- afficher la liste des apprenants ;
- ajouter un nouvel apprenant ;
- rechercher un apprenant par identifiant ;
- ajouter ou modifier le résultat d'une journée ;
- rechercher un apprenant par nom ;
- filtrer les apprenants par niveau ;
- trier les apprenants par progression décroissante ;
- trier les apprenants par ordre alphabétique.

---

## Données d'un apprenant

Chaque apprenant contient :

- un identifiant unique ;
- un nom complet ;
- une ville ;
- une liste de résultats.

Chaque résultat contient :

- le numéro du jour ;
- le nombre d'exercices terminés ;
- le nombre total d'exercices ;
- l'état du challenge.

---

## Calcul de la progression

La progression d'un apprenant est calculée avec la formule suivante :

```text
Progression = (total des exercices terminés / total des exercices proposés) × 100
```

Si le total des exercices proposés est égal à `0`, la progression est égale à `0%`.

Les niveaux sont définis comme suit :

- **Solide** : progression supérieure ou égale à 80% ;
- **En progression** : progression entre 50% et 79% ;
- **À renforcer** : progression inférieure à 50%.

La moyenne du groupe est calculée à partir de la moyenne des progressions des apprenants.

---

## Journées et challenges

Une journée qui n'existe pas dans les résultats est considérée comme une journée non renseignée.

Un challenge avec la valeur :

```js
challengeTermine: false
```

signifie que la journée a bien été renseignée, mais que le challenge n'a pas été terminé.

Cela permet de faire la différence entre :

- une journée non renseignée ;
- une journée renseignée avec un challenge non terminé.

---

## Validation des données

L'application vérifie plusieurs cas avant d'enregistrer les informations :

- l'identifiant doit être valide et unique ;
- le nom ne doit pas être vide ;
- la ville ne doit pas être vide ;
- le jour doit être compris entre 1 et 7 ;
- le nombre d'exercices ne peut pas être négatif ;
- le nombre d'exercices terminés ne peut pas dépasser le nombre total d'exercices ;
- un résultat existant pour une journée est modifié au lieu d'être ajouté une deuxième fois.

---

## Installation

Installer les dépendances :

```bash
npm install
```

---

## Lancer l'application

```bash
node src/index.js
```

---

## Lancer les tests

```bash
node tests/scenarios.js
```

---

## Scénarios de test

Le projet contient plusieurs tests :

1. vérifier la progression de Sara ;
2. vérifier la recherche partielle par nom ;
3. vérifier l'ajout d'un apprenant ;
4. vérifier la modification d'un résultat sans créer de doublon ;
5. vérifier le refus d'un identifiant déjà utilisé ;
6. vérifier le refus d'un résultat invalide.

---

## Structure du projet

```text
projet-final-sas-js/
│
├── src/
│   ├── data.js
│   ├── progression.js
│   └── index.js
│
├── tests/
│   └── scenarios.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Technologies utilisées

- JavaScript
- Node.js
- prompt-sync
- Git
- GitHub

---

## Objectif du projet

L'objectif principal de ce projet est de mettre en pratique les notions étudiées pendant le SAS :

- variables ;
- conditions ;
- boucles ;
- fonctions ;
- strings ;
- arrays ;
- objects ;
- recherche ;
- tri ;
- validation des données.