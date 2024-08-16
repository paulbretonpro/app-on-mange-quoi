<script setup lang="ts">
const user = useSupabaseUser();
const search = ref("");
</script>
<template>
  <div
    class="bg-gray-900 w-full rounded-b-3xl absolute top-0 left-0 p-6 flex flex-col gap-6"
  >
    <div class="flex gap-4 items-center w-full">
      <UAvatar
        :src="user.user_metadata.avatar_url"
        size="xl"
        class="self-center"
      />
      <div class="flex flex-col">
        <div class="text-lg">
          Hello,
          <span class="font-semibold">{{ user.user_metadata.full_name }}</span>
        </div>
        <div class="text-gray-600">Semaine {{ $dayjs().week() }}</div>
      </div>
    </div>
    <div class="flex gap-4 w-full items-stretch">
      <UInput
        v-model="search"
        placeholder="Une idée de recette ?"
        size="xl"
        variant="outline"
        color="primary"
        class="grow"
      />
      <UButton icon="fa6-solid:arrow-right-long" variant="outline" size="xl" />
    </div>
  </div>
</template>
