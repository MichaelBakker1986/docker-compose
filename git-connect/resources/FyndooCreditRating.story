FyndooCreditRating Score Basic
@Author DEMO
@themes FyndooCreditRating Score basic

Scenario: Verify FyndooCreditRating Score calculations
Given a document of the model type FyndooCreditRating

When sdeGoodWill is set to 1
When sdeReceivablesShareholders is set to 1
When sdeDeferredTaxesAssets is set to 1
When sdeEquity is set to 1
When sdeResultForTheYear is set to 1
When sdeVarCapLimitedPartners is set to 1
When sdeProvisions is set to 1
When sdeLiabilitiesLong is set to 1
When sdeLiabilitiesBankLong is set to 1
When sdeLongTradePayables is set to 1
When sdeLongReceivedAdvanceOrdersCurrent is set to 1
When sdeLiabilitiesToShareholdersOver5Y is set to 1
When sdeLiabilitiesShort is set to 1
When sdeLiabilitiesBankShort is set to 1
When sdeTradePayables is set to 1
When sdeReceivedAdvanceOrdersCurrent is set to 1
When sdeShortShareholderPayables is set to 1
When sdeSales is set to 1
When sdeDepreciation is set to 1
When sdeResultCorrections is set to 1
When sdeEBIT is set to 1
When sdeInterestEarnings is set to 1
When sdeInterestExpenses is set to 1
When sdeParticipationEarnings is set to 1
When sdeEntrepreneurFeeOutsideResult is set to 1
When ModelConfiguration is set to 1
When krInsolvenzquote is set to 1
When CreditRatingScorecard is set to 1
When root is set to 1
Then sdeBalanceSheetTotal should be 4
Then URAPD should be 0
@Then URARatingClass should be 1e-10
Then URATrafficLight should be 0
@Then URATrafficLightD should be 1e-10
@Then URATrafficLightDNL should be 1e-10
Then IFDRatingClass should be 0
@hen IFDRatingClassD should be 1e-10
Then R1_P1_OrdinaryResult should be 1
Then R1_P2_NetBalanceSheetTotalForTheRating should be 2
Then R2_P1_AmountsDueToBanksAndSuppliers should be 4
Then R2_P2_NetBalanceSheetTotalForTheRating should be 2
Then R3_P1_InteresExpenseExlcudingDiscountingOfProfisions should be 1
Then R3_P2_Liabilities should be 2
Then R4_P1_ShortTermLiabilities should be 1
Then R4_P2_Sales should be 1
Then R5_P1_RatingOrientatedBusinessEquity should be -3
Then R5_P2_RatingOrientedBalanceSheetTotal should be -1
Then sdePD should be 0
@Then sdeURARatingKlasse should be NA
Then krOrdentlichesErgebnisSub1 should be 1
Then krOrdentlichesErgebnisSub2 should be 1
Then krOrdentlichesErgebnisSub3 should be 1
Then krOrdentlichesErgebnisSub4 should be 1
Then krOrdentlichesErgebnisSub5 should be 1
Then krOrdentlichesErgebnisSub6 should be 1
Then krOrdentlichesErgebnisSub7 should be 1
Then krOrdentlichesErgebnisSub8 should be 1
Then krNettoBilanzsummeRatingSub1 should be -1
Then krNettoBilanzsummeRatingSub2 should be 1
Then krNettoBilanzsummeRatingSub3 should be 1
Then krNettoBilanzsummeRatingSub4 should be 1
Then krNettoBilanzsummeRatingSub5 should be 1
Then krNettoBilanzsummeRatingSub6 should be 1
Then krNettoBilanzsummeRatingSub7 should be 4
Then krNettoBilanzsummeRatingSub8 should be 1
Then krNettoBilanzsummeRatingSub9 should be 1
Then krNettoBilanzsummeRatingSub10 should be 2
Then krAnteilOrdentlichenErgebnissesSub3 should be 0.5
Then krBankUndLieferantenverbindlichkeitenSub1 should be 1
Then krBankUndLieferantenverbindlichkeitenSub2 should be 1
Then krBankUndLieferantenverbindlichkeitenSub3 should be 1
Then krBankUndLieferantenverbindlichkeitenSub4 should be 1
Then krBankUndLieferantenverbindlichkeitenSub5 should be 4
Then krBankUndLieferantenanteilSub2 should be 2
Then krBankUndLieferantenanteilSub3 should be 2
Then krZinsenSub1 should be 1
Then krZinsenSub2 should be 1
Then krVerbindlichkeitenSub1 should be 1
Then krVerbindlichkeitenSub2 should be 1
Then krVerbindlichkeitenSub3 should be 1
Then krVerbindlichkeitenSub4 should be 1
Then krVerbindlichkeitenSub5 should be 1
Then krVerbindlichkeitenSub6 should be 1
Then krVerbindlichkeitenSub7 should be 2
Then krFremdKapitalzinslastSub3 should be 0.5
Then krKurzfristigeVerbindlichkeitenSub1 should be 1
Then krKurzfristigeVerbindlichkeitenSub2 should be 1
Then krKurzfristigeVerbindlichkeitenSub3 should be 1
Then krKurzfristigeVerbindlichkeitenSub4 should be 1
Then krKurzfristigeVerbindlichkeitenSub5 should be 1
Then krKurzfristigeVerbindlichkeitenSub6 should be 1
Then krUmsatzerloeseSub1 should be 1
Then krUmsatzerloeseSub2 should be 1
Then krAnteilKurzfristigeVerbindlichkeitenSub3 should be 1
Then krWirtschaftlichesEigenKapitalRatingSub1 should be 1
Then krBilanziellesEigenkapitalBrutto should be 1
Then krWirtschaftlichesEigenKapitalRatingSub3 should be 1
Then krWirtschaftlichesEigenKapitalRatingSub4 should be 1
Then krWirtschaftlichesEigenkapital should be -1
Then krWirtschaftlichesEigenKapitalRatingSub6 should be 1
Then krWirtschaftlichesEigenKapitalRatingSub7 should be 1
Then krWirtschaftlichesEigenKapitalRatingSub8 should be 1
Then krWirtschaftlichesEigenKapitalRatingSub9 should be 1
Then krWirtschaftlichesEigenKapitalRatingSub10 should be -3
Then krRatingorientierteBilanzsummeSub1 should be 2
Then krRatingorientierteBilanzsummeSub2 should be 1
Then krRatingorientierteBilanzsummeSub3 should be 1
Then krRatingorientierteBilanzsummeSub4 should be 1
Then krRatingorientierteBilanzsummeSub5 should be -1
Then krAnteilEigenmittelSub3 should be -3
Then krZValue should be -14.54566
Then krRDFsample should be 0.08223
Then krPD should be 0
@Then krUraRatingKlasse should be 1e-10
Then krUraAmpel should be 0
@Then krUraAmpelD should be 1e-10
@Then krUraAmpelDNL should be 1e-10
Then krIfdRatingKlasse should be 0
@Then krIfdRatingKlasseD should be 1e-10
Then Input should be 0
Then R1_ShareOfOrdinaryResult should be 0.5
Then R2_QuotaOfBankAndSuppliers should be 2
Then R3_InterestRateOnBorrowings should be 0.5
Then R4_ShareOfShortTermLiabilities should be 1
Then R5_ShareOfOwnResources should be -3
Then krOrdentlichesErgebnis should be 1
Then krNettoBilanzsummeRating should be 2
Then krBankUndLieferantenverbindlichkeiten should be 4
Then krZinsen should be 1
Then krVerbindlichkeiten should be 2
Then krKurzfristigeVerbindlichkeiten should be 1
Then krUmsatzerloese should be 1
Then krWirtschaftlichesEigenKapitalRating should be -3
Then krRatingorientierteBilanzsumme should be -1
Then RatingFolder should be 0
Then FyndooCreditRating should be 0
Then krAnteilOrdentlichenErgebnisses should be 0.5
Then krBankUndLieferantenanteil should be 2
Then krFremdKapitalzinslast should be 0.5
Then krAnteilKurzfristigeVerbindlichkeiten should be 1
Then krAnteilEigenmittel should be -3
Then RatioFolder should be 0