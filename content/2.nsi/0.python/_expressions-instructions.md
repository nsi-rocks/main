---
navigation: false
title: Expressions, instructions
description: Les expressions et les instructions sont les deux briques fondamentales d'un programme. Nous voyons dans cette page leur utilité.
links:
    - label: cours
      icon: i-heroicons-academic-cap
      to: /nsi/python/expressions-instructions
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