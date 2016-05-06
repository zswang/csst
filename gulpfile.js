/*jshint globalstrict: true*/
/*global require*/

'use strict';

var gulp = require('gulp');
var util = require('util');
var jdists = require('gulp-jdists');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build', function() {
  return gulp.src(['src/csst.js'])
    .pipe(jdists({
      trigger: 'release'
    }))
    .pipe(gulp.dest('./'))
    .pipe(uglify())
    .pipe(rename('csst.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build']);