{&&Language=English}$>Rapportage SRA Rating Coach<$
.MenuHelp               $>SRA Rating Coach<$
.FINANversion           3.0

.ReportMode RtfPageTitleInHeader1Style=On
.ReportMode RtfPageTitleInHeader2Style=On
.ReportMode RtfAutomaticPageBreaks=Off


.LineSpacing            1.1                 ;regelafstand
.TM                     2                   ;bovenmarge
.LM                     7                   ;linkermarge
.RM                     5                   ;rechtermarge
.SubIndent              1                   ;inspringen van onderlingende niveau's
.FontName               Arial               ;Lettertype
.FontSize               10                  ;Grootte
.SubHeader              Yes                 ;Bij .Data2 tussenkopje

;instellen paginakop:
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
.DestFileSpec           SRARatingCoach-#DocumentCode#
.ReportDialog

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

.TitleWidth             34
.InitPageSize
.NumberFormat           Windows
.Let                    subtitle=""
.SetNA                  Zero                ;NA worden als zero afgedrukt

; -------------------
; Indien de uitvoer CSV is dan alle regels laten zien, dit ivm het feit dat CSV uitvoer vaak in EXCEL wordt gebruikt om te koppelen.
; en een vaste layout is dan wenselijk
.If #Destination# = 4
  .SuppressLines No
.Else
  .SuppressLines          ZeroNA              ;NA en ZERO regels onderdrukken
.EndIf
; -------------------

.ShowMutCols            Yes
.ShowBlankCols          Yes
.InterSums              Yes                 ;alleen voor DATA2 opdracht
.InterSumTypeface       Bold
.AutoStripe             Yes
.Calc                   1                   ; ivm achtergrondrekenen deze opdracht pas na de vragen

;;—————————————————————————————————————————————————————————————————————————————
;.If                 #Destination# > 1
;$>Advice company<$:{Tab}{M>}#$UserFirm#{<M}
;.Skip               1
;.EndIf

;------------------------------------------------------------------------------

;
;rapportagekolommen voor accoladecommandos
.Let     ReportKol1 = LastTinFormulaSet(NoTrend,MainPeriod)   ;laatste historische jaar
.Let     ReportKol0 = #ReportKol1#-TsY(#ReportKol1#)          ;op een na laatste historische jaar
.Let     ReportKol2 = FirstTinFormulaSet(Trend,MainPeriod)    ;eerste prognosejaar
.Let     ReportKol3 = FirstTinFormulaSet(User,BNKPeriod)      ;bnk
;

;------------------------------------------------------------------------------

;; inhoudsopgave (niet rapporteren bij direct naar printer sturen!)
.If #Destination# = 2
.Else
.Range        Org
.Range        [@]
.FontSize     14
.LM           #LeftMargin#-2
.PageTitle "Inhoudsopgave"
.FontSize     Org
.LM           #LeftMargin#+2

[Voeg hier de inhoudsopgave in via:
Menu - Insert - Reference - Index And Tables
selecteer het tabblad "Table of contents"

.Skip 1
.NewPage
.Range        Org
.NewPage
.EndIf

;------------------------------------------------------------------------------

.SubReport              Name=SRA_RC_Samenv,Title="$>1.0 Samenvatting kredietaanvraag<$"
.PercBase               None
.ReportMode RtfPageTitleInHeader1Style=On
.FontSize               14
.LM                     #LeftMargin#-2
.PageTitle "1.0 Samenvatting kredietaanvraag (x #Currency# #Scale#,-)"
.FontSize               Org
.LM                     #LeftMargin#+2

;; HEADER
.Let PaginaBreedte = #CharsPerLine#-#RightMargin#-#LeftMargin#+2
.Let PaginaHelft   = RoundUp( #PaginaBreedte# / 2) -1
.Let BreedteTitle  = 28
;.Let BreedteKolom  = RoundUp( ((#PaginaBreedte# / 2) - #BreedteTitle#) /2) -1
.Let Tab1 = Round(#PaginaBreedte#/4)-5
.Let Tab2 = #PaginaHelft#+5
.Let Tab3 = #PaginaHelft#+12
.Let Tab4 = #PaginaHelft#+24
.Let Tab5 = #PaginaHelft#+36
.Let Tab6 = #PaginaHelft#+48

.Range                  Org
.Range                  [@]
.Tab                    #Tab1#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)

;hoofdstuk 1
.PercBase               None
{U>}{B>}$>Algemeen<${<B}{<U}

.Tab                    #Tab1#,#Tab2#,#Tab3#,#TAB4#

$>Concern<$:{tab}{&NaamBedr:#BreedteTitle#-5}{tab}$>Algemeen directeur<$:{tab}{&NaamDir:0}
{AdresBedr[0]:0}:{tab}{&AdresBedr:#BreedteTitle#-5}{tab}{EmailDir[0]:0}:{tab}{tab}{&EmailDir:0}
$>Postcode + plaats<$:{tab}{&PostcodeBedr[1]&" "&PlaatsBedr[1]:#BreedteTitle#-5}{tab}{GebJaarDir[0]:0}:{tab}{&GebJaarDir:0}
{TelBedr[0]:0}:{tab}{&TelBedr:#BreedteTitle#-5}
{NawAcc[0]:0}:{tab}{&NawAcc:#BreedteTitle#-5}
{ContactPersAcc[0]:0}:{tab}{&ContactPersAcc:#BreedteTitle#-5}
.Skip 1

;kredietnemers apart itt template omdat dat er meer kunnen zijn

.If SRA_TB_10_2_Keuze[1] = 1
{U>}{B>}$>Kredietnemers<${<B}{<U}
.Memo SRA_TB_10_2
.Skip 1
.EndIf

.If SRA_TB_10_1_Keuze[1] = 1
{U>}{B>}$>Overige algemene gegevens<${<B}{<U}
.Memo SRA_TB_10_1
.Skip 1
.EndIf

.Skip 1
{U>}{B>}$>Belangrijke ratios's / ratings / exploitatievariabelen<${<B}{<U}
.Tab                    #Tab1#,#Tab2#,#Tab3#
{B>}$>Rating / ratio's voor investering<${tab}{[LastTinFormulaSet(1)]ColumnTitle2:0\Right}{<B}
.Tab                    #Tab1#,#Tab2#,#Tab3#
{VrdTermijnDays[0]:0}:{tab}{&VrdTermijnDays[#$ReportKol1#]:0\Right}
{DebTermijnDays[0]:0}:{tab}{&DebTermijnDays[#$ReportKol1#]:0\Right}
{HandCredTermijnDays[0]:0}:{tab}{&HandCredTermijnDays[#$ReportKol1#]:0\Right}
{Solvabiliteit[0]:0}:{tab}{&Solvabiliteit[#$ReportKol1#]:0\Right}
{SRA_Rating_PDLabel[0]:0}:{tab}{tab}{&SRA_Rating_PDLabel[#$ReportKol1#]:0\Right}
{SRA_Rating_PD[0]:0}:{tab}{&SRA_Rating_PD[#$ReportKol1#]:0\Right}
.Skip 1
.Tab                    #Tab1#,#Tab2#,#Tab3#
{B>}$>Rating / ratio's na investering<${tab}{[FirstTinFormulaSet(2)]ColumnTitle2:0\Right}{<B}
{SRA_Rating_PDLabel[0]:0}:{tab}{tab}{&SRA_Rating_PDLabel[#$ReportKol2#]:0\Right}
{SRA_Rating_PD[0]:0}:{tab}{&SRA_Rating_PD[#$ReportKol2#]:0\Right}
{Solvabiliteit[0]:0}:{tab}{&Solvabiliteit[#$ReportKol2#]:0\Right}
.Skip 2
.Range Org
.Range [#ReportKol0#|#ReportKol1#|#ReportKol3#|#ReportKol2#]

.FixTypeface EndSum
.ColumnTitles
.FixTypeface Org
.Data0 NettoOmzet
.Data0 BrutoWinst
.Data0 BrutoMarge
.Data0 BedrK
.Data0 BedrRes

.ColumnTitles None
.Skip 1

.Tab                   #Tab1#,#Tab2#,#Tab3#

.Range Org
.Range [@]

.SuppressLines No
{U>}{B>}$>Kredietfaciliteiten<${<B}{<U}
{B>}$>Huidige kredietfaciliteit(en)<${tab}{tab}{[#$ReportKol1#]ColumnTitle2:0}{<B}
;; rc, langlopend, ev -> boekwaardes, aantal gelijk aan nieuwe kredietfacil
.If DataEntered(Kapitaal,LastTinFormulaSet(NoTrend))
{Kapitaal[0]:0}{tab}{tab}{Kapitaal[#$ReportKol1#]:0}
.EndIf
.If (BerekendLimietRC[LastTinFormulaSet(NoTrend,MainPeriod)])<>NA
{BerekendLimietRC[0]:0}{tab}{tab}{BerekendLimietRC[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred1,LastTinFormulaSet(NoTrend))
{LangKred1[0]:0}{tab}{tab}{LangKred1[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredA,LastTinFormulaSet(NoTrend))
{LangKredA[0]:0}{tab}{tab}{LangKredA[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredB,LastTinFormulaSet(NoTrend))
{LangKredB[0]:0}{tab}{tab}{LangKredB[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredC,LastTinFormulaSet(NoTrend))
{LangKredC[0]:0}{tab}{tab}{LangKredC[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred2,LastTinFormulaSet(NoTrend))
{LangKred2[0]:0}{tab}{tab}{LangKred2[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredF,LastTinFormulaSet(NoTrend))
{LangKredF[0]:0}{tab}{tab}{LangKredF[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred3,LastTinFormulaSet(NoTrend))
{LangKred3[0]:0}{tab}{tab}{LangKred3[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred4,LastTinFormulaSet(NoTrend))
{LangKred4[0]:0}{tab}{tab}{LangKred4[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred5,LastTinFormulaSet(NoTrend))
{LangKred5[0]:0}{tab}{tab}{LangKred5[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred6,LastTinFormulaSet(NoTrend))
{LangKred6[0]:0}{tab}{tab}{LangKred6[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred7,LastTinFormulaSet(NoTrend))
{LangKred7[0]:0}{tab}{tab}{LangKred7[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred8,LastTinFormulaSet(NoTrend))
{LangKred8[0]:0}{tab}{tab}{LangKred8[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredH,LastTinFormulaSet(NoTrend))
{LangKredH[0]:0}{tab}{tab}{LangKredH[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred9,LastTinFormulaSet(NoTrend))
{LangKred9[0]:0}{tab}{tab}{LangKred9[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredG,LastTinFormulaSet(NoTrend))
{LangKredG[0]:0}{tab}{tab}{LangKredG[#$ReportKol1#]:0\Right}
.EndIf
.Stripe =
{B>}Totaal{tab}{tab}{SRA_Totaal_HuidFacil[#$ReportKol1#]:0\Right}{<B}

.Skip 1
;;;;
{B>}$>Nieuwe kredietbehoefte<${tab}{tab}{[#$ReportKol2#]ColumnTitle2:0}{<B}
.If DataEntered(BBInvPlanAkt1Inv,1)
{BBInvPlanAkt1Inv[0]:0}{tab}{tab}{BBInvPlanAkt1Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktHInv,1)
{BBInvPlanAktHInv[0]:0}{tab}{tab}{BBInvPlanAktHInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktFInv,1)
{BBInvPlanAktFInv[0]:0}{tab}{tab}{BBInvPlanAktFInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt2Inv,1)
{BBInvPlanAkt2Inv[0]:0}{tab}{tab}{BBInvPlanAkt2Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt3Inv,1)
{BBInvPlanAkt3Inv[0]:0}{tab}{tab}{BBInvPlanAkt3Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt4Inv,1)
{BBInvPlanAkt4Inv[0]:0}{tab}{tab}{BBInvPlanAkt4Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt5Inv,1)
{BBInvPlanAkt5Inv[0]:0}{tab}{tab}{BBInvPlanAkt5Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt6Inv,1)
{BBInvPlanAkt6Inv[0]:0}{tab}{tab}{BBInvPlanAkt6Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt7Inv,1)
{BBInvPlanAkt7Inv[0]:0}{tab}{tab}{BBInvPlanAkt7Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktJInv,1)
{BBInvPlanAktJInv[0]:0}{tab}{tab}{BBInvPlanAktJInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt8Inv,1)
{BBInvPlanAkt8Inv[0]:0}{tab}{tab}{BBInvPlanAkt8Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktDInv,1)
{BBInvPlanAktDInv[0]:0}{tab}{tab}{BBInvPlanAktDInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktCInv,1)
{BBInvPlanAktCInv[0]:0}{tab}{tab}{BBInvPlanAktCInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktPInv,1)
{BBInvPlanAktPInv[0]:0}{tab}{tab}{BBInvPlanAktPInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktNInv,1)
{BBInvPlanAktNInv[0]:0}{tab}{tab}{BBInvPlanAktNInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktMInv,1)
{BBInvPlanAktMInv[0]:0}{tab}{tab}{BBInvPlanAktMInv[1]:0\Right}
.EndIf
.Stripe =
{B>}Totaal{tab}{tab}{BBInvPlan[1]:0\Right}{<B}
;;;;
.Skip 1
{B>}$>Nieuwe kredietfaciliteit(en)<${tab}{tab}{[#$ReportKol2#]ColumnTitle2:0}{<B}
.If DataEntered(BBFin_EVStorting,1)
{BBFin_EVStorting[0]:0}{tab}{tab}{BBFin_EVStorting[1]:0\Right}
.EndIf
.If DataEntered(BBFin_RC,1)
{BBFin_RC[0]:0}{tab}{tab}{BBFin_RC[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred1HoofdSom,1)
{BBFin_Kred1HoofdSom[0]:0}{tab}{tab}{BBFin_Kred1HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredAHoofdSom,1)
{BBFin_KredAHoofdSom[0]:0}{tab}{tab}{BBFin_KredAHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredBHoofdSom,1)
{BBFin_KredBHoofdSom[0]:0}{tab}{tab}{BBFin_KredBHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredCHoofdSom,1)
{BBFin_KredCHoofdSom[0]:0}{tab}{tab}{BBFin_KredCHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred2HoofdSom,1)
{BBFin_Kred2HoofdSom[0]:0}{tab}{tab}{BBFin_Kred2HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredFHoofdSom,1)
{BBFin_KredFHoofdSom[0]:0}{tab}{tab}{BBFin_KredFHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred3HoofdSom,1)
{BBFin_Kred3HoofdSom[0]:0}{tab}{tab}{BBFin_Kred3HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred4HoofdSom,1)
{BBFin_Kred4HoofdSom[0]:0}{tab}{tab}{BBFin_Kred4HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred5HoofdSom,1)
{BBFin_Kred5HoofdSom[0]:0}{tab}{tab}{BBFin_Kred5HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred6HoofdSom,1)
{BBFin_Kred6HoofdSom[0]:0}{tab}{tab}{BBFin_Kred6HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred7HoofdSom,1)
{BBFin_Kred7HoofdSom[0]:0}{tab}{tab}{BBFin_Kred7HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred8HoofdSom,1)
{BBFin_Kred8HoofdSom[0]:0}{tab}{tab}{BBFin_Kred8HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredHHoofdSom,1)
{BBFin_KredHHoofdSom[0]:0}{tab}{tab}{BBFin_KredHHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred9HoofdSom,1)
{BBFin_Kred9HoofdSom[0]:0}{tab}{tab}{BBFin_Kred9HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredGHoofdSom,1)
{BBFin_KredGHoofdSom[0]:0}{tab}{tab}{BBFin_KredGHoofdSom[1]:0\Right}
.EndIf
.Stripe =
{B>}Totaal{tab}{tab}{BBFinPlan[1]:0\Right}{<B}
{<B}                ;HZ DEZE LATEN STAAN ANDERS 2.0 BOLD
.SuppressLines Org
.Range ORG
;


.NewPage
.EndOfSubReport

;------------------------------------------------------------------------------
.SubReport              Name=SRA_RC_ToelKA,Title="$>2.0 Toelichting kredietaanvraag<$"
.PercBase               None
.Range Org
.Range [@]
.ReportMode RtfPageTitleInHeader1Style=On
.FontSize               14
.LM                     #LeftMargin#-2
.PageTitle "2.0 Toelichting financieringsaanvraag"
.FontSize               Org
.LM                     #LeftMargin#+2


;; header wordt in eerste instatie een .Header commando
;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;  .Line #PaginaBreedte# - #BreedteTitle#
;.Else
;  .Line #PaginaBreedte#
;.EndIf
;$>Date<$:{tab}#DatumTijd#
;$>Name<$:{tab}{&NaamBedr:0}
;{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}
;{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
;{SectorTitle[0]:0}:{tab}{&SectorTitle:0}
;{SectorCode[0]:0}:{tab}{&SectorCode:0}
;{SRA_KA_Soort[0]:0}:{tab}{&SRA_KA_Soort:0}
;.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
;  .Line #PaginaBreedte# - #BreedteTitle#
;.Else
;  .Line #PaginaBreedte#
;.EndIf
;.Skip 1
;.Range Org
;; header wordt in eerste instatie een .Header commando

;2.1

.Range Org
.Range [@]
.ReportMode RtfPageTitleInHeader2Style=On
.Let &HeaderSRA=&SRA_TB_21[0]
.PageTitle #HeaderSRA#
.Skip 1

.Let MemoNr = 0

.If SRA_TB_21a_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.1.#MemoNr# {SRA_TB_21a[0]:0}
.Memo SRA_TB_21a
.Skip 1
.EndIf

.If SRA_TB_21b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.1.#MemoNr# {SRA_TB_21b[0]:0}
.Memo SRA_TB_21b
.Skip 1
.EndIf

.If SRA_TB_21c_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.1.#MemoNr# {SRA_TB_21c[0]:0}
.Memo SRA_TB_21c
.Skip 1
.EndIf

.If SRA_TB_21d_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.1.#MemoNr# {SRA_TB_21d[0]:0}
.Memo SRA_TB_21d
.Skip 1
.EndIf

.If SRA_TB_21e_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.1.#MemoNr# {SRA_TB_21e[0]:0}
.Memo SRA_TB_21e
.Skip 1
.EndIf

.If SRA_TB_21f_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.1.#MemoNr# {SRA_TB_21f[0]:0}
.Memo SRA_TB_21f
.Skip 1
.EndIf

.If SRA_TB_21g_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.1.#MemoNr# {SRA_TB_21g[0]:0}
.Memo SRA_TB_21g
.Skip 1
.EndIf

.NewPage

;2.2
.PercBase               None
.Range Org
.Range [@]
.ReportMode RtfPageTitleInHeader2Style=On
.Let &HeaderSRA=&SRA_TB_22[0]
.PageTitle #HeaderSRA#
.Skip 1

.Let MemoNr = 0

.If SRA_TB_22a_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22a[0]:0}
.Memo SRA_TB_22a
.Skip 1
.EndIf

.If SRA_TB_22b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22b[0]:0}
.Memo SRA_TB_22b
.Skip 1
.EndIf

.If SRA_TB_22c_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22c[0]:0}
.Memo SRA_TB_22c
.Skip 1
.EndIf

.If SRA_TB_22d_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22d[0]:0}
.Memo SRA_TB_22d
.Skip 1
.EndIf

.If SRA_TB_22e_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22e[0]:0}
.Memo SRA_TB_22e
.Skip 1
.EndIf

.If SRA_TB_22f_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22f[0]:0}
.Memo SRA_TB_22f
.Skip 1
.EndIf

.If SRA_TB_22g_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22g[0]:0}
.Memo SRA_TB_22g
.Skip 1
.EndIf

.If SRA_TB_22h_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22h[0]:0}
.Memo SRA_TB_22h
.Skip 1
.EndIf

.If SRA_TB_22i_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22i[0]:0}
.Memo SRA_TB_22i
.Skip 1
.EndIf

.If SRA_TB_22j_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.2.#MemoNr# {SRA_TB_22j[0]:0}
.Memo SRA_TB_22j
.Skip 1
.EndIf

.NewPage

;2.3
.PercBase               None
.Range Org
.Range [@]
.ReportMode RtfPageTitleInHeader2Style=On
.Let &HeaderSRA=&SRA_TB_23[0]
.PageTitle #HeaderSRA#
.Skip 1

.Let MemoNr = 0

.If SRA_TB_23a_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23a[0]:0}
.Memo SRA_TB_23a
.Skip 1
.EndIf

.If SRA_TB_23b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23b[0]:0}
.Memo SRA_TB_23b
.Skip 1
.EndIf

.If SRA_TB_23c_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23c[0]:0}
.Memo SRA_TB_23c
.Skip 1
.EndIf

.If SRA_TB_23d_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23d[0]:0}
.Memo SRA_TB_23d
.Skip 1
.EndIf

.If SRA_TB_23e_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23e[0]:0}
.Memo SRA_TB_23e
.Skip 1
.EndIf

.If SRA_TB_23f_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23f[0]:0}
.Memo SRA_TB_23f
.Skip 1
.EndIf

.If SRA_TB_23g_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23g[0]:0}
.Memo SRA_TB_23g
.Skip 1
.EndIf

.If SRA_TB_23h_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23h[0]:0}
.Memo SRA_TB_23h
.Skip 1
.EndIf

.If SRA_TB_23i_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23i[0]:0}
.Memo SRA_TB_23i
.Skip 1
.EndIf

.If SRA_TB_23j_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23j[0]:0}
.Memo SRA_TB_23j
.Skip 1
.EndIf

.If SRA_TB_23k_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
2.3.#MemoNr# {SRA_TB_23k[0]:0}
.Memo SRA_TB_23k
.Skip 1
.EndIf

.NewPage
.EndOfSubReport

;------------------------------------------------------------------------------
;3.0
.SubReport              Name=SRA_RC_InvKred,Title="$>3.0 Investerings- en kredietbehoefte<$"
.PercBase               None
.ReportMode RtfPageTitleInHeader1Style=On
.FontSize               14
.LM                     #LeftMargin#-2
.PageTitle "3.0 Investerings- en kredietbehoefte"
.FontSize               Org
.LM                     #LeftMargin#+2

;; HEADER
.Let PaginaBreedte = #CharsPerLine#-#RightMargin#-#LeftMargin#+2
.Let PaginaHelft   = RoundUp( #PaginaBreedte# / 2) -1
.Let BreedteTitle  = 28
;.Let BreedteKolom  = RoundUp( ((#PaginaBreedte# / 2) - #BreedteTitle#) /2) -1
.Let Tab1 = 32
.Let Tab2 = #PaginaHelft#+2
.Let Tab3 = #PaginaBreedte#-10
.Range Org
.Range   [@]
.Tab                    #Tab1#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)


;3.0
;getallen

.Tab                   #Tab1#,#Tab2#,#Tab3#
.Range Org
.Range [@]

.SuppressLines No
{U>}{B>}$>Kredietfaciliteiten<$ (x #Currency# #Scale#,-){<B}{<U}
.Skip 1
;;;;
{B>}$>Huidige kredietfaciliteit(en)<${tab}{tab}{[#$ReportKol1#]ColumnTitle2:0}{<B}
;; rc, langlopend, ev -> boekwaardes, aantal gelijk aan nieuwe kredietfacil
.If DataEntered(Kapitaal,LastTinFormulaSet(NoTrend))
{Kapitaal[0]:0}{tab}{tab}{Kapitaal[#$ReportKol1#]:0}
.EndIf
.If (BerekendLimietRC[LastTinFormulaSet(NoTrend,MainPeriod)])<>NA
{BerekendLimietRC[0]:0}{tab}{tab}{BerekendLimietRC[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred1,LastTinFormulaSet(NoTrend))
{LangKred1[0]:0}{tab}{tab}{LangKred1[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredA,LastTinFormulaSet(NoTrend))
{LangKredA[0]:0}{tab}{tab}{LangKredA[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredB,LastTinFormulaSet(NoTrend))
{LangKredB[0]:0}{tab}{tab}{LangKredB[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredC,LastTinFormulaSet(NoTrend))
{LangKredC[0]:0}{tab}{tab}{LangKredC[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred2,LastTinFormulaSet(NoTrend))
{LangKred2[0]:0}{tab}{tab}{LangKred2[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredF,LastTinFormulaSet(NoTrend))
{LangKredF[0]:0}{tab}{tab}{LangKredF[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred3,LastTinFormulaSet(NoTrend))
{LangKred3[0]:0}{tab}{tab}{LangKred3[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred4,LastTinFormulaSet(NoTrend))
{LangKred4[0]:0}{tab}{tab}{LangKred4[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred5,LastTinFormulaSet(NoTrend))
{LangKred5[0]:0}{tab}{tab}{LangKred5[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred6,LastTinFormulaSet(NoTrend))
{LangKred6[0]:0}{tab}{tab}{LangKred6[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred7,LastTinFormulaSet(NoTrend))
{LangKred7[0]:0}{tab}{tab}{LangKred7[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred8,LastTinFormulaSet(NoTrend))
{LangKred8[0]:0}{tab}{tab}{LangKred8[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredH,LastTinFormulaSet(NoTrend))
{LangKredH[0]:0}{tab}{tab}{LangKredH[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKred9,LastTinFormulaSet(NoTrend))
{LangKred9[0]:0}{tab}{tab}{LangKred9[#$ReportKol1#]:0\Right}
.EndIf
.If DataEntered(LangKredG,LastTinFormulaSet(NoTrend))
{LangKredG[0]:0}{tab}{tab}{LangKredG[#$ReportKol1#]:0\Right}
.EndIf
.Stripe =
{B>}Totaal{tab}{tab}{SRA_Totaal_HuidFacil[#$ReportKol1#]:0\Right}{<B}

.Skip 1
;;;;
{B>}$>Nieuwe kredietbehoefte<${tab}{tab}{[#$ReportKol2#]ColumnTitle2:0}{<B}
.If DataEntered(BBInvPlanAkt1Inv,1)
{BBInvPlanAkt1Inv[0]:0}{tab}{tab}{BBInvPlanAkt1Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktHInv,1)
{BBInvPlanAktHInv[0]:0}{tab}{tab}{BBInvPlanAktHInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktFInv,1)
{BBInvPlanAktFInv[0]:0}{tab}{tab}{BBInvPlanAktFInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt2Inv,1)
{BBInvPlanAkt2Inv[0]:0}{tab}{tab}{BBInvPlanAkt2Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt3Inv,1)
{BBInvPlanAkt3Inv[0]:0}{tab}{tab}{BBInvPlanAkt3Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt4Inv,1)
{BBInvPlanAkt4Inv[0]:0}{tab}{tab}{BBInvPlanAkt4Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt5Inv,1)
{BBInvPlanAkt5Inv[0]:0}{tab}{tab}{BBInvPlanAkt5Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt6Inv,1)
{BBInvPlanAkt6Inv[0]:0}{tab}{tab}{BBInvPlanAkt6Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt7Inv,1)
{BBInvPlanAkt7Inv[0]:0}{tab}{tab}{BBInvPlanAkt7Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktJInv,1)
{BBInvPlanAktJInv[0]:0}{tab}{tab}{BBInvPlanAktJInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt8Inv,1)
{BBInvPlanAkt8Inv[0]:0}{tab}{tab}{BBInvPlanAkt8Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktDInv,1)
{BBInvPlanAktDInv[0]:0}{tab}{tab}{BBInvPlanAktDInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktCInv,1)
{BBInvPlanAktCInv[0]:0}{tab}{tab}{BBInvPlanAktCInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktPInv,1)
{BBInvPlanAktPInv[0]:0}{tab}{tab}{BBInvPlanAktPInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktNInv,1)
{BBInvPlanAktNInv[0]:0}{tab}{tab}{BBInvPlanAktNInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktMInv,1)
{BBInvPlanAktMInv[0]:0}{tab}{tab}{BBInvPlanAktMInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt20Inv,1)
{BBInvPlanAkt20Inv[0]:0}{tab}{tab}{BBInvPlanAkt20Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt21Inv,1)
{BBInvPlanAkt21Inv[0]:0}{tab}{tab}{BBInvPlanAkt21Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt22Inv,1)
{BBInvPlanAkt22Inv[0]:0}{tab}{tab}{BBInvPlanAkt22Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt23Inv,1)
{BBInvPlanAkt23Inv[0]:0}{tab}{tab}{BBInvPlanAkt23Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt24Inv,1)
{BBInvPlanAkt24Inv[0]:0}{tab}{tab}{BBInvPlanAkt24Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt25Inv,1)
{BBInvPlanAkt25Inv[0]:0}{tab}{tab}{BBInvPlanAkt25Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAktQInv,1)
{BBInvPlanAktQInv[0]:0}{tab}{tab}{BBInvPlanAktQInv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt50Inv,1)
{BBInvPlanAkt50Inv[0]:0}{tab}{tab}{BBInvPlanAkt50Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt51Inv,1)
{BBInvPlanAkt51Inv[0]:0}{tab}{tab}{BBInvPlanAkt51Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt52Inv,1)
{BBInvPlanAkt52Inv[0]:0}{tab}{tab}{BBInvPlanAkt52Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt53Inv,1)
{BBInvPlanAkt53Inv[0]:0}{tab}{tab}{BBInvPlanAkt53Inv[1]:0\Right}
.EndIf
.If DataEntered(BBInvPlanAkt54Inv,1)
{BBInvPlanAkt54Inv[0]:0}{tab}{tab}{BBInvPlanAkt54Inv[1]:0\Right}
.EndIf

.Stripe =
{B>}Totaal{tab}{tab}{BBInvPlan[1]:0\Right}{<B}
;;;;
.Skip 1
{B>}$>Nieuwe kredietfaciliteit(en)<${tab}{tab}{[#$ReportKol2#]ColumnTitle2:0}{<B}
.If DataEntered(BBFin_EVStorting,1)
{BBFin_EVStorting[0]:0}{tab}{tab}{BBFin_EVStorting[1]:0\Right}
.EndIf
.If DataEntered(BBFin_RC,1)
{BBFin_RC[0]:0}{tab}{tab}{BBFin_RC[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred1HoofdSom,1)
{BBFin_Kred1HoofdSom[0]:0}{tab}{tab}{BBFin_Kred1HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredAHoofdSom,1)
{BBFin_KredAHoofdSom[0]:0}{tab}{tab}{BBFin_KredAHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredBHoofdSom,1)
{BBFin_KredBHoofdSom[0]:0}{tab}{tab}{BBFin_KredBHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredCHoofdSom,1)
{BBFin_KredCHoofdSom[0]:0}{tab}{tab}{BBFin_KredCHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred2HoofdSom,1)
{BBFin_Kred2HoofdSom[0]:0}{tab}{tab}{BBFin_Kred2HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredFHoofdSom,1)
{BBFin_KredFHoofdSom[0]:0}{tab}{tab}{BBFin_KredFHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred3HoofdSom,1)
{BBFin_Kred3HoofdSom[0]:0}{tab}{tab}{BBFin_Kred3HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred4HoofdSom,1)
{BBFin_Kred4HoofdSom[0]:0}{tab}{tab}{BBFin_Kred4HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred5HoofdSom,1)
{BBFin_Kred5HoofdSom[0]:0}{tab}{tab}{BBFin_Kred5HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred6HoofdSom,1)
{BBFin_Kred6HoofdSom[0]:0}{tab}{tab}{BBFin_Kred6HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred7HoofdSom,1)
{BBFin_Kred7HoofdSom[0]:0}{tab}{tab}{BBFin_Kred7HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred8HoofdSom,1)
{BBFin_Kred8HoofdSom[0]:0}{tab}{tab}{BBFin_Kred8HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredHHoofdSom,1)
{BBFin_KredHHoofdSom[0]:0}{tab}{tab}{BBFin_KredHHoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_Kred9HoofdSom,1)
{BBFin_Kred9HoofdSom[0]:0}{tab}{tab}{BBFin_Kred9HoofdSom[1]:0\Right}
.EndIf
.If DataEntered(BBFin_KredGHoofdSom,1)
{BBFin_KredGHoofdSom[0]:0}{tab}{tab}{BBFin_KredGHoofdSom[1]:0\Right}
.EndIf
.Stripe =
{B>}Totaal{tab}{tab}{BBFinPlan[1]:0\Right}{<B}
.Skip 2
.SuppressLines Org
.Range ORG

;einde getallen

;tekstblokken
.Let MemoNr = 0

.If SRA_TB_30a_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
3.0.#MemoNr# {SRA_TB_30a[0]:0}
.Memo SRA_TB_30a
.Skip 1
.EndIf

.If SRA_TB_30b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
3.0.#MemoNr# {SRA_TB_30b[0]:0}
.Memo SRA_TB_30b
.Skip 1
.EndIf

.If SRA_TB_30b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
3.0.#MemoNr# {SRA_TB_30b[0]:0}
.Memo SRA_TB_30b
.Skip 1
.EndIf

.If SRA_TB_30c_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
3.0.#MemoNr# {SRA_TB_30c[0]:0}
.Memo SRA_TB_30c
.Skip 1
.EndIf

.If SRA_TB_30d_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
3.0.#MemoNr# {SRA_TB_30d[0]:0}
.Memo SRA_TB_30d
.Skip 1
.EndIf

.If SRA_TB_30e_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
3.0.#MemoNr# {SRA_TB_30e[0]:0}
.Memo SRA_TB_30e
.Skip 1
.EndIf

.If SRA_TB_30f_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
3.0.#MemoNr# {SRA_TB_30f[0]:0}
.Memo SRA_TB_30f
.Skip 1
.EndIf
;einde tekstblokken

.NewPage
.EndOfSubReport

;------------------------------------------------------------------------------
;4.0
.SubReport              Name=SRA_RC_KredVorm,Title="$>4.0 Kredietvorm<$"
.PercBase               None
.ReportMode RtfPageTitleInHeader1Style=On
.FontSize               14
.LM                     #LeftMargin#-2
.PageTitle "4.0 Kredietvorm"
.FontSize               Org
.LM                     #LeftMargin#+2
;; HEADER
.Let PaginaBreedte = #CharsPerLine#-#RightMargin#-#LeftMargin#+2
.Let PaginaHelft   = RoundUp( #PaginaBreedte# / 2) -1
.Let BreedteTitle  = 28
;.Let BreedteKolom  = RoundUp( ((#PaginaBreedte# / 2) - #BreedteTitle#) /2) -1
.Let Tab1 = 32
.Let Tab2 = #PaginaHelft#+2
.Let Tab3 = #PaginaBreedte#-10
.Tab                    #Tab1#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)

.Range Org
.Range [@]

;4.0

.Let MemoNr = 0

.If SRA_TB_40a_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
4.0.#MemoNr# {SRA_TB_40a[0]:0}
.Memo SRA_TB_40a
.Skip 1
.EndIf

.If SRA_TB_40b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
4.0.#MemoNr# {SRA_TB_40b[0]:0}
.Memo SRA_TB_40b
.Skip 1
.EndIf

.If SRA_TB_40c_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
4.0.#MemoNr# {SRA_TB_40c[0]:0}
.Memo SRA_TB_40c
.Skip 1
.EndIf

.If SRA_TB_40d_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
4.0.#MemoNr# {SRA_TB_40d[0]:0}
.Memo SRA_TB_40d
.Skip 1
.EndIf

.If SRA_TB_40e_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
4.0.#MemoNr# {SRA_TB_40e[0]:0}
.Memo SRA_TB_40e
.Skip 1
.EndIf

.NewPage
.EndOfSubReport
;------------------------------------------------------------------------------
;5.0
.SubReport              Name=SRA_RC_FinGegev,Title="$>5.0 Financiële gegevens<$"
.PercBase               None
.ReportMode RtfPageTitleInHeader1Style=On
.FontSize               14
.LM                     #LeftMargin#-2
.PageTitle "5.0 Financiële gegevens"
.FontSize               Org
.LM                     #LeftMargin#+2
;; HEADER
.Let PaginaBreedte = #CharsPerLine#-#RightMargin#-#LeftMargin#+2
.Let PaginaHelft   = RoundUp( #PaginaBreedte# / 2) -1
.Let BreedteTitle  = 28
;.Let BreedteKolom  = RoundUp( ((#PaginaBreedte# / 2) - #BreedteTitle#) /2) -1
.Let Tab1 = 32
.Let Tab2 = #PaginaHelft#+2
.Let Tab3 = #PaginaBreedte#-10
.Tab                    #Tab1#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)

;5.0
.PercBase               None
.Memo SRA_TB_50
.Skip 1
;.NewPage

;5.1
.NeedData2 Balans


.ReportMode RtfPageTitleInHeader2Style=On
.PageTitle "5.1 Financieel (balans)"

;balans
.PercBase               BalAkt
.CountData1             LineCount=Balans

.If                     #LineCount#>0

.FontSize               9
(BNK = Balans na kredietverlening)
.Skip 1
.FontSize               Org

{B>}$>Balance sheet<$ (x #Currency# #Scale#,-){<B}
.FixTypeface            EndSum
.ColumnTitles           NoCum
.ColumnTitles           None
.FixTypeface            Org
.Skip    1

.Data2                  Balans ImmatAkt
.Skip 1
.Data2                  Balans EigenVerm

.NewPage
.EndIf


;AV
.PercBase               AV
.CountData1             LineCount=AV
.If                     #LineCount#>0

{U>}{B>}$>Berekening aansprakelijk vermogen<${<B}{<U}
{B>}$>Liable capital<$ (x #Currency# #Scale#,-){<B}
.FixTypeface            EndSum
.ColumnTitles           NoCum
.ColumnTitles           None
.FixTypeface            Org
.Skip    1

.Data2                  AV
.Skip 1
.Data1                  HerwBalAkt
.Skip 1
.EndIf


;toelichting activazijde
;.Range [@]
{U>}{B>}$>5.1.1 Toelichting activazijde<${<B}{<U}
.Skip 1

.Let MemoNr = 0

.If SRA_TB_51Aa_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.1.#MemoNr# {SRA_TB_51Aa[0]:0}
.Memo SRA_TB_51Aa
.Skip 1
.EndIf

.If SRA_TB_51Ab_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.1.#MemoNr# {SRA_TB_51Ab[0]:0}
.Memo SRA_TB_51Ab
.Skip 1
.EndIf

.If SRA_TB_51Ac_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.1.#MemoNr# {SRA_TB_51Ac[0]:0}
.Memo SRA_TB_51Ac
.Skip 1
.EndIf

.If SRA_TB_51Ad_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.1.#MemoNr# {SRA_TB_51Ad[0]:0}
.Memo SRA_TB_51Ad
.Skip 1
.EndIf

.If SRA_TB_51Ae_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.1.#MemoNr# {SRA_TB_51Ae[0]:0}
.Memo SRA_TB_51Ae
.Skip 1
.EndIf

.If SRA_TB_51Af_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.1.#MemoNr# {SRA_TB_51Af[0]:0}
.Memo SRA_TB_51Af
.Skip 1
.EndIf

.If SRA_TB_51Ag_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.1.#MemoNr# {SRA_TB_51Ag[0]:0}
.Memo SRA_TB_51Ag
.Skip 1
.EndIf

.If SRA_TB_51Ah_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.1.#MemoNr# {SRA_TB_51Ah[0]:0}
.Memo SRA_TB_51Ah
.Skip 1
.EndIf

.If SRA_TB_51Ai_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.1.#MemoNr# {SRA_TB_51Ai[0]:0}
.Memo SRA_TB_51Ai
.Skip 1
.EndIf


;toelichting passivazijde
;.Range [@]
{U>}{B>}$>5.1.2 Toelichting passivazijde<${<B}{<U}
.Skip 1

.Let MemoNr = 0

.If SRA_TB_51Pa_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.2.#MemoNr# {SRA_TB_51Pa[0]:0}
.Memo SRA_TB_51Pa
.Skip 1
.EndIf

.If SRA_TB_51Pb_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.2.#MemoNr# {SRA_TB_51Pb[0]:0}
.Memo SRA_TB_51Pb
.Skip 1
.EndIf

.If SRA_TB_51Pc_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.2.#MemoNr# {SRA_TB_51Pc[0]:0}
.Memo SRA_TB_51Pc
.Skip 1
.EndIf

.If SRA_TB_51Pd_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.2.#MemoNr# {SRA_TB_51Pd[0]:0}
.Memo SRA_TB_51Pd
.Skip 1
.EndIf

.If SRA_TB_51Pe_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.2.#MemoNr# {SRA_TB_51Pe[0]:0}
.Memo SRA_TB_51Pe
.Skip 1
.EndIf

.If SRA_TB_51Pf_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.2.#MemoNr# {SRA_TB_51Pf[0]:0}
.Memo SRA_TB_51Pf
.Skip 1
.EndIf

.If SRA_TB_51Pg_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.2.#MemoNr# {SRA_TB_51Pg[0]:0}
.Memo SRA_TB_51Pg
.Skip 1
.EndIf

.If SRA_TB_51Ph_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.2.#MemoNr# {SRA_TB_51Ph[0]:0}
.Memo SRA_TB_51Ph
.Skip 1
.EndIf

.If SRA_TB_51Pi_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.1.2.#MemoNr# {SRA_TB_51Pi[0]:0}
.Memo SRA_TB_51Pi
.Skip 1
.EndIf

.Skip 1
.NewPage


;5.2
.ReportMode RtfPageTitleInHeader2Style=On
.PageTitle "5.2 Financieel (exploitatie)"


;resrek
.PercBase               ResNaBel
.CountData1             LineCount=ResRek

.If                     #LineCount#>0
{B>}$>Profit and loss account<$ (x #Currency# #Scale#,-){<B}
.FixTypeface            EndSum
.ColumnTitles           NoCum
.ColumnTitles           None
.FixTypeface            Org

.Skip    1
.Data2                  ResRek NettoOmzet
.Skip 1
$>Net worth reconciliation<$
.Data1                  VermAansl
.Skip 1
.EndIf

;toelichting exploitatie
;.Range [@]
{U>}{B>}$>Toelichting exploitatie<${<B}{<U}
.Skip 1

.Let MemoNr = 0

.If SRA_TB_52a_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.2.#MemoNr# {SRA_TB_52a[0]:0}
.Memo SRA_TB_52a
.Skip 1
.EndIf

.If SRA_TB_52b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.2.#MemoNr# {SRA_TB_52b[0]:0}
.Memo SRA_TB_52b
.Skip 1
.EndIf

.If SRA_TB_52c_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.2.#MemoNr# {SRA_TB_52c[0]:0}
.Memo SRA_TB_52c
.Skip 1
.EndIf

.NewPage


;5.3
.ReportMode RtfPageTitleInHeader2Style=On
.PageTitle "5.3 Kasstroomanalyse"

;invest en financieringsplan
.PercBase               MutRekCour
.CountData1             LineCount=CashFlows

.If                     #LineCount#>0
.FixTypeface            EndSum
.ColumnTitles           NoCum
.ColumnTitles           None
.FixTypeface            Org

.Skip    1
.Data2                  CashFlows OperAktCF
.Skip 1
.EndIf

;toelichting kasstroomanalyse
.Range Org
.Range [@]
{U>}{B>}$>Toelichting kasstroomanalyse<${<B}{<U}
.Skip 1

.Let MemoNr = 0

.If SRA_TB_53a_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.3.#MemoNr# {SRA_TB_53a[0]:0}
.Memo SRA_TB_53a
.Skip 1
.EndIf

.If SRA_TB_53b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.3.#MemoNr# {SRA_TB_53b[0]:0}
.Memo SRA_TB_53b
.Skip 1
.EndIf

.If SRA_TB_53c_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.3.#MemoNr# {SRA_TB_53c[0]:0}
.Memo SRA_TB_53c
.Skip 1
.EndIf

.If SRA_TB_53d_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.3.#MemoNr# {SRA_TB_53d[0]:0}
.Memo SRA_TB_53d
.Skip 1
.EndIf

.If SRA_TB_53e_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.3.#MemoNr# {SRA_TB_53e[0]:0}
.Memo SRA_TB_53e
.Skip 1
.EndIf

.If SRA_TB_53f_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.3.#MemoNr# {SRA_TB_53f[0]:0}
.Memo SRA_TB_53f
.Skip 1
.EndIf

.If SRA_TB_53g_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.3.#MemoNr# {SRA_TB_53g[0]:0}
.Memo SRA_TB_53g
.Skip 1
.EndIf

.If SRA_TB_53h_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.3.#MemoNr# {SRA_TB_53h[0]:0}
.Memo SRA_TB_53h
.Skip 1
.EndIf

.If SRA_TB_53i_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
5.3.#MemoNr# {SRA_TB_53i[0]:0}
.Memo SRA_TB_53i
.Skip 1
.EndIf

.NewPage
.EndOfSubReport

;------------------------------------------------------------------------------
; 6.0
.SubReport              Name=SRA_RC_ZekerHeden,Title="$>6.0 Zekerheden<$"
.PercBase               None
.ReportMode RtfPageTitleInHeader1Style=On
.FontSize               14
.LM                     #LeftMargin#-2
.PageTitle "6.0 Zekerheden"
.FontSize               Org
.LM                     #LeftMargin#+2
;; HEADER
.Let PaginaBreedte = #CharsPerLine#-#RightMargin#-#LeftMargin#+2
.Let PaginaHelft   = RoundUp( #PaginaBreedte# / 2) -1
.Let BreedteTitle  = 28
;.Let BreedteKolom  = RoundUp( ((#PaginaBreedte# / 2) - #BreedteTitle#) /2) -1
.Let Tab1 = 32
.Let Tab2 = #PaginaHelft#+2
.Let Tab3 = #PaginaBreedte#-10
.Range Org
.Range   [@]
.Tab                    #Tab1#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)

;;;;NOG DE DEKKINGSWAARDES HIER RAPPORTEREN

.Skip 1

.Skip 1
{B>}$>Langlopende faciliteiten<${<B}
.Let MemoNr = 0

.If SRA_TB_60a_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
6.0.#MemoNr# {SRA_TB_60a[0]:0}
.Memo SRA_TB_60a
.Skip 1
.EndIf

.If SRA_TB_60b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
6.0.#MemoNr# {SRA_TB_60b[0]:0}
.Memo SRA_TB_60b
.Skip 1
.EndIf

{B>}$>Kortlopende faciliteiten<${<B}
.If SRA_TB_60c_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
6.0.#MemoNr# {SRA_TB_60c[0]:0}
.Memo SRA_TB_60c
.Skip 1
.EndIf

.If SRA_TB_60d_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
6.0.#MemoNr# {SRA_TB_60d[0]:0}
.Memo SRA_TB_60d
.Skip 1
.EndIf

.NewPage
.EndOfSubReport

;------------------------------------------------------------------------------
; 7.0
.SubReport              Name=SRA_RC_EindafwSv,Title="$>7.0 Eindafweging en samenvatting<$"
.PercBase               None
.ReportMode RtfPageTitleInHeader1Style=On
.FontSize               14
.LM                     #LeftMargin#-2
.PageTitle "7.0 Eindafweging en samenvatting"
.FontSize               Org
.LM                     #LeftMargin#+2
;; HEADER
.Let PaginaBreedte = #CharsPerLine#-#RightMargin#-#LeftMargin#+2
.Let PaginaHelft   = RoundUp( #PaginaBreedte# / 2) -1
.Let BreedteTitle  = 28
;.Let BreedteKolom  = RoundUp( ((#PaginaBreedte# / 2) - #BreedteTitle#) /2) -1
.Let Tab1 = 32
.Let Tab2 = #PaginaHelft#+2
.Let Tab3 = #PaginaBreedte#-10
.Range Org
.Range   [@]
.Tab                    #Tab1#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)

.Skip 1
.Let MemoNr = 0

.If SRA_TB_70a_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
7.0.#MemoNr# {SRA_TB_70a[0]:0}
.Memo SRA_TB_70a
.Skip 1
.EndIf

.If SRA_TB_70b_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
7.0.#MemoNr# {SRA_TB_70b[0]:0}
.Memo SRA_TB_70b
.Skip 1
.EndIf

.If SRA_TB_70c_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
7.0.#MemoNr# {SRA_TB_70c[0]:0}
.Memo SRA_TB_70c
.Skip 1
.EndIf

.If SRA_TB_70d_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
7.0.#MemoNr# {SRA_TB_70d[0]:0}
.Memo SRA_TB_70d
.Skip 1
.EndIf

.If SRA_TB_70e_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
7.0.#MemoNr# {SRA_TB_70e[0]:0}
.Memo SRA_TB_70e
.Skip 1
.EndIf

.If SRA_TB_70f_Keuze[1] = 1
.Let MemoNr = #MemoNr# + 1
7.0.#MemoNr# {SRA_TB_70f[0]:0}
.Memo SRA_TB_70f
.Skip 1
.EndIf


.NewPage
.EndOfSubReport

;------------------------------------------------------------------------------
