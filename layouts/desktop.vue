<script setup lang="ts">
const route = useRoute();

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const links = [
  [
    {
      label: "On mange quoi ?",
      to: "/",
    },
  ],
  [
    {
      label: "Recettes",
      to: "/recipes",
    },
    {
      label: "Courses",
      to: "/shopping-list",
    },
    {
      label: "Menus",
      to: "/menus",
    },
  ],
  [
    {
      label: "theme",
    },
    {
      label: "Profile",
      to: "/profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
];
</script>
<template>
  <div class="h-screen flex flex-col">
    <UHorizontalNavigation
      :links="links"
      class="mb-4 backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0"
    >
      <template #default="{ link }">
        <span
          class="group-hover:text-primary relative"
          v-if="link.label !== 'theme'"
          >{{ link.label }}</span
        >
        <ClientOnly v-else>
          <UToggle
            v-model="isDark"
            on-icon="i-heroicons-moon-20-solid"
            off-icon="i-heroicons-sun-20-solid"
          />
        </ClientOnly>
      </template>
    </UHorizontalNavigation>
    <UContainer>
      <slot></slot>
    </UContainer>
  </div>
</template>
