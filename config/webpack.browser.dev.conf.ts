import * as path from 'path';

import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import * as HtmlWebpackPlugin from 'html-webpack-plugin';

// import * as BrowserSyncPlugin from 'browser-sync-webpack-plugin';

import baseConf, { getScriptRules, getStyleRules } from './webpack.base.conf';

const devConfig: webpack.Configuration = merge(baseConf, {
  mode: 'development',
  entry: ['./src/browser/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      getScriptRules({
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, './tsconfig.browser.json')
        }
      }),
      getStyleRules({
        loader: 'style-loader',
        options: {
          sourceMap: true
        }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/views/index.tmpl.html'
    })
    // new BrowserSyncPlugin({
    // 	host: 'localhost',
    // 	port: 4000,
    // 	proxy: 'http://localhost:4000/'
    // })
  ]
});

export default devConfig;
