Scenario: Required variables

Given a document of the model type AABPRICING
!-- We first need to do a get of 1 variable before enterrequiredvars will work. If we don't do this it will count vars as not entered but they are entered. 
!-- //TODO This bug needs to be fixed
And variable Q_STATUS is set to 0 for document
Then variable Q_Map01_ENTEREDREQUIREDVARS should have value 0 for document


