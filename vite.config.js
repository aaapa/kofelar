import { defineConfig } from 'vite'
import { resolve } from 'path'
import injectHTML from 'vite-plugin-html-inject'

export default defineConfig({
  base: '/kofelar/',
  plugins: [injectHTML()],
  resolve: {
    alias: [{ find: '@/', replacement: resolve('src') + '/'}],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/scss/helpers/index' as *;
        `,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: '/index.html',
        articles: '/articles.html',
        about: '/about.html',
        blog: '/blog.html',
        service: '/service.html',
        tehplatforma: '/tehplatforma.html',
        article: '/article.html',
      },
    },
  },
})
