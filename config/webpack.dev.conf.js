const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf.js')

const ENV = 'development'

module.exports = merge(baseConf, {
  mode: ENV,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(baseConf.context, 'dist'),
    compress: true,
    port: 8080,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          //   {
          //     loader: 'postcss-loader'
          //   },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
