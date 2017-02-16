// Load plugins
var gulp = require('gulp'),
  del = require('del'),
  fs = require('fs'),
  runSequence = require('run-sequence'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload')
  responsive = require('gulp-responsive'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  handlebars = require('gulp-compile-handlebars'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  s3 = require('gulp-s3'),
  gzip = require('gulp-gzip'),
  modernizr = require('gulp-modernizr');

// Sass settings
var sassSettings = {
  outputStyle: 'expanded',
  precision: 10
};

// Autoprefixer browser support
var browsers = {
  browsers: ['last 2 versions', 'ie >= 10']
};

// AWS S3 Settings
var aws = JSON.parse(fs.readFileSync('src/aws.json')),
  awsOptions = {
    headers: {
      'Cache-Control': 'max-age=604800, no-transform, public',
      'Expires': new Date(Date.now() + 31536000).toUTCString()
    }
  };

// Clean directories
gulp.task('clean', function() {
  return del(['dist']);
});

// Compile Sass with Autoprefixer
gulp.task('sass', function() {
  return gulp.src('src/main.scss', sassSettings)
    .pipe(sass(sassSettings))
    .pipe(autoprefixer(browsers))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/assets/css'));
});

// Create responsive images
gulp.task('responsive', function() {
  return gulp.src('src/img/*.{png,jpg}')
    .pipe(gulp.dest('dist/assets/img'))
    // .pipe(responsive({
    //   '*_2x.{png,jpg}': {
    //     width: '50%'
    //   }
    // }))
    // // Remove suffix from retina images
    // .pipe(rename(function(path) {
    //   path.basename = path.basename.replace(/_2x/g, '')
    // }))
    .pipe(gulp.dest('dist/assets/img'));
});

// Compress images
gulp.task('imagemin', function() {
  return gulp.src('dist/assets/img/*.{png,jpg}')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/assets/img'));
});

// Compile Handlebars templates
gulp.task('handlebars', function() {
  // Handlebars data
  var templateData = JSON.parse(fs.readFileSync('src/_data/countdown.json'));

  return gulp.src('src/templates/index.hbs')
    .pipe(handlebars(templateData))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'));
});

// Compile JavaScript
gulp.task('js', function() {
  browserify('src/js/iibbsy.js', { debug: false })
    .bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(uglify({
      compress: true
    }))
    .pipe(gulp.dest('dist/assets/js'));
});

// Create custom Modernizr build
gulp.task('modernizr', function() {
  return gulp.src(['src/js/*.js', 'src/**/*.scss'])
    .pipe(modernizr({
      options: ['setClasses', 'addTest', 'html5printshiv', 'testProp', 'fnBind']
    }))
    .pipe(gulp.dest('src/vendors/modernizr/'));
});

// Create local server
gulp.task('server', function() {
  connect.server({
    port: 3000,
    root: 'dist',
    livereload: true
  });
});

// AWS S3 Deployment
gulp.task('s3:dev', function() {
  aws.bucket = 'dev.isitbaseballseasonyet.com';

  return gulp.src('dist/**')
    .pipe(gzip())
    .pipe(s3(aws, awsOptions));
});

gulp.task('s3:publish', function() {
  aws.bucket = 'isitbaseballseasonyet.com';

  return gulp.src('dist/**')
    .pipe(gzip())
    .pipe(s3(aws, awsOptions));
});

// TASKS
// Default task
gulp.task('default', ['clean'], function(callback) {
  runSequence(['handlebars', 'modernizr', 'sass'], 'js', 'responsive', 'imagemin', callback);
});

// Dev Deployment task
gulp.task('deploy', ['default'], function(callback) {
  runSequence('s3:dev', callback);
});

// Publish task
gulp.task('publish', ['default'], function(callback) {
  runSequence('s3:publish', callback);
});

// Watch task
gulp.task('watch', ['server'], function() {

  // Watch Sass
  gulp.watch(['src/**/*.scss'], ['sass']);

  // Watch Handlebars and template data
  gulp.watch(['src/templates/*.hbs', 'src/_data/*.json'], ['handlebars']);

  // Watch JavaScript
  gulp.watch(['src/js/*.js'], ['modernizr', 'js']);

  // LiveReload
  livereload.listen();
  gulp.watch('dist/**').on('change', livereload.changed);
});
