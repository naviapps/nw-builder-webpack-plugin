const path = require('path');
const NwBuilderPlugin = require('../lib');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new NwBuilderPlugin({
      platforms: ['osx64'],
      version: '0.24.1'
    }),
  ]
};
