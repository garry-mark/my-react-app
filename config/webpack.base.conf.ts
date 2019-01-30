import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  context: path.resolve(__dirname, '../'),

  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'tslint-loader',
      //   options: {
      //     configFile: path.resolve(__dirname, '../tslint.json')
      //   }
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

export function getStyleRules(styleLoader: string | object) {
  return {
    test: /\.css$/,
    use: [
      styleLoader,
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
    ],
  };
}

export function getScriptRules(tsLoader: string | object) {
  return {
    test: /\.tsx?$/,
    use: ['babel-loader', tsLoader],
    exclude: /node_modules/,
  };
}

