test for FES disaggregation of virtual column values
Meta:
@author Kevin van der Lei

!-- Tests where current aggregate evaluates to 0
Scenario: COLUMNS: any values. INPUT: NA
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has value NA for column 2005
Then variable Sales01 should be the values NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA for column 2005

When variable Sales01 has value 0 for column 2005
And variable Sales01 has value NA for column 2005
Then variable Sales01 should be the values NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA for column 2005

When variable Sales01 has values 0, NA, 1, -2, 4, 0, 2, 4, 8, NA, 34, NA for column 2005
And variable Sales01 has value NA for column 2005
Then variable Sales01 should be the values NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA for column 2005


Scenario: COLUMNS: all NA. INPUT: 0
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has value NA for column 2005
And variable Sales01 has value 0 for column 2005
Then variable Sales01 should be the values 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 for column 2005


Scenario: COLUMNS: some assigned values, some NA. INPUT: 0
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has values 0, NA, 1, -2, 4, 0, 2, 4, 8, NA, 34, NA for column 2005
And variable Sales01 has value 0 for column 2005
Then variable Sales01 should be the values 0, NA, 0, 0, 0, 0, 0, 0, 0, NA, 0, NA for column 2005


Scenario: COLUMNS: all assigned values. INPUT: 0
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has values 0, 2, 1, -2, 4, 0, 2, 4, 8, -2, 34, 8 for column 2005
And variable Sales01 has value 0 for column 2005
Then variable Sales01 should be the values 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 for column 2005


Scenario: COLUMNS: all NA. INPUT: any number
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has value 120 for column 2005
Then variable Sales01 should be the values 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 for column 2005


Scenario: COLUMNS: some assigned value 0, some NA. INPUT: any number
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has values 0, 0, NA, 0, NA, 0, 0, 0, NA, 0, NA, NA for column 2005
And variable Sales01 has value 120 for column 2005
Then variable Sales01 should be the values 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 for column 2005


Scenario: COLUMNS: all assigned value 0. INPUT: any number
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has values 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 for column 2005
And variable Sales01 has value 120 for column 2005
Then variable Sales01 should be the values 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 for column 2005


Scenario: COLUMNS: some assigned value, some NA, current aggregate = 0. INPUT: any number
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has values 9, NA, 7, 9, 0, -4, NA, 0, -21, 0, 0, NA for column 2005
And variable Sales01 has value 120 for column 2005
Then variable Sales01 should be the values 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 for column 2005

When variable Sales01 has values 9, NA, 7, 9, 0, -4, NA, 0, -21, 0, 0, NA for column 2005
And variable Sales01 has value -120 for column 2005
Then variable Sales01 should be the values -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10 for column 2005



!-- Tests for current aggregate != 0
Scenario: COLUMNS: some assigned value, some NA, current aggregate < 0. INPUT: any number
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has values 2, NA, 4, 8, 0, -2, NA, 0, -4, -8, -10, NA for column 2005
And variable Sales01 has value 10 for column 2005
Then variable Sales01 should be the values -2, NA, -4, -8, 0, 2, NA, 0, 4, 8, 10, NA for column 2005

When variable Sales01 has values 2, NA, 4, 8, 0, -2, NA, 0, -4, -8, -10, NA for column 2005
And variable Sales01 has value -30 for column 2005
Then variable Sales01 should be the values 6, NA, 12, 24, 0, -6, NA, 0, -12, -24, -30, NA for column 2005


Scenario: COLUMNS: some assigned value, some NA, current aggregate > 0. INPUT: any number
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has values -2, NA, -4, -8, 0, 2, NA, 0, 4, 8, 10, NA for column 2005
And variable Sales01 has value -10 for column 2005
Then variable Sales01 should be the values 2, NA, 4, 8, 0, -2, NA, 0, -4, -8, -10, NA for column 2005

When variable Sales01 has values -2, NA, -4, -8, 0, 2, NA, 0, 4, 8, 10, NA for column 2005
And variable Sales01 has value 20 for column 2005
Then variable Sales01 should be the values -4, NA, -8, -16, 0, 4, NA, 0, 8, 16, 20, NA for column 2005


Scenario: COLUMNS: all assigned value, current aggregate < 0. INPUT: any number
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has values 2, 0, 4, 8, 0, -2, 0, 0, -4, -8, -10, 0 for column 2005
And variable Sales01 has value 10 for column 2005
Then variable Sales01 should be the values -2, 0, -4, -8, 0, 2, 0, 0, 4, 8, 10, 0 for column 2005

When variable Sales01 has values 2, 0, 4, 8, 0, -2, 0, 0, -4, -8, -10, 0 for column 2005
And variable Sales01 has value -30 for column 2005
Then variable Sales01 should be the values 6, 0, 12, 24, 0, -6, 0, 0, -12, -24, -30, 0 for column 2005


Scenario: COLUMNS: all assigned value, current aggregate > 0. INPUT: any number
Given a document with timeunit MONTH for the forecast year 2005
And a variable Sales01

When variable Sales01 has values -2, 0, -4, -8, 0, 2, 0, 0, 4, 8, 10, 0 for column 2005
And variable Sales01 has value -10 for column 2005
Then variable Sales01 should be the values 2, 0, 4, 8, 0, -2, 0, 0, -4, -8, -10, 0 for column 2005

When variable Sales01 has values -2, 0, -4, -8, 0, 2, 0, 0, 4, 8, 10, 0 for column 2005
And variable Sales01 has value 20 for column 2005
Then variable Sales01 should be the values -4, 0, -8, -16, 0, 4, 0, 0, 8, 16, 20, 0 for column 2005