const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConf = require('./webpack.base.conf.js');

const ENV = 'development';

module.exports = merge(baseConf, {
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
		contentBase: path.resolve(baseConf.context, 'dist'),
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
		port: 8080,
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
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]',
							importLoaders: 1
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"development"'
		}),
		new webpack.NamedModulesPlugin(), //这个插件,使用模块的相对路径做为模块的id,只要我们不重命名一个模块文件,那么它的id就不会发生改变
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.tepl.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
});
