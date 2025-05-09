---
addons:
  - slidev-addon-python-runner
title: Tri par sélection — Création pas à pas
description: Diaporama NSI Première — Algorithme de tri par sélection et notion
  de complexité
theme: ./theme
drawings:
  persist: true
mdc: true
out: ../public/slides/tri-selection
base: /slides/tri-selection
---

# Tri par sélection
<v-drag pos="745,60,119,143">
<LogoPython />
</v-drag>

#### Création pas à pas & notion de complexité

---

## Objectifs

* Comprendre le fonctionnement du tri par sélection
* Développer pas à pas l'algorithme
* Analyser sa complexité temporelle et spatiale
* Mettre en perspective avec d'autres tris vus ou à venir

---

## Pourquoi trier ?

* Faciliter la recherche <span v-mark.highlight.yellow>(dichotomie)</span>
* Présenter des données à l'utilisateur
* Pré‑traiter avant d'autres algorithmes (ex : éliminer doublons)

<v-drag-arrow v-after pos="379,121,81,1"/>

<v-drag v-after pos="473,104,171,34">
<span>On en parle vendredi !</span>
</v-drag>

---

## Exemple de liste à trier

<span v-drag="[295,252,409,62]" class="text-5xl">`[7, 4, 9, 2, 5]`</span>

---

## Idée générale du tri par sélection

1. Parcourir la partie non triée pour trouver le **minimum**
2. Le placer au **début** de cette partie
3. Répéter jusqu'à ce que la liste soit triée

<tri-selection v-drag="[294,231,400,160]" class="w-100 h-40" :list="[7, 4, 9, 2, 5]" />

---
layout: center
---

## Étape 1

Liste : **\[7, 4, 9, 2, 5]**  
Minimum trouvé : **2**  
Échange avec première position  
Résultat : **\[2]** | \[7, 4, 9, 5]  

---
layout: center
---

## Étape 2

Partie non triée : **\[7, 4, 9, 5]**  
Minimum trouvé : **4**  
Échange avec premier élément non trié  
Résultat : \[2, **4**] | \[7, 9, 5]  

---
layout: center
---

## Étape 3

Partie non triée : **\[7, 9, 5]**  
Minimum : **5**  
Échange  
Résultat : \[2, 4, **5**] | \[7, 9]  

---
layout: center
---

## Étape 4

Partie non triée : **\[7, 9]**  
Minimum : **7**  
Échange (inutile car déjà en place)  
Résultat : \[2, 4, 5, **7**] | \[9]  

---
layout: center
---

## Étape 5

Partie non triée : **\[9]**  
Un seul élément → fin de l'algorithme  
Liste triée : **\[2, 4, 5, 7, 9]**

---

## Pseudocode

```
pour i de 0 à n-2
    ind_min ← i
    pour j de i+1 à n-1
        si L[j] < L[ind_min] alors
            ind_min ← j
    échanger L[i] et L[ind_min]
fin pour
```

---

## Implémentation Python

```python
def tri_selection(L):
    n = len(L)
    for i in range(n - 1):
        ind_min = i
        for j in range(i + 1, n):
            if L[j] < L[ind_min]:
                ind_min = j
        L[i], L[ind_min] = L[ind_min], L[i]
```

---

## Complexité temporelle

* Boucle externe : n − 1 itérations
* Boucle interne : ≈ n − i − 1 comparaisons
* Nombre total de comparaisons :

  $$
  \sum_{i=0}^{n-2} (n-i-1) = \frac{n(n-1)}{2} = \Theta(n^2)
  $$
* **Meilleur, moyen, pire cas : O(n²)**
* Échanges : au plus n − 1

---

## Complexité spatiale

* Algorithme **in place**
* Mémoire supplémentaire : **O(1)**

<span v-drag="[220,242,565,72]">Cela signifie que l'algorithme ne nécessite pas d'espace mémoire supplémentaire proportionnel à la taille de la liste à trier.
<br />
Il utilise seulement un nombre constant de variables pour effectuer les échanges et les comparaisons.</span>
