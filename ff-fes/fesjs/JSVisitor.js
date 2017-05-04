/**
 * Just a Javascript Native Object visitor
 * While an element is called the .parent and .parentKey functions are filled.
 * when it goes outside the node these properties are unset.
 *
 * TODO: all the visitors are about to do the same. Maybe if look more abstract they can be merged.
 */
function JSVisitor() {
}
function visit(node, keyArg, func) {
    for (var key in node) {
        if (node[key] != undefined && key !== '_parent' && key !== '_parentKey') {
            var child = node[key];
            if (typeof child === 'object') {
                if (Array.isArray(child)) {
                    for (var i = 0, len = child.length; i < len; i++) {
                        var arrayChild = child[i];
                        arrayChild._parent = node;
                        arrayChild._parentKey = keyArg;
                        visit(arrayChild, key, func);
                        arrayChild._parentKey = undefined;
                        arrayChild._parent = undefined;
                    }
                }
                else {
                    child._parent = node;
                    child._parentKey = keyArg;
                    visit(child, key, func);

                    child._parentKey = undefined;
                    child._parent = undefined;
                }
            }
            else {
                if (func[key] != undefined) {
                    func[key](node);
                }
            }
        }
    }
    if (func[keyArg] != undefined) {
        var travel = func[keyArg](node);
    }
}
function visitTopDown(node, keyArg, func) {
    if (func[keyArg] != undefined) {
        var travel = func[keyArg](node);
        if (travel) {
            return;
        }
    }
    for (var key in node) {
        if (node[key] != undefined && key !== '_parent' && key !== '_parentKey') {
            var child = node[key];
            if (typeof child === 'object') {
                if (Array.isArray(child)) {
                    for (var i = 0, len = child.length; i < len; i++) {
                        var arrayChild = child[i];
                        arrayChild._parent = node;
                        arrayChild._parentKey = keyArg;
                        visitTopDown(arrayChild, key, func);
                        arrayChild._parentKey = undefined;
                        arrayChild._parent = undefined;
                    }
                }
                else {
                    child._parent = node;
                    child.parentKey = keyArg;
                    visitTopDown(child, key, func);

                    child._parentKey = undefined;
                    child._parent = undefined;
                }
            }
            else {
                if (func[key] != undefined) {
                    func[key](node);
                }
            }
        }
    }
}
function travel(node, keyArg, func) {
    var traveller = func(keyArg, node);
    if (traveller) {
        return;
    }
    for (var key in node) {
        if (node[key] != undefined) {
            var child = node[key];
            if (typeof child === 'object') {
                if (Array.isArray(child)) {
                    var traveller = func(key, child);
                    if (traveller) {
                        return;
                    }
                    for (var i = 0, len = child.length; i < len; i++) {
                        var arrayChild = child[i];
                        travel(arrayChild, key, func);
                    }
                }
                else {
                    travel(child, key, func);
                }
            }
            else {
                func(key, node)
            }
        }
    }
}
function travelOne(node, keyArg, func, depth) {
    func(keyArg, node, depth);
    for (var key in node) {
        if (node[key] != undefined && key !== '_parent' && key !== '_parentKey') {
            var child = node[key];
            if (typeof child === 'object') {
                if (Array.isArray(child)) {
                    for (var i = 0, len = child.length; i < len; i++) {
                        var arrayChild = child[i];
                        arrayChild._parent = node;
                        arrayChild._parentKey = keyArg;
                        travelOne(arrayChild, key, func, depth + 1);
                        arrayChild._parentKey = undefined;
                        arrayChild._parent = undefined;
                    }
                }
                else {
                    child._parent = node;
                    child._parentKey = keyArg;
                    travelOne(child, key, func, depth + 1);
                    child._parentKey = undefined;
                    child._parent = undefined;
                }
            }
        }
    }

}
function find(node, property, name) {
    return findPredicate(node, StringPredicate(property, name))
}
function StringPredicate(property, name) {
    return function (node) {
        return (node[property] === name);
    };
}
function findPredicate(node, predicate) {
    var current = node;
    while (current) {
        if (predicate(current)) {
            return current._parent;
        }
        current = current._parent;
    }
    return current;
}
module.exports = {
    visitTopDown: visitTopDown,
    travelOne: travelOne,
    visit: visit,
    travel: travel,
    find: find,
    findPredicate: findPredicate
};