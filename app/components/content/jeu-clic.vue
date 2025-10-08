<template>
  <div class="container-jc">
    <div
      id="zone"
      ref="zone"
      tabindex="0"
    >
      <div
        v-if="!isRunning"
        class="text-black font-semibold text-xl w-full h-full flex flex-row justify-center items-center"
      >
        <div>Appuyer sur la touche A pour commencer</div>
      </div>
    </div>
    <ul id="chronoList">
      <li
        v-for="(time, index) in chronos"
        :key="index"
      >
        Temps écoulé : {{ time }} ms
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const chronos = ref([]) // Liste des chronos
const zone = ref(null) // Référence à la zone d'apparition
const isRunning = ref(false) // État du jeu

function addChrono(time) {
  if (chronos.value.length >= 5) {
    chronos.value.shift() // Retire le plus ancien chrono si on dépasse 5 éléments
  }
  chronos.value.push(time) // Ajoute le nouveau chrono
}

function popItem() {
  console.log('popItem')

  const newDiv = document.createElement('div')
  newDiv.classList.add('item-jc')

  // Positionnement aléatoire
  const randomTop = Math.floor(Math.random() * 451)
  const randomLeft = Math.floor(Math.random() * 451)
  newDiv.style.top = randomTop + 'px'
  newDiv.style.left = randomLeft + 'px'
  newDiv.style.position = 'absolute'

  // Enregistre le temps de création de l'élément
  const startTime = Date.now()

  // Ajoute l'élément à #zone
  zone.value.appendChild(newDiv)

  // Ajoute un événement click pour supprimer l'élément et enregistrer le chrono
  newDiv.addEventListener('click', () => {
    const endTime = Date.now()
    const duration = endTime - startTime
    addChrono(duration)
    setTimeout(() => {
      popItem()
    }, Math.floor(Math.random() * 2000))
    newDiv.remove()
  })
}

function handleKeyDown(event) {
  if (event.key === 'a') {
    isRunning.value = true
    popItem()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown) // Attache l'écouteur global
  zone.value.focus() // Permet la capture de l'événement `keydown`
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style>
.container-jc {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#zone {
  width: 500px;
  height: 500px;
  background-color: lightblue;
  border: 1px dashed black;
  margin: 20px 0;
  position: relative;
}

.item-jc {
  position: absolute;
  width: 50px;
  height: 50px;
  background-image: url('https://rgb.nsi.rocks/api/rgb/ec12?img');
  background-size: cover;
  z-index: 1000;
}

#chronoList {
  list-style-type: none;
  padding: 0;
}
</style>
