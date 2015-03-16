'use strict';

/*jshint camelcase: false */

//var path = require('path');
var gulp = require('gulp');
var plug = require('gulp-load-plugins')({lazy: true});

var protractor = require('gulp-protractor').protractor;
var webdriver = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;




/**
 * Protractor e2e Tests
 */
gulp.task('webdriver_update', webdriver_update);

gulp.task('webdriver', webdriver);

gulp.task('protractor', ['webdriver_update'], function() {
	gulp.src(['test/protractor/*Spec.js'])
		.pipe(protractor({
			configFile: 'protractor.conf.js',
			keepAlive: true,
			dubug: true
		}))
		.on('error', plug.util.log);
});

gulp.task('default', ['protractor']);
