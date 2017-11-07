var port = 80;
var express = require('express');
var app = express();
var hostname = require('os').hostname();
app.use(require('express-favicon')());
var expressStaticGzip = require("express-static-gzip");
var proxy = require('express-http-proxy');
var bodyParser = require('body-parser')
app.use(require('compression')())
app.use(require('cors')())
app.set('port', port)
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));


app.get('/id/:id', proxy('http://' + hostname + ':8085/id/:id'));
app.use('/id/:id/transformFFL_LME/', expressStaticGzip(__dirname + "/../ff-ssh-git/resources/"));
app.use('/id/:id/showcase/', proxy('http://' + hostname + ':8083/:id/showcase/'));


app.listen(port, () => {
    require('dns').lookup(require('os').hostname(), (err, add, fam) => {
        let domain = 'http://' + add + ':' + port + '/';
        console.info('<span>Proxy: </span><a href="http://' + add + '/id/DEMO/showcase">proxy</a>')
    })
});