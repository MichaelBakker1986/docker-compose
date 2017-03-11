var Sequelize = require('sequelize');
var dbSchema = process.dbSchema || 'questjs';

var mysqldbstring = 'mysql://root:root@localhost:3306/' + dbSchema;
/**
 * DataModel
 * Interesting parts are VALUE and FORMULA
 * Rest just meta-data
 * @type {*|exports|module.exports}
 */
console.info('Database connection initializing. Schema:[' + dbSchema + ']');

var sequelize = new Sequelize(mysqldbstring, {
    /*logging: false*/
});
var FORMULAASSOCIATION = sequelize.define('formula_association', {
    association: {
        type: Sequelize.STRING
    }
});
var DOCUMENT = sequelize.define('document', {
    name: {
        type: Sequelize.STRING
    }
});
var FORMULA = sequelize.define('formula', {
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    //user typed formula, used for human readability
    original: {
        type: Sequelize.STRING(1024)
    },
    //optimized, used by program.
    parsed: {
        type: Sequelize.STRING(1024)
    },
    //AST, we lose information in the original string. For so far i know only because Id's can be numbers.
    //so if the formula is 1+2, do u mean formula[1] or just 1?
    //another solution would be getValue(1) + 2. Doesn't make me happy
    ast: {
        type: Sequelize.STRING(10192)
    },
    type: {
        type: Sequelize.STRING,
        defaultValue: 'noCacheLocked'
    }
});

var VALUE = sequelize.define('value', {
    colId: {
        type: Sequelize.INTEGER
    },
    value: {
        type: Sequelize.STRING
    }
});
var SOLUTION = sequelize.define('solution', {
    name: {
        type: Sequelize.STRING,
        unique: true
    }
});

var UIMODEL = sequelize.define('uimodel', {
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    displayAs: {
        type: Sequelize.STRING
    },
    rowId: {
        type: Sequelize.STRING
    },
    colId: {
        type: Sequelize.STRING
    },
    parentName: {
        type: Sequelize.STRING
    }
});
FORMULAASSOCIATION.belongsTo(FORMULA, {
    as: 'from'
})
FORMULAASSOCIATION.belongsTo(FORMULA, {
    as: 'to'
})
UIMODEL.hasMany(UIMODEL, {
    as: 'nodes'
});
SOLUTION.hasMany(UIMODEL, {
    as: 'nodes'
});
UIMODEL.belongsTo(FORMULA);

DOCUMENT.hasMany(VALUE);
FORMULA.hasMany(VALUE);

module.exports = {
    sequelize: sequelize,
    VALUE: VALUE,
    DOCUMENT: DOCUMENT,
    SOLUTION: SOLUTION,
    FORMULA: FORMULA,
    UIMODEL: UIMODEL
}