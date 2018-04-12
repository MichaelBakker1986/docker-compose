const log = require('log6')
const ORM = require('./ModelProperty');
exports.started = ORM.orm.then(function() {
    exports.insertProperties = ORM.ModelProperty.insertModelProperties;
    exports.getFFLModelPropertyChanges = ORM.ModelProperty.getFFLModelPropertyChanges;
    exports.getModel = function(modelName) {
        return ORM.ModelProperty.getModel(modelName).then(function(ok) {
            var schemaIndex = {}
            var schema = []
            var constants = []
            var nodes = []
            var index = {};
            ok.map((row) => {
                index[row.var] = index[row.var] || {}
                if (!schemaIndex[row.col]) {
                    schemaIndex[row.col] = true;
                    schema.push(row.col)
                }
                index[row.var][row.col] = row.val;
            })
            for (var key in index) {
                const node = [];
                for (var i = 0; i < schema.length; i++) {
                    var col = schema[i];
                    node.push(index[key][col] || null)
                }
                nodes.push(node)
            }
            return {
                schema   : schema,
                nodes    : nodes,
                constants: constants
            }
        }).catch(function(err) {
            log.error(err)
        })
    }
})