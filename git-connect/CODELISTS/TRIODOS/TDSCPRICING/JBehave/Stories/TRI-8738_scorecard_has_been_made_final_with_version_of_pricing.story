Pricing first
@Author Luuk Peters
@themes Pricing first

Scenario: This scorecard has been made final with previous version of pricing.
Given a document of the model type TDSCPRICING
When variable Q_ModelVersion_FIXED is set to 01.00.035.009 for document
And variable Q_Status is set to 1 for document
Then variable Q_Status should have value Final for document
And variable Q_ModelVersion_FIXED should have value 01.00.035.009 for document
And variable Q_GLOBAL_VALIDATION should have a non empty value for document


Scenario: This scorecard has been made final with new version of pricing.
Given a document of the model type TDSCPRICING
When variable Q_ModelVersion_FIXED is set to 02.01.01.008 for document
And variable Q_Status is set to 1 for document
Then variable Q_Status should have value Final for document
And variable Q_ModelVersion_FIXED should have value 02.01.01.008 for document
And variable Q_GLOBAL_VALIDATION should have a value with length 0 for document


Scenario: Making this scorecard final with previous version of pricing.
Given a document of the model type TDSCPRICING
When variable Q_STATUS_FINAL_ON is set to 2017-11-08 for document
Then variable Q_ModelVersion_FIXED should have a non empty value for document
