// Load plugins
var gulp = require('gulp'),
  del = require('del'),
  fs = require('fs'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload')
  responsive = require('gulp-responsive'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  handlebars = require('gulp-compile-handlebars');

// Sass settings
var sassSettings = {
  outputStyle: 'expanded',
  precision: 10
};

// Autoprefixer browser support
var browsers = {
  browsers: ['last 2 versions', 'ie >= 10']
};

// Clean directories
gulp.task('clean-css', function(resp) {
  del(['dist/assets/css'], resp);
});

// Compile Sass with Autoprefixer
gulp.task('sass', function() {
  return gulp.src('src/*.scss', sassSettings)
    .pipe(sass(sassSettings))
    .pipe(autoprefixer(browsers))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/assets/css'));
});

// Copy images to dist
gulp.task('images', function() {
  return gulp.src('src/img/*.{png,jpg}')
    .pipe(gulp.dest('dist/assets/img'));
});

// Create responsive images
gulp.task('responsive', function() {
  return gulp.src('src/img/*.{png,jpg}')
    .pipe(responsive({
      '*_2x.{png,jpg}': {
        width: '50%'
      }
    }))
    // Remove suffix from retina images
    .pipe(rename(function(path) {
      path.basename = path.basename.replace(/_2x/g, '')
    }))
    .pipe(gulp.dest('dist/assets/img'));
});

// Compress images
gulp.task('imagemin', function() {
  return gulp.src('dist/assets/img/*.{png,jpg}')
    .pipe(cache(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    })))
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

// Create local server
gulp.task('server', function() {
  connect.server({
    port: 3000,
    root: 'dist',
    livereload: true
  });
});

// TASKS
// Default task
gulp.task('default', ['clean-css', 'handlebars', 'sass', 'images', 'responsive', 'imagemin']);

// Watch task
gulp.task('watch', ['server'], function() {

  // Watch Sass
  gulp.watch(['src/**/*.scss'], ['sass']);

  // Watch Handlebars and template data
  gulp.watch(['src/templates/*.hbs', 'src/_data/*.json'], ['handlebars']);

  // LiveReload
  livereload.listen();
  gulp.watch('dist/**').on('change', livereload.changed);
});
