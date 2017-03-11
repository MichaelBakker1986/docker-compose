var NodeGit = require("nodegit");
var fs = require('fs');
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
    }).catch(function(err){
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