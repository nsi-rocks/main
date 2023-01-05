def regle_A(gen, indice):
    # on évacue tout de suite les valeurs qui ne bougent pas
    if gen[indice] == "1":
        return '1'

    if gen[indice] == "0":
        if indice == 0 and gen[indice + 1] == 1:
            return '1'
        elif indice == (len(gen) - 1) and gen[indice - 1] == '1':
            return '1'
        elif indice == (len(gen) - 1) and gen[indice - 1] == '0':
            return '0'
        elif int(gen[indice+1]) + int(gen[indice-1]) >= 1:
            return '1'
        else:
            return '0'

def nouvelle_gen(generation):
    n_gen = ""
    for i in range(len(generation)):
        n_gen += regle_A(generation, i)

    return n_gen

# déroulé du programme :
matrice = ["000000000010000000000"]
nb_generations = 10

for g in range(nb_generations):
    matrice.append(nouvelle_gen(matrice[g]))
    print(matrice[g])

