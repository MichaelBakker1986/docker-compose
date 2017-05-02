function deparseRegexs(deparsers, input)
{
    for (var i = 0; i < deparsers.length; i++)
    {
        var obj = deparsers[i];
        //console.info(input) Too see what every iteration changes
        input = input.replace(obj.regex, obj.replace);
    }
    return input;
}
module.exports = {
    deparseRegexs: deparseRegexs
};