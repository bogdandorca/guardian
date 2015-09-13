// Karma configuration
// Generated on Sun Sep 13 2015 02:49:39 GMT+0300 (GTB Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './public/vendor/angular/angular.js',
        './public/vendor/angular-route/angular-route.js',
        './public/vendor/angular-mocks/angular-mocks.js',
        './public/vendor/jquery/dist/jquery.min.js',
        './public/vendor/toastr/toastr.js',
        './public/app/app.module.js',
        './public/app/**/*.controller.js',
        './public/app/**/*.service.js',
        './public/app/**/*.filter.js',
        './public/app/**/*.directive.js',
        './public/specs/**/*.js'
    ],


    // list of files to exclude
    exclude: [
        './public/app/app.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
