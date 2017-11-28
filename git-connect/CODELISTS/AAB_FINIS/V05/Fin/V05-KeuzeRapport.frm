{&&Language=English}$>Choice of report-from<$
.MenuHelp      $>Report-model with choice of columns and subreport<$
.FINANversion  2.0
;
;
.Range                  [Max(1,GetT(LastTinFormulaSet(1,1),-1))..LastTinFormulaSet(1,1)\TsY=1]

.LineSpacing            1.1                 ;regelafstand
.TM                     2                   ;bovenmarge
.LM                     7                   ;linkermarge                                  ;;Rva 2001-04-17 was 10
.RM                     5                   ;rechtermarge
.SubIndent              1                   ;inspringen van onderlingende niveau's
.FontName               Arial               ;Lettertype
.FontSize               10                  ;Grootte
.SubHeader              Yes                 ;Bij .Data2 tussenkopje
;
.PageNumber             1
.DestFileSpec           Keuzerapport-#DocumentCode#
.ReportDialog

.ShowMutCols            Yes
.ShowBlankCols          Yes
.InterSums              Yes                 ;alleen voor DATA2 opdracht
.InterSumTypeface       Bold
.AutoStripe             Yes
.Calc                   1                   ; ivm achtergrondrekenen deze opdracht pas na de vragen


;—————————————————————————————————————————————————————————————————————————————
; Balans uitgebreid

.SubReport              Name=BalanceSheetExtensiveForm,Title="$>Balance sheet: extensive form<$",GroupTitle="$>Balance sheet<$"
.PercBase               TotalAssets
.CountData1             LineCount=BalanceSheet
.If                     #LineCount#>0
.PageTitle              "$>Balance sheet: extensive form<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of specification<$ $>Balance sheet: extensive form<$#$SubTitle#"
.ColumnTitles           NoCum

{M>}$>Balance sheet: assets<${<M}
.Data2                  BalanceSheet IntangibleFixedAssets                               ; Activa
.Stripe                 =
.Skip                   1
.NeedData2              BalanceSheet NetWorth
{M>}$>Balanced sheet: liabilities<${<M}
.Data2                  BalanceSheet NetWorth                                            ; Passiva

.NewPage
.PercBase               None
.EndOfSubReport



;—————————————————————————————————————————————————————————————————————————————
; Resultatenrekening gedetailleerd standaard
;
.SubReport              Name=ProfitAndLossAccountExtensiveFormDefault,Title="$>Profit and loss-account: extensive form<$ ($>Default<$)",GroupTitle="$>Profit and loss account<$"
.PercBase               NetSales
.CountData1             LineCount=IncomeStatement NetSales
.If                     #LineCount#>0
.PageTitle              "$>Profit and loss account extensive<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of profit and loss-account extensive<$#$SubTitle#"
.ColumnTitles
.Skip                   1
.Data2                  IncomeStatement NetSales


.CountData1             LineCount=NetWorthReconciliation
.If                     #LineCount#>0
  .AskOk                  PrintVermAansl_1="$>Profit and loss-account: extensive form<$ ($>Default<$) $>including<$ $>Net worth reconciliation<$?",#PrintVermAansl_1#
.EndIf



.If #PrintVermAansl_1# = 1
.NeedData1              NetWorthReconciliation
.Skip 2
.PageTitle              "$>Net worth reconciliation<$"
.Data1                  NetWorthReconciliation
.Stripe                 =
.EndIf
.NewPage

.PercBase               None
.EndOfSubReport


