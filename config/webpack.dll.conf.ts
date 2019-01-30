import * as path from 'path';
import * as webpack from 'webpack';

const dllConfig: webpack.Configuration = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),

  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-loadable',
      'react-redux',
      'react-router-config',
      'react-router-dom',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/static/vendor'),
    filename: '[name].dll.js',
    library: '[name]_[hash:7]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', 'vendor-manifest.json'),
      name: '[name]_[hash:7]'
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
