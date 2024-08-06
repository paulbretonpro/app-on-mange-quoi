<script setup lang="ts">
const isOpen = defineModel();
const emit = defineEmits<{
  refresh: [void];
}>();

const errorCreateMenu = ref(false);
const dayjs = useDayjs();
const weeks = ref<
  {
    label: string;
    number: number;
    startDate: string;
    endDate: string;
  }[]
>([]);

const weekSelected = ref();

const generateWeeks = () => {
  const start = dayjs();
  const end = dayjs().add(3, "month");
  let current = start.startOf("isoWeek");

  while (current.isBefore(end)) {
    const weekNumber = current.isoWeek();
    const startDate = current.format("DD/MM");
    const endDate = current.endOf("isoWeek").format("DD/MM");

    weeks.value.push({
      label: `Semaine ${weekNumber} du ${startDate} au ${endDate}`,
      number: weekNumber,
      startDate: startDate,
      endDate: endDate,
    });

    current = current.add(1, "week");
  }
};

const handleAddRecipe = async () => {
  errorCreateMenu.value = false;
  try {
    await $fetch("/api/menus", {
      method: "POST",
      body: {
        weekNumber: weekSelected.value,
      },
    });
    emit("refresh");
    isOpen.value = false;
  } catch (error) {
    errorCreateMenu.value = true;
  }
};

onMounted(() => {
  generateWeeks();
});
</script>

<template>
  <UModal v-model="isOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Choisir une semaine
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>
      <div class="flex flex-col gap-4">
        <USelectMenu
          v-model="weekSelected"
          :options="weeks"
          value-attribute="number"
          option-attribute="label"
          placeholder="Choisir une semaine"
        ></USelectMenu>

        <div v-if="errorCreateMenu" class="text-sm font-semibold text-red-500">
          Un menu semaine {{ weekSelected }} exist déjà
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton @click="isOpen = false" variant="outline">Annuler</UButton>
          <UButton @click="handleAddRecipe" color="primary">Ajouter</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
