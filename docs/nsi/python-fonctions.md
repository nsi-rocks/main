---
icon: octicons/info-24
hide:
  - footer
---
# Python : fonctions
## Fonctions : print et input

Une fonction est un d'outil qui permet de réaliser une action précise. Il existe de nombreuses fonctions prédéfinies dans Python, et nous en avons déjà rencontré deux dans l'[activité 1](python-acti1.md) : `print()` et `input()`.

Voici comment nous les avons utilisées :

```python
print("Bonjour")
print("La température est de", temperature, "degrés")
input("Quel est ton prénom ? \n")
input()
```

On peut remarquer qu'elles n'ont pas toutes été appelées de la même façon.

- à la ligne 1, nous avons appelé `print` en passant l'argument `"Bonjour"`
- à la ligne 2, nous avons appelé `print` en passant les arguments successifs :
  - `"La température est de"`
  - `temperature`
  - `"degrés"`
- à la ligne 3, nous avons appelé `input` en passant l'argument `"Quel est ton prénom ? \n")`
- à la ligne 4, nous n'avons passé aucun argument à la fonction `input`

Ces quatre cas de figure fonctionnent, et pourtant ils ne sont pas tous identiques.

!!!tip "à savoir"
    Lorsque l'on appelle une fonction, on peut avoir besoin d'indiquer des **arguments**.

    Chaque fonction est différente, et il convient de vérifier son fonctionnement (quels sont les arguments nécessaires ? que fait-elle ? est-ce qu'elle renvoie une valeur ?) à l'aide de la documentation avant de l'utiliser.

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

On remarque que malgré le fait que l'on a appelé nos variables `int_a` et `int_b`, rien ne nous empêche d'appeler la fonction addition avec des chaînes de caractère. L'opération d'addition pour deux chaînes de caractère s'appelle la **concaténation**.
D'ailleurs, la fonction addition **ne fonctionne pas** si l'on cherche à additionner une variable de type `STR` avec une variable de type `INT`.