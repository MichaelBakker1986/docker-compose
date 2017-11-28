SDRK Calculations
@Author Bernd

Scenario: VPB
																																					
Given a document of the model type SDRK

When variable DeliveryType is set to 2 for document                     
Then variable ForecastYears should not be visible
And variable EndDate should be visible
And variable Rechtsvorm should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document        

When variable EndDate is set to 2016-12-31 for document
Then variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable FrcRptVpb2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document

Scenario: Vereniging of stichting
																																					
Given a document of the model type SDRK

When variable DeliveryType is set to 0 for document                     
Then variable Rechtsvorm should be visible
And variable ForecastYears should not be visible
And variable EndDate should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable Rechtsvorm is set to 7 for document                     
Then variable EndDate should be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable EndDate is set to 2016-12-31 for document
Then variable ForecastYears should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable IsAgro is set to 1 for document
Then variable ForecastYears should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable FrcRptKredietStichtingenVerenigingen2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document

When variable Rechtsvorm is set to 8 for document
Then variable ForecastYears should not be visible 
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should be visible
And variable IsPLFunctional should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable FrcRptKredietStichtingenVerenigingen2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document

Scenario: IB
																																					
Given a document of the model type SDRK

When variable DeliveryType is set to 1 for document                     
Then variable ForecastYears should be visible
And variable Rechtsvorm should not be visible
And variable EndDate should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable ForecastYears is set to 1 for document
Then variable Rechtsvorm should be visible                     
And variable EndDate should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document
                                                              
When variable Rechtsvorm is set to 2 for document                     
Then variable IBofJR should be visible
And variable EndDate should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable IBofJR is set to 1 for document                     
Then variable EndDate should be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable EndDate is set to 2016-12-31 for document
Then variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable FrcRptIhzAangifte2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document


Scenario: IBPLUS
																																					
Given a document of the model type SDRK

When variable DeliveryType is set to 0 for document                     
Then variable Rechtsvorm should be visible                     
And variable ForecastYears should not be visible
And variable EndDate should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable Rechtsvorm is set to 1 for document                     
Then variable EndDate should be visible                     
And variable ForecastYears should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable EndDate is set to 2016-12-31 for document
Then variable IsAgro should be visible
And variable IsPLFunctional should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document
                                                  
When variable IsAgro is set to 1 for document
Then variable IsPLFunctional should be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable IsAgro is set to 0 for document
Then variable IsPLFunctional should be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable IsPLFunctional is set to 0 for document
Then variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable FrcRptIhzAangifteMetWinstbijlageCategoriaal2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document           

When variable IsPLFunctional is set to 1 for document
Then variable FrcRptIhzAangifteMetWinstbijlageFunctioneel2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document 

When variable DeliveryType is set to 1 for document
Then variable ForecastYears should be visible
And variable ScenarioAvailable should have value 0 for document

When variable ForecastYears is set to 2 for document
Then variable FrcRptIhzPrognosePeriodiekAangifteMetWinstbijlageFunctioneel2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document                                                           

When variable IsPLFunctional is set to 0 for document                                                                                                        
Then variable FrcRptIhzPrognosePeriodiekAangifteMetWinstbijlageCategoriaal2016_Proposed should have value True for document 
And variable ScenarioAvailable should have value 1 for document

Scenario: Micro

Given a document of the model type SDRK

When variable DeliveryType is set to 0 for document                     
And variable Rechtsvorm is set to 5 for document
Then variable EndDate should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should be visible
And variable NettoOmzet should be visible
And variable AantalMedewerkers should be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable BalansTotaal is set to 0 for document  
Then variable EndDate should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable IBofJR should not be visible
And variable NettoOmzet should be visible
And variable AantalMedewerkers should be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable NettoOmzet is set to 0 for document  
Then variable EndDate should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should be visible
And variable AantalMedewerkers should be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable AantalMedewerkers is set to 3 for document  
Then variable EndDate should be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable IBofJR should not be visible
And variable NettoOmzet should be visible
And variable BalansTotaal should be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document
And variable Micro should have value Ja for document 

When variable EndDate is set to 2016-12-31 for document
Then variable IsAgro should be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 
                                                  
When variable IsAgro is set to 1 for document
Then variable IsPLFunctional should be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document  

When variable IsPLFunctional is set to 0 for document
Then variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable FrcRptKredietMicroCategoriaal2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document            

When variable IsPLFunctional is set to 1 for document
Then variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable FrcRptKredietMicroFunctioneel2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document 

When variable DeliveryType is set to 1 for document
Then variable ForecastYears should be visible
And variable ScenarioAvailable should have value 0 for document

When variable ForecastYears is set to 1 for document
Then variable FrcRptKredietPrognosePeriodiekMicroFunctioneel2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document
                                                           
When variable IsPLFunctional is set to 0 for document                                                                                                       
Then variable FrcRptKredietPrognosePeriodiekMicroCategoriaal2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document

Scenario: Klein

Given a document of the model type SDRK

When variable DeliveryType is set to 0 for document                     
And variable Rechtsvorm is set to 5 for document
Then variable EndDate should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should be visible
And variable NettoOmzet should be visible
And variable AantalMedewerkers should be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable BalansTotaal is set to 1 for document  
Then variable EndDate should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable IBofJR should not be visible
And variable NettoOmzet should be visible
And variable AantalMedewerkers should be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable NettoOmzet is set to 1 for document  
Then variable EndDate should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should be visible
And variable AantalMedewerkers should be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable AantalMedewerkers is set to 3 for document  
Then variable EndDate should be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable IBofJR should not be visible
And variable NettoOmzet should be visible
And variable BalansTotaal should be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document
And variable Klein should have value Ja for document 

When variable EndDate is set to 2016-12-31 for document
Then variable IsAgro should be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 
                                                  
When variable IsAgro is set to 1 for document
Then variable IsPLFunctional should be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document  

When variable IsPLFunctional is set to 0 for document
Then variable EnkelvoudigOfGeconsolideerd should be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable EnkelvoudigOfGeconsolideerd is set to 1 for document
Then variable FiscaalOfCommercieel should be visible
And variable ScenarioAvailable should have value 0 for document 

When variable FiscaalOfCommercieel is set to 1 for document
Then variable FrcRptKredietKleinCategoriaal2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document            

When variable IsPLFunctional is set to 1 for document
Then variable FrcRptKredietKleinFunctioneel2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document 

When variable DeliveryType is set to 1 for document
Then variable ForecastYears should be visible
And variable ScenarioAvailable should have value 0 for document

When variable ForecastYears is set to 1 for document
Then variable FrcRptKredietPrognosePeriodiekKleinFunctioneel2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document
                                                           
When variable IsPLFunctional is set to 0 for document                                                                                                       
Then variable FrcRptKredietPrognosePeriodiekKleinCategoriaal2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document

Scenario: NP

Given a document of the model type SDRK

When variable DeliveryType is set to 0 for document                     
Then variable Rechtsvorm should be visible
And variable EndDate should not be visible
And variable IBofJR should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable Rechtsvorm is set to 2 for document                     
Then variable EndDate should not be visible
And variable IBofJR should be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable IBofJR is set to 0 for document  
Then variable EndDate should be visible
And variable IsAgro should not be visible
And variable IsPLFunctional should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document

When variable EndDate is set to 2016-12-31 for document
Then variable IsAgro should be visible
And variable IsPLFunctional should not be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document
                                                  
When variable IsAgro is set to 1 for document
Then variable IsPLFunctional should be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable IsAgro is set to 0 for document
Then variable IsPLFunctional should be visible
And variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable ScenarioAvailable should have value 0 for document 

When variable IsPLFunctional is set to 0 for document
Then variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable FrcRptKredietKleinNatuurlijkPersoonCategoriaal2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document           

When variable IsPLFunctional is set to 1 for document
Then variable BalansTotaal should not be visible
And variable NettoOmzet should not be visible
And variable AantalMedewerkers should not be visible
And variable EnkelvoudigOfGeconsolideerd should not be visible
And variable FiscaalOfCommercieel should not be visible
And variable FrcRptKredietKleinNatuurlijkPersoonFunctioneel2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document         

When variable DeliveryType is set to 1 for document
Then variable ForecastYears should be visible
And variable ScenarioAvailable should have value 0 for document

When variable ForecastYears is set to 1 for document
Then variable FrcRptKredietPrognosePeriodiekKleinNatuurlijkPersoonFunctioneel2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document                                                                  

When variable IsPLFunctional is set to 0 for document                                                                                                        
Then variable FrcRptKredietPrognosePeriodiekKleinNatuurlijkPersoonCategoriaal2016_Proposed should have value True for document
And variable ScenarioAvailable should have value 1 for document        