import path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';

import babelRuntime from './webpack/babel-runtime';
import jsonLoader from './webpack/json-loader';
import cssLoader from './webpack/css-loader';
import sassLoader from './webpack/sass-loader';
import lessLoader from './webpack/less-loader';
import jsxLoader from './webpack/jsx-loader';
import tsLoader from './webpack/ts-loader';
import imageLoader from './webpack/image-loader';
import fileLoader from './webpack/file-loader';

import postcss from './webpack/postcss';

import pluginsClient from './webpack/plugins-client';

import devServer from './webpack/dev-server';

import { ENV, jsFileName } from './webpack/env';

let config = {
  root: path.resolve(__dirname),
  entry: {
    client: ['./src/client'],
  },
  output: {
    path: './build',
    publicPath: '/',
    filename: jsFileName,
    chunkFilename: jsFileName,
  },
  resolve: {
    extensions: ['', '.js', '.web.js'],
    modulesDirectories: [
      'node_modules',
    ],
  },
  devtool: ENV === 'production' ? '#source-map' : '#inline-source-map',
  module: {
    noParse: [/moment.js/],
  },
};

config = merge(babelRuntime, config);

config = merge(config, devServer);

config = merge(config, jsonLoader);
config = merge(config, cssLoader);
config = merge(config, sassLoader);
config = merge(config, lessLoader);
config = merge(config, jsxLoader);
config = merge(config, tsLoader);
config = merge(config, imageLoader);
config = merge(config, fileLoader);

config = merge(config, postcss);

config = merge(config, pluginsClient);

export default config;
