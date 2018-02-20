module.exports = {
    flow             : 'Flow is a quantity which is measured with reference to a period of time.\n' +
    'Thus, flows are defined with reference to a specific period (length of time),\n' +
    ' e.g., hours, days, weeks, months or years. It has time dimension.\n' +
    ' National income is a flow. It describes and measures flow of goods and services which\n' +
    ' become available to a country during a year.\n Similarly, all other economic variables which have time dimension,\n' +
    ' i.e., whose magnitude can be measured over a period of time are called flow variables.\n' +
    ' For instance, income of a person is a flow which is earned during a week or a month or any other period.\n' +
    ' Likewise, investment (i.e., addition to the stock of capital) is a flow as it pertains to a period of time.',
    balance          : 'Balance Variables:\n' +
    'A stock is a quantity which is measurable at a particular point of time, e.g., 4 p.m.,\n' +
    ' 1st January, Monday, 2010, etc. Capital is a stock variable.\n' +
    ' On a particular date (say, 1st April, 2011), a country owns and commands stock of machines,\n' +
    ' buildings, accessories, raw materials, etc. It is stock of capital.\n' +
    ' Like a balance-sheet, a stock has a reference to a particular date on which it shows stock position.\n' +
    ' Clearly, a stock has no time dimension (length of time) as against a flow which has time dimension.',
    TSUM             : 'TSUM(variable_name)\nSUM of TupleInstances given name',
    DMYtoDate        : 'DayMonthYear to Date\nExample DMYtoDate(d,m,y)=NOW()',
    DataEntered      : 'Example DataEntered(variable)',
    DateToYear       : 'DateToYear\nExample DateToYear(date)=2105',
    AddMonth         : 'Add month to existing time\nExample AddMonth(Date,1)',
    HSUM             : "HSUM(variable_name,start,end)\n Time SUM of values",
    "\\[all\\]"      : "Collection reference. All values.",
    "[all]"          : "Collection reference. All values.",
    "\\[prev\\]"     : "Time reference, refers to previous time column.",
    "[prev]"         : "Time reference, refers to previous time column.",
    MAX              : 'MAX(n1,n2)\nReturn maximum value of value n1 or n2',
    MIN              : 'MIN(n1,n2)\nReturn minimum value of value n1 or n2',
    OnER             : 'OnER(expression,error_value)',
    RoundUp          : 'RoundUp(value)',
    SumFor           : 'Example (not documented!) SumFor(a,d,c,d)',
    PPMT             : 'Example: (not documented!) PPMT(a,b,c,d)',
    BivarNormal      : 'Example: (not documented!) BivarNormal(a,b,c,d)',
    InvNormal        : 'Example: (not documented!) InvNormal(a,b,c,d)',
    OnZero           : 'OnZero(value,alternative)',
    Or               : 'Abstract A Or B\nExample: 1>2 Or 2>1=True',
    And              : 'Abstract A And B\nExample: 1>2 And 2>1=False',
    document         : 'One value per context in time.\nCan have multiple values in Tuple dimension',
    column           : 'One value per time_unit in context.\nCan have multiple values in Tuple dimension',
    string           : 'Is a datatype',
    number           : 'Is a datatype. And the default one.',
    unscalable       : 'While scaling don\'t scale this variable',
    afterinput       : 'Is not supported in lme.\n FFL is descriptive\n' +
    'One of the benefits of using descriptive language is that it helps the writer to convey the meaning behind the text.\n' +
    ' By using descriptive language, the writer can describe exactly how a setting looks,\n' +
    ' how a character behaves or what action is taking place. The benefit for the reader is the ability\n' +
    ' to more clearly visualize what is being described.',
    Execute          : 'This is not supported in lme. FFL is a descriptive language',
    memo             : 'displaytype: Textarea',
    String           : 'Convert any to String\nExample\nString(1)',
    If               : 'Abstract:\nIf(expression,default,alternative)\nExample: If(2>1,100,200)=100',
    TsY              : 'Amount of times current period fits in a bookyear',
    FirstUC          : 'FirstUpperCase \nExample FirstUC("hoi")',
    Pos              : 'Position \nExample Pos("hoi","o")==2',
    MatrixLookup     : 'Example:\n  MatrixLookup(a,named_table,row_name,column_name)',
    SelectDescendants: 'Abstract:\n  Count(X,{variable_name},{lambda})\nExample:\n' +
    '  Count(X,SelectDescendants(Q_MAP01, Q_MAP01_HULPVARIABELEN),InputRequired(X))',
    Count            : 'Example:\n  Count(X,SelectDescendants(Q_MAP01, Q_MAP01_HULPVARIABELEN),InputRequired(X))',
    Case             : 'Example:\n  Case(1,[1:100|2:200])==100',
    SubStr           : 'Example:\n  SubStr("Hoi",2)==i',
    InputRequired    : 'Example:\n  Count(X,SelectDescendants(Q_MAP01, Q_MAP01_HULPVARIABELEN),InputRequired(X))',
    DataAvailable    : 'Example:\n  DataAvailable(VARIABLE)',
    Visible          : 'Example Visible(Q_ROOT)',
    GetTitle         : 'Example GetTitle(Q_ROOT)',
    title            : 'Specify the dynamic title for a given variable',
    formula          : 'Specify the dynamic formula for a given variable',
    variable         : 'Describes a new variable',
    options_trend    : 'locked,visible',
    options_notrend  : 'locked,visible',
    date             : 'Is a datatype',
    select           : 'displaytype select\nDescribes a choice type. Visualized a dropdown|select.\nWhen choices:0:No|1:Yes it implies a radio',
    On               : 'Synonym to 1, true, True',
    True             : 'Synonym to 1, true, True',
    Off              : 'Synonym to 0, false, False',
    False            : 'Synonym to 0, false, False',
    'choices:'       : 'Specify the choices for a given variable\nImplies displaytype: select\nExample: "0:No|1:Yes"\n' +
    'Example: "High|Low|None"',
    "hint:"          : 'Specify the dynamic hint formula for a given variable',
    ValueT           : 'Convert a period into a time-index',
    "aggregation:"   : 'A number can be aggregated over time.\nOptions:flow|balance\nDefaults to balance',
    "locked:"        : 'Describes if a variable can be changed by input.\nValid values:On|Off|0|1 or a custom formula',
    "refers to"      : "Inheritance in FFL",
    "visible:"       : 'Describes if a variable can be seen.\nValid values:On|Off|0|1 or a custom formula',
    "required:"      : 'Describes if a variable is mandatory.\nValid values:On|Off|0|1 or a custom formula',
    "frequency:"     : 'The frequency a variable-value is repeated over time.\nOptions:[document|column|timeline|none]' +
    '\nDefaults to column',
    "datatype:"      : 'Datatype for the variable:\nOptions:[number|string|boolean|currency|matrix|none]\nDefaults to number',
    "options_title:" : 'Descibes if a title can be changed by user.\nOptions: locked|unlocked.\n Defaults to unlocked',
    "fixed_decimals:": 'a number or currency datatype can be restricted to an ammount of decimals shown.',
    "displaytype:"   : 'Displaytype for the variable:\n' +
    'Options:[default|radio|select|string|currency|paragraph|customwidget|date|memo|percentage|piechart|polarchart|scorecard]\n' +
    'currency(2) implies fixed_decimals: 2\n' +
    'Defaults to default',
}