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
            parents: {},
            create_date: new Date().getTime()
            // properties: { column: true,  variable: true,  value: true }
        };
        return storedValues[id];
    }

    loadParents(entry, total) {
        if (entry.parent) {
            const parententry = this.getOrCreate(entry.parent)
            total.parents[parententry.id] = parententry.create_date;
            for (var key in parententry.values) {
                var hash = key + "#" + parententry.values[key].colId;
                if (total[hash] == undefined) {
                    total[hash] = parententry[key]
                }
            }
            this.loadParents(parententry, total)
        }
    }
}