Scenario: [AABP-341] Risk Adjusted Return Facility - KPIs under 1 year - PD's 

Given a document of the model type AABPRICING
And 81 month based forecast columns starting from 2016-01-01
And a tuple instance Facility1 of definition Facility

When variable Borrower_tpRating is set to 5+ for document
And tuple variable Facility_tpGuarantorRating in tuple Facility1 is set to 4 for document
And variable Borrower_tpMoCFactor is set to 1.3 for document
And tuple variable Facility_tpGuarantorMoCFactor in tuple Facility1 is set to 1.5 for document
And variable Borrower_tpAssetsize is set to 1000 for document
And variable Borrower_tpRho is set to 0.31269 for document
And tuple variables in tuple Facility1 are set:  

|variable|value|
|Facility_tpEADUnguaranteed                       |100000    |
|Facility_tpRhoGuarantor                          |0.2654    | 
|Facility_tpEADGuaranteed                         |200000    |
|Facility_tpLGD                                   |0.15      |
|Facility_tpLGDMoC                                |0.165     |
|Facility_tpDLGDMoC                               |0.25575   |
|Facility_tpELMultiplierECUnguaranteed            |1.5       |
|Facility_tpELMultiplierECGuaranteed              |2         |
|Facility_tpELMultiplierRARUnguaranteed           |1.2       |
|Facility_tpELMultiplierRARGuaranteed             |1.3       |
|Facility_tpIntraSectorCorrelationBorrower        |0.27339   |
|Facility_tpIntraSectorCorrelationGuarantor       |0.24488   |
|Facility_tpGuarantorPercentageGuaranteed         |20|
|Facility_tpEquityCorrelation                     |0.4547602865757|
|Facility_tpDeannualize                           |1|
|Facility_tpFI                                    |0|
|Facility_tpMWRA                                  |2|
|Facility_tpMWRAGuaranteed                        |3|

And tuple variable Facility_tpRemainingTenor in tuple Facility1 is set to 24 for document

Then tuple variable Facility_tpBorrower_tpPD in tuple Facility1 should have value 0.03 for document
And tuple variable Facility_tpGuarantorPD in tuple Facility1 should have value 0.01 for document
And tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 should have value 0.039 for document
And tuple variable Facility_tpGuarantorPDMoC in tuple Facility1 should have value 0.015 for document

!-- IEL MoC (EC)

And tuple variable Facility_tpJointPDMoC in tuple Facility1 should have value 0.00068527 for document
And tuple variable Facility_tpIELMoCUnguaranteed in tuple Facility1 should have value 965.25 for document
And tuple variable Facility_tpIELMoCGuaranteed in tuple Facility1 should have value 45.22812324 for document

!-- IEL (expenses)
And tuple variable Facility_tpJointPD in tuple Facility1 should have value 0.00035699 for document
And tuple variable Facility_tpInternalExpectedLossUnguaranteed in tuple Facility1 should have value 540 for document
And tuple variable Facility_tpInternalExpectedLossGuaranteed in tuple Facility1 should have value 13.92257839v
And tuple variable Facility_tpInternalExpectedLoss in tuple Facility1 should have value 553.92257839 for document

!-- RWA
And tuple variable Facility_tpPDMoCGuaranteed in tuple Facility1 should have value 0.015000000000000001 for document
And tuple variable Facility_tpBorrower_tpRiskWeight in tuple Facility1 should have value 0.53729182 for document
And tuple variable Facility_tpRiskWeightGuarantor in tuple Facility1 should have value 0.28975612 for document
And tuple variable Facility_tpKGuaranteed in tuple Facility1 should have value 0.05092643 for document
And tuple variable Facility_tpK in tuple Facility1 should have value 0.06021449 for document
And tuple variable Facility_tpb in tuple Facility1 should have value 0.08775632 for document
And tuple variable Facility_tpR1 in tuple Facility1 should have value 0.17134111 for document
And tuple variable Facility_tpR2 in tuple Facility1 should have value 0.13707289 for document

When tuple variable Facility_tpRemainingTenor in tuple Facility1 is set to 6 for document

Then tuple variable Facility_tpBorrower_tpPD in tuple Facility1 should have value 0.015000000000000001 for document
And tuple variable Facility_tpGuarantorPD in tuple Facility1 should have value 0.005 for document
And tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 should have value 0.0195 for document
!-- And tuple variable Facility_tpGuarantorPDMoC in tuple Facility1 should have value 0.037500000000000003 for document

!-- IEL MoC (EC)

And tuple variable Facility_tpJointPDMoC in tuple Facility1 should have value 0.00017717 for document
And tuple variable Facility_tpIELMoCUnguaranteed in tuple Facility1 should have value 482.625 for document
And tuple variable Facility_tpIELMoCGuaranteed in tuple Facility1 should have value 11.6932711 for document

!-- IEL (expenses)
And tuple variable Facility_tpJointPD in tuple Facility1 should have value 0.00009228 for document
And tuple variable Facility_tpInternalExpectedLossUnguaranteed in tuple Facility1 should have value 270 for document
And tuple variable Facility_tpInternalExpectedLossGuaranteed in tuple Facility1 should have value 3.5987613400000003 for document
And tuple variable Facility_tpInternalExpectedLoss in tuple Facility1 should have value 273.59876134 for document

!-- RWA
!-- And tuple variable Facility_tpPDMoCGuaranteed in tuple Facility1 should have value 0.015000000000000001 for document
And tuple variable Facility_tpBorrower_tpRiskWeight in tuple Facility1 should have value 0.39342885 for document
And tuple variable Facility_tpRiskWeightGuarantor in tuple Facility1 should have value 0.19486133 for document
And tuple variable Facility_tpKGuaranteed in tuple Facility1 should have value 0.04044825 for document
And tuple variable Facility_tpK in tuple Facility1 should have value 0.048953710000000004 for document
And tuple variable Facility_tpb in tuple Facility1 should have value 0.11169467 for document
And tuple variable Facility_tpR1 in tuple Facility1 should have value 0.20657885 for document
And tuple variable Facility_tpR2 in tuple Facility1 should have value 0.16526308 for document