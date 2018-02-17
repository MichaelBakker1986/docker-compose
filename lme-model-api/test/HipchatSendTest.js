const request = require('request');
const hostname = require('os').hostname();
var uuid = require('uuid4');
var name = 'KSP'
const log = require('log6')

function send(text, level) {
    request.post({
            url: 'https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=' + process.env.HIPCHAT_API_KEY,
            json: {
                "color": 'green',
                "message": '<span>ffl model update:</span><a href="http://' + hostname + ':8083/#' + name + '&' + uuid() + '">' + name + "</a><span>" + name + '</span>'
            }
        }, (err, res, body) => {
            if (err) log.error(err)
            log.info(err ? "" + err : 'Hipchat post ok')
        }
    )
}
send('<span>ffl model update:</span><a href="http://' + hostname + ':8083/#' + name + '&' + uuid() + '">' + name + "</a><span>" + name + '</span>');
