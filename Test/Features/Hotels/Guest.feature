Feature: Guest

Scenario:
    Given I am on hotels landing page
    When I change Adults count to 6    
        And I change Children count to 3
        And I choose to select child-1 age as 4
        And I choose to select child-2 age as Under 1
        And I choose to select child-3 age as 7
        And I click Done
    Then I verify the travelers count is updated correctly