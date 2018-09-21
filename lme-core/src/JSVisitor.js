/**
 * Just a Javascript Native Object visitor
 * While an element is called the .parent and .parentKey functions are filled.
 * when it goes outside the node these properties are unset.
 *
 * TODO: all the visitors are about to do the same. Maybe if look more abstract they can be merged.
 */
function visit(node, keyArg, func) {
	for (let key in node) {
		if (node[key] !== undefined && key !== '_parent' && key !== '_parentKey') {
			const child = node[key]
			if (typeof child === 'object') {
				if (Array.isArray(child)) {
					let i = 0, len = child.length
					for (; i < len; i++) {
						const arrayChild = child[i]
						arrayChild._parent = node
						arrayChild._parentKey = keyArg
						visit(arrayChild, key, func)
						arrayChild._parentKey = undefined
						arrayChild._parent = undefined
					}
				}
				else {
					child._parent = node
					child._parentKey = keyArg
					visit(child, key, func)

					child._parentKey = undefined
					child._parent = undefined
				}
			}
			else {
				if (func[key] !== undefined) {
					func[key](node)
				}
			}
		}
	}
	if (func[keyArg] !== undefined) {
		func[keyArg](node)
	}
}

function travel(node, keyArg, func) {
	let traveller = func(keyArg, node)
	if (traveller) return
	for (let key in node) {
		if (node[key] !== undefined) {
			const child = node[key]
			if (typeof child === 'object') {
				if (Array.isArray(child)) {
					traveller = func(key, child)
					if (traveller) return
					let i = 0, len = child.length
					for (; i < len; i++) {
						const arrayChild = child[i]
						travel(arrayChild, key, func)
					}
				}
				else {
					travel(child, key, func)
				}
			}
			else {
				func(key, node)
			}
		}
	}
}

function VisitContext() {
}

function travelOne(node, keyArg, func, contextArg) {
	contextArg = contextArg || {}
	const newContext = new VisitContext()
	newContext.__proto__ = contextArg
	func(keyArg, node, newContext)

	for (let key in node) {
		if (node[key] !== undefined && key !== '_parent' && key !== '_parentKey') {
			const child = node[key]
			if (typeof child === 'object') {
				if (Array.isArray(child)) {
					let i = 0, len = child.length
					for (; i < len; i++) {
						const arrayChild = child[i]
						arrayChild._parent = node
						arrayChild._parentKey = keyArg
						travelOne(arrayChild, key, func, newContext)
						delete arrayChild._parentKey
						delete arrayChild._parent
					}
				}
				else {
					child._parent = node
					child._parentKey = keyArg
					travelOne(child, key, func, newContext)
					delete child._parentKey
					delete child._parent
				}
			}
		}
	}
}
export default { travelOne, visit, travel }