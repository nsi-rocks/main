score = 0
print("Bonjour, quel est ton prénom ?")
prenom = input()
print("Bonjour", prenom, ", nous allons faire un petit quizz en 3 questions")

# Première question
reponse = input("Q1 : Quelle est la capitale de la France ? ")
if reponse.lower() == "paris":  #(1)!
    print("Bravo, c'est bien Paris !")
    score += 1
else:
    print("Mais non enfin... C'est Paris !")

# Deuxième question
reponse = input("Q2 : À quelle température l'eau devient glace ? ") #(2)!
reponse = int(reponse)
#on peut aussi directement écrire reponse = int(input(...))
if reponse == 0: 
    print("Bravo, c'est bien 0°C !")
    score += 1
elif reponse > 0:
    print("Ah, non... C'est un peu moins.")
elif reponse < 0:
    print("C'est un peu plus !")

# Troisième question
reponse = input("Quel est le plus beau métier du monde ? ")
if reponse.lower() == "enseignant" or reponse.lower() == "professeur": #(3)!
    print("Exactement, excellente réponse !")
    score += 1
else:
    print("Ah oui, tu trouves ? Peut-être...")

print(prenom, ", tu as terminé le jeu ! Sur 3 questions, ton score est égal à", score)