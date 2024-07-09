// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,

  modules: ['@nuxt/ui', '@nuxt/eslint', '@vueuse/nuxt'],

  app: {
    baseURL: '/ws-wave-calculator/',
    head: {
      title: 'ホワイトアウトサバイバル 波状計算機',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
