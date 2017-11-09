const Figure = require('../api/Figure');
const log = require('ff-log')
const uuid = require('uuid4')

var x = [[1, 2, 3], [1, 2, 3]]
var totoal = x.map(a => {
    return '(' + a.join(',') + ')'
})
console.info(totoal.join(','))
Figure.orm.then((data) => {
    Figure.Figures.createAsync({
        uuid: uuid(),
        col: "1",
        var: "A",
        val: "VALUE1"
    }).then((res) => {
        Figure.FigureTree.createAsync({
            uuid: res.uuid,
            uuid_parent: uuid()
        }).then((res) => {
            //
        })
    })

    Figure.Figures.findAsync({}).then((data) => {
        log.info(data)
    }).catch((err) => {
        log.error(err)
    })
    //insert Figure_tree self.uuid->self.uuid
    //insert Figure_tree self.uuid->all from parent, parents

    //to receive all values:
    //SELECT lme.figure.* FROM lme.figure_tree as init join lme.figure on uuid_parent=figure.uuid where init.uuid ='adda566e-19fa-4474-b04c-fa3e6ea36056' ;

    Figure.Figures.findAsync({uuid: 'fa94f7a3-ca47-47b0-917c-eb9ae730fc31'}).then((data) => {
        log.info(data)
    }).catch((err) => {
        log.error(err)
    })

}).catch((err) => {
    log.error(err)
})

//add value
//get value
//add Path to existing Node
//resolve values from childNode