<template>
  <div class="setting-layout-main">
    <ToolsBar />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ToolsBar from '@/components/ToolsBar/index.vue'

  export default defineComponent({
    name: 'SettingMain',
    components: {
      ToolsBar
    },
    setup() {}
  })
</script>

<style scoped></style>
