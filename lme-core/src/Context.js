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

//request scope context
function Context(opts) {
    //reference to the ApplicationContext context
    this.applicationContext = ApplicationContext;
    this.values = {};
    this.audit = [];
    this.calc_count = 0;
    this.columnSize = 6;
    this.columns = ['title', 'value', 'visible', 'entered', 'locked', 'required', 'hint', 'choices', 'original', 'valid'];
    this.saveToken = undefined;//commit hash
    if (opts) for (var key in opts) this[key] = opts[key]
}

Context.prototype.propertyDefaults = propertyDefaults;
Context.prototype.getValues = function() {
    return this.values;
}
Context.prototype.clear = function() {
    for (var key in this.values) {
        this.values[key] = {}
    }
    this.audit.length = 0;
}
Context.prototype.hasChanges = function() {
    return this.audit.length > 0;
}
module.exports = Context
