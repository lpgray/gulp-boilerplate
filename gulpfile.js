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
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// 输出文件夹配置
var serveFolder = './serve';
var distFolder = './dist';
var tmp = './_tmp';

gulp.task('include', function() {
  gulp.src(['./src/**/*.html', '!./src/templates/**/*.html'])
  .pipe(fileInclude()) // https://github.com/coderhaoxin/gulp-file-include
  .pipe(gulp.dest(serveFolder));
});

gulp.task('lessc', function() {
  gulp.src('./src/less/app.less')
  .pipe(less().on('error', console.log))
  .pipe(postcss([autoprefixer]))
  .pipe(minify({
    keepBreaks: true
  }))
  .pipe(gulp.dest(serveFolder + '/css'))
  .pipe(browserSync.reload({stream : true})); // http://www.browsersync.io/docs/gulp/
});

gulp.task('serve', ['include', 'lessc', 'imagemin', 'copyjs', 'copylib'], function(){
  browserSync.init({ // http://www.browsersync.io/docs/gulp/
    server: {
      baseDir: serveFolder,
      // routes: {
      //     "/lib": "lib"
      // }
    }
  });

  gulp.watch('./src/**/*.html', ['include']);
  gulp.watch('./src/**/*.less', ['lessc']);
  gulp.watch('./src/js/**/*.js', ['copyjs']);
  gulp.watch('./src/lib/**/*.js', ['copylib']);
  gulp.watch('./src/img/**/*', ['imagemin']);
  gulp.watch(serveFolder + '/**/*.html').on('change', browserSync.reload);
  gulp.watch(serveFolder + '/**/*.js').on('change', browserSync.reload);
});

gulp.task('copyjs', function(){
  gulp.src('./src/js/**/*.js')
  .pipe(gulp.dest(serveFolder + '/js'));
});

gulp.task('copylib', function(){
  gulp.src('./src/lib/**/*')
  .pipe(gulp.dest(serveFolder + '/lib'));
});

gulp.task('copylib-dist', function(){
  gulp.src(serveFolder + '/lib/**/*')
  .pipe(gulp.dest(distFolder + '/lib'));
});

gulp.task('imagemin', function(){
  return gulp.src('src/img/**/*')
  .pipe(imageMin({
    progressive: true
  }))
  .pipe(gulp.dest(serveFolder + '/img'));
});

gulp.task('rev', ['compress'], function(){
  var revAll = new RevAll({dontRenameFile : ['.html']});  // https://www.npmjs.com/package/gulp-rev-all
  return gulp.src(tmp + '/**')
    .pipe(revAll.revision())
    .pipe(gulp.dest(distFolder));
});

gulp.task('compress', ['minify', 'uglify', 'copyimg', 'copyhtml', 'copylib-dist']);

gulp.task('minify', function() {
  return gulp.src(serveFolder + '/css/**/*.css')
    .pipe(concat('app.css'))
    .pipe(minify({
      keepBreaks : true
    }))
    .pipe(gulp.dest(tmp + '/css'));
});

gulp.task('copyimg', function(){
  return gulp.src(serveFolder + '/img/**/*')
    .pipe(gulp.dest(tmp + '/img'));
});

gulp.task('copyhtml', function(){
  return gulp.src(serveFolder + '/*.html')
    .pipe(gulp.dest(tmp));
});

gulp.task('uglify', function() {
  return gulp.src(serveFolder + '/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify({
      compress : {
        drop_console : true
      }
    }))
    .pipe(gulp.dest(tmp + '/js'));
});

gulp.task('build', ['rev'], function(){
  return gulp.src(tmp).pipe(rimraf());
});

gulp.task('clean', function() {
  return gulp.src([tmp, distFolder, serveFolder]).pipe(rimraf());
});
