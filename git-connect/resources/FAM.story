FAM Score Basic
@Author DEMO
@themes FAM Score basic

Scenario: Verify FAM Score calculations
Given a document of the model type FAM
When FES_LAYOUT is set to 100
Then FES_LAYOUT should be 100
