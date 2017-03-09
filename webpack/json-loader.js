const loaders = {
  resolve: {
    extensions: ['.json'],
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }]
  }
};

export default loaders;
