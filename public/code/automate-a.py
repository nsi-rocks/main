from PIL import Image

# définitions des objets que nous allons utiliser
gen_1 = "00000000000000000000100000000000000000000"
matrice = [gen_1]
pxl_data = []
matrice_pic = Image.new("1", (len(gen_1), len(gen_1)), color=1)

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

def regle_B(gen, indice):
    cur = int(gen[indice])
    if indice > 0:
        prev = int(gen[indice - 1])
    else:
        prev = 0
    if indice + 1 < len(gen):
        next = int(gen[indice + 1])
    else:
        next = 0

    if prev + next == 2 or prev + next == 0:
        return '0'
    else:
        return '1'

def regle_C(gen, indice):
    return str(1 - int(regle_B(gen, indice)))


def nouvelle_gen(generation):
    n_gen = ""
    for i in range(len(generation)):
        n_gen += regle_C(generation, i)

    return n_gen


# déroulé du programme :

for g in range(len(gen_1)):
    matrice.append(nouvelle_gen(matrice[g]))

    for px in matrice[g]:
        pxl_data.append(1-int(px))

    print(matrice[g])


matrice_pic.putdata(pxl_data)
matrice_pic.show()

# Si l'image ne s'affiche pas, enregistrez-la :
# matrice_pic.save("image1.jpg")

