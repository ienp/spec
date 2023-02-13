<template>
  <div class="spec-layout-aside">
    <div class="content">
      <div>
        <svg-icon name="css" size="24px" />
        <svg-icon name="extend" size="24px" />
        <svg-icon name="control" size="24px" />
      </div>
      <div>
        <svg-icon name="issue" size="24px" />
        <svg-icon name="setting" size="24px" @click="handleSetting" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  const { ipcRenderer } = require('electron')

  export default defineComponent({
    setup() {
      function handleSetting() {
        console.log('setting')
        ipcRenderer.send('open-win', 'setting', 700, 600)
      }

      return {
        handleSetting
      }
    }
  })
</script>

<style scoped lang="scss">
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .spec-icon {
    padding: 10px;
    cursor: pointer;
  }
</style>
