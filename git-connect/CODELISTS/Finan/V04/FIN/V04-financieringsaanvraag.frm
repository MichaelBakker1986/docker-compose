{&&Language=English}$>Credit request<$
.MenuHelp      $>Report-model with choice of columns and subreport<$
.FINANversion  2.0

{&&if INSTALLCODE=4,8,11}  ; Indien Advice, Banking, Franchis dan geen 'Financieringsaanvraag'
.HideMenuItem On
{&&else}
.HideMenuItem Off
{&&endif}
;
;
.If "#$ReportDialogRange#"=""
.Range                  [Max(1,GetT(LastTinFormulaSet(1,1),-1))..LastTinFormulaSet(1,1)\TsY=1|FirstTinFormulaSet(Trend,PeriodInSheet)|GetT(FirstTinFormulaSet(Trend,PeriodInSheet),1)\TsY=1|GetT(FirstTinFormulaSet(Trend,PeriodInSheet),2)\TsY=1]
.EndIf

.LineSpacing            1.1                 ;regelafstand
.TM                     2                   ;bovenmarge
.LM                     7                   ;linkermarge
.RM                     5                   ;rechtermarge
.SubIndent              1                   ;inspringen van onderlingende niveau's
.FontName               Arial               ;Lettertype
.FontSize               10                  ;Grootte
.SubHeader              Yes                 ;Bij .Data2 tussenkopje
;
; instellen paginakop:

.Let MaandbasisInstellen=NA

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

; einde instellen paginakop
;
.PageNumber             1
.DestFileSpec           Financieringsaanvraag-#DocumentCode#
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

;--------------------------------------------------------------------------------------------------
.SubReport              Name=SummaryFinAanvr,Title="$>Summary<$ $>credit request<$",GroupTitle="$>Credit request<$"
.PercBase               None

;; HEADER
;;
.Let BreedteTitle  = 26
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
{B>}$>Credit request<${<B}
.Range   [@]
.Picture                5,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-6,#Tab6#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf
.Tab                    #Tab3#-2,#Tab3#+33,#Tab3#+45
.Skip 1
.Range Org
;;
;; HEADER


.PercBase               None
.Range [@]

{B>}$>Summary<$ $>credit request<$ (x #Currency# #Scale#,-){<B}
.Skip 1
{BBInvPlanKolom[0]:0}{tab}{&BBInvPlanKolom[1]:0}
;;{BBFinInvPlanToelichting[0]:0}{tab}{&BBFinInvPlanToelichting[1]:0}
{BBInvPlan[0]:0}{tab}{BBInvPlan[1]:0}
{BBFinPlan[0]:0}{tab}{BBFinPlan[1]:0}
{BBDekkingswaarde[0]:0}{tab}{BBDekkingswaarde[1]:0}


.NewPage
.EndOfSubReport



;--------------------------------------------------------------------------------------------------
.SubReport              Name=BBFinInvPlanToelichting,Title="$>Explanation<$ $>credit request<$",GroupTitle="$>Credit request<$"
.PercBase               None

;; HEADER
;;
.Let BreedteTitle  = 26
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
{B>}$>Credit request<${<B}
.Range   [@]
.Picture                5,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-6,#Tab6#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf
.Tab                    #Tab3#-2,#Tab3#+33,#Tab3#+45
.Skip 1
.Range Org
;;
;; HEADER


{B>}$>Explanation<$ $>credit request<${<B}
;.Picture                1,10,finan.bmp
.Skip 1
.Memo                   BBFinInvPlanToelichting

.NewPage
.EndOfSubReport

;--------------------------------------------------------------------------------------------------
.SubReport              Name=BBFinInvPlan,Title="$>Investments<$ / $>Financing<$",GroupTitle="$>Credit request<$"

;; HEADER
;;
.Let BreedteTitle  = 26
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
{B>}$>Credit request<${<B}
.Range   [@]
.Picture                5,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-6,#Tab6#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf
.Tab                    #Tab3#-2,#Tab3#+33,#Tab3#+45
.Skip 1
.Range Org
;;
;; HEADER





.PercBase               None
{B>}$>Investments<$ (x #Currency# #Scale#,-){<B}
;.Picture                1,10,finan.bmp

.Range [@]
.SuppressLines No

.If DataEntered(BBInvPlanAkt1Inv,1)
.Skip 1
{BBInvPlanAkt1Inv[0]:0}{tab}{tab}{BBInvPlanAkt1Inv[1]:0\Right}
{BBInvPlanAkt11[0]:0}{tab}{BBInvPlanAkt11[1]:0}
{BBInvPlanAkt12[0]:0}{tab}{&BBInvPlanAkt12[1]:0}
.EndIf

.If DataEntered(BBInvPlanAktHInv,1)
.Skip 1
{BBInvPlanAktHInv[0]:0}{tab}{tab}{BBInvPlanAktHInv[1]:0\Right}
{BBInvPlanAktH1[0]:0}{tab}{BBInvPlanAktH1[1]:0}
{BBInvPlanAktH2[0]:0}{tab}{&BBInvPlanAktH2[1]:0}
.EndIf

.If DataEntered(BBInvPlanAktFInv,1)
.Skip 1
{BBInvPlanAktFInv[0]:0}{tab}{tab}{BBInvPlanAktFInv[1]:0\Right}
{BBInvPlanAktF1[0]:0}{tab}{BBInvPlanAktF1[1]:0}
{BBInvPlanAktF2[0]:0}{tab}{&BBInvPlanAktF2[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt2Inv,1)
.Skip 1
{BBInvPlanAkt2Inv[0]:0}{tab}{tab}{BBInvPlanAkt2Inv[1]:0\Right}
{BBInvPlanAkt21[0]:0}{tab}{BBInvPlanAkt21[1]:0}
{BBInvPlanAkt22[0]:0}{tab}{&BBInvPlanAkt22[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt3Inv,1)
.Skip 1
{BBInvPlanAkt3Inv[0]:0}{tab}{tab}{BBInvPlanAkt3Inv[1]:0\Right}
{BBInvPlanAkt31[0]:0}{tab}{BBInvPlanAkt31[1]:0}
{BBInvPlanAkt32[0]:0}{tab}{&BBInvPlanAkt32[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt4Inv,1)
.Skip 1
{BBInvPlanAkt4Inv[0]:0}{tab}{tab}{BBInvPlanAkt4Inv[1]:0\Right}
{BBInvPlanAkt41[0]:0}{tab}{BBInvPlanAkt41[1]:0}
{BBInvPlanAkt42[0]:0}{tab}{&BBInvPlanAkt42[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt5Inv,1)
.Skip 1
{BBInvPlanAkt5Inv[0]:0}{tab}{tab}{BBInvPlanAkt5Inv[1]:0\Right}
{BBInvPlanAkt51[0]:0}{tab}{BBInvPlanAkt51[1]:0}
{BBInvPlanAkt52[0]:0}{tab}{&BBInvPlanAkt52[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt6Inv,1)
.Skip 1
{BBInvPlanAkt6Inv[0]:0}{tab}{tab}{BBInvPlanAkt6Inv[1]:0\Right}
{BBInvPlanAkt61[0]:0}{tab}{BBInvPlanAkt61[1]:0}
{BBInvPlanAkt62[0]:0}{tab}{&BBInvPlanAkt62[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt7Inv,1)
.Skip 1
{BBInvPlanAkt7Inv[0]:0}{tab}{tab}{BBInvPlanAkt7Inv[1]:0\Right}
{BBInvPlanAkt71[0]:0}{tab}{BBInvPlanAkt71[1]:0}
{BBInvPlanAkt72[0]:0}{tab}{&BBInvPlanAkt72[1]:0}
.EndIf

.If DataEntered(BBInvPlanAktJInv,1)
.Skip 1
{BBInvPlanAktJInv[0]:0}{tab}{tab}{BBInvPlanAktJInv[1]:0\Right}
{BBInvPlanAktJ1[0]:0}{tab}{BBInvPlanAktJ1[1]:0}
{BBInvPlanAktJ2[0]:0}{tab}{&BBInvPlanAktJ2[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt8Inv,1)
.Skip 1
{BBInvPlanAkt8Inv[0]:0}{tab}{tab}{BBInvPlanAkt8Inv[1]:0\Right}
{BBInvPlanAkt81[0]:0}{tab}{BBInvPlanAkt81[1]:0}
{BBInvPlanAkt82[0]:0}{tab}{&BBInvPlanAkt82[1]:0}
.EndIf

.If DataEntered(BBInvPlanAktDInv,1)
.Skip 1
{BBInvPlanAktDInv[0]:0}{tab}{tab}{BBInvPlanAktDInv[1]:0\Right}
{BBInvPlanAktD1[0]:0}{tab}{BBInvPlanAktD1[1]:0}
{BBInvPlanAktD2[0]:0}{tab}{&BBInvPlanAktD2[1]:0}
.EndIf

.If DataEntered(BBInvPlanAktCInv,1)
.Skip 1
{BBInvPlanAktCInv[0]:0}{tab}{tab}{BBInvPlanAktCInv[1]:0\Right}
{BBInvPlanAktC1[0]:0}{tab}{BBInvPlanAktC1[1]:0}
{BBInvPlanAktC2[0]:0}{tab}{&BBInvPlanAktC2[1]:0}
.EndIf

.If DataEntered(BBInvPlanAktPInv,1)
.Skip 1
{BBInvPlanAktPInv[0]:0}{tab}{tab}{BBInvPlanAktPInv[1]:0\Right}
{BBInvPlanAktP1[0]:0}{tab}{BBInvPlanAktP1[1]:0}
{BBInvPlanAktP2[0]:0}{tab}{&BBInvPlanAktP2[1]:0}
.EndIf

.If DataEntered(BBInvPlanAktNInv,1)
.Skip 1
{BBInvPlanAktNInv[0]:0}{tab}{tab}{BBInvPlanAktNInv[1]:0\Right}
{BBInvPlanAktN1[0]:0}{tab}{BBInvPlanAktN1[1]:0}
{BBInvPlanAktN2[0]:0}{tab}{&BBInvPlanAktN2[1]:0}
.EndIf

.If DataEntered(BBInvPlanAktMInv,1)
.Skip 1
{BBInvPlanAktMInv[0]:0}{tab}{tab}{BBInvPlanAktMInv[1]:0\Right}
{BBInvPlanAktM1[0]:0}{tab}{BBInvPlanAktM1[1]:0}
{BBInvPlanAktM2[0]:0}{tab}{&BBInvPlanAktM2[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt20Inv,1)
.Skip 1
{BBInvPlanAkt20Inv[0]:0}{tab}{tab}{BBInvPlanAkt20Inv[1]:0\Right}
{BBInvPlanAkt201[0]:0}{tab}{BBInvPlanAkt201[1]:0}
{BBInvPlanAkt202[0]:0}{tab}{&BBInvPlanAkt202[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt21Inv,1)
.Skip 1
{BBInvPlanAkt21Inv[0]:0}{tab}{tab}{BBInvPlanAkt21Inv[1]:0\Right}
{BBInvPlanAkt211[0]:0}{tab}{BBInvPlanAkt211[1]:0}
{BBInvPlanAkt212[0]:0}{tab}{&BBInvPlanAkt212[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt22Inv,1)
.Skip 1
{BBInvPlanAkt22Inv[0]:0}{tab}{tab}{BBInvPlanAkt22Inv[1]:0\Right}
{BBInvPlanAkt221[0]:0}{tab}{BBInvPlanAkt221[1]:0}
{BBInvPlanAkt222[0]:0}{tab}{&BBInvPlanAkt222[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt23Inv,1)
.Skip 1
{BBInvPlanAkt23Inv[0]:0}{tab}{tab}{BBInvPlanAkt23Inv[1]:0\Right}
{BBInvPlanAkt231[0]:0}{tab}{BBInvPlanAkt231[1]:0}
{BBInvPlanAkt232[0]:0}{tab}{&BBInvPlanAkt232[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt24Inv,1)
.Skip 1
{BBInvPlanAkt24Inv[0]:0}{tab}{tab}{BBInvPlanAkt24Inv[1]:0\Right}
{BBInvPlanAkt241[0]:0}{tab}{BBInvPlanAkt241[1]:0}
{BBInvPlanAkt242[0]:0}{tab}{&BBInvPlanAkt242[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt25Inv,1)
.Skip 1
{BBInvPlanAkt25Inv[0]:0}{tab}{tab}{BBInvPlanAkt25Inv[1]:0\Right}
{BBInvPlanAkt251[0]:0}{tab}{BBInvPlanAkt251[1]:0}
{BBInvPlanAkt252[0]:0}{tab}{&BBInvPlanAkt252[1]:0}
.EndIf

.If DataEntered(BBInvPlanAktQInv,1)
.Skip 1
{BBInvPlanAktQInv[0]:0}{tab}{tab}{BBInvPlanAktQInv[1]:0\Right}
{BBInvPlanAktQ1[0]:0}{tab}{BBInvPlanAktQ1[1]:0}
{BBInvPlanAktQ2[0]:0}{tab}{&BBInvPlanAktQ2[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt50Inv,1)
.Skip 1
{BBInvPlanAkt50Inv[0]:0}{tab}{tab}{BBInvPlanAkt50Inv[1]:0\Right}
{BBInvPlanAkt501[0]:0}{tab}{BBInvPlanAkt501[1]:0}
{BBInvPlanAkt502[0]:0}{tab}{&BBInvPlanAkt502[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt51Inv,1)
.Skip 1
{BBInvPlanAkt51Inv[0]:0}{tab}{tab}{BBInvPlanAkt51Inv[1]:0\Right}
{BBInvPlanAkt511[0]:0}{tab}{BBInvPlanAkt511[1]:0}
{BBInvPlanAkt512[0]:0}{tab}{&BBInvPlanAkt512[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt52Inv,1)
.Skip 1
{BBInvPlanAkt52Inv[0]:0}{tab}{tab}{BBInvPlanAkt52Inv[1]:0\Right}
{BBInvPlanAkt521[0]:0}{tab}{BBInvPlanAkt521[1]:0}
{BBInvPlanAkt522[0]:0}{tab}{&BBInvPlanAkt522[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt53Inv,1)
.Skip 1
{BBInvPlanAkt53Inv[0]:0}{tab}{tab}{BBInvPlanAkt53Inv[1]:0\Right}
{BBInvPlanAkt531[0]:0}{tab}{BBInvPlanAkt531[1]:0}
{BBInvPlanAkt532[0]:0}{tab}{&BBInvPlanAkt532[1]:0}
.EndIf

.If DataEntered(BBInvPlanAkt54Inv,1)
.Skip 1
{BBInvPlanAkt54Inv[0]:0}{tab}{tab}{BBInvPlanAkt54Inv[1]:0\Right}
{BBInvPlanAkt541[0]:0}{tab}{BBInvPlanAkt541[1]:0}
{BBInvPlanAkt542[0]:0}{tab}{&BBInvPlanAkt542[1]:0}
.EndIf

.SuppressLines Org

;.Stripe -
.FixTypeface EndSum
{B>}{BBInvPlan[0]:0}{tab}{tab}{BBInvPlan[1]:0\Right}{<B}
.FixTypeface Org
.Skip 2

  ;;.EndOfSubReport
  ;;;--------------------------------------------------------------------------------------------------
  ;;.SubReport              Name=FINANcieringen,Title="$>Financing<$"

{B>}$>Financing<$ (x #Currency# #Scale#,-){<B}
.Skip 1
;; Eigen vermogen
;{BBFin_EVStorting[Title]:0}{tab}{BBFin_EVStorting[1]::0}
{BBFin_EVStorting[0]:0}{tab}{tab}{BBFin_EVStorting[1]:0\Right}
.Skip 1
;; RC
;{BBFin_RC[Title]:0}{tab}{BBFin_RC[1]::0}
{BBFin_RC[0]:0}{tab}{tab}{BBFin_RC[1]:0\Right}
.Skip 1

;; Leningen
.If DataEntered(BBFin_Kred1HoofdSom,1)
.Skip 1
{BBFin_Kred1HoofdSom[0]:0}{tab}{tab}{BBFin_Kred1HoofdSom[1]:0\Right}
{BBFin_Kred1RentePercentage[0]:0}{tab}{&BBFin_Kred1RentePercentage[1]:0}
{BBFin_Kred1Looptijd[0]:0}{tab}{BBFin_Kred1Looptijd[1]:0}
.EndIf

.If DataEntered(BBFin_KredAHoofdSom,1)
.Skip 1
{BBFin_KredAHoofdSom[0]:0}{tab}{tab}{BBFin_KredAHoofdSom[1]:0\Right}
{BBFin_KredARentePercentage[0]:0}{tab}{&BBFin_KredARentePercentage[1]:0}
{BBFin_KredALooptijd[0]:0}{tab}{BBFin_KredALooptijd[1]:0}
.EndIf

.If DataEntered(BBFin_Kred2HoofdSom,1)
.Skip 1
{BBFin_Kred2HoofdSom[0]:0}{tab}{tab}{BBFin_Kred2HoofdSom[1]:0\Right}
{BBFin_Kred2RentePercentage[0]:0}{tab}{&BBFin_Kred2RentePercentage[1]:0}
{BBFin_Kred2Looptijd[0]:0}{tab}{BBFin_Kred2Looptijd[1]:0}
.EndIf

.If DataEntered(BBFin_KredFHoofdSom,1)
.Skip 1
{BBFin_KredFHoofdSom[0]:0}{tab}{tab}{BBFin_KredFHoofdSom[1]:0\Right}
{BBFin_KredFRentePercentage[0]:0}{tab}{&BBFin_KredFRentePercentage[1]:0}
{BBFin_KredFLooptijd[0]:0}{tab}{BBFin_KredFLooptijd[1]:0}
.EndIf

.If DataEntered(BBFin_Kred3HoofdSom,1)
.Skip 1
{BBFin_Kred3HoofdSom[0]:0}{tab}{tab}{BBFin_Kred3HoofdSom[1]:0\Right}
{BBFin_Kred3RentePercentage[0]:0}{tab}{&BBFin_Kred3RentePercentage[1]:0}
{BBFin_Kred3Looptijd[0]:0}{tab}{BBFin_Kred3Looptijd[1]:0}
.EndIf

.If DataEntered(BBFin_Kred4HoofdSom,1)
.Skip 1
{BBFin_Kred4HoofdSom[0]:0}{tab}{tab}{BBFin_Kred4HoofdSom[1]:0\Right}
{BBFin_Kred4RentePercentage[0]:0}{tab}{&BBFin_Kred4RentePercentage[1]:0}
{BBFin_Kred4Looptijd[0]:0}{tab}{BBFin_Kred4Looptijd[1]:0}
.EndIf

.If DataEntered(BBFin_Kred5HoofdSom,1)
.Skip 1
{BBFin_Kred5HoofdSom[0]:0}{tab}{tab}{BBFin_Kred5HoofdSom[1]:0\Right}
{BBFin_Kred5RentePercentage[0]:0}{tab}{&BBFin_Kred5RentePercentage[1]:0}
{BBFin_Kred5Looptijd[0]:0}{tab}{BBFin_Kred5Looptijd[1]:0}
.EndIf

.If DataEntered(BBFin_Kred6HoofdSom,1)
.Skip 1
{BBFin_Kred6HoofdSom[0]:0}{tab}{tab}{BBFin_Kred6HoofdSom[1]:0\Right}
{BBFin_Kred6RentePercentage[0]:0}{tab}{&BBFin_Kred6RentePercentage[1]:0}
{BBFin_Kred6Looptijd[0]:0}{tab}{BBFin_Kred6Looptijd[1]:0}
.EndIf

.If DataEntered(BBFin_Kred7HoofdSom,1)
.Skip 1
{BBFin_Kred7HoofdSom[0]:0}{tab}{tab}{BBFin_Kred7HoofdSom[1]:0\Right}
{BBFin_Kred7RentePercentage[0]:0}{tab}{&BBFin_Kred7RentePercentage[1]:0}
{BBFin_Kred7Looptijd[0]:0}{tab}{BBFin_Kred7Looptijd[1]:0}
.EndIf

.If DataEntered(BBFin_Kred8HoofdSom,1)
.Skip 1
{BBFin_Kred8HoofdSom[0]:0}{tab}{tab}{BBFin_Kred8HoofdSom[1]:0\Right}
{BBFin_Kred8RentePercentage[0]:0}{tab}{&BBFin_Kred8RentePercentage[1]:0}
{BBFin_Kred8Looptijd[0]:0}{tab}{BBFin_Kred8Looptijd[1]:0}
.EndIf

.If DataEntered(BBFin_KredHHoofdSom,1)
.Skip 1
{BBFin_KredHHoofdSom[0]:0}{tab}{tab}{BBFin_KredHHoofdSom[1]:0\Right}
{BBFin_KredHRentePercentage[0]:0}{tab}{&BBFin_KredHRentePercentage[1]:0}
{BBFin_KredHLooptijd[0]:0}{tab}{BBFin_KredHLooptijd[1]:0}
.EndIf

.If DataEntered(BBFin_Kred9HoofdSom,1)
.Skip 1
{BBFin_Kred9HoofdSom[0]:0}{tab}{tab}{BBFin_Kred9HoofdSom[1]:0\Right}
{BBFin_Kred9RentePercentage[0]:0}{tab}{&BBFin_Kred9RentePercentage[1]:0}
{BBFin_Kred9Looptijd[0]:0}{tab}{BBFin_Kred9Looptijd[1]:0}
.EndIf

.If DataEntered(BBFin_KredGHoofdSom,1)
.Skip 1
{BBFin_KredGHoofdSom[0]:0}{tab}{tab}{BBFin_KredGHoofdSom[1]:0\Right}
{BBFin_KredGRentePercentage[0]:0}{tab}{&BBFin_KredGRentePercentage[1]:0}
{BBFin_KredGLooptijd[0]:0}{tab}{BBFin_KredGLooptijd[1]:0}
.EndIf

;.Stripe -
.FixTypeface EndSum
{B>}{BBFinPlan[0]:0}{tab}{tab}{BBFinPlan[1]:0\Right}{<B}
.FixTypeface Org

.SuppressLines Org
.Range ORG

.NewPage
.EndOfSubReport
;--------------------------------------------------------------------------------------------------
.SubReport              Name=Zekerheden,Title="$>Collateral<$",GroupTitle="$>Credit request<$"

;; HEADER
;;
.Let BreedteTitle  = 26
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
{B>}$>Credit request<${<B}
.Range   [@]

.Picture                5,#PaginaBreedte#-22,"#$ModelFolder#\logo.bmp",0
.Tab                    #Tab1#,#Tab5#-6,#Tab6#
.Let DATUMTIJD = &DateStr(Now,1);&" "&SUBSTR(&DateStr(Now,15),11,6)
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf
{NaamBedr[0]:0}:{tab}{&NaamBedr:0}{tab}$>Amounts<$:{tab}#Currency# #Scale#
{PlaatsBedr[0]:0}:{tab}{&PlaatsBedr:0}{tab}$>Print date<$:{tab}#DatumTijd#
{Rechtsvorm[0]:0}:{tab}{&Rechtsvorm:0}
{SectorTitle[0]:0}:{tab}{&SectorTitle:0}
.If #destination#=6                                                            ;; indien RTF dan andere kortere lijn
  .Line #PaginaBreedte# - #BreedteTitle#
.Else
  .Line #PaginaBreedte#
.EndIf
.Tab                    #Tab3#-2,#Tab3#+33,#Tab3#+45
.Skip 1
.Range Org
;;
;; HEADER


.PercBase               None
{B>}$>Collateral<$ (x #Currency# #Scale#,-){<B}
.Skip 1
;.Picture                1,10,finan.bmp


.SuppressLines No
.Range [@]

.If BBDekkingPand1VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand1Soort[1]
{BBDekkingPand1[0]:0\Bold}
{BBDekkingPand1VVW[0]:0}{tab}{tab}{BBDekkingPand1VVW[1]:0\Right}
{BBDekkingPand1Soort[0]:0}{tab}{&BBDekkingPand1Soort[1]:0}
{BBDekkingPand1Kadaster[0]:0}{tab}{&BBDekkingPand1Kadaster[1]:0}
{BBDekkingPand1DatumTaxatie[0]:0}{tab}{&BBDekkingPand1DatumTaxatie[1]:0}
{BBDekkingPand1NaamTaxateur[0]:0}{tab}{&BBDekkingPand1NaamTaxateur[1]:0}
.EndIf

.If BBDekkingPand2VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand2Soort[1]
{BBDekkingPand2[0]:0\Bold}
{BBDekkingPand2VVW[0]:0}{tab}{tab}{BBDekkingPand2VVW[1]:0\Right}
{BBDekkingPand2Soort[0]:0}{Tab}{&BBDekkingPand2Soort[1]:0}
{BBDekkingPand2Kadaster[0]:0}{tab}{&BBDekkingPand2Kadaster[1]:0}
{BBDekkingPand2DatumTaxatie[0]:0}{tab}{&BBDekkingPand2DatumTaxatie[1]:0}
{BBDekkingPand2NaamTaxateur[0]:0}{tab}{&BBDekkingPand2NaamTaxateur[1]:0}
.EndIf

.If BBDekkingPand3VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand3Soort[1]
{BBDekkingPand3[0]:0\Bold}
{BBDekkingPand3VVW[0]:0}{tab}{tab}{BBDekkingPand3VVW[1]:0\Right}
{BBDekkingPand3Soort[0]:0}{Tab}{&BBDekkingPand3Soort[1]:0}
{BBDekkingPand3Kadaster[0]:0}{tab}{&BBDekkingPand3Kadaster[1]:0}
{BBDekkingPand3DatumTaxatie[0]:0}{tab}{&BBDekkingPand3DatumTaxatie[1]:0}
{BBDekkingPand3NaamTaxateur[0]:0}{tab}{&BBDekkingPand3NaamTaxateur[1]:0}
.EndIf

.If BBDekkingPand4VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand4Soort[1]
{BBDekkingPand4[0]:0\Bold}
{BBDekkingPand4VVW[0]:0}{tab}{tab}{BBDekkingPand4VVW[1]:0\Right}
{BBDekkingPand4Soort[0]:0}{Tab}{&BBDekkingPand4Soort[1]:0}
{BBDekkingPand4Kadaster[0]:0}{tab}{&BBDekkingPand4Kadaster[1]:0}
{BBDekkingPand4DatumTaxatie[0]:0}{tab}{&BBDekkingPand4DatumTaxatie[1]:0}
{BBDekkingPand4NaamTaxateur[0]:0}{tab}{&BBDekkingPand4NaamTaxateur[1]:0}
.EndIf

.If BBDekkingPand5VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand5Soort[1]
{BBDekkingPand5[0]:0\Bold}
{BBDekkingPand5VVW[0]:0}{tab}{tab}{BBDekkingPand5VVW[1]:0\Right}
{BBDekkingPand5Soort[0]:0}{Tab}{&BBDekkingPand5Soort[1]:0}
{BBDekkingPand5Kadaster[0]:0}{tab}{&BBDekkingPand5Kadaster[1]:0}
{BBDekkingPand5DatumTaxatie[0]:0}{tab}{&BBDekkingPand5DatumTaxatie[1]:0}
{BBDekkingPand5NaamTaxateur[0]:0}{tab}{&BBDekkingPand5NaamTaxateur[1]:0}
.EndIf

.If BBDekkingPand6VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand6Soort[1]
{BBDekkingPand6[0]:0\Bold}
{BBDekkingPand6VVW[0]:0}{tab}{tab}{BBDekkingPand6VVW[1]:0\Right}
{BBDekkingPand6Soort[0]:0}{Tab}{&BBDekkingPand6Soort[1]:0}
{BBDekkingPand6Kadaster[0]:0}{tab}{&BBDekkingPand6Kadaster[1]:0}
{BBDekkingPand6DatumTaxatie[0]:0}{tab}{&BBDekkingPand6DatumTaxatie[1]:0}
{BBDekkingPand6NaamTaxateur[0]:0}{tab}{&BBDekkingPand6NaamTaxateur[1]:0}
.EndIf

.If BBDekkingPand7VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand7Soort[1]
{BBDekkingPand7[0]:0\Bold}
{BBDekkingPand7VVW[0]:0}{tab}{tab}{BBDekkingPand7VVW[1]:0\Right}
{BBDekkingPand7Soort[0]:0}{Tab}{&BBDekkingPand7Soort[1]:0}
{BBDekkingPand7Kadaster[0]:0}{tab}{&BBDekkingPand7Kadaster[1]:0}
{BBDekkingPand7DatumTaxatie[0]:0}{tab}{&BBDekkingPand7DatumTaxatie[1]:0}
{BBDekkingPand7NaamTaxateur[0]:0}{tab}{&BBDekkingPand7NaamTaxateur[1]:0}
.EndIf

.If BBDekkingPand8VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand8Soort[1]
{BBDekkingPand8[0]:0\Bold}
{BBDekkingPand8VVW[0]:0}{tab}{tab}{BBDekkingPand8VVW[1]:0\Right}
{BBDekkingPand8Soort[0]:0}{Tab}{&BBDekkingPand8Soort[1]:0}
{BBDekkingPand8Kadaster[0]:0}{tab}{&BBDekkingPand8Kadaster[1]:0}
{BBDekkingPand8DatumTaxatie[0]:0}{tab}{&BBDekkingPand8DatumTaxatie[1]:0}
{BBDekkingPand8NaamTaxateur[0]:0}{tab}{&BBDekkingPand8NaamTaxateur[1]:0}
.EndIf

.If BBDekkingPand9VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand9Soort[1]
{BBDekkingPand9[0]:0\Bold}
{BBDekkingPand9VVW[0]:0}{tab}{tab}{BBDekkingPand9VVW[1]:0\Right}
{BBDekkingPand9Soort[0]:0}{Tab}{&BBDekkingPand9Soort[1]:0}
{BBDekkingPand9Kadaster[0]:0}{tab}{&BBDekkingPand9Kadaster[1]:0}
{BBDekkingPand9DatumTaxatie[0]:0}{tab}{&BBDekkingPand9DatumTaxatie[1]:0}
{BBDekkingPand9NaamTaxateur[0]:0}{tab}{&BBDekkingPand9NaamTaxateur[1]:0}
.EndIf

.If BBDekkingPand10VVW[1] <> NA
.Skip 1
;.Let DekSoort = &BBDekkingPand10Soort[1]
{BBDekkingPand10[0]:0\Bold}
{BBDekkingPand10VVW[0]:0}{tab}{tab}{BBDekkingPand10VVW[1]:0\Right}
{BBDekkingPand10Soort[0]:0}{Tab}{&BBDekkingPand10Soort[1]:0}
{BBDekkingPand10Kadaster[0]:0}{tab}{&BBDekkingPand10Kadaster[1]:0}
{BBDekkingPand10DatumTaxatie[0]:0}{tab}{&BBDekkingPand10DatumTaxatie[1]:0}
{BBDekkingPand10NaamTaxateur[0]:0}{tab}{&BBDekkingPand10NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig1VVW[1] <> NA
.Skip 1
{BBDekkingOverig1[0]:0\Bold}
{BBDekkingOverig1VVW[0]:0}{tab}{tab}{BBDekkingOverig1VVW[1]:0\Right}
{BBDekkingOverig1Soort[0]:0}{tab}{&BBDekkingOverig1Soort[1]:0}
{BBDekkingOverig1Kadaster[0]:0}{tab}{&BBDekkingOverig1Kadaster[1]:0}
{BBDekkingOverig1DatumTaxatie[0]:0}{tab}{&BBDekkingOverig1DatumTaxatie[1]:0}
{BBDekkingOverig1NaamTaxateur[0]:0}{tab}{&BBDekkingOverig1NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig2VVW[1] <> NA
.Skip 1
{BBDekkingOverig2[0]:0\Bold}
{BBDekkingOverig2VVW[0]:0}{tab}{tab}{BBDekkingOverig2VVW[1]:0\Right}
{BBDekkingOverig2Soort[0]:0}{tab}{&BBDekkingOverig2Soort[1]:0}
{BBDekkingOverig2Kadaster[0]:0}{tab}{&BBDekkingOverig2Kadaster[1]:0}
{BBDekkingOverig2DatumTaxatie[0]:0}{tab}{&BBDekkingOverig2DatumTaxatie[1]:0}
{BBDekkingOverig2NaamTaxateur[0]:0}{tab}{&BBDekkingOverig2NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig3VVW[1] <> NA
.Skip 1
{BBDekkingOverig3[0]:0\Bold}
{BBDekkingOverig3VVW[0]:0}{tab}{tab}{BBDekkingOverig3VVW[1]:0\Right}
{BBDekkingOverig3Soort[0]:0}{tab}{&BBDekkingOverig3Soort[1]:0}
{BBDekkingOverig3Kadaster[0]:0}{tab}{&BBDekkingOverig3Kadaster[1]:0}
{BBDekkingOverig3DatumTaxatie[0]:0}{tab}{&BBDekkingOverig3DatumTaxatie[1]:0}
{BBDekkingOverig3NaamTaxateur[0]:0}{tab}{&BBDekkingOverig3NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig4VVW[1] <> NA
.Skip 1
{BBDekkingOverig4[0]:0\Bold}
{BBDekkingOverig4VVW[0]:0}{tab}{tab}{BBDekkingOverig4VVW[1]:0\Right}
{BBDekkingOverig4Soort[0]:0}{tab}{&BBDekkingOverig4Soort[1]:0}
{BBDekkingOverig4Kadaster[0]:0}{tab}{&BBDekkingOverig4Kadaster[1]:0}
{BBDekkingOverig4DatumTaxatie[0]:0}{tab}{&BBDekkingOverig4DatumTaxatie[1]:0}
{BBDekkingOverig4NaamTaxateur[0]:0}{tab}{&BBDekkingOverig4NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig5VVW[1] <> NA
.Skip 1
{BBDekkingOverig5[0]:0\Bold}
{BBDekkingOverig5VVW[0]:0}{tab}{tab}{BBDekkingOverig5VVW[1]:0\Right}
{BBDekkingOverig5Soort[0]:0}{tab}{&BBDekkingOverig5Soort[1]:0}
{BBDekkingOverig5Kadaster[0]:0}{tab}{&BBDekkingOverig5Kadaster[1]:0}
{BBDekkingOverig5DatumTaxatie[0]:0}{tab}{&BBDekkingOverig5DatumTaxatie[1]:0}
{BBDekkingOverig5NaamTaxateur[0]:0}{tab}{&BBDekkingOverig5NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig6VVW[1] <> NA
.Skip 1
{BBDekkingOverig6[0]:0\Bold}
{BBDekkingOverig6VVW[0]:0}{tab}{tab}{BBDekkingOverig6VVW[1]:0\Right}
{BBDekkingOverig6Soort[0]:0}{tab}{&BBDekkingOverig6Soort[1]:0}
{BBDekkingOverig6Kadaster[0]:0}{tab}{&BBDekkingOverig6Kadaster[1]:0}
{BBDekkingOverig6DatumTaxatie[0]:0}{tab}{&BBDekkingOverig6DatumTaxatie[1]:0}
{BBDekkingOverig6NaamTaxateur[0]:0}{tab}{&BBDekkingOverig6NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig7VVW[1] <> NA
.Skip 1
{BBDekkingOverig7[0]:0\Bold}
{BBDekkingOverig7VVW[0]:0}{tab}{tab}{BBDekkingOverig7VVW[1]:0\Right}
{BBDekkingOverig7Soort[0]:0}{tab}{&BBDekkingOverig7Soort[1]:0}
{BBDekkingOverig7Kadaster[0]:0}{tab}{&BBDekkingOverig7Kadaster[1]:0}
{BBDekkingOverig7DatumTaxatie[0]:0}{tab}{&BBDekkingOverig7DatumTaxatie[1]:0}
{BBDekkingOverig7NaamTaxateur[0]:0}{tab}{&BBDekkingOverig7NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig8VVW[1] <> NA
.Skip 1
{BBDekkingOverig8[0]:0\Bold}
{BBDekkingOverig8VVW[0]:0}{tab}{tab}{BBDekkingOverig8VVW[1]:0\Right}
{BBDekkingOverig8Soort[0]:0}{tab}{&BBDekkingOverig8Soort[1]:0}
{BBDekkingOverig8Kadaster[0]:0}{tab}{&BBDekkingOverig8Kadaster[1]:0}
{BBDekkingOverig8DatumTaxatie[0]:0}{tab}{&BBDekkingOverig8DatumTaxatie[1]:0}
{BBDekkingOverig8NaamTaxateur[0]:0}{tab}{&BBDekkingOverig8NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig9VVW[1] <> NA
.Skip 1
{BBDekkingOverig9[0]:0\Bold}
{BBDekkingOverig9VVW[0]:0}{tab}{tab}{BBDekkingOverig9VVW[1]:0\Right}
{BBDekkingOverig9Soort[0]:0}{tab}{&BBDekkingOverig9Soort[1]:0}
{BBDekkingOverig9Kadaster[0]:0}{tab}{&BBDekkingOverig9Kadaster[1]:0}
{BBDekkingOverig9DatumTaxatie[0]:0}{tab}{&BBDekkingOverig9DatumTaxatie[1]:0}
{BBDekkingOverig9NaamTaxateur[0]:0}{tab}{&BBDekkingOverig9NaamTaxateur[1]:0}
.EndIf

.If BBDekkingOverig10VVW[1] <> NA
.Skip 1
{BBDekkingOverig10[0]:0\Bold}
{BBDekkingOverig10VVW[0]:0}{tab}{tab}{BBDekkingOverig10VVW[1]:0\Right}
{BBDekkingOverig10Soort[0]:0}{tab}{&BBDekkingOverig10Soort[1]:0}
{BBDekkingOverig10Kadaster[0]:0}{tab}{&BBDekkingOverig10Kadaster[1]:0}
{BBDekkingOverig10DatumTaxatie[0]:0}{tab}{&BBDekkingOverig10DatumTaxatie[1]:0}
{BBDekkingOverig10NaamTaxateur[0]:0}{tab}{&BBDekkingOverig10NaamTaxateur[1]:0}
.EndIf

.Skip 2
;.Stripe -
{BBDekking[0]:0\bold}{tab}{tab}{BBDekking[1]:0\Bold\Right}

.If DataEntered(BBDekkingToelichting,1)
  .Skip 1
{&BBDekkingToelichting[0]:0\Bold}
  .Skip 1
  .Memo BBDekkingToelichting
.EndIf

.SuppressLines Org
.Range ORG

.NewPage
.EndOfSubReport


;--------------------------------------------------------------------------------------------------
; Algemene gegevens
;
.SubReport              Name=GeneralInformation,Title="$>General information<$",GroupTitle="$>Attachments<$"
.PercBase               None
.PageTitle              "$>General information<$#$SubTitle#","$>Continuation of contact data<$#$SubTitle#"
;.Picture                1,10,finan.bmp

.CountData1             LineCount=NAWBedr                                          ; NAWBedr
.If                     #LineCount#>0
.Skip                   1
{M>}{NAWBedr[Title]:0}{<M}
.Data1                  NAWBedr
.EndIf

.CountData1             LineCount=SpecBedr                                         ; SpecBedr
.If                     #LineCount#>0
.Skip                   1
.NeedData1              SpecBedr
{M>}{SpecBedr[Title]:0}{<M}
.Data1                  SpecBedr
.Data1                  SectorTitle
.EndIf

.CountData1             LineCount=NAWDir                                           ; NAWDir
.If                     #LineCount#>0
.Skip                   1
.NeedData1              NAWDir
{M>}{NAWDir[Title]:0}{<M}
.Data1                  NAWDir
.EndIf

.CountData1             LineCount=NAWDir2                                          ; NAWDir2
.If                     #LineCount#>0
.Skip                   1
.NeedData1              NAWDir2
{M>}{NAWDir2[Title]:0}{<M}
.Data1                  NAWDir2
.EndIf

.CountData1             LineCount=NAWDir3                                          ; NAWDir3
.If                     #LineCount#>0
.Skip                   1
.NeedData1              NAWDir3
{M>}{NAWDir3[Title]:0}{<M}
.Data1                  NAWDir3
.EndIf

.CountData1             LineCount=NAWDir4                                          ; NAWDir4
.If                     #LineCount#>0
.Skip                   1
.NeedData1              NAWDir4
{M>}{NAWDir4[Title]:0}{<M}
.Data1                  NAWDir4
.EndIf

.CountData1             LineCount=NAWDir5                                          ; NAWDir5
.If                     #LineCount#>0
.Skip                   1
.NeedData1              NAWDir5
{M>}{NAWDir5[Title]:0}{<M}
.Data1                  NAWDir5
.EndIf

.CountData1             LineCount=NAWDir6                                          ; NAWDir6
.If                     #LineCount#>0
.Skip                   1
.NeedData1              NAWDir6
{M>}{NAWDir6[Title]:0}{<M}
.Data1                  NAWDir6
.EndIf

{&&if INSTALLCODE=8}                                                           ;; Banking model
  ;;
{&&Else}
.CountData1             LineCount=NAWBank                                          ; NAWBank
.If                     #LineCount#>0
.Skip                   1
.NeedData1              NAWBank
{M>}{NAWBank[Title]:0}{<M}
.Data1                  NAWBank
.EndIf
{&&endif}

.CountData1             LineCount=NAWAcc                                           ; NAWAcc
.If                     #LineCount#>0
.Skip                   1
.NeedData1              NAWAcc
{M>}{NAWAcc[Title]:0}{<M}
.Data1                  NAWAcc
.EndIf

.SubRange               DakOpv                                                     ; DakOpv
.CountData1             L=DakOpv
.If                     #L#>0
.Skip                   1
.If                     #L#+4>#FreeLines#
.NewPage
.EndIf
.ColumnTitles
{M>}{DakOpv[Title]:0}{<M}
.Data1                  DakOpv
.Stripe                 Í
.Skip                   1
.EndIf
.SubRange               Org

.SubRange               TotKracht                                                  ; TotKracht
.CountData1             L2=TotKracht
.If                     #L2#>0
.Skip                   1
.If                     #L2#<=0
.If                     #L2#+4>#FreeLines#
.NewPage
.EndIf
.ColumnTitles
.Else
.NeedData1              TotKracht
.EndIf
.ColumnTitles
{M>}{TotKracht[Title]:0}{<M}
.Data1                  TotKracht
.Stripe                 Í
.EndIf
.SubRange               Org

.CountData1             LineCount=SpecAgrBedr                                      ; Agrarisch
.If                     #LineCount#>0
.If                     #LineCount#+4>#FreeLines#
.NewPage
.ColumnTitles
.EndIf
.Skip                   1
.NeedData1              SpecAgrBedr
{M>}{SpecAgrBedr[Title]:0}{<M}
.Data1                  SpecAgrBedr
.EndIf

.NewPage
.EndOfSubReport

;--------------------------------------------------------------------------------------------------
; Balans uitgebreid

.SubReport              Name=BalanceSheetExtensiveForm,Title="$>Balance sheet: extensive form<$",GroupTitle="$>Attachments<$"
.PercBase               BalAkt
.CountData1             LineCount=Balans
.If                     #LineCount#>0
.SubRange               BalAkt
.PageTitle              "$>Balance sheet: extensive form<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of specification<$ $>Balance sheet: extensive form<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles           NoCum

{M>}$>Balance sheet: assets<${<M}
.Data2                  Balans                                                     ; Activa
.Stripe                 =
.Skip                   1
.NeedData2              Balans EigenVerm
{M>}$>Balanced sheet: liabilities<${<M}
.Data2                  Balans EigenVerm Voorz                                     ; Passiva
.AutoStripe             Off
.EndSums                Off
.Data2                  LangVV
.AutoStripe             Org
.EndSums                Org
.Data2                  Balans KortVV VermBehoefte
.Stripe                 -
.FixTypeface            EndSum
.Data0                  BalPas
.FixTypeface            Off
.Stripe                 =

.NewPage
.Else
.If                     #SubReport#
.Message                "$>Balance sheet not available for the specified columns!<$"
.EndIf
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport




;--------------------------------------------------------------------------------------------------
; Resultatenrekening gedetailleerd standaard
;
.SubReport              Name=ProfitAndLossAccountExtensiveFormDefault,Title="$>Profit and loss-account: extensive form<$ ($>Default<$)",GroupTitle="$>Attachments<$"
.PercBase               NettoOmzet
.SubRange               ResRek
.CountData1             LineCount=ResRek NettoOmzet
.If                     #LineCount#>0
.PageTitle              "$>Profit and loss account extensive<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of profit and loss-account extensive<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.Data2                  ResRek NettoOmzet ProdVrdMut
.Skip                   1
.Factor                 -1
.AutoStripe             Off
.Data2                  InkW InkoopGroep1 HandInkW
.Data1                  InkW MatVerbr InkW
.Stripe                 -
.Skip                   1
.Factor                 1
.TextTypeface           Bold
.CalcTypeface           Bold
.Data0                  BrutoWinst
.Skip                   1
.CalcTypeface           Org
.TextTypeface           Org
.Data0                  OvBedrOpbr
.Factor                 -1
.EndSums                Off
.AutoStripe             Off
.Data2                  BedrK
.Data2                  AktAfs
.Factor                 1                                       ; EJS 24-5-2011
.EndSums                Org
.AutoStripe             Org
.Stripe                 -
.Data2                  ResRek BedrRes ResAandDerden
.Stripe                 -
.TextTypeface           Bold
.CalcTypeface           Bold
.Data0                  ResNaBel
.CalcTypeface           Org
.TextTypeface           Org
.Stripe                 =
.Skip                   1

;
.SubRange               ResRek MutCalc
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
  .AskOk                  PrintVermAansl_1="$>Profit and loss-account: extensive form<$ ($>Default<$) $>including<$ $>Net worth reconciliation<$?",#PrintVermAansl_1#
.EndIf
;
.If #PrintVermAansl_1# = 1
.NeedData1              VermAansl
$>Net worth reconciliation<$
.Data1                  VermAansl
.Stripe                 =
.EndIf
.SubRange               ResRek
.NewPage
.Else
.Message                "$>Profit and loss-account not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport


;--------------------------------------------------------------------------------------------------
; Vermogensaansluiting
.SubReport              Name=NetWorthReconciliation,Title="$>Net worth reconciliation<$",GroupTitle="$>Attachments<$"
.SubRange               MutEigenVerm MutCalc
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
.PageTitle              "$>Net worth reconciliation<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of net worth reconciliation<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.Data1                  VermAansl
.Stripe                 =
.Skip                   1
.NewPage
.Else
.Message                "$>Net worth reconciliation not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport

;--------------------------------------------------------------------------------------------------
; kengetallen
.SubReport              Name=Ratios,Title="$>Ratios<$",GroupTitle="$>Attachments<$"
.PercBase               NONE
.ShowMutCols            No
.SetNA                  Blank
.PageTitle              "$>Ratios<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of ratios<$#$SubTitle#"
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
  .If                  ((DataEntered(CorrOnLTDebt)=0)and(DataEntered(CorrOnSTDebtInterest)=0))
    .If                  DataEntered(CorrOnEBITA)=0
      .If                  DataEntered(CorrOnEBITDA)=0
      .Else                                                 ;ebitda is gecorrigeerd
      * $>Manual correction of<$ {DebtToEbitDA[title]}
      .EndIf
    .Else
      .If                  DataEntered(CorrOnEBITDA)=0      ;ebita is gecorrigeerd
      * $>Manual correction of<$ {DebtToEbitA[title]}
      .Else                                                 ;ebita en ebitda zijn gecorrigeerd
      * $>Manual correction of<$ $>EBIT ratios<$
      .EndIf
    .EndIf
  .Else                                                     ;leningen zijn gecorrigeerd, dus beide ratios gecorrigeerd
      * $>Manual correction of<$ $>EBIT ratios<$
  .EndIf
.EndIf


.CountData1             LineCount=AktivRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              AktivRatios
{M>}{AktivRatios[Title]:0}{<M}
  .If AktivRatiosReport=1                                           ;hz: schakelaar, termijnkengetallen in weken of dagen
.Data1              AktivRatios
  .Else
    .Data1              AktivRatios GroeiNettoOmzet GemBalVrd
    .Data1              AktivRatios VrdTermijnDays
  .EndIf
.EndIf

.CountData1             LineCount=GroeiOmzetGroepen
.If                     #LineCount#>0
.Skip                   1
.NeedData1              GroeiOmzetGroepen
{M>}{GroeiOmzetGroepen[Title]:0}{<M}
.Data1                  GroeiOmzetGroepen
.EndIf
.CountData1             LineCount=RtblRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              RtblRatios
{M>}{RtblRatios[Title]:0}{<M}
.Data1                  RtblRatios
.EndIf
.CountData1             LineCount=BrutoMarge
.If                     #LineCount#>0
.Skip                   1
.NeedData1              BrutoMarge
{M>}{BrutoMarge[Title]:0}{<M}
.Data1                  BrutoMarge
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
;
.CountData1             LineCount=UserRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              UserRatios
{M>}{UserRatios[Title]:0}{<M}
.Data1                  UserRatios
.EndIf
;
.SetNA                  Org
.ShowMutCols            Yes
.SubRange               None
.NewPage
.EndOfSubReport

;--------------------------------------------------------------------------------------------------
; Specificatie privè-opnamen/stortingen
;
;
.SubReport          Name=SpecificationPrivateDrawingsDeposits,Title="$>Specification private drawings/deposits<$",GroupTitle="$>Attachments<$"
.Let                Done=0
.CountData1         LineCount=UitWinst
.If                 #LineCount#>0
.SubRange           None
.PageTitle          "$>Private drawings<$ (x #CurrencySymbol# #Scale#,-)#$SubTitle#","$>Continuation private drawings$< #$SubTitle#"
.ColumnTitles
; Privé opnamen firmant 1
;
.CountData1         LineCount=Prive1Opn
.If                 #LineCount#>0
.Skip               1
.NeedData1          Prive1Opn
{M>}{Prive1Opn[Title]}{<M}
.Data1              Prive1Opn
.Stripe             =
.Let                Done=1
.EndIf
; Privé opnamen firmant 2
;
.CountData1         LineCount=Prive2Opn
.If                 #LineCount#>0
.Skip               1
.NeedData1          Prive2Opn
{M>}{Prive2Opn[Title]}{<M}
.Data1              Prive2Opn
.Stripe             =
.Let                Done=1
.EndIf
; Privé opnamen firmant 3
;
.CountData1         LineCount=Prive3Opn
.If                 #LineCount#>0
.Skip               1
.NeedData1          Prive3Opn
{M>}{Prive3Opn[Title]}{<M}
.Data1              Prive3Opn
.Stripe             =
.Let                Done=1
.EndIf
; Privé opnamen firmant 4
;
.CountData1         LineCount=Prive4Opn
.If                 #LineCount#>0
.Skip               1
.NeedData1          Prive4Opn
{M>}{Prive4Opn[Title]}{<M}
.Data1              Prive4Opn
.Stripe             =
.Let                Done=1
.EndIf
; Privé opnamen firmant 5
;
.CountData1         LineCount=Prive5Opn
.If                 #LineCount#>0
.Skip               1
.NeedData1          Prive5Opn
{M>}{Prive5Opn[Title]}{<M}
.Data1              Prive5Opn
.Stripe             =
.Let                Done=1
.EndIf

; Afsluiting privé opnamen
;
.Else
.If                 #SubReport#
.Message            "$>Private drawings not available in the specified columns<$!"
.EndIf
.PercBase           None
.SubRange           None
.Endif

; Stortingen
;
.CountData1         L=Storting
.PercBase           Storting
.If                 #L#>0
.SubRange           None
.If                 #L#+5>#FreeLines#
.NewPage
.Else
.Skip               3
.EndIf
.PageTitle          "$>Private deposits<$ (x #CurrencySymbol# #Scale#,-)#$SubTitle#"
.ColumnTitles
.Skip               1
.Data1              Storting
.Stripe             =
.Let                Done=1
.PercBase           None
.SubRange           None
.Endif
;-------------------------------------------------------------------------
; Afsluiting
;
.If                 #Done#
.NewPage
.EndIf
.EndOfSubReport

;--------------------------------------------------------------------------------------------------
; Privè-vermogen
;
.SubReport          Name=PrivateCapital,Title="$>Private capital<$",GroupTitle="$>Attachments<$"
.PercBase           PriveVerm
.CountData1         LineCount=PriveVerm
.If                 #LineCount#>0
.SubRange           None
.PageTitle          "$>Specification private capital of entrepreneur<$ (x #CurrencySymbol# #Scale#,-)#$SubTitle#","$>Continuation specification private capital<$#$SubTitle#"
.ColumnTitles       NoCum

; ondernemer 1
;
.CountData1         L1=Prive1Verm
.If                 #L1#>0
.Skip               1
.NeedData2          Prive1Verm
{M>}{Prive1Verm[Title]:0}{<M}
.CountData2         L2=Prive1Verm
.If                 #L2#>#L1#
.Data2              Prive1Verm
.Else
.Data1              Prive1Verm
.EndIf
.Stripe             =
.EndIf
; ondernemer 2
;
.CountData1         L1=Prive2Verm
.If                 #L1#>0
.Skip               1
.NeedData2          Prive2Verm
{M>}{Prive2Verm[Title]:0}{<M}
.CountData2         L2=Prive2Verm
.If                 #L2#>#L1#
.Data2              Prive2Verm
.Else
.Data1              Prive2Verm
.EndIf
.Stripe             =
.EndIf
;-------------------------------------------------------------------------
; ondernemer 3
;
.CountData1         L1=Prive3Verm
.If                 #L1#>0
.Skip               1
.NeedData2          Prive3Verm
{M>}{Prive3Verm[Title]:0}{<M}
.CountData2         L2=Prive3Verm
.If                 #L2#>#L1#
.Data2              Prive3Verm
.Else
.Data1              Prive3Verm
.EndIf
.Stripe             =
.EndIf

;-------------------------------------------------------------------------
; ondernemer 4
;
.CountData1         L1=Prive4Verm
.If                 #L1#>0
.Skip               1
.NeedData2          Prive4Verm
{M>}{Prive4Verm[Title]:0}{<M}
.CountData2         L2=Prive4Verm
.If                 #L2#>#L1#
.Data2              Prive4Verm
.Else
.Data1              Prive4Verm
.EndIf
.Stripe             =
.EndIf
;-------------------------------------------------------------------------
; ondernemer 5
;
.CountData1         L1=Prive5Verm
.If                 #L1#>0
.Skip               1
.NeedData2          Prive5Verm
{M>}{Prive5Verm[Title]:0}{<M}
.CountData2         L2=Prive5Verm
.If                 #L2#>#L1#
.Data2              Prive5Verm
.Else
.Data1              Prive5Verm
.EndIf
.Stripe             =
.EndIf
;-------------------------------------------------------------------------
; recapitulatie
;
.CountData1         L=PriveVerm
.If                 #L#>1
.Skip               1
.NeedData1          PriveVerm
{M>}Recapitulatie priv‚ vermogen{<M}
.Data1              PriveVerm
.Stripe             =
.EndIf
;-------------------------------------------------------------------------
; Afsluiting
;
.NewPage
.Else
.If                 #SubReport#
.Message            "$>Specification private capital of entrepreneur not available in the specified columns<$!"
.EndIf
.Endif
.PercBase           None
.SubRange           None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Kengetallen met beknopte toelichting

.SubReport              Name=RatiosBriefOverviewWithExplanation,Title="$>Ratios<$ ($>brief overview with explanation<$)",GroupTitle="$>Attachments<$"
.PercBase               None
.SubRange               None
.SetNA                  Blank

; -------------------
; Indien de uitvoer CSV is dan alle regels laten zien, dit ivm het feit dat CSV uitvoer vaak in EXCEL wordt gebruikt om te koppelen.
; en een vaste layout is dan wenselijk
.If #Destination# = 4
  .SuppressLines No
.Else
  .SuppressLines          NA
.EndIf
; -------------------
.PageTitle              "$>Important ratios with brief explanation<$#$SubTitle#","$>Continuation of ratios<$#$SubTitle#"
$>Important ratios are:<$
.ColumnTitles
;-------------------------------------------------------------------------
; Rijtje kengetallen (daarna pas toelichting ivm gunstige paginaindeling)
;
.Skip                   1
.Data0                  CurrentRatio
.Data0                  WerkKap
.Data0                  SolvBAL
  .If AktivRatiosReport=1                                           ;hz: schakelaar, termijnkengetallen in weken of dagen
.Data0                  OndWerkTermijn
.Data0                  DebTermijn
.Data0                  HandCredTermijn
  .Else
.Data0                  OndWerkTermijnDays
.Data0                  DebTermijnDays
.Data0                  HandCredTermijnDays
  .EndIf
.Data0                  BrutoMarge
.Data0                  RtblEigenVerm
.Data0                  BrutoWperKracht
.IfAll                  (OndWerk=NA) and (MatVrd=NA) and (ProdVrd=NA) and (MatVerbr=NA)
; het is een handelsonderneming (in ELKE kolom van de range zijn deze variabelen NA)
.Else
; het is een produktieonderneming
.Data0                  Arbeidsquote
.EndIf
.Skip                   1
.CountData1             LineCount=CurrentRatio
.If                     #LineCount#>0
.Skip                   1
$>The $_{U>}{CurrentRatio[Title]:0}{<U}_$ is a measure of liquidity.<$ $>With an increase in this ratio, the firm is better able to fulfill her short term obligations.<$
.EndIf
.CountData1             LineCount=WerkKap
.If                     #LineCount#>0
.Skip                   1
$>The $_{U>}{WerkKap[Title]:0}{<U}_$ is a measure of liquidity.<$ $>An increase in this ratio signals an improvement in liquidity.<$
.EndIf
.CountData1             LineCount=SolvBal
.If                     #LineCount#>0
.Skip                   1
$>The ratio $_{U>}{SolvBal[Title]:0}{<U}_$ expresses the proportion of shareholders' equity on total assets.<$ $>An increase signals an improved ability to meet long term obligations.<$
.EndIf
.If AktivRatiosReport=1                                           ;hz: schakelaar, termijnkengetallen in weken of dagen
.CountData1             LineCount=OndWerkTermijn
  .If                     #LineCount#>0
.Skip                   1
$>$_{U>}{OndWerkTermijn[Title]:0}{<U}_$ is an activity ratio<$. $>An increase in this ratio, signals an increased need for funds. An explanation for this may be that operational activities have intensified.<$
  .EndIf
.CountData1             LineCount=DebTermijn
  .If                     #LineCount#>0
.Skip                   1
$>The $_{U>}{DebTermijn[Title]:0}{<U}_$ measures the length of the period that receivables are standing out.<$ $>The ratio typifies collection policy. A shortening of the length of the period should improve financial slack.<$
  .EndIf
.CountData1             LineCount=HandCredTermijn
  .If                     #LineCount#>0
.Skip                   1
$>The $_{U>}{HandCredTermijn[Title]:0}{<U}_$ measures payment policy of the firm.<$ $>This ratio measures the length of the period that payments are due<$. $>A lengthening of the term offers more financial room.<$
  .EndIf
.Else
.CountData1             LineCount=OndWerkTermijnDays
  .If                     #LineCount#>0
.Skip                   1
$>$_{U>}{OndWerkTermijnDays[Title]:0}{<U}_$ is an activity ratio<$. $>An increase in this ratio, signals an increased need for funds. An explanation for this may be that operational activities have intensified.<$
  .EndIf
.CountData1             LineCount=DebTermijnDays
  .If                     #LineCount#>0
.Skip                   1
$>The $_{U>}{DebTermijnDays[Title]:0}{<U}_$ measures the length of the period that receivables are standing out.<$ $>The ratio typifies collection policy. A shortening of the length of the period should improve financial slack.<$
  .EndIf
.CountData1             LineCount=HandCredTermijnDays
  .If                     #LineCount#>0
.Skip                   1
$>The $_{U>}{HandCredTermijnDays[Title]:0}{<U}_$ measures payment policy of the firm.<$ $>This ratio measures the length of the period that payments are due<$. $>A lengthening of the term offers more financial room.<$
  .EndIf
.EndIf
.CountData1             LineCount=Brutomarge
.If                     #LineCount#>0
.Skip                   1
$>The ratio $_{U>}{BrutoWinst[Title]:0}{<U}_$ is that proportion of sales that remains after the deduction of the cost of goods sold.<$ $>This ratio can be taken as a measure for the rate of return.<$ $>The higher this ratio, the better costs can be covered.<$
.EndIf
.CountData1             LineCount=RtblEigenVerm
.If                     #LineCount#>0
.Skip                   1
$>The $_{U>}{RtblEigenVerm[Title]:0}{<U}_$ measures the rate of return on shareholders' equity.<$ $>If this ratio increases, then productivity of equity rises.<$
.EndIf
.CountData1             LineCount=BrutoWperKracht
.If                     #LineCount#>0
.Skip                   1
$>The $_{U>}{BrutoWperKracht[Title]:0}{<U}_$ measures the labor productivity in the firm.<$ $>An increase signals an increase in labor productivity.<$
.EndIf
.IfAll                  (OndWerk=NA) and (MatVrd=NA) and (ProdVrd=NA) and (MatVerbr=NA)  ; het is een handelsonderneming (in ELKE kolom van de range zijn deze variabelen NA)
.Else                                                                                    ; het is een produktieonderneming
.Skip                   1
$>The $_{U>}{Arbeidsquote[Title]:0}{<U}_$ measures productivity.<$ $>A decrease in this ratio signals an increase in labor productivity.<$
.EndIf
;-------------------------------------------------------------------------
; Afsluiting
;
.NewPage
.SetNA                  Org
.SuppressLines          Org
.SubRange               None
.EndOfSubReport


;--------------------------------------------------------------------------------------------------
; Investerings- en financieringsplan

.SubReport              Name=InvestmentsAndFinancingPlan,Title="$>Investments and financing-plan<$",GroupTitle="$>Attachments<$"
.If ((#FirstTsY#>TsY(#FirstColumn#)) or (#LastTsY#>TsY(#LastColumn#))) And (#MaandbasisInstellen#=NA)
  .ScriptMode CancelMode=Off
    .AskOk MaandbasisInstellen="Om overzichten op maandbasis te rapporteren dient u eerst de prognose op maandbasis in te stellen.|Wilt u het document op maandbasis instellen?||(aanpassen via icoon -Verander tijdbasis- of via het menu Bestand-Eigenschappen-tabblad Jaren)",No
    .If #MaandbasisInstellen#=1
;      .If PeriodInSheet=MainPeriod
;        .Period PeriodInSheet,TsY2=12
;      .Else
;        .Period PeriodInSheet,TsY=12
;      .EndIf
;      .ZoomToDetail [FirstTinFormulaSet(Trend,PeriodInSheet)..LastTinFormulaSet(Trend,PeriodInSheet)] 12
;      .Application ReDraw
      .Cancel
    .EndIf
    .ScriptMode CancelMode=On
.EndIf
.PercBase               None
.SubRange               MutCalc
.CountData1             LineCount=Cashflows
.If                     #LineCount#>0
  .PageTitle              "$>Investments and financing-plan<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Investment and financingplan<$#$SubTitle#"
  ;.Picture                1,10,finan.bmp
  .ColumnTitles
  .Skip                   1
  .Data1                  OperAktCF
  .Data2                  CashFlows OperAktCF$1
  .factor -1
  .Data0                  MutVermOverschot
  .Data0                  MutSomOvLiqMid
  .factor 1
  .Data0                  MutRCBank
  .Stripe                 -
{B>}{VermBehoefte1[Title]}{MutVermbehoefte*-1\bold}{<B}
  .Stripe                 =
  .NewPage
.Else
  .Message                "$>Investments and financingsplan not|available in the columns asked for!<$"
.EndIf
.SubRange               None
.EndOfSubReport

;--------------------------------------------------------------------------------------------------
; Liquiditeitsoverzicht

.SubReport              Name=StatementOfLiquidity,Title="$>Statement of liquidity<$",GroupTitle="$>Attachments<$"
.If ((#FirstTsY#>TsY(#FirstColumn#)) or (#LastTsY#>TsY(#LastColumn#))) And (#MaandbasisInstellen#=NA)
  .ScriptMode CancelMode=Off
    .AskOk MaandbasisInstellen="Om overzichten op maandbasis te rapporteren dient u eerst de prognose op maandbasis in te stellen.|Wilt u het document op maandbasis instellen?||(aanpassen via icoon -Verander tijdbasis- of via het menu Bestand-Eigenschappen-tabblad Jaren)",No
    .If #MaandbasisInstellen#=1
;      .If PeriodInSheet=MainPeriod
;        .Period PeriodInSheet,TsY2=12
;      .Else
;        .Period PeriodInSheet,TsY=12
;      .EndIf
;      .ZoomToDetail [FirstTinFormulaSet(Trend,PeriodInSheet)..LastTinFormulaSet(Trend,PeriodInSheet)] 12
;      .Application ReDraw
      .Cancel
    .EndIf
    .ScriptMode CancelMode=On
.EndIf
.PercBase               NONE
.SubRange               MutCalc
.CountData1             LineCount=LiqOverzicht
.If                     #LineCount#>0
  .PageTitle              "$>Statement of liquidity<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of liquidity statement<$#$SubTitle#"
  ;.Picture                1,10,finan.bmp
  .ColumnTitles
  .Skip                   1
  .Data2                  LiqOverzicht
  .Stripe                 =
  .CountData1             LineCount=WerkKap
  .If                     #LineCount#>0
    .Skip                   2
    .NeedLines              14
    {M>}$>Working capital<${<M}
    .Data1                  LiqOverzicht LiqLiqMid
    .Data0                  LiqEffecten
    .Data0                  Vrd
    .Data0                  Vord
    {KortVV[Title]}{-(KortVV-RCBank)}
    .Stripe                 -
    {WerkKap[Title]\bold}{WerkKap\bold}
    .Stripe                 =
  .EndIf
  .NewPage
.Else
  .Message                "$>Liquidity statement not available in the columns asked for!<$"
.EndIf
.SubRange               None
.If PeriodInSheet=MainPeriod
  .Period PeriodInSheet,TsY2=#TsYorg#
   .CalculateT
.Else
  .Period PeriodInSheet,TsY=#TsYorg#
  .CalculateT
.EndIf
.EndOfSubReport



;--------------------------------------------------------------------------------------------------
; Aansprakelijk vermogen

.SubReport              Name=LiableCapital,Title="$>Liable capital<$",GroupTitle="$>Attachments<$"
.Let                    SubReport_AV=1
.PercBase               NONE
.SubRange               MutCalc
.CountData1             LineCount=AV
.If                     #LineCount#>0
.PageTitle              "$>Liable capital<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of liable capital<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.Data2                  AV
.skip                   2
.Data1                  HerwBalAkt
.Stripe                 =
.NewPage
.Else
.Message                "$>Liable capital not|available in the columns asked for!<$"
.EndIf
.SubRange               None
.EndOfSubReport
;--------------------------------------------------------------------------------------------------

.Let MaandbasisInstellen=NA
.Quit
