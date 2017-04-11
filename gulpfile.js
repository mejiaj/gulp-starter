var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var sourcemaps   = require('gulp-sourcemaps');
var rename       = require('gulp-rename');
var notify       = require('gulp-notify');
var browserSync  = require('browser-sync').create();

gulp.task('serve', ['scss', 'js'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./scss/**/*.scss', ['scss']);
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./*.html').on('change', browserSync.reload);

});

gulp.task('scss', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', notify.onError({
      title: 'SCSS Error',
      message: 'Error: <%= error.message %>'
    }))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('./js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', notify.onError({
      title: 'JS Error',
      message: 'Error: <%= error.message %>'
    }))
    .pipe(concat('base.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('optimize-images', function() {
  gulp.src('./img/**/*', {base: '.'})
    .pipe(imagemin());
});

gulp.task('default', ['serve']);
gulp.task('img', ['optimize-images']);
