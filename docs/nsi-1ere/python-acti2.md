---
prev: /nsi-1ere/python-acti1.md
next: /nsi-1ere/python1.md
---

# Les conditions : réalisation d'un mini quizz

Vous en savez désormais suffisamment pour utiliser Thonny, ce qui vous permet de produire et interpréter un programme simple en Python. Mais pour l'instant, nous disposons d'outils rudimentaires.

_Ajoutons un peu de conditions..._

## if, else : introduire des conditions

:::tip bon à savoir
En anglais, _if_ signifie "si", et _else_ signifie "sinon"
:::

Dans notre programme, nous pouvons décider de réaliser une action ou une autre selon le résultat de certains tests.

```python:exemple1
temperature = 19
if temperature > 0:
    print("Il ne fait pas si froid que ça !")
    print("En effet, la température est au-dessus de 0 : ", temperature, " degrés Celsius.")
else:
    print("L'eau est gelée !")
```

La lecture de ce programme nous permet de comprendre qu'il regarde si une température donnée est supérieure à 0. Ensuite, en fonction du résultat du test, il affichera une remarque ou l'autre.
Remarquez le décalage des lignes `3`, `4` et `6` par rapport aux autres : cela s'appelle une **indentation**. En Python, pour indiquer qu'un ensemble d'instructions appartiennent au même bloc, on utilise ces repères.

Nous avons donc deux blocs d'instructions :

- le premier est constitué des lignes 3 et 4, et sera exécuté si la température est supérieure à 0
- le second est constitué de la ligne 6, et sera exécuté si la température n'est pas inférieure à 0 (_else_)

:::consigne

1. Ajouter d'autres lignes affichant une phrase dans l'un ou l'autre des blocs.
2. Modifier le programme pour qu'il demande à l'utilisateur une valeur de température. Vous pouvez vous aider de l'activité précédente !
   :::

## elif : des possibilités supplémentaires

Résumons notre [programme précédent](#if-else-introduire-des-conditions) :

- Si la température est supérieure à 0, exécuter les lignes 3 et 4
- Sinon, exécuter la ligne 6

Ce `else` ne permet pas beaucoup de nuances : il exécutera simplement son code dans le cas où la condition précédente n'est pas vérifiée. Il existe un autre mot-clé pour affiner les conditions : **sinon, si** que l'on traduirait en anglais par **else, if**, et qui est symbolisé en python par la contraction des deux mots, ce qui donne `elif` :

```python:exemple2
temperature = 19
if temperature > 15:
    print("Il ne fait pas si froid que ça !")
    print("En effet, la température est au-dessus de 15 : ", temperature, " degrés Celsius.")
elif temperature > 0:
    print("Nous sommes entre 0 et 15 degrés, on commence à avoir froid !")
else:
    print("L'eau est gelée !")
```

La lecture du code nous donne donc :

- Si la température est supérieure à 15, exécuter les lignes 3 et 4
- Sinon, si la température est supérieure à 0 (et donc inférieure à 15), exécuter la ligne 6
- Sinon, exécuter la ligne 8

:::consigne
À l'aide de la [fiche mémo](/nsi-1ere/python1.md) et des exemples vus aujourd'hui, réaliser un mini-quizz comportant cinq questions.

Chaque question doit se dérouler ainsi :

- la question est posée
- le joueur propose une réponse
- le programme répond "Gagné" ou "Perdu"

Vous pouvez simplifier les tests en proposant des questions à choix multiples !
:::
