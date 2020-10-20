/*
 * @Author: wenlin
 * @Date: 2020-01-14 14:03:38
 * @LastEditors: wenlin
 * @LastEditTime: 2020-07-29 10:56:22
 * @Description: 手写webpack
 */
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const chalk = require('chalk')
module.exports = {
  // entry: {
  //   index: "./../src/index.js"
  // },
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  entry: './src/packages/index.ts',
  output: {
    filename: 'index.js', //'[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    library: 'mlcomponents',
    libraryTarget: 'umd'
    // umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
    // new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src/')
      // '@package': path.resolve(__dirname, 'src/packages/')
      // '@package': path.resolve(__dirname, 'src/packages/')
    }
  }
  // devtool: 'inline-source-map'
  // externals: {

  // }
}
