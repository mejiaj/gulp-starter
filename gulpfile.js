const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const url = 'localhost:7888';
const { sassBuild } = require('./build/sass');
const { jsBuild } = require('./build/scripts');

function serve() {
  browserSync.init({
    server: {
      baseDir: './',
    },
    /**
     * If you already have a local server and you just need
     * browserSync to watch. Delete `server: {}` and uncomment below.
     * Be sure to update your localhost URL
     */
    //
    // proxy: url
  });

  gulp.watch('./scss/**/*.scss', gulp.series(sassBuild));
  gulp.watch('./js/**/*.js', gulp.series(jsBuild));
  gulp.watch('./*.html').on('change', browserSync.reload);
}

function optimizeImages() {
  return gulp.src('./img/**/*', { base: '.' }).pipe(imagemin());
}

exports.optimizeImages = optimizeImages;
exports.default = serve;
