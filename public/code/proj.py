def liste_aleat(max, nb_valeurs):
    '''
    Génère une liste aléatoire de valeurs
    :param max (int) génération entre 0 et la valeur de max
    :param nb_valeurs (int) le nombre de valeurs à générer
    '''
    assert type(max) == int, "le maximum doit être un entier"
    assert max > 0, "le max doit être supérieur strictement à zéro"
    assert type(nb_valeurs) == int, "le nombre de valeurs doit être un entier"
    assert nb_valeurs > 0, "le nombre de valeurs doit être supérieur strictement à zéro"

    from random import randint
    return [randint(0,max) for i in range(nb_valeurs)]

def tri_insertion(liste):
    counter = 0
    for i in range(1, len(liste)):
        k = liste[i]
        j = i-1
        while j >= 0 and liste[j] > k :
                counter += 1
                liste[j + 1] = liste[j]
                j -= 1
        liste[j + 1] = k
    return (liste, counter)

def tri_selection(liste):
    counter = 0
    for i in range(len(liste)):
       min = i
       for j in range(i+1, len(liste)):
           counter += 1
           if liste[min] > liste[j]:
               min = j

       tmp = liste[i]
       liste[i] = liste[min]
       liste[min] = tmp
    return (liste, counter)

def mesure_temps_exec(fonction, *args):
    '''
    Mesure le temps d'exécution d'une fonction.
    :param ma_fonction (function) fonction à évaluer
    :return (float) durée d'exécution de la fonction
    '''
    assert callable(fonction), "on attend une fonction en paramètre"

    from time import perf_counter
    start_time = perf_counter()
    return_func = fonction(*args)
    end_time = perf_counter()
    print(end_time - start_time)
    return (end_time - start_time, return_func)

nb_valeurs = [10, 100, 500, 1000, 2000, 3000, 5000, 10000, 12000, 15000, 20000]
listes = [liste_aleat(150, i) for i in nb_valeurs]
for l in listes:
    print(len(l))

insertion = []
insertion_cnt = []
selection = []
selection_cnt = []

for l in listes:
    print(len(l))
    tps, cnt = mesure_temps_exec(tri_insertion,l.copy())
    insertion.append(tps)
    insertion_cnt.append(cnt[1])
    tps, cnt = mesure_temps_exec(tri_selection,l.copy())
    selection.append(tps)
    selection_cnt.append(cnt[1])

# si Python renvoie une erreur, il faut installer le package
import matplotlib.pyplot as plt

fig,ax = plt.subplots(2)

ax[0].set_xlabel('len(liste)')
ax[0].set_ylabel("Durée d'exécution")
plot_1 = ax[0].plot(nb_valeurs, insertion, label="Insertion")
plot_1 = ax[0].plot(nb_valeurs, selection, label="Sélection")

ax[1].set_xlabel('len(liste)')
ax[1].set_ylabel("Nombre d'opérations")
plot_2 = ax[1].plot(nb_valeurs, insertion_cnt, label="Insertion CNT")
plot_2 = ax[1].plot(nb_valeurs, selection_cnt, label="Sélection CNT")

# afficher la légende de chaque ligne
ax[0].legend()
ax[1].legend()

# enregistrer l'image
plt.savefig("image.jpg")

# afficher l'image
plt.show()
