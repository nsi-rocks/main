<template>
  <div class="slidev-layout center">
    <div class="m-auto">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss">
.slidev-layout.center {
  background-image: url("../assets/page-5.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @apply text-left py-15 h-full grid;

  h1 {
    @apply text-6xl leading-15;
  }
}
</style>
