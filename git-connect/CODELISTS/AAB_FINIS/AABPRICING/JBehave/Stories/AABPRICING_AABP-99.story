AAB Pricing story AABP-99 [Automatisch] The automatic production of Repayment and Withdrawal schemes per product.
@Author Luuk Peters & Ruben Bos
@themes Automatic schemes

Scenario: test if empty document has 0 columns

Given a document of the model type AABPRICING

Then the document should have 0 columns


Scenario: first test with time based columns 

Given a document of the model type AABPRICING
And 3 month based history columns starting from 2015-02-01
And 3 month based forecast columns
And a tuple instance bla of definition Facility


When tuple variable Facility_tpStartDate in tuple bla is set to 2015-12-17 for document

Then the document should have 6 columns
And history column with id 1 should have start date 2015-02-01
And forecast column with id 1 should have start date 2015-05-01

And tuple variable Facility_tpStartDate in tuple bla should have value 2015-12-17 for document

Scenario: test with month based forecast columns 

Given a document of the model type AABPRICING
And 3 month based forecast columns starting from 2015-02-01
And a tuple instance bla of definition Facility
And a tuple instance bla2 of definition Facility
And a tuple instance bla3 of definition Facility

When tuple variable Facility_tpStartDate in tuple bla is set to 2015-12-17 for document
And tuple variable Facility_tpStartDate in tuple bla2 is set to 2015-12-17 for document
And tuple variable Facility_tpStartDate in tuple bla3 is set to 42356 for document

Then the document should have 3 columns
And forecast column with id 1 should have start date 2015-02-01
And tuple variable Facility_tpStartDate in tuple bla should have value 2015-12-17 for document
And tuple variable Facility_tpStartDate in tuple bla2 should have value 42355 for document
And tuple variable Facility_tpStartDate in tuple bla3 should have value 2015-12-18 for document

