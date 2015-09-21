var gulp = require('gulp'),
    watch = require('gulp-watch'),
    chalk = require('chalk'),
    livereload = require('gulp-livereload'),
    argv = require('yargs').argv;

// Personal modules
var config = require('./config.js').development,
    scripts = require('./gulp_tasks/scripts.js'),
    styles = require('./gulp_tasks/styles.js'),
    jade = require('./gulp_tasks/template.js'),
    test = require('./gulp_tasks/test.js'),
    server = require('./gulp_tasks/server.js'),
    injector = require('./gulp_tasks/injector.js'),
    clean = require('./gulp_tasks/clean.js'),
    open = require('open');

// The environment is determined by the '--production' flag
var environment;
argv.production ? environment = 'production' : environment = 'development';

gulp.task('default', ['clean', 'global', 'client', 'sass', 'build', 'server', 'open'], function(){
    /*  Flags:
            none: Task automation for development (JSLinter, JSConcat, Sass, CSS-Prefixer), starts the server and livereload
            --production: Adds to the default suite: JS Uglify, JS Strip Debug, CSS Minify
            --browse: Opens the browser with the website
    */
    console.log(chalk.cyan('Getting ready for the '+environment + ' environment...'));

    livereload.listen(35729);
    // Scripts
    watch(['./public/app/**/*.js', '!./public/app/app.js', '!./public/app/app.min.js', './server/**/*.js'], scripts.global);
    watch(['./public/app/**/*.js', '!./public/app/app.js', '!./public/app/app.min.js'], scripts.client);
    watch('./public/**/*.jade', jade);
    // Styles
    watch('./public/assets/styles/**/*.scss', styles.sass);

    console.log(chalk.green('The '+environment+' environment is ready.'));
});

// Server
gulp.task('server', server);
gulp.task('open', function(){
    if(argv.browse) open('http://localhost:'+config.port);
});
// Clean
gulp.task('clean', clean);
// Scripts
gulp.task('global', scripts.global);
gulp.task('client', scripts.client);
// Styles
gulp.task('sass', styles.sass);
// Jade
gulp.task('jade', jade);
// Injector
gulp.task('build', injector);

// Test
gulp.task('test', test);