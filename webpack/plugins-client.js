import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { ENV, commonName, cssFileName } from './env';

const UglifyJsPluginConfig = {
  output: {
    ascii_only: true,
  },
  compress: {
    warnings: false,
  },
};

let plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new HtmlWebpackPlugin({
    template: './src/index.ejs',
    inject: 'body',
    favicon: './static/favicon.ico',
    minify: {
      collapseWhitespace: true,
    },
  }),
  new webpack.optimize.CommonsChunkPlugin('common', commonName),
  new ExtractTextPlugin(cssFileName, {
    disable: false,
    allChunks: true,
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
];

if (ENV === 'production') {
  plugins = [
    ...plugins,
    new webpack.optimize.UglifyJsPlugin(UglifyJsPluginConfig),
  ];
}


plugins = [
  ...plugins,
  new webpack.DefinePlugin({
    __DEVELOPMENT__: (ENV === 'development'),
    'process.env': {
      NODE_ENV: JSON.stringify(ENV),
    },
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.NoErrorsPlugin(),
];

export default {
  plugins,
};
