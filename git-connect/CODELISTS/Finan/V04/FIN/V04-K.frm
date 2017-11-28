{&&Language=English}$>Choice of report-from<$
.MenuHelp      $>Report-model with choice of columns and subreport<$
.FINANversion  2.0
;
;
.If "#$ReportDialogRange#"=""
.Range                  [Max(1,GetT(LastTinFormulaSet(1,1),-1))..LastTinFormulaSet(1,1)\TsY=1|FirstTinFormulaSet(Trend,PeriodInSheet)|GetT(FirstTinFormulaSet(Trend,PeriodInSheet),1)\TsY=1|GetT(FirstTinFormulaSet(Trend,PeriodInSheet),2)\TsY=1]
.EndIf
.LineSpacing            1.1                 ;regelafstand
.TM                     2                   ;bovenmarge
.LM                     7                   ;linkermarge                                  ;;Rva 2001-04-17 was 10
.RM                     5                   ;rechtermarge
.SubIndent              1                   ;inspringen van onderlingende niveau's
.FontName               Arial               ;Lettertype
.FontSize               10                  ;Grootte
.SubHeader              Yes                 ;Bij .Data2 tussenkopje
;
; instellen paginakop:
.If Pwarning[1]=1
  .Let Warning = "($>no audit check available<$)"
.Else
; .Let warning = "(#UserFirm#)"        ; ejs 09-09-2008: "adviesorganisatie" eruit, en die hier in de header (tenzij "no audit check..", anders wel erg weinig ruimte....)
  .Let warning = ""                    ; ejs 11-09-2008: bij nader inzien dit ook maar niet, dus header hierbij weer in oude staat hersteld.
.EndIf
.Let Bedrijfsnaam = &NaamBedr[1]
.If "#$Bedrijfsnaam#"=""
  .Let Bedrijfsnaam = "#DocumentCode#"
.EndIf

.Header #$Bedrijfsnaam#, #$DayMonthYear# #$Warning#

; einde instellen paginakop
;
.PageNumber             1
.DestFileSpec           Keuzerapport-#DocumentCode#
.ReportDialog

; -------------------
; Indien de uitvoer CSV is dan alle regels laten zien, dit ivm het feit dat CSV uitvoer vaak in EXCEL wordt gebruikt om te koppelen.
; en een vaste layout is dan wenselijk
.If #Destination# = 4
  .SuppressLines No
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
.Calc                   1                   ; ivm achtergrondrekenen deze opdracht pas na de vragen

;.Let                    SubReport_AV=0
;.Let                    SubReport_TBCAP=0
;.Let                    SubReport_LiqOverz=0
;.Let                    SubReport_InvPlan=0
;.Let                    SubReport_FinAfl=0
;.Let                    SubReport_InvAfschr=0
;.Let                    SubReport_InvAfschr=0
;.Let                    SubReport_Toel=0
;.Let                    SubReport_AFw=0
;.Let                    SubReport_ratio2=0
;.Let                    SubReport_ratio=0
;.Let                    SubReport_Kasstroom=0
;.Let                    SubReport_VermAansl=0
;.Let                    SubReport_ResRek6=0
;.Let                    SubReport_ResRek5=0
;.Let                    SubReport_ResRek4=0
;.Let                    SubReport_ResRek3=0
;.Let                    SubReport_ResRek2=0
;.Let                    SubReport_ResRek1=0
;.Let                    SubReport_ResRek1-Toel=0
;.Let                    SubReport_ResRek2-Toel=0
;.Let                    SubReport_ResRek3-Toel=0
;.Let                    SubReport_Balans3=0
;.Let                    SubReport_Balans2=0
;.Let                    SubReport_Balans1=0
;.Let                    SubReport_Samenvatting=0
;.Let                    SubReport_Relatie=0
;.Let                    SUBREPORT_POPN=0
;.Let                    SUBREPORT_PVERM=0

;—————————————————————————————————————————————————————————————————————————————
;.If                 #Destination# > 1                      ; ejs 9-9-2008: adviesorganisatie eruit, leidt altijd tot lege pagina bij printen, bij .SubReport volgt namelijk een nieuwe pagina, nu in header opgenomen!
;$>Advice company<$:{Tab}{M>}#$UserFirm#{<M}
;.Skip               1
;.EndIf
;—————————————————————————————————————————————————————————————————————————————
; Algemene gegevens
;
.SubReport              Name=GeneralInformation,Title="$>General information<$"
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
.Stripe                 =
.EndIf
.SubRange               Org

.SubRange               TotKracht                                                  ; TotKracht
.CountData1             L2=TotKracht
.If                     #L2#>0
.Skip                   1
.If                     #L2#+4>#FreeLines#
.NewPage
.EndIf
.ColumnTitles
{M>}{TotKracht[Title]:0}{<M}
.Data1                  TotKracht
.Stripe                 =
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

;—————————————————————————————————————————————————————————————————————————————
; Samenvating balans en exploitatie

.SubReport              Name=SummaryOfBalanceSheetAndIncomeStatement,Title="$>Summary of balance sheet and income statement<$"
.PercBase               BalAkt
.SubRange               BalAkt                                                     ; ivm ColumnTitles
.PageTitle              "$>Summary of balance sheet and income statement<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of summary<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles

.CountData1             LineCount=Balans                                           ; balans
.If                     #LineCount#>0

.SubRange               BalAkt
{M>}$>Balance sheet: assets<${<M}
.Data1                  Balans
.Stripe                 =
.Skip                   1
{M>}$>Balanced sheet: liabilities<${<M}
.Data1                  Balans EigenVerm
.Stripe                 =
.Skip                   2
.PercBase               None
.SubRange               None
.EndIf

.CountData1             LineCount=ResRek NettoOmzet                                ; Resultatenrekening
.If                     #LineCount#>0
;.PercBase               NettoOmzet
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase
.SubRange               ResRek
.NeedData1              ResRek
{M>}$>Profit and loss-account<${<M}
.Data1                  ResRek NettoOmzet
.IfAll                  ResNaBel=InWinst                                           ;in alle kolommen gelijk!
.Else
.Data1                  VermAansl @VermAansl$1 InWinst
.EndIf
.Stripe                 =
.PercBase               None
.SubRange               None
.EndIf

.SubRange               None
.NewPage
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Balans beknopt

.SubReport              Name=BalanceSheet,Title="$>Balance sheet<$",GroupTitle="$>Balance sheet<$"
.PercBase               BalAkt
.CountData1             LineCount=Balans
.If                     #LineCount#>0
.SubRange               BalAkt
.PageTitle              "$>Balance sheet<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of balance sheet<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles           NoCum

{M>}$>Balance sheet: assets<${<M}
.Data1                  Balans                                                     ; Activa
.Stripe                 =

.Skip                   1
.NeedData1              Balans EigenVerm
{M>}$>Balanced sheet: liabilities<${<M}
.Data1                  Balans EigenVerm                                           ; Passiva
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

;—————————————————————————————————————————————————————————————————————————————
; Balans uitgebreid

.SubReport              Name=BalanceSheetExtensiveForm,Title="$>Balance sheet: extensive form<$",GroupTitle="$>Balance sheet<$"
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



;—————————————————————————————————————————————————————————————————————————————
; Balans gespecificeerd
;
;
.SubReport              Name=SpecificationBalanceSheet,Title="$>Specification<$ $>balance sheet<$",GroupTitle="$>Balance sheet<$"
.PercBase               BalAkt
.CountData1             LineCount=Balans
.If                     #LineCount#>0
.SubRange               BalAkt
.PageTitle              "$>Balance sheet<$ $>specification<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of specification<$ $>balance sheet<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles           NoCum


.CountData1             LineCount=ImMatAkt                        ;ImMatAkt
.If                     #LineCount#>0
.NeedData1              ImMatAkt
.Skip                   1
.Data1                  ImMatAkt
.EndIf

.CountData1             LineCount=OnrGoed                         ;OnrGoed
.If                     #LineCount#>0
.NeedData1              OnrGoed
.Skip                   1
.Data1                  OnrGoed
.EndIf

.CountData1             LineCount=BedrUitr                        ;BedrUitr
.If                     #LineCount#>0
.NeedData1              BedrUitr
.Skip                   1
.Data1                  BedrUitr
.EndIf

.CountData1             LineCount=FinVastAkt                      ;FinVastAkt
.If                     #LineCount#>0
.NeedData1              FinVastAkt
.Skip                   1
.Data1                  FinVastAkt
.EndIf

.CountData2             LineCount=Vrd                             ;Vrd
.If                     #LineCount#>0
.NeedData2              Vrd
.Skip                   1
.InterSums              Yes
.Data2                  Vrd
.InterSums              Org
.EndIf

.CountData1             LineCount=Vord                            ;Vord
.If                     #LineCount#>0
.NeedData1              Vord
.Skip                   1
.Data1                  Vord
.EndIf

.CountData1             LineCount=LiqMid                          ;LiqMid
.If                     #LineCount#>0
.NeedData1              LiqMid
.Skip                   1
.Data1                  LiqMid
.EndIf

.Skip                   1
.Stripe                 -
.FixTypeface            EndSum
.Data0                  BalAkt
.FixTypeface            Off
.Stripe                 =


;-------------------------------------------------------------------------
; Begin passiva zijde balans
;
.If                     #FreeLines#<10
  .NeedLines              10
.Else
.Skip                   1
.EndIf

.CountData1             LineCount=EigenVerm                      ;EigenVerm
.If                     #LineCount#>0
.NeedData1              EigenVerm
.Skip                   1
  .If RapporteerAlsRechtspersoon[1] = 1
.Data1                  EigenVerm
  .Else
.Data2                  EigenVerm
.EndIf

.CountData1             LineCount=Voorz                          ;Voorz
.If                     #LineCount#>0
.NeedData1              Voorz
.Skip                   1
.SubSums                None
.Data1                  Voorz
.SubSums                Org
.EndIf

.CountData1             LineCount=AchterKred                     ;AchterKred
.If                     #LineCount#>0
.NeedData1              AchterKred
.Skip                   1
.Data1                  AchterKred
.EndIf

.CountData1             LineCount=LangKredHyp                    ;LangKredHyp
.If                     #LineCount#>0
.NeedData1              LangKredHyp
.Skip                   1
.Data1                  LangKredHyp
.EndIf

.CountData1             LineCount=LangKredLen                    ;LangKredLen
.If                     #LineCount#>0
.NeedData1              LangKredLen
.Skip                   1
.Data1                  LangKredLen
.EndIf

.CountData1             LineCount=LangKredLes                    ;LangKredLes
.If                     #LineCount#>0
.NeedData1              LangKredLes
.Skip                   1
.Data1                  LangKredLes
.EndIf

.CountData1             LineCount=LangKredOv                     ;LangKredOv
.If                     #LineCount#>0
.NeedData1              LangKredOv
.Skip                   1
.Data1                  LangKredOv
.EndIf

.CountData2             LineCount=KortVV                             ;KortVV
.If                     #LineCount#>0
.NeedData2              KortVV
.skip                   1
.InterSums              Yes
.Data2                  KortVV
.Intersums              Org
.EndIf

.CountData1             LineCount=VermBehoefte                   ;VermBehoefte
.If                     #LineCount#>0
.NeedLines              2
.Skip                   1
.Data0                  VermBehoefte
.EndIf
;-------------------------------------------------------------------------
; Totaal passiva
;
.NeedLines          2
.Skip               1
.Stripe             -
.FixTypeFace        EndSum
.Data0              BalPas
.FixTypeFace        Off
.Stripe             =
;-------------------------------------------------------------------------
; Afsluiting
;
.NewPage
.Else
.If                 #SubReport#
.Message            "Balans niet beschikbaar in de gevraagde kolommen!"
.EndIf
.EndIf
.SubRange           None
.PercBase           None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Resultatenrekening beknopt (STANDAARD)

.SubReport              Name=ProfitAndLossAccounDefault,Title="$>Profit and loss account<$ ($>Default<$)",GroupTitle="$>Profit and loss account<$"
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase

.CountData1             LineCount=ResRek
.If                     #LineCount#>0
.SubRange               ResRek
.PageTitle              "$>Profit and loss account<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of profit and loss-account<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
{M>}$>Profit and loss account<${<M}
.Data1                  ResRek NettoOmzet
.Stripe                 =
;
.SubRange               ResRek
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
  .AskOk                  PrintVermAansl_1="$>Profit and loss account<$ ($>Default<$) $>including<$ $>Net worth reconciliation<$?",#PrintVermAansl_1#
.EndIf
;
.If #PrintVermAansl_1# = 1
.Skip    1
{M>}$>Net worth reconciliation<${<M}
.Data1                  VermAansl @VermAansl InWinst
.SubRange               MutCalc
.Data1                  VermAansl BookValueEquitySold
.Stripe                 =
.Skip 1
.Data0                  EigenVerm
.EndIf
.NewPage
.Else
.Message                "$>Profit and loss-account not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Resultatenrekening beknopt (STANDAARD bedrijfskosten uitgebreid)

.SubReport              Name=ProfitAndLossAccounDefaultBedr,Title="$>Profit and loss account<$ ($>Default<$) ($>operating costs extensive<$)",GroupTitle="$>Profit and loss account<$"
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase

.CountData1             LineCount=ResRek
.If                     #LineCount#>0
.SubRange               ResRek
.PageTitle              "$>Profit and loss account<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of profit and loss-account<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
{M>}$>Profit and loss account<${<M}
;.Data1                  ResRek NettoOmzet
.Data1                  ResRek NettoOmzet OvBedrOpbr
{BedrK[Title]:0}:
.EndSumTypeface         None
.Factor                 -1                                      ; EJS 24-5-2011
.Data1                  BedrK
.Factor                 1                                       ; EJS 24-5-2011
.EndSumTypeface         Org
.Data1                  ResRek AktAfs

.Stripe                 =
;
.SubRange               ResRek
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
  .AskOk                  PrintVermAansl_1="$>Profit and loss account<$ ($>Default<$) $>including<$ $>Net worth reconciliation<$?",#PrintVermAansl_1#
.EndIf
;
.If #PrintVermAansl_1# = 1
.Skip    1
{M>}$>Net worth reconciliation<${<M}
.Data1                  VermAansl @VermAansl InWinst
.SubRange               MutCalc
.Data1                  VermAansl BookValueEquitySold
.Stripe                 =
.Skip 1
.Data0                  EigenVerm
.EndIf
.NewPage
.Else
.Message                "$>Profit and loss-account not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Resultatenrekening gedetailleerd standaard
;
.SubReport              Name=ProfitAndLossAccountExtensiveFormDefault,Title="$>Profit and loss-account: extensive form<$ ($>Default<$)",GroupTitle="$>Profit and loss account<$"
;.PercBase               NettoOmzet
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase

.SubRange               ResRek
.CountData1             LineCount=ResRek NettoOmzet
.If                     #LineCount#>0
.PageTitle              "$>Profit and loss account extensive<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of profit and loss-account extensive<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.Data2                  ResRek NettoOmzet ProdVrdMut
.Factor                 -1
.AutoStripe             Off
.Data2                  InkW InkoopGroep1 HandInkW
.Data1                  InkW MatVerbr InkW
.Stripe                 -
.Factor                 1
.TextTypeface           Bold
.CalcTypeface           Bold
.Data0                  BrutoWinst
.CalcTypeface           Org
.TextTypeface           Org
.Data0                  OvBedrOpbr
.Factor                 -1
.EndSums                Off
.Data2                  BedrK
.Data2                  AktAfs
.Factor                 1                         ; EJS 24-5-2011
.EndSums                Org
.AutoStripe             Org
.Stripe                 -
.Data2                  ResRek BedrRes
.Stripe                 =
.Skip                   1

;
.SubRange               ResRek
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
  .AskOk                  PrintVermAansl_1="$>Profit and loss-account: extensive form<$ ($>Default<$) $>including<$ $>Net worth reconciliation<$?",#PrintVermAansl_1#
.EndIf
;
.If #PrintVermAansl_1# = 1
.NeedData1              VermAansl
$>Net worth reconciliation<$
.Data1                  VermAansl @VermAansl InWinst
.SubRange               MutCalc
.Data1                  VermAansl BookValueEquitySold
.Stripe                 =
.Skip 1
.Data0                  EigenVerm
.EndIf
.SubRange               ResRek
.NewPage
.Else
.Message                "$>Profit and loss-account not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Toelichting op resultatenrekening standaard
;
.SubReport              Name=SpecificationProfitAndLossAccountDefault,Title="$>Specification<$ $>profit and loss account<$ ($>Default<$)",GroupTitle="$>Profit and loss account<$"
;.PercBase               NettoOmzet
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase
.CountData1             LineCount=ResRek
.If                     #LineCount#>0
.PageTitle              "$>Specification<$ $>profit and loss-account<$ (x #CurrencySymbol# #Scale#,-)#$SubTitle#","$>Continuation of specification<$ $>profit and loss-account<$#$SubTitle#"
.SubRange               ResRek
.ColumnTitles
;-------------------------------------------------------------------------
; omzet
;
.CountData1         LineCount=NettoOmzet
.If                 #LineCount#>0
.Skip               1
.NeedData1          NettoOmzet
{M>}{NettoOmzet[Title]:0}{<M}
.Data1              NettoOmzet
.EndIf
;-------------------------------------------------------------------------
; mutatie voorraden
;
.CountData1         LineCount=ProdVrdMut
.If                 #LineCount#>0
.Skip               1
.NeedData1          ProdVrdMut
{M>}{ProdVrdMut[Title]:0}{<M}
.Data1              ProdVrdMut
.EndIf
;-------------------------------------------------------------------------
; Inkoopwaarde
;
.CountData1         LineCount=InkW
.If                 #LineCount#>0
.Skip               1
.NeedData2          InkW
{M>}{InkW[Title]:0}{<M}
.EndSums            No
.CountData1         L=@InkW
.IfAll              #L#>1
.Data1              @InkW
.Stripe             -
.EndIf
.EndSums            Org
.Data1              InkW
.EndIf

.Skip    1
.FixTypeFace   EndSum
.Data0         BrutoWinst
.skip    1
.Data0         OvBedrOpbr
.FixTypeFace   Org
.skip    1

;-------------------------------------------------------------------------
; Personeelskosten
;
.CountData1         L1=PersK
.IfAll              #L1#>0
.Skip               1
.NeedData2          PersK
{M>}{BedrK[Title]:0}: {PersK[Title]:0}{<M}
.CountData2         L2=PersK
.IfAll              #L2#>#L1#
.Data2              PersK
.Else
.Data1              PersK
.EndIf
.EndIf
;-------------------------------------------------------------------------
; Produktiekosten
;
.CountData1         LineCount=ProdK
.If                 #LineCount#>0
.Skip               1
.NeedData1          ProdK
{M>}{BedrK[Title]:0}: {ProdK[Title]:0}{<M}
.Data1              ProdK
.EndIf
;-------------------------------------------------------------------------
; Inventariskosten
;
.CountData1         LineCount=InventK
.If                 #LineCount#>0
.Skip               1
.NeedData1          InventK
{M>}{BedrK[Title]:0}: {InventK[Title]:0}{<M}
.Data1              InventK
.EndIf
;-------------------------------------------------------------------------
; Kosten gebouwen
;
.CountData1         LineCount=GebK
.If                 #LineCount#>0
.Skip               1
.NeedData1          GebK
{M>}{BedrK[Title]:0}: {GebK[Title]:0}{<M}
.Data1              GebK
.EndIf
;-------------------------------------------------------------------------
; Kosten transport
;
.CountData1         LineCount=TranspK
.If                 #LineCount#>0
.Skip               1
.NeedData1          TranspK
{M>}{BedrK[Title]:0}: {TranspK[Title]:0}{<M}
.Data1              TranspK
.EndIf
;-------------------------------------------------------------------------
; Verkoopkosten
;
.CountData1         LineCount=VerkoopK
.If                 #LineCount#>0
.Skip               1
.NeedData1          VerkoopK
{M>}{BedrK[Title]:0}: {VerkoopK[Title]:0}{<M}
.Data1              VerkoopK
.EndIf
;-------------------------------------------------------------------------
; Algemene beheerskosten
;
.CountData1         LineCount=AlgK
.If                 #LineCount#>0
.Skip               1
.NeedData1          AlgK
{M>}{BedrK[Title]:0}: {AlgK[Title]:0}{<M}
.Data1              AlgK
.EndIf
;-------------------------------------------------------------------------
; Overige kosten
;
.CountData1         LineCount=OvK
.If                 #LineCount#>0
.Skip               1
.NeedData1          OvK
{M>}{BedrK[Title]:0}: {OvK[Title]:0}{<M}
.Data1              OvK
.EndIf
;-------------------------------------------------------------------------
; Afschrijvingen
;
.CountData1         L1=AktAfs
.IfAll              #L1#>0
.Skip               1
.NeedData2          AktAfs
{M>}{AktAfs[Title]:0}{<M}
.CountData2         L2=AktAfs
.IfAll              #L2#>#L1#
.Data2              AktAfs
.Else
.Data1              AktAfs
.EndIf
.EndIf

.Skip    1
.FixTypeFace   EndSum
.Data0         BedrRes
.FixTypeFace   Org
.skip    1

;-------------------------------------------------------------------------
; Financiele Baten
.CountData1         LineCount=FinBaten
.If                 #LineCount#>0
.Skip               1
.NeedData1          FinBaten
{M>}{FinBaten[Title]:0}{<M}
.Data1              FinBaten
.EndIf

;-------------------------------------------------------------------------
; Financiele Lasten
.CountData1         LineCount=FinLasten
.If                 #LineCount#>0
.Skip               1
.NeedData1          FinLasten
{M>}{FinLasten[Title]:0}{<M}
.Data1              FinLasten
.EndIf

.Skip    1
.FixTypeFace   EndSum
.Data0         FinRes
.FixTypeFace   Org
.skip    1

.FixTypeFace   EndSum
.Data0         GewResVoorBel
.FixTypeFace   Org
.skip    1

;-------------------------------------------------------------------------
; Buiten Baten
.CountData1         LineCount=BuitBaten
.If                 #LineCount#>0
.Skip               1
.NeedData1          BuitBaten
{M>}{BuitBaten[Title]:0}{<M}
.Data1              BuitBaten
.EndIf

;-------------------------------------------------------------------------
; Buiten Lasten
.CountData1         LineCount=BuitLasten
.If                 #LineCount#>0
.Skip               1
.NeedData1          BuitLasten
{M>}{BuitLasten[Title]:0}{<M}
.Data1              BuitLasten
.EndIf

.Skip    1
.FixTypeFace   EndSum
.Data0         BuitREs
.FixTypeFace   Org
.skip    1
.Data0         WinstBEl
.skip    1
.Data0         AandeelResDeeln
.Skip    1
.Data0         ResAandDerden
.Skip    1

.FixTypeFace   EndSum
.SuppressLines No
.Data0         ResNaBel
.SuppressLines Org
.FixTypeFace   Org
.Stripe        =
;-------------------------------------------------------------------------
.Skip 1
.EndIf
.SubRange               None
.NewPage
.PercBase               None
.EndOfSubReport




;—————————————————————————————————————————————————————————————————————————————
; Resultatenrekening beknopt (CATEGORIAAL)

.SubReport              Name=ProfitAndLossAccountCategorial,Title="$>Profit and loss account<$ ($>Categorial<$)",GroupTitle="$>Profit and loss account<$",Enabled=Licensed("A")
;.PercBase               NettoOmzet
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase
.CountData1             LineCount=CatResRek
.If                     #LineCount#>0
.SubRange               CatResRek
.PageTitle              "$>Profit and loss account<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of profit and loss-account<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
{M>}$>Profit and loss account<${<M}
.Data1                  CatResRek NettoOmzet
.Stripe                 =

;
.SubRange               CatResRek
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
  .AskOk                  PrintVermAansl_1="$>Profit and loss account<$ ($>Categorial<$) $>including<$ $>Net worth reconciliation<$?",#PrintVermAansl_1#
.EndIf
.If #PrintVermAansl_1# = 1

.Skip    1
{M>}$>Net worth reconciliation<${<M}
.Data1                  VermAansl @VermAansl InWinst
.SubRange               MutCalc
.Data1                  VermAansl BookValueEquitySold
.Stripe                 =
.Skip 1
.Data0                  EigenVerm
.EndIf
.NewPage
.Else
.Message                "$>Profit and loss-account not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Resultatenrekening gedetailleerd categoriaal

.SubReport              Name=ProfitAndLossAccountExtensiveFormCategorial,Title="$>Profit and loss-account: extensive form<$ ($>Categorial<$)",GroupTitle="$>Profit and loss account<$",Enabled=Licensed("A")
;.PercBase               NettoOmzet
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase
.SubRange               CatResRek
.CountData1             LineCount=CatResRek NettoOmzet
.If                     #LineCount#>0
.PageTitle              "$>Profit and loss-account: extensive form<$ ($>Categorial<$) (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of profit and loss-account: extensive form<$ ($>Categorial<$)#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.Data2                  CatResRek NettoOmzet SomBedrOpbr
.AutoStripe             Off
.EndSums                Off
.Factor                 -1                            ; EJS 24-5-2011
.Data2                  CatKosten
.Factor                 1                             ; EJS 24-5-2011
.EndSums                Org
.AutoStripe             Org
.Stripe                 -
.Data2                  ResRek BedrRes
.Stripe                 =
.Skip                   1

.SubRange               CatResRek
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
  .AskOk                  PrintVermAansl_1="$>Profit and loss-account: extensive form<$ ($>Categorial<$) $>including<$ $>Net worth reconciliation<$?",#PrintVermAansl_1#
.EndIf
;
.If #PrintVermAansl_1# = 1
.Skip    1
{M>}$>Net worth reconciliation<${<M}
.Data1                  VermAansl @VermAansl InWinst
.SubRange               MutCalc
.Data1                  VermAansl BookValueEquitySold
.Stripe                 =
.Skip 1
.Data0                  EigenVerm
.EndIf
.SubRange               CatResRek
.NewPage
.Else
.Message                "$>Profit and loss-account not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Toelichting op resultatenrekening categoriaal
;
.SubReport              Name=SpecificationProfitAndLossAccountCategorial,Title="$>Specification<$ $>profit and loss account<$ ($>Categorial<$)",GroupTitle="$>Profit and loss account<$",Enabled=Licensed("A")
;.PercBase               NettoOmzet
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase
.CountData1             LineCount=CatResRek
.If                     #LineCount#>0
.PageTitle              "$>Specification<$ $>profit and loss-account<$ (x #CurrencySymbol# #Scale#,-)#$SubTitle#","$>Continuation of specification<$ $>profit and loss-account<$#$SubTitle#"
.SubRange               CatResRek
.ColumnTitles
;-------------------------------------------------------------------------
; omzet
;
.CountData1         LineCount=NettoOmzet
.If                 #LineCount#>0
.Skip               1
.NeedData1          NettoOmzet
{M>}{NettoOmzet[Title]:0}{<M}
.Data1              NettoOmzet
.EndIf
;-------------------------------------------------------------------------
; mutatie voorraden
;
.CountData1         LineCount=ProdVrdMut
.If                 #LineCount#>0
.Skip               1
.NeedData1          ProdVrdMut
{M>}{ProdVrdMut[Title]:0}{<M}
.Data1              ProdVrdMut
.EndIf

.Skip    1
.Data0         OvBedrOpbr
.skip    1
.FixTypeFace   EndSum
.Data0         SomBedrOpbr
.FixTypeFace   Org

;-------------------------------------------------------------------------
; Inkoopwaarde
;
.CountData1         LineCount=HandInkW
.If                 #LineCount#>0
.Skip               1
.NeedData1          HandInkW
{M>}{CatKosten[Title]:0}: {HandInkW[Title]:0}{<M}
.Data1              HandInkW
.EndIf
;-------------------------------------------------------------------------
; Grondstoffen
;
.CountData1         LineCount=Grondstoffen
.If                 #LineCount#>0
.Skip               1
.NeedData1          Grondstoffen
{M>}{CatKosten[Title]:0}: {Grondstoffen[Title]:0}{<M}
.Data1              Grondstoffen
.EndIf
;-------------------------------------------------------------------------
; Kosten uitbesteed werk

.CountData1         LineCount=WerkDerden
.If                 #LineCount#>0
.Skip               1
.NeedData1          WerkDerden
.Data1              WerkDerden
.EndIf

;-------------------------------------------------------------------------
; Personeelskosten
;
.CountData1         L1=PersK
.IfAll              #L1#>0
.Skip               1
.NeedData2          PersK
{M>}{CatKosten[Title]:0}: {PersK[Title]:0}{<M}
.CountData2         L2=PersK
.IfAll              #L2#>#L1#
.Data2              PersK
.Else
.Data1              PersK
.EndIf
.EndIf
;.CountData1         L1=TotKracht
;.IfAll              #L1#>0
;.Skip               1
;.NeedData2          TotKracht
;{M>}{TotKracht[Title]:0}{<M}
;.CountData2         L2=TotKracht
;.IfAll              #L2#>#L1#
;.Data2              TotKracht
;.Else
;.Data1              TotKracht
;.EndIf
;.EndIf
;-------------------------------------------------------------------------
; Afschrijvingen
;
.CountData1         L1=AktAfs
.IfAll              #L1#>0
.Skip               1
.NeedData2          AktAfs
{M>}{CatKosten[Title]:0}: {AktAfs[Title]:0}{<M}
.CountData2         L2=AktAfs
.IfAll              #L2#>#L1#
.Data2              AktAfs
.Else
.Data1              AktAfs
.EndIf
.EndIf
;-------------------------------------------------------------------------
; Overige kosten
;
.CountData1         L1=CatOvk
.IfAll              #L1#>0
.Skip               1
.NeedData2          CatOvk
{M>}{CatKosten[Title]:0}: {CatOvk[Title]:0}{<M}
.CountData2         L2=CatOvk
.IfAll              #L2#>#L1#
.Data2              CatOvk
.Else
.Data1              CatOvk
.EndIf
.EndIf
;-------------------------------------------------------------------------

.Skip    1
.FixTypeFace   EndSum
.Data0         BedrRes
.FixTypeFace   Org
.skip    1

;-------------------------------------------------------------------------
; Financiele Baten
.CountData1         LineCount=FinBaten
.If                 #LineCount#>0
.Skip               1
.NeedData1          FinBaten
{M>}{FinBaten[Title]:0}{<M}
.Data1              FinBaten
.EndIf

;-------------------------------------------------------------------------
; Financiele Lasten
.CountData1         LineCount=FinLasten
.If                 #LineCount#>0
.Skip               1
.NeedData1          FinLasten
{M>}{FinLasten[Title]:0}{<M}
.Data1              FinLasten
.EndIf

.Skip    1
.FixTypeFace   EndSum
.Data0         FinRes
.FixTypeFace   Org
.skip    1

.FixTypeFace   EndSum
.Data0         GewResVoorBel
.FixTypeFace   Org
.skip    1

;-------------------------------------------------------------------------
; Buiten Baten
.CountData1         LineCount=BuitBaten
.If                 #LineCount#>0
.Skip               1
.NeedData1          BuitBaten
{M>}{BuitBaten[Title]:0}{<M}
.Data1              BuitBaten
.EndIf

;-------------------------------------------------------------------------
; Buiten Lasten
.CountData1         LineCount=BuitLasten
.If                 #LineCount#>0
.Skip               1
.NeedData1          BuitLasten
{M>}{BuitLasten[Title]:0}{<M}
.Data1              BuitLasten
.EndIf

.Skip    1
.FixTypeFace   EndSum
.Data0         BuitREs
.FixTypeFace   Org
.skip    1
.Data0         WinstBEl
.skip    1
.Data0         AandeelResDeeln
.Skip    1
.Data0         ResAandDerden
.Skip    1

.FixTypeFace   EndSum
.SuppressLines No
.Data0         ResNaBel
.SuppressLines Org
.FixTypeFace   Org
.Stripe        =
.Skip    1

.EndIf
.SubRange               None
.NewPage
.PercBase               None
.EndOfSubReport


;—————————————————————————————————————————————————————————————————————————————
; Resultatenrekening beknopt (FUNCTIONEEL)

.SubReport              Name=ProfitAndLossAccountFunctional,Title="$>Profit and loss account<$ ($>Functional<$)",GroupTitle="$>Profit and loss account<$",Enabled=Licensed("A")
;.PercBase               NettoOmzet
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase
.CountData1             LineCount=FuncResRek
.If                     #LineCount#>0
.SubRange               FuncResRek
.PageTitle              "$>Profit and loss account<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of profit and loss-account<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
{M>}$>Profit and loss account<${<M}
.Data1                  FuncResRek NettoOmzet
.Stripe                 =
;
.SubRange               FuncResRek
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
  .AskOk                  PrintVermAansl_1="$>Profit and loss account<$ ($>Functional<$) $>including<$ $>Net worth reconciliation<$?",#PrintVermAansl_1#
.EndIf
;
.If #PrintVermAansl_1# = 1
.Skip    1
{M>}$>Net worth reconciliation<${<M}
.Data1                  VermAansl @VermAansl InWinst
.SubRange               MutCalc
.Data1                  VermAansl BookValueEquitySold
.Stripe                 =
.Skip 1
.Data0                  EigenVerm
.EndIf
.NewPage
.Else
.Message                "$>Profit and loss-account not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Resultatenrekening gedetailleerd functioneel

.SubReport              Name=ProfitAndLossAccountExtensiveFormFunctional,Title="$>Profit and loss-account: extensive form<$ ($>Functional<$)",GroupTitle="$>Profit and loss account<$",Enabled=Licensed("A")
;.PercBase               NettoOmzet
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase
.SubRange               FuncResRek
.CountData1             LineCount=funcResRek NettoOmzet
.If                     #LineCount#>0
.PageTitle              "$>Profit and loss-account: extensive form<$ ($>Functional<$)(x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of profit and loss-account extensive<$ ($>Functional<$)#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.Data2                  FuncResRek NettoOmzet
.Stripe                 =
.Skip                   1
;
.SubRange               FuncResRek
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
  .AskOk                  PrintVermAansl_1="$>Profit and loss-account: extensive form<$ ($>Functional<$) $>including<$ $>Net worth reconciliation<$?",#PrintVermAansl_1#
.EndIf
;
.If #PrintVermAansl_1# = 1
.NeedData1              VermAansl
$>Net worth reconciliation<$
.Data1                  VermAansl @VermAansl InWinst
.SubRange               MutCalc
.Data1                  VermAansl BookValueEquitySold
.Stripe                 =
.Skip 1
.Data0                  EigenVerm
.EndIf
.SubRange               FuncResRek
.NewPage
.Else
.Message                "$>Profit and loss-account not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Toelichting op resultatenrekening functioneel
;
.SubReport              Name=SpecificationProfitAndLossAccountFunctional,Title="$>Specification<$ $>profit and loss account<$ ($>Functional<$)",GroupTitle="$>Profit and loss account<$",Enabled=Licensed("A")
;.PercBase               NettoOmzet
.Case ResRekPerc[1]
  .OnValue 0
.PercBase               NettoOmzet
  .OnValue 1
  .PercBase               BrutoWinst
  .OnValue 2
  .PercBase               BedrRes
  .OnValue 3
  .PercBase               GewResVoorBel
  .OnValue 4
  .PercBase               ResNaBel
.EndCase
.CountData1             LineCount=FuncResRek
.If                     #LineCount#>0
.PageTitle              "$>Specification<$ $>profit and loss-account<$ (x #CurrencySymbol# #Scale#,-)#$SubTitle#","$>Continuation of specification<$ $>profit and loss-account<$#$SubTitle#"
.SubRange               FuncResRek
.ColumnTitles
;-------------------------------------------------------------------------
; omzet
;
.CountData1         LineCount=NettoOmzet
.If                 #LineCount#>0
.Skip               1
.NeedData1          NettoOmzet
{M>}{NettoOmzet[Title]:0}{<M}
.Data1              NettoOmzet
.EndIf
;-------------------------------------------------------------------------
; Inkoopwaarde
;
.CountData1         LineCount=InkW
.If                 #LineCount#>0
.Skip               1
.NeedData1          InkW
{M>}{OmzetKosten[Title]:0}: {InkW[Title]:0}{<M}
.Data1              InkW
.EndIf
;-------------------------------------------------------------------------
; Personeelskosten
;
.CountData1         L1=PersK
.IfAll              #L1#>0
.Skip               1
.NeedData2          PersK
{M>}{OmzetKosten[Title]:0}: {PersK[Title]:0}{<M}
.CountData2         L2=PersK
.IfAll              #L2#>#L1#
.Data2              PersK
.Else
.Data1              PersK
.EndIf
.EndIf

;-------------------------------------------------------------------------
; Kosten productie
;
.CountData1         LineCount=FuncProdK
.If                 #LineCount#>0
.Skip               2
.NeedData1          FuncProdK
{M>}{OmzetKosten[Title]:0}: {FuncProdK[Title]:0}{<M}
.Data1              FuncProdK
.Skip               1
.EndIf
;-------------------------------------------------------------------------
; Kosten inventaris
;
.CountData1         LineCount=FuncInventK
.If                 #LineCount#>0
.Skip               2
.NeedData1          FuncInventK
{M>}{OmzetKosten[Title]:0}: {FuncInventK[Title]:0}{<M}
.Data1              FuncInventK
.Skip               1
.EndIf
;-------------------------------------------------------------------------
; Kosten huisvesting
;
.CountData1         LineCount=FuncGebK
.If                 #LineCount#>0
.Skip               2
.NeedData1          FuncGebK
{M>}{OmzetKosten[Title]:0}: {FuncGebK[Title]:0}{<M}
.Data1              FuncGebK
.Skip               1
.EndIf
;-------------------------------------------------------------------------
; Kosten transport
;
.CountData1         LineCount=FuncTranspK
.If                 #LineCount#>0
.Skip               2
.NeedData1          FuncTranspK
{M>}{OmzetKosten[Title]:0}: {FuncTranspK[Title]:0}{<M}
.Data1              FuncTranspK
.Skip               1
.EndIf
;-------------------------------------------------------------------------
; Kosten overige bedrijfskosten
;
.CountData1         LineCount=FuncOvK
.If                 #LineCount#>0
.Skip               2
.NeedData1          FuncOvK
{M>}{OmzetKosten[Title]:0}: {FuncOvK[Title]:0}{<M}
.Data1              FuncOvK
.Skip               1
.EndIf

.data0              AktDAfs

;-------------------------------------------------------------------------
; mutatie voorraden
;
.CountData1         LineCount=ProdVrdMut
.If                 #LineCount#>0
.Skip               1
.NeedData1          ProdVrdMut
{M>}{OmzetKosten[Title]:0}: {ProdVrdMut[Title]:0}{<M}
.Data1              ProdVrdMut
.EndIf
;-------------------------------------------------------------------------

.FixTypeFace   EndSum
.Data0         OmzetKosten
.FixTypeFace   Org
.skip    1

.FixTypeFace   EndSum
.Data0         BrutoOmzetRes
.FixTypeFace   Org
.skip    1

;-------------------------------------------------------------------------
; Verkoopkosten
;
.CountData1         LineCount=VerkoopK
.If                 #LineCount#>0
.Skip               1
.NeedData1          VerkoopK
{M>}{VerkoopK[Title]:0}{<M}
.Data1              VerkoopK
.EndIf

;-------------------------------------------------------------------------
; Algemene Kosten
;
.CountData1         LineCount=AlgK
.If                 #LineCount#>0
.Skip               1
.NeedData1          AlgK
{M>}{AlgK[Title]:0}{<M}
.Data1              AlgK
.EndIf

.FixTypeFace   EndSum
.SKip    1
.Data0         NettoOmzetRes
.FixTypeFace   Org
.skip    1
.Data0         OvBedrOpbr
.skip    1
.FixTypeFace   EndSum
.Data0         BedrRes
.FixTypeFace   Org
.skip    1

;-------------------------------------------------------------------------
; Financiele Baten
.CountData1         LineCount=FinBaten
.If                 #LineCount#>0
.Skip               1
.NeedData1          FinBaten
{M>}{FinBaten[Title]:0}{<M}
.Data1              FinBaten
.EndIf

;-------------------------------------------------------------------------
; Financiele Lasten
.CountData1         LineCount=FinLasten
.If                 #LineCount#>0
.Skip               1
.NeedData1          FinLasten
{M>}{FinLasten[Title]:0}{<M}
.Data1              FinLasten
.EndIf

.Skip    1
.FixTypeFace   EndSum
.Data0         FinRes
.FixTypeFace   Org
.skip    1

.FixTypeFace   EndSum
.Data0         GewResVoorBel
.FixTypeFace   Org
.skip    1

;-------------------------------------------------------------------------
; Buiten Baten
.CountData1         LineCount=BuitBaten
.If                 #LineCount#>0
.Skip               1
.NeedData1          BuitBaten
{M>}{BuitBaten[Title]:0}{<M}
.Data1              BuitBaten
.EndIf

;-------------------------------------------------------------------------
; Buiten Lasten
.CountData1         LineCount=BuitLasten
.If                 #LineCount#>0
.Skip               1
.NeedData1          BuitLasten
{M>}{BuitLasten[Title]:0}{<M}
.Data1              BuitLasten
.EndIf

.Skip    1
.FixTypeFace   EndSum
.Data0         BuitREs
.FixTypeFace   Org
.skip    1
.Data0         WinstBEl
.skip    1
.Data0         AandeelResDeeln
.Skip    1
.Data0         ResAandDerden
.Skip    1

.FixTypeface   EndSum
.SuppressLines No
.Data0         ResNaBel
.SuppressLines Org
.FixTypeface   Org
.Skip    1
.Stripe        =
.Skip    1
.EndIf
.SubRange               None
.NewPage
.PercBase               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
;—————————————————————————————————————————————————————————————————————————————
; grafieken resultatenrekening
.SubReport              Name=ResRekChartArea,Title="$>Grafiek winstanalyse<$",GroupTitle="$>Grafieken resultatenrekening<$"
;.PageTitle              "$>Winstanalyse<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Vervolg van winstanalyse<$#$SubTitle#"

.Chart FileName="V04-Charts.xml",ChartName="Std_WinstAnalyseCPChart"

.NewPage
.EndOfSubReport


.SubReport              Name=ResRekChartLine,Title="$>Grafiek netto omzet, brutowinst en resultaat<$",GroupTitle="$>Grafieken resultatenrekening<$"
;.PageTitle              "$>Resultatenrekening<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Vervolg van resultatenrekening<$#$SubTitle#"

.Chart FileName="V04-Charts.xml",ChartName="Std_WinstAnalyseLineChart"

.NewPage
.EndOfSubReport
;—————————————————————————————————————————————————————————————————————————————
;—————————————————————————————————————————————————————————————————————————————


; Vermogensaansluiting
.SubReport              Name=NetWorthReconciliation,Title="$>Net worth reconciliation<$"
.SubRange               VermAansl
.CountData1             LineCount=VermAansl
.If                     #LineCount#>0
.PageTitle              "$>Net worth reconciliation<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of net worth reconciliation<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.Data1                  VermAansl @VermAansl InWinst
.SubRange               MutCalc
.Data1                  VermAansl BookValueEquitySold
.Stripe                 =
.Skip 1
.Data0                  EigenVerm
.Skip                   1
.NewPage
.Else
.Message                "$>Net worth reconciliation not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Kasstroomoverzicht
.SubReport              Name=CashflowStatement,Title="$>Cashflow statement<$",GroupTitle="$>Cash flow<$"
.SubRange               CFJaarRek MutCalc
.CountData1             LineCount=CFJaarRek
.If                     #LineCount#>0
.PageTitle              "$>Cashflow statement<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of cash flow statement<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.SubSumTypeface         None
.Skip                   1
.Data1                  JCFOpCF
.Skip                   1
.Data1                  JCFInvCF
.Skip                   1
.Data1                  JCFFinCF
.Skip                   1
.Stripe                 -
.TextTypeface           Bold
.CalcTypeface           Bold
.Data0                  SaldoCFJaarrek
.CalcTypeface           Org
.TextTypeface           Org
.SubSumTypeface         Org
.Stripe                 =
.Skip                   1
.NewPage
.Else
.Message                "$>Cash flow statement not available in the columns asked for!<$"
.EndIf
.SubRange               None
.PercBase               None
.EndOfSubReport



;—————————————————————————————————————————————————————————————————————————————
;—————————————————————————————————————————————————————————————————————————————
; grafiek netto werkkapitaal
.SubReport              Name=NetWerkChartArea,Title="$>Grafiek nettowerkkapitaal<$";,GroupTitle="$>Grafieken kengetallen<$"
;.PageTitle              "$>Nettowerkkapitaal<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Vervolg van nettowerkkapitaalt<$#$SubTitle#"
.Chart FileName="V04-Charts.xml",ChartName="Std_NetWerkKapChart"
.NewPage
.EndOfSubReport
;—————————————————————————————————————————————————————————————————————————————
;—————————————————————————————————————————————————————————————————————————————



;—————————————————————————————————————————————————————————————————————————————
; kengetallen
.SubReport              Name=Ratios,Title="$>Ratios<$",GroupTitle="$>Ratios<$"
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
{&&if FEATURE="P"}
.CountData1             LineCount=UserRatios
.If                     #LineCount#>0
.Skip                   1
.NeedData1              UserRatios
{M>}{UserRatios[Title]:0}{<M}
.Data1                  UserRatios
.EndIf
{&&endif}
;
.SetNA                  Org
.ShowMutCols            Yes
.SubRange               None
.NewPage
.EndOfSubReport


;—————————————————————————————————————————————————————————————————————————————
;—————————————————————————————————————————————————————————————————————————————
; grafieken ratios
.SubReport              Name=SolvChartBar,Title="$>Grafiek liquiditeit<$",GroupTitle="$>Grafieken kengetallen<$"
;.PageTitle              "$>Liquiditeit<$ #$SubTitle#","$>Vervolg van liquiditeit<$#$SubTitle#"
.Chart FileName="V04-Charts.xml",ChartName="Std_LiqChart"
.NewPage
.EndOfSubReport

.SubReport              Name=SolvAVChartBar,Title="$>Grafiek solvabiliteit<$",GroupTitle="$>Grafieken kengetallen<$"
;.PageTitle              "$>Solvabiliteit<$ #$SubTitle#","$>Vervolg van solvabiliteit<$#$SubTitle#"
.Chart FileName="V04-Charts.xml",ChartName="Std_SolvChart"
.Chart FileName="V04-Charts.xml",ChartName="Std_SolvAV"
.NewPage
.EndOfSubReport

.SubReport              Name=TermChartLine,Title="$>Grafiek debiteuren- en crediteurentermijn<$",GroupTitle="$>Grafieken kengetallen<$"
;.PageTitle              "$>Debiteuren- en crediteurentermijn<$ #$SubTitle#","$>Vervolg van debiteuren- en crediteurentermijn<$#$SubTitle#"
.Chart FileName="V04-Charts.xml",ChartName="Std_TermChart"
.NewPage
.EndOfSubReport

.SubReport              Name=RentabChartLine,Title="$>Grafiek rentabiliteitsratio's<$",GroupTitle="$>Grafieken kengetallen<$"
;.PageTitle              "$>Rentabiliteitsratio's<$ #$SubTitle#","$>Vervolg van rentabiliteitsratio's<$#$SubTitle#"
.Chart FileName="V04-Charts.xml",ChartName="Std_RentabRatiosChart"
.NewPage
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
;—————————————————————————————————————————————————————————————————————————————



;—————————————————————————————————————————————————————————————————————————————
; Specificatie privè-opnamen/stortingen
;
;
.SubReport          Name=SpecificationPrivateDrawingsDeposits,Title="$>Specification private drawings/deposits<$"
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

;—————————————————————————————————————————————————————————————————————————————
; Privè-vermogen
;
.SubReport          Name=PrivateCapital,Title="$>Private capital<$"
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

.SubReport              Name=RatiosBriefOverviewWithExplanation,Title="$>Ratios<$ ($>brief overview with explanation<$)",GroupTitle="$>Ratios<$"
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

;—————————————————————————————————————————————————————————————————————————————
; Specificatie aannames prognose

.SubReport          Name=DefaultSettingsForecast,Title="$>Default settings forecast<$",GroupTitle="$>Forecast settings<$"
.PageTitle          "$>Default settings forecast<$ (x #CurrencySymbol# #Scale#,-)#$SubTitle#","$>Continuation<$ $>default settings forecast<$ #$SubTitle#"
.Subheader          yes
.InterSumTypeFace   None
.InputTypeFace      Shaded
.SubIndent          5
.SuppressLines      No
{B>}{ForecastDefault[Title]}{ForecastDefault}{<B}
.Skip               1

.IfAll                  DataEntered(ForecastExplanation)
.NeedLines              8
.Skip 1
{M>}{B>}$>Explanation<$ $>scenario<$:{<B}{<M}
.Memo                   ForecastExplanation
.Skip                   2
.EndIf

.NeedData2          PrognoseSettings PrijsStijging2 RPOvKortKred
{M>}{B>}$>General forecast settings<$:{<B}{<M}
.ColumnTitles
.Data0 PrijsStijging2
.Data1 PrijsStijging2
.Skip 1
.Data1 PrognoseSettings VolumeStijging

.Skip               1
.Data0              KredFreqDefault
.Data0              RekCourFreq
.Skip               1

.Range [@]
{M>}{B>}{ForecastSales[Title]:0}{<B}{<M}
.Data1              ForecastSales ForecastSalesTxt ForecastSalesMaxDecr
.Skip               1
.Data1              ForecastSales ForecastOmzetGr1 ForecastOmzetGr20
.Skip               1
.Data1              ForecastSales ForecastVerkKorting ForecastOvOmzetCor
.Skip               1
.Range org

.NeedData2          ForecastInkW
{M>}{B>}{ForecastInkW[Title]:0}{<B}{<M}
.ColumnTitles
.Data2              ForecastInkW
.Skip               1
;.ColumnTitles
.Data0              PercMatVerbr
.Data0              ForecastMatVerbr
.Skip               1
.Data1              ForecastInkW ForecastInkKorting ForecastOvDirIinkK
.Skip               1

.Range [@]
.ColumnTitles None
.NeedLines          7
{M>}{B>}{ForecastPersK[Title]:0}{<B}{<M}
{I>}{ForecastBrutoloon[Title]}{<I}
.Data1              ForecastPersK ForecastLoonPers ForecastSocLastDir
.Skip               1
.LM  10
{M>}$>Explanation wages and social securities<${<M}
{I>}{ForecastLoonPers[Title]}{ForecastLoonPers}{<I}
{ForecastAantalPersTxt[Title]}
.Data1 ForecastLoonPers ForecastAantalPersVerkCopy ForecastAantalPersOvCopy
.Range ORG
.Skip               1
.ColumnTitles
;.Data1 ForecastLoonPers AantalPersVerkCopy AantalPersOvCopy ;hz:ivm 2x tonen van prognoseschakelaar en missende optelling
.Data1 ForecastBetKracht AantalPersVerkCopy AantalPersOvCopy     ;hz:ivm 2x tonen van prognoseschakelaar en missende optelling
.Stripe
.Data0 PersKracht
.Data0 PersKrachtGroei
.ColumnTitles None
.Skip 1
.Data1 ForecastBetKracht ForecastAantalPersVerk ForecastAantalPersOv
.Skip 1
.Data0 ForecastOnbetKracht
.Skip 2
.Data1 ForecastLoonPers ForecastLoonstijging LoonStijging
.Skip 1
.Data1 ForecastLoonPers DutchIndexHulp GrowthCAOIndex
.Skip 1
{I>}{ForecastLoonDir[Title]}{ForecastLoonDir}{<I}
.Data0 ForecastDirKrachtCopy
.Skip 1
.ColumnTitles
.Data0 DirKracht
.Skip 1
.Data0 ForecastLoonStijgingDir
.Skip 1
.ColumnTitles
.Data0 LoonStijgingDir
.Range [@]
.LM  ORG
.Skip 1
.ColumnTitles None
{I>}{ForecastPensLast[Title]}{<I}
.Data1              ForecastPersK ForecastPensPremPers ForecastPensDotDir
.Skip               1
{I>}{ForecastPersKOv[Title]}{<I}
.Data1              ForecastPersK ForecastGewLoonOnd ForecastOngPersK

.Skip               1
.NeedLines          8
.TitleWidth             35
{M>}{B>}{ForecastCosts[Title]:0}{<B}{<M}
.SubIndent 8
{ForecastProdK[Title]}
.Data1              ForecastProdK
.Skip               1
{ForecastInventK[Title]}
.Data1              ForecastInventK
.Skip               1
{ForecastGebK[Title]}
.Data1              ForecastGebK
.Skip               1
{ForecastTranspK[Title]}
.Data1              ForecastTranspK
.Skip               1
{ForecastVerkoopK[Title]}
.Data1              ForecastVerkoopK
.Skip               1
{ForecastAlgK[Title]}
.Data1              ForecastAlgK
.Skip               1
{ForecastOvK[Title]}
.Data1              ForecastOvK

.Skip 1
{M>}{B>}{ForecastAktAfs[Title]:0}{<B}{<M}
{ForecastAktAfsImmatAkt[Title]}
.Data1              ForecastAktAfsImmatAkt
.Skip               1
{ForecastAktAfsOnrGoed[Title]}
.Data1              ForecastAktAfsOnrGoed
.Skip               1
{ForecastAktAfsBedrUitr[Title]}
.Data1              ForecastAktAfsBedrUitr

.SubIndent ORG

.Skip               1
{M>}{B>}{ForecastFinRes[Title]:0}{<B}{<M}
.Data1              ForecastFinRes
.Data2              ForecastFinRes ForecastFinLastenTxt ForecastGewRente
.Skip               1
.Range              ORG
.TitleWidth         ORG
.ColumnTitles
.Skip               1
.Data0              RPRekCourNeg
.Data0              RPRekCourPos
.Data0              RPLangVV
.Data0              RPOvKortKred

.Range [@]
.TitleWidth             35
.Skip               1
{M>}{B>}{ForecastReinv[Title]:0}{<B}{<M}
.Data1              ForecastReinv

.Skip 1
.Range              ORG
.TitleWidth         ORG
.ColumnTitles
{M>}{B>}{ForecastWorkingCap[Title]:0}{<B}{<M}
.Data2              ForecastWorkingCap
.PercBase           None
.SubRange           None
.InputTypeFace      ORG
.InterSumTypeFace   ORG
.SuppressLines      ORG
.NewPage
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Afwijkingen van modelprognose

.SubReport              Name=DifferencesOfModelForecast,Title="$>Differences of model forecast<$",GroupTitle="$>Forecast settings<$"
.PercBase               None
.SubRange               None
.PageTitle              "$>Differences of model forecast<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of overview differences with model-forecast<$#$SubTitle#"
;.Picture                1,10,finan.bmp

.ShowInputs

.NewPage
.PercBase               None
.SubRange               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Afdrukken Toelichting

.SubReport              Name=Explanation,Title="$>Explanation<$"
.PercBase               None
.SubRange               None
.PageTitle              $>Explanation<$

.IfAll                  DataEntered(ToeBalans)
.NeedLines              8
{M>}{ToeBalans[0]}{<M}
.Memo                   ToeBalans
.Skip                   2
.EndIf

.IfAll                  DataEntered(ToeResRek)
.NeedLines              8
{M>}{ToeResRek[0]}{<M}
.Memo                   ToeResRek
.Skip                   2
.EndIf

.IfAll                  DataEntered(ToeVermAansl)
.NeedLines              8
{M>}{ToeVermAansl[0]}{<M}
.Memo                   ToeVermAansl
.Skip                   2
.EndIf

.IfAll                  DataEntered(ToeCFJaarRek)
.NeedLines              8
{M>}{ToeCFJaarRek[0]}{<M}
.Memo                   ToeCFJaarRek
.Skip                   2
.EndIf

.IfAll                  DataEntered(ToeCashFlows)
.NeedLines              8
{M>}{ToeCashFlows[0]}{<M}
.Memo                   ToeCashFlows
.Skip                   2
.EndIf

.IfAll                  DataEntered(ToeLiqOverzicht)
.NeedLines              8
{M>}{ToeLiqOverzicht[0]}{<M}
.Memo                   ToeLiqOverzicht
.Skip                   2
.EndIf

.if (#INSTALLCODE#=8)                                                          ; niet afdrukken voor het bankmodel
; nothing
.else
;
.IfAll                  DataEntered(ToeAflCap)
.NeedLines              8
{M>}{ToeAflCap[0]}{<M}
.Memo                   ToeAflCap
.Skip                   2
.EndIf
;
.Endif

.IfAll                  DataEntered(ToeAV)
.NeedLines              8
{M>}{ToeAV[0]}{<M}
.Memo                   ToeAV
.Skip                   2
.EndIf

{&&if FEATURE="P"}
.if (#INSTALLCODE#=8)                                                          ; niet afdrukken voor het bankmodel
; nothing
.else

.IfAll                  DataEntered(ToeValCashFlow)
.NeedLines              8
{M>}{ToeValCashFlow[0]}{<M}
.Memo                   ToeValCashFlow
.Skip                   2
.EndIf

.IfAll                  DataEntered(ToeInvCap)
.NeedLines              8
{M>}{ToeInvCap[0]}{<M}
.Memo                   ToeInvCap
.Skip                   2
.EndIf

.IfAll                  DataEntered(ToeECProfitTop)
.NeedLines              8
{M>}{ToeECProfitTop[0]}{<M}
.Memo                   ToeECProfitTop
.Skip                   2
.EndIf

.IfAll                  DataEntered(ToeWaarderingsmethoden)
.NeedLines              8
{M>}{ToeWaarderingsmethoden[0]}{<M}
.Memo                   ToeWaarderingsmethoden
.Skip                   2
.EndIf

.endif
{&&endif}
;
.NewPage
.PercBase               None
.SubRange               None
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Investeringen en afschrijvingen

.SubReport              Name=InvestmentsAndDepreciations,Title="$>Investments and depreciations<$",GroupTitle="$>Investments and financing<$"
.PercBase               None
.SubRange               BalAkt
.PageTitle              "$>Investments and depreciations<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of investments and depreciations<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
;
.CountData1             LineCount=ImmatAktInv
.If                     #LineCount#>0
.NeedData1              ImmatAktInv
{M>}{ImmatAkt[Title]:0}{<M}
.Data1                  ImmatAktInv
.Stripe                 =
.EndIf
;
.CountData1             LineCount=OnrGoedInv
.If                     #LineCount#>0
.Skip                   1
.NeedData1              OnrGoedInv
{M>}{OnrGoed[Title]:0}{<M}
.Data1                  OnrGoedInv
.Stripe                 =
.EndIf
;
.CountData1             LineCount=BedrUitrInv
.If                     #LineCount#>0
.Skip                   1
.NeedData1              BedrUitrInv
{M>}{BedrUitr[Title]:0}{<M}
.Data1                  BedrUitrInv
.Stripe                 =
.EndIf
;
.CountData1             LineCount=ImmatAktAfs
.If                     #LineCount#>0
.Skip                   1
.NeedData1              ImmatAktAfs
{M>}{ImmatAktAfs[Title]:0}{<M}
.Data1                  ImmatAktAfs
.Stripe                 =
.EndIf
;
.CountData1             LineCount=OnrGoedAfs
.If                     #LineCount#>0
.Skip                   1
.NeedData1              OnrGoedAfs
{M>}{OnrGoedAfs[Title]:0}{<M}
.Data1                  OnrGoedAfs
.Stripe                 =
.EndIf
;
.CountData1             LineCount=BedrUitrAfs
.If                     #LineCount#>0
.Skip                   1
.NeedData1              BedrUitrAfs
{M>}{BedrUitrAfs[Title]:0}{<M}
.Data1                  BedrUitrAfs
.Stripe                 =
.EndIf
;
.CountData1             LineCount=ImmatAkt
.If                     #LineCount#>0
.Skip                   1
.NeedData1              ImmatAkt
{M>}$>Book value<$ {ImmatAkt[Title]:0}{<M}
.Data1                  ImmatAkt
.Stripe                 =
.EndIf
;
.CountData1             LineCount=OnrGoed
.If                     #LineCount#>0
.Skip                   1
.NeedData1              OnrGoed
{M>}$>Book value<$ {OnrGoed[Title]:0}{<M}
.Data1                  OnrGoed
.Stripe                 =
.EndIf
;
.CountData1             LineCount=BedrUitr
.If                     #LineCount#>0
.Skip                   1
.NeedData1              BedrUitr
{M>}$>Book value<$ {BedrUitr[Title]:0}{<M}
.Data1                  BedrUitr
.Stripe                 =
.EndIf
.SubRange               None
.NewPage
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Financieringen en aflossingen

.SubReport              Name=FinancingRepaymentsAndInterestExpenses,Title="$>Financing, repayments and interest expenses<$",GroupTitle="$>Investments and financing<$"
.PercBase               None
.PageTitle              "$>Financing, repayments and interest expenses<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of financing, repayments and interest expenses<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.SubRange               BalPas
.ColumnTitles
.IfAll                  LangVVFin=NA
.Else
{M>}{LangVVFin[Title]:0}{<M}
.Data1                  LangVVFin
.Stripe                 =
.EndIf
.CountData1             LineCount=AflLangVV
.If                     #LineCount#>0
.Skip                   1
.NeedData1              AflLangVV
{M>}{AflLangVV[Title]:0}{<M}
.Data1                  AflLangVV
.Stripe                 =
.EndIf
.CountData1             LineCount=FinLasten
.If                     #LineCount#>0
.Skip                   1
.NeedData2              FinLasten
{M>}{FinLasten[Title]:0}{<M}
.Data2                  FinLasten
.Stripe                 =
.EndIf
.CountData1             LineCount=RCRuimte
.If                     #LineCount#>0
.Skip                   1
.NeedData1              RCRuimte
{M>}Rekening courant{<M}
.Data1                  RCRuimte
.Stripe                 =                ; ejs
.EndIf
.SubRange               None
.NewPage
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Investerings- en financieringsplan

.SubReport              Name=InvestmentsAndFinancingPlan,Title="$>Investments and financing-plan<$",GroupTitle="$>Investments and financing<$"
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

;—————————————————————————————————————————————————————————————————————————————
; Liquiditeitsoverzicht

.SubReport              Name=StatementOfLiquidity,Title="$>Statement of liquidity<$",GroupTitle="$>Cash flow<$"
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
.EndOfSubReport


;—————————————————————————————————————————————————————————————————————————————
; Terugbetaalcapaciteit
{&&if INSTALLCODE=8}
{&&else}

.SubReport              Name=RepaymentCapacity,Title="$>Repayment capacity<$"           ;HZ: systeemvariabele ShowAflCap ook verwijderd (nergens gedefinieerd;heeft geen functie
.PercBase               NONE
.SubRange               MutCalc
.CountData1             LineCount=AV
.If                     #LineCount#>0
.PageTitle              "$>Repayment capacity<$ (x #Currency# #Scale#,-)#$SubTitle#","$>Continuation of repayment capacity<$#$SubTitle#"
;.Picture                1,10,finan.bmp
.ColumnTitles
.Skip                   1
.Data1                  AflCap
.Stripe                 =
.NewPage
.Else
.Message                "$>Repayment capacity not|available in the columns asked for!<$"
.EndIf
.SubRange               None
.EndOfSubReport

{&&endif}

;—————————————————————————————————————————————————————————————————————————————
; Aansprakelijk vermogen

.SubReport              Name=LiableCapital,Title="$>Liable capital<$"
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
;—————————————————————————————————————————————————————————————————————————————

.Quit
