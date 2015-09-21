var gulp = require('gulp'),
    livereload = require('gulp-livereload');

module.exports = function(){
    gulp.src('./public/**/*.jade')
        .pipe(livereload());
};