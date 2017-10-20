var travel = require('../clientscorecard/JSVisitor.js');
function gather(obj)
{
    var first = true;
    var metaData = {
        path: '',
        count: 0,
        properties: {}
    }

    function func(arg, node)
    {
        if (arg === null)
        {
        }
        else if (first)
        {
            first = false;
            metaData.path += arg;
        }
        else
        {
            metaData.path += '.' + arg;
        }

        if (Array.isArray(node))
        {
            metaData.count = node.length;
            node.forEach(function (item)
            {
                travel.travel(item, null, func1);
            });
            return true;
        }
    };
    function func1(arg, node)
    {
        if (arg !== null)
        {
            metaData.properties[arg] = true;
        }
        if (Array.isArray(node))
        {
            return true;
        }
    };
    travel.travel(obj, null, func);
    return metaData;
}
module.exports = gather;
