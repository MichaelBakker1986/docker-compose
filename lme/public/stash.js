var request = require('request')
var rp = require('request-promise');
var rpJSON = require('request-promise-json');
var args = process.argv;
var exec = require('child-process-promise').exec;

class Stash {
    Auth() {
        return {
            'user': 'michael.bakker',
            'pass': args[2],
            'sendImmediately': true
        }
    }

    models(branch, path) {
        exec("git ls-files *.json")
            .then(function(result) {
                console.info(result.stdout.split('\n'))
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

Stash.prototype.models('master', 'json')
//https://stash.topicus.nl/rest/api/1.0/projects/ff/repos/finanfinancials/browse/CODELISTS/?at=develop
module.exports = Stash.prototype;