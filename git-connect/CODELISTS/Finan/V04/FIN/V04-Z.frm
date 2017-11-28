{&&language=English}$>Benchmark report<$
.MenuHelp           $>Benchmark report<$
.FINANversion  2.0
;
;
.Let                    LastYear            =YearInT(LastTinFormulaSet(NoTrend,MainPeriod))
.Let                    FirstYearNorm       =YearInT(FirstTinFormulaSet(Sector,SectorPeriod))
.Let                    StartYear           =Min(#LastYear#,#FirstYearNorm#)
;.message LastYear #LastYear#      FirstYearNorm  #FirstYearNorm#         StartYear     #StartYear#

.If                     #FirstYearNorm#<0
.If "#$ReportDialogRange#"=""
.Range                  [LastTinFormulaSet(NoTrend,MainPeriod)..LastTinFormulaSet(Trend,MainPeriod)\TsY=1]
.Endif
.Message                  $>Normative figures are not available for this datafile!<$
.Else
.If "#$ReportDialogRange#"=""
.Range                  [GetT(YearToT(#StartYear#,PeriodInSheet),0)\TsY=1|GetT(YearToT(#StartYear#,SectorPeriod),0)\TsY=1|GetT(YearToT(#StartYear#,PeriodInSheet),1)\TsY=1|GetT(YearToT(#StartYear#,SectorPeriod),1)\TsY=1]
.Endif
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
.Header #$Header# #$Warning#
.Pagenumber             1
.DestFileSpec           Branche-#DocumentCode#

.ReportDialog           Range,Header,Destinations,Settings
.InitPageSize

.NumberFormat           Windows
.Let                    subtitle=""
.SetNA                  Zero                ;NA worden als zero afgedrukt
.SuppressLines          NA                  ;NA regels onderdrukken
.ShowMutCols            Yes
.ShowBlankCols          Yes
.InterSums              Yes                 ;alleen voor DATA2 opdracht
.InterSumTypeface       Bold
.AutoStripe             Yes
.TitleWidth             36
.Calc                   1                   ; ivm achtergrondrekenen deze opdracht pas na de vragen

.SubReport              Name=BrancheReport,Title="$>Benchmark report<$",Checked=On

;—————————————————————————————————————————————————————————————————————————————
; Samenvating balans en exploitatie

.CenterText             $>Benchmark reporting <$ (x #Currency# #Scale#,-)#$SubTitle#
.Skip                   1
.Data1                  Title

.CountData1             L1=DakOpv
.CountData1             L2=TotKracht
.If                     #L1#+#L2#>0
.Skip                   1
.ColumnTitles
.skip                   1
.Data1                  DakOpv
.skip                   2
.Data1                  TotKRacht
.Else
.Skip                   1
.EndIf

;.skip                   2
;{B>}{SectorTitle[0]:0} : {SectorCode:0} {SectorTitle:0}{<B}
;.Skip                   1
;————————————————————————————————————————————————————————————————————————————— Balans
.skip                   2
{M>}$>Balance sheet<$ (x #Currency# #Scale#,-){<M}
.PercBase               BalAkt
.SubRange               BalAkt
.skip                   1
.ColumnTitles
.Skip                   1
.Data1                  Balans
.Stripe                 =
.Skip                   1
.Data1                  Balans EigenVerm
.Stripe                 =
.Skip                   2
.SubRange               None
.PercBase               None
;————————————————————————————————————————————————————————————————————————————— ResRek
.NewPAge
{M>}$>Profit and loss account<$ (x #Currency# #Scale#,-)#$SubTitle#{<M}
.skip                   1

.PercBase               NettoOmzet
.SubRange               ResRek
.ColumnTitles
.Skip                   1
.NeedData1              ResRek
.Data1                  ResRek
.Stripe                 =
.PercBase               None
.SubRange               None
.EndIf
;————————————————————————————————————————————————————————————————————————————— Kengetallen
.skip                   2
.PercBase               NONE
.ShowMutCols            No
.SetNA                  Blank
.SubRange               None
.ColumnTitles
.CountData1             LineCount=LiqRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              LiqRatios
{M>}{LiqRatios[Title]:0}{<M}
.Data1                  LiqRatios
.EndIf
.CountData1             LineCount=SolvRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              SolvRatios
{M>}{SolvRatios[Title]:0}{<M}
.Data1                  SolvRatios
.EndIf
.CountData1             LineCount=AktivRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              AktivRatios
{M>}{AktivRatios[Title]:0}{<M}
.Data1                  AktivRatios
.EndIf
.CountData1             LineCount=RtblRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              RtblRatios
{M>}{RtblRatios[Title]:0}{<M}
.Data1                  RtblRatios
.EndIf
.CountData1             LineCount=ProdRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              ProdRatios
{M>}{ProdRatios[Title]:0}{<M}
.Data1                  ProdRatios
.EndIf
.CountData1             LineCount=OpvRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              OpvRatios
{M>}{OpvRatios[Title]:0}{<M}
.Data1                  OpvRatios
.EndIf
.SetNA                  Zero
.ShowMutCols            Yes
.SubRange               None
.NewPage
.SetNA                  Org

;—————————————————————————————————————————————————————————————————————————————
.Quit
