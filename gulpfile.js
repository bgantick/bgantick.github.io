var autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync'),
    clean = require('postcss-clean'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    include = require('gulp-include'),
    jshint = require('gulp-jshint'),
    postcss = require('gulp-postcss'),
    precss = require('precss'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

// spin up a server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: ''
    },
  });
});

gulp.task('css', function () {
  var processors = [
    autoprefixer,
    clean,
    precss
  ];
  return gulp.src('./src/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss(processors) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./assets/css') )
    .pipe(browserSync.reload({ stream: true }));
});

//Lint and minify scripts
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(include())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./assets/js'))
    .on('error', gutil.log)
    .pipe(browserSync.reload({ stream: true }));
});

//Generic LiveReload task
gulp.task('reload', function() {
  return gulp.src('*.html')
    .pipe(browserSync.reload({ stream: true }));
});

//Watch for changes
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('./src/**/*.css', ['css']);
  gulp.watch('./src/**/*.js', ['scripts']);
  gulp.watch('*.html', ['reload'] );
});

//Default gulp function
gulp.task('default', ['watch'], function() {

});
