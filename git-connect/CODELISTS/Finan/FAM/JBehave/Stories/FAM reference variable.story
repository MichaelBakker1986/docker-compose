FAM Story
@Author Bernd
@themes Map open fields

Scenario: UserFullName

Given a document of the model type FAM
When variable FPS_VAR_UserFullName is set to Bernd Kottier for document
Then variable IntermediaryName should have value Bernd Kottier for document

Given document TestData/FAMDocument.xml of the model type FAM
Then variable Q_STATUS_STARTED_BY should have value admin@finan.nl for document