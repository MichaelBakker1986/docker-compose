Scenario: scenario description
Given a document with timeunit YEAR for the HISTORY year 2016
Then variable Q_STEP01 should have value Onvolledig ingevuld. for document
When variable DeliveryType is set to 0 for document
When variable Rechtsvorm is set to 2 for document
When variable IBofJR is set to 1 for document
Then variable Q_STEP01 should have value Volledig ingevuld. for document
Then variable SelectedReportModelName should have value FrcRptIhzAangifte2016 for document
Then variable IsGeconsolideerd should have value 0 for document
When the visible variables are exported as FrcRptIhzAangifte2016.txt
When variable bdburgLivingTogetherSpousesExists is set to 0 for column with end date 2016-12-31
When the document is exported as XBRL to FrcRptIhzAangifte2016.xbrl


Scenario: FrcRptKredietKleinNatuurlijkPersoonCategoriaal2016
Given a document with timeunit YEAR for the HISTORY year 2016
Then variable Q_STEP01 should have value Onvolledig ingevuld. for document
When variable DeliveryType is set to 0 for document
When variable Rechtsvorm is set to 2 for document
When variable IBofJR is set to 0 for document
When variable EndDate is set to 2016-12-31 for document
When variable ISPLFunctional is set to 0 for document
When variable IsAgro is set to 0 for document
Then variable Q_STEP01 should have value Volledig ingevuld. for document
Then variable SelectedReportModelName should have value FrcRptKredietKleinNatuurlijkPersoonCategoriaal2016 for document
Then variable IsGeconsolideerd should have value 0 for document
And variable frcabstrDisclosureIncomeStatementBanksTitleResult should be invisible
When the visible variables are exported as FrcRptKredietKleinNatuurlijkPersoonCategoriaal2016.txt
When variable frciNumberOfBusinessPartnersInFTEs is set to 2.2 for column with end date 2016-12-31

When the document is exported as XBRL to FrcRptKredietKleinNatuurlijkPersoonCategoriaal2016.xbrl


Scenario: FrcRptKredietKleinCategoriaal2016
Given a document with timeunit YEAR for the HISTORY year 2016
Then variable Q_STEP01 should have value Onvolledig ingevuld. for document
When variable DeliveryType is set to 0 for document
When variable Rechtsvorm is set to 5 for document
When variable BalansTotaal is set to 1 for document
When variable NettoOmzet is set to 1 for document
When variable AantalMedewerkers is set to 1 for document
When variable EndDate is set to 2016-12-31 for document
When variable FiscaalOfCommercieel is set to 1 for document
Then variable Q_STEP01 should have value Volledig ingevuld. for document
Then variable SelectedReportModelName should have value FrcRptKredietKleinCategoriaal2016 for document
Then variable IsGeconsolideerd should have value 0 for document
And variable frcabstrDisclosureIncomeStatementBanksTitleFResult should be invisible
And variable frcabstrDisclosureIncomeStatementBanksTitleResult should be visible
When the visible variables are exported as FrcRptKredietKleinCategoriaal2016.txt

Scenario: Create document

Given a document with timeunit YEAR for the HISTORY year 2016
Then variable Q_STEP01 should have value Onvolledig ingevuld. for document
When variable DeliveryType is set to 0 for document
When variable Rechtsvorm is set to 2 for document
When variable IBofJR is set to 1 for document
Then variable Q_STEP01 should have value Volledig ingevuld. for document
Then variable SelectedReportModelName should have value FrcRptIhzAangifte2016 for document
Then variable IsGeconsolideerd should have value 0 for document
And variable kvktContactForDocumentPresentation_tpnlcdFirstName should be visible
Given an existing tuple instance adres of definition frcdimLocationActualActivitiesDescriptionAddressNLSpecificationAxis at position 1
And an existing tuple instance contact of definition kvktContactForDocumentPresentation at position 1
When tuple variable frcdimLocationActualActivitiesDescriptionAddressNLSpecificationAxis_tpnlcdCountryName in tuple adres is set to NL for column with end date 2016-12-31
When tuple variable frcdimLocationActualActivitiesDescriptionAddressNLSpecificationAxis_tpfrcdmDescriptionLocationNLTypedMember in tuple adres is set to eersteadres for column with end date 2016-12-31
When variable FPS_VAR_KVKnr is set to 12345678 for document
When variable FPS_FINAN_USER is set to Tester for document
When tuple variable kvktContactForDocumentPresentation_tpnlcdEmailAddressFull in tuple contact is set to info@finan.nl for column with end date 2016-12-31
When variable frciReasonDelivery is set to 0 for column with end date 2016-12-31
When variable FPS_VAR_Naam is set to Topicus for document
When variable kvkiLegalSizeCriteriaClassificationOneCol is set to 2 for document
When variable bdburgIncomeOverallAmount is set to 40000 for column with end date 2016-12-31
When variable bdburgLivingTogetherSpousesExists is set to 0 for column with end date 2016-12-31
When variable frciNumberOfBusinessPartnersInFTEs is set to 2.2 for column with end date 2016-12-31


When the document is exported as XBRL to FrcRptIhzAangifte2016.xbrl