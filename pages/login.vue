<script setup lang="ts">
const supabase = useSupabaseClient();

const signInWithPassword = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "paulobreton29800@gmail.com",
    password: "password",
  });

  if (!error) {
    console.log("User", data.user);
    return navigateTo("/");
  }
};
</script>

<template>
  <UContainer>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
        Sign in to your account
      </h2>
      <UButton
        class="mt-3"
        icon="i-mdi-github"
        block
        label="Google"
        @click="signInWithPassword"
      />
    </div>
  </UContainer>
</template>
