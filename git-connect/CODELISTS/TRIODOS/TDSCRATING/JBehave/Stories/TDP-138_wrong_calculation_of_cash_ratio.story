Rating issue TDP-138
@Author Luuk Peters
@themes issue TDP-138

Scenario: TDP-138 wrong calculation of cash ratio in scoretype card Cultural and Social
Given document Testdata/5571_Guideposts_Trust_Limited_isEntered.xml of the model type TDSCRATING
Then variable CashRatio should have 3 decimals rounded value 0.047 for document
And variable VAR15D should have value 1.5 - 4 for document
And variable VAR16D for document should be entered
And variable VAR16D should have value 0.1 - 0.5 for document

Scenario: Correct calculation of cash ratio in scoretype card Cultural and Social
Given document Testdata/5571_Guideposts_Trust_Limited_isEnteredFalse.xml of the model type TDSCRATING
Then variable CashRatio should have 3 decimals rounded value 0.047 for document
And variable VAR15D should have value 1.5 - 4 for document
And variable VAR16D for document should be not entered
And variable VAR16D should have value < 0.1 for document
