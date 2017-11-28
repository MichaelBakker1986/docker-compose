{&&Language=Deutsch}$>Berichtsmanager<$

; Eerst de opdrachten die voor ReportDialog mogen (instellen defaults voor ReportDialoog):
.AskChoice SuppressZeroOrNA="Lege regels onderdrukken?","Nee|Ja",1
.FINANversion 2.0
.MenuHelp ""                                                   ; Hint in rapportage menu
.TM 2                                                          ; top margin
.BM 4                                                          ; bottom margin
.LM 6                                                          ; left margin
.RM 6                                                          ; right margin
.SubIndent 2                                                   ; inspringen bij gebruik .Data2 opdracht
.SubHeader Yes                                                 ; tussenkopjes bij gebruik .Data2 opdracht
.LineSpacing 1.2                                               ; regelafstand, default is 1
.Header &SysVar("DocumentCode")&", "&DateStr(Now)              ; formule voor paginakop
.PageNumber 1                                                  ; eerste paginanummer of None
.Range [1..LastTinFormulaSet(NoTrend,MainPeriod)]              ; default kolom range voor ReportDialog
.FontName "Arial"                                              ; default font
.FontSize 8                                                    ; default fontsize

; nu de ReportDialog:
.ReportDialog SubReports,Range,Destinations

; nu de opdrachten die niet voor de ReportDialog mogen, bijvoorbeeld:
.InterSums Yes                                                 ; Yes/No (toon tussentotalen bij Data2)
.InterSumTypeface                                              ; Bold/Italics/Shaded/Underline (betreft afbeelden tussentotalen)
.SubSumTypeface                                                ; Bold/Italics/Shaded/Underline (betreft afbeelden subtotalen)
.EndSumTypeface                                                ; Bold/Italics/Shaded/Underline (betreft afbeelden eindtotalen)
.AutoStripe Yes                                                ; Yes/No (telstrepen bij subtotalen en tussentotalen in Data1 en Data2)
.SetNA Zero                                                    ; Zero/Blank/NA (betreft afbeelden NA waarden)

.Case #MaxCol#                                                 ; 120 posities beschikbaar
  .OnValue 0..2
    .TitleWidth 90                                             ; 88+2x16=120
    .Let MyColWidth=15
    .ColumnWidth 15
  .OnValue 3
    .TitleWidth 81                                             ; 81+3x13=120
    .Let MyColWidth=13
    .ColumnWidth 13
  .OnValue 4
    .TitleWidth 72
    .Let MyColWidth=12
    .ColumnWidth 12                                            ; 72+4x12=120
  .OnValue 5..100
    .TitleWidth 60
    .Let MyColWidth=11
    .ColumnWidth 11                                            ; 65+5x11=120
.EndCase

;-------------------------------------------------------------------------------
; URA Rating

.SubReport Name=UraRating,Title="$>URA Rating<$",Checked=On
.PercBase None
.SubRange None
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.SuppressLines No                                              ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.PageTitle "$>URA Rating<$"
.Skip 1

{[@] &GenInfoCompanyIdName[1]:0}
{[@] &krScenario[1]:0}
.Skip 1
.ColumnTitles
.Skip 1

.Data0 ModelConfiguration
.Data0 krInsolvenzquote
.Data0 krZValue
.Data0 krPD
.Data0 krUraRatingKlasse
.Data0 krUraAmpelD
.Data0 krIfdRatingKlasseD
.Skip 1

.Skip 1
{M>}{krAnteilOrdentlichenErgebnisses[Title]:0}{<M}
.Data1 krAnteilOrdentlichenErgebnisses
.Stripe =

.Skip 1
{M>}{krBankUndLieferantenanteil[Title]:0}{<M}
.Data1 krBankUndLieferantenanteil
.Stripe =

.Skip 1
{M>}{krFremdKapitalzinslast[Title]:0}{<M}
.Data1 krFremdKapitalzinslast
.Stripe =

.Skip 1
{M>}{krAnteilKurzfristigeVerbindlichkeiten[Title]:0}{<M}
.Data1 krAnteilKurzfristigeVerbindlichkeiten
.Stripe =

.Skip 1
{M>}{krAnteilEigenmittel[Title]:0}{<M}
.Data1 krAnteilEigenmittel
.Stripe =

.Skip 1
.Data0 ValCheck

.NewPage
.EndOfSubReport

;-------------------------------------------------------------------------------
; Kurzes Eingabeformular

.SubReport Name=ShortEntryForm,Title="$>Kurzes Eingabeformular<$",Checked=On
.PercBase None
.SubRange None
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.SuppressLines No                                              ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.PageTitle "$>Kurzes Eingabeformular<$ (x #Currency# #Scale#,-)","$>Fortsetzung<$ $>kurzes Eingabeformular<$"
.ColumnTitles

.Skip 1
.Data1 SimpleDataEntryFolder

.Skip 1
.Data1 SimpleDataEntryFolder sdeEquity

.Skip 1
.Data1 SimpleDataEntryFolder sdeSales

.Skip 1
.Data0 sdeInputOutsideEntryForm

.Skip 3
.Data0 ModelConfiguration
.Data0 krInsolvenzquote
.Data0 krPD
.Data0 krUraRatingKlasse
.Data0 krUraAmpelD
.Data0 krIfdRatingKlasseD
.NewPage
.EndOfSubReport

;-------------------------------------------------------------------------------
; Korrekturenblatt

.SubReport Name=CorrectionSheet,Title="$>Korrekturenblatt<$",Checked=On
.PercBase None
.SubRange None
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.SuppressLines No                                              ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.PageTitle "$>Korrekturenblatt<$ (x #Currency# #Scale#,-)","$>Fortsetzung<$ $>Korrekturenblatt<$"
.ColumnTitles

.Skip 1
{M>}{CorrectionsFolder[Title]:0}{<M}
.Data1 CorrectionsFolder

.Skip 1
.Data1 CorrectionsFolder Korrektur30

.NewPage
.EndOfSubReport

;-------------------------------------------------------------------------------
; Basisdaten Ratingkennzahlen

.SubReport Name=BaseDataRatios,Title="$>Basisdaten Ratingkennzahlen<$",Checked=On
.PercBase None
.SubRange None
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.If SysVar("SuppressZeroOrNA")
  .SuppressLines ZeroNa                                        ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.Else
  .SuppressLines No
.EndIf
.PageTitle "$>Basisdaten Ratingkennzahlen<$ (x #Currency# #Scale#,-)","$>Fortsetzung<$ $>Basisdaten Ratingkennzahlen<$"
.ColumnTitles

.Skip 1
.NeedData1 krOrdentlichesErgebnis
{M>}{krOrdentlichesErgebnis[Title]:0}{<M}
.Data1 krOrdentlichesErgebnis
.Stripe =

.Skip 1
.NeedData1 krNettoBilanzsummeRating
{M>}{krNettoBilanzsummeRating[Title]:0}{<M}
.Data1 krNettoBilanzsummeRating
.Stripe =

.Skip 1
.NeedData1 krBankUndLieferantenverbindlichkeiten
{M>}{krBankUndLieferantenverbindlichkeiten[Title]:0}{<M}
.Data1 krBankUndLieferantenverbindlichkeiten
.Stripe =

.Skip 1
.NeedData1 krZinsen
{M>}{krZinsen[Title]:0}{<M}
.Data1 krZinsen
.Stripe =

.Skip 1
.NeedData1 krVerbindlichkeiten
{M>}{krVerbindlichkeiten[Title]:0}{<M}
.Data1 krVerbindlichkeiten
.Stripe =

.Skip 1
.NeedData1 krKurzfristigeVerbindlichkeiten
{M>}{krKurzfristigeVerbindlichkeiten[Title]:0}{<M}
.Data1 krKurzfristigeVerbindlichkeiten
.Stripe =

.Skip 1
{M>}{IsNetIncomeRegularOperatingTCGrossTradingProfitTotalOutputNetSales[Title]:0}{<M}
.Data0 IsNetIncomeRegularOperatingTCGrossTradingProfitTotalOutputNetSales
.Stripe =

.Skip 1
.NeedData1 krWirtschaftlichesEigenKapitalRating
{M>}{krWirtschaftlichesEigenKapitalRating[Title]:0}{<M}
.Data1 krWirtschaftlichesEigenKapitalRating
.Stripe =

.Skip 1
.NeedData1 krRatingorientierteBilanzsumme
{M>}{krRatingorientierteBilanzsumme[Title]:0}{<M}
.Data1 krRatingorientierteBilanzsumme
.Stripe =

.NewPage
.EndOfSubReport

;-------------------------------------------------------------------------------
; Invoerblad balans NL

.SubReport Name=BalanceSheetShortNL,Title="Invoerblad balans Nederland",Checked=On
.PercBase TotalLiabilitiesFiscal
.SubRange TotalLiabilitiesFiscal
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.If SysVar("SuppressZeroOrNA")
  .SuppressLines ZeroNa                                        ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.Else
  .SuppressLines No
.EndIf
.PageTitle "Invoerblad balans Nederland (x #Currency# #Scale#,-)","Vervolg invoerblad balans Nederland"
.ColumnTitles

{M>}$>Aktiva<${<M}
.Data2 InputBalFolderNL
.Stripe =

.Skip 1
.NeedData2 InputBalFolderNL EquityTotal
{M>}$>Passiva<${<M}
.Data2 InputBalFolderNL EquityTotal
.Stripe =

.NewPage
.EndOfSubReport

;-------------------------------------------------------------------------------
; Invoerblad resultatenrekening NL

.SubReport Name=IncomeStatementShortNL,Title="Invoerblad resultatenrekening Nederland",Checked=On
.PercBase NetTurnoverFiscal
.SubRange NetTurnoverFiscal
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.If SysVar("SuppressZeroOrNA")
  .SuppressLines ZeroNa                                        ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.Else
  .SuppressLines No
.EndIf
.PageTitle "Invoerblad resultatenrekening Nederland (x #Currency# #Scale#,-)","Vervolg invoerblad resultatenrekening Nederland"
.ColumnTitles

.Skip 1
.Data2 InputIncFolderNL
.Stripe =

.NewPage
.EndOfSubReport

;-------------------------------------------------------------------------------
; Bilanz kurz

.SubReport Name=BalanceSheetShort,Title="$>Bilanz (kurz)<$",Checked=On
.PercBase BsAss
.SubRange BsAss
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.If SysVar("SuppressZeroOrNA")
  .SuppressLines ZeroNa                                        ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.Else
  .SuppressLines No
.EndIf
.PageTitle "$>Bilanz (kurz)<$ (x #Currency# #Scale#,-)","$>Fortsetzung<$ $>Bilanz (kurz)<$"
.ColumnTitles

{M>}$>Aktiva<${<M}
.Data2 MasterBalFolder
.Stripe =

.Skip 1
.NeedData2 MasterBalFolder BsEqLiabEquity
{M>}$>Passiva<${<M}
.Data2 MasterBalFolder BsEqLiabEquity
.Stripe =

.NewPage
.EndOfSubReport

;-------------------------------------------------------------------------------
; Erfolgsrechnung

.SubReport Name=IncomeStatementShort,Title="$>Erfolgsrechnung (kurz)<$",Checked=On
.PercBase IsNetIncomeRegularOperatingTCGrossTradingProfitTotalOutputNetSales
.SubRange IsNetIncomeRegularOperatingTCGrossTradingProfitTotalOutputNetSales
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.If SysVar("SuppressZeroOrNA")
  .SuppressLines ZeroNa                                        ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.Else
  .SuppressLines No
.EndIf
.PageTitle "$>Erfolgsrechnung (kurz)<$ (x #Currency# #Scale#,-)","$>Fortsetzung<$ $>Erfolgsrechnung (kurz)<$"
.ColumnTitles

.Skip 1
.Data2 MasterIncFolder
.Stripe =

.NewPage
.EndOfSubReport

;-------------------------------------------------------------------------------
; Spezifizierung Bilanz

.SubReport Name=BalanceSheetDetail,Title="$>Spezifizierung Bilanz<$",Checked=On
.PercBase BsAss
.SubRange BsAss
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.If SysVar("SuppressZeroOrNA")
  .SuppressLines ZeroNa                                        ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.Else
  .SuppressLines No
.EndIf
.PageTitle "$>Spezifizierung Bilanz<$ (x #Currency# #Scale#,-)","$>Fortsetzung<$ $>Spezifizierung Bilanz<$"
.ColumnTitles

.NeedData2 BsAssFixAssIntan
{M>}{BsAssFixAssIntan[Title]:0}{<M}
.Data2 BsAssFixAssIntan
.Stripe =

.Skip 1
.NeedData2 BsAssFixAssTan
{M>}{BsAssFixAssTan[Title]:0}{<M}
.Data2 BsAssFixAssTan
.Stripe =

.Skip 1
.NeedData2 BsAssFixAssFin
{M>}{BsAssFixAssFin[Title]:0}{<M}
.Data2 BsAssFixAssFin
.Stripe =

.Skip 1
.NeedData2 BsAssCurrAssInventory
{M>}{BsAssCurrAssInventory[Title]:0}{<M}
.Data2 BsAssCurrAssInventory
.Stripe =

.Skip 1
.NeedData2 BsAssCurrAssReceiv
{M>}{BsAssCurrAssReceiv[Title]:0}{<M}
.Data2 BsAssCurrAssReceiv
.Stripe =

.Skip 1
.NeedData2 BsAssCurrAssSecurities
{M>}{BsAssCurrAssSecurities[Title]:0}{<M}
.Data2 BsAssCurrAssSecurities
.Stripe =

.Skip 1
.NeedData1 BsAssCurrAssCashEquiv                           ; deze Data1!
{M>}{BsAssCurrAssCashEquiv[Title]:0}{<M}
.Data1 BsAssCurrAssCashEquiv
.Stripe =

.Skip 1
.NeedData2 BsAssDeficitNotCoveredByCapitalPrivateAccountSP
{M>}{BsAssDeficitNotCoveredByCapitalPrivateAccountSP[Title]:0}{<M}
.Data2 BsAssDeficitNotCoveredByCapitalPrivateAccountSP
.Stripe =

.Skip 1
.NeedData2 BsEqLiabEquitySubscribed
{M>}{BsEqLiabEquitySubscribed[Title]:0}{<M}
.Data2 BsEqLiabEquitySubscribed
.Stripe =

.Skip 1
.NeedData1 BsEqLiabEquityCapRes                           ; deze Data1!
{M>}{BsEqLiabEquityCapRes[Title]:0}{<M}
.Data1 BsEqLiabEquityCapRes
.Stripe =

.Skip 1                                                   ; level 2 ipv 3!
.NeedData2 BsEqLiabPretaxRes
{M>}{BsEqLiabPretaxRes[Title]:0}{<M}
.Data2 BsEqLiabPretaxRes
.Stripe =

.Skip 1                                                   ; level 2 ipv 3!
.NeedData2 BsEqLiabAccruals
{M>}{BsEqLiabAccruals[Title]:0}{<M}
.Data2 BsEqLiabAccruals
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabSecurities
{M>}{BsEqLiabLiabSecurities[Title]:0}{<M}
.Data2 BsEqLiabLiabSecurities
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabBank
{M>}{BsEqLiabLiabBank[Title]:0}{<M}
.Data2 BsEqLiabLiabBank
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabAdvPaym
{M>}{BsEqLiabLiabAdvPaym[Title]:0}{<M}
.Data2 BsEqLiabLiabAdvPaym
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabTrade
{M>}{BsEqLiabLiabTrade[Title]:0}{<M}
.Data2 BsEqLiabLiabTrade
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabRegulatory
{M>}{BsEqLiabLiabRegulatory[Title]:0}{<M}
.Data2 BsEqLiabLiabRegulatory
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabNotes
{M>}{BsEqLiabLiabNotes[Title]:0}{<M}
.Data2 BsEqLiabLiabNotes
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabShareholders
{M>}{BsEqLiabLiabShareholders[Title]:0}{<M}
.Data2 BsEqLiabLiabShareholders
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabAssocComp
{M>}{BsEqLiabLiabAssocComp[Title]:0}{<M}
.Data2 BsEqLiabLiabAssocComp
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabParticip
{M>}{BsEqLiabLiabParticip[Title]:0}{<M}
.Data2 BsEqLiabLiabParticip
.Stripe =

.Skip 1
.NeedData2 BsEqLiabLiabOther
{M>}{BsEqLiabLiabOther[Title]:0}{<M}
.Data2 BsEqLiabLiabOther
.Stripe =

.NewPage
.EndOfSubReport

;-------------------------------------------------------------------------------
; Spezifizierung Erfolgsrechnung

.SubReport Name=BalanceSheetDetail,Title="$>Spezifizierung Erfolgsrechnung<$",Checked=On
.PercBase IsNetIncomeRegularOperatingTCGrossTradingProfitTotalOutputNetSales
.SubRange IsNetIncomeRegularOperatingTCGrossTradingProfitTotalOutputNetSales
.ColumnWidth #MyColWidth#                                      ; moet steeds herhaald worden na SubReport etc.
.If SysVar("SuppressZeroOrNA")
  .SuppressLines ZeroNa                                        ; No/NA/Zero/ZeroNA (regels met alleen nullen en/of NA's geheel weglaten)
.Else
  .SuppressLines No
.EndIf
.PageTitle "$>Spezifizierung Erfolgsrechnung<$ (x #Currency# #Scale#,-)","$>Fortsetzung<$ $>Spezifizierung Erfolgsrechnung<$"
.ColumnTitles

.NeedData2 IsNetIncomeRegularOperatingTCGrossTradingProfitTotalOutput          ; level 2
{M>}{IsNetIncomeRegularOperatingTCGrossTradingProfitTotalOutput[Title]:0}{<M}
.Data2 IsNetIncomeRegularOperatingTCGrossTradingProfitTotalOutput
.Stripe =

.NeedData2 IsNetIncomeRegularOperatingTCGrossTradingProfitMaterialServices     ; level 2
{M>}{IsNetIncomeRegularOperatingTCGrossTradingProfitMaterialServices[Title]:0}{<M}
.Data2 IsNetIncomeRegularOperatingTCGrossTradingProfitMaterialServices
.Stripe =

.NeedData2 IsNetIncomeRegularOperatingTCDeprAmortFixAss
{M>}{IsNetIncomeRegularOperatingTCDeprAmortFixAss[Title]:0}{<M}
.Data2 IsNetIncomeRegularOperatingTCDeprAmortFixAss
.Stripe =

.NeedData2 IsNetIncomeRegularFin
{M>}{IsNetIncomeRegularFin[Title]:0}{<M}
.Data2 IsNetIncomeRegularFin
.Stripe =

.NeedData2 IsNetIncomeExtraord    ; level 2
{M>}{IsNetIncomeExtraord[Title]:0}{<M}
.Data2 IsNetIncomeExtraord
.Stripe =

.NeedData1 IsNetIncomeTax
{M>}{IsNetIncomeTax[Title]:0}{<M}
.Data1 IsNetIncomeTax
.Stripe =

.NeedData2 IsNetIncomeIncomeSharing
{M>}{IsNetIncomeIncomeSharing[Title]:0}{<M}
.Data2 IsNetIncomeIncomeSharing
.Stripe =

.NewPage
.EndOfSubReport

.Quit