KAM Score Basic
@Author DEMO
@themes KAM Score basic

Scenario: Verify KAM Score calculations
Given a document of the model type KAM

When FES_LAYOUTNR is set to 1999
Then FES_LAYOUTNR should be 1999
