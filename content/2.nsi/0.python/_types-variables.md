---
navigation: false
quizz: true
title: Types de variables
description: En Python, on manipule des données, sous la forme de contenu statique, ou sous la forme de variables. Nous allons ici passer en revue les quatre types de variables dits **primitifs**.
links:
    - label: cours
      icon: i-heroicons-academic-cap
      to: /nsi/python/types-variables
      target: _self
---
::quizz
    ::question{ reponses="a.instruction, b.expression"}
    #question
    Question 1 = La ligne de code suivante est-elle une expression ou une instruction ?

    ```py
    x = 5
    ```
    #a
    Bravo. Cette ligne de code est bien une **instruction** : elle assigne la valeur `5` à la variable `x`. À partir de cette ligne, et si on ne change pas sa valeur, la variable `x` sera égale à 5.

    Par exemple :

        ::code-group
        ```py [exemple.py]
        x = 5
        print(x)
        ```

        ```[résultat.terminal]
        5
        ```
        ::

    #b
    Erreur. Pour rappel, une **expression** est une combinaison de variables, d'opérateurs et de valeurs constantes qui, une fois évaluée, renvoie une valeur. Ici, l'opérateur `=` va réaliser l'action d'affectation de la valeur 5 à la variable `x`. La ligne correspond donc à une **instruction**.
    ::
::