var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var sassGlob = require('gulp-sass-glob');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();

const url = 'localhost:7888';
sass.compiler = require('dart-sass');

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    /**
     * If you already have a local server and you just need
     * browserSync to watch. Delete `server: {}` and uncomment below.
     * Be sure to update your localhost URL
     * proxy: url
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

gulp.task('js', () => {
  return gulp
    .src('./js/**/*.js')
    .pipe(sourcemaps.init())
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
    .pipe(eslint.format())
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

gulp.task('optimize-images', () => {
  gulp.src('./img/**/*', { base: '.' }).pipe(imagemin());
});

gulp.task('default', gulp.series('serve'));
gulp.task('img', gulp.series('optimize-images'));
