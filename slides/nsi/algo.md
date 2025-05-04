---
addons:
    - slidev-addon-python-runner
---

# Algorithmique

Introduction aux algorithmes appliquée au langage Python.
Test

---

## Algorithmes
### Qu'est-ce qu'un algorithme ?
Un algorithme est une suite d'instructions permettant de résoudre un problème ou d'accomplir une tâche. Il peut être exprimé sous différentes formes : langage naturel, pseudo-code, diagramme de flux, etc.
### Caractéristiques d'un algorithme
- **Finitude** : Un algorithme doit se terminer après un nombre fini d'étapes.
- **Précision** : Chaque étape doit être clairement définie et compréhensible.
- **Entrées et sorties** : Un algorithme peut avoir des entrées (données) et doit produire des sorties (résultats).
### Exemples d'algorithmes
- **Recherche d'un élément dans une liste** : Trouver un élément donné dans une liste de nombres.
- **Tri d'une liste** : Organiser une liste de nombres dans un ordre croissant ou décroissant.
- **Calcul de la somme d'une liste** : Additionner tous les éléments d'une liste de nombres.

---

## Notation algorithmique

ceci est un test


```python {monaco-run}{autorun: false, editorOptions:{lineNumbers:'on'}}
print("Hello, Slidev!", "blue")
data = [1, 2, 3, 4, 5]
for i in data:
    print(i)
```

```python {lines:true}
print("Hello, Slidev!", "blue")
data = [1, 2, 3, 4, 5]
for i in data:
    print(i)
```


---
### Notation algorithmique
La notation algorithmique est un langage formel utilisé pour décrire les algorithmes de manière précise et concise. Elle utilise des symboles et des conventions spécifiques pour représenter les instructions, les conditions, les boucles, etc.
### Pseudo-code
Le pseudo-code est une représentation informelle d'un algorithme, utilisant un langage proche du langage naturel. Il permet de décrire les étapes d'un algorithme sans se soucier de la syntaxe d'un langage de programmation spécifique.
### Diagrammes de flux
Les diagrammes de flux sont des représentations graphiques d'un algorithme. Ils utilisent des symboles standard pour représenter les différentes étapes, les décisions et les flux de contrôle. Les flèches indiquent la direction du flux d'exécution.
### Langages de programmation
Les algorithmes peuvent être implémentés dans différents langages de programmation, tels que Python, Java, C++, etc. Chaque langage a sa propre syntaxe et ses propres conventions, mais les concepts algorithmiques restent les mêmes.
### Complexité algorithmique
La complexité algorithmique mesure l'efficacité d'un algorithme en termes de temps et d'espace. Elle permet de comparer différents algorithmes et de choisir celui qui est le plus adapté à un problème donné.
### Analyse de la complexité
L'analyse de la complexité consiste à évaluer le temps et l'espace nécessaires à l'exécution d'un algorithme en fonction de la taille des données d'entrée. On utilise souvent la notation Big O pour exprimer la complexité temporelle et spatiale.
### Exemples de complexité
- **Complexité constante** : O(1) - L'algorithme prend un temps constant, quel que soit la taille des données d'entrée.
- **Complexité linéaire** : O(n) - Le temps d'exécution augmente linéairement avec la taille des données d'entrée.
- **Complexité quadratique** : O(n^2) - Le temps d'exécution augmente de manière quadratique avec la taille des données d'entrée.
### Conclusion
L'algorithmique est un domaine fondamental de l'informatique qui permet de résoudre des problèmes complexes de manière efficace. En comprenant les concepts algorithmiques, vous serez en mesure de concevoir des solutions optimisées et de mieux appréhender le fonctionnement des programmes informatiques.

