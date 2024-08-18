<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const isSubRoute = computed(() => route.fullPath.split("/").length > 2);

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
    <div class="py-6 px-4 h-full grow md:px-56">
      <UButton
        v-if="isSubRoute"
        icon="i-heroicons-arrow-long-left"
        variant="outline"
        class="mb-4"
        @click="router.back()"
        >Retour</UButton
      >
      <slot></slot>
    </div>

    <NavigationBar />
  </div>
</template>
