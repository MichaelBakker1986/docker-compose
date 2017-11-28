AAB Pricing story
@Author Sam
@themes OAT, RAT, Exp Avg Outstanding Linear and Annuity

Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT - Linear <10 (4)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2016-06-01|
Facility_tpEndDate                      	   |2020-06-01|
Facility_tpAnnuityInterestRate	               |0.06|
Facility_tpProductduration 					   |48|
Facility_tpPrincipalLimit					   |8000000|
Facility_tpRepaymentFrequency                  |4|
Facility_tpRepaymentChoice                     |1|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpLinear in tuple Facility1 should have 4 decimals rounded value 500000 for document
And tuple variable Facility_tpAnnuityPPMTRATTotalPeriods in tuple Facility1 should have value 16 for document

And tuple variable Facility_tpLinearOATHelpVarWeightSumWithGrace in tuple Facility1 should have value 204000000 for document
And tuple variable Facility_tpLinearOATHelpVarWeightSumGrace in tuple Facility1 should have value 204000000 for document
And tuple variable Facility_tpOriginalTenor in tuple Facility1 should have value 48 for document
And tuple variable Facility_tpLinearOATHelpVar in tuple Facility1 should have value 0.53125 for document
And tuple variable Facility_tpLinearOAT in tuple Facility1 should have value 2.125 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have 3 decimals rounded value 2.125 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT - Linear <10 (4)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2018-12-01|
Facility_tpEndDate                      	   |2020-06-01|
Facility_tpAnnuityInterestRate	               |0.06|
Facility_tpProductduration 					   |48|
Facility_tpPrincipalLimit					   |8000000|
Facility_tpRepaymentFrequency                  |4|
Facility_tpRepaymentChoice                     |1|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpLinear in tuple Facility1 should have 4 decimals rounded value 500000 for document

And tuple variable Facility_tpLinearRATHelpVarWeightSumWithGrace in tuple Facility1 should have value 31500000 for document

And tuple variable Facility_tpLinearRATHelpVarSumRepayment in tuple Facility1 should have value 3000000 for document
And tuple variable Facility_tpLinearRAT in tuple Facility1 should have value 0.875 for document

And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 3 decimals rounded value 0.875 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT - Annuity <10 (4)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2016-06-01|
Facility_tpEndDate                      	   |2020-06-01|
Facility_tpAnnuityInterestRate	               |0.06|
Facility_tpProductduration 					   |48|
Facility_tpPrincipalLimit					   |8000000|
Facility_tpRepaymentFrequency                  |4|
Facility_tpRepaymentChoice                     |2|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityOAT in tuple Facility1 should have 4 decimals rounded value 2.2040 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have 4 decimals rounded value 2.2040 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT - Annuity <10 (4)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2018-12-01|
Facility_tpEndDate                      	   |2020-06-01|
Facility_tpAnnuityInterestRate	               |0.06|
Facility_tpProductduration 					   |48|
Facility_tpPrincipalLimit					   |8000000|
Facility_tpRepaymentFrequency                  |4|
Facility_tpWithdrawalChoice                    |0|
Facility_tpRepaymentChoice                     |2|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityRepaymentAmount in tuple Facility1 should have 4 decimals rounded value 517741.1955 for document
Then tuple variable Facility_tpAnnuityRAT in tuple Facility1 should have 4 decimals rounded value 0.8859 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 4 decimals rounded value 0.8859 for document
And tuple variable Facility_tpPeriodDifferenceGrace in tuple Facility1 should have 2 decimals rounded value 0 for document
And tuple variable Facility_tpEAORepaymentAnnuity in tuple Facility1 should have 2 decimals rounded value 22236447.55  for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 2440888.11 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT - Annuity <10 (4)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-07-01|
Facility_tpCurrentDate	          			   |2019-01-01|
Facility_tpEndDate                      	   |2020-07-01|
Facility_tpAnnuityInterestRate	               |0.06|
Facility_tpProductduration 					   |48|
Facility_tpPrincipalLimit					   |8000000|
Facility_tpRepaymentFrequency                  |4|
Facility_tpWithdrawalChoice                    |0|
Facility_tpRepaymentChoice                     |2|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityRATHelpVarWeightSumWithGrace in tuple Facility1 should have 2 decimals rounded value 34285718.08 for document
And tuple variable Facility_tpAnnuityRAT in tuple Facility1 should have 4 decimals rounded value 0.8859 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 4 decimals rounded value 0.8859 for document
And tuple variable Facility_tpPeriodDifferenceGrace in tuple Facility1 should have 2 decimals rounded value 0 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 2440888.11  for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT - Annuity <10 (4)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-07-01|
Facility_tpCurrentDate	          			   |2016-07-01|
Facility_tpEndDate                      	   |2020-07-01|
Facility_tpAnnuityInterestRate	               |0.06|
Facility_tpProductduration 					   |48|
Facility_tpPrincipalLimit					   |8000000|
Facility_tpRepaymentFrequency                  |4|
Facility_tpWithdrawalChoice                    |0|
Facility_tpRepaymentChoice                     |2|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityOutstandingWithdrawalSum in tuple Facility1 should have 2 decimals rounded value 32000000  for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 7324102.16  for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - EAO - Annuity <10 (4)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2018-12-10|
Facility_tpEndDate                      	   |2020-06-01|
Facility_tpAnnuityInterestRate	               |0.06|
Facility_tpProductduration 					   |48|
Facility_tpPrincipalLimit					   |8000000|
Facility_tpRepaymentFrequency                  |4|
Facility_tpWithdrawalChoice                    |0|
Facility_tpRepaymentChoice                     |2|

Then tuple variable Facility_tpAnnuityOutstandingPointInTime in tuple Facility1 should have 2 decimals rounded value 3225295.15 for document
And tuple variable Facility_tpAnnuityOutstandingWithdrawalSum in tuple Facility1 should have 2 decimals rounded value 32000000.00  for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 2440888.11 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT- Linear >10
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2016-06-01|
Facility_tpEndDate                      	   |2036-06-01|
Facility_tpAnnuityInterestRate	               |0.015|
Facility_tpProductduration 					   |240|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpLinear in tuple Facility1 should have 4 decimals rounded value 2500000 for document
And tuple variable Facility_tpAnnuityPPMTRATTotalPeriods in tuple Facility1 should have value 20 for document

And tuple variable Facility_tpLinearOATHelpVarWeightSumWithGrace in tuple Facility1 should have value 6300000000 for document
And tuple variable Facility_tpLinearOATHelpVarWeightSumGrace in tuple Facility1 should have value 6300000000 for document
And tuple variable Facility_tpOriginalTenor in tuple Facility1 should have value 240 for document
And tuple variable Facility_tpLinearOATHelpVar in tuple Facility1 should have value 0.525 for document
And tuple variable Facility_tpLinearOAT in tuple Facility1 should have value 10.5 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have 1 decimals rounded value 10.5 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT - Linear >10
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2030-08-10|
Facility_tpEndDate                      	   |2035-09-01|
Facility_tpAnnuityInterestRate	               |0.015|
Facility_tpProductduration 					   |240|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |0|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpLinear in tuple Facility1 should have 4 decimals rounded value 2500000 for document
And tuple variable Facility_tpLinearRATHelpVarWeightSumWithGrace in tuple Facility1 should have value 630000000 for document
And tuple variable Facility_tpLinearRATHelpVarSumRepayment in tuple Facility1 should have value 15000000 for document
And tuple variable Facility_tpLinearRAT in tuple Facility1 should have value 3.5 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 1 decimals rounded value 3.5 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - EAO - Linear >10
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2030-08-10|
Facility_tpEndDate                      	   |2035-09-01|
Facility_tpAnnuityInterestRate	               |0.015|
Facility_tpProductduration 					   |240|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |0|

Then tuple variable Facility_tpLinear in tuple Facility1 should have value 2500000 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 0 decimals rounded value 15000000 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT With Grace No Balloon - Linear <10
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpEndDate                      	   |2019-06-01|
Facility_tpAnnuityInterestRate	               |0.015|
Facility_tpProductduration 					   |36|
Facility_tpPrincipalLimit					   |15000000|
Facility_tpRepaymentFrequency                  |2|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |6|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpLinear in tuple Facility1 should have 4 decimals rounded value 3000000 for document
And tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 5 for document
And tuple variable Facility_tpLinearOATHelpVarWeightSumWithGrace in tuple Facility1 should have value 360000000 for document
!-- And tuple variable Facility_tpLinearOATHelpVarWeightSumGrace in tuple Facility1 should have value 360000000 for document
And tuple variable Facility_tpLinearOATHelpVar in tuple Facility1 should have value 0.66666667 for document
And tuple variable Facility_tpLinearOAT in tuple Facility1 should have value 2 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have 0 decimals rounded value 2 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT With Grace No Balloon - Linear <10
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2018-06-10|
Facility_tpEndDate                      	   |2019-06-01|
Facility_tpAnnuityInterestRate	               |0.015|
Facility_tpProductduration 					   |36|
Facility_tpPrincipalLimit					   |15000000|
Facility_tpRepaymentFrequency                  |2|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |6|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 2 decimals rounded value 0.75 for document
And tuple variable Facility_tpLinearOutstandingWithdrawalSum in tuple Facility1 should have 0 decimals rounded value 30000000 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 0 decimals rounded value 4500000 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT With Grace No Balloon - Linear >10
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpEndDate                      	   |2041-06-01|
Facility_tpAnnuityInterestRate	               |0.015|
Facility_tpProductduration 					   |300|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |24|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpLinear in tuple Facility1 should have 2 decimals rounded value 2173913.04 for document
And tuple variable Facility_tpNumberOfPeriods in tuple Facility1 should have value 23 for document
And tuple variable Facility_tpLinearOATHelpVarWeightSumWithGrace in tuple Facility1 should have 0 decimals rounded value 8400000000 for document
!-- And tuple variable Facility_tpLinearOATHelpVarWeightSumGrace in tuple Facility1 should have 2 decimals rounded value 8400000000 for document
And tuple variable Facility_tpLinearOATHelpVar in tuple Facility1 should have value 0.56 for document
And tuple variable Facility_tpLinearOAT in tuple Facility1 should have value 14 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have 0 decimals rounded value 14 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT With Grace No Balloon - Linear >10
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2029-11-15|
Facility_tpEndDate                      	   |2041-06-01|
Facility_tpAnnuityInterestRate	               |0.015|
Facility_tpProductduration 					   |300|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |24|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpLinear in tuple Facility1 should have 2 decimals rounded value 2173913.04 for document
And tuple variable Facility_tpAnnuityPPMTRATTotalPeriods in tuple Facility1 should have 0 decimals rounded value 12 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 1 decimals rounded value 6.5 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT Annuity With Grace No Balloon <10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpEndDate                      	   |2021-06-01|
Facility_tpAnnuityInterestRate	               |0.04|
Facility_tpProductduration 					   |60|
Facility_tpPrincipalLimit					   |10000000|
Facility_tpRepaymentFrequency                  |2|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |18|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityOATHelpVarWeightSumWithGrace in tuple Facility1 should have 4 decimals rounded value 424751078.1651 for document
And tuple variable Facility_tpPrincipalLimit in tuple Facility1 should have 4 decimals rounded value 10000000 for document
And tuple variable Facility_tpOriginalTenor in tuple Facility1 should have 4 decimals rounded value 60 for document
And tuple variable Facility_tpAnnuityOATHelpVar in tuple Facility1 should have 4 decimals rounded value 0.7079 for document
And tuple variable Facility_tpAnnuityOAT in tuple Facility1 should have 4 decimals rounded value 3.5396 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have 4 decimals rounded value 3.5396 for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT Annuity With Grace No Balloon <10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2016-06-01|
Facility_tpEndDate                      	   |2021-06-01|
Facility_tpAnnuityInterestRate	               |0.04|
Facility_tpProductduration 					   |60|
Facility_tpPrincipalLimit					   |10000000|
Facility_tpRepaymentFrequency                  |2|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |18|
Facility_tpRevolvingCredit                     |0|


Then tuple variable Facility_tpAnnuityRATHelpVarSumRepayment in tuple Facility1 should have 2 decimals rounded value 10000000 for document
Then tuple variable Facility_tpAnnuityRATHelpVarWeightSumWithGrace in tuple Facility1 should have 4 decimals rounded value 424751078.1651 for document
Then tuple variable Facility_tpAnnuityRAT in tuple Facility1 should have 2 decimals rounded value 3.54 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 2 decimals rounded value 3.54 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 1 decimals rounded value 10000000 for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT Annuity With Grace No Balloon <10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2020-12-01|
Facility_tpEndDate                      	   |2021-06-01|
Facility_tpAnnuityInterestRate	               |0.04|
Facility_tpProductduration 					   |60|
Facility_tpPrincipalLimit					   |10000000|
Facility_tpRepaymentFrequency                  |2|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |18|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpPeriodDifferenceGrace in tuple Facility1 should have 2 decimals rounded value 3 for document
Then tuple variable Facility_tpAnnuityMonthsSinceCurrentDate in tuple Facility1 should have 0 decimals rounded value 9 for document
Then tuple variable Facility_tpAnnuityRATHelpVarWeightSumWithGrace in tuple Facility1 should have 2 decimals rounded value 9088938.59 for document
And tuple variable Facility_tpAnnuityRAT in tuple Facility1 should have 2 decimals rounded value 0.5 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 1 decimals rounded value 0.5 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 1 decimals rounded value 1514823.1 for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT Annuity >10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpEndDate                      	   |2029-06-01|
Facility_tpAnnuityInterestRate	               |0.05|
Facility_tpProductduration 					   |156|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityOATHelpVarWeightSumWithGrace in tuple Facility1 should have 0 decimals rounded value 4607099366 for document
And tuple variable Facility_tpPrincipalLimit in tuple Facility1 should have 4 decimals rounded value 50000000 for document
And tuple variable Facility_tpOriginalTenor in tuple Facility1 should have 4 decimals rounded value 156 for document
And tuple variable Facility_tpAnnuityOATHelpVar in tuple Facility1 should have 4 decimals rounded value 0.5907 for document
And tuple variable Facility_tpAnnuityOAT in tuple Facility1 should have 4 decimals rounded value 7.6785 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have 4 decimals rounded value 7.6785 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT Annuity >10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2026-09-10|
Facility_tpEndDate                      	   |2029-06-01|
Facility_tpAnnuityInterestRate	               |0.05|
Facility_tpProductduration 					   |156|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpPeriodDifferenceGrace in tuple Facility1 should have 2 decimals rounded value 0 for document
Then tuple variable Facility_tpAnnuityRATHelpVarSumRepayment in tuple Facility1 should have 2 decimals rounded value 14495272.64 for document
And tuple variable Facility_tpAnnuityRAT in tuple Facility1 should have 4 decimals rounded value 2.0325 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 4 decimals rounded value 2.0325 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 14495272.64 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT Annuity With Grace No Balloon >10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpEndDate                      	   |2034-06-01|
Facility_tpAnnuityInterestRate	               |0.08|
Facility_tpProductduration 					   |216|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |36|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityOAT in tuple Facility1 should have 4 decimals rounded value 12.4055 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have 4 decimals rounded value 12.4055 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT Annuity With Grace No Balloon >10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2029-12-13|
Facility_tpEndDate                      	   |2034-06-01|
Facility_tpAnnuityInterestRate	               |0.08|
Facility_tpProductduration 					   |216|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |36|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityRAT in tuple Facility1 should have 4 decimals rounded value 3.1535 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 4 decimals rounded value 3.1535 for document
And tuple variable Facility_tpPeriodDifferenceGrace in tuple Facility1 should have 2 decimals rounded value 3  for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 23323324.83 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - OAT Annuity No Grace No Balloon Manual WD >10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2025-12-20|
Facility_tpEndDate                      	   |2031-06-01|
Facility_tpAnnuityInterestRate	               |0.08|
Facility_tpProductduration 					   |180|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityOAT in tuple Facility1 should have 4 decimals rounded value 9.4055 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have 4 decimals rounded value 9.4055 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT And EAO - Annuity No Grace No Balloon Manual WD >10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2025-12-20|
Facility_tpEndDate                      	   |2031-06-01|
Facility_tpAnnuityInterestRate	               |0.08|
Facility_tpProductduration 					   |180|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityRAT in tuple Facility1 should have 4 decimals rounded value 3.7237 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 4 decimals rounded value 3.7237 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 27004446.37  for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - EAO Annuity No Grace No Balloon Manual WD >10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-07-01|
Facility_tpCurrentDate	          			   |2050-09-10|
Facility_tpEndDate                      	   |2067-07-01|
Facility_tpAnnuityInterestRate	               |0.08|
Facility_tpProductduration 					   |612|
Facility_tpPrincipalLimit					   |100000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 33333333.33 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - Manual WD Linear Repay
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-06-01|
Facility_tpCurrentDate	          			   |2016-06-01|
Facility_tpEndDate                      	   |2028-06-01|
Facility_tpAnnuityInterestRate	               |0.00|
Facility_tpProductduration 					   |144|
Facility_tpPrincipalLimit					   |50000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |3|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-06-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |10000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2018-06-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |15000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2021-06-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |15000000|

Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 10000000 for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - Manual WD Annuity Repay
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

Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 10000000 for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT And EAO - Annuity No Grace No Balloon -  Once WD Annuity Repayment >10 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-07-01|
Facility_tpCurrentDate	          			   |2049-11-10|
Facility_tpEndDate                      	   |2067-07-01|
Facility_tpAnnuityInterestRate	               |0.06|
Facility_tpProductduration 					   |612|
Facility_tpPrincipalLimit					   |80000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |2|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

Then tuple variable Facility_tpAnnuityRAT in tuple Facility1 should have 4 decimals rounded value 11.0403 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 4 decimals rounded value 11.0403 for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - Manual WD Annuity Repay >50
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility_tpManual1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-07-01|
Facility_tpCurrentDate	          			   |2015-07-01|
Facility_tpEndDate                      	   |2067-07-01|
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
Facility_tpManual_tpFirstDayMonth          |2016-07-01|
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

Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 30000000 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - Manual WD Linear Repay >50
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility_tpManual1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-07-01|
Facility_tpCurrentDate	          			   |2013-07-01|
Facility_tpEndDate                      	   |2067-07-01|
Facility_tpAnnuityInterestRate	               |0.08|
Facility_tpProductduration 					   |612|
Facility_tpPrincipalLimit					   |90000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |1|
Facility_tpWithdrawalChoice                    |3|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|


And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |20000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2026-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |35000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2040-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |25000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2045-07-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |10000000|

Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 20000000 for document

Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT - Once WD Manual Repay >50
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2017-01-01|
Facility_tpCurrentDate	          			   |2014-08-10|
Facility_tpEndDate                      	   |2068-01-01|
Facility_tpAnnuityInterestRate	               |0.00|
Facility_tpProductduration 					   |612|
Facility_tpPrincipalLimit					   |200000000|
Facility_tpRepaymentFrequency                  |12|
Facility_tpRepaymentChoice                     |3|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-12-31|
Facility_tpManual_tpRepaymentAmount        |40000000|
Facility_tpManual_tpWithdrawalAmount       |0|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2032-12-31|
Facility_tpManual_tpRepaymentAmount        |30000000|
Facility_tpManual_tpWithdrawalAmount       |0|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2045-12-31|
Facility_tpManual_tpRepaymentAmount        |50000000|
Facility_tpManual_tpWithdrawalAmount       |0|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2059-12-31|
Facility_tpManual_tpRepaymentAmount        |30000000|
Facility_tpManual_tpWithdrawalAmount       |0|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2067-12-31|
Facility_tpManual_tpRepaymentAmount        |50000000|
Facility_tpManual_tpWithdrawalAmount       |0|

Then tuple variable Facility_tpRemainingAverageTenorScheme in tuple Facility1 should have 2 decimals rounded value 30.65 for document
Then tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 2 decimals rounded value 30.65 for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - RAT Manual WD Manual Repay >50
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Repayment1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Repayment5 of definition Facility_tpManual in tuple Facility1

And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1


When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2017-01-01|
Facility_tpCurrentDate	          			   |2010-08-10|
Facility_tpEndDate                      	   |2068-01-01|
Facility_tpAnnuityInterestRate	               |0.00|
Facility_tpProductduration 					   |612|
Facility_tpPrincipalLimit					   |200000000|
Facility_tpRepaymentFrequency                  |12|
Facility_tpRepaymentChoice                     |3|
Facility_tpWithdrawalChoice                    |3|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

And tuple variables in tuple Repayment1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2025-12-31|
Facility_tpManual_tpRepaymentAmount        |40000000|
Facility_tpManual_tpWithdrawalAmount       |0|

And tuple variables in tuple Repayment2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2032-12-31|
Facility_tpManual_tpRepaymentAmount        |30000000|
Facility_tpManual_tpWithdrawalAmount       |0|

And tuple variables in tuple Repayment3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2045-12-31|
Facility_tpManual_tpRepaymentAmount        |50000000|
Facility_tpManual_tpWithdrawalAmount       |0|

And tuple variables in tuple Repayment4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2059-12-31|
Facility_tpManual_tpRepaymentAmount        |30000000|
Facility_tpManual_tpWithdrawalAmount       |0|

And tuple variables in tuple Repayment5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2067-12-31|
Facility_tpManual_tpRepaymentAmount        |50000000|
Facility_tpManual_tpWithdrawalAmount       |0|


And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |50000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2031-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |50000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2041-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |30000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2050-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |40000000|

And tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2055-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |30000000|

Then tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 2 decimals rounded value 30.65 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 50000000 for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - EAO Manual WD Once Repay >50
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal5 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2017-01-01|
Facility_tpCurrentDate	          			   |2053-08-10|
Facility_tpEndDate                      	   |2068-01-01|
Facility_tpAnnuityInterestRate	               |0.00|
Facility_tpProductduration 					   |612|
Facility_tpPrincipalLimit					   |200000000|
Facility_tpRepaymentFrequency                  |12|
Facility_tpRepaymentChoice                     |0|
Facility_tpWithdrawalChoice                    |3|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |50000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2031-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |50000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2041-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |30000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2050-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |40000000|

And tuple variables in tuple Withdrawal5 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2055-01-01|
Facility_tpManual_tpRepaymentAmount        |0|
Facility_tpManual_tpWithdrawalAmount       |30000000|

Then tuple variable Facility_tpExpectedAverageOutstandingScheme in tuple Facility1 should have 2 decimals rounded value 170000000 for document
!-- Then tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 2 decimals rounded value 51 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 170000000 for document


Scenario: User Story Manual Repayment Scheme - AABF-9617 - EAO Once WD Once Repay >50
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpStartDate                   	       |2016-01-01|
Facility_tpCurrentDate	          			   |2050-07-10|
Facility_tpEndDate                      	   |2067-07-01|
Facility_tpAnnuityInterestRate	               |0.00|
Facility_tpProductduration 					   |612|
Facility_tpPrincipalLimit					   |100000000|
Facility_tpRepaymentFrequency                  |1|
Facility_tpRepaymentChoice                     |0|
Facility_tpWithdrawalChoice                    |0|
Facility_tpGracePeriod                         |0|
Facility_tpRevolvingCredit                     |0|

!-- Then tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 should have 2 decimals rounded value 51 for document
Then tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have 2 decimals rounded value 100000000 for document



