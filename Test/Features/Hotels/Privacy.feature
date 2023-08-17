Feature: Privacy

Scenario:
    Given I am on hotels landing page
    When I click Sign in link
        And I click Sign in button on the sign up page
        And I click One Key Rewards Terms & Conditions link
    Then I verify One Key Terms and Conditions heading is displayed
        And I verify Effective from date format is displayed 
    When I click Privacy Statement link
    Then I verify Privacy Statement heading is displayed
        And I verify Last Updated date format is displayed