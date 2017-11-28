Test IRR and NPV/NPV2 methods, used in valuation application

Meta:
@author Kevin van der Lei

Scenario: testIRR_0
Given a document with timeunit MONTH for the historic year 2005

When variable IRRCashFlow has value -100 for column with month january in year 2005
When variable IRRCashFlow has value 101 for column with month february in year 2005
And variable IRRStartColumn has value 1 for the BaseLayer and period HISTORY
And variable IRREndColumn has value 2 for the BaseLayer and period HISTORY

Then variable IRRResult should be 0.13 for period HISTORY on the BaseLayer

Scenario: testIRR_1
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable IRRCashFlow has value -1000 for column 2005
When variable IRRCashFlow has value 100 for column 2006
When variable IRRCashFlow has value 100 for column 2007
When variable IRRCashFlow has value 100 for column 2008
When variable IRRCashFlow has value 1100 for column 2009
And variable IRRStartColumn has value 1 for the BaseLayer and period HISTORY
And variable IRREndColumn has value 60 for the BaseLayer and period HISTORY

Then variable IRRResult should be 0.10 for period HISTORY on the BaseLayer

Scenario: testIRR_2
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable IRRCashFlow has value -1000 for column 2005
When variable IRRCashFlow has value 100 for column 2006
When variable IRRCashFlow has value 300 for column 2007
When variable IRRCashFlow has value 100 for column 2008
When variable IRRCashFlow has value 1100 for column 2009
And variable IRRStartColumn has value 1 for the BaseLayer and period HISTORY
And variable IRREndColumn has value 60 for the BaseLayer and period HISTORY

Then variable IRRResult should be 0.15 for period HISTORY on the BaseLayer

Scenario: testIRR_3
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable IRRCashFlow has value -1000 for column 2005
When variable IRRCashFlow has value 600 for column 2006
When variable IRRCashFlow has value 100 for column 2007
When variable IRRCashFlow has value -209 for column 2008
When variable IRRCashFlow has value 1100 for column 2009
And variable IRRStartColumn has value 1 for the BaseLayer and period HISTORY
And variable IRREndColumn has value 60 for the BaseLayer and period HISTORY

Then variable IRRResult should be 0.19 for period HISTORY on the BaseLayer



Scenario: testNPV_0
Given a document with timeunit MONTH for the historic year 2005

When variable NPVRate has value 1 for the BaseLayer and period HISTORY
When variable NPVCashFlow has value -100 for column with month january in year 2005
When variable NPVCashFlow has value 101 for column with month february in year 2005
And variable NPVStartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPVEndColumn has value 2 for the BaseLayer and period HISTORY
And variable NPVDateTime has value 37987 for the BaseLayer and period HISTORY

Then variable NPVResult should be -2.27 for period HISTORY on the BaseLayer

Scenario: testNPV_1
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPVRate has value 0.10 for the BaseLayer and period HISTORY
When variable NPVCashFlow has value -1000 for the BaseLayer and column 2005
When variable NPVCashFlow has value 100 for the BaseLayer and column 2006
When variable NPVCashFlow has value 100 for the BaseLayer and column 2007
When variable NPVCashFlow has value 100 for the BaseLayer and column 2008
When variable NPVCashFlow has value 1100 for the BaseLayer and column 2009
And variable NPVStartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPVEndColumn has value 60 for the BaseLayer and period HISTORY
And variable NPVDateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPVResult should be 0 for period HISTORY on the BaseLayer

Scenario: testNPV_2
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPVRate has value 0.10 for the BaseLayer and period HISTORY
When variable NPVCashFlow has value -1000 for column 2005
When variable NPVCashFlow has value 100 for column 2006
When variable NPVCashFlow has value 300 for column 2007
When variable NPVCashFlow has value 100 for column 2008
When variable NPVCashFlow has value 1100 for column 2009
And variable NPVStartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPVEndColumn has value 60 for the BaseLayer and period HISTORY
And variable NPVDateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPVResult should be 157.66 for period HISTORY on the BaseLayer

Scenario: testNPV_3
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPVRate has value 0.09 for the BaseLayer and period HISTORY
When variable NPVCashFlow has value -1000 for column 2005
When variable NPVCashFlow has value 100 for column 2006
When variable NPVCashFlow has value 100 for column 2007
When variable NPVCashFlow has value 100 for column 2008
When variable NPVCashFlow has value 1100 for column 2009
And variable NPVStartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPVEndColumn has value 60 for the BaseLayer and period HISTORY
And variable NPVDateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPVResult should be 31.04 for period HISTORY on the BaseLayer

Scenario: testNPV_4
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPVRate has value 0.09 for the BaseLayer and period HISTORY
When variable NPVCashFlow has value -1000 for column 2005
When variable NPVCashFlow has value 100 for column 2006
When variable NPVCashFlow has value 100 for column 2007
When variable NPVCashFlow has value 100 for column 2008
When variable NPVCashFlow has value 1100 for column 2009
And variable NPVStartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPVEndColumn has value 60 for the BaseLayer and period HISTORY
And variable NPVDateTime has value 40179 for the BaseLayer and period HISTORY

Then variable NPVResult should be 47.76 for period HISTORY on the BaseLayer



Scenario: testNPV2_0.5
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has values 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.12 for column 2005
And variable NPV2Rate has values 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.12 for column 2006
And variable NPV2CashFlow has values -1000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 500 for column 2005
And variable NPV2CashFlow has values -1000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 500 for column 2006
And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 24 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 985.94 for period HISTORY on the BaseLayer

Scenario: testNPV2_0
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has value 0.12 for column 2005
And variable NPV2Rate has value 0.12 for column 2006
Then variable NPV2Rate should be the values 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12 for column 2005
Then variable NPV2Rate should be the values 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12 for column 2006

When variable NPV2CashFlow has values -1000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 500 for column 2005
And variable NPV2CashFlow has values -1000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 500 for column 2006
And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 24 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 820.85 for period HISTORY on the BaseLayer

Scenario: testNPV2_1
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has value 0.01 for column with month january in year 2005
And variable NPV2Rate has value 0.01 for column with month february in year 2005
And variable NPV2Rate has value 0.02 for column with month march in year 2005
And variable NPV2CashFlow has value 5 for column with month january in year 2005
And variable NPV2CashFlow has value 100 for column with month february in year 2005
And variable NPV2CashFlow has value 2 for column with month march in year 2005

And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 3 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 106.87 for period HISTORY on the BaseLayer

Scenario: testNPV2_2
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has value 0 for column with month january in year 2005
And variable NPV2Rate has value 0.01 for column with month february in year 2005
And variable NPV2CashFlow has value 0 for column with month january in year 2005
And variable NPV2CashFlow has value 100 for column with month february in year 2005

And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 2 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 99.92 for period HISTORY on the BaseLayer

Scenario: testNPV2_3
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has value 0 for column with month january in year 2005
And variable NPV2Rate has value 0.0 for column with month february in year 2005
And variable NPV2CashFlow has value 0 for column with month january in year 2005
And variable NPV2CashFlow has value 110 for column with month february in year 2005

And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 2 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 110 for period HISTORY on the BaseLayer

Scenario: testNPV2_4
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has value 0.05 for column with month january in year 2005
And variable NPV2Rate has value 0.10 for column with month february in year 2005
And variable NPV2CashFlow has value -100 for column with month january in year 2005
And variable NPV2CashFlow has value 110 for column with month february in year 2005

And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 2 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 9.11 for period HISTORY on the BaseLayer

Scenario: testNPV2_5
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has value 0 for column with month january in year 2005
And variable NPV2Rate has value 0.0 for column with month february in year 2005
And variable NPV2CashFlow has value 0 for column with month january in year 2005
And variable NPV2CashFlow has value 110 for column with month february in year 2005

And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 2 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 110 for period HISTORY on the BaseLayer

Scenario: testNPV2_6
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has values 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 for column 2005
And variable NPV2Rate has values 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10 for column 2006
And variable NPV2Rate has values 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10 for column 2007
And variable NPV2Rate has values 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10 for column 2008
And variable NPV2Rate has values 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25 for column 2009
And variable NPV2CashFlow has value 0 for column 2005
And variable NPV2CashFlow has value 11 for column 2006
And variable NPV2CashFlow has value 12.10 for column 2007
And variable NPV2CashFlow has value 13.31 for column 2008
And variable NPV2CashFlow has value 16.64 for column 2009

And variable NPV2StartColumn has value 13 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 60 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38475 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 40.02 for period HISTORY on the BaseLayer

Scenario: testNPV2_7
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has values 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10 for column 2005
And variable NPV2Rate has values 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05 for column 2006
And variable NPV2Rate has values 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12 for column 2007
And variable NPV2Rate has values 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15 for column 2008
And variable NPV2Rate has values -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05 for column 2009
When variable NPV2CashFlow has value -1000 for column 2005
When variable NPV2CashFlow has value 100 for column 2006
When variable NPV2CashFlow has value 100 for column 2007
When variable NPV2CashFlow has value 100 for column 2008
When variable NPV2CashFlow has value 10000 for column 2009
And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 60 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 2898.60 for period HISTORY on the BaseLayer

Scenario: testNPV2_8
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has values 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10 for column 2005
And variable NPV2Rate has values 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05 for column 2006
And variable NPV2Rate has values 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12 for column 2007
And variable NPV2Rate has values 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15 for column 2008
And variable NPV2Rate has values -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05 for column 2009
When variable NPV2CashFlow has value -1000 for column 2005
When variable NPV2CashFlow has value 100 for column 2006
When variable NPV2CashFlow has value 100 for column 2007
When variable NPV2CashFlow has value 100 for column 2008
When variable NPV2CashFlow has value 1100 for column 2009
And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 60 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be -364.37 for period HISTORY on the BaseLayer

Scenario: testNPV2_9
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has values 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10 for column 2005
And variable NPV2Rate has values 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05 for column 2006
And variable NPV2Rate has values 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12 for column 2007
And variable NPV2Rate has values 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15 for column 2008
And variable NPV2Rate has values -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05 for column 2009
When variable NPV2CashFlow has value -1000 for column 2005
When variable NPV2CashFlow has value 100 for column 2006
When variable NPV2CashFlow has value 100 for column 2007
When variable NPV2CashFlow has value 100 for column 2008
When variable NPV2CashFlow has value 10000 for column 2009
And variable NPV2StartColumn has value 13 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 60 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 38353 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 4028.05 for period HISTORY on the BaseLayer

Scenario: testNPV2_10
Given a document with timeunit MONTH for the historic years 2005, 2006, 2007, 2008, 2009

When variable NPV2Rate has values 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10 for column 2005
And variable NPV2Rate has values 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05 for column 2006
And variable NPV2Rate has values 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12 for column 2007
And variable NPV2Rate has values 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15 for column 2008
And variable NPV2Rate has values -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05, -0.05 for column 2009
When variable NPV2CashFlow has value -1000 for column 2005
When variable NPV2CashFlow has value 100 for column 2006
When variable NPV2CashFlow has value 100 for column 2007
When variable NPV2CashFlow has value 100 for column 2008
When variable NPV2CashFlow has value 10000 for column 2009
And variable NPV2StartColumn has value 1 for the BaseLayer and period HISTORY
And variable NPV2EndColumn has value 60 for the BaseLayer and period HISTORY
And variable NPV2DateTime has value 39278 for the BaseLayer and period HISTORY

Then variable NPV2Result should be 3693.13 for period HISTORY on the BaseLayer