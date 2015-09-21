var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    chalk = require('chalk'),
    livereload = require('gulp-livereload'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    stripDebug = require('gulp-strip-debug');

var filename;
argv.production ? filename = 'app.min.js' : filename = 'app.js';

var scripts = {
    global: function(){
        console.log(chalk.cyan('Processing JavaScript files...'));

        gulp.src(['./public/app/**/*.js', './server/**/*.js', '!./public/app/app.js', '!./public/app/app.min.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    },
    client: function(){
        console.log(chalk.cyan('Processing Public JavaScript files...'));

        gulp.src(['./public/app/*.module.js', './public/app/**/*.js', '!./public/app/app.js', '!./public/app/app.min.js'])
            .pipe(concat(filename))
            .pipe(gulpif(argv.production, stripDebug()))
            .pipe(gulpif(argv.production, uglify({
                mangle: false
            })))
            .pipe(gulp.dest('./public/app/'))
            .pipe(livereload());

        console.log(chalk.green('Client files processed'));
    }
};

module.exports = scripts;