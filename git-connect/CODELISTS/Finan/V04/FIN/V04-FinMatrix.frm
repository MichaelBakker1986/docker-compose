{&&language=English}{&&OEM}$>FINAN Matrix<$
;
;
{&&if FEATURE="M"}
{&&else}
.HideMenuItem
{&&endif}

; Eerst de opdrachten die voor ReportDialog mogen (instellen defaults voor ReportDialoog):
.FINANversion 3.2
.MenuHelp "$>Financial Statements Summary<$ $>report<$"                        ; Hint in rapportage menu
.TM 3                                                                          ; top margin
.BM 3                                                                          ; bottom margin
.LM 7                                                                          ; left margin
.RM 7                                                                          ; right margin
.SubIndent Yes                                                                 ; inspringen bij gebruik .Data2 opdracht
.SubHeader Yes                                                                 ; tussenkopjes bij gebruik .Data2 opdracht
.Header &NaamBedr[1]&",  "&DateStr(Now,5)                                      ; formule voor paginakop (houd ruimte voor logo Suite25!)
.PageNumber None                                                               ; eerste paginanummer of None
.Range [LastTinFormulaSet(NoTrend,MainPeriod,1)\TsY=1]                         ; default kolom range voor ReportDialog
.FontName "Arial"                                                              ; default font
.FontSize 8                                                                    ; default fontsize
.LineSpacing 1.1

; nu de ReportDialog:
.ReportDialog Destinations

.NumberFormat Windows
.Landscape On
.InitPageSize
.SetNA Zero                                                                    ; Zero/Blank/NA (betreft afbeelden NA waarden)

.AskChoice &ReportPd="Scenario","|$>History and scenario<$ 1|$>Scenario<$ 2|$>Scenario<$ 3|$>Scenario<$ 4",OnNoValue(SysVar("ReportPd"),1)
.Let &ReportYear= OnNoValue(SysVar("ReportYear"),YearInT(LastTinFormulaSet(NoTrend,MainPeriod,1))+1)
.Let &ReportYear= MinMax(SysVar("ReportYear"),YearInT(FirstTinPeriod(SysVar("ReportPd"))),YearInT(LastTinPeriod(SysVar("ReportPd"))),YearInT(LastTinPeriod(SysVar("ReportPd"))))
.AskInt &ReportYear="$>Report year<$: ",YearInT(FirstTinPeriod(SysVar("ReportPd"))),YearInT(LastTinPeriod(SysVar("ReportPd"))),SysVar("ReportYear")
.Let ReportT=YearToT(SysVar("ReportYear"),SysVar("ReportPd"))
.If SysVar("ReportT")<=0
  .Error "$>Year not found!<$"
  .Quit
.EndIf
.Let &ReportTsY=Min(SysVar("ReportTsY"),TsY(SysVar("ReportT")))
.Case TsY(SysVar("ReportT"))
  .OnValue 1
    .Let &ReportTsY=1
  .OnValue 2
    .AskChoice &ReportTsY="Tijdbasis:","|jaar|half jaar",OnNoValue(SysVar("ReportTsY"),1)
  .OnValue 4
    .AskChoice &ReportTsY="Tijdbasis:","|jaar|half jaar||kwartaal",OnNoValue(SysVar("ReportTsY"),1)
  .OnValue 12
    .AskChoice &ReportTsY="Tijdbasis:","|jaar|half jaar||kwartaal||||||||maand",OnNoValue(SysVar("ReportTsY"),1)
  .OnValue 13
    .AskChoice &ReportTsY="Tijdbasis:","|jaar||||||||||||13 periodes",OnNoValue(SysVar("ReportTsY"),1)
.EndCase
.Let &ReportTY=Min(SysVar("ReportTY"),SysVar("ReportTsY"))
.Case SysVar("ReportTsY")
  .OnValue 1
    .Let &ReportTY=1
  .OnValue 2
    .AskChoice &ReportTY="Half jaar","|1e|2e",OnNoValue(SysVar("ReportTY"),1)
  .OnValue 4
    .AskChoice &ReportTY="Kwartaal","|I|II|III|IV",OnNoValue(SysVar("ReportTY"),1)
  .OnValue 12
    .AskChoice &ReportTY="Maand","|januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december",OnNoValue(SysVar("ReportTY"),1)
  .OnValue 13
    .AskChoice &ReportTY="Periode","|1e|2e|3e|4e|5e|6e|7e|8e|9e|10e|11e|12e|13e",OnNoValue(SysVar("ReportTY"),1)
.EndCase
.Let ReportT=TinPYTT(SysVar("ReportPd"),SysVar("ReportYear"),SysVar("ReportTY"),SysVar("ReportTsY"))
.Range [SysVar("ReportT")\TsY=SysVar("ReportTsY")]
.IfAll BalAkt=NA
  .Message "$>Balance sheet not available for the specified columns!<$"
  .Quit
.EndIf

;—————————————————————————————————————————————————————————————————————————————
.Skip 1   ; hier moet iets staan, anders CharsPerLine niet goed....
.Let W= Round((SysVar("CharsPerLine")-SysVar("RightMargin")-SysVar("LeftMargin")+2)/4-0.5)
.Let NW= 8
.Let S= 4
.Let TW= SysVar("W")-SysVar("NW")-SysVar("S")
.Tab SysVar("TW")+SysVar("NW")\Right,SysVar("W"),1*SysVar("W")+SysVar("TW")+SysVar("NW")\Right,2*SysVar("W"),2*SysVar("W")+SysVar("TW")+SysVar("NW")\Right,3*SysVar("W"),3*SysVar("W")+SysVar("TW")+SysVar("NW")\Right

{B>}$>FINAN Matrix<${<B}, $>amounts<$ x #Currency# #Scale#,-
$>periode<$: {&ColumnHeader(T,SysVar("ReportTsY")):0}
.Skip 2
{B>}$>Beginning Balance Sheet<${&DateStr(FirstDateInT(T,SysVar("ReportTsY")))\Text}{Tab}{FinMatrixC2[Title]:0}{ColumnTitle}{Tab}{FinMatrixC3[Title]:0}{ColumnTitle}{Tab}{FinMatrixC4[Title]:0}{&DateStr(LastDateInT(T,SysVar("ReportTsY")))\Text}{<B}
.Skip 1
{FinMatrixR01C4[Title]:0}{FinMatrixR01C4[T-1]}{Tab}{FinMatrixR01C2[Title]:0}{FinMatrixR01C2}{Tab}{FinMatrixR01C3[Title]:0}{FinMatrixR01C3}{Tab}{FinMatrixR01C4[Title]:0}{FinMatrixR01C4}
.LineSpacing 0.5
{Tab}{Tab}{Tab}{Tab}{-}
.LineSpacing Org
{FinMatrixR02C4[Title]:0}{FinMatrixR02C4[T-1]}{Tab}{FinMatrixR02C2[Title]:0}{FinMatrixR02C2}{Tab}{FinMatrixR02C3[Title]:0}{FinMatrixR02C3}{Tab}{FinMatrixR02C4[Title]:0}{FinMatrixR02C4}
{FinMatrixR03C4[Title]:0}{FinMatrixR03C4[T-1]}{Tab}{FinMatrixR03C2[Title]:0}{FinMatrixR03C2}{Tab}{FinMatrixR03C3[Title]:0}{FinMatrixR03C3}{Tab}{FinMatrixR03C4[Title]:0}{FinMatrixR03C4}
{FinMatrixR04C4[Title]:0}{FinMatrixR04C4[T-1]}{Tab}{FinMatrixR04C2[Title]:0}{FinMatrixR04C2}{Tab}{FinMatrixR04C3[Title]:0}{FinMatrixR04C3}{Tab}{FinMatrixR04C4[Title]:0}{FinMatrixR04C4}
{FinMatrixR05C4[Title]:0}{FinMatrixR05C4[T-1]}{Tab}{FinMatrixR05C2[Title]:0}{FinMatrixR05C2}{Tab}{FinMatrixR05C3[Title]:0}{FinMatrixR05C3}{Tab}{FinMatrixR05C4[Title]:0}{FinMatrixR05C4}
{FinMatrixR06C4[Title]:0}{FinMatrixR06C4[T-1]}{Tab}{FinMatrixR06C2[Title]:0}{FinMatrixR06C2}{Tab}{FinMatrixR06C3[Title]:0}{FinMatrixR06C3}{Tab}{FinMatrixR06C4[Title]:0}{FinMatrixR06C4}
{FinMatrixR07C4[Title]:0}{FinMatrixR07C4[T-1]}{Tab}{FinMatrixR07C2[Title]:0}{FinMatrixR07C2}{Tab}{FinMatrixR07C3[Title]:0}{FinMatrixR07C3}{Tab}{FinMatrixR07C4[Title]:0}{FinMatrixR07C4}
.LineSpacing 0.5
{-}{Tab}{Tab}{Tab}{Tab}{Tab}{-}
.LineSpacing Org
{FinMatrixR08C4[Title]:0}{FinMatrixR08C4[T-1]}{Tab}{FinMatrixR08C2[Title]:0}{FinMatrixR08C2}{Tab}{FinMatrixR08C3[Title]:0}{FinMatrixR08C3}{Tab}{FinMatrixR08C4[Title]:0}{FinMatrixR08C4}
{FinMatrixR09C4[Title]:0}{FinMatrixR09C4[T-1]}{Tab}{FinMatrixR09C2[Title]:0}{FinMatrixR09C2}{Tab}{FinMatrixR09C3[Title]:0}{FinMatrixR09C3}{Tab}{FinMatrixR09C4[Title]:0}{FinMatrixR09C4}
{FinMatrixR10C4[Title]:0}{FinMatrixR10C4[T-1]}{Tab}{FinMatrixR10C2[Title]:0}{FinMatrixR10C2}{Tab}{FinMatrixR10C3[Title]:0}{FinMatrixR10C3}{Tab}{FinMatrixR10C4[Title]:0}{FinMatrixR10C4}
{FinMatrixR11C4[Title]:0}{FinMatrixR11C4[T-1]}{Tab}{FinMatrixR11C2[Title]:0}{FinMatrixR11C2}{Tab}{FinMatrixR11C3[Title]:0}{FinMatrixR11C3}{Tab}{FinMatrixR11C4[Title]:0}{FinMatrixR11C4}
{FinMatrixR12C4[Title]:0}{FinMatrixR12C4[T-1]}{Tab}{FinMatrixR12C2[Title]:0}{FinMatrixR12C2}{Tab}{FinMatrixR12C3[Title]:0}{FinMatrixR12C3}{Tab}{FinMatrixR12C4[Title]:0}{FinMatrixR12C4}
{FinMatrixR13C4[Title]:0}{FinMatrixR13C4[T-1]}{Tab}{FinMatrixR13C2[Title]:0}{FinMatrixR13C2}{Tab}{FinMatrixR13C3[Title]:0}{FinMatrixR13C3}{Tab}{FinMatrixR13C4[Title]:0}{FinMatrixR13C4}
.LineSpacing 0.5
{-}{Tab}{-}{Tab}{Tab}{Tab}{-}
.LineSpacing Org
{FinMatrixR14C4[Title]:0}{FinMatrixR14C4[T-1]}{Tab}{FinMatrixR14C2[Title]:0}{FinMatrixR14C2}{Tab}{FinMatrixR14C3[Title]:0}{FinMatrixR14C3}{Tab}{FinMatrixR14C4[Title]:0}{FinMatrixR14C4}
{=}{Tab}{=}{Tab}{Tab}{Tab}{=}

.Let FinanMatrixDone=1 ; i.v.m. silent scripts
