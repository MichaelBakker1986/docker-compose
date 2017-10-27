var express = require('express');
var request = require('request');
var fs = require('fs')
var port = 8083;
var serveStatic = require('serve-static');
var compression = require('compression')
var app = express();
app.use(require('express-favicon')());
app.use(compression())
app.use(serveStatic(__dirname + "/public/"));
app.use(serveStatic(__dirname + "/CONFIGURATION/"));
app.use(serveStatic(__dirname + "/bower_components/"));
app.use(serveStatic(__dirname + "/../adminlte/dist/"));
/**
 * Just a file system cache
 */
app.get('/:id/transformFFL_LME/*', function(req, res) {
    var path = __dirname + '/CONFIGURATION/DEMO/' + req.originalUrl.substring(req.originalUrl.indexOf('transformFFL_LME/') + 17);
    /*    if (!fs.existsSync(__dirname + '/CONFIGURATION/DEMO/')) {
            fs.mkdir(__dirname + '/CONFIGURATION/DEMO/', function() {
            })
        }
        if (fs.existsSync(path)) {
            fs.createReadStream(path).pipe(res);
        } else {*/
    let newVar = request.get('http://' + require('os').hostname() + ':8080/DEMO/transformFFL_LME/KSP');
    newVar.pipe(res)
    /*}*/
});
app.listen(port, function() {
    require('dns').lookup(require('os').hostname(), function(err, add, fam) {
        console.info('<a href="http://' + add + ':' + port + '/#model=KSP">Angular demo Application</a><span> up.</span>');
    })
});