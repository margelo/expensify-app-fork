const babelJest = require('babel-jest');
const functionCounterPlugin = require('./transformer');

module.exports = babelJest.createTransformer({
  plugins: [functionCounterPlugin],
  presets: ['@babel/preset-env'], // Add any other presets you're using
  babelrc: false,
  configFile: false,
});