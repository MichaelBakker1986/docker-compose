Dataset Test voor column variables

Meta:
@author Kevin van der Lei 

!-- Enabling/disabling a Dataset
Scenario: testEnableDisableDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 100 for Dataset dataset1 and column 2008

When the Dataset dataset1 is enabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable Sales01 should be 1 for column 2008 on layer1

!-- Changing a Dataset value while it is enabled
Scenario: testChangeEnabledDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And the Dataset dataset1 is enabled for Layer layer1

When variable Sales01 has value 100 for Dataset dataset1 and column 2008
Then variable Sales01 should be 100 for column 2008 on layer1

When variable Sales01 has value 50 for Dataset dataset1 and column 2008
Then variable Sales01 should be 50 for column 2008 on layer1

When variable Sales01 has value NA for Dataset dataset1 and column 2008
Then variable Sales01 should be NA for column 2008 on layer1

!-- Clearing a Dataset while it is enabled
Scenario: testClearEnabledDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 100 for Dataset dataset1 and column 2008

When the Dataset dataset1 is enabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1

When the Dataset dataset1 is cleared of all column values
Then variable Sales01 should be 1 for column 2008 on layer1

!-- Copying values to a Dataset while it is enabled
Scenario: testCopyToEnabledDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Dataset dataset3
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2008
And variable Sales01 has value 300 for Dataset dataset3 and column 2008

When the Dataset dataset1 is enabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1

When the value of Dataset dataset2 is copied to Dataset dataset1 for column 2008
Then variable Sales01 should be 200 for column 2008 on layer1

!-- Removing a Dataset while it is enabled
Scenario: testRemoveEnabledDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 100 for Dataset dataset1 and column 2008

When the Dataset dataset1 is enabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1

When the Dataset dataset1 is removed
Then variable Sales01 should be 1 for column 2008 on layer1

!-- Changing the BaseLayer's values while a Dataset is enabled and in conflict	<-- more extensive tests will be necessary when mutation datasets are implemented
Scenario: testChangeBaseLayerWithEnabledDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 100 for Dataset dataset1 and column 2008

When the Dataset dataset1 is enabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1

When variable Sales01 has value 2 for the BaseLayer and column 2008
Then variable Sales01 should be 100 for column 2008 on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable Sales01 should be 2 for column 2008 on layer1

When variable Sales01 has value NA for the BaseLayer and column 2008
Then variable Sales01 should be NA for column 2008 on layer1

!-- Clearing the BaseLayer's values while a Dataset is enabled and in conflict	<-- more extensive tests will be necessary when mutation datasets are implemented
Scenario: testClearBaseLayerWithEnabledDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 100 for Dataset dataset1 and column 2008

When the Dataset dataset1 is enabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1

When the BaseLayer is cleared of all column values
Then variable Sales01 should be 100 for column 2008 on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable Sales01 should be NA for column 2008 on layer1

!-- Copying values to the BaseLayer
Scenario: testCopyToBaseLayer
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 100 for Dataset dataset1 and column 2008

When the Dataset dataset1 is disabled for Layer layer1
Then variable Sales01 should be 1 for column 2008 on layer1
And variable Sales01 should be 0.083 for index 1 and column 2008 on the BaseLayer

When the value of Dataset dataset1 is copied to the BaseLayer for column 2008
Then variable Sales01 should be 100 for column 2008 on the BaseLayer
And variable Sales01 should be 100 for column 2008 on layer1


!-- Enabling/disabling multiple non-conflicting Datasets
Scenario: testEnableDisableMultipleNonConflictingDatasets
Given a document with timeunit MONTH for the forecast years 2008, 2009
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 2 for the BaseLayer and column 2009
And variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2009

When the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable Sales01 should be 1 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is disabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1
And variable Sales01 should be 2 for column 2009 on layer1

When the Dataset dataset1 is disabled for Layer layer1
And the Dataset dataset2 is disabled for Layer layer1
Then variable Sales01 should be 1 for column 2008 on layer1
And variable Sales01 should be 2 for column 2009 on layer1

!-- Enabling/disabling multiple conflicting Datasets
Scenario: testEnableDisableMultipleConflictingDatasets
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2008

When the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1
Then variable Sales01 should be 200 for column 2008 on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable Sales01 should be 200 for column 2008 on layer1

When the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is disabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1

When the Dataset dataset1 is disabled for Layer layer1
And the Dataset dataset2 is disabled for Layer layer1
Then variable Sales01 should be 1 for column 2008 on layer1

!-- Changing a Dataset value while multiple Datasets are enabled, but not in conflict
Scenario: testChangeEnabledMultipleNonConflictingDatasets
Given a document with timeunit MONTH for the forecast years 2008, 2009
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 2 for the BaseLayer and column 2009
And the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1

When variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2009
Then variable Sales01 should be 100 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When variable Sales01 has value 101 for Dataset dataset1 and column 2008
Then variable Sales01 should be 101 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When variable Sales01 has value 201 for Dataset dataset2 and column 2009
Then variable Sales01 should be 101 for column 2008 on layer1
And variable Sales01 should be 201 for column 2009 on layer1

When variable Sales01 has value NA for Dataset dataset2 and column 2009
Then variable Sales01 should be 101 for column 2008 on layer1
And variable Sales01 should be NA for column 2009 on layer1

!-- Changing a Dataset value while multiple conflicting Datasets are enabled
Scenario: testChangeEnabledMultipleConflictingDatasets
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1

When variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2008
Then variable Sales01 should be 200 for column 2008 on layer1

When variable Sales01 has value 201 for Dataset dataset2 and column 2008
Then variable Sales01 should be 201 for column 2008 on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable Sales01 should be 201 for column 2008 on layer1

When the Dataset dataset2 is disabled for Layer layer1
Then variable Sales01 should be 1 for column 2008 on layer1

When the Dataset dataset1 is enabled for Layer layer1
And variable Sales01 has value 101 for Dataset dataset1 and column 2008
Then variable Sales01 should be 101 for column 2008 on layer1

When the Dataset dataset2 is enabled for Layer layer1
And variable Sales01 has value 202 for Dataset dataset2 and column 2008
Then variable Sales01 should be 202 for column 2008 on layer1

!-- Removing a Dataset value while multiple Datasets are enabled, but not in conflict
Scenario: testRemoveEnabledMultipleNonConflictingDatasets
Given a document with timeunit MONTH for the forecast years 2008, 2009
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 2 for the BaseLayer and column 2009
And the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1

When variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2009
Then variable Sales01 should be 100 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When the Dataset dataset1 is removed
Then variable Sales01 should be 1 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When the Dataset dataset2 is removed
Then variable Sales01 should be 1 for column 2008 on layer1
And variable Sales01 should be 2 for column 2009 on layer1

!-- Removing a Dataset value while multiple Datasets are enabled and in conflict
Scenario: testRemoveEnabledMultipleConflictingDatasets
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1

When variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2008
Then variable Sales01 should be 200 for column 2008 on layer1

When the Dataset dataset1 is removed
Then variable Sales01 should be 200 for column 2008 on layer1

When the Dataset dataset2 is removed
Then variable Sales01 should be 1 for column 2008 on layer1

!-- Clearing a Dataset value while multiple Datasets are enabled, but not in conflict
Scenario: testClearEnabledMultipleNonConflictingDatasets
Given a document with timeunit MONTH for the forecast years 2008, 2009
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 2 for the BaseLayer and column 2009
And the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1

When variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2009
Then variable Sales01 should be 100 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When the Dataset dataset1 is cleared of all column values
Then variable Sales01 should be 1 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When the Dataset dataset2 is cleared of all column values
Then variable Sales01 should be 1 for column 2008 on layer1
And variable Sales01 should be 2 for column 2009 on layer1

!-- Clearing a Dataset value while multiple Datasets are enabled and in conflict
Scenario: testClearEnabledMultipleConflictingDatasets
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1

When variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2008
Then variable Sales01 should be 200 for column 2008 on layer1

When the Dataset dataset1 is cleared of all column values
Then variable Sales01 should be 200 for column 2008 on layer1

When the Dataset dataset2 is cleared of all column values
Then variable Sales01 should be 1 for column 2008 on layer1

When variable Sales01 has value 101 for Dataset dataset1 and column 2008
Then variable Sales01 should be 101 for column 2008 on layer1

!-- Changing the BaseLayer's values while multiple Datasets are enabled, but not in conflict	<-- more extensive tests will be necessary when mutation datasets are implemented
Scenario: testChangeBaseLayerWithMultipleNonConflictingDatasets
Given a document with timeunit MONTH for the forecast years 2008, 2009
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 2 for the BaseLayer and column 2009
And variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2009

When the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When variable Sales01 has value 1000 for the BaseLayer and column 2008
And variable Sales01 has value 2000 for the BaseLayer and column 2009
Then variable Sales01 should be 100 for column 2008 on layer1
And variable Sales01 should be 200 for column 2009 on layer1

When the Dataset dataset1 is disabled for Layer layer1
And the Dataset dataset2 is disabled for Layer layer1
Then variable Sales01 should be 1000 for column 2008 on layer1
And variable Sales01 should be 2000 for column 2009 on layer1

!-- Changing the BaseLayer's values while multiple Datasets are enabled and in conflict		<-- more extensive tests will be necessary when mutation datasets are implemented
Scenario: testChangeBaseLayerWithMultipleNonConflictingDatasets
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable Sales01 has value 1 for the BaseLayer and column 2008
And variable Sales01 has value 100 for Dataset dataset1 and column 2008
And variable Sales01 has value 200 for Dataset dataset2 and column 2008

When the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1
Then variable Sales01 should be 200 for column 2008 on layer1

When variable Sales01 has value 1000 for the BaseLayer and column 2008
Then variable Sales01 should be 200 for column 2008 on layer1

When the Dataset dataset2 is disabled for Layer layer1
Then variable Sales01 should be 100 for column 2008 on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable Sales01 should be 1000 for column 2008 on layer1