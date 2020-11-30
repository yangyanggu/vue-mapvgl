const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge').merge
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.lib_build.env
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.lib_build.productionSourceMap ? 'cheap-source-map' : false,
  output: {
    path: config.lib_build.assetsRoot,
    filename: 'index.js',
    library: 'VueMapvgl',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  }
})

module.exports = webpackConfig
