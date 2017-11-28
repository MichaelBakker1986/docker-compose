Scenario: Create document

Given a document with timeunit YEAR for the NOTREND year 2016
And an existing tuple instance adres of definition frcdimLocationActualActivitiesDescriptionAddressNLSpecificationAxis at position 1
And an existing tuple instance contact of definition kvktContactForDocumentPresentation at position 1
When tuple variable frcdimLocationActualActivitiesDescriptionAddressNLSpecificationAxis_tpnlcdCountryName in tuple adres is set to NL for column with end date 2016-12-31
When tuple variable frcdimLocationActualActivitiesDescriptionAddressNLSpecificationAxis_tpfrcdmDescriptionLocationNLTypedMember in tuple adres is set to eersteadres for column with end date 2016-12-31
When variable JAVA_ENTREPRENEUR_CHAMBEROFCOMMERCENUMBER is set to 12345678 for document
When variable JAVA_ENTREPRENEUR_NAME is set to Tester for document
When variable JAVA_BANKNAME is set to Rabobank for document
When tuple variable kvktContactForDocumentPresentation_tpnlcdEmailAddressFull in tuple contact is set to info@finan.nl for column with end date 2016-12-31
When variable frciReasonDelivery is set to 2 for column with end date 2016-12-31
When variable IsEnkelvoudig is set to 1 for document
When variable IsGeconsolideerd is set to 0 for document
When variable IsAgro is set to 0 for document
When variable JAVA_ENTREPRENEUR_COMPANYNAME is set to Topicus for document
When variable kvkiLegalSizeCriteriaClassification is set to 1 for column with end date 2016-12-31
Then variable Q_STEP01 should have value Onvolledig ingevuld. for document
Then variable Q_STEP01 should have value Onvolledig ingevuld. for document
When the visible variables are exported as FrcRptKredietKleinCategoriaal2016.txt
When the document is exported as XBRL to target/xbrl.xbrl