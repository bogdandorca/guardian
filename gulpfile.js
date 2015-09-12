var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

// Personal modules
var scripts = require('./gulp_tasks/scripts.js'),
    styles = require('./gulp_tasks/styles.js');

gulp.task('default', ['scripts-concat', 'styles-development'], function(){
    nodemon({
        script: 'server/index.js',
        ignore: ['./gulp_tasks', './public/'],
        env: { 'NODE_ENV': 'development' }
    })
        .on('start', ['lint']);
});

gulp.task('lint', scripts.linter);
gulp.task('scripts-concat', ['lint'], scripts.concat);

gulp.task('styles-development', styles.development);