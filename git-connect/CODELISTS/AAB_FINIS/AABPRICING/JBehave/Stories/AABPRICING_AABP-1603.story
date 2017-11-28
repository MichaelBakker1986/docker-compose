AAB Pricing story AABP-1525 When we enter start date as 01-01- any year, Original Average Tenor is getting Calculated Wrongly, but for all other dates its getting Calculated Correctly.
@Author Luuk Peters & Ruben Bos
@themes Original Average Tenor

Scenario: [AABP-1603] Direct Liquidity Premium  - Once - Linear 
Given a document of the model type AABPRICING
And 62 month based forecast columns starting from 2015-01-01
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility2 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2015-01-01|
Facility_tpEndDate                         |2020-01-01|
Facility_tpProductduration                 |60|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |14000000|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |2|

Then tuple variable Facility_tpLiquiditySpreadBps in tuple Facility2 should have value 38.16152381 for document


Scenario: [AABP-1603] Direct Liquidity Premium  - Once - Bullet
Given a document of the model type AABPRICING
And 62 month based forecast columns starting from 2015-01-01

And a tuple instance Facility3 of definition Facility


When tuple variables in tuple Facility3 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2015-01-01|
Facility_tpEndDate                         |2020-01-01|
Facility_tpProductduration                 |60|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |14000000|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |2|

Then tuple variable Facility_tpLiquiditySpreadBps in tuple Facility3 should have value 46.96 for document

Scenario: [AABP-1603] Direct Liquidity Premium  - Once - Linear - Under 1 year 
Given a document of the model type AABPRICING
And 13 month based forecast columns starting from 2016-01-01

And a tuple instance Facility1 of definition Facility


When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2016-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2016-07-01|
Facility_tpProductduration                 |6|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |2000000|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpBaseCurrency                    |USD|
Facility_tpFixedInterestPeriodChoice       |1|

Then tuple variable Facility_tpLiquiditySpreadBpsUnder1year in tuple Facility1 should have value 1.6666666700000001 for document
And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 3.33333333 for document
And tuple variable Facility_tpLiquiditySpreadBps in tuple Facility1 should have value 1.6666666700000001 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 1500000 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 0.375 for document
And tuple variable Facility_tpDirectLiquidityPremium in tuple Facility1 should have value 250 for document


Scenario: [AABP-1603] Direct Liquidity Premium  - F1 
Given a document of the model type AABPRICING
And 7 month based forecast columns starting from 2016-01-01

And a tuple instance Facility1 of definition Facility


When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                         	          |F1|
Facility_tpStartDate                     	          |2016-01-01|
Facility_tpCurrentDate	          		              |2016-01-01|
Facility_tpPrincipalLimit                  			  |2000000|
Facility_tpProductduration                 			  |60|
Facility_tpRepaymentFrequency              			  |4|
Facility_tpWithdrawalChoice                			  |2|
Facility_tpRepaymentChoice                			  |0|
Facility_tpBaseCurrency                    			  |USD|
Facility_tpFixedInterestPeriodChoice      			  |99|
Facility_tpExpectedAverageOutstanding                 |1000000|
Facility_tpProductinterestDetailsInterestProductName  |Euribor|

Then tuple variable Facility_tpLiquiditySpreadBps in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpDirectLiquidityPremium in tuple Facility1 should have value 0 for document


Scenario: [AABP-1603] Direct Liquidity Premium  - SLF --> Calculates the revolving credit liquidity spread
Given a document of the model type AABPRICING
And 61 month based forecast columns starting from 2015-01-01


And a tuple instance Facility1 of definition Facility


When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |SLF|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2015-01-01|
Facility_tpEndDate                         |2020-01-01|
Facility_tpProductinterestDetailsInterestProductName  |Libor|
Facility_tpProductduration                 |60|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |14000000|
Facility_tpWithdrawalChoice                |2|
Facility_tpRepaymentChoice                 |1|
Facility_tpBaseCurrency                    |USD|
Facility_tpFixedInterestPeriodChoice       |1|
Facility_tpExpectedAverageOutstanding      |1000000|


Then tuple variable Facility_tpLiquiditySpreadBps in tuple Facility1 should have value 40 for document
And tuple variable Facility_tpDirectLiquidityPremium in tuple Facility1 should have value 4000 for document

Scenario: [AABP-1603] Direct Liquidity Premium  - Manual - Bullet
Given a document of the model type AABPRICING
And 62 month based forecast columns starting from 2015-01-01

And a tuple instance Facility3 of definition Facility
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility3
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility3
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility3


When tuple variables in tuple Facility3 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2015-01-01|
Facility_tpEndDate                         |2020-01-01|
Facility_tpProductduration                 |60|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |14000000|
Facility_tpWithdrawalChoice                |3|
Facility_tpRepaymentChoice                 |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |2|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-01-01|
Facility_tpManual_tpWithdrawalAmount       |7000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-04-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-01-01|
Facility_tpManual_tpWithdrawalAmount       |2000000|

Then tuple variable Facility_tpLiquiditySpreadBps in tuple Facility3 should have value 48.63977528 for document