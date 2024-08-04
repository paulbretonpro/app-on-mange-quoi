<script setup lang="ts">
const headers = useRequestHeaders(["cookie"]);
const { data: recipes } = await useFetch("/api/recipes", {
  headers,
  key: "recipes",
});

const { data: categories } = await useFetch("/api/categories", {
  headers,
  key: "categories",
});
</script>
<template>
  <div>Bonjour</div>
  <div>{{ recipes }}</div>
  <div>{{ categories }}</div>
</template>
