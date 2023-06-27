const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'REPORTES SO',
    workboxOptions: {
      skipWaiting: true
    }
  }
})
