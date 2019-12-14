var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
// var babel = require('gulp-babel');

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
    /**
     * If you already have a local server and you just need
     * browserSync to watch. Delete `server: {}` and uncomment below.
     * Be sure to update your localhost URL
     * proxy: "localhost:7888"
     */
  });

  gulp.watch('./scss/**/*.scss', gulp.series('scss'));
  gulp.watch('./js/**/*.js', gulp.series('js'));
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('scss', () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on(
      'error',
      notify.onError({
        title: 'SCSS Error',
        message: 'Error: <%= error.message %>'
      })
    )
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp
    .src('./js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .on(
      'error',
      notify.onError({
        title: 'JS Error',
        message: 'Error: <%= error.message %>'
      })
    )
    .pipe(concat('base.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// gulp.task('optimize-images', () => {
//   gulp.src('./img/**/*', { base: '.' }).pipe(imagemin());
// });

gulp.task('default', gulp.series('serve'));
// gulp.task('img', gulp.series('optimize-images'));
