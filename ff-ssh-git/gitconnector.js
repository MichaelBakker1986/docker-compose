var NodeGit = require("nodegit");
var glob = require('glob')
var log = require('ff-log')
var fs = require('fs');
function ModelListener() {
}
new Promise(function (resolve, reject) {
    fs.writeFile('finanfinancials/', '', {flag: 'wx'}, function (err) {
        if (err) {
            if (err.errno == -4075) {
                resolve("repo already created.");
            } else {
                throw err;
            }
        } else {
            resolve("repo created.");
        }
    });
}).then(function (message) {
    console.log(message);
    NodeGit.Repository.init('./finanfinancials/', 0).then(function (repo) {
        console.info('init')
    }).catch(function (err) {
        if (err) {
            if (err.errno == -4) {
                console.info('Already init');
            } else {
                throw err;
            }
        } else {
            console.info('Init Repo');
        }
    });
}).catch(function (err) {
    console.error(err);
}).then(function () {
    NodeGit.Repository
        .open("./finanfinancials").then(function (repo) {
        console.info(repo);
    }).catch(function (err) {
        console.error(err);
    })
});

// Clone a given repository into the `./tmp` folder.
//Git.Clone("ssh://git@stash.topicus.nl:7999/ff/finanfinancials.git", "./tmp")
// Look up this known commit.
/*Git.Repository
 .open("./finanfinancial/").then(function (repo) {
 // Use a known commit sha from this repository.
 return repo.getBranchCommit('develop');
 }).then(function (branch) {
 console.info(branch.getTree());
 }).catch(function (err) {
 console.error(err);
 });*/

//git clone ssh://git@stash.topicus.nl:7999/ff/finanfinancials.git
//--open ssh
//git init
//git remote add -f origin ssh://git@stash.topicus.nl:7999/ff/finanfinancials.git
//git config core.sparseCheckout true
//echo "*codelist*" >> .git/info/sparse-checkout
ModelListener.prototype.initializeModels = function () {
    var modelListener = this;
    var ffls = [];
    var fetFileNames = function (src, callback) {
        glob(src + '**/FFL/**', callback);
    };
    var modelCallback = function (err, res) {
        if (err) {
            console.log('Error', err);
        } else {
            res.forEach(function (file) {
                if (file.toLowerCase().endsWith('.ffl')) {
                    //these models are not supported for unknown reasons, most involve case-sensitive constructions
                    if (file.toLowerCase().endsWith('vbi.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('aabpricing.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('ingverslag.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('revisie.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('revisiegbi.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('revisiemkb.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('revisiemkb2.ffl')) {
                        return;
                    }
                    if (file.toLowerCase().endsWith('ingscg3.ffl')) {
                        return;
                    }
                    //manually fixed case-sensitive models
                    /*      if (file.toLowerCase().endsWith('ingscg3rev.ffl')) {
                     return;
                     }*/
                    fs.readFile(file, function read(err, data) {
                        if (err) {
                            throw err;
                        }
                        var modelData = new Buffer(data, 'binary').toString('utf-8');
                        ffls.push(modelData);
                        modelListener.onNewModel(modelData)
                    });
                }
            })
        }
    };
    //  fetFileNames(__dirname + '\\finanfinancial\\', modelCallback);
    fetFileNames(__dirname + '\\resources\\', modelCallback);
}
ModelListener.prototype.onNewModel = function (modeldata) {
    log.info(modeldata)
}
exports.ModelListener = ModelListener;