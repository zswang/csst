/*jshint globalstrict: true*/
/*global require*/

'use strict';

var gulp = require('gulp');
var util = require('util');
var jdists = require('gulp-jdists');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var open = require('gulp-open');
var examplejs = require('gulp-examplejs');

gulp.task('example', function() {
  return gulp.src('src/**/*.js')
    .pipe(examplejs({
      header: 'var csst = require("../");require("./lib/dom");'
    }))
    .pipe(gulp.dest('test'));
});

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

gulp.task('buildDev', function() {
  return gulp.src(['src/csst.js'])
    .pipe(jdists({
      trigger: 'debug'
    }))
    .pipe(gulp.dest('./'));
});

var debugPort = 8111;

function debugAddress() {
  var net = require('os').networkInterfaces();
  var result;
  Object.keys(net).some(function(key) {
    return net[key].some(function(item) {
      if (!item.internal && item.family === 'IPv4') {
        result = item.address;
        return true;
      }
    });
  });
  return result;
}

gulp.task('connect', function() {
  require('./example/app');
  connect.server({
    root: './',
    port: debugPort,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('./example/*.html')
    .pipe(connect.reload());
});

gulp.task('open', function() {
  gulp.src(__filename)
    .pipe(open({
      uri: util.format('http://%s:%s/example/index.html', debugAddress(), debugPort)
    }));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.js', 'example/*.html'], ['buildDev', 'html']);
});

gulp.task('debug', ['buildDev', 'html', 'connect', 'open', 'watch']);

gulp.task('default', ['build']);