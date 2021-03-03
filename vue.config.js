const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  publicPath: '/vasek/home-client-milanin/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/base/_functions.scss";
          @import "@/styles/base/_variables.scss";
        `,
      },
    },
  },

  pwa: {
    name: 'SimpleHome',
    themeColor: '#1cca50',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      swDest: 'service-worker.js'
    },
    manifestOptions: {
      background_color: '#F0F1F5',
      gcm_sender_id: "93473765978",
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      shortcuts: [
        {
          name: "Settings",
          description: "Settings",
          url: "./#/setting",
          icons: [
            {
              src: "./img/icons/android-chrome-512x512.png",
              type: "image/png",
              purpose: "any"
            }
          ]
        },
        {
          name: "Scenes",
          description: "Settings",
          url: "./#/scenes",
          icons: [
            {
              src: "./img/icons/android-chrome-512x512.png",
              type: "image/png",
              purpose: "any"
            }
          ]
        },
        {
          name: "Automation",
          description: "Settings",
          url: "./#/automation",
          icons: [
            {
              src: "./img/icons/android-chrome-512x512.png",
              type: "image/png",
              purpose: "any"
            }
          ]
        }
      ],
    },
  },

  devServer: {
    proxy: 'https://dev.steelants.cz',
    https: true,
    watchOptions: {
      poll: true,
    },
  },
};
