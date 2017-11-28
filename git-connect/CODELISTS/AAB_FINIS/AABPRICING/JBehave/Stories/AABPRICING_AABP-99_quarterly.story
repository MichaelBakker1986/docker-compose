AAB Pricing story AABP-99
@Author Luuk Peters & Ruben Bos
@themes Repayment Annuity Tenor  - Quarterly 

Scenario: [AABP-99] Automatic Repayment Schemes  - Repayment Annuity Tenor  - Quarterly 


Given a document of the model type AABPRICING
And 49 month based forecast columns starting from 2015-01-01

And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|

Facility_tpStartDate                       |2015-01-01|
Facility_tpCurrentDate	          		   |42370|
Facility_tpEndDate                         |43466|
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
Then tuple variable Facility_tpStartDate in tuple Facility1 should have value 42005 for document

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

