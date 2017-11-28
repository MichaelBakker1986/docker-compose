Pricing first
@Author Luuk Peters
@themes Pricing first

Scenario: Pricing first test
Given document Testdata/TRI-8735_pricing_document.xml of the model type TDSCPRICING
Then variable TotalMaxLoss should have 0 decimals rounded value 102400 for document

Scenario: SimpleExportServices reads FacilityView_tpUsedRate
Given document Testdata/TRI-8735_pricing_document.xml of the model type TDSCPRICING
Then tuple variable FacilityView3_tpID at index 0 should have value 12345-02-01 for document
And tuple variable FacilityView_tpFunding at index 0 should have value 0.0 for document
And tuple variable FacilityView_tpRiskPremium at index 0 should have value 0.00241748 for document
And tuple variable FacilityView_tpProcessCostsPercentage at index 0 should have value 0.0 for document
And tuple variable FacilityView_tpReturnPercentage at index 0 should have 8 decimals rounded value 0.00009112 for document
And tuple variable FacilityView2_tpUsedRate at index 0 should have value 0.0025086 for document
And tuple variable FacilityView2_tpProductSelected at index 0 should have value NA for document
And tuple variable FacilityView_Leeg at index 0 should have value NA for document
And tuple variable FacilityView_tpProductInterestRateFunding at index 0 should have value 0.0 for document
And tuple variable FacilityView_tpProductInterestmargin at index 0 should have value 0.0025086 for document
And tuple variable FacilityView3_tpUsedRate at index 0 should have value 0.0025086 for document
And tuple variable FacilityView_Leeg3 at index 0 should have value NA for document
And tuple variable FacilityView_tpInterestMargin at index 0 should have value 0.75258115 for document
And tuple variable FacilityView_tpProcessCostsAbsolute at index 0 should have value 0.0 for document
And tuple variable FacilityView2_tpEL at index 0 should have value 0.4215 for document
And tuple variable FacilityView_tpTax at index 0 should have value 0.0 for document
And tuple variable FacilityView_tpCapitalCostsAbsolute at index 0 should have value 0.30374417 for document
And tuple variable FacilityView_tpReturnAbsolute at index 0 should have value 0.02733698 for document
And tuple variable FacilityView_tpRAROC at index 0 should have value 0.109 for document
And model version should as least be 2.0.1.8