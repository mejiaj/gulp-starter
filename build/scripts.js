const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();

gulp.task('js-lint', () => {
  return gulp
    .src('./js/**/*.js')
    .pipe(
      eslint({
        globals: ['jQuery', '$'],
        envs: ['browser'],
        extends: 'eslint:recommended',
        rules: {
          'arrow-body-style': 0, // Need to remove this once I find a proper linter or example config.
        },
      }),
    )
    .pipe(eslint.format());
});

gulp.task('js', () => {
  return gulp
    .src('./js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .on(
      'error',
      notify.onError({
        title: 'JS Error',
        message: 'Error: <%= error.message %>',
      }),
    )
    .pipe(concat('base.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('build-js', gulp.series('js', 'js-lint'));
