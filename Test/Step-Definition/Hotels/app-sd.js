const { When, Then, Given } = require("@wdio/cucumber-framework");
const LandingPage = require("../../Pages/Hotels/LandingPage");
const SignInPage = require("../../Pages/Hotels/SignInPage");

const landingPage = new LandingPage();
const signInPage= new SignInPage();

Given(/^I am on hotels landing page$/, async function () {
  await browser.url("https://www.hotels.com/");
});

When(/^I click (.+)$/, async function (button) {
  switch (button) {
    case 'Get the app button':
      await landingPage.clickApp();
      break;
    case 'Travelers':
      await landingPage.travelersClick()
      break;
    case 'Done':
      await landingPage.clickTravelerDoneButton()
      break;

    case 'Sign in link':
      await landingPage.clickSignIn();
      await browser.pause(3000)
      break;
      
    case 'Sign in button on the sign up page':
        await landingPage.clickSignInButton();
        await browser.pause(3000)
        break;

    case 'One Key Rewards Terms & Conditions link':
      await signInPage.CickOneKeyElement()
      break;
    
    case 'Privacy Statement link':
      await signInPage.clickPrivacyLinkElement()
      break;

    case 'Dates':
      await landingPage.clickDates()
      break;

   
    case 'Search button':
      await landingPage.searchDone()
      await browser.pause(3000)
      break;

    case '5 star':
      await landingPage.clickRating(button)
      await browser.pause(3000)

      break;
    default:
      break;
  }
});

Then(/^I verify (.+) is displayed$/, async function (verification) {
  switch (verification) {
    case "Scan the QR code and download our app":
      await landingPage.verifyDownloadAppDisplayed();
      break;
    case "QR Code":
      await landingPage.QRCodeDisplayed();
      break;

    case "One Key Terms and Conditions heading":
      await signInPage.oneKeyDisplayed()
      break;
    case 'Effective from date format':
      await signInPage.verifyDateOneKeyFormat()
      break;

    case 'Privacy Statement heading':
      await signInPage.displayPrivacyLink()
      break;

    case 'Last Updated date format':
      await signInPage.lastUpdatedLocatorDisplyed()
      break;

    case 'current month':
      await landingPage.datesCurrentMonth()
      break;
    default:
      break;
  }
});
