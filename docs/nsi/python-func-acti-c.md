---
icon: octicons/git-commit-24
hide:
  - footer
  - toc
---
# Activités fonctions : correction
## PF 2
!!! check "Correction"
    Créer et appeler une fonction qui a pour effet de convertir une température des degrés Celsius vers les Kelvin, et de renvoyer sa valeur grâce à `return`:  
    > print(celsiusToKelvin(temp))

    La fonction renverra la valeur -1 si la variable fournie n'est pas du type `INT`

    ``` python
    def celsiusToKelvin(temp):
        return temp + 273.15
    ```

## PF 3
!!! check "Correction"
    Modifier la fonction `addition(int_a, int_b)` du cours pour qu'elle ne fonctionne qu'avec deux valeurs numériques entières.
    > print(addition(3, -4))

    Dans tous les autres cas, elle renverra la chaîne de caractère "ERREUR DE TYPE"


    ``` python
    def addition(int_a, int_b):
        if type(int_a) == type(int_b) == type(1):
            return int_a + int_b
        else:
            return "ERREUR DE TYPE"
    ```

## PF 4
!!! check "Correction"
    Réaliser un programme "couteau-suisse" qui propose le menu suivant, et qui réalise les calculs nécessaires :
    ```
    Bienvenue dans le couteau-suisse ! Choisissez une option :
    1: Calculer la surface d'un rectangle
    2: Calculer la surface d'un disque
    3: Convertir des degrés Celsius en Kelvin
    4: Convertir des Kelvin en degrés Celsius
    5: Calculer le carré d'un nombre
    6: Afficher la table de multiplication d'un nombre (10 premiers)
    
    ... déroulement du programme ...
    
    Voulez-vous utiliser le couteau-suisse à nouveau ?
    oui/non
    ```

    ```python title="couteau-suisse.py" linenums="1"
    --8<-- "docs/nsi/couteau-suisse.py"
    ```

    1. La fonction `#!python range()` est nouvelle pour nous. Elle a pour effet de créer une séquence basée sur les arguments donnés.  
    Ici, `#!python range(1, 7)` va créer une séquence commençant à 1 et **s'arrêtant juste avant 7**, soit : [1, 2, 3, 4, 5, 6] [plus d'infos ici](https://fr.acervolima.com/fonction-range-python/)  
    Par conséquent `#!python rep not in range(1,7)` sera `True` si la variable `rep` n'appartient pas à la séquence [1, 2, 3, 4, 5, 6].
    2. Nous utilisons à nouveau la fonction `#!python range()` ici, en combinaison avec le mot-clé `#!python for`.  
    C'est une autre façon de créer des boucles, qu'il faut lire ainsi : "pour chaque item _i_ de la séquence [1, ..., 9, 10]".  
    Nous y reviendrons plus tard.

    Remarques:

    `ligne 14` { .def }
    :  La fonction `#!python range()` est nouvelle pour nous.  
    Elle a pour effet de créer une séquence basée sur les arguments donnés.  
    Ici, `#!python range(1, 7)` va créer une séquence commençant à 1 et **s'arrêtant juste avant 7**, soit : [1, 2, 3, 4, 5, 6]  
    Par conséquent `#!python rep not in range(1,7)` sera `True` si la variable `rep` n'appartient pas à la séquence [1, 2, 3, 4, 5, 6].  
    [plus d'infos ici](https://fr.acervolima.com/fonction-range-python/)  

    `ligne 49` { .def }
    :  Nous utilisons à nouveau la fonction `#!python range()` ici, en combinaison avec le mot-clé `#!python for`.  
    C'est une autre façon de créer des boucles, qu'il faut lire ainsi : "pour chaque item _i_ de la séquence [1, ..., 9, 10]".  
    Nous y reviendrons plus tard.