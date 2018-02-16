/**
 * DB Connector
 *
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
const dbConnectString = process.env.FIGURE_DB_STRING;// || "postgresql://postgres:postgres@127.0.0.1:5432/lme";
if (!dbConnectString) return;//early exit (no db)
const orm = require("orm");
const log = require('log6')
exports.orm = Promise.all([
    orm.connectAsync(dbConnectString).then(async (db) => {

        db.use(require('orm-timestamps'), {
            createdProperty : 'created_at',
            modifiedProperty: 'modified_at',
            expireProperty  : false,
            dbtype          : { type: 'date', time: true },
            now             : function() {
                return new Date();
            },
            persist         : true
        });
        var Figures = db.define("figure", {
            uuid: String,
            var : String,
            col : String,
            val : String
        }, {
            methods: {
                getScenarioFigures: function(ids) {
                    return Promise.all([new Promise(function(ok, fail) {
                        let sql = "SELECT figure.* FROM figure join ( SELECT max(figure.id) as m from figure  where uuid IN ('" + ids.join("','") + "') group by var,col ) as best on best.m=figure.id";
                        db.driver.execQuery(sql, [], function(err, result) {
                            if (err) return fail(err)
                            ok(result)
                        })
                    }), new Promise(function(ok, fail) {
                        //var sql = "SELECT uuid_parent from figure_tree where uuid=? order by id";
                        var sql = "SELECT * from figure_commit where uuid IN ('" + ids.join("','") + "') order by id;";
                        db.driver.execQuery(sql, [], function(err, result) {
                            if (err) return fail(err)
                            ok(result)
                        })
                    })]);
                },
                getFigures        : function(id) {
                    return Promise.all([new Promise(function(ok, fail) {
                        let sql = "SELECT figure.* FROM figure join ( SELECT max(figure.id) as m from figure inner join figure_tree on uuid_parent=figure.uuid where figure_tree.uuid=? group by var,col ) as best on best.m=figure.id";
                        db.driver.execQuery(sql, [id], function(err, result) {
                            if (err) return fail(err)
                            ok(result)
                        })
                    }), new Promise(function(ok, fail) {
                        //var sql = "SELECT uuid_parent from figure_tree where uuid=? order by id";
                        var sql = "SELECT fc.* from figure_tree as ft join figure_commit as fc on uuid_parent=fc.uuid where ft.uuid=? order by fc.id;";
                        db.driver.execQuery(sql, [id], function(err, result) {
                            if (err) return fail(err)
                            ok(result)
                        })
                    })]);
                },
                insertFigures     : function(parent, newChildId, values, saveTime) {
                    return Promise.all([new Promise(function(ok, fail) {
                        var sql = "INSERT INTO figure_tree (uuid,uuid_parent)  SELECT '" + newChildId + "' as uuid,uuid_parent as uuid_parent FROM figure_tree where uuid = '" + parent + "' UNION  select '" + newChildId + "','" + newChildId + "';";
                        db.driver.execQuery(sql, [], function(err, result) {
                            if (err) fail(err)
                            ok(result)
                        })
                    }), new Promise(function(ok, fail) {
                        if (values.length > 0) {
                            db.driver.execQuery("INSERT INTO figure (uuid,var,col,val) VALUES " + values.map(a => {
                                return "('" + a.join("','") + "')"
                            }).join(',').replace(/''/gm, 'null'), [], function(err, result) {
                                if (err) return fail(err)
                                ok(result)
                            })
                        } else {
                            ok({ status: 'succes', message: 'no values need to be inserted' })
                        }
                    }), new Promise(function(ok, fail) {
                        if (values.length > 0) {
                            db.driver.execQuery("INSERT INTO figure_commit (uuid,create_time) VALUES (?,?)"
                                , [newChildId, saveTime], function(err, result) {
                                    if (err) return fail(err)
                                    ok(result)
                                })
                        } else {
                            ok({ status: 'succes', message: 'no values need to be inserted' })
                        }
                    })])
                }
            }
        }, {
            timestamp: true
        });
        var FigureTree = db.define("figure_tree", {
            uuid       : String,
            uuid_parent: String,
        }, {
            methods: {}
        }, {
            timestamp: true
        });
        var FigureCommit = db.define("figure_commit", {
            uuid       : String,
            create_time: { type: "date", time: true }
        });

        exports.Figures = Figures;
        exports.FigureCommit = FigureCommit;
        exports.FigureTree = FigureTree;

        return db.sync(async (err, other) => {
            if (err) throw err;
            const dbSchema = {
                figure       : ['uuid', 'var', 'col', 'val'],
                figure_commit: ['uuid', 'create_time'],
                figure_tree  : ['uuid', 'uuid_parent']
            }
            //create indexes on psql databases
            if (db.driver.dialect != 'mysql') {
                for (var table in dbSchema) {
                    for (var i = 0; i < dbSchema[table].length; i++) {
                        var column = dbSchema[table][i];
                        const sql = "CREATE INDEX IF NOT EXISTS idx_" + table + "_" + column + " ON " + table + " (" + column + ");";
                        db.driver.execQuery(sql, [], function(err, result) {
                            if (err) throw err
                        })
                    }
                }
            }
            return await "";
        })
    }).catch((err) => {
        log.error(err)
    })
]).catch((err) => {
    log.error(err)
})

