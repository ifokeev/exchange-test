import path from 'path';

const opt = {
  module: {
    loaders: [{
      test: /\.(mp4|webm|ttf|eot|woff2?)(\?(.*))?$/,
      loaders: [
        'file?hash=sha512&digest=hex&name=[path][name].[ext]',
      ],
    }],
  },
};

export default opt;
