import * as webpack from 'webpack';

import * as merge from 'webpack-merge';

import * as HtmlWebpackPlugin from 'html-webpack-plugin';

// import * as BrowserSyncPlugin from 'browser-sync-webpack-plugin';

import baseConf from './webpack.base.conf';

import * as path from 'path';

const devConfig: webpack.Configuration = merge(baseConf, {
	mode: 'development',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash].js',
		publicPath: '/'
	},
	devtool: 'cheap-module-eval-source-map',
	module: {
		rules: [
			{
				test: /\.(s)?css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'typings-for-css-modules-loader',
						options: {
							sourceMap: true,
							modules: true,
							localIdentName: '[local]--[hash:base64:5]',
							namedExport: true,
							camelCase: true
						}
					},
					'postcss-loader'
				]
			}
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
