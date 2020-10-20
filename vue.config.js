/*
 * @Author: wenlin
 * @Date: 2020-05-06 16:28:59
 * @LastEditors: wenlin
 * @LastEditTime: 2020-08-06 11:42:50
 * @Description:
 */
const path = require('path')
module.exports = {
  lintOnSave: false,
  chainWebpack: chain => {
    chain.module.rule('svg').include.add(path.resolve(__dirname, './src/icons'))
    chain.module.rule('svg').uses.delete('file-loader')
    chain.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    chain.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 1024 * 40 }))
  },
  configureWebpack: function() {
    // console.log(config.module.rules[2])
    return {
      resolve: {
        extensions: ['.js', '.ts', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          types: path.resolve(__dirname, './types')
        }
      },
      output: {
        libraryExport: 'default'
      }
    }
  },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/mixin.scss";' // 全局引入
      }
    }
  },
  devServer: {
    https: false,
    proxy: {
      '^/file_manage/': {
        target: 'http://101.205.120.152:9000/',
        changeOrigin: true,
        onProxyReq: function(proxyReq) {
          proxyReq.removeHeader('origin')
        }
      }
    }
  }
}
