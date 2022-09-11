# Création d'une fonction pour le menu
from math import pi

def menu():
    rep = -1
    print("Bienvenue dans le couteau-suisse ! Choisissez une option :")
    print("1: Calculer la surface d'un rectangle")
    print("2: Calculer la surface d'un disque")
    print("3: Convertir des degrés Celsius en Kelvin")
    print("4: Convertir des Kelvin en degrés Celsius")
    print("5: Calculer le carré d'un nombre")
    print("6: Afficher la table de multiplication d'un nombre (10 premiers)")

    while rep not in range(1,7): #(1)!
        rep = int(input())
        if rep not in range(1,7):
            print("Vous avez indiqué un mauvais choix, veuillez indiquer une valeur entre 1 et 6. \n")
    return rep

# Création des fonctions associées à chaque choix
def surfaceRectangle():
    longueur = float(input("Quelle est la longueur du rectangle ?"))
    largeur = float(input("Quelle est la largeur du rectangle ?"))

    print("La surface du rectangle est égale à", longueur*largeur)

def surfaceDisque():
    rayon = float(input("Quel est le rayon du disque ?"))

    print("La surface du disque est égale à", pi*rayon*rayon)

def celsiusToKelvin():
    celsius = float(input("Quelle est la température en degrés Celsius ?"))

    print("La température est égale à", celsius+273.15, "Kelvin")

def kelvinToCelsius():
    kelvin = float(input("Quelle est la température en Kelvin ?"))

    print("La température est égale à", kelvin-273.15, "degrés Celsius")

def carrNombre():
    nombre = int(input("De quel nombre entier voulez-vous calculer le carré ?"))

    print("Le carré de", nombre, "est égal à", nombre*nombre)

def tableMulti():
    nombre = int(input("De quel nombre voulez-vous la table de multiplication ?"))
    for i in range(1, 11): #(2)!
        print(nombre*i)

# Création de la structure logique du programme
runProgram = True
while runProgram:
    choix = menu()
    if choix == 1:
        surfaceRectangle()
    elif choix == 2:
        surfaceDisque()
    elif choix == 3:
        celsiusToKelvin()
    elif choix == 4:
        kelvinToCelsius()
    elif choix == 5:
        carrNombre()
    elif choix == 6:
        tableMulti()

    choix = input("Voulez-vous recommencer ? [oui]/non ")
    if choix.lower() == "oui" or choix == "":
        runProgram = True
    elif choix.lower() == "non":
        runProgram = False
    else:
        runProgram = False
        print("Vous n'avez répondu ni oui, ni non, terminaison du programme.")
