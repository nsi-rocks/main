def tri_insertion(liste):
    for i in range(1, len(liste)):
        val_cle = liste[i]
        j = i-1
        while j >= 0 and liste[j] > val_cle:
            liste[j + 1] = liste[j]
            j -= 1
        liste[j + 1] = val_cle
    return liste

#Exemple d'utilisation
print(tri_insertion([5,1,3,2,4]))
