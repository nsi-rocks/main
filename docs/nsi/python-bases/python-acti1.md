---
icon: octicons/git-commit-24
hide:
  - footer
---

# Utilisation de Thonny

Thonny est téléchargeable gratuitement depuis cette adresse :  
[https://thonny.org/](https://thonny.org/)

!!!example "Consigne"
    Thonny est un interpréteur Python **gratuit, open-source, et multi-plateformes**.  
    Que signifient ces termes ?

## Interface de Thonny

![Interface de Thonny](/images/thonny.png){ width="300"}

L'interface de Thonny est très simple, la zone supérieure est l'**éditeur de code**, et la zone inférieure s'appelle la **console**.

### Utilisation de la console

Pour utiliser la console, il suffit de taper les instructions les unes après les autres. Essayons avec quelque chose de simple.

``` python title="dans la console"
>>> 3 + 4
```

La console a calculé pour vous la somme `3+4`. Vous pouvez utiliser des variables dans la console :

``` python title="dans la console"
>>> print("Bonjour")
>>> temperature = 19
>>> print("La température est de", temperature, "degrés")
```

Vous pouvez également intégrer de l'interactivité avec la fonction `input()` :

``` python title="dans la console"
>>> prenom = input("Quel est ton prénom ? \n")
# La console attend que vous indiquiez une valeur
>>> print("Bonjour ", prenom, " !")
```

### Utilisation de l'éditeur de code

La console est pratique pour de petites opérations, mais elle se retrouve très vite limitée lorsqu'il est question de réaliser des programmes plus complexes et plus longs. L'éditeur de code nous permet de pouvoir écrire toutes les instructions à la suite les unes des autres, puis de lancer l'interprétation du programme à l'aide de la touche `F5` (ou du bouton correspondant).

Voici un exemple de programme Python très simple.

```python title="dans l'éditeur de code"
print("Bonjour, quel est ton prénom ?")
prenom = input()
print("Bonjour ", prenom, ", quel est ton âge ?")
age = input()
print("Très bien ", prenom, ", tu as ", age, " ans.")
```

!!!example "Consigne"

    1. Réaliser un programme python basique en vous inspirant du dernier exemple.
    2. Dans l'exemple 3, à quoi sert le caractère `\n` ?