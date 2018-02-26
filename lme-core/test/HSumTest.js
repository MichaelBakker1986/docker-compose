require('../../math')
const assert   = require('assert'),
      WorkBook = require('../src/JSWorkBook'),
      log      = require('log6'),
      Context  = require('../src/Context'),
      jStat    = require('jStat').jStat;

var arr = [
    '22.27',
    '22.19',
    '22.08',
    '22.17',
    '22.18',
    '22.13',
    '22.23',
    '22.43',
    '22.24',
    '22.29',
    '22.15',
    '22.39',
    '22.38',
    '22.61',
    '23.36',
    '24.05',
    '23.75',
    '23.83',
    '23.95',
    '23.63',
    '23.82',
    '23.87',
    '23.65',
    '23.19',
    '23.10',
    '23.33',
    '22.68',
    '23.10',
    '22.40',
    '22.17'
];

// calculate ema over 10 days
console.log(arr.ema(10));
const wb = new WorkBook(new Context(), null, null, { modelName: 'HSUM' });

assert.equal([1, 2, 3].sum(), 5)
assert.equal([1, 2, 3].sum(), 5)
assert.equal([1, 2, 3].stdev(), 1)

wb.createFormula('10', 'ABC')
wb.createFormula('HSUM(ABC,0,10)', 'HSUMTEST')
wb.createFormula('SUM(ABC[all])', 'HSUMTESTALL')
wb.createFormula('[1, 2, 3].avg()', 'HSUMTESTALLA')
wb.createFormula('[1,2,3,4].stdev()', 'HSUMTESTALL2')
//ABC[firstdetail,lastdetail].lowest(gt(5))
//BALANCE[firstbookyear,lastbookyear].avg()
//ABC.firstDetail().multiply(ABC.lowestDetail())

assert.equal(wb.get('ABC'), 10)
assert.equal(wb.get('HSUMTEST'), 110)
assert.equal(wb.get('HSUMTESTALL2'), 1.2909944487358056)

/*

Array.prototype.growth = function() {
    var currentArrWeights = [];
    var compareArrWeights = [];
    var lastI = 0;
    for (var i = 1; i <= this.length; i++) {
        currentArrWeights.push(i);
        compareArrWeights.push(i);
        lastI = i;
    }
    compareArrWeights.push(lastI + 1)
    return formulaJs.GROWTH(this, currentArrWeights, compareArrWeights) || [];
};
//predict the new point in an array
Array.prototype.predict = function() {
    let growth = this.growth();
    return growth[growth.length - 1];
};
//predict the new point in an array
Array.prototype.trendPredict = function() {
    let trend = this.trend();
    return trend[trend.length - 1];
};
//calculate the longest natural path reverse lookup
Array.prototype.naturalReverse = function() {
    return this.isNatural() ? this : this.sliceLast().naturalReverse();
}
//tell is the first number belongs to the array
//using guessed trend and standard deviation
Array.prototype.isNatural = function() {
    return this.sliceLast().trendPredict().distance(this.last()) < this.stdev()
}
Array.prototype.natural = function(idx) {
    if (this.length < idx) return this;
    return this.slice(0, idx).isNatural() ? this.natural(idx + 1) : this.slice(0, idx - 1);
}

Array.prototype.naturalParts = function(minLength) {
    let counter = 0, output = [];
    while (counter < this.length - 3) {
        let item = this.slice(counter, this.length).natural(minLength);
        output.push(item)
        counter = (counter + item.length);
    }
    return output;
}
//calculate standard trend of an array
Array.prototype.trend = function() {
    const x = Array.apply(null, { length: this.length }).map(Number.call, Number);
    const new_x = Array.apply(null, { length: this.length + 1 }).map(Number.call, Number);
    return formulaJs.TREND(this, x, new_x)
}
*/

//Assume the array is sorted by time
//predict the new point in an array
//concerns array of Trades
/*Array.prototype.graph = function(count) {
    let pricesArray = this.map(a => a.price);
    let dateArray = this.map(a => Math.round(a.since / 100000));
    const avg = pricesArray.avg();
    const growth = pricesArray.growth();
    const growthDate = dateArray.growth();
    const newGrowth = growth[pricesArray.length];
    return {
        data         : pricesArray,
        avg          : avg,
        growth       : growth,
        newgrowth    : newGrowth,
        datesexpected: growthDate,
        newdates     : [dateArray.length],
        natural      : pricesArray.natural(parseInt(20)),
        expected     : (growth == avg ? 0 : newGrowth > avg ? 1 : -1)
    }
}*/
