var gulp = require('gulp');
var less = require('gulp-less');
var fileInclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var RevAll = require('gulp-rev-all');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var rimraf = require('gulp-rimraf');

// Folder name config
var serveFolder = './serve';
var distFolder = './dist';
var tmp = './_tmp';

gulp.task('include', function() {
    gulp.src('./src/*.html')
    .pipe(fileInclude())// https://github.com/coderhaoxin/gulp-file-include
    .pipe(gulp.dest(serveFolder))
});

gulp.task('less', function() {
    gulp.src('./src/less/app.less')
    .pipe(less())
    .pipe(gulp.dest(serveFolder + '/css'))
    .pipe(browserSync.reload({stream : true})) // http://www.browsersync.io/docs/gulp/
});

gulp.task('serve', ['include', 'less', 'imagemin', 'copyjs'], function(){
    browserSync.init({ // http://www.browsersync.io/docs/gulp/
        server: serveFolder
    });

    gulp.watch('./src/**/*.html', ['include']);
    gulp.watch('./src/less/**/*.less', ['less']);
    gulp.watch('./src/js/**/*.js', ['copyjs']);
    gulp.watch(serveFolder + '/*.html').on('change', browserSync.reload);
    gulp.watch(serveFolder + '/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('copyjs', function(){
    gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest(serveFolder + '/js'))
});

gulp.task('rev', ['compress'], function(){
    var revAll = new RevAll();  // https://www.npmjs.com/package/gulp-rev-all
    gulp.src(tmp + '/**')
    .pipe(revAll.revision())
    .pipe(gulp.dest(distFolder))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(distFolder))
    .pipe(revAll.versionFile())
    .pipe(gulp.dest(distFolder))
});

gulp.task('imagemin', function(){
    return gulp.src('src/img/*')
    .pipe(imageMin({
        progressive: false
    }))
    .pipe(gulp.dest(serveFolder + '/img'))
});

gulp.task('compress', ['minify', 'uglify', 'copyimg'])

gulp.task('minify', function() {
    gulp.src(serveFolder + '/css/**/*.css')
        .pipe(concat('app.css'))
        .pipe(minify({
            keepBreaks : true
        }))
        .pipe(gulp.dest(tmp + '/css'));
});

gulp.task('copyimg', function(){
    gulp.src(serveFolder + '/img/*')
        .pipe(gulp.dest(tmp + '/img'))
});

gulp.task('uglify', function() {
    gulp.src(serveFolder + '/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify({
            compress : {
                drop_console : true
            }
        }))
        .pipe(gulp.dest(tmp + '/js'));
});

gulp.task('build', ['rev'], function(){
    gulp.src(tmp)
        .pipe(rimraf())
});

gulp.task('clean', function() {
    gulp.src([tmp, distFolder, serveFolder])
        .pipe(rimraf())
})
