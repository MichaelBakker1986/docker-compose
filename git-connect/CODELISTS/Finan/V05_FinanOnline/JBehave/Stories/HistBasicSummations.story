V05 History basic summations
@Author Wulf Brouwer and Hilde de Jong
@themes V05 history basic summations balance sheet and income statement

Scenario: basic summation assets and liabilities
Given a document of the model type V05
And 26 months month based history columns starting from 2016-01-01
When variable CashAndEquivalents is set to 40000 for history column with id 1
And variable NetWorth is set to 40000 for history column with id 1
Then variable TotalAssets should have 0 decimals rounded value 40000 for history column with id 1
And variable TotalEquityAndLiabilities should have 0 decimals rounded value 40000 for history column with id 1

Scenario: Profit after tax
Given a document of the model type V05
And 26 months month based history columns starting from 2016-01-01
When variable NetSales is set to 50000 for history column with id 1
And variable TransportationEquipmentDepreciationList_ti002 is set to 30000 for history column with id 1
Then variable ProfitAfterTax should have 0 decimals rounded value 20000 for history column with id 1

Scenario: Gross Profit
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
When variable NetSales is set to 50000 for history column with id 1
Then variable GrossProfit should have 0 decimals rounded value 50000 for history column with id 1