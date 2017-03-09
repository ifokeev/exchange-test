import ExtractTextPlugin from 'extract-text-webpack-plugin';

const loaders = {
  resolve: {
    extensions: ['.css'],
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css?modules&sourceMap!postcss'),
    }],
  },
};

export default loaders;
