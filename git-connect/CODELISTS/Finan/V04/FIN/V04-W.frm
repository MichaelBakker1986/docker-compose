{&&Language=English}$>Valuation-report<$
.MenuHelp           $>Valuation-report<$
.FINANversion       3.0
{&&if FEATURE="P"}
.HideMenuItem Off
{&&else}
.HideMenuItem On
{&&endif}
;
;
.LineSpacing            1.1                 ;regelafstand
.TM                     2                   ;bovenmarge
.LM                     6                   ;linkermarge                                  ;;Rva 2001-04-17 was 10
.RM                     3                   ;rechtermarge
.SubIndent              0                   ;inspringen van onderlingende niveau's
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
.DestFileSpec           Waarderingsrapport-#DocumentCode#

.AskChoice              ReportScenario = "$>Which scenario must be reported?<$",&SheetTitle(1)&"|"&SheetTitle(2)&"|"&SheetTitle(3)&"|"&SheetTitle(4),0
.Let                    TabbladTitle= &FirstLC(&SheetTitle(#ReportScenario#+1))
.Let                    Waarderingsdatum =&DateStr(ValuationDate[LastTinPeriod(#ReportScenario#+1)],2)         ; ejs: dit is niet netjes ReportScenario is eigenlijk een sheetnummer, toevallig is dat ook het juiste periodenummer!
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem

.ReportDialog           SubReports,Header,Destinations,Settings                                                ; moet na de .Range opdracht, anders geldt voor elk subreport de default range
.InitPageSize
.TitleWidth             45
.ColumnWidth            20

;Comparablescolumn noodzakelijk voor afdrukken juiste kolom comparables, overige zijn allemaal Period-vars dus doet T niet terzake

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

; ejs 8-7-2008:
; onderstaande .PageTitle regels verooraken lege bladzijde aan begin. PageTitle is geen header (gebruik daarvoor .Header!)
; eventueel kan je .PageTitle op elk subreport specificeren, zoals in het standaard keuzerapport V04-K.frm
;.If #ReportScenario#=0
;.PageTitle              "$>Valuation-report<$ (x #Currency# #Scale#,-) #$SubTitle#","$>Continuation of Valuation-report<$ (x #Currency# #Scale#,-) #$SubTitle#"
;.Else
;.PageTitle              "$>Valuation-report<$ #TabbladTitle# (x #Currency# #Scale#,-) #$SubTitle#","$>Continuation of Valuation-report<$ #TabbladTitle# (x #Currency# #Scale#,-) #$SubTitle#"
;.EndIf
;—————————————————————————————————————————————————————————————————————————————
; beurswaarde

;.let                    SubReport_BEURS=0
;.let                    SubReport_DCF=0
;.let                    SubReport_ECPROFIT=0
;.let                    SubReport_INTRW=0
;.let                    SubReport_DIVYIELD=0
;.let                    SubReport_WINSTRATIO=0
;.let                    SubReport_SALESRATIO=0
;.let                    SubReport_EVRATIO=0
;.let                    SubReport_AEVRATIO=0
;.let                    SubReport_EBITDARATIO=0
;.let                    SubReport_BOOKVALUERATIO=0


.SubReport              Name=MarketValue,Title="$>Market value<$",Enabled=Licensed("W")     ;(POS("W","#$LicFeatures#")>0)
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_BEURS=1
.If                     BeursWaardeNU<>NA
.NeedLines              8
{M>}$>Valuation based on<$ {Beurswaarde[0]:0} $>Per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.Data0                  AantalAandelenNU
.Data0                  KoersNu
.Stripe                 -
.FixTypeface            EndSum
.Data0                  BeursWaardeNU
.FixTypeface            Org
.Stripe  `              =
.Skip                   Min(#Freelines#,3)
.EndIf
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Discounted Cashflow

.SubReport              Name=DiscountedCashFlow,Title="$>Discounted cash flow<$"
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_DCF=1
.If                     DCFValueNU<>NA
.CountData1             AantalRegels=DCFValueNu DCFPVNU
.NeedLines              #AantalRegels#+4
{M>}$>Valuation based on<$ {DCFValueNU[0]:0} $>Per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.Data1                  DCFValueNu DCFPVNU
.Stripe                 =
.Skip                   Min(#Freelines#,3)
.EndIf
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Economische winst

.SubReport              Name=EconomicProfit,Title="$>Economic profit<$",Enabled=Licensed("W")     ;,#$SubReport_ECPROFIT#,(POS("W","#$LicFeatures#")>0)
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_ECPROFIT=1
.If                     EcProfitValueNu<>NA
.CountData1             AantalRegels=EcProfitValueNu EcProfitPVNU
.NeedLines              #AantalRegels#+4
{M>}$>Valuation based on<$ {EcProfitValueNU[0]:0} $>Per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.Data1                  EcProfitValueNu EcProfitPVNU
.Stripe                 =
.Skip                   Min(#Freelines#,3)
.EndIf
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; APV

.SubReport              Name=AdjustedPresentValue,Title="$>Adjusted present value<$",Enabled=Licensed("W")
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_APV=1
.If                     APVValueNU<>NA
.CountData1             AantalRegels=APVValueNu APVAllEqValNu
.NeedLines              #AantalRegels#+4
{M>}$>Valuation based on<$ {APVValueNu[0]:0} $>Per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.Data1                  APVValueNu APVAllEqValNu
.Stripe                 =
.Skip                   Min(#Freelines#,3)
.EndIf
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Intrinsieke waarde
.SubReport              Name-IntrinsicValue,Title="$>Intrinsic value<$"
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_INTRW=1
.Let                    ExplComp = &FirstLC(&CorrIntrWaardeNu[0])
.AskOK                  PrintExplComp_1="$>Print<$ $>including<$ $>explanation<$ #ExplComp#?",#PrintExplComp_1#
.If                     IntrWaardeNU<>NA
.CountData1             AantalRegels=IntrWaardeNU EigenVermNu
.NeedLines              #AantalRegels#+4
{M>}$>Valuation based on<$: {IntrWaardeNU[0]:0} $>Per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.Data1                  IntrWaardeNU EigenVermNu
.Stripe                 =
.if #PrintExplComp_1# = 1
.Skip                   2
.CountData2             L=CorrIntrWaardeNu
.NeedLines              #L#+2
$>Explanation<$ #ExplComp#:
.Data2                  CorrIntrWaardeNu
.Stripe                 =
.EndIf
.Skip                   Min(#Freelines#,3)
.EndIf
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Rentabiliteitsmethode

.SubReport              Name=DividendYieldMethod,Title="$>Dividend yield method<$"
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_DIVYIELD=1
.If                     rmValueNU<>NA
.NeedLines              10
{M>}$>Valuation based on<$: {rmValueNU[0]:0} $>Per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.Data0                  rmCorrResNu
.Data0                  rmPercInWinstNu
.Data0                  rmGrNoPlatNu
.Data0                  rmCostOfEqNu
.Data0                  rmHerFinNU
.Skip                   1
.FixTypeface            EndSum
.If                     rmValueNu <> NA
$>Value based on dividend yield method<${tab}{rmValueNu}
.EndIf
.FixTypeface            Org
.Skip                   Min(#Freelines#,3)
.EndIf
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Waarde/winst

.SubReport              Name=ValueProfitRatio,Title="$>Value / profit ratio<$"
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_WINSTRATIO=1
.Let                    ExplComp = &FirstLC(&KoersWinstRatio[0])
.AskOK                  PrintExplComp_1="$>Print<$ &#ExplComp# $>including<$ $>explanation<$?",#PrintExplComp_1#
.SubsumTypeface         None
.If                     KWWaarderingNU<>NA
.NeedLines              15
{M>}$>Valuation<$ $>based on<$ {KWWaarderingNU[0]:0} $>per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.FixTypeface            EndSum
.Data0                  ValuationDate
.Data0                  ComparablesColumn
.FixTypeface            Org
.Skip                   1
{I>}$>Value / profit ratio<$:{<I}
.Data1                  KWWaarderingNu
.Skip                   1
.FixTypeface            EndSum
.Data0                  GemKW
{KWWaardering[Title]:0} (x #Currency# #Scale#,-){tab}{KWWaardering}
.EndsumTypeface         None
.FixTypeface            Org
.if #PrintExplComp_1# = 1
.Skip                   2
.CountData1             L=KWRatioond1
.NeedLines              #L#+4
$>Explanation<$:
.Skip                   1
.If                     KWRatioOnd1[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
{I>}$>Value of equity<$ $>based on<$ {KWWaarderingNU[0]:0} {KWRatioOnd1[0]:0}:{<I}
.Data1                  KWRatioond1
.Stripe                 =
.Skip                   1
.EndIf
.If                     KWRatioOnd2[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KWRatioond2
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KWWaarderingNU[0]:0} {KWRatioOnd2[0]:0}:{<I}
.Data1                  KWRatioond2
.Stripe                 =
.Skip                   1
.EndIf
.If                     KWRatioOnd3[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KWRatioond3
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KWWaarderingNU[0]:0} {KWRatioOnd3[0]:0}:{<I}
.Data1                  KWRatioond3
.Stripe                 =
.Skip                   1
.EndIf
.If                     KWRatioOnd4[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KWRatioond4
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KWWaarderingNU[0]:0} {KWRatioOnd4[0]:0}:{<I}
.Data1                  KWRatioond4
.Stripe                 =
.EndIf
.EndIf
.Skip                   Min(#Freelines#,3)
.EndIf
.EndsumTypeface         Org
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Waarde/omzet

.SubReport              Name=ValueSalesRatio,Title="$>Value/ sales ratio<$"
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_SALESRATIO=1
.Let                    ExplComp = &FirstLC(&KoersOmzetRatio[0])
.AskOK                  PrintExplComp_1="$>Print<$ &#ExplComp# $>including<$ $>explanation<$?",#PrintExplComp_1#
.SubsumTypeface         None
.If                     KoWaarderingNU<>NA
.NeedLines              15
{M>}$>Valuation based on<$ {KoWaarderingNU[0]:0} $>per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.FixTypeface            EndSum
.Data0                  ValuationDate
.Data0                  ComparablesColumn
.FixTypeface            Org
.Skip                   1
{I>}$>Value / sales ratio<$:{<I}
.Data1                  KoWaarderingNu
.Skip                   1
.FixTypeface            EndSum
.Data0                  GemKO
{KOWaardering[Title]:0} (x #Currency# #Scale#,-){tab}{KOWaardering}
.EndsumTypeface         None
.FixTypeface            Org
.if #PrintExplComp_1# = 1
.Skip                   2
.CountData1             L=KORatioOnd1
.NeedLines              #L#+4
$>Explanation<$:
.Skip                   1
.If                     KORatioOnd1[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
{I>}$>Value of equity<$ $>based on<$ {KOWaarderingNU[0]:0} {KORatioOnd1[0]:0}:{<I}
.Data1                  KORatioOnd1
.Stripe                 =
.Skip 1
.EndIf
.If                     KORatioOnd2[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KORatioOnd2
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KOWaarderingNU[0]:0} {KORatioOnd2[0]:0}:{<I}
.Data1                  KORatioOnd2
.Stripe                 =
.Skip 1
.EndIf
.If                     KORatioOnd3[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KORatioOnd3
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KOWaarderingNU[0]:0} {KORatioOnd3[0]:0}:{<I}
.Data1                  KORatioOnd3
.Stripe                 =
.Skip 1
.EndIf
.If                     KORatioOnd4[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KORatioOnd4
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KOWaarderingNU[0]:0} {KORatioOnd4[0]:0}:{<I}
.Data1                  KORatioOnd4
.Stripe                 =
.EndIf
.EndIf
.Skip                   Min(#Freelines#,3)
.EndIf
.EndsumTypeface         Org
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Waarde/Eigen vermogen

.SubReport              Name=ValueShareholdersEquityRatio,Title="$>Value / Shareholders' equity ratio<$",Enabled=Licensed("W")   ;(POS("W","#$LicFeatures#")>0)
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_EVRATIO=1
.Let                    ExplComp = &FirstLC(&KoersEVRatio[0])
.AskOK                  PrintExplComp_1="$>Print<$ &#ExplComp# $>including<$ $>explanation<$?",#PrintExplComp_1#
.SubsumTypeface         None
.If                     KEVWaarderingNU<>NA
.NeedLines              15
{M>}$>Valuation based on<$ {KEVWaarderingNU[0]:0} $>per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.FixTypeface            EndSum
.Data0                  ValuationDate
.Data0                  ComparablesColumn
.FixTypeface            Org
.Skip                   1
{I>}$>Value / Shareholders' equity ratio<$:{<I}
.Data1                  KEVWaarderingNu
.Skip                   1
.FixTypeface            EndSum
.Data0                  GemKEV
{KEVWaardering[Title]:0} (x #Currency# #Scale#,-){tab}{KEVWaardering}
.EndsumTypeface         None
.FixTypeface            Org
.if #PrintExplComp_1# = 1
.Skip                   2
.CountData1             L=KEVRatioond1
.NeedLines              #L#+4
$>Explanation<$:
.Skip                   1
.If                     KEVRatioOnd1[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
{I>}$>Value of equity<$ $>based on<$ {KEVWaarderingNU[0]:0} {KEVRatioOnd1[0]:0}:{<I}
.Data1                  KEVRatioond1
.Stripe                 =
.Skip                   1
.EndIf
.If                     KEVRatioOnd2[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KEVRatioOnd2
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KEVWaarderingNU[0]:0} {KEVRatioOnd2[0]:0}:{<I}
.Data1                  KEVRatioond2
.Stripe                 =
.Skip                   1
.EndIf
.If                     KEVRatioOnd3[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KEVRatioOnd3
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KEVWaarderingNU[0]:0} {KEVRatioOnd3[0]:0}:{<I}
.Data1                  KEVRatioond3
.Stripe                 =
.Skip                   1
.EndIf
.If                     KEVRatioOnd4[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KEVRatioOnd4
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KEVWaarderingNU[0]:0} {KEVRatioOnd4[0]:0}:{<I}
.Data1                  KEVRatioond4
.Stripe                 =
.EndIf
.EndIf
.Skip                   Min(#Freelines#,3)
.EndIf
.EndsumTypeface         Org
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Waarde Aangepast Eigen vermogen
.SubReport              Name=ValueAdjustedShareholdersEquity,Title="$>Value / Adjusted Shareholders' equity<$",Enabled=Licensed("W")   ;(POS("W","#$LicFeatures#")>0)
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_AEVRATIO=1
.Let                    ExplComp = &FirstLC(&KoersAEVRatio[0])
.AskOK                  PrintExplComp_1="$>Print<$ &#ExplComp# $>including<$ $>explanation<$?",#PrintExplComp_1#
.SubsumTypeface         None
.If                     KAEVWaarderingNU<>NA
.NeedLines              15
{M>}$>Valuation based on<$ {KAEVWaarderingNU[0]:0} $>per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.FixTypeface            EndSum
.Data0                  ValuationDate
.Data0                  ComparablesColumn
.FixTypeface            Org
.Skip                   1
{I>}$>Value / Adjusted Shareholders' equity<$:{<I}
.Data1                  KAEVWaarderingNu
.Skip                   1
.FixTypeface            EndSum
.Data0                  GemKAEV
{KAEVWaardering[Title]:0} (x #Currency# #Scale#,-){tab}{KAEVWaardering}
.EndsumTypeface         None
.FixTypeface            Org
.if #PrintExplComp_1# = 1
.Skip                   2
.CountData1             L=KAEVRatioOnd1
.NeedLines              #L#+4
$>Explanation<$:
.Skip                   1
.If                     KAEVRatioOnd1[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
{I>}$>Value of equity<$ $>based on<$ {KAEVWaarderingNU[0]:0} {KAEVRatioOnd1[0]:0}:{<I}
.Data1                  KAEVRatioond1
.Stripe                 =
.Skip                   1
.EndIf
.If                     KAEVRatioOnd2[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KAEVRatioOnd2
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KAEVWaarderingNU[0]:0} {KAEVRatioOnd2[0]:0}:{<I}
.Data1                  KAEVRatioond2
.Stripe                 =
.Skip                   1
.EndIf
.If                     KAEVRatioOnd3[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KAEVRatioOnd3
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KAEVWaarderingNU[0]:0} {KAEVRatioOnd3[0]:0}:{<I}
.Data1                  KAEVRatioond3
.Stripe                 =
.Skip                   1
.EndIf
.If                     KAEVRatioOnd4[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KAEVRatioOnd4
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KAEVWaarderingNU[0]:0} {KAEVRatioOnd4[0]:0}:{<I}
.Data1                  KAEVRatioond4
.Stripe                 =
.EndIf
.EndIf
.Skip                   Min(#Freelines#,3)
.EndIf
.EndsumTypeface         Org
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; EBITDA

.SubReport              Name=EBITDARatio,Title="$>EBITDA ratio<$",Enabled=Licensed("W")    ;(POS("W","#$LicFeatures#")>0)
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_EBITDARATIO=1
.Let                    ExplComp = &FirstLC(&EBITDARatio[0])
.AskOK                  PrintExplComp_1="$>Print<$ &#ExplComp# $>including<$ $>explanation<$?",#PrintExplComp_1#
.SubsumTypeface         None
.If                     EBITDAWaarderingNU<>NA
.NeedLines              19
{M>}$>Valuation<$ $>based on<$ {EBITDAWaarderingNU[0]:0} $>per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.FixTypeface            EndSum
.Data0                  ValuationDate
.Data0                  ComparablesColumn
.FixTypeface            Org
.Skip                   1
{I>}$>EBITDA ratio<$:{<I}
.Data1                  EBITDAWaarderingNu
.Skip                   1
.FixTypeface            EndSum
.Data0                  GemEBITDA
.EndsumTypeface         None
.Skip                   1
.Data1                  EBITDAWaarderingNu EBITDAWaardering EBITDAWaarderingEV
.Stripe                 =
.FixTypeface            Org
.if #PrintExplComp_1# = 1
.Skip                   1
.CountData1             L=EBITDARatioOnd1
.NeedLines              #L#+4
$>Explanation<$:
.Skip                   1
.If                     EBITDARatioOnd1[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
{I>}$>Value of equity<$ $>based on<$ {EBITDAWaarderingNU[0]:0} {EBITDARatioOnd1[0]:0}:{<I}
.Data1                  EBITDARatioond1
.Stripe                 =
.Skip                   1
.EndIf
.If                     EBITDARatioOnd2[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=EBITDARatioOnd2
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {EBITDAWaarderingNU[0]:0} {EBITDARatioOnd2[0]:0}:{<I}
.Data1                  EBITDARatioond2
.Stripe                 =
.Skip                   1
.EndIf
.If                     EBITDARatioOnd3[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=EBITDARatioOnd3
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {EBITDAWaarderingNU[0]:0} {EBITDARatioOnd3[0]:0}:{<I}
.Data1                  EBITDARatioond3
.Stripe                 =
.Skip                   1
.EndIf
.If                     EBITDARatioOnd4[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=EBITDARatioOnd4
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {EBITDAWaarderingNU[0]:0} {EBITDARatioOnd4[0]:0}:{<I}
.Data1                  EBITDARatioond4
.Stripe                 =
.EndIf
.EndIf
.Skip                   Min(#Freelines#,3)
.EndIf
.EndsumTypeface         Org
.EndOfSubReport

;—————————————————————————————————————————————————————————————————————————————
; Boekwaarde

.SubReport              Name=BookValueRatio,Title="$>Bookvalue ratio<$",Enabled=Licensed("W")   ;(POS("W","#$LicFeatures#")>0)
.Range                  [ComparablesColumn[LastTinPeriod(#ReportScenario#+1)]\period=(#ReportScenario#+1)]     ; idem
;.let                    SubReport_BOOKVALUERATIO=1
.Let                    ExplComp = &FirstLC(&KoersBWAktInvCapRatio[0])
.AskOK                  PrintExplComp_1="$>Print<$ &#ExplComp# $>including<$ $>explanation<$?",#PrintExplComp_1#
.SubsumTypeface         None
.If                     KBWOpInvCapWaarderingNU<>NA
.NeedLines              19
{M>}$>Valuation<$ $>based on<$ {KBWOpInvCapWaarderingNU[0]:0} $>per<$ #$Waarderingsdatum#{<M}
.Skip                   1
.FixTypeface            EndSum
.Data0                  ValuationDate
.Data0                  ComparablesColumn
.FixTypeface            Org
.Skip                   1
{I>}$>Bookvalue ratio<$:{<I}
.Data1                  KBWOpInvCapWaarderingNu
.Skip                   1
.FixTypeface            EndSum
.Data0                  GemKBWOpInvCap
.EndsumTypeface         None
.Skip                   1
.Data1                  KBWOpInvCapWaarderingNu KBWOpInvCapWaardering KBWOpInvCapWaarderingEV
.Stripe                 =
.FixTypeface            Org
.if #PrintExplComp_1# = 1
.Skip                   1
.CountData1             L=KBWOpInvCapRatioOnd1
.NeedLines              #L#+4
$>Explanation<$:
.Skip                   1
.If                     KBWOpInvCapRatioOnd1[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
{I>}$>Value of equity<$ $>based on<$ {KBWOpInvCapWaarderingNU[0]:0} {KBWOpInvCapRatioOnd1[0]:0}:{<I}
.Data1                  KBWOpInvCapRatioond1
.Stripe                 =
.Skip                   1
.EndIf
.If                     KBWOpInvCapRatioOnd2[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KBWOpInvCapRatioOnd2
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KBWOpInvCapWaarderingNU[0]:0} {KBWOpInvCapRatioOnd2[0]:0}:{<I}
.Data1                  KBWOpInvCapRatioond2
.Stripe                 =
.Skip                   1
.EndIf
.If                     KBWOpInvCapRatioOnd3[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KBWOpInvCapRatioOnd3
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KBWOpInvCapWaarderingNU[0]:0} {KBWOpInvCapRatioOnd3[0]:0}:{<I}
.Data1                  KBWOpInvCapRatioond3
.Stripe                 =
.Skip                   1
.EndIf
.If                     KBWOpInvCapRatioOnd4[GetT(ComparablesColumn,0,#ReportScenario#+1)]<>NA
.CountData1             L=KBWOpInvCapRatioOnd4
.NeedLines              #L#+2
{I>}$>Value of equity<$ $>based on<$ {KBWOpInvCapWaarderingNU[0]:0} {KBWOpInvCapRatioOnd4[0]:0}:{<I}
.Data1                  KBWOpInvCapRatioond4
.Stripe                 =
.EndIf
.EndIf
.Skip                   Min(#Freelines#,3)
.EndIf
.EndsumTypeface         Org
.EndOfSubReport

.Quit
;----------------------------------------------------------------------
