---
icon: octicons/info-24
hide:
  - footer
---
# Python : séquences
Il est possible de "stocker" plusieurs grandeurs dans une même structure.  
Ce type de structure est appelé une __séquence__. De façon plus précise, nous pouvons définir une séquence comme un ensemble fini et ordonné d'éléments.

Il existe deux types de séquences en Python : les __tuples__ et les __listes__.

## Les tuples
En mathématiques, on appelle __uplets__ des "collections ordonnées d'objets". Plus précisément, on appellera n-uple ou n-uplet une collection contenant _n_ objets. Vous trouverez davantage d'informations sur la page [:material-wikipedia: Uplet - Wikipedia](https://fr.wikipedia.org/wiki/Uplet).  
Le terme courant en programmation est l'anglicisme correspondant, le __tuple__.  
Commençons par un exemple simple :

``` python 
premier_tuple = (1, 9, 42, 13, 24)
```
<figure markdown>
![](/images/tuple.png#only-light){ width="500" }
![](/images/tuple-d.png#only-dark){ width="500" }
<figcaption>On peut représenter ce tuple par un schéma basique.</figcaption>
</figure>


Ainsi, dans la variable `premier_tuple`, on a :

- la __valeur 1__ en position _0_
- la __valeur 9__ en position _1_
- la __valeur 42__ en position _2_
- la __valeur 13__ en position _3_
- la __valeur 24__ en position _3_

Pour accéder à ces valeurs, on utilise une notation à base de __crochets__. Le code ci-dessous permet d'analyser chaque élément du tuple. On remarque que l'on peut sans problème faire cohabiter différents types natifs entre eux au sein d'un même tuple.

``` python title="Analyse de tuple"
mon_tuple = (42, "chat", 12, True)

print(type(mon_tuple), ":", mon_tuple)
print(type(mon_tuple[0]), ":", mon_tuple[0])
print(type(mon_tuple[1]), ":", mon_tuple[1])
print(type(mon_tuple[2]), ":", mon_tuple[2])
print(type(mon_tuple[3]), ":", mon_tuple[3])
```
<div class="result" markdown>
``` title="Résultat"
<class 'tuple'> : (42, 'chat', 12, True)
<class 'int'> : 42
<class 'str'> : chat
<class 'int'> : 12
<class 'bool'> : True
```
![](/images/tuple1.png#only-light){ width="500" }
![](/images/tuple1-d.png#only-dark){ width="500" }
</div>

!!! info ""
    Un tuple est utile dans plusieurs cas : il permet à une fonction de renvoyer plusieurs valeurs, comme par exemple des couples de coordonnées, des numéros de téléphone, ou de façon plus générale plusieurs valeurs qui sont liées.

Reprenons par exemple notre fonction `addition()`. Nous pouvons la modifier afin qu'au lieu de renvoyer la somme des deux valeurs, elle renvoie un tuple contenant la valeur a, la valeur b, et enfin la somme des deux. Ainsi, nous conservons toute l'information : nous connaissons la somme des deux valeurs, mais nous pouvons également retrouver comment elle a été calculée.

``` python title="Fonction addition"
def addition(int_a, int_b):
    if type(int_a) == type(int_b) == type(1):
        return (int_a, int_b, int_a + int_b)
    else:
        return "ERREUR DE TYPE"

print(addition(12, 8))
```
<div class="result" markdown>
``` title="Résultat"
(12, 8, 20)

```
</div>

!!! warning ""
    :warning:   Un tuple ne peut pas être modifié une fois créé.

## Les listes (ou tableaux)
Dans tous les langages de programmation, ces objets sont appelés __tableaux__ (_arrays_). En Python, le terme retenu est __listes__. Par convention, nous appellerons ces objets des tableaux, mais il est important de savoir que le terme exact en Python est __listes__.

!!! info "Différences entre les tuples et les tableaux"
    - création d'un tuple : `#!python mon_tuple = (1, 2, 3)`
    - création d'un tableau : `#!python mon_tableau = [1, 2, 3]`
    ***
    - les tuples ne sont __pas modifiables__ (on dit immutables)
    - les tableaux sont __modifiables__ (on dit mutables)

Les tableaux, comme les tuples, sont des séquences. Ils se manipulent donc de la même façon. On peut toutefois ajouter deux éléments liés au caractère mutable des tableaux : il est possible de supprimer ou ajouter des éléments à un tableau, mais également de modifier des éléments directement.

``` python title="Manipulation de tableaux"
mon_tableau = [14, "poisson", 42, True]

print(type(mon_tableau), ":", mon_tableau)
print(type(mon_tableau[0]), ":", mon_tableau[0])
print(type(mon_tableau[1]), ":", mon_tableau[1])
print(type(mon_tableau[2]), ":", mon_tableau[2])
print(type(mon_tableau[3]), ":", mon_tableau[3])

# modifier un élément
mon_tableau[1] = "grenouille"
print(mon_tableau)

# ajouter un élément
mon_tableau.append(1988)
print(mon_tableau)

# supprimer un élément
del mon_tableau[4]
print(mon_tableau)

# longueur d'un tableau
print("Il y a", len(mon_tableau), "éléments dans le tableau")
```
<div class="result" markdown>
``` title="Résultat"
<class 'list'> : [14, 'poisson', 42, True]
<class 'int'> : 14
<class 'str'> : poisson
<class 'int'> : 42
<class 'bool'> : True
[14, 'grenouille', 42, True]
[14, 'grenouille', 42, True, 1988]
[14, 'grenouille', 42, True]
Il y a 4 éléments dans le tableau
```
</div>

!!! info "à retenir"
    - l'instruction `#!python del` permet de supprimer un élément d'un tableau
    - la fonction mon_tableau.`#!python append()` permet d'ajouter un élément à la fin d'un tableau
    - la fonction `#!python len()` permet d'obtenir la longueur d'un tuple ou d'un tableau
    - on peut modifier un tableau : `#!python tableau[2] = "maison"`
    - les opérations sur les tuples sont légèrement plus rapides : si vous savez que vous n'aurez pas besoin de modifier votre séquence, préférez le tuple au tableau

## Parcourir une séquence : boucle for
Nous avons rapidement vu le mot-clé `#!python for`, et notamment son utilisation en combinaison avec la fonction `#!python range()`. Ainsi, nous avons pu réaliser des itérations sur un nombre défini d'éléments.

L'instruction for permet également de parcourir des séquences : typiquement, des tuples ou des tableaux ! La structure est identique à l'utilisation de `#!python range()`, et voici un exemple :

``` python title="Parcourir une séquence"
# création d'un tableau, cela fonctionne de la même façon avec un tuple
nombres_premiers = [1, 3, 5, 7, 11, 13, 17]

for nb in nombres_premiers:
  print(nb, "est un nombre premier.")
```
<div class="result" markdown>
``` title="Résultat"
1 est un nombre premier.
3 est un nombre premier.
5 est un nombre premier.
7 est un nombre premier.
11 est un nombre premier.
13 est un nombre premier.
17 est un nombre premier.
```
</div>

## Les "tableaux de tableaux"
Un tableau est une séquence qui se déroule en une dimension : chaque élément possède un indice, et il est aisé de représenter un tableau sur une simple ligne.

!!! info ""
    Chaque élément d'un tableau peut être lui-même un tableau.  
    On parle alors de tableau de tableaux, et cela permet de travailler en deux dimensions.


``` python title="Tableau de tableaux"
m = [[1, 3, 4], [5 ,6 ,8], [2, 1, 3], [7, 8, 15]]

# il est plus courant (et plus lisible), de le représenter ainsi :

m = [[1, 3, 4],
     [5, 6, 8],
     [2, 1, 3],
     [7, 8, 15]]
```

Comment traiter ces tableaux de tableaux ? Il ressemblent beaucoup à un objet mathématique bien connu : les matrices. Comme pour les matrices, nous allons nous repérer dans notre tableau de tableaux grâce à des couples d'indices.

La séquence `m` est un tableau contenant 4 éléments. Ainsi :

- l'élément `m[0]` est le tableau `[1, 3, 4]`
- l'élément `m[1]` est le tableau `[5 ,6 ,8]`
- l'élément `m[2]` est le tableau `[2, 1, 3]`
- l'élément `m[3]` est le tableau `[7, 8, 15]`

Par conséquent, la séquence `m[0]` est le tableau `[1, 3, 4]`, et donc :

- l'élément `m[0][0]` est le chiffre `1`
- l'élément `m[0][1]` est le chiffre `3`
- l'élément `m[0][2]` est le chiffre `4`