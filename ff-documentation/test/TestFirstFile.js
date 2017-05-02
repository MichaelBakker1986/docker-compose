var otherFile = require('./otherFile')
function Test() {
}
Test.prototype.firstCall = function () {
    otherFile.simpleCall();
    callInnerFunction();
}
function callInnerFunction() {
    otherFile.complexFunction();
}
module.exports = Test.prototype;