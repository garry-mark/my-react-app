const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConf = require('./webpack.base.conf.js')

const ENV = 'development'

module.exports = merge(baseConf, {
  mode: ENV,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: false,
    // contentBase: path.resolve(baseConf.context, 'dist'),
    // progress: true,
    // clientLogLevel: 'none',
    compress: true,
    overlay: true,
    proxy: {
      // 如果你不想始终传递 /api ，则需要重写路径为"",即请求http://localhost:3000/**
      // "/api": {
      //     target: "http://localhost:3000",
      //     pathRewrite: {"^/api" : ""}
      //   }
    },
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.tepl.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
