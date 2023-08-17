Feature: Filter

Scenario:
        Given I am on hotels landing page
        When I Search Manhattan, NY
            And I select Manhattan New York, New York, United States 
              And I click Dates
              And I enter Check in date as Sep 29, 2023
              And I enter Check out date as Oct 16, 2023
               And I choose to click on check inOut Done button
               And I click Search button
               And I click 5 star 
               And I select Price: Low to High 
        Then I verify all hotels in search results are 5.0 star rated as selected 
             And I verify all hotels are listed in increasing order price