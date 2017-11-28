FAM Knock Out Check
@Author Jan Willem Jacobs
@themes Knock Out check

Scenario: Qredits - Flexibel krediet -  Happy Flow

Given a document of the model type FAM
And an existing tuple instance QREDITSFLEXIBELKREDIET of definition Product at position 19

When variable FacilityTarget is set to 5 for document
And variable FacilityTotalInvestment is set to 24000 for document
And variable FacilityOwnResources is set to 0 for document
And date variable FacilityDetailsStartDate is set to 0 months before today for document
And variable FacilityDetailsDuration is set to 6 for document
And date variable OrganisationFoundationDate is set to 24 months before today for document
And variable OrganisationStarting is set to 0 for document
And variable OrganisationFoundatationLaw is set to 1 for document
And variable OrganisationRevenueNetherlands is set to 1 for document
And variable OrganisationMarketB2B is set to 1 for document
And variable OrganisationMarketB2C is set to 1 for document
And variable OrganisationDelivery is set to 1 for document
And variable OrganisationSaleAndLeaseBack is set to 0 for document
And variable OrganisationThirdPartyLeasing is set to 0 for document
And variable OrganisationForeignLicence is set to 0 for document
And variable OrganisationForeignLegalEntity is set to 0 for document
And variable OrganisationEntityUnderConstruction is set to 0 for document
And variable OrganisationStationedForeignCountry is set to 0 for document
And variable OrganisationObjectStationaryInAForeignCountry is set to 0 for document
And variable FinancialsTurnoverLastYear is set to 100000 for document
And variable FinancialsAvarageValueInvoice is set to 100000 for document
And variable FinancialsMaximumAdvances is set to 10 for document
And variable FinancialsPositiveCashFlow is set to 1 for document
And variable FinancialsExistingPledgeRecourse is set to 0 for document
And variable FinancialsIntercompanyTransactions is set to 0 for document
And variable FinancialsRevenueByCardWebshop is set to 1 for document
And variable FPS_VAR_GroupCode is set to CREDION for document
Then tuple variable Product_tpProductName in tuple QREDITSFLEXIBELKREDIET should have value Flexibel krediet for document

And tuple variable Product_tpKO1to14 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And variable FacilityDetailsLimit should have value 24000 for document
And tuple variable Product_tpKO15 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO16 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO17 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO18 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO19 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO20 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO21 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO24 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO25 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO26 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO27 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO28 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO31 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO32 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO33 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO34 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO35 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO36 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO37 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO38 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO46 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO47 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO49 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO50 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO51 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO52 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO71 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKnockedOutTotal in tuple QREDITSFLEXIBELKREDIET should have value 0 for document


Scenario: QREDITSFLEXIBELKREDIET - Flexibel krediet - Unhappy flow

Given a document of the model type FAM
And an existing tuple instance QREDITSFLEXIBELKREDIET of definition Product at position 19

When variable FacilityTarget is set to 3 for document
And variable FacilityTotalInvestment is set to 25003 for document
And variable FacilityOwnResources is set to 0 for document
And date variable FacilityDetailsStartDate is set to 0 months before today for document
And variable FacilityDetailsDuration is set to 7 for document
And date variable OrganisationFoundationDate is set to 1 months before today for document
And variable OrganisationStarting is set to 1 for document
And variable OrganisationFoundatationLaw is set to 0 for document
And variable OrganisationRevenueNetherlands is set to 0 for document
And variable OrganisationMarketB2B is set to 0 for document
And variable OrganisationMarketB2C is set to 1 for document
And variable OrganisationDelivery is set to 1 for document
And variable OrganisationSaleAndLeaseBack is set to 1 for document
And variable OrganisationThirdPartyLeasing is set to 1 for document
And variable OrganisationForeignLicence is set to 1 for document
And variable OrganisationForeignLegalEntity is set to 1 for document
And variable OrganisationEntityUnderConstruction is set to 1 for document
And variable OrganisationStationedForeignCountry is set to 1 for document
And variable OrganisationObjectStationaryInAForeignCountry is set to 1 for document
And variable FinancialsTurnoverLastYear is set to 500000 for document
And variable FinancialsAvarageValueInvoice is set to 100000 for document
And variable FinancialsMaximumAdvances is set to 10 for document
And variable FinancialsPositiveCashFlow is set to 0 for document
And variable FinancialsExistingPledgeRecourse is set to 1 for document
And variable FinancialsIntercompanyTransactions is set to 1 for document
And variable FinancialsRevenueByCardWebshop is set to 0 for document
And variable FPS_VAR_GroupCode is set to HENDRIK for document

Then tuple variable Product_tpProductName in tuple QREDITSFLEXIBELKREDIET should have value Flexibel krediet for document

And tuple variable Product_tpKO1to14 in tuple QREDITSFLEXIBELKREDIET should have value 1 for document
And tuple variable Product_tpKO15 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO16 in tuple QREDITSFLEXIBELKREDIET should have value 1 for document
And tuple variable Product_tpKO17 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO18 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO19 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO20 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO21 in tuple QREDITSFLEXIBELKREDIET should have value 1 for document
And tuple variable Product_tpKO25 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO26 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO27 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO28 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO31 in tuple QREDITSFLEXIBELKREDIET should have value 1 for document
And tuple variable Product_tpKO32 in tuple QREDITSFLEXIBELKREDIET should have value 1 for document
And tuple variable Product_tpKO33 in tuple QREDITSFLEXIBELKREDIET should have value 1 for document
And tuple variable Product_tpKO36 in tuple QREDITSFLEXIBELKREDIET should have value 1 for document
And tuple variable Product_tpKO37 in tuple QREDITSFLEXIBELKREDIET should have value 1 for document
And tuple variable Product_tpKO38 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO46 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO47 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO49 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO50 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO51 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO52 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKO71 in tuple QREDITSFLEXIBELKREDIET should have value 0 for document
And tuple variable Product_tpKnockedOutTotal in tuple QREDITSFLEXIBELKREDIET should have value 8 for document
