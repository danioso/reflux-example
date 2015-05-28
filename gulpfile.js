var gulp = require('gulp')
  , browserSync = require('browser-sync')
  , reload = browserSync.reload
  , plumber = require('gulp-plumber')
  , babelify = require('babelify')
  , browserify = require('browserify')
  , transform = require('vinyl-transform')
  , uglify = require('gulp-uglify');

var path = {
  app: './src/',
  dist: './dist/'
}

// html
gulp.task('html', function(){
    return gulp.src([path.app + 'index.html'], {
      base: path.app
    })
    .pipe(gulp.dest(path.dist))
    .pipe(reload({ stream: true }));
});

// css
gulp.task('css', function(){
  gulp.src([path.app + 'styles/main.css'])
    .pipe(plumber())
    .pipe(gulp.dest(path.dist + 'styles/'))
    .pipe(reload({ stream: true }));
});

// js + browserify + babelify (jsx)
gulp.task('js', function() {

  var browserified;
  browserified = transform(function(filename) {
    return browserify(filename)
      .transform([babelify])
      .bundle();
  });

  gulp
    .src([path.app + 'scripts/main.js'])
    .pipe(plumber())
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest(path.dist + 'scripts/'))
    .pipe(reload({ stream: true }));
});

// Build
gulp.task('build', ['js', 'css', 'html']);

// Watch changes
gulp.task('watch', ['js', 'css', 'html'], function() {

  browserSync({
    server: {
      baseDir: path.dist
    }
  });

  gulp.watch(path.app + 'styles/main.css', ['css']);
  gulp.watch(path.app + 'scripts/**/*.*', ['js']);
  gulp.watch(path.app + 'index.html', ['html']);

});

// web server
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: path.dist
    }
  });
});
