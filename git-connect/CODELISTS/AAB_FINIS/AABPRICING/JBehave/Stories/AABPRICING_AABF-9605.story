Scenario: User Story Manual Repayment Scheme - AABF-9605 -Original Average Tenor - Once / Scheme
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2015-05-02|
Facility_tpEndDate                         |2016-01-01|
Facility_tpProductduration                 |12|
Facility_tpType                            |MLL|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |12000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |3|

And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-03-01|
Facility_tpManual_tpRepaymentAmount        |3000000|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-06-01|
Facility_tpManual_tpRepaymentAmount        |3000000|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-09-01|
Facility_tpManual_tpRepaymentAmount        |3000000|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-12-01|
Facility_tpManual_tpRepaymentAmount        |3000000|

Then tuple variable Facility_tpSumOfWeightedRepaymentOATNominator in tuple Facility1 should have value 90000000 for document
And tuple variable Facility_tpSumOfRepaymentOATDenominator in tuple Facility1 should have value 144000000 for document
And tuple variable Facility_tpOriginalAverageTenorScheme in tuple Facility1 should have value 0.625 for document

Scenario: User Story Manual Repayment Scheme - AABF-9605 -Remaining Average Tenor -Once / Scheme
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment6 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment7 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment8 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment9 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment10 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment11 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment12 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2015-05-02|
Facility_tpEndDate                         |2016-01-01|
Facility_tpProductduration                 |12|
Facility_tpType                            |MLL|
Facility_tpRepaymentFrequency              |12|
Facility_tpPrincipalLimit                  |12000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |3|

And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |12000000|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-02-01|
Facility_tpManual_tpRepaymentAmount        |0|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-03-01|
Facility_tpManual_tpRepaymentAmount        |3000000|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-04-01|
Facility_tpManual_tpRepaymentAmount        |0|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-05-01|
Facility_tpManual_tpRepaymentAmount        |0|

And tuple variables in tuple Repayment6 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-06-01|
Facility_tpManual_tpRepaymentAmount        |3000000|

And tuple variables in tuple Repayment7 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-07-01|
Facility_tpManual_tpRepaymentAmount        |0|

And tuple variables in tuple Repayment8 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-08-01|
Facility_tpManual_tpRepaymentAmount        |0|

And tuple variables in tuple Repayment9 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-09-01|
Facility_tpManual_tpRepaymentAmount        |3000000|

And tuple variables in tuple Repayment10 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-10-01|
Facility_tpManual_tpRepaymentAmount        |0|

And tuple variables in tuple Repayment11 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-11-01|
Facility_tpManual_tpRepaymentAmount        |0|

And tuple variables in tuple Repayment12 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-12-01|
Facility_tpManual_tpRepaymentAmount        |3000000|


Then tuple variable Facility_tpManual_tpRepaymentAmountRem in tuple Repayment3 should have value NA for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment3 should have value 36000000 for document
And tuple variable Facility_tpManual_tpOutstandingBalanceWeightRepayment in tuple Repayment3 should have value 12 for document

And tuple variable Facility_tpManual_tpRepaymentAmountRem in tuple Repayment6 should have value 6000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment6 should have value 30000000 for document
And tuple variable Facility_tpManual_tpOutstandingBalanceWeightRepayment in tuple Repayment6 should have value 10 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment9 should have value 3000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment9 should have value 21000000 for document
And tuple variable Facility_tpManual_tpOutstandingBalanceWeightRepayment in tuple Repayment9 should have value 7 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment12 should have value 3000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment12 should have value 12000000 for document
And tuple variable Facility_tpManual_tpOutstandingBalanceWeightRepayment in tuple Repayment12 should have value 4 for document


And tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have value 144000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingRemHelp in tuple Facility1 should have value 99000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingCountMaxEAO in tuple Facility1 should have value 8 for document
And tuple variable Facility_tpOutstandingBalanceExpAvgOutDenom in tuple Facility1 should have value 4 for document

And tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have value 5625000 for document

Scenario: User Story Manual Repayment Scheme - AABF-9605 - Ganesh 10 year testscript - OAT 1/3
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1

And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2015-05-23|
Facility_tpEndDate                         |2032-01-01|
Facility_tpProductduration                 |180|
Facility_tpType                            |MLL|
Facility_tpRepaymentFrequency              |12|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |3|
Facility_tpRevolvingCredit                 |0|


And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |15000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |15000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2028-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2030-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |10000000|

And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2022-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2028-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2031-12-31|
Facility_tpManual_tpRepaymentAmount        |15000000|

Then tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal1 should have value 15000000 for document
And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal2 should have value 15000000 for document
And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal3 should have value 5000000 for document
And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal4 should have value 5000000 for document
And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal5 should have value 10000000 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment1 should have value 10000000 for document
And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment2 should have value 10000000 for document
And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment3 should have value 10000000 for document
And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment4 should have value 5000000 for document
And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment5 should have value 15000000 for document

And tuple variable Facility_tpOriginalAverageTenorScheme in tuple Facility1 should have value 9.3 for document
And tuple variable Facility_tpOriginalAverageTenorNoBullet in tuple Facility1 should have value 9.3 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have value 9.3 for document

Scenario: User Story Manual Repayment Scheme - AABF-9605 - Ganesh 10 year testscript - RAT 2/3
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1

And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2022-01-10|
Facility_tpEndDate                         |2032-01-01|
Facility_tpProductduration                 |120|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |3|
Facility_tpWithdrawalChoice                |0|
Facility_tpRevolvingCredit                 |0|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2028-12-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2030-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |10000000|


And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2022-12-01|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2028-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2031-12-31|
Facility_tpManual_tpRepaymentAmount        |15000000|


Then tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal3 should have value 5000000 for document
And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal4 should have value 5000000 for document
And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal5 should have value 10000000 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment2 should have value 10000000 for document
And tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Repayment2 should have value 12 for document
And tuple variable Facility_tpManual_tpRepaymentWeightedRem in tuple Repayment2 should have value 120000000 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment3 should have value 10000000 for document
And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment4 should have value 5000000 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment5 should have value 15000000 for document
And tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Repayment5 should have value 120 for document
And tuple variable Facility_tpManual_tpRepaymentWeightedRem in tuple Repayment5 should have value 1800000000 for document

And tuple variable Facility_tpSumOfRepaymentRAT in tuple Facility1 should have value 40000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingCount in tuple Facility1 should have value 120 for document
And tuple variable Facility_tpSumOfWeightedRepaymentRATNominator in tuple Facility1 should have value 2820000000 for document
And tuple variable Facility_tpSumOfRepaymentRATWeight in tuple Facility1 should have value 0.5875 for document
And tuple variable Facility_tpRemainingAverageTenorScheme in tuple Facility1 should have value 5.875 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 5.875 for document

Scenario: User Story Manual Repayment Scheme - AABF-9605 - Ganesh 10 year testscript - RAT 3/3
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1

And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2028-12-01|
Facility_tpCurrentDate	          		   |2028-12-10|
Facility_tpEndDate                         |2032-01-01|
Facility_tpProductduration                 |37|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |3|
Facility_tpRevolvingCredit                 |0|


And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2028-12-01|
Facility_tpManual_tpRepaymentAmount        |5000000|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2030-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |10000000|


And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2031-12-31|
Facility_tpManual_tpRepaymentAmount        |15000000|


Then tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal4 should have value 5000000 for document
And tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Withdrawal4 should have value 1 for document
And tuple variable Facility_tpManual_tpRepaymentWeightedRem in tuple Withdrawal4 should have value 5000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal5 should have value 10000000 for document
And tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Withdrawal5 should have value 14 for document
And tuple variable Facility_tpManual_tpRepaymentWeightedRem in tuple Withdrawal5 should have value 0 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment5 should have value 15000000 for document
And tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Repayment5 should have value 37 for document
And tuple variable Facility_tpManual_tpRepaymentWeightedRem in tuple Repayment5 should have value 555000000 for document

And tuple variable Facility_tpSumOfRepaymentRAT in tuple Facility1 should have value 20000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingCount in tuple Facility1 should have value 37 for document
And tuple variable Facility_tpSumOfWeightedRepaymentRATNominator in tuple Facility1 should have value 560000000 for document
And tuple variable Facility_tpSumOfRepaymentRATWeight in tuple Facility1 should have value 0.75675676 for document
And tuple variable Facility_tpRemainingAverageTenorScheme in tuple Facility1 should have value 2.33333333 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 2.33333333 for document

Scenario: User Story Manual Repayment Scheme - AABF-9605 - Ganesh 10 year testscript - OAT, RAT and EAO 1/1
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1

And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-11-01|
Facility_tpCurrentDate	          		   |2018-09-05|
Facility_tpEndDate                         |2020-11-01|
Facility_tpProductduration                 |48|
Facility_tpType                            |MLL|
Facility_tpRepaymentChoice                 |3|
Facility_tpPrincipalLimit				   |15000000|
Facility_tpRevolvingCredit                 |0|
Facility_tpWithdrawalChoice                |0|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-11-01|

And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-10-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-04-30|
Facility_tpManual_tpRepaymentAmount        |2000000|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-12-31|
Facility_tpManual_tpRepaymentAmount        |3000000|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-11-30|
Facility_tpManual_tpRepaymentAmount        |1000000|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-10-31|
Facility_tpManual_tpRepaymentAmount        |4000000|

Then tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal1 should have value 15000000 for document
And tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Withdrawal1 should have value NA for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment3 should have value 3000000 for document
And tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Repayment3 should have value 4 for document
!-- And tuple variable Facility_tpManual_tpRepaymentWeightedRem in tuple Repayment3 should have value 12000000 for document

!-- And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment4 should have value 1000000 for document
!-- And tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Repayment4 should have value 15 for document
!-- And tuple variable Facility_tpManual_tpRepaymentWeightedRem in tuple Repayment4 should have value 15000000 for document

!-- And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment5 should have value 4000000 for document
!-- And tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Repayment5 should have value 26 for document
!-- And tuple variable Facility_tpManual_tpRepaymentWeightedRem in tuple Repayment5 should have value 104000000 for document

!-- And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal1 should have value 15000000 for document
!-- And tuple variable Facility_tpExpectedAverageOutstandingWithdrawalHelp in tuple Withdrawal1 should have value 180000000 for document

And tuple variable Facility_tpSumOfRepaymentRAT in tuple Facility1 should have value 8000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingCount in tuple Facility1 should have value 26 for document
And tuple variable Facility_tpSumOfWeightedRepaymentRATNominator in tuple Facility1 should have value 131000000 for document
And tuple variable Facility_tpRemainingAverageTenorScheme in tuple Facility1 should have value 1.36458333 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 1.36458333 for document

And tuple variable Facility_tpExpectedAverageOutstandingRemHelp in tuple Facility1 should have value 108000000 for document
And tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have value 180000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingCount in tuple Facility1 should have value 26 for document
And tuple variable Facility_tpOutstandingBalanceExpAvgOutDenom in tuple Facility1 should have value 12 for document
And tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have value 6000000 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 6000000 for document

And tuple variable Facility_tpOriginalAverageTenorScheme in tuple Facility1 should have value 2.23888889 for document
And tuple variable Facility_tpOriginalAverageTenorNoBullet in tuple Facility1 should have value 2.23888889 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have value 2.23888889 for document

!-- Remaining Average Tenor : 1,364583333
!-- Expected average outstanding : 8000000`

Scenario: User Story Manual Repayment Scheme - AABF-9605 - Ganesh 10 year testscript - RAT 2/2
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
And a tuple instance Withdrawal11 of definition Facility_tpManual in tuple Facility1

And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment6 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment7 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment8 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment9 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment10 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment11 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment12 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2019-06-05|
Facility_tpEndDate                         |2022-01-01|
Facility_tpProductduration                 |60|
Facility_tpType                            |MLL|
Facility_tpWithdrawalChoice                |3|
Facility_tpRepaymentChoice                 |3|
Facility_tpPrincipalLimit				   |50000000|
Facility_tpRevolvingCredit                 |0|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-01-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-04-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-07-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-10-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-01-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal6 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-04-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal7 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-07-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal8 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-06-01|
Facility_tpManual_tpWithdrawalAmount       |1500000|

And tuple variables in tuple Withdrawal9 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-10-01|
Facility_tpManual_tpWithdrawalAmount       |1500000|

And tuple variables in tuple Withdrawal10 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-07-01|
Facility_tpManual_tpWithdrawalAmount       |1000000|

And tuple variables in tuple Withdrawal11 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-04-01|
Facility_tpManual_tpWithdrawalAmount       |1000000|


And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-06-30|
Facility_tpManual_tpRepaymentAmount        |2500000|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-12-30|
Facility_tpManual_tpRepaymentAmount        |2500000|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-06-30|
Facility_tpManual_tpRepaymentAmount        |2500000|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-12-31|
Facility_tpManual_tpRepaymentAmount        |2500000|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-03-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment6 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-06-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment7 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-09-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment8 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment9 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-03-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment10 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-06-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment11 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-09-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment12 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|


Then tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal1 should have value 10000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal1 should have value 120000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal2 should have value 10000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal2 should have value 120000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal3 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal3 should have value 60000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal4 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal4 should have value 60000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal5 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal5 should have value 60000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal6 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal6 should have value 60000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal7 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal7 should have value 60000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal8 should have value 1500000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal8 should have value 18000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal9 should have value 1500000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal9 should have value 12000000 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal10 should have value 1000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal10 should have value 0 for document

And tuple variable Facility_tpManual_tpWithdrawalAmount in tuple Withdrawal11 should have value 1000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingWithdrawal in tuple Withdrawal11 should have value 0 for document




Then tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment1 should have value 2500000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment1 should have value 30000000 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment2 should have value 2500000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment2 should have value 30000000 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment3 should have value 2500000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment3 should have value 27500000 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment4 should have value 2500000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment4 should have value 12500000 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment5 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment5 should have value 10000000 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment6 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment6 should have value 0 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment7 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment7 should have value 0 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment8 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment8 should have value 0 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment9 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment9 should have value 0 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment10 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment10 should have value 0 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment11 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment11 should have value 0 for document

And tuple variable Facility_tpManual_tpRepaymentAmount in tuple Repayment12 should have value 5000000 for document
And tuple variable Facility_tpManual_ExpectedAverageOutstandingRepayment in tuple Repayment12 should have value 0 for document


Then tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have value 570000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingRemHelp in tuple Facility1 should have value 110000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingCount in tuple Facility1 should have value 31 for document
And tuple variable Facility_tpOutstandingBalanceExpAvgOutDenom in tuple Facility1 should have value 12 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have value 3.65 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 1.55555556 for document
And tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 38333333.33 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 38333333.33 for document


Scenario: User Story Manual Repayment Scheme - AABF-9605 -Original Average Tenor - Manual WD - Manual Repay >10
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1

And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2017-01-01|
Facility_tpEndDate                         |2032-01-01|
Facility_tpProductduration                 |180|
Facility_tpType                            |MLL|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |50000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpRepaymentChoice                 |3|
Facility_tpRevolvingCredit                 |0|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-01-01|
Facility_tpManual_tpWithdrawalAmount       |15000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-01-01|
Facility_tpManual_tpWithdrawalAmount       |15000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-01-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2028-12-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2030-01-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|



And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2022-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2028-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2031-12-31|
Facility_tpManual_tpRepaymentAmount        |15000000|

Then tuple variable Facility_tpSumOfWeightedRepaymentOATNominator in tuple Facility1 should have value 5580000000 for document
And tuple variable Facility_tpSumOfRepaymentOATDenominator in tuple Facility1 should have value 600000000 for document
And tuple variable Facility_tpOriginalAverageTenorScheme in tuple Facility1 should have value 9.3 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have value 9.3 for document

Scenario: User Story Manual Repayment Scheme - AABF-9605 -RAT and EAO - Manual WD - Manual Repay >10
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1

And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2022-01-10|
Facility_tpEndDate                         |2032-01-01|
Facility_tpProductduration                 |180|
Facility_tpType                            |MLL|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |50000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |3|
Facility_tpRepaymentChoice                 |3|
Facility_tpRevolvingCredit                 |0|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-01-01|
Facility_tpManual_tpWithdrawalAmount       |15000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-01-01|
Facility_tpManual_tpWithdrawalAmount       |15000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-01-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2028-12-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

And tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2030-01-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|



And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2022-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-12-31|
Facility_tpManual_tpRepaymentAmount        |10000000|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2028-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2031-12-31|
Facility_tpManual_tpRepaymentAmount        |15000000|

Then tuple variable Facility_tpSumOfWeightedRepaymentOATNominator in tuple Facility1 should have value 5580000000 for document
And tuple variable Facility_tpSumOfRepaymentOATDenominator in tuple Facility1 should have value 600000000 for document
And tuple variable Facility_tpOriginalAverageTenorScheme in tuple Facility1 should have value 9.3 for document

And tuple variable Facility_tpSumOfRepaymentRAT in tuple Facility1 should have value 40000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingCount in tuple Facility1 should have value 120 for document
And tuple variable Facility_tpSumOfWeightedRepaymentRATNominator in tuple Facility1 should have value 2820000000 for document
And tuple variable Facility_tpRemainingAverageTenorScheme in tuple Facility1 should have value 5.875 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 5.875 for document

Then tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have value 360000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingRemHelp in tuple Facility1 should have value 120000000 for document
And tuple variable Facility_tpExpectedAverageOutstandingCount in tuple Facility1 should have value 120 for document
And tuple variable Facility_tpOutstandingBalanceExpAvgOutDenom in tuple Facility1 should have value 12 for document

And tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 20000000 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 20000000 for document



