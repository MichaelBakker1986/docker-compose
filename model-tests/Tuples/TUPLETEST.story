@Summary: Nested Tuple JBehave tests
@Support for three nested levels.

When Inkomen(John) is set to 100
And SubTotal(John,2020) is set to 101
And SubTotal(John,2021) is set to 200
And LoanPart(John,2020,AUTO) is set to 600
And LoanPart(John,2020,VAKANTIE) is set to 500
And LoanPart(John,2020,OVERIGEPOST) is set to 500
And Inkomen(Sara) is set to 400
And SubTotal(Sara,2018) is set to 300
And SubTotal(Sara,2019) is set to 400
And LoanPart(Sara,2019,AUTO) is set to 20
And LoanPart(Sara,2019,VAKANTIE) is set to 30
And LoanPart(Sara,2019,OVERIGEPOST) is set to 40
And Inkomen(Gerard) is set to 50000

Then Balance should be 1001
And OptelSubTotal(John) should be 301
And OptelSubTotal(Sara) should be 700
And TOTALLOAN(John,2020) should be 1600
And TOTALLOAN(Sara,2019) should be 90