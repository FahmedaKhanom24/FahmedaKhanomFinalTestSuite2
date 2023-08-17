const { expect } = require("chai");
const moment = require("moment");

class LandingPage {
  //Locator for Get the App
  getAppLocator = '//div[text()="Get the app"]';
  getDownloadAppLocator = "#marquee-title";
  QRCodeLocator = '//img[@alt="QR code"]';

  //Locator for guests
  traverlerInputTriggerLocator = '//button[@data-stid="open-room-picker"]';
  adultCountLocator = "#traveler_selector_adult_step_input-0";
  traverlerDoneButtonLocator = "#traveler_selector_done_button";

  plusAdultLocator =
    '//input[@id="traveler_selector_adult_step_input-0"]/following-sibling::button';
  minusAdultLocator =
    '//input[@id="traveler_selector_adult_step_input-0"]/preceding-sibling::button';

  plusChildrenLocator =
    '//input[@id="traveler_selector_children_step_input-0"]/following-sibling::button';
  minusChildrenLocator =
    '//input[@id="traveler_selector_children_step_input-0"]/preceding-sibling::button';
  childrenCountLocator = "#traveler_selector_children_step_input-0";

  childrenAgeDropdownLocator_starts =
    '//select[@id="age-traveler_selector_children_age_selector-0-';

  childrenAgeDropdownLocator_ends = '"]';

  traverlerDoneButtonLocator = "#traveler_selector_done_button";

  travelersInfoLocator = '//label[text()="Travelers"]/following-sibling::input';

  //Locator for Privacy

  signInLocator = '//button[text()="Sign in"]';
  signInButtonLocator = '//a[@data-stid="link-header-account-signin"]';

  //Locator for Calendar

  datesLocator = "#date_form_field-btn";

  //APP FUNCTIONS
  async clickApp() {
    const appElement = $(this.getAppLocator);
    await appElement.waitForClickable({ timeout: 1000 });
    await appElement.click();
  }

  async verifyDownloadAppDisplayed() {
    const getDownloadAppElement = $(this.getDownloadAppLocator);
    await getDownloadAppElement.waitForDisplayed({ timeout: 2000 });
    const isDisplayed = await getDownloadAppElement.isDisplayed();
    expect(isDisplayed, "Element is not displayed").to.be.true;
  }

  async QRCodeDisplayed() {
    const getQRCodeElement = $(this.QRCodeLocator);
    await getQRCodeElement.waitForDisplayed({ timeout: 2000 });
    const isQRCodeDisplayed = await getQRCodeElement.isDisplayed();
    expect(isQRCodeDisplayed, "QR Code is not displayed").to.be.true;
  }

  //Guest Functions

  async getAdultCount() {
    return await $(this.adultCountLocator).getAttribute("value");
  }

  async selectAdults(expAdultCount) {
    if (!(await $(this.traverlerDoneButtonLocator).isDisplayed())) {
      await $(this.traverlerInputTriggerLocator).click();
    }

    await browser.pause(2000);

    for (let i = 0; i < 10; i++) {
      const adultCount = await this.getAdultCount();
      if (Number(adultCount) < Number(expAdultCount)) {
        await $(this.plusAdultLocator).click();
      } else if (Number(adultCount) > Number(expAdultCount)) {
        await $(this.minusAdultLocator).click();
      } else {
        break;
      }

      await browser.pause(2000);
    }
  }

  async getChildrenCount() {
    return await $(this.childrenCountLocator).getAttribute("value");
  }

  async selectChildren(expChildrenCount) {
    if (!(await $(this.traverlerDoneButtonLocator).isDisplayed())) {
      await $(this.traverlerInputTriggerLocator).click();
    }

    await browser.pause(2000);

    for (let i = 0; i < 10; i++) {
      const childrenCount = await this.getChildrenCount();

      if (Number(childrenCount) < Number(expChildrenCount)) {
        await $(this.plusChildrenLocator).click();
      } else if (Number(childrenCount) > Number(expChildrenCount)) {
        await $(this.minusChildrenLocator).click();
      } else {
        break;
      }

      await browser.pause(2000);
    }
  }

  async selectChildAge(childNum, childAge) {
    const childAgeLocator =
      this.childrenAgeDropdownLocator_starts +
      Number(childNum - 1) +
      this.childrenAgeDropdownLocator_ends;
    const childAgeDropdown = $(childAgeLocator);

    childAgeDropdown.selectByVisibleText(childAge);
  }

  async clickTravelerDoneButton() {
    const doneButton = $(this.traverlerDoneButtonLocator);
    await browser.pause(2000);

    await doneButton.click();
    await browser.pause(2000);
  }

  async getTravelersCount() {
    const travelersInfo = await $(this.travelersInfoLocator).getAttribute(
      "value"
    );
    return travelersInfo.split(" ")[0];
  }

  async clickSignIn() {
    await $(this.signInLocator).click();
  }

  async clickSignInButton() {
    await $(this.signInButtonLocator).click();
  }

  async clickDates() {
    const datesElement = await $(this.datesLocator);
    await datesElement.waitForClickable();
    await datesElement.click();
  }

  //Dates Locator
  previousDatesLocator =
    '//div[contains(@class,"uitk-layout-flex")]//button[@data-stid="date-picker-paging"][1]';
  locatorForCurrentMonthFirst = '//h2[text()="';
  locatorForCurrentMonthLast = '"]';
  afterDatesLocator =
    '//div[contains(@class,"uitk-layout-flex")]//button[@data-stid="date-picker-paging"][2]';

  async datesCurrentMonth() {
    const previousDatesCurrentMonthElement = await $(this.previousDatesLocator);

    const isPreviousDatesButtonEnabled =
      await previousDatesCurrentMonthElement.isEnabled();
    if (isPreviousDatesButtonEnabled) {
      await previousDatesCurrentMonthElement.click();
    }

    const currentMonthYear = moment().format("MMMM yyyy");
    const locatorForCurrentMonthYear = `${this.locatorForCurrentMonthFirst}${currentMonthYear}${this.locatorForCurrentMonthLast}`;
    const locatorForCurrentMonthElement = await $(locatorForCurrentMonthYear);

    await locatorForCurrentMonthElement.waitForDisplayed({ timeout: 4000 });
    const isCurrentMonthDisplayed =
      await locatorForCurrentMonthElement.isDisplayed();

    expect(isCurrentMonthDisplayed, "Current month is not displayed").to.be
      .true;
  }

  disabledDatesForCurrentMonthFirst = "//button[contains(@aria-label,";
  disabledDatesForCurrentMonthlast = ") and @disabled]";

  async currentMonthDisbaledDates() {
    const currentMonthAbbreviation = moment().format("MMM");
    const locatorForDisableCurrentMonth = `${this.disabledDatesForCurrentMonthFirst}"${currentMonthAbbreviation}"${this.disabledDatesForCurrentMonthlast}`;
    const locatorForDisableCurrentMonthDates = await $$(
      locatorForDisableCurrentMonth
    );

    let disabledDateCount = 0;
    for (const date of locatorForDisableCurrentMonthDates) {
      const classAttributeValue = await date.getAttribute("class");
      if (classAttributeValue.includes("is-disabled")) {
        disabledDateCount++;
      }
    }
    return disabledDateCount;
  }

  async previousButtonDisbaled() {
    const disbaledButton = await $(this.previousDatesLocator).isEnabled();
    expect(disbaledButton, "The button is enabled").to.be.false;
  }

  enterSearchBoxValue =
    '//button[@data-stid="destination_form_field-menu-trigger"]';

  setLocatorGoingTo = "#destination_form_field";

  async enterDestination(destinationString) {
    await $(this.enterSearchBoxValue).click();

    await $(this.setLocatorGoingTo).setValue(destinationString);
    await browser.pause(2000);
  }

  //Search AutoSuggestion
  searchSuggestionsLocator =
    '//button[@data-stid="destination_form_field-result-item-button"]';

  async selectFromAutoSuggestion(searchTHis) {
    const allSuggestion = await $$(this.searchSuggestionsLocator);
    for (const suggestion of allSuggestion) {
      const suggestionDate = await suggestion.getAttribute("aria-label");
      if (suggestionDate.startsWith(searchTHis)) {
        await suggestion.click();
        break;
      }
    }
  }

  checkInLocator = '//button[@class="uitk-date-picker-day"]';

  async clickCheckIn(checkIn) {
    let dateFound = false;

    while (!dateFound) {
      const previousDatesCurrentMonthElement = await $(
        this.previousDatesLocator
      );
      const afterDatesCurrentMonthElement = await $(this.afterDatesLocator);

      const allAvailableDates = await $$(this.checkInLocator);

      for (const date of allAvailableDates) {
        const suggestionCheckInDate = await date.getAttribute("aria-label");
        if (suggestionCheckInDate === checkIn) {
          await date.click();
          dateFound = true;
          break;
        }
      }

      if (!dateFound) {
        const isPreviousDatesButtonEnabled =
          await previousDatesCurrentMonthElement.isEnabled();
        const isAfterDatesButtonEnabled =
          await afterDatesCurrentMonthElement.isEnabled();

        if (isPreviousDatesButtonEnabled && !isAfterDatesButtonEnabled) {
          await previousDatesCurrentMonthElement.click();
        } else if (!isPreviousDatesButtonEnabled && isAfterDatesButtonEnabled) {
          await afterDatesCurrentMonthElement.click();
        }
      }
    }
  }

  async clickCheckOUT(checkOUT) {
    let dateFound = false;

    while (!dateFound) {
      const previousDatesCurrentMonthElement = await $(
        this.previousDatesLocator
      );
      const afterDatesCurrentMonthElement = await $(this.afterDatesLocator);

      const allAvailableDates = await $$(this.checkInLocator);

      for (const date of allAvailableDates) {
        const suggestionCheckInDate = await date.getAttribute("aria-label");
        if (suggestionCheckInDate === checkOUT) {
          await date.click();
          dateFound = true;
          break;
        }
      }

      if (!dateFound) {
        const isPreviousDatesButtonEnabled =
          await previousDatesCurrentMonthElement.isEnabled();
        const isAfterDatesButtonEnabled =
          await afterDatesCurrentMonthElement.isEnabled();

        if (isPreviousDatesButtonEnabled && !isAfterDatesButtonEnabled) {
          await previousDatesCurrentMonthElement.click();
        } else if (!isPreviousDatesButtonEnabled && isAfterDatesButtonEnabled) {
          await afterDatesCurrentMonthElement.click();
        }
      }
    }
  }

  doneLocator = '//button[@data-stid="apply-date-picker"]';

  async clickDone() {
    const doneElement = await $(this.doneLocator);
    await doneElement.waitForClickable();
    await doneElement.click();
  }

  searchButton = "#search_button";

  async searchDone() {
    const searchDoneElement = await $(this.searchButton);
    await searchDoneElement.waitForClickable();
    await searchDoneElement.click();
  }

  ratingLocatorfirst = "//label[contains(@aria-label,";
  ratingLocatorlast = ")]";

  async clickRating(ratingNumber) {
    const ratingLocator = `${this.ratingLocatorfirst}"${ratingNumber}"${this.ratingLocatorlast}`;
    const ratingElement = await $(ratingLocator);
    await ratingElement.waitForClickable({ timeout: 2000 });
    await ratingElement.click();
  }

  sortByLocator = "#sort-filter-dropdown-sort";

  async filterLowToHigh() {
    const sortByElement = await $(this.sortByLocator);
    await sortByElement.selectByIndex(1);
  }

  priceLocator = '//div[contains(text(), "The price is")]';

  async getPrices() {
    const priceElements = await $$(this.priceLocator);
    const prices = [];

    for (const priceElement of priceElements) {
      const priceText = await priceElement.getText();
      const priceTextParts = await priceText.split(" ");
      const extractPrice = await priceTextParts.slice(3).join(" ");
      prices.push(extractPrice);
    }

    return prices;
  }

  starLocatorFirst = '//span[text()="';
  starLocatorLast = ' out of 5"]';
  hotelLocator = '//a[@data-stid="open-hotel-information"]';

  async checkAllHotelsStarRating(expectedStarRating) {
    const hotelElements = await $$(this.hotelLocator);

    for (const hotelElement of hotelElements) {
      const locatorForStar = `${this.starLocatorFirst}${expectedStarRating}${this.starLocatorLast}`;
      const locatorForStarElement = await hotelElement.$(locatorForStar);

      if (
        !locatorForStarElement ||
        !(await locatorForStarElement.isDisplayed())
      ) {
        return false;
      }
    }

    return true;
  }
}

module.exports = LandingPage;
