const browserify  = require('browserify'),
      log         = require('log6'),
      fs          = require('fs'),
      cp          = require('child-process-es6-promise'),
      packageInfo = require('./package.json')

//store for revert
const old_module_version = packageInfo.version;
//major version bumb
packageInfo.version = String(parseInt(packageInfo.version.split('.')[0]) + 1) + '.0.0'
const module_tag_name = packageInfo.author.split('@')[0].replace(/\W/g, '').toLowerCase() + '/' + packageInfo.name + ':' + packageInfo.version;

fs.writeFileSync('./package.json', JSON.stringify(packageInfo, null, 2), 'utf8')
const REQUIRE_FILES = [__dirname + '/' + packageInfo.main];
const b = browserify([], {
    insertGlobalVars: true,
    insertGlobals   : true,
    detectGlobals   : false,
    bare            : true,
    standalone      : packageInfo.name,
    node            : true
}).ignore('fsevents').external(__dirname + '/node_modules/browserify/index.js').external('browserify').external(__dirname + '/node_modules/browserify-middleware/index.js').external('browserify-middleware')

for (var i = 0; i < REQUIRE_FILES.length; i++) b.require(REQUIRE_FILES[i], { expose: REQUIRE_FILES[i] })
const res = fs.createWriteStream(__dirname + '/dist/' + (packageInfo.name).replace(/\W/gmi, '_').toLowerCase() + '.js')
b.bundle().pipe(res)

function revertUpdate(message) {
    log.error(message)
    packageInfo.version = old_module_version;
    fs.writeFileSync('./package.json', JSON.stringify(packageInfo, null, 2), 'utf8')
}

res.on('finish', () => {
    log.info('Done browserfiy module ' + module_tag_name)
    return;
    const command = 'build . -t=' + module_tag_name
    cp.spawn('docker', command.split(' '), { stdio: 'inherit' }).then((result) => {
        if (result.code == 0) {
            cp.spawn('docker', ['push', module_tag_name], { stdio: 'inherit' }).then((result) => {
                return log.info('Docker image pushed ' + module_tag_name)
            }).catch((error) => revertUpdate('failed to push docker image ' + module_tag_name + ' \n' + error.toString()))
        } else revertUpdate("Failed to build docker image")
    }).catch((error) => revertUpdate('failed to create docker image \n' + error.toString()));
})