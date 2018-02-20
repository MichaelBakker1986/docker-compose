Given a Context(URA)
When variable sdeGoodWill is set to 100 for column with id 1
And variable sdeEquity is set to 150 for column with id 1
And variable sdeProvisions is set to 150 for column with id 1
And variable sdeLiabilitiesLong is set to 150 for column with id 1
And variable sdeLiabilitiesBankLong is set to 150 for column with id 1
And variable sdeLiabilitiesShort is set to 150 for column with id 1
And variable sdeTradePayables is set to 150 for column with id 1
And variable sdeSales is set to 100 for column with id 1
And variable sdeDepreciation is set to 5 for column with id 1
And variable sdeEBIT is set to 15 for column with id 1
@Then variable krZValue should have 5 decimals rounded value 2.39328 for column with id 1
@And variable krPD should have 5 decimals rounded value 0.02106 for column with id 1
@And variable krUraRatingKlasse should be BB- for for column with id 1