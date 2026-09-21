# SAS Progress Console

## Présentation

SAS Progress Console est une application JavaScript exécutée dans le terminal avec Node.js.

Elle permet de suivre la progression des apprenants pendant les 7 jours du SAS avec des données fictives.

Les niveaux sont seulement des indicateurs pédagogiques. Le programme ne décide pas de l'admission.

## Installation

```bash
npm install
```

Le projet utilise `prompt-sync` pour lire les réponses dans le terminal. Cette utilisation a été autorisée par le formateur.

## Lancement

```bash
npm start
```

## Tests

```bash
npm test
```

Résultat attendu :

```text
Tests réussis : 6/6
```

## Organisation des fichiers

| Fichier | Rôle |
| --- | --- |
| `src/data.js` | Contient les apprenants et leurs résultats. |
| `src/progression.js` | Contient les fonctions principales du projet. |
| `src/index.js` | Contient le menu et les saisies utilisateur. |
| `tests/scenarios.js` | Contient les scénarios de test. |
| `package.json` | Contient les commandes et la dépendance. |

## Fonctionnalités

Le programme permet de :

- ajouter un apprenant ;
- empêcher les identifiants en double ;
- rechercher par identifiant ;
- rechercher par nom complet ou partiel ;
- enregistrer un résultat journalier ;
- modifier un résultat déjà enregistré ;
- calculer la progression ;
- filtrer par niveau ;
- trier par progression ;
- trier par nom ;
- afficher un tableau de bord.

## Calcul de la progression

La formule utilisée est :

```text
progression = (total des exercices terminés / total des exercices proposés) × 100
```

Si aucun exercice n'est proposé, la progression est égale à `0 %`.

Les niveaux sont :

| Niveau | Condition |
| --- | --- |
| Solide | Progression supérieure ou égale à 80 %. |
| En progression | Progression supérieure ou égale à 50 % et inférieure à 80 %. |
| À renforcer | Progression inférieure à 50 %. |

## Validation

Le programme vérifie :

- que le jour est compris entre 1 et 7 ;
- que les nombres d'exercices sont valides ;
- que les nombres ne sont pas négatifs ;
- que les exercices terminés ne dépassent pas le total ;
- que l'identifiant n'est pas déjà utilisé.

## Tableau de bord

Le tableau de bord affiche :

- le nombre total d'apprenants ;
- la moyenne du groupe ;
- le nombre de personnes dans chaque niveau ;
- les journées non renseignées ;
- les challenges non terminés ;
- la progression de chaque apprenant.

Une journée absente est une journée non renseignée.

Un challenge avec la valeur `false` est un challenge non terminé pour une journée renseignée.

## Tests réalisés

Les tests vérifient :

1. la progression de Sara ;
2. la recherche par une partie du nom ;
3. l'ajout d'un apprenant ;
4. le refus d'un identifiant déjà utilisé ;
5. le refus d'un jour invalide ;
6. la modification d'une journée sans doublon.

## Notions utilisées

Le projet utilise :

- les variables ;
- les types ;
- les opérateurs ;
- les conditions ;
- les boucles ;
- les fonctions ;
- les chaînes de caractères ;
- les tableaux ;
- les objets ;
- la recherche ;
- le tri.