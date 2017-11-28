IFRS inital test
@Author Hilde de Jong
@themes Initial test IFRS

Scenario: Initial Test

Given a document of the model type V05
And 26 months month based history columns starting from 2016-01-01
When variable Revenues is set to 50000 for history column with id 1
Then variable GrossProfit should have 0 decimals rounded value 50000 for history column with id 1