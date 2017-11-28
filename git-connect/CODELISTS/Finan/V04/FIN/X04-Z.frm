{&&language=English}{&&OEM}$>Industry figures report<$
.MenuHelp           $>Industry figures report<$
.FINANversion  2.0
;
;
.If "#$ReportDialogRange#"=""
.Range                  [FirstTinFormulaSet(Sector)..LastTinFormulaSet(Sector)\TsY=1]
.Endif
.LineSpacing            1.1                 ;regelafstand
.TM                     2                   ;bovenmarge
.LM                     6                   ;linkermarge                                  ;;Rva 2001-04-17 was 10
.RM                     3                   ;rechtermarge
.SubIndent              1                   ;inspringen van onderlingende niveau's
.SubHeader              No                  ;Subhoofd bij lagerniveau opsomming
.FontName               Arial               ;Lettertype
.FontSize               10                  ;Grootte
.SubHeader              Yes

.Header #$Header# #$Warning#
.Pagenumber             1
.DestFileSpec           Branche-#DataKey#

.ReportDialog

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
;—————————————————————————————————————————————————————————————————————————————
; Samenvating balans en exploitatie
;
.SubReport              Name=BrancheReport,Title="$>Benchmark report<$",Checked=On

.PageTitle              $>Reporting industry figures<$ (x #Currency# #Scale#,-)#$SubTitle#
.skip                   1
.Skip                   1
.Data1                  Title
.skip                   1
.data0                  NormenBron
.skip                   2
.ColumnTitles
.skip                   1
.Data0                  XAantalWaarn
.skip                   1
.Data1                  XDakOpv
.skip                   2
.Data1                  XTotKRacht

;—————————————————————————————————————————————————————————————————————————————
.NewPage
.PercBase               XBalAkt
.SubRange               XBalans                                                    ; Balans
.NeedData1              XBalans
{M>}$>Balance sheet<$ (x #Currency# #Scale#,-){<M}
.skip                   1
.ColumnTitles
.Skip                   1
.Data2                  XBalans
.Stripe                 =
.Skip                   1
.Data2                  XBalans XEigenVerm
.Stripe                 =
.Skip                   2
.SubRange               None
.PercBase               None

;—————————————————————————————————————————————————————————————————————————————
.NewPage
{M>}$>Profit and loss account<$ (x #Currency# #Scale#,-)#$SubTitle#{<M}
.skip                   1
.PercBase               XNettoOmzet
.SubRange               XResRek                                                    ; Resultatenrekening
.NeedData2              XResRek
.ColumnTitles
.Skip                   1
.Data2                  XResRek
.Stripe                 =
.PercBase               None
.SubRange               None
.EndIf

;—————————————————————————————————————————————————————————————————————————————
.NewPage
{M>}$>Ratios<$ (x #Currency# #Scale#,-){<M}
.skip                   1
.ColumnTitles
.Skip                   1
.PercBase               NONE
.ShowMutCols            No
.SetNA                  Blank

.SubRange               None
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
.SetNA                  Org
;—————————————————————————————————————————————————————————————————————————————

.EndOfSubReport
.Quit
