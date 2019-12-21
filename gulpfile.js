require('./build/sass');
require('./build/scripts');

const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const url = 'localhost:7888';

gulp.task('serve', () => {
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

  gulp.watch('./scss/**/*.scss', gulp.series('build-scss'));
  gulp.watch('./js/**/*.js', gulp.series('build-js'));
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('optimize-images', () => {
  gulp.src('./img/**/*', { base: '.' }).pipe(imagemin());
});

gulp.task('default', gulp.series('serve'));
gulp.task('img', gulp.series('optimize-images'));
