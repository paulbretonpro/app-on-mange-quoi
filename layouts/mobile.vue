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
    {
      label: "Profile",
      to: "/profile",
    },
  ],
];
</script>
<template>
  <div class="min-h-screen flex flex-col justify-between">
    <div class="py-6 px-4 h-full grow">
      <slot></slot>
    </div>

    <UHorizontalNavigation
      :links="links"
      :ui="{ wrapper: 'relative w-full flex items-center justify-center' }"
      class="border-b !border-gray-200 bg-white dark:!border-gray-800 sticky bottom-0"
    >
      <template #default="{ link }">
        <span class="group-hover:text-primary relative">{{ link.label }}</span>
      </template>
    </UHorizontalNavigation>
  </div>
</template>
