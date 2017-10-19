var request = require('request')
var rp = require('request-promise');
var rpJSON = require('request-promise-json');
var args = process.argv;
var exec = require('child-process-promise').exec;
var log = require('ff-log');
exec('git config --global alias.ls-files-root "! git ls-files"')
const write = require('fs-writefile-promise/lib/node7')

class Stash {
    Auth() {
        return {
            'user': 'michael.bakker',
            'pass': args[2],
            'sendImmediately': true
        }
    }

    commit(name, data) {
        write('./public/json/' + name + '.ffl', data)
            .then(function(filename) {
                console.log("DEMO user modified model file: [" + filename + "]. Begin pushing to repository.") //=> '/tmp/foo'
                let command = "git pull &&  git add  * && git commit -m changeByDEMO && git push";
                return exec(command).then((ok) => {
                    console.info("GIT commit succes while pushing file to repository: [" + err + "]")
                }).catch((err) => {
                    console.error("GIT commit failed while pushing file to repository: [" + err + "]")
                })
            })
            .catch(function(err) {
                console.error(err)
            })
    }

    models(branch, path) {
        let command = "git checkout " + branch + " -q && git pull -q && git ls-files-root *." + path;
        //log.info("Do command: [" + command + "]");
        return exec(command)
            .then(function(result) {
                return result.stdout.split('\n');
            })
            .catch(function(err) {
                console.error('ERROR: ', err);
            });
    }

    json(qs) {
        return rpJSON.request({
            'url': qs,
            'auth': this.Auth()
        }).then((data) => {
            return data;
        }).catch((err) => {
            return err;
        })
    }

    api(qs) {
        return rp.get('http://stash.topicus.nl/rest/api/1.0/' + qs, {
            'auth': this.Auth()
        }).catch((err) => {
            return err;
        })
    }
}

module.exports = Stash.prototype;