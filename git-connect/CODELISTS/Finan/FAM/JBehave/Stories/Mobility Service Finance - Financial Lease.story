FAM Knock Out Check
@Author Jan Willem Jacobs 
@themes Knock Out check

Scenario: Mobility Service Finance - Happy Flow

Given a document of the model type FAM
And an existing tuple instance MOBILITYSERVICEFINANCE of definition Product at position 18

When variable FacilityTarget is set to 7 for document
And variable FacilityTotalInvestment is set to 8000 for document
And variable FacilityOwnResources is set to 0 for document
And date variable FacilityDetailsStartDate is set to 0 months before today for document
And variable FacilityDetailsDuration is set to 36 for document
And date variable OrganisationFoundationDate is set to 72 months before today for document
And variable OrganisationStarting is set to 0 for document
And variable OrganisationFoundatationLaw is set to 1 for document
And variable OrganisationRevenueNetherlands is set to 1 for document
And variable OrganisationMarketB2B is set to 1 for document
And variable OrganisationMarketB2C is set to 1 for document
And variable OrganisationDelivery is set to 1 for document
And variable OrganisationSaleAndLeaseBack is set to 1 for document
And variable OrganisationThirdPartyLeasing is set to 0 for document
And variable OrganisationForeignLicence is set to 0 for document
And variable OrganisationForeignLegalEntity is set to 0 for document
And variable OrganisationEntityUnderConstruction is set to 0 for document
And variable OrganisationStationedForeignCountry is set to 0 for document
And variable OrganisationObjectStationaryInAForeignCountry is set to 0 for document
And variable FPS_VAR_BIK_CODE is set to 56103 for document
And variable FPS_VAR_BIK_Omschr is set to ijssalons for document
And variable OrganisationSectorCode is set to 56103 - ijssalons for document
And variable FinancialsTurnoverLastYear is set to 5500000 for document
And variable FPS_VAR_GroupCode is set to CREDION for document

Then tuple variable Product_tpProductName in tuple MOBILITYSERVICEFINANCE should have value Financial Lease for document
And variable OrganisationSectorCode should have value 56103 for document

And tuple variable Product_tpKO1to14 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And variable FacilityDetailsLimit should have value 8000 for document
And tuple variable Product_tpKO15 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO16 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO17 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO18 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO19 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO20 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO21 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO24 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO25 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO26 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO27 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO28 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO31 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO32 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO33 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO34 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO35 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO36 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO37 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO38 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO60 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO71 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKnockedOutTotal in tuple MOBILITYSERVICEFINANCE should have value 0 for document

Scenario: Mobility Service Finance - unhappy flow

Given a document of the model type FAM
And an existing tuple instance MOBILITYSERVICEFINANCE of definition Product at position 18

When variable FacilityTarget is set to 4 for document
And variable FacilityTotalInvestment is set to 4000 for document
And variable FacilityOwnResources is set to 0 for document
And date variable FacilityDetailsStartDate is set to 0 months before today for document
And variable FacilityDetailsDuration is set to 74 for document
And date variable OrganisationFoundationDate is set to 20 months before today for document
And variable OrganisationStarting is set to 1 for document
And variable OrganisationFoundatationLaw is set to 0 for document
And variable OrganisationRevenueNetherlands is set to 1 for document
And variable OrganisationMarketB2B is set to 1 for document
And variable OrganisationMarketB2C is set to 1 for document
And variable OrganisationDelivery is set to 1 for document
And variable OrganisationSaleAndLeaseBack is set to 1 for document
And variable OrganisationThirdPartyLeasing is set to 1 for document
And variable OrganisationForeignLicence is set to 1 for document
And variable OrganisationForeignLegalEntity is set to 1 for document
And variable OrganisationEntityUnderConstruction is set to 1 for document
And variable OrganisationStationedForeignCountry is set to 1 for document
And variable OrganisationObjectStationaryInAForeignCountry is set to 1 for document
And variable FinancialsTurnoverLastYear is set to 4500000 for document
And variable FPS_VAR_GroupCode is set to HENDRIK for document
And variable FPS_VAR_BIK_CODE is set to 254 for document
And variable OrganisationSecondarySector is set to 014 - Fokbedrijven for document
And variable FPS_VAR_BIK_Omschr is set to Wapens for document

Then tuple variable Product_tpProductName in tuple MOBILITYSERVICEFINANCE should have value Financial Lease for document
And variable OrganisationSectorCode should have value 254 for document

And tuple variable Product_tpKO1to14 in tuple MOBILITYSERVICEFINANCE should have value 1 for document
And tuple variable Product_tpKO15 in tuple MOBILITYSERVICEFINANCE should have value 1 for document
And tuple variable Product_tpKO16 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO17 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO18 in tuple MOBILITYSERVICEFINANCE should have value 1 for document
And tuple variable Product_tpKO19 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO20 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO21 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO24 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO25 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO26 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO27 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO28 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO31 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO32 in tuple MOBILITYSERVICEFINANCE should have value 1 for document
And tuple variable Product_tpKO33 in tuple MOBILITYSERVICEFINANCE should have value 1 for document
And tuple variable Product_tpKO34 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO35 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO36 in tuple MOBILITYSERVICEFINANCE should have value 1 for document
And tuple variable Product_tpKO37 in tuple MOBILITYSERVICEFINANCE should have value 1 for document
And tuple variable Product_tpKO38 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO60 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO61 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKO71 in tuple MOBILITYSERVICEFINANCE should have value 0 for document
And tuple variable Product_tpKnockedOutTotal in tuple MOBILITYSERVICEFINANCE should have value 7 for document
