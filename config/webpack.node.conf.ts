import * as path from 'path';
import * as webpack from 'webpack';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';
// import * as StartServerPlugin from 'start-server-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';

const nodeConfig: webpack.Configuration = {
	mode: 'development',

	context: path.resolve(__dirname, '../'),
	entry: [
		path.resolve(__dirname, '../src/server/index.ts'),
		'webpack/hot/signal'
	],
	output: {
		path: path.resolve(__dirname, '../dist/server'),
		filename: '[name].js',
		publicPath: '/'
	},

	resolve: {
		modules: [path.resolve(__dirname, '../src'), 'node_modules'],
		extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, '../src/browser'),
			'#': path.resolve(__dirname, '../src/server')
		}
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'tslint-loader'
			},
			{
				test: /\.tsx?$/,
				loader: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/
			}
		]
	},
	externals: [
		nodeExternals({
			whitelist: ['webpack/hot/signal']
		})
	],
	plugins: [
		new CleanWebpackPlugin(['dist/server'], {
			root: path.resolve(__dirname, '../')
		}),
		new webpack.HotModuleReplacementPlugin()
		// new StartServerPlugin({
		// 	// 启动的文件
		// 	name: 'main.js',
		// 	// 开启signal模式的热加载
		// 	signal: true,
		// 	// 为调试留接口
		// 	nodeArgs: ['--inspect']
		// })
	]
};

export default nodeConfig;
