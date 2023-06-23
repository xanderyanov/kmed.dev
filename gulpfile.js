'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var rigger = require('gulp-rigger');
var uglify = require('gulp-uglify');
var path = require('path');
var plumber = require('gulp-plumber');
var data = require('gulp-data');
var fs = require('fs');
var rename = require('gulp-rename');
var less = require('gulp-less');
// var path = require("path");

gulp.task('pug', function () {
  return gulp
    .src('src/*.pug')
    .pipe(
      data(function (file) {
        return JSON.parse(fs.readFileSync('src/assets/data/data.json'));
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('build'));
});

var vendorsJsFiles = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
  'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
  'node_modules/sweetalert/dist/sweetalert.min.js',
  'node_modules/swiper/swiper-bundle.min.js',
];

gulp.task('vendorsJs', function () {
  return (
    gulp
      .src(vendorsJsFiles, {
        base: 'assets/js',
      })
      // .pipe(rigger()) //Прогоним через rigger
      .pipe(plumber())
      .pipe(sourcemaps.init()) //Инициализируем sourcemap
      .pipe(concat('vendors.js'))
      .pipe(uglify()) //Сожмем наш js
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build/assets/js'))
  );
});

var myjsfiles = ['src/assets/js/__script.js'];

// gulp.task('myJs', function () {
//   return (
//     gulp
//       // .src("src/assets/js/**/*.js*")
//       // .src("src/assets/js/main.js")
//       .src(myjsfiles, {
//         base: 'assets/js',
//       })
//       .pipe(plumber())
//       .pipe(sourcemaps.init()) //Инициализируем sourcemap
//       .pipe(concat('app.js')) // в какой файл объединить
//       // .pipe(uglify()) //Сожмем наш js
//       .pipe(sourcemaps.write('.'))
//       .pipe(gulp.dest('build/js'))
//   );
// });

gulp.task('myJs', function () {
  return gulp
    .src('src/assets/js/**/*.js*')
    .pipe(plumber())
    .pipe(gulp.dest('build/js'));
});

// символическая ссылка с папки в основном проекте
gulp.task('less', function () {
  return gulp
    .src('src/assets/less/**/[^_]*.less*')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css/'));
});

// // css-ки
// gulp.task('css', function () {
//   return gulp.src('src/assets/css/**/*.css*').pipe(gulp.dest('build/css'));
// });

// // символическая ссылка с папки в основном проекте
// gulp.task('lib', function () {
//   return gulp.src('src/assets/lib/**/*.*').pipe(gulp.dest('build/lib'));
// });

// // символическая ссылка с папки в основном проекте
// gulp.task('dev-lib', function () {
//   return gulp.src('src/assets/dev-lib/**/*.js*').pipe(gulp.dest('build/lib'));
// });

// // символическая ссылка с папки в основном проекте
// gulp.task('elements', function () {
//   return gulp
//     .src('src/assets/elements/**/*.*')
//     .pipe(gulp.dest('build/elements'));
// });

// // символическая ссылка с папки в основном проекте
// gulp.task('scripts', function () {
//   return gulp.src('src/assets/scripts/**/*.*').pipe(gulp.dest('build/scripts'));
// });

gulp.task('image', function () {
  return gulp
    .src('src/assets/img/**/*.*') //Выберем наши картинки
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('fonts', function () {
  return gulp.src('src/assets/fonts/**/*.*').pipe(gulp.dest('build/fonts'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('pug', 'myJs', 'less', 'fonts', 'image', 'vendorsJs')
  )
);

gulp.task('watch', function () {
  gulp
    .watch('src/assets/less/admin/*.less*', gulp.series('less'))
    .on('uplink', function (filepath) {
      remember.forget('less', path.resolve(filepath));
      delete cached.caches.less[path.resolve(filepath)];
    });

  gulp.watch('src/**/*.pug', gulp.series('pug'));
  //gulp.watch('src/**/*.less', gulp.series('less'));
  gulp.watch('src/assets/js/**/*.js', gulp.series('myJs'));
});

gulp.task('dev', gulp.series('build', 'watch'));
