const path = require('path')

module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui'],

  configureWebpack: {
    resolve: {
      alias: {
        'postcss': path.resolve(__dirname, 'node_modules/postcss'),
        'autoprefixer': path.resolve(__dirname, 'node_modules/autoprefixer'),
        'postcss-loader': path.resolve(__dirname, 'node_modules/postcss-loader'),
        '@': path.resolve(__dirname, 'src')
      }
    },

    // no external copy plugins; keep default uni-app build behavior
  },

  chainWebpack: config => {
    // 发行或运行时启用压缩
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimize(true)
    }
  }
}
