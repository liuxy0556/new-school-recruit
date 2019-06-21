// 引入 vConsole 插件
var vConsolePlugin = require('vconsole-webpack-plugin');

var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  productionSourceMap: false, // 生产环境的 source map
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    disableHostCheck: true,//解决127.0.0.1指向其他域名时出现"Invalid Host header"问题
  },
  configureWebpack: {
    plugins: [
      new vConsolePlugin({
        filter: [],  // 需要过滤的入口文件
        enable: process.env.NODE_ENV == 'development' ? true : false      // 只在开发环境打开
      })
    ]
  },
  publicPath: process.env.NODE_ENV === 'production'?'/new-school-recruit/':'/',
  outputDir: 'docs',
  chainWebpack: config => {
    config.resolve.alias.set('vue$', 'vue/dist/vue.common.js') // key,value自行定义，比如.set('@@', resolve('src/components'))
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('assets', resolve('src/assets'))
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "@/assets/stylesheets/scss/mixins/_variables.scss";`
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 根大小750
            propList: ['*'], // 属性的选择器，*表示通用
            selectorBlackList: ['.px-'], //   忽略的选择器   .ig-  表示 .ig- 开头的都不会转换
          })
        ],
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
      }
    }
  }
}
