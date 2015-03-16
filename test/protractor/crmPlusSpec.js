'use strict';
/*global element, by */


// spec.js
describe('ninja e2e testing', function() {

	var BASEAPIURL = 'http://pmrscr6dev.m2group.com.au/cerdev2';

	beforeEach(function() {
		browser.ignoreSynchronization = true;
	});
	
	
	beforeEach(function() {
		browser.get(BASEAPIURL + '/');
	});


	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('CRM Plus');
	});

	
	
	it(' should automatically redirect to /#/ when location hash/fragment is empty', function() {
		expect(browser.getCurrentUrl()).toBe('http://pmrscr6dev.m2group.com.au/cerdev2/Login.aspx?ReturnUrl=%2fcerdev2%2fframework.aspx');
	});

	
	describe('login > ', function() {

		it(' should be able to be at login', function() {
			element(by.id('loginInput')).then(function(elem) {
				expect(elem.getText()).toEqual('Sign in');
			});
		});

	/*
		it(' should reject invalid username and password', function() {
			element(By.id('txtUserName')).sendKeys('deve2');
			element(By.id('txtPasswordlabel')).sendKeys('invalid');
			element(By.id('loginInput')).click();
			expect(element(By.id('messages')).getText()).toContain('Invalid');
		});

			
		it(' should accept valid username and password', function() {
			element(by.model('username')).sendKeys('deve2');
			element(by.model('password')).sendKeys('oracle');
			element(by.css('button[type="submit"]')).click();
			expect(browser.getLocationAbsUrl()).toBe('/accounts/20011176');
		});
		*/
	});
	


});
