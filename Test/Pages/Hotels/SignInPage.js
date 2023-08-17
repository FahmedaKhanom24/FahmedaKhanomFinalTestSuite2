const { expect } = require("chai");
const moment = require("moment");

class SignInPage {
  oneKeyLocator = '//a[text()="One Key Rewards Terms & Conditions"]';
  oneKeyDisplayLocator = '//h1[text()="One Key Terms and Conditions"]';
  dateOneKeyLocator = '//p[contains(text(),"Effective from")]';
  privacyLinkLocator = '//a[text()="Privacy Statement"]';
  privacyLinkDisplayLocator = '//h2[text()="Privacy Statement"][1]';
  lastUpdatedLocator = '//p[contains(text(),"Last Updated")]';

  async CickOneKeyElement() {
    const oneKeyElement = await $(this.oneKeyLocator);
    await oneKeyElement.waitForClickable();
    await oneKeyElement.click();
  }

  async oneKeyDisplayed() {
    const windowHandles = await browser.getWindowHandles();
    await browser.switchToWindow(windowHandles[1]); // Change to the second window using index 1
    const oneKeyDisplayElement = await $(this.oneKeyDisplayLocator);
    await oneKeyDisplayElement.waitForDisplayed({ timeout: 2000 });
    const oneKeyDisplayed = await oneKeyDisplayElement.isDisplayed();
    expect(oneKeyDisplayed, "Element not displayed").to.be.true;
  }

  async verifyDateOneKeyFormat() {
    const dateOneKeyElement = await $(this.dateOneKeyLocator);
    const dateText = await dateOneKeyElement.getText();
    const dateParts = dateText.split(" ");
    const extractedPart = dateParts.slice(2).join(" ");
    const expectedDateFormat = "MMMM D, YYYY";
    console.log(extractedPart);
    const parsedDate = moment(extractedPart, expectedDateFormat, true);
    expect(parsedDate.isValid(), "Date is not in the expected format").to.be.true;
  }

  async clickPrivacyLinkElement() {
    const windowHandles = await browser.getWindowHandles();
    await browser.switchToWindow(windowHandles[0]);
    const clickPrivacyLocator = await $(this.privacyLinkLocator);
    await clickPrivacyLocator.waitForClickable();
    await clickPrivacyLocator.click();
  }

  async displayPrivacyLink() {
    const windowHandles = await browser.getWindowHandles();
    await browser.switchToWindow(windowHandles[2]);
    const displayedPrivacyLink = await $(this.privacyLinkDisplayLocator);
    await displayedPrivacyLink.waitForDisplayed();
    await displayedPrivacyLink.isDisplayed();
  }

  async lastUpdatedLocatorDisplyed() {
    const lastUpdatedLocatorElement = await $(this.lastUpdatedLocator);
    const dateTextLast = await lastUpdatedLocatorElement.getText();
    const datePartslast = dateTextLast.split(" ");
    const extractedPartLast = datePartslast.slice(2).join(" ");
    const expectedDateFormatLast = "MMMM D, YYYY";
    console.log(extractedPartLast);
    const parsedDateLast = moment(extractedPartLast,expectedDateFormatLast,true);
    expect(parsedDateLast.isValid(), "Date is not in the expected format").to.be.true;
  }

  
}

module.exports = SignInPage;
