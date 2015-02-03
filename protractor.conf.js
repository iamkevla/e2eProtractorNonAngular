'use strict';

// conf.js
exports.config = {
	allScriptsTimeout: 11000,
	
	specs: ['test/protractor/*Spec.js'],
	capabilities: {
    browserName: 'internet explorer',
		platform: 'ANY',
		version: '11'
  },
	
	baseUrl: 'http://pmrscr6dev.m2group.com.au/cerdev2/',

  framework: 'jasmine',
	
	jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showColors: false
  }
	
};