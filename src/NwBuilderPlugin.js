import NwBuilder from 'nw-builder';
import detectCurrentPlatform from 'nw-builder/lib/detectCurrentPlatform';

export default class NwBuilderPlugin {
  constructor(options) {
    this.options = Object.assign({
      run: false,
      quiet: false,
    }, options);
  }

  apply(compiler) {
    compiler.plugin('after-emit', this.onAfterEmit.bind(this));
  }

  onAfterEmit(compilation, callback) {
    const run = this.options.run;
    const quiet = this.options.quiet;
    delete this.options.run;
    delete this.options.quiet;

    const options = Object.assign({
      files: `${compilation.outputOptions.path}/**/*`,
    }, this.options);

    // If we are in run mode
    if (run) {
      const currentPlatform = detectCurrentPlatform();
      if (!options.platforms) options.platforms = [currentPlatform];
      options.currentPlatform = currentPlatform;
    }

    // Build App
    const nw = new NwBuilder(options);

    // Logging
    if (!quiet) nw.on('log', console.log);

    // Build or run the app
    const np = run ? nw.run() : nw.build();
    np.then(() => callback()).catch(console.error);
  }
}
