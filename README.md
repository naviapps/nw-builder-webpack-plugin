# NW.js Webpack Plugin

* NW.js build

npm

```bash
npm install --save-dev nw-webpack-plugin
```

[Yarn](https://yarnpkg.com)

```bash
yarn add --dev nw-webpack-plugin
```

```js
const NwPlugin = require('nw-webpack-plugin');

module.exports = {
  plugins: [
    new NwPlugin()
  ]
};
```
