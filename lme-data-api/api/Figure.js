/**
 * DB Connector
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
            methods: {}
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
