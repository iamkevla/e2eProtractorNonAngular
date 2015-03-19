'use strict';
/*global element, by */


// spec.js
describe('ninja e2e testing', function() {

	var BASEAPIURL = 'http://pmrscr6dev.m2group.com.au/cerdev2';

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get(BASEAPIURL + '/');
	});
	
	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('CRM Plus');
	});

	it(' should automatically redirect to /#/ when location hash/fragment is empty', function() {
		expect(browser.getCurrentUrl())
			.toBe('http://pmrscr6dev.m2group.com.au/cerdev2/Login.aspx?ReturnUrl=%2fcerdev2%2fframework.aspx');
	});

	describe('login > ', function() {
		
		var loginButton = element(by.id('loginInput'));

		it(' should be able to be at login', function() {
			expect(loginButton.getAttribute('value')).toEqual('Log in');
		});

	
		it(' should reject invalid username and password', function() {
			element(by.id('txtUserName')).sendKeys('deve2');
			element(by.id('txtPassword')).sendKeys('invalid');
			loginButton.click();
			expect(element(by.id('messages')).getText()).toContain('Invalid');
		});

		
		it(' should accept valid username and password', function() {
			element(by.id('txtUserName')).sendKeys('deve2');
			element(by.id('txtPassword')).sendKeys('oracle');
			loginButton.click();
			expect(browser.getCurrentUrl())
				.toBe('http://pmrscr6dev.m2group.com.au/cerdev2/framework.aspx');
		});
		
	});
	
	describe('Search > ', function() {
	
		it(' should be able to search for an account', function() {
			element(by.css('div.bannerMenuWrap[title="Search"]')).click();
			element(by.css('div.menuWrap[title="Search for Account"]')).click();
			browser.switchTo().frame(0).then(function(){
				element(by.css('input[cleanId="renderertxtAccountNo"]'))
					.sendKeys('20011168\n')
					.then(function() {
						browser.switchTo().defaultContent();
						var accountName = by.id('qspAccountName');
						// unfortunately this wait doesnt actiually do anything on non angular page
						// so we still need the sleep later on
						browser.wait(function() {
							return browser.isElementPresent(accountName);
						}, 15000)	
						.then(function(){
							browser.sleep(1000);
							expect(element(accountName).getText()).toContain('MARILYN');
						});
					
					});
			});
		});

	});
	


});
