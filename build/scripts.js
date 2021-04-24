const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();

const esLintOpts = {
  globals: ['jQuery', '$'],
  envs: ['browser'],
  extends: 'eslint:recommended',
  rules: {
    'arrow-body-style': 0, // Need to remove this once I find a proper linter or example config.
  },
};

function jsLint() {
  return gulp
    .src('./js/**/*.js')
    .pipe(eslint(esLintOpts))
    .pipe(eslint.format());
}

function jsCompile() {
  return gulp
    .src('./js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .on('error', error)
    .pipe(concat('base.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

function jsBuild() {
  return gulp.series('jsCompile', 'jsLint');
}

exports.jsLint = jsLint;
exports.jsCompile = jsCompile;
exports.jsBuild = jsBuild;
