//No state version, every request will return new instance.
exports.MatrixStore = class {
    getOrCreate(id) {
        return {
            id: id,
            values: {},
            parents: {},
            create_date: new Date().getTime()
            // properties: { column: true,  variable: true,  value: true }
        };
    }
}