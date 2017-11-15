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
        function parentUuids(id) {
            return new Promise(function(ok, fail) {
                db.driver.execQuery("SELECT uuid_parent from figure_tree where uuid=? order by id", [id], function(err, result) {
                    if (err) fail(err)
                    ok(result)
                })
            })
        }

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
                    return Promise.all([new Promise(function(ok, fail) {
                        let sql = "SELECT figure.* FROM figure join ( SELECT max(figure.id) as m from figure inner join figure_tree on uuid_parent=figure.uuid where figure_tree.uuid=? group by var,col ) as best on best.m=figure.id";
                        db.driver.execQuery(sql, [id], function(err, result) {
                            if (err) fail(err)
                            ok(result)
                        })
                    }), parentUuids(id)]);
                }
                ,
                insertFigures: function(parent, newChildId, values) {
                    return Promise.all([new Promise(function(ok, fail) {
                        var sql = "INSERT INTO figure_tree (uuid,uuid_parent)  SELECT '" + newChildId + "' as uuid,uuid_parent as uuid_parent FROM figure_tree where uuid = '" + parent + "' UNION  select '" + newChildId + "','" + newChildId + "';";
                        var oldSql = "INSERT INTO figure_tree (uuid,uuid_parent) VALUES ('" + newChildId + "','" + parent + "'),('" + newChildId + "','" + newChildId + "');";
                        db.driver.execQuery(sql, [], function(err, result) {
                            if (err) fail(err)
                            ok(result)
                        })
                    }), new Promise(function(ok, fail) {
                        if (values.length > 0) {
                            db.driver.execQuery("INSERT INTO figure (uuid,var,col,val) VALUES " + values.map(a => {
                                return "('" + a.join("','") + "')"
                            }).join(','), [], function(err, result) {
                                if (err) fail(err)
                                ok(result)
                            })
                        } else {
                            ok({status: 'succes', message: 'no values need to be inserted'})
                        }
                    })])
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

