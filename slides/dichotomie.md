---
addons:
    - slidev-addon-python-runner
title: Recherche par dichotomie — Création pas à pas
description: Diaporama NSI Première — Algorithme de recherche dichotomique et notion de complexité
theme: ./theme
drawings:
    persist: true
mdc: true
out: ../public/slides/recherche-dichotomie
base: /slides/recherche-dichotomie
---

# Recherche par dichotomie

<v-drag pos="745,60,119,143">
  <LogoPython />
</v-drag>

#### Création pas à pas & notion de complexité

---

## Objectifs du diaporama

* Comprendre le fonctionnement de la recherche dichotomique
* Identifier les pré‑requis (liste triée)
* Développer pas à pas l’algorithme
* Analyser sa complexité temporelle et spatiale
* Comparer avec la recherche linéaire

---

## Pourquoi se compliquer la vie ?

* Recherche linéaire : parcourt toute la liste <span v-mark.highlight.yellow>(long)</span>
* Recherche dichotomique : « *couper pour mieux régner* »
* Condition : la liste **doit être triée** (merci *tri par sélection* !)

<v-drag-arrow v-after pos="599,153,165,48"/>

<span v-after v-drag="[815,169,22,24]">💡</span>

<v-drag v-after pos="770,199,129,80" class="border border-4 rounded border-dashed">
  <span>On boucle <br /> la boucle</span>
</v-drag>

<span v-drag="[238,329,526,53]" v-click>
“La recherche dichotomique, c’est comme préparer son lunch le dimanche : ça prend du temps au départ, mais ensuite t’es tranquille toute la semaine !”
</span>

---

## Exemple de liste triée

<span v-drag="[219,256,665,72]" class="text-4xl">`[2, 4, 5, 7, 9, 12, 15]`</span>

---

## Idée générale de l’algorithme

1. Regarder l’élément **au milieu** de la partie étudiée
2. Si c’est la cible → bingo !
3. Sinon, éliminer **la moitié** inutile
4. Répéter jusqu’à trouver… ou épuiser

---

<dichotomie v-drag="[202,132,640,276]" class="w-100 h-40" :speed="600" />

---
layout: center
---

## Étape 1

Portion examinée : **\[2, 4, 5, 7, 9, 12, 15]**  
Indice milieu = 3 → valeur **7**  
7 < 9 → on garde la **moitié droite**  

---
layout: center
---

## Étape 2

Portion : **\[9, 12, 15]**  
Indice milieu (relatif) = 1 → valeur **12**  
12 > 9 → on prend la **moitié gauche**  

---
layout: center
---

## Étape 3

Portion : **\[9]**  
Milieu = **9** → trouvé (en 3 comparaisons seulement !)  

---

## Pseudocode

```python
pour deb ← 0, fin ← n−1 tant que deb ≤ fin
    milieu ← (deb + fin) // 2
    si L[milieu] == x alors
        retourner milieu
    sinon si L[milieu] < x alors
        deb ← milieu + 1
    sinon
        fin ← milieu − 1
retourner −1  # pas trouvé
```

---

## Implémentation Python

```python
def recherche_dichotomique(L, x):
    deb, fin = 0, len(L) - 1
    while deb <= fin:
        milieu = (deb + fin) // 2
        if L[milieu] == x:
            return milieu
        elif L[milieu] < x:
            deb = milieu + 1
        else:
            fin = milieu - 1
    return -1
```

---

## Complexité temporelle

<span v-drag="[595,255,173,30]">comparaisons max</span>

* À chaque itération : taille // 2
* Nombre d’itérations ≈ log₂(n)  

$$
\lfloor \log_2(n) \rfloor + 1
$$ 
  


* **Meilleur cas** : 1 (l’élément est au centre)
* **Moyen & pire cas** : **O(log n)**

---

## Complexité spatiale

* Version itérative : **O(1)**
* Version récursive : **O(log n)** (pile d’appels)

---

## Démo Python — qui gagne ?

```python {runner=true}
from random import randint
from time import perf_counter

def linear_search(L, x):
    for i, v in enumerate(L):
        if v == x:
            return i
    return -1

def binary_search(L, x):
    deb, fin = 0, len(L) - 1
    while deb <= fin:
        m = (deb + fin) // 2
        if L[m] == x:
            return m
        elif L[m] < x:
            deb = m + 1
        else:
            fin = m - 1
    return -1

n = 1_000_000
L = list(range(n))
x = randint(0, n - 1)

# Chrono recherche linéaire
start = perf_counter()
linear_search(L, x)
stop = perf_counter()
print(f"Recherche linéaire : {(stop - start)*1e6:.0f} µs")

# Chrono recherche dichotomique
start = perf_counter()
binary_search(L, x)
stop = perf_counter()
print(f"Recherche dichotomique : {(stop - start)*1e6:.0f} µs")
```

---

## En résumé

* **Pré‑condition** : structure **triée**
* Découpage en **moitiés successives**
* Complexité **logarithmique**
* Un grand classique — même Siri y pense quand il cherche vos playlists 🎵

---

## Pour aller plus loin

* Recherche ternaire (on coupe en trois) — spoiler : c’est moins rentable 🤔
* Arbres de recherche binaires
* Index B‑tree (bases de données)
* Pourquoi log₂ et pas log₁₀ ?
  → Parce qu’on coupe *en deux*, voyons 😉
