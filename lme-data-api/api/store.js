/**
 * While calculating in front-end.
 * There is a need to store/retrieve values entered by the client
 */
var uuid = require('uuid4');
var log = require('ff-log')
const Figure = require('./Figure');
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

const MatrixStore = require('../MatrixStore').MatrixStore;
module.exports.setup = function(app) {
    var ds = new MatrixStore();
    /**
     * Retrieve entered values supplied by the client
     */
    app.get('/id/:id', function(req, res) {
        /*   Figure.orm.then((data) => {
               Figure.Figures.findAsync({}).then((data) => {
                   log.info(JSON.stringify(data))
               }).catch((err) => {
                   throw Error('Fail db lookup', err)
               })
           }).catch((err) => {
               throw Error('Fail db init', err)
           })*/
        let entry = ds.getOrCreate(req.params.id);
        if (entry.parent) {
            ds.loadParents(ds.getOrCreate(entry.parent), entry)
        }
        res.json(entry)
    });
    /**
     * Store entered values supplied by the client
     */
    app.post('/id/:id', function(req, res) {
        //resolve all entered values
        var parent = ds.getOrCreate(req.params.id)
        let newChild = ds.getOrCreate(uuid());
        newChild.parent = parent.id;
        for (var i = 0; i < req.body.data.length; i++) {
            var entry = req.body.data[i]
            newChild[entry.varName] = entry
        }
        res.json({
            saveToken: newChild.id
        })
    });
};