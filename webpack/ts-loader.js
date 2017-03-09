const tsQuery = {
  target: 'es6',
  jsx: 'preserve',
  moduleResolution: 'node',
  allowSyntheticDefaultImports: true,
  declaration: false,
  sourceMap: true,
};

const loaders = {
  ts: {
    transpileOnly: true,
    compilerOptions: tsQuery,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.ts', '.tsx'],
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'babel!ts',
    }],
  },
};

export default loaders;
