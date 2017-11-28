{&&Language=English}$>Choice of report-from<$ $>valuation<$
.MenuHelp           $>Report-model with choice of columns and subreport<$
.FINANversion       2.0
{&&if FEATURE="P"}
.HideMenuItem Off
{&&else}
.HideMenuItem On
{&&endif}
;
;
.If "#$ReportDialogRange#"=""
.Range                  [Max(1,GetT(LastTinFormulaSet(1,1),-1))..LastTinFormulaSet(1,1)\TsY=1|FirstTinFormulaSet(Trend,PeriodInSheet)..GetT(FirstTinFormulaSet(Trend,PeriodInSheet),2)\TsY=1]
.EndIf
.LineSpacing            1.1                 ;regelafstand
.TM                     2                   ;bovenmarge
.LM                     6                   ;linkermarge                                  ;;Rva 2001-04-17 was 10
.RM                     3                   ;rechtermarge
.SubIndent              1                   ;inspringen van onderlingende niveau's
.SubHeader              No                  ;Subhoofd bij lagerniveau opsomming
.FontName               Arial               ;Lettertype
.FontSize               10                  ;Grootte
.SubHeader              Yes

.If Pwarning=1
  .Let Warning = "($>no audit check available<$)"
.Else
  .Let warning = ""
.EndIf

.Let Bedrijfsnaam = &NaamBedr[1]
.If "#$Bedrijfsnaam#"=""
  .Let Bedrijfsnaam = "#DocumentCode#"
.EndIf


.Header #$Bedrijfsnaam#, #$DayMonthYear# #$Warning#

.PageNumber             1
.DestFileSpec           Keuze-Waarderingsrapport-#DataKey#

.ReportDialog

.InitPageSize
.NumberFormat           Windows
.Let                    subtitle=""
.SetNA                  Zero                ;NA worden als zero afgedrukt

; -------------------
; Indien de uitvoer CSV is dan alle regels laten zien, dit ivm het feit dat CSV uitvoer vaak in EXCEL wordt gebruikt om te koppelen.
; en een vaste layout is dan wenselijk
.If #Destination# = 4
   .If #CSVONDERDRUKNULLENRAP# = 1
   	 .SuppressLines ZeroNA                        
   .Else 	 
     .SuppressLines No                        ; alle regels worden gerapporteerd in geval van excel, dit was de situatie voor de systeemvariabele toevoeging 
   .EndIf  
.Else
  .SuppressLines    ZeroNA              ; NA en ZERO regels onderdrukken
.EndIf
; -------------------

.ShowMutCols            Yes
.ShowBlankCols          Yes
.InterSums              Yes                 ;alleen voor DATA2 opdracht
.InterSumTypeface       Bold
.AutoStripe             Yes
.TitleWidth             36
.Calc                   1                   ; ivm achtergrondrekenen deze opdracht pas na de vragen

;.Let                    SubReport_VALRATIO=0
;.Let                    SubReport_EP=0
;.Let                    SubReport_INVCAP=0
;.Let                    SubReport_WACC=0
;.Let                    SubReport_FCF2=0
;.Let                    SubReport_FCF=0

;—————————————————————————————————————————————————————————————————————————————
; Vrije kasstromen

.SubReport              Name=FreeCashflow,Title="$>Free cashflow<$"
;.Let                    SubReport_FCF=1
.PercBase               NONE
.SubRange               MutCalc
.CountData1             LineCount=Cashflows
.If                     #LineCount#>0
;.Picture                1,10,finan.bmp
.PageTitle              "$>Free cash flow statement<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation<$ $>free cashflow<$ $>statement<$ #$SubTitle#"
.Skip                   1
.ColumnTitles
.Skip                   1
.Data2                  ValCashFlow
.Stripe                 =
.NewPage
.Else
.Message                "$>Free cash flow not available in the columns asked for!<$"
.EndIf
.SubRange               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Vrije kasstromen (Cashflow naar beleggers)

.SubReport              Name=FreeCashflowCashflowForInvestors,Title="$>Free cashflow<$ ($>Cashflow for investors<$)"
;.Let                    SubReport_FCF2=1
.PercBase               NONE
.SubRange               MutCalc
.CountData1             LineCount=FinancingFlow
.If                     #LineCount#>0
;.Picture                1,10,finan.bmp
.PageTitle              "$>Free cashflow<$ ($>Cashflow for investors<$) $>statement<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation<$ $>free cashflow<$ ($>Cashflow for investors<$) $>statement<$ #$SubTitle#"
.Skip                   1
.ColumnTitles
.Skip                   1
.Data1                  NoOpCashFlow
.Skip    1
.Data1                  CFExcesscash
.Skip    1
.Data1                  CFEVverschaffers
.Skip    1
.Data1                  CFVVverschaffers
.Skip    1
.Stripe                 -
.FixTypeface            Sum
.Data0                  FreeCashFlow2
.FixTypeface            Off
.Stripe                 =
.NewPage
.Else
.Message                "$>Free cash flow not available in the columns asked for!<$"
.EndIf
.SubRange               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; WACC (waarderingsmodule)

.SubReport             Name=WACC,Title="$>WACC<$",Enabled=Licensed("P")           ;,(POS("P","#$LicFeatures#")>0)
;.Let                    SubReport_WACC=1
.SubRange               WACC
.CountData1             LineCount=WACC
.If                     #LineCount#>0
.PageTitle              "$>WACC<$ #$SubTitle#","$>Continuation of WACC<$#$SubTitle#"

.ColumnTitles           NoCum
.Skip                   1
.NeedData1              WACC RiskFreeRate
.Data1                  WACC RiskFreeRate
.Skip                   1
.NeedData1              WACC RiskFreeRate2
.Data1                  WACC RiskFreeRate2
.Skip                   2
.NeedData1              WACC EquityFrac
.Data1                  WACC EquityFrac
.Skip                   2
.CountData0             L=WACCcorrection
.If                     #L#>0
.NeedData1              WACC CalculatedWACC
.Data1                  WACC CalculatedWACC
.Else
{WACC[Title]\bold}{WACC\bold}
.EndIf
.NewPage
.Else
.Message                "$>WACC not available in the columns asked for!<$"
.EndIf
.SubRange               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Geïnvesteerd vermogen (waarderingsmodule)

.SubReport              Name=InvestedCapital,Title="$>Invested Capital<$",Enabled=Licensed("W")              ;(POS("W","#$LicFeatures#")>0)
;.let                    SubReport_INVCAP=1
.PercBase               InvCap
.SubRange               InvCap
.CountData1             LineCount=InvCap
.If                     #LineCount#>0
.PageTitle              "$>Invested Capital<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of invested capital<$#$SubTitle#"
;.Picture                1,10,finan.bmp

.ColumnTitles           NoCum
.Skip                   1
.NeedData2              InvCap
{M>}{AktInvCap[Title]:0}{<M}
.Data2                  InvCap
.Stripe                 =
.Skip                   1
.NeedData2              InvCap AdjEquity
{M>}{PasInvCap[Title]:0}{<M}
.Data2                  InvCap AdjEquity
.Stripe                 =
.NewPage
.Else
.Message                "$>Invested capital not available in the columns asked for!<$"
.EndIf
.SubRange               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Economisch Winst

.SubReport              Name=EconomicProfit,Title="$>Economic profit<$",Enabled=Licensed("W")      ;,(POS("W","#$LicFeatures#")>0)
;.let                    SubReport_EP=1
.PercBase               None
.CountData1             LineCount=EcProfit
.If                     #LineCount#>0
.SubRange               MutCalc
.PageTitle              "$>Economic profit<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of economic profit<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.CountData1             LineCount=ECPROFITTOP
.If                     #LineCount#>0
{M>}$>Calculation of economic profit<$:{<M}
.Data1                  EcProfitTop
.Skip                   1
.EndIf
.CountData1             LineCount=ROIC
.If                     #LineCount#>0
{M>}$>Calculation of rate of return on invested capital<$:{<M}
.Data1                  ROIC
.Stripe                 =
.Skip                   1
.EndIf
.CountData1             LineCount=WACC
.If                     #LineCount#>0
{M>}$>Calculation of weighted average cost of capital<$:{<M}
.Data1                  WACC
.Skip                   1
.Data0                  RiskFreeRate
.Data1                  WACC PremiumDebt
.Skip                   1
.Data0                  EquityFrac
.Skip                   1
.FixTypeface            EndSum
.Data0                  WACC
.FixTypeface            Org
.Stripe                 =
.EndIf
.NewPage
.Else
.Message                "$>Economic profit not available in the asked for columns!<$"
.EndIf
.SubRange               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Genormaliseerd resultaat

.SubReport              Name=NormalizedProfitDividendYieldMethod,Title="$>Normalized profit<$ $>dividend yield method<$"
;.Let                    SubReport_rmValue=1
.PercBase               NONE
.SubRange               MutCalc
.CountData1             LineCount=rmCorrResNu
.AskOK                  MarkInputNP="$>Mark normalised elements with a shaded background<$?",#MarkInputNP#
.If                     #MarkInputNP#
.InputTypeFace          Shaded
.Else
.InputTypeFace          None
.EndIf
.If                     #LineCount#>0
.PageTitle              "$>Normalized profit<$ ($>dividend yield method<$) (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation<$ $>free cashflow<$ $>statement<$ #$SubTitle#"
.Skip                   1
.ColumnTitles
.Skip                   1
.Data2                  rmCorrResNu
.Stripe                 =
.NewPage
.Else
.Message                "$>Normalized profit not available in the columns asked for!<$"
.EndIf
.SubRange               None
.EndOfSubReport
;—————————————————————————————————————————————————————————————————————————————
; Kengetallen waardering

.SubReport              Name=ValuationRatios,Title="$>Valuation ratios<$"
;.Let                    SubReport_VALRATIO=1
.PercBase               None
.SetNA                  Blank
.SubRange               MutCalc
.PageTitle              "$>Valuation ratios<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of valuation ratios<$#$SubTitle#"

.CountData1             LineCount=ValueRatio
.If                     #LineCount#>0
.NeedLines              #LineCount#+4
{M>}$>Valuation ratios<$:{<M}
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.Data1                  ValueRatio
.EndIf
.NewPage
.SubRange               None
.SetNA                  Org            ; ejs
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
.Quit
