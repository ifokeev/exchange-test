import ExtractTextPlugin from 'extract-text-webpack-plugin';

const lessQuery = {
  sourceMap: true,
};

const loaders = {
  resolve: {
    extensions: ['.less'],
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(`css?sourceMap!postcss!less?${JSON.stringify(lessQuery)}`),
    }],
  },
};

export default loaders;
