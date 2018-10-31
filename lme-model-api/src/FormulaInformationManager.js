import FinFormula from '../../ffl/FinFormula'

const info = {
	NA                : 1e-100,
	'\\('             : 'Open tag',
	link              : '(not documented yet) Links a variable to another',
	or                : 'a or b\nExample: true or false = true',
	and               : 'a and b\nExample true and false = false',
	average           : 'Aggregation type ',
	paragraph         : 'Display type',
	flow              : 'Flow is a quantity which is measured with reference to a period of time.\n' +
		'Thus, flows are defined with reference to a specific period (length of time),\n' +
		' e.g., hours, days, weeks, months or years. It has time dimension.\n' +
		' National income is a flow. It describes and measures flow of goods and services which\n' +
		' become available to a country during a year.\n Similarly, all other economic variables which have time dimension,\n' +
		' i.e., whose magnitude can be measured over a period of time are called flow variables.\n' +
		' For instance, income of a person is a flow which is earned during a week or a month or any other period.\n' +
		' Likewise, investment (i.e., addition to the stock of capital) is a flow as it pertains to a period of time.',
	balance           : 'Balance Variables:\n' +
		'A stock is a quantity which is measurable at a particular point of time, e.g., 4 p.m.,\n' +
		' 1st January, Monday, 2010, etc. Capital is a stock variable.\n' +
		' On a particular date (say, 1st April, 2011), a country owns and commands stock of machines,\n' +
		' buildings, accessories, raw materials, etc. It is stock of capital.\n' +
		' Like a balance-sheet, a stock has a reference to a particular date on which it shows stock position.\n' +
		' Clearly, a stock has no time dimension (length of time) as against a flow which has time dimension.',
	TSUM              : 'TSUM(variable_name)\nSUM of TupleInstances given name',
	DMYtoDate         : 'DayMonthYear to Date\nExample DMYtoDate(d,m,y)=NOW()',
	Exp               : 'Example: Exp(2) = 4',
	DataEntered       : 'Example DataEntered(variable)',
	DateToYear        : 'DateToYear\nExample DateToYear(date)=2105',
	AddMonth          : 'Add month to existing time\nExample AddMonth(Date,1)',
	HSUM              : 'HSUM(variable_name,start,end)\n Time SUM of values',
	'\\[all\\]'       : 'Collection reference. All values.',
	'[all]'           : 'Collection reference. All values.',
	'\\[prev\\]'      : 'Time reference, refers to previous time column.',
	'[prev]'          : 'Time reference, refers to previous time column.',
	'\\[bkyr\\]'      : 'Time reference, refers to bookyear column.',
	'[bkyr]'          : 'Time reference, refers to bookyear column.',
	MAX               : 'MAX(n1,n2)\nReturn maximum value of value n1 or n2',
	MIN               : 'MIN(n1,n2)\nReturn minimum value of value n1 or n2',
	OnER              : 'OnER(expression,error_value)',
	OnNA              : 'OnNA(expression,na_value)',
	RoundUp           : 'RoundUp(value)',
	SumFor            : 'Example (not documented!) SumFor(a,d,c,d)',
	PPMT              : 'Example: (not documented!) PPMT(a,b,c,d)',
	BivarNormal       : 'Example: (not documented!) BivarNormal(a,b,c,d)',
	InvNormal         : 'Example: (not documented!) InvNormal(a,b,c,d)',
	OnZero            : 'OnZero(value,alternative)',
	Or                : 'Abstract A Or B\nExample: 1>2 Or 2>1=True',
	And               : 'Abstract A And B\nExample: 1>2 And 2>1=False',
	document          : 'One value per context in time.\nCan have multiple values in Tuple dimension',
	column            : 'One value per time_unit in context.\nCan have multiple values in Tuple dimension',
	'string;'         : 'Is a datatype',
	number            : 'Is a datatype. And the default one.',
	unscalable        : 'While scaling don\'t scale this variable',
	afterinput        : 'Is not supported in lme.\n FFL is descriptive\n' +
		'One of the benefits of using descriptive language is that it helps the writer to convey the meaning behind the text.\n' +
		' By using descriptive language, the writer can describe exactly how a setting looks,\n' +
		' how a character behaves or what action is taking place. The benefit for the reader is the ability\n' +
		' to more clearly visualize what is being described.',
	Execute           : 'This is not supported in lme. FFL is a descriptive language',
	memo              : 'displaytype: Textarea',
	String            : 'Convert any to String\nExample\nString(1)',
	If                : 'Abstract:\nIf(expression,default,alternative)\nExample: If(2>1,100,200)=100',
	TsY               : 'Amount of times current period fits in a bookyear',
	FirstUC           : 'FirstUpperCase \nExample FirstUC("hoi")',
	Pos               : 'Position \nExample Pos("hoi","o")==2',
	MatrixLookup      : 'Example:\n  MatrixLookup(a,named_table,row_name,column_name)',
	SelectDescendants : 'Abstract:\n  Count(X,{variable_name},{lambda})\nExample:\n' +
		'  Count(X,SelectDescendants(Q_MAP01, Q_MAP01_HULPVARIABELEN),InputRequired(X))',
	Count             : 'Example:\n  Count(X,SelectDescendants(Q_MAP01, Q_MAP01_HULPVARIABELEN),InputRequired(X))',
	Case              : 'Example:\n  Case(1,[1:100|2:200])==100',
	SubStr            : 'Example:\n  SubStr("Hoi",2)==i',
	InputRequired     : 'Example:\n  Count(X,SelectDescendants(Q_MAP01, Q_MAP01_HULPVARIABELEN),InputRequired(X))',
	DataAvailable     : 'Example:\n  DataAvailable(VARIABLE)',
	Visible           : 'Example Visible(Q_ROOT)',
	GetTitle          : 'Example GetTitle(Q_ROOT)',
	YearInT           : 'YearInT is the YearNumber In Current T',
	GetValue          : 'Example GetValue(Q_ROOT,T,n)',
	title             : 'Specify the dynamic title for a given variable',
	formula           : 'Specify the dynamic formula for a given variable',
	variable          : 'Describes a new variable',
	options_trend     : 'locked,visible',
	options_notrend   : 'locked,visible',
	date              : 'Is a datatype',
	select            : 'displaytype select\nDescribes a choice type. Visualized a dropdown|select.\nWhen choices:0:No|1:Yes it implies a radio',
	On                : 'Synonym to 1, true, True',
	True              : 'Synonym to 1, true, True',
	Off               : 'Synonym to 0, false, False',
	False             : 'Synonym to 0, false, False',
	'choices:'        : 'Specify the choices for a given variable\nImplies displaytype: select\nExample: "0:No|1:Yes"\n' +
		'Example: "High|Low|None"',
	'hint:'           : 'Specify the dynamic hint formula for a given variable',
	ValueT            : 'Convert a period into a time-index',
	'aggregation:'    : 'A number can be aggregated over time.\nOptions:flow|balance\nDefaults to balance',
	'locked:'         : 'Describes if a variable can be changed by input.\nValid values:On|Off|0|1 or a custom formula',
	'refers to'       : 'Inheritance in FFL',
	'required:'       : 'Describes if a variable is mandatory.\nValid values:On|Off|0|1 or a custom formula',
	'visible:'        : 'Describes if a variable can be seen.\nValid values:On|Off|0|1 or a custom formula',
	/*    ".required"       : 'Is a figure property. VAR.required is a synonym to InputRequired(VAR)',
	 ".visible"        : 'Is a figure property. VAR.visible is a synonym to Visible(VAR)',
	 ".locked"         : 'Is a figure property. VAR.locked is a synonym to Locked(VAR)',
	 ".entered"        : 'Is a figure property. VAR.entered is a synonym to DataEntered(VAR)',*/
	'frequency:'      : 'The frequency a variable-value is repeated over time.\nOptions:[document|column|timeline|none]' +
		'\nDefaults to column',
	'datatype:'       : 'Datatype for the variable:\nOptions:[number|string|boolean|currency|matrix|none]\nDefaults to number',
	'options_title:'  : 'Descibes if a title can be changed by user.\nOptions: locked|unlocked.\n Defaults to unlocked',
	percentage        : 'Displaytype ',
	currency          : 'Displaytype ',
	'fixed_decimals:' : 'a number or currency datatype can be restricted to an ammount of decimals shown.',
	'displaytype:'    : 'Displaytype for the variable:\n' +
		'Options:[default|radio|select|string|currency|paragraph|customwidget|date|memo|percentage|piechart|polarchart|scorecard]\n' +
		'currency(2) implies fixed_decimals: 2\n' +
		'Defaults to default',
	Input             : 'Is a data_option',
	Output            : 'Is a data_option',
	scorecard         : 'Display type',
	display_options   : 'Example: scorecard|displayAsSummation',
	displayAsSummation: 'Display current variable as Total. Implied with "="modifier'
}
const functions = {
	'addmonth'            : 'AddMonth(DMYtoDate(3,2,2006),11)|This function adds a number of months to a date.',
	'afterstr'            : 'AfterStr(\'abc\',\'123abc567abc890\')=\'567\'|Not available',
	'beforestr'           : 'BeforeStr(\'abc\',\'123abc567abc890\')=\'123\'|Returns the part of the text that comes before the given characters.',
	'case'                : 'Case(variable that contains search key,[condition:item,condition:item,..]). Use case: Case(3,[2:\'Amsterdam\',3:\'Berlin\',1:\'Paris\',6:\'London\'])=\'Berlin\'|This function can be used to define a search key and a that has to be searched including search ranges. The result will depend on the syntax of the list.',
	'chr'                 : 'Chr(32)=\' \'|Not available',
	'contextvarname'      : ' |Not available',
	'count'               : ' |Not available',
	'creationdate'        : ' |This function results in the date the datafile has been created, expressed as a serial number of days to date from 30-12-1899.',
	'cumnormal'           : 'CumNormal(calculated expression)|Returns the standard normal cumulative distribution function. The distribution has a mean of 0 (zero) and a standard deviation of one.',
	'dataavailable'       : ' |This function checks whether data is available for a specific cell. It returns the value 1 when data is available.',
	'datacalculated'      : ' |This function checks whether data is calculated for a specific cell. It returns the value 1 when data is calculated.',
	'dataentered'         : ' |This function checks whether data is entered in a specific cell. It returns the value 1 when data is entered.',
	'dataenteredinvar'    : ' |This function checks whether the variable contains user or import entered data. The function returns  a boolean expression (1=yes, 0=no).',
	'datafoundinvar'      : ' |This function returns true (=1) when data is found in some column. The SubMode determines whether variables in the specification should be searched as well, and the dept of that search.',
	'datestr'             : ' |This function converts a date number into a date text with a given format.',
	'datetoday'           : 'DateToDay(date number)|Returns day (number in the month: 1-31) of the date value given in the expression.',
	'datetomonth'         : 'DateToMonth(DMYToDate(3,5,2009)) = 5|Returns month (number) of the date value given in the expression.',
	'datetot'             : 'DateToT(date number,period to be searched)|This function returns the column number of the first column (left to right) that refers to the Date Number in the first expression.',
	'datetoyear'          : 'DateToYear(date number)|Returns year(number) of the date value given in the expression.',
	'datetoyearnum'       : 'DateToYearNum(date number)|Returns year (number) of the date value given in the expression, including the fraction of the year that has passed.',
	'diostatus'           : '.If DioStatus(\'DataFolderBrowseMode\')=\'1\'|Not available',
	'dmytodate'           : 'DMYtoDate(day number, month number,year)|This function calculates the numeric date when Day, Month en Year are given.',
	'documentindex'       : '|Returns the (zero based) index of the current context document in the project. It is the (zero based) index of the upper tab that shows this document. Usually the DocumentIndex refers to the active upper tab (the visible document in the grid). The Document (cmd) is able to change the context document in a script without changing the active document.',
	'documentislocked'    : '|The result is 1 (true) when the document is locked, otherwise 0 (false).',
	'enteredvaluefoundint': 'EnteredValueFoundInT(first column,last column) |This function is true (value 1) when at least one entered value is found in the columns specified',
	'evaluateasstring'    : 'EvaluateAsString(parameter)|Gives a (part of a) string that will be shown in the cell.',
	'string'              : 'EvaluateAsString(parameter)|Gives a (part of a) string that will be shown in the cell.',
	'exists'              : 'Exists(Variable counted, Variable List, Expression)|This function evaluates the expression for each variable in the variable list and only returns true if at least one of these evaluations result in true.',
	'exp'                 : '|Returns e raised to the power of a given number.',
	'expand'              : 'Expand(growthSource variablename,lookbackMethod,minimum growth,maximum growth,weighting factor growth previous year,weighting factor growth two years ago,weighting factor growth three years ago)|Variable will be extrapolated including seasonal patterns with the given constraints.',
	'expandfraction'      : 'ExpandFraction(variable1,variable2,time shift used for variables in this function)|Variable1 will be extrapolated following the growth path of variable2.',
	'expandgrowth'        : 'ExpandGrowth(variablename,minimum growth,maximum growth,weighting factor growth two years ago,weighting factor growth three years ago)|Variable will be extrapolated including seasonal patterns with the given constraints.',
	'expandlevel'         : 'ExpandLevel(variable, weighting factor of value two years ago, weighting factor of value three years ago, On/Off:only apply weighting factors in the first column)|The variable will be extrapolated excluding growth, but including the season pattern.',
	'expandoriginalvalue' : 'ExpandOriginalValue(CostPriceVarName,InvestmentVarName,DepreciationPeriod)|This function approximates the original value (historical cost price) of an asset when the series of investments and the period are given.',
	'fileexists'          : '|Returns true (=1) when the file exists.',
	'findvaluet'          : 'FindValueT(variable,the value to search for,first column in search,last  column in search)|This function returns the column number of the firstthat has the given search value.',
	'firstlc'             : '|This function returns the text of the expression between brackets always starting wtih a lower case character.',
	'firsttinformulaset'  : 'FirstTinFormulaset(period type,period number,optional extra boolean constraint)|This function is used to calculate the first T (internal column number) in a formula set within a period. The result is 0 (zero) when no such T exists.',
	'firsttinperiod'      : 'FirstTinPeriod(period number)|This function is used to calculate the first column number of the given period.',
	'firsttinsheet'       : 'FirstTinSheet(1)|This function is used to find the first T (internal column number) in a sheet.',
	'firsttinyear'        : 'FirstTinYear(column number)|This function is used to find the first T (column number) in the same year as the given T (column number).',
	'firstuc'             : '|This function returns the text of the expression between brackets always starting wtih a upper case character.',
	'firstvalidt'         : '|This function is used to find the first valid T (internal column number). This is the first T where ValCheck is zero or NA.',
	'flowcurrencyfactor'  : 'FlowCurrencyFactor(column number) |This function returns the exchange rate defined in the database for cash flow values and is used to reconcile colums with different (view) scales.',
	'forall'              : 'ForAll(QuantificationVarName, Variable List, Expression, [IncludeTupleDefinitions])|This function evaluates the expression for each variable in the variable list and only returns true if all these evaluations result in true.In the case of tuples, it evaluates the expression for each instance of each tupleproperty in the selection of variables. If the fourth optional parameter IncludeTupleDefinitions is true this function also evaluates the expression for the tupledefinition.',
	'fv'                  : 'FV(rate,number of payment periods,pmt,pv,prenumerando)|This function returns the future value of an investment based on periodic, constant payments and a constant interest rate.',
	'getfrac'             : 'GetFrac(FlowVariableName,value)|This function performs a division of value divided by VariableName. This function is used for term indicators. The first parameter is a cashflow variable. The second parameter is a total of assets. In the GetFrac function corrections are made in case the timebase in column (T) is not a year. Also corrections are made when the assets are a greater amount than the flow variable (this can happen in a column shown per month or per quarter of the year). In this case the GetFrac function searches in older columns to see what time it takes in the flow variable to achieve the amount of assets. The results will be shown in a fraction of a year (can be greater than 1).',
	'getpoint'            : 'GetPoint(FlowVariableName,fraction)|This function is used for term indicators. The first parameter is a flow variable, for example turnover. The second parameter is a debtors term as fraction of a year. In this case GetPoint calculates the debtors amount.',
	'getrelvar'           : 'GetRelVar(VariableName,NavigationPath)|This returns the value of a variable that is defined nearby VariableName. It can be used to get the value of a variable that is nearby on screen on the same, a higher or a deeper level.',
	'gett'                : 'GetT(base column,shift from base column,period number,time base detail (1=year, 2=halfyear, 4=quarters etc))|This function is used to find a specific column a few columns before or after the current column. This function finds the correct column even when the previous year has another time base or is located in another period.',
	'gettitle'            : 'GetTitle(variable name)|The result is the description of the variable.',
	'getvalue'            : 'GetValue(variable,column number,level of detail in time,lookbackMethod)|This function returns the numeric value of a variable given a column number, a level of detail of time (1=year, 2=halfyear, 4=quarters etc), and a method to look into previous columns.',
	'guessterm'           : 'GuessTerm(BookValueVariableName,DepreciationVariableName,LowerLimit,UpperLimit,DefaultValue)|This function guesses the depreciation period in years when only the bookvalue and the depreciation amount  is given.',
	'havg'                : 'HAvg(variable,first column number,last column number)|The average of values of variable will be calculated in a range of internal columns. This calculation ignores the value NA (numeric constant), while the values zero and PM (numeric constant) will be taken into account.',
	'hovr'                : 'HOvr(variable,first column number,last column number)|The number of user-entered values of variable will be counted in a range of columns.',
	'hsum'                : 'HSum(variable,first column number,last column number)|The sum of values of variable will be calculated in a range of internal columns.',
	'hvalues'             : 'HValues(variable,first column number,last column number)|The number of values (unequal to NA = empty) of variable will be counted in a range of internal columns.',
	'hyearovr'            : 'HYearOvr(variable,first column number,last column number)|The number of user-entered values of variable will be counted in a range of columns. The only difference with the HOvr (numeric function) is that only one entered value per year will be counted.',
	'hyearvalues'         : 'HYearValues(variable,first column number,last column number)|The number of values (unequal to NA = empty) of variable will be counted in a range of internal columns. The only difference with the HValues (numeric function) is that only one value per year will be counted.',
	'if'                  : 'If(Constraint that evaluates to true of false, expression when true, expression when false)|Traditional if-statement where constraint determines which of the two outcomes must be used. The outcome can be again an if-statement (nested if).',
	'implies'             : '(expression1 implies expression2)|This function performs logical implication. Logical implication results in false if the antecedent expression1 is true and the consequence expression2 is false. In all other cases logical implication results in true. ',
	'inhiddentree'        : 'InHiddenTree(VariableName, column number)|This is a check whether the variable is in a hidden part of the model. ',
	'initials'            : 'Initials(\'Jan Klaas\')=\'J.K.\'|This function returns the initials of a name.',
	'invnormal'           : 'InvNormal(number)|Returns the inverse of the standard normal cumulative distribution. The distribution has a mean of zero and a standard deviation of one.',
	'ipmt'                : 'IPMT(InterestRate,PeriodNumber,NumberOfPeriods,PresentValue,FutureValue)|This function returns the interest payment at PeriodNumber for an annuity  based loan.',
	'irr'                 : 'IRR(CashFlow VariableName,StartColumnNumber,EndColumnNumber)|This function calculates the internal rate of return of a series of cash flows. The IRR function in Excel is similar.',
	'isequal'             : '|This function performs a logical operation.',
	'islarger'            : '|This function performs a logical operation.',
	'islargerequal'       : '|This function performs a logical operation.',
	'isnotequal'          : '|This function performs a logical operation.',
	'isreadonly'          : '|The result is 1 (true) when the document is readonly (in the database), otherwise 0 (false).',
	'issmaller'           : '|This function performs a logical operation.',
	'issmallerequal'      : '|This function performs a logical operation.',
	'isvalue'             : 'IsValue(numeric expression)|Returns true when the parameter is a \'normal\' value, not NA, ER or PM.',
	'lasthistyear'        : '|This function results into a yearnumber of the last complete historical year.',
	'lastsheet'           : '|Returns the index number of the last sheet.',
	'lasttinformulaset'   : 'LastTinFormulaset(period type,period number,optional extra boolean constraint)|This function is used to calculate the last T (internal column number) in a formula set within a period. The result is 0 (zero) when no such T exists.',
	'lasttinperiod'       : 'LastTinPeriod(period number)|This function is used to calculate the last column number of the given period.',
	'lasttinyear'         : 'LastTinYear(column number)|This function is used to find the lastt T (column number) in the same year as the given T (column number).',
	'lastvaluet'          : 'LastValueT(variable name,first columnn number, last column number)|This function returns the internal column number of the last column that has a value (unequal to NA) between the given two internal columns.',
	'length'              : 'Length(text)|Returns the number of characters of the given text.',
	'licensed'            : '|Returns true when the characters in the string expression are all included in the current license code. This function was introduced in v2.8.6.1.',
	'ln'                  : 'Ln(number)|Returns the natural logaritm of a number.',
	'matrixlookup'        : 'MatrixLookup(Excel spreadsheet file name,spreadsheet range name,key,search value)|Returns a value from a matrix defined in Excel, where key (string) is searched and the value in kolom number defined in searcg value is returned.',
	'max'                 : 'Max(1, 2) Returns 2|This function returns the largest value, expression1 or expression2.',
	'maxt'                : '|This function is used to find the last column number (T). This last T is part of the last period of the document. Note that the visual timebase (as presented on the screen) is not related to MaxT.',
	'maxvaluet'           : 'MaxValueT(variable name,first columnn number, last column number)|This function returns the internal column number of the column that has the maximum value between the given two internal columns.',
	'midyearnum'          : 'MidYearNum(Column number,Timebase)|Returns the Year Number with fraction in the middle of a specified column.',
	'min'                 : 'Min(1, 2) Returns 1|This function returns the smallest value, expression1 or expression2.',
	'minmax'              : 'MinMax(Value,Minimum,Maximum,OnNoValue)|The Value between Minumum and Maximum.',
	'minvaluet'           : 'MinValueT(variable name,first columnn number, last column number)|This function returns the internal column number of the column that has the minimum value between the given two internal columns.',
	'mut'                 : 'Mut(variable)|This function is used to calculate the change of the variable relative to the previous column.',
	'mutcalc'             : '|This function results to 1 (=true) or NA (=false). The result is true when it is allowed to calculate a mutation (a cash flow between two balance values) at this column. MutCalc is true for most T\'s except the first T of a period when the first year in that period is not the year in which the organization was founded (\'.MutCalcInFirstCol Yes\' in the data script).',
	'not'                 : 'The result of this expression is 0 (false)|This function performs a logical not.',
	'now'                 : '|Returns the numeric representation (Date Number) of the current date and time. 39366,62555 is the value for 11-10-2007 15.00.',
	'nper'                : 'NPER(rate,pmt,pv,fv,prenumerando)|This function returns the number of periods for an investment based on periodic constant payments and a constant interest rate. This function is equivalent to the Excel NPER function, see Excel help. ',
	'npv'                 : 'NPV(Single DiscountRate variable,CashFlow variable, Start column number, End column number, ValuationDate variable)|This function calculates the net present value of a series of cash flows. The NPV function in Excel is similar.',
	'npv2'                : 'NPV2(DiscountRate per column variable,CashFlow variable, Start column number, End column number, ValuationDate variable)|This function calculates the net present value of a series of cash flows. The difference with the NPV function is that the discount rate is a time series (variable), not a constant.',
	'off'                 : '|The numeric constant Off has the value 0 (zero).',
	'on'                  : '|The numeric constant On has the value 1 (one).',
	'onentered'           : 'OnEntered(variable,value)|This function returns the value when the given variable is entered in current column context. ',
	'oner'                : 'OnER(expression1,expression2)|This function returns the value expression2 when expression1 evaluates to ER. This function is useful if expression1 contains a division. A division by zero results in expression2.',
	'onerorna'            : 'OnERorNA(expression1,expression2)|This function returns the value expression2 when expression1 evaluates to ER or NA.',
	'onna'                : 'OnNA(expression1,expression2)|This function returns the value expression2 when expression1 evaluates to NA.',
	'onneg'               : 'OnNeg(expression1,expression2)|This function returns the value expression2 when expression1 evaluates to a negative value.',
	'onnostr'             : 'OnNoStr(expression1,expression2)|This function returns the value expression2 when expression1 does not evaluate to a string.',
	'onnotentered'        : 'OnNotEntered(variable,expression2)|This function returns the value expression2 when variable does not contain an entered value.',
	'onnotpos'            : 'OnNotPos(expression1,expression2)|This function returns the value expression2 when expression1 does not evaluate to a positive value.',
	'onnovalue'           : 'OnNoValue(expression1,expression2)|This function returns the value expression2 when expression1 is not a value. See IsValue (numeric function).',
	'onzero'              : 'OnZero(expression1,expression2)|This function returns the value expression2 when expression1 evaluates to zero or PM.',
	'onzeroorna'          : 'OnZeroOrNA(expression1,expression2)|This function returns the value expression2 when expression1 evaluates to zero or PM or NA.',
	'periodinsheet'       : '|This function is used to find the most important period in a sheet.',
	'periodint'           : '|This function is used to find the period number at an internal column T.',
	'pmt'                 : 'PMT(InterestRate,NumberOfPeriods,PrincipalValue, optional ResidualValue,prenumerando)|This function returns the annuity payment for a loan. The loan may have a residual endvalue after the  NumberOfPeriods.',
	'pos'                 : 'Pos(sub string,main string)|Returns the character position of the first occurence of sub string in the main string. Both parameters are NOT casesensitive! The result is zero when the sub string is not found.',
	'ppmt'                : 'PPMT(InterestRate,PeriodNumber,NumberOfPeriods,PresentValue,FutureValue)|This function returns the repayment at PeriodNumber for an annuity  based loan.',
	'pv'                  : 'PV(InterestRate,NumberOfPeriods,CashFlow, optional ResidualValue,prenumerando)|This function returns the present value of an investment: the total amount that a series of future payments is worth now. This function is equivalent to the Excel PV function, see Excel help.',
	'rate'                : 'RATE(NumberOfPeriods,Payment,PrincipalValue,optional ResidualValue,prenumerando)|Returns the interest rate per period of an annuity. RATE is calculated by iteration and can have zero or more solutions. If the successive results of RATE do not converge to within 0.0000001 after 20 iterations, RATE returns the ER error value. This function is equivalent to the Excel RATE function.',
	'reference'           : '|Not available',
	'relmut'              : '|This function is used to calculate the relative change in a variable.',
	'round'               : 'Round(value,number of decimals)|This function rounds the value away from zero to the given number of digits (default 0).',
	'roundup'             : 'RoundUp(value,number of decimals)|This function rounds the value upwards away from zero to the given number of digits (default 0).',
	'scalefactor'         : '|Its result is almost always the value 1 because most internal calculations are performed in the data scale and data currency, not in the view scale and view currency as in version 2.4.',
	'sector'              : '|Sector is one of the Formulaset constants. It is a predefined numeric constant with the value 4.',
	'selectdescendants'   : 'SelectDescendants (VarName, [StopBeforeVarName], [MaxDepth])|Returns a list containing all children, grandchildren, etc.. of the specified variable.',
	'sheet'               : '|Returns the index number of the currently visible sheet.',
	'str'                 : 'Str(expression,width,decimals,numberformat)|This string function converts a numeric value to a string.',
	'strfield'            : 'StrField([item1,item2,item3],value) Example: StrField([\'Amsterdam\',\'Berlin\',\'Paris\'],2)=\'Berlin\'|This function can be used to select a text item in a list, where value determines the item that must be selected.',
	'substr'              : 'SubStr(string,position,width)|This function can be used to extract a substring from a string.',
	'sysvar'              : '|Usually system variables (specified in scripts between #...#) are evaluated when the script is executed. Sometimes you need a system variable to be evaluated later, e.g. in a visible formula (see Variable (cmd) or an Action (cmd).',
	't'                   : '|This function is used to find the current T (internal column number).',
	'thismonth'           : '|Returns the current month number.',
	'thisquarter'         : '|Returns the current month number.',
	'thisyear'            : '|Returns the current year number.',
	'tisvisibleinsheet'   : '|This function is true (value 1) when the T (internal column number) is visible in the given sheet.',
	'trend'               : '|Trend is one of the Formulaset constants. It is a predefined numeric constants with the value 2.',
	'tsperyear'           : '|This function is used to find the current internal level of detail.',
	'tsy'                 : '|This function is used to find the current internal level of detail.',
	'tuplecount'          : '|Not available',
	'tuplemax'            : '|Not available',
	'tuplemin'            : '|Not available',
	'tuplesum'            : '|Not available',
	'ultcurrencyfactor'   : '|Returns the ULTIMO exchange rate between the base and the view currency for the current year (column)',
	'ultyearnum'          : '|Returns the Year Number with fraction at the end of a specified column.',
	'valuet'              : '|This is a dummy function, the result of the function is the value of the expression. We need this function in the FES where T cannot be used (T is a column object in the FES). In the FES this function converts an internal column object to an integer value, the internal column number.',
	'viewscalefactor'     : '|The result is the scale as displayed on screen (1, 1000 or 1000000)',
	'yearint'             : '|This function is used to find the year (e.g. 2009) at an internal column. Returns the last year when two or more years are defined within an internal column (not yet possible in FINAN Windows).',
	'yearnumtodate'       : 'YearNumToDate(year number)|Returns the date number given the year number in the expression. This can be presented as a date on screen.',
	'yeartot'             : '|This function is used to find the first internal column with a given year in a period.'
}
/*const func_names = Object.keys(functions);
 func_names.sort(function(a, b) {
 // ASC  -> a.length - b.length
 // DESC -> b.length - a.length
 return b.length - a.length;
 });*/
//func_names.join('|') + "|
const highlights = {
	'variable.language': 'Exp|Output|RoundUp|DateToMonth|DateToYear|OnNeg|CumNormal|InvNormal|unscalable|scorecard|model|matrix|boolean|radio|Input|paragraph|root|uses|refers|to|date|On|Off|fileupload|displayAsSummation|percentage|average|document|column|flow|balance|select|number|invisible|currency|AMMOUNT|memo|SumFor|MinMax|Now|Round|HSUM|DateToDay|Val|OnNA|SubStr|TupleMax|String|ForAll|TupleSum|If|Pos|Length|EvaluateAsString|Str|MatrixLookup|GetValue|OnER|Min|AddMonth|ValueT|Count|SelectDescendants|TSUM|DMYtoDate|DataAvailable|InputRequired|Max|Case',
	'keyword'          : 'Implies|top_separator|options_trend|BaseModel|options_notrend|link|bottom_separator|required|display_options|fixed_decimals|aggregation|formula|formula_notrend|formula_trend|datatype|choices|locked|visible|title|data_options|pattern|range|frequency|datatype|displaytype|options|options_title|top_blanklines|ffl_version|version|valid|hint',
	'comment'          : '#|variable|tuple',
	'storage.type'     : '&',
	'support.function' : '+|-|=|none|and|or|entered|visible',
	'constant.language': 'NA|TupleIndex|T|TsY|X|YearInT'
}

info.or = info.Or
info.Max = info.MAX
info.Min = info.MIN
info.and = info.And

function FormulaInformationManager() {

	const definitions = Object.keys(info)
	definitions.sort(function(a, b) {
		// ASC  -> a.length - b.length
		// DESC -> b.length - a.length
		return b.length - a.length
	})
	this.definitions = definitions
}

/**
 * Easier than using esprima to parse...
 * Allow FIN language parsing. (not valid JavaScript)
 */
FormulaInformationManager.prototype.lookupFunction = function(name, line, offset) {
	if (functions[name.toLowerCase()]) {
		const interesting_part = line.substring(offset)
		//lookup closing )
		//extract "" Strings..
		//fill in first_level_parameters
		var open = 0
		const first_open = line.indexOf('(', offset)
		var lastopen = first_open
		var lastopen_part = line.substring(lastopen)
		const parts = []
		var lastChar = line.length
		//assume first character is (
		if (line.charAt(lastopen) !== '(') throw Error('first char must be (')
		for (var i = lastopen; i < line.length; i++) {
			const c = line[i]
			if (c === '(') open++
			else if (c === ')') {
				open--
				//last part
				if (open === 0) {
					parts.push(line.substring(lastopen + 1, i))
					lastChar = i + 1
					break
				}
			} else if (c === ',') {
				if (open === 1) {
					parts.push(line.substring(lastopen + 1, i))
					lastopen = i
				}
			}
			if (open < 0 || c === ';') {
				lastChar = i
				break
			}
		}
		parts.splice(0, 0, name + line.substring(first_open, lastChar))

		const lines = [name, functions[name.toLowerCase()]]
		return {
			first_open: first_open,
			parts     : parts,
			lines     : lines
		}
	} else {
		return {
			first_open: 0,
			parts     : [],
			lines     : [name, this.info[name]]
		}
	}
}
FormulaInformationManager.prototype.extractParts = function(workbook, info) {
	return info.parts.map(function(formulaAsString, idx) {
		workbook.createFormula(FinFormula.parseFormula(formulaAsString), '__SMT', 'a' + idx, false, 'document', 'object', null)
		const e_value = OnNA(workbook.get('__SMT', 'a' + idx), 'NA')

		const dependencies = workbook.getDependencies('__SMT', 'a' + idx)
		const prefix = []
		const deplength = 60
		const dep_ammount_in_row = 2
		const real_dep = dependencies[1]
		const asstring = real_dep.filter(function(el) {
			return el.indexOf('__SMT') === -1
		}).map(function(el, idx2) {
			const parts = el.split('_').slice(1)
			const lastpart = parts.pop()

			const dep_var_name = parts.join('_')
			var dep_value
			try {
				const entered = workbook.get(dep_var_name, 'entered')
				dep_value = (entered ? '!' : '') + OnNAIfNumber(workbook.get(dep_var_name, lastpart), 'NA')
			} catch (err) {
				dep_value = 'ERR:' + err.toString()
			}
			const total = dep_var_name + (lastpart === 'value' ? '' : '.' + lastpart) + '=' + dep_value
			prefix.length = Math.max(deplength - String(total).length, 0)
			return (String(total).slice(0, deplength - 1) + prefix.join(' ')) + ((idx2 + 1) % dep_ammount_in_row === 0 ? '\n' : '')

		}).join('')

		return [e_value, formulaAsString].join('=') + '\n' + asstring
	})
}
FormulaInformationManager.prototype.mathDefinitions = function() {
	return this.definitions
}
FormulaInformationManager.prototype.highlights = highlights
FormulaInformationManager.prototype.info = info

export default new FormulaInformationManager()