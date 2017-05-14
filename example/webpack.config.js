const path = require('path');
const NwPlugin = require('../lib');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  rules: [
    {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }
  ],
  plugins: [
    new NwPlugin(),
  ]
};
