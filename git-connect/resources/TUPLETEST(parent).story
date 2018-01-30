@Summary: Nested parent-tuple lookups

When Inkomen(ABN) is set to 100
When Inkomen(TRIODOS) is set to 200
Then LoanInkomenReference(TRIODOS,Sara,CAR) should be 200
Then LoanInkomenReference(ABN,John,VACATION) should be 100