<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <UContainer>
    <div
      class="min-h-full flex flex-col gap-8 justify-center py-12 sm:px-6 lg:px-8"
    >
      <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
        Profile
      </h2>
      <UButton class="mt-3" icon="i-mdi-github" block label="Google" />
      <ClientOnly>
        <UToggle
          v-model="isDark"
          on-icon="i-heroicons-moon-20-solid"
          off-icon="i-heroicons-sun-20-solid"
        />
      </ClientOnly>
    </div>
  </UContainer>
</template>
