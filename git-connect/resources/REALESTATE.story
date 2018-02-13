REALESTATE Score Basic
@Author DEMO
@themes REALESTATE Score basic

Scenario: Verify REALESTATE Score calculations
Given a document of the model type REALESTATE

Then Q_STEP01_PROGRESS should be 1
And Q_STEP01_OPENVALIDATION should be Nee
And Q_STEP01_REQUIREDVARS should be 0

And Q_STEP02_REQUIREDVARS should be 16
When AqrCollateralData_frcvtdmInternalIDCollateralTypedMember is set to somevalue
Then Q_STEP02_ENTEREDREQUIREDVARS should be 1

Then Q_STEP02_PROGRESS should be 0