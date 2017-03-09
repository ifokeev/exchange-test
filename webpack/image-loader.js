import path from 'path';

const opt = {
  module: {
    loaders: [{
      test: /\.(jpe?g|gif|png|svg)(\?(.*))?$/,
      loaders: [
        'file?hash=sha512&digest=hex&name=[path][name].[ext]',
        'image-webpack?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}',
      ],
    }],
  },
};

export default opt;
