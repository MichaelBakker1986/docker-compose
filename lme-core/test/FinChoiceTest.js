const assert = require('assert')
const FinFormula = require('../exchange_modules/ffl/FinFormula');
assert(JSON.parse(FinFormula.finChoice("0:VWO|1:VMBO-MBO|2:VMBO-HAVO|3:HAVO")).length == 4)