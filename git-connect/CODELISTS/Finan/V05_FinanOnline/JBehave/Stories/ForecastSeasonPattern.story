V05 forecast season pattern
@Author Hilde de Jong
@themes Forecast Season pattern V05

Scenario: Season pattern history December 2017 and Forecast December 2018, thus equal amount
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
And 24 months month based forecast columns starting from 2018-01-01
When variable NetSales is set to 60000 for history column with id 24
Then variable NetSales should have 0 decimals rounded value 60000 for forecast column with id 12

Scenario: Season pattern history December 2017 and Forecast January 2018, thus NA
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
And 24 months month based forecast columns starting from 2018-01-01
When variable NetSales is set to 60000 for history column with id 24
Then variable NetSales should have 0 decimals rounded value NA for forecast column with id 1

Scenario: Load existing document
Given document ../V05/Testdata/forecast0914.xml of the model type V05
Then variable NetSales should have 0 decimals rounded value 371300 for forecast column with id 1