<template>
  <svg
    :class="['spec-icon', { 'spec-icon-hidden': !visible }]"
    :style="svgStyle"
    aria-hidden="true"
  >
    <use :xlink:href="IconName"></use>
  </svg>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      default: () => ''
    },
    size: {
      type: [Number, String],
      default: () => 16
    },
    visible: {
      type: Boolean,
      default: () => true
    }
  })

  const IconName = computed(() => `#spec-icon-${props.name}`)

  const svgStyle = computed(() => {
    const { size } = props

    let ss = `${size}`
    ss = `${ss.replace('px', '')}px`
    return {
      width: ss,
      height: ss
    }
  })
</script>

<style scoped lang="scss">
  .spec-icon {
    min-width: 1em;
    min-height: 1em;
    line-height: 1em;
    display: inline-block;
    fill: currentColor;
    overflow: hidden;
    justify-content: center;
    align-items: center;

    &-hidden {
      background: rgba(217, 217, 217, 0.15);
    }
  }
</style>
