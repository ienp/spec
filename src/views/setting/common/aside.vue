<template>
  <div class="setting-layout-aside">
    <div class="content">
      <div class="list" v-for="item in options">
        <div class="list-title col">
          {{ item.title }}
        </div>
        <div class="list-item" v-for="o in item.value">
          <div class="list-item-label col">
            <a :href="o.label">{{ o.label }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Options {
    title?: string
    label: string
    value: Options[]
  }

  const options = [
    {
      title: '选项',
      value: [
        { label: '编辑器' },
        { label: '主题' },
        { label: '语言' },
        { label: '快捷键' },
        { label: '插件' },
        { label: '更新' },
        { label: '关于' }
      ]
    },
    {
      title: '官方插件',
      value: [{ label: '版本控制' }, { label: '开发者模式' }]
    },
    {
      title: '社区插件',
      value: [{ label: 'Paste URL into selection' }]
    }
  ] as Options[]
</script>

<style scoped lang="scss">
  @import '../index.scss';
</style>
