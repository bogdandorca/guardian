var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    minifyCss= require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    chalk = require('chalk');

var styles = {
    development: function(){
        watch('./public/assets/styles/**/*.scss', function(){
            console.log(chalk.cyan('Processing style files...'));
            gulp.src('./public/assets/styles/global.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions']
                }))
                .pipe(gulp.dest('./public/assets/styles/'));
            console.log(chalk.green('Style files processed'));
        });
    }
};

module.exports = styles;