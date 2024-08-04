<script setup lang="ts">
const { isMobile } = useDevice();
</script>
<template>
  <NuxtLayout :name="isMobile ? 'mobile' : 'desktop'">
    <NuxtPage />
  </NuxtLayout>
</template>
