var mysql = require('mysql');
var Promise = require('promise');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'finan',
    database: 'test'
});
connection.connect();


var testresults = require('../../ff-fes/test/RunAllTest')

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
var x = guid();
var dbCall = function (query) {
    return new Promise(function (success, err) {
        connection.query(query, function (error, results, fields) {
            if (error) {
                err(error);
            } else {
                success({
                    data: results
                });
            }
        });
    });
}
testresults.results.forEach(function (testResult) {
    testResult.forEach(function (item) {
        dbCall("INSERT INTO test.log (uuid,info) VALUES ('" + x + "','" + item + "')").then(function (data) {
        }).catch(function (err) {
            console.error(err)
        })
    })
})