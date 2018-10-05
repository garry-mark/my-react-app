const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const baseConf = require('./webpack.base.conf.js');

const ENV = 'production';

// isOpenBundleAnalyzerPlugin
if (false) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
		.BundleAnalyzerPlugin;
	if (baseConf.plugins) {
		baseConf.plugins.push(new BundleAnalyzerPlugin());
	} else {
		baseConf.plugins = [new BundleAnalyzerPlugin()];
	}
}

module.exports = merge(baseConf, {
	mode: ENV,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(s)?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]',
							minimize: true,
							importLoaders: 2
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	performance: {
		hints: 'error'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new CleanWebpackPlugin(['dist'], {
			root: baseConf.context,
			exclude: ['assets']
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].css'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.tepl.html'
		})
	],
	optimization: {
		minimizer: [
			// 会有treeShaking效果，通过在packageJosn中添加sideEffects字段为false，标记项目为无副作用，另外添加数组为有副作用文件
			// 另外需要babel设置modules为false，不编译为commonJs
			new UglifyJsPlugin({
				cache: true,
				parallel: true
			})
		]
	}
});
