const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NwBuilderPlugin = require('../lib');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'package.json' },
      //{ from: 'index.html' },
    ]),
    new NwBuilderPlugin({
      platforms: ['osx64'],
      version: 'latest',
    }),
  ],
};
