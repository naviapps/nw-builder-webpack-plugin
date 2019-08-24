# NW.js Builder Webpack Plugin

> This is a Webpack plugin that wrapped [`nw-builder`](https://github.com/nwjs-community/nw-builder).

## Getting Started

###  Installation

```sh
npm install --save-dev nw-builder-webpack-plugin
```

### Usage

webpack.config.js

```js
const NwBuilderWebpackPlugin = require('nw-builder-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    // ...
    new NwBuilderWebpackPlugin({
      platforms: ['osx64', 'win32', 'win64'],
      version: '0.24.1',
    })
  ]
};
```

### Options

See [nw-builder#Options](https://github.com/nwjs-community/nw-builder#options)

Change default value

#### options.files
nw-builder: `null`  
nw-builder-webpack-plugin: `${output.path}/**/**`

Change default value

#### options.flavor
nw-builder: `sdk`  
nw-builder-webpack-plugin: `mode === 'development ? 'sdk' : 'normal'`

|mode       |value |
|-----------|------|
|development|sdk   |
|production |normal|
