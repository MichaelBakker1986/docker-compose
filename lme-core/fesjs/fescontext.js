//app scope context
var ApplicationContext = {
    parsers: []
}
var propertyDefaults = {
    'visible': true,
    'value': 1e-10,
    'required': false,
    'locked': false,
    'choices': undefined,
    'valid': true,
    'validation': false
}

function MockValues() {
}

//request scope context
function Context() {
    //reference to the ApplicationContext context
    this.applicationContext = ApplicationContext;
    this.values = {};
    this.audit = [];
    this.calc_count = 0;
    this.saveToken = undefined;//commit hash
}

Context.prototype.propertyDefaults = propertyDefaults;
Context.prototype.getValues = function() {
    return this.values;
}
Context.prototype.hasChanges = function() {
    return this.audit.length > 0;
}
module.exports = Context
