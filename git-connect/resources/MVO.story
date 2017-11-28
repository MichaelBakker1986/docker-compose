MVO Score Basic
@Author Hilde de Jong
@themes MVO Score basic

Scenario: Verify MVO Score calculations
Given a document of the model type MVO
When variable Q_MAP01_VRAAG01 is set to 1 for document
And variable Q_MAP01_VRAAG02 is set to 1 for document
And variable Q_MAP01_VRAAG03 is set to 1 for document
And variable Q_MAP01_VRAAG04 is set to 1 for document
And variable Q_MAP01_VRAAG05 is set to 1 for document
And variable Q_MAP01_VRAAG06 is set to 1 for document
And variable Q_MAP01_VRAAG07 is set to 1 for document
And variable Q_MAP01_VRAAG08 is set to 1 for document
And variable Q_MAP01_VRAAG09 is set to 1 for document
And variable Q_MAP01_VRAAG10 is set to 1 for document
And variable Q_MAP01_VRAAG11 is set to 1 for document
And variable Q_MAP01_VRAAG12 is set to 1 for document
And variable Q_MAP01_VRAAG13 is set to 0 for document
And variable Q_MAP01_VRAAG14 is set to 0 for document
And variable Q_MAP02_VRAAG01 is set to 1 for document
And variable Q_MAP02_VRAAG02 is set to 0 for document
And variable Q_MAP03_GEWICHT_VRAAG05_INPUT is set to 50 for document
And variable Q_MAP03_VRAAG01 is set to 1 for document
And variable Q_MAP03_VRAAG02 is set to 1 for document
And variable Q_MAP03_VRAAG03 is set to 1 for document
And variable Q_MAP03_VRAAG04 is set to 0 for document
And variable Q_MAP03_VRAAG05 is set to 1 for document
And variable Q_MAP03_VRAAG06 is set to 1 for document
And variable Q_MAP03_VRAAG07 is set to 1 for document
And variable Q_MAP03_VRAAG08 is set to 1 for document
And variable Q_MAP03_VRAAG09 is set to 0 for document
And variable Q_MAP03_VRAAG10 is set to 1 for document
And variable Q_MAP03_VRAAG11 is set to 0 for document
And variable Q_MAP03_VRAAG12 is set to 1 for document
And variable Q_MAP03_VRAAG13 is set to 1 for document
And variable Q_MAP03_VRAAG14 is set to 1 for document
And variable Q_MAP04_VRAAG01 is set to 1 for document
And variable Q_MAP04_VRAAG02 is set to 1 for document
And variable Q_MAP04_VRAAG03 is set to 1 for document
And variable Q_MAP04_VRAAG04 is set to 1 for document
And variable Q_MAP04_VRAAG05 is set to 0 for document
And variable Q_MAP04_VRAAG06 is set to 0 for document
And variable Q_MAP04_VRAAG07 is set to 0 for document
And variable Q_MAP04_VRAAG08 is set to 0 for document
And variable Q_MAP04_VRAAG09 is set to 1 for document
And variable Q_MAP04_VRAAG10 is set to 1 for document
And variable Q_MAP04_VRAAG11 is set to 0 for document
And variable Q_MAP04_VRAAG12 is set to 0 for document
Then variable Q_MAP01_SUBSCORE01 should have 0 decimals rounded value 14 for document
And variable Q_MAP01_SUBSCORE02 should have 0 decimals rounded value 14 for document
And variable Q_MAP01_SUBSCORE03 should have 0 decimals rounded value 14 for document
And variable Q_MAP01_SUBSCORE04 should have 0 decimals rounded value 14 for document
And variable Q_MAP01_SUBSCORE05 should have 0 decimals rounded value 14 for document
And variable Q_MAP01_SUBSCORE06 should have 0 decimals rounded value 14 for document
And variable Q_MAP01_SUBSCORE07 should have 0 decimals rounded value 0 for document
And variable Q_MAP01_SCORE01 should have 0 decimals rounded value 86 for document
And variable Q_MAP02_SCORE01 should have 0 decimals rounded value 50 for document
And variable Q_MAP03_GEWICHT_VRAAG06_INPUT should have 0 decimals rounded value 50 for document
And variable Q_MAP03_GEWICHTTOTAAL should have 0 decimals rounded value 100 for document
And variable Q_MAP03_GEWICHT_VRAAG05 should have 0 decimals rounded value 8 for document
And variable Q_MAP03_GEWICHT_VRAAG06 should have 0 decimals rounded value 8 for document
And variable Q_MAP03_GEWICHTTOTAAL_OMGEREKEND should have 0 decimals rounded value 17 for document
And variable Q_MAP03_SUBSCORE01 should have 0 decimals rounded value 17 for document
And variable Q_MAP03_SUBSCORE02 should have 0 decimals rounded value 8 for document
And variable Q_MAP03_SUBSCORE03 should have 0 decimals rounded value 17 for document
And variable Q_MAP03_SUBSCORE04 should have 0 decimals rounded value 17 for document
And variable Q_MAP03_SUBSCORE05 should have 0 decimals rounded value 4 for document
And variable Q_MAP03_SUBSCORE06 should have 0 decimals rounded value 4 for document
And variable Q_MAP03_SUBSCORE07 should have 0 decimals rounded value 17 for document
And variable Q_MAP03_SCORE01 should have 0 decimals rounded value 83 for document
And variable Q_MAP04_SUBSCORE01 should have 0 decimals rounded value 100 for document
And variable Q_MAP04_SUBSCORE02 should have 0 decimals rounded value 0 for document
And variable Q_MAP04_SUBSCORE03 should have 0 decimals rounded value 40 for document
And variable Q_MAP04_SCORE01 should have 0 decimals rounded value 47 for document