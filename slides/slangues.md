---
addons:
    - slidev-addon-python-runner
title: Semaine des langues - 2025
description: Diaporama pour la semaine des langues (informatique), développement autour de l'intelligence artificielle
theme: ./theme
drawings:
    persist: true
mdc: true
out: ../public/slides/slangues
base: /slides/slangues
---
# Semaine des langues - 2025
## Intelligence artificielle

---

# Pour commencer

<h2 v-drag="[151,257,680,45]">Est-ce que vous utilisez l'IA ?</h2>

---

## Usages de l'IA
<v-clicks>

- Assistants de conversation
- Traduction automatique
- Création d'images, de vidéos
- Recommandations personnalisées
- Diagnostic médical, aide à la recherche
- Reconnaissance vocale
- Vision par ordinateur

</v-clicks>

---

## Usages de l'IA

- <span v-after v-mark.highlight.yellow>Assistants de conversation</span>
- Traduction automatique
- Création d'images, de vidéos
- Recommandations personnalisées
- Diagnostic médical, aide à la recherche
- Reconnaissance vocale
- Vision par ordinateur

---

## Aujourd'hui

- utilisation de Python
- génération de textes
- [mise en commun](https://codimd.apps.education.fr/FEe-fLq1Rt-OOQXDZXE2nA?both)

![](/shot1.png)

---

## En pratique

Première mise en pratique : générer un conte en un paragraphe, <span v-mark.highlight.yellow>naïf</span>.

```py 
from chat import SessionDiscussion
chat = SessionDiscussion()
conte = await chat.demander("Écris un conte en un paragraphe.")
print(conte)
```

<span v-click v-mark.box.blue="2" v-drag="[358,328,208,40]" class="text-xl">Quel est le résultat ?</span>

<span v-click v-drag="[306,428,478,27]"><lucide-arrow-right /> Très peu d'originalité, un peu de magie, une morale.</span>

<div class="p-4 flex items-center text-3xl gap-4" v-click v-drag="[812,283,195,139]">
<a href="https://codimd.apps.education.fr/FEe-fLq1Rt-OOQXDZXE2nA" style="text-decoration: none; border: 0;">
<lucide-external-link />
</a>
</div>

---

## Pourquoi ?
- **Probabilités** : un conte, en un paragraphe, c'est un peu court pour être original.
- **Personnalisation** : on peut ajouter des éléments de personnalisation, pour orienter la génération.

<span v-click v-mark.box.blue="1" v-drag="[411,246,267,40]" class="text-xl">Comment personnaliser ?</span>

<v-clicks at="2" v-drag="[253,316,133,178]">

- personnages
- époque
- ambiance
- style
- ton

</v-clicks>


---

## On rééssaie !

Objectif : générer un conte en un paragraphe, <span v-mark.highlight.yellow>avec du contexte</span>.

```py 
from chat import SessionDiscussion
chat = SessionDiscussion()
conte = await chat.demander("Écris un conte en un paragraphe, (continuer avec vos propres mots)")
print(conte)
```

<span v-click v-mark.box.blue="2" v-drag="[358,328,208,40]" class="text-xl">Quel est le résultat ?</span>

<span v-click v-drag="[306,428,478,27]"><lucide-arrow-right /> Un simple contexte a suffi à casser l'uniformité des résultats.</span>

---

## On partage !

<div class="text-2xl" v-click v-mark.box.blue="1" v-drag="[256,220,421,40]"><lucide-rss /> Qui veut partager son conte ?</div>

<div class="p-4 text-3xl" v-click v-drag="[467,380,498,139]">
<a href="https://codimd.apps.education.fr/cZFtrCh4QhGceaqSCikG_w" style="text-decoration: none; border: 0;" class="flex items-center gap-4">
<lucide-external-link />
<span>Lien vers les contes</span>
</a>
</div>

---

## On fait le point
- l'IA fonctionne sur des probabilités
- plus on lui donne de contexte, plus elle est originale
- on peut lui donner des instructions précises
- maintenant, allons plus loin !

---

## L'instruction mystère

<span v-click v-drag="[220,139,499,41]">**Petit jeu** : utilisation de la fonction `chat.mystere`</span>

<div v-click v-drag="[224,219,560,110]">
```py
from chat import SessionDiscussion
chat = SessionDiscussion()
num, texte = await chat.mystere("Qui a remporté le prix Nobel en 2028 ?")
print(num)
print(texte)
```
</div>

<div v-click v-drag="[273,405,448,30]">
<lucide-arrow-right />
<span>Pour chaque numéro, essayons de deviner le style !</span>
</div>

<div class="p-4 flex items-center text-3xl gap-4" v-click v-drag="[812,283,195,139]">
<a href="https://codimd.apps.education.fr/ZTBPaiZtTOe-o4pmWVUnew" style="text-decoration: none; border: 0;">
<lucide-external-link />
</a>
</div>

---

## Comment ça marche ?
1. Collecte et préparation des données  
Rassemblement et nettoyage du texte : livres, articles, sites web…

2. Entraînement du modèle  
Le réseau de neurones apprend à prédire la suite d'un texte en ajustant ses paramètres.

3. Architecture du modèle (Transformer)  
C'est le « plan » du réseau : comment les couches d'attention et de calcul sont organisées.

4. Génération (inférence)  
On donne une amorce (prompt) et le modèle produit mot après mot sa réponse.

5. Affinage (fine-tuning)  
On spécialise le modèle sur un domaine précis pour qu'il soit plus performant.

---

## 1. Collecte & préparation des données
- **Objectif** : nourrir l’IA avec du contenu réel et propre  
- **Actions** :
  - Rassembler textes/images (livres, articles, sites web, scans)  
  - Nettoyer et formater (supprimer doublons, corriger fautes, découper en “tokens”)  
- **Métaphore** : tamiser le sable pour ne garder que les pépites

---

## 2. Entraînement du modèle
- **Objectif** : ajuster des millions de “poids” pour qu’il apprenne des exemples  
- **Actions** :
  - Faire lire au réseau chaque extrait de texte/image  
  - Calculer l’erreur (différence entre prédiction et réalité)  
  - Rétropropager pour corriger petit à petit  
- **Métaphore** : un musicien qui répète inlassablement jusqu’à maîtriser son morceau

---

## 3. Architecture Transformer
- **Objectif** : structurer le réseau pour comprendre le contexte global  
- **Éléments clés** :
  - **Embeddings** : transformer mots/chiffres en vecteurs  
  - **Self-attention** : chaque token pèse son importance par rapport aux autres  
  - **Couches empilées** (Multi-Head) : plusieurs “points de vue” simultanés  
- **Métaphore** : plan de métro où chaque ligne (tête d’attention) relie différentes stations (mots)

---

## 4. Génération (inférence)
- **Objectif** : créer du texte/image/audio à partir d’une amorce (prompt)  
- **Actions** :
  - Fournir un prompt (question, début d’histoire…)  
  - Choisir le mot/image suivant selon une distribution de probas  
  - Répéter jusqu’à obtenir la réponse complète  
- **Paramètres** :
  - **temperature** (créativité)  
  - **top_p** (concentration sur les meilleurs choix)  
- **Métaphore** : un conteur improvisant une histoire, mot par mot

---

## 5. Affinage (fine-tuning)
- **Objectif** : spécialiser l’IA pour un domaine précis  
- **Actions** :
  - Reprendre le modèle général  
  - Le réentraîner légèrement sur un petit corpus ciblé (juridique, médical…)  
  - Valider avec des exemples réels  
- **Métaphore** : régler les derniers détails d’une voiture de course pour qu’elle performe sur un circuit spécifique  

---

## Les biais
- "hallucination" : l'IA invente des choses
- pas de conscience ou d'esprit critique
- pas de compréhension du monde
- mise en évidence

<div v-click v-drag="[205,264,560,76]">
```py
chat = SessionDiscussion()
texte = await chat.demander("Qui a gagné le prix Nobel de chimie en 2028 ?")
print(texte)
```
</div>

<v-clicks at="2" v-drag="[106,354,312,36]">

- on ajoute un paramètre `mode`

</v-clicks>

<div v-click v-drag="[197,385,560,147]">
```py
rep1 = await chat.demander("...", mode="hallu")
rep2 = await chat.demander("...", mode="sécurisé")

print(rep1)
print(rep2)
```
</div>

---

## Essayons

<div v-click v-mark.box.blue="1" v-drag="[256,220,421,96]" class="text-3xl"><lucide-arrow-right-from-line /> Essayez de trouver un biais sympa !</div>

<div v-drag="[517,400,264,65]" v-click="2" class="flex items-center gap-4 text-3xl">
<lucide-rss  />
<span>On partage</span>
</div>

---

## Des histoires plus longues

<span v-click>On a besoin de fournir à l'IA le contexte des échanges précédents.</span>

<div v-click v-mark.highlight.yellow="2" v-drag="[195,177,216,43]" class="text-3xl"><lucide-arrow-right-from-line /> Historique !</div>

<div v-click="3" v-drag="[238,268,436,93]">

```py
chat = SessionDiscussion()
texte = await chat.demander("bla bla bla")
print(texte) # si on veut afficher le texte complet
chat.historique() # si on veut voir l'historique
```
</div>

<div v-click="4" v-drag="[188,394,573,101]"><lucide-arrow-right-from-line /> Chaque appel à la fonction <code>demander</code> ajoute la question et la réponse à l'historique.</div>

---

## Des histoire par groupe de 4

Répartition en groupes de 4, pour produire une petite histoire en 4 parties.
- chaque groupe choisit un personnage, une époque, une ambiance, un style
- chaque groupe se met d'accord sur quatre parties à développer
- chaque membre du groupe s'occupe de générer sa partie
- on colle les résultats dans le [CodiMD](https://codimd.apps.education.fr/QM7r1z9vRdqVERppkDrHUw?both)

---

## Deux histoire par groupe de 8

Répartition en groupes de 8, pour produire une petite histoire en 8 parties.
- chaque groupe choisit un personnage, une époque, une ambiance, un style
- chaque groupe se met d'accord sur huit parties à développer
- chaque membre du groupe s'occupe de générer sa partie
- on colle les résultats dans le [CodiMD](https://codimd.apps.education.fr/JiVz3KKeR5GOiYpsKDHhxg?both)