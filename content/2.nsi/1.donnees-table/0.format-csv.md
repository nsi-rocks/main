# Le format CSV
## Données tabulaires
On appelle **données tabulaires** des données organisées dans un tableau.  
L'exemple ci-dessous contient quelques informations relatives à des personnalités ayant grandement contribué à l'informatique, organisées sous la forme d'un tableau.

| prénom   | jour | mois | année | projet                          |
|:--------:|:----:|:----:|:-----:|:-------------------------------:|
| Brian    | 1    | 1    | 1942  | programmer avec style           |
| Grace    | 9    | 12   | 1906  | production de code machine      |
| Linus    | 28   | 12   | 1969  | un petit système d'exploitation |
| Margaret | 17   | 8    | 1936  | explorer l'espace               |
| Donald   | 10   | 1    | 1936  | tout sur les algorithmes        |
| Ada      | 10   | 12   | 1815  | créer un programme informatique |

On interprète aisément ces données :
- cinq colonnes représentent les attributs de chaque enregistrement
- ces colonnes sont : prénom, jour, mois, année, projet
- on a six enregistrements, et chacun d'entre eux est composé de cinq attributs

On représente ces données en markdown, langage dont la structure permet les visualiser dans un tableau :

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

À l'aide d'un outil de conversion de tables comme [tableconvert.com](https://tableconvert.com), on peut convertir ces données tabulaires du markdown vers le format CSV. On obtient alors le résultat suivant :

```csv
prénom,jour,mois,année,projet
Brian,1,1,1942,programmer avec style
Grace,9,12,1906,production de code machine
Linus,28,12,1969,un petit système d'exploitation
Margaret,17,8,1936,explorer l'espace
Donald,10,1,1936,tout sur les algorithmes
Ada,10,12,1815,créer un programme informatique
```
