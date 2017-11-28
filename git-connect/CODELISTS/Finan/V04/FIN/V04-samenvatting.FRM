{&&Language=English}$>Brief report<$
.MenuHelp               $>Summary<$
.FINANversion           3.0
.LineSpacing            1.2                 ; regelafstand                                 ; EJS 24-5-2011 was 1.1
.TM                     2                   ; bovenmarge
.LM                     7                   ; linkermarge
.RM                     5                   ; rechtermarge
.SubIndent              1                   ; inspringen van onderlingende niveau's
.FontName               Arial               ; Lettertype, LET OP: liefst Calibri gebruiken (vgl Excel 2007, echter niet in Windows XP!) omdat strepen en bold dan even breed als cijfers zijn, zie RtfLineFactor hieronder
.Let                    RtfLineFactor=77%   ; Dit geld voor Arial font! EJS 24-5-2011
.FontSize               9, Locked           ; Grootte
.SubHeader              Yes                 ; Bij .Data2 tussenkopje
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
.DestFileSpec           Samenvatting-#DocumentCode#

; ejs 9-9-2008: hier wel een range instellen voordat ReportDialog komt
;               anders mogelijk landscape indien de vorige range van dit dossier meer dan 6 kolommen was!
;               in reportdialoog is kolomkeuze disabled en verderop wordt range definitief ingesteld.
;               dit is oplossing voor bug #3798!
.Range                  [1]
.ReportDialog           Destinations,Header
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

;
    ;  .let     HulpString2 = Length(&StrField("#$ReportDialogRange#",2))
    ;  .let     HulpString3 = Length(&StrField("#$ReportDialogRange#",3))
    ;
    ;  ;If #HulpString3# = 0
    ;    ;.Message U heeft minder dan 3 kolommen gespecificeerd.|Voor dit rapport moeten 3 kolommen worden gespecificeerd.
    ;    ;.Cancel
    ;  ;.EndIf
    ;  .If #HulpString3# > 0
    ;    .Message "$>U heeft meer dan 2 kolommen gespecificeerd.|Voor dit rapport mag u maximaal 2 kolommen gespecificeren.<$||#ReportDialogRange#||#ReportRange#"
    ;    .Cancel
    ;  .EndIf
    ;
    ;  .Let Kolom1=&StrField("#ReportDialogRange#",1)
    ;  .Let Kolom2=&StrField("#ReportDialogRange#",2)
    ;  .Let Kolom1T = &BeforeStr("\","#Kolom1#")
    ;  .Let Kolom2T = &BeforeStr("\","#Kolom2#")
    ;
    ;  .If Pos("BLANK","#Kolom2#")>0
    ;    .Range [#Kolom2#,#Kolom1#];deze if-functie dwingt af dat de volgorde van de kolommen wordt omgedraaid indien de laatste kolom 'leeg' wordt gelaten
    ;  .EndIf

.Let BreedteTitle  = 28
.Let PaginaBreedte = #CharsPerLine#-#RightMargin#-#LeftMargin#+1         ; EJS 24-5-2011 was +2
.Let PaginaHelft   = RoundUp(#PaginaBreedte#/2)-1
.Let BreedteKolom  = RoundUp((#PaginaHelft#-#BreedteTitle#)/2)-2

.Let Tab1= #BreedteTitle#                  ; einde 1e titel
.Let Tab2= #Tab1#+#BreedteKolom#           ; rechtertab
.Let Tab3= #Tab2#+#BreedteKolom#           ; rechtertab
.Let Tab4= #PaginaHelft#+2                 ; begin 2e titel
.Let Tab5= #Tab4#+#BreedteTitle#           ; einde 2e titel
.Let Tab6= #Tab5#+#BreedteKolom#           ; rechtertab
.Let Tab7= Min(#PaginaBreedte#-2,#Tab6#+#BreedteKolom#)  ; rechtertab, voor de zekerheid de min-functie

.SubReport              Name=Summary,Title="$>Summary<$",Checked=On


;sheet selecteren

.Let                    EindY=YearInT(OnZeroOrNA(LastTinFormulaSet(NoTrend,PeriodInSheet),FirstTinFormulaSet(Trend,PeriodInSheet)))
.AskInt                 EindY="Rapportage t/m jaar: ",1900,2100,#EindY#
.Let                    K2=YearToT(#EindY#-1,PeriodInSheet)
.If                     #K2#<=0
  .Let                  K2=YearToT(#EindY#-1,MainPeriod)
  .If                   #K2#<=0
    .Let                K2="0\BLANK"
  .EndIf
.EndIf

.Let                    K3=YearToT(#EindY#,PeriodInSheet)
.If                     #K3#<=0
  .Let                  K3=YearToT(#EindY#,MainPeriod)
  .If                   #K3#<=0
    .Let                K3="0\BLANK"
  .EndIf
.EndIf


.Range                  [#$K2#\TsY=1|#$K3#\TsY=1]


;
.Range   [@]
.Picture                3,#PaginaBreedte#-23,"#$ModelFolder#\logo.bmp",1       ; EJS 24-5-2011 logo één positie naar links
.Tab                    #Tab1#,#Tab5#-5,#Tab6#-3
.Let DATUMTIJD = &DateStr(Now,1)&" "&SUBSTR(&DateStr(Now,15),11,6)

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line RoundUp((#PaginaBreedte#-1)*SysVar("RtfLineFactor"))
.Else
  .Line #PaginaBreedte#-1                                                      ; EJS 24-5-2011 lijn iets korter
.EndIf

{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}

.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line RoundUp((#PaginaBreedte#-1)*SysVar("RtfLineFactor"))
.Else
  .Line #PaginaBreedte#-1                                                      ; EJS 24-5-2011 lijn iets korter
.EndIf

.Range   Org
.Tab     #Tab1#|#Tab2#\right|#Tab3#\right|#Tab4#|#Tab5#|#Tab6#\right|#Tab7#\right
.Skip    1

.PercBase      BalAkt
{tab}{TrendTitle}{tab}{tab}{TrendTitle}

.NumberFormat Data
{G>}{B>}$>Balance sheet<${<B}{tab}{Year::0\Shaded}{tab}{tab}{Year::0\Shaded}{<G}
.NumberFormat Windows
{JaarrekSoort[Title]:0}{tab}{&BeforeStr("-",&JaarrekSoort[T])\Right}{tab}{JaarrekAccountVerkl[Title]:0}{tab}{&BeforeStr("-",&JaarrekAccountVerkl)\Right}
{JaarrekDefinitief[Title]:0}{tab}{&BeforeStr("-",&JaarrekDefinitief[T])\Right}{tab}{JaarrekNaamAcc[Title]:0}{tab}{&JaarrekNaamAcc[T]\Right}
{JaarrekAccountPrinciples[Title]:0}{tab}{&BeforeStr("-",&JaarrekAccountPrinciples[T])\Right}
.Skip 1
; -----------------------------------------------
{[@]"$>Assets<$":0\Bold}{tab}{tab}{tab}{tab}{[@]"$>Liabilities<$":0\Bold}
{ImmatAkt[Title]:0}{tab}{ImmatAkt}{tab}{EigenVerm[Title]:0}{tab}{EigenVerm}
{OnrGoed[Title]:0}{tab}{OnrGoed}{tab}{Voorz[Title]:0}{tab}{Voorz}
{BedrUitr[Title]:0}{tab}{BedrUitr}{tab}{LangVV[Title]:0}{tab}{LangVV}
{FinVastAkt[Title]:0}{tab}{FinVastAkt}{tab}{RCBank[Title]:0}{tab}{RCBank}
{VRD[Title]:0}{tab}{VRD}{tab}{HandCred[Title]:0}{tab}{HandCred}
{Vord[Title]:0}{tab}{Vord}{tab}{[@] "$>Other short term debt<$":0}{tab}{KortVV-HandCred-RCBank}
{LiqMid[Title]:0}{tab}{LiqMid\UnderLine}{tab}&
.SetNA      NA
{VermBehoefte[Title]:0}{tab}{VermBehoefte\UnderLine}
.SetNA      ORg
{BalAkt[Title]:0}{tab}{BalAkt}{tab}{BalPas[Title]:0}{tab}{BalPas}
.Skip    1
;------------------------------------------------
.PercBase      NettoOmzet
.NumberFormat Data
{G>}{B>}$>Profit and loss account<${<B}{tab}{Year::0\Shaded}{tab}{B>}$>Cash Flow<${<B}{tab}{Year::0\Shaded}{<G}
.NumberFormat Windows
{NettoOmzet[Title]:0}{tab}{NettoOmzet}{tab}{[@] "$>Operating cashflow<$":0}{tab}{OperAktCF}
{ProdVrdMut[Title]:0}{tab}{ProdVrdMut}{tab}{[@] "$>Decr. net work.cap excl. oper.cash<$":0}{tab}{AfnWerkKapCF\UnderLine}
{Inkw[Title]:0}{tab}{-Inkw\Underline}{tab}{BeschKasMid[Title]:0}{tab}{BeschKasMid}                       ; EJS 24-5-2011 min-teken bij Inkw
{BrutoWinst[Title]:0}{tab}{BrutoWinst}{tab}{FinVerpl[Title]:0}{tab}{-FinVerpl\UnderLine}                 ; EJS 24-5-2011 min-teken bij FinVerpl
{OvBedrOpbr[Title]:0}{tab}{OvBedrOpbr}{tab}{CFBeschikbaar[Title]:0}{tab}{CFBeschikbaar}
{BedrK[Title]:0}{tab}{-BedrK}{tab}{InvCF[Title]:0}{tab}{-InvCF\UnderLine}                                ; EJS 24-5-2011 min-teken bij BedrK en InvCF
{AktAfs[Title]:0}{tab}{-AktAfs\UnderlIne}{tab}{[@] "$>Financing shortfall (if neg.)<$":0}{tab}{TeFinCF}  ; EJS 24-5-2011 min-teken bij AktAfs
{BedrRes[Title]:0}{tab}{BedrRes}{tab}{FINCF[Title]:0}{tab}{FINCF\UnderLine}
{FinRes[Title]:0}{tab}{FinRes\UnderLine}{tab}{[@] "$>Change in cash<$":0}{tab}{MutRekCour}
{[@] "$>Profit before taxes<$":0}{tab}{GewResVoorBel}
{[@] "$>Extraordinary income<$":0}{tab}{BuitRes}  ; ejs 9-9-2008: underline eruit!!!
; {BedrRes[Title]:0}{tab}{BedrRes}        ; ejs 5-9-2008: deze verwijderd!!!!
{WinstBel[Title]:0}{tab}{-WinstBel}
{AandeelResDeeln[Title]:0}{tab}{AandeelResDeeln}
{[@] "$>Minority stockholder's interest<$":0}{tab}{-ResAandDerden\UnderLine}                             ; EJS 24-5-2011 min-teken bij ResAandDerden
{ResNaBel[Title]:0}{tab}{ResNaBel}
.Skip 1

.PercBase   None
.NumberFormat Data
{G>}{B>}$>Ratios<${<B}{tab}{Year::0\Shaded}{tab}{B>}$>Ratios<${<B}{tab}{Year::0\Shaded}{<G}
.NumberFormat Windows
{TotKracht[Title]:0}{tab}{TotKracht}{tab}{GroeiNettoOmzet[Title]:0}{tab}{GroeiNettoOmzet}
{DakOpv[Title]:0}{tab}{DakOpv}{tab}{BrutoMarge[Title]:0}{tab}{BrutoMarge}
{QuickRatio[Title]:0}{tab}{QuickRatio}{tab}{RTBLEigenVerm[Title]:0}{tab}{RTBLEigenVerm}
{CurrentRatio[Title]:0}{tab}{CurrentRatio}{tab}{RTBLTotVerm[Title]:0}{tab}{RTBLTotVerm}
{SolvBal[Title]:0}{tab}{SolvBal}{tab}{EBITDA[Title]:0}{tab}{EBITDA}
{IntDekking[Title]:0}{tab}{IntDekking}{tab}{HefEffect[Title]:0}{tab}{HefEffect}
;;
.If AktivRatiosReport=1
{DebTermijn[Title]:0}{tab}{DebTermijn}{tab}&
.Else
{DebTermijnDays[Title]:0}{tab}{DebTermijnDays}{tab}&
.EndIf
{BrutoWPerKracht[Title]:0}{tab}{BrutoWPerKracht}
;;
.If AktivRatiosReport=1
{[@] "$>Average period accounts payable<$":0}{tab}{HandCredTermijn}{tab}&
.Else
{[@] "$>Average period accounts payable<$":0}{tab}{HandCredTermijnDays}{tab}&
.EndIf
{OmzetPerKracht[Title]:0}{tab}{OmzetPerKracht}
.NewPage

;;;;;grafieken
;;;;.NewPage
;;;;
;;;.Range   [@]
;;;.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
;;;.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
;;;.Let DATUMTIJD = &DateStr(Now,1)&" "&SUBSTR(&DateStr(Now,15),11,6)
;;;
;;;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;;;  .Line #PaginaBreedte# - #BreedteTitle#
;;;.Else
;;;  .Line #PaginaBreedte#
;;;.EndIf
;;;
;;;{NaamBedr[0]:0}:{tab}{&NaamBedr:#BreedteKolom#*3}{tab}$>Amounts<$:{tab}#Currency# #Scale#
;;;{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:#BreedteKolom#*3}{tab}$>Print date<$:{tab} #DatumTijd#
;;;{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
;;;{SectorTitle[0]:0}:{tab}{&SectorTitle:0}
;;;
;;;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;;;  .Line #PaginaBreedte# - #BreedteTitle#
;;;.Else
;;;  .Line #PaginaBreedte#
;;;.EndIf
;;;
;;;.Range   Org
;;;
;;;.Skip 2
;;;.Chart FileName="V04-Charts.xml",ChartName="Std_WinstAnalyseCPChart"
;;;.Chart FileName="V04-Charts.xml",ChartName="Std_NetWerkKapChart"
;;;.NewPage
;;;
;;;
;;;.Range   [@]
;;;.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
;;;.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
;;;.Let DATUMTIJD = &DateStr(Now,1)&" "&SUBSTR(&DateStr(Now,15),11,6)
;;;
;;;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;;;  .Line #PaginaBreedte# - #BreedteTitle#
;;;.Else
;;;  .Line #PaginaBreedte#
;;;.EndIf
;;;
;;;{NaamBedr[0]:0}:{tab}{&NaamBedr:#BreedteKolom#*3}{tab}$>Amounts<$:{tab}#Currency# #Scale#
;;;{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:#BreedteKolom#*3}{tab}$>Print date<$:{tab} #DatumTijd#
;;;{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
;;;{SectorTitle[0]:0}:{tab}{&SectorTitle:0}
;;;
;;;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;;;  .Line #PaginaBreedte# - #BreedteTitle#
;;;.Else
;;;  .Line #PaginaBreedte#
;;;.EndIf
;;;
;;;.Range   Org
;;;
;;;.Skip 2
;;;.Chart FileName="V04-Charts.xml",ChartName="Std_SolvChart"
;;;.Chart FileName="V04-Charts.xml",ChartName="Std_LiqChart"
;;;.NewPage
;;;
;;;
;;;.Range   [@]
;;;.Picture                3,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
;;;.Tab                    #Tab1#,#Tab5#-4,#Tab6#-4
;;;.Let DATUMTIJD = &DateStr(Now,1)&" "&SUBSTR(&DateStr(Now,15),11,6)
;;;
;;;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;;;  .Line #PaginaBreedte# - #BreedteTitle#
;;;.Else
;;;  .Line #PaginaBreedte#
;;;.EndIf
;;;
;;;{NaamBedr[0]:0}:{tab}{&NaamBedr:#BreedteKolom#*3}{tab}$>Amounts<$:{tab}#Currency# #Scale#
;;;{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:#BreedteKolom#*3}{tab}$>Print date<$:{tab} #DatumTijd#
;;;{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
;;;{SectorTitle[0]:0}:{tab}{&SectorTitle:0}
;;;
;;;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;;;  .Line #PaginaBreedte# - #BreedteTitle#
;;;.Else
;;;  .Line #PaginaBreedte#
;;;.EndIf
;;;
;;;.Range   Org
;;;
;;;.Skip 2
;;;.Chart FileName="V04-Charts.xml",ChartName="Std_TermChart"
;;;.NewPage
;;;
;;;
;;;
;;;
;;;;einde grafieken



.EndOfSubReport
