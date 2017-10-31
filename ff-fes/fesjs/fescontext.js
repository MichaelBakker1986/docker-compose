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
}

Context.prototype.propertyDefaults = propertyDefaults;
Context.prototype.getValues = function() {
    return this.values;
}
module.exports = Context
