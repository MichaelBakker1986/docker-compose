{&&Language=English}$>FINAN Indicative Score<$
.MenuHelp               $>FINAN Indicative Score<$
.FINANversion           3.0
{&&if FEATURE="R"}
.HideMenuItem Off
{&&else}
.HideMenuItem On
{&&endif}
.LineSpacing            1.1                 ;regelafstand
.TM                     2                   ;bovenmarge
.LM                     7                   ;linkermarge                                  ;;Rva 2001-04-17 was 10
.RM                     5                   ;rechtermarge
.SubIndent              1                   ;inspringen van onderlingende niveau's
.FontName               Arial               ;Lettertype
.FontSize               8                   ;Grootte
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
.Range                  [1]                 ; Instellen van deze default range zorgt er voor dat het NIET landscape wordt afgedrukt.
.PageNumber             None
.DestFileSpec           FINAN Indicatieve Score-#DocumentCode#

.ReportDialog           Destinations

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


.Let BreedteTitle  = 18
.Let PaginaBreedte = #CharsPerLine#-#RightMargin#-#LeftMargin#+2
.Let PaginaHelft   = RoundUp( #PaginaBreedte# / 2) -1
.Let BreedteKolom  = RoundUp( ((#PaginaBreedte# / 2) - #BreedteTitle#) /2) -1

.Let Tab1 = #BreedteTitle#
.Let Tab2 = #BreedteTitle#                   + (1 * #BreedteKolom#)-1
.Let Tab3 = #BreedteTitle#                   + (2 * #BreedteKolom#)-1
.Let Tab4 = #PaginaHelft#+2
.Let Tab5 = #PaginaBreedte#                 - (2 * #BreedteKolom#)
.Let Tab6 = #PaginaHelft#  + #BreedteTitle# + (1 * #BreedteKolom#)-1
.Let Tab7 = MIN(#PaginaBreedte#-2, #PaginaHelft#  + #BreedteTitle# + (2 * #BreedteKolom#))

.SubReport              Name=Summary,Title="$>FINAN Indicatieve Rating<$",Checked=On


;jaar selecteren
.Let                    EindY=YearInT(OnZeroOrNA(LastTinFormulaSet(NoTrend,PeriodInSheet),FirstTinFormulaSet(Trend,PeriodInSheet)))
.AskInt                 EindY="Rapportage van jaar: ",1900,2100,#EindY#
.Let                    R2=YearToT(#EindY#,PeriodInSheet)
.If                     #R2#<=0
  .Let                  R2=YearToT(#EindY#,MainPeriod)
  .If                   #R2#<=0
    .Let                R2="0\BLANK"
    .Message            "$>Selected year is not present<$"
    .Cancel
  .EndIf
.EndIf


;ValCheck
.If ValCheck[#R2#]>0     ; ejs 27-11-2008: dit jaar moet geldig zijn!
  .Error "$>Selected year is not valid<$"
  .Cancel
.EndIf
;einde ValCheck

.Let R2= "#R2#\TsY=1"   ; Het betreffende jaar altijd op jaarbasis printen
.Range #$R2#


.Range   [@]
.Skip 3
.Tab 40
{tab}{B>}Indicatieve Score rapportage{<B}
.Picture                5,#LeftMargin#+1,"#$ModelFolder#\logo.bmp",0

.Tab                    #Tab1#, #Tab3#+30,#Tab3#+42
.Skip 2
.Let DATUMTIJD = &DateStr(Now)&" "&SUBSTR(&DateStr(Now,15),11,6)

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - 30
.Else
  .Line #PaginaBreedte#
.EndIf

{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Model version<$:{tab}#ModelVersion#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - 30
.Else
  .Line #PaginaBreedte#
.EndIf

.Range   Org
.Tab     #Tab1#|#Tab6#\right|#Tab7#\right
;{irRating[Title]:#PaginaHelft#\Bold}
.Skip 1
{"$>Year<$":0\Bold}{tab}{[#LastColumn#\TsY=1] ColumnTitle2:0\Left}               ; ejs: laatste (en enige kolom) in de huidige range


{IRRiskGroup[Title]:0\Bold}{tab}{&IRRiskGroup[1]:0}{tab}{[@] "Score"\Right}
.Skip    1
{irRD01[Title]:0\Bold}{tab}{tab}{irRD01Score}                                      ; ertussen eventueel nog: {columntitle:0}: {irRD01Value:0}
{irRD01Definition[Title]:0}{tab}{[@] &irRD01Definition[1]:0}
{irRD01Development[Title]:0}{tab}{[@] &irRD01Development[1]:0}
{irRD01Diagnose[Title]:0}{tab}{[@] &irRD01Diagnose[1]:0}
.If Length(&irRD01Advice[1])> 0
{irRD01Advice[Title]:0}{tab}{[@] &irRD01Advice[1]:0}
.EndIf
.Skip    1
{irRD02[Title]:0\Bold}{tab}{tab}{irRD02Score}
{irRD02Definition[Title]:0}{tab}{[@] &irRD02Definition[1]:0}
{irRD02Development[Title]:0}{tab}{[@] &irRD02Development[1]:0}
{irRD02Diagnose[Title]:0}{tab}{[@] &irRD02Diagnose[1]:0}
.If Length(&irRD02Advice[1])> 0
{irRD02Advice[Title]:0}{tab}{[@] &irRD02Advice[1]:0}
.EndIf
.Skip    1
{irRD03[Title]:0\Bold}{tab}{tab}{irRD03Score}
{irRD03Definition[Title]:0}{tab}{[@] &irRD03Definition[1]:0}
{irRD03Development[Title]:0}{tab}{[@] &irRD03Development[1]:0}
{irRD03Diagnose[Title]:0}{tab}{[@] &irRD03Diagnose[1]:0}
.If Length(&irRD03Advice[1])> 0
{irRD03Advice[Title]:0}{tab}{[@] &irRD03Advice[1]:0}
.EndIf
.Skip    1
{irRD04[Title]:0\Bold}{tab}{tab}{irRD04Score}
{irRD04Definition[Title]:0}{tab}{[@] &irRD04Definition[1]:0}
{irRD04Development[Title]:0}{tab}{[@] &irRD04Development[1]:0}
{irRD04Diagnose[Title]:0}{tab}{[@] &irRD04Diagnose[1]:0}
.If Length(&irRD04Advice[1])> 0
{irRD04Advice[Title]:0}{tab}{[@] &irRD04Advice[1]:0}
.EndIf
.Skip    1
{irRD05[Title]:0\Bold}{tab}{tab}{irRD05Score}
{irRD05Definition[Title]:0}{tab}{[@] &irRD05Definition[1]:0}
{irRD05Development[Title]:0}{tab}{[@] &irRD05Development[1]:0}
{irRD05Diagnose[Title]:0}{tab}{[@] &irRD05Diagnose[1]:0}
.If Length(&irRD05Advice[1])> 0
{irRD05Advice[Title]:0}{tab}{[@] &irRD05Advice[1]:0}
.EndIf
.Skip    1
{irRD06[Title]:0\Bold}{tab}{tab}{irRD06Score}
{irRD06Definition[Title]:0}{tab}{[@] &irRD06Definition[1]:0}
{irRD06Development[Title]:0}{tab}{[@] &irRD06Development[1]:0}
{irRD06Diagnose[Title]:0}{tab}{[@] &irRD06Diagnose[1]:0}
.If Length(&irRD06Advice[1])> 0
{irRD06Advice[Title]:0}{tab}{[@] &irRD06Advice[1]:0}
.EndIf
.Skip    1
{irRD10[Title]:0\Bold}{tab}{irRD10Score}                  ;# let op: tab minder
;{irRD10Definition[Title]:0}{tab}{[@] &irRD10Definition[1]:0}
{irRD10Development[Title]:0}{tab}{[@] &irRD10Development[1]:0}
;{irRD10Diagnose[Title]:0}{tab}{[@] &irRD10Diagnose[1]:0}
;{irRD10Advice[Title]:0}{tab}{[@] &irRD10Advice[1]:0}


.Skip 1
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - 30
.Else
  .Line #PaginaBreedte#
.EndIf
{IRScore[Title]:0\Bold}{tab}{tab}{IRScore\Bold}                                ;; hz tab toegevoegd zodat score recht onder scores erboven komt
.Skip 1
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - 30
.Else
  .Line #PaginaBreedte#
.EndIf


;;
;; RvA: onderstaande uitgezet ivm email EJS 25-01-2011
;;
;;.Tab     30|40\right|60\right
;;{irRating[Title]:#PaginaHelft#\Bold}
;;.Skip 1
;;{drPD[Title]:0}:{tab}{drPD:0}
;;{drRating[Title]:0}:{tab}{drRating:0}
;;.Skip 1
;;$>This score is indicative and not a formal rating.<$
;;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;;  .Line #PaginaBreedte# - 30
;;.Else
;;  .Line #PaginaBreedte#
;;.EndIf


; Toelichting kwal var incl horizontale streep
.If DataEntered(irRD10Memo,1)
  .NeedLines 8
{B>}{irRD10Memo[Title]:0}{<B}                                                  ;; hz :0 toegevoegd zodat deze kop geheel wordt afgedrukt ondanks tabs
  .Memo irRD10Memo
  .Skip 1
  .If #destination#=6                                                          ;; indien RTF dan andere kortere lijn, EJS: lijn binnen .If, dus alleen indien er een memo is
    .Line #PaginaBreedte# - 30
  .Else
    .Line #PaginaBreedte#
  .EndIf
.EndIf


.EndOfSubReport
