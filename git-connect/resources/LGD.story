LGD Score Basic
@Author DEMO
@themes LGD Score basic

Scenario: Verify LGD Score calculations
Given a document of the model type LGD

When SecuredAmount(213) is set to 21000

@Collateral PandHypotheek
And CollateralObject(213,SecureCollateral) is set to PandHypotheek
And MarketValue(213,SecureCollateral) is set to 10000
And Discount(213,SecureCollateral) is set to 2000

Then CollateralObjectECValue(213,SecureCollateral) should be 7000
And CollateralECValue(213) should be 7000

And RecoveryValue should be 7000

@Collateral Investment
And CollateralObject(213,Investment) is set to Investment
And MarketValue(213,Investment) is set to 10000
And Discount(213,Investment) is set to 2000

Then CollateralObjectECValue(213,Investment) should be 7000
And CollateralECValue(213) should be 14000

And RecoveryValue should be 14000