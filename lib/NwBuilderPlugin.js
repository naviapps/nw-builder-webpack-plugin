'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nwBuilder = require('nw-builder');

var _nwBuilder2 = _interopRequireDefault(_nwBuilder);

var _detectCurrentPlatform = require('nw-builder/lib/detectCurrentPlatform');

var _detectCurrentPlatform2 = _interopRequireDefault(_detectCurrentPlatform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NwBuilderPlugin = function () {
  function NwBuilderPlugin(options) {
    _classCallCheck(this, NwBuilderPlugin);

    this.options = Object.assign({
      run: false,
      quiet: false
    }, options);
  }

  _createClass(NwBuilderPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      compiler.plugin('after-emit', this.onAfterEmit.bind(this));
    }
  }, {
    key: 'onAfterEmit',
    value: function onAfterEmit(compilation, callback) {
      var run = this.options.run;
      var quiet = this.options.quiet;
      delete this.options.run;
      delete this.options.quiet;

      var options = Object.assign({
        files: compilation.outputOptions.path + '/**/*'
      }, this.options);

      // If we are in run mode
      if (run) {
        var currentPlatform = (0, _detectCurrentPlatform2.default)();
        if (!options.platforms) options.platforms = [currentPlatform];
        options.currentPlatform = currentPlatform;
      }

      // Build App
      var nw = new _nwBuilder2.default(options);

      // Logging
      if (!quiet) nw.on('log', console.log);

      // Build or run the app
      var np = run ? nw.run() : nw.build();
      np.then(function () {
        return callback();
      }).catch(console.error);
    }
  }]);

  return NwBuilderPlugin;
}();

exports.default = NwBuilderPlugin;