---
addons:
    - slidev-addon-python-runner
title: Semaine des langues - 2025
description: Diaporama pour la semaine des langues (informatique), développement autour de l'intelligence artificielle
theme: ./theme
drawings:
    persist: true
mdc: true
out: ../public/slides/recherche-dichotomie
base: /slides/recherche-dichotomie
---
# Semaine des langues - 2025
## Intelligence artificielle

---

# Pour commencer

<h2 v-drag="[151,257,680,45]">Est-ce que vous utilisez l'IA ?</h2>

---

# Usages de l'IA
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

# Génération de texte

<v-clicks>

- Utilisation de l'API de Mistral
- Construction de la requête
- Affichage du résultat

</v-clicks>

