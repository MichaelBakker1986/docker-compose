//app scope context
var ApplicationContext = {
    parsers: []
}
function MockValues() {
}
//request scope context
function Context() {
    //reference to the ApplicationContext context
    this.applicationContext = ApplicationContext;
    this.values = {};
}
Context.prototype.getValues = function () {
    return this.values;
}
module.exports = Context
