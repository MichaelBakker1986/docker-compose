LGD Score Basic
@Author DEMO
@themes LGD Score basic

Scenario: Verify LGD Score calculations
Given a document of the model type LGD
When FacilityInputContainer(John) is set to John
When CollateralAgreementDefinitionCode(John,Sara) is set to 100
When SecuredAmount(John,Sara) is set to 100
Then SecuredAmount(John,Sara) should be 100

@Given a Context(Jan) (But this should also be possible for, Given a Context(TRIODOS,Jan) - Needs further research
@#TCONSOLID(TEST)#
Given a document of the model type LGD
Given a document of the model type LGD
Given a document of the model type LGD