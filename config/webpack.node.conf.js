const path = require('path')
const webpack = require('webpack')

const StartServerPlugin = require('start-server-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/server/index.ts',
    'webpack/hot/signal': 'webpack/hot/signal'
  },

  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/browser'),
      '#': path.resolve(__dirname, '../src/server')
    }
  },
  target: 'node',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        loader: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/signal']
    })
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StartServerPlugin({
      // 启动的文件
      name: 'app.js',
      // 开启signal模式的热加载
      signal: true,
      // 为调试留接口
      nodeArgs: ['--inspect']
    })
  ]
}
