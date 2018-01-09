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

function context() {
}

function travelOne(node, keyArg, func, contextArg) {
    contextArg = contextArg || {};
    var newContext = new context();
    newContext.__proto__ = contextArg;
    func(keyArg, node, newContext);

    for (var key in node) {
        if (node[key] != undefined && key !== '_parent' && key !== '_parentKey') {
            var child = node[key];
            if (typeof child === 'object') {
                if (Array.isArray(child)) {
                    for (var i = 0, len = child.length; i < len; i++) {
                        var arrayChild = child[i];
                        arrayChild._parent = node;
                        arrayChild._parentKey = keyArg;
                        travelOne(arrayChild, key, func, newContext);
                        delete arrayChild._parentKey
                        delete arrayChild._parent
                    }
                }
                else {
                    child._parent = node;
                    child._parentKey = keyArg;
                    travelOne(child, key, func, newContext);
                    delete child._parentKey
                    delete child._parent
                }
            }
        }
    }

}

module.exports = {
    travelOne: travelOne,
    visit: visit,
    travel: travel
};