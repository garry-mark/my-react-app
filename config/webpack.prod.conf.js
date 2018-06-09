const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //webpack4开始使用MiniCssExtractPlugin
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf.js')

const ENV = 'production'

module.exports = merge(baseConf, {
  mode: ENV,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/assets'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              //   modules: true,
              minimize: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*'], {
      root: baseConf.context
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.tepl.html'
    })
  ],
  optimization: {
    minimizer: [
      // 会有treeShaking效果，通过在packageJosn中添加sideEffects字段为false，标记项目为无副作用，另外添加数组为有副作用文件
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
      //   new OptimizeCSSAssetsPlugin({})
    ]
  }
})
