//simple database mock.
var storedValues = {}
module.exports = {
    getUserContext: function(contextId) {
        if (storedValues[contextId] == undefined) {
            storedValues[contextId] = {
                contextId: contextId,
                values: {},
                // properties: {
                //     column: true,
                //     variable: true,
                //     value: true
                // }
            };
        }
        return storedValues[contextId];
    }
};