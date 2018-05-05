'use strict';

const path = require('path');
const webpack = require('webpack');
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
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'index.html'),
    }),
    new CopyWebpackPlugin([
      { from: 'package.json' },
    ]),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
    new NwBuilderPlugin({
      platforms: ['osx64', 'win32', 'win64'],
      version: 'latest',
    }),
  ],
};
