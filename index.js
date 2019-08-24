'use strict';
const NwBuilder = require('nw-builder');
const detectCurrentPlatform = require('nw-builder/lib/detectCurrentPlatform');

const pluginName = 'NwBuilderWebpackPlugin';

class NwBuilderWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(pluginName, (compilation, callback) => {
      const isEnvDevelopment = compilation.options.mode === 'development';

      const options = this.options;
      options.files = `${compilation.outputOptions.path}/**/*`;

      // Build or run the app
      const np = isEnvDevelopment ? this.start(options) : this.build(options);
      np.then(() => {
        callback();
      }).catch(err => {
        console.error(err);
      });
    });
  }

  start(options) {
    options.flavor = options.flavor || 'sdk';
    const currentPlatform = detectCurrentPlatform();
    if (!options.platforms) {
      options.platforms = [currentPlatform];
    }
    options.currentPlatform = currentPlatform;

    // Build App
    const nw = new NwBuilder(options);

    // Run the app
    return nw.run();
  }

  build(options) {
    options.flavor = options.flavor || 'normal';
    if (!options.platforms) {
      options.platforms = ['osx64', 'win32', 'win64'];
    }

    // Build App
    const nw = new NwBuilder(options);

    // Build
    return nw.build();
  }
}

module.exports = NwBuilderWebpackPlugin;
