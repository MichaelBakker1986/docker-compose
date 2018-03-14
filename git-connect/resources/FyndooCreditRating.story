FyndooCreditRating Score Basic
@Author DEMO
@themes FyndooCreditRating Score basic

Scenario: Verify FyndooCreditRating Score calculations
Given a document of the model type FyndooCreditRating

Given a Context(URA) for year 2018
When sdeGoodWill is set to 100

And sdeEquity is set to 150
And sdeProvisions is set to 150
And sdeLiabilitiesLong is set to 150
And sdeLiabilitiesBankLong is set to 150
And sdeLiabilitiesShort is set to 150
And sdeTradePayables is set to 150
And sdeSales is set to 100
And sdeDepreciation is set to 5
And sdeEBIT is set to 15
Then krZValue should be 2.39328
Then krInsolvenzquote should be 0.012
And krPD should be 0.01331
And krUraRatingKlasse should be BB