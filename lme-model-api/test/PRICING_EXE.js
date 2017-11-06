/* AABPRICING_RootSub1_value:undefined */
require('../../ff-fes-xlsx/ff-fes-xlsx')
function RootSub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_RootSub1_title:'General variables for webclient' */
function RootSub1_title(f, x, y, z, v) {
    return 'General variables for webclient';
}

/* AABPRICING_RootSub1_locked:1 */
function RootSub1_locked(f, x, y, z, v) {
    return 1;
}

/* AABPRICING_RootSub1_visible:0 */
function RootSub1_visible(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_FES_LAYOUTNR_value:If(Pos('IFRS-EU',FES_LAYOUT[doc])>0,1,If(Pos('IFRS-PL',FES_LAYOUT[doc])>0,48,If(Pos('IFRS-Intl',FES_LAYOUT[doc])>0,2,0))) */
function FES_LAYOUTNR_value(f, x, y, z, v) {
    return Pos(
        'IFRS-EU',
        FES_LAYOUT_value(
            '100010',
            x.doc,
            y.base,
            z,
            v
        )
    ) >
    0 ? 1 : Pos(
        'IFRS-PL',
        FES_LAYOUT_value(
            '100010',
            x.doc,
            y.base,
            z,
            v
        )
    ) >
    0 ? 48 : Pos(
        'IFRS-Intl',
        FES_LAYOUT_value(
            '100010',
            x.doc,
            y.base,
            z,
            v
        )
    ) > 0 ? 2 : 0;
}

/* AABPRICING_FES_LAYOUTNR_title:'Layout' */
function FES_LAYOUTNR_title(f, x, y, z, v) {
    return 'Layout';
}

/* AABPRICING_FES_LAYOUTNR_choices:[{'name':' 0','value':' NA'},{'name':'1','value':' IFRS-EU'},{'name':'2','value':' IFRS'},{'name':'48','value':' Polish'}] */
function FES_LAYOUTNR_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': ' NA'}, {'name': '1', 'value': ' IFRS-EU'}, {
        'name': '2',
        'value': ' IFRS'
    }, {'name': '48', 'value': ' Polish'}];
}

/* AABPRICING_FES_EXCHANGE_RATES_value:undefined */
function FES_EXCHANGE_RATES_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_EXCHANGE_RATES_title:'Exchange Rates' */
function FES_EXCHANGE_RATES_title(f, x, y, z, v) {
    return 'Exchange Rates';
}

/* AABPRICING_FES_LAYOUT_value:undefined */
function FES_LAYOUT_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_LAYOUT_title:'Layout name' */
function FES_LAYOUT_title(f, x, y, z, v) {
    return 'Layout name';
}

/* AABPRICING_FES_FLATINPUT_value:undefined */
function FES_FLATINPUT_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_FLATINPUT_title:'Is flat input used (1==yes)' */
function FES_FLATINPUT_title(f, x, y, z, v) {
    return 'Is flat input used (1==yes)';
}

/* AABPRICING_FES_PROJECTION_PROFILE_value:undefined */
function FES_PROJECTION_PROFILE_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_PROJECTION_PROFILE_title:'Projection Profile' */
function FES_PROJECTION_PROFILE_title(f, x, y, z, v) {
    return 'Projection Profile';
}

/* AABPRICING_FES_COLUMN_ORDER_value:undefined */
function FES_COLUMN_ORDER_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_COLUMN_ORDER_title:'Column order' */
function FES_COLUMN_ORDER_title(f, x, y, z, v) {
    return 'Column order';
}

/* AABPRICING_FES_COLUMN_VISIBLE_value:undefined */
function FES_COLUMN_VISIBLE_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_COLUMN_VISIBLE_title:'Column visible' */
function FES_COLUMN_VISIBLE_title(f, x, y, z, v) {
    return 'Column visible';
}

/* AABPRICING_FES_STARTDATEPERIOD_value:undefined */
function FES_STARTDATEPERIOD_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_STARTDATEPERIOD_title:'Start Date Period' */
function FES_STARTDATEPERIOD_title(f, x, y, z, v) {
    return 'Start Date Period';
}

/* AABPRICING_FES_ENDDATEPERIOD_value:undefined */
function FES_ENDDATEPERIOD_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_ENDDATEPERIOD_title:'End Date Period' */
function FES_ENDDATEPERIOD_title(f, x, y, z, v) {
    return 'End Date Period';
}

/* AABPRICING_FES_BASECURRENCYPERIOD_value:undefined */
function FES_BASECURRENCYPERIOD_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_BASECURRENCYPERIOD_title:'Base Currency Period' */
function FES_BASECURRENCYPERIOD_title(f, x, y, z, v) {
    return 'Base Currency Period';
}

/* AABPRICING_FES_VIEWCURRENCYPERIOD_value:undefined */
function FES_VIEWCURRENCYPERIOD_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_VIEWCURRENCYPERIOD_title:'View Currency Period' */
function FES_VIEWCURRENCYPERIOD_title(f, x, y, z, v) {
    return 'View Currency Period';
}

/* AABPRICING_FES_COLUMNTYPE_value:undefined */
function FES_COLUMNTYPE_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FES_COLUMNTYPE_title:'Column Type' */
function FES_COLUMNTYPE_title(f, x, y, z, v) {
    return 'Column Type';
}

/* AABPRICING_FES_COLUMNTYPE_choices:[{'name':' 0','value':'History'},{'name':'1','value':'Projection'}] */
function FES_COLUMNTYPE_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'History'}, {'name': '1', 'value': 'Projection'}];
}

/* AABPRICING_RootSub2_value:undefined */
function RootSub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_RootSub2_title:'General variables for FPS database' */
function RootSub2_title(f, x, y, z, v) {
    return 'General variables for FPS database';
}

/* AABPRICING_FPS_VAR_Naam_value:undefined */
function FPS_VAR_Naam_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Naam_title:'NAME' */
function FPS_VAR_Naam_title(f, x, y, z, v) {
    return 'NAME';
}

/* AABPRICING_FPS_VAR_Relatienummer_value:undefined */
function FPS_VAR_Relatienummer_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Relatienummer_title:'CUSTOMERNUMBER' */
function FPS_VAR_Relatienummer_title(f, x, y, z, v) {
    return 'CUSTOMERNUMBER';
}

/* AABPRICING_FPS_VAR_KVKnr_value:undefined */
function FPS_VAR_KVKnr_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_KVKnr_title:'CHAMBEROFCOMMERCENUMBER' */
function FPS_VAR_KVKnr_title(f, x, y, z, v) {
    return 'CHAMBEROFCOMMERCENUMBER';
}

/* AABPRICING_FPS_VAR_Rechtsvorm_nr_value:undefined */
function FPS_VAR_Rechtsvorm_nr_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Rechtsvorm_nr_title:'LEGALSTATUSCODE' */
function FPS_VAR_Rechtsvorm_nr_title(f, x, y, z, v) {
    return 'LEGALSTATUSCODE';
}

/* AABPRICING_FPS_VAR_Rechtsvorm_omschr_value:undefined */
function FPS_VAR_Rechtsvorm_omschr_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Rechtsvorm_omschr_title:'LEGALSTATUSDESCRIPTION' */
function FPS_VAR_Rechtsvorm_omschr_title(f, x, y, z, v) {
    return 'LEGALSTATUSDESCRIPTION';
}

/* AABPRICING_FPS_VAR_BIK_CODE_value:undefined */
function FPS_VAR_BIK_CODE_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_BIK_CODE_title:'SECTOROFINDUSTRYCODE' */
function FPS_VAR_BIK_CODE_title(f, x, y, z, v) {
    return 'SECTOROFINDUSTRYCODE';
}

/* AABPRICING_FPS_VAR_SECTOR_OF_INDUSTRY_CODE_TYPE_value:undefined */
function FPS_VAR_SECTOR_OF_INDUSTRY_CODE_TYPE_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_SECTOR_OF_INDUSTRY_CODE_TYPE_title:'SECTOROFINDUSTRYCODETYPE' */
function FPS_VAR_SECTOR_OF_INDUSTRY_CODE_TYPE_title(f, x, y, z, v) {
    return 'SECTOROFINDUSTRYCODETYPE';
}

/* AABPRICING_FPS_VAR_BIK_Omschr_value:undefined */
function FPS_VAR_BIK_Omschr_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_BIK_Omschr_title:'SECTOROFINDUSTRYDESCRIPTION' */
function FPS_VAR_BIK_Omschr_title(f, x, y, z, v) {
    return 'SECTOROFINDUSTRYDESCRIPTION';
}

/* AABPRICING_FPS_VAR_GridId_value:undefined */
function FPS_VAR_GridId_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_GridId_title:'GRIDID' */
function FPS_VAR_GridId_title(f, x, y, z, v) {
    return 'GRIDID';
}

/* AABPRICING_FPS_VAR_Accountmanager_value:undefined */
function FPS_VAR_Accountmanager_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Accountmanager_title:'ACCOUNTMANAGER' */
function FPS_VAR_Accountmanager_title(f, x, y, z, v) {
    return 'ACCOUNTMANAGER';
}

/* AABPRICING_FPS_VAR_Kantoor_value:undefined */
function FPS_VAR_Kantoor_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Kantoor_title:'OFFICENUMBER' */
function FPS_VAR_Kantoor_title(f, x, y, z, v) {
    return 'OFFICENUMBER';
}

/* AABPRICING_FPS_VAR_Straat_value:undefined */
function FPS_VAR_Straat_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Straat_title:'STREET' */
function FPS_VAR_Straat_title(f, x, y, z, v) {
    return 'STREET';
}

/* AABPRICING_FPS_VAR_Housenumber_value:undefined */
function FPS_VAR_Housenumber_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Housenumber_title:'HOUSENUMBER' */
function FPS_VAR_Housenumber_title(f, x, y, z, v) {
    return 'HOUSENUMBER';
}

/* AABPRICING_FPS_VAR_Postcode_value:undefined */
function FPS_VAR_Postcode_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Postcode_title:'ZIPCODE' */
function FPS_VAR_Postcode_title(f, x, y, z, v) {
    return 'ZIPCODE';
}

/* AABPRICING_FPS_VAR_Woonplaats_value:undefined */
function FPS_VAR_Woonplaats_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Woonplaats_title:'CITY' */
function FPS_VAR_Woonplaats_title(f, x, y, z, v) {
    return 'CITY';
}

/* AABPRICING_FPS_VAR_Provincie_value:undefined */
function FPS_VAR_Provincie_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Provincie_title:'STATEORPROVINCE' */
function FPS_VAR_Provincie_title(f, x, y, z, v) {
    return 'STATEORPROVINCE';
}

/* AABPRICING_FPS_VAR_Land_value:undefined */
function FPS_VAR_Land_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Land_title:'COUNTRY' */
function FPS_VAR_Land_title(f, x, y, z, v) {
    return 'COUNTRY';
}

/* AABPRICING_FPS_VAR_BvDID_value:undefined */
function FPS_VAR_BvDID_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_BvDID_title:'Bureau van Dijk ID' */
function FPS_VAR_BvDID_title(f, x, y, z, v) {
    return 'Bureau van Dijk ID';
}

/* AABPRICING_FPS_VAR_Telefoon_value:undefined */
function FPS_VAR_Telefoon_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Telefoon_title:'Telefoonnummer' */
function FPS_VAR_Telefoon_title(f, x, y, z, v) {
    return 'Telefoonnummer';
}

/* AABPRICING_FPS_VAR_Emailadres_value:undefined */
function FPS_VAR_Emailadres_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_VAR_Emailadres_title:'Emailadres' */
function FPS_VAR_Emailadres_title(f, x, y, z, v) {
    return 'Emailadres';
}

/* AABPRICING_FPS_FINAN_USER_ROLES_value:undefined */
function FPS_FINAN_USER_ROLES_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_FINAN_USER_ROLES_title:'FPS_FINAN_USER_ROLES' */
function FPS_FINAN_USER_ROLES_title(f, x, y, z, v) {
    return 'FPS_FINAN_USER_ROLES';
}

/* AABPRICING_FPS_FINAN_USER_value:undefined */
function FPS_FINAN_USER_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FPS_FINAN_USER_title:'FPS_FINAN_USER' */
function FPS_FINAN_USER_title(f, x, y, z, v) {
    return 'FPS_FINAN_USER';
}

/* AABPRICING_Q_ROOT_value:If(Q_MAP01[doc]==1||Length(scKnockoutsCombi[doc])>0,1,0) */
function Q_ROOT_value(f, x, y, z, v) {
    return Q_MAP01_value(
        '100080',
        x.doc,
        y.base,
        z,
        v
    ) ==
    1 || Length(
        scKnockoutsCombi_value(
            '101502',
            x.doc,
            y.base,
            z,
            v
        )
    ) > 0 ? 1 : 0;
}

/* AABPRICING_Q_ROOT_title:'FiNiS Pricing' */
function Q_ROOT_title(f, x, y, z, v) {
    return 'FiNiS Pricing';
}

/* AABPRICING_Q_ROOT_choices:[{'name':' 0','value':'Complete.'},{'name':'1','value':'Not complete.'}] */
function Q_ROOT_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'Complete.'}, {'name': '1', 'value': 'Not complete.'}];
}

/* AABPRICING_Q_MAP01_value:Q_MAP01_ENTEREDREQUIREDVARS==Q_MAP01_REQUIREDVARS */
function Q_MAP01_value(f, x, y, z, v) {
    return Q_MAP01_ENTEREDREQUIREDVARS_value(
        '101453',
        x,
        y.base,
        z,
        v
        ) ==
        Q_MAP01_REQUIREDVARS_value(
            '101451',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Q_MAP01_title:'AAB Pricing' */
function Q_MAP01_title(f, x, y, z, v) {
    return 'AAB Pricing';
}

/* AABPRICING_Q_MAP01_WARNING_value:EvaluateAsString(Q_WARNING_GLOBAL[doc]) */
function Q_MAP01_WARNING_value(f, x, y, z, v) {
    return String(
        Q_WARNING_GLOBAL_value(
            '101500',
            x.doc,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Q_MAP01_WARNING_title:'Warning voor map' */
function Q_MAP01_WARNING_title(f, x, y, z, v) {
    return 'Warning voor map';
}

/* AABPRICING_Q_MAP01_INFO_value:undefined */
function Q_MAP01_INFO_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_MAP01_INFO_title:'Info bij stap' */
function Q_MAP01_INFO_title(f, x, y, z, v) {
    return 'Info bij stap';
}

/* AABPRICING_Q_MAP01_VALIDATION_value:EvaluateAsString(If(Q_MAP01[doc]==0,'Not all required questions in this step are completed. [BR][/BR]Mandatory questions are marked with a *.','')) */
function Q_MAP01_VALIDATION_value(f, x, y, z, v) {
    return String(
        Q_MAP01_value(
            '100080',
            x.doc,
            y.base,
            z,
            v
        ) == 0 ? 'Notallrequiredquestionsinthissteparecompleted.[BR][/BR]Mandatoryquestionsaremarkedwitha*.' : ''
    );
}

/* AABPRICING_Q_MAP01_VALIDATION_title:'Validatie stap' */
function Q_MAP01_VALIDATION_title(f, x, y, z, v) {
    return 'Validatie stap';
}

/* AABPRICING_Agreement_value:undefined */
function Agreement_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Agreement_title:'Agreement' */
function Agreement_title(f, x, y, z, v) {
    return 'Agreement';
}

/* AABPRICING_AgreementSub1_value:undefined */
function AgreementSub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_AgreementIdentifier_value:undefined */
function AgreementIdentifier_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_AgreementIdentifier_title:'Agreement identifier' */
function AgreementIdentifier_title(f, x, y, z, v) {
    return 'Agreement identifier';
}

/* AABPRICING_ShowTestVariables_value:0 */
function ShowTestVariables_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_ShowTestVariables_title:'Show Test Variables' */
function ShowTestVariables_title(f, x, y, z, v) {
    return 'Show Test Variables';
}

/* AABPRICING_ShowTestVariables_choices:[{'name':' 1','value':'Yes'},{'name':'0','value':'No'}] */
function ShowTestVariables_choices(f, x, y, z, v) {
    return [{'name': ' 1', 'value': 'Yes'}, {'name': '0', 'value': 'No'}];
}

/* AABPRICING_TargetRaRoRaCDriven_value:If(TupleSum(Facility_tpCustomerSpread2)==NA,1,0) */
function TargetRaRoRaCDriven_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpCustomerSpread2_value(
            '100578',
            x,
            y,
            z,
            v
        )
    ) == NA ? 1 : 0;
}

/* AABPRICING_TargetRaRoRaCDriven_title:'Target RaRoRaC Driven Calculation' */
function TargetRaRoRaCDriven_title(f, x, y, z, v) {
    return 'Target RaRoRaC Driven Calculation';
}

/* AABPRICING_AgreementHiddenfields_value:undefined */
function AgreementHiddenfields_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_AgreementHiddenfields_title:'Hidden fields for calculations' */
function AgreementHiddenfields_title(f, x, y, z, v) {
    return 'Hidden fields for calculations';
}

/* AABPRICING_AgreementHiddenfields_visible:ShowTestVariables */
function AgreementHiddenfields_visible(f, x, y, z, v) {
    return ShowTestVariables_value(
        '100093',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementNumber_value:undefined */
function AgreementNumber_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_AgreementDiversificationOR_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','OPERATIONALRISK',2) */
function AgreementDiversificationOR_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'OPERATIONALRISK',
        2
    );
}

/* AABPRICING_AgreementDiversificationOR_title:'Diversifivation Factor for Operational Risk' */
function AgreementDiversificationOR_title(f, x, y, z, v) {
    return 'Diversifivation Factor for Operational Risk';
}

/* AABPRICING_AgreementDiversificationBR_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','BUSINESSRISK',2) */
function AgreementDiversificationBR_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'BUSINESSRISK',
        2
    );
}

/* AABPRICING_AgreementDiversificationBR_title:'Diversifivation Factor for Business Risk' */
function AgreementDiversificationBR_title(f, x, y, z, v) {
    return 'Diversifivation Factor for Business Risk';
}

/* AABPRICING_AgreementDiversificationCR_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','CREDITRISK',2) */
function AgreementDiversificationCR_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'CREDITRISK',
        2
    );
}

/* AABPRICING_AgreementDiversificationCR_title:'Diversifivation Factor for Credit Risk' */
function AgreementDiversificationCR_title(f, x, y, z, v) {
    return 'Diversifivation Factor for Credit Risk';
}

/* AABPRICING_AgreementMaxRemainingTenor_value:TupleMax(Facility_tpRemainingTenor) */
function AgreementMaxRemainingTenor_value(f, x, y, z, v) {
    return TupleMax(
        Facility_tpRemainingTenor_value(
            '100615',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_AgreementMaxRemainingTenor_title:'Maximum Remaining Tenor Agreement (months)' */
function AgreementMaxRemainingTenor_title(f, x, y, z, v) {
    return 'Maximum Remaining Tenor Agreement (months)';
}

/* AABPRICING_AgreementNumberOfBorrowers_value:1 */
function AgreementNumberOfBorrowers_value(f, x, y, z, v) {
    return 1;
}

/* AABPRICING_AgreementNumberOfBorrowers_title:'Number of Borrowers' */
function AgreementNumberOfBorrowers_title(f, x, y, z, v) {
    return 'Number of Borrowers';
}

/* AABPRICING_AgreementFixedCostOperatingConcept_value:Borrower_tpAmountFixedCostOperatingConceptClientGroup */
function AgreementFixedCostOperatingConcept_value(f, x, y, z, v) {
    return Borrower_tpAmountFixedCostOperatingConceptClientGroup_value(
        '100280',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementFixedCostOperatingConcept_title:'Cost per Service Concept - Fixed Cost Operating Concept' */
function AgreementFixedCostOperatingConcept_title(f, x, y, z, v) {
    return 'Cost per Service Concept - Fixed Cost Operating Concept';
}

/* AABPRICING_AgreementPercentageOperatingConcept_value:Borrower_tpPercentageOperatingConcept */
function AgreementPercentageOperatingConcept_value(f, x, y, z, v) {
    return Borrower_tpPercentageOperatingConcept_value(
        '100291',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementPercentageOperatingConcept_title:'Percentage Service Concept' */
function AgreementPercentageOperatingConcept_title(f, x, y, z, v) {
    return 'Percentage Service Concept';
}

/* AABPRICING_AgreementSubDebtRatio_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','SUBORDDEBTRATIOPERC',2) */
function AgreementSubDebtRatio_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'SUBORDDEBTRATIOPERC',
        2
    );
}

/* AABPRICING_AgreementSubDebtRatio_title:'Subordinated Debt Capital Charge - Sub Debt Ratio ()' */
function AgreementSubDebtRatio_title(f, x, y, z, v) {
    return 'Subordinated Debt Capital Charge - Sub Debt Ratio ()';
}

/* AABPRICING_AgreementCostOfSubordination_value:Matrixlookup('AAB_Parameters.xls','CalculationParameters','COSTOFSUBORDBP',2) */
function AgreementCostOfSubordination_value(f, x, y, z, v) {
    return Matrixlookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'COSTOFSUBORDBP',
        2
    );
}

/* AABPRICING_AgreementCostOfSubordination_title:'Subordinated Debt Capital Charge - Cost of Subordination (bp)' */
function AgreementCostOfSubordination_title(f, x, y, z, v) {
    return 'Subordinated Debt Capital Charge - Cost of Subordination (bp)';
}

/* AABPRICING_AgreementAvailableAmountOfEquity_value:0 */
function AgreementAvailableAmountOfEquity_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_AgreementAvailableAmountOfEquity_title:'Available Amount of Equity' */
function AgreementAvailableAmountOfEquity_title(f, x, y, z, v) {
    return 'Available Amount of Equity';
}

/* AABPRICING_AgreementSub6_value:undefined */
function AgreementSub6_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_AgreementSub6_title:'Profit&&Losses' */
function AgreementSub6_title(f, x, y, z, v) {
    return 'Profit&&Losses';
}

/* AABPRICING_AgreementProfitAndLoss_value:undefined */
function AgreementProfitAndLoss_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_AgreementProfitAndLoss_title:'Profit&&Losses - Clients' */
function AgreementProfitAndLoss_title(f, x, y, z, v) {
    return 'Profit&&Losses - Clients';
}

/* AABPRICING_AgreementIncome_value:Borrower_tpIncome */
function AgreementIncome_value(f, x, y, z, v) {
    return Borrower_tpIncome_value(
        '100303',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementIncome_title:'Revenues' */
function AgreementIncome_title(f, x, y, z, v) {
    return 'Revenues';
}

/* AABPRICING_AgreementInterestIncome_value:Borrower_tpInterestIncome */
function AgreementInterestIncome_value(f, x, y, z, v) {
    return Borrower_tpInterestIncome_value(
        '100304',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementInterestIncome_title:'Interest income' */
function AgreementInterestIncome_title(f, x, y, z, v) {
    return 'Interest income';
}

/* AABPRICING_AgreementCreditRelatedFee_value:Borrower_tpCreditRelatedFee */
function AgreementCreditRelatedFee_value(f, x, y, z, v) {
    return Borrower_tpCreditRelatedFee_value(
        '100305',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementCreditRelatedFee_title:'Credit related fees' */
function AgreementCreditRelatedFee_title(f, x, y, z, v) {
    return 'Credit related fees';
}

/* AABPRICING_AgreementIndirectLiquidityCosts_value:Borrower_tpIndirectLiquidityCosts */
function AgreementIndirectLiquidityCosts_value(f, x, y, z, v) {
    return Borrower_tpIndirectLiquidityCosts_value(
        '100308',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementIndirectLiquidityCosts_title:'Indirect Liquidity Costs' */
function AgreementIndirectLiquidityCosts_title(f, x, y, z, v) {
    return 'Indirect Liquidity Costs';
}

/* AABPRICING_AgreementDirectLiquidityPremium_value:Borrower_tpDirectLiquidityPremium */
function AgreementDirectLiquidityPremium_value(f, x, y, z, v) {
    return Borrower_tpDirectLiquidityPremium_value(
        '100313',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementDirectLiquidityPremium_title:'Direct Liquidity Premium' */
function AgreementDirectLiquidityPremium_title(f, x, y, z, v) {
    return 'Direct Liquidity Premium';
}

/* AABPRICING_AgreementSubordinatedDebtCapitalCharge_value:Borrower_tpSubordinatedDebtCapitalCharge */
function AgreementSubordinatedDebtCapitalCharge_value(f, x, y, z, v) {
    return Borrower_tpSubordinatedDebtCapitalCharge_value(
        '100314',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementSubordinatedDebtCapitalCharge_title:'Subordinated Debt Capital Charge' */
function AgreementSubordinatedDebtCapitalCharge_title(f, x, y, z, v) {
    return 'Subordinated Debt Capital Charge';
}

/* AABPRICING_AgreementEquityFundingAdjustment_value:Borrower_tpEquityFundingAdjustment */
function AgreementEquityFundingAdjustment_value(f, x, y, z, v) {
    return Borrower_tpEquityFundingAdjustment_value(
        '100315',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementEquityFundingAdjustment_title:'Equity Funding Adjustment' */
function AgreementEquityFundingAdjustment_title(f, x, y, z, v) {
    return 'Equity Funding Adjustment';
}

/* AABPRICING_AgreementOperationalCosts_value:Borrower_tpOperationalCosts */
function AgreementOperationalCosts_value(f, x, y, z, v) {
    return Borrower_tpOperationalCosts_value(
        '100316',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementOperationalCosts_title:'Operational Costs' */
function AgreementOperationalCosts_title(f, x, y, z, v) {
    return 'Operational Costs';
}

/* AABPRICING_AgreementInternalExpectedLoss_value:Borrower_tpInternalExpectedLoss */
function AgreementInternalExpectedLoss_value(f, x, y, z, v) {
    return Borrower_tpInternalExpectedLoss_value(
        '100323',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementInternalExpectedLoss_title:'Internal Expected Loss' */
function AgreementInternalExpectedLoss_title(f, x, y, z, v) {
    return 'Internal Expected Loss';
}

/* AABPRICING_AgreementTax_value:Borrower_tpTax */
function AgreementTax_value(f, x, y, z, v) {
    return Borrower_tpTax_value(
        '100324',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementTax_title:'Tax' */
function AgreementTax_title(f, x, y, z, v) {
    return 'Tax';
}

/* AABPRICING_AgreementRiskAdjustedReturn_value:Borrower_tpRiskAdjustedReturn */
function AgreementRiskAdjustedReturn_value(f, x, y, z, v) {
    return Borrower_tpRiskAdjustedReturn_value(
        '100325',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementRiskAdjustedReturn_title:'Risk adjusted return' */
function AgreementRiskAdjustedReturn_title(f, x, y, z, v) {
    return 'Risk adjusted return';
}

/* AABPRICING_AgreementReturnOnEquity_value:OnER(AgreementRiskAdjustedReturn/AgreementRiskAdjustedCapital,NA) */
function AgreementReturnOnEquity_value(f, x, y, z, v) {
    return OnER(
        AgreementRiskAdjustedReturn_value(
            '100146',
            x,
            y.base,
            z,
            v
        ) /
        AgreementRiskAdjustedCapital_value(
            '100150',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_AgreementReturnOnEquity_title:'Return On Equity' */
function AgreementReturnOnEquity_title(f, x, y, z, v) {
    return 'Return On Equity';
}

/* AABPRICING_AgreementRiskAdjustedCapital_value:undefined */
function AgreementRiskAdjustedCapital_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_AgreementRiskAdjustedCapital_title:'Risk Adjusted Capital' */
function AgreementRiskAdjustedCapital_title(f, x, y, z, v) {
    return 'Risk Adjusted Capital';
}

/* AABPRICING_AgreementRaRoRaC_value:OnER(AgreementRiskAdjustedReturn/AgreementEconomicCapital,NA) */
function AgreementRaRoRaC_value(f, x, y, z, v) {
    return OnER(
        AgreementRiskAdjustedReturn_value(
            '100146',
            x,
            y.base,
            z,
            v
        ) /
        AgreementEconomicCapital_value(
            '100154',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_AgreementRaRoRaC_title:'RaRoRaC' */
function AgreementRaRoRaC_title(f, x, y, z, v) {
    return 'RaRoRaC';
}

/* AABPRICING_AgreementEconomicCapital_value:AgreementOperationalRisk+AgreementBusinessRisk+AgreementCreditRisk */
function AgreementEconomicCapital_value(f, x, y, z, v) {
    return AgreementOperationalRisk_value(
        '100156',
        x,
        y.base,
        z,
        v
        ) +
        AgreementBusinessRisk_value(
            '100158',
            x,
            y.base,
            z,
            v
        ) +
        AgreementCreditRisk_value(
            '100160',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_AgreementEconomicCapital_title:'Economic Capital' */
function AgreementEconomicCapital_title(f, x, y, z, v) {
    return 'Economic Capital';
}

/* AABPRICING_AgreementOperationalRisk_value:Borrower_tpOperationalRisk */
function AgreementOperationalRisk_value(f, x, y, z, v) {
    return Borrower_tpOperationalRisk_value(
        '100332',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementOperationalRisk_title:'Economic Capital - Operational Risk' */
function AgreementOperationalRisk_title(f, x, y, z, v) {
    return 'Economic Capital - Operational Risk';
}

/* AABPRICING_AgreementBusinessRisk_value:Borrower_tpBusinessRisk */
function AgreementBusinessRisk_value(f, x, y, z, v) {
    return Borrower_tpBusinessRisk_value(
        '100333',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementBusinessRisk_title:'Economic Capital - Business Risk' */
function AgreementBusinessRisk_title(f, x, y, z, v) {
    return 'Economic Capital - Business Risk';
}

/* AABPRICING_AgreementCreditRisk_value:Borrower_tpCreditRisk */
function AgreementCreditRisk_value(f, x, y, z, v) {
    return Borrower_tpCreditRisk_value(
        '100334',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementCreditRisk_title:'Economic Capital - Credit Risk' */
function AgreementCreditRisk_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk';
}

/* AABPRICING_AgreementRegulatoryProfit_value:OnER(AgreementRiskAdjustedReturn-AgreementEquityCapitalCharge,NA) */
function AgreementRegulatoryProfit_value(f, x, y, z, v) {
    return OnER(
        AgreementRiskAdjustedReturn_value(
            '100146',
            x,
            y.base,
            z,
            v
        ) -
        AgreementEquityCapitalCharge_value(
            '100164',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_AgreementRegulatoryProfit_title:'Regulatory Profit' */
function AgreementRegulatoryProfit_title(f, x, y, z, v) {
    return 'Regulatory Profit';
}

/* AABPRICING_AgreementEquityCapitalCharge_value:Borrower_tpEquityCapitalCharge */
function AgreementEquityCapitalCharge_value(f, x, y, z, v) {
    return Borrower_tpEquityCapitalCharge_value(
        '100336',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementEquityCapitalCharge_title:'Equity Capital Charge' */
function AgreementEquityCapitalCharge_title(f, x, y, z, v) {
    return 'Equity Capital Charge';
}

/* AABPRICING_AgreementEconomicProfit_value:OnER(Borrower_tpRiskAdjustedReturn-AgreementEconomicCapital*Borrower_tpEffectiveCostOfCapital,NA) */
function AgreementEconomicProfit_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpRiskAdjustedReturn_value(
            '100325',
            x,
            y.base,
            z,
            v
        ) -
        AgreementEconomicCapital_value(
            '100154',
            x,
            y.base,
            z,
            v
        ) *
        Borrower_tpEffectiveCostOfCapital_value(
            '100276',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_AgreementEconomicProfit_title:'Economic Profit' */
function AgreementEconomicProfit_title(f, x, y, z, v) {
    return 'Economic Profit';
}

/* AABPRICING_AgreementEffectiveCostOfCapital_value:undefined */
function AgreementEffectiveCostOfCapital_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_AgreementEffectiveCostOfCapital_title:'Effective Cost Of Capital' */
function AgreementEffectiveCostOfCapital_title(f, x, y, z, v) {
    return 'Effective Cost Of Capital';
}

/* AABPRICING_AgreementOtherMetrics_value:undefined */
function AgreementOtherMetrics_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_AgreementOtherMetrics_title:'Other Metrics' */
function AgreementOtherMetrics_title(f, x, y, z, v) {
    return 'Other Metrics';
}

/* AABPRICING_AgreementPrincipalLimit_value:Borrower_tpPrincipalLimit */
function AgreementPrincipalLimit_value(f, x, y, z, v) {
    return Borrower_tpPrincipalLimit_value(
        '100345',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementPrincipalLimit_title:'Principal Limit' */
function AgreementPrincipalLimit_title(f, x, y, z, v) {
    return 'Principal Limit';
}

/* AABPRICING_AgreementExpectedAverageOutstanding_value:Borrower_tpExpectedAverageOutstanding */
function AgreementExpectedAverageOutstanding_value(f, x, y, z, v) {
    return Borrower_tpExpectedAverageOutstanding_value(
        '100346',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementExpectedAverageOutstanding_title:'Expected Average Outstanding' */
function AgreementExpectedAverageOutstanding_title(f, x, y, z, v) {
    return 'Expected Average Outstanding';
}

/* AABPRICING_AgreementRWA_value:Borrower_tpRWA */
function AgreementRWA_value(f, x, y, z, v) {
    return Borrower_tpRWA_value(
        '100348',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementRWA_title:'RWA' */
function AgreementRWA_title(f, x, y, z, v) {
    return 'RWA';
}

/* AABPRICING_AgreementRWACreditRisk_value:Borrower_tpRWACreditRisk */
function AgreementRWACreditRisk_value(f, x, y, z, v) {
    return Borrower_tpRWACreditRisk_value(
        '100349',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementRWACreditRisk_title:'RWA Credit Risk' */
function AgreementRWACreditRisk_title(f, x, y, z, v) {
    return 'RWA Credit Risk';
}

/* AABPRICING_AgreementRWAOperationalRisk_value:Borrower_tpRWAOperationalRisk */
function AgreementRWAOperationalRisk_value(f, x, y, z, v) {
    return Borrower_tpRWAOperationalRisk_value(
        '100350',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementRWAOperationalRisk_title:'RWA Operational Risk' */
function AgreementRWAOperationalRisk_title(f, x, y, z, v) {
    return 'RWA Operational Risk';
}

/* AABPRICING_AgreementEAD_value:Borrower_tpEAD */
function AgreementEAD_value(f, x, y, z, v) {
    return Borrower_tpEAD_value(
        '100262',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_AgreementEAD_title:'EAD' */
function AgreementEAD_title(f, x, y, z, v) {
    return 'EAD';
}

/* AABPRICING_Borrower_value:undefined */
function Borrower_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_title:'Borrower' */
function Borrower_title(f, x, y, z, v) {
    return 'Borrower';
}

/* AABPRICING_Borrower_tpInput_value:undefined */
function Borrower_tpInput_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpInput_title:'Client details' */
function Borrower_tpInput_title(f, x, y, z, v) {
    return 'Client details';
}

/* AABPRICING_Borrower_tpReferenceNumber_value:EvaluateAsString(FPS_VAR_Relatienummer) */
function Borrower_tpReferenceNumber_value(f, x, y, z, v) {
    return String(
        FPS_VAR_Relatienummer_value(
            '100035',
            x,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpReferenceNumber_title:'Borrower Reference' */
function Borrower_tpReferenceNumber_title(f, x, y, z, v) {
    return 'Borrower Reference';
}

/* AABPRICING_Borrower_tpBaseCurrencyChoice_value:1 */
function Borrower_tpBaseCurrencyChoice_value(f, x, y, z, v) {
    return 1;
}

/* AABPRICING_Borrower_tpBaseCurrencyChoice_title:'Base Currency of Borrower' */
function Borrower_tpBaseCurrencyChoice_title(f, x, y, z, v) {
    return 'Base Currency of Borrower';
}

/* AABPRICING_Borrower_tpBaseCurrencyChoice_choices:[{'name':' 01','value':'EUR'},{'name':'02','value':'BRL'},{'name':'03','value':'CAD'},{'name':'04','value':'CHF'},{'name':'05','value':'GBP'},{'name':'06','value':'HKD'},{'name':'07','value':'INR'},{'name':'08','value':'MXN'},{'name':'09','value':'NOK'},{'name':'10','value':'SGD'},{'name':'11','value':'USD'}] */
function Borrower_tpBaseCurrencyChoice_choices(f, x, y, z, v) {
    return [{'name': ' 01', 'value': 'EUR'}, {'name': '02', 'value': 'BRL'}, {
        'name': '03',
        'value': 'CAD'
    }, {'name': '04', 'value': 'CHF'}, {'name': '05', 'value': 'GBP'}, {'name': '06', 'value': 'HKD'}, {
        'name': '07',
        'value': 'INR'
    }, {'name': '08', 'value': 'MXN'}, {'name': '09', 'value': 'NOK'}, {'name': '10', 'value': 'SGD'}, {
        'name': '11',
        'value': 'USD'
    }];
}

/* AABPRICING_Borrower_tpBaseCurrency_value:EvaluateAsString(Case(Borrower_tpBaseCurrencyChoice,[1,'EUR'||2,'BRL'||3,'CAD'||4,'CHF'||5,'GBP'||6,'HKD'||7,'INR'||8,'MXN'||9,'NOK'||10,'SGD'||11,'USD'])) */
function Borrower_tpBaseCurrency_value(f, x, y, z, v) {
    return String(
        (
            __c0s0 =
                Borrower_tpBaseCurrencyChoice_value(
                    '100190',
                    x,
                    y.base,
                    z,
                    v
                ) , __c0s0 === 1 ? 'EUR' : __c0s0 === 2 ? 'BRL' : __c0s0 === 3 ? 'CAD' : __c0s0 === 4 ? 'CHF' : __c0s0 === 5 ? 'GBP' : __c0s0 === 6 ? 'HKD' : __c0s0 === 7 ? 'INR' : __c0s0 === 8 ? 'MXN' : __c0s0 === 9 ? 'NOK' : __c0s0 === 10 ? 'SGD' : __c0s0 === 11 ? 'USD' : NA
        )
    );
}

/* AABPRICING_Borrower_tpBaseCurrency_title:'Currency' */
function Borrower_tpBaseCurrency_title(f, x, y, z, v) {
    return 'Currency';
}

/* AABPRICING_Borrower_tpClientGroup_value:EvaluateAsString(SubStr(Case(Borrower_tpClientGroupChoice,[1,'PAR - Particulieren/Medici'||2,'PBN - PBNL'||3,'PBI - PBI'||4,'PBF - PBI - France'||5,'PBD - PBI - Germany'||6,'PBG - PBI - Guernsey'||7,'PBH - PBI - Hong Kong'||8,'PBJ - PBI - Jersey'||9,'PBL - PBI - Luxembourg'||10,'PBS - PBI - Singapore'||11,'PBU - PBI - UAE'||12,'PBB - PBI - Belgium'||13,'IDJ - IC-D+J Clients'||14,'YBB - Retail Banking-YBB'||15,'BRM - Commercial Clients-REC'||16,'CR1 - Commercial Clients-RM_A1'||17,'CR2 - Commercial Clients-RM_A2'||18,'CR3 - Commercial Clients-RM_A3'||19,'CCL - Commercial Clients-CC'||20,'PUB - Commercial Clients-PublicSector'||21,'DDP - Commercial Clients-Deal Desk Public'||22,'LMF - IC-FinancialInstitutions'||23,'LMR - IC-RealEstate'||24,'LML - IC-LargeCorporates'||25,'LME - IC-ECT Clients'||26,'LMD - IC-DebtSolutions'||27,'LMC - IC-exCC Clients']),0,3)) */
function Borrower_tpClientGroup_value(f, x, y, z, v) {
    return String(
        SubStr(
            (
                __c0s1 =
                    Borrower_tpClientGroupChoice_value(
                        '100197',
                        x,
                        y.base,
                        z,
                        v
                    ) , __c0s1 === 1 ? 'PAR - Particulieren/Medici' : __c0s1 === 2 ? 'PBN - PBNL' : __c0s1 === 3 ? 'PBI - PBI' : __c0s1 === 4 ? 'PBF - PBI - France' : __c0s1 === 5 ? 'PBD - PBI - Germany' : __c0s1 === 6 ? 'PBG - PBI - Guernsey' : __c0s1 === 7 ? 'PBH - PBI - Hong Kong' : __c0s1 === 8 ? 'PBJ - PBI - Jersey' : __c0s1 === 9 ? 'PBL - PBI - Luxembourg' : __c0s1 === 10 ? 'PBS - PBI - Singapore' : __c0s1 === 11 ? 'PBU - PBI - UAE' : __c0s1 === 12 ? 'PBB - PBI - Belgium' : __c0s1 === 13 ? 'IDJ - IC-D+J Clients' : __c0s1 === 14 ? 'YBB - Retail Banking-YBB' : __c0s1 === 15 ? 'BRM - Commercial Clients-REC' : __c0s1 === 16 ? 'CR1 - Commercial Clients-RM_A1' : __c0s1 === 17 ? 'CR2 - Commercial Clients-RM_A2' : __c0s1 === 18 ? 'CR3 - Commercial Clients-RM_A3' : __c0s1 === 19 ? 'CCL - Commercial Clients-CC' : __c0s1 === 20 ? 'PUB - Commercial Clients-PublicSector' : __c0s1 === 21 ? 'DDP - Commercial Clients-Deal Desk Public' : __c0s1 === 22 ? 'LMF - IC-FinancialInstitutions' : __c0s1 === 23 ? 'LMR - IC-RealEstate' : __c0s1 === 24 ? 'LML - IC-LargeCorporates' : __c0s1 === 25 ? 'LME - IC-ECT Clients' : __c0s1 === 26 ? 'LMD - IC-DebtSolutions' : __c0s1 === 27 ? 'LMC - IC-exCC Clients' : NA
            ),
            0,
            3
        )
    );
}

/* AABPRICING_Borrower_tpClientGroup_title:'Client Group Code' */
function Borrower_tpClientGroup_title(f, x, y, z, v) {
    return 'Client Group Code';
}

/* AABPRICING_Borrower_tpClientGroupChoice_value:18 */
function Borrower_tpClientGroupChoice_value(f, x, y, z, v) {
    return 18;
}

/* AABPRICING_Borrower_tpClientGroupChoice_title:'Client Group' */
function Borrower_tpClientGroupChoice_title(f, x, y, z, v) {
    return 'Client Group';
}

/* AABPRICING_Borrower_tpAGICOrSBI_value:If(Borrower_tpSectorType=='AGIC',0,If(Borrower_tpSectorType=='SBI',1,NA)) */
function Borrower_tpAGICOrSBI_value(f, x, y, z, v) {
    return Borrower_tpSectorType_value(
        '100230',
        x,
        y.base,
        z,
        v
    ) ==
    'AGIC' ? 0 : Borrower_tpSectorType_value(
        '100230',
        x,
        y.base,
        z,
        v
    ) == 'SBI' ? 1 : NA;
}

/* AABPRICING_Borrower_tpAGICOrSBI_title:'Do you want to use an AGIC || SBI identification code' */
function Borrower_tpAGICOrSBI_title(f, x, y, z, v) {
    return 'Do you want to use an AGIC || SBI identification code';
}

/* AABPRICING_Borrower_tpAGICOrSBI_choices:[{'name':' 0','value':'AGIC'},{'name':'1','value':'SBI'}] */
function Borrower_tpAGICOrSBI_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'AGIC'}, {'name': '1', 'value': 'SBI'}];
}

/* AABPRICING_Borrower_tpAGICChoice_value:undefined */
function Borrower_tpAGICChoice_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpAGICChoice_title:'AGIC Sector' */
function Borrower_tpAGICChoice_title(f, x, y, z, v) {
    return 'AGIC Sector';
}

/* AABPRICING_Borrower_tpAGICChoice_visible:Borrower_tpAGICOrSBI==0 */
function Borrower_tpAGICChoice_visible(f, x, y, z, v) {
    return Borrower_tpAGICOrSBI_value(
        '100199',
        x,
        y.base,
        z,
        v
    ) == 0;
}

/* AABPRICING_Borrower_tpAGIC_value:undefined */
function Borrower_tpAGIC_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpAGIC_title:'AGIC Code' */
function Borrower_tpAGIC_title(f, x, y, z, v) {
    return 'AGIC Code';
}

/* AABPRICING_Borrower_tpFinancialInstitutionChoice_value:If(Borrower_tpAGICOrSBI==0,If(MatrixLookup('AAB_Parameters.xls','AGICMapping',''+Borrower_tpAGIC,3)==1,1,0),If(MatrixLookup('AAB_Parameters.xls','SBIMapping',''+Borrower_tpSBI,3)==1,1,0)) */
function Borrower_tpFinancialInstitutionChoice_value(f, x, y, z, v) {
    return Borrower_tpAGICOrSBI_value(
        '100199',
        x,
        y.base,
        z,
        v
    ) ==
    0 ? MatrixLookup(
        'AAB_Parameters.xls',
        'AGICMapping',
        '' +
        Borrower_tpAGIC_value(
            '100205',
            x,
            y.base,
            z,
            v
        ),
        3
    ) ==
    1 ? 1 : 0 : MatrixLookup(
        'AAB_Parameters.xls',
        'SBIMapping',
        '' +
        Borrower_tpSBI_value(
            '100222',
            x,
            y.base,
            z,
            v
        ),
        3
    ) == 1 ? 1 : 0;
}

/* AABPRICING_Borrower_tpFinancialInstitutionChoice_title:'Financial Institution Choice' */
function Borrower_tpFinancialInstitutionChoice_title(f, x, y, z, v) {
    return 'Financial Institution Choice';
}

/* AABPRICING_Borrower_tpUnderSupervision_value:0 */
function Borrower_tpUnderSupervision_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Borrower_tpUnderSupervision_title:'Under Supervision' */
function Borrower_tpUnderSupervision_title(f, x, y, z, v) {
    return 'Under Supervision';
}

/* AABPRICING_Borrower_tpBookingLocationChoice_value:20 */
function Borrower_tpBookingLocationChoice_value(f, x, y, z, v) {
    return 20;
}

/* AABPRICING_Borrower_tpBookingLocationChoice_title:'Booking location' */
function Borrower_tpBookingLocationChoice_title(f, x, y, z, v) {
    return 'Booking location';
}

/* AABPRICING_Borrower_tpBookingLocationChoice_choices:[{'name':' 01','value':'Australia'},{'name':'02','value':'Austria'},{'name':'03','value':'Belgium'},{'name':'04','value':'Brazil'},{'name':'05','value':'Canada'},{'name':'06','value':'China'},{'name':'07','value':'Czech Republic'},{'name':'08','value':'Denmark'},{'name':'09','value':'France'},{'name':'10','value':'Germany'},{'name':'11','value':'Greece'},{'name':'12','value':'Hong Kong'},{'name':'13','value':'Hungary'},{'name':'14','value':'Indonesia'},{'name':'15','value':'India'},{'name':'16','value':'Ireland'},{'name':'17','value':'Italy'},{'name':'18','value':'Japan'},{'name':'19','value':'Luxembourg'},{'name':'20','value':'Netherlands'},{'name':'21','value':'Norway'},{'name':'22','value':'Poland'},{'name':'23','value':'Portugal'},{'name':'24','value':'Romania'},{'name':'25','value':'Singapore'},{'name':'26','value':'South Africa'},{'name':'27','value':'Spain'},{'name':'28','value':'Sweden'},{'name':'29','value':'Switzerland'},{'name':'30','value':'Turkey'},{'name':'31','value':'United Arab Emirates'},{'name':'32','value':'United Kingdom'},{'name':'33','value':'United States'}] */
function Borrower_tpBookingLocationChoice_choices(f, x, y, z, v) {
    return [{'name': ' 01', 'value': 'Australia'}, {'name': '02', 'value': 'Austria'}, {
        'name': '03',
        'value': 'Belgium'
    }, {'name': '04', 'value': 'Brazil'}, {'name': '05', 'value': 'Canada'}, {
        'name': '06',
        'value': 'China'
    }, {'name': '07', 'value': 'Czech Republic'}, {'name': '08', 'value': 'Denmark'}, {
        'name': '09',
        'value': 'France'
    }, {'name': '10', 'value': 'Germany'}, {'name': '11', 'value': 'Greece'}, {
        'name': '12',
        'value': 'Hong Kong'
    }, {'name': '13', 'value': 'Hungary'}, {'name': '14', 'value': 'Indonesia'}, {
        'name': '15',
        'value': 'India'
    }, {'name': '16', 'value': 'Ireland'}, {'name': '17', 'value': 'Italy'}, {
        'name': '18',
        'value': 'Japan'
    }, {'name': '19', 'value': 'Luxembourg'}, {'name': '20', 'value': 'Netherlands'}, {
        'name': '21',
        'value': 'Norway'
    }, {'name': '22', 'value': 'Poland'}, {'name': '23', 'value': 'Portugal'}, {
        'name': '24',
        'value': 'Romania'
    }, {'name': '25', 'value': 'Singapore'}, {'name': '26', 'value': 'South Africa'}, {
        'name': '27',
        'value': 'Spain'
    }, {'name': '28', 'value': 'Sweden'}, {'name': '29', 'value': 'Switzerland'}, {
        'name': '30',
        'value': 'Turkey'
    }, {'name': '31', 'value': 'United Arab Emirates'}, {'name': '32', 'value': 'United Kingdom'}, {
        'name': '33',
        'value': 'United States'
    }];
}

/* AABPRICING_Borrower_tpAssetSize2_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','DEFAULT_ASSET_SIZE',2) */
function Borrower_tpAssetSize2_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'DEFAULT_ASSET_SIZE',
        2
    );
}

/* AABPRICING_Borrower_tpAssetSize2_title:'Asset Size (mio)' */
function Borrower_tpAssetSize2_title(f, x, y, z, v) {
    return 'Asset Size (mio)';
}

/* AABPRICING_Borrower_tpDataImportedFromForce_value:undefined */
function Borrower_tpDataImportedFromForce_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpDataImportedFromForce_title:EvaluateAsString('Imported Data') */
function Borrower_tpDataImportedFromForce_title(f, x, y, z, v) {
    return String(
        'Imported Data'
    );
}

/* AABPRICING_Borrower_tpMainBorrowerLabeledRating_value:undefined */
function Borrower_tpMainBorrowerLabeledRating_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpMainBorrowerLabeledRating_title:'UCR' */
function Borrower_tpMainBorrowerLabeledRating_title(f, x, y, z, v) {
    return 'UCR';
}

/* AABPRICING_Borrower_tpName_value:EvaluateAsString(FPS_VAR_Naam) */
function Borrower_tpName_value(f, x, y, z, v) {
    return String(
        FPS_VAR_Naam_value(
            '100033',
            x,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpName_title:'Borrower Name' */
function Borrower_tpName_title(f, x, y, z, v) {
    return 'Borrower Name';
}

/* AABPRICING_Borrower_tpSBI_value:EvaluateAsString(If(Borrower_tpSectorType=='SBI',Borrower_tpSectorCode,NA)) */
function Borrower_tpSBI_value(f, x, y, z, v) {
    return String(
        Borrower_tpSectorType_value(
            '100230',
            x,
            y.base,
            z,
            v
        ) ==
        'SBI' ? Borrower_tpSectorCode_value(
            '100232',
            x,
            y.base,
            z,
            v
        ) : NA
    );
}

/* AABPRICING_Borrower_tpSBI_title:'SBI branche code (Geen lijst)' */
function Borrower_tpSBI_title(f, x, y, z, v) {
    return 'SBI branche code (Geen lijst)';
}

/* AABPRICING_Borrower_tpSBI_visible:Borrower_tpAGICOrSBI==1 */
function Borrower_tpSBI_visible(f, x, y, z, v) {
    return Borrower_tpAGICOrSBI_value(
        '100199',
        x,
        y.base,
        z,
        v
    ) == 1;
}

/* AABPRICING_Borrower_tpPDModel_value:undefined */
function Borrower_tpPDModel_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpPDModel_title:'PD Model' */
function Borrower_tpPDModel_title(f, x, y, z, v) {
    return 'PD Model';
}

/* AABPRICING_Borrower_tpAutomaticInput_value:undefined */
function Borrower_tpAutomaticInput_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpAutomaticInput_title:'Automatic Input' */
function Borrower_tpAutomaticInput_title(f, x, y, z, v) {
    return 'Automatic Input';
}

/* AABPRICING_Borrower_tpClientGroupFullName_value:EvaluateAsString(SubStr(Case(Borrower_tpClientGroupChoice,[1,'PAR - Particulieren/Medici'||2,'PBN - PBNL'||3,'PBI - PBI'||4,'PBF - PBI - France'||5,'PBD - PBI - Germany'||6,'PBG - PBI - Guernsey'||7,'PBH - PBI - Hong Kong'||8,'PBJ - PBI - Jersey'||9,'PBL - PBI - Luxembourg'||10,'PBS - PBI - Singapore'||11,'PBU - PBI - UAE'||12,'PBB - PBI - Belgium'||13,'IDJ - IC-D+J Clients'||14,'YBB - Retail Banking-YBB'||15,'BRM - Commercial Clients-REC'||16,'CR1 - Commercial Clients-RM_A1'||17,'CR2 - Commercial Clients-RM_A2'||18,'CR3 - Commercial Clients-RM_A3'||19,'CCL - Commercial Clients-CC'||20,'PUB - Commercial Clients-PublicSector'||21,'DDP - Commercial Clients-Deal Desk Public'||22,'LMF - IC-FinancialInstitutions'||23,'LMR - IC-RealEstate'||24,'LML - IC-LargeCorporates'||25,'LME - IC-ECT Clients'||26,'LMD - IC-DebtSolutions'||27,'LMC - IC-exCC Clients']),7,99)) */
function Borrower_tpClientGroupFullName_value(f, x, y, z, v) {
    return String(
        SubStr(
            (
                __c0s2 =
                    Borrower_tpClientGroupChoice_value(
                        '100197',
                        x,
                        y.base,
                        z,
                        v
                    ) , __c0s2 === 1 ? 'PAR - Particulieren/Medici' : __c0s2 === 2 ? 'PBN - PBNL' : __c0s2 === 3 ? 'PBI - PBI' : __c0s2 === 4 ? 'PBF - PBI - France' : __c0s2 === 5 ? 'PBD - PBI - Germany' : __c0s2 === 6 ? 'PBG - PBI - Guernsey' : __c0s2 === 7 ? 'PBH - PBI - Hong Kong' : __c0s2 === 8 ? 'PBJ - PBI - Jersey' : __c0s2 === 9 ? 'PBL - PBI - Luxembourg' : __c0s2 === 10 ? 'PBS - PBI - Singapore' : __c0s2 === 11 ? 'PBU - PBI - UAE' : __c0s2 === 12 ? 'PBB - PBI - Belgium' : __c0s2 === 13 ? 'IDJ - IC-D+J Clients' : __c0s2 === 14 ? 'YBB - Retail Banking-YBB' : __c0s2 === 15 ? 'BRM - Commercial Clients-REC' : __c0s2 === 16 ? 'CR1 - Commercial Clients-RM_A1' : __c0s2 === 17 ? 'CR2 - Commercial Clients-RM_A2' : __c0s2 === 18 ? 'CR3 - Commercial Clients-RM_A3' : __c0s2 === 19 ? 'CCL - Commercial Clients-CC' : __c0s2 === 20 ? 'PUB - Commercial Clients-PublicSector' : __c0s2 === 21 ? 'DDP - Commercial Clients-Deal Desk Public' : __c0s2 === 22 ? 'LMF - IC-FinancialInstitutions' : __c0s2 === 23 ? 'LMR - IC-RealEstate' : __c0s2 === 24 ? 'LML - IC-LargeCorporates' : __c0s2 === 25 ? 'LME - IC-ECT Clients' : __c0s2 === 26 ? 'LMD - IC-DebtSolutions' : __c0s2 === 27 ? 'LMC - IC-exCC Clients' : NA
            ),
            7,
            99
        )
    );
}

/* AABPRICING_Borrower_tpSectorType_value:EvaluateAsString(FPS_VAR_SECTOR_OF_INDUSTRY_CODE_TYPE) */
function Borrower_tpSectorType_value(f, x, y, z, v) {
    return String(
        FPS_VAR_SECTOR_OF_INDUSTRY_CODE_TYPE_value(
            '100045',
            x,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpSectorType_title:'Sector type (SBI || AGIC)' */
function Borrower_tpSectorType_title(f, x, y, z, v) {
    return 'Sector type (SBI || AGIC)';
}

/* AABPRICING_Borrower_tpSectorCode_value:EvaluateAsString(FPS_VAR_BIK_CODE) */
function Borrower_tpSectorCode_value(f, x, y, z, v) {
    return String(
        FPS_VAR_BIK_CODE_value(
            '100043',
            x,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpSectorCode_title:'Sector code' */
function Borrower_tpSectorCode_title(f, x, y, z, v) {
    return 'Sector code';
}

/* AABPRICING_Borrower_tpBookingLocation_value:EvaluateAsString(Case(Borrower_tpBookingLocationChoice,[1,'Australia'||2,'Austria'||3,'Belgium'||4,'Brazil'||5,'Canada'||6,'China'||7,'Czech Republic'||8,'Denmark'||9,'France'||10,'Germany'||11,'Greece'||12,'Hong Kong'||13,'Hungary'||14,'Indonesia'||15,'India'||16,'Ireland'||17,'Italy'||18,'Japan'||19,'Luxembourg'||20,'Netherlands'||21,'Norway'||22,'Poland'||23,'Portugal'||24,'Romania'||25,'Singapore'||26,'South Africa'||27,'Spain'||28,'Sweden'||29,'Switzerland'||30,'Turkey'||31,'United Arab Emirates'||32,'United Kingdom'||33,'United States'])) */
function Borrower_tpBookingLocation_value(f, x, y, z, v) {
    return String(
        (
            __c0s3 =
                Borrower_tpBookingLocationChoice_value(
                    '100211',
                    x,
                    y.base,
                    z,
                    v
                ) , __c0s3 === 1 ? 'Australia' : __c0s3 === 2 ? 'Austria' : __c0s3 === 3 ? 'Belgium' : __c0s3 === 4 ? 'Brazil' : __c0s3 === 5 ? 'Canada' : __c0s3 === 6 ? 'China' : __c0s3 === 7 ? 'Czech Republic' : __c0s3 === 8 ? 'Denmark' : __c0s3 === 9 ? 'France' : __c0s3 === 10 ? 'Germany' : __c0s3 === 11 ? 'Greece' : __c0s3 === 12 ? 'Hong Kong' : __c0s3 === 13 ? 'Hungary' : __c0s3 === 14 ? 'Indonesia' : __c0s3 === 15 ? 'India' : __c0s3 === 16 ? 'Ireland' : __c0s3 === 17 ? 'Italy' : __c0s3 === 18 ? 'Japan' : __c0s3 === 19 ? 'Luxembourg' : __c0s3 === 20 ? 'Netherlands' : __c0s3 === 21 ? 'Norway' : __c0s3 === 22 ? 'Poland' : __c0s3 === 23 ? 'Portugal' : __c0s3 === 24 ? 'Romania' : __c0s3 === 25 ? 'Singapore' : __c0s3 === 26 ? 'South Africa' : __c0s3 === 27 ? 'Spain' : __c0s3 === 28 ? 'Sweden' : __c0s3 === 29 ? 'Switzerland' : __c0s3 === 30 ? 'Turkey' : __c0s3 === 31 ? 'United Arab Emirates' : __c0s3 === 32 ? 'United Kingdom' : __c0s3 === 33 ? 'United States' : NA
        )
    );
}

/* AABPRICING_Borrower_tpBookingLocation_title:'Booking location Tekst' */
function Borrower_tpBookingLocation_title(f, x, y, z, v) {
    return 'Booking location Tekst';
}

/* AABPRICING_Borrower_tpTaxRate_value:MatrixLookup('AAB_Parameters.xls','TaxRate',Borrower_tpBookingLocation,1) */
function Borrower_tpTaxRate_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'TaxRate',
        Borrower_tpBookingLocation_value(
            '100234',
            x,
            y.base,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Borrower_tpTaxRate_title:'Tax Rate' */
function Borrower_tpTaxRate_title(f, x, y, z, v) {
    return 'Tax Rate';
}

/* AABPRICING_Borrower_tpRating_value:EvaluateAsString(Borrower_tpMainBorrowerLabeledRating) */
function Borrower_tpRating_value(f, x, y, z, v) {
    return String(
        Borrower_tpMainBorrowerLabeledRating_value(
            '100218',
            x,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpRating_title:'UCR Rating' */
function Borrower_tpRating_title(f, x, y, z, v) {
    return 'UCR Rating';
}

/* AABPRICING_Borrower_tpPD_value:MatrixLookup('AAB_Parameters.xls','PD',Borrower_tpRating,1) */
function Borrower_tpPD_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'PD',
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Borrower_tpPD_title:'Probability of Default ()' */
function Borrower_tpPD_title(f, x, y, z, v) {
    return 'Probability of Default ()';
}

/* AABPRICING_Borrower_tpPDMoC_value:Borrower_tpPD*Borrower_tpMoCFactor */
function Borrower_tpPDMoC_value(f, x, y, z, v) {
    return Borrower_tpPD_value(
        '100240',
        x,
        y.base,
        z,
        v
        ) *
        Borrower_tpMoCFactor_value(
            '100246',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpPDMoC_title:'Probability of Default MoC ()' */
function Borrower_tpPDMoC_title(f, x, y, z, v) {
    return 'Probability of Default MoC ()';
}

/* AABPRICING_Borrower_tpAssetSize_value:Borrower_tpAssetSize2 */
function Borrower_tpAssetSize_value(f, x, y, z, v) {
    return Borrower_tpAssetSize2_value(
        '100214',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpPDModelFullName_value:EvaluateAsString(MatrixLookup('AAB_Parameters.xls','VertaaltabelPDModel',Borrower_tpPDModel,1)) */
function Borrower_tpPDModelFullName_value(f, x, y, z, v) {
    return String(
        MatrixLookup(
            'AAB_Parameters.xls',
            'VertaaltabelPDModel',
            Borrower_tpPDModel_value(
                '100225',
                x,
                y.base,
                z,
                v
            ),
            1
        )
    );
}

/* AABPRICING_Borrower_tpMoCFactor_value:MatrixLookup('AAB_Parameters.xls','MOCFactorPD',Borrower_tpPDModel,1) */
function Borrower_tpMoCFactor_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'MOCFactorPD',
        Borrower_tpPDModel_value(
            '100225',
            x,
            y.base,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Borrower_tpMoCFactor_title:'MoC Factor' */
function Borrower_tpMoCFactor_title(f, x, y, z, v) {
    return 'MoC Factor';
}

/* AABPRICING_Borrower_tpARCAddOn_value:MatrixLookup('AAB_Parameters.xls','ClientGroup',Borrower_tpClientGroup,2) */
function Borrower_tpARCAddOn_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ClientGroup',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        2
    );
}

/* AABPRICING_Borrower_tpARCAddOn_title:'ARC Add-on' */
function Borrower_tpARCAddOn_title(f, x, y, z, v) {
    return 'ARC Add-on';
}

/* AABPRICING_Borrower_tpRiskWeight_value:CumNormal((InvNormal(Borrower_tpPDMoC)-(Borrower_tpRho^.5)*InvNormal(1-Borrower_tpConfidenceLevel))/(1-Borrower_tpRho^.5)) */
function Borrower_tpRiskWeight_value(f, x, y, z, v) {
    return CumNormal(
        (
            InvNormal(
                Borrower_tpPDMoC_value(
                    '100242',
                    x,
                    y.base,
                    z,
                    v
                )
            ) - (
                Borrower_tpRho_value(
                    '100252',
                    x,
                    y.base,
                    z,
                    v
                ) ^ .5
            ) *
            InvNormal(
                1 -
                Borrower_tpConfidenceLevel_value(
                    '100274',
                    x,
                    y.base,
                    z,
                    v
                )
            )
        ) / (
            1 -
            Borrower_tpRho_value(
                '100252',
                x,
                y.base,
                z,
                v
            ) ^ .5
        )
    );
}

/* AABPRICING_Borrower_tpRiskWeight_title:'Risk Weight' */
function Borrower_tpRiskWeight_title(f, x, y, z, v) {
    return 'Risk Weight';
}

/* AABPRICING_Borrower_tpRho_value:MatrixLookup('AAB_Parameters.xls','EquityIndex',Borrower_tpEquityIndex,4) */
function Borrower_tpRho_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'EquityIndex',
        Borrower_tpEquityIndex_value(
            '100254',
            x,
            y.base,
            z,
            v
        ),
        4
    );
}

/* AABPRICING_Borrower_tpRho_title:'Rho' */
function Borrower_tpRho_title(f, x, y, z, v) {
    return 'Rho';
}

/* AABPRICING_Borrower_tpEquityIndex_value:If(Borrower_tpAGICOrSBI==0,MatrixLookup('AAB_Parameters.xls','AGICMapping',''+Borrower_tpAGIC,2),MatrixLookup('AAB_Parameters.xls','SBIMapping',''+Borrower_tpSBI,2)) */
function Borrower_tpEquityIndex_value(f, x, y, z, v) {
    return Borrower_tpAGICOrSBI_value(
        '100199',
        x,
        y.base,
        z,
        v
    ) ==
    0 ? MatrixLookup(
        'AAB_Parameters.xls',
        'AGICMapping',
        '' +
        Borrower_tpAGIC_value(
            '100205',
            x,
            y.base,
            z,
            v
        ),
        2
    ) : MatrixLookup(
        'AAB_Parameters.xls',
        'SBIMapping',
        '' +
        Borrower_tpSBI_value(
            '100222',
            x,
            y.base,
            z,
            v
        ),
        2
    );
}

/* AABPRICING_Borrower_tpEquityIndex_title:'Equity Index' */
function Borrower_tpEquityIndex_title(f, x, y, z, v) {
    return 'Equity Index';
}

/* AABPRICING_Borrower_tpFinancialInstitution_value:EvaluateAsString(If(Borrower_tpAGICOrSBI==0,MatrixLookup('AAB_Parameters.xls','AGICMapping',''+Borrower_tpAGIC,4),MatrixLookup('AAB_Parameters.xls','SBIMapping',''+Borrower_tpSBI,4))) */
function Borrower_tpFinancialInstitution_value(f, x, y, z, v) {
    return String(
        Borrower_tpAGICOrSBI_value(
            '100199',
            x,
            y.base,
            z,
            v
        ) ==
        0 ? MatrixLookup(
            'AAB_Parameters.xls',
            'AGICMapping',
            '' +
            Borrower_tpAGIC_value(
                '100205',
                x,
                y.base,
                z,
                v
            ),
            4
        ) : MatrixLookup(
            'AAB_Parameters.xls',
            'SBIMapping',
            '' +
            Borrower_tpSBI_value(
                '100222',
                x,
                y.base,
                z,
                v
            ),
            4
        )
    );
}

/* AABPRICING_Borrower_tpFinancialInstitution_title:'Financial Institution Description' */
function Borrower_tpFinancialInstitution_title(f, x, y, z, v) {
    return 'Financial Institution Description';
}

/* AABPRICING_Borrower_tpCalibrationFactor_value:MatrixLookup('AAB_Parameters.xls','CalibrationFactor',Borrower_tpCalibrationFactorID,3) */
function Borrower_tpCalibrationFactor_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalibrationFactor',
        Borrower_tpCalibrationFactorID_value(
            '100260',
            x,
            y.base,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Borrower_tpCalibrationFactor_title:'Calibration Factor' */
function Borrower_tpCalibrationFactor_title(f, x, y, z, v) {
    return 'Calibration Factor';
}

/* AABPRICING_Borrower_tpCalibrationFactorID_value:EvaluateAsString(Borrower_tpRating+'_'+Borrower_tpClientGroup) */
function Borrower_tpCalibrationFactorID_value(f, x, y, z, v) {
    return String(
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ) + '_' +
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpCalibrationFactorID_title:'Calibration Factor ID' */
function Borrower_tpCalibrationFactorID_title(f, x, y, z, v) {
    return 'Calibration Factor ID';
}

/* AABPRICING_Borrower_tpEAD_value:TupleSum(Facility_tpEAD) */
function Borrower_tpEAD_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpEAD_value(
            '101058',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpEAD_title:'Exposure At Default' */
function Borrower_tpEAD_title(f, x, y, z, v) {
    return 'Exposure At Default';
}

/* AABPRICING_Borrower_tpAverageEAD_value:undefined */
function Borrower_tpAverageEAD_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpAverageEAD_title:'Average EAD' */
function Borrower_tpAverageEAD_title(f, x, y, z, v) {
    return 'Average EAD';
}

/* AABPRICING_Borrower_tpSumExpectedAverageOutstanding_value:TupleSum(Facility_tpExpectedAverageOutstanding) */
function Borrower_tpSumExpectedAverageOutstanding_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpSumExpectedAverageOutstanding_title:'Total Expected Average Outstanding Borrower' */
function Borrower_tpSumExpectedAverageOutstanding_title(f, x, y, z, v) {
    return 'Total Expected Average Outstanding Borrower';
}

/* AABPRICING_Borrower_tpNrOfFacilities_value:TupleCount(Facility_tpID) */
function Borrower_tpNrOfFacilities_value(f, x, y, z, v) {
    return TupleCount(
        Facility_tpID_value(
            '100538',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpNrOfFacilities_title:'Number of Facilities' */
function Borrower_tpNrOfFacilities_title(f, x, y, z, v) {
    return 'Number of Facilities';
}

/* AABPRICING_Borrower_tpEquityRatio_value:Matrixlookup('AAB_Parameters.xls','CalculationParameters','AllocatedEquityRatio',2) */
function Borrower_tpEquityRatio_value(f, x, y, z, v) {
    return Matrixlookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'AllocatedEquityRatio',
        2
    );
}

/* AABPRICING_Borrower_tpEquityRatio_title:'Equity Ratio' */
function Borrower_tpEquityRatio_title(f, x, y, z, v) {
    return 'Equity Ratio';
}

/* AABPRICING_Borrower_tpCostofEquity_value:MatrixLookup('AAB_Parameters.xls','ClientGroup',Borrower_tpClientGroup,6) */
function Borrower_tpCostofEquity_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ClientGroup',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        6
    );
}

/* AABPRICING_Borrower_tpCostofEquity_title:'Cost of Equity' */
function Borrower_tpCostofEquity_title(f, x, y, z, v) {
    return 'Cost of Equity';
}

/* AABPRICING_Borrower_tpConfidenceLevel_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','ConfidenceLevel',2) */
function Borrower_tpConfidenceLevel_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'ConfidenceLevel',
        2
    );
}

/* AABPRICING_Borrower_tpConfidenceLevel_title:'Confidence Level' */
function Borrower_tpConfidenceLevel_title(f, x, y, z, v) {
    return 'Confidence Level';
}

/* AABPRICING_Borrower_tpEffectiveCostOfCapital_value:MatrixLookup('AAB_Parameters.xls','ClientGroup',Borrower_tpClientGroup,8) */
function Borrower_tpEffectiveCostOfCapital_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ClientGroup',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        8
    );
}

/* AABPRICING_Borrower_tpEffectiveCostOfCapital_title:'Effective Cost of Capital ()' */
function Borrower_tpEffectiveCostOfCapital_title(f, x, y, z, v) {
    return 'Effective Cost of Capital ()';
}

/* AABPRICING_Borrower_tpFixedCostOperatingConcept_value:AgreementFixedCostOperatingConcept/AgreementNumberOfBorrowers */
function Borrower_tpFixedCostOperatingConcept_value(f, x, y, z, v) {
    return AgreementFixedCostOperatingConcept_value(
        '100112',
        x,
        y.base,
        z,
        v
        ) /
        AgreementNumberOfBorrowers_value(
            '100110',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpFixedCostOperatingConcept_title:'Fixed Cost Operating Concept' */
function Borrower_tpFixedCostOperatingConcept_title(f, x, y, z, v) {
    return 'Fixed Cost Operating Concept';
}

/* AABPRICING_Borrower_tpAmountFixedCostOperatingConceptClientGroup_value:MatrixLookup('AAB_Parameters.xls','ClientGroup',Borrower_tpClientGroup,4) */
function Borrower_tpAmountFixedCostOperatingConceptClientGroup_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ClientGroup',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        4
    );
}

/* AABPRICING_Borrower_tpAmountFixedCostOperatingConceptClientGroup_title:'Amount Fixed Cost Operating Concept for Client Group' */
function Borrower_tpAmountFixedCostOperatingConceptClientGroup_title(f, x, y, z, v) {
    return 'Amount Fixed Cost Operating Concept for Client Group';
}

/* AABPRICING_Borrower_tpPLorNPL_value:1 */
function Borrower_tpPLorNPL_value(f, x, y, z, v) {
    return 1;
}

/* AABPRICING_Borrower_tpPLorNPL_title:'PL / NPL account' */
function Borrower_tpPLorNPL_title(f, x, y, z, v) {
    return 'PL / NPL account';
}

/* AABPRICING_Borrower_tpPLorNPL_choices:[{'name':' 1','value':'PL'},{'name':'0','value':'NPL'}] */
function Borrower_tpPLorNPL_choices(f, x, y, z, v) {
    return [{'name': ' 1', 'value': 'PL'}, {'name': '0', 'value': 'NPL'}];
}

/* AABPRICING_Borrower_tpNonCreditIncome_Total_value:TupleSum(Borrower_tpNonCredit_tpIncome_Amount) */
function Borrower_tpNonCreditIncome_Total_value(f, x, y, z, v) {
    return TupleSum(
        Borrower_tpNonCredit_tpIncome_Amount_value(
            '100453',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpNonCreditIncome_Total_title:'Cross Sell Total Income' */
function Borrower_tpNonCreditIncome_Total_title(f, x, y, z, v) {
    return 'Cross Sell Total Income';
}

/* AABPRICING_Borrower_tpNonCreditCosts_Total_value:TupleSum(Borrower_tpNonCredit_tpCosts)+Borrower_tpNonCreditCostsCostPerServiceConcept */
function Borrower_tpNonCreditCosts_Total_value(f, x, y, z, v) {
    return TupleSum(
        Borrower_tpNonCredit_tpCosts_value(
            '100455',
            x,
            y,
            z,
            v
        )
        ) +
        Borrower_tpNonCreditCostsCostPerServiceConcept_value(
            '100289',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpNonCreditCosts_Total_title:'Cross Sell Total Costs' */
function Borrower_tpNonCreditCosts_Total_title(f, x, y, z, v) {
    return 'Cross Sell Total Costs';
}

/* AABPRICING_Borrower_tpNonCreditCostsCostPerServiceConcept_value:(1-AgreementPercentageOperatingConcept)*Borrower_tpFixedCostOperatingConcept */
function Borrower_tpNonCreditCostsCostPerServiceConcept_value(f, x, y, z, v) {
    return (
            1 -
            AgreementPercentageOperatingConcept_value(
                '100114',
                x,
                y.base,
                z,
                v
            )
        ) *
        Borrower_tpFixedCostOperatingConcept_value(
            '100278',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpNonCreditCostsCostPerServiceConcept_title:'Non Credit Costs - Cost Per Service Concept' */
function Borrower_tpNonCreditCostsCostPerServiceConcept_title(f, x, y, z, v) {
    return 'Non Credit Costs - Cost Per Service Concept';
}

/* AABPRICING_Borrower_tpPercentageOperatingConcept_value:MatrixLookup('AAB_Parameters.xls','ClientGroup',Borrower_tpClientGroup,5) */
function Borrower_tpPercentageOperatingConcept_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ClientGroup',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        5
    );
}

/* AABPRICING_Borrower_tpPercentageOperatingConcept_title:'Credit Cost per Service Concept - Percentage Operating Concept' */
function Borrower_tpPercentageOperatingConcept_title(f, x, y, z, v) {
    return 'Credit Cost per Service Concept - Percentage Operating Concept';
}

/* AABPRICING_Borrower_tpSBIName_value:EvaluateAsString(MatrixLookup('AAB_Parameters.xls','SBIMapping',''+Borrower_tpSBI,1)) */
function Borrower_tpSBIName_value(f, x, y, z, v) {
    return String(
        MatrixLookup(
            'AAB_Parameters.xls',
            'SBIMapping',
            '' +
            Borrower_tpSBI_value(
                '100222',
                x,
                y.base,
                z,
                v
            ),
            1
        )
    );
}

/* AABPRICING_Borrower_tpSBIName_title:'SBI branche naam' */
function Borrower_tpSBIName_title(f, x, y, z, v) {
    return 'SBI branche naam';
}

/* AABPRICING_Borrower_tpHiddenVariablesBorrowerInformation_value:undefined */
function Borrower_tpHiddenVariablesBorrowerInformation_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpHiddenVariablesBorrowerInformation_title:'Hidden variables for Borrower section Compact Report' */
function Borrower_tpHiddenVariablesBorrowerInformation_title(f, x, y, z, v) {
    return 'Hidden variables for Borrower section Compact Report';
}

/* AABPRICING_Borrower_tpBrancheDescriptionCompactReport_value:EvaluateAsString(If(Borrower_tpAGICOrSBI==0,Borrower_tpAGICChoiceName,Borrower_tpSBIName)) */
function Borrower_tpBrancheDescriptionCompactReport_value(f, x, y, z, v) {
    return String(
        Borrower_tpAGICOrSBI_value(
            '100199',
            x,
            y.base,
            z,
            v
        ) ==
        0 ? Borrower_tpAGICChoiceName_value(
            '100299',
            x,
            y.base,
            z,
            v
        ) : Borrower_tpSBIName_value(
            '100293',
            x,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpBrancheDescriptionCompactReport_title:'AGIC/SBI Code' */
function Borrower_tpBrancheDescriptionCompactReport_title(f, x, y, z, v) {
    return 'AGIC/SBI Code';
}

/* AABPRICING_Borrower_tpAGICChoiceName_value:undefined */
function Borrower_tpAGICChoiceName_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpAGICChoiceName_title:'AGIC Sector Description' */
function Borrower_tpAGICChoiceName_title(f, x, y, z, v) {
    return 'AGIC Sector Description';
}

/* AABPRICING_Borrower_tpProfitAndLossClient_value:undefined */
function Borrower_tpProfitAndLossClient_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpProfitAndLossClient_title:'Profit&&Losses - Credit' */
function Borrower_tpProfitAndLossClient_title(f, x, y, z, v) {
    return 'Profit&&Losses - Credit';
}

/* AABPRICING_Borrower_tpIncome_value:Borrower_tpInterestIncome+Borrower_tpCreditRelatedFee */
function Borrower_tpIncome_value(f, x, y, z, v) {
    return Borrower_tpInterestIncome_value(
        '100304',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCreditRelatedFee_value(
            '100305',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpInterestIncome_value:TupleSum(Facility_tpInterestIncome) */
function Borrower_tpInterestIncome_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpInterestIncome_value(
            '101194',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpCreditRelatedFee_value:TupleSum(Facility_tpCreditRelatedFee) */
function Borrower_tpCreditRelatedFee_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpCreditRelatedFee_value(
            '101161',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpOptionCostsIndLiqPremium_value:TupleSum(Facility_tpOptionCostsIndLiqPrem) */
function Borrower_tpOptionCostsIndLiqPremium_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpOptionCostsIndLiqPrem_value(
            '101201',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpOptionCostsIndLiqPremium_title:'Option Costs/Ind. Liq. Premium' */
function Borrower_tpOptionCostsIndLiqPremium_title(f, x, y, z, v) {
    return 'Option Costs/Ind. Liq. Premium';
}

/* AABPRICING_Borrower_tpIndirectLiquidityCosts_value:TupleSum(Facility_tpIndirectLiquidityCosts) */
function Borrower_tpIndirectLiquidityCosts_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpIndirectLiquidityCosts_value(
            '101300',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpPrepaymentCosts_value:TupleSum(Facility_tpPrepaymentCosts) */
function Borrower_tpPrepaymentCosts_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpPrepaymentCosts_value(
            '101282',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpPrepaymentCosts_title:'Prepayment Costs' */
function Borrower_tpPrepaymentCosts_title(f, x, y, z, v) {
    return 'Prepayment Costs';
}

/* AABPRICING_Borrower_tpPipelineRisk_value:TupleSum(Facility_tpPipelineRisk) */
function Borrower_tpPipelineRisk_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpPipelineRisk_value(
            '101286',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpPipelineRisk_title:'Pipeline Risk' */
function Borrower_tpPipelineRisk_title(f, x, y, z, v) {
    return 'Pipeline Risk';
}

/* AABPRICING_Borrower_tpDirectLiquidityPremium_value:TupleSum(Facility_tpDirectLiquidityPremium) */
function Borrower_tpDirectLiquidityPremium_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpDirectLiquidityPremium_value(
            '101248',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpSubordinatedDebtCapitalCharge_value:TupleSum(Facility_tpSubordinatedDebtCapitalCharge) */
function Borrower_tpSubordinatedDebtCapitalCharge_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpSubordinatedDebtCapitalCharge_value(
            '101367',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpEquityFundingAdjustment_value:TupleSum(Facility_tpEquityFundingAdjustment) */
function Borrower_tpEquityFundingAdjustment_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpEquityFundingAdjustment_value(
            '101372',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpOperationalCosts_value:Borrower_tpCostPerContract+Borrower_tpCostOverVolume+Borrower_tpCostPerServiceConcept */
function Borrower_tpOperationalCosts_value(f, x, y, z, v) {
    return Borrower_tpCostPerContract_value(
        '100317',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCostOverVolume_value(
            '100321',
            x,
            y.base,
            z,
            v
        ) +
        Borrower_tpCostPerServiceConcept_value(
            '100319',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpCostPerContract_value:TupleSum(Facility_tpCostPerContract) */
function Borrower_tpCostPerContract_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpCostPerContract_value(
            '101229',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpCostPerContract_title:'Cost per Contract' */
function Borrower_tpCostPerContract_title(f, x, y, z, v) {
    return 'Cost per Contract';
}

/* AABPRICING_Borrower_tpCostPerServiceConcept_value:Borrower_tpFixedCostOperatingConcept*AgreementPercentageOperatingConcept */
function Borrower_tpCostPerServiceConcept_value(f, x, y, z, v) {
    return Borrower_tpFixedCostOperatingConcept_value(
        '100278',
        x,
        y.base,
        z,
        v
        ) *
        AgreementPercentageOperatingConcept_value(
            '100114',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpCostPerServiceConcept_title:'Cost per Service Concept' */
function Borrower_tpCostPerServiceConcept_title(f, x, y, z, v) {
    return 'Cost per Service Concept';
}

/* AABPRICING_Borrower_tpCostOverVolume_value:TupleSum(Facility_tpCostOverVolume) */
function Borrower_tpCostOverVolume_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpCostOverVolume_value(
            '101233',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpCostOverVolume_title:'Cost over Volume' */
function Borrower_tpCostOverVolume_title(f, x, y, z, v) {
    return 'Cost over Volume';
}

/* AABPRICING_Borrower_tpInternalExpectedLoss_value:TupleSum(Facility_tpInternalExpectedLoss) */
function Borrower_tpInternalExpectedLoss_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpInternalExpectedLoss_value(
            '101205',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpTax_value:(Borrower_tpIncome-Borrower_tpPrepaymentCosts-Borrower_tpPipelineRisk-Borrower_tpIndirectLiquidityCosts-Borrower_tpDirectLiquidityPremium-Borrower_tpOperationalCosts-Borrower_tpSubordinatedDebtCapitalCharge+Borrower_tpEquityFundingAdjustment-Borrower_tpInternalExpectedLoss)*Borrower_tpTaxRate */
function Borrower_tpTax_value(f, x, y, z, v) {
    return (
            Borrower_tpIncome_value(
                '100303',
                x,
                y.base,
                z,
                v
            ) -
            Borrower_tpPrepaymentCosts_value(
                '100309',
                x,
                y.base,
                z,
                v
            ) -
            Borrower_tpPipelineRisk_value(
                '100311',
                x,
                y.base,
                z,
                v
            ) -
            Borrower_tpIndirectLiquidityCosts_value(
                '100308',
                x,
                y.base,
                z,
                v
            ) -
            Borrower_tpDirectLiquidityPremium_value(
                '100313',
                x,
                y.base,
                z,
                v
            ) -
            Borrower_tpOperationalCosts_value(
                '100316',
                x,
                y.base,
                z,
                v
            ) -
            Borrower_tpSubordinatedDebtCapitalCharge_value(
                '100314',
                x,
                y.base,
                z,
                v
            ) +
            Borrower_tpEquityFundingAdjustment_value(
                '100315',
                x,
                y.base,
                z,
                v
            ) -
            Borrower_tpInternalExpectedLoss_value(
                '100323',
                x,
                y.base,
                z,
                v
            )
        ) *
        Borrower_tpTaxRate_value(
            '100236',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpRiskAdjustedReturn_value:Borrower_tpIncome-Borrower_tpPrepaymentCosts-Borrower_tpPipelineRisk-Borrower_tpIndirectLiquidityCosts-Borrower_tpDirectLiquidityPremium-Borrower_tpOperationalCosts-Borrower_tpSubordinatedDebtCapitalCharge+Borrower_tpEquityFundingAdjustment-Borrower_tpInternalExpectedLoss-Borrower_tpTax */
function Borrower_tpRiskAdjustedReturn_value(f, x, y, z, v) {
    return Borrower_tpIncome_value(
        '100303',
        x,
        y.base,
        z,
        v
        ) -
        Borrower_tpPrepaymentCosts_value(
            '100309',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpPipelineRisk_value(
            '100311',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpIndirectLiquidityCosts_value(
            '100308',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpDirectLiquidityPremium_value(
            '100313',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpOperationalCosts_value(
            '100316',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpSubordinatedDebtCapitalCharge_value(
            '100314',
            x,
            y.base,
            z,
            v
        ) +
        Borrower_tpEquityFundingAdjustment_value(
            '100315',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpInternalExpectedLoss_value(
            '100323',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpTax_value(
            '100324',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpRiskAdjustedReturn_title:'Risk Adjusted Return' */
function Borrower_tpRiskAdjustedReturn_title(f, x, y, z, v) {
    return 'Risk Adjusted Return';
}

/* AABPRICING_Borrower_tpReturnOnEquity_value:OnER(Borrower_tpRiskAdjustedReturn/Borrower_tpRequiredAmountOfEquity,NA) */
function Borrower_tpReturnOnEquity_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpRiskAdjustedReturn_value(
            '100325',
            x,
            y.base,
            z,
            v
        ) /
        Borrower_tpRequiredAmountOfEquity_value(
            '100328',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpRequiredAmountOfEquity_value:TupleSum(Facility_tpRequiredAmountofEquity) */
function Borrower_tpRequiredAmountOfEquity_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpRequiredAmountofEquity_value(
            '101378',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpRequiredAmountOfEquity_title:'Required Amount of Equity' */
function Borrower_tpRequiredAmountOfEquity_title(f, x, y, z, v) {
    return 'Required Amount of Equity';
}

/* AABPRICING_Borrower_tpRaRoRaC_value:OnER(Borrower_tpRiskAdjustedReturn/Borrower_tpEconomicCapital,NA) */
function Borrower_tpRaRoRaC_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpRiskAdjustedReturn_value(
            '100325',
            x,
            y.base,
            z,
            v
        ) /
        Borrower_tpEconomicCapital_value(
            '100331',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpEconomicCapital_value:Borrower_tpOperationalRisk+Borrower_tpBusinessRisk+Borrower_tpCreditRisk */
function Borrower_tpEconomicCapital_value(f, x, y, z, v) {
    return Borrower_tpOperationalRisk_value(
        '100332',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpBusinessRisk_value(
            '100333',
            x,
            y.base,
            z,
            v
        ) +
        Borrower_tpCreditRisk_value(
            '100334',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpOperationalRisk_value:TupleSum(Facility_tpORCreditRisk) */
function Borrower_tpOperationalRisk_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpORCreditRisk_value(
            '101036',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpBusinessRisk_value:TupleSum(Facility_tpBRCreditRisk) */
function Borrower_tpBusinessRisk_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpBRCreditRisk_value(
            '101041',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpCreditRisk_value:TupleSum(Facility_tpCreditRisk) */
function Borrower_tpCreditRisk_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpCreditRisk_value(
            '101045',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpRegulatoryProfit_value:OnER(Borrower_tpRiskAdjustedReturn-Borrower_tpEquityCapitalCharge,NA) */
function Borrower_tpRegulatoryProfit_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpRiskAdjustedReturn_value(
            '100325',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpEquityCapitalCharge_value(
            '100336',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpEquityCapitalCharge_value:TupleSum(Facility_tpEquityCapitalCharge) */
function Borrower_tpEquityCapitalCharge_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpEquityCapitalCharge_value(
            '101377',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpEconomicProfit_value:OnER(Borrower_tpRiskAdjustedReturn-Borrower_tpEconomicCapital*Borrower_tpEffectiveCostOfCapital,NA) */
function Borrower_tpEconomicProfit_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpRiskAdjustedReturn_value(
            '100325',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpEconomicCapital_value(
            '100331',
            x,
            y.base,
            z,
            v
        ) *
        Borrower_tpEffectiveCostOfCapital_value(
            '100276',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpEconomicProfitSub1_value:undefined */
function Borrower_tpEconomicProfitSub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpCostOfEconomicCapital_value:Borrower_tpEconomicCapital*Borrower_tpEffectiveCostOfCapital */
function Borrower_tpCostOfEconomicCapital_value(f, x, y, z, v) {
    return Borrower_tpEconomicCapital_value(
        '100331',
        x,
        y.base,
        z,
        v
        ) *
        Borrower_tpEffectiveCostOfCapital_value(
            '100276',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpCostOfEconomicCapital_title:'Cost of Economic Capital' */
function Borrower_tpCostOfEconomicCapital_title(f, x, y, z, v) {
    return 'Cost of Economic Capital';
}

/* AABPRICING_Borrower_tpCostOfEconomicCapitalSub1_value:undefined */
function Borrower_tpCostOfEconomicCapitalSub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpCostOfEconomicCapitalSub2_value:undefined */
function Borrower_tpCostOfEconomicCapitalSub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpCostOfEconomicCapitalSub2_title:'Effective Cost of Capital' */
function Borrower_tpCostOfEconomicCapitalSub2_title(f, x, y, z, v) {
    return 'Effective Cost of Capital';
}

/* AABPRICING_Borrower_tpOtherMetrics_value:undefined */
function Borrower_tpOtherMetrics_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpPrincipalLimit_value:TupleSum(Facility_tpPrincipalLimit) */
function Borrower_tpPrincipalLimit_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpPrincipalLimit_value(
            '100544',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpExpectedAverageOutstanding_value:TupleSum(Facility_tpExpectedAverageOutstanding) */
function Borrower_tpExpectedAverageOutstanding_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpExpectedAverageOutstanding_title:'ExpectedAverageOutstanding' */
function Borrower_tpExpectedAverageOutstanding_title(f, x, y, z, v) {
    return 'ExpectedAverageOutstanding';
}

/* AABPRICING_Borrower_tpRWA_value:Borrower_tpRWACreditRisk+Borrower_tpRWAOperationalRisk */
function Borrower_tpRWA_value(f, x, y, z, v) {
    return Borrower_tpRWACreditRisk_value(
        '100349',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpRWAOperationalRisk_value(
            '100350',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpRWACreditRisk_value:TupleSum(Facility_tpRWACreditRisk) */
function Borrower_tpRWACreditRisk_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpRWACreditRisk_value(
            '101381',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpRWAOperationalRisk_value:TupleSum(Facility_tpRWAOperationalRisk) */
function Borrower_tpRWAOperationalRisk_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpRWAOperationalRisk_value(
            '101418',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpOtherMetricsSub4_value:undefined */
function Borrower_tpOtherMetricsSub4_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpHiddenVariables_value:undefined */
function Borrower_tpHiddenVariables_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpHiddenVariables_title:'Hidden variables voor P/L Compact Report' */
function Borrower_tpHiddenVariables_title(f, x, y, z, v) {
    return 'Hidden variables voor P/L Compact Report';
}

/* AABPRICING_Borrower_tpFacilityEquityFundingAdjustmentTotal_value:undefined */
function Borrower_tpFacilityEquityFundingAdjustmentTotal_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpFacilityEquityFundingAdjustmentTotal_title:'Total Facility Equity Funding Adjustment' */
function Borrower_tpFacilityEquityFundingAdjustmentTotal_title(f, x, y, z, v) {
    return 'Total Facility Equity Funding Adjustment';
}

/* AABPRICING_Borrower_tpFacilityRWATotal_value:TupleSum(Facility_tpRWA) */
function Borrower_tpFacilityRWATotal_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpRWA_value(
            '101380',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpFacilityRWATotal_title:'Total Facility RWA excl. X-sell' */
function Borrower_tpFacilityRWATotal_title(f, x, y, z, v) {
    return 'Total Facility RWA excl. X-sell';
}

/* AABPRICING_Borrower_tpTaxAndOther_value:Borrower_tpSubordinatedDebtCapitalCharge+Borrower_tpEquityFundingAdjustment+Borrower_tpTax */
function Borrower_tpTaxAndOther_value(f, x, y, z, v) {
    return Borrower_tpSubordinatedDebtCapitalCharge_value(
        '100314',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpEquityFundingAdjustment_value(
            '100315',
            x,
            y.base,
            z,
            v
        ) +
        Borrower_tpTax_value(
            '100324',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpTaxAndOther_title:'Tax&&Other' */
function Borrower_tpTaxAndOther_title(f, x, y, z, v) {
    return 'Tax&&Other';
}

/* AABPRICING_Borrower_tpCrossSellProfitAndLossClient_value:undefined */
function Borrower_tpCrossSellProfitAndLossClient_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpCrossSellProfitAndLossClient_title:'Profit&&Losses - Cross Sell' */
function Borrower_tpCrossSellProfitAndLossClient_title(f, x, y, z, v) {
    return 'Profit&&Losses - Cross Sell';
}

/* AABPRICING_Borrower_tpCrossSellIncome_value:OnNA(Borrower_tpNonCreditIncome_Total,0) */
function Borrower_tpCrossSellIncome_value(f, x, y, z, v) {
    return OnNA(
        Borrower_tpNonCreditIncome_Total_value(
            '100285',
            x,
            y.base,
            z,
            v
        ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellIndirectLiquidityCosts_value:0 */
function Borrower_tpCrossSellIndirectLiquidityCosts_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Borrower_tpCrossSellDirectLiquidityPremium_value:0 */
function Borrower_tpCrossSellDirectLiquidityPremium_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Borrower_tpCrossSellSubordinatedDebtCapitalCharge_value:OnNA(If(AgreementMaxRemainingTenor<12,Borrower_tpCrossSellRWAOperationalRisk*AgreementSubDebtRatio*(AgreementCostOfSubordination/1e4)*(AgreementMaxRemainingTenor/12),Borrower_tpCrossSellRWAOperationalRisk*AgreementSubDebtRatio*(AgreementCostOfSubordination/1e4)),0) */
function Borrower_tpCrossSellSubordinatedDebtCapitalCharge_value(f, x, y, z, v) {
    return OnNA(
        AgreementMaxRemainingTenor_value(
            '100108',
            x,
            y.base,
            z,
            v
        ) <
        12 ? Borrower_tpCrossSellRWAOperationalRisk_value(
            '100386',
            x,
            y.base,
            z,
            v
            ) *
            AgreementSubDebtRatio_value(
                '100116',
                x,
                y.base,
                z,
                v
            ) * (
                AgreementCostOfSubordination_value(
                    '100118',
                    x,
                    y.base,
                    z,
                    v
                ) / 1e4
            ) * (
                AgreementMaxRemainingTenor_value(
                    '100108',
                    x,
                    y.base,
                    z,
                    v
                ) / 12
            ) : Borrower_tpCrossSellRWAOperationalRisk_value(
            '100386',
            x,
            y.base,
            z,
            v
            ) *
            AgreementSubDebtRatio_value(
                '100116',
                x,
                y.base,
                z,
                v
            ) * (
                AgreementCostOfSubordination_value(
                    '100118',
                    x,
                    y.base,
                    z,
                    v
                ) / 1e4
            ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellEquityFundingAdjustment_value:OnER(If(AgreementMaxRemainingTenor<12,(Borrower_tpCrossSellRWAOperationalRisk*Borrower_tpEquityRatio-AgreementAvailableAmountOfEquity)*(MatrixLookup('AAB_Parameters.xls','CalculationParameters','3MAANDSEURIBORBP',2)/1e4)*(AgreementMaxRemainingTenor/12),(Borrower_tpCrossSellRWAOperationalRisk*Borrower_tpEquityRatio-AgreementAvailableAmountOfEquity)*(MatrixLookup('AAB_Parameters.xls','CalculationParameters','3MAANDSEURIBORBP',2)/1e4)),NA) */
function Borrower_tpCrossSellEquityFundingAdjustment_value(f, x, y, z, v) {
    return OnER(
        AgreementMaxRemainingTenor_value(
            '100108',
            x,
            y.base,
            z,
            v
        ) <
        12 ? (
            Borrower_tpCrossSellRWAOperationalRisk_value(
                '100386',
                x,
                y.base,
                z,
                v
            ) *
            Borrower_tpEquityRatio_value(
                '100270',
                x,
                y.base,
                z,
                v
            ) -
            AgreementAvailableAmountOfEquity_value(
                '100120',
                x,
                y.base,
                z,
                v
            )
        ) * (
            MatrixLookup(
                'AAB_Parameters.xls',
                'CalculationParameters',
                '3MAANDSEURIBORBP',
                2
            ) / 1e4
        ) * (
            AgreementMaxRemainingTenor_value(
                '100108',
                x,
                y.base,
                z,
                v
            ) / 12
        ) : (
            Borrower_tpCrossSellRWAOperationalRisk_value(
                '100386',
                x,
                y.base,
                z,
                v
            ) *
            Borrower_tpEquityRatio_value(
                '100270',
                x,
                y.base,
                z,
                v
            ) -
            AgreementAvailableAmountOfEquity_value(
                '100120',
                x,
                y.base,
                z,
                v
            )
        ) * (
            MatrixLookup(
                'AAB_Parameters.xls',
                'CalculationParameters',
                '3MAANDSEURIBORBP',
                2
            ) / 1e4
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpCrossSellOperationalCosts_value:OnNA(Borrower_tpNonCreditCosts_Total,0) */
function Borrower_tpCrossSellOperationalCosts_value(f, x, y, z, v) {
    return OnNA(
        Borrower_tpNonCreditCosts_Total_value(
            '100287',
            x,
            y.base,
            z,
            v
        ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellInternalExpectedLoss_value:0 */
function Borrower_tpCrossSellInternalExpectedLoss_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Borrower_tpCrossSellTax_value:(Borrower_tpNonCreditIncome_Total-Borrower_tpNonCreditCosts_Total)*Borrower_tpTaxRate */
function Borrower_tpCrossSellTax_value(f, x, y, z, v) {
    return (
            Borrower_tpNonCreditIncome_Total_value(
                '100285',
                x,
                y.base,
                z,
                v
            ) -
            Borrower_tpNonCreditCosts_Total_value(
                '100287',
                x,
                y.base,
                z,
                v
            )
        ) *
        Borrower_tpTaxRate_value(
            '100236',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpCrossSellRiskAdjustedReturn_value:Borrower_tpCrossSellIncome-Borrower_tpCrossSellIndirectLiquidityCosts-Borrower_tpCrossSellDirectLiquidityPremium-Borrower_tpCrossSellOperationalCosts-Borrower_tpCrossSellSubordinatedDebtCapitalCharge+Borrower_tpCrossSellEquityFundingAdjustment-Borrower_tpCrossSellInternalExpectedLoss-Borrower_tpCrossSellTax */
function Borrower_tpCrossSellRiskAdjustedReturn_value(f, x, y, z, v) {
    return Borrower_tpCrossSellIncome_value(
        '100362',
        x,
        y.base,
        z,
        v
        ) -
        Borrower_tpCrossSellIndirectLiquidityCosts_value(
            '100363',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpCrossSellDirectLiquidityPremium_value(
            '100364',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpCrossSellOperationalCosts_value(
            '100367',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpCrossSellSubordinatedDebtCapitalCharge_value(
            '100365',
            x,
            y.base,
            z,
            v
        ) +
        Borrower_tpCrossSellEquityFundingAdjustment_value(
            '100366',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpCrossSellInternalExpectedLoss_value(
            '100368',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpCrossSellTax_value(
            '100369',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpCrossSellReturnOnEquity_value:OnER(Borrower_tpCrossSellRiskAdjustedReturn/Borrower_tpCrossSellRequiredAmountOfEquity,NA) */
function Borrower_tpCrossSellReturnOnEquity_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpCrossSellRiskAdjustedReturn_value(
            '100370',
            x,
            y.base,
            z,
            v
        ) /
        Borrower_tpCrossSellRequiredAmountOfEquity_value(
            '100372',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpCrossSellRequiredAmountOfEquity_value:OnNA(Borrower_tpCrossSellRWA*Borrower_tpEquityRatio,0) */
function Borrower_tpCrossSellRequiredAmountOfEquity_value(f, x, y, z, v) {
    return OnNA(
        Borrower_tpCrossSellRWA_value(
            '100385',
            x,
            y.base,
            z,
            v
        ) *
        Borrower_tpEquityRatio_value(
            '100270',
            x,
            y.base,
            z,
            v
        ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellRaRoRaC_value:OnER(Borrower_tpCrossSellRiskAdjustedReturn/Borrower_tpCrossSellEconomicCapital,NA) */
function Borrower_tpCrossSellRaRoRaC_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpCrossSellRiskAdjustedReturn_value(
            '100370',
            x,
            y.base,
            z,
            v
        ) /
        Borrower_tpCrossSellEconomicCapital_value(
            '100374',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpCrossSellEconomicCapital_value:OnNA(Borrower_tpCrossSellOperationalRisk+Borrower_tpCrossSellBusinessRisk,0) */
function Borrower_tpCrossSellEconomicCapital_value(f, x, y, z, v) {
    return OnNA(
        Borrower_tpCrossSellOperationalRisk_value(
            '100375',
            x,
            y.base,
            z,
            v
        ) +
        Borrower_tpCrossSellBusinessRisk_value(
            '100376',
            x,
            y.base,
            z,
            v
        ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellOperationalRisk_value:OnNA(TupleSum(Borrower_tpNonCredit_tpORNonCreditRisk),0) */
function Borrower_tpCrossSellOperationalRisk_value(f, x, y, z, v) {
    return OnNA(
        TupleSum(
            Borrower_tpNonCredit_tpORNonCreditRisk_value(
                '100473',
                x,
                y,
                z,
                v
            )
        ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellBusinessRisk_value:OnNA(TupleSum(Borrower_tpNonCredit_tpBRNonCreditRisk),0) */
function Borrower_tpCrossSellBusinessRisk_value(f, x, y, z, v) {
    return OnNA(
        TupleSum(
            Borrower_tpNonCredit_tpBRNonCreditRisk_value(
                '100469',
                x,
                y,
                z,
                v
            )
        ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellRegulatoryProfit_value:OnER(Borrower_tpCrossSellRiskAdjustedReturn-Borrower_tpCrossSellEquityCapitalCharge,NA) */
function Borrower_tpCrossSellRegulatoryProfit_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpCrossSellRiskAdjustedReturn_value(
            '100370',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpCrossSellEquityCapitalCharge_value(
            '100378',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpCrossSellEquityCapitalCharge_value:OnNA(TupleSum(Borrower_tpNonCredit_tpEquityCapitalCharge),0) */
function Borrower_tpCrossSellEquityCapitalCharge_value(f, x, y, z, v) {
    return OnNA(
        TupleSum(
            Borrower_tpNonCredit_tpEquityCapitalCharge_value(
                '100479',
                x,
                y,
                z,
                v
            )
        ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellEconomicProfit_value:OnER(Borrower_tpCrossSellRiskAdjustedReturn-Borrower_tpCrossSellEconomicCapital*Borrower_tpEffectiveCostOfCapital,NA) */
function Borrower_tpCrossSellEconomicProfit_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpCrossSellRiskAdjustedReturn_value(
            '100370',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpCrossSellEconomicCapital_value(
            '100374',
            x,
            y.base,
            z,
            v
        ) *
        Borrower_tpEffectiveCostOfCapital_value(
            '100276',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpCrossSellEconomicProfitSub1_value:undefined */
function Borrower_tpCrossSellEconomicProfitSub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpCrossSellCostOfEconomicCapital_value:Borrower_tpCrossSellEconomicCapital*Borrower_tpEffectiveCostOfCapital */
function Borrower_tpCrossSellCostOfEconomicCapital_value(f, x, y, z, v) {
    return Borrower_tpCrossSellEconomicCapital_value(
        '100374',
        x,
        y.base,
        z,
        v
        ) *
        Borrower_tpEffectiveCostOfCapital_value(
            '100276',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpCrossSellCostOfEconomicCapitalSub1_value:undefined */
function Borrower_tpCrossSellCostOfEconomicCapitalSub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpCrossSellCostOfEconomicCapitalSub2_value:undefined */
function Borrower_tpCrossSellCostOfEconomicCapitalSub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpCrossSellOtherMetrics_value:undefined */
function Borrower_tpCrossSellOtherMetrics_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpCrossSellRWA_value:OnNA(Borrower_tpCrossSellRWAOperationalRisk,0) */
function Borrower_tpCrossSellRWA_value(f, x, y, z, v) {
    return OnNA(
        Borrower_tpCrossSellRWAOperationalRisk_value(
            '100386',
            x,
            y.base,
            z,
            v
        ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellRWAOperationalRisk_value:OnNA(TupleSum(Borrower_tpNonCredit_tpRWAORNonCredit),0) */
function Borrower_tpCrossSellRWAOperationalRisk_value(f, x, y, z, v) {
    return OnNA(
        TupleSum(
            Borrower_tpNonCredit_tpRWAORNonCredit_value(
                '100477',
                x,
                y,
                z,
                v
            )
        ),
        0
    );
}

/* AABPRICING_Borrower_tpCrossSellNonCreditNetIncome_Total_value:Borrower_tpNonCreditIncome_Total-Borrower_tpNonCreditCosts_Total */
function Borrower_tpCrossSellNonCreditNetIncome_Total_value(f, x, y, z, v) {
    return Borrower_tpNonCreditIncome_Total_value(
        '100285',
        x,
        y.base,
        z,
        v
        ) -
        Borrower_tpNonCreditCosts_Total_value(
            '100287',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpCrossSellNonCreditNetIncome_Total_title:'Total Non Credit Net Income' */
function Borrower_tpCrossSellNonCreditNetIncome_Total_title(f, x, y, z, v) {
    return 'Total Non Credit Net Income';
}

/* AABPRICING_Borrower_tpClientProfitAndLossClient_value:undefined */
function Borrower_tpClientProfitAndLossClient_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpClientProfitAndLossClient_title:'Profit&&Losses - Client' */
function Borrower_tpClientProfitAndLossClient_title(f, x, y, z, v) {
    return 'Profit&&Losses - Client';
}

/* AABPRICING_Borrower_tpClientIncome_value:Borrower_tpIncome+Borrower_tpCrossSellIncome */
function Borrower_tpClientIncome_value(f, x, y, z, v) {
    return Borrower_tpIncome_value(
        '100303',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellIncome_value(
            '100362',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientInterestIncome_value:Borrower_tpInterestIncome */
function Borrower_tpClientInterestIncome_value(f, x, y, z, v) {
    return Borrower_tpInterestIncome_value(
        '100304',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientCreditRelatedFee_value:Borrower_tpCreditRelatedFee */
function Borrower_tpClientCreditRelatedFee_value(f, x, y, z, v) {
    return Borrower_tpCreditRelatedFee_value(
        '100305',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientNonCreditIncome_Total_value:OnNA(Borrower_tpNonCreditIncome_Total,0) */
function Borrower_tpClientNonCreditIncome_Total_value(f, x, y, z, v) {
    return OnNA(
        Borrower_tpNonCreditIncome_Total_value(
            '100285',
            x,
            y.base,
            z,
            v
        ),
        0
    );
}

/* AABPRICING_Borrower_tpClientNonCreditIncome_Total_title:'Total Non Credit Income' */
function Borrower_tpClientNonCreditIncome_Total_title(f, x, y, z, v) {
    return 'Total Non Credit Income';
}

/* AABPRICING_Borrower_tpClientOptionCostsIndLiqPremium_value:Borrower_tpOptionCostsIndLiqPremium */
function Borrower_tpClientOptionCostsIndLiqPremium_value(f, x, y, z, v) {
    return Borrower_tpOptionCostsIndLiqPremium_value(
        '100306',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientOptionCostsIndLiqPremium_title:'Option Costs/Indirect Liquidity Costs' */
function Borrower_tpClientOptionCostsIndLiqPremium_title(f, x, y, z, v) {
    return 'Option Costs/Indirect Liquidity Costs';
}

/* AABPRICING_Borrower_tpClientIndirectLiquidityCosts_value:Borrower_tpIndirectLiquidityCosts+Borrower_tpCrossSellIndirectLiquidityCosts */
function Borrower_tpClientIndirectLiquidityCosts_value(f, x, y, z, v) {
    return Borrower_tpIndirectLiquidityCosts_value(
        '100308',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellIndirectLiquidityCosts_value(
            '100363',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientPrepaymentCosts_value:Borrower_tpPrepaymentCosts */
function Borrower_tpClientPrepaymentCosts_value(f, x, y, z, v) {
    return Borrower_tpPrepaymentCosts_value(
        '100309',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientPipelineRisk_value:Borrower_tpPipelineRisk */
function Borrower_tpClientPipelineRisk_value(f, x, y, z, v) {
    return Borrower_tpPipelineRisk_value(
        '100311',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientDirectLiquidityPremium_value:Borrower_tpDirectLiquidityPremium+Borrower_tpCrossSellDirectLiquidityPremium */
function Borrower_tpClientDirectLiquidityPremium_value(f, x, y, z, v) {
    return Borrower_tpDirectLiquidityPremium_value(
        '100313',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellDirectLiquidityPremium_value(
            '100364',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientSubordinatedDebtCapitalCharge_value:Borrower_tpSubordinatedDebtCapitalCharge+Borrower_tpCrossSellSubordinatedDebtCapitalCharge */
function Borrower_tpClientSubordinatedDebtCapitalCharge_value(f, x, y, z, v) {
    return Borrower_tpSubordinatedDebtCapitalCharge_value(
        '100314',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellSubordinatedDebtCapitalCharge_value(
            '100365',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientEquityFundingAdjustment_value:Borrower_tpEquityFundingAdjustment+Borrower_tpCrossSellEquityFundingAdjustment */
function Borrower_tpClientEquityFundingAdjustment_value(f, x, y, z, v) {
    return Borrower_tpEquityFundingAdjustment_value(
        '100315',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellEquityFundingAdjustment_value(
            '100366',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientOperationalCosts_value:Borrower_tpOperationalCosts+Borrower_tpCrossSellOperationalCosts */
function Borrower_tpClientOperationalCosts_value(f, x, y, z, v) {
    return Borrower_tpOperationalCosts_value(
        '100316',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellOperationalCosts_value(
            '100367',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientCostPerServiceConcept_value:Borrower_tpCostPerServiceConcept */
function Borrower_tpClientCostPerServiceConcept_value(f, x, y, z, v) {
    return Borrower_tpCostPerServiceConcept_value(
        '100319',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientCostPerContract_value:Borrower_tpCostPerContract */
function Borrower_tpClientCostPerContract_value(f, x, y, z, v) {
    return Borrower_tpCostPerContract_value(
        '100317',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientCostOverVolume_value:Borrower_tpCostOverVolume */
function Borrower_tpClientCostOverVolume_value(f, x, y, z, v) {
    return Borrower_tpCostOverVolume_value(
        '100321',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientCostOverVolume_title:'Cost Over Volume' */
function Borrower_tpClientCostOverVolume_title(f, x, y, z, v) {
    return 'Cost Over Volume';
}

/* AABPRICING_Borrower_tpClientNonCreditCosts_Total_value:OnNA(Borrower_tpNonCreditCosts_Total,0) */
function Borrower_tpClientNonCreditCosts_Total_value(f, x, y, z, v) {
    return OnNA(
        Borrower_tpNonCreditCosts_Total_value(
            '100287',
            x,
            y.base,
            z,
            v
        ),
        0
    );
}

/* AABPRICING_Borrower_tpClientNonCreditCosts_Total_title:'Total Non Credit Costs' */
function Borrower_tpClientNonCreditCosts_Total_title(f, x, y, z, v) {
    return 'Total Non Credit Costs';
}

/* AABPRICING_Borrower_tpClientInternalExpectedLoss_value:Borrower_tpInternalExpectedLoss+Borrower_tpCrossSellInternalExpectedLoss */
function Borrower_tpClientInternalExpectedLoss_value(f, x, y, z, v) {
    return Borrower_tpInternalExpectedLoss_value(
        '100323',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellInternalExpectedLoss_value(
            '100368',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientTax_value:Borrower_tpTax+Borrower_tpCrossSellTax */
function Borrower_tpClientTax_value(f, x, y, z, v) {
    return Borrower_tpTax_value(
        '100324',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellTax_value(
            '100369',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientRiskAdjustedReturn_value:Borrower_tpRiskAdjustedReturn+Borrower_tpCrossSellRiskAdjustedReturn */
function Borrower_tpClientRiskAdjustedReturn_value(f, x, y, z, v) {
    return Borrower_tpRiskAdjustedReturn_value(
        '100325',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellRiskAdjustedReturn_value(
            '100370',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientReturnOnEquity_value:OnER(Borrower_tpClientRiskAdjustedReturn/Borrower_tpClientRequiredAmountOfEquity,NA) */
function Borrower_tpClientReturnOnEquity_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpClientRiskAdjustedReturn_value(
            '100413',
            x,
            y.base,
            z,
            v
        ) /
        Borrower_tpClientRequiredAmountOfEquity_value(
            '100415',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpClientRequiredAmountOfEquity_value:Borrower_tpRequiredAmountOfEquity+Borrower_tpCrossSellRequiredAmountOfEquity */
function Borrower_tpClientRequiredAmountOfEquity_value(f, x, y, z, v) {
    return Borrower_tpRequiredAmountOfEquity_value(
        '100328',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellRequiredAmountOfEquity_value(
            '100372',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientRequiredAmountOfEquity_title:'Required Amount Of Equity' */
function Borrower_tpClientRequiredAmountOfEquity_title(f, x, y, z, v) {
    return 'Required Amount Of Equity';
}

/* AABPRICING_Borrower_tpClientRaRoRaC_value:OnER(Borrower_tpClientRiskAdjustedReturn/Borrower_tpClientEconomicCapital,NA) */
function Borrower_tpClientRaRoRaC_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpClientRiskAdjustedReturn_value(
            '100413',
            x,
            y.base,
            z,
            v
        ) /
        Borrower_tpClientEconomicCapital_value(
            '100418',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpClientEconomicCapital_value:Borrower_tpEconomicCapital+Borrower_tpCrossSellEconomicCapital */
function Borrower_tpClientEconomicCapital_value(f, x, y, z, v) {
    return Borrower_tpEconomicCapital_value(
        '100331',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellEconomicCapital_value(
            '100374',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientOperationalRisk_value:Borrower_tpOperationalRisk+Borrower_tpCrossSellOperationalRisk */
function Borrower_tpClientOperationalRisk_value(f, x, y, z, v) {
    return Borrower_tpOperationalRisk_value(
        '100332',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellOperationalRisk_value(
            '100375',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientBusinessRisk_value:Borrower_tpBusinessRisk+Borrower_tpCrossSellBusinessRisk */
function Borrower_tpClientBusinessRisk_value(f, x, y, z, v) {
    return Borrower_tpBusinessRisk_value(
        '100333',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellBusinessRisk_value(
            '100376',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientCreditRisk_value:Borrower_tpCreditRisk */
function Borrower_tpClientCreditRisk_value(f, x, y, z, v) {
    return Borrower_tpCreditRisk_value(
        '100334',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientRegulatoryProfit_value:OnER(Borrower_tpClientRiskAdjustedReturn-Borrower_tpClientEquityCapitalCharge,NA) */
function Borrower_tpClientRegulatoryProfit_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpClientRiskAdjustedReturn_value(
            '100413',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpClientEquityCapitalCharge_value(
            '100423',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpClientEquityCapitalCharge_value:Borrower_tpEquityCapitalCharge+Borrower_tpCrossSellEquityCapitalCharge */
function Borrower_tpClientEquityCapitalCharge_value(f, x, y, z, v) {
    return Borrower_tpEquityCapitalCharge_value(
        '100336',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellEquityCapitalCharge_value(
            '100378',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientEconomicProfit_value:OnER(Borrower_tpClientRiskAdjustedReturn-Borrower_tpClientEconomicCapital*Borrower_tpEffectiveCostOfCapital,NA) */
function Borrower_tpClientEconomicProfit_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpClientRiskAdjustedReturn_value(
            '100413',
            x,
            y.base,
            z,
            v
        ) -
        Borrower_tpClientEconomicCapital_value(
            '100418',
            x,
            y.base,
            z,
            v
        ) *
        Borrower_tpEffectiveCostOfCapital_value(
            '100276',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Borrower_tpClientEconomicProfitSub1_value:undefined */
function Borrower_tpClientEconomicProfitSub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpClientCostOfEconomicCapital_value:Borrower_tpClientEconomicCapital*Borrower_tpEffectiveCostOfCapital */
function Borrower_tpClientCostOfEconomicCapital_value(f, x, y, z, v) {
    return Borrower_tpClientEconomicCapital_value(
        '100418',
        x,
        y.base,
        z,
        v
        ) *
        Borrower_tpEffectiveCostOfCapital_value(
            '100276',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientCostOfEconomicCapitalSub1_value:undefined */
function Borrower_tpClientCostOfEconomicCapitalSub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpClientCostOfEconomicCapitalSub2_value:undefined */
function Borrower_tpClientCostOfEconomicCapitalSub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpClientOtherMetrics_value:undefined */
function Borrower_tpClientOtherMetrics_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpClientPrincipalLimit_value:Borrower_tpPrincipalLimit */
function Borrower_tpClientPrincipalLimit_value(f, x, y, z, v) {
    return Borrower_tpPrincipalLimit_value(
        '100345',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientOutstanding_value:Borrower_tpExpectedAverageOutstanding */
function Borrower_tpClientOutstanding_value(f, x, y, z, v) {
    return Borrower_tpExpectedAverageOutstanding_value(
        '100346',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientRWA_value:Borrower_tpRWA+Borrower_tpCrossSellRWA */
function Borrower_tpClientRWA_value(f, x, y, z, v) {
    return Borrower_tpRWA_value(
        '100348',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellRWA_value(
            '100385',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientRWACreditRisk_value:Borrower_tpRWACreditRisk */
function Borrower_tpClientRWACreditRisk_value(f, x, y, z, v) {
    return Borrower_tpRWACreditRisk_value(
        '100349',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientRWAOperationalRisk_value:Borrower_tpRWAOperationalRisk+Borrower_tpCrossSellRWAOperationalRisk */
function Borrower_tpClientRWAOperationalRisk_value(f, x, y, z, v) {
    return Borrower_tpRWAOperationalRisk_value(
        '100350',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpCrossSellRWAOperationalRisk_value(
            '100386',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpClientEAD_value:Borrower_tpEAD */
function Borrower_tpClientEAD_value(f, x, y, z, v) {
    return Borrower_tpEAD_value(
        '100262',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientNonCreditNetIncome_Total_value:Borrower_tpCrossSellNonCreditNetIncome_Total */
function Borrower_tpClientNonCreditNetIncome_Total_value(f, x, y, z, v) {
    return Borrower_tpCrossSellNonCreditNetIncome_Total_value(
        '100387',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpClientHiddenVariables_value:undefined */
function Borrower_tpClientHiddenVariables_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpClientTaxAndOther_value:Borrower_tpClientSubordinatedDebtCapitalCharge+Borrower_tpClientEquityFundingAdjustment+Borrower_tpClientTax */
function Borrower_tpClientTaxAndOther_value(f, x, y, z, v) {
    return Borrower_tpClientSubordinatedDebtCapitalCharge_value(
        '100402',
        x,
        y.base,
        z,
        v
        ) +
        Borrower_tpClientEquityFundingAdjustment_value(
            '100403',
            x,
            y.base,
            z,
            v
        ) +
        Borrower_tpClientTax_value(
            '100412',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpNonCredit_value:undefined */
function Borrower_tpNonCredit_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpNonCredit_title:'A Cross Sell item' */
function Borrower_tpNonCredit_title(f, x, y, z, v) {
    return 'A Cross Sell item';
}

/* AABPRICING_Borrower_tpNonCredit_tpDataImportedFromForce_value:undefined */
function Borrower_tpNonCredit_tpDataImportedFromForce_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpNonCredit_tpDataImportedFromForce_title:EvaluateAsString('Imported Data for Cross Sell Items') */
function Borrower_tpNonCredit_tpDataImportedFromForce_title(f, x, y, z, v) {
    return String(
        'Imported Data for Cross Sell Items'
    );
}

/* AABPRICING_Borrower_tpNonCredit_tpCategoryCode_value:undefined */
function Borrower_tpNonCredit_tpCategoryCode_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpNonCredit_tpCategoryCode_title:'Cross Sell Item Category Code' */
function Borrower_tpNonCredit_tpCategoryCode_title(f, x, y, z, v) {
    return 'Cross Sell Item Category Code';
}

/* AABPRICING_Borrower_tpNonCredit_tpCategoryName_value:undefined */
function Borrower_tpNonCredit_tpCategoryName_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpNonCredit_tpCategoryName_title:'Cross Sell Item Name' */
function Borrower_tpNonCredit_tpCategoryName_title(f, x, y, z, v) {
    return 'Cross Sell Item Name';
}

/* AABPRICING_Borrower_tpNonCredit_tpPrognosedIncomeNext12MonthsAmount_value:undefined */
function Borrower_tpNonCredit_tpPrognosedIncomeNext12MonthsAmount_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpNonCredit_tpPrognosedIncomeNext12MonthsAmount_title:'Prognosed Income for the next 12 months' */
function Borrower_tpNonCredit_tpPrognosedIncomeNext12MonthsAmount_title(f, x, y, z, v) {
    return 'Prognosed Income for the next 12 months';
}

/* AABPRICING_Borrower_tpNonCredit_tpRealizedIncomePast12MonthsAmount_value:undefined */
function Borrower_tpNonCredit_tpRealizedIncomePast12MonthsAmount_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpNonCredit_tpRealizedIncomePast12MonthsAmount_title:'Realized Income for the next 12 months' */
function Borrower_tpNonCredit_tpRealizedIncomePast12MonthsAmount_title(f, x, y, z, v) {
    return 'Realized Income for the next 12 months';
}

/* AABPRICING_Borrower_tpNonCredit_tpName_value:EvaluateAsString(Borrower_tpNonCredit_tpCategoryName) */
function Borrower_tpNonCredit_tpName_value(f, x, y, z, v) {
    return String(
        Borrower_tpNonCredit_tpCategoryName_value(
            '100445',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpNonCredit_tpName_title:'Item Description' */
function Borrower_tpNonCredit_tpName_title(f, x, y, z, v) {
    return 'Item Description';
}

/* AABPRICING_Borrower_tpNonCredit_tpIncome_Amount_value:Borrower_tpNonCredit_tpPrognosedIncomeNext12MonthsAmount */
function Borrower_tpNonCredit_tpIncome_Amount_value(f, x, y, z, v) {
    return Borrower_tpNonCredit_tpPrognosedIncomeNext12MonthsAmount_value(
        '100447',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Borrower_tpNonCredit_tpIncome_Amount_title:'Expected Income Upcoming 12 months' */
function Borrower_tpNonCredit_tpIncome_Amount_title(f, x, y, z, v) {
    return 'Expected Income Upcoming 12 months';
}

/* AABPRICING_Borrower_tpNonCredit_tpCosts_value:Borrower_tpNonCredit_tpIncome_Amount*Borrower_tpNonCredit_tpCosts_EffRatio */
function Borrower_tpNonCredit_tpCosts_value(f, x, y, z, v) {
    return Borrower_tpNonCredit_tpIncome_Amount_value(
        '100453',
        x,
        y,
        z,
        v
        ) *
        Borrower_tpNonCredit_tpCosts_EffRatio_value(
            '100465',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpNonCredit_tpCosts_title:'Costs' */
function Borrower_tpNonCredit_tpCosts_title(f, x, y, z, v) {
    return 'Costs';
}

/* AABPRICING_Borrower_tpNonCredit_tpNetIncome_value:Borrower_tpNonCredit_tpIncome_Amount-Borrower_tpNonCredit_tpCosts */
function Borrower_tpNonCredit_tpNetIncome_value(f, x, y, z, v) {
    return Borrower_tpNonCredit_tpIncome_Amount_value(
        '100453',
        x,
        y,
        z,
        v
        ) -
        Borrower_tpNonCredit_tpCosts_value(
            '100455',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpNonCredit_tpNetIncome_title:'Net Income' */
function Borrower_tpNonCredit_tpNetIncome_title(f, x, y, z, v) {
    return 'Net Income';
}

/* AABPRICING_Borrower_tpNonCredit_tpIncome_ClientGroup_value:undefined */
function Borrower_tpNonCredit_tpIncome_ClientGroup_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Borrower_tpNonCredit_tpIncome_ClientGroup_title:'Borrower Client Group' */
function Borrower_tpNonCredit_tpIncome_ClientGroup_title(f, x, y, z, v) {
    return 'Borrower Client Group';
}

/* AABPRICING_Borrower_tpNonCredit_tpIncome_ID_value:EvaluateAsString(SubStr(Borrower_tpNonCredit_tpCategoryCode,0,2)) */
function Borrower_tpNonCredit_tpIncome_ID_value(f, x, y, z, v) {
    return String(
        SubStr(
            Borrower_tpNonCredit_tpCategoryCode_value(
                '100443',
                x,
                y,
                z,
                v
            ),
            0,
            2
        )
    );
}

/* AABPRICING_Borrower_tpNonCredit_tpIncome_ID_title:'ID' */
function Borrower_tpNonCredit_tpIncome_ID_title(f, x, y, z, v) {
    return 'ID';
}

/* AABPRICING_Borrower_tpNonCredit_tpIncome_IDtotal_value:EvaluateAsString(Borrower_tpNonCredit_tpCategoryCode) */
function Borrower_tpNonCredit_tpIncome_IDtotal_value(f, x, y, z, v) {
    return String(
        Borrower_tpNonCredit_tpCategoryCode_value(
            '100443',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Borrower_tpNonCredit_tpIncome_IDtotal_title:'ID Total' */
function Borrower_tpNonCredit_tpIncome_IDtotal_title(f, x, y, z, v) {
    return 'ID Total';
}

/* AABPRICING_Borrower_tpNonCredit_tpCosts_EffRatio_value:MatrixLookup('AAB_Parameters.xls','NonCreditIncomeEffRatio',Borrower_tpNonCredit_tpIncome_IDtotal,3) */
function Borrower_tpNonCredit_tpCosts_EffRatio_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'NonCreditIncomeEffRatio',
        Borrower_tpNonCredit_tpIncome_IDtotal_value(
            '100463',
            x,
            y,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Borrower_tpNonCredit_tpCosts_EffRatio_title:'Risk Adjusted Return - Other Expenses - Operational Costs - Non Credit Costs - Eff. ratio' */
function Borrower_tpNonCredit_tpCosts_EffRatio_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Operational Costs - Non Credit Costs - Eff. ratio';
}

/* AABPRICING_Borrower_tpNonCredit_tpEC_value:Borrower_tpNonCredit_tpORNonCreditRisk+Borrower_tpNonCredit_tpBRNonCreditRisk */
function Borrower_tpNonCredit_tpEC_value(f, x, y, z, v) {
    return Borrower_tpNonCredit_tpORNonCreditRisk_value(
        '100473',
        x,
        y,
        z,
        v
        ) +
        Borrower_tpNonCredit_tpBRNonCreditRisk_value(
            '100469',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Borrower_tpNonCredit_tpEC_title:'Non Credit Economic Capital' */
function Borrower_tpNonCredit_tpEC_title(f, x, y, z, v) {
    return 'Non Credit Economic Capital';
}

/* AABPRICING_Borrower_tpNonCredit_tpBRNonCreditRisk_value:Borrower_tpARCAddOn*AgreementDiversificationBR*(Borrower_tpNonCredit_tpCosts*(Borrower_tpNonCredit_tpECbusr/1e4)) */
function Borrower_tpNonCredit_tpBRNonCreditRisk_value(f, x, y, z, v) {
    return Borrower_tpARCAddOn_value(
        '100248',
        x,
        y.base,
        z,
        v
        ) *
        AgreementDiversificationBR_value(
            '100104',
            x,
            y.base,
            z,
            v
        ) * (
            Borrower_tpNonCredit_tpCosts_value(
                '100455',
                x,
                y,
                z,
                v
            ) * (
                Borrower_tpNonCredit_tpECbusr_value(
                    '100471',
                    x,
                    y,
                    z,
                    v
                ) / 1e4
            )
        );
}

/* AABPRICING_Borrower_tpNonCredit_tpBRNonCreditRisk_title:'Risk Adjusted Return - Non Credit EC Business Risk' */
function Borrower_tpNonCredit_tpBRNonCreditRisk_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Non Credit EC Business Risk';
}

/* AABPRICING_Borrower_tpNonCredit_tpECbusr_value:MatrixLookup('AAB_Parameters.xls','NonCreditECoprECBusr',Borrower_tpNonCredit_tpIncome_ID,3) */
function Borrower_tpNonCredit_tpECbusr_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'NonCreditECoprECBusr',
        Borrower_tpNonCredit_tpIncome_ID_value(
            '100461',
            x,
            y,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Borrower_tpNonCredit_tpECbusr_title:'Risk Adjusted Return - EC Business Risk factor' */
function Borrower_tpNonCredit_tpECbusr_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - EC Business Risk factor';
}

/* AABPRICING_Borrower_tpNonCredit_tpORNonCreditRisk_value:Borrower_tpARCAddOn*AgreementDiversificationOR*(Borrower_tpNonCredit_tpIncome_Amount*(Borrower_tpNonCredit_tpECopr/1e4)) */
function Borrower_tpNonCredit_tpORNonCreditRisk_value(f, x, y, z, v) {
    return Borrower_tpARCAddOn_value(
        '100248',
        x,
        y.base,
        z,
        v
        ) *
        AgreementDiversificationOR_value(
            '100102',
            x,
            y.base,
            z,
            v
        ) * (
            Borrower_tpNonCredit_tpIncome_Amount_value(
                '100453',
                x,
                y,
                z,
                v
            ) * (
                Borrower_tpNonCredit_tpECopr_value(
                    '100475',
                    x,
                    y,
                    z,
                    v
                ) / 1e4
            )
        );
}

/* AABPRICING_Borrower_tpNonCredit_tpORNonCreditRisk_title:'Risk Adjusted Return - Non Credit EC Operational Risk' */
function Borrower_tpNonCredit_tpORNonCreditRisk_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Non Credit EC Operational Risk';
}

/* AABPRICING_Borrower_tpNonCredit_tpECopr_value:MatrixLookup('AAB_Parameters.xls','NonCreditECoprECBusr',Borrower_tpNonCredit_tpIncome_ID,2) */
function Borrower_tpNonCredit_tpECopr_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'NonCreditECoprECBusr',
        Borrower_tpNonCredit_tpIncome_ID_value(
            '100461',
            x,
            y,
            z,
            v
        ),
        2
    );
}

/* AABPRICING_Borrower_tpNonCredit_tpECopr_title:'Risk Adjusted Return - EC Operational Risk factor' */
function Borrower_tpNonCredit_tpECopr_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - EC Operational Risk factor';
}

/* AABPRICING_Borrower_tpNonCredit_tpRWAORNonCredit_value:Borrower_tpNonCredit_tpIncome_Amount*MatrixLookup('AAB_Parameters.xls','ClientGroup',Borrower_tpClientGroup,7) */
function Borrower_tpNonCredit_tpRWAORNonCredit_value(f, x, y, z, v) {
    return Borrower_tpNonCredit_tpIncome_Amount_value(
        '100453',
        x,
        y,
        z,
        v
        ) *
        MatrixLookup(
            'AAB_Parameters.xls',
            'ClientGroup',
            Borrower_tpClientGroup_value(
                '100195',
                x,
                y.base,
                z,
                v
            ),
            7
        );
}

/* AABPRICING_Borrower_tpNonCredit_tpRWAORNonCredit_title:'Risk Weighted Assets - RWA || Non Credit' */
function Borrower_tpNonCredit_tpRWAORNonCredit_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - RWA || Non Credit';
}

/* AABPRICING_Borrower_tpNonCredit_tpEquityCapitalCharge_value:Borrower_tpNonCredit_tpRWAORNonCredit*Borrower_tpEquityRatio*Borrower_tpCostofEquity */
function Borrower_tpNonCredit_tpEquityCapitalCharge_value(f, x, y, z, v) {
    return Borrower_tpNonCredit_tpRWAORNonCredit_value(
        '100477',
        x,
        y,
        z,
        v
        ) *
        Borrower_tpEquityRatio_value(
            '100270',
            x,
            y.base,
            z,
            v
        ) *
        Borrower_tpCostofEquity_value(
            '100272',
            x,
            y.base,
            z,
            v
        );
}

/* AABPRICING_Facility_value:undefined */
function Facility_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_title:'Facility' */
function Facility_title(f, x, y, z, v) {
    return 'Facility';
}

/* AABPRICING_Facility_tpDataForUserView_value:undefined */
function Facility_tpDataForUserView_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpDataForUserView_title:EvaluateAsString('Data for UserView') */
function Facility_tpDataForUserView_title(f, x, y, z, v) {
    return String(
        'Data for UserView'
    );
}

/* AABPRICING_Facility_tpSummary_value:EvaluateAsString('Margin '+Str(Facility_tpCustomerSpread+Facility_tpCustomerSpreadAddMargin,0,3)+' (RaRoRaC '+Str(Facility_tpRaRoRaC,0,2)+')') */
function Facility_tpSummary_value(f, x, y, z, v) {
    return String(
        'Margin ' +
        Str(
            Facility_tpCustomerSpread_value(
                '101195',
                x,
                y,
                z,
                v
            ) +
            Facility_tpCustomerSpreadAddMargin_value(
                '101197',
                x,
                y,
                z,
                v
            ),
            0,
            3
        ) + ' (RaRoRaC ' +
        Str(
            Facility_tpRaRoRaC_value(
                '100490',
                x,
                y,
                z,
                v
            ),
            0,
            2
        ) + ')'
    );
}

/* AABPRICING_Facility_tpSummary_title:EvaluateAsString(Facility_tpProductname[doc]) */
function Facility_tpSummary_title(f, x, y, z, v) {
    return String(
        Facility_tpProductname_value(
            '100502',
            x.doc,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpInputRequired_value:EvaluateAsString(If(Facility_tpPrincipalLimit!=NA,'Complete','Incomplete')) */
function Facility_tpInputRequired_value(f, x, y, z, v) {
    return String(
        Facility_tpPrincipalLimit_value(
            '100544',
            x,
            y,
            z,
            v
        ) != NA ? 'Complete' : 'Incomplete'
    );
}

/* AABPRICING_Facility_tpInputRequired_title:'Required fields' */
function Facility_tpInputRequired_title(f, x, y, z, v) {
    return 'Required fields';
}

/* AABPRICING_Facility_tpProfitAndLoss_value:undefined */
function Facility_tpProfitAndLoss_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProfitAndLoss_title:'Profit&&losses' */
function Facility_tpProfitAndLoss_title(f, x, y, z, v) {
    return 'Profit&&losses';
}

/* AABPRICING_Facility_tpRaRoRaC_value:OnER(Facility_tpRiskAdjustedReturn/Facility_tpEconomicCapital,NA) */
function Facility_tpRaRoRaC_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRiskAdjustedReturn_value(
            '101159',
            x,
            y,
            z,
            v
        ) /
        Facility_tpEconomicCapital_value(
            '101034',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRaRoRaC_title:'RaRoRaC ()' */
function Facility_tpRaRoRaC_title(f, x, y, z, v) {
    return 'RaRoRaC ()';
}

/* AABPRICING_Facility_tpEconomicProfit_value:OnER(Facility_tpRiskAdjustedReturn-Facility_tpCostOfEconomicCapital,NA) */
function Facility_tpEconomicProfit_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRiskAdjustedReturn_value(
            '101159',
            x,
            y,
            z,
            v
        ) -
        Facility_tpCostOfEconomicCapital_value(
            '100493',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpCostOfEconomicCapital_value:OnER(Facility_tpEconomicCapital*Borrower_tpEffectiveCostOfCapital*Facility_tpDeannualize,NA) */
function Facility_tpCostOfEconomicCapital_value(f, x, y, z, v) {
    return OnER(
        Facility_tpEconomicCapital_value(
            '101034',
            x,
            y,
            z,
            v
        ) *
        Borrower_tpEffectiveCostOfCapital_value(
            '100276',
            x,
            y.base,
            z,
            v
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpEffectiveCostOfCapital_value:OnER(Borrower_tpEffectiveCostOfCapital,NA) */
function Facility_tpEffectiveCostOfCapital_value(f, x, y, z, v) {
    return OnER(
        Borrower_tpEffectiveCostOfCapital_value(
            '100276',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpEffectiveCostOfCapital_title:'Effective Cost of Economic Capital' */
function Facility_tpEffectiveCostOfCapital_title(f, x, y, z, v) {
    return 'Effective Cost of Economic Capital';
}

/* AABPRICING_Facility_tpReturnOnEquity_value:OnER(Facility_tpRiskAdjustedReturn/(Facility_tpRWA*Borrower_tpEquityRatio*Facility_tpDeannualize),NA) */
function Facility_tpReturnOnEquity_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRiskAdjustedReturn_value(
            '101159',
            x,
            y,
            z,
            v
        ) / (
            Facility_tpRWA_value(
                '101380',
                x,
                y,
                z,
                v
            ) *
            Borrower_tpEquityRatio_value(
                '100270',
                x,
                y.base,
                z,
                v
            ) *
            Facility_tpDeannualize_value(
                '100606',
                x,
                y,
                z,
                v
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpReturnOnEquity_title:'Return on Equity ()' */
function Facility_tpReturnOnEquity_title(f, x, y, z, v) {
    return 'Return on Equity ()';
}

/* AABPRICING_Facility_tpRegulatoryProfit_value:OnER(Facility_tpRiskAdjustedReturn-Facility_tpEquityCapitalCharge,NA) */
function Facility_tpRegulatoryProfit_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRiskAdjustedReturn_value(
            '101159',
            x,
            y,
            z,
            v
        ) -
        Facility_tpEquityCapitalCharge_value(
            '101377',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpOtherMetrics_value:undefined */
function Facility_tpOtherMetrics_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRequiredInput_value:undefined */
function Facility_tpRequiredInput_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRequiredInput_title:EvaluateAsString('Required Input') */
function Facility_tpRequiredInput_title(f, x, y, z, v) {
    return String(
        'Required Input'
    );
}

/* AABPRICING_Facility_tpProductname_value:EvaluateAsString(MatrixLookup('AAB_Parameters.xls','VertaaltabelProductType',Facility_tpType,1)) */
function Facility_tpProductname_value(f, x, y, z, v) {
    return String(
        MatrixLookup(
            'AAB_Parameters.xls',
            'VertaaltabelProductType',
            Facility_tpType_value(
                '100536',
                x,
                y,
                z,
                v
            ),
            1
        )
    );
}

/* AABPRICING_Facility_tpProductname_title:'Product Name' */
function Facility_tpProductname_title(f, x, y, z, v) {
    return 'Product Name';
}

/* AABPRICING_Facility_tpBaseCurrencyChoice_value:1 */
function Facility_tpBaseCurrencyChoice_value(f, x, y, z, v) {
    return 1;
}

/* AABPRICING_Facility_tpBaseCurrencyChoice_title:'Base Currency of Facility' */
function Facility_tpBaseCurrencyChoice_title(f, x, y, z, v) {
    return 'Base Currency of Facility';
}

/* AABPRICING_Facility_tpBaseCurrency_value:EvaluateAsString(Case(Facility_tpBaseCurrencyChoice,[1,'EUR'||2,'BRL'||3,'CAD'||4,'CHF'||5,'GBP'||6,'HKD'||7,'INR'||8,'MXN'||9,'NOK'||10,'SGD'||11,'USD'])) */
function Facility_tpBaseCurrency_value(f, x, y, z, v) {
    return String(
        (
            __c0s4 =
                Facility_tpBaseCurrencyChoice_value(
                    '100504',
                    x,
                    y,
                    z,
                    v
                ) , __c0s4 === 1 ? 'EUR' : __c0s4 === 2 ? 'BRL' : __c0s4 === 3 ? 'CAD' : __c0s4 === 4 ? 'CHF' : __c0s4 === 5 ? 'GBP' : __c0s4 === 6 ? 'HKD' : __c0s4 === 7 ? 'INR' : __c0s4 === 8 ? 'MXN' : __c0s4 === 9 ? 'NOK' : __c0s4 === 10 ? 'SGD' : __c0s4 === 11 ? 'USD' : NA
        )
    );
}

/* AABPRICING_Facility_tpBaseCurrency_title:'Base Currency' */
function Facility_tpBaseCurrency_title(f, x, y, z, v) {
    return 'Base Currency';
}

/* AABPRICING_Facility_tpProductinterestDetailsInterestProductName_value:EvaluateAsString(MatrixLookup('AAB_Parameters.xls','VertaaltabelInterestProductType',Facility_tpInterestProductCode,1)) */
function Facility_tpProductinterestDetailsInterestProductName_value(f, x, y, z, v) {
    return String(
        MatrixLookup(
            'AAB_Parameters.xls',
            'VertaaltabelInterestProductType',
            Facility_tpInterestProductCode_value(
                '100566',
                x,
                y,
                z,
                v
            ),
            1
        )
    );
}

/* AABPRICING_Facility_tpProductinterestDetailsInterestProductName_title:'Interest Product' */
function Facility_tpProductinterestDetailsInterestProductName_title(f, x, y, z, v) {
    return 'Interest Product';
}

/* AABPRICING_Facility_tpFixedInterestPeriodChoice_value:Case(Val(Facility_tpProductinterestDetailsFixedInterestPeriod),[1,2||3,3||6,4||99,1]) */
function Facility_tpFixedInterestPeriodChoice_value(f, x, y, z, v) {
    return __c0s5 =
        Val(
            Facility_tpProductinterestDetailsFixedInterestPeriod_value(
                '100568',
                x,
                y,
                z,
                v
            )
        ) , __c0s5 === 1 ? 2 : __c0s5 === 3 ? 3 : __c0s5 === 6 ? 4 : __c0s5 === 99 ? 1 : NA;
}

/* AABPRICING_Facility_tpFixedInterestPeriodChoice_title:'Fixed Interest Period' */
function Facility_tpFixedInterestPeriodChoice_title(f, x, y, z, v) {
    return 'Fixed Interest Period';
}

/* AABPRICING_Facility_tpFixedInterestPeriodChoice_choices:[{'name':' 1','value':'Base rate'},{'name':'2','value':'1 months'},{'name':'3','value':'3 months'},{'name':'4','value':'6 months'}] */
function Facility_tpFixedInterestPeriodChoice_choices(f, x, y, z, v) {
    return [{'name': ' 1', 'value': 'Base rate'}, {'name': '2', 'value': '1 months'}, {
        'name': '3',
        'value': '3 months'
    }, {'name': '4', 'value': '6 months'}];
}

/* AABPRICING_Facility_tpFixedInterestPeriod_value:Facility_tpFixedInterestPeriodChoice */
function Facility_tpFixedInterestPeriod_value(f, x, y, z, v) {
    return Facility_tpFixedInterestPeriodChoice_value(
        '100510',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpDateLastInterestReview_value:undefined */
function Facility_tpDateLastInterestReview_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpDateLastInterestReview_title:'Date Last Review' */
function Facility_tpDateLastInterestReview_title(f, x, y, z, v) {
    return 'Date Last Review';
}

/* AABPRICING_Facility_tpPrepaymentPrec_value:0 */
function Facility_tpPrepaymentPrec_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpPrepaymentPrec_title:'Prepayment of limit amount ()' */
function Facility_tpPrepaymentPrec_title(f, x, y, z, v) {
    return 'Prepayment of limit amount ()';
}

/* AABPRICING_Facility_tpOfferPeriodChoice_value:4 */
function Facility_tpOfferPeriodChoice_value(f, x, y, z, v) {
    return 4;
}

/* AABPRICING_Facility_tpOfferPeriodChoice_title:'Offer period' */
function Facility_tpOfferPeriodChoice_title(f, x, y, z, v) {
    return 'Offer period';
}

/* AABPRICING_Facility_tpOfferPeriodChoice_choices:[{'name':' 01','value':'0'},{'name':'02','value':'1D'},{'name':'03','value':'1W'},{'name':'04','value':'2W'},{'name':'05','value':'4W'},{'name':'06','value':'2M'},{'name':'07','value':'3M'},{'name':'08','value':'6M'}] */
function Facility_tpOfferPeriodChoice_choices(f, x, y, z, v) {
    return [{'name': ' 01', 'value': '0'}, {'name': '02', 'value': '1D'}, {'name': '03', 'value': '1W'}, {
        'name': '04',
        'value': '2W'
    }, {'name': '05', 'value': '4W'}, {'name': '06', 'value': '2M'}, {'name': '07', 'value': '3M'}, {
        'name': '08',
        'value': '6M'
    }];
}

/* AABPRICING_Facility_tpOfferPeriod_value:EvaluateAsString(Case(Facility_tpOfferPeriodChoice,[1,'0'||2,'1D'||3,'1W'||4,'2W'||5,'4W'||6,'2M'||7,'3M'||8,'6M'])) */
function Facility_tpOfferPeriod_value(f, x, y, z, v) {
    return String(
        (
            __c0s6 =
                Facility_tpOfferPeriodChoice_value(
                    '100518',
                    x,
                    y,
                    z,
                    v
                ) , __c0s6 === 1 ? '0' : __c0s6 === 2 ? '1D' : __c0s6 === 3 ? '1W' : __c0s6 === 4 ? '2W' : __c0s6 === 5 ? '4W' : __c0s6 === 6 ? '2M' : __c0s6 === 7 ? '3M' : __c0s6 === 8 ? '6M' : NA
        )
    );
}

/* AABPRICING_Facility_tpOfferPeriod_title:'Offer period text' */
function Facility_tpOfferPeriod_title(f, x, y, z, v) {
    return 'Offer period text';
}

/* AABPRICING_Facility_tpBaseRate2_value:100 */
function Facility_tpBaseRate2_value(f, x, y, z, v) {
    return 100;
}

/* AABPRICING_Facility_tpBaseRate2_title:'Base Rate (Bps)' */
function Facility_tpBaseRate2_title(f, x, y, z, v) {
    return 'Base Rate (Bps)';
}

/* AABPRICING_Facility_tpCustomerSpreadAddMargin2_value:Facility_tpCustomerSpreadAddMargin */
function Facility_tpCustomerSpreadAddMargin2_value(f, x, y, z, v) {
    return Facility_tpCustomerSpreadAddMargin_value(
        '101197',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpCustomerSpreadAddMargin2_title:'Customer Spread Additional Margin' */
function Facility_tpCustomerSpreadAddMargin2_title(f, x, y, z, v) {
    return 'Customer Spread Additional Margin';
}

/* AABPRICING_Facility_tpRemainingAverageTenor_value:If(Facility_tpRevolvingCredit==0,If(Facility_tpRepaymentChoice==0,Facility_tpRemainingAverageTenorBullet,Facility_tpRemainingAverageTenorNoBullet),1) */
function Facility_tpRemainingAverageTenor_value(f, x, y, z, v) {
    return Facility_tpRevolvingCredit_value(
        '100596',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpRemainingAverageTenorBullet_value(
        '100630',
        x,
        y,
        z,
        v
    ) : Facility_tpRemainingAverageTenorNoBullet_value(
        '100632',
        x,
        y,
        z,
        v
    ) : 1;
}

/* AABPRICING_Facility_tpRemainingAverageTenor_title:'Remaining Average Tenor (Years)' */
function Facility_tpRemainingAverageTenor_title(f, x, y, z, v) {
    return 'Remaining Average Tenor (Years)';
}

/* AABPRICING_Facility_tpExpectedAverageOutstanding_value:If(Facility_tpRepaymentChoice==4||Facility_tpWithdrawalChoice==2,Facility_tpEAORevolving,If(Facility_tpWithdrawalChoice==0&&Facility_tpRepaymentChoice==0,Facility_tpPrincipalLimit,If(Facility_tpWithdrawalChoice==0&&Facility_tpRepaymentChoice==1,Facility_tpEAOOnceLinear,If(Facility_tpWithdrawalChoice==0&&Facility_tpRepaymentChoice==2,Facility_tpEAOOnceAnnuity,If(Facility_tpWithdrawalChoice==0&&Facility_tpRepaymentChoice==3,Facility_tpExpectedAverageOutstandingScheme,If(Facility_tpWithdrawalChoice==3&&Facility_tpRepaymentChoice==0,Facility_tpExpectedAverageOutstandingScheme,If(Facility_tpWithdrawalChoice==3&&Facility_tpRepaymentChoice==1,Facility_tpEAOSchemeLinear,If(Facility_tpWithdrawalChoice==3&&Facility_tpRepaymentChoice==2,Facility_tpEAOSchemeAnnuity,If(Facility_tpWithdrawalChoice==3&&Facility_tpRepaymentChoice==3,Facility_tpExpectedAverageOutstandingScheme,Facility_tpEAORevolving))))))))) */
function Facility_tpExpectedAverageOutstanding_value(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    4 || Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpEAORevolving_value(
        '100856',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpEAOOnceLinear_value(
        '100858',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpEAOOnceAnnuity_value(
        '100862',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    3 ? Facility_tpExpectedAverageOutstandingScheme_value(
        '100768',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpExpectedAverageOutstandingScheme_value(
        '100768',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpEAOSchemeLinear_value(
        '100860',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpEAOSchemeAnnuity_value(
        '100864',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    3 ? Facility_tpExpectedAverageOutstandingScheme_value(
        '100768',
        x,
        y,
        z,
        v
    ) : Facility_tpEAORevolving_value(
        '100856',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpExpectedAverageOutstanding_title:'Expected Average Outstanding (For upcoming 12 months after Current Date)' */
function Facility_tpExpectedAverageOutstanding_title(f, x, y, z, v) {
    return 'Expected Average Outstanding (For upcoming 12 months after Current Date)';
}

/* AABPRICING_Facility_tpUncommitted2_value:0 */
function Facility_tpUncommitted2_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpUncommitted2_title:'Facility is uncommitted' */
function Facility_tpUncommitted2_title(f, x, y, z, v) {
    return 'Facility is uncommitted';
}

/* AABPRICING_Facility_tp31DgDebet_value:0 */
function Facility_tp31DgDebet_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tp31DgDebet_title:'31 Dg Debet' */
function Facility_tp31DgDebet_title(f, x, y, z, v) {
    return '31 Dg Debet';
}

/* AABPRICING_Facility_tpDataImportedFromForce_value:undefined */
function Facility_tpDataImportedFromForce_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpType_value:undefined */
function Facility_tpType_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpType_title:'Abbreviated Facility Type' */
function Facility_tpType_title(f, x, y, z, v) {
    return 'Abbreviated Facility Type';
}

/* AABPRICING_Facility_tpID_value:undefined */
function Facility_tpID_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpID_title:'Accountnumber' */
function Facility_tpID_title(f, x, y, z, v) {
    return 'Accountnumber';
}

/* AABPRICING_Facility_tpStatusName_value:undefined */
function Facility_tpStatusName_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpStatusName_title:'Status' */
function Facility_tpStatusName_title(f, x, y, z, v) {
    return 'Status';
}

/* AABPRICING_Facility_tpProductReferenceNumber_value:undefined */
function Facility_tpProductReferenceNumber_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductReferenceNumber_title:'Product Reference Number' */
function Facility_tpProductReferenceNumber_title(f, x, y, z, v) {
    return 'Product Reference Number';
}

/* AABPRICING_Facility_tpPrincipalLimit_value:undefined */
function Facility_tpPrincipalLimit_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpPrincipalLimit_title:'Facility Limit' */
function Facility_tpPrincipalLimit_title(f, x, y, z, v) {
    return 'Facility Limit';
}

/* AABPRICING_Facility_tpProductstartDate_value:undefined */
function Facility_tpProductstartDate_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductstartDate_title:'Start Date' */
function Facility_tpProductstartDate_title(f, x, y, z, v) {
    return 'Start Date';
}

/* AABPRICING_Facility_tpProductduration_value:undefined */
function Facility_tpProductduration_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductduration_title:'Product Duration/ Maturity (months)' */
function Facility_tpProductduration_title(f, x, y, z, v) {
    return 'Product Duration/ Maturity (months)';
}

/* AABPRICING_Facility_tpProductEndDate_value:undefined */
function Facility_tpProductEndDate_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductEndDate_title:'End date' */
function Facility_tpProductEndDate_title(f, x, y, z, v) {
    return 'End date';
}

/* AABPRICING_Facility_tpProductuptakeDetailsUptakeType_value:undefined */
function Facility_tpProductuptakeDetailsUptakeType_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductuptakeDetailsUptakeType_title:'Withdrawal - WithdrawalType' */
function Facility_tpProductuptakeDetailsUptakeType_title(f, x, y, z, v) {
    return 'Withdrawal - WithdrawalType';
}

/* AABPRICING_Facility_tpProductuptakeDetailsUptakeFrequency_value:undefined */
function Facility_tpProductuptakeDetailsUptakeFrequency_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductuptakeDetailsUptakeFrequency_title:'Withdrawal - WithdrawalFrequency' */
function Facility_tpProductuptakeDetailsUptakeFrequency_title(f, x, y, z, v) {
    return 'Withdrawal - WithdrawalFrequency';
}

/* AABPRICING_Facility_tpProductWithdrawalDetailsLastPossibleWithdrawalDate_value:undefined */
function Facility_tpProductWithdrawalDetailsLastPossibleWithdrawalDate_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductWithdrawalDetailsLastPossibleWithdrawalDate_title:'Withdrawal - Last Possible Withdrawal Date' */
function Facility_tpProductWithdrawalDetailsLastPossibleWithdrawalDate_title(f, x, y, z, v) {
    return 'Withdrawal - Last Possible Withdrawal Date';
}

/* AABPRICING_Facility_tpProductWithdrawalDetailsPercentageUsedOfLimit_value:undefined */
function Facility_tpProductWithdrawalDetailsPercentageUsedOfLimit_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductWithdrawalDetailsPercentageUsedOfLimit_title:'Withdrawal - Percentage used of Limits' */
function Facility_tpProductWithdrawalDetailsPercentageUsedOfLimit_title(f, x, y, z, v) {
    return 'Withdrawal - Percentage used of Limits';
}

/* AABPRICING_Facility_tpProductredemptionDetailsRedemptionType_value:undefined */
function Facility_tpProductredemptionDetailsRedemptionType_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductredemptionDetailsRedemptionType_title:'Repayment - RepaymentType' */
function Facility_tpProductredemptionDetailsRedemptionType_title(f, x, y, z, v) {
    return 'Repayment - RepaymentType';
}

/* AABPRICING_Facility_tpProductredemptionDetailsPeriodicity_value:undefined */
function Facility_tpProductredemptionDetailsPeriodicity_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductredemptionDetailsPeriodicity_title:'Repayment - Periodicity' */
function Facility_tpProductredemptionDetailsPeriodicity_title(f, x, y, z, v) {
    return 'Repayment - Periodicity';
}

/* AABPRICING_Facility_tpProductredemptionDetailsFirstRedemptionAfterXMonths_value:undefined */
function Facility_tpProductredemptionDetailsFirstRedemptionAfterXMonths_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductredemptionDetailsFirstRedemptionAfterXMonths_title:'Repayment - FirstRepaymentAfterXMonths' */
function Facility_tpProductredemptionDetailsFirstRedemptionAfterXMonths_title(f, x, y, z, v) {
    return 'Repayment - FirstRepaymentAfterXMonths';
}

/* AABPRICING_Facility_tpInterestProductCode_value:undefined */
function Facility_tpInterestProductCode_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpInterestProductCode_title:'Interest - Interest Product Code' */
function Facility_tpInterestProductCode_title(f, x, y, z, v) {
    return 'Interest - Interest Product Code';
}

/* AABPRICING_Facility_tpProductinterestDetailsFixedInterestPeriod_value:undefined */
function Facility_tpProductinterestDetailsFixedInterestPeriod_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpProductinterestDetailsFixedInterestPeriod_title:'Interest - Fixed Interest Period' */
function Facility_tpProductinterestDetailsFixedInterestPeriod_title(f, x, y, z, v) {
    return 'Interest - Fixed Interest Period';
}

/* AABPRICING_Facility_tpLGD_value:undefined */
function Facility_tpLGD_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpLGD_title:'Loss Given Default (LGD) ()' */
function Facility_tpLGD_title(f, x, y, z, v) {
    return 'Loss Given Default (LGD) ()';
}

/* AABPRICING_Facility_tpLGDMoC_value:undefined */
function Facility_tpLGDMoC_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpLGDMoC_title:'Loss Given Default (LGD) MoC ()' */
function Facility_tpLGDMoC_title(f, x, y, z, v) {
    return 'Loss Given Default (LGD) MoC ()';
}

/* AABPRICING_Facility_tpDLGDMoC_value:undefined */
function Facility_tpDLGDMoC_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpDLGDMoC_title:'Loss Given Default Downturn (LGD) MoC ()' */
function Facility_tpDLGDMoC_title(f, x, y, z, v) {
    return 'Loss Given Default Downturn (LGD) MoC ()';
}

/* AABPRICING_Facility_tpIsRevolving_value:undefined */
function Facility_tpIsRevolving_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpIsRevolving_title:'Facility is revolving' */
function Facility_tpIsRevolving_title(f, x, y, z, v) {
    return 'Facility is revolving';
}

/* AABPRICING_Facility_tpCustomerSpread2_value:undefined */
function Facility_tpCustomerSpread2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpCustomerSpread2_title:'Customer Spread (Bps)' */
function Facility_tpCustomerSpread2_title(f, x, y, z, v) {
    return 'Customer Spread (Bps)';
}

/* AABPRICING_Facility_tpMarketSpread_value:undefined */
function Facility_tpMarketSpread_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpMarketSpread_title:'Market Spread' */
function Facility_tpMarketSpread_title(f, x, y, z, v) {
    return 'Market Spread';
}

/* AABPRICING_Facility_tpOneOffFeeAmount2_value:0 */
function Facility_tpOneOffFeeAmount2_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpOneOffFeeAmount2_title:'One Off Fee Amount' */
function Facility_tpOneOffFeeAmount2_title(f, x, y, z, v) {
    return 'One Off Fee Amount';
}

/* AABPRICING_Facility_tpCreditFeeBp_value:0 */
function Facility_tpCreditFeeBp_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpCreditFeeBp_title:'Credit fee (Bp)' */
function Facility_tpCreditFeeBp_title(f, x, y, z, v) {
    return 'Credit fee (Bp)';
}

/* AABPRICING_Facility_tpCommitmentFeeBp_value:0 */
function Facility_tpCommitmentFeeBp_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpCommitmentFeeBp_title:'Commitment Fee (Bp)' */
function Facility_tpCommitmentFeeBp_title(f, x, y, z, v) {
    return 'Commitment Fee (Bp)';
}

/* AABPRICING_Facility_tpTargetRaRoRaC_value:undefined */
function Facility_tpTargetRaRoRaC_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpTargetRaRoRaC_title:'Target RaRoRaC' */
function Facility_tpTargetRaRoRaC_title(f, x, y, z, v) {
    return 'Target RaRoRaC';
}

/* AABPRICING_Facility_tpAutomaticInput_value:undefined */
function Facility_tpAutomaticInput_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAutomaticInput_title:EvaluateAsString('Automatic Input Facility') */
function Facility_tpAutomaticInput_title(f, x, y, z, v) {
    return String(
        'Automatic Input Facility'
    );
}

/* AABPRICING_Facility_tpNonRevolvingProduct_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,9)==0,1,0) */
function Facility_tpNonRevolvingProduct_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        9
    ) == 0 ? 1 : 0;
}

/* AABPRICING_Facility_tpNonRevolvingProduct_title:'Non Revolving Product (Y/N)' */
function Facility_tpNonRevolvingProduct_title(f, x, y, z, v) {
    return 'Non Revolving Product (Y/N)';
}

/* AABPRICING_Facility_tpRevolvingProduct_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,9)!=0,1,0) */
function Facility_tpRevolvingProduct_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        9
    ) != 0 ? 1 : 0;
}

/* AABPRICING_Facility_tpRevolvingProduct_title:'Revolving Product (Y/N)' */
function Facility_tpRevolvingProduct_title(f, x, y, z, v) {
    return 'Revolving Product (Y/N)';
}

/* AABPRICING_Facility_tpRevolvingCredit_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,9)!=0,1,0) */
function Facility_tpRevolvingCredit_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        9
    ) != 0 ? 1 : 0;
}

/* AABPRICING_Facility_tpRevolvingCredit_title:'Revolving Credit (Y/N)' */
function Facility_tpRevolvingCredit_title(f, x, y, z, v) {
    return 'Revolving Credit (Y/N)';
}

/* AABPRICING_Facility_tpPDMultiplierUnder1Year_value:If(Facility_tpRemainingTenor==NA,1,If(Facility_tpRemainingTenor<12,Facility_tpRemainingTenor/12,1)) */
function Facility_tpPDMultiplierUnder1Year_value(f, x, y, z, v) {
    return Facility_tpRemainingTenor_value(
        '100615',
        x,
        y,
        z,
        v
    ) ==
    NA ? 1 : Facility_tpRemainingTenor_value(
        '100615',
        x,
        y,
        z,
        v
    ) <
    12 ? Facility_tpRemainingTenor_value(
        '100615',
        x,
        y,
        z,
        v
    ) / 12 : 1;
}

/* AABPRICING_Facility_tpPDMultiplierUnder1Year_title:'Remaning Tenor Under 1 Year' */
function Facility_tpPDMultiplierUnder1Year_title(f, x, y, z, v) {
    return 'Remaning Tenor Under 1 Year';
}

/* AABPRICING_Facility_tpBorrower_tpPD_value:Borrower_tpPD*Facility_tpPDMultiplierUnder1Year */
function Facility_tpBorrower_tpPD_value(f, x, y, z, v) {
    return Borrower_tpPD_value(
        '100240',
        x,
        y.base,
        z,
        v
        ) *
        Facility_tpPDMultiplierUnder1Year_value(
            '100598',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpBorrower_tpPD_title:'Probability of Default of the Borrower Specific for Facility' */
function Facility_tpBorrower_tpPD_title(f, x, y, z, v) {
    return 'Probability of Default of the Borrower Specific for Facility';
}

/* AABPRICING_Facility_tpBorrower_tpPDMoC_value:Borrower_tpPD*Borrower_tpMoCFactor*Facility_tpPDMultiplierUnder1Year */
function Facility_tpBorrower_tpPDMoC_value(f, x, y, z, v) {
    return Borrower_tpPD_value(
        '100240',
        x,
        y.base,
        z,
        v
        ) *
        Borrower_tpMoCFactor_value(
            '100246',
            x,
            y.base,
            z,
            v
        ) *
        Facility_tpPDMultiplierUnder1Year_value(
            '100598',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpBorrower_tpPDMoC_title:'Probability of Default MoC of the Borrower Specific for Facility' */
function Facility_tpBorrower_tpPDMoC_title(f, x, y, z, v) {
    return 'Probability of Default MoC of the Borrower Specific for Facility';
}

/* AABPRICING_Facility_tpBorrower_tpRiskWeight_value:CumNormal((InvNormal(Facility_tpBorrower_tpPDMoC)-(Borrower_tpRho^.5)*InvNormal(1-Borrower_tpConfidenceLevel))/(1-Borrower_tpRho^.5)) */
function Facility_tpBorrower_tpRiskWeight_value(f, x, y, z, v) {
    return CumNormal(
        (
            InvNormal(
                Facility_tpBorrower_tpPDMoC_value(
                    '100602',
                    x,
                    y,
                    z,
                    v
                )
            ) - (
                Borrower_tpRho_value(
                    '100252',
                    x,
                    y.base,
                    z,
                    v
                ) ^ .5
            ) *
            InvNormal(
                1 -
                Borrower_tpConfidenceLevel_value(
                    '100274',
                    x,
                    y.base,
                    z,
                    v
                )
            )
        ) / (
            1 -
            Borrower_tpRho_value(
                '100252',
                x,
                y.base,
                z,
                v
            ) ^ .5
        )
    );
}

/* AABPRICING_Facility_tpBorrower_tpRiskWeight_title:'Risk Weight of the Borrower Specific for Facility' */
function Facility_tpBorrower_tpRiskWeight_title(f, x, y, z, v) {
    return 'Risk Weight of the Borrower Specific for Facility';
}

/* AABPRICING_Facility_tpDeannualize_value:If(Facility_tpRemainingAverageTenor<1,Facility_tpRemainingAverageTenor,1) */
function Facility_tpDeannualize_value(f, x, y, z, v) {
    return Facility_tpRemainingAverageTenor_value(
        '100527',
        x,
        y,
        z,
        v
    ) <
    1 ? Facility_tpRemainingAverageTenor_value(
        '100527',
        x,
        y,
        z,
        v
    ) : 1;
}

/* AABPRICING_Facility_tpDeannualize_title:'De-annualization fraction (years)' */
function Facility_tpDeannualize_title(f, x, y, z, v) {
    return 'De-annualization fraction (years)';
}

/* AABPRICING_Facility_tpBorrower_tpPLorNPL_value:Borrower_tpPLorNPL */
function Facility_tpBorrower_tpPLorNPL_value(f, x, y, z, v) {
    return Borrower_tpPLorNPL_value(
        '100282',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Facility_RepaymentScheme_value:undefined */
function Facility_RepaymentScheme_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_RepaymentScheme_title:'Repayment Scheme' */
function Facility_RepaymentScheme_title(f, x, y, z, v) {
    return 'Repayment Scheme';
}

/* AABPRICING_Facility_tpOriginalTenor_value:OnNeg(OnER(DateToYear(Facility_tpEndDate-1)*12+DateToMonth(Facility_tpEndDate-1)+If(DateToDay(Facility_tpEndDate)>DateToDay(Facility_tpStartDate)||DateToDay(Facility_tpEndDate)==1,1,0)-(DateToYear(Facility_tpStartDate)*12+DateToMonth(Facility_tpStartDate)),NA),NA) */
function Facility_tpOriginalTenor_value(f, x, y, z, v) {
    return OnNeg(
        OnER(
            DateToYear(
                Facility_tpEndDate_value(
                    '100678',
                    x,
                    y,
                    z,
                    v
                ) - 1
            ) * 12 +
            DateToMonth(
                Facility_tpEndDate_value(
                    '100678',
                    x,
                    y,
                    z,
                    v
                ) - 1
            ) + (
                DateToDay(
                    Facility_tpEndDate_value(
                        '100678',
                        x,
                        y,
                        z,
                        v
                    )
                ) >
                DateToDay(
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    )
                ) || DateToDay(
                    Facility_tpEndDate_value(
                        '100678',
                        x,
                        y,
                        z,
                        v
                    )
                ) == 1 ? 1 : 0
            ) - (
                DateToYear(
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    )
                ) * 12 +
                DateToMonth(
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    )
                )
            ),
            NA
        ),
        NA
    );
}

/* AABPRICING_Facility_tpOriginalTenor_title:'Original Tenor (using the start date) (Months)' */
function Facility_tpOriginalTenor_title(f, x, y, z, v) {
    return 'Original Tenor (using the start date) (Months)';
}

/* AABPRICING_Facility_tpOriginalTenorYears_value:OnNeg(OnER(Facility_tpOriginalTenor/12,NA),NA) */
function Facility_tpOriginalTenorYears_value(f, x, y, z, v) {
    return OnNeg(
        OnER(
            Facility_tpOriginalTenor_value(
                '100611',
                x,
                y,
                z,
                v
            ) / 12,
            NA
        ),
        NA
    );
}

/* AABPRICING_Facility_tpOriginalTenorYears_title:'Original Tenor (using the start date) (Years)' */
function Facility_tpOriginalTenorYears_title(f, x, y, z, v) {
    return 'Original Tenor (using the start date) (Years)';
}

/* AABPRICING_Facility_tpRemainingTenor_value:OnNeg(OnER(DateToYear(Facility_tpEndDate-1)*12+DateToMonth(Facility_tpEndDate-1)+If(DateToDay(Facility_tpEndDate)>DateToDay(Facility_tpStartDate)||DateToDay(Facility_tpEndDate)==1,1,0)-(DateToYear(If(Facility_tpCurrentDate<=Facility_tpStartDate,Facility_tpStartDate,Facility_tpCurrentDate))*12+DateToMonth(If(Facility_tpCurrentDate<=Facility_tpStartDate,Facility_tpStartDate,Facility_tpCurrentDate))),NA),NA) */
function Facility_tpRemainingTenor_value(f, x, y, z, v) {
    return OnNeg(
        OnER(
            DateToYear(
                Facility_tpEndDate_value(
                    '100678',
                    x,
                    y,
                    z,
                    v
                ) - 1
            ) * 12 +
            DateToMonth(
                Facility_tpEndDate_value(
                    '100678',
                    x,
                    y,
                    z,
                    v
                ) - 1
            ) + (
                DateToDay(
                    Facility_tpEndDate_value(
                        '100678',
                        x,
                        y,
                        z,
                        v
                    )
                ) >
                DateToDay(
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    )
                ) || DateToDay(
                    Facility_tpEndDate_value(
                        '100678',
                        x,
                        y,
                        z,
                        v
                    )
                ) == 1 ? 1 : 0
            ) - (
                DateToYear(
                    Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    ) <=
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    ) ? Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    ) : Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    )
                ) * 12 +
                DateToMonth(
                    Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    ) <=
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    ) ? Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    ) : Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    )
                )
            ),
            NA
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRemainingTenor_title:'Remaining Tenor (using the current date) (Months)' */
function Facility_tpRemainingTenor_title(f, x, y, z, v) {
    return 'Remaining Tenor (using the current date) (Months)';
}

/* AABPRICING_Facility_tpRemainingTenorYears_value:OnNeg(OnER(Facility_tpRemainingTenor/12,NA),NA) */
function Facility_tpRemainingTenorYears_value(f, x, y, z, v) {
    return OnNeg(
        OnER(
            Facility_tpRemainingTenor_value(
                '100615',
                x,
                y,
                z,
                v
            ) / 12,
            NA
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRemainingTenorYears_title:'Remaining Tenor (using the current date) (Years)' */
function Facility_tpRemainingTenorYears_title(f, x, y, z, v) {
    return 'Remaining Tenor (using the current date) (Years)';
}

/* AABPRICING_Facility_tpOriginalAverageTenor_value:If(Facility_tpRevolvingCredit==0,If(Facility_tpRepaymentChoice==0,Facility_tpOriginalAverageTenorBullet,Facility_tpOriginalAverageTenorNoBullet),1) */
function Facility_tpOriginalAverageTenor_value(f, x, y, z, v) {
    return Facility_tpRevolvingCredit_value(
        '100596',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpOriginalAverageTenorBullet_value(
        '100621',
        x,
        y,
        z,
        v
    ) : Facility_tpOriginalAverageTenorNoBullet_value(
        '100623',
        x,
        y,
        z,
        v
    ) : 1;
}

/* AABPRICING_Facility_tpOriginalAverageTenor_title:'Original Average Tenor (Years)' */
function Facility_tpOriginalAverageTenor_title(f, x, y, z, v) {
    return 'Original Average Tenor (Years)';
}

/* AABPRICING_Facility_tpOriginalAverageTenorBullet_value:OnER(Facility_tpOriginalTenorYears,NA) */
function Facility_tpOriginalAverageTenorBullet_value(f, x, y, z, v) {
    return OnER(
        Facility_tpOriginalTenorYears_value(
            '100613',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpOriginalAverageTenorBullet_title:'Original Average Tenor - Bullet' */
function Facility_tpOriginalAverageTenorBullet_title(f, x, y, z, v) {
    return 'Original Average Tenor - Bullet';
}

/* AABPRICING_Facility_tpOriginalAverageTenorNoBullet_value:If(Facility_tpRepaymentChoice==3,Facility_tpOriginalAverageTenorScheme,If(Facility_tpRepaymentChoice==2,Facility_tpAnnuityOAT,If(Facility_tpRepaymentChoice==1,Facility_tpLinearOAT,OnER(HSum(Facility_tpWeightedAmountRepayment,DateToT(Facility_tpStartDate,1),DateToT(Facility_tpEndDateMax10,1))/(12*HSum(Facility_tpRepayment,DateToT(Facility_tpStartDate,1),DateToT(Facility_tpEndDateMax10,1))),NA)))) */
function Facility_tpOriginalAverageTenorNoBullet_value(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    3 ? Facility_tpOriginalAverageTenorScheme_value(
        '100746',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpAnnuityOAT_value(
        '100820',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpLinearOAT_value(
        '100846',
        x,
        y,
        z,
        v
    ) : OnER(
        HSum(
            Facility_tpWeightedAmountRepayment_value(
                '100875',
                x,
                y,
                z,
                v
            ),
            DateToT(
                'x',
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                ),
                1
            ),
            DateToT(
                'x',
                Facility_tpEndDateMax10_value(
                    '100679',
                    x,
                    y,
                    z,
                    v
                ),
                1
            )
        ) / (
            12 *
            HSum(
                Facility_tpRepayment_value(
                    '100884',
                    x,
                    y,
                    z,
                    v
                ),
                DateToT(
                    'x',
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ),
                DateToT(
                    'x',
                    Facility_tpEndDateMax10_value(
                        '100679',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                )
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpOriginalAverageTenorNoBullet_title:'Original Average Tenor - No Bullet' */
function Facility_tpOriginalAverageTenorNoBullet_title(f, x, y, z, v) {
    return 'Original Average Tenor - No Bullet';
}

/* AABPRICING_Facility_tpOriginalAverageTenorTHsum_value:OnER(HSum(Facility_tpWeightedAmountRepayment,DateToT(Facility_tpStartDate,1),DateToT(Facility_tpEndDateMax10,1)),NA) */
function Facility_tpOriginalAverageTenorTHsum_value(f, x, y, z, v) {
    return OnER(
        HSum(
            Facility_tpWeightedAmountRepayment_value(
                '100875',
                x,
                y,
                z,
                v
            ),
            DateToT(
                'x',
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                ),
                1
            ),
            DateToT(
                'x',
                Facility_tpEndDateMax10_value(
                    '100679',
                    x,
                    y,
                    z,
                    v
                ),
                1
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpOriginalAverageTenorTHsum_title:'Original Average Tenor Teller' */
function Facility_tpOriginalAverageTenorTHsum_title(f, x, y, z, v) {
    return 'Original Average Tenor Teller';
}

/* AABPRICING_Facility_tpOriginalAverageTenorNHsum_value:OnER(12*HSum(Facility_tpRepayment,DateToT(Facility_tpStartDate,1),DateToT(Facility_tpEndDateMax10,1)),NA) */
function Facility_tpOriginalAverageTenorNHsum_value(f, x, y, z, v) {
    return OnER(
        12 *
        HSum(
            Facility_tpRepayment_value(
                '100884',
                x,
                y,
                z,
                v
            ),
            DateToT(
                'x',
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                ),
                1
            ),
            DateToT(
                'x',
                Facility_tpEndDateMax10_value(
                    '100679',
                    x,
                    y,
                    z,
                    v
                ),
                1
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpOriginalAverageTenorNHsum_title:'Original Average Tenor Noemer' */
function Facility_tpOriginalAverageTenorNHsum_title(f, x, y, z, v) {
    return 'Original Average Tenor Noemer';
}

/* AABPRICING_Facility_tpRemainingAverageTenor2_value:Facility_tpRemainingAverageTenor */
function Facility_tpRemainingAverageTenor2_value(f, x, y, z, v) {
    return Facility_tpRemainingAverageTenor_value(
        '100527',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpRemainingAverageTenorBullet_value:OnER(Facility_tpRemainingTenorYears,NA) */
function Facility_tpRemainingAverageTenorBullet_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRemainingTenorYears_value(
            '100617',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRemainingAverageTenorBullet_title:'Remaining Average Tenor - Bullet' */
function Facility_tpRemainingAverageTenorBullet_title(f, x, y, z, v) {
    return 'Remaining Average Tenor - Bullet';
}

/* AABPRICING_Facility_tpRemainingAverageTenorNoBullet_value:If(Facility_tpRepaymentChoice==3,Facility_tpRemainingAverageTenorScheme,If(Facility_tpRepaymentChoice==2,Facility_tpAnnuityRAT,If(Facility_tpRepaymentChoice==1,Facility_tpLinearRAT,OnER(HSum(Facility_tpWeightedAmountRepaymentRem,DateToT(Facility_tpCurrentDate,1)+If(DateToDay(Facility_tpCurrentDate)==1,0,1),DateToT(Facility_tpEndDateMax10,1))/(12*HSum(Facility_tpRepayment,DateToT(Facility_tpCurrentDate,1)+If(DateToDay(Facility_tpCurrentDate)==1,0,1),DateToT(Facility_tpEndDateMax10,1))),NA)))) */
function Facility_tpRemainingAverageTenorNoBullet_value(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    3 ? Facility_tpRemainingAverageTenorScheme_value(
        '100754',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpAnnuityRAT_value(
        '100828',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpLinearRAT_value(
        '100854',
        x,
        y,
        z,
        v
    ) : OnER(
        HSum(
            Facility_tpWeightedAmountRepaymentRem_value(
                '100878',
                x,
                y,
                z,
                v
            ),
            DateToT(
                'x',
                Facility_tpCurrentDate_value(
                    '100676',
                    x,
                    y,
                    z,
                    v
                ),
                1
            ) + (
                DateToDay(
                    Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    )
                ) == 1 ? 0 : 1
            ),
            DateToT(
                'x',
                Facility_tpEndDateMax10_value(
                    '100679',
                    x,
                    y,
                    z,
                    v
                ),
                1
            )
        ) / (
            12 *
            HSum(
                Facility_tpRepayment_value(
                    '100884',
                    x,
                    y,
                    z,
                    v
                ),
                DateToT(
                    'x',
                    Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ) + (
                    DateToDay(
                        Facility_tpCurrentDate_value(
                            '100676',
                            x,
                            y,
                            z,
                            v
                        )
                    ) == 1 ? 0 : 1
                ),
                DateToT(
                    'x',
                    Facility_tpEndDateMax10_value(
                        '100679',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                )
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRemainingAverageTenorNoBullet_title:'Remaining Average Tenor - No Bullet' */
function Facility_tpRemainingAverageTenorNoBullet_title(f, x, y, z, v) {
    return 'Remaining Average Tenor - No Bullet';
}

/* AABPRICING_Facility_tpRemainingAverageTenorTHsum_value:OnER(HSum(Facility_tpWeightedAmountRepaymentRem,DateToT(Facility_tpCurrentDate,1)+If(DateToDay(Facility_tpCurrentDate)==1,0,1),DateToT(Facility_tpEndDateMax10,1)),NA) */
function Facility_tpRemainingAverageTenorTHsum_value(f, x, y, z, v) {
    return OnER(
        HSum(
            Facility_tpWeightedAmountRepaymentRem_value(
                '100878',
                x,
                y,
                z,
                v
            ),
            DateToT(
                'x',
                Facility_tpCurrentDate_value(
                    '100676',
                    x,
                    y,
                    z,
                    v
                ),
                1
            ) + (
                DateToDay(
                    Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    )
                ) == 1 ? 0 : 1
            ),
            DateToT(
                'x',
                Facility_tpEndDateMax10_value(
                    '100679',
                    x,
                    y,
                    z,
                    v
                ),
                1
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRemainingAverageTenorTHsum_title:'Remaining Average Tenor Teller' */
function Facility_tpRemainingAverageTenorTHsum_title(f, x, y, z, v) {
    return 'Remaining Average Tenor Teller';
}

/* AABPRICING_Facility_tpRemainingAverageTenorNHsum_value:OnER(12*HSum(Facility_tpRepayment,DateToT(Facility_tpCurrentDate,1)+If(DateToDay(Facility_tpCurrentDate)==1,0,1),DateToT(Facility_tpEndDateMax10,1)),NA) */
function Facility_tpRemainingAverageTenorNHsum_value(f, x, y, z, v) {
    return OnER(
        12 *
        HSum(
            Facility_tpRepayment_value(
                '100884',
                x,
                y,
                z,
                v
            ),
            DateToT(
                'x',
                Facility_tpCurrentDate_value(
                    '100676',
                    x,
                    y,
                    z,
                    v
                ),
                1
            ) + (
                DateToDay(
                    Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    )
                ) == 1 ? 0 : 1
            ),
            DateToT(
                'x',
                Facility_tpEndDateMax10_value(
                    '100679',
                    x,
                    y,
                    z,
                    v
                ),
                1
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRemainingAverageTenorNHsum_title:'Remaining Average Tenor Noemer' */
function Facility_tpRemainingAverageTenorNHsum_title(f, x, y, z, v) {
    return 'Remaining Average Tenor Noemer';
}

/* AABPRICING_Facility_tpLimit_value:If(Facility_tpRepaymentChoice==4||Facility_tpWithdrawalChoice==2,Facility_tpPrincipalLimit,If(Facility_tpRepaymentChoice==0,Facility_tpPrincipalLimit,If(Facility_tpRepaymentChoice==1,Facility_tpLimitLinear,If(Facility_tpRepaymentChoice==2,Facility_tpLimitAnnuity,If(Facility_tpRepaymentChoice==3,Facility_tpLimitScheme,Facility_tpPrincipalLimit))))) */
function Facility_tpLimit_value(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    4 || Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpLimitLinear_value(
        '100642',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpLimitAnnuity_value(
        '100640',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    3 ? Facility_tpLimitScheme_value(
        '100644',
        x,
        y,
        z,
        v
    ) : Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpLimit_title:'Limit (For upcoming 12 months after Current Date)' */
function Facility_tpLimit_title(f, x, y, z, v) {
    return 'Limit (For upcoming 12 months after Current Date)';
}

/* AABPRICING_Facility_tpLimitAnnuity_value:(Facility_tpPrincipalLimit*Facility_tpRepaymentFrequency-Facility_tpLimitAnnuityRepayment)/MinMax(Facility_tpAnnuityPPMTRATTotalPeriods,1,Facility_tpRepaymentFrequency,NA) */
function Facility_tpLimitAnnuity_value(f, x, y, z, v) {
    return (
            Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ) *
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ) -
            Facility_tpLimitAnnuityRepayment_value(
                '100648',
                x,
                y,
                z,
                v
            )
        ) /
        MinMax(
            Facility_tpAnnuityPPMTRATTotalPeriods_value(
                '100806',
                x,
                y,
                z,
                v
            ),
            1,
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            NA
        );
}

/* AABPRICING_Facility_tpLimitAnnuity_title:'Limit annuity' */
function Facility_tpLimitAnnuity_title(f, x, y, z, v) {
    return 'Limit annuity';
}

/* AABPRICING_Facility_tpLimitLinear_value:(Facility_tpPrincipalLimit*Facility_tpRepaymentFrequency-Facility_tpLimitLinearRepayment)/MinMax(Facility_tpAnnuityPPMTRATTotalPeriods,1,Facility_tpRepaymentFrequency,NA) */
function Facility_tpLimitLinear_value(f, x, y, z, v) {
    return (
            Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ) *
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ) -
            Facility_tpLimitLinearRepayment_value(
                '100646',
                x,
                y,
                z,
                v
            )
        ) /
        MinMax(
            Facility_tpAnnuityPPMTRATTotalPeriods_value(
                '100806',
                x,
                y,
                z,
                v
            ),
            1,
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            NA
        );
}

/* AABPRICING_Facility_tpLimitLinear_title:'Limit Linear' */
function Facility_tpLimitLinear_title(f, x, y, z, v) {
    return 'Limit Linear';
}

/* AABPRICING_Facility_tpLimitScheme_value:(Facility_tpPrincipalLimit*Facility_tpRepaymentFrequency-Facility_tpLimitAnnuityRepayment)/MinMax(Facility_tpAnnuityPPMTRATTotalPeriods,1,Facility_tpRepaymentFrequency,NA) */
function Facility_tpLimitScheme_value(f, x, y, z, v) {
    return (
            Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ) *
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ) -
            Facility_tpLimitAnnuityRepayment_value(
                '100648',
                x,
                y,
                z,
                v
            )
        ) /
        MinMax(
            Facility_tpAnnuityPPMTRATTotalPeriods_value(
                '100806',
                x,
                y,
                z,
                v
            ),
            1,
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            NA
        );
}

/* AABPRICING_Facility_tpLimitScheme_title:'Limit Scheme' */
function Facility_tpLimitScheme_title(f, x, y, z, v) {
    return 'Limit Scheme';
}

/* AABPRICING_Facility_tpLimitLinearRepayment_value:SumFor(X,Facility_tpPeriodDifferenceGrace+1,Facility_tpNumberOfPeriodsNoGrace,1,Facility_tpLinear*Round(MinMax(Facility_tpAnnuityMonthsSinceStartDate+Facility_tpRepaymentFrequency-X,0,Facility_tpRepaymentFrequency),0)) */
function Facility_tpLimitLinearRepayment_value(f, x, y, z, v) {
    return SumFor(
        X,
        Facility_tpPeriodDifferenceGrace_value(
            '100795',
            x,
            y,
            z,
            v
        ) + 1,
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ),
        1,
        Facility_tpLinear_value(
            '100836',
            x,
            y,
            z,
            v
        ) *
        Round(
            MinMax(
                Facility_tpAnnuityMonthsSinceStartDate_value(
                    '100781',
                    x,
                    y,
                    z,
                    v
                ) +
                Facility_tpRepaymentFrequency_value(
                    '100662',
                    x,
                    y,
                    z,
                    v
                ) - X,
                0,
                Facility_tpRepaymentFrequency_value(
                    '100662',
                    x,
                    y,
                    z,
                    v
                )
            ),
            0
        )
    );
}

/* AABPRICING_Facility_tpLimitLinearRepayment_title:'Limit Linear Repayment Amount' */
function Facility_tpLimitLinearRepayment_title(f, x, y, z, v) {
    return 'Limit Linear Repayment Amount';
}

/* AABPRICING_Facility_tpLimitAnnuityRepayment_value:SumFor(X,1,Facility_tpNumberOfPeriods,1,PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,X,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon)*MinMax(Facility_tpAnnuityMonthsSinceStartDate+Facility_tpRepaymentFrequency-Facility_tpPeriodDifferenceGrace-X,0,Facility_tpRepaymentFrequency,0)) */
function Facility_tpLimitAnnuityRepayment_value(f, x, y, z, v) {
    return SumFor(
        X,
        1,
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        ),
        1,
        PPMT(
            Facility_tpAnnuityInterestRate_value(
                '100668',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            X,
            Facility_tpNumberOfPeriods_value(
                '100652',
                x,
                y,
                z,
                v
            ),
            -Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ),
            Facility_tpBalloon_value(
                '100670',
                x,
                y,
                z,
                v
            )
        ) *
        MinMax(
            Facility_tpAnnuityMonthsSinceStartDate_value(
                '100781',
                x,
                y,
                z,
                v
            ) +
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ) -
            Facility_tpPeriodDifferenceGrace_value(
                '100795',
                x,
                y,
                z,
                v
            ) - X,
            0,
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            0
        )
    );
}

/* AABPRICING_Facility_tpLimitAnnuityRepayment_title:'Limit Annuity Repayment Amount' */
function Facility_tpLimitAnnuityRepayment_title(f, x, y, z, v) {
    return 'Limit Annuity Repayment Amount';
}

/* AABPRICING_Facility_tpLimitSchemeRepayment_value:TupleSum(Facility_tpManual_LimitWeightedRepayment) */
function Facility_tpLimitSchemeRepayment_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_LimitWeightedRepayment_value(
            '100738',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpLimitSchemeRepayment_title:'Limit Scheme Repayment Amount' */
function Facility_tpLimitSchemeRepayment_title(f, x, y, z, v) {
    return 'Limit Scheme Repayment Amount';
}

/* AABPRICING_Facility_tpNumberOfPeriods_value:If(Facility_tpRepaymentChoice==0,1,OnER(RoundUp((DateToYear(Facility_tpEndDate-1)*12+DateToMonth(Facility_tpEndDate-1)+If(DateToDay(Facility_tpEndDate)>DateToDay(Facility_tpStartDate)||DateToDay(Facility_tpEndDate)==1,1,0)-(DateToYear(Facility_tpStartDate)*12+DateToMonth(Facility_tpStartDate))-Facility_tpGracePeriod)*(Facility_tpRepaymentFrequency/12),0),NA)) */
function Facility_tpNumberOfPeriods_value(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 ? 1 : OnER(
        RoundUp(
            (
                DateToYear(
                    Facility_tpEndDate_value(
                        '100678',
                        x,
                        y,
                        z,
                        v
                    ) - 1
                ) * 12 +
                DateToMonth(
                    Facility_tpEndDate_value(
                        '100678',
                        x,
                        y,
                        z,
                        v
                    ) - 1
                ) + (
                    DateToDay(
                        Facility_tpEndDate_value(
                            '100678',
                            x,
                            y,
                            z,
                            v
                        )
                    ) >
                    DateToDay(
                        Facility_tpStartDate_value(
                            '100674',
                            x,
                            y,
                            z,
                            v
                        )
                    ) || DateToDay(
                        Facility_tpEndDate_value(
                            '100678',
                            x,
                            y,
                            z,
                            v
                        )
                    ) == 1 ? 1 : 0
                ) - (
                    DateToYear(
                        Facility_tpStartDate_value(
                            '100674',
                            x,
                            y,
                            z,
                            v
                        )
                    ) * 12 +
                    DateToMonth(
                        Facility_tpStartDate_value(
                            '100674',
                            x,
                            y,
                            z,
                            v
                        )
                    )
                ) -
                Facility_tpGracePeriod_value(
                    '100672',
                    x,
                    y,
                    z,
                    v
                )
            ) * (
                Facility_tpRepaymentFrequency_value(
                    '100662',
                    x,
                    y,
                    z,
                    v
                ) / 12
            ),
            0
        ),
        NA
    );
}

/* AABPRICING_Facility_tpNumberOfPeriods_title:'Number Of Periods' */
function Facility_tpNumberOfPeriods_title(f, x, y, z, v) {
    return 'Number Of Periods';
}

/* AABPRICING_Facility_tpNumberOfPeriodsNoGrace_value:If(Facility_tpRepaymentChoice==0,1,OnER(RoundUp((DateToYear(Facility_tpEndDate-1)*12+DateToMonth(Facility_tpEndDate-1)+If(DateToDay(Facility_tpEndDate)>DateToDay(Facility_tpStartDate)||DateToDay(Facility_tpEndDate)==1,1,0)-(DateToYear(Facility_tpStartDate)*12+DateToMonth(Facility_tpStartDate)))*(Facility_tpRepaymentFrequency/12),0),NA)) */
function Facility_tpNumberOfPeriodsNoGrace_value(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 ? 1 : OnER(
        RoundUp(
            (
                DateToYear(
                    Facility_tpEndDate_value(
                        '100678',
                        x,
                        y,
                        z,
                        v
                    ) - 1
                ) * 12 +
                DateToMonth(
                    Facility_tpEndDate_value(
                        '100678',
                        x,
                        y,
                        z,
                        v
                    ) - 1
                ) + (
                    DateToDay(
                        Facility_tpEndDate_value(
                            '100678',
                            x,
                            y,
                            z,
                            v
                        )
                    ) >
                    DateToDay(
                        Facility_tpStartDate_value(
                            '100674',
                            x,
                            y,
                            z,
                            v
                        )
                    ) || DateToDay(
                        Facility_tpEndDate_value(
                            '100678',
                            x,
                            y,
                            z,
                            v
                        )
                    ) == 1 ? 1 : 0
                ) - (
                    DateToYear(
                        Facility_tpStartDate_value(
                            '100674',
                            x,
                            y,
                            z,
                            v
                        )
                    ) * 12 +
                    DateToMonth(
                        Facility_tpStartDate_value(
                            '100674',
                            x,
                            y,
                            z,
                            v
                        )
                    )
                )
            ) * (
                Facility_tpRepaymentFrequency_value(
                    '100662',
                    x,
                    y,
                    z,
                    v
                ) / 12
            ),
            0
        ),
        NA
    );
}

/* AABPRICING_Facility_tpNumberOfPeriodsNoGrace_title:'Number Of Periods Without Grace' */
function Facility_tpNumberOfPeriodsNoGrace_title(f, x, y, z, v) {
    return 'Number Of Periods Without Grace';
}

/* AABPRICING_Facility_tpWithdrawalChoice_value:If(Facility_tpProductuptakeDetailsUptakeType=='OneTime',0,If(Facility_tpProductuptakeDetailsUptakeType=='FixedTerms',1,If(Facility_tpProductuptakeDetailsUptakeType=='WithdrawalRevolving',2,If(Facility_tpProductuptakeDetailsUptakeType=='IrregularWithdrawalSchedule',3,If(Facility_tpProductuptakeDetailsUptakeType=='ConditionalWithdrawalSchedule',3,NA))))) */
function Facility_tpWithdrawalChoice_value(f, x, y, z, v) {
    return Facility_tpProductuptakeDetailsUptakeType_value(
        '100552',
        x,
        y,
        z,
        v
    ) ==
    'OneTime' ? 0 : Facility_tpProductuptakeDetailsUptakeType_value(
        '100552',
        x,
        y,
        z,
        v
    ) ==
    'FixedTerms' ? 1 : Facility_tpProductuptakeDetailsUptakeType_value(
        '100552',
        x,
        y,
        z,
        v
    ) ==
    'WithdrawalRevolving' ? 2 : Facility_tpProductuptakeDetailsUptakeType_value(
        '100552',
        x,
        y,
        z,
        v
    ) ==
    'IrregularWithdrawalSchedule' ? 3 : Facility_tpProductuptakeDetailsUptakeType_value(
        '100552',
        x,
        y,
        z,
        v
    ) == 'ConditionalWithdrawalSchedule' ? 3 : NA;
}

/* AABPRICING_Facility_tpWithdrawalChoice_title:'Withdrawal Type' */
function Facility_tpWithdrawalChoice_title(f, x, y, z, v) {
    return 'Withdrawal Type';
}

/* AABPRICING_Facility_tpWithdrawalChoice_choices:[{'name':' 0','value':'ONCE'},{'name':'1','value':'PERIODICAL'},{'name':'2','value':'REVOLVING'},{'name':'3','value':'SCHEME'}] */
function Facility_tpWithdrawalChoice_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'ONCE'}, {'name': '1', 'value': 'PERIODICAL'}, {
        'name': '2',
        'value': 'REVOLVING'
    }, {'name': '3', 'value': 'SCHEME'}];
}

/* AABPRICING_Facility_tpRepaymentChoice_value:If(Facility_tpProductredemptionDetailsRedemptionType=='InterestOnly',0,If(Facility_tpProductredemptionDetailsRedemptionType=='Linear',1,If(Facility_tpProductredemptionDetailsRedemptionType=='Annuity',2,If(Facility_tpProductredemptionDetailsRedemptionType=='IrregularRepaymentSchedule',3,If(Facility_tpProductredemptionDetailsRedemptionType=='RepaymentRevolving',4,NA))))) */
function Facility_tpRepaymentChoice_value(f, x, y, z, v) {
    return Facility_tpProductredemptionDetailsRedemptionType_value(
        '100560',
        x,
        y,
        z,
        v
    ) ==
    'InterestOnly' ? 0 : Facility_tpProductredemptionDetailsRedemptionType_value(
        '100560',
        x,
        y,
        z,
        v
    ) ==
    'Linear' ? 1 : Facility_tpProductredemptionDetailsRedemptionType_value(
        '100560',
        x,
        y,
        z,
        v
    ) ==
    'Annuity' ? 2 : Facility_tpProductredemptionDetailsRedemptionType_value(
        '100560',
        x,
        y,
        z,
        v
    ) ==
    'IrregularRepaymentSchedule' ? 3 : Facility_tpProductredemptionDetailsRedemptionType_value(
        '100560',
        x,
        y,
        z,
        v
    ) == 'RepaymentRevolving' ? 4 : NA;
}

/* AABPRICING_Facility_tpRepaymentChoice_title:'Repayment Type' */
function Facility_tpRepaymentChoice_title(f, x, y, z, v) {
    return 'Repayment Type';
}

/* AABPRICING_Facility_tpRepaymentChoice_choices:[{'name':' 0','value':'BULLET'},{'name':'1','value':'LINEAR'},{'name':'2','value':'ANNUITY'},{'name':'3','value':'SCHEME'},{'name':'4','value':'REVOLVING'}] */
function Facility_tpRepaymentChoice_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'BULLET'}, {'name': '1', 'value': 'LINEAR'}, {
        'name': '2',
        'value': 'ANNUITY'
    }, {'name': '3', 'value': 'SCHEME'}, {'name': '4', 'value': 'REVOLVING'}];
}

/* AABPRICING_Facility_tpRepaymentFrequency_value:OnER(Val(Facility_tpProductredemptionDetailsPeriodicity),NA) */
function Facility_tpRepaymentFrequency_value(f, x, y, z, v) {
    return OnER(
        Val(
            Facility_tpProductredemptionDetailsPeriodicity_value(
                '100562',
                x,
                y,
                z,
                v
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRepaymentFrequency_title:'Repayment frequency' */
function Facility_tpRepaymentFrequency_title(f, x, y, z, v) {
    return 'Repayment frequency';
}

/* AABPRICING_Facility_tpRepaymentFrequency_choices:[{'name':' 1','value':'YEARLY'},{'name':'2','value':'HALF YEARLY'},{'name':'4','value':'QUARTERLY'},{'name':'12','value':'MONTHLY'},{'name':''}] */
function Facility_tpRepaymentFrequency_choices(f, x, y, z, v) {
    return [{'name': ' 1', 'value': 'YEARLY'}, {'name': '2', 'value': 'HALF YEARLY'}, {
        'name': '4',
        'value': 'QUARTERLY'
    }, {'name': '12', 'value': 'MONTHLY'}, {'name': ''}];
}

/* AABPRICING_Facility_tpAnnuityInterestRateDefault_value:1 */
function Facility_tpAnnuityInterestRateDefault_value(f, x, y, z, v) {
    return 1;
}

/* AABPRICING_Facility_tpAnnuityInterestRateDefault_title:'Annuity Interest Rate (Default/Funding+Marge)' */
function Facility_tpAnnuityInterestRateDefault_title(f, x, y, z, v) {
    return 'Annuity Interest Rate (Default/Funding+Marge)';
}

/* AABPRICING_Facility_tpAnnuityInterestRateDefault_choices:[{'name':' 1','value':'YES'},{'name':'0','value':'NO'}] */
function Facility_tpAnnuityInterestRateDefault_choices(f, x, y, z, v) {
    return [{'name': ' 1', 'value': 'YES'}, {'name': '0', 'value': 'NO'}];
}

/* AABPRICING_Facility_tpAnnuityInterestRate_value:If(Facility_tpAnnuityInterestRateDefault,.05,(Facility_tpBaseRate2+Facility_tpCustomerSpread2+Facility_tpCustomerSpreadAddMargin2)*1e-4) */
function Facility_tpAnnuityInterestRate_value(f, x, y, z, v) {
    return Facility_tpAnnuityInterestRateDefault_value(
        '100665',
        x,
        y,
        z,
        v
    ) ? .05 : (
        Facility_tpBaseRate2_value(
            '100523',
            x,
            y,
            z,
            v
        ) +
        Facility_tpCustomerSpread2_value(
            '100578',
            x,
            y,
            z,
            v
        ) +
        Facility_tpCustomerSpreadAddMargin2_value(
            '100525',
            x,
            y,
            z,
            v
        )
    ) * 1 - 4;
}

/* AABPRICING_Facility_tpAnnuityInterestRate_title:'Annuity Interest Rate' */
function Facility_tpAnnuityInterestRate_title(f, x, y, z, v) {
    return 'Annuity Interest Rate';
}

/* AABPRICING_Facility_tpBalloon_value:0 */
function Facility_tpBalloon_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpBalloon_title:'Balloon ()' */
function Facility_tpBalloon_title(f, x, y, z, v) {
    return 'Balloon ()';
}

/* AABPRICING_Facility_tpGracePeriod_value:Facility_tpProductredemptionDetailsFirstRedemptionAfterXMonths */
function Facility_tpGracePeriod_value(f, x, y, z, v) {
    return Facility_tpProductredemptionDetailsFirstRedemptionAfterXMonths_value(
        '100564',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpGracePeriod_title:'Grace Period (mnd)' */
function Facility_tpGracePeriod_title(f, x, y, z, v) {
    return 'Grace Period (mnd)';
}

/* AABPRICING_Facility_tpStartDate_value:Facility_tpProductstartDate */
function Facility_tpStartDate_value(f, x, y, z, v) {
    return Facility_tpProductstartDate_value(
        '100546',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpStartDate_title:'Start date' */
function Facility_tpStartDate_title(f, x, y, z, v) {
    return 'Start date';
}

/* AABPRICING_Facility_tpCurrentDate_value:If(DataEntered(Facility_tpCurrentDate),Facility_tpCurrentDate,CurrentDate) */
function Facility_tpCurrentDate_value(f, x, y, z, v) {
    return v[100676][x.hash + y.hash + z] !==
    undefined ? Facility_tpCurrentDate_value(
        '100676',
        x,
        y,
        z,
        v
    ) : CurrentDate_value(
        '101445',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Facility_tpCurrentDate_title:'Current date' */
function Facility_tpCurrentDate_title(f, x, y, z, v) {
    return 'Current date';
}

/* AABPRICING_Facility_tpEndDate_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,9)==1,NA,Facility_tpProductEndDate) */
function Facility_tpEndDate_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        9
    ) ==
    1 ? NA : Facility_tpProductEndDate_value(
        '100550',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpEndDateMax10_value:If(Facility_tpEndDate>AddMonth(DMYtoDate(DateToDay(Facility_tpStartDate),DateToMonth(Facility_tpStartDate),DateToYear(Facility_tpStartDate)),84),AddMonth(DMYtoDate(DateToDay(Facility_tpStartDate),DateToMonth(Facility_tpStartDate),DateToYear(Facility_tpStartDate)),120),Facility_tpEndDate) */
function Facility_tpEndDateMax10_value(f, x, y, z, v) {
    return Facility_tpEndDate_value(
        '100678',
        x,
        y,
        z,
        v
    ) >
    AddMonth(
        DMYtoDate(
            DateToDay(
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                )
            ),
            DateToMonth(
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                )
            ),
            DateToYear(
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                )
            )
        ),
        84
    ) ? AddMonth(
        DMYtoDate(
            DateToDay(
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                )
            ),
            DateToMonth(
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                )
            ),
            DateToYear(
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                )
            )
        ),
        120
    ) : Facility_tpEndDate_value(
        '100678',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpEndDateMax10_title:'End date Maximum 10 years' */
function Facility_tpEndDateMax10_title(f, x, y, z, v) {
    return 'End date Maximum 10 years';
}

/* AABPRICING_Facility_tpExpectedAverageOutstanding2_value:Facility_tpExpectedAverageOutstanding */
function Facility_tpExpectedAverageOutstanding2_value(f, x, y, z, v) {
    return Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_RepaymentSchemeSub26_value:undefined */
function Facility_RepaymentSchemeSub26_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_RepaymentSchemeSub26_title:'Expected Average Outstanding Scheme' */
function Facility_RepaymentSchemeSub26_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Scheme';
}

/* AABPRICING_Facility_tpPercentageUsedOfExpectedAverageOutstanding_value:Facility_tpProductWithdrawalDetailsPercentageUsedOfLimit */
function Facility_tpPercentageUsedOfExpectedAverageOutstanding_value(f, x, y, z, v) {
    return Facility_tpProductWithdrawalDetailsPercentageUsedOfLimit_value(
        '100558',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpPercentageUsedOfExpectedAverageOutstanding_title:'Percentage used of the Expected Average Outstanding (Revolving Items)' */
function Facility_tpPercentageUsedOfExpectedAverageOutstanding_title(f, x, y, z, v) {
    return 'Percentage used of the Expected Average Outstanding (Revolving Items)';
}

/* AABPRICING_Facility_RepaymentSchemeSub28_value:undefined */
function Facility_RepaymentSchemeSub28_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_RepaymentSchemeSub28_title:'Tuples Manual Scheme' */
function Facility_RepaymentSchemeSub28_title(f, x, y, z, v) {
    return 'Tuples Manual Scheme';
}

/* AABPRICING_Facility_tpManual_value:undefined */
function Facility_tpManual_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpManual_title:'Manual Scheme' */
function Facility_tpManual_title(f, x, y, z, v) {
    return 'Manual Scheme';
}

/* AABPRICING_Facility_tpManual_tpMonthIdentifier_value:undefined */
function Facility_tpManual_tpMonthIdentifier_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpManual_tpMonthIdentifier_title:'Month Identifier' */
function Facility_tpManual_tpMonthIdentifier_title(f, x, y, z, v) {
    return 'Month Identifier';
}

/* AABPRICING_Facility_tpManual_tpFirstDayMonth_value:undefined */
function Facility_tpManual_tpFirstDayMonth_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpManual_tpFirstDayMonth_title:'Date of Repayment / Withdrawel' */
function Facility_tpManual_tpFirstDayMonth_title(f, x, y, z, v) {
    return 'Date of Repayment / Withdrawel';
}

/* AABPRICING_Facility_tpManual_tpMonthsSinceStartDate_value:If(Facility_tpManual_tpFirstDayMonth==NA,NA,(DateToYear(Facility_tpManual_tpFirstDayMonth)-DateToYear(Facility_tpStartDate))*12+DateToMonth(Facility_tpManual_tpFirstDayMonth)-DateToMonth(Facility_tpStartDate))+If(Facility_tpManual_tpMonthsSinceStartDate==NA,NA,1) */
function Facility_tpManual_tpMonthsSinceStartDate_value(f, x, y, z, v) {
    return (
        Facility_tpManual_tpFirstDayMonth_value(
            '100692',
            x,
            y,
            z,
            v
        ) ==
        NA ? NA : (
                DateToYear(
                    Facility_tpManual_tpFirstDayMonth_value(
                        '100692',
                        x,
                        y,
                        z,
                        v
                    )
                ) -
                DateToYear(
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    )
                )
            ) * 12 +
            DateToMonth(
                Facility_tpManual_tpFirstDayMonth_value(
                    '100692',
                    x,
                    y,
                    z,
                    v
                )
            ) -
            DateToMonth(
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                )
            )
    ) + (
        Facility_tpManual_tpMonthsSinceStartDate_value(
            '100694',
            x,
            y,
            z,
            v
        ) == NA ? NA : 1
    );
}

/* AABPRICING_Facility_tpManual_tpMonthsSinceStartDate_title:'Months Since StartDate' */
function Facility_tpManual_tpMonthsSinceStartDate_title(f, x, y, z, v) {
    return 'Months Since StartDate';
}

/* AABPRICING_Facility_tpManual_tpMonthsSinceCurrentDate_value:If(Facility_tpManual_tpFirstDayMonth==NA,NA,If(DMYtoDate(1,DateToMonth(Facility_tpManual_tpFirstDayMonth),DateToYear(Facility_tpManual_tpFirstDayMonth))<DMYtoDate(1,DateToMonth(Facility_tpCurrentDate),DateToYear(Facility_tpCurrentDate)),NA,(DateToYear(Facility_tpManual_tpFirstDayMonth)-DateToYear(Facility_tpCurrentDate))*12+DateToMonth(Facility_tpManual_tpFirstDayMonth)-DateToMonth(Facility_tpCurrentDate)+1)) */
function Facility_tpManual_tpMonthsSinceCurrentDate_value(f, x, y, z, v) {
    return Facility_tpManual_tpFirstDayMonth_value(
        '100692',
        x,
        y,
        z,
        v
    ) ==
    NA ? NA : DMYtoDate(
        1,
        DateToMonth(
            Facility_tpManual_tpFirstDayMonth_value(
                '100692',
                x,
                y,
                z,
                v
            )
        ),
        DateToYear(
            Facility_tpManual_tpFirstDayMonth_value(
                '100692',
                x,
                y,
                z,
                v
            )
        )
    ) <
    DMYtoDate(
        1,
        DateToMonth(
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            )
        ),
        DateToYear(
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            )
        )
    ) ? NA : (
            DateToYear(
                Facility_tpManual_tpFirstDayMonth_value(
                    '100692',
                    x,
                    y,
                    z,
                    v
                )
            ) -
            DateToYear(
                Facility_tpCurrentDate_value(
                    '100676',
                    x,
                    y,
                    z,
                    v
                )
            )
        ) * 12 +
        DateToMonth(
            Facility_tpManual_tpFirstDayMonth_value(
                '100692',
                x,
                y,
                z,
                v
            )
        ) -
        DateToMonth(
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            )
        ) + 1;
}

/* AABPRICING_Facility_tpManual_tpMonthsSinceCurrentDate_title:'Months Since CurrentDate' */
function Facility_tpManual_tpMonthsSinceCurrentDate_title(f, x, y, z, v) {
    return 'Months Since CurrentDate';
}

/* AABPRICING_Facility_tpManual_tpMonthsSinceCurrentDateHelpVarAvgOutstanding_value:If(Facility_tpManual_tpMonthsSinceCurrentDate>12,0,If(Facility_tpManual_tpMonthsSinceCurrentDate==NA,0,1)) */
function Facility_tpManual_tpMonthsSinceCurrentDateHelpVarAvgOutstanding_value(f, x, y, z, v) {
    return Facility_tpManual_tpMonthsSinceCurrentDate_value(
        '100696',
        x,
        y,
        z,
        v
    ) >
    12 ? 0 : Facility_tpManual_tpMonthsSinceCurrentDate_value(
        '100696',
        x,
        y,
        z,
        v
    ) == NA ? 0 : 1;
}

/* AABPRICING_Facility_tpManual_tpMonthsSinceCurrentDateHelpVarAvgOutstanding_title:'Months Since CurrentDate - Help var exp. avg outstanding' */
function Facility_tpManual_tpMonthsSinceCurrentDateHelpVarAvgOutstanding_title(f, x, y, z, v) {
    return 'Months Since CurrentDate - Help var exp. avg outstanding';
}

/* AABPRICING_Facility_tpManual_tpRepaymentAmount_value:undefined */
function Facility_tpManual_tpRepaymentAmount_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpManual_tpRepaymentAmount_title:'Repayment Amount' */
function Facility_tpManual_tpRepaymentAmount_title(f, x, y, z, v) {
    return 'Repayment Amount';
}

/* AABPRICING_Facility_tpManual_tpRepaymentAmountRem_value:Facility_tpManual_tpRepaymentAmount*Facility_tpManual_tpMonthsSinceCurrentDate */
function Facility_tpManual_tpRepaymentAmountRem_value(f, x, y, z, v) {
    return Facility_tpManual_tpRepaymentAmount_value(
        '100700',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpMonthsSinceCurrentDate_value(
            '100696',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_tpRepaymentAmountRem_title:'Repayment Amount Rem' */
function Facility_tpManual_tpRepaymentAmountRem_title(f, x, y, z, v) {
    return 'Repayment Amount Rem';
}

/* AABPRICING_Facility_tpManual_tpRepaymentWeighted_value:Facility_tpManual_tpMonthsSinceStartDate*Facility_tpManual_tpRepaymentAmount */
function Facility_tpManual_tpRepaymentWeighted_value(f, x, y, z, v) {
    return Facility_tpManual_tpMonthsSinceStartDate_value(
        '100694',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpRepaymentAmount_value(
            '100700',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_tpRepaymentWeighted_title:'Repayment Weighted' */
function Facility_tpManual_tpRepaymentWeighted_title(f, x, y, z, v) {
    return 'Repayment Weighted';
}

/* AABPRICING_Facility_tpManual_tpRepaymentWeightedRem_value:Facility_tpManual_tpMonthsSinceCurrentDate*Facility_tpManual_tpRepaymentAmount */
function Facility_tpManual_tpRepaymentWeightedRem_value(f, x, y, z, v) {
    return Facility_tpManual_tpMonthsSinceCurrentDate_value(
        '100696',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpRepaymentAmount_value(
            '100700',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_tpRepaymentWeightedRem_title:'Repayment Weighted Rem' */
function Facility_tpManual_tpRepaymentWeightedRem_title(f, x, y, z, v) {
    return 'Repayment Weighted Rem';
}

/* AABPRICING_Facility_tpManual_tpWithdrawalAmount_value:If(Facility_tpManual_tpMonthsSinceStartDate==1,Facility_tpPrincipalLimit,Facility_tpManual_tpWithdrawalAmount) */
function Facility_tpManual_tpWithdrawalAmount_value(f, x, y, z, v) {
    return Facility_tpManual_tpMonthsSinceStartDate_value(
        '100694',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    ) : Facility_tpManual_tpWithdrawalAmount_value(
        '100708',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpManual_tpWithdrawalAmount_title:'Withdrawal Amount' */
function Facility_tpManual_tpWithdrawalAmount_title(f, x, y, z, v) {
    return 'Withdrawal Amount';
}

/* AABPRICING_Facility_tpManual_tpRepaymentAmountRemHelpVar_value:If(Facility_tpManual_tpMonthsSinceCurrentDate>0,1,0) */
function Facility_tpManual_tpRepaymentAmountRemHelpVar_value(f, x, y, z, v) {
    return Facility_tpManual_tpMonthsSinceCurrentDate_value(
        '100696',
        x,
        y,
        z,
        v
    ) > 0 ? 1 : 0;
}

/* AABPRICING_Facility_tpManual_tpRepaymentAmountRemHelpVar_title:'Repayment Check for RAT' */
function Facility_tpManual_tpRepaymentAmountRemHelpVar_title(f, x, y, z, v) {
    return 'Repayment Check for RAT';
}

/* AABPRICING_Facility_tpManual_tpRepaymentAmountRemHelpVar1_value:Facility_tpManual_tpRepaymentAmount*Facility_tpManual_tpRepaymentAmountRemHelpVar */
function Facility_tpManual_tpRepaymentAmountRemHelpVar1_value(f, x, y, z, v) {
    return Facility_tpManual_tpRepaymentAmount_value(
        '100700',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpRepaymentAmountRemHelpVar_value(
            '100710',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_tpRepaymentAmountRemHelpVar1_title:'Repayment Check for Within RAT' */
function Facility_tpManual_tpRepaymentAmountRemHelpVar1_title(f, x, y, z, v) {
    return 'Repayment Check for Within RAT';
}

/* AABPRICING_Facility_tpManual_ExpectedAverageOutstandingWithdrawal_value:Facility_tpManual_tpWithdrawalAmount*Facility_tpManual_tpOutstandingBalanceWeightWithdrawal */
function Facility_tpManual_ExpectedAverageOutstandingWithdrawal_value(f, x, y, z, v) {
    return Facility_tpManual_tpWithdrawalAmount_value(
        '100708',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpOutstandingBalanceWeightWithdrawal_value(
            '100722',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_ExpectedAverageOutstandingWithdrawal_title:'Expected Average Outstanding Withdrawal' */
function Facility_tpManual_ExpectedAverageOutstandingWithdrawal_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Withdrawal';
}

/* AABPRICING_Facility_tpManual_ExpectedAverageOutstandingWithdrawalAnnuity_value:If(Facility_tpManual_tpMonthsSinceStartDate<1,Facility_tpManual_tpWithdrawalAmount*Facility_tpManual_tpOutstandingBalanceWeightWithdrawal,Facility_tpManual_tpWithdrawalAmount*Facility_tpManual_tpOutstandingBalanceWeightWithdrawal*If(Facility_tpOriginalTenor-Facility_tpRemainingTenor>=Facility_tpManual_tpMonthsSinceStartDate,1,0)) */
function Facility_tpManual_ExpectedAverageOutstandingWithdrawalAnnuity_value(f, x, y, z, v) {
    return Facility_tpManual_tpMonthsSinceStartDate_value(
        '100694',
        x,
        y,
        z,
        v
    ) <
    1 ? Facility_tpManual_tpWithdrawalAmount_value(
        '100708',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpOutstandingBalanceWeightWithdrawal_value(
            '100722',
            x,
            y,
            z,
            v
        ) : Facility_tpManual_tpWithdrawalAmount_value(
        '100708',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpOutstandingBalanceWeightWithdrawal_value(
            '100722',
            x,
            y,
            z,
            v
        ) * (
            Facility_tpOriginalTenor_value(
                '100611',
                x,
                y,
                z,
                v
            ) -
            Facility_tpRemainingTenor_value(
                '100615',
                x,
                y,
                z,
                v
            ) >=
            Facility_tpManual_tpMonthsSinceStartDate_value(
                '100694',
                x,
                y,
                z,
                v
            ) ? 1 : 0
        );
}

/* AABPRICING_Facility_tpManual_ExpectedAverageOutstandingWithdrawalAnnuity_title:'Expected Average Outstanding Withdrawal Annuity' */
function Facility_tpManual_ExpectedAverageOutstandingWithdrawalAnnuity_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Withdrawal Annuity';
}

/* AABPRICING_Facility_tpManual_ExpectedAverageOutstandingRepayment_value:Facility_tpManual_tpRepaymentAmount*Facility_tpManual_tpOutstandingBalanceWeightRepayment */
function Facility_tpManual_ExpectedAverageOutstandingRepayment_value(f, x, y, z, v) {
    return Facility_tpManual_tpRepaymentAmount_value(
        '100700',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpOutstandingBalanceWeightRepayment_value(
            '100720',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_ExpectedAverageOutstandingRepayment_title:'Expected Average Outstanding Weighted Repayment' */
function Facility_tpManual_ExpectedAverageOutstandingRepayment_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Weighted Repayment';
}

/* AABPRICING_Facility_tpManual_tpOutstandingBalanceWeightRepayment_value:MinMax(12-If(Facility_tpStartdate>Facility_tpCurrentDate,Facility_tpManual_tpMonthsSinceStartDate,Facility_tpManual_tpMonthsSinceCurrentDate),0,12,NA) */
function Facility_tpManual_tpOutstandingBalanceWeightRepayment_value(f, x, y, z, v) {
    return MinMax(
        12 - (
            Facility_tpStartdate >
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            ) ? Facility_tpManual_tpMonthsSinceStartDate_value(
                '100694',
                x,
                y,
                z,
                v
            ) : Facility_tpManual_tpMonthsSinceCurrentDate_value(
                '100696',
                x,
                y,
                z,
                v
            )
        ),
        0,
        12,
        NA
    );
}

/* AABPRICING_Facility_tpManual_tpOutstandingBalanceWeightRepayment_title:'Outstanding Balance - Weight Repayment' */
function Facility_tpManual_tpOutstandingBalanceWeightRepayment_title(f, x, y, z, v) {
    return 'Outstanding Balance - Weight Repayment';
}

/* AABPRICING_Facility_tpManual_tpOutstandingBalanceWeightWithdrawal_value:MinMax(If(Facility_tpCurrentDate>Facility_tpManual_tpFirstDayMonth,12,13-If(Facility_tpStartdate>Facility_tpCurrentDate,Facility_tpManual_tpMonthsSinceStartDate,Facility_tpManual_tpMonthsSinceCurrentDate)),0,12) */
function Facility_tpManual_tpOutstandingBalanceWeightWithdrawal_value(f, x, y, z, v) {
    return MinMax(
        Facility_tpCurrentDate_value(
            '100676',
            x,
            y,
            z,
            v
        ) >
        Facility_tpManual_tpFirstDayMonth_value(
            '100692',
            x,
            y,
            z,
            v
        ) ? 12 : 13 - (
            Facility_tpStartdate >
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            ) ? Facility_tpManual_tpMonthsSinceStartDate_value(
                '100694',
                x,
                y,
                z,
                v
            ) : Facility_tpManual_tpMonthsSinceCurrentDate_value(
                '100696',
                x,
                y,
                z,
                v
            )
        ),
        0,
        12
    );
}

/* AABPRICING_Facility_tpManual_tpOutstandingBalanceWeightWithdrawal_title:'Outstanding Balance - Weight Withdrawal' */
function Facility_tpManual_tpOutstandingBalanceWeightWithdrawal_title(f, x, y, z, v) {
    return 'Outstanding Balance - Weight Withdrawal';
}

/* AABPRICING_Facility_tpManual_tpOutstandingBalanceExpAvgOut_value:Facility_tpEAOWithdrawalScheme-Facility_tpExpectedAverageOutstandingRemHelp */
function Facility_tpManual_tpOutstandingBalanceExpAvgOut_value(f, x, y, z, v) {
    return Facility_tpEAOWithdrawalScheme_value(
        '100756',
        x,
        y,
        z,
        v
        ) -
        Facility_tpExpectedAverageOutstandingRemHelp_value(
            '100760',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_tpOutstandingBalanceExpAvgOut_title:'Outstanding Balance - Exp Avg Out' */
function Facility_tpManual_tpOutstandingBalanceExpAvgOut_title(f, x, y, z, v) {
    return 'Outstanding Balance - Exp Avg Out';
}

/* AABPRICING_Facility_tpManual_tpLiquiditySpreadBpsTRepayment_value:MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpManual_tpMonthsSinceStartDate,1),Facility_tpFixedInterestPeriod)+(MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',Facility_tpManual_tpMonthsSinceStartDate,1),Facility_tpFixedInterestPeriod)-MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpManual_tpMonthsSinceStartDate,1),Facility_tpFixedInterestPeriod))*OnER((Facility_tpManual_tpMonthsSinceStartDate-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpManual_tpMonthsSinceStartDate,1))/(MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',Facility_tpManual_tpMonthsSinceStartDate,1)-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpManual_tpMonthsSinceStartDate,1)),0) */
function Facility_tpManual_tpLiquiditySpreadBpsTRepayment_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        Facility_tpBaseCurrency_value(
            '100506',
            x,
            y,
            z,
            v
        ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
            '100506',
            x,
            y,
            z,
            v
        ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
            '100506',
            x,
            y,
            z,
            v
        ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
        MatrixLookup(
            'AAB_Parameters.xls',
            'LiquidityPremiumTenorLowerBound',
            Facility_tpManual_tpMonthsSinceStartDate_value(
                '100694',
                x,
                y,
                z,
                v
            ),
            1
        ),
        Facility_tpFixedInterestPeriod_value(
            '100513',
            x,
            y,
            z,
            v
        )
        ) + (
            MatrixLookup(
                'AAB_Parameters.xls',
                Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorUpperBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ),
                Facility_tpFixedInterestPeriod_value(
                    '100513',
                    x,
                    y,
                    z,
                    v
                )
            ) -
            MatrixLookup(
                'AAB_Parameters.xls',
                Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorLowerBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ),
                Facility_tpFixedInterestPeriod_value(
                    '100513',
                    x,
                    y,
                    z,
                    v
                )
            )
        ) *
        OnER(
            (
                Facility_tpManual_tpMonthsSinceStartDate_value(
                    '100694',
                    x,
                    y,
                    z,
                    v
                ) -
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorLowerBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                )
            ) / (
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorUpperBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ) -
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorLowerBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                )
            ),
            0
        );
}

/* AABPRICING_Facility_tpManual_tpLiquiditySpreadBpsTRepayment_title:'Liquidity Spread - Liquidity Spread Interpolated Bps' */
function Facility_tpManual_tpLiquiditySpreadBpsTRepayment_title(f, x, y, z, v) {
    return 'Liquidity Spread - Liquidity Spread Interpolated Bps';
}

/* AABPRICING_Facility_tpManual_tpLiquiditySpreadRepayment_value:Facility_tpManual_tpWeightedFundingRepayment*Facility_tpManual_tpLiquiditySpreadBpsTRepayment */
function Facility_tpManual_tpLiquiditySpreadRepayment_value(f, x, y, z, v) {
    return Facility_tpManual_tpWeightedFundingRepayment_value(
        '100730',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpLiquiditySpreadBpsTRepayment_value(
            '100726',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_tpLiquiditySpreadRepayment_title:'Liquidity Spread - Liquidity Spread - Repayment' */
function Facility_tpManual_tpLiquiditySpreadRepayment_title(f, x, y, z, v) {
    return 'Liquidity Spread - Liquidity Spread - Repayment';
}

/* AABPRICING_Facility_tpManual_tpWeightedFundingRepayment_value:Facility_tpManual_tpRepaymentamount*Facility_tpManual_tpMonthsSinceStartDate/12 */
function Facility_tpManual_tpWeightedFundingRepayment_value(f, x, y, z, v) {
    return Facility_tpManual_tpRepaymentamount *
        Facility_tpManual_tpMonthsSinceStartDate_value(
            '100694',
            x,
            y,
            z,
            v
        ) / 12;
}

/* AABPRICING_Facility_tpManual_tpWeightedFundingRepayment_title:'Liquidity Spread - Weighted Funding - Repayment' */
function Facility_tpManual_tpWeightedFundingRepayment_title(f, x, y, z, v) {
    return 'Liquidity Spread - Weighted Funding - Repayment';
}

/* AABPRICING_Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal_value:MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpManual_tpMonthsSinceStartDate-1,1),Facility_tpFixedInterestPeriod)+(MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',Facility_tpManual_tpMonthsSinceStartDate-1,1),Facility_tpFixedInterestPeriod)-MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpManual_tpMonthsSinceStartDate-1,1),Facility_tpFixedInterestPeriod))*OnER((Facility_tpManual_tpMonthsSinceStartDate-1-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpManual_tpMonthsSinceStartDate-1,1))/(MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',Facility_tpManual_tpMonthsSinceStartDate-1,1)-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpManual_tpMonthsSinceStartDate-1,1)),0) */
function Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        Facility_tpBaseCurrency_value(
            '100506',
            x,
            y,
            z,
            v
        ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
            '100506',
            x,
            y,
            z,
            v
        ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
            '100506',
            x,
            y,
            z,
            v
        ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
        MatrixLookup(
            'AAB_Parameters.xls',
            'LiquidityPremiumTenorLowerBound',
            Facility_tpManual_tpMonthsSinceStartDate_value(
                '100694',
                x,
                y,
                z,
                v
            ) - 1,
            1
        ),
        Facility_tpFixedInterestPeriod_value(
            '100513',
            x,
            y,
            z,
            v
        )
        ) + (
            MatrixLookup(
                'AAB_Parameters.xls',
                Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorUpperBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ) - 1,
                    1
                ),
                Facility_tpFixedInterestPeriod_value(
                    '100513',
                    x,
                    y,
                    z,
                    v
                )
            ) -
            MatrixLookup(
                'AAB_Parameters.xls',
                Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorLowerBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ) - 1,
                    1
                ),
                Facility_tpFixedInterestPeriod_value(
                    '100513',
                    x,
                    y,
                    z,
                    v
                )
            )
        ) *
        OnER(
            (
                Facility_tpManual_tpMonthsSinceStartDate_value(
                    '100694',
                    x,
                    y,
                    z,
                    v
                ) - 1 -
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorLowerBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ) - 1,
                    1
                )
            ) / (
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorUpperBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ) - 1,
                    1
                ) -
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorLowerBound',
                    Facility_tpManual_tpMonthsSinceStartDate_value(
                        '100694',
                        x,
                        y,
                        z,
                        v
                    ) - 1,
                    1
                )
            ),
            0
        );
}

/* AABPRICING_Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal_title:'Liquidity Spread - Liquidity Spread Interpolated Bps - Withdrawal' */
function Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal_title(f, x, y, z, v) {
    return 'Liquidity Spread - Liquidity Spread Interpolated Bps - Withdrawal';
}

/* AABPRICING_Facility_tpManual_tpLiquiditySpreadWithdrawal_value:Facility_tpManual_tpWeightedFundingWithdrawal*Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal */
function Facility_tpManual_tpLiquiditySpreadWithdrawal_value(f, x, y, z, v) {
    return Facility_tpManual_tpWeightedFundingWithdrawal_value(
        '100736',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpLiquiditySpreadBpsTWithdrawal_value(
            '100732',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_tpLiquiditySpreadWithdrawal_title:'Liquidity Spread - Liquidity Spread - Withdrawal' */
function Facility_tpManual_tpLiquiditySpreadWithdrawal_title(f, x, y, z, v) {
    return 'Liquidity Spread - Liquidity Spread - Withdrawal';
}

/* AABPRICING_Facility_tpManual_tpWeightedFundingWithdrawal_value:Facility_tpManual_tpWithdrawalAmount*(Facility_tpManual_tpMonthsSinceStartDate-1)/12 */
function Facility_tpManual_tpWeightedFundingWithdrawal_value(f, x, y, z, v) {
    return Facility_tpManual_tpWithdrawalAmount_value(
        '100708',
        x,
        y,
        z,
        v
    ) * (
        Facility_tpManual_tpMonthsSinceStartDate_value(
            '100694',
            x,
            y,
            z,
            v
        ) - 1
    ) / 12;
}

/* AABPRICING_Facility_tpManual_tpWeightedFundingWithdrawal_title:'Liquidity Spread - Weighted Funding - Withdrawal' */
function Facility_tpManual_tpWeightedFundingWithdrawal_title(f, x, y, z, v) {
    return 'Liquidity Spread - Weighted Funding - Withdrawal';
}

/* AABPRICING_Facility_tpManual_LimitWeightedRepayment_value:Facility_tpManual_tpRepaymentAmount*Facility_tpManual_tpLimitWeightRepayment */
function Facility_tpManual_LimitWeightedRepayment_value(f, x, y, z, v) {
    return Facility_tpManual_tpRepaymentAmount_value(
        '100700',
        x,
        y,
        z,
        v
        ) *
        Facility_tpManual_tpLimitWeightRepayment_value(
            '100740',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpManual_LimitWeightedRepayment_title:'Limit - Weighted Repayment' */
function Facility_tpManual_LimitWeightedRepayment_title(f, x, y, z, v) {
    return 'Limit - Weighted Repayment';
}

/* AABPRICING_Facility_tpManual_tpLimitWeightRepayment_value:MinMax(13-If(Facility_tpStartdate>Facility_tpCurrentDate,Facility_tpManual_tpMonthsSinceStartDate,Facility_tpManual_tpMonthsSinceCurrentDate),0,12,NA) */
function Facility_tpManual_tpLimitWeightRepayment_value(f, x, y, z, v) {
    return MinMax(
        13 - (
            Facility_tpStartdate >
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            ) ? Facility_tpManual_tpMonthsSinceStartDate_value(
                '100694',
                x,
                y,
                z,
                v
            ) : Facility_tpManual_tpMonthsSinceCurrentDate_value(
                '100696',
                x,
                y,
                z,
                v
            )
        ),
        0,
        12,
        NA
    );
}

/* AABPRICING_Facility_tpManual_tpLimitWeightRepayment_title:'Limit - Repayment Weight' */
function Facility_tpManual_tpLimitWeightRepayment_title(f, x, y, z, v) {
    return 'Limit - Repayment Weight';
}

/* AABPRICING_Facility_tpSumOfWeightedRepaymentOATNominator_value:TupleSum(Facility_tpManual_tpRepaymentWeighted) */
function Facility_tpSumOfWeightedRepaymentOATNominator_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_tpRepaymentWeighted_value(
            '100704',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpSumOfWeightedRepaymentOATNominator_title:'Sum of Weighted Repayment OAT Nominator' */
function Facility_tpSumOfWeightedRepaymentOATNominator_title(f, x, y, z, v) {
    return 'Sum of Weighted Repayment OAT Nominator';
}

/* AABPRICING_Facility_tpSumOfRepaymentOATDenominator_value:12*TupleSum(Facility_tpManual_tpRepaymentAmount) */
function Facility_tpSumOfRepaymentOATDenominator_value(f, x, y, z, v) {
    return 12 *
        TupleSum(
            Facility_tpManual_tpRepaymentAmount_value(
                '100700',
                x,
                y,
                z,
                v
            )
        );
}

/* AABPRICING_Facility_tpSumOfRepaymentOATDenominator_title:'Sum of Repayment OAT Denominator' */
function Facility_tpSumOfRepaymentOATDenominator_title(f, x, y, z, v) {
    return 'Sum of Repayment OAT Denominator';
}

/* AABPRICING_Facility_tpOriginalAverageTenorScheme_value:Facility_tpSumOfWeightedRepaymentOATNominator/Facility_tpSumOfRepaymentOATDenominator */
function Facility_tpOriginalAverageTenorScheme_value(f, x, y, z, v) {
    return Facility_tpSumOfWeightedRepaymentOATNominator_value(
        '100742',
        x,
        y,
        z,
        v
        ) /
        Facility_tpSumOfRepaymentOATDenominator_value(
            '100744',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpOriginalAverageTenorScheme_title:'Original Average Tenor' */
function Facility_tpOriginalAverageTenorScheme_title(f, x, y, z, v) {
    return 'Original Average Tenor';
}

/* AABPRICING_Facility_tpSumOfRepaymentRAT_value:TupleSum(Facility_tpManual_tpRepaymentAmountRemHelpVar1) */
function Facility_tpSumOfRepaymentRAT_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_tpRepaymentAmountRemHelpVar1_value(
            '100712',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpSumOfRepaymentRAT_title:'Sum of Weighted Repayment RAT TupleSum' */
function Facility_tpSumOfRepaymentRAT_title(f, x, y, z, v) {
    return 'Sum of Weighted Repayment RAT TupleSum';
}

/* AABPRICING_Facility_tpSumOfRepaymentRATWeight_value:Facility_tpSumOfWeightedRepaymentRATNominator/(Facility_tpSumOfRepaymentRAT*Facility_tpExpectedAverageOutstandingCount) */
function Facility_tpSumOfRepaymentRATWeight_value(f, x, y, z, v) {
    return Facility_tpSumOfWeightedRepaymentRATNominator_value(
        '100752',
        x,
        y,
        z,
        v
    ) / (
        Facility_tpSumOfRepaymentRAT_value(
            '100748',
            x,
            y,
            z,
            v
        ) *
        Facility_tpExpectedAverageOutstandingCount_value(
            '100762',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpSumOfRepaymentRATWeight_title:'Sum of Weighted Repayment RAT Weight' */
function Facility_tpSumOfRepaymentRATWeight_title(f, x, y, z, v) {
    return 'Sum of Weighted Repayment RAT Weight';
}

/* AABPRICING_Facility_tpSumOfWeightedRepaymentRATNominator_value:TupleSum(Facility_tpManual_tpRepaymentWeightedRem) */
function Facility_tpSumOfWeightedRepaymentRATNominator_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_tpRepaymentWeightedRem_value(
            '100706',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpSumOfWeightedRepaymentRATNominator_title:'Sum of Weighted Repayment RAT Nominator' */
function Facility_tpSumOfWeightedRepaymentRATNominator_title(f, x, y, z, v) {
    return 'Sum of Weighted Repayment RAT Nominator';
}

/* AABPRICING_Facility_tpRemainingAverageTenorScheme_value:If(Facility_tpSumOfRepaymentRATWeight*Facility_tpExpectedAverageOutstandingCount/12>=Facility_tpOriginalAverageTenorScheme,Facility_tpOriginalAverageTenorScheme,Facility_tpSumOfRepaymentRATWeight*Facility_tpExpectedAverageOutstandingCount/12) */
function Facility_tpRemainingAverageTenorScheme_value(f, x, y, z, v) {
    return Facility_tpSumOfRepaymentRATWeight_value(
        '100750',
        x,
        y,
        z,
        v
    ) *
    Facility_tpExpectedAverageOutstandingCount_value(
        '100762',
        x,
        y,
        z,
        v
    ) / 12 >=
    Facility_tpOriginalAverageTenorScheme_value(
        '100746',
        x,
        y,
        z,
        v
    ) ? Facility_tpOriginalAverageTenorScheme_value(
        '100746',
        x,
        y,
        z,
        v
    ) : Facility_tpSumOfRepaymentRATWeight_value(
        '100750',
        x,
        y,
        z,
        v
        ) *
        Facility_tpExpectedAverageOutstandingCount_value(
            '100762',
            x,
            y,
            z,
            v
        ) / 12;
}

/* AABPRICING_Facility_tpRemainingAverageTenorScheme_title:'Remaining Average Tenor' */
function Facility_tpRemainingAverageTenorScheme_title(f, x, y, z, v) {
    return 'Remaining Average Tenor';
}

/* AABPRICING_Facility_tpEAOWithdrawalScheme_value:If(Facility_tpWithdrawalChoice==0,Facility_tpPrincipalLimit*12,If(Facility_tpWithdrawalChoice==3,TupleSum(Facility_tpManual_ExpectedAverageOutstandingWithdrawal),0)) */
function Facility_tpEAOWithdrawalScheme_value(f, x, y, z, v) {
    return Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) *
        12 : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? TupleSum(
        Facility_tpManual_ExpectedAverageOutstandingWithdrawal_value(
            '100714',
            x,
            y,
            z,
            v
        )
    ) : 0;
}

/* AABPRICING_Facility_tpEAOWithdrawalScheme_title:'Expected Average Outstanding Withdrawal Help' */
function Facility_tpEAOWithdrawalScheme_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Withdrawal Help';
}

/* AABPRICING_Facility_tpExpectedAverageOutstandingWithdrawalAnnuityHelp_value:TupleSum(Facility_tpManual_ExpectedAverageOutstandingWithdrawalAnnuity) */
function Facility_tpExpectedAverageOutstandingWithdrawalAnnuityHelp_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_ExpectedAverageOutstandingWithdrawalAnnuity_value(
            '100716',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpExpectedAverageOutstandingWithdrawalAnnuityHelp_title:'Expected Average Outstanding Withdrawal Annuity Help' */
function Facility_tpExpectedAverageOutstandingWithdrawalAnnuityHelp_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Withdrawal Annuity Help';
}

/* AABPRICING_Facility_tpExpectedAverageOutstandingRemHelp_value:TupleSum(Facility_tpManual_ExpectedAverageOutstandingRepayment) */
function Facility_tpExpectedAverageOutstandingRemHelp_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_ExpectedAverageOutstandingRepayment_value(
            '100718',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpExpectedAverageOutstandingRemHelp_title:'Expected Average Outstanding Rem Help' */
function Facility_tpExpectedAverageOutstandingRemHelp_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Rem Help';
}

/* AABPRICING_Facility_tpExpectedAverageOutstandingCount_value:If(Facility_tpEndDate<Facility_tpCurrentDate,NA,(DateToYear(Facility_tpEndDate)-DateToYear(Facility_tpCurrentDate))*12+DateToMonth(Facility_tpEndDate)-DateToMonth(Facility_tpCurrentDate)) */
function Facility_tpExpectedAverageOutstandingCount_value(f, x, y, z, v) {
    return Facility_tpEndDate_value(
        '100678',
        x,
        y,
        z,
        v
    ) <
    Facility_tpCurrentDate_value(
        '100676',
        x,
        y,
        z,
        v
    ) ? NA : (
            DateToYear(
                Facility_tpEndDate_value(
                    '100678',
                    x,
                    y,
                    z,
                    v
                )
            ) -
            DateToYear(
                Facility_tpCurrentDate_value(
                    '100676',
                    x,
                    y,
                    z,
                    v
                )
            )
        ) * 12 +
        DateToMonth(
            Facility_tpEndDate_value(
                '100678',
                x,
                y,
                z,
                v
            )
        ) -
        DateToMonth(
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            )
        );
}

/* AABPRICING_Facility_tpExpectedAverageOutstandingCount_title:'Expected Average Outstanding Count' */
function Facility_tpExpectedAverageOutstandingCount_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Count';
}

/* AABPRICING_Facility_tpExpectedAverageOutstandingCountMaxEAO_value:MinMax(Facility_tpExpectedAverageOutstandingCount,0,12,NA) */
function Facility_tpExpectedAverageOutstandingCountMaxEAO_value(f, x, y, z, v) {
    return MinMax(
        Facility_tpExpectedAverageOutstandingCount_value(
            '100762',
            x,
            y,
            z,
            v
        ),
        0,
        12,
        NA
    );
}

/* AABPRICING_Facility_tpExpectedAverageOutstandingCountMaxEAO_title:'Expected Average Outstanding Count Max EAO' */
function Facility_tpExpectedAverageOutstandingCountMaxEAO_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Count Max EAO';
}

/* AABPRICING_Facility_tpOutstandingBalanceExpAvgOutDenom_value:MinMax(Facility_tpProductduration-Facility_tpExpectedAverageOutstandingCount,0,12,0) */
function Facility_tpOutstandingBalanceExpAvgOutDenom_value(f, x, y, z, v) {
    return MinMax(
        Facility_tpProductduration_value(
            '100548',
            x,
            y,
            z,
            v
        ) -
        Facility_tpExpectedAverageOutstandingCount_value(
            '100762',
            x,
            y,
            z,
            v
        ),
        0,
        12,
        0
    );
}

/* AABPRICING_Facility_tpOutstandingBalanceExpAvgOutDenom_title:'Expected Average Outstanding Denom' */
function Facility_tpOutstandingBalanceExpAvgOutDenom_title(f, x, y, z, v) {
    return 'Expected Average Outstanding Denom';
}

/* AABPRICING_Facility_tpExpectedAverageOutstandingScheme_value:(Facility_tpEAOWithdrawalScheme-Facility_tpExpectedAverageOutstandingRemHelp)/Facility_tpExpectedAverageOutstandingCountMaxEAO */
function Facility_tpExpectedAverageOutstandingScheme_value(f, x, y, z, v) {
    return (
            Facility_tpEAOWithdrawalScheme_value(
                '100756',
                x,
                y,
                z,
                v
            ) -
            Facility_tpExpectedAverageOutstandingRemHelp_value(
                '100760',
                x,
                y,
                z,
                v
            )
        ) /
        Facility_tpExpectedAverageOutstandingCountMaxEAO_value(
            '100764',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpAnnuityLinear_value:undefined */
function Facility_tpAnnuityLinear_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityLinear_title:'Annuity + Linear' */
function Facility_tpAnnuityLinear_title(f, x, y, z, v) {
    return 'Annuity + Linear';
}

/* AABPRICING_Facility_tpAnnuityParameters_value:undefined */
function Facility_tpAnnuityParameters_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityParameters_title:'Annuity Parameters' */
function Facility_tpAnnuityParameters_title(f, x, y, z, v) {
    return 'Annuity Parameters';
}

/* AABPRICING_Facility_tpAnnuityLinearSub2_value:undefined */
function Facility_tpAnnuityLinearSub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityLinearSub2_title:'Annuity Start Date' */
function Facility_tpAnnuityLinearSub2_title(f, x, y, z, v) {
    return 'Annuity Start Date';
}

/* AABPRICING_Facility_tpAnnuityLinearSub3_value:undefined */
function Facility_tpAnnuityLinearSub3_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityLinearSub3_title:'Annuity Current Date' */
function Facility_tpAnnuityLinearSub3_title(f, x, y, z, v) {
    return 'Annuity Current Date';
}

/* AABPRICING_Facility_tpAnnuityLinearSub4_value:undefined */
function Facility_tpAnnuityLinearSub4_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityLinearSub4_title:'Annuity End Date' */
function Facility_tpAnnuityLinearSub4_title(f, x, y, z, v) {
    return 'Annuity End Date';
}

/* AABPRICING_Facility_tpAnnuityFirstDayMonth_value:Facility_tpCurrentDate */
function Facility_tpAnnuityFirstDayMonth_value(f, x, y, z, v) {
    return Facility_tpCurrentDate_value(
        '100676',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpAnnuityFirstDayMonth_title:'Annuity Date of Repayment / Withdrawel' */
function Facility_tpAnnuityFirstDayMonth_title(f, x, y, z, v) {
    return 'Annuity Date of Repayment / Withdrawel';
}

/* AABPRICING_Facility_tpAnnuityMonthsSinceStartDate_value:OnZero(RoundUp(OnNeg(If(Facility_tpStartDate==NA,NA,(DateToYear(Facility_tpCurrentDate)-DateToYear(Facility_tpStartDate))*12+DateToMonth(Facility_tpCurrentDate)-DateToMonth(Facility_tpStartDate))+If(Facility_tpAnnuityMonthsSinceStartDate==NA,NA,1),0)/Facility_tpAnnuityRepaymentFreqHelpVar,0),1) */
function Facility_tpAnnuityMonthsSinceStartDate_value(f, x, y, z, v) {
    return OnZero(
        RoundUp(
            OnNeg(
                (
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    ) ==
                    NA ? NA : (
                            DateToYear(
                                Facility_tpCurrentDate_value(
                                    '100676',
                                    x,
                                    y,
                                    z,
                                    v
                                )
                            ) -
                            DateToYear(
                                Facility_tpStartDate_value(
                                    '100674',
                                    x,
                                    y,
                                    z,
                                    v
                                )
                            )
                        ) * 12 +
                        DateToMonth(
                            Facility_tpCurrentDate_value(
                                '100676',
                                x,
                                y,
                                z,
                                v
                            )
                        ) -
                        DateToMonth(
                            Facility_tpStartDate_value(
                                '100674',
                                x,
                                y,
                                z,
                                v
                            )
                        )
                ) + (
                    Facility_tpAnnuityMonthsSinceStartDate_value(
                        '100781',
                        x,
                        y,
                        z,
                        v
                    ) == NA ? NA : 1
                ),
                0
            ) /
            Facility_tpAnnuityRepaymentFreqHelpVar_value(
                '100787',
                x,
                y,
                z,
                v
            ),
            0
        ),
        1
    );
}

/* AABPRICING_Facility_tpAnnuityMonthsSinceStartDate_title:'Annuity Months Since Start Date' */
function Facility_tpAnnuityMonthsSinceStartDate_title(f, x, y, z, v) {
    return 'Annuity Months Since Start Date';
}

/* AABPRICING_Facility_tpAnnuityMonthsSinceCurrentDate_value:OnNeg(Facility_tpAnnuityMonthsSinceStartDate-1,0) */
function Facility_tpAnnuityMonthsSinceCurrentDate_value(f, x, y, z, v) {
    return OnNeg(
        Facility_tpAnnuityMonthsSinceStartDate_value(
            '100781',
            x,
            y,
            z,
            v
        ) - 1,
        0
    );
}

/* AABPRICING_Facility_tpAnnuityMonthsSinceCurrentDate_title:'Annuity Months Since Current Date' */
function Facility_tpAnnuityMonthsSinceCurrentDate_title(f, x, y, z, v) {
    return 'Annuity Months Since Current Date';
}

/* AABPRICING_Facility_tpAnnuityMonthsSinceCurrentDateHelpVar_value:If(Facility_tpAnnuityMonthsSinceCurrentDate>12,0,If(Facility_tpAnnuityMonthsSinceCurrentDate==NA,0,1)) */
function Facility_tpAnnuityMonthsSinceCurrentDateHelpVar_value(f, x, y, z, v) {
    return Facility_tpAnnuityMonthsSinceCurrentDate_value(
        '100783',
        x,
        y,
        z,
        v
    ) >
    12 ? 0 : Facility_tpAnnuityMonthsSinceCurrentDate_value(
        '100783',
        x,
        y,
        z,
        v
    ) == NA ? 0 : 1;
}

/* AABPRICING_Facility_tpAnnuityMonthsSinceCurrentDateHelpVar_title:'Annuity Months Since Current Date Help Var' */
function Facility_tpAnnuityMonthsSinceCurrentDateHelpVar_title(f, x, y, z, v) {
    return 'Annuity Months Since Current Date Help Var';
}

/* AABPRICING_Facility_tpAnnuityRepaymentFreqHelpVar_value:Case(Facility_tpRepaymentFrequency,[1,12||2,6||4,3||12,1]) */
function Facility_tpAnnuityRepaymentFreqHelpVar_value(f, x, y, z, v) {
    return __c0s7 =
        Facility_tpRepaymentFrequency_value(
            '100662',
            x,
            y,
            z,
            v
        ) , __c0s7 === 1 ? 12 : __c0s7 === 2 ? 6 : __c0s7 === 4 ? 3 : __c0s7 === 12 ? 1 : NA;
}

/* AABPRICING_Facility_tpAnnuityRepaymentFreqHelpVar_title:'Annuity Months RepaymentFreq Help Var' */
function Facility_tpAnnuityRepaymentFreqHelpVar_title(f, x, y, z, v) {
    return 'Annuity Months RepaymentFreq Help Var';
}

/* AABPRICING_Facility_tpAnnuityLinearSub10_value:undefined */
function Facility_tpAnnuityLinearSub10_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityLinearSub10_title:'Rate' */
function Facility_tpAnnuityLinearSub10_title(f, x, y, z, v) {
    return 'Rate';
}

/* AABPRICING_Facility_tpAnnuityLinearSub11_value:undefined */
function Facility_tpAnnuityLinearSub11_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityLinearSub11_title:'Period' */
function Facility_tpAnnuityLinearSub11_title(f, x, y, z, v) {
    return 'Period';
}

/* AABPRICING_Facility_tpPeriodForRATGrace_value:Facility_tpAnnuityMonthsSinceStartDate-(Facility_tpNumberOfPeriodsNoGrace-Facility_tpNumberOfPeriods) */
function Facility_tpPeriodForRATGrace_value(f, x, y, z, v) {
    return Facility_tpAnnuityMonthsSinceStartDate_value(
        '100781',
        x,
        y,
        z,
        v
    ) - (
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ) -
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpPeriodForRATGrace_title:'Period For RAT Grace' */
function Facility_tpPeriodForRATGrace_title(f, x, y, z, v) {
    return 'Period For RAT Grace';
}

/* AABPRICING_Facility_tpPeriodDifferenceGrace_value:Facility_tpNumberOfPeriodsNoGrace-Facility_tpNumberOfPeriods */
function Facility_tpPeriodDifferenceGrace_value(f, x, y, z, v) {
    return Facility_tpNumberOfPeriodsNoGrace_value(
        '100654',
        x,
        y,
        z,
        v
        ) -
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpPeriodDifferenceGrace_title:'Period For RAT Grace Difference' */
function Facility_tpPeriodDifferenceGrace_title(f, x, y, z, v) {
    return 'Period For RAT Grace Difference';
}

/* AABPRICING_Facility_tpAnnuityLinearSub14_value:undefined */
function Facility_tpAnnuityLinearSub14_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityLinearSub14_title:'N Period' */
function Facility_tpAnnuityLinearSub14_title(f, x, y, z, v) {
    return 'N Period';
}

/* AABPRICING_Facility_tpAnnuityLinearSub15_value:undefined */
function Facility_tpAnnuityLinearSub15_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityLinearSub16_value:undefined */
function Facility_tpAnnuityLinearSub16_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityLinearSub16_title:'Balloon' */
function Facility_tpAnnuityLinearSub16_title(f, x, y, z, v) {
    return 'Balloon';
}

/* AABPRICING_Facility_tpAnnuityRepaymentAmount_value:PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,Facility_tpAnnuityMonthsSinceStartDate,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon) */
function Facility_tpAnnuityRepaymentAmount_value(f, x, y, z, v) {
    return PPMT(
        Facility_tpAnnuityInterestRate_value(
            '100668',
            x,
            y,
            z,
            v
        ) /
        Facility_tpRepaymentFrequency_value(
            '100662',
            x,
            y,
            z,
            v
        ),
        Facility_tpAnnuityMonthsSinceStartDate_value(
            '100781',
            x,
            y,
            z,
            v
        ),
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        ),
        -Facility_tpPrincipalLimit_value(
            '100544',
            x,
            y,
            z,
            v
        ),
        Facility_tpBalloon_value(
            '100670',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpAnnuityRepaymentAmount_title:'Annuity Repayment Amount (PPMT)' */
function Facility_tpAnnuityRepaymentAmount_title(f, x, y, z, v) {
    return 'Annuity Repayment Amount (PPMT)';
}

/* AABPRICING_Facility_tpAnnuityWithdrawalAmount_value:If(Facility_tpAnnuityMonthsSinceStartDate==1,Facility_tpPrincipalLimit,Facility_tpAnnuityWithdrawalAmount) */
function Facility_tpAnnuityWithdrawalAmount_value(f, x, y, z, v) {
    return Facility_tpAnnuityMonthsSinceStartDate_value(
        '100781',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    ) : Facility_tpAnnuityWithdrawalAmount_value(
        '100804',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpAnnuityWithdrawalAmount_title:'Annuity Withdrawal Amount' */
function Facility_tpAnnuityWithdrawalAmount_title(f, x, y, z, v) {
    return 'Annuity Withdrawal Amount';
}

/* AABPRICING_Facility_tpAnnuityPPMTRATTotalPeriods_value:RoundUp(Facility_tpNumberOfPeriodsNoGrace-Facility_tpAnnuityMonthsSinceCurrentDate) */
function Facility_tpAnnuityPPMTRATTotalPeriods_value(f, x, y, z, v) {
    return RoundUp(
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ) -
        Facility_tpAnnuityMonthsSinceCurrentDate_value(
            '100783',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpAnnuityPPMTRATTotalPeriods_title:'Annuity PPMT RAT Total Periods' */
function Facility_tpAnnuityPPMTRATTotalPeriods_title(f, x, y, z, v) {
    return 'Annuity PPMT RAT Total Periods';
}

/* AABPRICING_Facility_tpAnnuityPPMTRATTotalPeriodsMax_value:MinMax(Facility_tpAnnuityPPMTRATTotalPeriods,0,Facility_tpRepaymentFrequency,NA) */
function Facility_tpAnnuityPPMTRATTotalPeriodsMax_value(f, x, y, z, v) {
    return MinMax(
        Facility_tpAnnuityPPMTRATTotalPeriods_value(
            '100806',
            x,
            y,
            z,
            v
        ),
        0,
        Facility_tpRepaymentFrequency_value(
            '100662',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpAnnuityPPMTRATTotalPeriodsMax_title:'Annuity PPMT RAT Total Periods Max' */
function Facility_tpAnnuityPPMTRATTotalPeriodsMax_title(f, x, y, z, v) {
    return 'Annuity PPMT RAT Total Periods Max';
}

/* AABPRICING_Facility_tpAnnuityPPMTRATTotalMonths_value:Facility_tpAnnuityPPMTRATTotalPeriods*Facility_tpAnnuityRepaymentFreqHelpVar */
function Facility_tpAnnuityPPMTRATTotalMonths_value(f, x, y, z, v) {
    return Facility_tpAnnuityPPMTRATTotalPeriods_value(
        '100806',
        x,
        y,
        z,
        v
        ) *
        Facility_tpAnnuityRepaymentFreqHelpVar_value(
            '100787',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpAnnuityPPMTRATTotalMonths_title:'Annuity PPMT RAT Total Monthts' */
function Facility_tpAnnuityPPMTRATTotalMonths_title(f, x, y, z, v) {
    return 'Annuity PPMT RAT Total Monthts';
}

/* AABPRICING_Facility_tpAnnuityPPMTRATMonth_value:RoundUp(If(DMYtoDate(1,DateToMonth(Facility_tpAnnuityFirstDayMonth),DateToYear(Facility_tpAnnuityFirstDayMonth))<DMYtoDate(1,DateToMonth(Facility_tpCurrentDate),DateToYear(Facility_tpCurrentDate)),NA,(DateToYear(Facility_tpAnnuityFirstDayMonth)-DateToYear(Facility_tpCurrentDate))*12+DateToMonth(Facility_tpAnnuityFirstDayMonth)-DateToMonth(Facility_tpCurrentDate)+1)/Facility_tpAnnuityRepaymentFreqHelpVar,0) */
function Facility_tpAnnuityPPMTRATMonth_value(f, x, y, z, v) {
    return RoundUp(
        (
            DMYtoDate(
                1,
                DateToMonth(
                    Facility_tpAnnuityFirstDayMonth_value(
                        '100779',
                        x,
                        y,
                        z,
                        v
                    )
                ),
                DateToYear(
                    Facility_tpAnnuityFirstDayMonth_value(
                        '100779',
                        x,
                        y,
                        z,
                        v
                    )
                )
            ) <
            DMYtoDate(
                1,
                DateToMonth(
                    Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    )
                ),
                DateToYear(
                    Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    )
                )
            ) ? NA : (
                    DateToYear(
                        Facility_tpAnnuityFirstDayMonth_value(
                            '100779',
                            x,
                            y,
                            z,
                            v
                        )
                    ) -
                    DateToYear(
                        Facility_tpCurrentDate_value(
                            '100676',
                            x,
                            y,
                            z,
                            v
                        )
                    )
                ) * 12 +
                DateToMonth(
                    Facility_tpAnnuityFirstDayMonth_value(
                        '100779',
                        x,
                        y,
                        z,
                        v
                    )
                ) -
                DateToMonth(
                    Facility_tpCurrentDate_value(
                        '100676',
                        x,
                        y,
                        z,
                        v
                    )
                ) + 1
        ) /
        Facility_tpAnnuityRepaymentFreqHelpVar_value(
            '100787',
            x,
            y,
            z,
            v
        ),
        0
    );
}

/* AABPRICING_Facility_tpAnnuityPPMTRATMonth_title:'Annuity PPMT RAT Month' */
function Facility_tpAnnuityPPMTRATMonth_title(f, x, y, z, v) {
    return 'Annuity PPMT RAT Month';
}

/* AABPRICING_Facility_tpAnnuityOATHelpVarWeightSumWithGrace_value:SumFor(X,Facility_tpNumberOfPeriodsNoGrace-Facility_tpNumberOfPeriods+1,Facility_tpNumberOfPeriodsNoGrace,1,X*PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,X-(Facility_tpNumberOfPeriodsNoGrace-Facility_tpNumberOfPeriods+1)+1,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon)*Facility_tpAnnuityRepaymentFreqHelpVar) */
function Facility_tpAnnuityOATHelpVarWeightSumWithGrace_value(f, x, y, z, v) {
    return SumFor(
        X,
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ) -
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        ) + 1,
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ),
        1,
        X *
        PPMT(
            Facility_tpAnnuityInterestRate_value(
                '100668',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            X - (
                Facility_tpNumberOfPeriodsNoGrace_value(
                    '100654',
                    x,
                    y,
                    z,
                    v
                ) -
                Facility_tpNumberOfPeriods_value(
                    '100652',
                    x,
                    y,
                    z,
                    v
                ) + 1
            ) + 1,
            Facility_tpNumberOfPeriods_value(
                '100652',
                x,
                y,
                z,
                v
            ),
            -Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ),
            Facility_tpBalloon_value(
                '100670',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpAnnuityRepaymentFreqHelpVar_value(
            '100787',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpAnnuityOATHelpVarWeightSumWithGrace_title:'Annuity OAT per period SUM' */
function Facility_tpAnnuityOATHelpVarWeightSumWithGrace_title(f, x, y, z, v) {
    return 'Annuity OAT per period SUM';
}

/* AABPRICING_Facility_tpAnnuityOATHelpVarWeightSumGrace_value:undefined */
function Facility_tpAnnuityOATHelpVarWeightSumGrace_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAnnuityOATHelpVarWeightSumGrace_title:'Annuity OAT HelpVar Weight Sum No Grace' */
function Facility_tpAnnuityOATHelpVarWeightSumGrace_title(f, x, y, z, v) {
    return 'Annuity OAT HelpVar Weight Sum No Grace';
}

/* AABPRICING_Facility_tpAnnuityOATHelpVar_value:Facility_tpAnnuityOATHelpVarWeightSumWithGrace/(Facility_tpPrincipalLimit*Facility_tpOriginalTenor) */
function Facility_tpAnnuityOATHelpVar_value(f, x, y, z, v) {
    return Facility_tpAnnuityOATHelpVarWeightSumWithGrace_value(
        '100814',
        x,
        y,
        z,
        v
    ) / (
        Facility_tpPrincipalLimit_value(
            '100544',
            x,
            y,
            z,
            v
        ) *
        Facility_tpOriginalTenor_value(
            '100611',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpAnnuityOATHelpVar_title:'Annuity OAT HelpVar Weight Sum With Grace' */
function Facility_tpAnnuityOATHelpVar_title(f, x, y, z, v) {
    return 'Annuity OAT HelpVar Weight Sum With Grace';
}

/* AABPRICING_Facility_tpAnnuityOAT_value:Facility_tpAnnuityOATHelpVar*Facility_tpOriginalTenor/12 */
function Facility_tpAnnuityOAT_value(f, x, y, z, v) {
    return Facility_tpAnnuityOATHelpVar_value(
        '100818',
        x,
        y,
        z,
        v
        ) *
        Facility_tpOriginalTenor_value(
            '100611',
            x,
            y,
            z,
            v
        ) / 12;
}

/* AABPRICING_Facility_tpAnnuityOAT_title:'Annuity OAT HelpVar' */
function Facility_tpAnnuityOAT_title(f, x, y, z, v) {
    return 'Annuity OAT HelpVar';
}

/* AABPRICING_Facility_tpAnnuityRATHelpVarWeightSumWithGrace_value:SumFor(X,1,Facility_tpNumberOfPeriods-(Facility_tpAnnuityMonthsSinceCurrentDate-Facility_tpPeriodDifferenceGrace),1,X*PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,Facility_tpPeriodForRATGrace-1+X,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon)*Facility_tpAnnuityRepaymentFreqHelpVar) */
function Facility_tpAnnuityRATHelpVarWeightSumWithGrace_value(f, x, y, z, v) {
    return SumFor(
        X,
        1,
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        ) - (
            Facility_tpAnnuityMonthsSinceCurrentDate_value(
                '100783',
                x,
                y,
                z,
                v
            ) -
            Facility_tpPeriodDifferenceGrace_value(
                '100795',
                x,
                y,
                z,
                v
            )
        ),
        1,
        X *
        PPMT(
            Facility_tpAnnuityInterestRate_value(
                '100668',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            Facility_tpPeriodForRATGrace_value(
                '100793',
                x,
                y,
                z,
                v
            ) - 1 + X,
            Facility_tpNumberOfPeriods_value(
                '100652',
                x,
                y,
                z,
                v
            ),
            -Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ),
            Facility_tpBalloon_value(
                '100670',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpAnnuityRepaymentFreqHelpVar_value(
            '100787',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpAnnuityRATHelpVarWeightSumWithGrace_title:'Annuity RAT HelpVar Weight Sum No Grace' */
function Facility_tpAnnuityRATHelpVarWeightSumWithGrace_title(f, x, y, z, v) {
    return 'Annuity RAT HelpVar Weight Sum No Grace';
}

/* AABPRICING_Facility_tpAnnuityRATHelpVarSumRepayment_value:SumFor(X,1,Facility_tpNumberOfPeriods-(Facility_tpAnnuityMonthsSinceCurrentDate-Facility_tpPeriodDifferenceGrace),1,PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,Facility_tpPeriodForRATGrace-1+X,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon)) */
function Facility_tpAnnuityRATHelpVarSumRepayment_value(f, x, y, z, v) {
    return SumFor(
        X,
        1,
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        ) - (
            Facility_tpAnnuityMonthsSinceCurrentDate_value(
                '100783',
                x,
                y,
                z,
                v
            ) -
            Facility_tpPeriodDifferenceGrace_value(
                '100795',
                x,
                y,
                z,
                v
            )
        ),
        1,
        PPMT(
            Facility_tpAnnuityInterestRate_value(
                '100668',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            Facility_tpPeriodForRATGrace_value(
                '100793',
                x,
                y,
                z,
                v
            ) - 1 + X,
            Facility_tpNumberOfPeriods_value(
                '100652',
                x,
                y,
                z,
                v
            ),
            -Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ),
            Facility_tpBalloon_value(
                '100670',
                x,
                y,
                z,
                v
            )
        )
    );
}

/* AABPRICING_Facility_tpAnnuityRATHelpVarSumRepayment_title:'Annuity RAT HelpVar Sum Repayment' */
function Facility_tpAnnuityRATHelpVarSumRepayment_title(f, x, y, z, v) {
    return 'Annuity RAT HelpVar Sum Repayment';
}

/* AABPRICING_Facility_tpAnnuityRATHelpVar_value:Facility_tpAnnuityRATHelpVarWeightSumWithGrace/(Facility_tpAnnuityRATHelpVarSumRepayment*Facility_tpAnnuityPPMTRATTotalMonths) */
function Facility_tpAnnuityRATHelpVar_value(f, x, y, z, v) {
    return Facility_tpAnnuityRATHelpVarWeightSumWithGrace_value(
        '100822',
        x,
        y,
        z,
        v
    ) / (
        Facility_tpAnnuityRATHelpVarSumRepayment_value(
            '100824',
            x,
            y,
            z,
            v
        ) *
        Facility_tpAnnuityPPMTRATTotalMonths_value(
            '100810',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpAnnuityRATHelpVar_title:'Annuity RAT HelpVar Weight Sum With Grace' */
function Facility_tpAnnuityRATHelpVar_title(f, x, y, z, v) {
    return 'Annuity RAT HelpVar Weight Sum With Grace';
}

/* AABPRICING_Facility_tpAnnuityRAT_value:Facility_tpAnnuityRATHelpVar*Facility_tpAnnuityPPMTRATTotalMonths/12 */
function Facility_tpAnnuityRAT_value(f, x, y, z, v) {
    return Facility_tpAnnuityRATHelpVar_value(
        '100826',
        x,
        y,
        z,
        v
        ) *
        Facility_tpAnnuityPPMTRATTotalMonths_value(
            '100810',
            x,
            y,
            z,
            v
        ) / 12;
}

/* AABPRICING_Facility_tpAnnuityRAT_title:'Annuity RAT HelpVar' */
function Facility_tpAnnuityRAT_title(f, x, y, z, v) {
    return 'Annuity RAT HelpVar';
}

/* AABPRICING_Facility_tpAnnuityOutstandingPointInTime_value:Facility_tpPrincipalLimit-SumFor(X,0,Facility_tpAnnuityMonthsSinceStartDate-1,1,PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,X,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon)) */
function Facility_tpAnnuityOutstandingPointInTime_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) -
        SumFor(
            X,
            0,
            Facility_tpAnnuityMonthsSinceStartDate_value(
                '100781',
                x,
                y,
                z,
                v
            ) - 1,
            1,
            PPMT(
                Facility_tpAnnuityInterestRate_value(
                    '100668',
                    x,
                    y,
                    z,
                    v
                ) /
                Facility_tpRepaymentFrequency_value(
                    '100662',
                    x,
                    y,
                    z,
                    v
                ),
                X,
                Facility_tpNumberOfPeriods_value(
                    '100652',
                    x,
                    y,
                    z,
                    v
                ),
                -Facility_tpPrincipalLimit_value(
                    '100544',
                    x,
                    y,
                    z,
                    v
                ),
                Facility_tpBalloon_value(
                    '100670',
                    x,
                    y,
                    z,
                    v
                )
            )
        );
}

/* AABPRICING_Facility_tpAnnuityOutstandingPointInTime_title:'Annuity Outstanding Point in Time' */
function Facility_tpAnnuityOutstandingPointInTime_title(f, x, y, z, v) {
    return 'Annuity Outstanding Point in Time';
}

/* AABPRICING_Facility_tpEAORepaymentAnnuity_value:SumFor(X,1,Facility_tpNumberOfPeriods,1,PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,X,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon)*MinMax(Facility_tpAnnuityMonthsSinceStartDate-1+Facility_tpRepaymentFrequency-Facility_tpPeriodDifferenceGrace-X,0,Facility_tpRepaymentFrequency,0)) */
function Facility_tpEAORepaymentAnnuity_value(f, x, y, z, v) {
    return SumFor(
        X,
        1,
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        ),
        1,
        PPMT(
            Facility_tpAnnuityInterestRate_value(
                '100668',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            X,
            Facility_tpNumberOfPeriods_value(
                '100652',
                x,
                y,
                z,
                v
            ),
            -Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ),
            Facility_tpBalloon_value(
                '100670',
                x,
                y,
                z,
                v
            )
        ) *
        MinMax(
            Facility_tpAnnuityMonthsSinceStartDate_value(
                '100781',
                x,
                y,
                z,
                v
            ) - 1 +
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ) -
            Facility_tpPeriodDifferenceGrace_value(
                '100795',
                x,
                y,
                z,
                v
            ) - X,
            0,
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            0
        )
    );
}

/* AABPRICING_Facility_tpEAORepaymentAnnuity_title:'Annuity Outstanding Repayment Sum' */
function Facility_tpEAORepaymentAnnuity_title(f, x, y, z, v) {
    return 'Annuity Outstanding Repayment Sum';
}

/* AABPRICING_Facility_tpAnnuityOutstandingWithdrawalSum_value:Facility_tpPrincipalLimit*Facility_tpRepaymentFrequency */
function Facility_tpAnnuityOutstandingWithdrawalSum_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) *
        Facility_tpRepaymentFrequency_value(
            '100662',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpAnnuityOutstandingWithdrawalSum_title:'Annuity Outstanding Withdrawal Sum' */
function Facility_tpAnnuityOutstandingWithdrawalSum_title(f, x, y, z, v) {
    return 'Annuity Outstanding Withdrawal Sum';
}

/* AABPRICING_Facility_tpLinear_value:Facility_tpPrincipalLimit/Facility_tpNumberOfPeriods */
function Facility_tpLinear_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) /
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpLinear_title:'Linear Repayment' */
function Facility_tpLinear_title(f, x, y, z, v) {
    return 'Linear Repayment';
}

/* AABPRICING_Facility_tpLinearWithdrawal_value:undefined */
function Facility_tpLinearWithdrawal_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpLinearWithdrawal_title:'Linear Withdrawal' */
function Facility_tpLinearWithdrawal_title(f, x, y, z, v) {
    return 'Linear Withdrawal';
}

/* AABPRICING_Facility_tpLinearOATHelpVarWeightSumWithGrace_value:SumFor(X,Facility_tpNumberOfPeriodsNoGrace-Facility_tpNumberOfPeriods+1,Facility_tpNumberOfPeriodsNoGrace,1,X*Facility_tpLinear*Facility_tpAnnuityRepaymentFreqHelpVar) */
function Facility_tpLinearOATHelpVarWeightSumWithGrace_value(f, x, y, z, v) {
    return SumFor(
        X,
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ) -
        Facility_tpNumberOfPeriods_value(
            '100652',
            x,
            y,
            z,
            v
        ) + 1,
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ),
        1,
        X *
        Facility_tpLinear_value(
            '100836',
            x,
            y,
            z,
            v
        ) *
        Facility_tpAnnuityRepaymentFreqHelpVar_value(
            '100787',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpLinearOATHelpVarWeightSumWithGrace_title:'Linear OAT HelpVar Weight Sum No Grace' */
function Facility_tpLinearOATHelpVarWeightSumWithGrace_title(f, x, y, z, v) {
    return 'Linear OAT HelpVar Weight Sum No Grace';
}

/* AABPRICING_Facility_tpLinearOATHelpVarWeightSumGrace_value:Facility_tpLinearOATHelpVarWeightSumWithGrace-Round(Facility_tpGracePeriod/Facility_tpAnnuityRepaymentFreqHelpVar,0)*Facility_tpLinear*Facility_tpAnnuityRepaymentFreqHelpVar */
function Facility_tpLinearOATHelpVarWeightSumGrace_value(f, x, y, z, v) {
    return Facility_tpLinearOATHelpVarWeightSumWithGrace_value(
        '100840',
        x,
        y,
        z,
        v
        ) -
        Round(
            Facility_tpGracePeriod_value(
                '100672',
                x,
                y,
                z,
                v
            ) /
            Facility_tpAnnuityRepaymentFreqHelpVar_value(
                '100787',
                x,
                y,
                z,
                v
            ),
            0
        ) *
        Facility_tpLinear_value(
            '100836',
            x,
            y,
            z,
            v
        ) *
        Facility_tpAnnuityRepaymentFreqHelpVar_value(
            '100787',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpLinearOATHelpVarWeightSumGrace_title:'Linear OAT HelpVar Weight Sum With Grace' */
function Facility_tpLinearOATHelpVarWeightSumGrace_title(f, x, y, z, v) {
    return 'Linear OAT HelpVar Weight Sum With Grace';
}

/* AABPRICING_Facility_tpLinearOATHelpVar_value:Facility_tpLinearOATHelpVarWeightSumWithGrace/(Facility_tpPrincipalLimit*Facility_tpOriginalTenor) */
function Facility_tpLinearOATHelpVar_value(f, x, y, z, v) {
    return Facility_tpLinearOATHelpVarWeightSumWithGrace_value(
        '100840',
        x,
        y,
        z,
        v
    ) / (
        Facility_tpPrincipalLimit_value(
            '100544',
            x,
            y,
            z,
            v
        ) *
        Facility_tpOriginalTenor_value(
            '100611',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpLinearOATHelpVar_title:'Linear OAT HelpVar' */
function Facility_tpLinearOATHelpVar_title(f, x, y, z, v) {
    return 'Linear OAT HelpVar';
}

/* AABPRICING_Facility_tpLinearOAT_value:Facility_tpLinearOATHelpVar*Facility_tpOriginalTenor/12 */
function Facility_tpLinearOAT_value(f, x, y, z, v) {
    return Facility_tpLinearOATHelpVar_value(
        '100844',
        x,
        y,
        z,
        v
        ) *
        Facility_tpOriginalTenor_value(
            '100611',
            x,
            y,
            z,
            v
        ) / 12;
}

/* AABPRICING_Facility_tpLinearOAT_title:'Linear OAT' */
function Facility_tpLinearOAT_title(f, x, y, z, v) {
    return 'Linear OAT';
}

/* AABPRICING_Facility_tpLinearRATHelpVarWeightSumWithGrace_value:SumFor(X,1,Facility_tpAnnuityPPMTRATTotalPeriods,1,X*Facility_tpLinear*Facility_tpAnnuityRepaymentFreqHelpVar) */
function Facility_tpLinearRATHelpVarWeightSumWithGrace_value(f, x, y, z, v) {
    return SumFor(
        X,
        1,
        Facility_tpAnnuityPPMTRATTotalPeriods_value(
            '100806',
            x,
            y,
            z,
            v
        ),
        1,
        X *
        Facility_tpLinear_value(
            '100836',
            x,
            y,
            z,
            v
        ) *
        Facility_tpAnnuityRepaymentFreqHelpVar_value(
            '100787',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpLinearRATHelpVarWeightSumWithGrace_title:'Linear RAT HelpVar Weight Sum No Grace' */
function Facility_tpLinearRATHelpVarWeightSumWithGrace_title(f, x, y, z, v) {
    return 'Linear RAT HelpVar Weight Sum No Grace';
}

/* AABPRICING_Facility_tpLinearRATHelpVarSumRepayment_value:SumFor(X,1,Facility_tpAnnuityPPMTRATTotalPeriods,1,Facility_tpLinear*(X-X+1)) */
function Facility_tpLinearRATHelpVarSumRepayment_value(f, x, y, z, v) {
    return SumFor(
        X,
        1,
        Facility_tpAnnuityPPMTRATTotalPeriods_value(
            '100806',
            x,
            y,
            z,
            v
        ),
        1,
        Facility_tpLinear_value(
            '100836',
            x,
            y,
            z,
            v
        ) * (
            X - X + 1
        )
    );
}

/* AABPRICING_Facility_tpLinearRATHelpVarSumRepayment_title:'Linear RAT HelpVar Sum Repayment' */
function Facility_tpLinearRATHelpVarSumRepayment_title(f, x, y, z, v) {
    return 'Linear RAT HelpVar Sum Repayment';
}

/* AABPRICING_Facility_tpLinearRATHelpVar_value:Facility_tpLinearRATHelpVarWeightSumWithGrace/(Facility_tpLinearRATHelpVarSumRepayment*Facility_tpAnnuityPPMTRATTotalMonths) */
function Facility_tpLinearRATHelpVar_value(f, x, y, z, v) {
    return Facility_tpLinearRATHelpVarWeightSumWithGrace_value(
        '100848',
        x,
        y,
        z,
        v
    ) / (
        Facility_tpLinearRATHelpVarSumRepayment_value(
            '100850',
            x,
            y,
            z,
            v
        ) *
        Facility_tpAnnuityPPMTRATTotalMonths_value(
            '100810',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpLinearRATHelpVar_title:'Linear RAT HelpVar Weight Sum With Grace' */
function Facility_tpLinearRATHelpVar_title(f, x, y, z, v) {
    return 'Linear RAT HelpVar Weight Sum With Grace';
}

/* AABPRICING_Facility_tpLinearRAT_value:Facility_tpLinearRATHelpVar*Facility_tpAnnuityPPMTRATTotalMonths/12 */
function Facility_tpLinearRAT_value(f, x, y, z, v) {
    return Facility_tpLinearRATHelpVar_value(
        '100852',
        x,
        y,
        z,
        v
        ) *
        Facility_tpAnnuityPPMTRATTotalMonths_value(
            '100810',
            x,
            y,
            z,
            v
        ) / 12;
}

/* AABPRICING_Facility_tpLinearRAT_title:'Linear RAT' */
function Facility_tpLinearRAT_title(f, x, y, z, v) {
    return 'Linear RAT';
}

/* AABPRICING_Facility_tpEAORevolving_value:Facility_tpPrincipalLimit*Facility_tpProductWithdrawalDetailsPercentageUsedOfLimit */
function Facility_tpEAORevolving_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) *
        Facility_tpProductWithdrawalDetailsPercentageUsedOfLimit_value(
            '100558',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpEAORevolving_title:'Expected average outstanding Revolving' */
function Facility_tpEAORevolving_title(f, x, y, z, v) {
    return 'Expected average outstanding Revolving';
}

/* AABPRICING_Facility_tpEAOOnceLinear_value:(Facility_tpLinearOutstandingWithdrawalSum-Facility_tpEAORepaymentLinear)/MinMax(Facility_tpAnnuityPPMTRATTotalPeriods,1,Facility_tpRepaymentFrequency,NA) */
function Facility_tpEAOOnceLinear_value(f, x, y, z, v) {
    return (
            Facility_tpLinearOutstandingWithdrawalSum_value(
                '100871',
                x,
                y,
                z,
                v
            ) -
            Facility_tpEAORepaymentLinear_value(
                '100868',
                x,
                y,
                z,
                v
            )
        ) /
        MinMax(
            Facility_tpAnnuityPPMTRATTotalPeriods_value(
                '100806',
                x,
                y,
                z,
                v
            ),
            1,
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            NA
        );
}

/* AABPRICING_Facility_tpEAOOnceLinear_title:'Expected average outstanding for once withdrawal&&linear repayment' */
function Facility_tpEAOOnceLinear_title(f, x, y, z, v) {
    return 'Expected average outstanding for once withdrawal&&linear repayment';
}

/* AABPRICING_Facility_tpEAOSchemeLinear_value:(Facility_tpEAOWithdrawalScheme-Facility_tpEAORepaymentLinearForSchemeWithdrawal)/MinMax(Facility_tpRemainingTenor,1,12,NA) */
function Facility_tpEAOSchemeLinear_value(f, x, y, z, v) {
    return (
            Facility_tpEAOWithdrawalScheme_value(
                '100756',
                x,
                y,
                z,
                v
            ) -
            Facility_tpEAORepaymentLinearForSchemeWithdrawal_value(
                '100870',
                x,
                y,
                z,
                v
            )
        ) /
        MinMax(
            Facility_tpRemainingTenor_value(
                '100615',
                x,
                y,
                z,
                v
            ),
            1,
            12,
            NA
        );
}

/* AABPRICING_Facility_tpEAOSchemeLinear_title:'Expected average outstanding for manual withdrawal&&linear repayment' */
function Facility_tpEAOSchemeLinear_title(f, x, y, z, v) {
    return 'Expected average outstanding for manual withdrawal&&linear repayment';
}

/* AABPRICING_Facility_tpEAOOnceAnnuity_value:(Facility_tpAnnuityOutstandingWithdrawalSum-Facility_tpEAORepaymentAnnuity)/MinMax(Facility_tpNumberOfPeriods-Facility_tpAnnuityMonthsSinceStartDate,1,Facility_tpRepaymentFrequency,NA) */
function Facility_tpEAOOnceAnnuity_value(f, x, y, z, v) {
    return (
            Facility_tpAnnuityOutstandingWithdrawalSum_value(
                '100834',
                x,
                y,
                z,
                v
            ) -
            Facility_tpEAORepaymentAnnuity_value(
                '100832',
                x,
                y,
                z,
                v
            )
        ) /
        MinMax(
            Facility_tpNumberOfPeriods_value(
                '100652',
                x,
                y,
                z,
                v
            ) -
            Facility_tpAnnuityMonthsSinceStartDate_value(
                '100781',
                x,
                y,
                z,
                v
            ),
            1,
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            NA
        );
}

/* AABPRICING_Facility_tpEAOOnceAnnuity_title:'Expected average outstanding for once withdrawal&&annuity repayment' */
function Facility_tpEAOOnceAnnuity_title(f, x, y, z, v) {
    return 'Expected average outstanding for once withdrawal&&annuity repayment';
}

/* AABPRICING_Facility_tpEAOSchemeAnnuity_value:(Facility_tpExpectedAverageOutstandingScheme-Facility_tpEAORepaymentAnnuity)/MinMax(Facility_tpRemainingTenor,1,Facility_tpRepaymentFrequency,NA) */
function Facility_tpEAOSchemeAnnuity_value(f, x, y, z, v) {
    return (
            Facility_tpExpectedAverageOutstandingScheme_value(
                '100768',
                x,
                y,
                z,
                v
            ) -
            Facility_tpEAORepaymentAnnuity_value(
                '100832',
                x,
                y,
                z,
                v
            )
        ) /
        MinMax(
            Facility_tpRemainingTenor_value(
                '100615',
                x,
                y,
                z,
                v
            ),
            1,
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            NA
        );
}

/* AABPRICING_Facility_tpEAOSchemeAnnuity_title:'Expected average outstanding for manual withdrawal&&annuity repayment' */
function Facility_tpEAOSchemeAnnuity_title(f, x, y, z, v) {
    return 'Expected average outstanding for manual withdrawal&&annuity repayment';
}

/* AABPRICING_Facility_tpLinearOutstandingPointInTime_value:Facility_tpPrincipalLimit-SumFor(X,1,Facility_tpAnnuityMonthsSinceStartDate-1,1,Facility_tpLinear*(X+1-X)) */
function Facility_tpLinearOutstandingPointInTime_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) -
        SumFor(
            X,
            1,
            Facility_tpAnnuityMonthsSinceStartDate_value(
                '100781',
                x,
                y,
                z,
                v
            ) - 1,
            1,
            Facility_tpLinear_value(
                '100836',
                x,
                y,
                z,
                v
            ) * (
                X + 1 - X
            )
        );
}

/* AABPRICING_Facility_tpLinearOutstandingPointInTime_title:'Linear Outstanding Point in Time' */
function Facility_tpLinearOutstandingPointInTime_title(f, x, y, z, v) {
    return 'Linear Outstanding Point in Time';
}

/* AABPRICING_Facility_tpEAORepaymentLinear_value:SumFor(X,Facility_tpPeriodDifferenceGrace+1,Facility_tpNumberOfPeriodsNoGrace,1,Facility_tpLinear*Round(MinMax((Facility_tpAnnuityMonthsSinceStartDate-1+Facility_tpRepaymentFrequency-X)*If(Facility_tpWithdrawalChoice==3,Facility_tpAnnuityRepaymentFreqHelpVar,1),0,If(Facility_tpWithdrawalChoice==3,12,Facility_tpRepaymentFrequency),0),0)) */
function Facility_tpEAORepaymentLinear_value(f, x, y, z, v) {
    return SumFor(
        X,
        Facility_tpPeriodDifferenceGrace_value(
            '100795',
            x,
            y,
            z,
            v
        ) + 1,
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ),
        1,
        Facility_tpLinear_value(
            '100836',
            x,
            y,
            z,
            v
        ) *
        Round(
            MinMax(
                (
                    Facility_tpAnnuityMonthsSinceStartDate_value(
                        '100781',
                        x,
                        y,
                        z,
                        v
                    ) - 1 +
                    Facility_tpRepaymentFrequency_value(
                        '100662',
                        x,
                        y,
                        z,
                        v
                    ) - X
                ) * (
                    Facility_tpWithdrawalChoice_value(
                        '100656',
                        x,
                        y,
                        z,
                        v
                    ) ==
                    3 ? Facility_tpAnnuityRepaymentFreqHelpVar_value(
                        '100787',
                        x,
                        y,
                        z,
                        v
                    ) : 1
                ),
                0,
                Facility_tpWithdrawalChoice_value(
                    '100656',
                    x,
                    y,
                    z,
                    v
                ) ==
                3 ? 12 : Facility_tpRepaymentFrequency_value(
                    '100662',
                    x,
                    y,
                    z,
                    v
                ),
                0
            ),
            0
        )
    );
}

/* AABPRICING_Facility_tpEAORepaymentLinear_title:'Linear Outstanding Repayment Sum' */
function Facility_tpEAORepaymentLinear_title(f, x, y, z, v) {
    return 'Linear Outstanding Repayment Sum';
}

/* AABPRICING_Facility_tpEAORepaymentLinearForSchemeWithdrawal_value:SumFor(X,12/Facility_tpRepaymentFrequency+Facility_tpGracePeriod,Facility_tpOriginalTenor,12/Facility_tpRepaymentFrequency,Facility_tpLinear*MinMax(12-(X-(Facility_tpOriginalTenor-Facility_tpRemainingTenor)),0,12)) */
function Facility_tpEAORepaymentLinearForSchemeWithdrawal_value(f, x, y, z, v) {
    return SumFor(
        X,
        12 /
        Facility_tpRepaymentFrequency_value(
            '100662',
            x,
            y,
            z,
            v
        ) +
        Facility_tpGracePeriod_value(
            '100672',
            x,
            y,
            z,
            v
        ),
        Facility_tpOriginalTenor_value(
            '100611',
            x,
            y,
            z,
            v
        ),
        12 /
        Facility_tpRepaymentFrequency_value(
            '100662',
            x,
            y,
            z,
            v
        ),
        Facility_tpLinear_value(
            '100836',
            x,
            y,
            z,
            v
        ) *
        MinMax(
            12 - (
                X - (
                    Facility_tpOriginalTenor_value(
                        '100611',
                        x,
                        y,
                        z,
                        v
                    ) -
                    Facility_tpRemainingTenor_value(
                        '100615',
                        x,
                        y,
                        z,
                        v
                    )
                )
            ),
            0,
            12
        )
    );
}

/* AABPRICING_Facility_tpLinearOutstandingWithdrawalSum_value:Facility_tpPrincipalLimit*Facility_tpRepaymentFrequency */
function Facility_tpLinearOutstandingWithdrawalSum_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) *
        Facility_tpRepaymentFrequency_value(
            '100662',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpLinearOutstandingWithdrawalSum_title:'Linear Outstanding Withdrawal Sum' */
function Facility_tpLinearOutstandingWithdrawalSum_title(f, x, y, z, v) {
    return 'Linear Outstanding Withdrawal Sum';
}

/* AABPRICING_Facility_tpHiddenRepaymentScheme_value:undefined */
function Facility_tpHiddenRepaymentScheme_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpHiddenRepaymentScheme_title:'Hidden variables for repayment scheme' */
function Facility_tpHiddenRepaymentScheme_title(f, x, y, z, v) {
    return 'Hidden variables for repayment scheme';
}

/* AABPRICING_Facility_tpWeightedAmountRepayment_value:undefined */
function Facility_tpWeightedAmountRepayment_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpWeightedAmountRepayment_trend:Facility_tpRepayment*Facility_tpHulpVarWeightOfRepayment */
function Facility_tpWeightedAmountRepayment_trend(f, x, y, z, v) {
    return Facility_tpRepayment_value(
        '100884',
        x,
        y,
        z,
        v
        ) *
        Facility_tpHulpVarWeightOfRepayment_value(
            '100929',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpWeightedAmountRepayment_title:'Weighted Repayment Amount' */
function Facility_tpWeightedAmountRepayment_title(f, x, y, z, v) {
    return 'Weighted Repayment Amount';
}

/* AABPRICING_Facility_tpWeightedAmountRepaymentRem_value:undefined */
function Facility_tpWeightedAmountRepaymentRem_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpWeightedAmountRepaymentRem_trend:Facility_tpRepayment*Facility_tpHulpVarWeightOfRepaymentRemaining */
function Facility_tpWeightedAmountRepaymentRem_trend(f, x, y, z, v) {
    return Facility_tpRepayment_value(
        '100884',
        x,
        y,
        z,
        v
        ) *
        Facility_tpHulpVarWeightOfRepaymentRemaining_value(
            '100932',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpWeightedAmountRepaymentRem_title:'Weighted Repayment Amount Remaining' */
function Facility_tpWeightedAmountRepaymentRem_title(f, x, y, z, v) {
    return 'Weighted Repayment Amount Remaining';
}

/* AABPRICING_Facility_tpWithdrawal_value:undefined */
function Facility_tpWithdrawal_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpWithdrawal_notrend:If(Facility_tpWithdrawalChoice==0,Facility_tpWithdrawalOneTime,If(Facility_tpWithdrawalChoice==1,Facility_tpWithdrawalFixedTerms,If(Facility_tpWithdrawalChoice==2,Facility_tpWithdrawalRevolving,If(Facility_tpWithdrawalChoice==3,Facility_tpWithdrawalsAmount,NA)))) */
function Facility_tpWithdrawal_notrend(f, x, y, z, v) {
    return Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpWithdrawalOneTime_value(
        '100897',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpWithdrawalFixedTerms_value(
        '100900',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpWithdrawalRevolving_value(
        '100902',
        x,
        y,
        z,
        v
    ) : Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? Facility_tpWithdrawalsAmount_value(
        '100905',
        x,
        y,
        z,
        v
    ) : NA;
}

/* AABPRICING_Facility_tpWithdrawal_title:'Withdrawal' */
function Facility_tpWithdrawal_title(f, x, y, z, v) {
    return 'Withdrawal';
}

/* AABPRICING_Facility_tpRepayment_value:undefined */
function Facility_tpRepayment_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRepayment_trend:If(Facility_tpRepaymentChoice==0||Facility_tpRepaymentChoice==4,Facility_tpRepaymentBalloon,If(Facility_tpRepaymentChoice==1,Facility_tpRepaymentLinear+Facility_tpRepaymentBalloon,If(Facility_tpRepaymentChoice==2,Facility_tpRepaymentAnnuity+Facility_tpRepaymentBalloon,If(Facility_tpRepaymentChoice==3,If(T==DateToT(Facility_tpEndDateMax10,1),Facility_tpOutstandingBalance[GetT(T,-1)],Facility_tpRepaymentsAmount[GetT(T,-1)]))))) */
function Facility_tpRepayment_trend(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 || Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    4 ? Facility_tpRepaymentBalloon_value(
        '100913',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpRepaymentLinear_value(
        '100907',
        x,
        y,
        z,
        v
        ) +
        Facility_tpRepaymentBalloon_value(
            '100913',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpRepaymentAnnuity_value(
        '100910',
        x,
        y,
        z,
        v
        ) +
        Facility_tpRepaymentBalloon_value(
            '100913',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 3 ? x ==
    DateToT(
        'x',
        Facility_tpEndDateMax10_value(
            '100679',
            x,
            y,
            z,
            v
        ),
        1
    ) ? Facility_tpOutstandingBalance_value(
        '100887',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentsAmount_value(
        '100918',
        x,
        y,
        z,
        v
    ) : NA;
}

/* AABPRICING_Facility_tpRepayment_title:'Repayment' */
function Facility_tpRepayment_title(f, x, y, z, v) {
    return 'Repayment';
}

/* AABPRICING_Facility_tpOutstandingBalance_value:undefined */
function Facility_tpOutstandingBalance_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpOutstandingBalance_notrend:Facility_tpWithdrawal-Facility_tpRepayment */
function Facility_tpOutstandingBalance_notrend(f, x, y, z, v) {
    return Facility_tpWithdrawal_value(
        '100881',
        x,
        y,
        z,
        v
        ) -
        Facility_tpRepayment_value(
            '100884',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpOutstandingBalance_trend:OnNeg(OnZero(HSum(Facility_tpWithdrawal,DateToT(Facility_tpStartDate,1),T)-HSum(Facility_tpRepayment,DateToT(Facility_tpStartDate,1),T),NA),NA) */
function Facility_tpOutstandingBalance_trend(f, x, y, z, v) {
    return OnNeg(
        OnZero(
            HSum(
                Facility_tpWithdrawal_value(
                    '100881',
                    x,
                    y,
                    z,
                    v
                ),
                DateToT(
                    'x',
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ),
                x
            ) -
            HSum(
                Facility_tpRepayment_value(
                    '100884',
                    x,
                    y,
                    z,
                    v
                ),
                DateToT(
                    'x',
                    Facility_tpStartDate_value(
                        '100674',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ),
                x
            ),
            NA
        ),
        NA
    );
}

/* AABPRICING_Facility_tpOutstandingBalance_title:'Outstanding Balance' */
function Facility_tpOutstandingBalance_title(f, x, y, z, v) {
    return 'Outstanding Balance';
}

/* AABPRICING_Facility_tpOutstandingBalanceHulpVar_value:undefined */
function Facility_tpOutstandingBalanceHulpVar_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpOutstandingBalanceHulpVar_trend:If(Facility_tpRepaymentChoice==0,Facility_tpOutstandingBalance,If(Facility_tpHulpVarFrequency<Facility_tpHulpVarFrequency[GetT(T,1)],Facility_tpOutstandingBalance,Facility_tpOutstandingBalance*NA)) */
function Facility_tpOutstandingBalanceHulpVar_trend(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpOutstandingBalance_value(
        '100887',
        x,
        y,
        z,
        v
    ) : Facility_tpHulpVarFrequency_value(
        '100894',
        x,
        y,
        z,
        v
    ) <
    Facility_tpHulpVarFrequency_value(
        '100894',
        x,
        y,
        z,
        v
    ) ? Facility_tpOutstandingBalance_value(
        '100887',
        x,
        y,
        z,
        v
    ) : Facility_tpOutstandingBalance_value(
        '100887',
        x,
        y,
        z,
        v
    ) * NA;
}

/* AABPRICING_Facility_tpOutstandingBalanceHulpVar_title:'Outstanding Balance Hulp Average calculation' */
function Facility_tpOutstandingBalanceHulpVar_title(f, x, y, z, v) {
    return 'Outstanding Balance Hulp Average calculation';
}

/* AABPRICING_Facility_tpHulpVarFrequency_value:undefined */
function Facility_tpHulpVarFrequency_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpHulpVarFrequency_trend:If(T>DateToT(Facility_tpEndDateMax10,1),NA,If(T==DateToT(Facility_tpEndDateMax10,1),Facility_tpHulpVarFrequency[GetT(T,-1)]+1,Round((T-DateToT(Facility_tpStartDate,1)-Facility_tpGracePeriod)/(TsY/Facility_tpRepaymentFrequency)+.5,0)-1)) */
function Facility_tpHulpVarFrequency_trend(f, x, y, z, v) {
    return x >
    DateToT(
        'x',
        Facility_tpEndDateMax10_value(
            '100679',
            x,
            y,
            z,
            v
        ),
        1
    ) ? NA : x ==
    DateToT(
        'x',
        Facility_tpEndDateMax10_value(
            '100679',
            x,
            y,
            z,
            v
        ),
        1
    ) ? Facility_tpHulpVarFrequency_value(
        '100894',
        x,
        y,
        z,
        v
        ) +
        1 : Round(
        (
            x -
            DateToT(
                'x',
                Facility_tpStartDate_value(
                    '100674',
                    x,
                    y,
                    z,
                    v
                ),
                1
            ) -
            Facility_tpGracePeriod_value(
                '100672',
                x,
                y,
                z,
                v
            )
        ) / (
            x /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            )
        ) + .5,
        0
    ) - 1;
}

/* AABPRICING_Facility_tpHulpVarFrequency_title:'Hulp Var Tenors' */
function Facility_tpHulpVarFrequency_title(f, x, y, z, v) {
    return 'Hulp Var Tenors';
}

/* AABPRICING_Facility_tpWithdrawalOneTime_value:undefined */
function Facility_tpWithdrawalOneTime_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpWithdrawalOneTime_trend:If(DateToT(Facility_tpStartDate,1)==T,Facility_tpPrincipalLimit,NA) */
function Facility_tpWithdrawalOneTime_trend(f, x, y, z, v) {
    return DateToT(
        'x',
        Facility_tpStartDate_value(
            '100674',
            x,
            y,
            z,
            v
        ),
        1
    ) ==
    x ? Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    ) : NA;
}

/* AABPRICING_Facility_tpWithdrawalOneTime_title:'Withdrawal One Time' */
function Facility_tpWithdrawalOneTime_title(f, x, y, z, v) {
    return 'Withdrawal One Time';
}

/* AABPRICING_Facility_tpWithdrawalFixedTerms_value:undefined */
function Facility_tpWithdrawalFixedTerms_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpWithdrawalFixedTerms_title:'Withdrawal Fixed Terms' */
function Facility_tpWithdrawalFixedTerms_title(f, x, y, z, v) {
    return 'Withdrawal Fixed Terms';
}

/* AABPRICING_Facility_tpWithdrawalRevolving_value:undefined */
function Facility_tpWithdrawalRevolving_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpWithdrawalRevolving_notrend:NA */
function Facility_tpWithdrawalRevolving_notrend(f, x, y, z, v) {
    return NA;
}

/* AABPRICING_Facility_tpWithdrawalRevolving_title:'Withdrawal Revolving' */
function Facility_tpWithdrawalRevolving_title(f, x, y, z, v) {
    return 'Withdrawal Revolving';
}

/* AABPRICING_Facility_tpWithdrawalsAmount_value:undefined */
function Facility_tpWithdrawalsAmount_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpWithdrawalsAmount_title:'Withdrawals Scheme' */
function Facility_tpWithdrawalsAmount_title(f, x, y, z, v) {
    return 'Withdrawals Scheme';
}

/* AABPRICING_Facility_tpRepaymentLinear_value:undefined */
function Facility_tpRepaymentLinear_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRepaymentLinear_trend:If(Facility_tpAfterGraceperiod,OnZero(Min((Facility_tpHulpVarRepayment[GetT(T,-1)]!=Facility_tpHulpVarRepayment)*((Facility_tpPrincipalLimit-Facility_tpBalloon)/Facility_tpNumberOfPeriods),Facility_tpOutstandingBalance[GetT(T,-1)]),NA),NA) */
function Facility_tpRepaymentLinear_trend(f, x, y, z, v) {
    return Facility_tpAfterGraceperiod_value(
        '100920',
        x,
        y,
        z,
        v
    ) ? OnZero(
        Math.min(
            (
                Facility_tpHulpVarRepayment_value(
                    '100923',
                    x,
                    y,
                    z,
                    v
                ) !=
                Facility_tpHulpVarRepayment_value(
                    '100923',
                    x,
                    y,
                    z,
                    v
                )
            ) * (
                (
                    Facility_tpPrincipalLimit_value(
                        '100544',
                        x,
                        y,
                        z,
                        v
                    ) -
                    Facility_tpBalloon_value(
                        '100670',
                        x,
                        y,
                        z,
                        v
                    )
                ) /
                Facility_tpNumberOfPeriods_value(
                    '100652',
                    x,
                    y,
                    z,
                    v
                )
            ),
            Facility_tpOutstandingBalance_value(
                '100887',
                x,
                y,
                z,
                v
            )
        ),
        NA
    ) : NA;
}

/* AABPRICING_Facility_tpRepaymentLinear_title:'Repayment Scheme Linear' */
function Facility_tpRepaymentLinear_title(f, x, y, z, v) {
    return 'Repayment Scheme Linear';
}

/* AABPRICING_Facility_tpRepaymentAnnuity_value:undefined */
function Facility_tpRepaymentAnnuity_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRepaymentAnnuity_trend:If(Facility_tpAfterGraceperiod,If(Facility_tpHulpVarRepayment[GetT(T,-1)]!=Facility_tpHulpVarRepayment,(Facility_tpHulpVarRepayment[GetT(T,-1)]!=Facility_tpHulpVarRepayment)*PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,Facility_tpHulpVarRepayment,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon),NA),NA) */
function Facility_tpRepaymentAnnuity_trend(f, x, y, z, v) {
    return Facility_tpAfterGraceperiod_value(
        '100920',
        x,
        y,
        z,
        v
    ) ? Facility_tpHulpVarRepayment_value(
        '100923',
        x,
        y,
        z,
        v
    ) !=
    Facility_tpHulpVarRepayment_value(
        '100923',
        x,
        y,
        z,
        v
    ) ? (
            Facility_tpHulpVarRepayment_value(
                '100923',
                x,
                y,
                z,
                v
            ) !=
            Facility_tpHulpVarRepayment_value(
                '100923',
                x,
                y,
                z,
                v
            )
        ) *
        PPMT(
            Facility_tpAnnuityInterestRate_value(
                '100668',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            Facility_tpHulpVarRepayment_value(
                '100923',
                x,
                y,
                z,
                v
            ),
            Facility_tpNumberOfPeriods_value(
                '100652',
                x,
                y,
                z,
                v
            ),
            -Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ),
            Facility_tpBalloon_value(
                '100670',
                x,
                y,
                z,
                v
            )
        ) : NA : NA;
}

/* AABPRICING_Facility_tpRepaymentAnnuity_title:'Repayment Scheme Annuity' */
function Facility_tpRepaymentAnnuity_title(f, x, y, z, v) {
    return 'Repayment Scheme Annuity';
}

/* AABPRICING_Facility_tpRepaymentBalloon_value:undefined */
function Facility_tpRepaymentBalloon_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRepaymentBalloon_trend:If(T==DateToT(Facility_tpEndDateMax10,1),If(Facility_tpRepaymentChoice==0,Facility_tpOutstandingBalance[GetT(T,-1)],If(Facility_tpRepaymentChoice==1||Facility_tpRepaymentChoice==2,Facility_tpOutstandingBalance[GetT(T,-1)]-If(Facility_tpRepaymentChoice==1,Facility_tpRepaymentLinear,If(Facility_tpRepaymentChoice==2,Facility_tpRepaymentAnnuity,NA)),NA))) */
function Facility_tpRepaymentBalloon_trend(f, x, y, z, v) {
    return x ==
    DateToT(
        'x',
        Facility_tpEndDateMax10_value(
            '100679',
            x,
            y,
            z,
            v
        ),
        1
    ) ? Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpOutstandingBalance_value(
        '100887',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    1 || Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) ==
    2 ? Facility_tpOutstandingBalance_value(
        '100887',
        x,
        y,
        z,
        v
    ) - (
        Facility_tpRepaymentChoice_value(
            '100659',
            x,
            y,
            z,
            v
        ) ==
        1 ? Facility_tpRepaymentLinear_value(
            '100907',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
            '100659',
            x,
            y,
            z,
            v
        ) ==
        2 ? Facility_tpRepaymentAnnuity_value(
            '100910',
            x,
            y,
            z,
            v
        ) : NA
    ) : NA : NA;
}

/* AABPRICING_Facility_tpRepaymentBalloon_title:'Repayment Balloon' */
function Facility_tpRepaymentBalloon_title(f, x, y, z, v) {
    return 'Repayment Balloon';
}

/* AABPRICING_Facility_tpRepaymentRevolving_value:undefined */
function Facility_tpRepaymentRevolving_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRepaymentRevolving_title:'Repayment Revolving' */
function Facility_tpRepaymentRevolving_title(f, x, y, z, v) {
    return 'Repayment Revolving';
}

/* AABPRICING_Facility_tpRepaymentsAmount_value:undefined */
function Facility_tpRepaymentsAmount_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRepaymentsAmount_title:'Repayments Scheme' */
function Facility_tpRepaymentsAmount_title(f, x, y, z, v) {
    return 'Repayments Scheme';
}

/* AABPRICING_Facility_tpAfterGraceperiod_value:undefined */
function Facility_tpAfterGraceperiod_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpAfterGraceperiod_trend:If(T<DateToT(Facility_tpStartDate,1)||T>DateToT(Facility_tpEndDateMax10,1),NA,If(T>=DateToT(AddMonth(Facility_tpStartDate,Facility_tpGracePeriod),1),1,0)) */
function Facility_tpAfterGraceperiod_trend(f, x, y, z, v) {
    return x <
    DateToT(
        'x',
        Facility_tpStartDate_value(
            '100674',
            x,
            y,
            z,
            v
        ),
        1
    ) || x >
    DateToT(
        'x',
        Facility_tpEndDateMax10_value(
            '100679',
            x,
            y,
            z,
            v
        ),
        1
    ) ? NA : x >=
    DateToT(
        'x',
        AddMonth(
            Facility_tpStartDate_value(
                '100674',
                x,
                y,
                z,
                v
            ),
            Facility_tpGracePeriod_value(
                '100672',
                x,
                y,
                z,
                v
            )
        ),
        1
    ) ? 1 : 0;
}

/* AABPRICING_Facility_tpAfterGraceperiod_title:'After Grace period (Y/N)' */
function Facility_tpAfterGraceperiod_title(f, x, y, z, v) {
    return 'After Grace period (Y/N)';
}

/* AABPRICING_Facility_tpHulpVarRepayment_value:undefined */
function Facility_tpHulpVarRepayment_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpHulpVarRepayment_trend:If(T>DateToT(Facility_tpEndDateMax10,1)+1,NA,OnNeg(OnZero(Min(Round((T-DateToT(Facility_tpStartDate,1)-Facility_tpGracePeriod)/(TsY/Facility_tpRepaymentFrequency)+.5,0)-1,Facility_tpOutstandingBalance[GetT(T,-1)]),NA),NA)) */
function Facility_tpHulpVarRepayment_trend(f, x, y, z, v) {
    return x >
    DateToT(
        'x',
        Facility_tpEndDateMax10_value(
            '100679',
            x,
            y,
            z,
            v
        ),
        1
    ) +
    1 ? NA : OnNeg(
        OnZero(
            Math.min(
                Round(
                    (
                        x -
                        DateToT(
                            'x',
                            Facility_tpStartDate_value(
                                '100674',
                                x,
                                y,
                                z,
                                v
                            ),
                            1
                        ) -
                        Facility_tpGracePeriod_value(
                            '100672',
                            x,
                            y,
                            z,
                            v
                        )
                    ) / (
                        x /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        )
                    ) + .5,
                    0
                ) - 1,
                Facility_tpOutstandingBalance_value(
                    '100887',
                    x,
                    y,
                    z,
                    v
                )
            ),
            NA
        ),
        NA
    );
}

/* AABPRICING_Facility_tpHulpVarRepayment_title:'Repayment At A Certain Time' */
function Facility_tpHulpVarRepayment_title(f, x, y, z, v) {
    return 'Repayment At A Certain Time';
}

/* AABPRICING_Facility_tpHulpVarRemainingWeighted_value:undefined */
function Facility_tpHulpVarRemainingWeighted_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpHulpVarRemainingWeighted_trend:If(T>=DateToT(Facility_tpCurrentDate,1)+If(DateToDay(Facility_tpCurrentDate)==1,0,1)&&T>DateToT(Facility_tpStartDate,1)+Facility_tpGracePeriod,OnNeg(OnZero(Min(Round((T-If(DateToT(Facility_tpCurrentDate,1)+If(DateToDay(Facility_tpCurrentDate)==1,0,1)>DateToT(Facility_tpStartDate,1)+Facility_tpGracePeriod,DateToT(Facility_tpCurrentDate,1)+If(DateToDay(Facility_tpCurrentDate)==1,0,1),DateToT(Facility_tpStartDate,1)+Facility_tpGracePeriod+1))/(TsY/Facility_tpRepaymentFrequency)+.5,0),Facility_tpOutstandingBalance[GetT(T,-1)]),NA),NA),NA) */
function Facility_tpHulpVarRemainingWeighted_trend(f, x, y, z, v) {
    return x >=
    DateToT(
        'x',
        Facility_tpCurrentDate_value(
            '100676',
            x,
            y,
            z,
            v
        ),
        1
    ) + (
        DateToDay(
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            )
        ) == 1 ? 0 : 1
    ) && x >
    DateToT(
        'x',
        Facility_tpStartDate_value(
            '100674',
            x,
            y,
            z,
            v
        ),
        1
    ) +
    Facility_tpGracePeriod_value(
        '100672',
        x,
        y,
        z,
        v
    ) ? OnNeg(
        OnZero(
            Math.min(
                Round(
                    (
                        x - (
                            DateToT(
                                'x',
                                Facility_tpCurrentDate_value(
                                    '100676',
                                    x,
                                    y,
                                    z,
                                    v
                                ),
                                1
                            ) + (
                                DateToDay(
                                    Facility_tpCurrentDate_value(
                                        '100676',
                                        x,
                                        y,
                                        z,
                                        v
                                    )
                                ) == 1 ? 0 : 1
                            ) >
                            DateToT(
                                'x',
                                Facility_tpStartDate_value(
                                    '100674',
                                    x,
                                    y,
                                    z,
                                    v
                                ),
                                1
                            ) +
                            Facility_tpGracePeriod_value(
                                '100672',
                                x,
                                y,
                                z,
                                v
                            ) ? DateToT(
                                'x',
                                Facility_tpCurrentDate_value(
                                    '100676',
                                    x,
                                    y,
                                    z,
                                    v
                                ),
                                1
                            ) + (
                                DateToDay(
                                    Facility_tpCurrentDate_value(
                                        '100676',
                                        x,
                                        y,
                                        z,
                                        v
                                    )
                                ) == 1 ? 0 : 1
                            ) : DateToT(
                                'x',
                                Facility_tpStartDate_value(
                                    '100674',
                                    x,
                                    y,
                                    z,
                                    v
                                ),
                                1
                                ) +
                                Facility_tpGracePeriod_value(
                                    '100672',
                                    x,
                                    y,
                                    z,
                                    v
                                ) + 1
                        )
                    ) / (
                        x /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        )
                    ) + .5,
                    0
                ),
                Facility_tpOutstandingBalance_value(
                    '100887',
                    x,
                    y,
                    z,
                    v
                )
            ),
            NA
        ),
        NA
    ) : NA;
}

/* AABPRICING_Facility_tpHulpVarRemainingWeighted_title:'Repayment Term for weighted remaining tenor' */
function Facility_tpHulpVarRemainingWeighted_title(f, x, y, z, v) {
    return 'Repayment Term for weighted remaining tenor';
}

/* AABPRICING_Facility_tpHulpVarWeightOfRepayment_value:undefined */
function Facility_tpHulpVarWeightOfRepayment_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpHulpVarWeightOfRepayment_trend:If(T>DateToT(Facility_tpEndDateMax10,1)||T<DateToT(Facility_tpStartdate,1),NA,T-DateToT(Facility_tpStartDate,1)) */
function Facility_tpHulpVarWeightOfRepayment_trend(f, x, y, z, v) {
    return x >
    DateToT(
        'x',
        Facility_tpEndDateMax10_value(
            '100679',
            x,
            y,
            z,
            v
        ),
        1
    ) || x <
    DateToT(
        'x',
        Facility_tpStartdate,
        1
    ) ? NA : x -
        DateToT(
            'x',
            Facility_tpStartDate_value(
                '100674',
                x,
                y,
                z,
                v
            ),
            1
        );
}

/* AABPRICING_Facility_tpHulpVarWeightOfRepayment_title:'Weight of repayment Original Tenor' */
function Facility_tpHulpVarWeightOfRepayment_title(f, x, y, z, v) {
    return 'Weight of repayment Original Tenor';
}

/* AABPRICING_Facility_tpHulpVarWeightOfRepaymentRemaining_value:undefined */
function Facility_tpHulpVarWeightOfRepaymentRemaining_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpHulpVarWeightOfRepaymentRemaining_trend:If(T>DateToT(Facility_tpEndDateMax10,1)||T<DateToT(If(Facility_tpCurrentDate<=Facility_tpStartDate,Facility_tpStartDate,Facility_tpCurrentDate),1),NA,T-DateToT(If(Facility_tpCurrentDate<=Facility_tpStartDate,Facility_tpStartDate,Facility_tpCurrentDate),1)) */
function Facility_tpHulpVarWeightOfRepaymentRemaining_trend(f, x, y, z, v) {
    return x >
    DateToT(
        'x',
        Facility_tpEndDateMax10_value(
            '100679',
            x,
            y,
            z,
            v
        ),
        1
    ) || x <
    DateToT(
        'x',
        Facility_tpCurrentDate_value(
            '100676',
            x,
            y,
            z,
            v
        ) <=
        Facility_tpStartDate_value(
            '100674',
            x,
            y,
            z,
            v
        ) ? Facility_tpStartDate_value(
            '100674',
            x,
            y,
            z,
            v
        ) : Facility_tpCurrentDate_value(
            '100676',
            x,
            y,
            z,
            v
        ),
        1
    ) ? NA : x -
        DateToT(
            'x',
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            ) <=
            Facility_tpStartDate_value(
                '100674',
                x,
                y,
                z,
                v
            ) ? Facility_tpStartDate_value(
                '100674',
                x,
                y,
                z,
                v
            ) : Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            ),
            1
        );
}

/* AABPRICING_Facility_tpHulpVarWeightOfRepaymentRemaining_title:'Weight of repayment Remaining Tenor' */
function Facility_tpHulpVarWeightOfRepaymentRemaining_title(f, x, y, z, v) {
    return 'Weight of repayment Remaining Tenor';
}

/* AABPRICING_Facility_tpHulpVarRepaymentScheme_value:undefined */
function Facility_tpHulpVarRepaymentScheme_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpHulpVarRepaymentScheme_trend:If(Facility_tpRepaymentChoice==3&&Facility_tpRepayment!=NA,T-DateToT(Facility_tpStartDate,1),NA) */
function Facility_tpHulpVarRepaymentScheme_trend(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpRepayment_value(
        '100884',
        x,
        y,
        z,
        v
    ) != NA ? x -
        DateToT(
            'x',
            Facility_tpStartDate_value(
                '100674',
                x,
                y,
                z,
                v
            ),
            1
        ) : NA;
}

/* AABPRICING_Facility_tpHulpVarRepaymentScheme_title:'Repayment At A Certain Time via Scheme' */
function Facility_tpHulpVarRepaymentScheme_title(f, x, y, z, v) {
    return 'Repayment At A Certain Time via Scheme';
}

/* AABPRICING_Facility_tpHulpVarRepaymentSchemeWeighted_value:undefined */
function Facility_tpHulpVarRepaymentSchemeWeighted_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpHulpVarRepaymentSchemeWeighted_trend:If(Facility_tpRepaymentChoice==3&&Facility_tpRepayment!=NA,If(T>=DateToT(Facility_tpCurrentDate,1)+If(DateToDay(Facility_tpCurrentDate)==1,0,1)&&T>DateToT(Facility_tpStartDate,1)+Facility_tpGracePeriod,T-DateToT(Facility_tpCurrentDate,1),NA),NA) */
function Facility_tpHulpVarRepaymentSchemeWeighted_trend(f, x, y, z, v) {
    return Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpRepayment_value(
        '100884',
        x,
        y,
        z,
        v
    ) != NA ? x >=
    DateToT(
        'x',
        Facility_tpCurrentDate_value(
            '100676',
            x,
            y,
            z,
            v
        ),
        1
    ) + (
        DateToDay(
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            )
        ) == 1 ? 0 : 1
    ) && x >
    DateToT(
        'x',
        Facility_tpStartDate_value(
            '100674',
            x,
            y,
            z,
            v
        ),
        1
    ) +
    Facility_tpGracePeriod_value(
        '100672',
        x,
        y,
        z,
        v
    ) ? x -
        DateToT(
            'x',
            Facility_tpCurrentDate_value(
                '100676',
                x,
                y,
                z,
                v
            ),
            1
        ) : NA : NA;
}

/* AABPRICING_Facility_tpHulpVarRepaymentSchemeWeighted_title:'Repayment Term for weighted remaining tenor via Scheme' */
function Facility_tpHulpVarRepaymentSchemeWeighted_title(f, x, y, z, v) {
    return 'Repayment Term for weighted remaining tenor via Scheme';
}

/* AABPRICING_Facility_tpDirectLiquidityPremiumPerT_value:undefined */
function Facility_tpDirectLiquidityPremiumPerT_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpDirectLiquidityPremiumPerT_title:'Direct Liquidity Premium Per T' */
function Facility_tpDirectLiquidityPremiumPerT_title(f, x, y, z, v) {
    return 'Direct Liquidity Premium Per T';
}

/* AABPRICING_Facility_tpFundingAmountPerT_value:undefined */
function Facility_tpFundingAmountPerT_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpFundingAmountPerT_title:'Funding Amount Per T' */
function Facility_tpFundingAmountPerT_title(f, x, y, z, v) {
    return 'Funding Amount Per T';
}

/* AABPRICING_Facility_tpWeightedFundingAmountPerT_value:undefined */
function Facility_tpWeightedFundingAmountPerT_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpWeightedFundingAmountPerT_title:'Funding Weighted Amount Per T' */
function Facility_tpWeightedFundingAmountPerT_title(f, x, y, z, v) {
    return 'Funding Weighted Amount Per T';
}

/* AABPRICING_Facility_tpPeriodPerT_value:undefined */
function Facility_tpPeriodPerT_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpPeriodPerT_title:'Period of T into years' */
function Facility_tpPeriodPerT_title(f, x, y, z, v) {
    return 'Period of T into years';
}

/* AABPRICING_Facility_tpLiquiditySpreadBpsT_value:undefined */
function Facility_tpLiquiditySpreadBpsT_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpLiquiditySpreadBpsT_title:'Interpolated Bps for Liq. Sprd' */
function Facility_tpLiquiditySpreadBpsT_title(f, x, y, z, v) {
    return 'Interpolated Bps for Liq. Sprd';
}

/* AABPRICING_Facility_tpLiquiditySpread_value:undefined */
function Facility_tpLiquiditySpread_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpLiquiditySpread_title:'Liq. Sprd. Amount Per T' */
function Facility_tpLiquiditySpread_title(f, x, y, z, v) {
    return 'Liq. Sprd. Amount Per T';
}

/* AABPRICING_Facility_tpGuarantor_value:undefined */
function Facility_tpGuarantor_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpGuarantor_title:EvaluateAsString('Third party Guarantees') */
function Facility_tpGuarantor_title(f, x, y, z, v) {
    return String(
        'Third party Guarantees'
    );
}

/* AABPRICING_Facility_tpGuarantorAGICOrSBI_value:0 */
function Facility_tpGuarantorAGICOrSBI_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpGuarantorSBI_value:undefined */
function Facility_tpGuarantorSBI_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpGuarantorSBIName_value:EvaluateAsString(MatrixLookup('AAB_Parameters.xls','SBIMapping',''+Facility_tpGuarantorSBI,1)) */
function Facility_tpGuarantorSBIName_value(f, x, y, z, v) {
    return String(
        MatrixLookup(
            'AAB_Parameters.xls',
            'SBIMapping',
            '' +
            Facility_tpGuarantorSBI_value(
                '100956',
                x,
                y,
                z,
                v
            ),
            1
        )
    );
}

/* AABPRICING_Facility_tpGuarantorAGICChoice_value:undefined */
function Facility_tpGuarantorAGICChoice_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpGuarantorAGIC_value:undefined */
function Facility_tpGuarantorAGIC_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpGuarantorPercentageGuaranteed_value:undefined */
function Facility_tpGuarantorPercentageGuaranteed_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpGuarantorPercentageGuaranteed_title:'Percentage guanranteed' */
function Facility_tpGuarantorPercentageGuaranteed_title(f, x, y, z, v) {
    return 'Percentage guanranteed';
}

/* AABPRICING_Facility_tpGuarantorRatingChoice_value:undefined */
function Facility_tpGuarantorRatingChoice_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpGuarantorRating_value:EvaluateAsString(Case(Facility_tpGuarantorRatingChoice,[200,'0'||210,'1'||220,'2'||221,'2-'||222,'2+'||230,'3'||231,'3-'||232,'3+'||240,'4'||241,'4-'||242,'4+'||250,'5'||251,'5-'||252,'5+'||260,'6'||261,'6+'||270,'7'])) */
function Facility_tpGuarantorRating_value(f, x, y, z, v) {
    return String(
        (
            __c0s8 =
                Facility_tpGuarantorRatingChoice_value(
                    '100962',
                    x,
                    y,
                    z,
                    v
                ) , __c0s8 === 200 ? '0' : __c0s8 === 210 ? '1' : __c0s8 === 220 ? '2' : __c0s8 === 221 ? '2-' : __c0s8 === 222 ? '2+' : __c0s8 === 230 ? '3' : __c0s8 === 231 ? '3-' : __c0s8 === 232 ? '3+' : __c0s8 === 240 ? '4' : __c0s8 === 241 ? '4-' : __c0s8 === 242 ? '4+' : __c0s8 === 250 ? '5' : __c0s8 === 251 ? '5-' : __c0s8 === 252 ? '5+' : __c0s8 === 260 ? '6' : __c0s8 === 261 ? '6+' : __c0s8 === 270 ? '7' : NA
        )
    );
}

/* AABPRICING_Facility_tpGuarantorRating_title:'UCR Rating Guarantor' */
function Facility_tpGuarantorRating_title(f, x, y, z, v) {
    return 'UCR Rating Guarantor';
}

/* AABPRICING_Facility_tpGuarantorPDModelChoice_value:undefined */
function Facility_tpGuarantorPDModelChoice_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpGuarantorPDModel_value:EvaluateAsString(SubStr(Case(Facility_tpGuarantorPDModelChoice,[1,'PAAL - ABN AMRO Lease PD PL'||2,'PAFI - Acquisition Finance (Leveraged) (S+P) PD'||3,'PAIR - Airlines (Asset backed) (S+P) PD'||4,'PBNK - Commercial Banks (S+P) PD'||5,'PCBS - Consumer CRG model'||6,'PCLM - Mainbrand Consumer&&Business PD'||7,'PCRE - Commercial Real Estate PD'||8,'PDCR - DCRM PD'||9,'PDIA - Diamond Score PD'||10,'PFSH - Regulated Investment Funds PD (Highly Leveraged)'||11,'PFSI - Regulated Investment Funds PD'||12,'PFSL - Regulated Investment Funds PD (leveraged)'||13,'PFSP - Pension Funds PD'||14,'PFSU - Regulated Investment Funds PD (Unleveraged)'||15,'PGCG - Global Commodities Group Int PD'||16,'PGSM - Global SME PD'||17,'PHCN - Health Care PD'||18,'PIBK - Investment Banks (S+P) PD'||19,'PINC - Insurance combined (2.1)'||20,'PINL - Insurance Life (2.1)'||21,'PINN - Insurance Non - Life (2.1)'||22,'PLCR - Large Corporates Rating PD'||23,'PMAS - Shipping (Marsoft) PD'||24,'PMBO - MBO/MBI PD'||25,'PNMA - No Model Available (Expert process)'||26,'POGM - Oil + Gas (Gathering + Processing) (S+P) PD'||27,'POGU - Oil + Gas (Exploration + Production) (S+P) PD'||28,'POLE - Operational Leasing (Asset backed) (S+P) PD'||29,'PPBP - Private Score PD Lombard'||30,'PPRI - Private Score PD'||31,'PPUB - Public Sector Entities PD'||32,'PREG - Regulatory Rating'||33,'PRMG - Ex-F Non-Mainbrand Mortgages PD'||34,'PSHP - Shipping (Asset backed) (S+P) PD'||35,'PSOV - Sovereigns PD'||36,'PSUR - Start ups PD'||37,'PUTI - Energy utilities PD'||38,'PBBS - Business CRG model'||39,'PCFP - Cash Flow PD ']),0,4)) */
function Facility_tpGuarantorPDModel_value(f, x, y, z, v) {
    return String(
        SubStr(
            (
                __c0s9 =
                    Facility_tpGuarantorPDModelChoice_value(
                        '100965',
                        x,
                        y,
                        z,
                        v
                    ) , __c0s9 === 1 ? 'PAAL - ABN AMRO Lease PD PL' : __c0s9 === 2 ? 'PAFI - Acquisition Finance (Leveraged) (S+P) PD' : __c0s9 === 3 ? 'PAIR - Airlines (Asset backed) (S+P) PD' : __c0s9 === 4 ? 'PBNK - Commercial Banks (S+P) PD' : __c0s9 === 5 ? 'PCBS - Consumer CRG model' : __c0s9 === 6 ? 'PCLM - Mainbrand Consumer&&Business PD' : __c0s9 === 7 ? 'PCRE - Commercial Real Estate PD' : __c0s9 === 8 ? 'PDCR - DCRM PD' : __c0s9 === 9 ? 'PDIA - Diamond Score PD' : __c0s9 === 10 ? 'PFSH - Regulated Investment Funds PD (Highly Leveraged)' : __c0s9 === 11 ? 'PFSI - Regulated Investment Funds PD' : __c0s9 === 12 ? 'PFSL - Regulated Investment Funds PD (leveraged)' : __c0s9 === 13 ? 'PFSP - Pension Funds PD' : __c0s9 === 14 ? 'PFSU - Regulated Investment Funds PD (Unleveraged)' : __c0s9 === 15 ? 'PGCG - Global Commodities Group Int PD' : __c0s9 === 16 ? 'PGSM - Global SME PD' : __c0s9 === 17 ? 'PHCN - Health Care PD' : __c0s9 === 18 ? 'PIBK - Investment Banks (S+P) PD' : __c0s9 === 19 ? 'PINC - Insurance combined (2.1)' : __c0s9 === 20 ? 'PINL - Insurance Life (2.1)' : __c0s9 === 21 ? 'PINN - Insurance Non - Life (2.1)' : __c0s9 === 22 ? 'PLCR - Large Corporates Rating PD' : __c0s9 === 23 ? 'PMAS - Shipping (Marsoft) PD' : __c0s9 === 24 ? 'PMBO - MBO/MBI PD' : __c0s9 === 25 ? 'PNMA - No Model Available (Expert process)' : __c0s9 === 26 ? 'POGM - Oil + Gas (Gathering + Processing) (S+P) PD' : __c0s9 === 27 ? 'POGU - Oil + Gas (Exploration + Production) (S+P) PD' : __c0s9 === 28 ? 'POLE - Operational Leasing (Asset backed) (S+P) PD' : __c0s9 === 29 ? 'PPBP - Private Score PD Lombard' : __c0s9 === 30 ? 'PPRI - Private Score PD' : __c0s9 === 31 ? 'PPUB - Public Sector Entities PD' : __c0s9 === 32 ? 'PREG - Regulatory Rating' : __c0s9 === 33 ? 'PRMG - Ex-F Non-Mainbrand Mortgages PD' : __c0s9 === 34 ? 'PSHP - Shipping (Asset backed) (S+P) PD' : __c0s9 === 35 ? 'PSOV - Sovereigns PD' : __c0s9 === 36 ? 'PSUR - Start ups PD' : __c0s9 === 37 ? 'PUTI - Energy utilities PD' : __c0s9 === 38 ? 'PBBS - Business CRG model' : __c0s9 === 39 ? 'PCFP - Cash Flow PD ' : NA
            ),
            0,
            4
        )
    );
}

/* AABPRICING_Facility_tpGuarantorPDModel_title:'PD Model Tekst' */
function Facility_tpGuarantorPDModel_title(f, x, y, z, v) {
    return 'PD Model Tekst';
}

/* AABPRICING_Facility_tpGuarantorPD_value:MatrixLookup('AAB_Parameters.xls','PD',Facility_tpGuarantorRating,1)*Facility_tpPDMultiplierUnder1Year */
function Facility_tpGuarantorPD_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'PD',
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ),
        1
        ) *
        Facility_tpPDMultiplierUnder1Year_value(
            '100598',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpGuarantorPDMoC_value:Facility_tpGuarantorPD*Facility_tpGuarantorMoCFactor */
function Facility_tpGuarantorPDMoC_value(f, x, y, z, v) {
    return Facility_tpGuarantorPD_value(
        '100968',
        x,
        y,
        z,
        v
        ) *
        Facility_tpGuarantorMoCFactor_value(
            '100970',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpGuarantorMoCFactor_value:MatrixLookup('AAB_Parameters.xls','MOCFactorPD',Facility_tpGuarantorPDModel,1) */
function Facility_tpGuarantorMoCFactor_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'MOCFactorPD',
        Facility_tpGuarantorPDModel_value(
            '100966',
            x,
            y,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_FacilitySub7_value:undefined */
function FacilitySub7_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7_title:'Profit&&Losses - Facility' */
function FacilitySub7_title(f, x, y, z, v) {
    return 'Profit&&Losses - Facility';
}

/* AABPRICING_FacilitySub7Sub1_value:undefined */
function FacilitySub7Sub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub1_title:'Risk Adjusted Return - Income' */
function FacilitySub7Sub1_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Income';
}

/* AABPRICING_FacilitySub7Sub1Sub1_value:undefined */
function FacilitySub7Sub1Sub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub1Sub1_title:'Risk Adjusted Return - Income - Interest Income' */
function FacilitySub7Sub1Sub1_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Income - Interest Income';
}

/* AABPRICING_FacilitySub7Sub1Sub2_value:undefined */
function FacilitySub7Sub1Sub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub1Sub2_title:'Risk Adjusted Return - Income - Credit Related Fee' */
function FacilitySub7Sub1Sub2_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Income - Credit Related Fee';
}

/* AABPRICING_FacilitySub7Sub1Sub3_value:undefined */
function FacilitySub7Sub1Sub3_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub2_value:undefined */
function FacilitySub7Sub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub2_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs' */
function FacilitySub7Sub2_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs';
}

/* AABPRICING_FacilitySub7Sub3_value:undefined */
function FacilitySub7Sub3_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub3_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Direct Liquidity Premium' */
function FacilitySub7Sub3_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Direct Liquidity Premium';
}

/* AABPRICING_FacilitySub7Sub4_value:undefined */
function FacilitySub7Sub4_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub4_title:'Risk Adjusted Return - Interest Expenses - Subordinated Debt Capital Charge' */
function FacilitySub7Sub4_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Subordinated Debt Capital Charge';
}

/* AABPRICING_FacilitySub7Sub5_value:undefined */
function FacilitySub7Sub5_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub5_title:'Risk Adjusted Return - Interest Expenses - Equity Funding Adjustment' */
function FacilitySub7Sub5_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Equity Funding Adjustment';
}

/* AABPRICING_FacilitySub7Sub6_value:undefined */
function FacilitySub7Sub6_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub6_title:'Risk Adjusted Return - Other Expenses - Operational Costs' */
function FacilitySub7Sub6_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Operational Costs';
}

/* AABPRICING_FacilitySub7Sub7_value:undefined */
function FacilitySub7Sub7_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub7_title:'Risk Adjusted Return - Other Expenses - Internal Expected Loss' */
function FacilitySub7Sub7_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Internal Expected Loss';
}

/* AABPRICING_FacilitySub7Sub8_value:undefined */
function FacilitySub7Sub8_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub8_title:'Risk Adjusted Return - Other Expenses - Tax' */
function FacilitySub7Sub8_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Tax';
}

/* AABPRICING_FacilitySub7Sub9_value:undefined */
function FacilitySub7Sub9_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub10_value:undefined */
function FacilitySub7Sub10_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub10Sub1_value:undefined */
function FacilitySub7Sub10Sub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub10Sub2_value:undefined */
function FacilitySub7Sub10Sub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub11_value:undefined */
function FacilitySub7Sub11_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub11Sub1_value:undefined */
function FacilitySub7Sub11Sub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub11Sub2_value:undefined */
function FacilitySub7Sub11Sub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub11Sub3_value:undefined */
function FacilitySub7Sub11Sub3_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub12_value:undefined */
function FacilitySub7Sub12_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub12Sub1_value:undefined */
function FacilitySub7Sub12Sub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub12Sub2_value:undefined */
function FacilitySub7Sub12Sub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub12Sub2_title:'Regulatory Profit - Equity Capital Charge' */
function FacilitySub7Sub12Sub2_title(f, x, y, z, v) {
    return 'Regulatory Profit - Equity Capital Charge';
}

/* AABPRICING_FacilitySub7Sub12Sub3_value:undefined */
function FacilitySub7Sub12Sub3_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub13_value:undefined */
function FacilitySub7Sub13_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub13Sub1_value:undefined */
function FacilitySub7Sub13Sub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub13Sub2_value:undefined */
function FacilitySub7Sub13Sub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub13Sub2Sub1_value:undefined */
function FacilitySub7Sub13Sub2Sub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub13Sub2Sub2_value:undefined */
function FacilitySub7Sub13Sub2Sub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub14_value:undefined */
function FacilitySub7Sub14_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub14Sub1_value:undefined */
function FacilitySub7Sub14Sub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub14Sub2_value:undefined */
function FacilitySub7Sub14Sub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub14Sub3_value:undefined */
function FacilitySub7Sub14Sub3_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub14Sub4_value:undefined */
function FacilitySub7Sub14Sub4_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_FacilitySub7Sub14Sub4_title:'Risk Weighted Assets' */
function FacilitySub7Sub14Sub4_title(f, x, y, z, v) {
    return 'Risk Weighted Assets';
}

/* AABPRICING_FacilitySub7Sub14Sub5_value:undefined */
function FacilitySub7Sub14Sub5_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpTargetRaRoRaCSection_value:undefined */
function Facility_tpTargetRaRoRaCSection_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRequiredInterestMarginBps_value:If(TargetRaRoRaCDriven,GoalSeek(Facility_tpRaRoRaC,Facility_tpTargetRaRoRac,Facility_tpCustomerSpread,Facility_tpStartValue,Facility_tpEndValue,Facility_tpSmallestDelta,Facility_tpMaxRuntimeMs),NA) */
function Facility_tpRequiredInterestMarginBps_value(f, x, y, z, v) {
    return TargetRaRoRaCDriven_value(
        '100096',
        x,
        y.base,
        z,
        v
    ) ? GoalSeek(
        Facility_tpRaRoRaC_value(
            '100490',
            x,
            y,
            z,
            v
        ),
        Facility_tpTargetRaRoRac,
        Facility_tpCustomerSpread_value(
            '101195',
            x,
            y,
            z,
            v
        ),
        Facility_tpStartValue_value(
            '101026',
            x,
            y,
            z,
            v
        ),
        Facility_tpEndValue_value(
            '101028',
            x,
            y,
            z,
            v
        ),
        Facility_tpSmallestDelta_value(
            '101030',
            x,
            y,
            z,
            v
        ),
        Facility_tpMaxRuntimeMs_value(
            '101032',
            x,
            y,
            z,
            v
        )
    ) : NA;
}

/* AABPRICING_Facility_tpRequiredInterestMarginBps_title:'Goalseek RaRoRaC Outcome' */
function Facility_tpRequiredInterestMarginBps_title(f, x, y, z, v) {
    return 'Goalseek RaRoRaC Outcome';
}

/* AABPRICING_Facility_tpTargetVariable_value:undefined */
function Facility_tpTargetVariable_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpTargetVariable_title:'TargetVariable - Facility_tpRaRoRaC' */
function Facility_tpTargetVariable_title(f, x, y, z, v) {
    return 'TargetVariable - Facility_tpRaRoRaC';
}

/* AABPRICING_Facility_tpTargetValue_value:undefined */
function Facility_tpTargetValue_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpTargetValue_title:'TargetValue - Facility Target RaRoRaC' */
function Facility_tpTargetValue_title(f, x, y, z, v) {
    return 'TargetValue - Facility Target RaRoRaC';
}

/* AABPRICING_Facility_tpStartValue_value:0 */
function Facility_tpStartValue_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpStartValue_title:'RangeStartValue' */
function Facility_tpStartValue_title(f, x, y, z, v) {
    return 'RangeStartValue';
}

/* AABPRICING_Facility_tpEndValue_value:5e3 */
function Facility_tpEndValue_value(f, x, y, z, v) {
    return 5e3;
}

/* AABPRICING_Facility_tpEndValue_title:'RangeEndValue' */
function Facility_tpEndValue_title(f, x, y, z, v) {
    return 'RangeEndValue';
}

/* AABPRICING_Facility_tpSmallestDelta_value:1 */
function Facility_tpSmallestDelta_value(f, x, y, z, v) {
    return 1;
}

/* AABPRICING_Facility_tpSmallestDelta_title:'SmallestDelta' */
function Facility_tpSmallestDelta_title(f, x, y, z, v) {
    return 'SmallestDelta';
}

/* AABPRICING_Facility_tpMaxRuntimeMs_value:6e3 */
function Facility_tpMaxRuntimeMs_value(f, x, y, z, v) {
    return 6e3;
}

/* AABPRICING_Facility_tpMaxRuntimeMs_title:'MaxRuntimeMs' */
function Facility_tpMaxRuntimeMs_title(f, x, y, z, v) {
    return 'MaxRuntimeMs';
}

/* AABPRICING_Facility_tpEconomicCapital_value:Facility_tpOperationalRisk+Facility_tpCreditRisk+Facility_tpBusinessRisk */
function Facility_tpEconomicCapital_value(f, x, y, z, v) {
    return Facility_tpOperationalRisk_value(
        '101035',
        x,
        y,
        z,
        v
        ) +
        Facility_tpCreditRisk_value(
            '101045',
            x,
            y,
            z,
            v
        ) +
        Facility_tpBusinessRisk_value(
            '101040',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpOperationalRisk_value:Facility_tpORCreditRisk */
function Facility_tpOperationalRisk_value(f, x, y, z, v) {
    return Facility_tpORCreditRisk_value(
        '101036',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpORCreditRisk_value:Borrower_tpARCAddOn*AgreementDiversificationOR*(Facility_tpOREC/1e4)*(Facility_tpCreditIncome-Facility_tpDirectLiquidityPremium) */
function Facility_tpORCreditRisk_value(f, x, y, z, v) {
    return Borrower_tpARCAddOn_value(
        '100248',
        x,
        y.base,
        z,
        v
        ) *
        AgreementDiversificationOR_value(
            '100102',
            x,
            y.base,
            z,
            v
        ) * (
            Facility_tpOREC_value(
                '101038',
                x,
                y,
                z,
                v
            ) / 1e4
        ) * (
            Facility_tpCreditIncome_value(
                '101160',
                x,
                y,
                z,
                v
            ) -
            Facility_tpDirectLiquidityPremium_value(
                '101248',
                x,
                y,
                z,
                v
            )
        );
}

/* AABPRICING_Facility_tpORCreditRisk_title:'Economic Capital - Operational Risk - Credit Risk' */
function Facility_tpORCreditRisk_title(f, x, y, z, v) {
    return 'Economic Capital - Operational Risk - Credit Risk';
}

/* AABPRICING_Facility_tpOREC_value:MatrixLookup('AAB_Parameters.xls','ClientGroup',Borrower_tpClientGroup,3) */
function Facility_tpOREC_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ClientGroup',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Facility_tpOREC_title:'Economic Capital - Operational Risk - || EC' */
function Facility_tpOREC_title(f, x, y, z, v) {
    return 'Economic Capital - Operational Risk - || EC';
}

/* AABPRICING_Facility_tpBusinessRisk_value:Facility_tpBRCreditRisk */
function Facility_tpBusinessRisk_value(f, x, y, z, v) {
    return Facility_tpBRCreditRisk_value(
        '101041',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpBRCreditRisk_value:Borrower_tpARCAddOn*AgreementDiversificationBR*(Facility_tpBREC/1e4)*(Facility_tpCreditIncome-Facility_tpDirectLiquidityPremium) */
function Facility_tpBRCreditRisk_value(f, x, y, z, v) {
    return Borrower_tpARCAddOn_value(
        '100248',
        x,
        y.base,
        z,
        v
        ) *
        AgreementDiversificationBR_value(
            '100104',
            x,
            y.base,
            z,
            v
        ) * (
            Facility_tpBREC_value(
                '101043',
                x,
                y,
                z,
                v
            ) / 1e4
        ) * (
            Facility_tpCreditIncome_value(
                '101160',
                x,
                y,
                z,
                v
            ) -
            Facility_tpDirectLiquidityPremium_value(
                '101248',
                x,
                y,
                z,
                v
            )
        );
}

/* AABPRICING_Facility_tpBRCreditRisk_title:'Economic Capital - Business Risk - Credit Risk' */
function Facility_tpBRCreditRisk_title(f, x, y, z, v) {
    return 'Economic Capital - Business Risk - Credit Risk';
}

/* AABPRICING_Facility_tpBREC_value:MatrixLookup('AAB_Parameters.xls','ClientGroup',Borrower_tpClientGroup,9) */
function Facility_tpBREC_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ClientGroup',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        9
    );
}

/* AABPRICING_Facility_tpBREC_title:'Economic Capital - Business Risk - BR EC' */
function Facility_tpBREC_title(f, x, y, z, v) {
    return 'Economic Capital - Business Risk - BR EC';
}

/* AABPRICING_Facility_tpCreditRisk_value:Facility_tpCreditRiskUnguaranteed+Facility_tpCreditRiskGuaranteed */
function Facility_tpCreditRisk_value(f, x, y, z, v) {
    return Facility_tpCreditRiskUnguaranteed_value(
        '101046',
        x,
        y,
        z,
        v
        ) +
        Facility_tpCreditRiskGuaranteed_value(
            '101048',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpCreditRiskUnguaranteed_value:OnER(Min(Facility_tpEADUnguaranteed,(Borrower_tpARCAddOn*Facility_tpEADUnguaranteed*Facility_tpLGDMoC*Facility_tpBorrower_tpRiskWeight*Borrower_tpCalibrationFactor*Facility_tpECMultiplier-Facility_tpIELMoCUnguaranteed)*AgreementDiversificationCR),NA) */
function Facility_tpCreditRiskUnguaranteed_value(f, x, y, z, v) {
    return OnER(
        Math.min(
            Facility_tpEADUnguaranteed_value(
                '101071',
                x,
                y,
                z,
                v
            ),
            (
                Borrower_tpARCAddOn_value(
                    '100248',
                    x,
                    y.base,
                    z,
                    v
                ) *
                Facility_tpEADUnguaranteed_value(
                    '101071',
                    x,
                    y,
                    z,
                    v
                ) *
                Facility_tpLGDMoC_value(
                    '100572',
                    x,
                    y,
                    z,
                    v
                ) *
                Facility_tpBorrower_tpRiskWeight_value(
                    '100604',
                    x,
                    y,
                    z,
                    v
                ) *
                Borrower_tpCalibrationFactor_value(
                    '100258',
                    x,
                    y.base,
                    z,
                    v
                ) *
                Facility_tpECMultiplier_value(
                    '101099',
                    x,
                    y,
                    z,
                    v
                ) -
                Facility_tpIELMoCUnguaranteed_value(
                    '101117',
                    x,
                    y,
                    z,
                    v
                )
            ) *
            AgreementDiversificationCR_value(
                '100106',
                x,
                y.base,
                z,
                v
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpCreditRiskUnguaranteed_title:'Economic Capital - Credit Risk Unguaranteed' */
function Facility_tpCreditRiskUnguaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk Unguaranteed';
}

/* AABPRICING_Facility_tpCreditRiskGuaranteed_value:OnER(Min(Facility_tpEADGuaranteed,(Borrower_tpARCAddOn*Facility_tpEADGuaranteed*Facility_tpLGDMoC*Facility_tpRiskWeightGuarantor*Facility_tpCalibrationFactorGuarantor*Facility_tpECMultiplierGuarantor-Facility_tpIELMoCGuaranteed)*AgreementDiversificationCR),NA) */
function Facility_tpCreditRiskGuaranteed_value(f, x, y, z, v) {
    return OnER(
        Math.min(
            Facility_tpEADGuaranteed_value(
                '101077',
                x,
                y,
                z,
                v
            ),
            (
                Borrower_tpARCAddOn_value(
                    '100248',
                    x,
                    y.base,
                    z,
                    v
                ) *
                Facility_tpEADGuaranteed_value(
                    '101077',
                    x,
                    y,
                    z,
                    v
                ) *
                Facility_tpLGDMoC_value(
                    '100572',
                    x,
                    y,
                    z,
                    v
                ) *
                Facility_tpRiskWeightGuarantor_value(
                    '101050',
                    x,
                    y,
                    z,
                    v
                ) *
                Facility_tpCalibrationFactorGuarantor_value(
                    '101054',
                    x,
                    y,
                    z,
                    v
                ) *
                Facility_tpECMultiplierGuarantor_value(
                    '101101',
                    x,
                    y,
                    z,
                    v
                ) -
                Facility_tpIELMoCGuaranteed_value(
                    '101131',
                    x,
                    y,
                    z,
                    v
                )
            ) *
            AgreementDiversificationCR_value(
                '100106',
                x,
                y.base,
                z,
                v
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpCreditRiskGuaranteed_title:'Economic Capital - Credit Risk Guaranteed' */
function Facility_tpCreditRiskGuaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk Guaranteed';
}

/* AABPRICING_Facility_tpRiskWeightGuarantor_value:CumNormal((InvNormal(Facility_tpGuarantorPDMoC)-(Facility_tpRhoGuarantor^.5)*InvNormal(1-Borrower_tpConfidenceLevel))/(1-Facility_tpRhoGuarantor^.5)) */
function Facility_tpRiskWeightGuarantor_value(f, x, y, z, v) {
    return CumNormal(
        (
            InvNormal(
                Facility_tpGuarantorPDMoC_value(
                    '100969',
                    x,
                    y,
                    z,
                    v
                )
            ) - (
                Facility_tpRhoGuarantor_value(
                    '101052',
                    x,
                    y,
                    z,
                    v
                ) ^ .5
            ) *
            InvNormal(
                1 -
                Borrower_tpConfidenceLevel_value(
                    '100274',
                    x,
                    y.base,
                    z,
                    v
                )
            )
        ) / (
            1 -
            Facility_tpRhoGuarantor_value(
                '101052',
                x,
                y,
                z,
                v
            ) ^ .5
        )
    );
}

/* AABPRICING_Facility_tpRiskWeightGuarantor_title:'Risk Weight Guarantor' */
function Facility_tpRiskWeightGuarantor_title(f, x, y, z, v) {
    return 'Risk Weight Guarantor';
}

/* AABPRICING_Facility_tpRhoGuarantor_value:MatrixLookup('AAB_Parameters.xls','EquityIndex',Facility_tpEquityIndexGuarantor,4) */
function Facility_tpRhoGuarantor_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'EquityIndex',
        Facility_tpEquityIndexGuarantor_value(
            '101145',
            x,
            y,
            z,
            v
        ),
        4
    );
}

/* AABPRICING_Facility_tpRhoGuarantor_title:'Rho Guarantor' */
function Facility_tpRhoGuarantor_title(f, x, y, z, v) {
    return 'Rho Guarantor';
}

/* AABPRICING_Facility_tpCalibrationFactorGuarantor_value:MatrixLookup('AAB_Parameters.xls','CalibrationFactor',Facility_tpCalibrationFactorIDGuarantor,3) */
function Facility_tpCalibrationFactorGuarantor_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalibrationFactor',
        Facility_tpCalibrationFactorIDGuarantor_value(
            '101056',
            x,
            y,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Facility_tpCalibrationFactorGuarantor_title:'Calibration Factor Guarantor' */
function Facility_tpCalibrationFactorGuarantor_title(f, x, y, z, v) {
    return 'Calibration Factor Guarantor';
}

/* AABPRICING_Facility_tpCalibrationFactorIDGuarantor_value:EvaluateAsString(Facility_tpGuarantorRating+'_'+Borrower_tpClientGroup) */
function Facility_tpCalibrationFactorIDGuarantor_value(f, x, y, z, v) {
    return String(
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ) + '_' +
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpCalibrationFactorIDGuarantor_title:'Calibration Factor ID Guarantor' */
function Facility_tpCalibrationFactorIDGuarantor_title(f, x, y, z, v) {
    return 'Calibration Factor ID Guarantor';
}

/* AABPRICING_Facility_tpEAD_value:If(Facility_tpHeadroom==1,Facility_tpEADUnguaranteedHR+Facility_tpEADGuaranteedHR,Facility_tpEADUnguaranteedHRZero+Facility_tpEADGuaranteedHRZero) */
function Facility_tpEAD_value(f, x, y, z, v) {
    return Facility_tpHeadroom_value(
        '101061',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpEADUnguaranteedHR_value(
        '101073',
        x,
        y,
        z,
        v
        ) +
        Facility_tpEADGuaranteedHR_value(
            '101079',
            x,
            y,
            z,
            v
        ) : Facility_tpEADUnguaranteedHRZero_value(
        '101075',
        x,
        y,
        z,
        v
        ) +
        Facility_tpEADGuaranteedHRZero_value(
            '101080',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpEADGeneral_value:undefined */
function Facility_tpEADGeneral_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpEADGeneral_title:'Economic Capital - Credit Risk - General' */
function Facility_tpEADGeneral_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - General';
}

/* AABPRICING_Facility_tpHeadroom_value:If(Facility_tpLimit-Facility_tpExpectedAverageOutstanding>0,1,0) */
function Facility_tpHeadroom_value(f, x, y, z, v) {
    return Facility_tpLimit_value(
        '100638',
        x,
        y,
        z,
        v
    ) -
    Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
    ) > 0 ? 1 : 0;
}

/* AABPRICING_Facility_tpHeadroom_title:'Economic Capital - Credit Risk - Headroom' */
function Facility_tpHeadroom_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Headroom';
}

/* AABPRICING_Facility_tpOutstandingUnguaranteed_value:Facility_tpExpectedAverageOutstanding*(1-Facility_tpGuarantorPercentageGuaranteed) */
function Facility_tpOutstandingUnguaranteed_value(f, x, y, z, v) {
    return Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
    ) * (
        1 -
        Facility_tpGuarantorPercentageGuaranteed_value(
            '100960',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpOutstandingUnguaranteed_title:'Economic Capital - Credit Risk - Outstanding Unguaranteed' */
function Facility_tpOutstandingUnguaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Outstanding Unguaranteed';
}

/* AABPRICING_Facility_tpOutstandingGuaranteed_value:Facility_tpExpectedAverageOutstanding*Facility_tpGuarantorPercentageGuaranteed */
function Facility_tpOutstandingGuaranteed_value(f, x, y, z, v) {
    return Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
        ) *
        Facility_tpGuarantorPercentageGuaranteed_value(
            '100960',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpOutstandingGuaranteed_title:'Economic Capital - Credit Risk - Outstanding Guaranteed' */
function Facility_tpOutstandingGuaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Outstanding Guaranteed';
}

/* AABPRICING_Facility_tpPrincipalLimitUnguaranteed_value:Facility_tpPrincipalLimit*(1-Facility_tpGuarantorPercentageGuaranteed) */
function Facility_tpPrincipalLimitUnguaranteed_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    ) * (
        1 -
        Facility_tpGuarantorPercentageGuaranteed_value(
            '100960',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpPrincipalLimitUnguaranteed_title:'Economic Capital - Credit Risk - Principal Limit Unguaranteed' */
function Facility_tpPrincipalLimitUnguaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Principal Limit Unguaranteed';
}

/* AABPRICING_Facility_tpPrincipalLimitGuaranteed_value:Facility_tpPrincipalLimit*Facility_tpGuarantorPercentageGuaranteed */
function Facility_tpPrincipalLimitGuaranteed_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) *
        Facility_tpGuarantorPercentageGuaranteed_value(
            '100960',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpPrincipalLimitGuaranteed_title:'Economic Capital - Credit Risk - Principal Limit Guaranteed' */
function Facility_tpPrincipalLimitGuaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Principal Limit Guaranteed';
}

/* AABPRICING_Facility_tpEADUnguaranteed_value:If(Facility_tpHeadroom==1,Facility_tpEADUnguaranteedHR,Facility_tpEADUnguaranteedHRZero) */
function Facility_tpEADUnguaranteed_value(f, x, y, z, v) {
    return Facility_tpHeadroom_value(
        '101061',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpEADUnguaranteedHR_value(
        '101073',
        x,
        y,
        z,
        v
    ) : Facility_tpEADUnguaranteedHRZero_value(
        '101075',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpEADUnguaranteed_title:'Economic Capital - Credit Risk - Exposure At Default Standard' */
function Facility_tpEADUnguaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Exposure At Default Standard';
}

/* AABPRICING_Facility_tpEADUnguaranteedHR_value:Facility_tpLEF*(Facility_tpOutstandingUnguaranteed+Facility_tpUGD*(1+Facility_tpMOCEAD*Facility_tpAF)*Max(Facility_tpPrincipalLimitUnguaranteed-Facility_tpOutstandingUnguaranteed,0)) */
function Facility_tpEADUnguaranteedHR_value(f, x, y, z, v) {
    return Facility_tpLEF_value(
        '101081',
        x,
        y,
        z,
        v
    ) * (
        Facility_tpOutstandingUnguaranteed_value(
            '101063',
            x,
            y,
            z,
            v
        ) +
        Facility_tpUGD_value(
            '101083',
            x,
            y,
            z,
            v
        ) * (
            1 +
            Facility_tpMOCEAD_value(
                '101087',
                x,
                y,
                z,
                v
            ) *
            Facility_tpAF_value(
                '101089',
                x,
                y,
                z,
                v
            )
        ) *
        Math.max(
            Facility_tpPrincipalLimitUnguaranteed_value(
                '101067',
                x,
                y,
                z,
                v
            ) -
            Facility_tpOutstandingUnguaranteed_value(
                '101063',
                x,
                y,
                z,
                v
            ),
            0
        )
    );
}

/* AABPRICING_Facility_tpEADUnguaranteedHR_title:'Economic Capital - Credit Risk - Exposure At Default' */
function Facility_tpEADUnguaranteedHR_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Exposure At Default';
}

/* AABPRICING_Facility_tpEADUnguaranteedHRZero_value:Facility_tpLEF*(Facility_tpOutstandingUnguaranteed+Facility_tpPGO*(1+Facility_tpMOCEAD*Facility_tpAF)*Facility_tpOutstandingUnguaranteed) */
function Facility_tpEADUnguaranteedHRZero_value(f, x, y, z, v) {
    return Facility_tpLEF_value(
        '101081',
        x,
        y,
        z,
        v
    ) * (
        Facility_tpOutstandingUnguaranteed_value(
            '101063',
            x,
            y,
            z,
            v
        ) +
        Facility_tpPGO_value(
            '101085',
            x,
            y,
            z,
            v
        ) * (
            1 +
            Facility_tpMOCEAD_value(
                '101087',
                x,
                y,
                z,
                v
            ) *
            Facility_tpAF_value(
                '101089',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpOutstandingUnguaranteed_value(
            '101063',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpEADUnguaranteedHRZero_title:'Economic Capital - Credit Risk - Exposure At Default Zero Headroom' */
function Facility_tpEADUnguaranteedHRZero_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Exposure At Default Zero Headroom';
}

/* AABPRICING_Facility_tpEADGuaranteed_value:If(Facility_tpHeadroom==1,Facility_tpEADGuaranteedHR,Facility_tpEADGuaranteedHRZero) */
function Facility_tpEADGuaranteed_value(f, x, y, z, v) {
    return Facility_tpHeadroom_value(
        '101061',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpEADGuaranteedHR_value(
        '101079',
        x,
        y,
        z,
        v
    ) : Facility_tpEADGuaranteedHRZero_value(
        '101080',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpEADGuaranteed_title:'Economic Capital - Credit Risk - Exposure At Default Guaranteed' */
function Facility_tpEADGuaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Exposure At Default Guaranteed';
}

/* AABPRICING_Facility_tpEADGuaranteedHR_value:Facility_tpLEF*(Facility_tpOutstandingGuaranteed+Facility_tpUGD*(1+Facility_tpMOCEAD*Facility_tpAF)*Max(Facility_tpPrincipalLimitGuaranteed-Facility_tpOutstandingGuaranteed,0)) */
function Facility_tpEADGuaranteedHR_value(f, x, y, z, v) {
    return Facility_tpLEF_value(
        '101081',
        x,
        y,
        z,
        v
    ) * (
        Facility_tpOutstandingGuaranteed_value(
            '101065',
            x,
            y,
            z,
            v
        ) +
        Facility_tpUGD_value(
            '101083',
            x,
            y,
            z,
            v
        ) * (
            1 +
            Facility_tpMOCEAD_value(
                '101087',
                x,
                y,
                z,
                v
            ) *
            Facility_tpAF_value(
                '101089',
                x,
                y,
                z,
                v
            )
        ) *
        Math.max(
            Facility_tpPrincipalLimitGuaranteed_value(
                '101069',
                x,
                y,
                z,
                v
            ) -
            Facility_tpOutstandingGuaranteed_value(
                '101065',
                x,
                y,
                z,
                v
            ),
            0
        )
    );
}

/* AABPRICING_Facility_tpEADGuaranteedHRZero_value:Facility_tpLEF*(Facility_tpOutstandingGuaranteed+Facility_tpPGO*(1+Facility_tpMOCEAD*Facility_tpAF)*Facility_tpOutstandingGuaranteed) */
function Facility_tpEADGuaranteedHRZero_value(f, x, y, z, v) {
    return Facility_tpLEF_value(
        '101081',
        x,
        y,
        z,
        v
    ) * (
        Facility_tpOutstandingGuaranteed_value(
            '101065',
            x,
            y,
            z,
            v
        ) +
        Facility_tpPGO_value(
            '101085',
            x,
            y,
            z,
            v
        ) * (
            1 +
            Facility_tpMOCEAD_value(
                '101087',
                x,
                y,
                z,
                v
            ) *
            Facility_tpAF_value(
                '101089',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpOutstandingGuaranteed_value(
            '101065',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpLEF_value:If(Facility_tpBorrower_tpPLorNPL==1,MatrixLookup('AAB_Parameters.xls','LEFfactors',Facility_tpIDLEFfactors,10),MatrixLookup('AAB_Parameters.xls','LEFfactors',Facility_tpIDLEFfactors,8)) */
function Facility_tpLEF_value(f, x, y, z, v) {
    return Facility_tpBorrower_tpPLorNPL_value(
        '100608',
        x,
        y,
        z,
        v
    ) ==
    1 ? MatrixLookup(
        'AAB_Parameters.xls',
        'LEFfactors',
        Facility_tpIDLEFfactors_value(
            '101091',
            x,
            y,
            z,
            v
        ),
        10
    ) : MatrixLookup(
        'AAB_Parameters.xls',
        'LEFfactors',
        Facility_tpIDLEFfactors_value(
            '101091',
            x,
            y,
            z,
            v
        ),
        8
    );
}

/* AABPRICING_Facility_tpLEF_title:'Economic Capital - Credit Risk - LEF' */
function Facility_tpLEF_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - LEF';
}

/* AABPRICING_Facility_tpUGD_value:If(Facility_tpHeadroom,If(Facility_tpBorrower_tpPLorNPL==1,MatrixLookup('AAB_Parameters.xls','LEFfactors',Facility_tpIDLEFfactors,9),MatrixLookup('AAB_Parameters.xls','LEFfactors',Facility_tpIDLEFfactors,7)),NA) */
function Facility_tpUGD_value(f, x, y, z, v) {
    return Facility_tpHeadroom_value(
        '101061',
        x,
        y,
        z,
        v
    ) ? Facility_tpBorrower_tpPLorNPL_value(
        '100608',
        x,
        y,
        z,
        v
    ) ==
    1 ? MatrixLookup(
        'AAB_Parameters.xls',
        'LEFfactors',
        Facility_tpIDLEFfactors_value(
            '101091',
            x,
            y,
            z,
            v
        ),
        9
    ) : MatrixLookup(
        'AAB_Parameters.xls',
        'LEFfactors',
        Facility_tpIDLEFfactors_value(
            '101091',
            x,
            y,
            z,
            v
        ),
        7
    ) : NA;
}

/* AABPRICING_Facility_tpUGD_title:'Economic Capital - Credit Risk - UGD ()' */
function Facility_tpUGD_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - UGD ()';
}

/* AABPRICING_Facility_tpPGO_value:If(Facility_tpHeadroom==0,If(Facility_tpBorrower_tpPLorNPL==1,MatrixLookup('AAB_Parameters.xls','LEFfactors',Facility_tpIDLEFfactors,9),MatrixLookup('AAB_Parameters.xls','LEFfactors',Facility_tpIDLEFfactors,7)),NA) */
function Facility_tpPGO_value(f, x, y, z, v) {
    return Facility_tpHeadroom_value(
        '101061',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpBorrower_tpPLorNPL_value(
        '100608',
        x,
        y,
        z,
        v
    ) ==
    1 ? MatrixLookup(
        'AAB_Parameters.xls',
        'LEFfactors',
        Facility_tpIDLEFfactors_value(
            '101091',
            x,
            y,
            z,
            v
        ),
        9
    ) : MatrixLookup(
        'AAB_Parameters.xls',
        'LEFfactors',
        Facility_tpIDLEFfactors_value(
            '101091',
            x,
            y,
            z,
            v
        ),
        7
    ) : NA;
}

/* AABPRICING_Facility_tpPGO_title:'Economic Capital - Credit Risk - PGO ()' */
function Facility_tpPGO_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - PGO ()';
}

/* AABPRICING_Facility_tpMOCEAD_value:If(Facility_tpPrincipalLimit>75e3,MatrixLookup('AAB_Parameters.xls','CalculationParameters','MOC_EAD_NPL',2),MatrixLookup('AAB_Parameters.xls','CalculationParameters','MOC_EAD_PL',2)) */
function Facility_tpMOCEAD_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    ) >
    75e3 ? MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'MOC_EAD_NPL',
        2
    ) : MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'MOC_EAD_PL',
        2
    );
}

/* AABPRICING_Facility_tpMOCEAD_title:'Economic Capital - Credit Risk - MOCEAD' */
function Facility_tpMOCEAD_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - MOCEAD';
}

/* AABPRICING_Facility_tpAF_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','AggregationFactor',2) */
function Facility_tpAF_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'AggregationFactor',
        2
    );
}

/* AABPRICING_Facility_tpAF_title:'Economic Capital - Credit Risk - AF' */
function Facility_tpAF_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - AF';
}

/* AABPRICING_Facility_tpIDLEFfactors_value:EvaluateAsString(Facility_tpType+'_'+Facility_tpLowerlimit+'_'+Facility_tpUsageLimit+'_'+Facility_tpUGDPGO) */
function Facility_tpIDLEFfactors_value(f, x, y, z, v) {
    return String(
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ) + '_' +
        Facility_tpLowerlimit_value(
            '101093',
            x,
            y,
            z,
            v
        ) + '_' +
        Facility_tpUsageLimit_value(
            '101095',
            x,
            y,
            z,
            v
        ) + '_' +
        Facility_tpUGDPGO_value(
            '101097',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpIDLEFfactors_title:'Economic Capital - Credit Risk - Search ID LEFfactors' */
function Facility_tpIDLEFfactors_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Search ID LEFfactors';
}

/* AABPRICING_Facility_tpLowerlimit_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,8)==1,If(Facility_tpHeadroom,Case(Facility_tpLimit,[1e5,0||35e4,1e5||1e6,35e4||3e6,1e6||3e6,3e6]),Case(Facility_tpPrincipalLimit,[7e4,0||3e5,7e4||1e6,3e5||1e6,1e6])),0) */
function Facility_tpLowerlimit_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        8
    ) ==
    1 ? Facility_tpHeadroom_value(
        '101061',
        x,
        y,
        z,
        v
    ) ? (
        __c0s10 =
            Facility_tpLimit_value(
                '100638',
                x,
                y,
                z,
                v
            ),
            __c0s10 === 100000 ? 0 : __c0s10 === 350000 ? 1e5 : __c0s10 === 1000000 ? 35e4 : __c0s10 === 3000000 ? 1e6 : __c0s10 === 3000000 ? 3e6 : NA
    ) : (
        __c0s11 =
            Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ),
            __c0s11 === 70000 ? 0 : __c0s11 === 300000 ? 7e4 : __c0s11 === 1000000 ? 3e5 : __c0s11 === 1000000 ? 1e6 : NA
    ) : 0;
}

/* AABPRICING_Facility_tpLowerlimit_title:'Economic Capital - Credit Risk - Search ID Lower limit' */
function Facility_tpLowerlimit_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Search ID Lower limit';
}

/* AABPRICING_Facility_tpUsageLimit_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,10)==1,0,If(Facility_tpHeadroom,Case(Facility_tpExpectedAverageOutstanding/Facility_tpLimit*100,[80,0||80,81]),0)) */
function Facility_tpUsageLimit_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        10
    ) ==
    1 ? 0 : Facility_tpHeadroom_value(
        '101061',
        x,
        y,
        z,
        v
    ) ? (
        __c0s12 =
            Facility_tpExpectedAverageOutstanding_value(
                '100529',
                x,
                y,
                z,
                v
            ) /
            Facility_tpLimit_value(
                '100638',
                x,
                y,
                z,
                v
            ) * 100,
            __c0s12 === 80 ? 0 : __c0s12 === 80 ? 81 : NA
    ) : 0;
}

/* AABPRICING_Facility_tpUsageLimit_title:'Economic Capital - Credit Risk - Search ID Usage limit' */
function Facility_tpUsageLimit_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Search ID Usage limit';
}

/* AABPRICING_Facility_tpUGDPGO_value:EvaluateAsString(If(Facility_tpHeadroom,'UGD','PGO')) */
function Facility_tpUGDPGO_value(f, x, y, z, v) {
    return String(
        Facility_tpHeadroom_value(
            '101061',
            x,
            y,
            z,
            v
        ) ? 'UGD' : 'PGO'
    );
}

/* AABPRICING_Facility_tpUGDPGO_title:'Economic Capital - Credit Risk - Search ID UGD/PGO' */
function Facility_tpUGDPGO_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Search ID UGD/PGO';
}

/* AABPRICING_Facility_tpECMultiplier_value:Facility_tpECMultiplierLowerBound+(Facility_tpECMultiplierUpperBound-Facility_tpECMultiplierLowerBound)*OnER((Facility_tpRemainingAverageTenor+1-Facility_tpECMultiplierTenorLowerBound)/(Facility_tpECMultiplierTenorUpperBound-Facility_tpECMultiplierTenorLowerBound),0) */
function Facility_tpECMultiplier_value(f, x, y, z, v) {
    return Facility_tpECMultiplierLowerBound_value(
        '101107',
        x,
        y,
        z,
        v
        ) + (
            Facility_tpECMultiplierUpperBound_value(
                '101109',
                x,
                y,
                z,
                v
            ) -
            Facility_tpECMultiplierLowerBound_value(
                '101107',
                x,
                y,
                z,
                v
            )
        ) *
        OnER(
            (
                Facility_tpRemainingAverageTenor_value(
                    '100527',
                    x,
                    y,
                    z,
                    v
                ) + 1 -
                Facility_tpECMultiplierTenorLowerBound_value(
                    '101103',
                    x,
                    y,
                    z,
                    v
                )
            ) / (
                Facility_tpECMultiplierTenorUpperBound_value(
                    '101105',
                    x,
                    y,
                    z,
                    v
                ) -
                Facility_tpECMultiplierTenorLowerBound_value(
                    '101103',
                    x,
                    y,
                    z,
                    v
                )
            ),
            0
        );
}

/* AABPRICING_Facility_tpECMultiplier_title:'Economic Capital Multiplier' */
function Facility_tpECMultiplier_title(f, x, y, z, v) {
    return 'Economic Capital Multiplier';
}

/* AABPRICING_Facility_tpECMultiplierGuarantor_value:Facility_tpECMultiplierLowerBoundGuarantor+(Facility_tpECMultiplierUpperBoundGuarantor-Facility_tpECMultiplierLowerBoundGuarantor)*OnER((Facility_tpRemainingAverageTenor+1-Facility_tpECMultiplierTenorLowerBound)/(Facility_tpECMultiplierTenorUpperBound-Facility_tpECMultiplierTenorLowerBound),0) */
function Facility_tpECMultiplierGuarantor_value(f, x, y, z, v) {
    return Facility_tpECMultiplierLowerBoundGuarantor_value(
        '101111',
        x,
        y,
        z,
        v
        ) + (
            Facility_tpECMultiplierUpperBoundGuarantor_value(
                '101113',
                x,
                y,
                z,
                v
            ) -
            Facility_tpECMultiplierLowerBoundGuarantor_value(
                '101111',
                x,
                y,
                z,
                v
            )
        ) *
        OnER(
            (
                Facility_tpRemainingAverageTenor_value(
                    '100527',
                    x,
                    y,
                    z,
                    v
                ) + 1 -
                Facility_tpECMultiplierTenorLowerBound_value(
                    '101103',
                    x,
                    y,
                    z,
                    v
                )
            ) / (
                Facility_tpECMultiplierTenorUpperBound_value(
                    '101105',
                    x,
                    y,
                    z,
                    v
                ) -
                Facility_tpECMultiplierTenorLowerBound_value(
                    '101103',
                    x,
                    y,
                    z,
                    v
                )
            ),
            0
        );
}

/* AABPRICING_Facility_tpECMultiplierGuarantor_title:'Economic Capital Multiplier Guarantor' */
function Facility_tpECMultiplierGuarantor_title(f, x, y, z, v) {
    return 'Economic Capital Multiplier Guarantor';
}

/* AABPRICING_Facility_tpECMultiplierTenorLowerBound_value:MatrixLookup('AAB_Parameters.xls','ECMultiplierTenorLowerBound',If(Facility_tpRemainingAverageTenor<=1,1,If(Facility_tpRemainingAverageTenor+1>16,16,Facility_tpRemainingAverageTenor+1)),1) */
function Facility_tpECMultiplierTenorLowerBound_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ECMultiplierTenorLowerBound',
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) <=
        1 ? 1 : Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) + 1 >
        16 ? 16 : Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) + 1,
        1
    );
}

/* AABPRICING_Facility_tpECMultiplierTenorLowerBound_title:'Economic Capital Multiplier Lower Tenor' */
function Facility_tpECMultiplierTenorLowerBound_title(f, x, y, z, v) {
    return 'Economic Capital Multiplier Lower Tenor';
}

/* AABPRICING_Facility_tpECMultiplierTenorUpperBound_value:MatrixLookup('AAB_Parameters.xls','ECMultiplierTenorUpperBound',If(Facility_tpRemainingAverageTenor<=1,1,If(Facility_tpRemainingAverageTenor+1>16,16,Facility_tpRemainingAverageTenor+1)),1) */
function Facility_tpECMultiplierTenorUpperBound_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ECMultiplierTenorUpperBound',
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) <=
        1 ? 1 : Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) + 1 >
        16 ? 16 : Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) + 1,
        1
    );
}

/* AABPRICING_Facility_tpECMultiplierTenorUpperBound_title:'Economic Capital Multiplier Upper Tenor' */
function Facility_tpECMultiplierTenorUpperBound_title(f, x, y, z, v) {
    return 'Economic Capital Multiplier Upper Tenor';
}

/* AABPRICING_Facility_tpECMultiplierLowerBound_value:MatrixLookup('AAB_Parameters.xls','ECMultiplier',''+Borrower_tpRating,Facility_tpECMultiplierTenorLowerBound) */
function Facility_tpECMultiplierLowerBound_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ECMultiplier',
        '' +
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ),
        Facility_tpECMultiplierTenorLowerBound_value(
            '101103',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpECMultiplierLowerBound_title:'Economic Capital Multiplier Lower Bound' */
function Facility_tpECMultiplierLowerBound_title(f, x, y, z, v) {
    return 'Economic Capital Multiplier Lower Bound';
}

/* AABPRICING_Facility_tpECMultiplierUpperBound_value:MatrixLookup('AAB_Parameters.xls','ECMultiplier',''+Borrower_tpRating,Facility_tpECMultiplierTenorUpperBound) */
function Facility_tpECMultiplierUpperBound_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ECMultiplier',
        '' +
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ),
        Facility_tpECMultiplierTenorUpperBound_value(
            '101105',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpECMultiplierUpperBound_title:'Economic Capital Multiplier Upper Bound' */
function Facility_tpECMultiplierUpperBound_title(f, x, y, z, v) {
    return 'Economic Capital Multiplier Upper Bound';
}

/* AABPRICING_Facility_tpECMultiplierLowerBoundGuarantor_value:MatrixLookup('AAB_Parameters.xls','ECMultiplier',''+Facility_tpGuarantorRating,Facility_tpECMultiplierTenorLowerBound) */
function Facility_tpECMultiplierLowerBoundGuarantor_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ECMultiplier',
        '' +
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ),
        Facility_tpECMultiplierTenorLowerBound_value(
            '101103',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpECMultiplierLowerBoundGuarantor_title:'Economic Capital Multiplier Lower Bound Guarantor' */
function Facility_tpECMultiplierLowerBoundGuarantor_title(f, x, y, z, v) {
    return 'Economic Capital Multiplier Lower Bound Guarantor';
}

/* AABPRICING_Facility_tpECMultiplierUpperBoundGuarantor_value:MatrixLookup('AAB_Parameters.xls','ECMultiplier',''+Facility_tpGuarantorRating,Facility_tpECMultiplierTenorUpperBound) */
function Facility_tpECMultiplierUpperBoundGuarantor_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ECMultiplier',
        '' +
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ),
        Facility_tpECMultiplierTenorUpperBound_value(
            '101105',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpECMultiplierUpperBoundGuarantor_title:'Economic Capital Multiplier Upper Bound Guarantor' */
function Facility_tpECMultiplierUpperBoundGuarantor_title(f, x, y, z, v) {
    return 'Economic Capital Multiplier Upper Bound Guarantor';
}

/* AABPRICING_Facility_tpIELMoC_value:Facility_tpIELMoCUnguaranteed+Facility_tpIELMoCGuaranteed */
function Facility_tpIELMoC_value(f, x, y, z, v) {
    return Facility_tpIELMoCUnguaranteed_value(
        '101117',
        x,
        y,
        z,
        v
        ) +
        Facility_tpIELMoCGuaranteed_value(
            '101131',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpIELMoC_title:'Economic Capital - Credit Risk - Internal Expected Loss' */
function Facility_tpIELMoC_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Internal Expected Loss';
}

/* AABPRICING_Facility_tpIELMoCUnguaranteed_value:Facility_tpEADUnguaranteed*Facility_tpBorrower_tpPDMoC*Facility_tpLGDMoC*Facility_tpELMultiplierECUnguaranteed*Facility_tpDeannualize */
function Facility_tpIELMoCUnguaranteed_value(f, x, y, z, v) {
    return Facility_tpEADUnguaranteed_value(
        '101071',
        x,
        y,
        z,
        v
        ) *
        Facility_tpBorrower_tpPDMoC_value(
            '100602',
            x,
            y,
            z,
            v
        ) *
        Facility_tpLGDMoC_value(
            '100572',
            x,
            y,
            z,
            v
        ) *
        Facility_tpELMultiplierECUnguaranteed_value(
            '101119',
            x,
            y,
            z,
            v
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpIELMoCUnguaranteed_title:'Economic Capital - Credit Risk - Internal Expected Loss - Unguaranteed' */
function Facility_tpIELMoCUnguaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Internal Expected Loss - Unguaranteed';
}

/* AABPRICING_Facility_tpELMultiplierECUnguaranteed_value:If(Facility_tpRemainingAverageTenor-Facility_tpELMultiplierLowerM>0,MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDLowerMECUnguaranteed,1)+(Facility_tpRemainingAverageTenor-Facility_tpELMultiplierLowerM)*(MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDUpperMECUnguaranteed,1)-MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDLowerMECUnguaranteed,1)),MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDECUnguaranteed,1)) */
function Facility_tpELMultiplierECUnguaranteed_value(f, x, y, z, v) {
    return Facility_tpRemainingAverageTenor_value(
        '100527',
        x,
        y,
        z,
        v
    ) -
    Facility_tpELMultiplierLowerM_value(
        '101121',
        x,
        y,
        z,
        v
    ) >
    0 ? MatrixLookup(
        'AAB_Parameters_ELMultiplier.xls',
        'ELMultiplier',
        Facility_tpELMultiplierIDLowerMECUnguaranteed_value(
            '101127',
            x,
            y,
            z,
            v
        ),
        1
    ) + (
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) -
        Facility_tpELMultiplierLowerM_value(
            '101121',
            x,
            y,
            z,
            v
        )
    ) * (
        MatrixLookup(
            'AAB_Parameters_ELMultiplier.xls',
            'ELMultiplier',
            Facility_tpELMultiplierIDUpperMECUnguaranteed_value(
                '101129',
                x,
                y,
                z,
                v
            ),
            1
        ) -
        MatrixLookup(
            'AAB_Parameters_ELMultiplier.xls',
            'ELMultiplier',
            Facility_tpELMultiplierIDLowerMECUnguaranteed_value(
                '101127',
                x,
                y,
                z,
                v
            ),
            1
        )
    ) : MatrixLookup(
        'AAB_Parameters_ELMultiplier.xls',
        'ELMultiplier',
        Facility_tpELMultiplierIDECUnguaranteed_value(
            '101125',
            x,
            y,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Facility_tpELMultiplierECUnguaranteed_title:'Expected Loss Multiplier' */
function Facility_tpELMultiplierECUnguaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier';
}

/* AABPRICING_Facility_tpELMultiplierLowerM_value:Case(Facility_tpRemainingAverageTenor,[1,0||2,1||3,2||4,3||5,4||6,5||7,6||8,7||9,8||10,9||11,10||12,11||13,12||14,13||15,14||15]) */
function Facility_tpELMultiplierLowerM_value(f, x, y, z, v) {
    return __c0s13 =
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) , __c0s13 === 1 ? 0 : __c0s13 === 2 ? 1 : __c0s13 === 3 ? 2 : __c0s13 === 4 ? 3 : __c0s13 === 5 ? 4 : __c0s13 === 6 ? 5 : __c0s13 === 7 ? 6 : __c0s13 === 8 ? 7 : __c0s13 === 9 ? 8 : __c0s13 === 10 ? 9 : __c0s13 === 11 ? 10 : __c0s13 === 12 ? 11 : __c0s13 === 13 ? 12 : __c0s13 === 14 ? 13 : __c0s13 === 15 ? 14 || 15 : NA;
}

/* AABPRICING_Facility_tpELMultiplierLowerM_title:'Expected Loss - Lower M' */
function Facility_tpELMultiplierLowerM_title(f, x, y, z, v) {
    return 'Expected Loss - Lower M';
}

/* AABPRICING_Facility_tpELMultiplierUpperM_value:Case(Facility_tpRemainingAverageTenor,[1,1||2,2||3,3||4,4||5,5||6,6||7,7||8,8||9,9||10,10||11,11||12,12||13,13||14,14||15,15||15]) */
function Facility_tpELMultiplierUpperM_value(f, x, y, z, v) {
    return __c0s14 =
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) , __c0s14 === 1 ? 1 : __c0s14 === 2 ? 2 : __c0s14 === 3 ? 3 : __c0s14 === 4 ? 4 : __c0s14 === 5 ? 5 : __c0s14 === 6 ? 6 : __c0s14 === 7 ? 7 : __c0s14 === 8 ? 8 : __c0s14 === 9 ? 9 : __c0s14 === 10 ? 10 : __c0s14 === 11 ? 11 : __c0s14 === 12 ? 12 : __c0s14 === 13 ? 13 : __c0s14 === 14 ? 14 : __c0s14 === 15 ? 15 || 15 : NA;
}

/* AABPRICING_Facility_tpELMultiplierUpperM_title:'Expected Loss - Upper M' */
function Facility_tpELMultiplierUpperM_title(f, x, y, z, v) {
    return 'Expected Loss - Upper M';
}

/* AABPRICING_Facility_tpELMultiplierIDECUnguaranteed_value:EvaluateAsString(''+Borrower_tpRating+'_'+Str(If(Facility_tpRemainingAverageTenor+1>16,16,Facility_tpRemainingAverageTenor+1),0,0)+'_'+Str(RoundUp(Facility_tpLGDMoC,2)*100,0,0)) */
function Facility_tpELMultiplierIDECUnguaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpRemainingAverageTenor_value(
                '100527',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpRemainingAverageTenor_value(
                '100527',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGDMoC_value(
                    '100572',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDECUnguaranteed_title:'Expected Loss Multiplier ID Economic Capital - Unguaranteed' */
function Facility_tpELMultiplierIDECUnguaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID Economic Capital - Unguaranteed';
}

/* AABPRICING_Facility_tpELMultiplierIDLowerMECUnguaranteed_value:EvaluateAsString(''+Borrower_tpRating+'_'+Str(If(Facility_tpELMultiplierLowerM+1>16,16,Facility_tpELMultiplierLowerM+1),0,0)+'_'+Str(RoundUp(Facility_tpLGDMoC,2)*100,0,0)) */
function Facility_tpELMultiplierIDLowerMECUnguaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpELMultiplierLowerM_value(
                '101121',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpELMultiplierLowerM_value(
                '101121',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGDMoC_value(
                    '100572',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDLowerMECUnguaranteed_title:'Expected Loss Multiplier ID Economic Capital - Unguaranteed - Lower M' */
function Facility_tpELMultiplierIDLowerMECUnguaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID Economic Capital - Unguaranteed - Lower M';
}

/* AABPRICING_Facility_tpELMultiplierIDUpperMECUnguaranteed_value:EvaluateAsString(''+Borrower_tpRating+'_'+Str(If(Facility_tpELMultiplierUpperM+1>16,16,Facility_tpELMultiplierUpperM+1),0,0)+'_'+Str(RoundUp(Facility_tpLGDMoC,2)*100,0,0)) */
function Facility_tpELMultiplierIDUpperMECUnguaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpELMultiplierUpperM_value(
                '101123',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpELMultiplierUpperM_value(
                '101123',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGDMoC_value(
                    '100572',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDUpperMECUnguaranteed_title:'Expected Loss Multiplier ID Economic Capital - Unguaranteed - Upper M' */
function Facility_tpELMultiplierIDUpperMECUnguaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID Economic Capital - Unguaranteed - Upper M';
}

/* AABPRICING_Facility_tpIELMoCGuaranteed_value:OnEr(Facility_tpEADGuaranteed*Facility_tpJointPDMoC*Facility_tpLGDMoC*Facility_tpELMultiplierECGuaranteed*Facility_tpDeannualize,NA) */
function Facility_tpIELMoCGuaranteed_value(f, x, y, z, v) {
    return OnEr(
        Facility_tpEADGuaranteed_value(
            '101077',
            x,
            y,
            z,
            v
        ) *
        Facility_tpJointPDMoC_value(
            '101141',
            x,
            y,
            z,
            v
        ) *
        Facility_tpLGDMoC_value(
            '100572',
            x,
            y,
            z,
            v
        ) *
        Facility_tpELMultiplierECGuaranteed_value(
            '101133',
            x,
            y,
            z,
            v
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpIELMoCGuaranteed_title:'Economic Capital - Credit Risk - Internal Expected Loss - Guaranteed' */
function Facility_tpIELMoCGuaranteed_title(f, x, y, z, v) {
    return 'Economic Capital - Credit Risk - Internal Expected Loss - Guaranteed';
}

/* AABPRICING_Facility_tpELMultiplierECGuaranteed_value:If(Facility_tpRemainingAverageTenor-Facility_tpELMultiplierLowerM>0,MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDLowerMECGuaranteed,1)+(Facility_tpRemainingAverageTenor-Facility_tpELMultiplierLowerM)*(MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDUpperMECGuaranteed,1)-MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDLowerMECGuaranteed,1)),MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDECGuaranteed,1)) */
function Facility_tpELMultiplierECGuaranteed_value(f, x, y, z, v) {
    return Facility_tpRemainingAverageTenor_value(
        '100527',
        x,
        y,
        z,
        v
    ) -
    Facility_tpELMultiplierLowerM_value(
        '101121',
        x,
        y,
        z,
        v
    ) >
    0 ? MatrixLookup(
        'AAB_Parameters_ELMultiplier.xls',
        'ELMultiplier',
        Facility_tpELMultiplierIDLowerMECGuaranteed_value(
            '101137',
            x,
            y,
            z,
            v
        ),
        1
    ) + (
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) -
        Facility_tpELMultiplierLowerM_value(
            '101121',
            x,
            y,
            z,
            v
        )
    ) * (
        MatrixLookup(
            'AAB_Parameters_ELMultiplier.xls',
            'ELMultiplier',
            Facility_tpELMultiplierIDUpperMECGuaranteed_value(
                '101139',
                x,
                y,
                z,
                v
            ),
            1
        ) -
        MatrixLookup(
            'AAB_Parameters_ELMultiplier.xls',
            'ELMultiplier',
            Facility_tpELMultiplierIDLowerMECGuaranteed_value(
                '101137',
                x,
                y,
                z,
                v
            ),
            1
        )
    ) : MatrixLookup(
        'AAB_Parameters_ELMultiplier.xls',
        'ELMultiplier',
        Facility_tpELMultiplierIDECGuaranteed_value(
            '101135',
            x,
            y,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Facility_tpELMultiplierECGuaranteed_title:'Expected Loss Multiplier Guaranteed' */
function Facility_tpELMultiplierECGuaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier Guaranteed';
}

/* AABPRICING_Facility_tpELMultiplierIDECGuaranteed_value:EvaluateAsString(''+Facility_tpGuarantorRating+'_'+Str(If(Facility_tpRemainingAverageTenor+1>16,16,Facility_tpRemainingAverageTenor+1),0,0)+'_'+Str(RoundUp(Facility_tpLGDMoC,2)*100,0,0)) */
function Facility_tpELMultiplierIDECGuaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpRemainingAverageTenor_value(
                '100527',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpRemainingAverageTenor_value(
                '100527',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGDMoC_value(
                    '100572',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDECGuaranteed_title:'Expected Loss Multiplier ID Economic Capital - Guaranteed' */
function Facility_tpELMultiplierIDECGuaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID Economic Capital - Guaranteed';
}

/* AABPRICING_Facility_tpELMultiplierIDLowerMECGuaranteed_value:EvaluateAsString(''+Facility_tpGuarantorRating+'_'+Str(If(Facility_tpELMultiplierLowerM+1>16,16,Facility_tpELMultiplierLowerM+1),0,0)+'_'+Str(RoundUp(Facility_tpLGDMoC,2)*100,0,0)) */
function Facility_tpELMultiplierIDLowerMECGuaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpELMultiplierLowerM_value(
                '101121',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpELMultiplierLowerM_value(
                '101121',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGDMoC_value(
                    '100572',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDLowerMECGuaranteed_title:'Expected Loss Multiplier ID Economic Capital - Guaranteed - Lower M' */
function Facility_tpELMultiplierIDLowerMECGuaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID Economic Capital - Guaranteed - Lower M';
}

/* AABPRICING_Facility_tpELMultiplierIDUpperMECGuaranteed_value:EvaluateAsString(''+Facility_tpGuarantorRating+'_'+Str(If(Facility_tpELMultiplierUpperM+1>16,16,Facility_tpELMultiplierUpperM+1),0,0)+'_'+Str(RoundUp(Facility_tpLGDMoC,2)*100,0,0)) */
function Facility_tpELMultiplierIDUpperMECGuaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpELMultiplierUpperM_value(
                '101123',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpELMultiplierUpperM_value(
                '101123',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGDMoC_value(
                    '100572',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDUpperMECGuaranteed_title:'Expected Loss Multiplier ID Economic Capital - Guaranteed - Upper M' */
function Facility_tpELMultiplierIDUpperMECGuaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID Economic Capital - Guaranteed - Upper M';
}

/* AABPRICING_Facility_tpJointPDMoC_value:BivarNormal(InvNormal(Facility_tpBorrower_tpPDMoC),InvNormal(Facility_tpGuarantorPDMoC),Facility_tpIntraSectorCorrelationBorrower*Facility_tpIntraSectorCorrelationGuarantor*Facility_tpEquityCorrelation) */
function Facility_tpJointPDMoC_value(f, x, y, z, v) {
    return BivarNormal(
        InvNormal(
            Facility_tpBorrower_tpPDMoC_value(
                '100602',
                x,
                y,
                z,
                v
            )
        ),
        InvNormal(
            Facility_tpGuarantorPDMoC_value(
                '100969',
                x,
                y,
                z,
                v
            )
        ),
        Facility_tpIntraSectorCorrelationBorrower_value(
            '101147',
            x,
            y,
            z,
            v
        ) *
        Facility_tpIntraSectorCorrelationGuarantor_value(
            '101149',
            x,
            y,
            z,
            v
        ) *
        Facility_tpEquityCorrelation_value(
            '101153',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpJointPDMoC_title:'Joint PD MoC' */
function Facility_tpJointPDMoC_title(f, x, y, z, v) {
    return 'Joint PD MoC';
}

/* AABPRICING_Facility_tpEquityIndexBorrower_value:If(Borrower_tpAGICOrSBI==0,MatrixLookup('AAB_Parameters.xls','AGICMapping',''+Borrower_tpAGIC,2),MatrixLookup('AAB_Parameters.xls','SBIMapping',''+Borrower_tpSBI,2)) */
function Facility_tpEquityIndexBorrower_value(f, x, y, z, v) {
    return Borrower_tpAGICOrSBI_value(
        '100199',
        x,
        y.base,
        z,
        v
    ) ==
    0 ? MatrixLookup(
        'AAB_Parameters.xls',
        'AGICMapping',
        '' +
        Borrower_tpAGIC_value(
            '100205',
            x,
            y.base,
            z,
            v
        ),
        2
    ) : MatrixLookup(
        'AAB_Parameters.xls',
        'SBIMapping',
        '' +
        Borrower_tpSBI_value(
            '100222',
            x,
            y.base,
            z,
            v
        ),
        2
    );
}

/* AABPRICING_Facility_tpEquityIndexBorrower_title:'Equity Index Borrower' */
function Facility_tpEquityIndexBorrower_title(f, x, y, z, v) {
    return 'Equity Index Borrower';
}

/* AABPRICING_Facility_tpEquityIndexGuarantor_value:If(Facility_tpGuarantorAGICOrSBI==0,MatrixLookup('AAB_Parameters.xls','AGICMapping',''+Facility_tpGuarantorAGIC,2),MatrixLookup('AAB_Parameters.xls','SBIMapping',''+Facility_tpGuarantorSBI,2)) */
function Facility_tpEquityIndexGuarantor_value(f, x, y, z, v) {
    return Facility_tpGuarantorAGICOrSBI_value(
        '100955',
        x,
        y,
        z,
        v
    ) ==
    0 ? MatrixLookup(
        'AAB_Parameters.xls',
        'AGICMapping',
        '' +
        Facility_tpGuarantorAGIC_value(
            '100959',
            x,
            y,
            z,
            v
        ),
        2
    ) : MatrixLookup(
        'AAB_Parameters.xls',
        'SBIMapping',
        '' +
        Facility_tpGuarantorSBI_value(
            '100956',
            x,
            y,
            z,
            v
        ),
        2
    );
}

/* AABPRICING_Facility_tpEquityIndexGuarantor_title:'Equity Index Guarantor' */
function Facility_tpEquityIndexGuarantor_title(f, x, y, z, v) {
    return 'Equity Index Guarantor';
}

/* AABPRICING_Facility_tpIntraSectorCorrelationBorrower_value:MatrixLookup('AAB_Parameters.xls','EquityIndex',Facility_tpEquityIndexBorrower,3) */
function Facility_tpIntraSectorCorrelationBorrower_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'EquityIndex',
        Facility_tpEquityIndexBorrower_value(
            '101143',
            x,
            y,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Facility_tpIntraSectorCorrelationBorrower_title:'Intrasector Correlation Borrower' */
function Facility_tpIntraSectorCorrelationBorrower_title(f, x, y, z, v) {
    return 'Intrasector Correlation Borrower';
}

/* AABPRICING_Facility_tpIntraSectorCorrelationGuarantor_value:MatrixLookup('AAB_Parameters.xls','EquityIndex',Facility_tpEquityIndexGuarantor,3) */
function Facility_tpIntraSectorCorrelationGuarantor_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'EquityIndex',
        Facility_tpEquityIndexGuarantor_value(
            '101145',
            x,
            y,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Facility_tpIntraSectorCorrelationGuarantor_title:'Intrasector Correlation Guarantor' */
function Facility_tpIntraSectorCorrelationGuarantor_title(f, x, y, z, v) {
    return 'Intrasector Correlation Guarantor';
}

/* AABPRICING_Facility_tpEquityCorrelationID_value:EvaluateAsString(Str(Facility_tpEquityIndexBorrower)+'_'+Str(Facility_tpEquityIndexGuarantor)) */
function Facility_tpEquityCorrelationID_value(f, x, y, z, v) {
    return String(
        Str(
            Facility_tpEquityIndexBorrower_value(
                '101143',
                x,
                y,
                z,
                v
            )
        ) + '_' +
        Str(
            Facility_tpEquityIndexGuarantor_value(
                '101145',
                x,
                y,
                z,
                v
            )
        )
    );
}

/* AABPRICING_Facility_tpEquityCorrelationID_title:'Inter-sector Correlation Factor ID' */
function Facility_tpEquityCorrelationID_title(f, x, y, z, v) {
    return 'Inter-sector Correlation Factor ID';
}

/* AABPRICING_Facility_tpEquityCorrelation_value:MatrixLookup('AAB_Parameters.xls','EquityCorrelation',Facility_tpEquityCorrelationID,1) */
function Facility_tpEquityCorrelation_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'EquityCorrelation',
        Facility_tpEquityCorrelationID_value(
            '101151',
            x,
            y,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Facility_tpEquityCorrelation_title:'Inter-sector Correlation Factor' */
function Facility_tpEquityCorrelation_title(f, x, y, z, v) {
    return 'Inter-sector Correlation Factor';
}

/* AABPRICING_Facility_tpInvNormalBorrower_value:InvNormal(Facility_tpBorrower_tpPDMoC) */
function Facility_tpInvNormalBorrower_value(f, x, y, z, v) {
    return InvNormal(
        Facility_tpBorrower_tpPDMoC_value(
            '100602',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpInvNormalBorrower_title:'Inverse Normal Borrower' */
function Facility_tpInvNormalBorrower_title(f, x, y, z, v) {
    return 'Inverse Normal Borrower';
}

/* AABPRICING_Facility_tpInvNormalGuarantor_value:InvNormal(Facility_tpGuarantorPDMoC) */
function Facility_tpInvNormalGuarantor_value(f, x, y, z, v) {
    return InvNormal(
        Facility_tpGuarantorPDMoC_value(
            '100969',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpInvNormalGuarantor_title:'Inverse Normal Guarantor' */
function Facility_tpInvNormalGuarantor_title(f, x, y, z, v) {
    return 'Inverse Normal Guarantor';
}

/* AABPRICING_Facility_tpRiskAdjustedReturn_value:OnEr(Facility_tpCreditIncome-Facility_tpOtherExpenses-Facility_tpInterestExpenses-Facility_tpTax,NA) */
function Facility_tpRiskAdjustedReturn_value(f, x, y, z, v) {
    return OnEr(
        Facility_tpCreditIncome_value(
            '101160',
            x,
            y,
            z,
            v
        ) -
        Facility_tpOtherExpenses_value(
            '101203',
            x,
            y,
            z,
            v
        ) -
        Facility_tpInterestExpenses_value(
            '101242',
            x,
            y,
            z,
            v
        ) -
        Facility_tpTax_value(
            '101241',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpCreditIncome_value:Facility_tpInterestIncome+Facility_tpCreditRelatedFee */
function Facility_tpCreditIncome_value(f, x, y, z, v) {
    return Facility_tpInterestIncome_value(
        '101194',
        x,
        y,
        z,
        v
        ) +
        Facility_tpCreditRelatedFee_value(
            '101161',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpCreditRelatedFee_value:OnER(Facility_tpCommitmentFee+Facility_tpUtilisationFee+Facility_tpAnnualFee+Facility_tpOneOffFee,NA) */
function Facility_tpCreditRelatedFee_value(f, x, y, z, v) {
    return OnER(
        Facility_tpCommitmentFee_value(
            '101162',
            x,
            y,
            z,
            v
        ) +
        Facility_tpUtilisationFee_value(
            '101174',
            x,
            y,
            z,
            v
        ) +
        Facility_tpAnnualFee_value(
            '101164',
            x,
            y,
            z,
            v
        ) +
        Facility_tpOneOffFee_value(
            '101168',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpCommitmentFee_value:Facility_tpCommitmentFeeBp*(Facility_tpLimit-Facility_tpExpectedAverageOutstanding)*1e-4*Facility_tpDeannualize */
function Facility_tpCommitmentFee_value(f, x, y, z, v) {
    return Facility_tpCommitmentFeeBp_value(
        '100586',
        x,
        y,
        z,
        v
        ) * (
            Facility_tpLimit_value(
                '100638',
                x,
                y,
                z,
                v
            ) -
            Facility_tpExpectedAverageOutstanding_value(
                '100529',
                x,
                y,
                z,
                v
            )
        ) * 1 - 4 *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpCommitmentFee_title:'Risk Adjusted Return - Income - Credit Related Fee - Commitment Fee' */
function Facility_tpCommitmentFee_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Income - Credit Related Fee - Commitment Fee';
}

/* AABPRICING_Facility_tpAnnualFee_value:OnER(If(Facility_tpType=='F1',Facility_tpCreditFeeBp/1e4*Facility_tpExpectedAverageOutstanding,NA),NA) */
function Facility_tpAnnualFee_value(f, x, y, z, v) {
    return OnER(
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ) ==
        'F1' ? Facility_tpCreditFeeBp_value(
            '100584',
            x,
            y,
            z,
            v
            ) / 1 *
            Facility_tpExpectedAverageOutstanding_value(
                '100529',
                x,
                y,
                z,
                v
            ) : NA,
        NA
    );
}

/* AABPRICING_Facility_tpAnnualFee_title:'Risk Adjusted Return - Income - Credit Related Fee - Annual Fee' */
function Facility_tpAnnualFee_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Income - Credit Related Fee - Annual Fee';
}

/* AABPRICING_Facility_tpAnnualFeeBp_value:Facility_tpAnnualFee/Facility_tpExpectedAverageOutstanding */
function Facility_tpAnnualFeeBp_value(f, x, y, z, v) {
    return Facility_tpAnnualFee_value(
        '101164',
        x,
        y,
        z,
        v
        ) /
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpAnnualFeeBp_title:'Annual Fee (Bp)' */
function Facility_tpAnnualFeeBp_title(f, x, y, z, v) {
    return 'Annual Fee (Bp)';
}

/* AABPRICING_Facility_tpOneOffFee_value:If(Facility_tpOriginalTenorYears<=1,Facility_tpOneOffFeeAmount,If(Facility_tpOriginalTenorYears<=5,Facility_tpOneOffFeeAmount/Facility_tpOriginalTenorYears,Facility_tpOneOffFeeAmount/5)) */
function Facility_tpOneOffFee_value(f, x, y, z, v) {
    return Facility_tpOriginalTenorYears_value(
        '100613',
        x,
        y,
        z,
        v
    ) <=
    1 ? Facility_tpOneOffFeeAmount_value(
        '101170',
        x,
        y,
        z,
        v
    ) : Facility_tpOriginalTenorYears_value(
        '100613',
        x,
        y,
        z,
        v
    ) <=
    5 ? Facility_tpOneOffFeeAmount_value(
        '101170',
        x,
        y,
        z,
        v
        ) /
        Facility_tpOriginalTenorYears_value(
            '100613',
            x,
            y,
            z,
            v
        ) : Facility_tpOneOffFeeAmount_value(
        '101170',
        x,
        y,
        z,
        v
    ) / 5;
}

/* AABPRICING_Facility_tpOneOffFee_title:'Risk Adjusted Return - Income - Credit Related Fee - One Off Fee ()' */
function Facility_tpOneOffFee_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Income - Credit Related Fee - One Off Fee ()';
}

/* AABPRICING_Facility_tpOneOffFeeAmount_value:Facility_tpOneOffFeeAmount2 */
function Facility_tpOneOffFeeAmount_value(f, x, y, z, v) {
    return Facility_tpOneOffFeeAmount2_value(
        '100582',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpOneOffFeeAmount_title:'Risk Adjusted Return - Income - Credit Related Fee - One Off Fee Amount ()' */
function Facility_tpOneOffFeeAmount_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Income - Credit Related Fee - One Off Fee Amount ()';
}

/* AABPRICING_Facility_tpOneOffFeeBp_value:Facility_tpOneOffFee/Facility_tpEAD*1e4 */
function Facility_tpOneOffFeeBp_value(f, x, y, z, v) {
    return Facility_tpOneOffFee_value(
        '101168',
        x,
        y,
        z,
        v
        ) /
        Facility_tpEAD_value(
            '101058',
            x,
            y,
            z,
            v
        ) * 1e4;
}

/* AABPRICING_Facility_tpOneOffFeeBp_title:'One Off Fee (Bp)' */
function Facility_tpOneOffFeeBp_title(f, x, y, z, v) {
    return 'One Off Fee (Bp)';
}

/* AABPRICING_Facility_tpUtilisationFee_value:If(Facility_tpRevolvingProduct,Facility_tpUtilisationFeeBp*Facility_tpExpectedAverageOutstanding*1e-4,0)*Facility_tpDeannualize */
function Facility_tpUtilisationFee_value(f, x, y, z, v) {
    return (
            Facility_tpRevolvingProduct_value(
                '100594',
                x,
                y,
                z,
                v
            ) ? Facility_tpUtilisationFeeBp_value(
                '101176',
                x,
                y,
                z,
                v
                ) *
                Facility_tpExpectedAverageOutstanding_value(
                    '100529',
                    x,
                    y,
                    z,
                    v
                ) * 1 - 4 : 0
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpUtilisationFee_title:'Utilisation Fee' */
function Facility_tpUtilisationFee_title(f, x, y, z, v) {
    return 'Utilisation Fee';
}

/* AABPRICING_Facility_tpUtilisationFeeBp_value:If(Facility_tpExpectedAverageOutstanding/Facility_tpLimit<=0,0,If(Facility_tpExpectedAverageOutstanding/Facility_tpLimit<=Facility_tpUtilisationFeeBpLimit1,0,If(Facility_tpExpectedAverageOutstanding/Facility_tpLimit<=Facility_tpUtilisationFeeBpLimit2,Facility_tpUtilisationFeeBpLimit1Bp,If(Facility_tpExpectedAverageOutstanding/Facility_tpLimit<=Facility_tpUtilisationFeeBpLimit3,Facility_tpUtilisationFeeBpLimit1Bp+Facility_tpUtilisationFeeBpLimit2Bp,If(Facility_tpExpectedAverageOutstanding/Facility_tpLimit<=Facility_tpUtilisationFeeBpLimit4,Facility_tpUtilisationFeeBpLimit1Bp+Facility_tpUtilisationFeeBpLimit2Bp+Facility_tpUtilisationFeeBpLimit3Bp,Facility_tpUtilisationFeeBpLimit1Bp+Facility_tpUtilisationFeeBpLimit2Bp+Facility_tpUtilisationFeeBpLimit3Bp+Facility_tpUtilisationFeeBpLimit4Bp))))) */
function Facility_tpUtilisationFeeBp_value(f, x, y, z, v) {
    return Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
    ) /
    Facility_tpLimit_value(
        '100638',
        x,
        y,
        z,
        v
    ) <=
    0 ? 0 : Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
    ) /
    Facility_tpLimit_value(
        '100638',
        x,
        y,
        z,
        v
    ) <=
    Facility_tpUtilisationFeeBpLimit1_value(
        '101178',
        x,
        y,
        z,
        v
    ) ? 0 : Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
    ) /
    Facility_tpLimit_value(
        '100638',
        x,
        y,
        z,
        v
    ) <=
    Facility_tpUtilisationFeeBpLimit2_value(
        '101180',
        x,
        y,
        z,
        v
    ) ? Facility_tpUtilisationFeeBpLimit1Bp_value(
        '101186',
        x,
        y,
        z,
        v
    ) : Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
    ) /
    Facility_tpLimit_value(
        '100638',
        x,
        y,
        z,
        v
    ) <=
    Facility_tpUtilisationFeeBpLimit3_value(
        '101182',
        x,
        y,
        z,
        v
    ) ? Facility_tpUtilisationFeeBpLimit1Bp_value(
        '101186',
        x,
        y,
        z,
        v
        ) +
        Facility_tpUtilisationFeeBpLimit2Bp_value(
            '101188',
            x,
            y,
            z,
            v
        ) : Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
    ) /
    Facility_tpLimit_value(
        '100638',
        x,
        y,
        z,
        v
    ) <=
    Facility_tpUtilisationFeeBpLimit4_value(
        '101184',
        x,
        y,
        z,
        v
    ) ? Facility_tpUtilisationFeeBpLimit1Bp_value(
        '101186',
        x,
        y,
        z,
        v
        ) +
        Facility_tpUtilisationFeeBpLimit2Bp_value(
            '101188',
            x,
            y,
            z,
            v
        ) +
        Facility_tpUtilisationFeeBpLimit3Bp_value(
            '101190',
            x,
            y,
            z,
            v
        ) : Facility_tpUtilisationFeeBpLimit1Bp_value(
        '101186',
        x,
        y,
        z,
        v
        ) +
        Facility_tpUtilisationFeeBpLimit2Bp_value(
            '101188',
            x,
            y,
            z,
            v
        ) +
        Facility_tpUtilisationFeeBpLimit3Bp_value(
            '101190',
            x,
            y,
            z,
            v
        ) +
        Facility_tpUtilisationFeeBpLimit4Bp_value(
            '101192',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpUtilisationFeeBp_title:'Utilisation Fee (Bps)' */
function Facility_tpUtilisationFeeBp_title(f, x, y, z, v) {
    return 'Utilisation Fee (Bps)';
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit1_value:0 */
function Facility_tpUtilisationFeeBpLimit1_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit1_title:'Utilisation Fee - utilization limit 1' */
function Facility_tpUtilisationFeeBpLimit1_title(f, x, y, z, v) {
    return 'Utilisation Fee - utilization limit 1';
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit2_value:.3333 */
function Facility_tpUtilisationFeeBpLimit2_value(f, x, y, z, v) {
    return .3333;
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit2_title:'Utilisation Fee - utilization limit 2' */
function Facility_tpUtilisationFeeBpLimit2_title(f, x, y, z, v) {
    return 'Utilisation Fee - utilization limit 2';
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit3_value:.5 */
function Facility_tpUtilisationFeeBpLimit3_value(f, x, y, z, v) {
    return .5;
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit3_title:'Utilisation Fee - utilization limit 3' */
function Facility_tpUtilisationFeeBpLimit3_title(f, x, y, z, v) {
    return 'Utilisation Fee - utilization limit 3';
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit4_value:.6667 */
function Facility_tpUtilisationFeeBpLimit4_value(f, x, y, z, v) {
    return .6667;
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit4_title:'Utilisation Fee - utilization limit 4' */
function Facility_tpUtilisationFeeBpLimit4_title(f, x, y, z, v) {
    return 'Utilisation Fee - utilization limit 4';
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit1Bp_value:0 */
function Facility_tpUtilisationFeeBpLimit1Bp_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit1Bp_title:'Utilisation Fee - utilization limit 1 - Bps' */
function Facility_tpUtilisationFeeBpLimit1Bp_title(f, x, y, z, v) {
    return 'Utilisation Fee - utilization limit 1 - Bps';
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit2Bp_value:0 */
function Facility_tpUtilisationFeeBpLimit2Bp_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit2Bp_title:'Utilisation Fee - utilization limit 2 - Bps' */
function Facility_tpUtilisationFeeBpLimit2Bp_title(f, x, y, z, v) {
    return 'Utilisation Fee - utilization limit 2 - Bps';
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit3Bp_value:0 */
function Facility_tpUtilisationFeeBpLimit3Bp_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit3Bp_title:'Utilisation Fee - utilization limit 3 - Bps' */
function Facility_tpUtilisationFeeBpLimit3Bp_title(f, x, y, z, v) {
    return 'Utilisation Fee - utilization limit 3 - Bps';
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit4Bp_value:0 */
function Facility_tpUtilisationFeeBpLimit4Bp_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Facility_tpUtilisationFeeBpLimit4Bp_title:'Utilisation Fee - utilization limit 4 - Bps' */
function Facility_tpUtilisationFeeBpLimit4Bp_title(f, x, y, z, v) {
    return 'Utilisation Fee - utilization limit 4 - Bps';
}

/* AABPRICING_Facility_tpInterestIncome_value:(Facility_tpCustomerSpread+Facility_tpCustomerSpreadAddMargin)*Facility_tpExpectedAverageOutstanding/1e4*Facility_tpDeannualize */
function Facility_tpInterestIncome_value(f, x, y, z, v) {
    return (
            Facility_tpCustomerSpread_value(
                '101195',
                x,
                y,
                z,
                v
            ) +
            Facility_tpCustomerSpreadAddMargin_value(
                '101197',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) / 1 *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpCustomerSpread_value:If(TargetRaRoRaCDriven,Round(Facility_tpRequiredInterestMarginBps,1),Facility_tpCustomerSpread2) */
function Facility_tpCustomerSpread_value(f, x, y, z, v) {
    return TargetRaRoRaCDriven_value(
        '100096',
        x,
        y.base,
        z,
        v
    ) ? Round(
        Facility_tpRequiredInterestMarginBps_value(
            '101020',
            x,
            y,
            z,
            v
        ),
        1
    ) : Facility_tpCustomerSpread2_value(
        '100578',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpCustomerSpread_title:'Customer Spread (Bp)' */
function Facility_tpCustomerSpread_title(f, x, y, z, v) {
    return 'Customer Spread (Bp)';
}

/* AABPRICING_Facility_tpCustomerSpreadAddMargin_value:MatrixLookup('AAB_Parameters.xls','CustomerSpreadAddMargin',Facility_tpProductinterestDetailsInterestProductName,1) */
function Facility_tpCustomerSpreadAddMargin_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CustomerSpreadAddMargin',
        Facility_tpProductinterestDetailsInterestProductName_value(
            '100508',
            x,
            y,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Facility_tpCustomerSpreadAddMargin_title:'Risk Adjusted Return - Income - Interest Income - Customer Spread Additional Margin (Bps)' */
function Facility_tpCustomerSpreadAddMargin_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Income - Interest Income - Customer Spread Additional Margin (Bps)';
}

/* AABPRICING_Facility_tpCommercialMargin_value:Facility_tpCustomerSpread-Facility_tpLiquiditySpreadBps */
function Facility_tpCommercialMargin_value(f, x, y, z, v) {
    return Facility_tpCustomerSpread_value(
        '101195',
        x,
        y,
        z,
        v
        ) -
        Facility_tpLiquiditySpreadBps_value(
            '101249',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpCommercialMargin_title:'Commercial Margin (Bp)' */
function Facility_tpCommercialMargin_title(f, x, y, z, v) {
    return 'Commercial Margin (Bp)';
}

/* AABPRICING_Facility_tpOptionCostsIndLiqPrem_value:Facility_tpIndirectLiquidityCosts+Facility_tpPipelineRisk+Facility_tpPrepaymentCosts */
function Facility_tpOptionCostsIndLiqPrem_value(f, x, y, z, v) {
    return Facility_tpIndirectLiquidityCosts_value(
        '101300',
        x,
        y,
        z,
        v
        ) +
        Facility_tpPipelineRisk_value(
            '101286',
            x,
            y,
            z,
            v
        ) +
        Facility_tpPrepaymentCosts_value(
            '101282',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpOptionCostsIndLiqPrem_title:'Option Costs/Ind. Liq. Costs' */
function Facility_tpOptionCostsIndLiqPrem_title(f, x, y, z, v) {
    return 'Option Costs/Ind. Liq. Costs';
}

/* AABPRICING_Facility_tpOtherExpenses_value:Facility_tpInternalExpectedLoss+Facility_tpOperationalCosts */
function Facility_tpOtherExpenses_value(f, x, y, z, v) {
    return Facility_tpInternalExpectedLoss_value(
        '101205',
        x,
        y,
        z,
        v
        ) +
        Facility_tpOperationalCosts_value(
            '101228',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpOtherExpenses_title:'Risk Adjusted Return - Other Expenses' */
function Facility_tpOtherExpenses_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses';
}

/* AABPRICING_Facility_tpInternalExpectedLoss_value:(Facility_tpInternalExpectedLossUnguaranteed+Facility_tpInternalExpectedLossGuaranteed)*Facility_tpDeannualize */
function Facility_tpInternalExpectedLoss_value(f, x, y, z, v) {
    return (
            Facility_tpInternalExpectedLossUnguaranteed_value(
                '101206',
                x,
                y,
                z,
                v
            ) +
            Facility_tpInternalExpectedLossGuaranteed_value(
                '101216',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpInternalExpectedLossUnguaranteed_value:Facility_tpEADUnguaranteed*Facility_tpBorrower_tpPD*Facility_tpLGD*Facility_tpELMultiplierRARUnguaranteed */
function Facility_tpInternalExpectedLossUnguaranteed_value(f, x, y, z, v) {
    return Facility_tpEADUnguaranteed_value(
        '101071',
        x,
        y,
        z,
        v
        ) *
        Facility_tpBorrower_tpPD_value(
            '100600',
            x,
            y,
            z,
            v
        ) *
        Facility_tpLGD_value(
            '100570',
            x,
            y,
            z,
            v
        ) *
        Facility_tpELMultiplierRARUnguaranteed_value(
            '101208',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpInternalExpectedLossUnguaranteed_title:'Risk Adjusted Return - Other Expenses - Internal Expected Loss - Unguaranteed' */
function Facility_tpInternalExpectedLossUnguaranteed_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Internal Expected Loss - Unguaranteed';
}

/* AABPRICING_Facility_tpELMultiplierRARUnguaranteed_value:If(Facility_tpRemainingAverageTenor-Facility_tpELMultiplierLowerM>0,MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDLowerMRARUnguaranteed,1)+(Facility_tpRemainingAverageTenor-Facility_tpELMultiplierLowerM)*(MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDUpperMRARUnguaranteed,1)-MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDLowerMRARUnguaranteed,1)),MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDRARUnguaranteed,1)) */
function Facility_tpELMultiplierRARUnguaranteed_value(f, x, y, z, v) {
    return Facility_tpRemainingAverageTenor_value(
        '100527',
        x,
        y,
        z,
        v
    ) -
    Facility_tpELMultiplierLowerM_value(
        '101121',
        x,
        y,
        z,
        v
    ) >
    0 ? MatrixLookup(
        'AAB_Parameters_ELMultiplier.xls',
        'ELMultiplier',
        Facility_tpELMultiplierIDLowerMRARUnguaranteed_value(
            '101212',
            x,
            y,
            z,
            v
        ),
        1
    ) + (
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) -
        Facility_tpELMultiplierLowerM_value(
            '101121',
            x,
            y,
            z,
            v
        )
    ) * (
        MatrixLookup(
            'AAB_Parameters_ELMultiplier.xls',
            'ELMultiplier',
            Facility_tpELMultiplierIDUpperMRARUnguaranteed_value(
                '101214',
                x,
                y,
                z,
                v
            ),
            1
        ) -
        MatrixLookup(
            'AAB_Parameters_ELMultiplier.xls',
            'ELMultiplier',
            Facility_tpELMultiplierIDLowerMRARUnguaranteed_value(
                '101212',
                x,
                y,
                z,
                v
            ),
            1
        )
    ) : MatrixLookup(
        'AAB_Parameters_ELMultiplier.xls',
        'ELMultiplier',
        Facility_tpELMultiplierIDRARUnguaranteed_value(
            '101210',
            x,
            y,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Facility_tpELMultiplierRARUnguaranteed_title:'Expected Loss Multiplier - Risk Adjusted Return - Unguaranteed' */
function Facility_tpELMultiplierRARUnguaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier - Risk Adjusted Return - Unguaranteed';
}

/* AABPRICING_Facility_tpELMultiplierIDRARUnguaranteed_value:EvaluateAsString(''+Borrower_tpRating+'_'+Str(If(Facility_tpRemainingAverageTenor+1>16,16,Facility_tpRemainingAverageTenor+1),0,0)+'_'+Str(RoundUp(Facility_tpLGD,2)*100,0,0)) */
function Facility_tpELMultiplierIDRARUnguaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpRemainingAverageTenor_value(
                '100527',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpRemainingAverageTenor_value(
                '100527',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGD_value(
                    '100570',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDRARUnguaranteed_title:'Expected Loss Multiplier ID - Risk Adjusted Return - Unguaranteed' */
function Facility_tpELMultiplierIDRARUnguaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID - Risk Adjusted Return - Unguaranteed';
}

/* AABPRICING_Facility_tpELMultiplierIDLowerMRARUnguaranteed_value:EvaluateAsString(''+Borrower_tpRating+'_'+Str(If(Facility_tpELMultiplierLowerM+1>16,16,Facility_tpELMultiplierLowerM+1),0,0)+'_'+Str(RoundUp(Facility_tpLGD,2)*100,0,0)) */
function Facility_tpELMultiplierIDLowerMRARUnguaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpELMultiplierLowerM_value(
                '101121',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpELMultiplierLowerM_value(
                '101121',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGD_value(
                    '100570',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDLowerMRARUnguaranteed_title:'Expected Loss Multiplier ID - Risk Adjusted Return - Unguaranteed - Lower M' */
function Facility_tpELMultiplierIDLowerMRARUnguaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID - Risk Adjusted Return - Unguaranteed - Lower M';
}

/* AABPRICING_Facility_tpELMultiplierIDUpperMRARUnguaranteed_value:EvaluateAsString(''+Borrower_tpRating+'_'+Str(If(Facility_tpELMultiplierUpperM+1>16,16,Facility_tpELMultiplierUpperM+1),0,0)+'_'+Str(RoundUp(Facility_tpLGD,2)*100,0,0)) */
function Facility_tpELMultiplierIDUpperMRARUnguaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpELMultiplierUpperM_value(
                '101123',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpELMultiplierUpperM_value(
                '101123',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGD_value(
                    '100570',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDUpperMRARUnguaranteed_title:'Expected Loss Multiplier ID - Risk Adjusted Return - Unguaranteed - Upper M' */
function Facility_tpELMultiplierIDUpperMRARUnguaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID - Risk Adjusted Return - Unguaranteed - Upper M';
}

/* AABPRICING_Facility_tpInternalExpectedLossGuaranteed_value:Facility_tpEADGuaranteed*Facility_tpJointPD*Facility_tpLGD*Facility_tpELMultiplierRARGuaranteed */
function Facility_tpInternalExpectedLossGuaranteed_value(f, x, y, z, v) {
    return Facility_tpEADGuaranteed_value(
        '101077',
        x,
        y,
        z,
        v
        ) *
        Facility_tpJointPD_value(
            '101226',
            x,
            y,
            z,
            v
        ) *
        Facility_tpLGD_value(
            '100570',
            x,
            y,
            z,
            v
        ) *
        Facility_tpELMultiplierRARGuaranteed_value(
            '101218',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpInternalExpectedLossGuaranteed_title:'Risk Adjusted Return - Other Expenses - Internal Expected Loss - Guaranteed' */
function Facility_tpInternalExpectedLossGuaranteed_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Internal Expected Loss - Guaranteed';
}

/* AABPRICING_Facility_tpELMultiplierRARGuaranteed_value:If(Facility_tpRemainingAverageTenor-Facility_tpELMultiplierLowerM>0,MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDLowerMRARGuaranteed,1)+(Facility_tpRemainingAverageTenor-Facility_tpELMultiplierLowerM)*(MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDUpperMRARGuaranteed,1)-MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDLowerMRARGuaranteed,1)),MatrixLookup('AAB_Parameters_ELMultiplier.xls','ELMultiplier',Facility_tpELMultiplierIDRARGuaranteed,1)) */
function Facility_tpELMultiplierRARGuaranteed_value(f, x, y, z, v) {
    return Facility_tpRemainingAverageTenor_value(
        '100527',
        x,
        y,
        z,
        v
    ) -
    Facility_tpELMultiplierLowerM_value(
        '101121',
        x,
        y,
        z,
        v
    ) >
    0 ? MatrixLookup(
        'AAB_Parameters_ELMultiplier.xls',
        'ELMultiplier',
        Facility_tpELMultiplierIDLowerMRARGuaranteed_value(
            '101222',
            x,
            y,
            z,
            v
        ),
        1
    ) + (
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) -
        Facility_tpELMultiplierLowerM_value(
            '101121',
            x,
            y,
            z,
            v
        )
    ) * (
        MatrixLookup(
            'AAB_Parameters_ELMultiplier.xls',
            'ELMultiplier',
            Facility_tpELMultiplierIDUpperMRARGuaranteed_value(
                '101224',
                x,
                y,
                z,
                v
            ),
            1
        ) -
        MatrixLookup(
            'AAB_Parameters_ELMultiplier.xls',
            'ELMultiplier',
            Facility_tpELMultiplierIDLowerMRARGuaranteed_value(
                '101222',
                x,
                y,
                z,
                v
            ),
            1
        )
    ) : MatrixLookup(
        'AAB_Parameters_ELMultiplier.xls',
        'ELMultiplier',
        Facility_tpELMultiplierIDRARGuaranteed_value(
            '101220',
            x,
            y,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Facility_tpELMultiplierRARGuaranteed_title:'Expected Loss Multiplier - Risk Adjusted Return - Guaranteed' */
function Facility_tpELMultiplierRARGuaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier - Risk Adjusted Return - Guaranteed';
}

/* AABPRICING_Facility_tpELMultiplierIDRARGuaranteed_value:EvaluateAsString(''+Facility_tpGuarantorRating+'_'+Str(If(Facility_tpRemainingAverageTenor+1>16,16,Facility_tpRemainingAverageTenor+1),0,0)+'_'+Str(RoundUp(Facility_tpLGD,2)*100,0,0)) */
function Facility_tpELMultiplierIDRARGuaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpRemainingAverageTenor_value(
                '100527',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpRemainingAverageTenor_value(
                '100527',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGD_value(
                    '100570',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDRARGuaranteed_title:'Expected Loss Multiplier ID - Risk Adjusted Return - Guaranteed' */
function Facility_tpELMultiplierIDRARGuaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID - Risk Adjusted Return - Guaranteed';
}

/* AABPRICING_Facility_tpELMultiplierIDLowerMRARGuaranteed_value:EvaluateAsString(''+Facility_tpGuarantorRating+'_'+Str(If(Facility_tpELMultiplierLowerM+1>16,16,Facility_tpELMultiplierLowerM+1),0,0)+'_'+Str(RoundUp(Facility_tpLGD,2)*100,0,0)) */
function Facility_tpELMultiplierIDLowerMRARGuaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpELMultiplierLowerM_value(
                '101121',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpELMultiplierLowerM_value(
                '101121',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGD_value(
                    '100570',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDLowerMRARGuaranteed_title:'Expected Loss Multiplier ID - Risk Adjusted Return - Guaranteed - Lower M' */
function Facility_tpELMultiplierIDLowerMRARGuaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID - Risk Adjusted Return - Guaranteed - Lower M';
}

/* AABPRICING_Facility_tpELMultiplierIDUpperMRARGuaranteed_value:EvaluateAsString(''+Facility_tpGuarantorRating+'_'+Str(If(Facility_tpELMultiplierUpperM+1>16,16,Facility_tpELMultiplierUpperM+1),0,0)+'_'+Str(RoundUp(Facility_tpLGD,2)*100,0,0)) */
function Facility_tpELMultiplierIDUpperMRARGuaranteed_value(f, x, y, z, v) {
    return String(
        '' +
        Facility_tpGuarantorRating_value(
            '100963',
            x,
            y,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpELMultiplierUpperM_value(
                '101123',
                x,
                y,
                z,
                v
            ) + 1 >
            16 ? 16 : Facility_tpELMultiplierUpperM_value(
                '101123',
                x,
                y,
                z,
                v
            ) + 1,
            0,
            0
        ) + '_' +
        Str(
            RoundUp(
                Facility_tpLGD_value(
                    '100570',
                    x,
                    y,
                    z,
                    v
                ),
                2
            ) * 100,
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpELMultiplierIDUpperMRARGuaranteed_title:'Expected Loss Multiplier ID - Risk Adjusted Return - Guaranteed - Upper M' */
function Facility_tpELMultiplierIDUpperMRARGuaranteed_title(f, x, y, z, v) {
    return 'Expected Loss Multiplier ID - Risk Adjusted Return - Guaranteed - Upper M';
}

/* AABPRICING_Facility_tpJointPD_value:BivarNormal(InvNormal(Facility_tpBorrower_tpPD),InvNormal(Facility_tpGuarantorPD),Facility_tpIntraSectorCorrelationBorrower*Facility_tpIntraSectorCorrelationGuarantor*Facility_tpEquityCorrelation) */
function Facility_tpJointPD_value(f, x, y, z, v) {
    return BivarNormal(
        InvNormal(
            Facility_tpBorrower_tpPD_value(
                '100600',
                x,
                y,
                z,
                v
            )
        ),
        InvNormal(
            Facility_tpGuarantorPD_value(
                '100968',
                x,
                y,
                z,
                v
            )
        ),
        Facility_tpIntraSectorCorrelationBorrower_value(
            '101147',
            x,
            y,
            z,
            v
        ) *
        Facility_tpIntraSectorCorrelationGuarantor_value(
            '101149',
            x,
            y,
            z,
            v
        ) *
        Facility_tpEquityCorrelation_value(
            '101153',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpJointPD_title:'Joint PD' */
function Facility_tpJointPD_title(f, x, y, z, v) {
    return 'Joint PD';
}

/* AABPRICING_Facility_tpOperationalCosts_value:Facility_tpCostOverVolume+Facility_tpCostPerServiceConcept+Facility_tpCostPerContract */
function Facility_tpOperationalCosts_value(f, x, y, z, v) {
    return Facility_tpCostOverVolume_value(
        '101233',
        x,
        y,
        z,
        v
        ) +
        Facility_tpCostPerServiceConcept_value(
            '101237',
            x,
            y,
            z,
            v
        ) +
        Facility_tpCostPerContract_value(
            '101229',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpCostPerContract_value:MatrixLookup('AAB_Parameters.xls','CostPerContract',Facility_tpCostPerContractID,5)*Facility_tpDeannualize */
function Facility_tpCostPerContract_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CostPerContract',
        Facility_tpCostPerContractID_value(
            '101231',
            x,
            y,
            z,
            v
        ),
        5
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpCostPerContract_title:'Risk Adjusted Return - Other Expenses - Operational Costs - Cost per Contract' */
function Facility_tpCostPerContract_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Operational Costs - Cost per Contract';
}

/* AABPRICING_Facility_tpCostPerContractID_value:EvaluateAsString(Facility_tpType+'_'+Borrower_tpRating+'_'+Borrower_tpClientGroup) */
function Facility_tpCostPerContractID_value(f, x, y, z, v) {
    return String(
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ) + '_' +
        Borrower_tpRating_value(
            '100238',
            x,
            y.base,
            z,
            v
        ) + '_' +
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpCostPerContractID_title:'Risk Adjusted Return - Other Expenses - Operational Costs - Cost per Contract ID' */
function Facility_tpCostPerContractID_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Operational Costs - Cost per Contract ID';
}

/* AABPRICING_Facility_tpCostOverVolume_value:Facility_tpExpectedAverageOutstanding*(Facility_tpCostOverVolumeBp/1e4)*Facility_tpDeannualize */
function Facility_tpCostOverVolume_value(f, x, y, z, v) {
    return Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
        ) * (
            Facility_tpCostOverVolumeBp_value(
                '101235',
                x,
                y,
                z,
                v
            ) / 1e4
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpCostOverVolume_title:'Risk Adjusted Return - Other Expenses - Operational Costs - Cost over Volume' */
function Facility_tpCostOverVolume_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Operational Costs - Cost over Volume';
}

/* AABPRICING_Facility_tpCostOverVolumeBp_value:MatrixLookup('AAB_Parameters.xls','CostOverVolume',Facility_tpType+'_'+Borrower_tpClientGroup,3) */
function Facility_tpCostOverVolumeBp_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CostOverVolume',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ) + '_' +
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Facility_tpCostOverVolumeBp_title:'Risk Adjusted Return - Other Expenses - Operational Costs - Cost over Volume (Bps)' */
function Facility_tpCostOverVolumeBp_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Operational Costs - Cost over Volume (Bps)';
}

/* AABPRICING_Facility_tpCostPerServiceConcept_value:If(Borrower_tpSumExpectedAverageOutstanding==0,Borrower_tpFixedCostOperatingConcept*Facility_tpPercentageOperatingConcept/Borrower_tpNrOfFacilities,Borrower_tpFixedCostOperatingConcept*Facility_tpPercentageOperatingConcept/Borrower_tpSumExpectedAverageOutstanding*Facility_tpExpectedAverageOutstanding) */
function Facility_tpCostPerServiceConcept_value(f, x, y, z, v) {
    return Borrower_tpSumExpectedAverageOutstanding_value(
        '100266',
        x,
        y.base,
        z,
        v
    ) ==
    0 ? Borrower_tpFixedCostOperatingConcept_value(
        '100278',
        x,
        y.base,
        z,
        v
        ) *
        Facility_tpPercentageOperatingConcept_value(
            '101239',
            x,
            y,
            z,
            v
        ) /
        Borrower_tpNrOfFacilities_value(
            '100268',
            x,
            y.base,
            z,
            v
        ) : Borrower_tpFixedCostOperatingConcept_value(
        '100278',
        x,
        y.base,
        z,
        v
        ) *
        Facility_tpPercentageOperatingConcept_value(
            '101239',
            x,
            y,
            z,
            v
        ) /
        Borrower_tpSumExpectedAverageOutstanding_value(
            '100266',
            x,
            y.base,
            z,
            v
        ) *
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpCostPerServiceConcept_title:'Risk Adjusted Return - Other Expenses - Operational Costs - Cost per Service Concept' */
function Facility_tpCostPerServiceConcept_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Operational Costs - Cost per Service Concept';
}

/* AABPRICING_Facility_tpPercentageOperatingConcept_value:AgreementPercentageOperatingConcept */
function Facility_tpPercentageOperatingConcept_value(f, x, y, z, v) {
    return AgreementPercentageOperatingConcept_value(
        '100114',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Facility_tpPercentageOperatingConcept_title:'Risk Adjusted Return - Other Expenses - Operational Costs - Cost per Service Concept - Percentage Operating Concept' */
function Facility_tpPercentageOperatingConcept_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Other Expenses - Operational Costs - Cost per Service Concept - Percentage Operating Concept';
}

/* AABPRICING_Facility_tpTax_value:OnER((Facility_tpCreditIncome-Facility_tpInternalExpectedLoss-Facility_tpOperationalCosts-Facility_tpInterestExpenses)*Borrower_tpTaxRate,NA) */
function Facility_tpTax_value(f, x, y, z, v) {
    return OnER(
        (
            Facility_tpCreditIncome_value(
                '101160',
                x,
                y,
                z,
                v
            ) -
            Facility_tpInternalExpectedLoss_value(
                '101205',
                x,
                y,
                z,
                v
            ) -
            Facility_tpOperationalCosts_value(
                '101228',
                x,
                y,
                z,
                v
            ) -
            Facility_tpInterestExpenses_value(
                '101242',
                x,
                y,
                z,
                v
            )
        ) *
        Borrower_tpTaxRate_value(
            '100236',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpInterestExpenses_value:Facility_tpFundsTransferPricing+Facility_tpIndirectLiquidityCosts+Facility_tpSubordinatedDebtCapitalCharge-Facility_tpEquityFundingAdjustment */
function Facility_tpInterestExpenses_value(f, x, y, z, v) {
    return Facility_tpFundsTransferPricing_value(
        '101244',
        x,
        y,
        z,
        v
        ) +
        Facility_tpIndirectLiquidityCosts_value(
            '101300',
            x,
            y,
            z,
            v
        ) +
        Facility_tpSubordinatedDebtCapitalCharge_value(
            '101367',
            x,
            y,
            z,
            v
        ) -
        Facility_tpEquityFundingAdjustment_value(
            '101372',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpInterestExpenses_title:'Risk Adjusted Return - Interest Expenses' */
function Facility_tpInterestExpenses_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses';
}

/* AABPRICING_Facility_tpFundsTransferPricing_value:Facility_tpDirectLiquidityPremium+Facility_tpPrepaymentCosts+Facility_tpPipelineRisk */
function Facility_tpFundsTransferPricing_value(f, x, y, z, v) {
    return Facility_tpDirectLiquidityPremium_value(
        '101248',
        x,
        y,
        z,
        v
        ) +
        Facility_tpPrepaymentCosts_value(
            '101282',
            x,
            y,
            z,
            v
        ) +
        Facility_tpPipelineRisk_value(
            '101286',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpFundsTransferPricing_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing' */
function Facility_tpFundsTransferPricing_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing';
}

/* AABPRICING_Facility_tpBaseRate_value:Facility_tpBaseRate2 */
function Facility_tpBaseRate_value(f, x, y, z, v) {
    return Facility_tpBaseRate2_value(
        '100523',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpBaseRate_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Base Rate (Bps)' */
function Facility_tpBaseRate_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Base Rate (Bps)';
}

/* AABPRICING_Facility_tpDirectLiquidityPremium_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,4)==0,0,Facility_tpExpectedAverageOutstanding*Facility_tpLiquiditySpreadBps/1e4) */
function Facility_tpDirectLiquidityPremium_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        4
    ) ==
    0 ? 0 : Facility_tpExpectedAverageOutstanding_value(
        '100529',
        x,
        y,
        z,
        v
        ) *
        Facility_tpLiquiditySpreadBps_value(
            '101249',
            x,
            y,
            z,
            v
        ) / 1e4;
}

/* AABPRICING_Facility_tpLiquiditySpreadBps_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,4)==0,0,If(Facility_tpOriginalTenor<12,Facility_tpLiquiditySpreadBpsUnder1year,Facility_tpLiquiditySpreadBpsGeneral)) */
function Facility_tpLiquiditySpreadBps_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        4
    ) ==
    0 ? 0 : Facility_tpOriginalTenor_value(
        '100611',
        x,
        y,
        z,
        v
    ) <
    12 ? Facility_tpLiquiditySpreadBpsUnder1year_value(
        '101251',
        x,
        y,
        z,
        v
    ) : Facility_tpLiquiditySpreadBpsGeneral_value(
        '101253',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpLiquiditySpreadBps_title:'Liquidity Spread (Bp)' */
function Facility_tpLiquiditySpreadBps_title(f, x, y, z, v) {
    return 'Liquidity Spread (Bp)';
}

/* AABPRICING_Facility_tpLiquiditySpreadBpsUnder1year_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,9)==1,Facility_tpLiquiditySpreadRevolvingCredit,If(Facility_tpRepaymentChoice==0&&Facility_tpWithdrawalChoice==0,Facility_tpLiquiditySpreadRepaymentBullet/Facility_tpExpectedAverageOutstanding,If(Facility_tpRepaymentChoice==1&&Facility_tpWithdrawalChoice==0,Facility_tpLiquiditySpreadRepaymentLinear/Facility_tpExpectedAverageOutstanding,If(Facility_tpRepaymentChoice==2&&Facility_tpWithdrawalChoice==0,Facility_tpLiquiditySpreadRepaymentAnnuity/Facility_tpExpectedAverageOutstanding,If(Facility_tpRepaymentChoice==3&&Facility_tpWithdrawalChoice==0,Facility_tpLiquiditySpreadRepaymentScheme/Facility_tpExpectedAverageOutstanding,If(Facility_tpRepaymentChoice==0&&Facility_tpWithdrawalChoice==3,(Facility_tpLiquiditySpreadRepaymentBullet-Facility_tpLiquiditySpreadWithdrawalScheme)/Facility_tpExpectedAverageOutstanding,If(Facility_tpRepaymentChoice==1&&Facility_tpWithdrawalChoice==3,(Facility_tpLiquiditySpreadRepaymentLinear-Facility_tpLiquiditySpreadWithdrawalScheme)/Facility_tpExpectedAverageOutstanding,If(Facility_tpRepaymentChoice==2&&Facility_tpWithdrawalChoice==3,(Facility_tpLiquiditySpreadRepaymentAnnuity-Facility_tpLiquiditySpreadWithdrawalScheme)/Facility_tpExpectedAverageOutstanding,If(Facility_tpRepaymentChoice==3&&Facility_tpWithdrawalChoice==3,(Facility_tpLiquiditySpreadRepaymentScheme-Facility_tpLiquiditySpreadWithdrawalScheme)/Facility_tpExpectedAverageOutstanding,NA))))))))) */
function Facility_tpLiquiditySpreadBpsUnder1year_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        9
    ) ==
    1 ? Facility_tpLiquiditySpreadRevolvingCredit_value(
        '101281',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpLiquiditySpreadRepaymentBullet_value(
        '101263',
        x,
        y,
        z,
        v
        ) /
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpLiquiditySpreadRepaymentLinear_value(
        '101267',
        x,
        y,
        z,
        v
        ) /
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 2 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpLiquiditySpreadRepaymentAnnuity_value(
        '101271',
        x,
        y,
        z,
        v
        ) /
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpLiquiditySpreadRepaymentScheme_value(
        '101275',
        x,
        y,
        z,
        v
        ) /
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? (
            Facility_tpLiquiditySpreadRepaymentBullet_value(
                '101263',
                x,
                y,
                z,
                v
            ) -
            Facility_tpLiquiditySpreadWithdrawalScheme_value(
                '101279',
                x,
                y,
                z,
                v
            )
        ) /
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? (
            Facility_tpLiquiditySpreadRepaymentLinear_value(
                '101267',
                x,
                y,
                z,
                v
            ) -
            Facility_tpLiquiditySpreadWithdrawalScheme_value(
                '101279',
                x,
                y,
                z,
                v
            )
        ) /
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 2 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? (
            Facility_tpLiquiditySpreadRepaymentAnnuity_value(
                '101271',
                x,
                y,
                z,
                v
            ) -
            Facility_tpLiquiditySpreadWithdrawalScheme_value(
                '101279',
                x,
                y,
                z,
                v
            )
        ) /
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? (
            Facility_tpLiquiditySpreadRepaymentScheme_value(
                '101275',
                x,
                y,
                z,
                v
            ) -
            Facility_tpLiquiditySpreadWithdrawalScheme_value(
                '101279',
                x,
                y,
                z,
                v
            )
        ) /
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) : NA;
}

/* AABPRICING_Facility_tpLiquiditySpreadBpsUnder1year_title:'Liquidity Spread (Bp) Under 1 Year' */
function Facility_tpLiquiditySpreadBpsUnder1year_title(f, x, y, z, v) {
    return 'Liquidity Spread (Bp) Under 1 Year';
}

/* AABPRICING_Facility_tpLiquiditySpreadBpsGeneral_value:If(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,9)==1,Facility_tpLiquiditySpreadRevolvingCredit,If(Facility_tpRepaymentChoice==0&&Facility_tpWithdrawalChoice==0,Facility_tpLiquiditySpreadRepaymentBullet/Facility_tpWeightedFundingRepaymentBullet,If(Facility_tpRepaymentChoice==1&&Facility_tpWithdrawalChoice==0,Facility_tpLiquiditySpreadRepaymentLinear/Facility_tpWeightedFundingRepaymentLinear,If(Facility_tpRepaymentChoice==2&&Facility_tpWithdrawalChoice==0,Facility_tpLiquiditySpreadRepaymentAnnuity/Facility_tpWeightedFundingRepaymentAnnuity,If(Facility_tpRepaymentChoice==3&&Facility_tpWithdrawalChoice==0,Facility_tpLiquiditySpreadRepaymentScheme/Facility_tpWeightedFundingRepaymentScheme,If(Facility_tpRepaymentChoice==0&&Facility_tpWithdrawalChoice==3,(Facility_tpLiquiditySpreadRepaymentBullet-Facility_tpLiquiditySpreadWithdrawalScheme)/(Facility_tpWeightedFundingRepaymentBullet-Facility_tpWeightedFundingWithdrawalScheme),If(Facility_tpRepaymentChoice==1&&Facility_tpWithdrawalChoice==3,(Facility_tpLiquiditySpreadRepaymentLinear-Facility_tpLiquiditySpreadWithdrawalScheme)/(Facility_tpWeightedFundingRepaymentLinear-Facility_tpWeightedFundingWithdrawalScheme),If(Facility_tpRepaymentChoice==2&&Facility_tpWithdrawalChoice==3,(Facility_tpLiquiditySpreadRepaymentAnnuity-Facility_tpLiquiditySpreadWithdrawalScheme)/(Facility_tpWeightedFundingRepaymentAnnuity-Facility_tpWeightedFundingWithdrawalScheme),If(Facility_tpRepaymentChoice==3&&Facility_tpWithdrawalChoice==3,(Facility_tpLiquiditySpreadRepaymentScheme-Facility_tpLiquiditySpreadWithdrawalScheme)/(Facility_tpWeightedFundingRepaymentScheme-Facility_tpWeightedFundingWithdrawalScheme),NA))))))))) */
function Facility_tpLiquiditySpreadBpsGeneral_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        9
    ) ==
    1 ? Facility_tpLiquiditySpreadRevolvingCredit_value(
        '101281',
        x,
        y,
        z,
        v
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpLiquiditySpreadRepaymentBullet_value(
        '101263',
        x,
        y,
        z,
        v
        ) /
        Facility_tpWeightedFundingRepaymentBullet_value(
            '101261',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpLiquiditySpreadRepaymentLinear_value(
        '101267',
        x,
        y,
        z,
        v
        ) /
        Facility_tpWeightedFundingRepaymentLinear_value(
            '101265',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 2 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpLiquiditySpreadRepaymentAnnuity_value(
        '101271',
        x,
        y,
        z,
        v
        ) /
        Facility_tpWeightedFundingRepaymentAnnuity_value(
            '101269',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpLiquiditySpreadRepaymentScheme_value(
        '101275',
        x,
        y,
        z,
        v
        ) /
        Facility_tpWeightedFundingRepaymentScheme_value(
            '101273',
            x,
            y,
            z,
            v
        ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? (
        Facility_tpLiquiditySpreadRepaymentBullet_value(
            '101263',
            x,
            y,
            z,
            v
        ) -
        Facility_tpLiquiditySpreadWithdrawalScheme_value(
            '101279',
            x,
            y,
            z,
            v
        )
    ) / (
        Facility_tpWeightedFundingRepaymentBullet_value(
            '101261',
            x,
            y,
            z,
            v
        ) -
        Facility_tpWeightedFundingWithdrawalScheme_value(
            '101277',
            x,
            y,
            z,
            v
        )
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? (
        Facility_tpLiquiditySpreadRepaymentLinear_value(
            '101267',
            x,
            y,
            z,
            v
        ) -
        Facility_tpLiquiditySpreadWithdrawalScheme_value(
            '101279',
            x,
            y,
            z,
            v
        )
    ) / (
        Facility_tpWeightedFundingRepaymentLinear_value(
            '101265',
            x,
            y,
            z,
            v
        ) -
        Facility_tpWeightedFundingWithdrawalScheme_value(
            '101277',
            x,
            y,
            z,
            v
        )
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 2 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? (
        Facility_tpLiquiditySpreadRepaymentAnnuity_value(
            '101271',
            x,
            y,
            z,
            v
        ) -
        Facility_tpLiquiditySpreadWithdrawalScheme_value(
            '101279',
            x,
            y,
            z,
            v
        )
    ) / (
        Facility_tpWeightedFundingRepaymentAnnuity_value(
            '101269',
            x,
            y,
            z,
            v
        ) -
        Facility_tpWeightedFundingWithdrawalScheme_value(
            '101277',
            x,
            y,
            z,
            v
        )
    ) : Facility_tpRepaymentChoice_value(
        '100659',
        x,
        y,
        z,
        v
    ) == 3 &&
    Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? (
        Facility_tpLiquiditySpreadRepaymentScheme_value(
            '101275',
            x,
            y,
            z,
            v
        ) -
        Facility_tpLiquiditySpreadWithdrawalScheme_value(
            '101279',
            x,
            y,
            z,
            v
        )
    ) / (
        Facility_tpWeightedFundingRepaymentScheme_value(
            '101273',
            x,
            y,
            z,
            v
        ) -
        Facility_tpWeightedFundingWithdrawalScheme_value(
            '101277',
            x,
            y,
            z,
            v
        )
    ) : NA;
}

/* AABPRICING_Facility_tpLiquiditySpreadBpsGeneral_title:'Liquidity Spread (Bp) On Weighted Funding Amount' */
function Facility_tpLiquiditySpreadBpsGeneral_title(f, x, y, z, v) {
    return 'Liquidity Spread (Bp) On Weighted Funding Amount';
}

/* AABPRICING_Facility_tpRepaymentFrequencyLiqSpread_value:If(Facility_tpWithdrawalChoice==3,12,Facility_tpRepaymentFrequency) */
function Facility_tpRepaymentFrequencyLiqSpread_value(f, x, y, z, v) {
    return Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) ==
    3 ? 12 : Facility_tpRepaymentFrequency_value(
        '100662',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpRepaymentFrequencyLiqSpread_title:'Repayment Frequency for liquidity spread calc' */
function Facility_tpRepaymentFrequencyLiqSpread_title(f, x, y, z, v) {
    return 'Repayment Frequency for liquidity spread calc';
}

/* AABPRICING_Facility_tpConvertToMonths_value:If(Facility_tpWithdrawalChoice==3,12/Facility_tpRepaymentFrequency,1) */
function Facility_tpConvertToMonths_value(f, x, y, z, v) {
    return Facility_tpWithdrawalChoice_value(
        '100656',
        x,
        y,
        z,
        v
    ) == 3 ? 12 /
        Facility_tpRepaymentFrequency_value(
            '100662',
            x,
            y,
            z,
            v
        ) : 1;
}

/* AABPRICING_Facility_tpConvertToMonths_title:'Convert X to months for scheme withdrawal&&repayment' */
function Facility_tpConvertToMonths_title(f, x, y, z, v) {
    return 'Convert X to months for scheme withdrawal&&repayment';
}

/* AABPRICING_Facility_tpGracePeriodInPeriods_value:RoundUp(Facility_tpGracePeriod/(12/Facility_tpRepaymentFrequency),0) */
function Facility_tpGracePeriodInPeriods_value(f, x, y, z, v) {
    return RoundUp(
        Facility_tpGracePeriod_value(
            '100672',
            x,
            y,
            z,
            v
        ) / (
            12 /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            )
        ),
        0
    );
}

/* AABPRICING_Facility_tpGracePeriodInPeriods_title:'Grace period expressed in periods (rounded up)' */
function Facility_tpGracePeriodInPeriods_title(f, x, y, z, v) {
    return 'Grace period expressed in periods (rounded up)';
}

/* AABPRICING_Facility_tpWeightedFundingRepaymentBullet_value:Facility_tpPrincipalLimit*Facility_tpOriginalTenor/12 */
function Facility_tpWeightedFundingRepaymentBullet_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) *
        Facility_tpOriginalTenor_value(
            '100611',
            x,
            y,
            z,
            v
        ) / 12;
}

/* AABPRICING_Facility_tpWeightedFundingRepaymentBullet_title:'Weighted Funding Repayment Bullet' */
function Facility_tpWeightedFundingRepaymentBullet_title(f, x, y, z, v) {
    return 'Weighted Funding Repayment Bullet';
}

/* AABPRICING_Facility_tpLiquiditySpreadRepaymentBullet_value:Facility_tpPrincipalLimit*Facility_tpOriginalTenor/12*(MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpOriginalTenor,1),Facility_tpFixedInterestPeriod)+(MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',Facility_tpOriginalTenor,1),Facility_tpFixedInterestPeriod)-MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpOriginalTenor,1),Facility_tpFixedInterestPeriod))*OnER((Facility_tpOriginalTenor-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpOriginalTenor,1))/(MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',Facility_tpOriginalTenor,1)-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',Facility_tpOriginalTenor,1)),0)) */
function Facility_tpLiquiditySpreadRepaymentBullet_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
        ) *
        Facility_tpOriginalTenor_value(
            '100611',
            x,
            y,
            z,
            v
        ) / 12 * (
            MatrixLookup(
                'AAB_Parameters.xls',
                Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorLowerBound',
                    Facility_tpOriginalTenor_value(
                        '100611',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ),
                Facility_tpFixedInterestPeriod_value(
                    '100513',
                    x,
                    y,
                    z,
                    v
                )
            ) + (
                MatrixLookup(
                    'AAB_Parameters.xls',
                    Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorUpperBound',
                        Facility_tpOriginalTenor_value(
                            '100611',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    ),
                    Facility_tpFixedInterestPeriod_value(
                        '100513',
                        x,
                        y,
                        z,
                        v
                    )
                ) -
                MatrixLookup(
                    'AAB_Parameters.xls',
                    Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorLowerBound',
                        Facility_tpOriginalTenor_value(
                            '100611',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    ),
                    Facility_tpFixedInterestPeriod_value(
                        '100513',
                        x,
                        y,
                        z,
                        v
                    )
                )
            ) *
            OnER(
                (
                    Facility_tpOriginalTenor_value(
                        '100611',
                        x,
                        y,
                        z,
                        v
                    ) -
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorLowerBound',
                        Facility_tpOriginalTenor_value(
                            '100611',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    )
                ) / (
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorUpperBound',
                        Facility_tpOriginalTenor_value(
                            '100611',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    ) -
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorLowerBound',
                        Facility_tpOriginalTenor_value(
                            '100611',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    )
                ),
                0
            )
        );
}

/* AABPRICING_Facility_tpLiquiditySpreadRepaymentBullet_title:'Liquidity Spread Repayment Bullet' */
function Facility_tpLiquiditySpreadRepaymentBullet_title(f, x, y, z, v) {
    return 'Liquidity Spread Repayment Bullet';
}

/* AABPRICING_Facility_tpWeightedFundingRepaymentLinear_value:SumFor(X,1+Facility_tpGracePeriodInPeriods,Facility_tpNumberOfPeriodsNoGrace,1,Facility_tpLinear*(X*Facility_tpConvertToMonths/Facility_tpRepaymentFrequencyLiqSpread)) */
function Facility_tpWeightedFundingRepaymentLinear_value(f, x, y, z, v) {
    return SumFor(
        X,
        1 +
        Facility_tpGracePeriodInPeriods_value(
            '101259',
            x,
            y,
            z,
            v
        ),
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ),
        1,
        Facility_tpLinear_value(
            '100836',
            x,
            y,
            z,
            v
        ) * (
            X *
            Facility_tpConvertToMonths_value(
                '101257',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequencyLiqSpread_value(
                '101255',
                x,
                y,
                z,
                v
            )
        )
    );
}

/* AABPRICING_Facility_tpWeightedFundingRepaymentLinear_title:'Weighted Funding Repayment Linear' */
function Facility_tpWeightedFundingRepaymentLinear_title(f, x, y, z, v) {
    return 'Weighted Funding Repayment Linear';
}

/* AABPRICING_Facility_tpLiquiditySpreadRepaymentLinear_value:SumFor(X,1+Facility_tpGracePeriodInPeriods,Facility_tpNumberOfPeriodsNoGrace,1,Facility_tpLinear*(X*Facility_tpConvertToMonths/Facility_tpRepaymentFrequencyLiqSpread)*(MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',X*12/Facility_tpRepaymentFrequency,1),Facility_tpFixedInterestPeriod)+(MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',X*12/Facility_tpRepaymentFrequency,1),Facility_tpFixedInterestPeriod)-MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',X*12/Facility_tpRepaymentFrequency,1),Facility_tpFixedInterestPeriod))*OnER((X*12/Facility_tpRepaymentFrequency-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',X*12/Facility_tpRepaymentFrequency,1))/(MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',X*12/Facility_tpRepaymentFrequency,1)-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',X*12/Facility_tpRepaymentFrequency,1)),0))) */
function Facility_tpLiquiditySpreadRepaymentLinear_value(f, x, y, z, v) {
    return SumFor(
        X,
        1 +
        Facility_tpGracePeriodInPeriods_value(
            '101259',
            x,
            y,
            z,
            v
        ),
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ),
        1,
        Facility_tpLinear_value(
            '100836',
            x,
            y,
            z,
            v
        ) * (
            X *
            Facility_tpConvertToMonths_value(
                '101257',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequencyLiqSpread_value(
                '101255',
                x,
                y,
                z,
                v
            )
        ) * (
            MatrixLookup(
                'AAB_Parameters.xls',
                Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorLowerBound',
                    X * 12 /
                    Facility_tpRepaymentFrequency_value(
                        '100662',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ),
                Facility_tpFixedInterestPeriod_value(
                    '100513',
                    x,
                    y,
                    z,
                    v
                )
            ) + (
                MatrixLookup(
                    'AAB_Parameters.xls',
                    Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorUpperBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    ),
                    Facility_tpFixedInterestPeriod_value(
                        '100513',
                        x,
                        y,
                        z,
                        v
                    )
                ) -
                MatrixLookup(
                    'AAB_Parameters.xls',
                    Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorLowerBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    ),
                    Facility_tpFixedInterestPeriod_value(
                        '100513',
                        x,
                        y,
                        z,
                        v
                    )
                )
            ) *
            OnER(
                (
                    X * 12 /
                    Facility_tpRepaymentFrequency_value(
                        '100662',
                        x,
                        y,
                        z,
                        v
                    ) -
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorLowerBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    )
                ) / (
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorUpperBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    ) -
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorLowerBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    )
                ),
                0
            )
        )
    );
}

/* AABPRICING_Facility_tpLiquiditySpreadRepaymentLinear_title:'Liquidity Spread Repayment Linear' */
function Facility_tpLiquiditySpreadRepaymentLinear_title(f, x, y, z, v) {
    return 'Liquidity Spread Repayment Linear';
}

/* AABPRICING_Facility_tpWeightedFundingRepaymentAnnuity_value:SumFor(X,1+Facility_tpGracePeriodInPeriods,Facility_tpNumberOfPeriodsNoGrace,1,PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,X-Facility_tpGracePeriodInPeriods,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon)*(X*Facility_tpConvertToMonths/Facility_tpRepaymentFrequencyLiqSpread)) */
function Facility_tpWeightedFundingRepaymentAnnuity_value(f, x, y, z, v) {
    return SumFor(
        X,
        1 +
        Facility_tpGracePeriodInPeriods_value(
            '101259',
            x,
            y,
            z,
            v
        ),
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ),
        1,
        PPMT(
            Facility_tpAnnuityInterestRate_value(
                '100668',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            X -
            Facility_tpGracePeriodInPeriods_value(
                '101259',
                x,
                y,
                z,
                v
            ),
            Facility_tpNumberOfPeriods_value(
                '100652',
                x,
                y,
                z,
                v
            ),
            -Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ),
            Facility_tpBalloon_value(
                '100670',
                x,
                y,
                z,
                v
            )
        ) * (
            X *
            Facility_tpConvertToMonths_value(
                '101257',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequencyLiqSpread_value(
                '101255',
                x,
                y,
                z,
                v
            )
        )
    );
}

/* AABPRICING_Facility_tpWeightedFundingRepaymentAnnuity_title:'Weighted Funding Repayment Annuity' */
function Facility_tpWeightedFundingRepaymentAnnuity_title(f, x, y, z, v) {
    return 'Weighted Funding Repayment Annuity';
}

/* AABPRICING_Facility_tpLiquiditySpreadRepaymentAnnuity_value:SumFor(X,1+Facility_tpGracePeriodInPeriods,Facility_tpNumberOfPeriodsNoGrace,1,PPMT(Facility_tpAnnuityInterestRate/Facility_tpRepaymentFrequency,X-Facility_tpGracePeriodInPeriods,Facility_tpNumberOfPeriods,-Facility_tpPrincipalLimit,Facility_tpBalloon)*(X*Facility_tpConvertToMonths/Facility_tpRepaymentFrequencyLiqSpread)*(MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',X*12/Facility_tpRepaymentFrequency,1),Facility_tpFixedInterestPeriod)+(MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',X*12/Facility_tpRepaymentFrequency,1),Facility_tpFixedInterestPeriod)-MatrixLookup('AAB_Parameters.xls',If(Facility_tpBaseCurrency=='EUR','LiquidityPremiumEUR',If(Facility_tpBaseCurrency=='GBP','LiquidityPremiumGBP',If(Facility_tpBaseCurrency=='USD','LiquidityPremiumUSD','LiquidityPremiumOther'))),MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',X*12/Facility_tpRepaymentFrequency,1),Facility_tpFixedInterestPeriod))*OnER((X*12/Facility_tpRepaymentFrequency-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',X*12/Facility_tpRepaymentFrequency,1))/(MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorUpperBound',X*12/Facility_tpRepaymentFrequency,1)-MatrixLookup('AAB_Parameters.xls','LiquidityPremiumTenorLowerBound',X*12/Facility_tpRepaymentFrequency,1)),0))) */
function Facility_tpLiquiditySpreadRepaymentAnnuity_value(f, x, y, z, v) {
    return SumFor(
        X,
        1 +
        Facility_tpGracePeriodInPeriods_value(
            '101259',
            x,
            y,
            z,
            v
        ),
        Facility_tpNumberOfPeriodsNoGrace_value(
            '100654',
            x,
            y,
            z,
            v
        ),
        1,
        PPMT(
            Facility_tpAnnuityInterestRate_value(
                '100668',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequency_value(
                '100662',
                x,
                y,
                z,
                v
            ),
            X -
            Facility_tpGracePeriodInPeriods_value(
                '101259',
                x,
                y,
                z,
                v
            ),
            Facility_tpNumberOfPeriods_value(
                '100652',
                x,
                y,
                z,
                v
            ),
            -Facility_tpPrincipalLimit_value(
                '100544',
                x,
                y,
                z,
                v
            ),
            Facility_tpBalloon_value(
                '100670',
                x,
                y,
                z,
                v
            )
        ) * (
            X *
            Facility_tpConvertToMonths_value(
                '101257',
                x,
                y,
                z,
                v
            ) /
            Facility_tpRepaymentFrequencyLiqSpread_value(
                '101255',
                x,
                y,
                z,
                v
            )
        ) * (
            MatrixLookup(
                'AAB_Parameters.xls',
                Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                    '100506',
                    x,
                    y,
                    z,
                    v
                ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                MatrixLookup(
                    'AAB_Parameters.xls',
                    'LiquidityPremiumTenorLowerBound',
                    X * 12 /
                    Facility_tpRepaymentFrequency_value(
                        '100662',
                        x,
                        y,
                        z,
                        v
                    ),
                    1
                ),
                Facility_tpFixedInterestPeriod_value(
                    '100513',
                    x,
                    y,
                    z,
                    v
                )
            ) + (
                MatrixLookup(
                    'AAB_Parameters.xls',
                    Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorUpperBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    ),
                    Facility_tpFixedInterestPeriod_value(
                        '100513',
                        x,
                        y,
                        z,
                        v
                    )
                ) -
                MatrixLookup(
                    'AAB_Parameters.xls',
                    Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'EUR' ? 'LiquidityPremiumEUR' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'GBP' ? 'LiquidityPremiumGBP' : Facility_tpBaseCurrency_value(
                        '100506',
                        x,
                        y,
                        z,
                        v
                    ) == 'USD' ? 'LiquidityPremiumUSD' : 'LiquidityPremiumOther',
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorLowerBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    ),
                    Facility_tpFixedInterestPeriod_value(
                        '100513',
                        x,
                        y,
                        z,
                        v
                    )
                )
            ) *
            OnER(
                (
                    X * 12 /
                    Facility_tpRepaymentFrequency_value(
                        '100662',
                        x,
                        y,
                        z,
                        v
                    ) -
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorLowerBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    )
                ) / (
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorUpperBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    ) -
                    MatrixLookup(
                        'AAB_Parameters.xls',
                        'LiquidityPremiumTenorLowerBound',
                        X * 12 /
                        Facility_tpRepaymentFrequency_value(
                            '100662',
                            x,
                            y,
                            z,
                            v
                        ),
                        1
                    )
                ),
                0
            )
        )
    );
}

/* AABPRICING_Facility_tpLiquiditySpreadRepaymentAnnuity_title:'Liquidity Spread Repayment Annuity' */
function Facility_tpLiquiditySpreadRepaymentAnnuity_title(f, x, y, z, v) {
    return 'Liquidity Spread Repayment Annuity';
}

/* AABPRICING_Facility_tpWeightedFundingRepaymentScheme_value:TupleSum(Facility_tpManual_tpWeightedFundingRepayment) */
function Facility_tpWeightedFundingRepaymentScheme_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_tpWeightedFundingRepayment_value(
            '100730',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpWeightedFundingRepaymentScheme_title:'Weighted Funding Repayment Scheme' */
function Facility_tpWeightedFundingRepaymentScheme_title(f, x, y, z, v) {
    return 'Weighted Funding Repayment Scheme';
}

/* AABPRICING_Facility_tpLiquiditySpreadRepaymentScheme_value:TupleSum(Facility_tpManual_tpLiquiditySpreadRepayment) */
function Facility_tpLiquiditySpreadRepaymentScheme_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_tpLiquiditySpreadRepayment_value(
            '100728',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpLiquiditySpreadRepaymentScheme_title:'Liquidity Spread Repayment Scheme' */
function Facility_tpLiquiditySpreadRepaymentScheme_title(f, x, y, z, v) {
    return 'Liquidity Spread Repayment Scheme';
}

/* AABPRICING_Facility_tpWeightedFundingWithdrawalScheme_value:TupleSum(Facility_tpManual_tpWeightedFundingWithdrawal) */
function Facility_tpWeightedFundingWithdrawalScheme_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_tpWeightedFundingWithdrawal_value(
            '100736',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpWeightedFundingWithdrawalScheme_title:'Weighted Funding Withdrawal Scheme' */
function Facility_tpWeightedFundingWithdrawalScheme_title(f, x, y, z, v) {
    return 'Weighted Funding Withdrawal Scheme';
}

/* AABPRICING_Facility_tpLiquiditySpreadWithdrawalScheme_value:TupleSum(Facility_tpManual_tpLiquiditySpreadWithdrawal) */
function Facility_tpLiquiditySpreadWithdrawalScheme_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpManual_tpLiquiditySpreadWithdrawal_value(
            '100734',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpLiquiditySpreadWithdrawalScheme_title:'Liquidity Spread Withdrawal Scheme' */
function Facility_tpLiquiditySpreadWithdrawalScheme_title(f, x, y, z, v) {
    return 'Liquidity Spread Withdrawal Scheme';
}

/* AABPRICING_Facility_tpLiquiditySpreadRevolvingCredit_value:If(Facility_tpInterestRateIndexBasis==1,0,MatrixLookup('AAB_Parameters.xls','LiquidityPremiumRevolvingCredit',Facility_tpProductinterestDetailsInterestProductName,If(Facility_tpBaseCurrency=='EUR',1,If(Facility_tpBaseCurrency=='GBP',2,If(Facility_tpBaseCurrency=='USD',3,4))))) */
function Facility_tpLiquiditySpreadRevolvingCredit_value(f, x, y, z, v) {
    return Facility_tpInterestRateIndexBasis_value(
        '101375',
        x,
        y,
        z,
        v
    ) ==
    1 ? 0 : MatrixLookup(
        'AAB_Parameters.xls',
        'LiquidityPremiumRevolvingCredit',
        Facility_tpProductinterestDetailsInterestProductName_value(
            '100508',
            x,
            y,
            z,
            v
        ),
        Facility_tpBaseCurrency_value(
            '100506',
            x,
            y,
            z,
            v
        ) ==
        'EUR' ? 1 : Facility_tpBaseCurrency_value(
            '100506',
            x,
            y,
            z,
            v
        ) ==
        'GBP' ? 2 : Facility_tpBaseCurrency_value(
            '100506',
            x,
            y,
            z,
            v
        ) == 'USD' ? 3 : 4
    );
}

/* AABPRICING_Facility_tpPrepaymentCosts_value:Facility_tpPrepaymentPremium*Facility_tpPrepaymentPrec*Facility_tpPrincipalLimit/1e4*Facility_tpDeannualize */
function Facility_tpPrepaymentCosts_value(f, x, y, z, v) {
    return Facility_tpPrepaymentPremium_value(
        '101284',
        x,
        y,
        z,
        v
        ) *
        Facility_tpPrepaymentPrec_value(
            '100516',
            x,
            y,
            z,
            v
        ) *
        Facility_tpPrincipalLimit_value(
            '100544',
            x,
            y,
            z,
            v
        ) / 1 *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpPrepaymentCosts_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Prepayment Costs' */
function Facility_tpPrepaymentCosts_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Prepayment Costs';
}

/* AABPRICING_Facility_tpPrepaymentPremium_value:MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,1) */
function Facility_tpPrepaymentPremium_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Facility_tpPrepaymentPremium_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Prepayment Premium (Bps)' */
function Facility_tpPrepaymentPremium_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Prepayment Premium (Bps)';
}

/* AABPRICING_Facility_tpPipelineRisk_value:Facility_tpOfferOptionPremium*Facility_tpPrincipalLimit/1e4*Facility_tpDeannualize */
function Facility_tpPipelineRisk_value(f, x, y, z, v) {
    return Facility_tpOfferOptionPremium_value(
        '101288',
        x,
        y,
        z,
        v
        ) *
        Facility_tpPrincipalLimit_value(
            '100544',
            x,
            y,
            z,
            v
        ) / 1 *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpPipelineRisk_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Pipeline Risk' */
function Facility_tpPipelineRisk_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Pipeline Risk';
}

/* AABPRICING_Facility_tpOfferOptionPremium_value:If(Facility_tpPipelineRiskUpperM-Facility_tpPipelineRiskLowerM==0,Facility_tpPipelineRiskLowerPremium,Facility_tpPipelineRiskLowerPremium+(Facility_tpPipelineRiskUpperPremium-Facility_tpPipelineRiskLowerPremium)*((Facility_tpRemainingAverageTenor-Facility_tpPipelineRiskLowerM)/(Facility_tpPipelineRiskUpperM-Facility_tpPipelineRiskLowerM))) */
function Facility_tpOfferOptionPremium_value(f, x, y, z, v) {
    return Facility_tpPipelineRiskUpperM_value(
        '101292',
        x,
        y,
        z,
        v
    ) -
    Facility_tpPipelineRiskLowerM_value(
        '101290',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpPipelineRiskLowerPremium_value(
        '101294',
        x,
        y,
        z,
        v
    ) : Facility_tpPipelineRiskLowerPremium_value(
        '101294',
        x,
        y,
        z,
        v
    ) + (
        Facility_tpPipelineRiskUpperPremium_value(
            '101296',
            x,
            y,
            z,
            v
        ) -
        Facility_tpPipelineRiskLowerPremium_value(
            '101294',
            x,
            y,
            z,
            v
        )
    ) * (
        (
            Facility_tpRemainingAverageTenor_value(
                '100527',
                x,
                y,
                z,
                v
            ) -
            Facility_tpPipelineRiskLowerM_value(
                '101290',
                x,
                y,
                z,
                v
            )
        ) / (
            Facility_tpPipelineRiskUpperM_value(
                '101292',
                x,
                y,
                z,
                v
            ) -
            Facility_tpPipelineRiskLowerM_value(
                '101290',
                x,
                y,
                z,
                v
            )
        )
    );
}

/* AABPRICING_Facility_tpOfferOptionPremium_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Offer Option Premium (Bps)' */
function Facility_tpOfferOptionPremium_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Offer Option Premium (Bps)';
}

/* AABPRICING_Facility_tpPipelineRiskLowerM_value:Case(Facility_tpRemainingAverageTenor,[1,0||2,1||3,2||5,3||10,5||50,10||50]) */
function Facility_tpPipelineRiskLowerM_value(f, x, y, z, v) {
    return __c0s15 =
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) , __c0s15 === 1 ? 0 : __c0s15 === 2 ? 1 : __c0s15 === 3 ? 2 : __c0s15 === 5 ? 3 : __c0s15 === 10 ? 5 : __c0s15 === 50 ? 10 || 50 : NA;
}

/* AABPRICING_Facility_tpPipelineRiskLowerM_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Lower M' */
function Facility_tpPipelineRiskLowerM_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Lower M';
}

/* AABPRICING_Facility_tpPipelineRiskUpperM_value:Case(Facility_tpRemainingAverageTenor,[1,1||2,2||3,3||5,5||10,10||50,50||50]) */
function Facility_tpPipelineRiskUpperM_value(f, x, y, z, v) {
    return __c0s16 =
        Facility_tpRemainingAverageTenor_value(
            '100527',
            x,
            y,
            z,
            v
        ) , __c0s16 === 1 ? 1 : __c0s16 === 2 ? 2 : __c0s16 === 3 ? 3 : __c0s16 === 5 ? 5 : __c0s16 === 10 ? 10 : __c0s16 === 50 ? 50 || 50 : NA;
}

/* AABPRICING_Facility_tpPipelineRiskUpperM_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Upper M' */
function Facility_tpPipelineRiskUpperM_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Upper M';
}

/* AABPRICING_Facility_tpPipelineRiskLowerPremium_value:MatrixLookup('AAB_Parameters.xls','OfferOptionPremium',Facility_tpOfferPeriod+'_'+Str(Facility_tpPipelineRiskLowerM,0,0),5) */
function Facility_tpPipelineRiskLowerPremium_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OfferOptionPremium',
        Facility_tpOfferPeriod_value(
            '100521',
            x,
            y,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpPipelineRiskLowerM_value(
                '101290',
                x,
                y,
                z,
                v
            ),
            0,
            0
        ),
        5
    );
}

/* AABPRICING_Facility_tpPipelineRiskLowerPremium_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Lower Premium (Bps)' */
function Facility_tpPipelineRiskLowerPremium_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Lower Premium (Bps)';
}

/* AABPRICING_Facility_tpPipelineRiskUpperPremium_value:MatrixLookup('AAB_Parameters.xls','OfferOptionPremium',Facility_tpOfferPeriod+'_'+Str(Facility_tpPipelineRiskUpperM,0,0),5) */
function Facility_tpPipelineRiskUpperPremium_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OfferOptionPremium',
        Facility_tpOfferPeriod_value(
            '100521',
            x,
            y,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpPipelineRiskUpperM_value(
                '101292',
                x,
                y,
                z,
                v
            ),
            0,
            0
        ),
        5
    );
}

/* AABPRICING_Facility_tpPipelineRiskUpperPremium_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Upper Premium (Bps)' */
function Facility_tpPipelineRiskUpperPremium_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Upper Premium (Bps)';
}

/* AABPRICING_Facility_tpPipelineRiskUpperPremiumID_value:EvaluateAsString(Facility_tpOfferPeriod+'_'+Str(Facility_tpPipelineRiskUpperM,0,0)) */
function Facility_tpPipelineRiskUpperPremiumID_value(f, x, y, z, v) {
    return String(
        Facility_tpOfferPeriod_value(
            '100521',
            x,
            y,
            z,
            v
        ) + '_' +
        Str(
            Facility_tpPipelineRiskUpperM_value(
                '101292',
                x,
                y,
                z,
                v
            ),
            0,
            0
        )
    );
}

/* AABPRICING_Facility_tpPipelineRiskUpperPremiumID_title:'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Upper Premium ID' */
function Facility_tpPipelineRiskUpperPremiumID_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Funds Transfer Pricing - Upper Premium ID';
}

/* AABPRICING_Facility_tpIndirectLiquidityCosts_value:(Facility_tpIndirectLiquidityCostsFI+Facility_tpIndirectLiquidityCostsComRe+Facility_tpIndirectLiquidityCostsUncomRe+Facility_tpIndirectLiquidityCostsComCom+Facility_tpIndirectLiquidityCostsUncomCom+Facility_tpIndirectLiquidityCostsNotRe+Facility_tpIndirectLiquidityCostsCom31dt+Facility_tpIndirectLiquidityCostsUncom31dt)*Facility_tpDeannualize */
function Facility_tpIndirectLiquidityCosts_value(f, x, y, z, v) {
    return (
            Facility_tpIndirectLiquidityCostsFI_value(
                '101317',
                x,
                y,
                z,
                v
            ) +
            Facility_tpIndirectLiquidityCostsComRe_value(
                '101321',
                x,
                y,
                z,
                v
            ) +
            Facility_tpIndirectLiquidityCostsUncomRe_value(
                '101325',
                x,
                y,
                z,
                v
            ) +
            Facility_tpIndirectLiquidityCostsComCom_value(
                '101337',
                x,
                y,
                z,
                v
            ) +
            Facility_tpIndirectLiquidityCostsUncomCom_value(
                '101341',
                x,
                y,
                z,
                v
            ) +
            Facility_tpIndirectLiquidityCostsNotRe_value(
                '101345',
                x,
                y,
                z,
                v
            ) +
            Facility_tpIndirectLiquidityCostsCom31dt_value(
                '101329',
                x,
                y,
                z,
                v
            ) +
            Facility_tpIndirectLiquidityCostsUncom31dt_value(
                '101333',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsGeneral_value:undefined */
function Facility_tpIndirectLiquidityCostsGeneral_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsGeneral_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs - General' */
function Facility_tpIndirectLiquidityCostsGeneral_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs - General';
}

/* AABPRICING_Facility_tpBufferCostPerYearBP_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','BUFFERCOSTPERJAARBP',2) */
function Facility_tpBufferCostPerYearBP_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'BUFFERCOSTPERJAARBP',
        2
    );
}

/* AABPRICING_Facility_tpBufferCostPerYearBP_title:'Risk Adjusted Return - Interest Expenses - Buffer Cost Per Year BP' */
function Facility_tpBufferCostPerYearBP_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Buffer Cost Per Year BP';
}

/* AABPRICING_Facility_tpFI_value:If(Borrower_tpAGICOrSBI==0,MatrixLookup('AAB_Parameters.xls','AGICMapping',''+Borrower_tpAGIC,3),MatrixLookup('AAB_Parameters.xls','SBIMapping',''+Borrower_tpSBI,3)) */
function Facility_tpFI_value(f, x, y, z, v) {
    return Borrower_tpAGICOrSBI_value(
        '100199',
        x,
        y.base,
        z,
        v
    ) ==
    0 ? MatrixLookup(
        'AAB_Parameters.xls',
        'AGICMapping',
        '' +
        Borrower_tpAGIC_value(
            '100205',
            x,
            y.base,
            z,
            v
        ),
        3
    ) : MatrixLookup(
        'AAB_Parameters.xls',
        'SBIMapping',
        '' +
        Borrower_tpSBI_value(
            '100222',
            x,
            y.base,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Facility_tpFI_title:'Risk Adjusted Return - Interest Expenses - Financial Institution' */
function Facility_tpFI_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Financial Institution';
}

/* AABPRICING_Facility_tpRedrawable_value:MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,5) */
function Facility_tpRedrawable_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        5
    );
}

/* AABPRICING_Facility_tpRedrawable_title:'Risk Adjusted Return - Interest Expenses - Can be redrawn' */
function Facility_tpRedrawable_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Can be redrawn';
}

/* AABPRICING_Facility_tp31DgDebet2_value:Facility_tp31DgDebet */
function Facility_tp31DgDebet2_value(f, x, y, z, v) {
    return Facility_tp31DgDebet_value(
        '100533',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tp31DgDebet2_title:'Risk Adjusted Return - Interest Expenses - 31dg Debet' */
function Facility_tp31DgDebet2_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - 31dg Debet';
}

/* AABPRICING_Facility_tpCombined_value:MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,2) */
function Facility_tpCombined_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        2
    );
}

/* AABPRICING_Facility_tpCombined_title:'Risk Adjusted Return - Interest Expenses - Combined' */
function Facility_tpCombined_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Combined';
}

/* AABPRICING_Facility_tpUncommitted_value:Facility_tpUncommitted2 */
function Facility_tpUncommitted_value(f, x, y, z, v) {
    return Facility_tpUncommitted2_value(
        '100531',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpUncommitted_title:'Risk Adjusted Return - Interest Expenses - Uncommitted' */
function Facility_tpUncommitted_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Uncommitted';
}

/* AABPRICING_Facility_tpCreditOrLiquidity_value:EvaluateAsString(MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,3)) */
function Facility_tpCreditOrLiquidity_value(f, x, y, z, v) {
    return String(
        MatrixLookup(
            'AAB_Parameters.xls',
            'ProductType',
            Facility_tpType_value(
                '100536',
                x,
                y,
                z,
                v
            ),
            3
        )
    );
}

/* AABPRICING_Facility_tpCreditOrLiquidity_title:'Risk Adjusted Return - Interest Expenses - Credit || liquidity facility' */
function Facility_tpCreditOrLiquidity_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Credit || liquidity facility';
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsFI_value:If(Facility_tpFI,(Facility_tpOriginalLimit-Facility_tpExpectedAverageOutstanding)*Facility_tpOutflowFI*(Facility_tpBufferCostPerYearBP/1e4),NA) */
function Facility_tpIndirectLiquidityCostsFI_value(f, x, y, z, v) {
    return Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) ? (
            Facility_tpOriginalLimit_value(
                '101363',
                x,
                y,
                z,
                v
            ) -
            Facility_tpExpectedAverageOutstanding_value(
                '100529',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpOutflowFI_value(
            '101319',
            x,
            y,
            z,
            v
        ) * (
            Facility_tpBufferCostPerYearBP_value(
                '101303',
                x,
                y,
                z,
                v
            ) / 1e4
        ) : NA;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsFI_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Financial Institution' */
function Facility_tpIndirectLiquidityCostsFI_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Financial Institution';
}

/* AABPRICING_Facility_tpOutflowFI_value:MatrixLookup('AAB_Parameters.xls','OutflowPercFinancialInstitutions',Borrower_tpFinancialInstitution+'_'+Facility_tpCreditOrLiquidity,3) */
function Facility_tpOutflowFI_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OutflowPercFinancialInstitutions',
        Borrower_tpFinancialInstitution_value(
            '100256',
            x,
            y.base,
            z,
            v
        ) + '_' +
        Facility_tpCreditOrLiquidity_value(
            '101315',
            x,
            y,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Facility_tpOutflowFI_title:'Risk Adjusted Return - Interest Expenses - Outflow FI' */
function Facility_tpOutflowFI_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Outflow FI';
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsComRe_value:If(Facility_tpFI==0&&Facility_tpRedrawable==1&&Facility_tp31DgDebet==0&&Facility_tpCombined==0&&Facility_tpUncommitted==0,(Facility_tpOriginalLimit-Facility_tpExpectedAverageOutstanding)*Facility_tpOutflowCommittedRedraw*(Facility_tpBufferCostPerYearBP/1e4),NA) */
function Facility_tpIndirectLiquidityCostsComRe_value(f, x, y, z, v) {
    return Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRedrawable_value(
        '101307',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tp31DgDebet_value(
        '100533',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpCombined_value(
        '101311',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpUncommitted_value(
        '101313',
        x,
        y,
        z,
        v
    ) ==
    0 ? (
            Facility_tpOriginalLimit_value(
                '101363',
                x,
                y,
                z,
                v
            ) -
            Facility_tpExpectedAverageOutstanding_value(
                '100529',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpOutflowCommittedRedraw_value(
            '101323',
            x,
            y,
            z,
            v
        ) * (
            Facility_tpBufferCostPerYearBP_value(
                '101303',
                x,
                y,
                z,
                v
            ) / 1e4
        ) : NA;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsComRe_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Committed + re-drawn' */
function Facility_tpIndirectLiquidityCostsComRe_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Committed + re-drawn';
}

/* AABPRICING_Facility_tpOutflowCommittedRedraw_value:MatrixLookup('AAB_Parameters.xls','OutflowPercCommitted',Borrower_tpClientGroup,2) */
function Facility_tpOutflowCommittedRedraw_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OutflowPercCommitted',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        2
    );
}

/* AABPRICING_Facility_tpOutflowCommittedRedraw_title:'Risk Adjusted Return - Interest Expenses - Outflow Percentage Committed&&Redrawable' */
function Facility_tpOutflowCommittedRedraw_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Outflow Percentage Committed&&Redrawable';
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsUncomRe_value:If(Facility_tpFI==0&&Facility_tpRedrawable==1&&Facility_tp31DgDebet==0&&Facility_tpCombined==0&&Facility_tpUncommitted==1,(Facility_tpOriginalLimit-Facility_tpExpectedAverageOutstanding)*Facility_tpOutflowUncommittedRedraw*(Facility_tpBufferCostPerYearBP/1e4),NA) */
function Facility_tpIndirectLiquidityCostsUncomRe_value(f, x, y, z, v) {
    return Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRedrawable_value(
        '101307',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tp31DgDebet_value(
        '100533',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpCombined_value(
        '101311',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpUncommitted_value(
        '101313',
        x,
        y,
        z,
        v
    ) ==
    1 ? (
            Facility_tpOriginalLimit_value(
                '101363',
                x,
                y,
                z,
                v
            ) -
            Facility_tpExpectedAverageOutstanding_value(
                '100529',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpOutflowUncommittedRedraw_value(
            '101327',
            x,
            y,
            z,
            v
        ) * (
            Facility_tpBufferCostPerYearBP_value(
                '101303',
                x,
                y,
                z,
                v
            ) / 1e4
        ) : NA;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsUncomRe_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Uncomitted + re-drawn' */
function Facility_tpIndirectLiquidityCostsUncomRe_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Uncomitted + re-drawn';
}

/* AABPRICING_Facility_tpOutflowUncommittedRedraw_value:MatrixLookup('AAB_Parameters.xls','OutflowPercUncommitted',Borrower_tpClientGroup,1) */
function Facility_tpOutflowUncommittedRedraw_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OutflowPercUncommitted',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Facility_tpOutflowUncommittedRedraw_title:'Risk Adjusted Return - Interest Expenses - Outflow Percentage Uncommitted&&Redrawable' */
function Facility_tpOutflowUncommittedRedraw_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Outflow Percentage Uncommitted&&Redrawable';
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsCom31dt_value:If(Facility_tpFI==0&&Facility_tpRedrawable==0&&Facility_tp31DgDebet==1&&Facility_tpCombined==0&&Facility_tpUncommitted==0,(Facility_tpOriginalLimit-Facility_tpExpectedAverageOutstanding)*Facility_tpOutflowCommitted31Dgn*(Facility_tpBufferCostPerYearBP/1e4),NA) */
function Facility_tpIndirectLiquidityCostsCom31dt_value(f, x, y, z, v) {
    return Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRedrawable_value(
        '101307',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tp31DgDebet_value(
        '100533',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tpCombined_value(
        '101311',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpUncommitted_value(
        '101313',
        x,
        y,
        z,
        v
    ) ==
    0 ? (
            Facility_tpOriginalLimit_value(
                '101363',
                x,
                y,
                z,
                v
            ) -
            Facility_tpExpectedAverageOutstanding_value(
                '100529',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpOutflowCommitted31Dgn_value(
            '101331',
            x,
            y,
            z,
            v
        ) * (
            Facility_tpBufferCostPerYearBP_value(
                '101303',
                x,
                y,
                z,
                v
            ) / 1e4
        ) : NA;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsCom31dt_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Committed +31dt' */
function Facility_tpIndirectLiquidityCostsCom31dt_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Committed +31dt';
}

/* AABPRICING_Facility_tpOutflowCommitted31Dgn_value:MatrixLookup('AAB_Parameters.xls','OutflowPercCommitted',Borrower_tpClientGroup,4) */
function Facility_tpOutflowCommitted31Dgn_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OutflowPercCommitted',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        4
    );
}

/* AABPRICING_Facility_tpOutflowCommitted31Dgn_title:'Risk Adjusted Return - Interest Expenses - Outflow Percentage Committed&&31 Dgn' */
function Facility_tpOutflowCommitted31Dgn_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Outflow Percentage Committed&&31 Dgn';
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsUncom31dt_value:If(Facility_tpFI==0&&Facility_tpRedrawable==0&&Facility_tp31DgDebet==1&&Facility_tpCombined==0&&Facility_tpUncommitted==1,(Facility_tpOriginalLimit-Facility_tpExpectedAverageOutstanding)*Facility_tpOutflowUncommitted31Dgn*(Facility_tpBufferCostPerYearBP/1e4),NA) */
function Facility_tpIndirectLiquidityCostsUncom31dt_value(f, x, y, z, v) {
    return Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRedrawable_value(
        '101307',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tp31DgDebet_value(
        '100533',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tpCombined_value(
        '101311',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpUncommitted_value(
        '101313',
        x,
        y,
        z,
        v
    ) ==
    1 ? (
            Facility_tpOriginalLimit_value(
                '101363',
                x,
                y,
                z,
                v
            ) -
            Facility_tpExpectedAverageOutstanding_value(
                '100529',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpOutflowUncommitted31Dgn_value(
            '101335',
            x,
            y,
            z,
            v
        ) * (
            Facility_tpBufferCostPerYearBP_value(
                '101303',
                x,
                y,
                z,
                v
            ) / 1e4
        ) : NA;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsUncom31dt_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Uncomitted + 31 dt' */
function Facility_tpIndirectLiquidityCostsUncom31dt_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Uncomitted + 31 dt';
}

/* AABPRICING_Facility_tpOutflowUncommitted31Dgn_value:MatrixLookup('AAB_Parameters.xls','OutflowPercUncommitted',Borrower_tpClientGroup,3) */
function Facility_tpOutflowUncommitted31Dgn_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OutflowPercUncommitted',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Facility_tpOutflowUncommitted31Dgn_title:'Risk Adjusted Return - Interest Expenses - Outflow Percentage Uncommitted&&31 Dgn' */
function Facility_tpOutflowUncommitted31Dgn_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Outflow Percentage Uncommitted&&31 Dgn';
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsComCom_value:If(Facility_tpFI==0&&Facility_tpRedrawable==0&&Facility_tp31DgDebet==0&&Facility_tpCombined==1&&Facility_tpUncommitted==0,(Facility_tpOriginalLimit-Facility_tpExpectedAverageOutstanding)*Facility_tpOutflowCommittedCombined*(Facility_tpBufferCostPerYearBP/1e4),NA) */
function Facility_tpIndirectLiquidityCostsComCom_value(f, x, y, z, v) {
    return Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRedrawable_value(
        '101307',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tp31DgDebet_value(
        '100533',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpCombined_value(
        '101311',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tpUncommitted_value(
        '101313',
        x,
        y,
        z,
        v
    ) ==
    0 ? (
            Facility_tpOriginalLimit_value(
                '101363',
                x,
                y,
                z,
                v
            ) -
            Facility_tpExpectedAverageOutstanding_value(
                '100529',
                x,
                y,
                z,
                v
            )
        ) *
        Facility_tpOutflowCommittedCombined_value(
            '101339',
            x,
            y,
            z,
            v
        ) * (
            Facility_tpBufferCostPerYearBP_value(
                '101303',
                x,
                y,
                z,
                v
            ) / 1e4
        ) : NA;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsComCom_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Committed + combined' */
function Facility_tpIndirectLiquidityCostsComCom_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Committed + combined';
}

/* AABPRICING_Facility_tpOutflowCommittedCombined_value:MatrixLookup('AAB_Parameters.xls','OutflowPercCommitted',Borrower_tpClientGroup,3) */
function Facility_tpOutflowCommittedCombined_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OutflowPercCommitted',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        3
    );
}

/* AABPRICING_Facility_tpOutflowCommittedCombined_title:'Risk Adjusted Return - Interest Expenses - Outflow Percentage Committed&&Combined Product' */
function Facility_tpOutflowCommittedCombined_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Outflow Percentage Committed&&Combined Product';
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsUncomCom_value:If(Facility_tpFI==0&&Facility_tpRedrawable==0&&Facility_tp31DgDebet==0&&Facility_tpCombined==1&&Facility_tpUncommitted==1,Facility_tpTermLoanYearlyIndirectLiqCosts,NA) */
function Facility_tpIndirectLiquidityCostsUncomCom_value(f, x, y, z, v) {
    return Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRedrawable_value(
        '101307',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tp31DgDebet_value(
        '100533',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpCombined_value(
        '101311',
        x,
        y,
        z,
        v
    ) == 1 &&
    Facility_tpUncommitted_value(
        '101313',
        x,
        y,
        z,
        v
    ) ==
    1 ? Facility_tpTermLoanYearlyIndirectLiqCosts_value(
        '101361',
        x,
        y,
        z,
        v
    ) : NA;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsUncomCom_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Uncomitted + combined' */
function Facility_tpIndirectLiquidityCostsUncomCom_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Uncomitted + combined';
}

/* AABPRICING_Facility_tpOutflowUncommittedCombined_value:MatrixLookup('AAB_Parameters.xls','OutflowPercUncommitted',Borrower_tpClientGroup,2) */
function Facility_tpOutflowUncommittedCombined_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OutflowPercUncommitted',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        2
    );
}

/* AABPRICING_Facility_tpOutflowUncommittedCombined_title:'Risk Adjusted Return - Interest Expenses - Outflow Percentage Uncommitted&&Combined' */
function Facility_tpOutflowUncommittedCombined_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Outflow Percentage Uncommitted&&Combined';
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsNotRe_value:If(Facility_tpFI==0&&Facility_tpRedrawable==0&&Facility_tp31DgDebet==0&&Facility_tpCombined==0,Facility_tpTermLoanYearlyIndirectLiqCosts,NA) */
function Facility_tpIndirectLiquidityCostsNotRe_value(f, x, y, z, v) {
    return Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpRedrawable_value(
        '101307',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tp31DgDebet_value(
        '100533',
        x,
        y,
        z,
        v
    ) == 0 &&
    Facility_tpCombined_value(
        '101311',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpTermLoanYearlyIndirectLiqCosts_value(
        '101361',
        x,
        y,
        z,
        v
    ) : NA;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsNotRe_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Not redrawable' */
function Facility_tpIndirectLiquidityCostsNotRe_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs- Not redrawable';
}

/* AABPRICING_Facility_tpOutflowCommittedNotRedraw_value:MatrixLookup('AAB_Parameters.xls','OutflowPercCommitted',Borrower_tpClientGroup,1) */
function Facility_tpOutflowCommittedNotRedraw_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'OutflowPercCommitted',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        1
    );
}

/* AABPRICING_Facility_tpOutflowCommittedNotRedraw_title:'Risk Adjusted Return - Interest Expenses - Outflow Percentage Committed&&Nonredrawable' */
function Facility_tpOutflowCommittedNotRedraw_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Outflow Percentage Committed&&Nonredrawable';
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsExtended_value:undefined */
function Facility_tpIndirectLiquidityCostsExtended_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpIndirectLiquidityCostsExtended_title:'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs - Uitgebreide calc' */
function Facility_tpIndirectLiquidityCostsExtended_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Indirect Liquidity Costs - Uitgebreide calc';
}

/* AABPRICING_Facility_tpAbsoluteBufferCosts_value:Facility_tpOriginalLimit*If(Facility_tpFI==0&&Facility_tpRedrawable==0&&Facility_tp31DgDebet==0&&Facility_tpCombined==1&&Facility_tpUncommitted==1,Facility_tpOutflowUncommittedCombined,Facility_tpOutflowCommittedNotRedraw)*(Facility_tpBufferCostPerYearBP/1e4)/12 */
function Facility_tpAbsoluteBufferCosts_value(f, x, y, z, v) {
    return Facility_tpOriginalLimit_value(
        '101363',
        x,
        y,
        z,
        v
    ) * (
        Facility_tpFI_value(
            '101305',
            x,
            y,
            z,
            v
        ) == 0 &&
        Facility_tpRedrawable_value(
            '101307',
            x,
            y,
            z,
            v
        ) == 0 &&
        Facility_tp31DgDebet_value(
            '100533',
            x,
            y,
            z,
            v
        ) == 0 &&
        Facility_tpCombined_value(
            '101311',
            x,
            y,
            z,
            v
        ) == 1 &&
        Facility_tpUncommitted_value(
            '101313',
            x,
            y,
            z,
            v
        ) ==
        1 ? Facility_tpOutflowUncommittedCombined_value(
            '101343',
            x,
            y,
            z,
            v
        ) : Facility_tpOutflowCommittedNotRedraw_value(
            '101347',
            x,
            y,
            z,
            v
        )
    ) * (
        Facility_tpBufferCostPerYearBP_value(
            '101303',
            x,
            y,
            z,
            v
        ) / 1e4
    ) / 12;
}

/* AABPRICING_Facility_tpAbsoluteBufferCosts_title:'Risk Adjusted Return - Interest Expenses - Absolute Buffer Cost ()' */
function Facility_tpAbsoluteBufferCosts_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Absolute Buffer Cost ()';
}

/* AABPRICING_Facility_tpYearlyIndirectLiqCosts_value:Round(If(Facility_tpProductredemptionDetailsRedemptionType=='InterestOnly',Facility_tpYearlyIndirectLiqCostsBullet,If(Facility_tpProductredemptionDetailsRedemptionType=='Linear'||Facility_tpProductredemptionDetailsRedemptionType=='Annuity',Facility_tpYearlyIndirectLiqCostsLinearAnnuity,If(Facility_tpProductredemptionDetailsRedemptionType=='IrregularRepaymentSchedule',Facility_tpYearlyIndirectLiqCostsScheme,NA))),0) */
function Facility_tpYearlyIndirectLiqCosts_value(f, x, y, z, v) {
    return Round(
        Facility_tpProductredemptionDetailsRedemptionType_value(
            '100560',
            x,
            y,
            z,
            v
        ) ==
        'InterestOnly' ? Facility_tpYearlyIndirectLiqCostsBullet_value(
            '101355',
            x,
            y,
            z,
            v
        ) : Facility_tpProductredemptionDetailsRedemptionType_value(
            '100560',
            x,
            y,
            z,
            v
        ) ==
        'Linear' || Facility_tpProductredemptionDetailsRedemptionType_value(
            '100560',
            x,
            y,
            z,
            v
        ) ==
        'Annuity' ? Facility_tpYearlyIndirectLiqCostsLinearAnnuity_value(
            '101357',
            x,
            y,
            z,
            v
        ) : Facility_tpProductredemptionDetailsRedemptionType_value(
            '100560',
            x,
            y,
            z,
            v
        ) ==
        'IrregularRepaymentSchedule' ? Facility_tpYearlyIndirectLiqCostsScheme_value(
            '101359',
            x,
            y,
            z,
            v
        ) : NA,
        0
    );
}

/* AABPRICING_Facility_tpYearlyIndirectLiqCosts_title:'Risk Adjusted Return - Interest Expenses - Yearly Indirect Liq. Costs (Bps)' */
function Facility_tpYearlyIndirectLiqCosts_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Yearly Indirect Liq. Costs (Bps)';
}

/* AABPRICING_Facility_tpYearlyIndirectLiqCostsBullet_value:If(Facility_tpProductredemptionDetailsRedemptionType=='InterestOnly',Facility_tpAbsoluteBufferCosts/Facility_tpOriginalTenorYears/Facility_tpOriginalLimit*1e4,NA) */
function Facility_tpYearlyIndirectLiqCostsBullet_value(f, x, y, z, v) {
    return Facility_tpProductredemptionDetailsRedemptionType_value(
        '100560',
        x,
        y,
        z,
        v
    ) ==
    'InterestOnly' ? Facility_tpAbsoluteBufferCosts_value(
        '101351',
        x,
        y,
        z,
        v
        ) /
        Facility_tpOriginalTenorYears_value(
            '100613',
            x,
            y,
            z,
            v
        ) /
        Facility_tpOriginalLimit_value(
            '101363',
            x,
            y,
            z,
            v
        ) * 1e4 : NA;
}

/* AABPRICING_Facility_tpYearlyIndirectLiqCostsBullet_title:'Risk Adjusted Return - Interest Expenses - Yearly Indirect Liq. Costs (Bps) Bullet' */
function Facility_tpYearlyIndirectLiqCostsBullet_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Yearly Indirect Liq. Costs (Bps) Bullet';
}

/* AABPRICING_Facility_tpYearlyIndirectLiqCostsLinearAnnuity_value:If(Facility_tpProductredemptionDetailsRedemptionType=='Linear'||Facility_tpProductredemptionDetailsRedemptionType=='Annuity',Facility_tpAbsoluteBufferCosts*1e4/(Facility_tpOriginalTenor*Facility_tpOriginalLimit/12-.5*((Facility_tpOriginalTenor-Facility_tpGracePeriod)/12)*(Facility_tpOriginalLimit-Facility_tpBalloon)),NA) */
function Facility_tpYearlyIndirectLiqCostsLinearAnnuity_value(f, x, y, z, v) {
    return Facility_tpProductredemptionDetailsRedemptionType_value(
        '100560',
        x,
        y,
        z,
        v
    ) ==
    'Linear' || Facility_tpProductredemptionDetailsRedemptionType_value(
        '100560',
        x,
        y,
        z,
        v
    ) ==
    'Annuity' ? Facility_tpAbsoluteBufferCosts_value(
        '101351',
        x,
        y,
        z,
        v
    ) * 1 / (
        Facility_tpOriginalTenor_value(
            '100611',
            x,
            y,
            z,
            v
        ) *
        Facility_tpOriginalLimit_value(
            '101363',
            x,
            y,
            z,
            v
        ) / 12 - .5 * (
            (
                Facility_tpOriginalTenor_value(
                    '100611',
                    x,
                    y,
                    z,
                    v
                ) -
                Facility_tpGracePeriod_value(
                    '100672',
                    x,
                    y,
                    z,
                    v
                )
            ) / 12
        ) * (
            Facility_tpOriginalLimit_value(
                '101363',
                x,
                y,
                z,
                v
            ) -
            Facility_tpBalloon_value(
                '100670',
                x,
                y,
                z,
                v
            )
        )
    ) : NA;
}

/* AABPRICING_Facility_tpYearlyIndirectLiqCostsLinearAnnuity_title:'Risk Adjusted Return - Interest Expenses - Yearly Indirect Liq. Costs (Bps) Lin/Annuity' */
function Facility_tpYearlyIndirectLiqCostsLinearAnnuity_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Yearly Indirect Liq. Costs (Bps) Lin/Annuity';
}

/* AABPRICING_Facility_tpYearlyIndirectLiqCostsScheme_value:If(Facility_tpProductredemptionDetailsRedemptionType=='IrregularRepaymentSchedule',Facility_tpAbsoluteBufferCosts/Facility_tpWeightedLimitOutstanding*1e4,NA) */
function Facility_tpYearlyIndirectLiqCostsScheme_value(f, x, y, z, v) {
    return Facility_tpProductredemptionDetailsRedemptionType_value(
        '100560',
        x,
        y,
        z,
        v
    ) ==
    'IrregularRepaymentSchedule' ? Facility_tpAbsoluteBufferCosts_value(
        '101351',
        x,
        y,
        z,
        v
        ) /
        Facility_tpWeightedLimitOutstanding_value(
            '101365',
            x,
            y,
            z,
            v
        ) * 1e4 : NA;
}

/* AABPRICING_Facility_tpYearlyIndirectLiqCostsScheme_title:'Risk Adjusted Return - Interest Expenses - Yearly Indirect Liq. Costs (Bps) Scheme' */
function Facility_tpYearlyIndirectLiqCostsScheme_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Yearly Indirect Liq. Costs (Bps) Scheme';
}

/* AABPRICING_Facility_tpTermLoanYearlyIndirectLiqCosts_value:If(Facility_tpOriginalTenor>12,Facility_tpYearlyIndirectLiqCosts*1e-4*Facility_tpExpectedAverageOutstanding,Facility_tpYearlyIndirectLiqCosts*1e-4*Facility_tpExpectedAverageOutstanding*(Facility_tpOriginalTenor/12)) */
function Facility_tpTermLoanYearlyIndirectLiqCosts_value(f, x, y, z, v) {
    return Facility_tpOriginalTenor_value(
        '100611',
        x,
        y,
        z,
        v
    ) >
    12 ? Facility_tpYearlyIndirectLiqCosts_value(
        '101353',
        x,
        y,
        z,
        v
        ) * 1 - 4 *
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) : Facility_tpYearlyIndirectLiqCosts_value(
        '101353',
        x,
        y,
        z,
        v
        ) * 1 - 4 *
        Facility_tpExpectedAverageOutstanding_value(
            '100529',
            x,
            y,
            z,
            v
        ) * (
            Facility_tpOriginalTenor_value(
                '100611',
                x,
                y,
                z,
                v
            ) / 12
        );
}

/* AABPRICING_Facility_tpTermLoanYearlyIndirectLiqCosts_title:'Risk Adjusted Return - Interest Expenses - Term Loan Yearly Indirect Liq. Costs ()' */
function Facility_tpTermLoanYearlyIndirectLiqCosts_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Term Loan Yearly Indirect Liq. Costs ()';
}

/* AABPRICING_Facility_tpOriginalLimit_value:Facility_tpPrincipalLimit */
function Facility_tpOriginalLimit_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpOriginalLimit_title:'Risk Adjusted Return - Interest Expenses - Original Limit ()' */
function Facility_tpOriginalLimit_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Original Limit ()';
}

/* AABPRICING_Facility_tpWeightedLimitOutstanding_value:Facility_tpPrincipalLimit */
function Facility_tpWeightedLimitOutstanding_value(f, x, y, z, v) {
    return Facility_tpPrincipalLimit_value(
        '100544',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpWeightedLimitOutstanding_title:'Risk Adjusted Return - Interest Expenses - Weighted Limited Outstanding' */
function Facility_tpWeightedLimitOutstanding_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Weighted Limited Outstanding';
}

/* AABPRICING_Facility_tpSubordinatedDebtCapitalCharge_value:OnER(Facility_tpRWA*Facility_tpSubDebtRatio*(Facility_tpCostOfSubordination/1e4)*Facility_tpDeannualize,NA) */
function Facility_tpSubordinatedDebtCapitalCharge_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRWA_value(
            '101380',
            x,
            y,
            z,
            v
        ) *
        Facility_tpSubDebtRatio_value(
            '101368',
            x,
            y,
            z,
            v
        ) * (
            Facility_tpCostOfSubordination_value(
                '101370',
                x,
                y,
                z,
                v
            ) / 1e4
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpSubDebtRatio_value:AgreementSubDebtRatio */
function Facility_tpSubDebtRatio_value(f, x, y, z, v) {
    return AgreementSubDebtRatio_value(
        '100116',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Facility_tpSubDebtRatio_title:'Risk Adjusted Return - Interest Expenses - Subordinated Debt Capital Charge - Subordinated Debt Ratio ()' */
function Facility_tpSubDebtRatio_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Subordinated Debt Capital Charge - Subordinated Debt Ratio ()';
}

/* AABPRICING_Facility_tpCostOfSubordination_value:AgreementCostOfSubordination */
function Facility_tpCostOfSubordination_value(f, x, y, z, v) {
    return AgreementCostOfSubordination_value(
        '100118',
        x,
        y.base,
        z,
        v
    );
}

/* AABPRICING_Facility_tpCostOfSubordination_title:'Risk Adjusted Return - Interest Expenses - Subordinated Debt Capital Charge - Cost of Subordination (Bps)' */
function Facility_tpCostOfSubordination_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Subordinated Debt Capital Charge - Cost of Subordination (Bps)';
}

/* AABPRICING_Facility_tpEquityFundingAdjustment_value:OnER((Facility_tpRWA*Borrower_tpEquityRatio-AgreementAvailableAmountOfEquity)*(Facility_tpEquityFundingAdjustmentRate/1e4),NA) */
function Facility_tpEquityFundingAdjustment_value(f, x, y, z, v) {
    return OnER(
        (
            Facility_tpRWA_value(
                '101380',
                x,
                y,
                z,
                v
            ) *
            Borrower_tpEquityRatio_value(
                '100270',
                x,
                y.base,
                z,
                v
            ) -
            AgreementAvailableAmountOfEquity_value(
                '100120',
                x,
                y.base,
                z,
                v
            )
        ) * (
            Facility_tpEquityFundingAdjustmentRate_value(
                '101373',
                x,
                y,
                z,
                v
            ) / 1e4
        ),
        NA
    );
}

/* AABPRICING_Facility_tpEquityFundingAdjustmentRate_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','3MAANDSEURIBORBP',2)+Facility_tpLiquiditySpreadBps */
function Facility_tpEquityFundingAdjustmentRate_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        '3MAANDSEURIBORBP',
        2
        ) +
        Facility_tpLiquiditySpreadBps_value(
            '101249',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpEquityFundingAdjustmentRate_title:'Risk Adjusted Return - Interest Expenses - Equity Funding Adjustment - Adjustment Rate' */
function Facility_tpEquityFundingAdjustmentRate_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Equity Funding Adjustment - Adjustment Rate';
}

/* AABPRICING_Facility_tpInterestRateIndexBasis_value:OnEr(MatrixLookup('AAB_Parameters.xls','CustomerSpreadAddMargin',Facility_tpProductinterestDetailsInterestProductName,2),NA) */
function Facility_tpInterestRateIndexBasis_value(f, x, y, z, v) {
    return OnEr(
        MatrixLookup(
            'AAB_Parameters.xls',
            'CustomerSpreadAddMargin',
            Facility_tpProductinterestDetailsInterestProductName_value(
                '100508',
                x,
                y,
                z,
                v
            ),
            2
        ),
        NA
    );
}

/* AABPRICING_Facility_tpInterestRateIndexBasis_title:'Risk Adjusted Return - Interest Expenses - Equity Funding Adjustment - Interest Rate Index Basis' */
function Facility_tpInterestRateIndexBasis_title(f, x, y, z, v) {
    return 'Risk Adjusted Return - Interest Expenses - Equity Funding Adjustment - Interest Rate Index Basis';
}

/* AABPRICING_Facility_tpEquityCapitalCharge_value:OnER(Facility_tpRequiredAmountofEquity*Borrower_tpCostofEquity*Facility_tpDeannualize,NA) */
function Facility_tpEquityCapitalCharge_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRequiredAmountofEquity_value(
            '101378',
            x,
            y,
            z,
            v
        ) *
        Borrower_tpCostofEquity_value(
            '100272',
            x,
            y.base,
            z,
            v
        ) *
        Facility_tpDeannualize_value(
            '100606',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRequiredAmountofEquity_value:OnER(Facility_tpRWA*Borrower_tpEquityRatio,NA) */
function Facility_tpRequiredAmountofEquity_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRWA_value(
            '101380',
            x,
            y,
            z,
            v
        ) *
        Borrower_tpEquityRatio_value(
            '100270',
            x,
            y.base,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRequiredAmountofEquity_title:'Regulatory Profit - Equity Capital Charge - Required Amount of Equity' */
function Facility_tpRequiredAmountofEquity_title(f, x, y, z, v) {
    return 'Regulatory Profit - Equity Capital Charge - Required Amount of Equity';
}

/* AABPRICING_Facility_tpRWA_value:OnER(Facility_tpRWACreditRisk+Facility_tpRWAOperationalRisk,NA) */
function Facility_tpRWA_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRWACreditRisk_value(
            '101381',
            x,
            y,
            z,
            v
        ) +
        Facility_tpRWAOperationalRisk_value(
            '101418',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRWACreditRisk_value:OnER(Facility_tpRWACreditRiskGuaranteed+Facility_tpRWACreditRiskUnguaranteed,NA) */
function Facility_tpRWACreditRisk_value(f, x, y, z, v) {
    return OnER(
        Facility_tpRWACreditRiskGuaranteed_value(
            '101405',
            x,
            y,
            z,
            v
        ) +
        Facility_tpRWACreditRiskUnguaranteed_value(
            '101383',
            x,
            y,
            z,
            v
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRWACreditRisk_title:'Risk Weighted Assets - Credit Risk' */
function Facility_tpRWACreditRisk_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Credit Risk';
}

/* AABPRICING_Facility_tpRWACreditRiskUnguaranteed_value:Facility_tpRW*Facility_tpEADUnguaranteed */
function Facility_tpRWACreditRiskUnguaranteed_value(f, x, y, z, v) {
    return Facility_tpRW_value(
        '101403',
        x,
        y,
        z,
        v
        ) *
        Facility_tpEADUnguaranteed_value(
            '101071',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpRWACreditRiskUnguaranteed_title:'Risk Weighted Assets - Credit Risk - Standard/Ungaranteed' */
function Facility_tpRWACreditRiskUnguaranteed_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Credit Risk - Standard/Ungaranteed';
}

/* AABPRICING_Facility_tpMaxMaturityRWA_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','MAX_MATURITY_RWA',2) */
function Facility_tpMaxMaturityRWA_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'MAX_MATURITY_RWA',
        2
    );
}

/* AABPRICING_Facility_tpMaxMaturityRWA_title:'Risk Weighted Assets - Max Maturity RWA' */
function Facility_tpMaxMaturityRWA_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Max Maturity RWA';
}

/* AABPRICING_Facility_tpMinMaturityRWA_value:MatrixLookup('AAB_Parameters.xls','CalculationParameters','MIN_MATURITY_RWA',2) */
function Facility_tpMinMaturityRWA_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'CalculationParameters',
        'MIN_MATURITY_RWA',
        2
    );
}

/* AABPRICING_Facility_tpMinMaturityRWA_title:'Risk Weighted Assets - Min Maturity RWA' */
function Facility_tpMinMaturityRWA_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Min Maturity RWA';
}

/* AABPRICING_Facility_tpShortTermException_value:MatrixLookup('AAB_Parameters.xls','ProductType',Facility_tpType,7) */
function Facility_tpShortTermException_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        7
    );
}

/* AABPRICING_Facility_tpShortTermException_title:'Risk Weighted Assets - Short Term Exception' */
function Facility_tpShortTermException_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Short Term Exception';
}

/* AABPRICING_Facility_tpR_value:If(Facility_tpFI==0,Facility_tpR2,If(Facility_tpFI==1&&Borrower_tpAssetSize<=7e4&&Borrower_tpUnderSupervision==1,Facility_tpR2,Facility_tpR1)) */
function Facility_tpR_value(f, x, y, z, v) {
    return Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) ==
    0 ? Facility_tpR2_value(
        '101395',
        x,
        y,
        z,
        v
    ) : Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) == 1 &&
    Borrower_tpAssetSize_value(
        '100244',
        x,
        y.base,
        z,
        v
    ) <= 7e4 &&
    Borrower_tpUnderSupervision_value(
        '100209',
        x,
        y.base,
        z,
        v
    ) ==
    1 ? Facility_tpR2_value(
        '101395',
        x,
        y,
        z,
        v
    ) : Facility_tpR1_value(
        '101393',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpR_title:'Risk Weighted Assets - Correlation Factor (R)' */
function Facility_tpR_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Correlation Factor (R)';
}

/* AABPRICING_Facility_tpR1_value:(.12*(1-Exp(-50*Facility_tpBorrower_tpPDMoC))/(1-Exp(-50))+.24*((1-(1-Exp(-50*Facility_tpBorrower_tpPDMoC)))/(1-Exp(-50))))*1.25 */
function Facility_tpR1_value(f, x, y, z, v) {
    return (
        .12 * (
            1 -
            Exp(
                -50 *
                Facility_tpBorrower_tpPDMoC_value(
                    '100602',
                    x,
                    y,
                    z,
                    v
                )
            )
        ) / (
            1 -
            Exp(
                -50
            )
        ) + .24 * (
            (
                1 - (
                    1 -
                    Exp(
                        -50 *
                        Facility_tpBorrower_tpPDMoC_value(
                            '100602',
                            x,
                            y,
                            z,
                            v
                        )
                    )
                )
            ) / (
                1 -
                Exp(
                    -50
                )
            )
        )
    ) * 1.25;
}

/* AABPRICING_Facility_tpR1_title:'Risk Weighted Assets - Correlation Factor (R1)' */
function Facility_tpR1_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Correlation Factor (R1)';
}

/* AABPRICING_Facility_tpR2_value:.12*(1-Exp(-50*Facility_tpBorrower_tpPDMoC))/(1-Exp(-50))+.24*((1-(1-Exp(-50*Facility_tpBorrower_tpPDMoC)))/(1-Exp(-50)))-.04*(1-(MAX(5,MIN(50,Borrower_tpAssetSize))-5)/45) */
function Facility_tpR2_value(f, x, y, z, v) {
    return .12 * (
        1 -
        Exp(
            -50 *
            Facility_tpBorrower_tpPDMoC_value(
                '100602',
                x,
                y,
                z,
                v
            )
        )
    ) / (
        1 -
        Exp(
            -50
        )
    ) + .24 * (
        (
            1 - (
                1 -
                Exp(
                    -50 *
                    Facility_tpBorrower_tpPDMoC_value(
                        '100602',
                        x,
                        y,
                        z,
                        v
                    )
                )
            )
        ) / (
            1 -
            Exp(
                -50
            )
        )
    ) - .04 * (
        1 - (
            Math.max(
                5,
                Math.min(
                    50,
                    Borrower_tpAssetSize_value(
                        '100244',
                        x,
                        y.base,
                        z,
                        v
                    )
                )
            ) - 5
        ) / 45
    );
}

/* AABPRICING_Facility_tpR2_title:'Risk Weighted Assets - Correlation Factor (R2)' */
function Facility_tpR2_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Correlation Factor (R2)';
}

/* AABPRICING_Facility_tpb_value:OnER(.11852-.05478*LN(Facility_tpBorrower_tpPDMoC)^2,NA) */
function Facility_tpb_value(f, x, y, z, v) {
    return OnER(
        .11852 - .05478 *
        LN(
            Facility_tpBorrower_tpPDMoC_value(
                '100602',
                x,
                y,
                z,
                v
            )
        ) ^ 2,
        NA
    );
}

/* AABPRICING_Facility_tpb_title:'Risk Weighted Assets - Maturity Adjustment Factor (b)' */
function Facility_tpb_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Maturity Adjustment Factor (b)';
}

/* AABPRICING_Facility_tpMWRA_value:OnER(IF(Facility_tpShortTermException,Max(Min(Facility_tpMaxMaturityRWA,Facility_tpRemainingAverageTenor),1/365),Max(Min(Facility_tpMaxMaturityRWA,Facility_tpRemainingAverageTenor),Facility_tpMinMaturityRWA)),NA) */
function Facility_tpMWRA_value(f, x, y, z, v) {
    return OnER(
        Facility_tpShortTermException_value(
            '101389',
            x,
            y,
            z,
            v
        ) ? Math.max(
            Math.min(
                Facility_tpMaxMaturityRWA_value(
                    '101385',
                    x,
                    y,
                    z,
                    v
                ),
                Facility_tpRemainingAverageTenor_value(
                    '100527',
                    x,
                    y,
                    z,
                    v
                )
            ),
            1 / 365
        ) : Math.max(
            Math.min(
                Facility_tpMaxMaturityRWA_value(
                    '101385',
                    x,
                    y,
                    z,
                    v
                ),
                Facility_tpRemainingAverageTenor_value(
                    '100527',
                    x,
                    y,
                    z,
                    v
                )
            ),
            Facility_tpMinMaturityRWA_value(
                '101387',
                x,
                y,
                z,
                v
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpMWRA_title:'Risk Weighted Assets - MWRA Factor' */
function Facility_tpMWRA_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - MWRA Factor';
}

/* AABPRICING_Facility_tpK_value:OnER((Facility_tpDLGDMoC*CumNormal((1-Facility_tpR^-.5)*InvNormal(Facility_tpBorrower_tpPDMoC)+(Facility_tpR/(1-Facility_tpR)^.5)*InvNormal(.999))-Facility_tpBorrower_tpPDMoC*Facility_tpDLGDMoC)*(1-1.5*Facility_tpb^-1)*(1+(Facility_tpMWRA-2.5)*Facility_tpb),NA) */
function Facility_tpK_value(f, x, y, z, v) {
    return OnER(
        (
            Facility_tpDLGDMoC_value(
                '100574',
                x,
                y,
                z,
                v
            ) *
            CumNormal(
                (
                    1 -
                    Facility_tpR_value(
                        '101391',
                        x,
                        y,
                        z,
                        v
                    ) ^ -.5
                ) *
                InvNormal(
                    Facility_tpBorrower_tpPDMoC_value(
                        '100602',
                        x,
                        y,
                        z,
                        v
                    )
                ) + (
                    Facility_tpR_value(
                        '101391',
                        x,
                        y,
                        z,
                        v
                    ) / (
                        1 -
                        Facility_tpR_value(
                            '101391',
                            x,
                            y,
                            z,
                            v
                        )
                    ) ^ .5
                ) *
                InvNormal(
                    .999
                )
            ) -
            Facility_tpBorrower_tpPDMoC_value(
                '100602',
                x,
                y,
                z,
                v
            ) *
            Facility_tpDLGDMoC_value(
                '100574',
                x,
                y,
                z,
                v
            )
        ) * (
            1 - 1.5 *
            Facility_tpb_value(
                '101397',
                x,
                y,
                z,
                v
            ) ^ -1
        ) * (
            1 + (
                Facility_tpMWRA_value(
                    '101399',
                    x,
                    y,
                    z,
                    v
                ) - 2.5
            ) *
            Facility_tpb_value(
                '101397',
                x,
                y,
                z,
                v
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpK_title:'Risk Weighted Assets - Capital Requirement (K)' */
function Facility_tpK_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Capital Requirement (K)';
}

/* AABPRICING_Facility_tpRW_value:OnER(Facility_tpK*12.5*1.06,NA) */
function Facility_tpRW_value(f, x, y, z, v) {
    return OnER(
        Facility_tpK_value(
            '101401',
            x,
            y,
            z,
            v
        ) * 12.5 * 1.06,
        NA
    );
}

/* AABPRICING_Facility_tpRW_title:'Risk Weighted Assets - Risk Weight Factor (RW)' */
function Facility_tpRW_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Risk Weight Factor (RW)';
}

/* AABPRICING_Facility_tpRWACreditRiskGuaranteed_value:Facility_tpRWGuaranteed*Facility_tpEADGuaranteed */
function Facility_tpRWACreditRiskGuaranteed_value(f, x, y, z, v) {
    return Facility_tpRWGuaranteed_value(
        '101417',
        x,
        y,
        z,
        v
        ) *
        Facility_tpEADGuaranteed_value(
            '101077',
            x,
            y,
            z,
            v
        );
}

/* AABPRICING_Facility_tpRWACreditRiskGuaranteed_title:'Risk Weighted Assets - Credit Risk - Guarantees' */
function Facility_tpRWACreditRiskGuaranteed_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Credit Risk - Guarantees';
}

/* AABPRICING_Facility_tpPDMoCGuaranteed_value:If(Facility_tpGuarantorPercentageGuaranteed>0&&Facility_tpGuarantorPDMoC<Facility_tpBorrower_tpPDMoC,Facility_tpGuarantorPDMoC,Facility_tpBorrower_tpPDMoC) */
function Facility_tpPDMoCGuaranteed_value(f, x, y, z, v) {
    return Facility_tpGuarantorPercentageGuaranteed_value(
        '100960',
        x,
        y,
        z,
        v
    ) > 0 &&
    Facility_tpGuarantorPDMoC_value(
        '100969',
        x,
        y,
        z,
        v
    ) <
    Facility_tpBorrower_tpPDMoC_value(
        '100602',
        x,
        y,
        z,
        v
    ) ? Facility_tpGuarantorPDMoC_value(
        '100969',
        x,
        y,
        z,
        v
    ) : Facility_tpBorrower_tpPDMoC_value(
        '100602',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpPDMoCGuaranteed_title:'Risk Weighted Assets - PD Moc Min' */
function Facility_tpPDMoCGuaranteed_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - PD Moc Min';
}

/* AABPRICING_Facility_tpDLGDMoCGuaranteed_value:Facility_tpDLGDMoC */
function Facility_tpDLGDMoCGuaranteed_value(f, x, y, z, v) {
    return Facility_tpDLGDMoC_value(
        '100574',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpDLGDMoCGuaranteed_title:'Risk Weighted Assets - D LGD MoC Min' */
function Facility_tpDLGDMoCGuaranteed_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - D LGD MoC Min';
}

/* AABPRICING_Facility_tpRGuaranteed_value:If(Borrower_tpFinancialInstitutionChoice==0,Facility_tpR2Guaranteed,If(Facility_tpFI==1&&Borrower_tpAssetSize<=7e4&&Borrower_tpUnderSupervision==1,Facility_tpR2Guaranteed,Facility_tpR1Guaranteed)) */
function Facility_tpRGuaranteed_value(f, x, y, z, v) {
    return Borrower_tpFinancialInstitutionChoice_value(
        '100207',
        x,
        y.base,
        z,
        v
    ) ==
    0 ? Facility_tpR2Guaranteed_value(
        '101413',
        x,
        y,
        z,
        v
    ) : Facility_tpFI_value(
        '101305',
        x,
        y,
        z,
        v
    ) == 1 &&
    Borrower_tpAssetSize_value(
        '100244',
        x,
        y.base,
        z,
        v
    ) <= 7e4 &&
    Borrower_tpUnderSupervision_value(
        '100209',
        x,
        y.base,
        z,
        v
    ) ==
    1 ? Facility_tpR2Guaranteed_value(
        '101413',
        x,
        y,
        z,
        v
    ) : Facility_tpR1Guaranteed_value(
        '101412',
        x,
        y,
        z,
        v
    );
}

/* AABPRICING_Facility_tpR1Guaranteed_value:(.12*(1-Exp(-50*Facility_tpPDMoCGuaranteed))/(1-Exp(-50))+.24*((1-(1-Exp(-50*Facility_tpPDMoCGuaranteed)))/(1-Exp(-50))))*1.25 */
function Facility_tpR1Guaranteed_value(f, x, y, z, v) {
    return (
        .12 * (
            1 -
            Exp(
                -50 *
                Facility_tpPDMoCGuaranteed_value(
                    '101407',
                    x,
                    y,
                    z,
                    v
                )
            )
        ) / (
            1 -
            Exp(
                -50
            )
        ) + .24 * (
            (
                1 - (
                    1 -
                    Exp(
                        -50 *
                        Facility_tpPDMoCGuaranteed_value(
                            '101407',
                            x,
                            y,
                            z,
                            v
                        )
                    )
                )
            ) / (
                1 -
                Exp(
                    -50
                )
            )
        )
    ) * 1.25;
}

/* AABPRICING_Facility_tpR2Guaranteed_value:.12*(1-Exp(-50*Facility_tpPDMoCGuaranteed))/(1-Exp(-50))+.24*((1-(1-Exp(-50*Facility_tpPDMoCGuaranteed)))/(1-Exp(-50)))-.04*(1-(MAX(5,MIN(50,Borrower_tpAssetSize))-5)/45) */
function Facility_tpR2Guaranteed_value(f, x, y, z, v) {
    return .12 * (
        1 -
        Exp(
            -50 *
            Facility_tpPDMoCGuaranteed_value(
                '101407',
                x,
                y,
                z,
                v
            )
        )
    ) / (
        1 -
        Exp(
            -50
        )
    ) + .24 * (
        (
            1 - (
                1 -
                Exp(
                    -50 *
                    Facility_tpPDMoCGuaranteed_value(
                        '101407',
                        x,
                        y,
                        z,
                        v
                    )
                )
            )
        ) / (
            1 -
            Exp(
                -50
            )
        )
    ) - .04 * (
        1 - (
            Math.max(
                5,
                Math.min(
                    50,
                    Borrower_tpAssetSize_value(
                        '100244',
                        x,
                        y.base,
                        z,
                        v
                    )
                )
            ) - 5
        ) / 45
    );
}

/* AABPRICING_Facility_tpbGuaranteed_value:OnER(.11852-.05478*LN(Facility_tpPDMoCGuaranteed)^2,NA) */
function Facility_tpbGuaranteed_value(f, x, y, z, v) {
    return OnER(
        .11852 - .05478 *
        LN(
            Facility_tpPDMoCGuaranteed_value(
                '101407',
                x,
                y,
                z,
                v
            )
        ) ^ 2,
        NA
    );
}

/* AABPRICING_Facility_tpMWRAGuaranteed_value:OnER(IF(Facility_tpShortTermException,Max(Min(Facility_tpMaxMaturityRWA,Facility_tpRemainingAverageTenor),1/365),Max(Min(Facility_tpMaxMaturityRWA,Facility_tpRemainingAverageTenor),Facility_tpMinMaturityRWA)),NA) */
function Facility_tpMWRAGuaranteed_value(f, x, y, z, v) {
    return OnER(
        Facility_tpShortTermException_value(
            '101389',
            x,
            y,
            z,
            v
        ) ? Math.max(
            Math.min(
                Facility_tpMaxMaturityRWA_value(
                    '101385',
                    x,
                    y,
                    z,
                    v
                ),
                Facility_tpRemainingAverageTenor_value(
                    '100527',
                    x,
                    y,
                    z,
                    v
                )
            ),
            1 / 365
        ) : Math.max(
            Math.min(
                Facility_tpMaxMaturityRWA_value(
                    '101385',
                    x,
                    y,
                    z,
                    v
                ),
                Facility_tpRemainingAverageTenor_value(
                    '100527',
                    x,
                    y,
                    z,
                    v
                )
            ),
            Facility_tpMinMaturityRWA_value(
                '101387',
                x,
                y,
                z,
                v
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpKGuaranteed_value:OnER((Facility_tpDLGDMoCGuaranteed*CumNormal((1-Facility_tpRGuaranteed^-.5)*InvNormal(Facility_tpPDMoCGuaranteed)+(Facility_tpRGuaranteed/(1-Facility_tpRGuaranteed)^.5)*InvNormal(.999))-Facility_tpPDMoCGuaranteed*Facility_tpDLGDMoCGuaranteed)*(1-1.5*Facility_tpbGuaranteed^-1)*(1+(Facility_tpMWRAGuaranteed-2.5)*Facility_tpbGuaranteed),NA) */
function Facility_tpKGuaranteed_value(f, x, y, z, v) {
    return OnER(
        (
            Facility_tpDLGDMoCGuaranteed_value(
                '101409',
                x,
                y,
                z,
                v
            ) *
            CumNormal(
                (
                    1 -
                    Facility_tpRGuaranteed_value(
                        '101411',
                        x,
                        y,
                        z,
                        v
                    ) ^ -.5
                ) *
                InvNormal(
                    Facility_tpPDMoCGuaranteed_value(
                        '101407',
                        x,
                        y,
                        z,
                        v
                    )
                ) + (
                    Facility_tpRGuaranteed_value(
                        '101411',
                        x,
                        y,
                        z,
                        v
                    ) / (
                        1 -
                        Facility_tpRGuaranteed_value(
                            '101411',
                            x,
                            y,
                            z,
                            v
                        )
                    ) ^ .5
                ) *
                InvNormal(
                    .999
                )
            ) -
            Facility_tpPDMoCGuaranteed_value(
                '101407',
                x,
                y,
                z,
                v
            ) *
            Facility_tpDLGDMoCGuaranteed_value(
                '101409',
                x,
                y,
                z,
                v
            )
        ) * (
            1 - 1.5 *
            Facility_tpbGuaranteed_value(
                '101414',
                x,
                y,
                z,
                v
            ) ^ -1
        ) * (
            1 + (
                Facility_tpMWRAGuaranteed_value(
                    '101415',
                    x,
                    y,
                    z,
                    v
                ) - 2.5
            ) *
            Facility_tpbGuaranteed_value(
                '101414',
                x,
                y,
                z,
                v
            )
        ),
        NA
    );
}

/* AABPRICING_Facility_tpRWGuaranteed_value:OnER(Facility_tpKGuaranteed*12.5*1.06,NA) */
function Facility_tpRWGuaranteed_value(f, x, y, z, v) {
    return OnER(
        Facility_tpKGuaranteed_value(
            '101416',
            x,
            y,
            z,
            v
        ) * 12.5 * 1.06,
        NA
    );
}

/* AABPRICING_Facility_tpRWAOperationalRisk_value:Facility_tpRWAOpR*(Facility_tpCreditIncome-Facility_tpDirectLiquidityPremium) */
function Facility_tpRWAOperationalRisk_value(f, x, y, z, v) {
    return Facility_tpRWAOpR_value(
        '101420',
        x,
        y,
        z,
        v
    ) * (
        Facility_tpCreditIncome_value(
            '101160',
            x,
            y,
            z,
            v
        ) -
        Facility_tpDirectLiquidityPremium_value(
            '101248',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpRWAOperationalRisk_title:'Risk Weighted Assets - Operational Risk' */
function Facility_tpRWAOperationalRisk_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - Operational Risk';
}

/* AABPRICING_Facility_tpRWAOpR_value:MatrixLookup('AAB_Parameters.xls','ClientGroup',Borrower_tpClientGroup,7) */
function Facility_tpRWAOpR_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'ClientGroup',
        Borrower_tpClientGroup_value(
            '100195',
            x,
            y.base,
            z,
            v
        ),
        7
    );
}

/* AABPRICING_Facility_tpRWAOpR_title:'Risk Weighted Assets - RWA OpR ()' */
function Facility_tpRWAOpR_title(f, x, y, z, v) {
    return 'Risk Weighted Assets - RWA OpR ()';
}

/* AABPRICING_Facility_tpDataExportedToForce_value:undefined */
function Facility_tpDataExportedToForce_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpDataExportedToForce_title:'Exported Data' */
function Facility_tpDataExportedToForce_title(f, x, y, z, v) {
    return 'Exported Data';
}

/* AABPRICING_Facility_tpDataExportedToForceSub1_value:undefined */
function Facility_tpDataExportedToForceSub1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpDataExportedToForceSub2_value:undefined */
function Facility_tpDataExportedToForceSub2_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpDataExportedToForceSub2_title:'Return on Equity' */
function Facility_tpDataExportedToForceSub2_title(f, x, y, z, v) {
    return 'Return on Equity';
}

/* AABPRICING_Facility_tpDataExportedToForceSub3_value:undefined */
function Facility_tpDataExportedToForceSub3_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpDataExportedToForceSub4_value:undefined */
function Facility_tpDataExportedToForceSub4_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Facility_tpRequiredCustomerSpread_value:Facility_tpCustomerSpread/1e4 */
function Facility_tpRequiredCustomerSpread_value(f, x, y, z, v) {
    return Facility_tpCustomerSpread_value(
        '101195',
        x,
        y,
        z,
        v
    ) / 1e4;
}

/* AABPRICING_Facility_tpRequiredCustomerSpread_title:'Required Customer Spread' */
function Facility_tpRequiredCustomerSpread_title(f, x, y, z, v) {
    return 'Required Customer Spread';
}

/* AABPRICING_Facility_tpRequiredMarketSpread_value:MatrixLookup('AAB_Parameters.xls','MarketSpread',Facility_tpProductinterestDetailsInterestProductName,Facility_tpTypeIndex) */
function Facility_tpRequiredMarketSpread_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'MarketSpread',
        Facility_tpProductinterestDetailsInterestProductName_value(
            '100508',
            x,
            y,
            z,
            v
        ),
        Facility_tpTypeIndex_value(
            '101433',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_Facility_tpRequiredMarketSpread_title:'Required Market Spread' */
function Facility_tpRequiredMarketSpread_title(f, x, y, z, v) {
    return 'Required Market Spread';
}

/* AABPRICING_Facility_tpTypeIndex_value:MatrixLookup('AAB_Parameters.xls','VertaaltabelProductType',Facility_tpType,2) */
function Facility_tpTypeIndex_value(f, x, y, z, v) {
    return MatrixLookup(
        'AAB_Parameters.xls',
        'VertaaltabelProductType',
        Facility_tpType_value(
            '100536',
            x,
            y,
            z,
            v
        ),
        2
    );
}

/* AABPRICING_Facility_tpTypeIndex_title:'Facility Type Index' */
function Facility_tpTypeIndex_title(f, x, y, z, v) {
    return 'Facility Type Index';
}

/* AABPRICING_Facility_tpRequiredLiquiditySpread_value:Facility_tpLiquiditySpreadBps/1e4 */
function Facility_tpRequiredLiquiditySpread_value(f, x, y, z, v) {
    return Facility_tpLiquiditySpreadBps_value(
        '101249',
        x,
        y,
        z,
        v
    ) / 1e4;
}

/* AABPRICING_Facility_tpRequiredLiquiditySpread_title:'Required Liquidity Spread' */
function Facility_tpRequiredLiquiditySpread_title(f, x, y, z, v) {
    return 'Required Liquidity Spread';
}

/* AABPRICING_FacilityTotal_value:TupleSum(Facility_tpPrincipalLimit) */
function FacilityTotal_value(f, x, y, z, v) {
    return TupleSum(
        Facility_tpPrincipalLimit_value(
            '100544',
            x,
            y,
            z,
            v
        )
    );
}

/* AABPRICING_FacilityTotal_title:'Total' */
function FacilityTotal_title(f, x, y, z, v) {
    return 'Total';
}

/* AABPRICING_Other_value:undefined */
function Other_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Other_title:'Other' */
function Other_title(f, x, y, z, v) {
    return 'Other';
}

/* AABPRICING_VersionInfoText_value:EvaluateAsString(Q_MODELTYPE+' '+Q_MODELVERSION+' (Matrix '+Q_MATRIXVERSION+')') */
function VersionInfoText_value(f, x, y, z, v) {
    return String(
        Q_MODELTYPE_value(
            '101481',
            x,
            y.base,
            z,
            v
        ) + ' ' +
        Q_MODELVERSION_value(
            '101479',
            x,
            y.base,
            z,
            v
        ) + ' (Matrix ' +
        Q_MATRIXVERSION_value(
            '101483',
            x,
            y.base,
            z,
            v
        ) + ')'
    );
}

/* AABPRICING_VersionInfoText_title:'Versions' */
function VersionInfoText_title(f, x, y, z, v) {
    return 'Versions';
}

/* AABPRICING_WindowsUserName_value:'Ronald van Aalderen' */
function WindowsUserName_value(f, x, y, z, v) {
    return 'Ronald van Aalderen';
}

/* AABPRICING_WindowsUserName_title:'Gemaakt door' */
function WindowsUserName_title(f, x, y, z, v) {
    return 'Gemaakt door';
}

/* AABPRICING_CurrentDate_value:42768.572977187 */
function CurrentDate_value(f, x, y, z, v) {
    return 42768.572977187;
}

/* AABPRICING_CurrentDate_title:'Generated at' */
function CurrentDate_title(f, x, y, z, v) {
    return 'Generated at';
}

/* AABPRICING_FinanFullVersion_value:'03.02.056.023' */
function FinanFullVersion_value(f, x, y, z, v) {
    return '03.02.056.023';
}

/* AABPRICING_FinanFullVersion_title:'Gemaakt XML-applicatie version' */
function FinanFullVersion_title(f, x, y, z, v) {
    return 'Gemaakt XML-applicatie version';
}

/* AABPRICING_Q_MAP01_HULPVARIABELEN_value:undefined */
function Q_MAP01_HULPVARIABELEN_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_MAP01_HULPVARIABELEN_title:'Hulpvariabelen' */
function Q_MAP01_HULPVARIABELEN_title(f, x, y, z, v) {
    return 'Hulpvariabelen';
}

/* AABPRICING_Q_MAP01_REQUIREDVARS_value:Count(X,SelectDescendants(Q_MAP01,Q_MAP01_HULPVARIABELEN),InputRequired(X)) */
function Q_MAP01_REQUIREDVARS_value(f, x, y, z, v) {
    return Count(
        [false, false, false, false, false, false]
    );
}

/* AABPRICING_Q_MAP01_REQUIREDVARS_title:'Aantal verplichte velden (1)' */
function Q_MAP01_REQUIREDVARS_title(f, x, y, z, v) {
    return 'Aantal verplichte velden (1)';
}

/* AABPRICING_Q_MAP01_ENTEREDREQUIREDVARS_value:Count(X,SelectDescendants(Q_MAP01,Q_MAP01_HULPVARIABELEN),InputRequired(X)&&DataAvailable(X)) */
function Q_MAP01_ENTEREDREQUIREDVARS_value(f, x, y, z, v) {
    return Count(
        [false && v[100082][x.hash + y.hash + z] !== undefined,
            false && v[100084][x.hash + y.hash + z] !== undefined,
            false && v[100086][x.hash + y.hash + z] !== undefined,
            false && v[100088][x.hash + y.hash + z] !== undefined,
            false && v[100184][x.hash + y.hash + z] !== undefined,
            false && v[101439][x.hash + y.hash + z] !== undefined]
    );
}

/* AABPRICING_Q_MAP01_ENTEREDREQUIREDVARS_title:'Aantal ingevulde verplichte velden (1)' */
function Q_MAP01_ENTEREDREQUIREDVARS_title(f, x, y, z, v) {
    return 'Aantal ingevulde verplichte velden (1)';
}

/* AABPRICING_Q_MAP01_SUMFOR_value:SumFor(X,1,12,1,PPMT(1,X,24,-1e5,0)) */
function Q_MAP01_SUMFOR_value(f, x, y, z, v) {
    return SumFor(
        X,
        1,
        12,
        1,
        PPMT(
            1,
            X,
            24,
            -1e5,
            0
        )
    );
}

/* AABPRICING_Q_MAP01_SUMFOR_title:'test variable for SumFor' */
function Q_MAP01_SUMFOR_title(f, x, y, z, v) {
    return 'test variable for SumFor';
}

/* AABPRICING_Q_RESULT_value:undefined */
function Q_RESULT_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_RESULT_title:'Results' */
function Q_RESULT_title(f, x, y, z, v) {
    return 'Results';
}

/* AABPRICING_Q_RESULTSUB1_value:undefined */
function Q_RESULTSUB1_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_ROLE_value:0 */
function Q_ROLE_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Q_ROLE_title:'Role' */
function Q_ROLE_title(f, x, y, z, v) {
    return 'Role';
}

/* AABPRICING_Q_ROLE_choices:[{'name':' 0','value':'Tester'},{'name':'2','value':'RM'},{'name':'3','value':'FB'}] */
function Q_ROLE_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'Tester'}, {'name': '2', 'value': 'RM'}, {'name': '3', 'value': 'FB'}];
}

/* AABPRICING_Q_STATUS_value:0 */
function Q_STATUS_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Q_STATUS_choices:[{'name':' 0','value':'Open'},{'name':'1','value':'Final'}] */
function Q_STATUS_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'Open'}, {'name': '1', 'value': 'Final'}];
}

/* AABPRICING_Q_STATUS_FINAL_ON_value:undefined */
function Q_STATUS_FINAL_ON_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_STATUS_FINAL_ON_title:'Made final on, ' */
function Q_STATUS_FINAL_ON_title(f, x, y, z, v) {
    return 'Made final on, ';
}

/* AABPRICING_Q_STATUS_FINAL_BY_value:undefined */
function Q_STATUS_FINAL_BY_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_STATUS_FINAL_BY_title:'Made final by (username), ' */
function Q_STATUS_FINAL_BY_title(f, x, y, z, v) {
    return 'Made final by (username), ';
}

/* AABPRICING_Q_STATUS_FINAL_BY_NAME_value:undefined */
function Q_STATUS_FINAL_BY_NAME_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_STATUS_FINAL_BY_NAME_title:'Made final by (fullname), ' */
function Q_STATUS_FINAL_BY_NAME_title(f, x, y, z, v) {
    return 'Made final by (fullname), ';
}

/* AABPRICING_Q_STATUS_STARTED_ON_value:undefined */
function Q_STATUS_STARTED_ON_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_STATUS_STARTED_ON_title:'Created on, ' */
function Q_STATUS_STARTED_ON_title(f, x, y, z, v) {
    return 'Created on, ';
}

/* AABPRICING_Q_STATUS_STARTED_BY_value:undefined */
function Q_STATUS_STARTED_BY_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_STATUS_STARTED_BY_title:'Created by (username), ' */
function Q_STATUS_STARTED_BY_title(f, x, y, z, v) {
    return 'Created by (username), ';
}

/* AABPRICING_Q_STATUS_STARTED_BY_NAME_value:undefined */
function Q_STATUS_STARTED_BY_NAME_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Q_STATUS_STARTED_BY_NAME_title:'Created by (fullname), ' */
function Q_STATUS_STARTED_BY_NAME_title(f, x, y, z, v) {
    return 'Created by (fullname), ';
}

/* AABPRICING_Q_STATUS_MODIFIED_ON_value:Now */
function Q_STATUS_MODIFIED_ON_value(f, x, y, z, v) {
    return Now;
}

/* AABPRICING_Q_STATUS_MODIFIED_ON_title:'Last modification, ' */
function Q_STATUS_MODIFIED_ON_title(f, x, y, z, v) {
    return 'Last modification, ';
}

/* AABPRICING_Q_MODELVERSION_value:'01.34.002.000' */
function Q_MODELVERSION_value(f, x, y, z, v) {
    return '01.34.002.000';
}

/* AABPRICING_Q_MODELVERSION_title:'Model version' */
function Q_MODELVERSION_title(f, x, y, z, v) {
    return 'Model version';
}

/* AABPRICING_Q_MODELTYPE_value:'AABPRICING' */
function Q_MODELTYPE_value(f, x, y, z, v) {
    return 'AABPRICING';
}

/* AABPRICING_Q_MODELTYPE_title:'Model type' */
function Q_MODELTYPE_title(f, x, y, z, v) {
    return 'Model type';
}

/* AABPRICING_Q_MATRIXVERSION_value:EvaluateAsString(MatrixLookup('AAB_Parameters.xls','Version',1,3)) */
function Q_MATRIXVERSION_value(f, x, y, z, v) {
    return String(
        MatrixLookup(
            'AAB_Parameters.xls',
            'Version',
            1,
            3
        )
    );
}

/* AABPRICING_Q_MATRIXVERSION_title:'Matrix version' */
function Q_MATRIXVERSION_title(f, x, y, z, v) {
    return 'Matrix version';
}

/* AABPRICING_Q_PREVIOUS_BUTTON_VISIBLE_value:2 */
function Q_PREVIOUS_BUTTON_VISIBLE_value(f, x, y, z, v) {
    return 2;
}

/* AABPRICING_Q_PREVIOUS_BUTTON_VISIBLE_title:'Previous' */
function Q_PREVIOUS_BUTTON_VISIBLE_title(f, x, y, z, v) {
    return 'Previous';
}

/* AABPRICING_Q_PREVIOUS_BUTTON_VISIBLE_choices:[{'name':' 0','value':'Nooit'},{'name':'2','value':'Altijd'}] */
function Q_PREVIOUS_BUTTON_VISIBLE_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'Nooit'}, {'name': '2', 'value': 'Altijd'}];
}

/* AABPRICING_Q_NEXT_BUTTON_VISIBLE_value:2 */
function Q_NEXT_BUTTON_VISIBLE_value(f, x, y, z, v) {
    return 2;
}

/* AABPRICING_Q_NEXT_BUTTON_VISIBLE_title:'Next' */
function Q_NEXT_BUTTON_VISIBLE_title(f, x, y, z, v) {
    return 'Next';
}

/* AABPRICING_Q_NEXT_BUTTON_VISIBLE_choices:[{'name':' 0','value':'Nooit'},{'name':'1','value':'Alleen wanneer stap volledig is'},{'name':'2','value':'Altijd'}] */
function Q_NEXT_BUTTON_VISIBLE_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'Nooit'}, {'name': '1', 'value': 'Alleen wanneer stap volledig is'}, {
        'name': '2',
        'value': 'Altijd'
    }];
}

/* AABPRICING_Q_CONCEPT_REPORT_VISIBLE_value:1 */
function Q_CONCEPT_REPORT_VISIBLE_value(f, x, y, z, v) {
    return 1;
}

/* AABPRICING_Q_CONCEPT_REPORT_VISIBLE_title:'Draft report' */
function Q_CONCEPT_REPORT_VISIBLE_title(f, x, y, z, v) {
    return 'Draft report';
}

/* AABPRICING_Q_CONCEPT_REPORT_VISIBLE_choices:[{'name':' 0','value':'Nee'},{'name':'1','value':'Ja'}] */
function Q_CONCEPT_REPORT_VISIBLE_choices(f, x, y, z, v) {
    return [{'name': ' 0', 'value': 'Nee'}, {'name': '1', 'value': 'Ja'}];
}

/* AABPRICING_Q_FINAL_REPORT_VISIBLE_value:0 */
function Q_FINAL_REPORT_VISIBLE_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Q_FINAL_REPORT_VISIBLE_title:'Final report' */
function Q_FINAL_REPORT_VISIBLE_title(f, x, y, z, v) {
    return 'Final report';
}

/* AABPRICING_Q_MAKE_FINAL_VISIBLE_value:0 */
function Q_MAKE_FINAL_VISIBLE_value(f, x, y, z, v) {
    return 0;
}

/* AABPRICING_Q_MAKE_FINAL_VISIBLE_title:'Make it final' */
function Q_MAKE_FINAL_VISIBLE_title(f, x, y, z, v) {
    return 'Make it final';
}

/* AABPRICING_Hulpvariabelen_value:undefined */
function Hulpvariabelen_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_Hulpvariabelen_title:'Overige berekeningen' */
function Hulpvariabelen_title(f, x, y, z, v) {
    return 'Overige berekeningen';
}

/* AABPRICING_Q_WARNING_GLOBAL_value:EvaluateAsString(If(Length(scKnockoutsCombi[doc])>0,'\r\nEr zijn knockouts van toepassing, '+scKnockoutsCombi,'')) */
function Q_WARNING_GLOBAL_value(f, x, y, z, v) {
    return String(
        Length(
            scKnockoutsCombi_value(
                '101502',
                x.doc,
                y.base,
                z,
                v
            )
        ) > 0 ? '\r\nEr zijn knockouts van toepassing, ' +
            scKnockoutsCombi_value(
                '101502',
                x,
                y.base,
                z,
                v
            ) : ''
    );
}

/* AABPRICING_Q_WARNING_GLOBAL_title:'Knockout(s)' */
function Q_WARNING_GLOBAL_title(f, x, y, z, v) {
    return 'Knockout(s)';
}

/* AABPRICING_scKnockoutsCombi_value:undefined */
function scKnockoutsCombi_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_scKnockoutsCombi_title:'Knockouts tekst' */
function scKnockoutsCombi_title(f, x, y, z, v) {
    return 'Knockouts tekst';
}

/* AABPRICING_scRestricties_value:EvaluateAsString(If(Length(scRestrictiesCombi[doc])>0,'\r\n\r\nDe volgende variabelen zijn niet correct gevuld, '+scRestrictiesCombi,'')) */
function scRestricties_value(f, x, y, z, v) {
    return String(
        Length(
            scRestrictiesCombi_value(
                '101506',
                x.doc,
                y.base,
                z,
                v
            )
        ) > 0 ? '\r\n\r\nDe volgende variabelen zijn niet correct gevuld, ' +
            scRestrictiesCombi_value(
                '101506',
                x,
                y.base,
                z,
                v
            ) : ''
    );
}

/* AABPRICING_scRestricties_title:'Restricties' */
function scRestricties_title(f, x, y, z, v) {
    return 'Restricties';
}

/* AABPRICING_scRestrictiesCombi_value:undefined */
function scRestrictiesCombi_value(f, x, y, z, v) {
    return undefined;
}

/* AABPRICING_scRestrictiesCombi_title:'Restricties tekst' */
function scRestrictiesCombi_title(f, x, y, z, v) {
    return 'Restricties tekst';
}

/* Length:{ if (v1 === undefined){return 0;} return v1.length;} */
function Length(v1) {
    if (v1 === undefined) {
        return 0;
    }
    return v1.length;
    ;
}

/* OnER:{ if (isNaN(v)) { return onerrv; } return v; } */
function OnER(v, onerrv) {
    if (isNaN(v)) {
        return onerrv;
    }
    return v;
    ;
}

/* OnEr:{ if (isNaN(v)) { return onerrv; } return v; } */
function OnEr(v, onerrv) {
    if (isNaN(v)) {
        return onerrv;
    }
    return v;
    ;
}

/* OnZero:{ if (v <= 0) { return onzerov; } return v;} */
function OnZero(v, onzerov) {
    if (v <= 0) {
        return onzerov;
    }
    return v;
    ;
}

/* If:{ if (o) { return v1; } else { return v2; }} */
function If(o, v1, v2) {
    if (o) {
        return v1;
    } else {
        return v2;
    }
    ;
}

/* OnNA:{ if (v == undefined || isNaN(v)) { return onnav; } return v;} */
function OnNA(v, onnav) {
    if (v == undefined || isNaN(v)) {
        return onnav;
    }
    return v;
    ;
}

/* SUM:{ var returnValue = 0; for (var i = 0; i < values.length; i++) { returnValue += values[i]; } return returnValue; } */
function SUM(values) {
    var returnValue = 0;
    for (var i = 0; i < values.length; i++) {
        returnValue += values[i];
    }
    return returnValue;
    ;
}

/* OnNeg:{ if (arg0 < 0) { return arg1; } return arg0;} */
function OnNeg(arg0, arg1) {
    if (arg0 < 0) {
        return arg1;
    }
    return arg0;
    ;
}

/* OnZeroOrNA:{ if (arg0 == undefined || isNaN(arg0)) { return arg1; } return arg0;} */
function OnZeroOrNA(arg0, arg1) {
    if (arg0 == undefined || isNaN(arg0)) {
        return arg1;
    }
    return arg0;
    ;
}

/* OnZeroOrNa:{ if (v == undefined || isNaN(v)) { return arg1; } return v;} */
function OnZeroOrNa(v, arg1) {
    if (v == undefined || isNaN(v)) {
        return arg1;
    }
    return v;
    ;
}

/* Exp:{ return Math.pow(v, 2);} */
function Exp(v) {
    return Math.pow(v, 2);
    ;
}

/* OnERorNA:{ if (v == undefined || isNaN(v)) { return onerrornav; } return v;} */
function OnERorNA(v, onerrornav) {
    if (v == undefined || isNaN(v)) {
        return onerrornav;
    }
    return v;
    ;
}

/* Round:{ var pow = Math.pow(10, decimals); return Math.round(v * pow) / pow;} */
function Round(v, decimals) {
    var pow = Math.pow(10, decimals);
    return Math.round(v * pow) / pow;
    ;
}

/* AVG:EJS.AVERAGE(vs) */
function AVG(vs) {
    EJS.AVERAGE(vs);
}

/* MATCH:{ return v === undefined? false : v.match(p); } */
function MATCH(v, p) {
    return v === undefined ? false : v.match(p);
    ;
}

/* ZeroOnNaN:{ return parseFloat(isNaN(v) ? 0 : v); } */
function ZeroOnNaN(v) {
    return parseFloat(isNaN(v) ? 0 : v);
    ;
}

/* VALIDDATE:{ if (Object.prototype.toString.call(d) === '[object Date]' ) {if ( isNaN( d.getTime() ) ) {  return false; } else { return true; } }else { return false; } } */
function VALIDDATE(d) {
    if (Object.prototype.toString.call(d) === '[object Date]') {
        if (isNaN(d.getTime())) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
    ;
}

/* LOOKUP:{ return CACHE[key]; } */
function LOOKUP(key) {
    return CACHE[key];
    ;
}

/* GET:{ $.getJSON( 'js/data.json', function( data ) { CACHE[name] = data; }); } */
function GET(url, name) {
    $.getJSON('js/data.json', function(data) {
        CACHE[name] = data;
    });
    ;
}

/* TupleCount:{ return 1; } */
function TupleCount(x) {
    return 1;
    ;
}

/* TupleSum:{ return value; } */
function TupleSum(value) {
    return value;
    ;
}

/* EvaluateAsString:{ return value } */
function EvaluateAsString(value) {
    return value;
}

/* FirstUC:{ return value } */
function FirstUC(value) {
    return value;
}

/* AddMonth:{ return 1 } */
function AddMonth(value, ammount) {
    return 1;
}

/* Visible:{ return 1 } */
function Visible(variableOrValue) {
    return 1;
}

/* InputRequired:{ return 1 } */
function InputRequired(variableOrValue) {
    return 1;
}

/* ForAll:{ for (var i = 0; i < elements.length; i++) { if (elements[i] ){ return 1 } } return 0; } */
function ForAll(elements) {
    for (var i = 0; i < elements.length; i++) {
        if (elements[i]) {
            return 1
        }
    }
    return 0;
    ;
}

/* PROXY:{ return proxy } */
function PROXY(proxy) {
    return proxy;
}

/* GetTitle:{ return 'tst' } */
function GetTitle(one) {
    return 'tst';
}

/* Pos:{ if (two===undefined){return -1};return two.indexOf(one) } */
function Pos(one, two) {
    if (two === undefined) {
        return -1
    }
    ;
    return two.indexOf(one);
}

/* Count:{ var counter = 0; for (var i = 0; i < elements.length; i++) { if (elements[i] ){ counter++ } } return counter; } */
function Count(elements) {
    var counter = 0;
    for (var i = 0; i < elements.length; i++) {
        if (elements[i]) {
            counter++
        }
    }
    return counter;
    ;
}

/* TupleMin:{ return 1 } */
function TupleMin(one) {
    return 1;
}

/* TupleMax:{ return 1 } */
function TupleMax(one) {
    return 1;
}

/* ValueT:{ var retrunValue = 1; while(one.prev.hash){ retrunValue++;one=one.prev } return retrunValue } */
function ValueT(one) {
    var retrunValue = 1;
    while (one.prev.hash) {
        retrunValue++;
        one = one.prev
    }
    return retrunValue;
}

/* FirstValueT:{ return x } */
function FirstValueT(x, values, first, last) {
    return x;
}

/* LastValueT:{ return 1 } */
function LastValueT(one) {
    return 1;
}

/* DMYtoDate:{ return new Date(d,m,y).toLocaleString(); } */
function DMYtoDate(d, m, y) {
    return new Date(d, m, y).toLocaleString();
    ;
}

/* DataEntered:{ return one } */
function DataEntered(one) {
    return one;
}

/* LastTInFormulaSet:{ return x } */
function LastTInFormulaSet(x, x2) {
    return x;
}

/* LastTinFormulaSet:{ return x } */
function LastTinFormulaSet(x, x2) {
    return x;
}

/* FirstTinFormulaSet:{ return x } */
function FirstTinFormulaSet(x, x2) {
    return x;
}

/* FirstTInFormulaset:{ return x } */
function FirstTInFormulaset(x, x2) {
    return x;
}

/* FirstTInFormulaSet:{ return x } */
function FirstTInFormulaSet(x, x2) {
    return x;
}

/* FirstTinPeriod:{ return x } */
function FirstTinPeriod(x, x2) {
    return x;
}

/* LastTinPeriod:{ return x } */
function LastTinPeriod(x, x2) {
    return x;
}

/* LastTinYear:{ return x } */
function LastTinYear(x) {
    return x;
}

/* FirstDateInT:{ return 1 } */
function FirstDateInT(one) {
    return 1;
}

/* FirstT:{ return 1 } */
function FirstT(one) {
    return 1;
}

/* LastT:{ return 1 } */
function LastT(one) {
    return 1;
}

/* TableLookup:{ return row + col } */
function TableLookup(row, col) {
    return row + col;
}

/* HINT:{ return 1 } */
function HINT(one) {
    return 1;
}

/* GetFrac:{ return 1 } */
function GetFrac(one) {
    return 1;
}

/* VSum:{ return 1 } */
function VSum(one) {
    return 1;
}

/* FormulasetInT:{ return 1 } */
function FormulasetInT(one) {
    return 1;
}

/* RelMut:{ return 1 } */
function RelMut(one) {
    return 1;
}

/* YearInT:{ return 1 } */
function YearInT(one) {
    return 1;
}

/* YearToT:{ return 1 } */
function YearToT(one) {
    return 1;
}

/* PMT:{ return 1 } */
function PMT(one) {
    return 1;
}

/* NPV2:{ return 1 } */
function NPV2(one) {
    return 1;
}

/* GetT:{ return 1 } */
function GetT(one) {
    return 1;
}

/* FirstTInYear:{ return 1 } */
function FirstTInYear(one) {
    return 1;
}

/* FirstTinYear:{ return 1 } */
function FirstTinYear(one) {
    return 1;
}

/* TsY:{ return 1 } */
function TsY(one) {
    return 1;
}

/* FirstTinformulaset:{ return 1 } */
function FirstTinformulaset(one) {
    return 1;
}

/* PeriodInT:{ return 1 } */
function PeriodInT(one) {
    return 1;
}

/* LastDateInT:return 2016 */
function LastDateInT(one) {
    return 2016;
}

/* FirstTinFormulaset:{ return 1 } */
function FirstTinFormulaset(one) {
    return 1;
}

/* GetValue:{ return 1 } */
function GetValue(one) {
    return 1;
}

/* FesExpression:{ return one } */
function FesExpression(one) {
    return one;
}

/* RoundUp:{ return 1 } */
function RoundUp(one) {
    return 1;
}

/* Mut:{ return 1 } */
function Mut(one) {
    return 1;
}

/* HSum:{ return 1 } */
function HSum(one) {
    return 1;
}

/* HSUM:{ return 1 } */
function HSUM(one) {
    return 1;
}

/* VSUM:{ return 1 } */
function VSUM(one) {
    return 1;
}

/* GetPoint:return 1 */
function GetPoint(one) {
    return 1;
}

/* Exists:return 1 */
function Exists(one) {
    return 1;
}

/* DateToMonth:return one */
function DateToMonth(one) {
    return one;
}

/* HAvg:return 1 */
function HAvg(one) {
    return 1;
}

/* HOVR:return 1 */
function HOVR(one) {
    return 1;
}

/* BaseCurrencyValue:return 1 */
function BaseCurrencyValue(one) {
    return 1;
}

/* TitleEntered:return 1 */
function TitleEntered(one) {
    return 1;
}

/* Hsum:return 1 */
function Hsum(one) {
    return 1;
}

/* LastTinFormulaset:return one */
function LastTinFormulaset(one) {
    return one;
}

/* FirstLC:return 1 */
function FirstLC(one) {
    return 1;
}

/* ExpandFraction:return 1 */
function ExpandFraction(one) {
    return 1;
}

/* ExpandLevel:return 1 */
function ExpandLevel(one) {
    return 1;
}

/* MaxValueT:return 1 */
function MaxValueT(one) {
    return 1;
}

/* ValueOfT:return 1 */
function ValueOfT(one) {
    return 1;
}

/* GuessTerm:return 1 */
function GuessTerm(one) {
    return 1;
}

/* ExpandOriginalValue:return 1 */
function ExpandOriginalValue(one) {
    return 1;
}

/* Datetot:return 1 */
function Datetot(one) {
    return 1;
}

/* DateToT:return x */
function DateToT(x) {
    return x;
}

/* Not:return !one */
function Not(one) {
    return !one;
}

/* not:return !one */
function not(one) {
    return !one;
}

/* Str:return ''+one; */
function Str(one) {
    return '' + one;
    ;
}

/* DateToYear:return new Date(one) */
function DateToYear(one) {
    return new Date(one);
}

/* DateToDay:return 1 */
function DateToDay(one) {
    return 1;
}

/* CumNormal:return 1 */
function CumNormal(one) {
    return 1;
}

/* SubStr:return 1 */
function SubStr(one, two) {
    return 1;
}

/* Val:return 1 */
function Val(one) {
    return 1;
}

/* SumFor:return 1 */
function SumFor(one, two, three, fours) {
    return 1;
}

/* MinMax:return 1 */
function MinMax(one) {
    return 1;
}

/* PPMT:return 1 */
function PPMT(one) {
    return 1;
}

/* IRR:return 1 */
function IRR(one) {
    return 1;
}

/* LN:return 1 */
function LN(one) {
    return 1;
}

/* MIN:return 1 */
function MIN(one) {
    return 1;
}

/* InvNormal:return 1 */
function InvNormal(one) {
    return 1;
}

/* BivarNormal:return 1 */
function BivarNormal(one) {
    return 1;
}

/* GoalSeek:return 1 */
function GoalSeek(one) {
    return 1;
}

/* TupleInstanceIndex:return 1 */
function TupleInstanceIndex() {
    return 1;
}

/* OnNEG:{ if (a < 0) { return a; } return b;} */
function OnNEG(a, b) {
    if (a < 0) {
        return a;
    }
    return b;
    ;
}

/* OnError:{ if (isNaN(a)) { return b; } return a;} */
function OnError(a, b) {
    if (isNaN(a)) {
        return b;
    }
    return a;
    ;
}

/* DateStr:{ return string } */
function DateStr(string) {
    return string;
}

/* DateToYearNum:{ return string } */
function DateToYearNum(string) {
    return string;
}

/* VAL:{ return string } */
function VAL(string) {
    return string;
}

/* BeforeStr:{ return string } */
function BeforeStr(string) {
    return string;
}

/* AfterStr:{ return string } */
function AfterStr(string) {
    return string;
}

/*
function MatrixLookup(sheet, row, col) {
    return string;
}
*/

function Matrixlookup(string) {
    return string;
}

/* MutCalc:1 */
MutCalc = 1

/* CalculatedInBaseCurrency:1 */
CalculatedInBaseCurrency = 1

/* PeriodinT:1 */
PeriodinT = 1

/* TimeAggregated:false */
TimeAggregated = false

/* Bookyear:1 */
Bookyear = 1

/* ScaleFactor:1 */
ScaleFactor = 1

/* Self:1 */
Self = 1

/* Notrend:1 */
Notrend = 1

/* NoTrend:1 */
NoTrend = 1

/* Trend:1 */
Trend = 1

/* ApplicationStartDateTime:1 */
ApplicationStartDateTime = 1

/* Values:1 */
Values = 1

/* MainPeriod:3 */
MainPeriod = 3

/* X:1 */
X = 1

/* MaxT:1 */
MaxT = 1

/* FAM:1 */
FAM = 1

/* Now:1 */
Now = 1

/* NA:1e-10 */
NA = 1e-10

/* On:1 */
On = 1

/* No:0 */
No = 0

/* Off:0 */
Off = 0

/* True:1 */
True = 1

/* False:0 */
False = 0

/* ViewScaleFactor:1 */
ViewScaleFactor = 1

/* Backward:1 */
Backward = 1

/* Decimals:2 */
Decimals = 2
var base = {
    hash: 1
};
base.base = base;
//unit test.
AgreementEquityCapitalCharge_value('1000', {hash: 1, base: {hash: 1}}, {
    hash: 1,
    base: base
}, 0, new Proxy({}, {
    get: function() {
        return {};
    }
}))