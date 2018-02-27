FyndooCreditRating Score Basic
@Author DEMO
@themes FyndooCreditRating Score basic

Scenario: Verify FyndooCreditRating Score calculations
Given a document of the model type FyndooCreditRating

Given a Context(URA)
When sdeGoodWill is set to 100 for column with id 1

And sdeEquity is set to 150 for column with id 1
And sdeProvisions is set to 150 for column with id 1
And sdeLiabilitiesLong is set to 150 for column with id 1
And sdeLiabilitiesBankLong is set to 150 for column with id 1
And sdeLiabilitiesShort is set to 150 for column with id 1
And sdeTradePayables is set to 150 for column with id 1
And sdeSales is set to 100 for column with id 1
And sdeDepreciation is set to 5 for column with id 1
And sdeEBIT is set to 15 for column with id 1
Then krZValue should be 2.39328 for column with id 1
@And krPD should be 0.02106 for column with id 1
@And krUraRatingKlasse should be BB- for for column with id 1