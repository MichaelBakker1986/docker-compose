'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Just a Javascript Native Object visitor
 * While an element is called the .parent and .parentKey functions are filled.
 * when it goes outside the node these properties are unset.
 *
 * TODO: all the visitors are about to do the same. Maybe if look more abstract they can be merged.
 */
function visit(node, keyArg, func) {
	for (var key in node) {
		if (node[key] !== undefined && key !== '_parent' && key !== '_parentKey') {
			var child = node[key];
			if ((typeof child === 'undefined' ? 'undefined' : (0, _typeof3.default)(child)) === 'object') {
				if (Array.isArray(child)) {
					var i = 0,
					    len = child.length;
					for (; i < len; i++) {
						var arrayChild = child[i];
						arrayChild._parent = node;
						arrayChild._parentKey = keyArg;
						visit(arrayChild, key, func);
						arrayChild._parentKey = undefined;
						arrayChild._parent = undefined;
					}
				} else {
					child._parent = node;
					child._parentKey = keyArg;
					visit(child, key, func);

					child._parentKey = undefined;
					child._parent = undefined;
				}
			} else {
				if (func[key] !== undefined) {
					func[key](node);
				}
			}
		}
	}
	if (func[keyArg] !== undefined) {
		func[keyArg](node);
	}
}

function travel(node, keyArg, func) {
	var traveller = func(keyArg, node);
	if (traveller) return;
	for (var key in node) {
		if (node[key] !== undefined) {
			var child = node[key];
			if ((typeof child === 'undefined' ? 'undefined' : (0, _typeof3.default)(child)) === 'object') {
				if (Array.isArray(child)) {
					traveller = func(key, child);
					if (traveller) return;
					var i = 0,
					    len = child.length;
					for (; i < len; i++) {
						var arrayChild = child[i];
						travel(arrayChild, key, func);
					}
				} else {
					travel(child, key, func);
				}
			} else {
				func(key, node);
			}
		}
	}
}

function VisitContext() {}

function travelOne(node, keyArg, func, contextArg) {
	contextArg = contextArg || {};
	var newContext = new VisitContext();
	newContext.__proto__ = contextArg;
	func(keyArg, node, newContext);

	for (var key in node) {
		if (node[key] !== undefined && key !== '_parent' && key !== '_parentKey') {
			var child = node[key];
			if ((typeof child === 'undefined' ? 'undefined' : (0, _typeof3.default)(child)) === 'object') {
				if (Array.isArray(child)) {
					var i = 0,
					    len = child.length;
					for (; i < len; i++) {
						var arrayChild = child[i];
						arrayChild._parent = node;
						arrayChild._parentKey = keyArg;
						travelOne(arrayChild, key, func, newContext);
						delete arrayChild._parentKey;
						delete arrayChild._parent;
					}
				} else {
					child._parent = node;
					child._parentKey = keyArg;
					travelOne(child, key, func, newContext);
					delete child._parentKey;
					delete child._parent;
				}
			}
		}
	}
}
exports.default = { travelOne: travelOne, visit: visit, travel: travel };