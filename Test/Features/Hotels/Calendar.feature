Feature: Calendar

Scenario:
    Given I am on hotels landing page
    When I click Dates
    Then I verify current month is displayed
         And I verify past dates is disabled
         And I verify back button on current month is disabled

