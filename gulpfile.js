var gulp = require('gulp');
var less = require('gulp-less');
var fileInclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();

var serveFolder = './serve';
var distFolder = './dist';

gulp.task('include', function() {
    gulp.src('./src/*.html')
        .pipe(fileInclude())// https://github.com/coderhaoxin/gulp-file-include
        .pipe(gulp.dest(serveFolder))
});

gulp.task('less', function() {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest(serveFolder + '/css'))
        .pipe(browserSync.reload({stream : true})) // http://www.browsersync.io/docs/gulp/
});

gulp.task('serve', ['include', 'less'], function(){
    browserSync.init({ // http://www.browsersync.io/docs/gulp/
        server: './serve'
    });

    gulp.watch('./src/**/*.html', ['include']);
    gulp.watch('./src/less/**/*.less', ['less']);
    gulp.watch(serveFolder + '/*.html').on('change', browserSync.reload);
});
