var fesjsApi = require('../../ff-fes/ff-fes.js');

var fs = require('fs');
var data = fs.readFileSync('../resources/AABPRICING.ffl', 'utf8');
//will fail caused by MatrixLookup
fesjsApi.init(data);



