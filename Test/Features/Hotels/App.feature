Feature: App

Scenario:

    Given I am on hotels landing page
    When I click Get the app button
    Then I verify Scan the QR code and download our app is displayed
        And I verify QR Code is displayed

