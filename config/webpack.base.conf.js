const path = require('path')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '../'),
  entry: { app: './src/index.js' },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
