<template>
  <div class="setting-layout">
    <SetAside />
    <SetMain />
  </div>
</template>

<script setup lang="ts">
  import SetAside from './common/aside.vue'
  import SetMain from './common/main.vue'
</script>

<style scoped lang="scss">
  @import 'index.scss';
</style>
