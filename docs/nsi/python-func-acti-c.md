---
icon: octicons/git-commit-24
hide:
  - footer
---
# Activités fonctions : correction
## PF 3
!!! check "Correction"
    Créer et appeler une fonction qui a pour effet de convertir une température des degrés Celsius vers les Kelvin, et de renvoyer sa valeur grâce à `return`:  
    > print(celsiusToKelvin(temp))

    La fonction renverra la valeur -1 si la variable fournie n'est pas du type `INT`

    ``` python
        def celsiusToKelvin(temp):
            return temp + 273.15
    ```

## PF 4
!!! check "Correction"
    Modifier la fonction `addition(int_a, int_b)` du cours pour qu'elle ne fonctionne qu'avec deux valeurs numériques entières.
    > print(addition(3, -4))

    Dans tous les autres cas, elle renverra la chaîne de caractère "ERREUR DE TYPE"


    ``` python
        def addition(int_a, int_b):
            if type(int_a) == type(int_b) == type(1):
                return temp + 273.15
    ```

## PF 5
!!! example "Consigne"
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