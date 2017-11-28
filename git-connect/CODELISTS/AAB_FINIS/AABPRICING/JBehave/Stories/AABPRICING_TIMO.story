Scenario: User Story Joint PD [284] MatrixLookup Equity Index
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpAGICChoice is set to 3709 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

Then variable Borrower_tpAGIC should have value 3709 for document
And tuple variable Facility_tpEquityIndexBorrower in tuple Facility1 should have value 10 for document

When variable Borrower_tpAGICChoice is set to 8703 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
Then tuple variable Facility_tpEquityIndexBorrower in tuple Facility1 should have value 19 for document

When tuple variable Facility_tpGuarantorAGICChoice in tuple Facility1 is set to 7502 for document
Then tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 should have value 16 for document

When tuple variable Facility_tpGuarantorAGICChoice in tuple Facility1 is set to 5309 for document
Then tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 should have value 12 for document

Scenario: User Story Joint PD [284] MatrixLookup Intrasector Correlation Borrower (a1)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpEquityIndexBorrower in tuple Facility1 is set to 8 for document
Then tuple variable Facility_tpIntraSectorCorrelationBorrower in tuple Facility1 should have value 0.66212158 for document

Scenario: User Story Joint PD [284] MatrixLookup Intrasector Correlation Guarantor (a2)
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 is set to 38 for document
Then tuple variable Facility_tpIntraSectorCorrelationGuarantor in tuple Facility1 should have value 0.60411009 for document

Scenario:  User Story Joint PD [284]MatrixLookup Equity Correlation 
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpEquityIndexBorrower in tuple Facility1 is set to 12 for document
And tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 is set to 36 for document

Then tuple variable Facility_tpEquityCorrelationID in tuple Facility1 should have value 12_36 for document
Then tuple variable Facility_tpEquityCorrelation in tuple Facility1 should have value 0.85548168 for document

When tuple variable Facility_tpEquityIndexBorrower in tuple Facility1 is set to 8 for document
And tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 is set to 6 for document
Then tuple variable Facility_tpEquityCorrelation in tuple Facility1 should have value 0.84843262 for document

Scenario: User Story Joint PD [284] Facility_tpCostPerContractID
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpType in tuple Facility1 is set to F2 for document
And variable Borrower_tpRating is set to 3 for document
And variable Borrower_tpClientGroup is set to LMC for document

Then tuple variable Facility_tpCostPerContractID in tuple Facility1 should have value F2_3_LMC for document

Scenario: User Story [AABP-284] Joint PD - Facility level
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
!-- Set a1, a2 and Rho
When tuple variable Facility_tpGuarantorAGICChoice in tuple Facility1 is set to 7502 for document
And variable Borrower_tpAGICChoice is set to 2305 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document

Then tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 should have value 16 for document
And tuple variable Facility_tpEquityIndexBorrower in tuple Facility1 should have value 3 for document
And tuple variable Facility_tpIntraSectorCorrelationGuarantor in tuple Facility1 should have value 0.58800528 for document
And tuple variable Facility_tpIntraSectorCorrelationBorrower in tuple Facility1 should have value 0.59898906 for document
And tuple variable Facility_tpEquityCorrelation in tuple Facility1 should have value 0.85925952 for document

!-- Set PDMoC Borrower and Guarantor 
When variable Borrower_tpRating is set to 3 for document
And variable Borrower_tpPDModel is set to PAFI for document
And tuple variable Facility_tpGuarantorRating in tuple Facility1 is set to 2 for document
And tuple variable Facility_tpGuarantorPDModelChoice in tuple Facility1 is set to 2 for document

Then variable Borrower_tpPD should have value 0.0025 for document
And variable Borrower_tpMoCFactor should have value 1.076 for document
And variable Borrower_tpPDMoC should have value 0.00269 for document

And tuple variable Facility_tpGuarantorPD in tuple Facility1 should have value 0.0005 for document
And tuple variable Facility_tpGuarantorMoCFactor in tuple Facility1 should have value 1.076 for document
And tuple variable Facility_tpGuarantorPDMoC in tuple Facility1 should have value 0.000538 for document

!-- Calculate Joint PD
And tuple variable Facility_tpJointPDMoC in tuple Facility1 should have value 0.00001939 for document
 
!-- Double check 
When tuple variable Facility_tpGuarantorAGICChoice in tuple Facility1 is set to 7506 for document
And variable Borrower_tpAGICChoice is set to 2709 for document
Then tuple variable Facility_tpEquityIndexBorrower in tuple Facility1 should have value 4 for document
And tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 should have value 16 for document
Then tuple variable Facility_tpEquityCorrelationID in tuple Facility1 should have value 4_16 for document
And tuple variable Facility_tpIntraSectorCorrelationGuarantor in tuple Facility1 should have value 0.58800528 for document
And tuple variable Facility_tpIntraSectorCorrelationBorrower in tuple Facility1 should have value 0.59190443 for document
And tuple variable Facility_tpEquityCorrelation in tuple Facility1 should have value 0.90342117 for document


When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.003 for document
And tuple variable Facility_tpGuarantorPDMoC in tuple Facility1 is set to 0.00056 for document

Then tuple variable Facility_tpJointPDMoC in tuple Facility1 should have value 0.00002354 for document

Scenario: Testcase [AABP-315] Compact Report
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpCustomerSpread  						   |200|
Facility_tpLiquiditySpreadBps                      |100|
Facility_tpIndirectLiquidityCosts                  |100|
Facility_tpPipelineRisk                            |200|
Facility_tpPrepaymentCosts                         |300|   
Facility_tpOneOffFee                               |200|          
Facility_tpEAD                                     |10000|
Facility_tpAnnualFee                               |400|
Facility_tpExpectedAverageOutstanding              |200|

Then tuple variable Facility_tpCommercialMargin in tuple Facility1 should have value 100 for document
And tuple variable Facility_tpOptionCostsIndLiqPrem in tuple Facility1 should have value 600 for document
And tuple variable Facility_tpOneOffFeeBp in tuple Facility1 should have value 200 for document
And tuple variable Facility_tpAnnualFeeBp in tuple Facility1 should have value 2 for document

Scenario: Tests [AABP-341] Calculate 4 KPI's for facilities < 1 yr
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


Scenario: Testcase [AABP-584] Economic Capital Credit Risk

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpARCAddOn is set to 1 for document
And variable AgreementDiversificationOR is set to 1 for document
And tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpOREC         						   |2715|
Facility_tpCreditIncome                            |1000000|
Facility_tpDirectLiquidityPremium                  |50000|

Then tuple variable Facility_tpORCreditRisk in tuple Facility1 should have value 257925 for document

Scenario: Testcase [AABP-663] Calculation IEL and IELMoC

!-- Test van Expected Loss Economic Capital
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpPDMoC is set to 0.079 for document
And tuple variables in tuple Facility1 are set: 
|variable|value|
Facility_tpBorrower_tpPDMoC                        |0.097|
Facility_tpRemainingAverageTenor                   |2|
Facility_tpLGDMoC         						   |0.32|
Facility_tpELMultiplierECUnguaranteed          	   |1.5|
Facility_tpELMultiplierECGuaranteed                |2|
Facility_tpPrincipalLimit                          |1000000|
Facility_tpExpectedAverageOutstanding              |1000000|
Facility_tpLEF                                     |1|
Facility_tpPGO                                     |0.0753|
Facility_tpMOCEAD                                  |0.2|
Facility_tpAF                                      |0.75|
Facility_tpGuarantorPercentageGuaranteed           |0|

Then tuple variable Facility_tpEAD in tuple Facility1 should have value 1086595 for document
And tuple variable Facility_tpIELMoCUnGuaranteed in tuple Facility1 should have value 50591.8632 for document
And tuple variable Facility_tpIELMoC in tuple Facility1 should have value 50591.8632 for document

Scenario: Testcase [AABP-672] Equit Capital Charge

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpRWA in tuple Facility1 is set to 100000 for document
And variable Borrower_tpClientGroup is set to CCL for document
And variable Borrower_tpOperationalRisk is set to 0 for document
And tuple variable Facility_tpDeannualize in tuple Facility1 is set to 1 for document

Then variable Borrower_tpEquityRatio should have value 0.10 for document
And variable Borrower_tpCostofEquity should have value 0.125 for document
And tuple variable Facility_tpRequiredAmountofEquity in tuple Facility1 should have value 10000 for document
And tuple variable Facility_tpEquityCapitalCharge in tuple Facility1 should have value 1250 for document

When variable Borrower_tpClientGroup is set to PBH for document

Then variable Borrower_tpEquityRatio should have value 0.10 for document
And variable Borrower_tpCostofEquity should have value 0.125 for document

Scenario: Testcase [AABP-709] RWA Credit Risk - Correlation Factor (Non-FI) 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.0078 for document
And variable Borrower_tpAGICChoice is set to 1707 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpAssetSize is set to 1 for document

Then tuple variable Facility_tpR in tuple Facility1 should have value 0.16124682 for document

When variable Borrower_tpAssetSize is set to 25 for document
Then tuple variable Facility_tpR in tuple Facility1 should have value 0.1790246 for document

When variable Borrower_tpAssetSize is set to 4 for document
Then tuple variable Facility_tpR in tuple Facility1 should have value 0.16124682 for document

When variable Borrower_tpAssetSize is set to 50 for document
Then tuple variable Facility_tpR in tuple Facility1 should have value 0.20124682 for document

When variable Borrower_tpAssetSize is set to 70 for document
Then tuple variable Facility_tpR in tuple Facility1 should have value 0.20124682 for document


Scenario: Testcase [AABP-758] Economic Profit - Facility

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpClientGroup is set to PBH for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 is set to 2 for document

Then variable Borrower_tpEffectiveCostOfCapital should have value 0.16 for document

When tuple variable Facility_tpCreditRisk in tuple Facility1 is set to 117719 for document
And tuple variable Facility_tpInterestIncome in tuple Facility1 is set to 40000 for document
And tuple variable Facility_tpCreditRelatedFee in tuple Facility1 is set to 0 for document
And tuple variable Facility_tpDirectLiquidityPremium in tuple Facility1 is set to 0 for document

Then variable Borrower_tpArcAddOn should have value 1 for document
And tuple variable Facility_tpCreditIncome in tuple Facility1 should have value 40000 for document
And variable AgreementDiversificationOR should have value 1 for document
And tuple variable Facility_tpOREC in tuple Facility1 should have value 3795 for document
And tuple variable Facility_tpOperationalRisk in tuple Facility1 should have value 15180 for document
And tuple variable Facility_tpBusinessRisk in tuple Facility1 should have value 0 for document

And tuple variable Facility_tpEconomicCapital in tuple Facility1 should have value 132899 for document

When tuple variable Facility_tpInternalExpectedLoss in tuple Facility1 is set to 0 for document
And tuple variable Facility_tpOperationalCosts in tuple Facility1 is set to 0 for document
And tuple variable Facility_tpInterestExpenses in tuple Facility1 is set to 10000 for document
And tuple variable Facility_tpTax in tuple Facility1 is set to 0 for document

Then tuple variable Facility_tpRiskAdjustedReturn in tuple Facility1 should have value 30000 for document
And tuple variable Facility_tpEconomicProfit in tuple Facility1 should have value 8736.16 for document


Scenario: Testcase [AABP-993] RWA Credit Risk - Correlation Factor (FI) - teststap 1

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.0078 for document
And variable Borrower_tpAGICChoice is set to 8503 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpAssetSize is set to 1 for document
And tuple variable Facility_tpType in tuple Facility1 is set to F2 for document

Then tuple variable Facility_tpR in tuple Facility1 should have value 0.16124682 for document

Scenario: Testcase [AABP-993] RWA Credit Risk - Correlation Factor (FI) - teststap 2

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.0078 for document
And variable Borrower_tpAGICChoice is set to 8503 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpAssetSize is set to 25 for document
And tuple variable Facility_tpType in tuple Facility1 is set to F2 for document

Then tuple variable Facility_tpR in tuple Facility1 should have value 0.17902460 for document

Scenario: Testcase [AABP-993] RWA Credit Risk - Correlation Factor (FI) - teststap 3

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.0078 for document
And variable Borrower_tpAGICChoice is set to 8503 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpAssetSize is set to 4 for document
And tuple variable Facility_tpType in tuple Facility1 is set to F2 for document

Then tuple variable Facility_tpR in tuple Facility1 should have value 0.16124682 for document

Scenario: Testcase [AABP-993] RWA Credit Risk - Correlation Factor (FI) - teststap 4

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.0078 for document
And variable Borrower_tpAGICChoice is set to 8503 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 0 for document
And variable Borrower_tpAssetSize is set to 4 for document
And tuple variable Facility_tpType in tuple Facility1 is set to F2 for document

Then tuple variable Facility_tpR in tuple Facility1 should have value 0.25155853 for document

Scenario: Testcase [AABP-993] RWA Credit Risk - Correlation Factor (FI) - teststap 5

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.0078 for document
And variable Borrower_tpAGICChoice is set to 8503 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 0 for document
And variable Borrower_tpAssetSize is set to 100000 for document
And tuple variable Facility_tpType in tuple Facility1 is set to F2 for document

Then tuple variable Facility_tpR in tuple Facility1 should have value 0.25155853 for document

Scenario: Testcase [AABP-993] RWA Credit Risk - Correlation Factor (FI) - teststap 6

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.10 for document
And variable Borrower_tpAGICChoice is set to 8503 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpAssetSize is set to 10 for document
And tuple variable Facility_tpType in tuple Facility1 is set to F2 for document

Then tuple variable Facility_tpR in tuple Facility1 should have value 0.085253 for document

Scenario: Testcase [AABP-993] RWA Credit Risk - Correlation Factor (FI) - teststap 7

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.20 for document
And variable Borrower_tpAGICChoice is set to 8503 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpAssetSize is set to 10 for document
And tuple variable Facility_tpType in tuple Facility1 is set to F2 for document

Then tuple variable Facility_tpR in tuple Facility1 should have value 0.08444989 for document

Scenario: Testcase [AABP-993] RWA Credit Risk - Correlation Factor (FI) - teststap 8

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When tuple variable Facility_tpBorrower_tpPDMoC in tuple Facility1 is set to 0.20 for document
And variable Borrower_tpAGICChoice is set to 8503 for document
And variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpUnderSupervision is set to 1 for document
And variable Borrower_tpAssetSize is set to 70000 for document

Then tuple variable Facility_tpR in tuple Facility1 should have value 0.12000545 for document

Scenario: Testcase [AABP-1097] Direct Liquidity Premium

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility1 are set: 

|variable|value|

Facility_tpType                                   |F2|
Facility_tpExpectedAverageOutstanding             |1000000|
Facility_tpLiquiditySpreadBps                     |200|
Facility_tpRemainingAverageTenor                  |2|

And tuple variables in tuple Facility2 are set: 

|variable|value|

Facility_tpType                                   |F5|
Facility_tpExpectedAverageOutstanding             |1000000|
Facility_tpLiquiditySpreadBps                     |200|
Facility_tpRemainingAverageTenor                  |2|

Then tuple variable Facility_tpDirectLiquidityPremium in tuple Facility1 should have value 20000 for document

And tuple variable Facility_tpDirectLiquidityPremium in tuple Facility2 should have value 0 for document

Scenario: User story [AABP-1191] Expected Loss Lookupfuncties EL Multipliers

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpRating is set to 3+ for document
And tuple variables in tuple Facility1 are set:

|variable|value|
Facility_tpLGD                                   |0.3010|
Facility_tpLGDMoC                                |0.4060|
Facility_tpRemainingAverageTenor                 |2.61|
Facility_tpGuarantorRating                       |2-|

Then tuple variable Facility_tpELMultiplierIDLowerMECGuaranteed in tuple Facility1 should have value @2-_3_41 for document
And tuple variable Facility_tpELMultiplierIDUpperMECGuaranteed in tuple Facility1 should have value @2-_4_41 for document
And tuple variable Facility_tpELMultiplierIDUpperMECUnguaranteed in tuple Facility1 should have value @3+_4_41 for document
And tuple variable Facility_tpELMultiplierIDLowerMECUnguaranteed in tuple Facility1 should have value @3+_3_41 for document

And tuple variable Facility_tpELMultiplierIDLowerMRARGuaranteed in tuple Facility1 should have value @2-_3_31 for document
And tuple variable Facility_tpELMultiplierIDUpperMRARGuaranteed in tuple Facility1 should have value @2-_4_31 for document
And tuple variable Facility_tpELMultiplierIDUpperMRARUnguaranteed in tuple Facility1 should have value @3+_4_31 for document
And tuple variable Facility_tpELMultiplierIDLowerMRARUnguaranteed in tuple Facility1 should have value @3+_3_31 for document

Scenario: User story [AABP-1137] Cost of Economic Capital expliciet maken

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variable Facility_tpEconomicCapital in tuple Facility1 is set to 100000 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility1 is set to 2 for document
And variable Borrower_tpEffectiveCostOfCapital is set to 0.05 for document
Then tuple variable Facility_tpCostOfEconomicCapital in tuple Facility1 should have value 5000 for document

When variable Borrower_tpEconomicCapital is set to 100000 for document
And variable Borrower_tpEffectiveCostOfCapital is set to 0.05 for document
Then variable Borrower_tpCostOfEconomicCapital should have value 5000 for document

When variable Borrower_tpCrossSellEconomicCapital is set to 100000 for document
And variable Borrower_tpEffectiveCostOfCapital is set to 0.05 for document
Then variable Borrower_tpCrossSellCostOfEconomicCapital should have value 5000 for document

Then variable Borrower_tpClientEconomicCapital should have value 200000 for document
And variable Borrower_tpClientCostOfEconomicCapital should have value 10000 for document


Scenario: User story [AABP-1191] Expected Loss MoC Guaranteed --> EC Credit Risk 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpBorrower_tpPDMoC                        |0.20|
Facility_tpRemainingAverageTenor                   |2|
Facility_tpEADGuaranteed	          		       |100000|
Facility_tpEADUnguaranteed						   |200000|
Facility_tpLGDMoC                                  |0.3|
Facility_tpELMultiplierECUnguaranteed              |1.5|
Facility_tpELMultiplierECGuaranteed	               |3|
Facility_tpJointPDMoC                              |0.05|

Then tuple variable Facility_tpIELMoCGuaranteed in tuple Facility1 should have value 4500 for document
And tuple variable Facility_tpIELMoCUnguaranteed in tuple Facility1 should have value 18000 for document
And tuple variable Facility_tpIELMoC in tuple Facility1 should have value 22500 for document

!-- Expected Loss Standard --> other expenses

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpRemainingAverageTenor                   |2   |
Facility_tpBorrower_tpPDMoC                        |0.15|
Facility_tpBorrower_tpPD                           |0.15|
Facility_tpEADGuaranteed	          		       |100000|
Facility_tpEADUnguaranteed						   |200000|
Facility_tpLGD                                     |0.3|
Facility_tpELMultiplierRARGuaranteed               |1.5|
Facility_tpELMultiplierRARUnguaranteed             |3|
Facility_tpJointPD                                 |0.04|

Then tuple variable Facility_tpInternalExpectedLossGuaranteed in tuple Facility1 should have value 1800 for document
And tuple variable Facility_tpInternalExpectedLossUnguaranteed in tuple Facility1 should have value 27000 for document
And tuple variable Facility_tpInternalExpectedLoss in tuple Facility1 should have value 28800 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - CreditRelatedFee 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpCreditRelatedFee                      |30000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpCreditRelatedFee                      |40000|

Then variable Borrower_tpCreditRelatedFee should have value 70000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Interest Income 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpInterestIncome                        |50000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpInterestIncome                        |60000|

Then variable Borrower_tpInterestIncome should have value 110000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Income 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpInterestIncome                        |50000|
Facility_tpCreditRelatedFee                      |30000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpInterestIncome                        |60000|
Facility_tpCreditRelatedFee                      |40000|

Then variable Borrower_tpInterestIncome should have value 110000 for document
And variable Borrower_tpCreditRelatedFee should have value 70000 for document
And variable Borrower_tpIncome should have value 180000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Option Costs 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
And a tuple instance Facility3 of definition Facility
When tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpOptionCostsIndLiqPrem                 |40000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpOptionCostsIndLiqPrem                 |60000|

And tuple variables in tuple Facility3 are set:

|variable|value|

Facility_tpOptionCostsIndLiqPrem                 |50000|

Then variable Borrower_tpOptionCostsIndLiqPremium should have value 150000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Operational Costs 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When variable Borrower_tpFixedCostOperatingConcept is set to 60000 for document
And variable AgreementPercentageOperatingConcept is set to 0.5 for document
And tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpCostPerContract                      |40000|
Facility_tpCostOverVolume                       |50000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpCostPerContract                      |60000|
Facility_tpCostOverVolume                       |70000|


Then variable Borrower_tpCostPerContract should have value 100000 for document
And variable Borrower_tpCostOverVolume should have value 120000 for document
And variable Borrower_tpCostPerServiceConcept should have value 30000 for document
And variable Borrower_tpOperationalCosts should have value 250000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Sub Debt Capital Charge 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpSubordinatedDebtCapitalCharge        |40000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpSubordinatedDebtCapitalCharge        |60000|


Then variable Borrower_tpSubordinatedDebtCapitalCharge should have value 100000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Internal Expected Loss

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpInternalExpectedLoss        |40000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpInternalExpectedLoss        |60000|


Then variable Borrower_tpInternalExpectedLoss should have value 100000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Economic Capital 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When variable Borrower_tpARCAddOn is set to 1.5 for document
And variable Borrower_tpClientGroup is set to CCL for document
And variable AgreementDiversificationOR is set to 2 for document
And variable AgreementDiversificationBR is set to 3 for document
And tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpCreditRisk                      |1500|
Facility_tpOREC                            |400|
Facility_tpCreditIncome                    |10000|
Facility_tpDirectLiquidityPremium          |500|

Then model version should as least be 1.9.19
And tuple variable Facility_tpORCreditRisk in tuple Facility1 should have value 1140 for document
And tuple variable Facility_tpBRCreditRisk in tuple Facility1 should have value 0 for document

When tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpCreditRisk                      |2000|
Facility_tpOREC                            |500|
Facility_tpCreditIncome                    |20000|
Facility_tpDirectLiquidityPremium          |400|

Then tuple variable Facility_tpORCreditRisk in tuple Facility2 should have value 2940 for document
And tuple variable Facility_tpBRCreditRisk in tuple Facility2 should have value 0 for document

Then variable Borrower_tpOperationalRisk should have value 4080 for document
And variable Borrower_tpBusinessRisk should have value 0 for document
And variable Borrower_tpCreditRisk should have value 3500 for document

And variable Borrower_tpEconomicCapital should have value 7580 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Equity Capital Charge

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpEquityCapitalCharge        |40000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpEquityCapitalCharge        |60000|

Then variable Borrower_tpEquityCapitalCharge should have value 100000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Equity Funding Adjustment

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpEquityFundingAdjustment        |40000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpEquityFundingAdjustment        |60000|

Then variable Borrower_tpEquityFundingAdjustment should have value 100000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Tax and Risk Adjusted Return

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When variable Borrower_tpFixedCostOperatingConcept is set to 2000 for document
And variable AgreementPercentageOperatingConcept is set to 0.5 for document

And tuple variables in tuple Facility1 are set:

|variable|value|
Facility_tpCreditRelatedFee              |25000|
Facility_tpInterestIncome                |25000|
Facility_tpPipelineRisk                  |500|
Facility_tpPrepaymentCosts               |500|
Facility_tpIndirectLiquidityCosts        |600|
Facility_tpOptionCostsIndLiqPrem         |5000|
Facility_tpDirectLiquidityPremium        |500|
Facility_tpCostPerContract               |500|
Facility_tpCostOverVolume                |500|
Facility_tpSubordinatedDebtCapitalCharge |1000|
Facility_tpEquityFundingAdjustment       |1000|
Facility_tpInternalExpectedLoss          |2000|

And tuple variables in tuple Facility2 are set:

|variable|value|
Facility_tpCreditRelatedFee              |25000|
Facility_tpInterestIncome                |25000|
Facility_tpPipelineRisk                  |500|
Facility_tpPrepaymentCosts               |500|
Facility_tpIndirectLiquidityCosts        |600|
Facility_tpOptionCostsIndLiqPrem         |5000|
Facility_tpDirectLiquidityPremium        |500|
Facility_tpCostPerContract               |500|
Facility_tpCostOverVolume                |500|
Facility_tpSubordinatedDebtCapitalCharge |1000|
Facility_tpEquityFundingAdjustment       |1000|
Facility_tpInternalExpectedLoss          |2000|

And variable Borrower_tpTaxRate is set to 0.25 for document

Then variable Borrower_tpIncome should have value 100000 for document
And variable Borrower_tpDirectLiquidityPremium should have value 1000 for document
And variable Borrower_tpOperationalCosts should have value 3000 for document
And variable Borrower_tpSubordinatedDebtCapitalCharge should have value 2000 for document
And variable Borrower_tpEquityFundingAdjustment should have value 2000 for document
And variable Borrower_tpInternalExpectedLoss should have value 4000 for document
And variable Borrower_tpPrepaymentCosts should have value 1000 for document
And variable Borrower_tpPipelineRisk should have value 1000 for document
And variable Borrower_tpIndirectLiquidityCosts should have value 1200 for document

And variable Borrower_tpTax should have value 22200 for document
And variable Borrower_tpRiskAdjustedReturn should have value 66600 for document

Scenario: User story [AABP-1405] SBI-code meenemen in berekeningen

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
When variable Borrower_tpAGICOrSBI is set to 0 for document
And variable Borrower_tpAGICChoice is set to 2783 for document
And variable Borrower_tpSBI is set to 64191 for document
And tuple variable Facility_tpGuarantorAGICOrSBI in tuple Facility1 is set to 0 for document
And tuple variable Facility_tpGuarantorAGICChoice in tuple Facility1 is set to 8717 for document
And tuple variable Facility_tpGuarantorSBI in tuple Facility1 is set to 64193 for document

Then variable Borrower_tpFinancialInstitutionChoice should have value No for document
And variable Borrower_tpEquityIndex should have value 7 for document
And tuple variable Facility_tpEquityIndexBorrower in tuple Facility1 should have value 7 for document
And tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 should have value 22 for document
And tuple variable Facility_tpFI in tuple Facility1 should have value No for document

When variable Borrower_tpAGICOrSBI is set to 1 for document
And tuple variable Facility_tpGuarantorAGICOrSBI in tuple Facility1 is set to 1 for document

Then variable Borrower_tpFinancialInstitutionChoice should have value Yes for document
And variable Borrower_tpEquityIndex should have value 17 for document
And variable Borrower_tpFinancialInstitution should have value BANKS for document
And tuple variable Facility_tpEquityIndexBorrower in tuple Facility1 should have value 17 for document
And tuple variable Facility_tpEquityIndexGuarantor in tuple Facility1 should have value 17 for document
And tuple variable Facility_tpFI in tuple Facility1 should have value Yes for document

Scenario: Tests [AABP-1570] Automatic Repayment with Custom Withdrawal - Linear
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Withdrawal1 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal2 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal3 of definition Facility_tpManual in tuple Facility1
And a tuple instance Withdrawal4 of definition Facility_tpManual in tuple Facility1

When tuple variables in tuple Facility1 are set:  
|variable|value|
|Facility_tpStartDate                             |2015-12-01|
|Facility_tpCurrentDate                           |2016-09-05|
|Facility_tpEndDate                               |2017-12-01|
|Facility_tpType                                  |F2        |
|Facility_tpProductduration                       |24        |
|Facility_tpRepaymentFrequency                    |4         |
|Facility_tpPrincipalLimit                        |12000000  |
|Facility_tpGracePeriod                           |0         |
|Facility_tpBalloon                               |0         |
|Facility_tpWithdrawalChoice                      |3         |
|Facility_tpRepaymentChoice                       |1         |

And tuple variables in tuple Withdrawal1 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2015-12-1|
Facility_tpManual_tpWithdrawalAmount       |4000000|

And tuple variables in tuple Withdrawal2 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2016-7-1|
Facility_tpManual_tpWithdrawalAmount       |3000000|

And tuple variables in tuple Withdrawal3 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-1-1|
Facility_tpManual_tpWithdrawalAmount       |3000000|

And tuple variables in tuple Withdrawal4 are set:  
|variable|value|
Facility_tpManual_tpFirstDayMonth          |2017-3-1|
Facility_tpManual_tpWithdrawalAmount       |2000000|


Then tuple variable Facility_tpOriginalAverageTenor in tuple Facility1 should have value 1.125 for document
And tuple variable Facility_tpExpectedAverageOutstanding in tuple Facility1 should have value 3250000 for document
And tuple variable Facility_tpAnnuityMonthsSinceStartDate in tuple Facility1 should have value 4 for document
And tuple variable Facility_tpLimit in tuple Facility1 should have value 3750000 for document

Scenario: Tests [AABP-1570] Automatic Repayment with Custom Withdrawal - Bullet
Given a document of the model type AABPRICING
And 62 month based forecast columns starting from 2015-12-01
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
And a tuple instance Facility3 of definition Facility

When tuple variables in tuple Facility2 are set:  
|variable|value|
|Facility_tpStartDate                             |2015-12-01   |
|Facility_tpCurrentDate                           |2016-09-05   |
|Facility_tpEndDate                               |2017-12-01   |
|Facility_tpType                                  |AGL          |
|Facility_tpProductduration                       |24           |
|Facility_tpPrincipalLimit                        |12000000     |

|Facility_tpGracePeriod                           |0            |
|Facility_tpWithdrawalChoice                      |3            |
|Facility_tpProductredemptionDetailsRedemptionType|InterestOnly |

And tuple variable Facility_tpWithdrawalsAmount in tuple Facility2 is set to 4000000 for forecast column with start date 2015-12-1
And tuple variable Facility_tpWithdrawalsAmount in tuple Facility2 is set to 3000000 for forecast column with start date 2016-7-1
And tuple variable Facility_tpWithdrawalsAmount in tuple Facility2 is set to 3000000 for forecast column with start date 2017-1-1
And tuple variable Facility_tpWithdrawalsAmount in tuple Facility2 is set to 2000000 for forecast column with start date 2017-3-1

Then tuple variable Facility_tpLimit in tuple Facility2 should have value 12000000 for document
And tuple variable Facility_tpOriginalAverageTenor in tuple Facility2 should have value 2.0 for document
And tuple variable Facility_tpRemainingAverageTenor in tuple Facility2 should have value 1.25 for document

Scenario: Tests [AABP-1570] Automatic Repayment with Custom Withdrawal - ANNUITY
Given a document of the model type AABPRICING
And 62 month based forecast columns starting from 2016-01-01
And a tuple instance Facility3 of definition Facility

When tuple variables in tuple Facility3 are set:  
|variable|value|
|Facility_tpStartDate                             |2016-01-01|
|Facility_tpCurrentDate                           |2018-01-05|
|Facility_tpEndDate                               |2021-01-01|
|Facility_tpType                                  |F2       |
|Facility_tpProductduration                       |60        |
|Facility_tpRepaymentFrequency                    |2         |
|Facility_tpPrincipalLimit                        |15000000  |
|Facility_tpGracePeriod                           |0         |
|Facility_tpBalloon                               |0         |
|Facility_tpWithdrawalChoice                      |3         |
|Facility_tpAnnuityInterestRate                   |0.05      |
|Facility_tpProductredemptionDetailsRedemptionType|Annuity   |

Then tuple variable Facility_tpLimit in tuple Facility3 should have 2 decimals rounded value 7204988.53 for document
