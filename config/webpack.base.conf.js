const path = require('path');

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: { app: './src/index.js' },

	resolve: {
		modules: [path.resolve(__dirname, '../src'), 'node_modules'],
		extensions: ['.js', '.json', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, '../src')
		}
	},

	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					cache: true,
					emitWarning: true
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
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
			}
		]
	}
};
