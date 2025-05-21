---
addons:
  - slidev-addon-python-runner
title: Semaine des langues - 2025
description: Diaporama pour la semaine des langues (informatique), développement
  autour de l'intelligence artificielle
theme: ./theme
drawings:
  persist: true
mdc: true
out: ../public/slides/ndc
base: /slides/ndc
---

# Nuit du Code 
<img v-drag="[654,51,200,161]" src="/2025-NDC.png" style="width: 200px" />

---

<span v-drag="[563,155,391,63]" class="p-4">https://www.nuitducode.net/udj/5hkohng</span>

0h00 - 0h30 : Découverte du thème, brainstorming  
→ Concept en 3 phrases + croquis

0h30 - 1h00 : Squelette du jeu  
→ Jeu qui ouvre une fenêtre Pyxel vide

1h00 - 2h30 : Prototype jouable  
→ Boucles `update()` et `draw()`, une seule interaction  
→ MVP : partie de 30s sans crash

2h30 - 3h30 : Étendre sans déraper  
→ scores, vie, niveau suivant, autres interactions... (règle des 30')  
→ Boucle de jeu complète

3h30 - 5h00 : Polish 

5h00 - 6h00 : On confirme les fonctionnalités, et on clôture

---

## Conseils
- moins on planifie, plus on perd de temps
    - prenez le temps nécessaire pour planifier votre programme
    - papier + crayon si nécessaire 
    - Excalidraw si vous voulez rester sur écran
- une fonction prend des paramètres et renvoie une valeur
    - répartissez vous les tâches
    - planifiez votre code
    - une tâche par fonction, pas grave si vous finissez avec 15 fonctions
    - écrivez vos fonctions, testez-les
    - mettez-les ensuite en commun 
    - (puis résolvez les bugs)

---

<img src="/pyxel.webp" class="absolute top-0 m-auto h-full v-full" />

---