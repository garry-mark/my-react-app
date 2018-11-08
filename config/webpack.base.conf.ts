import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
	context: path.resolve(__dirname, '../'),
	entry: ['./src/browser/index.tsx'],

	resolve: {
		modules: [path.resolve(__dirname, '../src'), 'node_modules'],
		extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, '../src/browser'),
			'#': path.resolve(__dirname, '../src/server')
		}
	},

	module: {
		rules: [
			// {
			// 	enforce: 'pre',
			// 	test: /\.tsx?$/,
			// 	exclude: /node_modules/,
			// 	loader: 'tslint-loader',
			// 	options: {
			// 		configFile: path.resolve(__dirname, '../tslint.json')
			// 	}
			// },
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				include: path.resolve(__dirname, '../src'),
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				include: path.resolve(__dirname, '../src'),
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				include: path.resolve(__dirname, '../src'),
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
		new webpack.DllReferencePlugin({
			context: path.resolve(__dirname, '../'),
			manifest: require('../vendor-manifest.json')
		})
	]
};

export default config;
