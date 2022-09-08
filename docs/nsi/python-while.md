---
icon: octicons/info-24
hide:
  - footer
  - toc
---
# Python : boucles while
La notion de boucle est fondamentale en informatique. Une boucle permet d'exécuter plusieurs fois des instructions, soit tant qu'une condition est réalisée (utilisation de la boucle `while`), soit en déterminant le nombre d'__itérations__ qui devront être réalisées (utilisation de la boucle `for`).

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