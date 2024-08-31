// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  site: {
    url: "https://app-omg-netlify.app",
    name: "On mange quoi ?",
    description: "Application on mange quoi",
    defaultLocale: "fr",
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxtjs/device",
    "@nuxt/image",
    "dayjs-nuxt",
    "@nuxtjs/seo",
  ],
  buildModules: ["@nuxtjs/pwa"],
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    },
  },
  routeRules: {
    "/": {
      ssr: false,
      prerender: true,
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
    locales: ["fr"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "fr",
    defaultTimezone: "Europe/Paris",
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
  pwa: {},
});
