import ExtractTextPlugin from 'extract-text-webpack-plugin';

const loaders = {
  resolve: {
    extensions: ['.scss'],
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css?sourceMap!postcss!sass?sourceMap'),
    }],
  },
};

export default loaders;
