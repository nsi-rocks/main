---
icon: octicons/info-24
hide:
  - toc
  - footer
---
# Structure de fichiers
## Arborescence de fichiers
Tout système informatique organise ses fichiers dans des dossiers (aussi parfois appelés répertoires). Un dossier dans un dossier peut-être appelé sous-dossier. 

Le terme **arborescence** fait penser aux arbres. Dans une arborescence, il y a une notion de hiérarchie : on a le dossier racine, des sous-dossiers, des sous-sous-dossiers, etc...

<div class="grid" markdown>
<figure markdown>
  ![](/images/tree1.png#only-light){ width="200" }
  ![](/images/tree1-d.png#only-dark){ width="200" }

  <figcaption>Commande tree</figcaption>
</figure>

- Le schéma ci-contre représente un dossier contenant deux dossiers `dossier1` et `dossier2`.
- Dans le `dossier1`, on trouve cinq fichiers : `fichier{1..5}.txt`
- Dans le `dossier2`, on trouve deux dossiers `cours` et `exercices` ainsi qu'un fichier `projet_annee.pdf`
- Dans le dossier `cours`, on trouve trois fichiers
- Dans le dossier `exercices`, on trouve quatre fichiers

</div>

On distingue trois termes importants : la **racine**, le **dossier parent** et le **dossier courant**.

`racine` { .def }

:   C'est la base des dossiers dans la hiérarchie. On parle souvent de la racine d'un disque.

`dossier parent` { .def }

:   C'est le dossier "un cran au-dessus", celui qui contient le dossier dans lequel on se situe. On le symbolise par deux points : `..`

`dossier courant` { .def }

:   C'est le dossier dans lequel se situe actuellement le curseur (celui qui est ouvert). On le symbolise par un point : `.`

## Chemin absolu
Le chemin absolu d'un fichier est la succession de dossiers qu'il faut parcourir **depuis la racine** pour accéder à ce fichier.
Ainsi, le chemin du fichier `exos4.md` dans l'exemple ci-dessus serait le suivant : `/dossier2/exercices/exos4.md`  

## Chemin relatif
Le chemin relatif d'un fichier est le parcours qu'il faut réaliser pour accéder au fichier **depuis le dossier courant**. Quelques exemples ci-dessous. 

- Accéder au fichier `projet_annee.pdf` quand on est dans `/dossier2` : `./projet_annee.pdf`
- Accéder au fichier `projet_annee.pdf` quand on est dans `/dossier2/exercices` : `../projet_annee.pdf`
- Accéder au fichier `projet_annee.pdf` quand on est dans `/dossier1` : `../dossier2/projet_annee.pdf`

