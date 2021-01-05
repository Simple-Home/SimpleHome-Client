module.exports = {
  publicPath: '/projekty/simplehome-client/',
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
    manifestOptions: {
      background_color: '#F0F1F5',
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
      workboxOptions: {
        skipWaiting: true,
        swSrc: "src/service-worker.js",
      }
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
