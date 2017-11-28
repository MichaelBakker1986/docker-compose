!--AAB Pricing story
!--@Author Sam
!--@themes OAT, RAT, Exp Avg Outstanding Linear and Annuity

Scenario: Limit calculations > 10 yr tenor Annuity and Linear

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-07-01|
Facility_tpCurrentDate                           |2019-02-01|
Facility_tpEndDate                         |2020-07-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |8000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|

Then tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 16 for document
And tuple variable Facility_tpAnnuityMonthsSinceStartDate in tuple Facility1 should have value 11 for document
And tuple variable Facility_tpLimitLinear in tuple Facility1 should have value 2250000 for document

!-- Calculation for remaining tenor < 1 yr
When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2020-02-01 for document
!-- Lookup Rename Then tuple variable Facility_tpLinearOutstandingRepaymentSum in tuple Facility1 should have value 30500000 for document
And tuple variable Facility_tpLimitLinear in tuple Facility1 should have value 750000 for document

!-- Limit calculations for annuity 

When tuple variables in tuple Facility2 are set:  
|variable|value|
Facility_tpStartDate                       |2016-07-01|
Facility_tpCurrentDate                     |2016-07-01|
Facility_tpEndDate                         |2020-07-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |8000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpAnnuityInterestRate             |0.06|

When tuple variable Facility_tpCurrentDate in tuple Facility2 is set to 2016-11-01 for document
Then tuple variable Facility_tpAnnuityOutstandingRepaymentSum in tuple Facility2 should have value 4528627.71112917 for document
And tuple variable Facility_tpLimitAnnuity in tuple Facility2 should have value 6867843.07221771 for document

When tuple variable Facility_tpCurrentDate in tuple Facility2 is set to 2017-11-15 for document
Then tuple variable Facility_tpLimitAnnuity in tuple Facility2 should have value 4973333.54245904 for document

When tuple variable Facility_tpCurrentDate in tuple Facility2 is set to 2019-11-01 for document
Then tuple variable Facility_tpLimitAnnuity in tuple Facility2 should have value 1104558.98767228 for document

When tuple variable Facility_tpCurrentDate in tuple Facility2 is set to 2019-07-04 for document
Then tuple variable Facility_tpLimitAnnuity in tuple Facility2 should have value 1373930.8998934 for document

When tuple variable Facility_tpCurrentDate in tuple Facility2 is set to 2019-11-01 for document
Then tuple variable Facility_tpLimitAnnuity in tuple Facility2 should have value 1104558.98767228 for document

When tuple variable Facility_tpCurrentDate in tuple Facility2 is set to 2020-02-01 for document
Then tuple variable Facility_tpLimitAnnuity in tuple Facility2 should have value 832510.12477465 for document

When tuple variable Facility_tpCurrentDate in tuple Facility2 is set to 2020-05-04 for document
Then tuple variable Facility_tpLimitAnnuity in tuple Facility2 should have value 557754.30801734 for document

Scenario: Limit calculation > 10 yr tenor Scheme 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate                     |2053-08-01|
Facility_tpEndDate                         |2068-01-01|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |3|
Facility_tpPrincipalLimit                  |200000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|

And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-12-01|
Facility_tpManual_tpRepaymentAmount        |40000000|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2032-12-01|
Facility_tpManual_tpRepaymentAmount        |30000000|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2045-12-31|
Facility_tpManual_tpRepaymentAmount        |50000000|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2059-12-01|
Facility_tpManual_tpRepaymentAmount        |30000000|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2067-12-01|
Facility_tpManual_tpRepaymentAmount        |50000000|


Then tuple variable Facility_tpLimitScheme in tuple Facility1 should have value 80000000 for document

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpCurrentDate                           |2025-08-13|

Then tuple variable Facility_tpLimitScheme in tuple Facility1 should have value 176666666.66666666 for document

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpCurrentDate                           |2032-09-25|

Then tuple variable Facility_tpLimitScheme in tuple Facility1 should have value 140000000 for document

Scenario: Liquidity Spread Calculation > 10 yr Once withdrawal and linear repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-07-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2067-06-30|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |1|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |100000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |2|

Then tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 51 for document
And tuple variable Facility_tpLinear in tuple Facility1 should have value 1960784.3137254901 for document
And tuple variable Facility_tpWeightedFundingRepaymentLinear in tuple Facility1 should have value 2600000000 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentLinear in tuple Facility1 should have value 173615686274.50986 for document
And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 66.77526395 for document

Scenario: Liquidity Spread Calculation > 10 yr Once withdrawal and annuity repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-07-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2067-06-30|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |2|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |80000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |3|
Facility_tpAnnuityInterestRate             |0.06|

Then tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 51 for document
And tuple variable Facility_tpWeightedFundingRepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 2966905259.72 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 167169924181.77 for document
And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have 2 decimals rounded value 56.34 for document

Scenario: Liquidity Spread Calculation > 10 yr Once withdrawal and bullet repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-07-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2067-06-30|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |0|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |80000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |3|
Facility_tpAnnuityInterestRate             |0.06|

Then tuple variable Facility_tpWeightedFundingRepaymentBullet in tuple Facility1 should have value 4080000000 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentBullet in tuple Facility1 should have value 230193600000 for document
And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 56.42 for document

Scenario: Liquidity Spread Calculation > 10 yr Once withdrawal and scheme repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2067-12-31|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |3|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |80000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |2|
Facility_tpAnnuityInterestRate             |0.06|

And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-02-01|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Repayment1 should have value 1.93 for document

When tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-08-01|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Repayment2 should have value 5.29333333 for document

Scenario: Liquidity Spread Calculation > 10 yr Once withdrawal and scheme repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2067-12-31|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |3|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |200000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |3|
Facility_tpAnnuityInterestRate             |0.06|

And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-12-01|
Facility_tpManual_tpRepaymentamount        |40000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Repayment1 should have value 51.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Repayment1 should have value 360000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Repayment1 should have value 18511200000.00 for document

When tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2032-12-01|
Facility_tpManual_tpRepaymentamount        |30000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Repayment2 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Repayment2 should have value 480000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Repayment2 should have value 27081600000.00 for document

When tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2045-12-01|
Facility_tpManual_tpRepaymentamount        |50000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Repayment3 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Repayment3 should have value 1450000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Repayment3 should have value 81809000000 for document

When tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2059-12-01|
Facility_tpManual_tpRepaymentamount        |30000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Repayment4 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Repayment4 should have value 1290000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Repayment4 should have value 72781800000 for document

When tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2067-12-01|
Facility_tpManual_tpRepaymentamount        |50000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Repayment5 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Repayment5 should have value 2550000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Repayment5 should have value 143871000000 for document

Then tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 56.12636215 for document

Scenario: Liquidity Spread Calculation > 10 yr Scheme withdrawal and bullet repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2067-07-31|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |0|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |100000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |3|
Facility_tpAnnuityInterestRate             |0.06|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-08-01|
Facility_tpManual_tpWithdrawalAmount       |20000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal1 should have value 5 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal1 should have value 0 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal1 should have value 0 for document

When tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-05-01|
Facility_tpManual_tpWithdrawalAmount       |20000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal2 should have value 30.835 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal2 should have value 75000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal2 should have value 2312625000 for document

When tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2026-08-01|
Facility_tpManual_tpWithdrawalAmount       |20000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal3 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal3 should have value 200000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal3 should have value 11284000000 for document

When tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2033-04-01|
Facility_tpManual_tpWithdrawalAmount       |20000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal4 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal4 should have value 333333333.33333333 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal4 should have value 18806666666.666668 for document

When tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2045-08-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal5 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal5 should have value 290000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal5 should have value 16361800000 for document

When tuple variables in tuple Withdrawal6 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2056-10-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal6 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal6 should have value 401666666.6666666 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal6 should have value 22662033333.333336 for document

And tuple variable Facility_tpWeightedFundingRepaymentBullet in tuple Facility1 should have value 5100000000 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentBullet in tuple Facility1 should have value 287742000000 for document

And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 56.924967110000004 for document

Scenario: Liquidity Spread Calculation > 10 yr Scheme withdrawal and linear repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2067-07-31|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |1|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |90000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |3|
Facility_tpAnnuityInterestRate             |0.06|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-08-01|
Facility_tpManual_tpWithdrawalAmount       |20000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal1 should have value 5 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal1 should have value 0 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal1 should have value 0 for document

When tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2026-08-01|
Facility_tpManual_tpWithdrawalAmount       |35000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal2 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal2 should have value 350000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal2 should have value 19747000000 for document

When tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2041-08-01|
Facility_tpManual_tpWithdrawalAmount       |25000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal3 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal3 should have value 625000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal3 should have value 35262500000 for document

When tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2045-08-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal4 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal4 should have value 290000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal4 should have value 16361800000 for document

And tuple variable Facility_tpRepaymentFrequencyLiqSpread in tuple Facility1 should have value 12 for document
And tuple variable Facility_tpConvertToMonths in tuple Facility1 should have value 12 for document

And tuple variable Facility_tpWeightedFundingWithdrawalScheme in tuple Facility1 should have value 1265000000 for document
And tuple variable Facility_tpLiquiditySpreadWithdrawalScheme in tuple Facility1 should have value 71371300000 for document

And tuple variable Facility_tpWeightedFundingRepaymentLinear in tuple Facility1 should have value 2340000000 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentLinear in tuple Facility1 should have value 130833317647.05884 for document

And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 55.31350479 for document

Scenario: Liquidity Spread Calculation > 10 yr Scheme withdrawal and annuity repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2067-07-31|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |2|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |75000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |2|
Facility_tpAnnuityInterestRate             |0.08|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-08-01|
Facility_tpManual_tpWithdrawalAmount       |30000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal1 should have value 5 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal1 should have value 0 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal1 should have value 0 for document

When tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2030-08-01|
Facility_tpManual_tpWithdrawalAmount       |25000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal2 should have value 67.30 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal2 should have value 350000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal2 should have value 23555000000.000004 for document

When tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2040-08-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal3 should have value 67.30 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal3 should have value 240000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal3 should have value 16152000000.000004 for document

When tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2055-08-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal4 should have value 67.30 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal4 should have value 390000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal4 should have value 26247000000.000004 for document

And tuple variable Facility_tpRepaymentFrequencyLiqSpread in tuple Facility1 should have value 12 for document
And tuple variable Facility_tpConvertToMonths in tuple Facility1 should have value 12 for document

And tuple variable Facility_tpWeightedFundingWithdrawalScheme in tuple Facility1 should have value 980000000 for document
And tuple variable Facility_tpLiquiditySpreadWithdrawalScheme in tuple Facility1 should have value 65954000000.000015 for document

And tuple variable Facility_tpWeightedFundingRepaymentAnnuity in tuple Facility1 should have value 2964533469.8523993 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentAnnuity in tuple Facility1 should have value 199397265877.26892 for document

And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 67.24163029 for document

Scenario: Liquidity Spread Calculation > 10 yr Scheme withdrawal and scheme repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal7 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal8 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal9 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal10 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2067-12-31|
Facility_tpProductduration                 |612|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |3|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |200000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |3|
Facility_tpAnnuityInterestRate             |0.08|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-12-01|
Facility_tpManual_tpRepaymentAmount        |40000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Withdrawal1 should have value 51.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Withdrawal1 should have value 360000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Withdrawal1 should have value 18511200000 for document

When tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2032-12-01|
Facility_tpManual_tpRepaymentAmount        |30000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Withdrawal2 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Withdrawal2 should have value 480000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Withdrawal2 should have value 27081600000 for document

When tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2045-12-01|
Facility_tpManual_tpRepaymentAmount       |50000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Withdrawal3 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Withdrawal3 should have value 1450000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Withdrawal3 should have value 81809000000 for document

When tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2059-12-01|
Facility_tpManual_tpRepaymentAmount        |30000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Withdrawal4 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Withdrawal4 should have value 1290000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Withdrawal4 should have value 72781800000 for document

When tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2067-12-01|
Facility_tpManual_tpRepaymentAmount        |50000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTRepayment in tuple Withdrawal5 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingRepayment in tuple Withdrawal5 should have value 2550000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadRepayment in tuple Withdrawal5 should have value 143871000000 for document

When tuple variables in tuple Withdrawal6 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-01-01|
Facility_tpManual_tpWithdrawalAmount       |50000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal6 should have value 5 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal6 should have value 0 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal6 should have value 0 for document

When tuple variables in tuple Withdrawal7 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2031-01-01|
Facility_tpManual_tpWithdrawalAmount       |50000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal7 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal7 should have value 700000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal7 should have value 39494000000 for document

When tuple variables in tuple Withdrawal8 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2050-01-01|
Facility_tpManual_tpWithdrawalAmount       |40000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal8 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal8 should have value 1320000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal8 should have value 74474400000 for document

When tuple variables in tuple Withdrawal9 are set:  
  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2055-01-01|
Facility_tpManual_tpWithdrawalAmount       |30000000|

When tuple variables in tuple Withdrawal10 are set:  
  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2041-01-01|
Facility_tpManual_tpWithdrawalAmount       |30000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal10 should have value 56.42 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal10 should have value 720000000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal10 should have value 40622400000 for document


And tuple variable Facility_tpWeightedFundingWithdrawalScheme in tuple Facility1 should have value 3880000000 for document
And tuple variable Facility_tpLiquiditySpreadWithdrawalScheme in tuple Facility1 should have value 218909600000 for document

And tuple variable Facility_tpWeightedFundingRepaymentScheme in tuple Facility1 should have value 6130000000 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentScheme in tuple Facility1 should have value 344054600000 for document

And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 55.620000000000005 for document

Scenario: Liquidity Spread Calculation > 10 yr Once withdrawal and linear repayment including grace period
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2031-07-31|
Facility_tpProductduration                 |360|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |1|
Facility_tpRepaymentFrequency              |2|
Facility_tpPrincipalLimit                  |25000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |24|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |2|

Then tuple variable Facility_tpNumberOfPeriodsNoGrace in tuple Facility1 should have value 30 for document
And tuple variable Facility_tpLinear in tuple Facility1 should have value 961538.46153846 for document
And tuple variable Facility_tpWeightedFundingRepaymentLinear in tuple Facility1 should have value 218749999.9999999 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentLinear in tuple Facility1 should have value 13566096153.846157 for document
And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 62.01643956 for document

Scenario: Liquidity Spread Calculation > 10 yr Once withdrawal and annuity repayment including grace period
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2019-08-01|
Facility_tpEndDate                         |2026-07-31|
Facility_tpProductduration                 |120|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |2|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |40000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |33|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |3|
Facility_tpAnnuityInterestRate             |0.07|

Then tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 29 for document
And tuple variable Facility_tpNumberOfPeriodsNoGrace in tuple Facility1 should have value 40 for document
And tuple variable Facility_tpGracePeriodInPeriods in tuple Facility1 should have value 11 for document
And tuple variable Facility_tpWeightedFundingRepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 272093061.37 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 12505237051.44 for document
And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have 2 decimals rounded value 45.96 for document

Scenario: Liquidity Spread Calculation > 10 yr Scheme withdrawal and linear repayment 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2016-07-01|
Facility_tpEndDate                         |2019-07-31|
Facility_tpProductduration                 |36|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |1|
Facility_tpRepaymentFrequency              |12|
Facility_tpPrincipalLimit                  |15000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpGracePeriod                     |13|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |4|
Facility_tpAnnuityInterestRate             |0.06|

Then tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 23 for document
And tuple variable Facility_tpRepaymentFrequencyLiqSpread in tuple Facility1 should have value 12 for document

And tuple variable Facility_tpLinear in tuple Facility1 should have value 652173.91304348 for document
And tuple variable Facility_tpGracePeriodInPeriods in tuple Facility1 should have value 13 for document

When tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-08-01|
Facility_tpManual_tpWithdrawalAmount       |3000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal1 should have value 5 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal1 should have value 0 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal1 should have value 0 for document

When tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-05-01|
Facility_tpManual_tpWithdrawalAmount       |2000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal2 should have value -10 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal2 should have value 1500000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal2 should have value -15000000 for document

When tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-03-01|
Facility_tpManual_tpWithdrawalAmount       |4000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal3 should have value 12.4225 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal3 should have value 6333333.33333333 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal3 should have value 78675833.33333334 for document

When tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-11-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal4 should have value 17.665 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal4 should have value 11250000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal4 should have value 198731250 for document

When tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-02-01|
Facility_tpManual_tpWithdrawalAmount       |1000000|

Then tuple variable Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal in tuple Withdrawal5 should have value 18.82 for document
And tuple variable Facility_tpManual_tpWeightedFundingWithdrawal in tuple Withdrawal5 should have value 2500000 for document
And tuple variable Facility_tpManual_tpLiquiditySpreadWithdrawal in tuple Withdrawal5 should have value 47050000 for document

And tuple variable Facility_tpWeightedFundingWithdrawalScheme in tuple Facility1 should have value 21583333.333333332 for document
And tuple variable Facility_tpLiquiditySpreadWithdrawalScheme in tuple Facility1 should have value 309457083.3333334 for document

And tuple variable Facility_tpWeightedFundingRepaymentLinear in tuple Facility1 should have value 31250000 for document
And tuple variable Facility_tpLiquiditySpreadRepaymentLinear in tuple Facility1 should have value 527166168.4782608 for document

And tuple variable Facility_tpLiquiditySpreadBpsGeneral in tuple Facility1 should have value 22.5216295 for document

Scenario: EAO > 10 yr Once WD and Linear RP - Half Yearly 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2019-02-01|
Facility_tpEndDate                         |2031-07-31|
Facility_tpProductduration                 |180|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |1|
Facility_tpRepaymentFrequency              |2|
Facility_tpPrincipalLimit                  |25000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |24|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |4|
Facility_tpAnnuityInterestRate             |0.06|

Then tuple variable Facility_tpEAOOnceLinear in tuple Facility1 should have value 23557692.30769231 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 23557692.30769231 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2016-02-01 for document
Then tuple variable Facility_tpEAOOnceLinear in tuple Facility1 should have value 25000000 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 25000000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2029-02-01 for document
Then tuple variable Facility_tpAnnuityPPMTRATTotalPeriods in tuple Facility1 should have value 5 for document
And tuple variable Facility_tpEAOOnceLinear in tuple Facility1 should have value 4326923.07692308 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2029-08-01 for document
Then tuple variable Facility_tpAnnuityPPMTRATTotalPeriods in tuple Facility1 should have value 4 for document
And tuple variable Facility_tpEAOOnceLinear in tuple Facility1 should have 2 decimals rounded value 3365384.62 for document


When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2031-02-01 for document
Then tuple variable Facility_tpAnnuityPPMTRATTotalPeriods in tuple Facility1 should have value 1 for document
And tuple variable Facility_tpEAOOnceLinear in tuple Facility1 should have 2 decimals rounded value 961538.46 for document

Scenario: EAO > 10 yr Once WD and Annuity RP - Quarterly
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2016-08-01|
Facility_tpEndDate                         |2026-07-31|
Facility_tpProductduration                 |120|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |2|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |40000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |33|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |4|
Facility_tpAnnuityInterestRate             |0.07|

Then tuple variable Facility_tpEAOOnceAnnuity in tuple Facility1 should have 2 decimals rounded value 40000000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2018-11-01 for document
Then tuple variable Facility_tpEAOOnceAnnuity in tuple Facility1 should have 2 decimals rounded value 39732357.64 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 39732357.64 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2022-05-01 for document
Then tuple variable Facility_tpEAOOnceAnnuity in tuple Facility1 should have 2 decimals rounded value 23840923.99 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 23840923.99 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2026-05-01 for document
Then tuple variable Facility_tpEAOOnceAnnuity in tuple Facility1 should have 2 decimals rounded value 1740117.40 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 1740117.40 for document

Scenario: EAO > 10 yr Once WD and Annuity RP - Quarterly
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2016-07-01|
Facility_tpEndDate                         |2026-07-31|
Facility_tpProductduration                 |120|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |2|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |40000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |4|
Facility_tpAnnuityInterestRate             |0.07|

Then tuple variable Facility_tpAnnuityOutstandingWithdrawalSum in tuple Facility1 should have 2 decimals rounded value 160000000 for document
Then tuple variable Facility_tpAnnuityMonthsSinceStartDate in tuple Facility1 should have 2 decimals rounded value 1 for document
Then tuple variable Facility_tpEAORepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 4242437.75 for document
Then tuple variable Facility_tpEAOOnceAnnuity in tuple Facility1 should have 2 decimals rounded value 38939390.56 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2016-11-01 for document
Then tuple variable Facility_tpEAOOnceAnnuity in tuple Facility1 should have 2 decimals rounded value 38221946.26 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2017-02-01 for document
Then tuple variable Facility_tpEAOOnceAnnuity in tuple Facility1 should have 2 decimals rounded value 37491946.67 for document

Scenario: EAO > 3 yr Scheme WD and Linear RP - Monthly (bug Ganesh)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2016-07-01|
Facility_tpEndDate                         |2019-07-31|
Facility_tpProductduration                 |36|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |1|
Facility_tpRepaymentFrequency              |12|
Facility_tpPrincipalLimit                  |20000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |4|
Facility_tpAnnuityInterestRate             |0.06|

Then tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 36 for document
And tuple variable Facility_tpLinear in tuple Facility1 should have 4 decimals rounded value 555555.5556 for document

When tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-08-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

When tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-02-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

When tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-09-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

When tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-05-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

Then tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have 2 decimals rounded value 90000000 for document
And tuple variable Facility_tpEAORepaymentLinearForSchemeWithdrawal in tuple Facility1 should have 2 decimals rounded value 36666666.67 for document
And tuple variable Facility_tpRemainingTenor in tuple Facility1 should have 2 decimals rounded value 36 for document
And tuple variable Facility_tpEAOSchemeLinear in tuple Facility1 should have 2 decimals rounded value 4444444.44 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 4444444.44 for document

Scenario: EAO > 10 yr Scheme WD and Linear RP - Monthly (bug Ganesh)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2016-07-01|
Facility_tpEndDate                         |2019-07-31|
Facility_tpProductduration                 |36|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |1|
Facility_tpRepaymentFrequency              |12|
Facility_tpPrincipalLimit                  |20000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |4|
Facility_tpAnnuityInterestRate             |0.06|

Then tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 36 for document
And tuple variable Facility_tpLinear in tuple Facility1 should have 4 decimals rounded value 555555.5556 for document

When tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-08-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

When tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-02-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

When tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-09-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

When tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-05-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 4444444.44 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2017-12-01 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 5972222.22 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2018-08-01 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 3611111.11 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2018-09-01 for document
Then tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have value 240000000 for document
Then tuple variable Facility_tpAnnuityMonthsSinceStartDate in tuple Facility1 should have value 26 for document
Then tuple variable Facility_tpAnnuityPPMTRATTotalPeriods in tuple Facility1 should have value 11 for document
Then tuple variable Facility_tpEAORepaymentLinear in tuple Facility1 should have 2 decimals rounded value 203333333.33 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 3333333.33 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2019-06-01 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 833333.33 for document

Scenario: EAO > 15 yr Scheme WD and Linear RP - Quarterly (bug Ganesh)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal6 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-08-01|
Facility_tpCurrentDate                     |2016-07-01|
Facility_tpEndDate                         |2026-07-31|
Facility_tpProductduration                 |120|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |1|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |40000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpBaseCurrency                    |EUR|
Facility_tpFixedInterestPeriodChoice       |4|
Facility_tpAnnuityInterestRate             |0.06|

Then tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 40 for document
And tuple variable Facility_tpLinear in tuple Facility1 should have 2 decimals rounded value 1000000 for document

When tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-08-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

Then tuple variable Facility_tpManual_tpOutstandingBalanceWeightWithdrawal in tuple Withdrawal1 should have value 12 for document

When tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-02-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

When tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-11-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

When tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-11-01|
Facility_tpManual_tpWithdrawalAmount       |7000000|

When tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2023-05-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

When tuple variables in tuple Withdrawal6 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2024-08-01|
Facility_tpManual_tpWithdrawalAmount       |3000000|

Then tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have 2 decimals rounded value 120000000 for document
And tuple variable Facility_tpEAORepaymentLinear in tuple Facility1 should have 2 decimals rounded value 18000000 for document
And tuple variable Facility_tpAnnuityPPMTRATTotalPeriods in tuple Facility1 should have 2 decimals rounded value 40 for document
And tuple variable Facility_tpEAOSchemeLinear in tuple Facility1 should have 2 decimals rounded value 8500000 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 8500000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2017-12-01 for document
Then tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have 2 decimals rounded value 170000000 for document
And tuple variable Facility_tpAnnuityMonthsSinceStartDate in tuple Facility1 should have 0 decimals rounded value 6 for document
And tuple variable Facility_tpEAORepaymentLinearForSchemeWithdrawal in tuple Facility1 should have 2 decimals rounded value 82000000 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 7333333.33 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2024-01-01 for document
Then tuple variable Facility_tpEAORepaymentLinearForSchemeWithdrawal in tuple Facility1 should have 2 decimals rounded value 374000000 for document
And tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have 2 decimals rounded value 459000000 for document
And tuple variable Facility_tpEAOSchemeLinear in tuple Facility1 should have 2 decimals rounded value 7083333.33 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 7083333.33 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2026-02-01 for document
Then tuple variable Facility_tpEAORepaymentLinearForSchemeWithdrawal in tuple Facility1 should have 2 decimals rounded value 471000000.00 for document
Then tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have 2 decimals rounded value 480000000 for document
Then tuple variable Facility_tpRemainingTenor in tuple Facility1 should have 2 decimals rounded value 6 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 1500000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2026-01-01 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 1714285.71 for document


Scenario: EAO > 15 yr Scheme WD and Annuity RP - Yearly
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-07-01|
Facility_tpCurrentDate	          			   |2016-07-01|
Facility_tpEndDate                      	   |2031-07-01|
Facility_tpAnnuityInterestRate	               |0.08|
Facility_tpProductduration 					   |180|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |3|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |10000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |15000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |15000000|

Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 10000000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2018-07-01 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 25000000 for document
Then tuple variable Facility_tpEAORepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 3830272.67 for document
Then tuple variable Facility_tpEAOSchemeAnnuity in tuple Facility1 should have 2 decimals rounded value 21169727.33 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2019-07-01 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 25000000 for document
Then tuple variable Facility_tpEAORepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 5978171.73 for document
Then tuple variable Facility_tpEAOSchemeAnnuity in tuple Facility1 should have 2 decimals rounded value 19021828.27 for document