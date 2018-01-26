/**
 * TUPLES
 *
 * In mathematics a tuple is a finite ordered list (sequence) of elements.
 * An n-tuple is a sequence (or ordered list) of n elements, where n is a non-negative integer.
 * There is only one 0-tuple, an empty sequence.
 * An n-tuple is defined inductively using the construction of an ordered pair.
 * Mathematicians usually write tuples by listing the elements within parentheses and separated by commas; for example,(2, 7, 4, 1, 7) denotes a 5-tuple.
 * Sometimes other symbols are used to surround the elements, such as square brackets "[ ]" or angle brackets "< >". Braces "{ }" are only used in defining arrays in some programming languages such as Java and Visual Basic,
 * but not in mathematical expressions, as they are the standard notation for sets. The term tuplecan often occur when discussing other mathematical objects, such as vectors.
 * In computer science, tuples come in many forms. In dynamically typed languages, such as Lisp,
 * lists are commonly used as tuples.[citation needed] Most typed functional programming languages implement tuples directly as product types, tightly associated with algebraic data types,
 * pattern matching, and destructuring assignment.[2] Many programming languages offer an alternative to tuples, known as record types, featuring unordered elements accessed by label.
 * A few programming languages combine ordered tuple product types and unordered record types into a single construct, as in C structs and Haskell records.
 * Relational databases may formally identify their rows (records) as tuples.
 * Tuples also occur in relational algebra; when programming the semantic web with the Resource Description Framework (RDF); in linguistics; and in philosophy.
 *
 * Bit shifting is only possible for 32bit 2complement int in JavaScript
 * Other trailing indexes are used for Time dimension.
 *   10bit 512cols /20 = aprox 25bookyear
 *
 * We always start on level 0.0.0.0.* meaning we are always living in a TupleContext. The first TupleInstance of the First Tuple Definition node
 *  Tuple instances and Definitions have ONLY! td/tp relations towards the existing Tree-structure based FFL, not regular tree-nodes
 *  In abstract creating a TupleInstance of the First Tuple Definition within the model uses the same stateless object yet another TupleDefinition should use.
 *  So don't confuse these concepts with existing parent-child relations in FFL nodes.
 */

/**
 * Gedachten bij het implementeren van tuples:
 * Van tuple naar tuple *binnen eigen tupleDefinition* word de TupleLocatie gebruikt om berekeningen te doen
 * Van Niet tuple naar tuple worden alle values van alle tupleinstanties terug gegeven
 * van tuple naar niet tuple word de tuple naar 0 gezet (mits anders aangeven) (FirstTuple,LastTuple,MaxTuple,FirstTupleIn....)
 * Formules worden geparsed, daarin is de target(referenceFormula) een propertyReferentie.
 * Dit betekend dat er vantui deze manier gedacht moet worden met het parsen
 * De TargetProperty kan een tuple/niet tuple zijn, en daar moet rekening mee gehouden worden.
 * De YAxis word meegeven van de formule, als er naar een tuple variable referenced word, kan de geparsde formula vanuit een tuple
 * een andere uitwerking hebben dan vanuit een niet-tuple
 *
 * tuple    A: 1
 * tuple    X: A+1 -> a(x,y,z) + 1 = 2
 * variable L: A+1 -> a(x,y,z) + 1 = [1] + 1
 *
 * Een wrapper om de uitvragende Property?
 * TSUM herstellen en de logica verplaatsen naar de uitvragende formule
 * TSUM(tupleNaam) => TSUM(tupleDefinitionCount,propertyNaam,x,y,z)
 *
 * Bij het inlezen van een FFL model, tuple markeren als TupleDefinition
 * Alle kinderen daaronder totaan nieuwe tuple markeren als TupleProperty
 *
 * Bij het uitvragen van een TupleDefinition itereren over alle instanties
 */
const assert = require('assert')
const log = require('log6')
const INSTANCES_PER_TUPLE = 32;
const BITS_PER_TUPLE = 6;
const FIRST__TUPLE_START_BIT = 10;
const SECOND_TUPLE_START_BIT = FIRST__TUPLE_START_BIT + (1 * BITS_PER_TUPLE);
const THIRD__TUPLE_START_BIT = FIRST__TUPLE_START_BIT + (2 * BITS_PER_TUPLE);

const FIRST__LEVEL_TUPLE = 1 << FIRST__TUPLE_START_BIT;
const SECOND_LEVEL_TUPLE = 1 << SECOND_TUPLE_START_BIT;
const THIRD__LEVEL_TUPLE = 1 << THIRD__TUPLE_START_BIT;

/*
 * These bitmasks are used to extract the bits for a given n-Tuple (0011***)
 * e.g.
 *  0011000 & 001001 = 001000
 * after extracted 001000 bitshift result with corresponding tuple bit offset 001000 >> 3 = (BIN)001 = (HEX) 1
 *
 * so: (0011000 & 011001) >> 3 = (HEX)3
 */
const FIRST__LEVEL_BITMASK = parseInt("0000000000001111110000000000", 2);    //000129024
assert(parseInt("0000000000001111110000000000", 2) == 64512)
const SECOND_LEVEL_BITMASK = parseInt("0000001111110000000000000000", 2);    //008257536
assert(parseInt("0000001111110000000000000000", 2) == 4128768)
const THIRD__LEVEL_BITMASK = parseInt("1111110000000000000000000000", 2);    //528482304
assert(parseInt("1111110000000000000000000000", 2) == 264241152)
const FOURTH_LEVEL_BITMASK = parseInt("1111110000000000000000000000000000", 2);    //528482304
//assert(parseInt("1111110000000000000000000000000000", 2) == 264241152)

const indexes = []
for (var first = 0; first < INSTANCES_PER_TUPLE; first++) {
    indexes[first] = []
    for (var second = 0; second < INSTANCES_PER_TUPLE; second++) {
        indexes[first][second] = []
        for (var third = 0; third < INSTANCES_PER_TUPLE; third++) {
            indexes[first][second][third] = (FIRST__LEVEL_TUPLE * first) + (SECOND_LEVEL_TUPLE * second) + (THIRD__LEVEL_TUPLE * third)
        }
    }
}
/*
 * Check if values are valid
 */
for (var i = 0; i < INSTANCES_PER_TUPLE; i++) {
    for (var j = 0; j < INSTANCES_PER_TUPLE; j++) {
        for (var k = 0; k < INSTANCES_PER_TUPLE; k++) {
            const index = indexes[i][j][k];
            // log.info(((index & FIRST__LEVEL_BITMASK) >> FIRST__TUPLE_START_BIT) + ',' + ((index & SECOND_LEVEL_BITMASK) >> SECOND_TUPLE_START_BIT) + ',' + (index >> THIRD__TUPLE_START_BIT))
            assert.equal((index >> SECOND_TUPLE_START_BIT >> BITS_PER_TUPLE), (index >> THIRD__TUPLE_START_BIT))
            assert.equal((index >> SECOND_TUPLE_START_BIT >> BITS_PER_TUPLE), index >> FIRST__TUPLE_START_BIT >> BITS_PER_TUPLE >> BITS_PER_TUPLE)
        }
    }
}
//Nu de check voor corresponderende context. (matching bits.)
/*
 * bits that are used to check if a value is in there.
 * These are the bit masks used by the tuples 11-17,17-23,23-29 bits from the number
 *
 * So:(index)   00001000001101 belongs to
 *               0  1    *****
 *   (bitmask)  00001000000000
 *
 * So:(index)   01001000032321 does not belong to
 *               1  1    *****
 *   (bitmask)  00001000000000
 *
 * om te achterhalen of een index op interessant is voor een bepaalde tuple
 * voor 0,0,1 is matching 1,1,0 nodig. omdat  0,0,0 niet werkt met de & operator, dus inverse van zichzelf
 */
const matchings = []
const MAX_INVERSE_INT32 = ((1 << 20) - 1) << FIRST__TUPLE_START_BIT;//2147481600 , 111111111111111111100000000000
assert(parseInt("111111111111111111110000000000", 2) == ((1 << 20) - 1) << FIRST__TUPLE_START_BIT)

for (var first = 0; first < INSTANCES_PER_TUPLE; first++) {
    matchings[first] = []
    for (var second = 0; second < INSTANCES_PER_TUPLE; second++) {
        matchings[first][second] = []
        for (var third = 0; third < INSTANCES_PER_TUPLE; third++) {
            matchings[first][second][third] = MAX_INVERSE_INT32 - indexes[first][second][third]
        }
    }
}
/*
 * Test if the inverse masks result in 0.
 *0010 : 2
 *1101 :13
 *maar zou 121311xxx,
*/
for (var i = 0; i < INSTANCES_PER_TUPLE; i++) {
    for (var j = 0; j < INSTANCES_PER_TUPLE; j++) {
        for (var k = 0; k < INSTANCES_PER_TUPLE; k++) {
            const index = indexes[i][j][k];
            const m = matchings[i][j][k];
            assert.equal((index + Math.round(Math.random() * 100)) & MAX_INVERSE_INT32, index, 'index: ' + index.toString(2) + ' does not match ' + m.toString(2) + '::' + [i, j, k].toString())
        }
    }
}

const start = {
    bitmask: FIRST__LEVEL_BITMASK,
    start_bit: FIRST__TUPLE_START_BIT,
    hash: 0,
    bin: (matchings[0][0][0]).toString(2),
    f: parseInt('11111111111110000000000000000', 2),
    f_bin: '111111111111110000000000000000',
    m: parseInt('0000000000000000000000000000000000', 2),
    m_bin: '0000000000000000000000000000000000',
    index: 0,
    display: '0000',
    depth: 0,
    deeper: []
}
start.base = start;

for (var first = 0; first < INSTANCES_PER_TUPLE; first++) {
    start.deeper[first] = {
        bitmask: SECOND_LEVEL_BITMASK,
        start_bit: SECOND_TUPLE_START_BIT,
        f: parseInt('11111110000001111110000000000', 2),
        m: parseInt('0000000000000000000000000000000000', 2) + parseInt('00000000000000000000000010000000000', 2) * first,
        bin: (matchings[first][0][0]).toString(2).substring(0, (matchings[first][0][0]).toString(2).length - 10),
        display: first + '000',
        base: start,
        depth: 1,
        index: first,
        hash: (FIRST__LEVEL_TUPLE * first),
        deeper: [],
        parent: start
    }
    if (first > 0) start.deeper[first].previous = start.deeper[first - 1]
    if (first > 0) start.deeper[first - 1].next = start.deeper[first]

    for (var second = 0; second < INSTANCES_PER_TUPLE; second++) {
        start.deeper[first].deeper[second] = {
            base: start,
            f: (parseInt('0000001111111111110000000000', 2)),
            m: (parseInt('0000000000010000000000000000', 2) * second) + (parseInt('0000000000000000000010000000000', 2) * first),
            bin: (matchings[first][second][0]).toString(2),
            bitmask: THIRD__LEVEL_BITMASK,
            display: first + '' + second + '00',
            start_bit: THIRD__TUPLE_START_BIT,
            index: second,
            depth: 2,
            hash: (first * FIRST__LEVEL_TUPLE) + (SECOND_LEVEL_TUPLE * second),
            deeper: [],
            parent: start.deeper[first]
        }
        if (second > 0) start.deeper[first].deeper[second].previous = start.deeper[first].deeper[second - 1]
        if (second > 0) start.deeper[first].deeper[second - 1].next = start.deeper[first].deeper[second]

        //this level is only used to set values, not to resolve them,
        for (var third = 0; third < INSTANCES_PER_TUPLE; third++) {
            start.deeper[first].deeper[second].deeper[third] = {
                base: start,
                /* f: (parseInt('0001111111111111111110000000000', 2)),*/
                /*  m: (parseInt('00000000000000000010000000000000000', 2) * second) + (parseInt('00000000000000000000000010000000000', 2) * first),
               bin: (matchings[first][second][third]).toString(2),*/
                bitmask: FOURTH_LEVEL_BITMASK,
                display: first + '' + second + '' + third + '0',
                start_bit: THIRD__TUPLE_START_BIT,
                index: third,
                depth: 3,
                hash: (first * FIRST__LEVEL_TUPLE) + (SECOND_LEVEL_TUPLE * second) + (THIRD__LEVEL_TUPLE * third),
                deeper: [],
                parent: start.deeper[first].deeper[second]
            }
            if (third > 0) start.deeper[first].deeper[second].deeper[third].previous = start.deeper[first].deeper[second].deeper[third - 1]
            if (third > 0) start.deeper[first].deeper[second].deeper[third - 1].next = start.deeper[first].deeper[second].deeper[third]
        }
    }
}

/**
 *
 * return start values in given tuple
 * It would be nice to use the null-tuple(0instance) T(0,{*,}) as base
 * Since else we could only query 0,..* in this method.
 */
TVALUES = function(fIds, func, fId, x, y, z, v) {
    var current = y, returnValue = [];
    var tinstancecount = TINSTANCECOUNT(fIds, v, y);
    for (var i = 0; i <= tinstancecount; i++) {
        returnValue.push(func(fId, x, y.deeper[i], z, v));
    }
    /*   while (current && tinstancecount >= current.index) {
           var tempValue = func(fId, x, current, z, v);
           returnValue.push(tempValue);
           current = current.next;
       }*/
    return returnValue;
}
TCOUNT = function(fIds, func, fId, x, y, z, v) {
    return TINSTANCECOUNT(fIds, v, y);
}
REVERSEYAXIS = function(index, y) {
    return (y.bitmask & index) >> y.start_bit
}

function indexToArray(index, y) {
    const repre = [(index & THIRD__LEVEL_BITMASK) >> THIRD__TUPLE_START_BIT, (index & SECOND_LEVEL_BITMASK) >> SECOND_TUPLE_START_BIT, (index & FIRST__LEVEL_BITMASK) >> FIRST__TUPLE_START_BIT];
    const match = [(y.m & THIRD__LEVEL_BITMASK) >> THIRD__TUPLE_START_BIT, (y.m & SECOND_LEVEL_BITMASK) >> SECOND_TUPLE_START_BIT, (y.m & FIRST__LEVEL_BITMASK) >> FIRST__TUPLE_START_BIT];
    log.info('input:' + repre + ' filter with : ' + (y.f >> 10).toString(2) + ' {' + match + "(" + y.depth + ',' + y.index + ")}" + ' gives:' + ((y.bitmask & index) >> y.start_bit))
}

//return tuplecount, get max tuple index given a (y) context.
//Conceptually, if a value exists in a given range. There is an Tuple-Instance
//Nested tuples start hash 0,0,0  So there is a Tuple instance on start three dimensions when a value is entered in the deepest level.
TINSTANCECOUNT = function(fIds, v, y) {
    var max = -1;
    //consider transforming into a bin-tree
    //Since the dimensions are Infinite, indexing becomes complex.
    for (var fid = 0; fid < fIds.length; fid++) {
        var fId = fIds[fid];
        const tempkeys = []
        var keys = Object.keys(v[fId]);
        //quick-fix remove NULL values..
        //when looking for the instance-count with Y provided we also have to filter keys that are in other contexts.
        //TODO: step1 ake key filter, with the bit-mask on y. context. rest keys are not interesting.
        //TODO: start make unit testIndex, testing this function only.
        //The Tuple-Dimension is 0based, All values are placed within the first Tulpe (or non-exsistant)
        //Meaning that Any value in the Tuple Instance implies a Tuple-Instance is created.
        //index: 0000001 makes TupleCount=0
        //no index: makes TupleCount=-1
        //index: 0100001: makes TupleCount=1
        //this y.root is too cheap. It is possible to have a nested tuple instance abc2 but not have abc0
        //So 0 is allowed when a Key has this prefix.
        //the .root affix is strange there just should be a value on the corresponding tuple range to confirm its existence

        for (var i = 0; i < keys.length; i++) {
            var obj = keys[i];
            const userKey = parseInt(obj);
            // the found value should have a meaning, should have a value in the tuple-range and should match parent mask
            //Why should it have a value in the Tuple-Range?
            //Is this the same as living in the Parent-Context..
            /*
             *   00000009
             *   00001101
             *   Oke inverse bitmask van me parent.
             *   ~0000 maakt 1111 die & ik met me eigen hash. Als die niet null opleverd. Dan hoort hij er niet thuis
             *
             */
            //this should match any tuple bits and validate it with the hash,
            //most important mistake is to math with the HASH, since it should match parent.hash
            //011        001
            //010 match  010 no match
            //first level just matching everything that does not have 2-tuple or 3-tuple keys
            //second level match everything on 1-tuple index. But should not have anything on the 3-tuple
            if ((v[fId][obj] != null) && (userKey & y.f) == y.m) {
                if (log.DEBUG) indexToArray(userKey, y)
                tempkeys.push(userKey)
            }
        }

        if (tempkeys.length == 0) {
            continue;
        }
        else if (tempkeys.length == 1) {
            max = Math.max(max, (y.bitmask & tempkeys[0]) >> y.start_bit);
        } else {
            max = Math.max(max, tempkeys.reduce(function(a1, b1) {
                //filter bits  y.start_bit find highest tuple count identified with y.bitmask
                //look for start values and obtain tuple instance value
                //we don't have to y.bitmask? its just >> y.start_bit
                return Math.max((y.bitmask & a1) >> y.start_bit, (y.bitmask & b1) >> y.start_bit);
            }))
        }
    }
    return max;
}

const TupleValues = {
    100: {
        10: 100
    },
    101: {},
    102: {}
}

/*
 * Conceptually checks:
 * From here we will build the concept
 * 1-(2-tuple)
 * 2-(1-tuple)
 * 3-(0-tuple)
 * 4-(column10)
 * 5-(column01)
 * [1][2][3][4][5]
 *
 * The filter means the ** wildcard
 * The match means the tuple context
 */
//er is geen wens om 1*1 te testen, er word nooit gevraagd van hoeveeel tuples bijvoorbeeld 3tuples hebben.
const combine = [{
    reg: '000**', match: '00000', filter: '11100',
    fit: ['00010', '00011', '00001', '00000'],
    nofit: ['00110', '01110', '11110', '10110', '10010']
}, {
    reg: '001**', match: '00100', filter: '11100',
    fit: ['00110', '00111'],
    nofit: ['00010', '01010', '11010', '11110']
}, {
    reg: '011**', match: '01100', filter: '11100',
    fit: ['01100', '01101'], nofit: ['10100', '11100', '00100', '11000']
}, {
    reg: '010**', match: '01000', filter: '11100',
    fit: ['01010'],
    nofit: ['00010', '00000']
}, {
    reg: '11***', match: '11000', filter: '11000',
    fit: ['11000', '11100'],
    nofit: ['01100', '00000', '01100']
}, {//the first check, how many instances on root?
    reg: '00***', match: '00000', filter: '11000',
    fit: ['00000', '00001'],
    nofit: ['01100', '10000', '01100']
}, {
    reg: '01***', match: '01000', filter: '11000',
    fit: ['01000'], nofit: ['00000']
}, {
    reg: '1****', match: '10000', filter: '10000',
    fit: ['10101'], nofit: ['01000']
}]
for (let testIndex = 0; testIndex < combine.length; testIndex++) {
    const test = combine[testIndex];
    for (let i = 0; i < test.fit.length; i++) assert(((parseInt(test.fit[i], 2) & parseInt(test.filter, 2)) == parseInt(test.match, 2)))
    for (let i = 0; i < test.nofit.length; i++) assert(((parseInt(test.nofit[i], 2) & parseInt(test.filter, 2)) != parseInt(test.match, 2)))
}
/*
 * oke hoe maak ik nou zo'n object?
 * de sterretjes betekenen op beide filter als match een 0
 * de 0/1 betekend in match een kopie
 * de 0/1 betekend in filter een 1
 * De reg betekend T(0,0,0)
 *
 * De vragen die worden gesteld zijn: wat is YCount, gegeven index[] en Y
 * dus: Y heeft
 * t(R) = f(t*<R?1:0)
 * dus uit [t1,t2,t3] = filter: t1(R)+t2(R)+t3(R)+,00  e.g. hoeveel t2 in [1,0,*]? 110,00
 * dus uit [t1,t2,t3] =  match: t1t2t3+,00             e.g.               [1,0,*]? 100,00
 * uit gegeven [*,*,*] moet ik die twee dingen halen.
 *
 * Dus als ik wil weten hoeveel Y in [a,b,c]
 * Dan '1'.repeat(bits), voor 0,0,0 wil ik  111 filter en match 000, maar die bestaat dus niet
 * Dan '1'.repeat(bits), voor 0,1,0 wil ik  110 filter en match 110
 *
 * filter: 111111,111111,111111,0000000000 voor 0,0,0
 *  match: 000000,000000,000000,0000000000 voor 0,0,0 (word niet gebruikt, impliceert 0,0,0,*)
 * filter: 111111,111111,111111,0000000000 voor 0,0,1
 *  match: 000000,111111,000001,0000000000 voor 0,0,1 (word niet gebruikt, impliceert 0,0,0,*)
 * filter: 111111,111111,000000,0000000000 voor 0,0,*
 *  match: 000000,000000,000000,0000000000 voor 0,0,*
 * filter: 111111,000000,111111,0000000000 voor 0,*,1
 *  match: 000000,000000,000001,0000000000 voor 0,*,1
 *
 *  Filter geeft alleen aan in welke sector de max-waarde gezocht word. dat kan slot1,slot2,of slot3 zijn
 *  De Match geeft aan in welke context de vraag moet passen.
 *  011 & f(0,*,1) = m(0,1,1)
 *  001 & f(0,*,1) = m(0,1,1)
 *
 *  filter kan op het moment alleen *,*,* of *,0,* of 0,*,* zijn.
 *
 *  filter op level 0 = **. = 110
 *  filter op level 1 = *.* = 101
 *  filter op level 2 = .** = 011
 *
 *  Dus dat gaan we toevoegen aan het geheel
 */

//columns we need aprox 512 10bit
//53 total bits to use, 43bit for tuples, 8*8*8*8 (32bit) 8bit represent 128 instances. 4dimensions 128 instances. takes 32 bit
/*
 * It can grow into 5dimensions having 128instances each using 40bit, leaving 10bits for columns. We have to figure out operations without binair operators
 * A binair operator in javascript works until 32bits (4*8) So we have to calculate the index in a different way when exceeding these limits.
*/
module.exports = start.deeper;