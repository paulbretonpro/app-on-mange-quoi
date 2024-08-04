// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@pinia/nuxt", "@nuxtjs/device"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  compatibilityDate: "2024-07-14",
  devServer: {
    port: 5000,
  },
  colorMode: {
    preference: "dark",
  },
});
