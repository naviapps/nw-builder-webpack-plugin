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
      //buildDir: compilation.outputOptions.path, TODO: buildDir
    }, this.options);
    const nw = new NwBuilder(options);

    nw.on('log', console.log);
    nw.build().then(function () {
      console.log('all done!');
    }).catch(function (error) {
      console.error(error);
    });

    callback();
  }
}
