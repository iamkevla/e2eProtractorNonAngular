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
			expect(element(by.id('loginInput')).getAttribute('value')).toEqual('Log in');
		});

	
		it(' should reject invalid username and password', function() {
			element(by.id('txtUserName')).sendKeys('deve2');
			element(by.id('txtPassword')).sendKeys('invalid');
			element(by.id('loginInput')).click();
			expect(element(by.id('messages')).getText()).toContain('Invalid');
		});

		
		it(' should accept valid username and password', function() {
			element(by.id('txtUserName')).sendKeys('deve2');
			element(by.id('txtPassword')).sendKeys('oracle');
			element(by.id('loginInput')).click();
			expect(browser.getCurrentUrl())
				.toBe('http://pmrscr6dev.m2group.com.au/cerdev2/framework.aspx');
		});
		
	});
	
	describe('Search > ', function() {
	
		/*beforeEach(function() {
			try {
				element(by.id('h1Logout')).click();
			} catch (err) {
				console.log('no logout');
			}
			element(by.id('txtUserName')).sendKeys('deve2');
			element(by.id('txtPassword')).sendKeys('oracle');
			element(by.id('loginInput')).click();
		});*/
		
		it(' should be able to search for an account', function() {
			element(by.css('div.bannerMenuWrap[title="Search"]')).click();
			element(by.css('div.menuWrap[title="Search for Account"]')).click();
			browser.switchTo().frame(0).then(function(){
				//browser.sleep(1000);
				element(by.css('input[cleanId="renderertxtAccountNo"]'))
					.sendKeys('20000001\n')
					.then(function() {
						browser.switchTo().defaultContent();
						browser
							.sleep(20000)
							.then(function(){
							expect(element(by.id('qspAccountName')).getText()).toContain('BSS Team');
						});
//						browser
//							.wait(function() {
//								return protractor.until.elementIsVisible(element(by.id('qspAccountName')));
//							})
//							.then(function() {			
//								expect(element(by.id('qspAccountName')).getText()).toContain('BSS Team');
//							});
					});
			});
		});

	});
	


});
