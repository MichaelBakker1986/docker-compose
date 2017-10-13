var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(9080, function(){
    console.log('Server running on 9080...');
});