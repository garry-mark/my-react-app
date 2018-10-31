import * as path from 'path';
import * as webpack from 'webpack';

const dllConfig: webpack.Configuration = {
	mode: 'production',
	context: path.resolve(__dirname, '../'),

	entry: {
		vendor: ['react', 'react-dom', 'react-loadable', 'react-router-dom']
	},
	output: {
		path: path.resolve(__dirname, '../dist/assets'),
		filename: '[name].dll.js',
		library: '[name]_[hash]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, '../', 'vendor-manifest.json'),
			name: '[name]_[hash]'
		})
	]
};

// isOpenBundleAnalyzerPlugin
if (false) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
		.BundleAnalyzerPlugin;
	dllConfig.plugins = [new BundleAnalyzerPlugin()];
}

export default dllConfig;
