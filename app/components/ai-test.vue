<template>
  <AuthState>
    <template #default="{ loggedIn, user, clear }">
      <UInput
        v-if="loggedIn"
        v-model="question"
        placeholder="Posez une question"
        class="w-full"
        @keydown.enter="fetchStream"
      />
      <MDC
        v-if="textr.length > 0"
        :value="textr"
      />
    </template>
  </AuthState>
</template>

<script lang="ts" setup>
const textr = ref('')
const question = ref('')
const isStreaming = ref(false)

async function fetchStream() {
  if (isStreaming.value) return
  isStreaming.value = true
  textr.value = ''

  const response = await $fetch<ReadableStream>('/api/ai/test', {
    method: 'POST',
    responseType: 'stream',
    body: JSON.stringify({ query: question.value }),
  })

  const reader = response.pipeThrough(new TextDecoderStream()).getReader()

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    const lines = value.split('\n') // Découpage par lignes
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue // Ignore les lignes vides ou invalides
      const jsonStr = line.replace('data: ', '').trim()

      if (jsonStr === '[DONE]') {
        console.log('Fin du stream')
        isStreaming.value = false
        return
      }

      try {
        const json = JSON.parse(jsonStr)
        const content = json.choices?.[0]?.delta?.content || ''
        if (content) {
          textr.value += content
        }
      }
      catch (e) {
        console.error('Erreur de parsing JSON:', e, 'Données brutes:', jsonStr)
      }
    }
  }
}

const datatest = `
Voici quelques extraits de code Python et TypeScript :

Python :

1. Imprimez un message :

\`\`\`python
print("Hello, world!")
\`\`\`

2. Fonction pour calculer la somme de deux nombres :

\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)
\`\`\`

3. Imprimez les nombres de 1 à 10 :

\`\`\`python
for i in range(1, 11):
    print(i)
\`\`\`

TypeScript :

1. Déclaration d'une fonction :

\`\`\`typescript
function greet(name: string): void {
    console.log("Hello, " + name + "!");
}

greet("Alice");
\`\`\`

2. Déclaration d'une interface pour une fonction :

\`\`\`typescript
interface GreetFunction {
    (name: string): void;
}

let greetFunction: GreetFunction;

greetFunction = function(name: string) {
    console.log("Hello, " + name + "!");
};

greetFunction("Bob");
\`\`\`

3. Implémentation d'une classe :

\`\`\`typescript
class Person {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet(): void {
        console.log("Hello, " + this.name + "!");
    }
}

let person = new Person("Charlie");
person.greet();
\`\`\`
`
</script>

<style scoped></style>
