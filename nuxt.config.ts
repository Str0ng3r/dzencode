export default defineNuxtConfig({
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/assets/styles/main.scss';"
        }
      }
    }
  },
  imports: {
    dirs: ['types/constants'],
    presets: [
      {
        from: 'vue',
        imports: ['withDefaults', 'defineProps', 'defineEmits']
      },
      {
        from: 'date-fns',
        imports: ['format']
      },
      {
        from: '@splinetool/runtime',
        imports: ['Application']
      }
    ]
  },
  modules: [
    'nuxt-icons'
  ],
  app: {
    head: {
      title: 'dZENcode',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Tech quest' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },

  compatibilityDate: '2024-08-23',
});
