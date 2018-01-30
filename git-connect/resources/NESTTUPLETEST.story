@Summary: Nested Tuple JBehave tests
@Support for three nested levels.

When Inkomen(ABN) is set to 100
And SubTotal(ABN,John) is set to 101
And SubTotal(ABN,Teijn) is set to 200
And LoanPart(ABN,John,AUTO) is set to 600
And LoanPart(ABN,John,VAKANTIE) is set to 500
And LoanPart(ABN,John,OVERIGEPOST) is set to 500
And Inkomen(TRIODOS) is set to 400
And SubTotal(TRIODOS,Harold) is set to 300
And SubTotal(TRIODOS,Sara) is set to 400
And LoanPart(TRIODOS,Sara,AUTO) is set to 20
And LoanPart(TRIODOS,Sara,VAKANTIE) is set to 30
And LoanPart(TRIODOS,Sara,OVERIGEPOST) is set to 40
And Inkomen(Gerard) is set to 50000

Then Balance should be 1001
And OptelSubTotal(ABN) should be 301
And OptelSubTotal(TRIODOS) should be 700
And TOTALLOAN(ABN,John) should be 1600
And TOTALLOAN(TRIODOS,Sara) should be 90