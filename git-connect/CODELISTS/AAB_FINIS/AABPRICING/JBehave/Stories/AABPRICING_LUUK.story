Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Indirect Liquidity Costs 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility
When tuple variables in tuple Facility1 are set:

|variable|value|

Facility_tpIndirectLiquidityCosts               |40000|

And tuple variables in tuple Facility2 are set:

|variable|value|

Facility_tpIndirectLiquidityCosts               |60000|


Then variable Borrower_tpIndirectLiquidityCosts should have value 100000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Equity Capital Charge 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

And a tuple instance NonCreditItem1 of definition Borrower_tpNonCredit
And a tuple instance NonCreditItem2 of definition Borrower_tpNonCredit

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpEquityCapitalCharge                  |40000|
And tuple variables in tuple Facility2 are set:
|variable|value|
Facility_tpEquityCapitalCharge                  |60000|

And tuple variables in tuple NonCreditItem1 are set:
|variable|value|
Borrower_tpNonCredit_tpEquityCapitalCharge         |30000|

And tuple variables in tuple NonCreditItem2 are set:
|variable|value|
Borrower_tpNonCredit_tpEquityCapitalCharge         |20000|

Then variable Borrower_tpEquityCapitalCharge should have value 100000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Principal Limit 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpPrincipalLimit                       |40000|
And tuple variables in tuple Facility2 are set:
|variable|value|
Facility_tpPrincipalLimit                       |60000|

Then variable Borrower_tpPrincipalLimit should have value 100000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - Outstanding 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpExpectedAverageOutstanding           |40000|
And tuple variables in tuple Facility2 are set:
|variable|value|
Facility_tpExpectedAverageOutstanding           |60000|

Then variable Borrower_tpExpectedAverageOutstanding should have value 100000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - RWACreditRisk 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpRWACreditRisk                        |40000|
And tuple variables in tuple Facility2 are set:
|variable|value|
Facility_tpRWACreditRisk                        |60000|

Then variable Borrower_tpRWACreditRisk should have value 100000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - RWA Operational Risk 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

And a tuple instance NonCreditItem1 of definition Borrower_tpNonCredit
And a tuple instance NonCreditItem2 of definition Borrower_tpNonCredit

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpRWAOperationalRisk                    |40000|
And tuple variables in tuple Facility2 are set:
|variable|value|
Facility_tpRWAOperationalRisk                    |60000|

!-- leave NonCreditItem check in place! these values must not influence the result.
And tuple variables in tuple NonCreditItem1 are set:
|variable|value|
Borrower_tpNonCredit_tpORNonCreditRisk                        |30000|

And tuple variables in tuple NonCreditItem2 are set:
|variable|value|
Borrower_tpNonCredit_tpORNonCreditRisk                        |20000|


Then model version should as least be 1.9.21
And variable Borrower_tpRWAOperationalRisk should have value 100000 for document
And variable Borrower_tpCrossSellOperationalRisk should have value 50000 for document

Scenario: User story [AABP-1213] Calculations on borrower level - Credit - EAD 

Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility
And a tuple instance Facility2 of definition Facility

When tuple variables in tuple Facility1 are set:
|variable|value|
Facility_tpEAD                                  |40000|
And tuple variables in tuple Facility2 are set:
|variable|value|
Facility_tpEAD                                  |60000|

Then variable Borrower_tpEAD should have value 100000 for document
And model version should as least be 1.9.16
