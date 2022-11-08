<template>
  <div class="wh-full">
    <n-space :vertical="true" :size="16">
      <top-chart />
      <data-card />
      <bottom-part />
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { BottomPart, DataCard, TopChart } from './components';
</script>

<style scoped></style>
