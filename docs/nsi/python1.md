# Python : les bases

Un ordinateur, sans programme, ne sait rien faire.
Alors, programmer, qu'est-ce que c'est ? C'est créer des **programmes** (suite d'instructions exécutées par l'ordinateur).

Il existe beaucoup de **langages de programmation** différents, et nous aurons l'occasion de parler de ce qui les distingue les uns des autres, mais tous ont le même objectif : fournir des suites d'instructions à un ordinateur pour qu'il les exécute. Les instructions que vous allez écrire seront ensuite traduites en **langage machine**, qui est le seul à être directement utilisable par le processeur.

En NSI, nous allons utiliser principalement le langage **Python**.
Python est un langage "interprété", ce qui signifie qu'il faut utiliser un programme qui va lire nos instructions puis les exécuter pour nous. Nous allons donc avoir besoin d'un interpréteur.

[Voir activité 1 : Utilisation de Thonny](python-acti1.md)

## Variables et types
### Manipulation basique
Une variable, en programmation, est comparable à une boîte dans laquelle on peut ranger une valeur. On peut alors regarder la valeur à l'intérieur (fonction `print`), modifier la valeur ou effectuer un test dessus.

```python
variable1 = 42
print(variable1)
```
<div class="result" markdown>
``` title="Résultat"
42
```
</div>

```python
variable1 = 42
variable1 = "chat"
print(variable1)
```
<div class="result" markdown>
``` title="Résultat"
chat
```
</div>

```python
variable1 = "chat"
variable2 = variable1
print(variable2)
```

<div class="result" markdown>
``` title="Résultat"
chat
```
</div>

### Types de variables

Il existe quatre types de variables dits "primitifs", ce sont les types de base :

| type      | signification                        | exemples              |
| --------- | ------------------------------------ | --------------------- |
| **int**   | entier numérique                     | -1, 2, 10, 20...      |
| **str**   | string, une chaîne de caractères     | "le chat", "Mathilde" |
| **float** | valeur numérique à virgule flottante | 10.2 ; 0.3 ; -0.7     |
| **bool**  | un booléen                           | True ou False         |

On peut accéder au type d'une variable avec l'instruction `type(variable)`.

Les fonctions `int()` et `str()` permettent d'obtenir respectivement une variable de type `int` ou `str`.

!!! warning "Attention !"
    Lorsque l'on affecte une valeur à une variable, il faut toujours penser au type que l'on va créer.
    
    Par exemple, l'expression `var = 42` va créer un **entier** égal à 42. En revanche, l'expression `var = "42"` va créer une **chaîne de caractères** composée des caractères `4` et `2`. Ainsi, vous pouvez tester le code suivant :

    ```python
    var = 42 # Création d'un entier
    print("INT :", var*2)

    var = "42" # Création d'une chaîne de caractères
    print("STR :",var*2)
    ```
    <div class="result" markdown>
    ``` title="Résultat"
    INT : 84
    STR : 4242
    ```
    </div>

### Afficher une variable: print()
Pour afficher du texte, mais également une variable, on utilise la fonction `print()`. Cette fonction prend comme arguments du texte ou des variables, séparés par des virgules. Attention, pour afficher le contenu d'une variable avec `print()`, il ne faut mettre aucun guillemets, simplement le nom de la variable :

```python
variable1 = 42
variable1 = "chat"
print("La valeur de variable1 :", variable1)
```
<div class="result" markdown>
``` title="Résultat"
La valeur de variable1 : chat
```
</div>

### Demander une valeur: input()
On peut également demander à l'utilisateur de fournir une information (son prénom, sa date de naissance, son âge, etc...). On fait pour ce faire appel à la fonction `input()`, qui aura pour effet de mettre le programme Python en pause, dans l'attente que l'utilisateur écrive quelque chose. Le programme reprendra lorsque l'utilisateur aura appuyé sur la touche ++enter++ 

```python
print("Quel est votre prénom ?")
prenom = input()
print("Bonjour", prenom, "!")
```
<div class="result" markdown>
``` title="Résultat"
Quel est votre prénom ?
Mathieu
Bonjour Mathieu !
```
</div>

!!! warning "Attention !"
    Lorsque l'on affecte une valeur à une variable grâce à la fonction `input()`, son type sera toujours le type `str` (chaîne de caractères). Ainsi, si vous voulez obtenir une valeur numérique de la part de l'utilisateur, il faudra la convertir en type `int` grâce à la fonction correspondante :

    ```python
    print("Quel est votre âge ?")

    age = input() # Création d'une chaîne de caractères
    print("La variable age est du type", type(age))

    age = int(age)
    print("Après utilisation de la fonction int(), la variable age est du type", type(age))
    ```
    <div class="result" markdown>
    ``` title="Résultat"
      Quel est votre âge ?
      18
      La variable age est du type <class 'str'>
      Après utilisation de la fonction int(), la variable age est du type <class 'int'>
    ```
    </div>

### Effectuer un test

Pour effectuer un test, ou créer une condition, on utilise le mot-clé `if` qui signifie "si" en anglais.

Le mot-clé `elif`, contraction de **else if**, qui signifie "sinon, si" en anglais, permet d'ajouter une ou plusieurs conditions supplémentaires.

| Symbole | Signification                              |
| :-----: | ------------------------------------------ |
|   ==    | égalité (pour des nombres ou des chaînes)  |
|   !=    | inégalité (pour des nombres ou des chaînes |
|    <    | est inférieur à                            |
|    >    | est supérieur à                            |
|   <=    | est inférieur ou égal à                    |
|   >=    | est supérieur ou égal à                    |

**Exemple: mettre en place un choix d'options**

```python
choix = input("Voulez-vous convertir en degrés Celsius (1) ou en Kelvin (2) ? \n")
if choix == "1":
  print("Vous avez choisi l'option 1")
elif choix == "2":
  print("Vous avez choisi l'option 2")
else:
  print("Vous avez indiqué un choix non valable.")
```

Si l'utilisateur indique "1" ou "2", alors la réponse correspondante sera affichée. Pour toute autre valeur tapée par l'utilisateur, le programme indiquera que le choix n'est pas valable.

!!!tip
    Attention, lorsque l'utilisateur donne une réponse via la commande **input**, c'est un type **str** (chaîne de caractère) qui est créé, il faut donc comparer la réponse à **"1"** et non à **1**.


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

:octicons-info-16:{ .green } Nous verrons plus tard comment créer nos propres fonctions.

!!!tip "à savoir"
    Lorsque l'on appelle une fonction, on peut avoir besoin d'indiquer des **arguments**.

    Chaque fonction est différente, et il convient de vérifier son fonctionnement (quels sont les arguments nécessaires ? que fait-elle ? est-ce qu'elle renvoie une valeur ?) à l'aide de la documentation avant de l'utiliser.