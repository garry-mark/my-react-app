import * as path from 'path';
import * as webpack from 'webpack';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';

import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import * as CompressionPlugin from 'compression-webpack-plugin';

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
    path: path.resolve(__dirname, '../dist/static'),
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[name].[chunkhash:7].js',
    publicPath: '/'
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
    new CleanWebpackPlugin(['dist/static'], {
      root: baseConf.context,
      exclude: ['vendor']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: 'css/[name].[contenthash:7].css'
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, '../static/favicon.ico'),
      filename: 'index.html',
      template: './src/views/index.tmpl.html',
      minify:{
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new CompressionPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
});

export default browserConfig;
