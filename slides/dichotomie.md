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

## Objectifs

* Comprendre le fonctionnement de la recherche dichotomique
* Identifier les pré-requis (liste triée)
* Développer pas à pas l'algorithme
* Analyser sa complexité temporelle et spatiale
* Comparer avec la recherche linéaire

---

## Pourquoi se compliquer la vie ?

* Recherche linéaire : parcourt toute la liste <span v-mark.highlight.yellow>(long)</span>
* Recherche dichotomique : « *couper pour mieux régner* »
* Condition : la liste **doit être triée** (merci *tri par sélection* !)

<v-drag-arrow v-after pos="599,153,165,48"/>

<span v-after v-drag="[815,169,22,24]">💡</span>

<v-drag v-after pos="770,199,129,80" class="border border-4 rounded border-dashed">
  <span>On boucle <br /> la boucle</span>
</v-drag>

<span v-drag="[238,329,526,53]" v-click>
“La recherche dichotomique, c'est comme préparer son lunch le dimanche : ça prend du temps au départ, mais ensuite t'es tranquille toute la semaine !”
</span>

---

## Idée générale de l'algorithme

1. Regarder l'élément **au milieu** de la partie étudiée
2. Si c'est la cible → bingo !
3. Sinon, éliminer **la moitié** inutile
4. Répéter jusqu'à trouver… ou épuiser

---
clicks: 3
---

<h2 v-click.hide>Exemple de liste triée</h2>

<span v-after.hide v-drag="[219,256,665,72]" class="text-4xl">`[2, 4, 5, 7, 9, 12, 15]`</span>

<dichotomie v-after v-drag="[202,132,640,276]" class="w-100 h-40" :speed="1000" :autoPlay="2" />

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
Milieu = **9** → trouvé (en 3 comparaisons seulement !)  

---

## Pseudocode

```python
pour deb ← 0, fin ← n-1 tant que deb ≤ fin
    milieu ← (deb + fin) // 2
    si L[milieu] == x alors
        retourner milieu
    sinon si L[milieu] < x alors
        deb ← milieu + 1
    sinon
        fin ← milieu - 1
retourner -1  # pas trouvé
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

* À chaque itération : taille // 2
* Nombre d'itérations ≈ log₂(n)  

$$
\lfloor \log_2(n) \rfloor + 1
$$ 
  


* **Meilleur cas** : 1 (l'élément est au centre)
* **Moyen & pire cas** : **O(log n)**

---

## Complexité spatiale

* Version itérative : **O(1)**
* Version récursive : **O(log n)** (pile d'appels)

---

## En résumé

* **Pré-condition** : structure **triée**
* Découpage en **moitiés successives**
* Complexité **logarithmique**

---

## Pour aller plus loin

* Recherche ternaire (on coupe en trois) <span v-click>(spoiler : c'est moins rentable)</span>
* Arbres de recherche binaires
* Index B-tree (bases de données)
* Pourquoi log₂ et pas log₁₀ ?
  → Parce qu'on coupe *en deux*
