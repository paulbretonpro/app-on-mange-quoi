<script setup lang="ts">
const user = useSupabaseUser();
</script>
<template>
  <div>
    <h1>Home</h1>
    <div>{{ user }}</div>
  </div>
</template>
