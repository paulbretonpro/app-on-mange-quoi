// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxtjs/device",
    "@nuxt/image",
    "dayjs-nuxt",
  ],
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    },
  },
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
  dayjs: {
    locales: ["en", "fr"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "America/New_York",
    externalPlugins: [
      {
        name: "weekOfYear",
        package: "dayjs/plugin/weekOfYear",
      },
      {
        name: "isoWeek",
        package: "dayjs/plugin/isoWeek",
      },
    ],
  },
});
