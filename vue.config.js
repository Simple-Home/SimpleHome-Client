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
          url: "./setting",
          icons: [
            {
              src: "./img/icons/android-chrome-512x512.png",
              type: "image/png",
              purpose: "any"
            }
          ]
        }
      ]
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
