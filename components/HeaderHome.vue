<script setup lang="ts">
const user = useSupabaseUser();
const search = ref("");

const { value: colorMode } = useColorMode();

const isDark = computed(() => colorMode === "dark");
</script>
<template>
  <div
    class="w-full rounded-b-3xl sticky z-0 top-0 left-0 p-6 flex flex-col gap-6"
  >
    <div class="flex gap-4 items-center w-full">
      <UAvatar
        :src="user.user_metadata.avatar_url"
        size="xl"
        class="self-center"
      />
      <div class="flex flex-col text-white">
        <div class="text-lg">
          Hello,
          <span class="font-semibold">{{ user.user_metadata.full_name }}</span>
        </div>
        <div class="text-gray-200 dark:text-gray-600">
          Semaine {{ $dayjs().week() }}
        </div>
      </div>
    </div>
    <div class="flex gap-4 w-full items-stretch">
      <UInput
        v-model="search"
        placeholder="Une idée de recette ?"
        size="lg"
        class="grow"
      />
      <UButton
        icon="fa6-solid:arrow-right-long"
        size="lg"
        variant="solid"
        :color="isDark ? 'primary' : 'gray'"
      />
    </div>
  </div>
</template>
