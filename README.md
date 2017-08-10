# NW.js Builder Webpack Plugin

> This is a Webpack plugin that wrapped [`nw-builder`](https://github.com/nwjs-community/nw-builder).

###  Installation

npm

```bash
npm install --save-dev nw-builder-webpack-plugin
```

## Usage

```js
const NwBuilderPlugin = require('nw-builder-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    // ...
    new NwBuilderPlugin({
      platforms: ['osx64', 'win32', 'win64'],
      version: '0.24.1'
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

#### options.flavor
nw-builder: `sdk`  
nw-builder-webpack-plugin: `normal`

#### options.cacheDir
nw-builder: `./cache`  
nw-builder-webpack-plugin: `./node_modules/nw-builder-webpack-plugin/cache`
