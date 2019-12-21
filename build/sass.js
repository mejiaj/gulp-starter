const gulp = require('gulp');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const autoprefixer = require('gulp-autoprefixer');
const sassGlob = require('gulp-sass-glob');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('dart-sass');

const lintReports = {
  reporters: [
    {
      formatter: 'verbose',
      console: true,
    },
  ],
  syntax: 'scss',
};

gulp.task('scss-lint', () => {
  return gulp.src('./scss/**/*.scss').pipe(stylelint(lintReports));
});

gulp.task('scss', () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: ['./node_modules'],
      }),
    )
    .on(
      'error',
      notify.onError({
        title: 'SCSS Error',
        message: 'Error: <%= error.message %>',
      }),
    )
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('build-scss', gulp.series('scss', 'scss-lint'));
