var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    chalk = require('chalk'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    livereload = require('gulp-livereload');

var filename;
argv.production ? filename = 'global.min.css' : filename = 'global.css';

var styles = {
    sass: function(){
        console.log(chalk.cyan('Processing style files...'));
        gulp.src('./public/assets/styles/global.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(gulpif(argv.production, minifyCss()))
            .pipe(gulpif(argv.production, rename(filename)))
            .pipe(gulp.dest('./public/assets/styles/'))
            .pipe(livereload());

        console.log(chalk.green('Style files processed'));
    }
};

module.exports = styles;