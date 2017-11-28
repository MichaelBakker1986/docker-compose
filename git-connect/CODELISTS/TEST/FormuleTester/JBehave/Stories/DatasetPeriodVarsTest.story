Dataset Test voor period variables

Meta:
@author Kevin van der Lei 

!-- Enabling/disabling a Dataset
Scenario: testEnableDisableDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable PeriodVariable has value 1 for the BaseLayer and period FORECAST
And variable PeriodVariable has value 100 for Dataset dataset1 and period FORECAST

When the Dataset dataset1 is enabled for Layer layer1
Then variable PeriodVariable should be 100 for period FORECAST on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable PeriodVariable should be 1 for period FORECAST on layer1

!-- Changing a Dataset value while it is enabled
Scenario: testChangeEnabledDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable PeriodVariable has value 1 for the BaseLayer and period FORECAST
And the Dataset dataset1 is enabled for Layer layer1

When variable PeriodVariable has value 100 for Dataset dataset1 and period FORECAST
Then variable PeriodVariable should be 100 for period FORECAST on layer1

When variable PeriodVariable has value 50 for Dataset dataset1 and period FORECAST
Then variable PeriodVariable should be 50 for period FORECAST on layer1

When variable PeriodVariable has value NA for Dataset dataset1 and period FORECAST
Then variable PeriodVariable should be NA for period FORECAST on layer1

!-- Removing a Dataset while it is enabled
Scenario: testRemoveEnabledDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable PeriodVariable has value 1 for the BaseLayer and period FORECAST
And variable PeriodVariable has value 100 for Dataset dataset1 and period FORECAST

When the Dataset dataset1 is enabled for Layer layer1
Then variable PeriodVariable should be 100 for period FORECAST on layer1

When the Dataset dataset1 is removed
Then variable PeriodVariable should be 1 for period FORECAST on layer1

!-- Changing the BaseLayer's values while a Dataset is enabled and in conflict	<-- more extensive tests will be necessary when mutation datasets are implemented
Scenario: testChangeBaseLayerWithEnabledDataset
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Layer layer1
When variable PeriodVariable has value 1 for the BaseLayer and period FORECAST
And variable PeriodVariable has value 100 for Dataset dataset1 and period FORECAST

When the Dataset dataset1 is enabled for Layer layer1
Then variable PeriodVariable should be 100 for period FORECAST on layer1

When variable PeriodVariable has value 2 for the BaseLayer and period FORECAST
Then variable PeriodVariable should be 100 for period FORECAST on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable PeriodVariable should be 2 for period FORECAST on layer1

!-- Enabling/disabling multiple conflicting Datasets
Scenario: testEnableDisableMultipleConflictingDatasets
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable PeriodVariable has value 1 for the BaseLayer and period FORECAST
And variable PeriodVariable has value 100 for Dataset dataset1 and period FORECAST
And variable PeriodVariable has value 200 for Dataset dataset2 and period FORECAST

When the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1
Then variable PeriodVariable should be 200 for period FORECAST on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable PeriodVariable should be 200 for period FORECAST on layer1

When the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is disabled for Layer layer1
Then variable PeriodVariable should be 100 for period FORECAST on layer1

When the Dataset dataset1 is disabled for Layer layer1
And the Dataset dataset2 is disabled for Layer layer1
Then variable PeriodVariable should be 1 for period FORECAST on layer1

!-- Changing a Dataset value while multiple conflicting Datasets are enabled
Scenario: testChangeEnabledMultipleConflictingDatasets
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable PeriodVariable has value 1 for the BaseLayer and period FORECAST
And the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1

When variable PeriodVariable has value 100 for Dataset dataset1 and period FORECAST
And variable PeriodVariable has value 200 for Dataset dataset2 and period FORECAST
Then variable PeriodVariable should be 200 for period FORECAST on layer1

When variable PeriodVariable has value 201 for Dataset dataset2 and period FORECAST
Then variable PeriodVariable should be 201 for period FORECAST on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable PeriodVariable should be 201 for period FORECAST on layer1

When the Dataset dataset2 is disabled for Layer layer1
Then variable PeriodVariable should be 1 for period FORECAST on layer1

When the Dataset dataset1 is enabled for Layer layer1
And variable PeriodVariable has value 101 for Dataset dataset1 and period FORECAST
Then variable PeriodVariable should be 101 for period FORECAST on layer1

When the Dataset dataset2 is enabled for Layer layer1
And variable PeriodVariable has value 202 for Dataset dataset2 and period FORECAST
Then variable PeriodVariable should be 202 for period FORECAST on layer1

!-- Removing a Dataset value while multiple Datasets are enabled and in conflict
Scenario: testRemoveEnabledMultipleConflictingDatasets
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable PeriodVariable has value 1 for the BaseLayer and period FORECAST
And the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1

When variable PeriodVariable has value 100 for Dataset dataset1 and period FORECAST
And variable PeriodVariable has value 200 for Dataset dataset2 and period FORECAST
Then variable PeriodVariable should be 200 for period FORECAST on layer1

When the Dataset dataset1 is removed
Then variable PeriodVariable should be 200 for period FORECAST on layer1

When the Dataset dataset2 is removed
Then variable PeriodVariable should be 1 for period FORECAST on layer1

!-- Changing the BaseLayer's values while multiple Datasets are enabled and in conflict		<-- more extensive tests will be necessary when mutation datasets are implemented
Scenario: testChangeBaseLayerWithMultipleNonConflictingDatasets
Given a document with timeunit MONTH for the forecast year 2008
And the Dataset dataset1
And the Dataset dataset2
And the Layer layer1
When variable PeriodVariable has value 1 for the BaseLayer and period FORECAST
And variable PeriodVariable has value 100 for Dataset dataset1 and period FORECAST
And variable PeriodVariable has value 200 for Dataset dataset2 and period FORECAST

When the Dataset dataset1 is enabled for Layer layer1
And the Dataset dataset2 is enabled for Layer layer1
Then variable PeriodVariable should be 200 for period FORECAST on layer1

When variable PeriodVariable has value 1000 for the BaseLayer and period FORECAST
Then variable PeriodVariable should be 200 for period FORECAST on layer1

When the Dataset dataset2 is disabled for Layer layer1
Then variable PeriodVariable should be 100 for period FORECAST on layer1

When the Dataset dataset1 is disabled for Layer layer1
Then variable PeriodVariable should be 1000 for period FORECAST on layer1