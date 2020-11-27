const utils = require('./utils')
const webpack = require('webpack')
let config = require('../config')
const merge = require('webpack-merge').merge
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
let baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vue-mapvgl'
    },
    noEmitOnErrors: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/docs/index.html',
      favicon: './src/docs/assets/images/logo.ico',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/docs'),
          to: '',
          globOptions: {
            ignore: ['index.html']
          }
        }
        ]
    })
  ]
})
