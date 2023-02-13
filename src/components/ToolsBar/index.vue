<template>
  <div class="spec-layout-bar">
    <div class="spec-layout-bar-content">
      <div class="title" v-if="isTitle">
        {{ title }}
      </div>
      <div class="tools">
        <div class="tools-custom">
          <slot></slot>
        </div>
        <div class="window-controls">
          <div class="tool" @click="minimizeWindow">
            <SvgIcon name="minimize" size="22" />
          </div>
          <div class="tool" @click="maximizeWindow">
            <SvgIcon name="maximize" size="22" />
          </div>
          <div class="tool" @click="closeWindow">
            <SvgIcon name="close" size="22" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  const { ipcRenderer } = require('electron')

  export default defineComponent({
    name: 'ToolsBar',
    props: {
      title: {
        type: String,
        default: () => '这是个什么东西啊.md'
      },
      height: {
        type: Number,
        default: () => 0
      },
      isTitle: {
        type: Boolean,
        default: () => true
      },
      isWindowControls: {
        type: Boolean,
        default: () => true
      }
    },
    setup() {
      function maximizeWindow() {}

      function minimizeWindow() {}

      function closeWindow() {
        window.close()
        // ipcRenderer.send('close-window')
      }

      return {
        closeWindow,
        maximizeWindow,
        minimizeWindow
      }
    }
  })
</script>

<style scoped lang="scss">
  @import './index.scss';
</style>
