---
icon: octicons/info-24
hide:
  - footer
  - toc
---
# Python : boucles
La notion de boucle est fondamentale en informatique. Une boucle permet d'exécuter plusieurs fois des instructions, soit tant qu'une condition est réalisée (utilisation de la boucle `while`), soit en déterminant le nombre d'__itérations__ qui devront être réalisées (utilisation de la boucle `for`).

!!! info ""
    Pour les boucles, on parle aussi de __structures itératives__

## Les boucles while
En anglais, __while__ signifie "tant que". On exécutera donc les instructions contenues dans le bloc `while` tant qu'une condition définie sera vérifiée.

Réalisons un exemple simple : un compte à rebours.

``` python title="Compte à rebours"
val_depart = 3
while val_depart >= 0:
  print(val_depart)
  val_depart -= 1
```
<div class="result" markdown>
``` title="Résultat"
3
2
1
0
```
</div>

La structure d'un bloc `while` est très similaire à celle d'un bloc `if`:

- le mot-clé est suivi d'un test qui sera évalué
- on retrouve le caractère `:` à la fin de la ligne
- le bloc d'instructions à exécuter est indenté d'un niveau

!!! info ""
    On parle d'__itération conditionnelle__.

## Les boucles for
En anglais, __for__ signifie "pour". L'utilisation typique d'une boucle `for` sera par exemple pour une séquence de nombres.  
Ainsi, on pourra par exemple réaliser des instructions "pour chaque item de la séquence [1, 2, 3, 4, 5]."  
Réalisons un exemple simple : des tables de multiplication.

``` python title="Table de multiplication de 7"
nombre = 7
for i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:
  print(i*nombre)
```
<div class="result" markdown>
``` title="Résultat"
7
14
21
28
35
42
49
56
63
70
```
</div>

Il est important de noter que pour une boucle `for`, il n'y a plus de condition à réaliser pour que la boucle se réalise.

## La fonction `range()`
La fonction `#!python range()` est une fonction prédéfinie en Python. Elle permet de générer des séquences de façon automatique. Ainsi, elle est très pratique pour la création de boucles `#!python for`.  
Elle peut prendre un, deux ou trois arguments selon la séquence que l'on veut réaliser.

`range(début, fin, step)` { .def }
:  `début` indique à quelle valeur commence la séquence. Par défaut, elle vaut 0.  
   `fin` correspond à la limite excluante : si `fin` vaut 10, la séquence se terminera à 9.  
   `step` représente l'incrément : par défaut, `step` vaut 1 car la séquence avance de 1 en 1.

:octicons-info-24: Vous trouverez davantage d'explications à cette adresse :  
[https://fr.acervolima.com/fonction-range-python/](https://fr.acervolima.com/fonction-range-python/)

  ``` python title="Exemples d'utilisation de range()"
  # On définit une fonction printRange
  # printRange affiche sur une seule ligne une séquence générée par range()
  def printRange(range):
      for i in range:
          print(i, end=" ")
      print()

  printRange(range(10))
  printRange(range(3, 10))
  printRange(range(1, 10, 2))
  printRange(range(0, 100, 10))
  ```
<div class="result" markdown>
``` title="Résultat"
0 1 2 3 4 5 6 7 8 9 
3 4 5 6 7 8 9 
1 3 5 7 9 
0 10 20 30 40 50 60 70 80 90 
```
</div>