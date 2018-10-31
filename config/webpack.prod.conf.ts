import * as path from 'path';
import * as webpack from 'webpack';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';

import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import * as merge from 'webpack-merge';
import baseConf from './webpack.base.conf';

const ENV = 'production';

// isOpenBundleAnalyzerPlugin
if (true) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
		.BundleAnalyzerPlugin;
	if (baseConf.plugins) {
		baseConf.plugins.push(new BundleAnalyzerPlugin());
	} else {
		baseConf.plugins = [new BundleAnalyzerPlugin()];
	}
}

const prodConfig: webpack.Configuration = merge(baseConf, {
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
			new UglifyJsPlugin({
				cache: true,
				parallel: true
			})
		]
	}
});

export default prodConfig;
