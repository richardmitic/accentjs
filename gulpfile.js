var browserify = require('browserify'),
    // watchify = require('watchify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    child_process = require('child_process'),
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

gulp.task('copybuild', ['browserify'], function() {
  gulp.src('./build/accent.js')
  .pipe(gulp.dest('./test/public/js'));
});

gulp.task('maps', function() {
  return require('./src/maps/latin_accents').run();
})

gulp.task('server', function(cb) {
  child_process.execFile('node', ['test/app.js'], function(error, stdout, stderr){
	   console.log(stdout);
	   console.log(stderr);
	   cb(err);
  });
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

gulp.task('default', ['browserify', 'copybuild']);