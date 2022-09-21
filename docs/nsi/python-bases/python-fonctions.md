---
icon: octicons/info-24
hide:
  - footer
---
# Python : fonctions
## Utilité d'une fonction
L'utilisation de fonctions est une base incontournable de la programmation modulaire. On peut faire l'analogie avec notre quotidien en se demandant pourquoi sur les paquets de pâtes on ne trouve pas toutes les étapes nécessaires à leur cuisson.

- on lit sur les paquets de pâtes l'instruction __"x minutes de cuisson"__, et rien d'autre.
- dans votre cerveau, c'est la seule information nécessaire.

Pourquoi ?  
Parce que dans votre cerveau, il existe une fonction "préparer les pâtes" qui ressemble à ceci :
``` hl_lines="8" linenums="1"
- prendre une casserole
- remplir la casserole d'eau
- allumer la plaque chauffante
- poser la casserole sur la plaque 
- attendre que l'eau soit à ébullition
- mettre les pâtes dans l'eau
- regarder l'heure
- ajouter x minutes
- noter l'heure à laquelle les pâtes seront cuites
```

Ainsi, vous n'avez qu'à appeler votre fonction "préparer des pâtes" après avoir lu le temps de cuisson sur le paquet pour pouvoir vous préparer des pâtes.
Et vous pourrez appeler cette même fonction à chaque fois que vous aurez besoin d'elle, c'est-à-dire à chaque fois que vous aurez besoin de préparer des pâtes.

!!! check "à savoir"
    Une fonction a pour mission de réaliser une tâche précise. Pour ce faire, il faut lui fournir différents éléments lors de sa création :

    - quelles données le programme qui l'appelle doit-il lui fournir ?  
      :octicons-arrow-right-24: _dans notre exemple, le nombre de minutes nécessaires à la cuisson_
    - quelles instructions doit-elle exécuter ?  
      :octicons-arrow-right-24: _dans notre exemple, les lignes 1 à 6_
    - quelles données renvoie-t-elle au programme qui l'a appelée ?  
      :octicons-arrow-right-24: _dans notre exemple, c'est le résultat de "heure actuelle passée de x minutes"_

    On pourrait alors définir une autre fonction, qui aurait pour tâche précise :  
     __régler une alarme à hh:mm__


## Fonctions print et input

Il existe de nombreuses fonctions prédéfinies dans Python, et nous en avons déjà rencontré deux dans l'[activité 1](python-acti1.md) : `print()` et `input()`.

Étudions-les.

### étude de print

:octicons-arrow-right-24: quelles données faut-il lui fournir ?

> les chaînes de caractère et variables à afficher

:octicons-arrow-right-24: quelles instructions exécute-t-elle ?

> elle affiche dans la console les éléments fournis

:octicons-arrow-right-24: quelles données renvoie-t-elle au programme ?

> aucune

### étude de input

quelles données faut-il lui fournir ?

> [optionnel] le texte à afficher juste avant (la question posée par exemple)

:octicons-arrow-right-24: quelles instructions exécute-t-elle ?

> elle met le programme en pause  
> elle collecte la chaîne de caractère tapée par l'utilisateur  
> elle laisse le programme continuer quand ++enter++ est pressée

:octicons-arrow-right-24: quelles données renvoie-t-elle au programme ?

> la chaîne de caractères que l'utilisateur a tapée au clavier 

!!! check  "à savoir"
    Les données que l'on doit fournir à certaines fonctions au moment où on les appelle sont les __arguments__.  
    Les données que la fonction renvoie au programme sont les __valeurs de retour__.  
    Selon les fonctions, on peut avoir zéro, un ou plusieurs arguments.  
    Selon les fonctions, on peut avoir zéro, une ou plusieurs valeurs de retour.  
    

## Création d'une fonction
Il existe donc de nombreuses fonctions prédéfinies qui permettent de réaliser des actions basiques, communes à beaucoup de programmes.  
Mais très rapidement, il devient nécessaire de créer ses propres fonctions, afin de rendre notre code **plus lisible, plus efficace, et plus facilement modifiable**.

``` python title="exemple" linenums="1"
def bonne_reponse(prenom):
  print("Bravo", prenom, ", bonne réponse !")
  print("Question suivante...")

prenom_utilisateur = input("Quel est ton prénom ? \n")

bonne_reponse(prenom_utilisateur)
bonne_reponse("Sophie")
bonne_reponse(192)
bonne_reponse(prenom_utilisateur)
```
<div class="result" markdown>
``` title="Résultat"
Quel est ton prénom ? 
Mathieu
Bravo Mathieu , bonne réponse !
Question suivante...
Bravo Sophie , bonne réponse !
Question suivante...
Bravo 192 , bonne réponse !
Question suivante...
Bravo Mathieu , bonne réponse !
Question suivante...
```
</div>

Cet exemple n'a pas beaucoup d'intérêt en pratique, mais il permet de comprendre comment il est possible de créer ses propres fonctions.

!!! info "Explication de la syntaxe de la ligne 1"
    - `#!python def` permet d'indiquer à Python que l'on va créer une nouvelle fonction
    - `bonne_reponse` est le nom de la fonction, c'est ainsi qu'il faudra l'appeler dans le reste du programme
    - `(prenom)` représente la liste des arguments qui seront utilisés par la fonction. Cette liste peut comporter zéro, une, ou plusieurs variables. On peut nommer ces variables comme on veut, indépendamment du reste du programme.

## Valeur de retour
Une fonction peut également **renvoyer une valeur**, grâce à l'instruction `#!python return`. L'exemple ci-dessous illustre une fonction qui servirait à additionner deux nombres :

``` python linenums="1"
def addition(int_a, int_b):
  return int_a + int_b

print(addition(12, 5))
print(addition(-3, 2))
print(addition(-4, -5))
print(addition("Chat", "on"))
print(addition("Chat", 4))
```
<div class="result" markdown>
``` title="Résultat"
17
-1
-9
Chaton
Traceback (most recent call last):
  File "<string>", line 8, in <module>
  File "<string>", line 2, in addition
TypeError: can only concatenate str (not "int") to str
```
</div>

On remarque que malgré le fait que l'on a appelé nos variables `int_a` et `int_b`, rien ne nous empêche d'appeler la fonction addition avec des chaînes de caractères.  
L'opération d'addition pour deux chaînes de caractère s'appelle la **concaténation**.  
D'ailleurs, la fonction addition **ne fonctionne pas** si l'on cherche à additionner une variable de type `STR` avec une variable de type `INT`.