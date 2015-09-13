var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    chalk = require('chalk');

// TODO: ADD console log removers
var scripts = {
    linter: function(){
        console.log(chalk.cyan('Checking JS syntax...'));

        gulp.src(['./public/app/**/*.js', './server/**/*.js', '!./public/app/app.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    },
    concat: function(){
        watch(['./public/app/**/*.js', '!./public/app/app.js'], function(){
            console.log(chalk.cyan('Concatenating client files...'));

            scripts.linter();
            gulp.src(['./public/app/*.module.js', './public/app/**/*.js', '!./public/app/app.js'])
                .pipe(concat('app.js'))
                .pipe(gulp.dest('./public/app/'));

            console.log(chalk.green('Client files concatenated'));
        });
    }
};

module.exports = scripts;