<template>
  <n-space :vertical="true" :size="16">
    <n-input></n-input>
    <project-introduction />
    <project-info />
    <pro-dependency />
    <dev-dependency />
  </n-space>
</template>

<script setup lang="ts">
import { DevDependency, ProDependency, ProjectInfo, ProjectIntroduction } from './components';
</script>

<style scoped></style>
