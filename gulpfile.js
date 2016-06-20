var bower = require('gulp-bower'),
    browserSync = require('browser-sync'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    include = require('gulp-include'),
    jshint = require('gulp-jshint'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

var config = {
    bowerDir: './bower_components' 
}

gulp.task('bower', function(){
  return bower();
});

//Move FA icon fonts
gulp.task('icons', ['bower'], function() { 
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
    .pipe(gulp.dest('./assets/fonts')); 
});

//Initialize project
gulp.task('init', ['icons']);

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
    require('precss'),
    require('autoprefixer'),
    require('postcss-clean')
  ];
  return gulp.src('./src/css/*.scss')
    .pipe( sourcemaps.init() )
    .pipe( postcss(processors) )
    .pipe( sourcemaps.write('.') )
    .pipe(rename('main.css'))
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
  gulp.watch('./src/**/*.scss', ['css']);
  gulp.watch('./src/**/*.js', ['scripts']);
  gulp.watch('*.html', ['reload'] );
});

//Default gulp function
gulp.task('default', ['watch'], function() {

});
