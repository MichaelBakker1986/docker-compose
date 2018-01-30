LGD Score Basic
@Author DEMO
@themes LGD Score basic

Scenario: Verify LGD Score calculations
Given a document of the model type LGD
When CollateralAgreement(John) is set to abc123
When CollateralAgreementAmount(John) is set to 200
And CollateralAgreement(Sara) is set to abc124
And CollateralAgreementAmount(Sara) is set to 100
And CollateralAgreement(Sara2) is set to abc124

Then LGDCalculationOutputContainer should be 3
And LGDClass should be 200

@Given a Context(Jan) (But this should also be possible for, Given a Context(TRIODOS,Jan) - Needs further research
@#TCONSOLID(TEST)#
Given a document of the model type LGD
Given a document of the model type LGD
Given a document of the model type LGD