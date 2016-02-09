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
  return gulp.src(['./src/**/*.html', '!./src/templates/*.html'])
  .pipe(fileInclude()) // https://github.com/coderhaoxin/gulp-file-include
  .pipe(gulp.dest(serveFolder));
});

gulp.task('lessc', function() {
  return gulp.src('./src/assets/less/app.less')
  .pipe(less().on('error', console.log))
  .pipe(postcss([autoprefixer]))
  .pipe(minify({
    keepBreaks: true
  }))
  .pipe(gulp.dest(serveFolder + '/assets/css'))
  .pipe(browserSync.reload({stream : true})); // http://www.browsersync.io/docs/gulp/
});

gulp.task('copyjs', function(){
  return gulp.src('./src/assets/js/**/*.js')
  .pipe(gulp.dest(serveFolder + '/assets/js'));
});

gulp.task('copylib', function(){
  return gulp.src(['./src/assets/lib', '!./src/assets/lib/base'])
  .pipe(gulp.dest(serveFolder + '/assets'));
});

gulp.task('imagemin', function(){
  return gulp.src('src/assets/img/**/*')
  .pipe(imageMin({
    progressive: true
  }))
  .pipe(gulp.dest(serveFolder + '/assets/img'));
});

gulp.task('serve', ['include', 'lessc', 'imagemin', 'copyjs', 'copylib'], function(){
  browserSync.init({ // http://www.browsersync.io/docs/gulp/
    server: {
      baseDir: serveFolder
    }
  });

  gulp.watch('./src/**/*.html', ['include']);
  gulp.watch('./src/assets/**/*.less', ['lessc']);
  gulp.watch('./src/assets/js/**/*.js', ['copyjs']);
  gulp.watch('./src/assets/lib/**/*.js', ['copylib']);
  gulp.watch('./src/assets/img/**/*', ['imagemin']);
  gulp.watch(serveFolder + '/**/*.html').on('change', browserSync.reload);
  gulp.watch(serveFolder + '/assets/**/*.js').on('change', browserSync.reload);
});

// gulp.task('minify', function() {
//   return gulp.src(serveFolder + '/assets/css/**/*.css')
//   .pipe(concat('app.css'))
//   .pipe(minify({
//     keepBreaks : true
//   }))
//   .pipe(gulp.dest(tmp + '/assets/css'));
// });
//
// gulp.task('copyimg', function(){
//   return gulp.src(serveFolder + '/assets/img/**/*')
//   .pipe(gulp.dest(tmp + '/assets/img'));
// });
//
// gulp.task('uglify', function() {
//   return gulp.src(serveFolder + '/assets/js/**/*.js')
//     .pipe(concat('app.js'))
//     .pipe(uglify({
//       compress : {
//         drop_console : true
//       }
//     }))
//     .pipe(gulp.dest(tmp + '/assets/js'));
// });
// gulp.task('rev', ['compress'], function(){
//   var revAll = new RevAll();  // https://www.npmjs.com/package/gulp-rev-all
//   return gulp.src(tmp + '/**')
//     .pipe(revAll.revision())
//     .pipe(gulp.dest(distFolder));
// });
