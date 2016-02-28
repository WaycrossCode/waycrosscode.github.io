var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    webserver = require('gulp-webserver');

var tsProject = ts.createProject('tsconfig.json');

// run init tasks
gulp.task('default', ['dependencies', 'ts', 'html', 'css']);

// run development task
gulp.task('dev', ['watch', 'serve']);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['ts']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/systemjs/dist/system.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/rxjs/bundles/Rx.js'
  ])
    .pipe(gulp.dest('build/lib'));
});

// compile typescript
gulp.task('ts', function() {
  var tsResult = tsProject.src('src/**/*.ts')
    .pipe(ts(tsProject));
  
  return tsResult.js.pipe(gulp.dest('build'));
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'))
});
