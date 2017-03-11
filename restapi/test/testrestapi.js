var fesjsApi = require('../../ff-fesjs-api.js');

var fs = require('fs');
var data = fs.readFileSync('../resources/AABPRICING.ffl', 'utf8');
fesjsApi.init(data);



