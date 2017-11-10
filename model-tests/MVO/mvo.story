MVO Score Basic
@Author Hilde de Jong
@themes MVO Score basic

Scenario: Verify MVO Score calculations
Given a document of the model type MVO
When variable Q_Map01_Vraag01 is set to 1 for document
And variable Q_Map01_Vraag02 is set to 1 for document
And variable Q_Map01_Vraag03 is set to 1 for document
And variable Q_Map01_Vraag04 is set to 1 for document
And variable Q_Map01_Vraag05 is set to 1 for document
And variable Q_Map01_Vraag06 is set to 1 for document
And variable Q_Map01_Vraag07 is set to 1 for document
And variable Q_Map01_Vraag08 is set to 1 for document
And variable Q_Map01_Vraag09 is set to 1 for document
And variable Q_Map01_Vraag10 is set to 1 for document
And variable Q_Map01_Vraag11 is set to 1 for document
And variable Q_Map01_Vraag12 is set to 1 for document
And variable Q_Map01_Vraag13 is set to 0 for document
And variable Q_Map01_Vraag14 is set to 0 for document
And variable Q_Map02_Vraag01 is set to 1 for document
And variable Q_Map02_Vraag02 is set to 0 for document
And variable Q_Map03_Gewicht_Vraag05_Input is set to 50 for document
And variable Q_Map03_Vraag01 is set to 1 for document
And variable Q_Map03_Vraag02 is set to 1 for document
And variable Q_Map03_Vraag03 is set to 1 for document
And variable Q_Map03_Vraag04 is set to 0 for document
And variable Q_Map03_Vraag05 is set to 1 for document
And variable Q_Map03_Vraag06 is set to 1 for document
And variable Q_Map03_Vraag07 is set to 1 for document
And variable Q_Map03_Vraag08 is set to 1 for document
And variable Q_Map03_Vraag09 is set to 0 for document
And variable Q_Map03_Vraag10 is set to 1 for document
And variable Q_Map03_Vraag11 is set to 0 for document
And variable Q_Map03_Vraag12 is set to 1 for document
And variable Q_Map03_Vraag13 is set to 1 for document
And variable Q_Map03_Vraag14 is set to 1 for document
And variable Q_Map04_Vraag01 is set to 1 for document
And variable Q_Map04_Vraag02 is set to 1 for document
And variable Q_Map04_Vraag03 is set to 1 for document
And variable Q_Map04_Vraag04 is set to 1 for document
And variable Q_Map04_Vraag05 is set to 0 for document
And variable Q_Map04_Vraag06 is set to 0 for document
And variable Q_Map04_Vraag07 is set to 0 for document
And variable Q_Map04_Vraag08 is set to 0 for document
And variable Q_Map04_Vraag09 is set to 1 for document
And variable Q_Map04_Vraag10 is set to 1 for document
And variable Q_Map04_Vraag11 is set to 0 for document
And variable Q_Map04_Vraag12 is set to 0 for document
Then variable Q_Map01_SubScore01 should have 0 decimals rounded value 14 for document
And variable Q_Map01_SubScore02 should have 0 decimals rounded value 14 for document
And variable Q_Map01_SubScore03 should have 0 decimals rounded value 14 for document
And variable Q_Map01_SubScore04 should have 0 decimals rounded value 14 for document
And variable Q_Map01_SubScore05 should have 0 decimals rounded value 14 for document
And variable Q_Map01_SubScore06 should have 0 decimals rounded value 14 for document
And variable Q_Map01_SubScore07 should have 0 decimals rounded value 0 for document
And variable Q_Map01_Score01 should have 0 decimals rounded value 86 for document
And variable Q_Map02_Score01 should have 0 decimals rounded value 50 for document
And variable Q_Map03_Gewicht_Vraag06_Input should have 0 decimals rounded value 50 for document
And variable Q_Map03_GewichtTotaal should have 0 decimals rounded value 100 for document
And variable Q_Map03_Gewicht_Vraag05 should have 0 decimals rounded value 8 for document
And variable Q_Map03_Gewicht_Vraag06 should have 0 decimals rounded value 8 for document
And variable Q_Map03_GewichtTotaal_Omgerekend should have 0 decimals rounded value 17 for document
And variable Q_Map03_SubScore01 should have 0 decimals rounded value 17 for document
And variable Q_Map03_SubScore02 should have 0 decimals rounded value 8 for document
And variable Q_Map03_SubScore03 should have 0 decimals rounded value 17 for document
And variable Q_Map03_SubScore04 should have 0 decimals rounded value 17 for document
And variable Q_Map03_SubScore05 should have 0 decimals rounded value 4 for document
And variable Q_Map03_SubScore06 should have 0 decimals rounded value 4 for document
And variable Q_Map03_SubScore07 should have 0 decimals rounded value 17 for document
And variable Q_Map03_Score01 should have 0 decimals rounded value 83 for document
And variable Q_Map04_SubScore01 should have 0 decimals rounded value 100 for document
And variable Q_Map04_SubScore02 should have 0 decimals rounded value 0 for document
And variable Q_Map04_SubScore03 should have 0 decimals rounded value 40 for document
And variable Q_Map04_Score01 should have 0 decimals rounded value 47 for document