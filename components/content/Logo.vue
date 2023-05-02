<template>
  <img src="/img/logo-d.png" v-if="$colorMode.value == 'dark'" width="200" />
  <img src="/img/logo.png" v-if="$colorMode.value == 'light'" width="200" />
</template>