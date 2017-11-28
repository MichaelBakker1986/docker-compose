FAM Knock Out Check
@Author Jan Willem Jacobs
@themes Knock Out check

Scenario: ABC-Finance Lease Uitgebreid - Happy Flow

Given a document of the model type FAM
And an existing tuple instance AbcLeaseUitgebreid of definition Product at position 7

When variable FacilityTarget is set to 2 for document
And variable FacilityTotalInvestment is set to 61000 for document
And variable FacilityOwnResources is set to 0 for document
And date variable FacilityDetailsStartDate is set to 0 months before today for document
And variable FacilityDetailsDuration is set to 61 for document
And date variable OrganisationFoundationDate is set to 36 months before today for document
And variable OrganisationFoundatationLaw is set to 1 for document
And variable OrganisationRevenueNetherlands is set to 1 for document
And variable OrganisationMarketB2B is set to 1 for document
And variable OrganisationMarketB2C is set to 0 for document
And variable OrganisationDelivery is set to 1 for document
And variable OrganisationSaleAndLeaseBack is set to 0 for document
And variable OrganisationThirdPartyLeasing is set to 0 for document
And variable OrganisationForeignLicence is set to 0 for document
And variable OrganisationForeignLegalEntity is set to 0 for document
And variable OrganisationEntityUnderConstruction is set to 0 for document
And variable OrganisationStationedForeignCountry is set to 0 for document
And variable OrganisationObjectStationaryInAForeignCountry is set to 0 for document
And variable FinancialsTurnoverLastYear is set to 5500000 for document
And variable FPS_VAR_GroupCode is set to CREDION for document


Then tuple variable Product_tpProductName in tuple AbcLeaseUitgebreid should have value Leasing (uitgebreide procedure) for document

And tuple variable Product_tpKO1to14 in tuple AbcLeaseUitgebreid should have value 0 for document
And variable FacilityDetailsLimit should have value 61000 for document
And tuple variable Product_tpKO15 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO16 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO17 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO18 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO19 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO20 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO21 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO24 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO25 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO26 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO27 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO28 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO31 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO32 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO33 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO34 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO35 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO36 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO37 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO38 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO71 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKnockedOutTotal in tuple AbcLeaseUitgebreid should have value 0 for document


Scenario: ABC-Finance Lease Uitgebreid - Unhappy flow

Given a document of the model type FAM
And an existing tuple instance AbcLeaseUitgebreid of definition Product at position 7

When variable FacilityTarget is set to 4 for document
And variable FacilityTotalInvestment is set to 6000 for document
And variable FacilityOwnResources is set to 0 for document
And date variable FacilityDetailsStartDate is set to 0 months before today for document
And variable FacilityDetailsDuration is set to 121 for document
And date variable OrganisationFoundationDate is set to 12 months before today for document
And variable OrganisationRevenueNetherlands is set to 0 for document
And variable OrganisationMarketB2B is set to 0 for document
And variable OrganisationMarketB2C is set to 1 for document
And variable OrganisationDelivery is set to 1 for document
And variable OrganisationSaleAndLeaseBack is set to 1 for document
And variable OrganisationThirdPartyLeasing is set to 1 for document
And variable OrganisationForeignLicence is set to 1 for document
And variable OrganisationObjectStationaryInAForeignCountry is set to 1 for document
And variable FinancialsTurnoverLastYear is set to 500000 for document
And variable FPS_VAR_GroupCode is set to HENDRIK for document

Then tuple variable Product_tpProductName in tuple AbcLeaseUitgebreid should have value Leasing (uitgebreide procedure) for document

And tuple variable Product_tpKO1to14 in tuple AbcLeaseUitgebreid should have value 1 for document
And tuple variable Product_tpKO15 in tuple AbcLeaseUitgebreid should have value 1 for document
And tuple variable Product_tpKO16 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO17 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO18 in tuple AbcLeaseUitgebreid should have value 1 for document
And tuple variable Product_tpKO19 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO20 in tuple AbcLeaseUitgebreid should have value 1 for document
And tuple variable Product_tpKO21 in tuple AbcLeaseUitgebreid should have value 1 for document
And tuple variable Product_tpKO24 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO25 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO26 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO27 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO28 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO31 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO32 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO33 in tuple AbcLeaseUitgebreid should have value 1 for document
And tuple variable Product_tpKO34 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO35 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO36 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO37 in tuple AbcLeaseUitgebreid should have value 1 for document
And tuple variable Product_tpKO38 in tuple AbcLeaseUitgebreid should have value 0 for document
And tuple variable Product_tpKO71 in tuple AbcLeaseUitgebreid should have value 1 for document
And tuple variable Product_tpKnockedOutTotal in tuple AbcLeaseUitgebreid should have value 8 for document
