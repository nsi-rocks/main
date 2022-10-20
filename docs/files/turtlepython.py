# https://docs.python.org/2/library/turtle.html#turtle-methods

from turtle import *
from random import *

psize = 10
fheight = 200
nb_barres = 30

shape('turtle')
left(90)
pensize(psize)
speed(10)

for i in range(nb_barres):
    a = randint(0, 10)
    pendown() #si down, on trace
    forward(fheight) #tracé
    
    penup()  # rotations / décalage
    right(90)
    forward(psize)
    right(90)
    
    if a % 3:
        pendown() # si down, on trace
    forward(fheight) # tracé
    penup()
        
    left(90) # rotations / décalage
    forward(psize)
    left(90)    