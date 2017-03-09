import { tmpdir } from 'os';

const obj = {
  babel: {
    cacheDirectory: tmpdir(),
  },
  entry: {
    babel: ['babel-polyfill'],
  },
};

export default obj;
