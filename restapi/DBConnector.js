// var mysql = require('mysql');
// var Promise = require('promise');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ff'
// });
// var dbSettings = require('./dbSettings');
// var connection = mysql.createConnection(dbSettings);
// connection.connect();
//
// var dbCall = function (query) {
//     return new Promise(function (success, err) {
//         connection.query(query, function (error, results, fields) {
//             if (error) {
//                 err(error);
//             } else {
//                 success({
//                     data: results
//                 });
//             }
//         });
//     });
//     //    connection.end();
// }
//simple database mock.
var storedValues = {}
module.exports = {
    getUserContext: function (contextId) {
        if (storedValues[contextId] == undefined) {
            storedValues[contextId] = {
                contextId: contextId,
                values: {}
            };
        }
        return storedValues[contextId];
    }
};