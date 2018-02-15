PRESCAN Score Basic
@Author DEMO
@themes PRESCAN Score basic

Scenario: Verify PRESCAN Score calculations
Given a document of the model type PRESCAN

When Vraag11 is set to 1
When Vraag12 is set to 1
When Vraag13 is set to 1
When Vraag14 is set to 1
When Vraag15 is set to 1
When Vraag21 is set to 1
When Vraag22 is set to 1
When Vraag23 is set to 1
When Vraag24 is set to 1
When Vraag25 is set to 1
When Vraag31 is set to 1
When Vraag32 is set to 1
When Vraag33 is set to 1
When Vraag34 is set to 1
When Vraag35 is set to 1
When Weging11 is set to 1
When Weging12 is set to 1
When Weging13 is set to 1
When Weging14 is set to 1
When Weging15 is set to 1
When Weging21 is set to 1
When Weging22 is set to 1
When Weging23 is set to 1
When Weging24 is set to 1
When Weging25 is set to 1
When Weging31 is set to 1
When Weging32 is set to 1
When Weging33 is set to 1
When Weging34 is set to 1
When Weging35 is set to 1
When PrescanScorecard is set to 1

Then Score should be 15
Then PRESCAN should be 15
Then VragenVent should be 0
Then VragenTent should be 0
Then VragenCent should be 0
Then WegingenVent should be 0
Then WegingenTent should be 0
Then WegingenCent should be 0
Then ScoreStap should be 0