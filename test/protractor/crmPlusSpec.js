'use strict';
/*global element, by */


// spec.js
describe('tc3 e2e testing', function() {

	var BASEAPIURL = 'http://pmrscr6dev.m2group.com.au/cerdev2';


	beforeEach(function() {
		browser.get(BASEAPIURL + '/login.aspx');
	});


	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('Take Command - Commander');
	});

	it(' should automatically redirect to /#/ when location hash/fragment is empty', function() {
		expect(browser.getLocationAbsUrl()).toBe('/login/');
	});

	describe('login > ', function() {

		beforeEach(function() {
			browser.get(BASEAPIURL + '/#/login/');
		});


		it(' should be able to be at login', function() {
			var button = element(by.css('.btn-info'));
			expect(button.getText()).toEqual('Sign in');
			expect(button.getCssValue('display')).toEqual('inline-block');
		});


		it(' should reject invalid username and password', function() {
			element(by.model('username')).sendKeys('20011176');
			element(by.model('password')).sendKeys('invalid');
			element(by.css('button[type="submit"]')).click();
			expect(element(by.binding('error()')).getText()).toContain('Incorrect password');
		});

		it(' should accept valid username and password', function() {
			element(by.model('username')).sendKeys('deve2');
			element(by.model('password')).sendKeys('oracle');
			element(by.css('button[type="submit"]')).click();
			expect(browser.getLocationAbsUrl()).toBe('/accounts/20011176');
		});

	});



});
