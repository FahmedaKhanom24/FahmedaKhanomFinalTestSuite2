const { When, Then, Given } = require("@wdio/cucumber-framework");
const LandingPage = require("../../Pages/Hotels/LandingPage");
const { expect } = require("chai");
const landingPage = new LandingPage();

let adultCount = 0;
let childCount=0;

When(/^I change (.+) count to (.+)$/, async function (field, count) {
  switch (field) {
    case "Adults":
      await landingPage.selectAdults(count);
      adultCount = count;
      break;
    case "Children":
        await landingPage.selectChildren(count)
        childCount = count;
        break;
    default:
      break;
  }
  await browser.pause(5000);
});


When(/^I choose to select child-(.+) age as (.+)$/, async function (childNum, childAge) {
    await landingPage.selectChildAge(childNum, childAge);
  
    await browser.pause(2000);
  });


Then(/^I verify the travelers count is updated correctly$/, async function(){
    const travelersCountOnWeb = Number(await landingPage.getTravelersCount())
    const travelerCountExpected = Number(adultCount) + Number(childCount)
    expect(travelersCountOnWeb,'Travelers count is not as expected').to.be.equal(travelerCountExpected)
  
  
  })