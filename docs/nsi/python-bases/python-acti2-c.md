---
icon: octicons/git-commit-24
hide:
  - footer
---

# Mini-quizz : éléments de correction

## Correction
```python title="mini-quiz.py" linenums="1"
--8<-- "docs/nsi/python-bases/mini-quiz.py"
```

1. Ici, la fonction `#!python .lower()` permet d'afficher la variable `reponse` avec toutes les lettres en minuscule. Cela permet de faciliter la comparaison, car cela valide les réponses paris, Paris, pAris, etc...
2. Attention, la variable `reponse` ici est du type **STR** (chaîne de caractères) ! Comme nous voulons la comparer à des valeurs numériques, il faut modifier son type grâce à la fonction `#!python int()`
3. Ici, le mot-clé `or` permet de proposer plusieurs tests. Il suffit que l'un d'entre eux soit positif pour que les instructions associées soient exécutées.

## Remarques
`ligne 8` { .def }
:  Ici, la fonction `#!python .lower()` permet d'afficher la variable `reponse` avec toutes les lettres en minuscule. Cela permet de faciliter la comparaison, car cela valide les réponses paris, Paris, pAris, etc...

`ligne 15` { .def }
:  Attention, la variable `reponse` ici est du type **STR** (chaîne de caractères) ! Comme nous voulons la comparer à des valeurs numériques, il faut modifier son type grâce à la fonction `#!python int()`

`ligne 28` { .def }
:  Ici, le mot-clé `or` permet de proposer plusieurs tests. Il suffit que l'un d'entre eux soit positif pour que les instructions associées soient exécutées.