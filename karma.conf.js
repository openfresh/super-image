'use strict';

module.exports = function(config) {
  config.set({
    frameworks : ['browserify', 'mocha'],
    files      : [
      'src/**/*.test.js'
    ],
    preprocessors : {
      'src/**/*.test.js' : 'browserify'
    },
    browserify : {
      transform : ['babelify']
    },
    browsers  : ['Chrome'],
    autoWatch : false,
    reporters : ['dots'],
    logLevel  : config.LOG_DEBUG
  });
};
