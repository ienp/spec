<template>
  <div class="spec-layout">
    <SpecAside />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
  import SpecAside from './aside/index.vue'
</script>

<style scoped lang="scss">
  @import '../styles/layout.scss';
</style>
