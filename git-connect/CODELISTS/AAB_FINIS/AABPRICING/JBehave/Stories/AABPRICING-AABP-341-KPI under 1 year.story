Scenario: Tests [AABP-341] Calculate 4 KPI's for facilities < 1 yr - Timo 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:  
|variable|value|
Facility_tpType                          |F1|
Facility_tpFI                            |1|
Facility_tpCustomerSpread                |500|
Facility_tpCustomerSpreadAddMargin       |0|
Facility_tpExpectedAverageOutstanding    |1000000|
Facility_tpPrincipalLimit                |3000000|
Facility_tpLimit                         |2000000|
Facility_tpCommitmentFeeBp               |500|
Facility_tpUtilisationFeeBp              |100|
Facility_tpOfferOptionPremium            |400|
Facility_tpPrepaymentPrec                |0.5|
Facility_tpPrepaymentPremium             |200|
Facility_tpOutflowFI                     |50|
Facility_tpBufferCostPerYearBP           |200|
Facility_tpIndirectLiquidityCostsComRe   |0|
Facility_tpIndirectLiquidityCostsUncomRe |0|
Facility_tpIndirectLiquidityCostsComCom  |0|
Facility_tpIndirectLiquidityCostsUncomCom|0|
Facility_tpIndirectLiquidityCostsNotRe   |0|
Facility_tpIndirectLiquidityCostsCom31dt |0|
Facility_tpIndirectLiquidityCostsUncom31dt |0|
Facility_tpCostOverVolumeBp              |500|
Facility_tpRWA                           |1000000|
Facility_tpSubDebtRatio                  |0.1|
Facility_tpCostOfSubordination           |100|
Facility_tpInternalExpectedLossUnguaranteed  |500|
Facility_tpInternalExpectedLossGuaranteed    |500|
Facility_tpEconomicCapital                |1000000|
Facility_tpRequiredAmountofEquity        |100000|

And variable Borrower_tpRating is set to 7 for document
And variable Borrower_tpClientGroup is set to LMC for document
And variable Borrower_tpEffectiveCostOfCapital is set to 0.1 for document
And variable Borrower_tpCostofEquity is set to 0.1 for document

And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 is set to 1 for document
And tuple variable Facility_tpRemainingTenor in tuple Facility1 is set to 12 for document

Then tuple variable Facility_tpInterestIncome in tuple Facility1 should have value 50000 for document
And tuple variable Facility_tpDeannualize in tuple Facility1 should have value 1 for document
And tuple variable Facility_tpCommitmentFee in tuple Facility1 should have value 50000 for document
And tuple variable Facility_tpUtilisationFee in tuple Facility1 should have value 10000 for document
And tuple variable Facility_tpPipelineRisk in tuple Facility1 should have value 120000 for document
And tuple variable Facility_tpPrepaymentCosts in tuple Facility1 should have value 30000 for document
And tuple variable Facility_tpIndirectLiquidityCostsFI in tuple Facility1 should have value 2000000 for document
And tuple variable Facility_tpIndirectLiquidityCosts in tuple Facility1 should have value 2000000 for document
And tuple variable Facility_tpCostPerContract in tuple Facility1 should have value 2182.15 for document
And tuple variable Facility_tpCostOverVolume in tuple Facility1 should have value 50000 for document
And tuple variable Facility_tpSubordinatedDebtCapitalCharge in tuple Facility1 should have value 1000 for document
And tuple variable Facility_tpInternalExpectedLoss in tuple Facility1 should have value 1000 for document
And tuple variable Facility_tpCostOfEconomicCapital in tuple Facility1 should have value 100000 for document
And tuple variable Facility_tpEquityCapitalCharge in tuple Facility1 should have value 10000 for document

When tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 is set to 0.5 for document
And tuple variable Facility_tpRemainingTenor in tuple Facility1 is set to 12 for document

Then tuple variable Facility_tpInterestIncome in tuple Facility1 should have value 25000 for document
And tuple variable Facility_tpCommitmentFee in tuple Facility1 should have value 25000 for document
And tuple variable Facility_tpUtilisationFee in tuple Facility1 should have value 5000 for document
And tuple variable Facility_tpPipelineRisk in tuple Facility1 should have value 60000 for document
And tuple variable Facility_tpPrepaymentCosts in tuple Facility1 should have value 15000 for document
And tuple variable Facility_tpDeannualize in tuple Facility1 should have value 0.5 for document
And tuple variable Facility_tpIndirectLiquidityCosts in tuple Facility1 should have value 1000000 for document
And tuple variable Facility_tpCostPerContract in tuple Facility1 should have value 1091.075 for document
And tuple variable Facility_tpCostOverVolume in tuple Facility1 should have value 25000 for document
And tuple variable Facility_tpSubordinatedDebtCapitalCharge in tuple Facility1 should have value 500 for document
And tuple variable Facility_tpInternalExpectedLoss in tuple Facility1 should have value 500 for document
And tuple variable Facility_tpCostOfEconomicCapital in tuple Facility1 should have value 50000 for document
And tuple variable Facility_tpEquityCapitalCharge in tuple Facility1 should have value 5000 for document