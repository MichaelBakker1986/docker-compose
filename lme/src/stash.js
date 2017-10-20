var request = require('request')
var rp = require('request-promise');
var rpJSON = require('request-promise-json');
var exec = require('child-process-promise').exec;
var log = require('ff-log');
var develop = require('os').hostname() == 'michael';
//make git ls-files-root alias
exec('git config --global alias.ls-files-root "! git ls-files"')
const write = require('fs-writefile-promise/lib/node7')

class Stash {

    commit(name, data, lme) {
        //transform ffl to JSON canvas file
        write('./public/json/' + name + '.ffl', data).then(write('./public/json/' + name + '_canvas.json', lme)).then(function(filename) {
            if (develop) {
                return "develop mode";
            }
            console.log("DEMO user modified model file: [" + filename + "]. Begin pushing to repository.") //=> '/tmp/foo'
            let command = "git pull &&  git add . && git commit -m changeByDEMO && git push";
            return exec(command).then((ok) => {
                console.info("GIT commit success while pushing file to repository: " + filename)
            }).catch((err) => {
                console.error("GIT commit failed while pushing file to repository: [" + err + "]")
            })
        }).catch(function(err) {
            console.error(err)
        })
    }

    models(branch, path) {
        let command = "git checkout " + branch + " -q && git pull -q && git ls-files-root *." + path;
        //log.info("Do command: [" + command + "]");
        return exec(command)
            .then(function(result) {
                return result.stdout.split('\n');
            }).catch(function(err) {
                console.error('ERROR: ', err);
                return "";
            });
    }

    branches() {
        let command = "git ls-remote --heads";
        //log.info("Do command: [" + command + "]");
        return exec(command)
            .then(function(result) {
                //split results with tabs and newlines, extract only the branchnames
                return result.stdout.split(/\t|\n/).filter((element, index, array) => {
                    return (index % 2 !== 0);
                });
            }).catch(function(err) {
                console.error('ERROR: ', err);
                return [];
            });
    }
}

module.exports = Stash.prototype;