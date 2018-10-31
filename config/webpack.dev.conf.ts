import * as path from 'path';

import * as webpack from 'webpack';

import * as merge from 'webpack-merge';

import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import baseConf from './webpack.base.conf';

const ENV = 'development';

const devConfig: webpack.Configuration = merge(baseConf, {
	mode: ENV,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash].js',
		publicPath: '/'
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		// 静态资源路径
		contentBase: path.resolve(baseConf.context || '../', 'dist'),
		// progress: true,
		// clientLogLevel: 'none',
		// useLocalIp: true,
		historyApiFallback: true,
		compress: true,
		overlay: true,
		proxy: {
			// 如果你不想始终传递 /api ，则需要重写路径为"",即请求http://localhost:3000/**
			// "/api": {
			//     target: "http://localhost:3000",
			//     pathRewrite: {"^/api" : ""}
			//   }
		},
		port: 8081,
		hot: true
	},
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
			template: './index.tepl.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
});

export default devConfig;
