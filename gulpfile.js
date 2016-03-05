'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');

var paths = ['*.js'];

gulp.task('lint', function() {
  return gulp.src(paths)
  .pipe(lint())
  .pipe(lint.format());
});

gulp.task('default', ['lint']);
