var mysql = require('mysql');
var Promise = require('promise');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'finan',
    database: 'ff'
});
connection.connect();
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
    //    connection.end();
}

module.exports = dbCall;