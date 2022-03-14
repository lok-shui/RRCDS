'use strict'
/**
 * vue.config.js
 * @vue/cli-service 配置文件
 * 可選參數請參考外網：https://cli.vuejs.org/zh/config/
 */

const path = require('path')
const pkg = require('./package.json')
// 引入圖形化信息插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const rawArgv = process.argv.slice(2)

function resolve(dir) {
  return path.json(__dirname, dir)
}

const name = pkg.name || process.env.VUE_APP_NAME // 主頁標題
const port = process.env.VUE_APP_PORT // dev port

// 交易接口名
const devHosts = {
  hostDL: "http:40.130.15.159:6061"
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // 部署應用包時的上下文根，默認為'/'
  outputDir: process.env.VUE_APP_OUTPUT_DIR, // 運行 npm run build 時生成的生產環境構建文件目錄
  assetsDir: process.env.VUE_APP_ASSETS_DIR, // 放置生成的靜態資源的（相對於outputDir）目錄
  // lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false, // 在生產構建時禁用eslint-loader
  lintOnSave: false,
  productionSourceMap: false, // 在生產構建時禁用sourceMap
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${prot}/mock`,
        changeOrigin: true, // 如果接口跨域，需要配置這個參數
        // secure: false, // 如果是https接口，需要配置這個參數
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      "rcds": {
        target: devHosts.hostDL,
        secure: false,
        changeOrigin: true,
        ws: true
      },
    },
    after(app) {
      require('@babel/register')
      const bodyParser = require('body-parser')
      // parse app.body
      // http://expressjs.com/en/4x/api.html#req.body
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({
        extended: true
      }))
      const { default: mocks } = require('./mock')
      for (const mock of mocks) {
        app[mock.type](mock.url, mock.response)
      }
    }
  },
  configureWebpack: {
    // provide the app's title i webpack's name field, so that
    // it can be accessed in index.html to inject the correct title
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    devtool: 'source-map'
  },

  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

      // set preserveWhitespace
      config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.compilerOptions.presserveWhitespace = true
          return options
        })
        .end()
      
      config
        .when(process.env.NODE_ENV === 'development',
          config => config.devtool('source_map')
        )
      
      config
        .when(process.env.NODE_ENV !== 'development',
          config => {
            config
              .plugin('ScriptExtHtmlWebpackPlugin')
              .after('html')
              .use('script-ext-html-webpack-plugin', [{
                // `runtime` must same as runtimeChunk name. default is `runtime`
                inline: /runtime\..*\.js$/
              }])
              .end()
            config
              .optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                  libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                  },
                  elementUI: {
                    name: 'chunk-elementUI', // split elementUI into a single package
                    priority: 20, // the weight needs to be larger than libs and app or it will be package into libs or add
                    test: /[\\/]node_modules[\\/]element-io[\\/]/
                  },
                  commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'), // can customize your rules
                    minChunks: 30, // minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                  }
                }
              })
            config.optimization.runtimeChunk('single')

            config // 網頁圖形化信息，僅在analyzer模式下展示
              .when(rawArgv.includes('--analyzer') === true,
                config => config.plugin('webpack-bundle-annlyzer').use(BundleAnalyzerPlugin)
              )

          }
        )

  }

}
