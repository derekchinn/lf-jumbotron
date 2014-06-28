({
  mainConfigFile: '../requirejs.conf.js',
  name: 'livefyre-bootstrap',
  include: [
    'almond'
  ],
  namespace: 'Livefyre',
  out: '../dist/livefyre-bootstrap.min.js',
  optimize: 'uglify2',
  cjsTranslate: true,
  generateSourceMaps: true,
  preserveLicenseComments: false,
  onBuildRead: function(moduleName, path, contents) {
    switch (moduleName) {
      case "jquery":
        contents = "define([], function(require, exports, module) {" + contents + "});";
        break;
      case "bootstrap":
        contents = "define(['jquery'], function (jQuery) {" + contents + "});";
        break;
    }
    return contents;
  }
})
