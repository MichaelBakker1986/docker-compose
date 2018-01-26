@Summary: The tests are basic, only the TSUM is actually used

When ChildGender(Piet) is set to Boy
And NrOfDaysChildcareWeek(Piet) is set to 2
And NrOfDaysOutOfSchoolCareWeek(Piet) is set to 3
And SecondaryEducationProfile(Piet) is set to VMBO-MBO
And TotalYearlyCostsChild(Piet) is set to 12711.65 for column with id 1
And TotalYearlyCostsChild(Piet) is set to 10911.65 for column with id 2
And TotalYearlyCostsChild(Piet) is set to 10981.65 for column with id 3
And TotalYearlyCostsChild(Piet) is set to 8498.65 for column with id 4
And TotalYearlyCostsChild(Piet) is set to 9149.90 for column with id 5
And TotalYearlyCostsChild(Piet) is set to 9149.90 for column with id 6
And TotalYearlyCostsChild(Piet) is set to 9149.90 for column with id 7
And TotalYearlyCostsChild(Piet) is set to 9149.90 for column with id 8
And TotalYearlyCostsChild(Piet) is set to 9149.90 for column with id 9
And TotalYearlyCostsChild(Piet) is set to 9540.45 for column with id 10
And TotalYearlyCostsChild(Piet) is set to 9660.45 for column with id 11
And TotalYearlyCostsChild(Piet) is set to 6080.05 for column with id 12
And TotalYearlyCostsChild(Piet) is set to 6458.05 for column with id 13
And TotalYearlyCostsChild(Piet) is set to 6494.05 for column with id 14
And TotalYearlyCostsChild(Piet) is set to 7069.20 for column with id 15
And TotalYearlyCostsChild(Piet) is set to 7081.20 for column with id 16
And TotalYearlyCostsChild(Piet) is set to 7593.20 for column with id 17
And TotalYearlyCostsChild(Piet) is set to 9129.20 for column with id 18

And ChildGender(Sara) is set to Girl
And NrOfDaysChildcareWeek(Sara) is set to 4
And NrOfDaysOutOfSchoolCareWeek(Sara) is set to 4
And SecondaryEducationProfile(Sara) is set to HAVO
And TotalYearlyCostsChild(Sara) is set to 19566.05 for column with id 1
And TotalYearlyCostsChild(Sara) is set to 17766.05 for column with id 2
And TotalYearlyCostsChild(Sara) is set to 17836.05 for column with id 3
And TotalYearlyCostsChild(Sara) is set to 9967.45 for column with id 4
And TotalYearlyCostsChild(Sara) is set to 10618.70 for column with id 5
And TotalYearlyCostsChild(Sara) is set to 10618.70 for column with id 6
And TotalYearlyCostsChild(Sara) is set to 10618.70 for column with id 7
And TotalYearlyCostsChild(Sara) is set to 10618.70 for column with id 8
And TotalYearlyCostsChild(Sara) is set to 10618.70 for column with id 9
And TotalYearlyCostsChild(Sara) is set to 11009.25 for column with id 10
And TotalYearlyCostsChild(Sara) is set to 11129.25 for column with id 11
And TotalYearlyCostsChild(Sara) is set to 5709.05 for column with id 12
And TotalYearlyCostsChild(Sara) is set to 6087.05 for column with id 13
And TotalYearlyCostsChild(Sara) is set to 6123.05 for column with id 14
And TotalYearlyCostsChild(Sara) is set to 6486.50 for column with id 15
And TotalYearlyCostsChild(Sara) is set to 6498.50 for column with id 16
And TotalYearlyCostsChild(Sara) is set to 7010.50 for column with id 17
And TotalYearlyCostsChild(Sara) is set to 8546.50 for column with id 18

And ChildGender(John) is set to Boy
And NrOfDaysChildcareWeek(John) is set to 1
And NrOfDaysOutOfSchoolCareWeek(John) is set to 1
And SecondaryEducationProfile(John) is set to VMBO-HAVO
And TotalYearlyCostsChild(John) is set to 9284.45 for column with id 1
And TotalYearlyCostsChild(John) is set to 7484.45 for column with id 2
And TotalYearlyCostsChild(John) is set to 7554.45 for column with id 3
And TotalYearlyCostsChild(John) is set to 5561.05 for column with id 4
And TotalYearlyCostsChild(John) is set to 6212.30 for column with id 5
And TotalYearlyCostsChild(John) is set to 6212.30 for column with id 6
And TotalYearlyCostsChild(John) is set to 6212.30 for column with id 7
And TotalYearlyCostsChild(John) is set to 6212.30 for column with id 8
And TotalYearlyCostsChild(John) is set to 6212.30 for column with id 9
And TotalYearlyCostsChild(John) is set to 6602.85 for column with id 10
And TotalYearlyCostsChild(John) is set to 6722.85 for column with id 11
And TotalYearlyCostsChild(John) is set to 5709.05 for column with id 12
And TotalYearlyCostsChild(John) is set to 6087.05 for column with id 13
And TotalYearlyCostsChild(John) is set to 6123.05 for column with id 14
And TotalYearlyCostsChild(John) is set to 6698.20 for column with id 15
And TotalYearlyCostsChild(John) is set to 6710.20 for column with id 16
And TotalYearlyCostsChild(John) is set to 7222.20 for column with id 17
And TotalYearlyCostsChild(John) is set to 8758.20 for column with id 18

Then TotalYearlyCosts should be 41562.15 for column with id 1
Then TotalYearlyCosts should be 36162.15 for column with id 2
Then TotalYearlyCosts should be 36372.15 for column with id 3
Then TotalYearlyCosts should be 24027.15 for column with id 4
Then TotalYearlyCosts should be 25980.90 for column with id 5
Then TotalYearlyCosts should be 25980.90 for column with id 6
Then TotalYearlyCosts should be 25980.90 for column with id 7
Then TotalYearlyCosts should be 25980.90 for column with id 8
Then TotalYearlyCosts should be 25980.90 for column with id 9
Then TotalYearlyCosts should be 27152.55 for column with id 10
Then TotalYearlyCosts should be 27512.55 for column with id 11
Then TotalYearlyCosts should be 17498.15 for column with id 12
Then TotalYearlyCosts should be 18632.15 for column with id 13
Then TotalYearlyCosts should be 18740.15 for column with id 14
Then TotalYearlyCosts should be 20253.90 for column with id 15
Then TotalYearlyCosts should be 20289.90 for column with id 16
Then TotalYearlyCosts should be 21825.90 for column with id 17
Then TotalYearlyCosts should be 26433.90 for column with id 18