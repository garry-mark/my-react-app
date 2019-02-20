import * as path from 'path';
import * as webpack from 'webpack';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';

import * as nodeExternals from 'webpack-node-externals';

import * as merge from 'webpack-merge';
import baseConf, { getScriptRules, getStyleRules } from './webpack.base.conf';

const nodeConfig: webpack.Configuration = merge(baseConf, {

  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      getScriptRules({
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, './tsconfig.server.json')
        }
      }),
      getStyleRules('isomorphic-style-loader')
    ]
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },

  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(['dist/server'], {
      root: path.resolve(__dirname, '../')
    })
  ]
});

export default nodeConfig;
