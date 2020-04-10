module.exports = {
  publicPath: '/projekty/simplehome-client/',

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
    },
  },

  devServer: {
    proxy: {
      '^/api/': {
        target: 'https://dev.steelants.cz',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/vasek/home_rest/',
        }
      },
    },
  },
};
