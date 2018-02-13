PRESCAN Score Basic
@Author DEMO
@themes PRESCAN Score basic

Scenario: Verify PRESCAN Score calculations
Given a document of the model type PRESCAN

When Vraag11 is set to 1
And Weging11 is set to 100
And TotalPrescanScore should be 100