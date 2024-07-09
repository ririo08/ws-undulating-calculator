// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt/ui", "@nuxt/eslint"],
  app: {
    baseURL: '/ws-undulating-calculator/'
  },
  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: true
    }
  }
})