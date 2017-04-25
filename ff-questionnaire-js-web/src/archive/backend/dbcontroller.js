var DB = require('./db.js');
/* Suppose to become a GENERIC REST-API for the Sequelize DB
 * There are others. That are way better structured and documented
 * BUT none very mature, none support MANY-MANY relations (PUT/GET)
 * The writing of the Generic GET with simple relations is very very simple 20LOC.
 * Better to work with DB[*].prototype.update() or merge. now too many closures and ifs are wasted for too many situations
 * Be aware all code =  async, all return values are Promises!
 */
var excludes = ['updatedAt', 'createdAt'];
var selfReferences = {
    solution_uimodel: true
}
//we have to make this recursive..
//not that nice job.
var associationProcessor = {
    HasMany: function (association, values, foundEntityId)
    {
        //one to many association
        var where = {};
        where[association.identifierField] = foundEntityId;
        //add parent id to all children
        values.forEach(function (el)
        {
            el[association.identifierField] = foundEntityId;
        });
        return association.target.destroy({
            where: where
        }).then(function ()
        {
            return association.target.bulkCreate(values);
        }).then(function ()
        {
            var nestedEntityAssociations = association.target.associations;
            values.forEach(function (entree)
            {
                for (key in entree)
                {
                    if (entree[key] !== null)
                    {
                        var nestedEntityAssociation = nestedEntityAssociations[key];
                        if (nestedEntityAssociation !== undefined)
                        {
                            var bulkUpdate = [];
                            entree[key].forEach(function (elem)
                            {
                                bulkUpdate.push(
                                    {name: elem.name}
                                );
                            })
                            association.target.findOne({where: {name: entree.name}}).then(function (obj)
                            {
                                bulkUpdate.forEach(function (item)
                                {
                                    association.target.update(
                                        {uimodelId: obj.id, parentName: obj.rowId + '_' + obj.colId},
                                        {where: item}
                                    );
                                })
                            });
                        }
                    }
                }
            });
        });
    },
    BelongsTo: function (association, entree, foundEntityId)
    {
        var x = association;
        var v = entree;
        var z = foundEntityId;
        var promises = [];
        if (entree[association.target.primaryKeyField] === undefined)
        {
            var promise = association.target.findOrCreate({
                where: {
                    name: entree.name
                },
                defaults: entree,
                excludes: excludes//should be the properties from given default
            });
            promise.spread(function (object, created)
            {
                entree[association.target.primaryKeyField] = object[association.target.primaryKeyField];
            });
            promises.push(promise);
        }
        else
        {
            promises.push(association.target.update(
                entree,
                {where: {id: entree.id}}
            ));
        }
        return Promise.all(promises).then(function ()
        {
            var update = {};
            update[association.identifierField] = entree[association.target.primaryKeyField]
            return association.source.update(
                update,
                {where: {id: foundEntityId}}
            );
        });
    },
    BelongsToMany: function (association, valuesArg, foundEntityId)
    {
        var promises = [];
        var values = valuesArg;
        //we don't have to update or create any existing associations when given a template
        values.forEach(function (entree)
        {
            entree[association.toSource.identifierField] = foundEntityId;
            //all the references that has primary key have to be updated
            if (entree.id === undefined)
            {
                var promise = association.target.findOrCreate({
                    where: {
                        name: entree.name
                    },
                    defaults: entree,
                    excludes: excludes//should be the properties from given default
                });
                promise.spread(function (object, created)
                {
                    entree[association.toTarget.identifierField] = object.dataValues.id;
                });
                promises.push(promise);
            }
            else
            {
                entree[association.toTarget.identifierField] = entree.id;
                promises.push(association.target.update(
                    entree,
                    {where: {id: entree.id}}
                ));
            }
        });
        //so when all promises finished
        //we goning to update the references
        //all created entities now have a ID;
        return Promise.all(promises).then(function ()
        {
            var where = {};
            where[association.toSource.identifierField] = foundEntityId;
            return association.throughModel.destroy({where: where})
        }).then(function ()
        {
            return association.throughModel.bulkCreate(values)
        }).then(function ()
        {
            var nestedEntityAssociations = association.target.associations;
            return DB.sequelize.Promise.all(values.reduce(function (innerpromises, entree)
            {
                for (key in entree)
                {
                    if (entree[key] !== null)
                    {
                        var nestedEntityAssociation = nestedEntityAssociations[key];
                        if (nestedEntityAssociation !== undefined)
                        {
                            innerpromises.push(associationProcessor[nestedEntityAssociation.associationType](nestedEntityAssociation, entree[key], entree[association.toTarget.identifierField]));
                        }
                    }
                }
                return innerpromises;
            }, []));
        });
    }
}
function updateAll(baseEntity, values)
{
    var promises = [];
    var baseEntityAssociations = baseEntity.associations;
    values.forEach(function (entree)
    {
        if (entree[baseEntity.primaryKeyField] === undefined)
        {
            var promise = baseEntity.findOrCreate({
                where: {
                    name: entree.name
                },
                defaults: entree,
                attributes: {
                    exclude: excludes
                }
            });
            promises.push(promise);
            promise.spread(function (object, created)
            {
                entree[baseEntity.primaryKeyField] = object.dataValues[baseEntity.primaryKeyField];
            });
        }
        else
        {
            var where = {};
            where[baseEntity.primaryKeyField] = entree[baseEntity.primaryKeyField];
            promises.push(baseEntity.update(
                entree,
                {where: where}
            ));
        }
    });
    return Promise.all(promises).then(function ()
    {
        var all = DB.sequelize.Promise.all(values.reduce(function (innerpromises, entree)
        {
            var baseEntityAssociations = baseEntity.associations;
            for (key in entree)
            {
                if (entree[key] !== null)
                {
                    var nestedEntityAssociation = baseEntityAssociations[key];
                    if (nestedEntityAssociation !== undefined)
                    {
                        //many to many association
                        innerpromises.push(associationProcessor[nestedEntityAssociation.associationType](baseEntityAssociations[key], entree[key], entree[baseEntity.primaryKeyField]));
                    }
                }
            }
            return innerpromises;
        }, []));
        return all;
    });
}
//everything in here is sync, no Promise needed.
var genericQueryProcessor = {
    build: function (currentIncludes, baseEntity, entree)
    {
        var baseEntityAssociations = baseEntity.associations;
        for (key in entree)
        {
            var nestedAssociation = baseEntityAssociations[key];
            if (nestedAssociation !== undefined)
            {
                var nestedIncludes = [];
                var newInclude = {
                    model: nestedAssociation.target,
                    as: key,
                    attributes: genericQueryProcessor.attributes(entree[key], nestedAssociation.target),
                    include: nestedIncludes
                };
                genericQueryProcessor.build(nestedIncludes, nestedAssociation.target, entree[key]);
                currentIncludes.push(newInclude);
            }
        }
    },
    attributes: function (entree, entity)
    {
        var currentAttributes = {};
        for (var key in entree)
        {
            if (Object.prototype.toString.apply(entree[key]) !== '[object Object]')
            {
                currentAttributes[key] = true;
            }
        }
        entree[entity.primaryKeyField] = true;
        entree.name = true;
        currentAttributes[entity.primaryKeyField] = true;
        currentAttributes.name = true;
        return Object.keys(currentAttributes);
    },
    where: function (entree, entity)
    {
        var where = {};
        if (entree[entity.primaryKeyField] !== true)
        {
            where[entity.primaryKeyField] = entree[entity.primaryKeyField];
        }
        else
        {
            where.name = entree.name;
        }
        return where;
    }
}
// /remove everything that does not correspond to the template
//parse generic data
function matchTotemplate(data, template)
{
    for (var key in data)
    {
        var child = data[key];
        if (typeof child === 'object')
        {
            if (Array.isArray(child))
            {
                for (var i = 0, len = child.length; i < len; i++)
                {
                    matchTotemplate(child[i], template === undefined ? undefined : template[key]);
                }
            }
            else
            {
                matchTotemplate(child, template === undefined ? undefined : template[key]);
            }
        }
        if (template === undefined || !template[key])
        {
            delete data[key];
        }
    }
};
var templates = {
    SOLUTION: function (entree)
    {
        var baseEntity = DB.SOLUTION;
        var where = genericQueryProcessor.where(entree, baseEntity);

        var promise = baseEntity.findOne({
            where: where,
            include: [
                {
                    model: DB.UIMODEL,
                    as: 'nodes',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
        return promise.then(function (data)
        {
            if (data === null)
            {
                return null;
            }
            var result = JSON.parse(JSON.stringify(data.get()));
            console.info('solutionID' + result.id)
            var select = 'SELECT distinct F.id,F.name,F.parsed, F.type,F.original from uimodels AS UI,formulas as F LEFT  JOIN formula_associations as FA ON FA.toId = F.id where UI.solutionId =' + result.id + ' AND (UI.formulaId = F.id OR (UI.formulaId = FA.fromId))';
            //var select = 'SELECT distinct F.* from uimodels AS UI,formula_associations as FA,formulas as F where UI.solutionId =' + result.id + ' AND (UI.formulaId = F.id OR
            // (FA.toId = F.id AND UI.formulaId = FA.fromId))'
            return DB.sequelize.query(
                select,
                {
                    type: DB.sequelize.QueryTypes.SELECT
                })
                .then(function (formulas)
                {
                    result.formulas = formulas;
                    return result;
                }
            );
        });
    },
    MODEL: function (id)
    {
        return {
            id: id,
            formulas: {}
        };
    }
    ,
    FORMULA: function (id)
    {
        return {
            id: id,
            ast: true,
            parsed: true
        };
    },
    DOCUMENT: function (entree)
    {
        var returnvalue;
        var baseEntity = DB.DOCUMENT;
        var promise = baseEntity.findOrCreate({
            where: {id: entree.id},
            include: [
                {
                    model: DB.VALUE,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
        promise.spread(function (data, created)
        {
            returnvalue = JSON.parse(JSON.stringify(data.get()));
        });
        return promise.then(function ()
        {
            return returnvalue;
        });
    }
}
function getAll(requestedEntityName, entree)
{
    return templates[requestedEntityName.toUpperCase()](entree);
}
function find(requestedEntityName)
{
    var baseEntity = DB[requestedEntityName.toUpperCase()];
    return;// baseEntity.findAllInSolution();
}
function getAll2(requestedEntityName, entree)
{
    var baseEntity = DB[requestedEntityName.toUpperCase()];
    //build generic query
    var currentIncludes = [];
    var where = genericQueryProcessor.where(entree, baseEntity);
    genericQueryProcessor.build(currentIncludes, baseEntity, entree);
    var question = {
        where: where,
        attributes: genericQueryProcessor.attributes(entree, baseEntity),
        include: currentIncludes
    };
    console.time('template')
    var promise = baseEntity.findOne(question);
    return promise.then(function (data)
    {
        console.timeEnd('template')
        if (data === null)
        {
            return undefined;
        }
        else
        {
            return JSON.parse(JSON.stringify(data.get()));
        }
    });
}

function update(requestedEntityName, body, all)
{
    var baseEntity = DB[requestedEntityName.toUpperCase()];
    if (baseEntity !== undefined)
    {
        var updateAll2 = updateAll(baseEntity, Array.isArray(body) ? body : [body]);
        return updateAll2.then(function ()
        {
            return body;
        })
    }
    else
    {
        return Promise.fail();
    }
}
module.exports = {
    update: update,
    get: getAll,
    find: find
}