function walkAst(func, info, parent, node) {
    func(info, node)
    for (var key in node) {
        if (node[key]) {
            var child = node[key];
            if (typeof child === 'object') {
                if (Array.isArray(child)) {
                    for (var i = 0, len = child.length; i < len; i++) {
                        walkAst(func, info, node, child[i]);
                    }
                }
                else {
                    walkAst(func, info, node, child);
                }
            }
        }
    }
}
module.exports = walkAst;