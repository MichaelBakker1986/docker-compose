const assert = require('assert');
require('../exchange_modules/ffl/RegisterPlainFFLDecorator');
require('../exchange_modules/swagger/swaggerParser');
require('../../math/ff-math');
PPMT = function() {
    return 1;
}
const WorkBook = require('../src/JSWorkBook');
const Context = require('../src/Context')
const fflTestModels = ['KSP'];
const fs = require('fs')

const preview = {
    "value": {
        "value": 0,
        "visible": true,
        "required": false,
        "locked": true,
        "entered": false,
        "validation": false,
        "title": "Your Personal situation",
        "choices": [
            {
                "name": "0",
                "value": "Complete"
            },
            {
                "name": "1",
                "value": "Incomplete"
            }
        ]
    },
    "data": [
        {
            "value": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Your Personal Situation"
            },
            "TotalNetCosts": {
                "value": 2352.89,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total Net Costs"
            },
            "Age": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Age"
            },
            "Furniture": {
                "value": 1800,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Furniture"
            },
            "ActualChildCareCosts": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Childcare costs"
            },
            "ActualDiapers": {
                "value": 300,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Diapers"
            },
            "ActualFood": {
                "value": 967.25,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Food"
            },
            "ActualClothingCosts": {
                "value": 360,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Clothing"
            },
            "ActualPersonalCareCosts": {
                "value": 150,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "PersonalCare"
            },
            "Hairdresser": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Hairdresser"
            },
            "Inventory": {
                "value": 120,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Inventory"
            },
            "Allowance": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Allowance"
            },
            "Contributions": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Contributions"
            },
            "Transport": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Transport"
            },
            "MobilePhone": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "MobilePhone"
            },
            "DrivingLicense": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "DrivingLicense"
            },
            "CostsForOutOfSchoolCare": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Kosten BSO"
            },
            "CostsForPrimaryEducation": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Costs for Primary Education"
            },
            "CostsForSecondaryEducation": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Costs for Secondary Education"
            },
            "CostsUnspecifiedPerYear": {
                "value": 600,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Costs unspecified per year"
            },
            "TotalYearlyCosts": {
                "value": 4297.25,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total (yearly) costs"
            },
            "TotalMonthlyCosts": {
                "value": 358.1,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total (monthly) costs"
            },
            "TotalYearlyAllowancePoint": {
                "value": 1944.36,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Child-related Income"
            },
            "ChildBenefits": {
                "value": 802.36,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Child benefits"
            },
            "ChildCarePremiumOverview": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Childcare premium"
            },
            "ChildcareBudgetOverview": {
                "value": 1142,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Childcare budget"
            },
            "CombinationDiscountOverview": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Combination Discount"
            },
            "TotalYearlyAllowance": {
                "value": 1944.36,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total (yearly) allowance"
            },
            "TotalYearlyBalance": {
                "value": 2352.89,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total Net Costs"
            },
            "TotalMonthlyBalanceAverage": {
                "value": 196.07,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total monthly Net Costs, monthly()"
            }
        },
        {
            "value": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Your Personal Situation"
            },
            "TotalNetCosts": {
                "value": 552.89,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total Net Costs"
            },
            "Age": {
                "value": 1,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Age"
            },
            "Furniture": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Furniture"
            },
            "ActualChildCareCosts": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Childcare costs"
            },
            "ActualDiapers": {
                "value": 300,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Diapers"
            },
            "ActualFood": {
                "value": 967.25,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Food"
            },
            "ActualClothingCosts": {
                "value": 360,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Clothing"
            },
            "ActualPersonalCareCosts": {
                "value": 150,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "PersonalCare"
            },
            "Hairdresser": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Hairdresser"
            },
            "Inventory": {
                "value": 120,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Inventory"
            },
            "Allowance": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Allowance"
            },
            "Contributions": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Contributions"
            },
            "Transport": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Transport"
            },
            "MobilePhone": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "MobilePhone"
            },
            "DrivingLicense": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "DrivingLicense"
            },
            "CostsForOutOfSchoolCare": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Kosten BSO"
            },
            "CostsForPrimaryEducation": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Costs for Primary Education"
            },
            "CostsForSecondaryEducation": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Costs for Secondary Education"
            },
            "CostsUnspecifiedPerYear": {
                "value": 600,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Costs unspecified per year"
            },
            "TotalYearlyCosts": {
                "value": 2497.25,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total (yearly) costs"
            },
            "TotalMonthlyCosts": {
                "value": 208.1,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total (monthly) costs"
            },
            "TotalYearlyAllowancePoint": {
                "value": 1944.36,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Child-related Income"
            },
            "ChildBenefits": {
                "value": 802.36,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Child benefits"
            },
            "ChildCarePremiumOverview": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Childcare premium"
            },
            "ChildcareBudgetOverview": {
                "value": 1142,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Childcare budget"
            },
            "CombinationDiscountOverview": {
                "value": 0,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Combination Discount"
            },
            "TotalYearlyAllowance": {
                "value": 1944.36,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total (yearly) allowance"
            },
            "TotalYearlyBalance": {
                "value": 552.89,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total Net Costs"
            },
            "TotalMonthlyBalanceAverage": {
                "value": 46.07,
                "visible": true,
                "required": false,
                "locked": true,
                "entered": false,
                "validation": false,
                "title": "Total monthly Net Costs, monthly()"
            }
        }
    ],
    "TotalGrossCostsChildTillEighteen": {
        "value": 72891.55,
        "visible": true,
        "required": false,
        "locked": true,
        "entered": false,
        "validation": false,
        "title": "Total Gross costs of a child from 0 to 18 years old"
    },
    "TotalNettCostsChildTillEighteen": {
        "value": 33028.51,
        "visible": true,
        "required": false,
        "locked": true,
        "entered": false,
        "validation": false,
        "title": "Total Gross costs of a child from 0 to 18 years old"
    }
}
for (var i = 0; i < fflTestModels.length; i++) {
    var fflModelName = fflTestModels[i];
    var data = fs.readFileSync(__dirname + '/../resources/' + fflModelName + '.ffl', 'utf8');
    var wb = new WorkBook(new Context());
    wb.importSolution(data, 'ffl');
    var swaggerDefinition = wb.export('swagger', {
        rowId: 'KinderSpaarPlan',
        type: 'input'
    })

    var result = {
        "name": "request",
        "in": "body",
        "description": "",
        "required": false,
        "schema": swaggerDefinition
    }
    var swaggerDefinitionOutput = wb.export('swagger', {
        rowId: 'Q_MAP06',
        type: 'output'
    })
    /*   var outputResult = {
           "type": "array",
           "items": swaggerDefinitionOutput
       }*/
    // console.info(JSON.stringify(swaggerDefinitionOutput, null, 2))
    // assert(JSON.stringify(swaggerDefinitionOutput, null, 2).length == 5623)
}