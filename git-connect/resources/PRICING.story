PRICING Score Basic
@Author DEMO
@themes PRICING Score basic

Scenario: Verify PRICING Score calculations
Given a document of the model type PRICING

AAB Pricing story
@Author Ruben
@themes Risk Adjusted Return - RAR 

!-- Structuur

!-- ==== RARORAC ===============================
!-- ==== Economic Profit =======================
!-- ==== Return on Equity ======================
!-- ==== Regulatory Profit =====================


!-- ==== Risk Adjusted Return - RAR ============
!-- ==== RAR - Income ==========================
!-- ==== RAR - Other expenses ==================
!-- ==== RAR - Interest expenses ===============

!-- ==== Economic Capital  =====================
!-- ==== EC - CR  ==============================
!-- ==== EC - BR  ==============================
!-- ==== EC - OR  ==============================


!-- ==== Risk Weighted Assets  =================
!-- ==== RWA - CR  =============================
!-- ==== RWA - OR  =============================



Scenario: RoE
!-- ==== Return on Equity ======================
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpRiskAdjustedReturn	|300|
Facility_tpRWA					|10000|
Facility_tpRemainingAverageTenor |2|

And variable Borrower_tpEquityRatio is set to 0.10 for document
Then tuple variable Facility_tpReturnOnEquity in tuple Facility1 should have value 0.3 for document



Scenario: [AABP-14] Expected Outstanding Average is available 
Given a document of the model type AABPRICING
Then variable Facility_tpExpectedAverageOutstanding should be visible
And variable Facility_tpExpectedAverageOutstanding should not be locked

Scenario: [AABP-99] Automatic Repayment Schemes  - Original Tenor


Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpEndDate	          		       |42370|
Facility_tpStartDate                       |41640|

Then tuple variable Facility_tpOriginalTenor in tuple Facility1 should have value 24 for document

Scenario: [AABP-99] Automatic Repayment Schemes  - Remaining Tenor


Given a document of the model type AABPRICING
And 48 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpCurrentDate	          		   |42186|
Facility_tpStartDate                       |42005|
Facility_tpEndDate                         |42369|

Then tuple variable Facility_tpRemainingTenor in tuple Facility1 should have value 6 for document

Scenario: [AABP-99] Automatic Repayment Schemes  - Nr. of Periods


Given a document of the model type AABPRICING
And 48 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
And a tuple instance Facility3 of definition Facility
And a tuple instance Facility4 of definition Facility


When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |41710|
Facility_tpCurrentDate	          		   |42186|
Facility_tpEndDate                         |42444|
Facility_tpRepaymentFrequency                |12|
And tuple variables in tuple Facility2 are set:  
|variable|value|
Facility_tpStartDate                       |41710|
Facility_tpCurrentDate	          		   |42186|
Facility_tpEndDate                         |42444|
Facility_tpRepaymentFrequency                |4|
And tuple variables in tuple Facility3 are set:  
|variable|value|
Facility_tpStartDate                       |41710|
Facility_tpCurrentDate	          		   |42186|
Facility_tpEndDate                         |42444|
Facility_tpRepaymentFrequency                |2|
And tuple variables in tuple Facility4 are set:  
|variable|value|
Facility_tpStartDate                       |41710|
Facility_tpCurrentDate	          		   |42186|
Facility_tpEndDate                         |42444|
Facility_tpRepaymentFrequency                |1|


Then tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 25 for document
And tuple variable Facility_tpNumberOfPeriods in tuple Facility2 should have value 9 for document
And tuple variable Facility_tpNumberOfPeriods in tuple Facility3 should have value 5 for document
And tuple variable Facility_tpNumberOfPeriods in tuple Facility4 should have value 3 for document


Scenario: [AABP-99] Automatic Repayment Schemes  - Repayment Annuity Tenor  - Quarterly 


Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|

Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpProductduration                 |48|
Facility_tpAnnuityInterestRate             |0.05|
Facility_tpPrincipalLimit                  |14000000|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpRepaymentFrequency              |4|

Then tuple variable Facility_tpOriginalTenor in tuple Facility1 should have value 48 for document
And tuple variable Facility_tpRepaymentFrequency in tuple Facility1 should have value QUARTERLY for document
And tuple variable Facility_tpStartDate in tuple Facility1 should have value 42005 for document

And forecast column with id 1 should have start date 2015-01-01

And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value NA for forecast column with id 1
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value NA for forecast column with id 2
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value NA for forecast column with id 3
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 1 for forecast column with id 4
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 1 for forecast column with id 5
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 1 for forecast column with id 6
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 2 for forecast column with id 7
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 2 for forecast column with id 8
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 2 for forecast column with id 9
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 3 for forecast column with id 10
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 3 for forecast column with id 11
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 3 for forecast column with id 12

And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value NA for forecast column with id 1
And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value NA for forecast column with id 2
And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value NA for forecast column with id 3
And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value 795854.10870204 for forecast column with id 4
And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value NA for forecast column with id 5
And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value NA for forecast column with id 6
And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value 805802.28506082 for forecast column with id 7

Scenario: [AABP-99] Automatic Repayment Schemes  - Repayment Annuity Tenor  - Monthly 

Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |12|
Facility_tpAnnuityInterestRate             |0.05|
Facility_tpPrincipalLimit                  |14000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpWithdrawalChoice                |0|

Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 1 for forecast column with id 2
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 11 for forecast column with id 12
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 12 for forecast column with id 13

And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value 264076.77665572 for forecast column with id 2
And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value 275288.59479674 for forecast column with id 12

Scenario: [AABP-99] Automatic Repayment Schemes  - Repayment Linear Tenor  - Half Yearly 

Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpRepaymentFrequency              |2|
Facility_tpAnnuityInterestRate             |0.05|
Facility_tpPrincipalLimit                  |14000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpWithdrawalChoice                |0|


Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 1 for forecast column with id 7
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 2 for forecast column with id 13

And tuple variable Facility_tpOriginalTenor in tuple Facility1 should have value 48 for document

And tuple variable Facility_tpWithdrawal in tuple Facility1 should have value 14000000 for forecast column with id 1
And tuple variable Facility_tpRepaymentLinear in tuple Facility1 should have value 1750000 for forecast column with id 7
And tuple variable Facility_tpRepaymentLinear in tuple Facility1 should have value 1750000 for forecast column with id 13

Scenario: [AABP-99] Automatic Repayment Schemes  - Outstanding Balance T  - Monthly - Annuity

Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpRepaymentFrequency              |12|
Facility_tpAnnuityInterestRate             |0.05|
Facility_tpPrincipalLimit                  |14000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpWithdrawalChoice                |0|


Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 1 for forecast column with id 2
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 6 for forecast column with id 7
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 47 for forecast column with id 48

And tuple variable Facility_tpWithdrawal in tuple Facility1 should have value NA for forecast column with id 2
And tuple variable Facility_tpRepayment in tuple Facility1 should have value 264076.77665572 for forecast column with id 2
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 14000000 for forecast column with id 1
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 13735923.22334428 for forecast column with id 2

And tuple variable Facility_tpWithdrawal in tuple Facility1 should have value NA for forecast column with id 48
And tuple variable Facility_tpRepayment in tuple Facility1 should have value 319740.05845921003 for forecast column with id 48
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 321072.30870279 for forecast column with id 48

Scenario: [AABP-99] Automatic Repayment Schemes  - Average Original Tenor  - Quarterly - Linear

Given a document of the model type AABPRICING
And 60 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2017-01-01|
Facility_tpRepaymentFrequency              |4|
Facility_tpAnnuityInterestRate             |0.05|
Facility_tpPrincipalLimit                  |12000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpWithdrawalChoice                |0|

Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 4 for forecast column with start date 2016-01-01
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 8 for forecast column with start date 2017-01-01


And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 6000000.0 for forecast column with start date 2016-01-01
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 3000000.0 for forecast column with id 19

And tuple variable Facility_tpWeightedAmountRepayment in tuple Facility1 should have value 18000000.0 for forecast column with id 13
And tuple variable Facility_tpWeightedAmountRepayment in tuple Facility1 should have value 27000000.0 for forecast column with id 19
And tuple variable Facility_tpWeightedAmountRepayment in tuple Facility1 should have value NA for forecast column with id 47
And tuple variable Facility_tpWeightedAmountRepayment in tuple Facility1 should have value NA for forecast column with id 48


And tuple variable Facility_tpStartDate in tuple Facility1 should have value 42005 for document
And tuple variable Facility_tpCurrentDate in tuple Facility1 should have value 42370 for document

And tuple variable Facility_tpOriginalAverageTenorTHsum in tuple Facility1 should have value 162000000 for document
And tuple variable Facility_tpOriginalAverageTenorNHsum in tuple Facility1 should have value 144000000 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have value 1.125 for document

And tuple variable Facility_tpRemainingAverageTenorTHsum in tuple Facility1 should have value 45000000 for document
And tuple variable Facility_tpRemainingAverageTenorNHsum in tuple Facility1 should have value 90000000 for document
!-- Has become obselete, see 9617 - And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 0.50 for document

Scenario: Test Yung [AABP-99] Automatic Repayment Schemes  - Average Original Tenor  - Quarterly - Linear

Given a document of the model type AABPRICING
And 60 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2015-10-02|
Facility_tpEndDate                         |2017-01-01|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |8000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpWithdrawalChoice                |0|


Then tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have value 1.125 for document
!-- Has become obselete, see 9617 - And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 0.75 for document


Scenario: [AABP-99] Automatic Repayment Schemes  - Average Remaining Tenor - Monthly - Linear


Given a document of the model type AABPRICING
And 48 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2017-01-01|
Facility_tpProductduration                 |24|
Facility_tpRepaymentFrequency              |12|
Facility_tpPrincipalLimit                  |12000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpRevolvingCredit                 |0|


Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 12 for forecast column with id 13
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 18 for forecast column with id 19

And tuple variable Facility_tpWithdrawal in tuple Facility1 should have value NA for forecast column with id 12
And tuple variable Facility_tpRepayment in tuple Facility1 should have value 500000.0 for forecast column with id 13
And tuple variable Facility_tpRepayment in tuple Facility1 should have value 500000.0 for forecast column with id 19
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 6000000.0 for forecast column with id 13
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 3000000.0 for forecast column with id 19

And tuple variable Facility_tpWeightedAmountRepaymentRem in tuple Facility1 should have value 0.0 for forecast column with id 13
And tuple variable Facility_tpWeightedAmountRepaymentRem in tuple Facility1 should have value 3000000.0 for forecast column with id 19


!-- hij blijft de current date aanhouden en niet de voorgeprogrammeerde StartDate!! 
!-- Has become obselete, see 9617 - And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 0.5 for document



Scenario: [AABP-99] Automatic Repayment Schemes  - Average Outstanding Balance - Annuity - No Grace - No Balloon - Quarterly
Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |8000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpAnnuityInterestRate             |0.04|


Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 2 for forecast column with id 9

And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 7068250.88312002 for forecast column with id 9

!-- Has become obselete, see 9617 - And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 5389369.20141414 for document

Scenario: Test Yung [AABP-99] Automatic Repayment Schemes  - Average Original Tenor  - Quarterly - Annuity

Given a document of the model type AABPRICING
And 60 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2015-10-02|
Facility_tpEndDate                         |2017-01-01|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |8000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpWithdrawalChoice                |0|
Facility_tpAnnuityInterestRate             |0.04|


Then tuple variable Facility_tpOriginalAverageTenorTHsum in tuple Facility1 should have value 109253607.23165518 for document
And tuple variable Facility_tpOriginalAverageTenorNHsum in tuple Facility1 should have value 96000000 for document
!-- Has become obselete, see 9617 - And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have value 1.13805841 for document

And tuple variable Facility_tpRemainingAverageTenorTHsum in tuple Facility1 should have value 45972273.92886428 for document
And tuple variable Facility_tpRemainingAverageTenorNHsum in tuple Facility1 should have value 60892449.22363671 for document
!-- Has become obselete, see 9617 - And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 0.75497495 for document




Scenario: [AABP-99] Automatic Repayment Schemes  - Average Outstanding - Annuity - No Grace - YES Balloon - Quarterly
Given a document of the model type AABPRICING
And 51 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility


When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |12000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |4000000|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpAnnuityInterestRate             |0.04|



Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 4 for forecast column with id 13
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 16 for forecast column with id 49

And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have 7 decimals rounded value 538175.0243239 for forecast column with id 49
And tuple variable Facility_tpRepaymentBalloon in tuple Facility1 should have value 4000000 for forecast column with id 49
And tuple variable Facility_tpRepayment in tuple Facility1 should have 7 decimals rounded value 4538175.0243239 for forecast column with id 49


And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 10595376.61738406 for forecast column with id 12
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value NA for forecast column with id 49

!-- Has become obselete, see 9617 - And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 9389369.20141414 for document

Scenario: [AABP-99] Automatic Repayment Schemes  - Average Outstanding - Linear - YES Grace - No Balloon - Half Yearly
Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2015-07-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |2|
Facility_tpPrincipalLimit                  |4200000|
Facility_tpGracePeriod                     |6|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpAnnuityInterestRate             |0.04|


Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value NA for forecast column with id 7
Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 1 for forecast column with id 13

And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 3600000 for forecast column with id 13

!-- Has become obselete, see 9617 - And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 3900000 for document

Scenario: [AABP-99] Automatic Repayment Schemes  - Average Outstanding - Linear - YES Grace - YES Balloon - Half Yearly
Given a document of the model type AABPRICING
And 39 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2017-01-01|
Facility_tpEndDate                         |2018-01-01|
Facility_tpProductduration                 |36|
Facility_tpRepaymentFrequency              |2|
Facility_tpPrincipalLimit                  |3000000|
Facility_tpGracePeriod                     |6|
Facility_tpBalloon                         |1500000|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpAnnuityInterestRate             |0.04|



Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value NA for forecast column with id 7
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 1 for forecast column with id 13
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 2 for forecast column with id 24
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 5 for forecast column with id 37

And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 3000000 for forecast column with id 7
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 2700000 for forecast column with id 13
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value NA for forecast column with id 37

!-- Has become obselete, see 9617 - And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 1950000 for document

Scenario: [AABP-99] Automatic Repayment Schemes  - Limit - Linear - Half Yearly 
Given a document of the model type AABPRICING
And 26 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility


When tuple variables in tuple Facility1 are set:  
|variable|value|

Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate                     |2015-01-01|
Facility_tpEndDate                         |2017-01-01|
Facility_tpType                            |ROS|
Facility_tpProductduration                 |24|
Facility_tpRepaymentFrequency              |12|
Facility_tpPrincipalLimit                  |12000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpAnnuityInterestRate             |0.04|


When tuple variables in tuple Facility2 are set:  
|variable|value|

Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate                     |2015-01-01|
Facility_tpEndDate                         |2017-01-01|
Facility_tpType                            |F2|
Facility_tpProductduration                 |24|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |12000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpAnnuityInterestRate             |0.04|
Facility_tpRevolvingCredit                 |0|

Then forecast column with id 1 should have start date 2015-01-01
And forecast column with id 13 should have start date 2016-01-01

And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 12000000 for forecast column with id 1
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 6000000 for forecast column with id 13
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 500000 for forecast column with id 24
And tuple variable Facility_tpNonRevolvingProduct in tuple Facility1 should have value No for document
And tuple variable Facility_tpLimit in tuple Facility1 should have value 9250000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility1 is set to 2015-06-01 for document
Then tuple variable Facility_tpLimit in tuple Facility1 should have value 6750000 for document

And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 12000000 for forecast column with id 1
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 12000000 for forecast column with id 2
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 12000000 for forecast column with id 3
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 10500000 for forecast column with id 4
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 10500000 for forecast column with id 5
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 10500000 for forecast column with id 6
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 9000000 for forecast column with id 7
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 9000000 for forecast column with id 8
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 9000000 for forecast column with id 9
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 7500000 for forecast column with id 10
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 7500000 for forecast column with id 11
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 7500000 for forecast column with id 12
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 6000000 for forecast column with id 13
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 6000000 for forecast column with id 14
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 6000000 for forecast column with id 15
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 4500000 for forecast column with id 16
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 3000000 for forecast column with id 19
And tuple variable Facility_tpOutstandingBalance in tuple Facility2 should have value 1500000 for forecast column with id 24

When tuple variable Facility_tpCurrentDate in tuple Facility2 is set to 2016-01-01 for document
Then tuple variable Facility_tpLimit in tuple Facility2 should have value 3750000 for document

When tuple variable Facility_tpCurrentDate in tuple Facility2 is set to 2017-01-01 for document
Then tuple variable Facility_tpLimit in tuple Facility2 should have value 0 for document

Scenario: [AABP-1687] Automatic Repayment Schemes  - Limit - Linear - YES Grace - No Balloon - Half Yearly
Given a document of the model type AABPRICING
And 73 month based forecast columns starting from 2017-01-01

And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2018-03-01|
Facility_tpEndDate                         |2021-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |20000000|
Facility_tpGracePeriod                     |12|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpAnnuityInterestRate             |0.04|

When tuple variables in tuple Facility2 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2018-03-01|
Facility_tpEndDate                         |2022-01-01|
Facility_tpProductduration                 |60|
Facility_tpRepaymentFrequency              |2|
Facility_tpPrincipalLimit                  |25000000|
Facility_tpGracePeriod                     |6|
Facility_tpBalloon                         |5000000|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpAnnuityInterestRate             |0.05|

Then tuple variable Facility_tpLimit in tuple Facility1 should have value 17500000 for document
And tuple variable Facility_tpLimit in tuple Facility2 should have value 21961179.07714822 for document

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2019-11-05|
Facility_tpEndDate                         |2021-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |20000000|
Facility_tpGracePeriod                     |18|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpAnnuityInterestRate             |0.04|

Then tuple variable Facility_tpLinear in tuple Facility1 should have value 2000000 for document
And tuple variable Facility_tpLimit in tuple Facility1 should have value 7000000 for document

!-- Below user story does not work yet due to balloon. As of 25-08-2016 balloon functionality is not working properly in the model. Balloon functionality should be implemented in the model for EAO and limit calculations.
!-- When tuple variables in tuple Facility2 are set:  
!-- |variable|value|
!-- Facility_tpType                            |F2|
!-- Facility_tpStartDate                       |2017-01-01|
!-- Facility_tpCurrentDate	          		   |2021-09-05|
!-- Facility_tpEndDate                         |2022-01-01|
!-- Facility_tpProductduration                 |60|
!-- Facility_tpRepaymentFrequency              |2|
!-- Facility_tpPrincipalLimit                  |25000000|
!-- Facility_tpGracePeriod                     |18|
!-- Facility_tpBalloon                         |5000000|
!-- Facility_tpWithdrawalChoice                |0|
!-- Facility_tpRepaymentChoice                 |2|
!-- Facility_tpAnnuityInterestRate             |0.05|

!-- Then tuple variable Facility_tpLimit in tuple Facility2 should have value 8642056.05744646 for document

Scenario: Bug [AABP-1687] Automatic Repayment Schemes  - Average Outstanding - Linear - No Grace - No Balloon - Quaterly
Given a document of the model type AABPRICING
And 124 month based forecast columns starting from 2016-01-01 

And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2016-03-01|
Facility_tpCurrentDate	          		   |2016-03-01|
Facility_tpEndDate                         |2026-03-01|
Facility_tpProductduration                 |120|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |10000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpAnnuityInterestRate             |0.06|


Then tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2016-03-01
And tuple variable Facility_tpHulpVarFrequency in tuple Facility1 should have value 0 for forecast column with start date 2016-03-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2016-04-01
And tuple variable Facility_tpHulpVarFrequency in tuple Facility1 should have value 0 for forecast column with start date 2016-04-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value 10000000 for forecast column with start date 2016-05-01

And tuple variable Facility_tpCurrentDate in tuple Facility1 should have value 42430 for document
And tuple variable Facility_tpStartDate in tuple Facility1 should have value 42430 for document

And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2016-03-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2016-04-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value 10000000 for forecast column with start date 2016-05-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2016-06-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2016-07-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value 9815728.98302721 for forecast column with start date 2016-08-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2016-09-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2016-10-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value 9628693.90079983 for forecast column with start date 2016-11-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2016-12-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2017-01-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value 9438853.29233903 for forecast column with start date 2017-02-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2017-03-01
And tuple variable Facility_tpOutstandingBalanceHulpVar in tuple Facility1 should have value NA for forecast column with start date 2017-04-01
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 9720819.04404152 for document
And tuple variable Facility_tpLimit in tuple Facility1 should have value 9720819.04404152 for document


When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2019-11-05|
Facility_tpEndDate                         |2021-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |20000000|
Facility_tpGracePeriod                     |14|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|
Facility_tpAnnuityInterestRate             |0.04|

Then tuple variable Facility_tpLinear in tuple Facility1 should have 2 decimals rounded value 1666666.67 for document
And tuple variable Facility_tpLimit in tuple Facility1 should have 2 decimals rounded value 5833333.33 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 5833333.33 for document

!-- Below user story does not work yet due to balloon. As of 25-08-2016 balloon functionality is not working properly in the model. Balloon functionality should be implemented in the model for EAO and limit calculations.
!-- When tuple variables in tuple Facility2 are set:  
!-- |variable|value|
!-- Facility_tpType                            |F2|
!-- Facility_tpStartDate                       |2017-01-01|
!-- Facility_tpCurrentDate	          		   |2021-09-05|
!-- Facility_tpEndDate                         |2022-01-01|
!-- Facility_tpProductduration                 |60|
!-- Facility_tpRepaymentFrequency              |2|
!-- Facility_tpPrincipalLimit                  |25000000|
!-- Facility_tpGracePeriod                     |9|
!-- Facility_tpBalloon                         |5000000|
!-- Facility_tpWithdrawalChoice                |0|
!-- Facility_tpRepaymentChoice                 |2|
!-- Facility_tpAnnuityInterestRate             |0.05|

!-- Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility2 should have value 8642056.05744646 for document
!-- And tuple variable Facility_tpLimit in tuple Facility2 should have value 8642056.05744646 for document


Scenario: [AABP-158] Calculation Risk Adjusted Return Facility

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpBookingLocation is set to Netherlands for document
When tuple variables in tuple Facility1 are set:  

|variable|value|
Facility_tpPrincipalLimit	          		       |1000000|
Facility_tpExpectedAverageOutstanding              |200000|
Facility_tpType                                    |ROS|
Facility_tpWithdrawalChoice                        |3|
Facility_tpProductuptakeDetailsUptakeType          |REVOLVING|
Facility_tpCreditFeeBp                             |100|
Facility_tpOneOffFeeAmount                         |1000|
Facility_tpCommitmentFeeBp                         |80|
Facility_tpRemainingTenor                          |72|
Facility_tpOriginalAverageTenor                    |6|
Facility_tpInterestIncome                          |18000|
Facility_tpUtilisationFeeBpLimit1Bp                |10|
Facility_tpUtilisationFeeBpLimit2Bp                |20|
Facility_tpUtilisationFeeBpLimit3Bp                |40|
Facility_tpUtilisationFeeBpLimit4Bp                |80|

Facility_tpInternalExpectedLoss                    |1687|
Facility_tpOperationalCosts                        |2357|

Facility_tpFundsTransferPricing                    |1975|
Facility_tpIndirectLiquidityCosts                  |600|
Facility_tpSubordinatedDebtCapitalCharge           |945|
Facility_tpEquityFundingAdjustment                 |179|
Facility_tpRemainingAverageTenor                   |3.5|

Then tuple variable Facility_tpLimit in tuple Facility1 should have value 1000000 for document
Then tuple variable Facility_tpCommitmentFee in tuple Facility1 should have value 6400 for document
And tuple variable Facility_tpAnnualFee in tuple Facility1 should have value NA for document
And tuple variable Facility_tpOneOffFee in tuple Facility1 should have value 200 for document
And tuple variable Facility_tpUtilisationFeeBp in tuple Facility1 should have value 10 for document
And tuple variable Facility_tpUtilisationFee in tuple Facility1 should have value 200 for document

And tuple variable Facility_tpCreditRelatedFee in tuple Facility1 should have value 6800 for document
And tuple variable Facility_tpCreditIncome in tuple Facility1 should have value 24800 for document
And tuple variable Facility_tpOtherExpenses in tuple Facility1 should have value 4044 for document

And tuple variable Facility_tpInterestExpenses in tuple Facility1 should have value 3341 for document

And tuple variable Facility_tpTax in tuple Facility1 should have value 4353.75 for document

And tuple variable Facility_tpRiskAdjustedReturn in tuple Facility1 should have value 13061.25 for document

!--  adjustment for bug AABF-1091, mapping of credit fee on annual fee only for overdraft 
When tuple variable Facility_tpType in tuple Facility1 is set to F1 for document
Then tuple variable Facility_tpAnnualFee in tuple Facility1 should have value 2000 for document

Scenario: [AABP-35] Indirect Liquidity Costs  Knock out 1: Financial institution YES
!-- ==== Risk Adjusted Return - RAR ============
!-- ==== RAR - Other expenses ================== 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpOriginalLimit	          		       |1000000|
Facility_tpExpectedAverageOutstanding              |900000|
Facility_tpBufferCostPerYearBP                     |1080|
Facility_tpType                                    |F2|
Facility_tpRemainingAverageTenor                   |1|



Then tuple variable Facility_tpOutflowFI in tuple Facility1 should have value 0.4 for document
And tuple variable Facility_tpCreditOrLiquidity in tuple Facility1 should have value CREDIT for document
And tuple variable Facility_tpFI in tuple Facility1 should have value Yes for document
And tuple variable Facility_tpIndirectLiquidityCostsFI in tuple Facility1 should have value 4320 for document
And tuple variable Facility_tpIndirectLiquidityCosts in tuple Facility1 should have value 4320 for document


Scenario: [AABP-35] Indirect Liquidity Costs  Knock out 1: Financial institution NO
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpAGICChoice is set to 2717 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpOriginalLimit	          		       |1000000|
Facility_tpExpectedAverageOutstanding              |900000|
Facility_tpBufferCostPerYearBP                     |1080|
Facility_tpType                                    |F2|

Then tuple variable Facility_tpFI in tuple Facility1 should have value No for document
And tuple variable Facility_tpIndirectLiquidityCostsFI in tuple Facility1 should have value NA for document
And tuple variable Facility_tpOutflowFI in tuple Facility1 should have value -99 for document




Scenario: [AABP-35] Indirect Liquidity Costs  Knock out 2: Redrawable Yes  and Committed
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 2717 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpOriginalLimit	          		       |1000000|
Facility_tpExpectedAverageOutstanding              |900000|
Facility_tpBufferCostPerYearBP                     |1080|
Facility_tpType                                    |F1|
Facility_tp31DgDebet                               |0|
Facility_tpUncommitted                             |0|
Facility_tpRemainingAverageTenor                   |1|

Then tuple variable Facility_tpFI in tuple Facility1 should have value No for document
And tuple variable Facility_tpRedrawable in tuple Facility1 should have value Yes for document
And tuple variable Facility_tpCombined in tuple Facility1 should have value No for document
And tuple variable Facility_tpOutflowCommittedRedraw in tuple Facility1 should have value 0.075 for document
And tuple variable Facility_tpIndirectLiquidityCostsComRe in tuple Facility1 should have value 810 for document
And tuple variable Facility_tpIndirectLiquidityCosts in tuple Facility1 should have value 810 for document


Scenario: [AABP-35] Indirect Liquidity Costs  Knock out 2: Redrawable Yes  and Uncommitted
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 2717 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

And tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpOriginalLimit	          		       |1000000|
Facility_tpExpectedAverageOutstanding              |800000|
Facility_tpBufferCostPerYearBP                     |1080|
Facility_tpType                                    |F1|
Facility_tp31DgDebet                               |0|
Facility_tpUncommitted                             |1|
Facility_tpRemainingAverageTenor                   |1|


Then tuple variable Facility_tpFI in tuple Facility1 should have value No for document
And tuple variable Facility_tpRedrawable in tuple Facility1 should have value Yes for document
And tuple variable Facility_tpCombined in tuple Facility1 should have value No for document
And tuple variable Facility_tpOutflowCommittedRedraw in tuple Facility1 should have value 0.075 for document
And tuple variable Facility_tpIndirectLiquidityCostsUncomRe in tuple Facility1 should have value 1620 for document
And tuple variable Facility_tpIndirectLiquidityCosts in tuple Facility1 should have value 1620 for document





Scenario: [AABP-35] Indirect Liquidity Costs  Knock out 3: 31dg Yes  and Committed
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 2717 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

And tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpOriginalLimit	          		       |1000000|
Facility_tpExpectedAverageOutstanding              |700000|
Facility_tpBufferCostPerYearBP                     |1080|
Facility_tpType                                    |F2|
Facility_tp31DgDebet                               |1|
Facility_tpUncommitted                             |0|
Facility_tpRemainingAverageTenor                   |1|


Then tuple variable Facility_tpFI in tuple Facility1 should have value No for document
And tuple variable Facility_tpRedrawable in tuple Facility1 should have value No for document
And tuple variable Facility_tpCombined in tuple Facility1 should have value No for document
And tuple variable Facility_tpOutflowCommitted31Dgn in tuple Facility1 should have value 0.075 for document
And tuple variable Facility_tpIndirectLiquidityCostsCom31dt in tuple Facility1 should have value 2430 for document
And tuple variable Facility_tpIndirectLiquidityCosts in tuple Facility1 should have value 2430 for document


Scenario: [AABP-35] Indirect Liquidity Costs  Knock out 3: 31dg Yes and Uncommitted
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 2717 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

And tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpOriginalLimit	          		       |1000000|
Facility_tpExpectedAverageOutstanding              |600000|
Facility_tpBufferCostPerYearBP                     |1080|
Facility_tpType                                    |F2|
Facility_tp31DgDebet                               |1|
Facility_tpUncommitted                             |1|
Facility_tpRemainingAverageTenor                   |1|

Then tuple variable Facility_tpFI in tuple Facility1 should have value No for document
And tuple variable Facility_tpRedrawable in tuple Facility1 should have value No for document
And tuple variable Facility_tpCombined in tuple Facility1 should have value No for document
And tuple variable Facility_tpOutflowCommitted31Dgn in tuple Facility1 should have value 0.075 for document
And tuple variable Facility_tpIndirectLiquidityCostsUncom31dt in tuple Facility1 should have value 3240 for document
And tuple variable Facility_tpIndirectLiquidityCosts in tuple Facility1 should have value 3240 for document

Scenario: [AABP-35] Indirect Liquidity Costs  Knock out 4: Combined Yes and Committed
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 2717 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

And tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpPrincipalLimit	          		       |1000000|
Facility_tpExpectedAverageOutstanding              |500000|
Facility_tpPercentageUsedOfExpectedAverageOutstanding |1|
Facility_tpBufferCostPerYearBP                     |1080|
Facility_tpType                                    |EFF|
Facility_tp31DgDebet                               |0|
Facility_tpUncommitted                             |0|
Facility_tpDeannualize                             |1|

Then tuple variable Facility_tpFI in tuple Facility1 should have value No for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 500000 for document
And tuple variable Facility_tpRedrawable in tuple Facility1 should have value No for document
And tuple variable Facility_tpCombined in tuple Facility1 should have value Yes for document
And tuple variable Facility_tpOutflowCommittedCombined in tuple Facility1 should have value 0.500 for document
And tuple variable Facility_tpIndirectLiquidityCostsComCom in tuple Facility1 should have value 27000 for document
And tuple variable Facility_tpIndirectLiquidityCosts in tuple Facility1 should have value 27000 for document

Scenario: [AABP-35] Indirect Liquidity Costs  Knock out 5: Not Redrawable
 
Given a document of the model type AABPRICING
And 61 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 2717 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

And tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpOriginalLimit	          		       |1000000|
Facility_tpExpectedAverageOutstanding              |500000|
Facility_tpBufferCostPerYearBP                     |1080|
Facility_tpType                                    |F2|
Facility_tp31DgDebet                               |0|
Facility_tpUncommitted                             |0|
Facility_tpStartDate                               |2015-01-01|
Facility_tpCurrentDate	          		           |2016-01-01|
Facility_tpEndDate                                 |2020-01-01|
Facility_tpProductduration                         |60|
Facility_tpRepaymentFrequency                      |12|
Facility_tpGracePeriod                             |0|
Facility_tpBalloon                                 |0|
Facility_tpWithdrawalChoice                        |0|
Facility_tpProductredemptionDetailsRedemptionType  |Linear|
Facility_tpRemainingAverageTenor                   |1|


Then tuple variable Facility_tpFI in tuple Facility1 should have value No for document
And tuple variable Facility_tpRedrawable in tuple Facility1 should have value No for document
And tuple variable Facility_tpCombined in tuple Facility1 should have value No for document
And tuple variable Facility_tpOutflowCommittedCombined in tuple Facility1 should have value 0.500 for document
And tuple variable Facility_tpIndirectLiquidityCostsNotRe in tuple Facility1 should have value 900 for document
And tuple variable Facility_tpIndirectLiquidityCosts in tuple Facility1 should have value 900 for document

Scenario: [AABP-759]  - Subordinated Debt Capital Charge - Facility - Remaining Tenor >= 1 jaar
!-- ==== RAR - Other expenses ================== 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpRemainingTenor                          |24|
Facility_tpRemainingAverageTenor                   |1.1|
Facility_tpRWACreditRisk                           |500000|
Facility_tpRWAOperationalRisk                      |52380|


Then tuple variable Facility_tpCostOfSubordination in tuple Facility1 should have value 265 for document
And tuple variable Facility_tpSubDebtRatio in tuple Facility1 should have value 0.055 for document
And tuple variable Facility_tpSubordinatedDebtCapitalCharge in tuple Facility1 should have value 805.09385 for document

Scenario: [AABP-759]  - Subordinated Debt Capital Charge - Facility - Remaining Tenor < 1 jaar

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpRWACreditRisk                           |500000|
Facility_tpRWAOperationalRisk                      |52380|
Facility_tpRemainingAverageTenor                   |0.5|


Then tuple variable Facility_tpCostOfSubordination in tuple Facility1 should have value 265 for document
And tuple variable Facility_tpSubDebtRatio in tuple Facility1 should have value 0.055 for document
And tuple variable Facility_tpSubordinatedDebtCapitalCharge in tuple Facility1 should have value 402.546925 for document


Scenario: [AABP-655] - Non Credit Income Cost - YBB

Given a document of the model type AABPRICING
And a tuple instance Borrower_tpNonCredit1 of definition Borrower_tpNonCredit
And a tuple instance Borrower_tpNonCredit2 of definition Borrower_tpNonCredit

When variable Borrower_tpClientGroup is set to YBB for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document

And tuple variables in tuple Borrower_tpNonCredit1 are set:
|variable|value|

Borrower_tpNonCredit_tpIncome_IDtotal	            	  |DM_YBB|
Borrower_tpNonCredit_tpIncome_Amount                      |100000|

And tuple variables in tuple Borrower_tpNonCredit2 are set:
|variable|value|

Borrower_tpNonCredit_tpIncome_IDtotal	            	  |CD_YBB|
Borrower_tpNonCredit_tpIncome_Amount                      |100000|


Then tuple variable Borrower_tpNonCredit_tpCosts_EffRatio in tuple Borrower_tpNonCredit1 should have value 0.71 for document
And tuple variable Borrower_tpNonCredit_tpCosts in tuple Borrower_tpNonCredit1 should have value 71000 for document

And tuple variable Borrower_tpNonCredit_tpCosts_EffRatio in tuple Borrower_tpNonCredit2 should have value 1 for document
And tuple variable Borrower_tpNonCredit_tpCosts in tuple Borrower_tpNonCredit2 should have value 100000 for document

And variable Borrower_tpNonCreditCosts_Total should have value 171186.12 for document

Scenario: [AABP-655] - Non Credit Income Cost - CCL

Given a document of the model type AABPRICING
And a tuple instance Borrower_tpNonCredit1 of definition Borrower_tpNonCredit
And a tuple instance Borrower_tpNonCredit2 of definition Borrower_tpNonCredit

When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document

And tuple variables in tuple Borrower_tpNonCredit1 are set:
|variable|value|

Borrower_tpNonCredit_tpIncome_IDtotal	            	  |GA_CCL|
Borrower_tpNonCredit_tpIncome_Amount                      |100000|

And tuple variables in tuple Borrower_tpNonCredit2 are set:
|variable|value|

Borrower_tpNonCredit_tpIncome_IDtotal	            	  |CD_CCL|
Borrower_tpNonCredit_tpIncome_Amount                      |100000|


Then tuple variable Borrower_tpNonCredit_tpCosts_EffRatio in tuple Borrower_tpNonCredit1 should have value 0.3393 for document
And tuple variable Borrower_tpNonCredit_tpCosts in tuple Borrower_tpNonCredit1 should have value 33930 for document

And tuple variable Borrower_tpNonCredit_tpCosts_EffRatio in tuple Borrower_tpNonCredit2 should have value 0.1380 for document
And tuple variable Borrower_tpNonCredit_tpCosts in tuple Borrower_tpNonCredit2 should have value 13800 for document

And variable Borrower_tpNonCreditCosts_Total should have value 47730 for document





Scenario: [AABP-650] - Cost per Service Concept Facility Level - CCL - 2 even F1's

Given a document of the model type AABPRICING
And a tuple instance Borrower_tpNonCredit1 of definition Borrower_tpNonCredit
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpPrincipalLimit	          		       |1000000|
Facility_tpType                                    |F1|
Facility_tpExpectedAverageOutstanding              |0|
Facility_tpUncommitted                             |0|


And tuple variables in tuple Facility2 are set:
|variable|value|

Facility_tpPrincipalLimit	          		       |2000000|
Facility_tpType                                    |F1|
Facility_tpExpectedAverageOutstanding              |0|
Facility_tpUncommitted                             |0|



Then variable AgreementFixedCostOperatingConcept should have value 52558.99 for document

And tuple variable Facility_tpCostPerServiceConcept in tuple Facility1 should have value 26279.495 for document
And tuple variable Facility_tpCostPerServiceConcept in tuple Facility2 should have value 26279.495 for document



Scenario: [AABP-650] - Cost per Service Concept Facility Level - CCL - 2 different F1's + Non credit

Given a document of the model type AABPRICING
And a tuple instance Borrower_tpNonCredit1 of definition Borrower_tpNonCredit
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When variable Borrower_tpClientGroup is set to PAR for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpPrincipalLimit	          		       |1000000|
Facility_tpType                                    |F1|
Facility_tpExpectedAverageOutstanding              |1000000|
Facility_tpUncommitted                             |0|
Facility_tpRemainingTenor                          |60|


And tuple variables in tuple Facility2 are set:
|variable|value|

Facility_tpPrincipalLimit	          		       |2000000|
Facility_tpType                                    |F1|
Facility_tpExpectedAverageOutstanding              |500000|
Facility_tpUncommitted                             |0|
Facility_tpRemainingTenor                          |60|


 
And tuple variables in tuple Borrower_tpNonCredit1 are set:
|variable|value|

Borrower_tpNonCredit_tpIncome_ID	          		       |CA|
Borrower_tpNonCredit_tpIncome_Amount                      |100000|


Then variable AgreementFixedCostOperatingConcept should have value 1125 for document
And variable AgreementMaxRemainingTenor should have value 60 for document

And variable Borrower_tpNrOfFacilities should have value 2 for document
And variable Borrower_tpSumExpectedAverageOutstanding should have value 1500000 for document


And tuple variable Facility_tpPercentageOperatingConcept in tuple Facility1 should have value 0.8 for document
And tuple variable Facility_tpCostPerServiceConcept in tuple Facility1 should have value 600 for document
And tuple variable Facility_tpCostPerServiceConcept in tuple Facility2 should have value 300 for document

And variable Borrower_tpNonCreditCostsCostPerServiceConcept should have value 225 for document



Scenario: TupleSum Test

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpInterestIncome     |100000|

And tuple variables in tuple Facility2 are set:
|variable|value|

Facility_tpInterestIncome     |300000|


Then variable Borrower_tpInterestIncome should have value 400000 for document

Scenario: [AABP-1172] EC guaranteed calculations
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8715 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAFI for document
And variable Borrower_tpAssetSize is set to 70 for document
And variable Borrower_tpConfidenceLevel is set to 0.9995 for document


And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpOriginalLimit	          		       |1000000|
Facility_tpType                                    |F1|
Facility_tpLGDMoC                                  |0.34|
Facility_tpDLGDMoC                                 |0.35712|
Facility_tpEADUnguaranteed                         |100000|
Facility_tpEADGuaranteed                           |900000|
Facility_tpRemainingAverageTenor                   |4|
Facility_tpGuarantorAGICChoice                     |0511|
Facility_tpGuarantorPercentageGuaranteed           |0.9|
Facility_tpGuarantorRating                         |3+|
Facility_tpGuarantorPDModel                        |PAAL|
Facility_tpIELMoCUnguaranteed                      |1500|
Facility_tpIELMoCGuaranteed                        |1000|
Facility_tpGuarantorPercentageGuaranteed           |0.30|


Then variable Borrower_tpEquityIndex should have value 22 for document
And variable Borrower_tpRho should have value 0.34459 for document
And variable Borrower_tpPDMoC should have value 0.006456 for document
And variable Borrower_tpRiskWeight should have value 0.24665978 for document

And tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpGuarantorPDMoC in tuple Facility1 should have value 0.00184320 for document
And tuple variable Facility_tpRhoGuarantor in tuple Facility1 should have value 0.30904 for document
And tuple variable Facility_tpRiskWeightGuarantor in tuple Facility1 should have value 0.09805181 for document


And variable Borrower_tpCalibrationFactor should have value 1.08549637 for document
And tuple variable Facility_tpCalibrationFactorGuarantor in tuple Facility1 should have value 1.20531041 for document

And tuple variable Facility_tpECMultiplier in tuple Facility1 should have value 1.35 for document
And tuple variable Facility_tpECMultiplierGuarantor in tuple Facility1 should have value 1.47 for document


And variable Borrower_tpARCAddOn should have value 1 for document
And tuple variable Facility_tpEADUnguaranteed in tuple Facility1 should have value 100000 for document
And tuple variable Facility_tpLGDMoC in tuple Facility1 should have value 0.34 for document
And variable Borrower_tpRiskWeight should have value 0.24665978 for document
And variable Borrower_tpCalibrationFactor should have value 1.08549637 for document
And tuple variable Facility_tpECMultiplier in tuple Facility1 should have value 1.35 for document
And tuple variable Facility_tpIELMoCUnguaranteed in tuple Facility1 should have value 1500 for document
And variable AgreementDiversificationCR should have value 0.95 for document


And tuple variable Facility_tpCreditRiskUnguaranteed in tuple Facility1 should have value 10250.16458824 for document
And tuple variable Facility_tpCreditRiskGuaranteed in tuple Facility1 should have value 49552.96616713 for document

Scenario: [AABP-1271] EC guaranteed calculations - Test Yung
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 1302 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAAL for document
And variable Borrower_tpConfidenceLevel is set to 0.9995 for document
And variable AgreementDiversificationCR is set to 1 for document


And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpOriginalLimit                           |1000000|
Facility_tpType                                    |F1|
Facility_tpLGDMoC                                  |0.114|
Facility_tpDLGDMoC                                 |0.179|
Facility_tpEADUnguaranteed                         |250000|
Facility_tpEADGuaranteed                           |750000|
Facility_tpRemainingAverageTenor                   |2|
Facility_tpGuarantorAGICChoice                     |1708|
Facility_tpGuarantorPercentageGuaranteed           |0.75|
Facility_tpGuarantorRating                         |2-|
Facility_tpGuarantorPDModel                        |PAFI|
Facility_tpGuarantorPercentageGuaranteed           |0.30|


Then tuple variable Facility_tpELMultiplierECUnguaranteed in tuple Facility1 should have value 1.05092559 for document
And tuple variable Facility_tpELMultiplierECGuaranteed in tuple Facility1 should have value 1.04154248 for document

And tuple variable Facility_tpIELMoCUnguaranteed in tuple Facility1 should have value 207.02393304 for document
And tuple variable Facility_tpIELMoCGuaranteed in tuple Facility1 should have value 8.63656691 for document

And variable Borrower_tpARCAddOn should have value 1 for document
And variable AgreementDiversificationCR should have value 1 for document

And variable Borrower_tpCalibrationFactor should have value 1.08549637 for document
And tuple variable Facility_tpCalibrationFactorGuarantor in tuple Facility1 should have value 1.281466600 for document

And tuple variable Facility_tpECMultiplier in tuple Facility1 should have value 1 for document
And tuple variable Facility_tpECMultiplierGuarantor in tuple Facility1 should have value 1.08 for document



And variable Borrower_tpEquityIndex should have value 1 for document
And variable Borrower_tpRho should have value 0.33798 for document
And variable Borrower_tpPDMoC should have value 0.006912 for document
And variable Borrower_tpRiskWeight should have value 0.24998964 for document


And tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 should have value 2 for document
And tuple variable Facility_tpGuarantorPDMoC in tuple Facility1 should have value 0.001076 for document
And tuple variable Facility_tpRhoGuarantor in tuple Facility1 should have value 0.34702 for document
And tuple variable Facility_tpRiskWeightGuarantor in tuple Facility1 should have value 0.0809952 for document

And tuple variable Facility_tpELMultiplierECUnguaranteed in tuple Facility1 should have value 1.05092559 for document

And tuple variable Facility_tpCreditRiskUnguaranteed in tuple Facility1 should have value 7526.81708101 for document

Scenario: [AABP-638]  - Calculation Credit risk - UGD parameter
!-- ==== Economic Capital  =====================
!-- ==== EC - CR  ==============================

Given a document of the model type AABPRICING
And 3 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
And a tuple instance Facility3 of definition Facility

When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document
And variable Borrower_tpPLorNPL is set to 0 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

|Facility_tpLimit                                   |1200000|
|Facility_tpPrincipalLimit	          		        |1500000|
|Facility_tpType                                    |F2|
|Facility_tpUncommitted                             |0|
|Facility_tpExpectedAverageOutstanding              |1200000|

And tuple variables in tuple Facility2 are set:
|variable|value|

|Facility_tpPrincipalLimit                 	        |1500000|
|Facility_tpLimit                                   |1200000|
|Facility_tpWithdrawalChoice                        |3|
|Facility_tpType                                    |F1|
|Facility_tpUncommitted                             |0|
|Facility_tpExpectedAverageOutstanding              |1200000|

And tuple variables in tuple Facility3 are set:
|variable|value|
|Facility_tpLimit                     |1300000|                                  
|Facility_tpPrincipalLimit            |1500000|
|Facility_tpType                      |ROS    |
|Facility_tpUncommitted               |0      |
|Facility_tpExpectedAverageOutstanding|1200000|


Then tuple variable Facility_tpUsageLimit in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpLowerlimit in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpUGDPGO in tuple Facility1 should have value PGO for document
And tuple variable Facility_tpIDLEFfactors in tuple Facility1 should have value F2_0.0_0.0_PGO for document
And tuple variable Facility_tpLEF in tuple Facility1 should have value 1 for document
And tuple variable Facility_tpPGO in tuple Facility1 should have value 0 for document

Then tuple variable Facility_tpUsageLimit in tuple Facility2 should have value 0 for document
And tuple variable Facility_tpLowerlimit in tuple Facility2 should have value 1000000 for document
And tuple variable Facility_tpHeadroom in tuple Facility2 should have value No for document
And tuple variable Facility_tpUGDPGO in tuple Facility2 should have value PGO for document
And tuple variable Facility_tpIDLEFfactors in tuple Facility2 should have value F1_1000000.0_0.0_PGO for document
And tuple variable Facility_tpLEF in tuple Facility2 should have value 1 for document
And tuple variable Facility_tpPGO in tuple Facility2 should have value 0 for document

!-- AABP 1651 - Update UGD parameter
Then tuple variable Facility_tpUsageLimit in tuple Facility3 should have value 0 for document
And tuple variable Facility_tpLowerlimit in tuple Facility3 should have value 0 for document
And tuple variable Facility_tpUGDPGO in tuple Facility3 should have value UGD for document
And tuple variable Facility_tpIDLEFfactors in tuple Facility3 should have value ROS_0.0_0.0_UGD for document
And tuple variable Facility_tpLEF in tuple Facility3 should have value 1 for document
And tuple variable Facility_tpUGD in tuple Facility3 should have value 0.258 for document

!-- AABF 10699 - Adjusted EAD-parameters for PL
When variable Borrower_tpPLorNPL is set to 1 for document

Then tuple variable Facility_tpBorrower_tpPLorNPL in tuple Facility1 should have value PL for document
Then tuple variable Facility_tpLEF in tuple Facility1 should have value 1 for document
And tuple variable Facility_tpPGO in tuple Facility1 should have value 0 for document

Then tuple variable Facility_tpLEF in tuple Facility2 should have value 1 for document
And tuple variable Facility_tpPGO in tuple Facility2 should have value 0 for document

And tuple variable Facility_tpLEF in tuple Facility3 should have value 1 for document
And tuple variable Facility_tpUGD in tuple Facility3 should have value 0 for document

Scenario: [AABP-638]  - Calculation Credit risk - PGO parameter

Given a document of the model type AABPRICING
And 3 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
And a tuple instance Facility3 of definition Facility

When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document
And variable Borrower_tpPLorNPL is set to 0 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpPrincipalLimit	          		       |60000|
Facility_tpType                                    |SLF|
Facility_tpUncommitted                             |0|
Facility_tpExpectedAverageOutstanding              |35000|


And tuple variables in tuple Facility2 are set:
|variable|value|

Facility_tpPrincipalLimit	          		       |1500000|
Facility_tpType                                    |SLF|
Facility_tpUncommitted                             |0|
Facility_tpExpectedAverageOutstanding              |1300000|


And tuple variables in tuple Facility3 are set:
|variable|value|

Facility_tpPrincipalLimit	          		       |60000|
Facility_tpType                                    |SLF|
Facility_tpUncommitted                             |0|
Facility_tpExpectedAverageOutstanding              |60000|


Then tuple variable Facility_tpUsageLimit in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpLowerlimit in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpUGDPGO in tuple Facility1 should have value UGD for document
And tuple variable Facility_tpIDLEFfactors in tuple Facility1 should have value SLF_0.0_0.0_UGD for document
And tuple variable Facility_tpLEF in tuple Facility1 should have value 1 for document
And tuple variable Facility_tpUGD in tuple Facility1 should have value 1.18 for document
And tuple variable Facility_tpPGO in tuple Facility1 should have value NA for document


Then tuple variable Facility_tpUsageLimit in tuple Facility2 should have value 81 for document
And tuple variable Facility_tpLowerlimit in tuple Facility2 should have value 1000000 for document
And tuple variable Facility_tpUGDPGO in tuple Facility2 should have value UGD for document
And tuple variable Facility_tpIDLEFfactors in tuple Facility2 should have value SLF_1000000.0_81.0_UGD for document
And tuple variable Facility_tpLEF in tuple Facility2 should have value 1 for document
And tuple variable Facility_tpUGD in tuple Facility2 should have value 0 for document
And tuple variable Facility_tpPGO in tuple Facility2 should have value NA for document

Then tuple variable Facility_tpUsageLimit in tuple Facility3 should have value 0 for document
And tuple variable Facility_tpLowerlimit in tuple Facility3 should have value 0 for document
And tuple variable Facility_tpUGDPGO in tuple Facility3 should have value PGO for document
And tuple variable Facility_tpIDLEFfactors in tuple Facility3 should have value SLF_0.0_0.0_PGO for document
And tuple variable Facility_tpLEF in tuple Facility3 should have value 1 for document
And tuple variable Facility_tpPGO in tuple Facility3 should have value 0.14 for document
And tuple variable Facility_tpUGD in tuple Facility3 should have value NA for document

!-- AABF 10699 - Adjusted EAD-parameters for PL
When variable Borrower_tpPLorNPL is set to 1 for document
Then tuple variable Facility_tpPGO in tuple Facility3 should have value 0 for document
And tuple variable Facility_tpUGD in tuple Facility3 should have value NA for document

Scenario: [AABP-587] - Calculation EAD Facility level

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document
And variable Borrower_tpPLorNPL is set to 0 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpPrincipalLimit	          		       |50000|
Facility_tpType                                    |SLF|
Facility_tpExpectedAverageOutstanding              |40000|
Facility_tpUncommitted                             |0|
Facility_tpUGD                                     |0.43|

And tuple variables in tuple Facility2 are set:
|variable|value|

Facility_tpPrincipalLimit	          		       |50000|
Facility_tpType                                    |SLF|
Facility_tpExpectedAverageOutstanding              |50000|
Facility_tpUncommitted                             |0|




Then tuple variable Facility_tpLEF in tuple Facility1 should have value 1 for document
And tuple variable Facility_tpEAD in tuple Facility1 should have value 44945 for document

And tuple variable Facility_tpLEF in tuple Facility2 should have value 1 for document
And tuple variable Facility_tpEAD in tuple Facility2 should have value 58050 for document

When tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility2 is set to 40000 for document
Then tuple variable Facility_tpUGD in tuple Facility2 should have value 1.18 for document

Scenario: [AABP-590] - Calculation EAD - Matrix Look-up LEF

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
And a tuple instance Facility3 of definition Facility
And a tuple instance Facility4 of definition Facility

When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpLimit	                 		       |100000|
Facility_tpExpectedAverageOutstanding              |100000|
Facility_tpType                                    |F1|

And tuple variables in tuple Facility2 are set:
|variable|value|

Facility_tpLimit	                 		       |1500000|
Facility_tpExpectedAverageOutstanding              |1000000|
Facility_tpType                                    |F2|


And tuple variables in tuple Facility3 are set:
|variable|value|

Facility_tpLimit	                 		       |100000|
Facility_tpExpectedAverageOutstanding              |100000|
Facility_tpType                                    |F3|


And tuple variables in tuple Facility4 are set:
|variable|value|

Facility_tpLimit	                 		       |1500000|
Facility_tpExpectedAverageOutstanding              |1500000|
Facility_tpType                                    |F5|

Then tuple variable Facility_tpLEF in tuple Facility1 should have value 1 for document

And tuple variable Facility_tpLEF in tuple Facility2 should have value 1 for document
And tuple variable Facility_tpLEF in tuple Facility3 should have value 0.06 for document
And tuple variable Facility_tpLEF in tuple Facility4 should have value 0.23 for document

Scenario: [AABP-304] RWA Standaard/Unguaranteed - Credit Risk FI < 70000 and SuperVision Yes
!-- ==== Risk Weighted Assets  =================
!-- ==== RWA - CR  =============================
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAFI for document
And variable Borrower_tpAssetSize2 is set to 60000 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpOriginalLimit	          		       |1000000|
Facility_tpType                                    |F1|
Facility_tpDLGDMoC                                 |0.35712|
Facility_tpEADUnguaranteed                         |100000|
Facility_tpEADGuaranteed                           |900000|
Facility_tpRemainingAverageTenor                   |3|


Then variable Borrower_tpPD should have value 0.006 for document
And variable Borrower_tpMoCFactor should have value 1.076 for document
And variable Borrower_tpPDMoC should have value 0.006456 for document
And tuple variable Facility_tpFI in tuple Facility1 should have value Yes for document
And tuple variable Facility_tpR1 in tuple Facility1 should have value 0.2586178 for document
And tuple variable Facility_tpR2 in tuple Facility1 should have value 0.20689424 for document
And tuple variable Facility_tpR in tuple Facility1 should have value 0.20689424 for document
And tuple variable Facility_tpb in tuple Facility1 should have value 0.15583671 for document
And tuple variable Facility_tpbGuaranteed in tuple Facility1 should have value 0.15583671 for document

And tuple variable Facility_tpShortTermException in tuple Facility1 should have value No for document
And tuple variable Facility_tpMWRA in tuple Facility1 should have value 3 for document
And tuple variable Facility_tpDLGDMoCGuaranteed in tuple Facility1 should have value 0.35712 for document
And tuple variable Facility_tpK in tuple Facility1 should have value 0.0532724800000000000004 for document
And tuple variable Facility_tpKGuaranteed in tuple Facility1 should have value  0.0532724800000000000004 for document
And tuple variable Facility_tpRW in tuple Facility1 should have value 0.70586036 for document
And tuple variable Facility_tpRWGuaranteed in tuple Facility1 should have value 0.70586036 for document

And tuple variable Facility_tpRWACreditRiskUnguaranteed in tuple Facility1 should have value 70586.03586204001 for document
And tuple variable Facility_tpRWACreditRiskGuaranteed in tuple Facility1 should have value 635274.32275834 for document
And tuple variable Facility_tpRWACreditRisk in tuple Facility1 should have value 705860.35862037 for document

Scenario: [AABP-304] RWA Guaranteed - Credit Risk -  FI > 70000 and SuperVision No 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 0 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAFI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpOriginalLimit	          		       |1000000|
Facility_tpType                                    |F1|
Facility_tpDLGDMoC                                 |0.35712|
Facility_tpEADUnguaranteed                         |100000|
Facility_tpEADGuaranteed                           |900000|
Facility_tpRemainingAverageTenor                   |3|


Then variable Borrower_tpPD should have value 0.006 for document
And variable Borrower_tpMoCFactor should have value 1.076 for document
And variable Borrower_tpPDMoC should have value 0.006456 for document
And tuple variable Facility_tpFI in tuple Facility1 should have value Yes for document
And tuple variable Facility_tpR1 in tuple Facility1 should have value 0.2586178 for document
And tuple variable Facility_tpR2 in tuple Facility1 should have value 0.20689424 for document
And tuple variable Facility_tpR in tuple Facility1 should have value 0.2586178 for document
And tuple variable Facility_tpb in tuple Facility1 should have value 0.15583671 for document
And tuple variable Facility_tpbGuaranteed in tuple Facility1 should have value 0.15583671 for document

And tuple variable Facility_tpShortTermException in tuple Facility1 should have value No for document
And tuple variable Facility_tpMWRA in tuple Facility1 should have value 3 for document
And tuple variable Facility_tpDLGDMoCGuaranteed in tuple Facility1 should have value 0.35712 for document
And tuple variable Facility_tpK in tuple Facility1 should have value 0.06912601 for document
And tuple variable Facility_tpKGuaranteed in tuple Facility1 should have value 0.06912601 for document
And tuple variable Facility_tpRW in tuple Facility1 should have value 0.91591963 for document
And tuple variable Facility_tpRWGuaranteed in tuple Facility1 should have value 0.91591963 for document

And tuple variable Facility_tpRWACreditRiskUnguaranteed in tuple Facility1 should have value 91591.96252213001 for document
And tuple variable Facility_tpRWACreditRiskGuaranteed in tuple Facility1 should have value 824327.66269915 for document
And tuple variable Facility_tpRWACreditRisk in tuple Facility1 should have value 915919.62522127 for document

Scenario: [AABP-823] RWA Credit Risk with guarantees non financial institution, RWA Calculation AssetSize 7 mio
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8715 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAFI for document
And variable Borrower_tpAssetSize is set to 7 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpOriginalLimit                           |1000000|
Facility_tpType                                    |F1|
Facility_tpDLGDMoC                                 |0.35712|
Facility_tpEADUnguaranteed                         |247250|
Facility_tpEADGuaranteed                           |200000|
Facility_tpRemainingAverageTenor                   |3|
Facility_tpGuarantorAGIC                           |0511|
Facility_tpGuarantorPercentageGuaranteed           |0.9|
Facility_tpGuarantorRating                         |3+|
Facility_tpGuarantorPDModel                        |PAAL|



Then variable Borrower_tpPD should have value 0.006 for document
And variable Borrower_tpPDMoC should have value 0.006456 for document
And tuple variable Facility_tpGuarantorPD in tuple Facility1 should have value 0.0016 for document
And tuple variable Facility_tpGuarantorPDMoC in tuple Facility1 should have value 0.0018432000000000000000001 for document
And tuple variable Facility_tpFI in tuple Facility1 should have value No for document

!-- And tuple variable Facility_tpR1 in tuple Facility1 should have value 0.25155853 for document
And tuple variable Facility_tpR2 in tuple Facility1 should have value 0.16867202 for document
!-- And tuple variable Facility_tpR1Guaranteed in tuple Facility1 should have value 0.23758724 for document
And tuple variable Facility_tpR2Guaranteed in tuple Facility1 should have value 0.19121288 for document
!-- And tuple variable Facility_tpR in tuple Facility1 should have value 0.15006979 for document
And tuple variable Facility_tpb in tuple Facility1 should have value 0.15583671 for document
And tuple variable Facility_tpbGuaranteed in tuple Facility1 should have value 0.21476615000000000002 for document


And tuple variable Facility_tpShortTermException in tuple Facility1 should have value No for document
And tuple variable Facility_tpMWRA in tuple Facility1 should have value 3 for document


Scenario: [AABP-823] RWA Credit Risk with guarantees non financial institution, RWA Calculation AssetSize 50 mio
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8715 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAFI for document
And variable Borrower_tpAssetSize is set to 70 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpOriginalLimit	          		       |1000000|
Facility_tpType                                    |F1|
Facility_tpDLGDMoC                                 |0.35712|
Facility_tpEADUnguaranteed                         |100000|
Facility_tpEADGuaranteed                           |900000|
Facility_tpRemainingAverageTenor                   |3|
Facility_tpGuarantorAGIC                           |0511|
Facility_tpGuarantorPercentageGuaranteed           |0.9|
Facility_tpGuarantorRating                         |3+|
Facility_tpGuarantorPDModel                        |PAAL|
Facility_tpGuarantorPDMoC                          |0.0018432|




Then variable Borrower_tpPD should have value 0.006 for document
And variable Borrower_tpPDMoC should have value 0.006456 for document
And tuple variable Facility_tpGuarantorPD in tuple Facility1 should have value 0.0016 for document
And tuple variable Facility_tpFI in tuple Facility1 should have value No for document
!-- And tuple variable Facility_tpR1 in tuple Facility1 should have value 0.25155853 for document
And tuple variable Facility_tpR2 in tuple Facility1 should have value 0.20689424 for document
!-- And tuple variable Facility_tpR1Guaranteed in tuple Facility1 should have value 0.23758724 for document
And tuple variable Facility_tpR2Guaranteed in tuple Facility1 should have value 0.22943511 for document

And tuple variable Facility_tpRGuaranteed in tuple Facility1 should have value 0.22943511 for document

!-- And tuple variable Facility_tpR in tuple Facility1 should have value 0.15006979 for document
And tuple variable Facility_tpb in tuple Facility1 should have value 0.15583671 for document
And tuple variable Facility_tpbGuaranteed in tuple Facility1 should have value 0.2147661500000000000002 for document

And tuple variable Facility_tpShortTermException in tuple Facility1 should have value No for document
And tuple variable Facility_tpMWRA in tuple Facility1 should have value 3 for document
And tuple variable Facility_tpDLGDMoCGuaranteed in tuple Facility1 should have value 0.35712 for document
And tuple variable Facility_tpK in tuple Facility1 should have value 0.0532724800000000000004 for document
And tuple variable Facility_tpKGuaranteed in tuple Facility1 should have value 0.02951107 for document
And tuple variable Facility_tpRW in tuple Facility1 should have value 0.70586036 for document
And tuple variable Facility_tpRWGuaranteed in tuple Facility1 should have value 0.3910216900000000003 for document

And tuple variable Facility_tpRWACreditRiskUnguaranteed in tuple Facility1 should have value 70586.03586204001 for document
And tuple variable Facility_tpRWACreditRiskGuaranteed in tuple Facility1 should have value 351919.51753237 for document
And tuple variable Facility_tpRWACreditRisk in tuple Facility1 should have value 422505.55339441 for document




Scenario: [AABP-823] RWA Credit Risk with guarantees non financial institution, RWA Calculation AssetSize 70 mio Pd GAr > PD Bor
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8715 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAFI for document
And variable Borrower_tpAssetSize is set to 70 for document


And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpOriginalLimit	          		       |1000000|
Facility_tpType                                    |F1|
Facility_tpDLGDMoC                                 |0.35712|
Facility_tpEADUnguaranteed                         |100000|
Facility_tpEADGuaranteed                           |900000|
Facility_tpRemainingAverageTenor                   |3|
Facility_tpGuarantorAGIC                           |0511|
Facility_tpGuarantorPercentageGuaranteed           |0.9|
Facility_tpGuarantorRating                         |6+|
Facility_tpGuarantorPDModel                        |PAAL|




Then variable Borrower_tpPD should have value 0.006 for document
And variable Borrower_tpPDMoC should have value 0.006456 for document
And tuple variable Facility_tpGuarantorPDMoC in tuple Facility1 should have value 0.27648 for document
And tuple variable Facility_tpPDMoCGuaranteed in tuple Facility1 should have value 0.006456 for document

And tuple variable Facility_tpFI in tuple Facility1 should have value No for document

!-- And tuple variable Facility_tpR1 in tuple Facility1 should have value 0.25155853 for document
And tuple variable Facility_tpR2 in tuple Facility1 should have value 0.20689424 for document
!-- And tuple variable Facility_tpR1Guaranteed in tuple Facility1 should have value 0.23758724 for document
And tuple variable Facility_tpR2Guaranteed in tuple Facility1 should have value 0.20689424 for document

And tuple variable Facility_tpRGuaranteed in tuple Facility1 should have value 0.20689424 for document

!-- And tuple variable Facility_tpR in tuple Facility1 should have value 0.15006979 for document
And tuple variable Facility_tpb in tuple Facility1 should have value 0.15583671 for document
And tuple variable Facility_tpbGuaranteed in tuple Facility1 should have value 0.15583671 for document

And tuple variable Facility_tpShortTermException in tuple Facility1 should have value No for document
And tuple variable Facility_tpMWRA in tuple Facility1 should have value 3 for document
And tuple variable Facility_tpDLGDMoCGuaranteed in tuple Facility1 should have value 0.35712 for document
And tuple variable Facility_tpK in tuple Facility1 should have value 0.05327248 for document
And tuple variable Facility_tpKGuaranteed in tuple Facility1 should have value 0.05327248 for document
And tuple variable Facility_tpRW in tuple Facility1 should have value 0.70586036 for document
And tuple variable Facility_tpRWGuaranteed in tuple Facility1 should have value 0.70586036 for document

And tuple variable Facility_tpRWACreditRiskUnguaranteed in tuple Facility1 should have value 70586.03586204001 for document
And tuple variable Facility_tpRWACreditRiskGuaranteed in tuple Facility1 should have value 635274.32275834 for document
And tuple variable Facility_tpRWACreditRisk in tuple Facility1 should have value 705860.35862037 for document

Scenario: [AABP-1205] Calculations on borrower level - X-Sell - 1 item 
 
Given a document of the model type AABPRICING
And a tuple instance Borrower_tpNonCredit1 of definition Borrower_tpNonCredit
And a tuple instance Borrower_tpNonCredit2 of definition Borrower_tpNonCredit

When variable Borrower_tpClientGroup is set to PAR for document
And variable Borrower_tpBookingLocation is set to Netherlands for document
And variable AgreementMaxRemainingTenor is set to 72 for document


And tuple variables in tuple Borrower_tpNonCredit1 are set:
|variable|value|

Borrower_tpNonCredit_tpIncome_IDtotal	               |CA_PAR|
Borrower_tpNonCredit_tpIncome_ID     	               |CA|
Borrower_tpNonCredit_tpIncome_Amount                   |100000|


Then model version should as least be 1.9.16
And variable Borrower_tpCrossSellIncome should have value 100000 for document
And variable Borrower_tpCrossSellIndirectLiquidityCosts should have value 0 for document
And variable Borrower_tpCrossSellDirectLiquidityPremium should have value 0 for document
And variable Borrower_tpCrossSellOperationalCosts should have value 20225 for document
And variable Borrower_tpCrossSellSubordinatedDebtCapitalCharge should have value 125.534475 for document
And variable Borrower_tpCrossSellRWA should have value 86130 for document
And variable Borrower_tpCrossSellRWAOperationalRisk should have value 86130 for document
And variable Borrower_tpEquityRatio should have value 0.10 for document
And variable Borrower_tpCrossSellEquityFundingAdjustment should have value -17.226 for document
And variable Borrower_tpCrossSellInternalExpectedLoss should have value 0 for document
And variable Borrower_tpCrossSellTax should have value 19943.75 for document
And variable Borrower_tpCrossSellRiskAdjustedReturn should have value 59688.489525000005 for document

And variable Borrower_tpCrossSellReturnOnEquity should have value 6.93004639 for document
And variable Borrower_tpCrossSellRequiredAmountOfEquity should have value 8613 for document
And variable Borrower_tpCrossSellOperationalRisk should have value 7050 for document
And variable Borrower_tpCrossSellBusinessRisk should have value 2846 for document
And variable Borrower_tpCrossSellEconomicCapital should have value 9896 for document
And variable Borrower_tpCrossSellRaRoRaC should have value 6.03157736 for document
And variable Borrower_tpCrossSellRegulatoryProfit should have value 58611.864525000005 for document
And variable Borrower_tpCrossSellEquityCapitalCharge should have value 1076.625 for document
And variable Borrower_tpCrossSellEconomicProfit should have value 58471.281525 for document
And variable Borrower_tpCrossSellRWA should have value 86130 for document
And variable Borrower_tpCrossSellRWAOperationalRisk should have value 86130 for document

Scenario: [AABP-1205] Calculations on borrower level - X-Sell - 2 item  - 100k en 300k

Given a document of the model type AABPRICING
And a tuple instance Borrower_tpNonCredit1 of definition Borrower_tpNonCredit
And a tuple instance Borrower_tpNonCredit2 of definition Borrower_tpNonCredit

When variable Borrower_tpClientGroup is set to PAR for document
And variable Borrower_tpBookingLocation is set to Netherlands for document
And variable AgreementMaxRemainingTenor is set to 72 for document


And tuple variables in tuple Borrower_tpNonCredit1 are set:
|variable|value|

Borrower_tpNonCredit_tpIncome_IDtotal	               |CA_PAR|
Borrower_tpNonCredit_tpIncome_ID         		       |CA|
Borrower_tpNonCredit_tpIncome_Amount                   |100000|

And tuple variables in tuple Borrower_tpNonCredit2 are set:
|variable|value|

Borrower_tpNonCredit_tpIncome_IDtotal	               |DG_PAR|
Borrower_tpNonCredit_tpIncome_ID         		       |DG|
Borrower_tpNonCredit_tpIncome_Amount                   |300000|


Then model version should as least be 1.9.16
And variable Borrower_tpCrossSellIncome should have value 400000 for document
And variable Borrower_tpCrossSellIndirectLiquidityCosts should have value 0 for document
And variable Borrower_tpCrossSellDirectLiquidityPremium should have value 0 for document
And variable Borrower_tpCrossSellOperationalCosts should have value 170225 for document
And variable Borrower_tpCrossSellSubordinatedDebtCapitalCharge should have value 502.1379 for document
And variable Borrower_tpCrossSellEquityFundingAdjustment should have value -68.904 for document
And variable Borrower_tpCrossSellInternalExpectedLoss should have value 0 for document
And variable Borrower_tpCrossSellTax should have value 57443.75 for document
And variable Borrower_tpCrossSellRiskAdjustedReturn should have value 171760.20810000002 for document
And variable Borrower_tpCrossSellReturnOnEquity should have value 4.98549309 for document
And variable Borrower_tpCrossSellRequiredAmountOfEquity should have value 34452 for document
And variable Borrower_tpCrossSellRaRoRaC should have value 3.27842966 for document
And variable Borrower_tpCrossSellEconomicCapital should have value 52391 for document
And variable Borrower_tpCrossSellOperationalRisk should have value 28200 for document
And variable Borrower_tpCrossSellBusinessRisk should have value 24191 for document
And variable Borrower_tpCrossSellRegulatoryProfit should have value 167453.70810000002 for document
And variable Borrower_tpCrossSellEquityCapitalCharge should have value 4306.5 for document
And variable Borrower_tpCrossSellEconomicProfit should have value 165316.1151 for document
And variable Borrower_tpCrossSellRWA should have value 344520 for document
And variable Borrower_tpCrossSellRWAOperationalRisk should have value 344520 for document

Scenario: [AABP-1391] Internal Expected Loss is not calculated anymore if there is no Third Party Guarantee
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to PAR for document
And variable Borrower_tpBookingLocation is set to Netherlands for document
And variable AgreementMaxRemainingTenor is set to 72 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 is set to 1000000 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 is set to 5 for document

Then model version should as least be 1.9.16

And tuple variable Facility_tpCreditRiskGuaranteed in tuple Facility1 should have value NA for document
And tuple variable Facility_tpCreditRiskUnguaranteed in tuple Facility1 should have value NA for document
And tuple variable Facility_tpCreditRisk in tuple Facility1 should have value NA for document

Scenario: [AABP-365] Calculations on borrower level - Client (is Credit + X-sell) 
 
Given a document of the model type AABPRICING
And a tuple instance Borrower_tpNonCredit1 of definition Borrower_tpNonCredit

When variable Borrower_tpClientGroup is set to PAR for document
And variable Borrower_tpBookingLocation is set to Netherlands for document
And variable AgreementMaxRemainingTenor is set to 72 for document

And variable Borrower_tpIncome is set to 100000 for document
And variable Borrower_tpIndirectLiquidityCosts is set to 1000 for document
And variable Borrower_tpDirectLiquidityPremium is set to 500 for document
And variable Borrower_tpOperationalCosts is set to 20000 for document
And variable Borrower_tpSubordinatedDebtCapitalCharge is set to 150 for document
And variable Borrower_tpRWA is set to 86130 for document
And variable Borrower_tpRWAOperationalRisk is set to 86130 for document
And variable Borrower_tpEquityRatio is set to 0.12 for document

And variable Borrower_tpEquityFundingAdjustment is set to 10 for document
And variable Borrower_tpInternalExpectedLoss is set to 0 for document
And variable Borrower_tpTax is set to 20000 for document
And variable Borrower_tpRiskAdjustedReturn is set to 60000 for document

And variable Borrower_tpRequiredAmountOfEquity is set to 10000 for document

And variable Borrower_tpEconomicCapital is set to 10000 for document
And variable Borrower_tpOperationalRisk is set to 7000 for document
And variable Borrower_tpBusinessRisk is set to 3000 for document

And variable Borrower_tpEquityCapitalCharge is set to 1100 for document
And variable Borrower_tpRWA is set to 86130 for document
And variable Borrower_tpRWAOperationalRisk is set to 86130 for document


And variable Borrower_tpCrossSellIncome is set to 10000 for document
And variable Borrower_tpCrossSellIndirectLiquidityCosts is set to 0 for document
And variable Borrower_tpCrossSellDirectLiquidityPremium is set to 0 for document
And variable Borrower_tpCrossSellOperationalCosts is set to 2000 for document
And variable Borrower_tpCrossSellSubordinatedDebtCapitalCharge is set to 15 for document
And variable Borrower_tpCrossSellRWA is set to 8613 for document
And variable Borrower_tpCrossSellRWAOperationalRisk is set to 8613 for document
And variable Borrower_tpEquityRatio is set to 0.12 for document

And variable Borrower_tpCrossSellEquityFundingAdjustment is set to 0.9 for document
And variable Borrower_tpCrossSellInternalExpectedLoss is set to 0 for document
And variable Borrower_tpCrossSellTax is set to 2000 for document
And variable Borrower_tpCrossSellRiskAdjustedReturn is set to 6000 for document
And variable Borrower_tpCrossSellRequiredAmountOfEquity is set to 1000 for document
And variable Borrower_tpCrossSellEconomicCapital is set to 1000 for document
And variable Borrower_tpCrossSellOperationalRisk is set to 700 for document
And variable Borrower_tpCrossSellBusinessRisk is set to 300 for document
And variable Borrower_tpCrossSellEquityCapitalCharge is set to 110 for document
And variable Borrower_tpCrossSellEconomicProfit is set to 6000 for document
And variable Borrower_tpCrossSellRWA is set to 8613 for document
And variable Borrower_tpCrossSellRWAOperationalRisk is set to 8613 for document



Then model version should as least be 1.9.40
And variable Borrower_tpReturnOnEquity should have value 6 for document
And variable Borrower_tpRaRoRaC should have value 6 for document
And variable Borrower_tpRegulatoryProfit should have value 58900 for document
And variable Borrower_tpEconomicProfit should have value 58770 for document

And variable Borrower_tpCrossSellReturnOnEquity should have value 6 for document
And variable Borrower_tpCrossSellRaRoRaC should have value 6 for document
And variable Borrower_tpCrossSellRegulatoryProfit should have value 5890 for document
And variable Borrower_tpCrossSellEconomicProfit should have value 6000 for document


And variable Borrower_tpClientIncome should have value 110000 for document
And variable Borrower_tpClientIndirectLiquidityCosts should have value 1000 for document
And variable Borrower_tpClientDirectLiquidityPremium should have value 500 for document
And variable Borrower_tpClientOperationalCosts should have value 22000 for document
And variable Borrower_tpClientSubordinatedDebtCapitalCharge should have value 165 for document
And variable Borrower_tpClientRWA should have value 94743 for document
And variable Borrower_tpClientRWAOperationalRisk should have value 94743 for document
And variable Borrower_tpEquityRatio should have value 0.12 for document

And variable Borrower_tpClientEquityFundingAdjustment should have value 10.9 for document
And variable Borrower_tpClientInternalExpectedLoss should have value 0 for document
And variable Borrower_tpClientTax should have value 22000 for document
And variable Borrower_tpClientRiskAdjustedReturn should have value 66000 for document
And variable Borrower_tpClientReturnOnEquity should have value 6 for document
And variable Borrower_tpClientRequiredAmountOfEquity should have value 11000 for document
And variable Borrower_tpClientRaRoRaC should have value 6 for document
And variable Borrower_tpClientEconomicCapital should have value 11000 for document
And variable Borrower_tpClientOperationalRisk should have value 7700 for document
And variable Borrower_tpClientBusinessRisk should have value 3300 for document
And variable Borrower_tpClientRegulatoryProfit should have value 64790 for document
And variable Borrower_tpClientEquityCapitalCharge should have value 1210 for document
And variable Borrower_tpClientEconomicProfit should have value 64647 for document
And variable Borrower_tpClientRWA should have value 94743 for document
And variable Borrower_tpClientRWAOperationalRisk should have value 94743 for document


Scenario: Agic testen

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When variable Borrower_tpAGICChoice is set to 0517 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

And tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpGuarantorAGICChoice               |0517|

Then variable Borrower_tpRho should have value 0.30904 for document
And tuple variable Facility_tpGuarantorAGIC in tuple Facility1 should have value 0517 for document
And tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpRhoGuarantor in tuple Facility1 should have value 0.30904 for document

Scenario: Outstanding Tijdslijnen Test

Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8301 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4 for document
And variable Borrower_tpPDModel is set to PPRI for document
And variable Borrower_tpAssetSize2 is set to 80000 for document

And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpStartDate                               |2015-01-01|
Facility_tpEndDate                                 |2019-01-01|
Facility_tpPrincipalLimit	          		       |4800000|
Facility_tpType                                    |F2|
Facility_tpProductduration                         |48|
Facility_tpRepaymentFrequency                      |12|
Facility_tpRepaymentChoice                         |2|
Facility_tpWithdrawalChoice                        |0|


Then the document should have 49 columns
And tuple variable Facility_tpWithdrawal in tuple Facility1 should have value 4800000 for forecast column with id 1
And tuple variable Facility_tpWithdrawal in tuple Facility1 should have value NA for forecast column with id 2
And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value 90540.60913910001 for forecast column with id 2
And tuple variable Facility_tpRepaymentAnnuity in tuple Facility1 should have value 90917.86167718 for forecast column with id 3



Scenario: Bug [AABP-99] - [AABP-1526] Automatic Repayment Schemes  - Average Outstanding Balance - Annuity - No Grace - No Balloon - Quarterly

Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-10-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-10-01|
Facility_tpCurrentDate	          		   |2016-09-04|
Facility_tpEndDate	              		   |2019-10-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |8000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |2|
Facility_tpAnnuityInterestRate             |0.04|


Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 3 for forecast column with id 12

And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 6595376.61738406 for forecast column with id 12

!-- Has become obselete, see 9617 - And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 6 decimals rounded value 5874184.134635 for document

Scenario: Bug [AABP-823] RWA Credit Risk with guarantees non financial institution, RWA Calculation AssetSize 7 mio
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8715 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAFI for document
And variable Borrower_tpAssetSize is set to 7 for document


And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpOriginalLimit	          		       |1000000|
Facility_tpType                                    |F1|
Facility_tpDLGDMoC                                 |0.35712|
Facility_tpEADUnguaranteed                         |247250|
Facility_tpEADGuaranteed                           |200000|
Facility_tpRemainingAverageTenor                   |3|
Facility_tpGuarantorAGIC                           |0511|
Facility_tpGuarantorPercentageGuaranteed           |0.9|
Facility_tpGuarantorRating                         |3+|
Facility_tpGuarantorPDModel                        |PAAL|



Then variable Borrower_tpPD should have value 0.006 for document
And variable Borrower_tpPDMoC should have value 0.006456 for document
And tuple variable Facility_tpGuarantorPD in tuple Facility1 should have value 0.0016 for document
And tuple variable Facility_tpGuarantorPDMoC in tuple Facility1 should have value 0.0018432000000000000000001 for document
And tuple variable Facility_tpFI in tuple Facility1 should have value No for document

!-- And tuple variable Facility_tpR1 in tuple Facility1 should have value 0.25155853 for document
And tuple variable Facility_tpR2 in tuple Facility1 should have value 0.16867202 for document
!-- And tuple variable Facility_tpR1Guaranteed in tuple Facility1 should have value 0.23758724 for document
And tuple variable Facility_tpR2Guaranteed in tuple Facility1 should have value 0.19121288 for document
!-- And tuple variable Facility_tpR in tuple Facility1 should have value 0.15006979 for document
And tuple variable Facility_tpb in tuple Facility1 should have value 0.15583671 for document
And tuple variable Facility_tpbGuaranteed in tuple Facility1 should have value 0.21476615000000000002 for document


And tuple variable Facility_tpShortTermException in tuple Facility1 should have value No for document
And tuple variable Facility_tpMWRA in tuple Facility1 should have value 3 for document

Scenario: Bug 50 year [AABP-99] Automatic Repayment Schemes  - Average Remaining Tenor - Monthly - Linear


Given a document of the model type AABPRICING
And 602 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2065-01-01|
Facility_tpProductduration                 |600|
Facility_tpRepaymentFrequency              |12|
Facility_tpPrincipalLimit                  |12000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|


Then tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 12 for forecast column with id 13
And tuple variable Facility_tpHulpVarRepayment in tuple Facility1 should have value 18 for forecast column with id 19

And tuple variable Facility_tpWithdrawal in tuple Facility1 should have value NA for forecast column with id 12
And tuple variable Facility_tpRepayment in tuple Facility1 should have value 20000.0 for forecast column with id 13
And tuple variable Facility_tpRepayment in tuple Facility1 should have value 20000.0 for forecast column with id 19
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 11760000.0 for forecast column with id 13
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 11640000.0 for forecast column with id 19
And tuple variable Facility_tpWithdrawal in tuple Facility1 should have value NA for forecast column with id 12
And tuple variable Facility_tpRepayment in tuple Facility1 should have value 20000.0 for forecast column with id 13
And tuple variable Facility_tpRepayment in tuple Facility1 should have value 20000.0 for forecast column with id 19
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 11760000.0 for forecast column with id 13
And tuple variable Facility_tpOutstandingBalance in tuple Facility1 should have value 11640000.0 for forecast column with id 19

And tuple variable Facility_tpWeightedAmountRepaymentRem in tuple Facility1 should have value 0 for forecast column with start date 2016-01-01
And tuple variable Facility_tpWeightedAmountRepaymentRem in tuple Facility1 should have value 120000.0 for forecast column with start date 2016-07-01
!-- Has become obselete, see 9617 - And tuple variable Facility_tpWeightedAmountRepaymentRem in tuple Facility1 should have value 11760000 for forecast column with start date 2065-01-01

And tuple variable Facility_tpHulpVarRemainingWeighted in tuple Facility1 should have value 1 for forecast column with id 13
And tuple variable Facility_tpWeightedAmountRepaymentRem in tuple Facility1 should have value 20000.0 for forecast column with id 14
!-- Has become obselete, see 9617 - And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 24.5 for document


!-- hij blijft de current date aanhouden en niet de voorgeprogrammeerde StartDate!!


Scenario: [AABP-1446] EC Business Risk
 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8715 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAFI for document
And variable Borrower_tpAssetSize is set to 70 for document
And variable Borrower_tpConfidenceLevel is set to 0.9995 for document

And variable Borrower_tpConfidenceLevel is set to 0.9995 for document


And tuple variables in tuple Facility1 are set:
|variable|value|

Facility_tpOriginalLimit	          		       |1000000|
Facility_tpCreditIncome                            |110000|
Facility_tpDirectLiquidityPremium                  |10000|
Facility_tpType                                    |F1|
Facility_tpLGDMoC                                  |0.34|
Facility_tpDLGDMoC                                 |0.35712|
Facility_tpEADUnguaranteed                         |100000|
Facility_tpEADGuaranteed                           |900000|
Facility_tpRemainingAverageTenor                   |3|
Facility_tpExpectedAverageOutstanding              |10000000|
Facility_tpLiquiditySpreadBps                      |10|



Then variable Borrower_tpARCAddOn should have value 1 for document
And variable AgreementDiversificationBR should have value 1 for document
And tuple variable Facility_tpBREC in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpCreditIncome in tuple Facility1 should have value 110000 for document
And tuple variable Facility_tpBRCreditRisk in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpBusinessRisk in tuple Facility1 should have value 0 for document

Scenario: Bug [AABP-654] Utilisation Fee - Limit - F2-Linear - ROS-Linear - F1


Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
And a tuple instance Facility3 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|

Facility_tpType                            |F2|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentChoice                 |1|
Facility_tpRepaymentFrequency              |1|
Facility_tpPrincipalLimit                  |12000000|
Facility_tpWithdrawalChoice                |0|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|


When tuple variables in tuple Facility2 are set:  
|variable|value|

Facility_tpType                            |ROS|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentChoice                 |0|
Facility_tpWithdrawalChoice                |2|
Facility_tpPrincipalLimit                  |10000000|
Facility_tpExpectedAverageOutstanding      |8000000|
Facility_tpUtilisationFeeBpLimit1Bp        |10|
Facility_tpUtilisationFeeBpLimit2Bp        |20|
Facility_tpUtilisationFeeBpLimit3Bp        |40|
Facility_tpUtilisationFeeBpLimit4Bp        |80|
Facility_tpDeannualize                     |1|


When tuple variables in tuple Facility3 are set:  
|variable|value|

Facility_tpType                            |F1|
Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |2016-01-01|
Facility_tpEndDate                         |2019-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentChoice                 |0|
Facility_tpWithdrawalChoice                |2|
Facility_tpPrincipalLimit                  |10000000|
Facility_tpExpectedAverageOutstanding      |8000000|
Facility_tpUtilisationFeeBpLimit1Bp        |10|
Facility_tpUtilisationFeeBpLimit2Bp        |20|
Facility_tpUtilisationFeeBpLimit3Bp        |40|
Facility_tpUtilisationFeeBpLimit4Bp        |80|
Facility_tpDeannualize                     |1|

Then tuple variable Facility_tpOriginalTenor in tuple Facility1 should have value 48 for document
And tuple variable Facility_tpRepaymentFrequency in tuple Facility1 should have value YEARLY for document
And tuple variable Facility_tpStartDate in tuple Facility1 should have value 42005 for document

And tuple variable Facility_tpLimit in tuple Facility1 should have value 9000000 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 9000000 for document
And tuple variable Facility_tpUtilisationfee in tuple Facility1 should have value 0 for document

And tuple variable Facility_tpLimit in tuple Facility2 should have value 10000000 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility2 should have value 8000000 for document
And tuple variable Facility_tpUtilisationFeeBp in tuple Facility2 should have value 150 for document
And tuple variable Facility_tpUtilisationfee in tuple Facility2 should have value 120000 for document

And tuple variable Facility_tpLimit in tuple Facility3 should have value 10000000 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility3 should have value 8000000 for document
And tuple variable Facility_tpUtilisationFeeBp in tuple Facility3 should have value 150 for document
And tuple variable Facility_tpUtilisationfee in tuple Facility3 should have value 120000 for document

Scenario: [AABP-1697] Interpolation EC mulitplier
Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
And a tuple instance Facility3 of definition Facility

When variable Borrower_tpRating is set to 4+ for document

And tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpLGD                                   |0.3010|
Facility_tpLGDMoC                                |0.4060|
Facility_tpRemainingAverageTenor                 |3.2|
Facility_tpGuarantorRating                       |4+|

And tuple variables in tuple Facility2 are set:
|variable|value|
Facility_tpLGD                                   |0.3010|
Facility_tpLGDMoC                                |0.4060|
Facility_tpRemainingAverageTenor                 |0.3|
Facility_tpGuarantorRating                       |4+|

And tuple variables in tuple Facility3 are set:
|variable|value|
Facility_tpLGD                                   |0.3010|
Facility_tpLGDMoC                                |0.4060|
Facility_tpRemainingAverageTenor                 |17.1|
Facility_tpGuarantorRating                       |4+|


Then tuple variable Facility_tpECMultiplierTenorLowerBound in tuple Facility1 should have value 4 for document
And tuple variable Facility_tpECMultiplierTenorUpperBound in tuple Facility1 should have value 5 for document
And tuple variable Facility_tpECMultiplierLowerBound in tuple Facility1 should have value 1.16 for document
And tuple variable Facility_tpECMultiplierUpperBound in tuple Facility1 should have value 1.35 for document
And tuple variable Facility_tpECMultiplier in tuple Facility1 should have value 1.198 for document

Then tuple variable Facility_tpECMultiplierTenorLowerBound in tuple Facility2 should have value 1 for document
And tuple variable Facility_tpECMultiplierTenorUpperBound in tuple Facility2 should have value 1 for document
And tuple variable Facility_tpECMultiplierLowerBound in tuple Facility2 should have value 1 for document
And tuple variable Facility_tpECMultiplierUpperBound in tuple Facility2 should have value 1 for document
And tuple variable Facility_tpECMultiplier in tuple Facility2 should have value 1 for document

Then tuple variable Facility_tpECMultiplierTenorLowerBound in tuple Facility3 should have value 16 for document
And tuple variable Facility_tpECMultiplierTenorUpperBound in tuple Facility3 should have value 16 for document
And tuple variable Facility_tpECMultiplierLowerBound in tuple Facility3 should have value 2.11 for document
And tuple variable Facility_tpECMultiplierUpperBound in tuple Facility3 should have value 2.11 for document
And tuple variable Facility_tpECMultiplier in tuple Facility3 should have value 2.11 for document


And tuple variable Facility_tpECMultiplierLowerBoundGuarantor in tuple Facility1 should have value 1.16 for document
And tuple variable Facility_tpECMultiplierUpperBoundGuarantor in tuple Facility1 should have value 1.35 for document
And tuple variable Facility_tpECMultiplierGuarantor in tuple Facility1 should have value 1.198 for document

Scenario: [AABP-341] KPI's under 1 year - PD under 1 year
Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
And a tuple instance Facility3 of definition Facility

When variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpAGICChoice is set to 8715 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpRating is set to 4+ for document
And variable Borrower_tpPDModel is set to PAFI for document
And variable Borrower_tpAssetSize is set to 70 for document
And variable Borrower_tpConfidenceLevel is set to 0.9995 for document


And tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpLGD                                   |0.3010|
Facility_tpLGDMoC                                |0.4060|
Facility_tpRemainingTenor                        |38|
Facility_tpGuarantorRating                       |4+|

And tuple variables in tuple Facility2 are set:
|variable|value|
Facility_tpLGD                                   |0.3010|
Facility_tpLGDMoC                                |0.4060|
Facility_tpRemainingTenor                        |6|
Facility_tpGuarantorRating                       |4+|

And tuple variables in tuple Facility3 are set:
|variable|value|
Facility_tpLGD                                   |0.3010|
Facility_tpLGDMoC                                |0.4060|
Facility_tpRemainingTenor                        |240|
Facility_tpGuarantorRating                       |4+|


Then variable Borrower_tpPD should have value 0.006 for document
And variable Borrower_tpPDMoC should have value 0.006456 for document
And variable Borrower_tpRiskWeight should have value 0.24665978 for document


And tuple variable Facility_tpPDMultiplierUnder1Year in tuple Facility1 should have value 1 for document
And tuple variable Facility_tpBorrower_tpPD in tuple Facility1 should have value 0.006 for document
And tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 should have value 0.006456 for document
And tuple variable Facility_tpBorrower_tpRiskWeight in tuple Facility1 should have value 0.24665978 for document


And tuple variable Facility_tpPDMultiplierUnder1Year in tuple Facility2 should have value 0.5 for document
And tuple variable Facility_tpBorrower_tpPD in tuple Facility2 should have value 0.003 for document
And tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility2 should have value 0.003228 for document
And tuple variable Facility_tpBorrower_tpRiskWeight in tuple Facility2 should have value 0.16394138 for document

And tuple variable Facility_tpPDMultiplierUnder1Year in tuple Facility3 should have value 1 for document
And tuple variable Facility_tpBorrower_tpPD in tuple Facility3 should have value 0.006 for document
And tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility3 should have value 0.006456 for document
And tuple variable Facility_tpBorrower_tpRiskWeight in tuple Facility1 should have value 0.24665978 for document

Scenario:  [AABF- 6181] - Pricing Service - Afkorting naar ProductName

Given a document of the model type AABPRICING

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                            |F2|

Then tuple variable Facility_tpProductname in tuple Facility1 should have value Term Loan for document

Scenario: [AABF-6751] Automatic Repayment Schemes  - Average Outstanding - Linear - 14m Grace - No Balloon - Quaterly
Given a document of the model type AABPRICING
And 121 month based forecast columns starting from 2017-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2018-03-01|
Facility_tpEndDate                         |2021-01-01|
Facility_tpProductduration                 |48|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |20000000|
Facility_tpGracePeriod                     |14|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|


!-- Has become obselete, see 9617 - Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 17500000 for document
Then tuple variable Facility_tpLimit in tuple Facility1 should have value 17500000 for document


Scenario: Regression [AABF-6751] Manual Repayment Schemes  - Scheme/Scheme OAT
Given a document of the model type AABPRICING
!-- And 121 month based forecast columns starting from 2017-01-01

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
Facility_tpType                            |F2|
Facility_tpStartDate                       |2017-01-01|
Facility_tpCurrentDate	          		   |2017-01-01|
Facility_tpEndDate                         |2022-01-01|
Facility_tpProductduration                 |60|
Facility_tpPrincipalLimit                  |50000000|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |3|
Facility_tpRevolvingCredit                 |0|


!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 10000000 for forecast column with start date 2017-01-01
And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-01-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 10000000 for forecast column with start date 2017-04-01
And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-04-01|
Facility_tpManual_tpWithdrawalAmount       |10000000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 5000000 for forecast column with start date 2017-07-01
And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-07-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 5000000 for forecast column with start date 2017-10-01
And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-10-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 5000000 for forecast column with start date 2018-01-01
And tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-01-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 5000000 for forecast column with start date 2018-04-01
And tuple variables in tuple Withdrawal6 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-04-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 5000000 for forecast column with start date 2018-07-01
And tuple variables in tuple Withdrawal7 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-07-01|
Facility_tpManual_tpWithdrawalAmount       |5000000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 1500000 for forecast column with start date 2019-06-01
And tuple variables in tuple Withdrawal8 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-06-01|
Facility_tpManual_tpWithdrawalAmount       |1500000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 1500000 for forecast column with start date 2019-10-01
And tuple variables in tuple Withdrawal9 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-10-01|
Facility_tpManual_tpWithdrawalAmount       |1500000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 1000000 for forecast column with start date 2020-07-01
And tuple variables in tuple Withdrawal10 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-07-01|
Facility_tpManual_tpWithdrawalAmount       |1000000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 1000000 for forecast column with start date 2021-04-01
And tuple variables in tuple Withdrawal11 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-04-01|
Facility_tpManual_tpWithdrawalAmount       |1000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 2500000 for forecast column with end date 2017-06-30
And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-06-30|
Facility_tpManual_tpRepaymentAmount        |2500000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 2500000 for forecast column with end date 2017-12-31
And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-12-31|
Facility_tpManual_tpRepaymentAmount        |2500000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 2500000 for forecast column with end date 2019-06-30
And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-06-30|
Facility_tpManual_tpRepaymentAmount        |2500000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 2500000 for forecast column with end date 2019-12-31
And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-12-31|
Facility_tpManual_tpRepaymentAmount        |2500000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2020-03-31
And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-03-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2020-06-30
And tuple variables in tuple Repayment6 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-06-30|
Facility_tpManual_tpRepaymentAmount        |5000000|


!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2020-09-30
And tuple variables in tuple Repayment7 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-09-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2020-12-31
And tuple variables in tuple Repayment8 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2021-03-31
And tuple variables in tuple Repayment9 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-03-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2021-06-30
And tuple variables in tuple Repayment10 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-06-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2021-09-30
And tuple variables in tuple Repayment11 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-09-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2021-12-31
And tuple variables in tuple Repayment12 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

Then tuple variable Facility_tpOriginalAverageTenorScheme in tuple Facility1 should have value 3.65 for document
!-- Has become obselete, see 9617 -  And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 27066666.66666667 for document
!-- And tuple variable Facility_tpLimit in tuple Facility1 should have value 39166666.66666667 for document

Scenario: Regression [AABF-6751] Manual Repayment Schemes  - Scheme/Scheme RAT
Given a document of the model type AABPRICING
!-- And 121 month based forecast columns starting from 2017-01-01

And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal8 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal9 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal10 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal11 of definition Facility_tpManual in tuple Facility1

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
Facility_tpType                            |F2|
Facility_tpStartDate                       |2019-06-01|
Facility_tpCurrentDate	          		   |2019-06-05|
Facility_tpEndDate                         |2022-01-01|
Facility_tpProductduration                 |31|
Facility_tpPrincipalLimit                  |50000000|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |3|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 1500000 for forecast column with start date 2019-06-01
And tuple variables in tuple Withdrawal8 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-06-01|
Facility_tpManual_tpWithdrawalAmount       |1500000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 1500000 for forecast column with start date 2019-10-01
And tuple variables in tuple Withdrawal9 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-10-01|
Facility_tpManual_tpWithdrawalAmount       |1500000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 1000000 for forecast column with start date 2020-07-01
And tuple variables in tuple Withdrawal10 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-07-01|
Facility_tpManual_tpWithdrawalAmount       |1000000|

!-- And tuple variable Facility_tpWithdrawal in tuple Facility1 is set to 1000000 for forecast column with start date 2021-04-01
And tuple variables in tuple Withdrawal11 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-04-01|
Facility_tpManual_tpWithdrawalAmount       |1000000|



!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 2500000 for forecast column with end date 2019-06-30
And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-06-30|
Facility_tpManual_tpRepaymentAmount        |2500000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 2500000 for forecast column with end date 2019-12-31
And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2019-12-31|
Facility_tpManual_tpRepaymentAmount        |2500000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2020-03-31
And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-03-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2020-06-30
And tuple variables in tuple Repayment6 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-06-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2020-09-30
And tuple variables in tuple Repayment7 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-09-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2020-12-31
And tuple variables in tuple Repayment8 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2020-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2021-03-31
And tuple variables in tuple Repayment9 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-03-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2021-06-30
And tuple variables in tuple Repayment10 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-06-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2021-09-30
And tuple variables in tuple Repayment11 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-09-30|
Facility_tpManual_tpRepaymentAmount        |5000000|

!-- And tuple variable Facility_tpRepaymentsAmount in tuple Facility1 is set to 5000000 for forecast column with end date 2021-12-31
And tuple variables in tuple Repayment12 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-12-31|
Facility_tpManual_tpRepaymentAmount        |5000000|

Then tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have value 1.55555556 for document


Scenario: [AABF-7651] Current Date before Start Date
Given a document of the model type AABPRICING
And 61 month based forecast columns starting from 2017-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2017-03-01|
Facility_tpCurrentDate	          		   |2017-01-01|
Facility_tpEndDate                         |2022-01-01|
Facility_tpProductduration                 |60|
Facility_tpPrincipalLimit                  |50000000|

Then tuple variable Facility_tpHulpVarWeightOfRepaymentRemaining in tuple Facility1 should have value 0 for forecast column with id 3
And tuple variable Facility_tpHulpVarWeightOfRepaymentRemaining in tuple Facility1 should have value NA for forecast column with id 1

Scenario: [AABF-7659] Remaining Tenor should change
Given a document of the model type AABPRICING
And 61 month based forecast columns starting from 2017-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpType                            |ROS|
Facility_tpStartDate                       |2016-03-01|
Facility_tpCurrentDate	          		   |2016-02-01|
Facility_tpEndDate                         |2018-06-01|
Facility_tpProductduration                 |27|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |20000000|
Facility_tpGracePeriod                     |14|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |1|

Then tuple variable Facility_tpRemainingTenor in tuple Facility1 should have value 27 for document

When tuple variables in tuple Facility1 are set:
|variable|value| 
Facility_tpCurrentDate	          		   |2016-10-01|

Then tuple variable Facility_tpRemainingTenor in tuple Facility1 should have value 20 for document

Scenario: [AABF-8169] Expected Outstanding Average if Revolving - F2
Given a document of the model type AABPRICING
And 61 month based forecast columns starting from 2016-03-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpType                            |F2|
Facility_tpStartDate                       |2016-03-01|
Facility_tpCurrentDate	          		   |2016-02-01|
Facility_tpEndDate                         |2018-03-01|
Facility_tpProductduration                 |24|
Facility_tpRepaymentFrequency              |4|
Facility_tpPrincipalLimit                  |24000000|
Facility_tpGracePeriod                     |0|
Facility_tpBalloon                         |0|
Facility_tpWithdrawalChoice                |0|
Facility_tpRepaymentChoice                 |4|
Facility_tpRevolvingCredit                 |0|
Facility_tpProductWithdrawalDetailsPercentageUsedOfLimit |0.5|

Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 1 decimals rounded value 12000000 for document

Scenario: [AABF-9525] Insert default values in pricing calculation

Given a document of the model type AABPRICING
And 3 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility

Then tuple variable Facility_tpCommitmentFeeBp in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpCreditFeeBp in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpOneOffFeeAmount in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpUtilisationFeeBp in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpUncommitted2 in tuple Facility1 should have value No for document
And tuple variable Facility_tpAnnuityInterestRate in tuple Facility1 should have value 0.05 for document
And tuple variable Facility_tpCustomerSpread2 in tuple Facility1 should have value NA for document
And tuple variable Facility_tpLGD in tuple Facility1 should have value NA for document
And tuple variable Facility_tpLGDMoC in tuple Facility1 should have value NA for document
And tuple variable Facility_tpDLGDMoC in tuple Facility1 should have value NA for document
And variable Borrower_tpClientGroup should have value CR3 for document
And variable Borrower_tpBaseCurrency should have value EUR for document
And variable Borrower_tpUnderSupervision should have value No for document
And variable Borrower_tpBookingLocationChoice should have value Netherlands for document
And variable Borrower_tpAssetSize2 should have value 2 for document
