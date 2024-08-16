<script setup lang="ts">
definePageMeta({
  layout: false,
});

const toast = useToast();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: state.email ?? "",
    password: state.password ?? "",
  });
  if (error === null) {
    return navigateTo("/");
  } else {
    toast.add({
      title: "Error",
      description: error.message,
    });
  }
};

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    toast.add({
      title: "Error",
      description: error.message,
    });
  }
};
</script>

<template>
  <UContainer>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
        Connexion
      </h2>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit">Valider</UButton>
      </UForm>

      <UDivider class="my-6" label="Ou" />
      <UButton
        class="mt-3"
        icon="i-mdi-github"
        block
        label="Google"
        @click="signInWithGoogle"
      />
    </div>
  </UContainer>
  <UNotifications />
</template>
