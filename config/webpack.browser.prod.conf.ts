import * as path from 'path';
import * as webpack from 'webpack';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';

import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import * as merge from 'webpack-merge';
import baseConf, { getScriptRules, getStyleRules } from './webpack.base.conf';

// isOpenBundleAnalyzerPlugin
// if (false) {
// 	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// 		.BundleAnalyzerPlugin;
// 	if (baseConf.plugins) {
// 		baseConf.plugins.push(new BundleAnalyzerPlugin());
// 	} else {
// 		baseConf.plugins = [new BundleAnalyzerPlugin()];
// 	}
// }

const browserConfig: webpack.Configuration = merge(baseConf, {
  mode: 'production',
  entry: ['./src/browser/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../dist/browser'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/browser/'
  },
  module: {
    rules: [
      getScriptRules({
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, './tsconfig.browser.json')
        }
      }),
      getStyleRules(MiniCssExtractPlugin.loader)
    ]
  },
  performance: {
    hints: 'error'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: baseConf.context,
      exclude: ['assets', 'server']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/views/index.tmpl.html'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      })
    ]
  }
});

export default browserConfig;
