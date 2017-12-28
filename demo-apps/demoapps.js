const port = 8083;
const proxyhost = process.env.PROXY_HOST || 7080
const host = process.env.HOST || '127.0.0.1'
const request = require('request-promise-json');
const log = require('ff-log')
const compression = require('compression')
const expressStaticGzip = require("express-static-gzip");
const app = require('express')();
app.use(require("express-no-favicons")());
app.use(require('cors')());
app.use(compression())

app.use('/id/:id/', expressStaticGzip(__dirname + "/angular-demo/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/data-graph/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/showcase/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/monli/"));
app.use('*/font-awesome', expressStaticGzip(__dirname + "/node_modules/font-awesome"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/"));

//showcase proxies
app.use('/id/:id/', expressStaticGzip(__dirname + "/showcase/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/node_modules/ace-builds/src-min/"));

//proxies
app.use('/id/:id/resources/', expressStaticGzip(__dirname + "/../git-connect/resources/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/lme-ide/"));
app.use('/id/:id/', expressStaticGzip(__dirname + "/lme-ide/dist/"));

app.listen(port, () => {
    var domain = host + ':' + port;

    //talk with the proxy
    const routes = [];
    app._router.stack.forEach(function(r) {
        if (r.route && r.route.path) {
            routes.push(r.route.path)
        }
    })
    routes.push('*.html')

   // routes.push('*.css')

    routes.push('*/AdminLTE.min.css')
    routes.push('*/_all-skins.min.css')
    routes.push('*/aceide.css')
    routes.push('*/bundle.css')
    routes.push('*/grid_example.css')
    routes.push('*/monli.css')
    routes.push('*/fresh.css')
    routes.push('*/style.css')

    routes.push('*.ffl')
    routes.push('*/adminlte.min.js')
    routes.push('*/demo.js')
    routes.push('*/scorecard.js')
    routes.push('*.woff2')
    routes.push('*.woff')
    routes.push('*.ttf')
    routes.push('*/resources/*.js')
    routes.push('*/ext-searchbox.js')
    routes.push('*/ace.js')
    routes.push('*/promotion.js')
    routes.push('*/monli.js')
    routes.push('*/monli.ico')
    routes.push('*/showcase.js')
    routes.push('*.svg')
    routes.push('*/ext-language_tools.js')
    routes.push('*/fflmode.js')
    routes.push('*/bootstrap.min.js')
    routes.push('*/theme-tomorrow.js')
    routes.push('*.jpg')
    routes.push('*.story')
    routes.push('*.xlsx')
    const route = routes.join(',')
    request.get('http://' + host + ':' + proxyhost + '/register/service/fs-api/' + host + '/' + port + '/' + route).then(function(data) {
        if (log.DEBUG) log.debug(data);
    }).catch(function(err) {
        log.error('Failed to register ', err);
    });
    var proxy_domain = host + ':' + proxyhost;
    console.info(
        '<span>DEMO apps: </span>\n' +
        '<a href="http://' + proxy_domain + '/id/DEMO/scorecard.html#MVO&DEMO">Bootstrap Grid example</a><span> | </span>\n' +
        '<a href="http://' + proxy_domain + '/id/DEMO/basic_example.html">Most Basic Angular example</a><span> | </span>\n' +
        '<a href="http://' + proxy_domain + '/id/DEMO/showcase/showcase.html">Showcase example</a><span> | </span>\n' +
        '<a href="http://' + proxy_domain + '/id/DEMO/uishowcase.html">UI Showcase example</a><span> | </span>\n' +
        '<a href="http://' + proxy_domain + '/id/SlimmeOuder/HoeveelKostEenStudie.html">Monli Hoeveel kost een studie?</a><span> | </span>\n' +
        '<a href="http://' + proxy_domain + '/id/SlimmeOuder/WatKostEenKind.html">Monli Wat kost een kind</a><span> | </span>\n' +
        '<a href="http://' + proxy_domain + '/id/DEMO/basic_example.html">Extended controller Angular example</a><span> | </span>\n' +
        '<br><span>IDE apps: </span>\n' +
        '<a href="http://' + proxy_domain + '/id/DEMO/aceide.html">IDE DEMO Application</a><span> | </span>\n'
    )
});