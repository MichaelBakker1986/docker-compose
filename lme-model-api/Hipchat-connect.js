const host_environment_variable = process.env.HOST;
const host = host_environment_variable || '127.0.0.1'
const hipchatapikey = process.env.HIPCHAT_API_KEY;
const hipchat_endpoint = 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=' + hipchatapikey;
const request = require('request');
const log = require('log6')
const developer = (host === 'localhost');

class HipchatConnect {
    constructor() {
        if (!hipchatapikey) {
            log.warn('No communication with the HipChat server is possible, because environment variable HIPCHAT_API_KEY is not set.')
        }
        if (!host_environment_variable) {
            log.info('Not communicating with the HipChat server, because environment variable HOST is not set. Assume developer build.')
        }
    }

    send(text, level) {
        request.post({
                url: hipchat_endpoint,
                json: {
                    "color": level,
                    "message": "[" + host + "] " + text
                }
            }, (err, res, body) => {
                if (err && log.DEBUG) log.debug(err.toString())
            }
        )
    }

    log(message, levelArg) {
        if (message && !developer) {
            this.send(message, levelArg || 'green');
        }
        log.info(message);
    }
}

module.exports = new HipchatConnect()