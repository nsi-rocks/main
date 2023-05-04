# Données tabulaires
On appelle **données tabulaires** des données que l'on peut représenter sous la forme d'un tableau.  
L'exemple ci-dessous contient quelques informations relatives à des personnalités ayant grandement contribué à l'informatique, représentées sous la forme d'un tableau.

|  prénom  | jour | mois | année | projet                          |
|:--------:|:----:|:----:|:-----:|:------------------------------- |
|   Brian  |   1  |   1  |  1942 | programmer avec style           |
|   Grace  |   9  |  12  |  1906 | production de code machine      |
|   Linus  |  28  |  12  |  1969 | un petit système d'exploitation |
| Margaret |  17  |   8  |  1936 | explorer l'espace               |
|  Donald  |  10  |   1  |  1936 | tout sur les algorithmes        |
|    Ada   |  10  |  12  |  1815 | créer un programme informatique |

On interprète aisément ces données :
- la première ligne, aussi appelée en-tête, contient des éléments permettant de décrire la forme des lignes suivantes. On les appelle **descripteurs**, **noms de champs**, **attributs**, ou encore **critères**.
- chaque objet aura donc **cinq descripteurs** : prénom, jour, mois, année, projet.
- dans la table, il y a **six objets**, chacun d'entre eux étant donc défini par **cinq descripteurs**.

On peut utiliser le markdown pour créer un tableau permettant d'afficher ces données :

```markdown
| prénom   | jour | mois | année | projet                          |
|:--------:|:----:|:----:|:-----:|:-------------------------------:|
| Brian    | 1    | 1    | 1942  | programmer avec style           |
| Grace    | 9    | 12   | 1906  | production de code machine      |
| Linus    | 28   | 12   | 1969  | un petit système d'exploitation |
| Margaret | 17   | 8    | 1936  | explorer l'espace               |
| Donald   | 10   | 1    | 1936  | tout sur les algorithmes        |
| Ada      | 10   | 12   | 1815  | créer un programme informatique |
```

