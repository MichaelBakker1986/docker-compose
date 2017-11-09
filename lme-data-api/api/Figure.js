/**
 * DB Connector
 */
/**
 * Git structure DB
 *       |a=100     |a=300
 *       |b=200     |
 * dev   |_____|0___|1______________
 * usr2  |     \       \____________   = a=300,b=200
 *       |      \
 * usr1  |       \__________________   = a=100,b=200
 *
 *
 * parent|child
 * dev0   |usr1
 * dev1   |usr2
 */
const dbConnectString = process.env.FIGURE_DB_STRING;
const orm = require("orm");

exports.orm = Promise.all([
    orm.connectAsync(dbConnectString).then(async (db) => {
        db.use(require('orm-timestamps'), {
            createdProperty: 'created_at',
            modifiedProperty: 'modified_at',
            expireProperty: false,
            dbtype: {type: 'date', time: true},
            now: function() {
                return new Date();
            },
            persist: true
        });
        var Figures = db.define("figure", {
            uuid: String,
            var: String,
            col: String,
            val: String
        }, {
            methods: {
                getFigures: function(id) {
                    // // SELECT lme.figure.* FROM lme.figure_tree as init join lme.figure on uuid_parent=figure.uuid where init.uuid ='adda566e-19fa-4474-b04c-fa3e6ea36056'
                    return new Promise(function(ok, fail) {
                        db.driver.execQuery("SELECT lme.figure.* FROM lme.figure_tree as init join lme.figure on uuid_parent=figure.uuid where init.uuid = ?", [id], function(err, result) {
                            //var sql = db.driver.execQuery("SELECT * FROM figure where uuid = ?", [id], function(err, result) {
                          ok(result)
                          })
                    });
                },
                insertFigures: function(id, data) {
                    return new Promise(function(ok, fail) {
                        var totoal = data.map(a => {
                            return "('" + a.join("','") + "')"
                        }).join(',')
                        db.driver.execQuery("INSERT INTO lme.figure (uuid,var,col,val) VALUES " + totoal + "", [id], function(err, result) {
                            //var sql = db.driver.execQuery("SELECT * FROM figure where uuid = ?", [id], function(err, result) {
                            ok(result)
                        })
                    });
                }
            }
        }, {
            timestamp: true
        });
        var FigureTree = db.define("figure_tree", {
            uuid: String,
            uuid_parent: String,
        }, {
            methods: {}
        }, {
            timestamp: true
        });
        exports.Figures = Figures;
        exports.FigureTree = FigureTree;
        return db.sync(async (err) => {
            if (err) throw err;
            return await "";
        })
    }).catch((err) => {
        throw err;
    })
]).catch((err) => {
    throw err;
})
