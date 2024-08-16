<script setup lang="ts">
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});
</script>

<template>
  <div>Waiting for login...</div>
</template>
