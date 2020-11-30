const webpack = require('webpack')
let config = require('../config')
const merge = require('webpack-merge').merge
let baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  // cheap-module-eval-source-map is faster for development
  devtool: 'source-map',
  devServer: {
    clientLogLevel: 'warning',
    liveReload: true,
    watchContentBase: true,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: {
      warning: false,
      error: true
    },
    index: 'index.html',
    contentBase: ['./dist','./src/docs'],
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    historyApiFallback: true
  },
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
    /*new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/docs'),
          to: '',
          globOptions: {
            ignore: ['index.html']
          }
        }
        ]
    })*/
  ]
})
