!--AAB Pricing story
!--@Author Sam
!--@themes Expected Average Outstanding

Scenario: EAO > 1 yr Once WD and Manual RP - Monthly 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2016-11-01|
Facility_tpCurrentDate	          		   |2016-11-01|
Facility_tpEndDate                         |2020-11-01|
Facility_tpProductduration                 |48|
Facility_tpType                            |MLL|
Facility_tpRepaymentFrequency              |12|
Facility_tpPrincipalLimit                  |15000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |3|

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

Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 15000000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2017-11-01 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 9000000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2015-12-01 for document
Then tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have 2 decimals rounded value 180000000 for document
Then tuple variable Facility_tpExpectedAverageOutstandingRemHelp in tuple Facility1 should have 2 decimals rounded value 0 for document
Then tuple variable Facility_tpExpectedAverageOutstandingCountMaxEAO in tuple Facility1 should have 2 decimals rounded value 12 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 15000000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2016-10-01 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 15000000 for document


Scenario: EAO > 5 yr Manual WD and Manual RP - Monthly 
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

Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 38333333.33 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2017-01-01 for document
Then tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Repayment1 should have 2 decimals rounded value 6 for document
Then tuple variable Facility_tpManual_tpOutstandingBalanceWeightRepayment in tuple Repayment1 should have 2 decimals rounded value 6 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 20000000.00 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2016-09-01 for document
Then tuple variable Facility_tpManual_tpMonthsSinceCurrentDate in tuple Repayment1 should have 1 decimals rounded value 10 for document
Then tuple variable Facility_tpManual_tpMonthsSinceStartDate in tuple Repayment1 should have 1 decimals rounded value 6 for document
Then tuple variable Facility_tpEAOWithdrawalScheme in tuple Facility1 should have 2 decimals rounded value 255000000 for document
Then tuple variable Facility_tpManual_tpOutstandingBalanceWeightRepayment in tuple Repayment1 should have 2 decimals rounded value 6 for document

Then tuple variable Facility_tpExpectedAverageOutstandingRemHelp in tuple Facility1 should have 2 decimals rounded value 15000000 for document
Then tuple variable Facility_tpExpectedAverageOutstandingCountMaxEAO in tuple Facility1 should have 2 decimals rounded value 12 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 20000000.00 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2016-08-01 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 20000000.00 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2017-02-01 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 21666666.67 for document


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

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2014-07-01 for document
Then tuple variable Facility_tpEAOOnceAnnuity in tuple Facility1 should have 2 decimals rounded value 40000000 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 40000000 for document

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

Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 4444444.44 for document

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
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 10000000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2018-07-01 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 25000000 for document
Then tuple variable Facility_tpEAORepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 3830272.67 for document
Then tuple variable Facility_tpEAOSchemeAnnuity in tuple Facility1 should have 2 decimals rounded value 21169727.33 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 21169727.33 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2019-07-01 for document
Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 25000000 for document
Then tuple variable Facility_tpEAORepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 5978171.73 for document
Then tuple variable Facility_tpEAOSchemeAnnuity in tuple Facility1 should have 2 decimals rounded value 19021828.27 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 19021828.27 for document


Scenario: EAO > 51 yr Scheme WD and Annuity RP - Yearly
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility_tpManual1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-08-11|
Facility_tpCurrentDate	          			   |2015-07-01|
Facility_tpEndDate                      	   |2067-07-31|
Facility_tpAnnuityInterestRate	               |0.08|
Facility_tpProductduration 					   |612|
Facility_tpPrincipalLimit					   |75000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |3|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|


And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-08-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |30000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2030-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |25000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2040-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |10000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2055-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |10000000|

Then tuple variable Facility_tpEAOSchemeAnnuity in tuple Facility1 should have 2 decimals rounded value 30000000 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 30000000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2017-07-01 for document
Then tuple variable Facility_tpEAOSchemeAnnuity in tuple Facility1 should have 2 decimals rounded value 30000000 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 30000000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2018-07-01 for document
Then tuple variable Facility_tpEAOSchemeAnnuity in tuple Facility1 should have 2 decimals rounded value 29879163.18 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 29879163.18 for document