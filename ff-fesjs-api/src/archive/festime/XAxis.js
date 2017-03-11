/* 
 *  Here we will do column/timeline ordering, referencing previous and adjacent columns
 *  
 *  The variable decorator should suply the referenced column to write into
 *  Period[T=12] will be referred to Period[1]
 *  When Period:
 *  variable.columns[12] will be referred to variable.columns[1]
 *  variable.columns[27] will be referred to variable.columns[2] etc..
 *  
 *  When Document 
 *  variable.columns[*] will be referred to variable.columns[1?0]

 *  When Detail 
 *  variable.columns[x] will be referred to variable.columns[x]
 */
//Detail can refer to its Period
//Detail will refer it its own Detail, else [bky] or [prev] has to be supplied
//Detail can refer to Document
//Period will refer to first Detail, else [first] or [last] or [bky] has to be supplied
//Period will refer to its own Period, else [forecast] or [history] has to be supplied
//Period can refer to Document
//Document will refer to first Detail, else [first] or [last] or [bky] has to be supplied
//Document will refer to first Period, else [forecast] or [history] has to be supplied
//Document can only refer to itsself
//can easy be refactored for better performance
var importData = require('./CustomImport.json');
var headers = {
    title: {
        title: 'title'
    },
    columns: {
        title: 'timeline'
    },
    period: {
        title: 'period'
    },
    matrix: {
        title: 'matrix'
    },
    none: {
        title: 'none'
    },
    doc: {
        title: 'document'
    }
}
function CalculationDocument(data)
{
    var data = data || importData;
    console.time('initialize_xAxis');
    this.tContext = data;
    var formulasets = data.formulasets;
    var formulasetsCount = data.formulasets.length;
    var viewmodes = {};
    var NA = data.navalue;
    var indexed = [];// holds a indexed reference for quicked lookup for real-column-contexts/ can be used for the
                     // column variable
    var templateindexed = [];// holds a indexed reference for quicked lookup for contexts/ its only for the templates
    // and will only be used during build time
    this.viewmodes = viewmodes;
    // make an array storing the formulaset for all columnentrees, used for quicker lookup later
    var formulasetLookup = [];// used to lookup the
    // we assume they ordered, looping trough the entrees, using the currentPeriod as being used until index had been
    // reached
    var periods = data.layout.period;
    var currentperiod = periods[0];
    var aggregationformulaset = formulasets[formulasets.length - 1];
    currentperiod.formulaset = formulasets[currentperiod.formulasetId];
    for (var i = 0; i < data.layout.idx; i++)
    {
        if (i >= currentperiod.idx)
        {
            currentperiod = periods[currentperiod.formulasetId + 1];
            // assign the formulaset, it was stored as reference
            currentperiod.formulaset = formulasets[currentperiod.formulasetId];
        }
        formulasetLookup[i] = currentperiod;
    }
    currentperiod.last = data.layout.idx;
    /*    this.column = function (variable, vars, hIndex, fIndex)
     {
     // var fi = (fIndex * formulasetsCount) + this.f;
     // should pass trough formula to the variable deocorator..
     // he can still swap flipflop T
     // i can pass trough the scope.. // return variable.evaluated[fIndex].call(this, variable, vars, hIndex, this);
     // i will pass trouhg the engine as scope..
     return variable.evaluated[(formulasetsCount * fIndex) + this.f](variable, vars, hIndex, this);
     }*/
    var dummyColumn = {
        hash: 0,
        prevTl: undefined,
    };
    dummyColumn.f = 0;
    dummyColumn.prev = dummyColumn;
    // dummyColumn.prevTl = dummyColumn;
    var timelineSize = data.time.timelineSize;
    var timelineMultiplier = data.time.timelineMultiplier;
    var columnMultiplier = data.time.columnMultiplier;
    // find out all viewtypes in the document
    var layout = data.layout;

    while (layout != undefined)
    {
        viewmodes[layout.name] = {
            //these will be reduced to fixednumber and columns, they all share the same algorithms
            doc: [[{hash: 0, f: 0, header: headers.title}, {
                hash: 1,
                f: 1,
                header: headers.doc,
                lastall: {hash: 1},
                firstall: {hash: 1},
                firstnotrend: {hash: 1},
                lastnotrend: {hash: 1},
                firsttrend: {hash: 1, lastbkyr: {hash: 0}},
                lasttrend: {hash: 1}
            }]],
            period: [[{hash: 0, f: 0, header: headers.title}, {hash: 1, f: 1, header: headers.period}, {
                hash: 2,
                header: headers.period
            }]],
            none: [[{hash: 0, f: 0, header: headers.title}]],
            columns: [],
            matrix: [[{hash: 0, f: 0, header: headers.title}, {hash: 1, f: 1, header: headers.matrix}, {
                hash: 2,
                header: headers.matrix
            }, {
                hash: 3,
                header: headers.matrix
            }, {
                hash: 4,
                header: headers.matrix
            }, {hash: 5, header: headers.matrix}
            ]],
            cols: []
        };
        layout = layout.children[0];
    }
    // tricky recursion here, just debug it.. too many to explain
    function nestRecursive(parent, object, offset, func)
    {
        object.forEach(function (child)
        {
            child.parent = parent;
            var tempincrease = child.size;
            var no = 0;
            child.parent.sibling = [];
            while (tempincrease <= (parent.size - 1))
            {
                child.idx = (offset + tempincrease);
                child.no = no;
                tempincrease += child.size;
                child.parent.sibling.push((offset + (child.size * (no + 1))));
                nestRecursive(child, child.children, offset + (child.size * (no)), func)
                no++;
            }
        });
        func(parent);
    }

    function extractBaseChildren(child, array)
    {
        child.sibling.forEach(function (innerchild)
        {
            var foundChild = templateindexed[innerchild];
            if (foundChild.sibling == undefined)
            {
                array.push(innerchild);
            }
            else
            {
                extractBaseChildren(foundChild, array);
            }
        });
    }

    // extract data from recursion
    // make new column objects
    // be aware the values from child in here are temporally from transitive nature. U cannot keep references since
    // they will change in future. Presumably to the last one...
    nestRecursive(data.layout, data.layout.children, 0, function (child)
    {
        // console.info(child.no);
        // actual element
        var newElement = {
            // type : child.name,
            parenttypes: [],
            hash: child.idx
        };
        // find out all parents and top
        var parent = child.parent;
        while (parent != undefined)
        {
            // register aggregation type
            // register all types to the new columnIndex object
            var previdx = child.idx - parent.size;
            newElement.parenttypes.push({
                idx: parent.idx,
                type: parent.name,
                prevme: previdx > 0 ? previdx : undefined
            });
            // if the next is undefined, we found top.
            newElement.top = parent.idx;
            parent = parent.parent;
        }
        // could be top, of so, we don't need this information
        if (child.parent != undefined)
        {
            newElement.agg = child.parent.idx;
            newElement.period = formulasetLookup[child.idx];
        }
        // could be aggregated, we want to know what siblings it had
        if (child.sibling != undefined)
        {
            newElement.sibling = child.sibling.slice();
            var children = newElement.sibling;
            var tarr = [];
            // add the base children aswell for quicker and eaier lookup later
            extractBaseChildren(child, tarr);
            newElement.allchildren = tarr;
        }
        else
        {
            // this is smallest we get
            var period = formulasetLookup[child.idx];
            if (period.first == undefined)
            {
                period.first = child.idx;
            }
            formulasetLookup[child.idx].last = child.idx;
        }
        // add elements to the base cols
        viewmodes[child.name].cols.push(newElement);
        templateindexed[newElement.hash] = newElement;
    });
    // convert template column index into real index
    function calculateIndex(timelineId, columnId)
    {
        var columnId = (columnId * columnMultiplier);
        // add offset,0 for the titleValue, 1 for dummy cache,we starting from 1 so +1
        columnId++;
        // add timeline
        columnId += (timelineId * timelineMultiplier);
        return columnId;
    }

    // convert meta data in real column object..
    // don't make references. The values are re-used over timelines
    for (vmode in this.viewmodes)
    {
        // this loop will be used for all viewmodes when wisely declared.
        for (var tId = 0; tId < timelineSize; tId++)
        {
            // create new array for the timeline
            this.viewmodes[vmode].columns[tId] = [];
        }
    }
    // creat all real objects for all timeslines first, we use the indexes created to lookup the elements while
    // loooking for references
    for (var tId = 0; tId < timelineSize; tId++)
    {
        for (vmode in this.viewmodes)
        {
            // times multiplier
            // jsut for quick reference place the array in here;
            var currentviewmode = viewmodes[vmode];
            var currentviewmodecolumns = currentviewmode.cols;
            for (var cId = 0; cId < currentviewmodecolumns.length; cId++)
            {
                var columnEntries = currentviewmode.columns;
                var columnEntriesForTimeline = currentviewmode.columns[tId];
                var metadata = currentviewmode.cols[cId];
                var columnId = calculateIndex(tId, metadata.hash);
                var previousColumn = (cId == 0 ? dummyColumn : columnEntriesForTimeline[columnEntriesForTimeline.length - 1]);
                var previousTimelineColumn = (tId == 0 ? undefined : columnEntries[tId - 1][columnEntriesForTimeline.length]);
                var columnElement = {
                    header: headers.columns,
                    hash: columnId,
                    prevTl: previousTimelineColumn,
                    prev: previousColumn
                };
                indexed[columnId] = columnElement;
                // add to the stack
                columnEntriesForTimeline.push(columnElement);
                // we know the first column from this, while being the first we can references it from here
                columnElement.first = columnEntriesForTimeline[0];
                // we don't knwow the last.. since it could be in the future, we have to add it later
            }
        }
        // now all entree are filled, for its timeline we can reference the last
        // be aware that the the viewmodes walked top,bkyr,half,qurt,detl. No reference can be made for the real column
        // objects,from top->detl. It would require a new loop so u can ask from a detl about a parent type children,
        // but not about information about those children, since they are not determined yet, they exist, but the
        // references are not u can however obtain information about the children from the template. And ofc there
        // should not be a need to ask these kind of information
        for (vmode in this.viewmodes)
        {
            // times multiplier
            // jsut for quick reference place the array in here;
            var currentviewmode = viewmodes[vmode];
            var currentviewmodecolumns = currentviewmode.cols;
            var columnslength = currentviewmodecolumns.length;
            for (var cId = 0; cId < columnslength; cId++)
            {
                // here all references are made
                // bky,doc,period,formula,aggregation, top, children.. all
                var columnEntries = currentviewmode.columns;
                var columnEntriesForTimeline = columnEntries[tId];
                var entree = currentviewmode.columns[tId][cId];
                entree.last = columnEntriesForTimeline[columnEntriesForTimeline.length - 1];
                entree.first = columnEntriesForTimeline[0];
                entree.next = (cId == (columnslength - 1)) ? dummyColumn : columnEntriesForTimeline[cId + 1];
                var metadata = currentviewmode.cols[cId];
                entree.formula = metadata.period;
                if (metadata.agg != undefined)
                {
                    var aggColumnId = calculateIndex(tId, metadata.agg);
                    entree.agg = indexed[aggColumnId];
                }
                if (metadata.sibling != undefined)
                {
                    entree.f = aggregationformulaset.formulasetId;
                    entree.header = {
                        title: 'timelineAgg'
                    };
                    entree.aggcols = [];
                    metadata.sibling.forEach(function (childid)
                    {
                        var childColId = calculateIndex(tId, childid);
                        entree.aggcols.push(indexed[childColId]);
                    });
                    entree.firstchild = indexed[calculateIndex(tId, metadata.allchildren[0])];
                    entree.lastchild = indexed[calculateIndex(tId, metadata.allchildren[metadata.allchildren.length - 1])];
                }
                else
                {
                    entree.f = formulasetLookup[metadata.hash].formulasetId;
                }
                // this will allow document values per timeline, if referring to timeline[0] there will only be one
                // possible..
                entree.doc = columnEntriesForTimeline[0];// there only is one and one only, always correct behavior
                // entree.period = (cId == 0) ? columnEntriesForTimeline[0] : columnEntriesForTimeline[1];// detail
                // should refer to corresponding period add all period information
                if (metadata.period != undefined)
                {
                    // now it will be able to aggregate
                    // can't do firstchild in this type.
                    entree.period = columnEntriesForTimeline[metadata.period.hash];
                    entree.header = {
                        title: 'timeline ' + metadata.period.formulaset.name
                    };
                    entree.firstinperiod = indexed[calculateIndex(tId, metadata.period.first)];
                    entree.lastinperiod = indexed[calculateIndex(tId, metadata.period.last)];
                    for (var pi = 0; pi < periods.length; pi++)
                    {
                        var period = periods[pi];
                        var tFirst = indexed[calculateIndex(tId, period.first)];
                        var formulaname = period.formulaset.name;
                        entree['first' + formulaname] = tFirst;
                        var tLast = indexed[calculateIndex(tId, period.last)];
                        entree['last' + formulaname] = tLast;
                        entree['isfirst' + formulaname] = (tFirst.hash == entree.hash);
                        entree['islast' + formulaname] = (tLast.hash == entree.hash);
                        entree['is' + formulaname] = (period.formulasetId == formulasetLookup[metadata.hash].formulasetId);
                        entree['isprev' + formulaname] = entree.prev.hash == 0 ? false : entree.prev['is' + formulaname];
                    }
                    entree.isfirstinperiod = (entree.firstinperiod.hash == entree.hash);
                    entree.islastinperiod = (entree.lastinperiod.hash == entree.hash);
                }
                entree.aggregated = (metadata.sibling != undefined);
                entree.tsy = (metadata.sibling == undefined) ? 1 : metadata.allchildren.length;
                entree.texceedtsy = metadata.hash > entree.tsy;// should be infirstbkyr
                // add all information about aggregation types;bkyr,all are available if not top..
                // there is no need yet to give aggregated columns information about bookyear etc.. yet
                if (metadata.sibling == undefined)
                {
                    for (var aggi = 0; aggi < metadata.parenttypes.length; aggi++)
                    {
                        var agg = metadata.parenttypes[aggi];
                        var aggtype = agg.type;
                        var template = templateindexed[agg.idx];
                        var tempatechilds = template.allchildren;
                        var aggentree = indexed[calculateIndex(tId, template.hash)];
                        entree[aggtype] = aggentree;
                        entree['prev' + aggtype] = aggentree.prev == undefined ? dummyColumn : aggentree.prev;
                        entree['previn' + aggtype] = agg.prevme == undefined ? dummyColumn : indexed[calculateIndex(tId, agg.prevme)];
                        entree['isinfirst' + aggtype] = agg.prevme == undefined;
                        var prevagg = aggentree.prev;
                        entree['lastinprev' + aggtype] = (prevagg.hash == 0) ? dummyColumn : prevagg.lastchild;
                        entree['firstinprev' + aggtype] = (prevagg.hash == 0) ? dummyColumn : prevagg.firstchild;
                        entree['lastin' + aggtype] = prevagg;
                        var firstEntree = indexed[calculateIndex(tId, tempatechilds[0])];
                        entree['first' + aggtype] = firstEntree;
                        entree['isfirst' + aggtype] = (firstEntree.hash == entree.hash);
                        var lastEntree = indexed[calculateIndex(tId, tempatechilds[tempatechilds.length - 1])];
                        entree['last' + aggtype] = lastEntree;
                        entree['islast' + aggtype] = (lastEntree.hash == entree.hash);
                    }
                    entree.mutcalc = entree.infirstbkyr ? 1 : NA;// information not available in aggcolumns,yet...
                }
                // when period or doc variable refer to Detail Variable, which is kind of strange..
                entree.detail = (cId == 0) ? columnEntriesForTimeline[0] : columnEntriesForTimeline[1];// period should
                                                                                                       // refer to
                                                                                                       // first detail
                                                                                                       // from own
                                                                                                       // period
            }
        }
    }
    this.indexed = indexed;
    templateindexed = undefined;
    console.info('Created Xaxis for ' + data.time.columnSize + ' columns on ' + timelineSize + ' timelines ');
    console.timeEnd('initialize_xAxis');
    return viewmodes;
}
// NodeJS support..
// 25ms for 134col/5timelines
// 199ms for 134col/40timelines
// what is expected to be happen.. lineair result. 1ms boiler plate 5ms*timeline for 134cols
// 280ms for 234cols 40timelines. Very acceptable 12year 40timelines 280ms..
// columns can also be mixed in tsy. so 5x1d and then (7*12)bkyr.tsy. Allow 100year forecast., would require some nice
// tricks here.. but possible from here only prevbkyear, might consider removing *[agg*], only keep the *[top*]
// currently we have max7 year 10timelines
module.exports = CalculationDocument;

var test = new CalculationDocument();
var vals = {};
console.info(JSON.stringify(test.all, function (key, val)
{
    vals[key] = val;
}, 2))