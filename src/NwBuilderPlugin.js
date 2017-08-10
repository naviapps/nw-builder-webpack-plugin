import path from 'path';
import NwBuilder from 'nw-builder';

export default class NwBuilderPlugin {
  defaultOptions = {
    flavor: 'normal',
    cacheDir: path.resolve(__dirname, '..', 'cache'),
  };

  constructor(options) {
    this.options = Object.assign(this.defaultOptions, options);
  }

  apply(compiler) {
    compiler.plugin('after-emit', this.onAfterEmit.bind(this));
  }

  onAfterEmit(compilation, callback) {
    const options = Object.assign({
      files: `${compilation.outputOptions.path}/**/**`,
    }, this.options);

    const nw = new NwBuilder(options);
    nw.on('log', console.log);
    nw.build()
      .then(() => {
        console.log('NW.js build successfully.');
        callback();
      }).catch(err => {
        console.error(err);
      });
  }
}
