V05 History Errors and warnings
@Author
@themes V05 history errors and warnings

Scenario: balance out of balance in one column
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
When variable CashAndEquivalents is set to 60000 for history column with id 1
And variable NetWorth is set to 50000 for history column with id 1
Then variable BalanceSheetTest should have 0 decimals rounded value 10000 for history column with id 1
And variable ValCheck should have 0 decimals rounded value 10000 for history column with id 1


Scenario: balance out of balance in March and in balance in December
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
When variable CashAndEquivalents is set to 60000 for history column with id 3
And variable CashAndEquivalents is set to 90000 for history column with id 12
And variable NetWorth is set to 50000 for history column with id 3
And variable NetWorth is set to 90000 for history column with id 12
Then variable BalanceSheetTest should have 0 decimals rounded value 10000 for history column with id 3
And variable BalanceSheetTest should have 0 decimals rounded value NA for history column with id 12


Scenario: balance out of balance in April and in December and in balance in March
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
When variable CashAndEquivalents is set to 60000 for history column with id 3
And variable CashAndEquivalents is set to 220000 for history column with id 4
And variable CashAndEquivalents is set to 190000 for history column with id 12
And variable NetWorth is set to 60000 for history column with id 3
And variable NetWorth is set to 60000 for history column with id 4
And variable NetWorth is set to 90000 for history column with id 12
Then variable BalanceSheetTest should have 0 decimals rounded value NA for history column with id 3
Then variable BalanceSheetTest should have 0 decimals rounded value 160000 for history column with id 4
And variable BalanceSheetTest should have 0 decimals rounded value 100000 for history column with id 12


Scenario: one negative book value
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
When variable Goodwill_tpBookValue_ti001 is set to -20000 for history column with id 1
Then variable Goodwill_tpNegativeBookValue_ti001 should have 0 decimals rounded value 20000 for history column with id 1
And variable NegativeBookValue should have 0 decimals rounded value 20000 for history column with id 1

Scenario: one negative book value and one positive book value
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
When variable Goodwill_tpBookValue_ti001 is set to 20000 for history column with id 1
And variable PatentsTrademarksAndOtherRights_tpBookValue_ti001 is set to -15000 for history column with id 1
Then variable PatentsTrademarksAndOtherRights_tpNegativeBookValue_ti001 should have 0 decimals rounded value 15000 for history column with id 1
And variable NegativeBookValue should have 0 decimals rounded value 15000 for history column with id 1


Scenario: one negative book value in one column and one positive book value in another column
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
When variable Goodwill_tpBookValue_ti001 is set to 20000 for history column with id 1
And variable PatentsTrademarksAndOtherRights_tpBookValue_ti001 is set to -15000 for history column with id 2
Then variable Goodwill_tpNegativeBookValue_ti001 should have 0 decimals rounded value NA for history column with id 1
And variable PatentsTrademarksAndOtherRights_tpNegativeBookValue_ti001 should have 0 decimals rounded value NA for history column with id 1
And variable PatentsTrademarksAndOtherRights_tpNegativeBookValue_ti001 should have 0 decimals rounded value 15000 for history column with id 2
And variable NegativeBookValue should have 0 decimals rounded value NA for history column with id 1
And variable NegativeBookValue should have 0 decimals rounded value 15000 for history column with id 2

Scenario: net worth reconciliation warning
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
When variable CashAndEquivalents has value 60000 for virtual column with year 2016
And variable CashAndEquivalents has value 100000 for virtual column with year 2017
And variable NetWorth has value 60000 for virtual column with year 2016
And variable NetWorth has value 100000 for virtual column with year 2017
And variable NetSales has value 40000 for virtual column with year 2017
Then variable IncomeStatementTest should be the value NA for virtual column with year 2017
When variable NetSales has value 40036 for virtual column with year 2017
Then variable IncomeStatementTest should be the value NA for virtual column with year 2017
When variable NetSales has value 40048 for virtual column with year 2017
Then variable IncomeStatementTest should be the value 4 for virtual column with year 2017

Scenario: ignore out of balance on month with setting
Given a document of the model type V05
And 24 months month based history columns starting from 2016-01-01
When variable IntangibleFixedAssets has value 1200 for virtual column with year 2016
And variable IntangibleFixedAssets has value 2400 for virtual column with year 2017
And variable MaterialFixedAssets has value 1200 for virtual column with year 2016
And variable NetWorth has value 2400 for virtual column with year 2016
And variable NetWorth has value 2400 for virtual column with year 2017
Then variable BalanceSheetTest should be the value 1100 for virtual column with year 2017
When variable BalanceCheckDetail is set to 1 for document
Then variable BalanceSheetTest should be the value NA for virtual column with year 2017