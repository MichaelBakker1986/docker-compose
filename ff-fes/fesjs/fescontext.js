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
var ctx = new Context();
var ctx2 = new Context();

console.info(ctx.applicationContext)
console.info(ctx2.values)

module.exports = Context
