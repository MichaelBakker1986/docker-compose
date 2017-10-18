var request = require('request')
var rp = require('request-promise');
var counter = 1000;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var host = "http://localhost:808";

function requestLoop() {
    request({
        url: host + "0/TEST/saveFFL_LME",
        method: "POST",
        data: {
            model: 'TEST',
            data: 'testData' + counter++
        },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('sucess!');
        } else {
            console.log('error' + response.statusCode);
        }
        request({
            url: host + "1/update/git/notifyCommit",
            method: "GET",
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('sucess!');
            } else {
                console.log('error' + response);
            }
        });
    });
    setTimeout(requestLoop, getRandomInt(100, 600) * 100);
}
setTimeout(requestLoop, 2000);