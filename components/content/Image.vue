<template> 
    <figure>
    <ClientOnly>
        <img :src="`/img/${src}-d.png`" v-if="$colorMode.value == 'dark'" :width="iwidth" />
        <img :src="`/img/${src}.png`" v-if="$colorMode.value == 'light'" :width="iwidth" />
    </ClientOnly>
        <figcaption v-if="$slots.default">
            <ContentSlot :use="$slots.default" unwrap="p" />
        </figcaption>
    </figure>
</template>

<script setup>
defineProps(['src', 'iwidth'])
</script>

<style scoped>
img {
    display: block;
    margin: auto;
}

figcaption {
    text-align: center;
}
</style>