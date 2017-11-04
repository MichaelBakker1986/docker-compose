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
            values: {},
            create_date: new Date().getTime()
            // properties: { column: true,  variable: true,  value: true }
        };
        return storedValues[id];
    }

    loadParents(entry, total) {
        if (entry.parent) {
            const parententry = this.getOrCreate(entry.parent)
            for (var key in parententry.values) {
                if (total[key] == undefined) {
                    total[key] = parententry[key]
                }
            }
            this.loadParents(parententry, total)
        }
    }
}