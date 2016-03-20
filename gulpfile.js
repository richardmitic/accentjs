var browserify = require('browserify'),
    // watchify = require('watchify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    sourceFile = './src/index.js',
    destFolder = './build/',
    destFile = 'accent.js';

gulp.task('browserify', ['maps'], function() {
  return browserify(sourceFile, {
    standalone: "Accent"}
  )
  .bundle()
  .pipe(source(destFile))
  .pipe(gulp.dest(destFolder));
});

gulp.task('maps', function() {
  return require('./src/maps/latin_accents').run();
})

// gulp.task('watch', function() {
//   var bundler = watchify(sourceFile);
//   bundler.on('update', rebundle);
//
//   function rebundle() {
//     return bundler.bundle()
//       .pipe(source(destFile))
//       .pipe(gulp.dest(destFolder));
//   }
//
//   return rebundle();
// });

gulp.task('default', ['browserify']);