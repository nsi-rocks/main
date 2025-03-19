<template>
  <AuthState>
  <template #default="{ loggedIn, user, clear }">
    <UInput
      v-model="question"
      placeholder="Posez une question"
      class="w-full"
      @keydown.enter="fetchStream"
      v-if="loggedIn"
    />
    <MDC v-if="loggedIn && textr.length > 0" :value="textr" />
  </template> 
  </AuthState>
</template>

<script lang="ts" setup>
const textr = ref('')
const question = ref('')

async function fetchStream() {
  textr.value = ''
  const response = await fetch('/api/ai/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: question.value }),
  })

  if (!response.ok) {
    console.error('Erreur de requête :', response.status)
    return
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    textr.value += decoder.decode(value, { stream: true })
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
