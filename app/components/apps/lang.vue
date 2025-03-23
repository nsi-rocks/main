<template>
  <UDashboardGroup>
    <UDashboardPanel id="langues-1" :max-size="80" :min-size="30" :default-size="100">
      <template #header>
        <UDashboardNavbar title="Accueil">
          <template #right>
            <UColorModeSwitch />
          </template>
        </UDashboardNavbar>
      </template>
      <template #body>
        <AuthState>
          <template #default="{ loggedIn, user, clear }">
            <div class="flex flex-col items-center justify-center">
              <UPageCard v-if="!loggedIn" orientation="vertical" title="S'identifier"
                description="Veuillez vous identifier grâce à l'ENT Hauts-de-France" @click="login"
                class="cursor-pointer">
                <img src="https://cdn.enthdf.fr/assets/themes/hdf2d/img/illustrations/logo.png" />
              </UPageCard>
              <div v-else class="w-full">
                <UAlert color="primary" variant="soft" title="Vous êtes bien connecté"
                  :description="`Vous êtes connecté en tant que ${user?.firstName} ${user?.lastName} (${JSON.parse(user?.classes || `['']`)[0]})`"
                  :actions="[{ label: 'se déconnecter', onClick: logout }]" />
                <UStepper :items="steps" v-model="stepChoix" disabled class="my-12" />
                <div v-if="stepChoix === 0 || stepChoix === 1">
                  <UTabs v-model="tabJours" :items="tabs" :content="false" />
                  <UCard v-for="atelier in filterAteliers.filter(el => el.jours.includes(tabJours))"
                    :key="atelier.titre" class="mt-4">
                    <template #header>
                      <div class="flex flex-row items-center justify-between">
                        <ProseH3 class="my-0">{{ atelier.titre }}</ProseH3>
                        <UButton @click="choixAtelier(stepChoix.valueOf(), atelier.id, tabJours.valueOf())"
                          class="ml-auto">
                          Choisir</UButton>
                      </div>
                    </template>
                    <MDC :value="atelier.description" />
                  </UCard>
                </div>
                <div v-else>
                  <UPageCard class="w-full">
                    <template #header>
                      <div class="flex flex-row items-center justify-between">
                        <div>
                          <ProseH2 class="my-0">Vous avez fait vos choix !</ProseH2>
                          <p>Il ne vous reste plus qu'à les relire, puis à confirmer votre sélection.</p>
                        </div>
                      </div>
                    </template>

                    <template #footer>
                      <UButton @click="sendChoice" size="xl" class="block ml-auto">Confirmer</UButton>
                    </template>

                    <template #body>
                      <UCollapsible v-for="choix in choix" :key="choix[0]" class="my-4">
                        <UButton variant="soft" class="w-full">
                          <div class="flex flex-row items-center justify-between w-full">
                            <span>{{ateliers.find(el => el.id === choix[0])?.titre}}</span>
                            <span>
                              <UIcon name="i-lucide-chevron-down" />
                            </span>
                          </div>
                        </UButton>
                        <template #content>
                          <MDC :value="ateliers.find(el => el.id === choix[0])?.description" />
                        </template>
                      </UCollapsible>
                    </template>
                  </UPageCard>
                </div>
              </div>

            </div>
          </template>
          <template #placeholder>
            Chargement...
          </template>
        </AuthState>


      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script lang="ts" setup>
const store = useStore()
const tabJours = ref(1)
const stepChoix = ref(0)
const toast = useToast()

const choix = ref([[0, 0], [0, 0]])

const choixAtelier = (choixJour: number, idAtelier: number, jour: number) => {
  console.log(`Choix de l'atelier ${idAtelier} pour le jour ${jour}`)
  choix.value[choixJour] = [idAtelier, jour]
  stepChoix.value += 1
  toast.add({
    title: 'Atelier choisi',
    description: `Vous avez choisi l'atelier ${ateliers.find(el => el.id === idAtelier)?.titre} du ${tabs.value.find(el => el.value === jour).label}`,
  })
}

const sendChoice = async () => {
  console.log('Envoi des choix')
  console.log(choix.valueOf())
  toast.add({
    title: 'Choix envoyés',
    description: 'Vos choix ont bien été envoyés, merci !',
  })
  await $fetch('/api/langues', {
    method: 'POST',
    body: JSON.stringify(choix.valueOf()),
  })
}

const steps = ref([{
  title: 'Premier atelier',
  description: 'Choisissez votre premier atelier',
}, {
  title: 'Deuxième atelier',
  description: 'Choisissez votre deuxième atelier',
}, {
  title: 'Confirmation',
  description: 'Confirmez votre choix',
}])

const filterAteliers = computed(() => {
  if (stepChoix.value === 1) {
    const choixJ1 = choix.value[0]?.[0] ?? 0
    if (ateliers.find(el => el.id === choixJ1)?.isExcluding) {
      return ateliers.filter(el => !el.isExcluding)
    }
  } else return ateliers
})

const tabs = ref([{
  label: 'Lundi',
  value: 1
}, {
  label: 'Mardi',
  value: 2
}, {
  label: 'Jeudi',
  value: 3
}, {
  label: 'Vendredi',
  value: 4
}])

const ateliers = [
  {
    "id": 1,
    "titre": "Escape Game",
    "description": "Plongez dans un escape game unique où français, anglais, espagnol, allemand et italien (et plus encore !) deviennent vos meilleurs alliés pour résoudre les énigmes. Prêts à relever le défi ? ⏳🔎 #EscapeGame #Langues #travaildequipe",
    "max": 24,
    "jours": [1, 2, 2, 3, 4],
    "isExcluding": true
  },
  {
    "id": 2,
    "titre": "Tapas",
    "description": "Les tapas sont des amuse-bouches ou des petites portions de nourriture à partager. Elles accompagnent une boisson et font partie d’une tradition espagnole. L’atelier se déroulera en 3 temps : explication des recettes puis élaboration des tapas et enfin la dégustation.",
    "max": 15,
    "jours": [1, 3],
    "isExcluding": true
  },
  {
    "id": 3,
    "titre": "Énigmes et art",
    "description": "Comment le langage mathématique peut permettre de décoder une oeuvre artistique ?  \nDans cet atelier, il faudra être les premiers à résoudre toutes les énigmes pour découvrir l'oeuvre cachée.",
    "max": 20,
    "jours": [3]
  },
  {
    "id": 4,
    "titre": "Les racines gréco-latines à travers les mythes grecs",
    "description": "Envie d’écouter des histoires incroyables issues de la mythologie grecque ? Tenté·e par une petite initiation à l’écriture du grec ancien et son magnifique alphabet ? Si tu as envie de faire un voyage ludique aux origines du français, inscris-toi !",
    "max": 20,
    "jours": [3]
  },
  {
    "id": 5,
    "titre": "Cricket",
    "description": "Le cricket est bien plus qu’un sport en Angleterre : c’est une véritable institution ! Venez vous initier et découvrir ce merveilleux sport, méconnu en France.",
    "max": 24,
    "jours": [1, 3]
  },
  {
    "id": 6,
    "titre": "Ciné débat allemand",
    "description": "**GOETHE INSTITUT**: Cléo, en quête de rédemption après la perte de ses parents, se lance dans un voyage onirique à travers la ville et le temps, mêlant réalité et fantastique. Schmitt capture avec brio l'âme de Berlin, une ville marquée par son histoire, tout en offrant une exploration intime du deuil et du désir de changer le passé.",
    "max": 25,
    "jours": [3]
  },
  {
    "id": 7,
    "titre": "Ciné débat espagnol",
    "description": "20 000 especies de abejas. \n\nDrama conmovedor sobre la identidad y la búsqueda de aceptación. La historia sigue a Aitor, una niña trans de ocho años que aún es llamada por su nombre de nacimiento, pero que no se siente reconocida en su entorno. Durante un verano en el País Vasco, rodeada de su familia y del mundo apícola de su abuela, Aitor explora su identidad de género mientras enfrenta el miedo al rechazo y el deseo de ser comprendida.\n\nLa película es un retrato íntimo y sensible de la infancia trans, destacando la importancia del apoyo familiar y el autodescubrimiento. Con una narrativa delicada y actuaciones profundas, *20.000 especies de abejas* ofrece una mirada poderosa y necesaria sobre la diversidad y la aceptación.\n\n*20,000 espèces d’abeilles* est un voyage intime et bouleversant sur l’identité, l’acceptation et la découverte de soi. Laissez-vous toucher par cette histoire poignante et lumineuse. ",
    "max": 24,
    "jours": [1]
  },
  {
    "id": 8,
    "titre": "Ciné débat italien",
    "description": "",
    "max": 25,
    "jours": [2]
  },
  {
    "id": 9,
    "titre": "Langue des signes",
    "description": "Tu as envie de découvrir la langue des signes ? Savoir te présenter, remercier et t’exprimer ? Cet atelier te permettra de découvrir les bases de la communication avec les personnes sourdes et malentendantes.",
    "max": 15,
    "jours": [2]
  },
  {
    "id": 10,
    "titre": "Tortilla",
    "description": "",
    "max": 15,
    "jours": [3],
    "isExcluding": true
  },
  {
    "id": 11,
    "titre": "Ciné débat anglais",
    "description": "'Bend It Like Beckham':\n\n Jess Bhamra rêve de devenir footballeuse professionnelle, mais ses parents sikhs préfèrent qu'elle fasse des études de droit et se marie.",
    "max": 25,
    "jours": [2, 4]
  },
  {
    "id": 12,
    "titre": "Ciné débat anglais 2",
    "description": "",
    "max": 0,
    "jours": []
  },
  {
    "id": 13,
    "titre": "Danse Latino",
    "description": "Rumba Thérapie: 2 intervenantes originaires d’Amérique Latine seront présentes pour transmettre la culture de l’Amérique Latine à travers la danse.",
    "max": 22,
    "jours": [2],
    "isExcluding": true
  },
  {
    "id": 14,
    "titre": "Jeux découverte AL",
    "description": "Chasse au trésor qui permettra d’en apprendre beaucoup sur la culture des pays d’Amérique Latine.",
    "max": 24,
    "jours": [3]
  },
  {
    "id": 15,
    "titre": "Piñatas",
    "description": "Si te gusta aprender más sobre las tradiciones latinoaméricanas, ven a dar rienda suelta a tu creatividad decorando una piñata tradicional.",
    "max": 15,
    "jours": [1, 4],
    "isExcluding": true
  },
  {
    "id": 16,
    "titre": "Maths, Langage et jeux",
    "description": "Comment le vocabulaire mathématique prend ses origines dans d'autres langues ? Pourquoi dit-on que le langage mathématique est universel ? Dans cet atelier, nous tenterons de répondre à ces questions et, par le jeu, nous ferons des maths en langue étrangère.",
    "max": 15,
    "jours": [4]
  },
  {
    "id": 17,
    "titre": "Atelier théâtre",
    "description": "Vous aimez le langage théâtral ? Ou vous n’y connaissez rien mais avez envie de vous initier ? Pendant deux heures nous vous proposons un travail sur quelques pratiques théâtrales : travail sur la voix, le corps, l’utilisation de l’espace, jeux et exercices de concentration, d’écoute de l’autre, de mémoire… Sans oublier l’utilisation des langues parlées par les participants pour de folles improvisations !",
    "max": 16,
    "jours": [3]
  },
  {
    "id": 18,
    "titre": "Sur les traces de Gaudi",
    "description": "Cet atelier vous invite à travailler la mosaïque, comme le faisait Gaudi, le génial architecte de Barcelone. A partir de petits morceaux de carrelage ou de vaisselle colorée, qu’on associe selon son envie, son inspiration, ses goûts… L’an  dernier les élèves ont réalisé la fresque sur le mur de la cour, près de la box. Cette année afin que les membres de l’atelier puissent garder un souvenir de leur travail, chacun.e travaillera sur son propre tableau à partir d’un support en bois. Amateurs et amatrices de travaux manuels, de couleurs et de créativité, cet atelier est fait pour vous !",
    "max": 20,
    "jours": [2]
  },
  {
    "id": 19,
    "titre": "Loup garou",
    "description": "Oserez-vous entrer dans le village de Thiercelieux, où se cachent d’inquiétants loups-garous ? Venez tester votre sens de la stratégie, votre éloquence et votre flair… mais cette fois, le défi est double : le jeu se déroulera en anglais et en espagnol !\n\n Dans cet atelier ludique et immersif, incarnez un villageois, une voyante ou un loup-garou. Nous ferons un rappel du vocabulaire propre à ce jeu en anglais et en espagnol, puis nous jouerons une partie dans chacune des deux langues.",
    "max": 20,
    "jours": [1, 2],
    "isExcluding": true
  },
  {
    "id": 20,
    "titre": "Quand les grenouilles auront des poils",
    "description": "Connais-tu les expressions idiomatiques et les proverbes les plus utilisés en Anglais et en Espagnol ? À travers plusieurs jeux nous vaincrons moulins et charrues.",
    "max": 20,
    "jours": [4]
  },
  {
    "id": 21,
    "titre": "Le langage égalitaire",
    "description": "Sais-tu si tu ce que c’est que le langage égalitaire ? Viens découvrir notre langue à travers des jeux, échanger sur les multiples usages  que nous pouvons en faire, et clarifier différents concepts de l’égalité femmes - hommes.",
    "max": 20,
    "jours": [3]
  },
  {
    "id": 22,
    "titre": "Racines linguistiques du vocabulaire scientifique",
    "description": "Si tu envisages des études dans le domaine de la santé ou dans un autre domaine scientifique, viens jouer avec les racines et l'origine du vocabulaire scientifique. Prends les habits d'un chercheur ou d'un médecin afin de décoder leur jargon, cela pourrait t'être utile...",
    "max": 9,
    "jours": [1, 3]
  },
  {
    "id": 23,
    "titre": "Everything about British football",
    "description": "- conference in English about the origins of British football\n- funny facts and figures with quiz\n- embody a commentator",
    "max": 16,
    "jours": [3]
  },
  {
    "id": 24,
    "titre": "Kahoot musical",
    "description": "Tu reconnais facilement les chansons dès que tu les entends? Inscris-toi à ce kahoot musical composé de chansons espagnols, latinos, allemandes, italiennes et anglosaxones. Qui sera le meilleur?",
    "max": 25,
    "jours": [4],
    "isExcluding": true
  },
  {
    "id": 25,
    "titre": "Atelier d’éloquence",
    "description": "Tu aimes débattre et t’enflammer sur des sujets variés.\nTu souhaites avoir plus de répartie pour mieux clasher.\nTu cherches la bonne formule, le mot juste pour une punchline mémorable,\nAlors cet atelier est fait pour toi ;)",
    "max": 20,
    "jours": [4]
  },
  {
    "id": 26,
    "titre": "Langage poétique",
    "description": "Exercices de slam autobiographiques. Mise en rap d’un poème de votre choix sur la musique de votre choix. Des recueils de poésie seront à votre disposition. ",
    "max": 15,
    "jours": [1]
  },
  {
    "id": 27,
    "titre": "Two rooms and a boom",
    "description": "Have you ever found yourself dans une situation où no entiendes la persona en face de toi ? Alors, imagine si no one speaks el mismo idioma et que tu dois sauver ton royaume.\n\n2 royaumes, 3 idiomas, 1 mystery !\n\nTu devras negociar, share information et bluffer pour protéger your king… ou semer le chaos ! But be careful, cada persona tiene reglas to secretely communicate. And some might play a double-jeu.\n\nEres ready to relever le défi ?",
    "max": 20,
    "jours": [2],
    "isExcluding": true
  },
  {
    "id": 28,
    "titre": "Maths anglais",
    "description": "Everything You Always Wanted to Know About One* (*But Were Afraid to Ask).\n\nA documentary.\n\nFrom number One emerging from the primordial soup (just jokin') to his pairing with his little friend Zero to conquer the world— allowing for things like easier banking computations or cracking the German codes in 1944 and the advent of computers.\n\nIcing on the cake:  \n understanding that there are 10 types of people in this world, those who understand binary and those who don’t!",
    "max": 15,
    "jours": [1]
  },
  {
    "id": 29,
    "titre": "La langue des chimistes",
    "description": "$C_7H_{14}O_2$, ça te parle ? Viens apprendre à naviguer dans le tableau périodique des éléments et à savoir comment t'en sortir lorsqu'il ne nous suffit plus à déchiffrer les molécules. Après tout, avec les mêmes atomes, $C_7H_{14}O_2$ peut aussi bien sentir la banane que la pomme, la fraise ou l'ananas... :)",
    "max": 16,
    "jours": [1]
  },
  {
    "id": 30,
    "titre": "Découverte du japonais",
    "description": "",
    "max": 0,
    "jours": []
  }
]

const login = async () => {
  const cookie = useCookie('redirection', {
    maxAge: 60,
    domain: '.nsi.rocks',
  })
  cookie.value = 'langues'

  await navigateTo('https://enthdf.fr/cas/login?service=https://nsi.rocks', { external: true })
}

const logout = async () => {
  store.session.clear()
  await navigateTo('https://langues.nsi.rocks')
}
</script>

<style scoped></style>
