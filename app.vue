<script setup lang="ts">
const { isMobile } = useDevice();
</script>
<template>
  <NuxtLoadingIndicator></NuxtLoadingIndicator>
  <NuxtLayout :name="isMobile ? 'mobile' : 'desktop'">
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
.dark {
  background-color: rgb(2 6 23);
}
</style>
