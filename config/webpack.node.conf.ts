import * as path from 'path';
import * as webpack from 'webpack';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';

import * as nodeExternals from 'webpack-node-externals';

// import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as merge from 'webpack-merge';
import baseConf from './webpack.base.conf';

const nodeConfig: webpack.Configuration = merge(baseConf, {
	mode: 'production',

	output: {
		path: path.resolve(__dirname, '../dist/server'),
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'typings-for-css-modules-loader',
						options: {
							modules: true,
							localIdentName: '[local]--[hash:base64:5]',
							namedExport: true,
							camelCase: true,
							minimize: true
						}
					},
					'postcss-loader'
				]
			}
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
			root: path.resolve(__dirname, '../'),
			exclude: ['assets', 'browser']
		})
	]
});

if (nodeConfig.entry) {
	nodeConfig.entry = [path.resolve(__dirname, '../src/server/index.prod.ts')];
}

export default nodeConfig;
