const { Then, When } = require("@wdio/cucumber-framework");
const LandingPage = require("../../Pages/Hotels/LandingPage");
const SignInPage = require("../../Pages/Hotels/SignInPage");
const moment = require("moment");
const { expect, assert } = require("chai");

const landingPage = new LandingPage();
const signInPage= new SignInPage();

When(/^I Search (.+)$/, async function(typeAddress){
    await landingPage.enterDestination(typeAddress)
    await browser.pause(3000)
})


When(/^I select (.+)$/, async function(Autosuggestion){
    switch (Autosuggestion) {
        case 'Manhattan New York, New York, United States':
            await landingPage.selectFromAutoSuggestion(Autosuggestion)
            await browser.pause(3000)
            break;
    
        case 'Price: Low to High':
            await landingPage.filterLowToHigh()
            await browser.pause(3000)
            break;

        default:
            break;
    }
    
})

When(/^I enter (.+) date as (.+)$/, async function(check, selectDate) {
    switch (check) {
        case 'Check in':
            await landingPage.clickCheckIn(selectDate);
            break;
        case 'Check out':
            await landingPage.clickCheckOUT(selectDate);  // Make sure you have a function for clicking Check Out
            break;
        default:
            break;
    }
    await browser.pause(3000);
});


When(/^I choose to click on check inOut Done button$/, async function(){
    await landingPage.clickDone()
    await browser.pause(3000)
})


  
Then(/^I verify all hotels in search results are (.+) star rated as selected$/, async function (starRating) {
    const allHotelsHaveExpectedRating = await landingPage.checkAllHotelsStarRating(starRating);
    assert.ok(allHotelsHaveExpectedRating, `Not all hotels have a expected star rating.`);
  });

Then('I verify all hotels are listed in increasing order price', async function () {
    const prices = await landingPage.getPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
  
    assert.deepEqual(prices, sortedPrices, 'Hotel prices are not in ascending order');
  });
    



