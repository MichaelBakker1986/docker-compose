FMA KOPPELRAPPORTAGE
.MenuHelp           Bestemd voor koppeling andere applicaties
.HideMenuItem       On
;
;
.PromptOnOverwrite  Off
.DestFileSpec       #ExportFolder#\#DocumentCode#.fma
.Header             None
.SetCurrency        Eur,View
.NumberFormat       Data
.PageNumber         None
.TitleWidth         35
.Tab                50
.Scale              1
.SetCurrency        Eur,  Script
.LM                 0
;
FMA KOPPELBESTAND
.Skip               1
.ValCheck           No                                                               ;; Ivm rapporteren op schaal is 1
.Tab                30,70,90
[DEFFMA]
.SetCurrency   EUR, View
DataKey{tab}= #DocumentCode#
CURRENCY{TAB}= #CurrencyCode#
SCALE{TAB}= #Scale#
DATUM{TAB}= #Date#
MODELCODE{TAB}= #ModelCode#
BIKCODE{TAB}= {SECTORCODE}
NAAMBEDR{TAB}= {[1] NAAMBEDR}
ADRESBEDR{TAB}= {[1] ADRESBEDR}
POSTCODEBEDR{TAB}= {[1] POSTCODEBEDR}
PLAATSBEDR{TAB}= {[1]PLAATSBEDR}
.Skip 1
;—————————————————————————————————————————————————————————————————————————————
.Let beginjaar = ThisYear-4
.Let eindjaar  = ThisYear+2

.Let JAAR = #BEGINJAAR#

.Repeat

.Let                J1=TinPYTT(PeriodInSheet,#JAAR#)
  .Let EMELDING       = ""
.Range              [#J1#]
.If                 (BalAkt[#J1#]>0) OR (RESNABEL[#J1#]<>NA)
  ;
.Else
  .Let EMELDING       = "GEEN_CIJFERS_IN_BALANS_EN_RESREK"
.EndIf

.If                 (BalTest[#J1#]=NA )
  ;
.Else
.Let EMELDING       = "GEEN_EVENWICHT_IN_BALANS"
.EndIf

.If                 ((ResRekTest[#J1#]=0)or(ResRekTest[#J1#]=NA))
  ;
.Else
  .Let EMELDING       = "GEEN_VERMOGENSAANSLUITING"
.EndIf
.If                 (#J1#<1)
  .Let EMELDING       = "JAAR_NIET_AANWEZIG"
.Else
.If                 (YearInT(FirstTinFormulaSet(Trend,MainPeriod)) <= #Jaar#)
  .Let EMELDING       = "GEEN_HISTORISCH_JAAR"
.EndIf
.EndIf
.Skip 1

.If "#$EMELDING#" <> ""                                                        ;; GETALLEN als NA weer geven!
E#JAAR#{TAB}= #$EMELDING#
.Else
E#JAAR#{TAB}= OK
.Range [@]
.Let                                                                           VarNameFINAN = "DAKOPV"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "TOTKRACHT"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "SUMCODE"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "IMMATAKT"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "ONRGOED"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "BEDRUITR"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "FINVASTAKT"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "VRD"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "VORD"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "LIQMID"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "EIGENVERM"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "VOORZ"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "LANGVV"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "KORTVV"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "AFLKJ"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "RCBANK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "HANDCRED"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "BELPREMIES"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
;—————————————————————————————————————————————————————————————————————————————
.Let                                                                           VarNameFINAN = "NETTOOMZET"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "PRODVRDMUT"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "INKW"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "BRUTOWINST"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "OVBEDROPBR"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "BEDRK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "PERSK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "PRODK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "INVENTK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "GEBK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "TRANSPK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "VerkoopK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "ALGK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "OVK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "AKTAFS"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "IMMATAKTAFS"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "ONRGOEDAFS"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "BEDRUITRAFS"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "BEDRRES"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "FINBATEN"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "FINLASTEN"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "GEWRESVOORBEL"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "BUITRES"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "WINSTBEL"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "AANDEELRESDEELN"  ;; LET OP AAA MODEL!
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "RESAandDerden"  ;; LET OP AAA MODEL!
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "RESNABEL"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
;—————————————————————————————————————————————————————————————————————————————

;;.Let                                                                           VarNameFINAN = "GEWK"
;;#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "GEWProdK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "GEWHuisVK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "GEWLoonOnd"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "GEWOVK"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "GEWRente"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}

.Let                                                                           VarNameFINAN = "WINSTVOORDELING"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "UITWINST"
#JAAR#UITWINST{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "STORTING"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "OVMUTEIGENVERM"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}
.Let                                                                           VarNameFINAN = "MUTEIGENVERM"
#JAAR##VARNAMEFINAN#{TAB}= {[#j1#\CUM] #VarNameFINAN#:0}



  .EndIf
  .Let JAAR=#JAAR#+1
.Until #JAAR#=#EINDJAAR#
[END]

.Quit

