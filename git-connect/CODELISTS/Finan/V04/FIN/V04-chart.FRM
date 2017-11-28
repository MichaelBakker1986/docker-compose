{&&Language=English}$>Report with charts<$
.MenuHelp               $>Report with charts<$
.FINANversion           3.0
.LineSpacing            1.1                 ;regelafstand
.TM                     2                   ;bovenmarge
.LM                     7                   ;linkermarge                                  ;;Rva 2001-04-17 was 10
.RM                     5                   ;rechtermarge
.SubIndent              1                   ;inspringen van onderlingende niveau's
.FontName               Arial               ;Lettertype
.FontSize               9, Locked            ;Grootte
.Destination            [Preview,Printer,HTML,RTF] ;destinations                          ;; hz 11-08: beperkt ivm excel en txt kunnen geen grafieken tonen
.SubHeader              Yes                 ;Bij .Data2 tussenkopje
;                                           ; instellen paginakop:
.If Pwarning[1]=1
  .Let Warning = "($>no audit check available<$)"
.Else
  .Let warning = ""
.EndIf
.Let Bedrijfsnaam = &NaamBedr[1]
.If "#$Bedrijfsnaam#"=""
  .Let Bedrijfsnaam = "#DocumentCode#"
.EndIf
.Header #$Bedrijfsnaam#, #$DayMonthYear# #$Warning#

.PageNumber             None
.DestFileSpec           RapGraf-#DocumentCode#

.Range                  [1]                 ;RvA: De range doet niet ter zake in dit rapport, maar voor het geval er een range uit een ander rapport wordt overgenomen

.ReportDialog           SubReports,Destinations,Settings
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
.Calc                   1                   ; ivm achtergrondrekenen deze opdracht pas na de vragen

.Let BreedteTitle  = 26
.Let PaginaBreedte = #CharsPerLine#-#RightMargin#-#LeftMargin#+2

.If #PaginaBreedte# <1
  .Message $>Error: cannot define page width<$
  .Cancel
.EndIf

.Let PaginaHelft   = RoundUp( #PaginaBreedte# / 2) -1
.Let BreedteKolom  = RoundUp( ((#PaginaBreedte# / 2) - #BreedteTitle#) /2) -1

.Let Tab1 = #BreedteTitle#
.Let Tab2 = #BreedteTitle#                   + (1 * #BreedteKolom#)-1
.Let Tab3 = #BreedteTitle#                   + (2 * #BreedteKolom#)-1
.Let Tab4 = #PaginaHelft#+2
.Let Tab5 = #PaginaBreedte#                 - (2 * #BreedteKolom#)
.Let Tab6 = #PaginaHelft#  + #BreedteTitle# + (1 * #BreedteKolom#)-1
.Let Tab7 = MIN(#PaginaBreedte#-2, #PaginaHelft#  + #BreedteTitle# + (2 * #BreedteKolom#))
.Let DATUMTIJD = &DateStr(Now,1)&" "&SUBSTR(&DateStr(Now,15),11,6)

;analysecockpit excl finan score
.SubReport              Name=AnalyseChart,Title="$>Analysis<$",GroupTitle="$>Cockpits<$"

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2

.Chart FileName="V04-Charts.xml",ChartName="Std_NWMargeCPChart"
.Chart FileName="V04-Charts.xml",ChartName="Std_ProdCPChart"
.NewPage

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_CurRatioCPChart"
.Chart FileName="V04-Charts.xml",ChartName="Std_RentabEVCPChart"
.NewPage

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_SolvCPChart"
.If Licensed("R")
.Chart FileName="V04-Charts.xml",ChartName="Std_FinanScoreCPChart"
.EndIf
.NewPage
.EndOfSubReport

;investeringsanalyse
.SubReport              Name=InvestChart,Title="$>Investment<$",GroupTitle="$>Cockpits<$"

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_LiqMidCPChart"
.Chart FileName="V04-Charts.xml",ChartName="Std_RCBankCPChart"
.NewPage

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_RCRuimteCPChart"
.Chart FileName="V04-Charts.xml",ChartName="Std_NWerkKapCPChart"
.NewPage
.EndOfSubReport


;winstanalyse
.SubReport              Name=WinstAnalyseChart,Title="$>Profitanalysis<$",GroupTitle="$>Cockpits<$"

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_WinstAnalyseCPChart"
.NewPage
.EndOfSubReport



;analyse bedrijfsvoering
.SubReport              Name=ManagementChart,Title="$>Management analysis<$",GroupTitle="$>Cockpits<$"

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_CurRatioCPChart"
.Chart FileName="V04-Charts.xml",ChartName="Std_RentabEVCPChart"
.NewPage

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_SolvCPChart"
.Chart FileName="V04-Charts.xml",ChartName="Std_NWerkKapCPChart"

.NewPage
.EndOfSubReport


;------------------------------------------------------einde group cockpits


;resrek line
.SubReport              Name=NWCLiqMidChart,Title="$>Profit and loss account<$",GroupTitle="$>Other charts<$"

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_WinstAnalyseLineChart"
.NewPage
.EndOfSubReport




;solvabiliteit, liq en deb- en credtermijn
.SubReport              Name=RatioChart,Title="$>Solvency, liquidity and two activity ratios<$",GroupTitle="$>Other charts<$"

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_SolvChart"
.Chart FileName="V04-Charts.xml",ChartName="Std_LiqChart"
.NewPage

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_TermChart"

.NewPage
.EndOfSubReport



;;winstanalyse scenario's
;.SubReport              Name=WinstAnalyseTabsChart,Title="$>Profit analysis scenario 1 and 2<$",GroupTitle="$>Other charts<$"
;
;.Range   [@]
;.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
;.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
;{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
;{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
;{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
;{SectorTitle[0]:0}:{tab}{&SectorTitle:0}
;
;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;  .Line #PaginaBreedte# - #BreedteTitle#
;.Else
;  .Line #PaginaBreedte#
;.EndIf
;
;.Skip 2
;.Chart FileName="V04-Charts.xml",ChartName="Std_ResChartTab"
;.NewPage
;.EndOfSubReport



;solvabil en solvab AV
.SubReport              Name=SolvAVChart,Title="$>Solvency (balance sheet) and solvency liable capital<$",GroupTitle="$>Other charts<$"

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_SolvAV"
.NewPage
.EndOfSubReport



;rentabiliteit
.SubReport              Name=RentabChart,Title="$>Profitability ratios<$",GroupTitle="$>Other charts<$"

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_RentabRatiosChart"
.NewPage
.EndOfSubReport



;nwc en liqmid
.SubReport              Name=NWCLiqMidChart,Title="$>Net working capital and cash<$",GroupTitle="$>Other charts<$"

.Range   [@]
.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf

.Skip 2
.Chart FileName="V04-Charts.xml",ChartName="Std_NetWerkKapChart"
.NewPage
.EndOfSubReport

















