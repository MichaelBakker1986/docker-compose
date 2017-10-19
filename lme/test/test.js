var request = require('request')
var rp = require('request-promise');
var counter = 1000;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//var host = "http://localhost:808";
var host = "http://10.146.2.87:808";

function post(type, url, data) {
    request({
        url: host + url,
        method: type,
        json: data,
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
}

function requestLoops(type, url, data) {
    post(type, url, data)
    setTimeout(function() {
        requestLoops(type, url, data)
    }, getRandomInt(100, 600) * 100);
}

requestLoops("GET", "0/models")
requestLoops("GET", "0/branches")
requestLoops("POST", "0/TEST/saveFFL_LME", {
    model: 'TEST',
    data: 'testData' + counter++
})
