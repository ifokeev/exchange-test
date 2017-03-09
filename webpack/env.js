export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 5001;

export const jsFileName = process.env.HASH ? '[name]-[chunkhash].js' : '[name].js';
export const cssFileName = process.env.HASH ? '[name]-[chunkhash].css' : '[name].css';
export const commonName = process.env.HASH ? 'common-[chunkhash].js' : 'common.js';

