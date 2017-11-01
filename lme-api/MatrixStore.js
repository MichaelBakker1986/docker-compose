//simple database mock.
/**
 * The goal is to directly insert and pull(renamed) data from internal used data
 * @type {exports.MatrixStore}
 */
const storedValues = {}
exports.MatrixStore = class {
    getOrCreate(id) {
        storedValues[id] = storedValues[id] || {
            id: id,
            values: {}
            // properties: { column: true,  variable: true,  value: true }
        };
        return storedValues[id];
    }
}