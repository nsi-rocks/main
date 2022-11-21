---
icon: octicons/info-24
hide:
  - footer
---
## Chemins de fichiers
### Arborescence de fichiers
Tout système informatique organise ses fichiers dans des dossiers (aussi parfois appelés répertoires). Un dossier dans un dossier peut-être appelé sous-dossier. 

Le terme **arborescence** fait penser aux arbres. Dans une arborescence, il y a une notion de hiérarchie : on a le dossier racine, des sous-dossiers, des sous-sous-dossiers, etc...

<div class="grid" markdown>
<figure markdown>
  ![](/images/tree1.png#only-light){ width="200" }
  ![](/images/tree1-d.png#only-dark){ width="200" }

  <figcaption>Commande tree</figcaption>
</figure>

- Le schéma ci-dessous représente un dossier contenant deux dossiers `dossier1` et `dossier2`.
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

### Chemin absolu
Le chemin absolu d'un fichier est la succession de dossiers qu'il faut parcourir **depuis la racine** pour accéder à ce fichier.
Ainsi, le chemin du fichier `exos4.md` dans l'exemple ci-dessus serait le suivant : `/dossier2/exercices/exos4.md`  

### Chemin relatif
Le chemin relatif d'un fichier est le parcours qu'il faut réaliser pour accéder au fichier **depuis le dossier courant**. Quelques exemples ci-dessous. 

- Accéder au fichier `projet_annee.pdf` quand on est dans `/dossier2` : `./projet_annee.pdf`
- Accéder au fichier `projet_annee.pdf` quand on est dans `/dossier2/exercices` : `../projet_annee.pdf`
- Accéder au fichier `projet_annee.pdf` quand on est dans `/dossier1` : `../dossier2/projet_annee.pdf`


## Web : les URL
Dans la barre d'adresse de votre navigateur web vous trouverez, quand vous visitez un site, ce genre d'information : 

```
https://nsi.rocks/snt/web2/index.html
```

Une URL (Uniform Resource Locator) permet d'identifier une ressource sur un réseau.



Lorsque l'on veut accéder à un site internet, on doit écrire une URL dans la **barre d'adresse**. URL signifie *Uniform Resource Locator* (littéralement "localisateur uniforme de ressource*), et on peut également dire couramment **adresse web**.  
C'est une chaîne de caractères qui permet d'identifier une ressource du Web par son emplacement. L'URL d'une page Web est constituée de plusieurs éléments dont nous parlerons plus tard.

!!! tip
    Une URL ne sert pas qu'à localiser des pages Web. Selon d'autres schémas, elle concerne d'autres ressources, comme par exemple :  
    - au protocole FTP : ftp://ftp.mozilla.org/pub/firefox/releases/  
    - numéro de téléphone  : tel:+33 1 23 45 67 89  
    - adresse mail : mailto://contact@nsi.rocks  
    - forum Usenet : news:fr.comp.infosystemes.www.auteurs  

Autre représentation un peu plus "jolie" :

![](/images/url1.png)

### Chemin absolu ou chemin relatif ?

Pour indiquer la position d'un fichier (ou d'un dossier) dans l'arborescence, il existe 2 méthodes : indiquer un chemin absolu ou indiquer un chemin relatif. Le chemin absolu doit indiquer « le chemin » depuis la racine. Par exemple l'URL du fichier fichier3.jpg sera : /dossier2/dossier3/fichier3.jpg

Remarquez que nous démarrons bien de la racine / (attention les symboles de séparation sont aussi des /)

Imaginons maintenant que le fichier fichier1.css fasse appel au fichier fichier3.jpg (comme un fichier HTML peut faire appel à un fichier CSS). Il est possible d'indiquer le chemin non pas depuis la racine, mais depuis le dossier (dossier2) qui accueille le fichier1.css, nous parlerons alors de chemin relatif :

```
dossier3/fichier3.jpg
```

Remarquez l’absence du / au début du chemin (c'est cela qui nous permettra de distinguer un chemin relatif et un chemin absolu).

Imaginons maintenant que nous désirions indiquer le chemin relatif du fichier fichier5.svg depuis l'intérieur du dossier dossier4.

Comment faire ?

Il faut "remonter" d'un "niveau" dans l'arborescence pour se retrouver dans le dossier dossier2 et ainsi pouvoir repartir vers la bonne "branche" (vers le dossier3). Pour ce faire il faut utiliser 2 points : ..

```
../dossier3/fichier5.svg
```

Il est tout à fait possible de remonter de plusieurs "crans" : ../../ depuis le dossier dossier4 permet de "retourner" à la racine.

### Activité 6.1

Soit la structure en arborescence suivante:

![](/images/url1.png)

Donnez le chemin relatif permettant d'atteindre le fichier "fichier5.svg" depuis le dossier "dossier4".

Donnez le chemin absolu permettant d'atteindre le fichier "fichier6.html".
***

Remarque : la façon d'écrire les chemins (avec des slash (/) comme séparateurs) est propre aux systèmes dits « UNIX », par exemple GNU/Linux ou encore Mac OS. Sous Windows, ce n'est pas le slash qui est utilisé, mais l'antislash (\). Pour ce qui nous concerne ici, les chemins réseau (et donc le web), pas de problème, c'est le slash qui est utilisé.


