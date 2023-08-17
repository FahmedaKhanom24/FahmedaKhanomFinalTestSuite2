const { Then } = require("@wdio/cucumber-framework");
const LandingPage = require("../../Pages/Hotels/LandingPage");
const SignInPage = require("../../Pages/Hotels/SignInPage");
const moment = require("moment");
const { expect } = require("chai");

const landingPage = new LandingPage();
const signInPage= new SignInPage();

Then(/^I verify (.+) is disabled$/, async function(disabled){
    switch (disabled) {
        case 'past dates':
            const currentDate = moment().format('D');
            const disabledDateCount = await landingPage.currentMonthDisbaledDates();
            expect(currentDate - 1, 'Number of disbaled dates are not as expected').to.be.equal(disabledDateCount)
            break;
        case 'back button on current month':
            await landingPage.previousButtonDisbaled()
            break
        default:
            break;
    }

    
    
})