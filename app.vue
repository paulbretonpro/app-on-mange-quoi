<script setup lang="ts">
const { isMobile } = useDevice();

const route = useRoute();
const defaultPageLayout = ["/login"];

const layoutName = computed(() => {
  if (defaultPageLayout.includes(route.path)) {
    return "default";
  }

  return isMobile ? "mobile" : "desktop";
});
</script>
<template>
  <NuxtLoadingIndicator></NuxtLoadingIndicator>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
.dark {
  background-color: rgb(2 6 23);
}
</style>
