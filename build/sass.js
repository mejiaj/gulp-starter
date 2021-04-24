const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-dart-scss');
const stylelint = require('gulp-stylelint');
const autoprefixer = require('gulp-autoprefixer');
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

function sassLint() {
  return gulp.src('./scss/**/*.scss').pipe(stylelint(lintReports));
}

function sassCompile() {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ['./node_modules'],
      }),
    )
    .on('error', console.log(error))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

exports.sassLint = gulp.series(sassLint);
exports.sassCompile = gulp.series(sassCompile);
exports.sassBuild = gulp.series(sassCompile, sassLint);
