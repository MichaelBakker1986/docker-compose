const XSDConverter = require('../XSDToFFLConverterv2').XSDConverter

function testCaseOne() {
    const xsdConvert = new XSDConverter()
    xsdConvert.loadXSD("\.xsd$")
    xsdConvert.start()
    xsdConvert.print()
}

function testCaseTwo() {
    const xsdConvert = new XSDConverter()
    xsdConvert.loadJSON(require('./InputContianer.json'))
    xsdConvert.start()
    xsdConvert.print()
}
testCaseOne()