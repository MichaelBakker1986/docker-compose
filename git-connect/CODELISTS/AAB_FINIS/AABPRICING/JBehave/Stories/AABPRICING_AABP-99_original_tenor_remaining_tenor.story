AAB Pricing story AABP-99 [Automatisch] The automatic production of Repayment and Withdrawal schemes per product.
@Author Luuk Peters & Ruben Bos
@themes Original Tenor & Remaining Tenor

Scenario: [AABP-99] Automatic Repayment Schemes  - Original Tenor


Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-06-01|
Facility_tpEndDate	          		       |2016-06-01|


Then tuple variable Facility_tpOriginalTenor in tuple Facility1 should have value 12 for document

Scenario: [AABP-99] Automatic Repayment Schemes  - Remaining Tenor


Given a document of the model type AABPRICING
And 48 month based forecast columns starting from 2015-01-01
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpStartDate                       |2015-06-01|
Facility_tpCurrentDate                     |2016-01-01|
Facility_tpEndDate	          		       |2016-06-01|

Then tuple variable Facility_tpRemainingTenor in tuple Facility1 should have value 5 for document

