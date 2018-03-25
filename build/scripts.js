/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ../node_modules/preact/dist/preact.esm.js
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
 * the current _actual_ DOM structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
 * @param {Object} attributes	Any attributes/props to set on the created element.
 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
 *
 * @public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {VNode} vnode		The virutal DOM element to clone
 * @param {Object} props	Attributes/props to add when cloning
 * @param {VNode} rest		Any additional arguments will be used as replacement children.
 */
function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node			DOM Node to compare
 * @param {VNode} vnode			Virtual DOM node to compare
 * @param {boolean} [hyrdating=false]	If true, ignores component constructors when comparing.
 * @private
 */
function isSameNodeType(node, vnode, hydrating) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return node.splitText !== undefined;
  }
  if (typeof vnode.nodeName === 'string') {
    return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
  }
  return hydrating || node._componentConstructor === vnode.nodeName;
}

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node	A DOM Element to inspect the name of.
 * @param {String} nodeName	Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
  return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 *
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
  var props = extend({}, vnode.attributes);
  props.children = vnode.children;

  var defaultProps = vnode.nodeName.defaultProps;
  if (defaultProps !== undefined) {
    for (var i in defaultProps) {
      if (props[i] === undefined) {
        props[i] = defaultProps[i];
      }
    }
  }

  return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function preact_esm_render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: preact_esm_render,
	rerender: rerender,
	options: options
};


/* harmony default export */ var preact_esm = (preact);
//# sourceMappingURL=preact.esm.js.map

// CONCATENATED MODULE: ../node_modules/preact-router/dist/preact-router.es.js


var EMPTY$1 = {};

function preact_router_es_assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
		c = url.match(reg),
		matches = {},
		ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i=0; i<p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1=0; i$1<max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0)===':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
				flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
				plus = ~flags.indexOf('+'),
				star = ~flags.indexOf('*'),
				val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?')<0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		}
		else if (route[i$1]!==url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default!==true && ret===false) { return false; }
	return matches;
}

function pathRankSort(a, b) {
	return (
		(a.rank < b.rank) ? 1 :
		(a.rank > b.rank) ? -1 :
		(a.index - b.index)
	);
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0)==':' ? (1 + '*+?'.indexOf(segment.charAt(segment.length-1))) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_!=null || typeof Symbol!=='undefined' && node[Symbol.for('preactattr')]!=null;
}

function setUrl(url, type) {
	if ( type === void 0 ) type='push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	}
	else if (typeof history!=='undefined' && history[type+'State']) {
		history[type+'State'](null, null, url);
	}
}


function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	}
	else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	}
	else {
		url = typeof location!=='undefined' ? location : EMPTY;
	}
	return ("" + (url.pathname || '') + (url.search || ''));
}



function route(url, replace) {
	if ( replace === void 0 ) replace=false;

	if (typeof url!=='string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}


/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i=ROUTERS.length; i--; ) {
		if (ROUTERS[i].canRoute(url)) { return true; }
	}
	return false;
}


/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i=0; i<ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url)===true) {
			didRoute = true;
		}
	}
	for (var i$1=subscribers.length; i$1--; ) {
		subscribers[i$1](url);
	}
	return didRoute;
}


function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) { return; }

	var href = node.getAttribute('href'),
		target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || (target && !target.match(/^_?self$/i))) { return; }

	// attempt to route, if no match simply cede control to browser
	return route(href);
}


function handleLinkClick(e) {
	if (e.button==0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}


function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) { e.stopImmediatePropagation(); }
		if (e.stopPropagation) { e.stopPropagation(); }
		e.preventDefault();
	}
	return false;
}


function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button!==0) { return; }

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase()==='A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) { return; }
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while ((t=t.parentNode));
}


var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) { return; }

	if (typeof addEventListener==='function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}


var preact_router_es_Router = (function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if ( Component$$1 ) Router.__proto__ = Component$$1;
	Router.prototype = Object.create( Component$$1 && Component$$1.prototype );
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate (props) {
		if (props.static!==true) { return true; }
		return props.url!==this.props.url || props.onChange!==this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute (url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo (url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) { return this.canRoute(url); }

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount () {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount () {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo(("" + (location.pathname || '') + (location.search || '')));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount () {
		if (typeof this.unlisten==='function') { this.unlisten(); }
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate () {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate () {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren (children, url, invoke) {
		return children
			.filter(prepareVNodeForRanking)
			.sort(pathRankSort)
			.map( function (vnode) {
				var matches = exec(url, vnode.attributes.path, vnode.attributes);
				if (matches) {
					if (invoke !== false) {
						var newProps = { url: url, matches: matches };
						preact_router_es_assign(newProps, matches);
						delete newProps.ref;
						delete newProps.key;
						return cloneElement(vnode, newProps);
					}
					return vnode;
				}
			}).filter(Boolean);
	};

	Router.prototype.render = function render (ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url!==previous) {
			this.previousUrl = url;
			if (typeof onChange==='function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(Component));

var Link = function (props) { return (
	h('a', preact_router_es_assign({ onClick: handleLinkClick }, props))
); };

var Route = function (props) { return h(props.component, props); };

preact_router_es_Router.subscribers = subscribers;
preact_router_es_Router.getCurrentUrl = getCurrentUrl;
preact_router_es_Router.route = route;
preact_router_es_Router.Router = preact_router_es_Router;
preact_router_es_Router.Route = Route;
preact_router_es_Router.Link = Link;

/* harmony default export */ var preact_router_es = (preact_router_es_Router);
//# sourceMappingURL=preact-router.es.js.map

// CONCATENATED MODULE: ./components/app/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var style = ({"app":"app-3IOc"});
const app = "app-3IOc";
// CONCATENATED MODULE: ./routes/home/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var home_style = ({"home":"home-I-rC","headerContents":"headerContents-3I_-","info":"info-2nWv","dcmp":"dcmp-2ed_","cmp":"cmp-1Nrd","pre":"pre-1gS0","off":"off-28wV","adminPanel":"adminPanel-3rTG","navigationDrawerButtonContainer":"navigationDrawerButtonContainer-uVPX","navigationDrawerButton":"navigationDrawerButton-3P4x"});
const home = "home-I-rC";
const headerContents = "headerContents-3I_-";
const info = "info-2nWv";
const dcmp = "dcmp-2ed_";
const cmp = "cmp-1Nrd";
const pre = "pre-1gS0";
const off = "off-28wV";
const adminPanel = "adminPanel-3rTG";
const navigationDrawerButtonContainer = "navigationDrawerButtonContainer-uVPX";
const navigationDrawerButton = "navigationDrawerButton-3P4x";
// CONCATENATED MODULE: ./error.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var error_0 = ({"err":"err-f_9v","wrapper":"wrapper-1FA3"});
const err = "err-f_9v";
const wrapper = "wrapper-1FA3";
// CONCATENATED MODULE: ./resolver.tsx
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var resolver_Resolver = function Resolver(props) {
  return h(
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this) || this;
      _this.state = {
        data: {},
        error: null
      };
      Object.keys(props.data).forEach(function (prop) {
        if (prop === 'children') {
          return;
        }

        props.data[prop](function (err, d) {
          return _this.setState(function (state) {
            if (err !== null) {
              return _this.setState({
                error: err
              });
            }

            state.data[prop] = d;
            return state;
          });
        });
      });
      return _this;
    }

    var _proto = _class.prototype;

    _proto.render = function render(_ref, _ref2) {
      var _render = _ref.render;
      var error = _ref2.error,
          data = _ref2.data;
      var Render = _render;
      return h("div", {
        class: wrapper
      }, error !== null ? h("div", {
        class: err
      }, "Network Connection Problem: ", error.toString()) : null, h(Render, Object.assign({}, data)));
    };

    return _class;
  }(Component), props);
};

/* harmony default export */ var resolver = (resolver_Resolver);
// CONCATENATED MODULE: ./components/search-input/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var search_input_style = ({"input":"input-1ZYx"});
const input = "input-1ZYx";
// CONCATENATED MODULE: ./components/search-input/index.tsx



var search_input_SearchInput = function SearchInput(_ref) {
  var placeholder = _ref.placeholder,
      value = _ref.value,
      onInput = _ref.onInput;
  return h("input", Object.assign({
    class: input,
    type: "search"
  }, {
    placeholder: placeholder,
    value: value,
    onInput: onInput
  }));
};

/* harmony default export */ var search_input = (search_input_SearchInput);
// CONCATENATED MODULE: ../node_modules/idb-keyval/idb-keyval.js
var db;

function getDB() {
  if (!db) {
    db = new Promise(function(resolve, reject) {
      var openreq = indexedDB.open('keyval-store', 1);

      openreq.onerror = function() {
        reject(openreq.error);
      };

      openreq.onupgradeneeded = function() {
        // First time setup: create an empty object store
        openreq.result.createObjectStore('keyval');
      };

      openreq.onsuccess = function() {
        resolve(openreq.result);
      };
    });
  }
  return db;
}

function withStore(type, callback) {
  return getDB().then(function(db) {
    return new Promise(function(resolve, reject) {
      var transaction = db.transaction('keyval', type);
      transaction.oncomplete = function() {
        resolve();
      };
      transaction.onerror = function() {
        reject(transaction.error);
      };
      callback(transaction.objectStore('keyval'));
    });
  });
}

/* harmony default export */ var idb_keyval = ({
  get: function(key) {
    var req;
    return withStore('readonly', function(store) {
      req = store.get(key);
    }).then(function() {
      return req.result;
    });
  },
  set: function(key, value) {
    return withStore('readwrite', function(store) {
      store.put(value, key);
    });
  },
  delete: function(key) {
    return withStore('readwrite', function(store) {
      store.delete(key);
    });
  },
  clear: function() {
    return withStore('readwrite', function(store) {
      store.clear();
    });
  },
  keys: function() {
    var keys = [];
    return withStore('readonly', function(store) {
      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // And openKeyCursor isn't supported by Safari.
      (store.openKeyCursor || store.openCursor).call(store).onsuccess = function() {
        if (!this.result) return;
        keys.push(this.result.key);
        this.result.continue();
      };
    }).then(function() {
      return keys;
    });
  }
});

// CONCATENATED MODULE: ./utils.tsx
var hasValidJWT = function hasValidJWT() {
  var jwt = getJWT();

  if (!jwt) {
    return false;
  }

  var parts = jwt.split('.');

  if (parts.length !== 3) {
    return false;
  }

  return JSON.parse(atob(parts[1])).exp > Number(new Date()) / 1000;
};

var getJWT = function getJWT() {
  return localStorage.getItem('jwt');
};

var getUserInfo = function getUserInfo() {
  var body = JSON.parse(atob(getJWT().split('.')[1]));
  return {
    username: body.sub,
    isAdmin: body.pigmice_is_admin
  };
};

var formatTime = function formatTime(date) {
  return date.toLocaleTimeString(undefined, {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  });
};

var formatDate = function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  });
};

var formatTeamNumber = function formatTeamNumber(teamId) {
  return teamId.replace('frc', '');
};

var parseTeamNumber = function parseTeamNumber(teamId) {
  var _formatTeamNumber$mat = formatTeamNumber(teamId).match(/([0-9]*)(.*)/),
      num = _formatTeamNumber$mat[1],
      letter = _formatTeamNumber$mat[2];

  return {
    num: Number(num),
    letter: letter
  };
};

var sortTeams = function sortTeams(a, b) {
  return parseTeamNumber(a).num > parseTeamNumber(b).num;
};

var sortSchemaKeys = function sortSchemaKeys(keys) {
  return keys.reduce(function (acc, val) {
    if (val.startsWith('auto')) {
      acc.auto.push(val);
    } else if (val.startsWith('teleop')) {
      acc.teleop.push(val);
    } else {
      acc.general.push(val);
    }

    return acc;
  }, {
    auto: [],
    teleop: [],
    general: []
  });
};

var formatMatchKey = function formatMatchKey(matchId) {
  var _parseMatchKey = parseMatchKey(matchId.toUpperCase()),
      type = _parseMatchKey.type,
      number = _parseMatchKey.number,
      group = _parseMatchKey.group;

  if (type === 'q') {
    return "Qual " + number;
  }

  return "" + type.toUpperCase() + group + " M" + number;
};

var toRadians = function toRadians(deg) {
  return deg * (Math.PI / 180);
};
/**
 * @returns Distance between the 2 points in km
 * More info at https://www.movable-type.co.uk/scripts/latlong.html
 */


var distanceBetween = function distanceBetween(lat1, lon1, lat2, lon2) {
  var earthRadius = 6371;
  var dLat = toRadians(lat2 - lat1);
  var dLon = toRadians(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * angularDistance;
};

var getCoords = function getCoords(cb) {
  var cachedCoords = localStorage.getItem('coords');

  if (cachedCoords !== null) {
    cb(JSON.parse(cachedCoords));
  }

  navigator.geolocation.getCurrentPosition(function (pos) {
    var coords = {
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    };
    localStorage.setItem('coords', JSON.stringify(coords));
    cb(coords);
  });
};

var today = Number(new Date());

var sortEvents = function sortEvents(events, coords) {
  return events !== undefined && events !== null ? events.map(function (e) {
    e.parsedDate = new Date(e.date);
    e.parsedEndDate = new Date(e.endDate);
    e.distanceFromToday = Math.round((Number(e.parsedEndDate) - today) / 1000 / 60 / 60 / 24 / 7);

    if (coords !== undefined) {
      e.distance = distanceBetween(coords.lat, coords.long, e.lat, e.long);
    }

    return e;
  }).sort(function (a, b) {
    if (a.distanceFromToday === b.distanceFromToday) {
      return a.distance > b.distance ? 1 : -1;
    } else if (a.distanceFromToday > b.distanceFromToday) {
      return a.distanceFromToday >= 0 ? 1 : -1;
    }

    return a.distanceFromToday >= 0 ? -1 : 1;
  }) : [];
};

var sortReporterStats = function sortReporterStats(stats) {
  return stats !== undefined && stats !== null ? stats.sort(function (a, b) {
    return a.reports < b.reports ? 1 : -1;
  }) : [];
};

var parseMatchKey = function parseMatchKey(key) {
  var eventKey, matchKey;

  if (key.includes('_')) {
    var _key$match = key.match(/([^_]*)_(.*)/),
        e = _key$match[1],
        m = _key$match[2];

    eventKey = e.toLowerCase();
    matchKey = m.toLowerCase();
  } else {
    eventKey = null;
    matchKey = key.toLowerCase();
  }

  var number = Number.parseInt(/.*m([\d]*)$/.exec(matchKey)[1]);
  var g = /^[\D]*([\d]*)m/.exec(matchKey)[1];
  var type = /(^[\D]*).*m.*$/.exec(matchKey)[1];
  return {
    eventKey: eventKey,
    matchKey: matchKey,
    group: g === '' ? null : Number.parseInt(g),
    number: number,
    type: type
  };
};

var camelToTitle = function camelToTitle(text) {
  var d = text.replace(/[A-Z]/g, function (m) {
    return ' ' + m;
  });
  return d[0].toUpperCase() + d.slice(1);
};

var toPercentage = function toPercentage(val) {
  return Math.round(val * 100) + '%';
};

var toPrettyNumber = function toPrettyNumber(val) {
  return Math.round(val * 10) / 10;
};

var getNumber = function getNumber(val) {
  return typeof val === 'number' ? val : val ? 1 : 0;
};

var eventTypeNames = new Map([[0, ''], [1, ''], [5, 'DCMP'], [2, 'DCMP'], [3, 'CMP'], [4, 'CMP'], [6, ''], [99, 'Off'], [100, 'Pre'], [-1, '']]);

var lerper = function lerper(minIn, maxIn, minOut, maxOut) {
  return function (val) {
    return lerp(val, minIn, maxIn, minOut, maxOut);
  };
};

var lerp = function lerp(val, minIn, maxIn, minOut, maxOut) {
  return (val - minIn) / (maxIn - minIn) * (maxOut - minOut) + minOut;
};

var compareMatchKey = function compareMatchKey(a, b) {
  if (a == b) {
    return 0;
  }

  var aParsed = parseMatchKey(a);
  var bParsed = parseMatchKey(b);

  if (aParsed.type === bParsed.type) {
    if (aParsed.group === bParsed.group) {
      return aParsed.number < bParsed.number ? -1 : 1;
    }

    return aParsed.group < bParsed.group ? -1 : 1;
  }

  return compareMatchType(aParsed.type, bParsed.type);
};

var order = ['qm', 'ef', 'qf', 'sf', 'f'];

var compareMatchType = function compareMatchType(a, b) {
  return order.indexOf(a) > order.indexOf(b) ? 1 : -1;
};

var eventTypeName = function eventTypeName(eventType) {
  return eventTypeNames.get(eventType);
};

var abbreviate = function abbreviate(str) {
  return str.split(' ').map(function (v) {
    return v[0].toUpperCase();
  }).join('');
};

var capitalize = function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
};


// CONCATENATED MODULE: ./api.tsx
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }



var endpoint = 'https://api.pigmice.ga';

var addRequestToIdb =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (request) {
    var currentRequests = yield idb_keyval.get('cachedRequests');

    if (currentRequests === undefined) {
      yield idb_keyval.set('cachedRequests', [request]);
      return 1;
    }

    yield idb_keyval.set('cachedRequests', currentRequests.concat(request));
    return currentRequests.length + 1;
  });

  return function addRequestToIdb(_x) {
    return _ref.apply(this, arguments);
  };
}();

var api_queryAPI = function queryAPI(path, method, body) {
  if (method === void 0) {
    method = 'GET';
  }

  return fetch(endpoint + "/" + path, {
    method: method,
    body: JSON.stringify(body),
    headers: hasValidJWT() ? new Headers({
      Authentication: "Bearer " + getJWT()
    }) : undefined
  }).catch(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(function* (err) {
      if (method !== 'GET') {
        var numRequests = yield addRequestToIdb({
          path: path,
          method: method,
          body: body
        });
      }

      throw err;
    });

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var get = function get(url) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(function* (cb) {
        cb(null, JSON.parse(localStorage.getItem(url)) || undefined);

        try {
          var data = yield api_queryAPI(url).then(function (d) {
            return d.json();
          });
          cb(null, data);
          localStorage.setItem(url, JSON.stringify(data));
        } catch (ex) {
          cb(ex, undefined);
        }
      });

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};

var getEvents = function getEvents() {
  return get('events');
};

var getEvent = function getEvent(eventKey) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(function* (cb) {
        get("events/" + eventKey)(function (err, data) {
          if (err) {
            cb(err, data);
          } else {
            if (data !== undefined && data.matches !== undefined && data.matches !== null) {
              data.matches = data.matches.map(function (value) {
                if (!(value.time instanceof Date)) {
                  value.time = new Date(value.actualTime || value.predictedTime);
                }

                return value;
              }).sort(function (a, b) {
                return (a.time === null ? 0 : a.time.getTime()) - (b.time === null ? 0 : b.time.getTime());
              });
            }

            cb(null, data);
          }
        });
      });

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
};

var getEventAnalysis = function getEventAnalysis(eventKey) {
  return get("analysis/" + eventKey);
};

var getMatch = function getMatch(eventKey, matchKey) {
  return get("events/" + eventKey + "/" + eventKey + "_" + matchKey);
};

var getSchema = function getSchema() {
  return get('schema');
};

var getReporterStats = function getReporterStats() {
  return get('leaderboard');
};

var getTeamStats = function getTeamStats(eventKey, team) {
  return get("reports/" + eventKey + "/frc" + team + "/raw");
};

var getUsers = function getUsers() {
  return get('users');
};

var authenticate = function authenticate(credentials) {
  return api_queryAPI('authenticate', 'POST', credentials).then(
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(function* (resp) {
      if (resp.status < 200 || resp.status >= 300) {
        throw new Error(resp.status);
      }

      return (yield resp.json()).jwt;
    });

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());
};

var submitReport = function submitReport(team, eventKey, matchKey, stats, notes) {
  return api_queryAPI("reports/" + eventKey + "/" + eventKey + "_" + matchKey, 'PUT', {
    team: team,
    stats: stats,
    notes: notes
  });
};

var getAllianceAnalysis = function getAllianceAnalysis(eventKey, matchKey, color) {
  return get("analysis/" + eventKey + "/" + eventKey + "_" + matchKey + "/" + color);
};

var deleteUser = function deleteUser(username) {
  return api_queryAPI("users/" + username, 'DELETE');
};

var updateUser = function updateUser(username, user) {
  return api_queryAPI("users/" + username, 'PUT', user);
};

var createUser = function createUser(user) {
  return api_queryAPI("users", 'POST', user);
};


// CONCATENATED MODULE: ./components/spinner/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var spinner_style = ({"spinner":"spinner-1Yay","wobble":"wobble-1qKc","a":"a-wuUo","b":"b-2Qok"});
const spinner = "spinner-1Yay";
const wobble = "wobble-1qKc";
const style_a = "a-wuUo";
const style_b = "b-2Qok";
// CONCATENATED MODULE: ./components/spinner/index.tsx



var spinner_Spinner = function Spinner() {
  return h("div", {
    class: spinner
  });
};

/* harmony default export */ var components_spinner = (spinner_Spinner);
// CONCATENATED MODULE: ./components/list/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var list_style = ({"list":"list-36wu"});
const list = "list-36wu";
// CONCATENATED MODULE: ./components/list/index.tsx



var list_List = function List(_ref) {
  var children = _ref.children;
  return h("ul", {
    class: list
  }, children);
};

/* harmony default export */ var components_list = (list_List);
// CONCATENATED MODULE: ./components/icon/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var icon_style = ({"icon":"icon-2CC6"});
const style_icon = "icon-2CC6";
// CONCATENATED MODULE: ./components/icon/index.tsx


var icons = {
  left: 'M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z',
  check: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
  right: 'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
  calendar: 'M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z',
  delete: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
  trophy: 'M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z'
};

var icon_Icon = function Icon(_ref) {
  var icon = _ref.icon,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'white' : _ref$fill;
  return h("svg", {
    class: style_icon,
    viewBox: "0 0 24 24"
  }, h("path", {
    fill: fill,
    d: icons[icon]
  }));
};

/* harmony default export */ var components_icon = (icon_Icon);
// CONCATENATED MODULE: ./components/date-display/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var date_display_style = ({"date":"date-3s1l"});
const style_date = "date-3s1l";
// CONCATENATED MODULE: ./components/date-display/index.tsx





var date_display_DateDisplay = function DateDisplay(_ref) {
  var date = _ref.date;
  return h("span", {
    class: style_date
  }, h(components_icon, {
    icon: "calendar"
  }), date ? formatDate(date) : 'Loading...');
};

/* harmony default export */ var date_display = (date_display_DateDisplay);
// CONCATENATED MODULE: ./components/button/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var button_style = ({"button":"button-YfBj"});
const style_button = "button-YfBj";
// CONCATENATED MODULE: ./components/button/index.tsx



var button_Button = function Button(_ref) {
  var children = _ref.children,
      href = _ref.href,
      type = _ref.type,
      value = _ref.value,
      onClick = _ref.onClick,
      disabled = _ref.disabled,
      className = _ref.class;
  return h(href ? 'a' : type === 'submit' ? 'input' : 'button', {
    class: style_button + " " + (className || ''),
    children: children,
    href: href,
    type: type,
    value: value,
    onClick: onClick,
    disabled: disabled
  });
};

/* harmony default export */ var components_button = (button_Button);
// CONCATENATED MODULE: ./components/header/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var header_style = ({"header":"header-21rJ","back":"back-3wGW"});
const header = "header-21rJ";
const style_back = "back-3wGW";
// CONCATENATED MODULE: ./components/header/index.tsx





var header_Header = function Header(_ref) {
  var title = _ref.title,
      back = _ref.back,
      contents = _ref.contents,
      verify = _ref.verify;
  return h("header", {
    class: header
  }, back && h("a", {
    class: style_back,
    onClick: function onClick(e) {
      if (verify === true) {
        e.stopImmediatePropagation();
        e.preventDefault();

        if (confirm('Are you sure you want to leave?')) {
          route(back);
        }
      }
    },
    href: back
  }, h(components_icon, {
    icon: "left"
  })), contents || h("h1", null, title));
};

/* harmony default export */ var components_header = (header_Header);
// CONCATENATED MODULE: ./routes/home/index.tsx
function home__inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }














var eventTypeClassMap = new Map([[5, dcmp], [2, dcmp], [3, cmp], [4, cmp], [99, off], [100, pre]]);
/* harmony default export */ var routes_home = (function () {
  return h(resolver, {
    data: {
      events: getEvents()
    },
    render:
    /*#__PURE__*/
    function (_Component) {
      home__inheritsLoose(Home, _Component);

      function Home() {
        var _this;

        _this = _Component.call(this) || this;

        _this.queryChanged = function (e) {
          _this.setState({
            query: e.target.value
          });
        };

        _this.logout = function () {
          localStorage.removeItem('jwt');

          _this.setState({
            loggedIn: false
          });
        };

        _this.eventTypeClass = function (eventType) {
          return eventTypeClassMap.get(eventType);
        };

        _this.state = {
          query: '',
          loggedIn: false
        };
        return _this;
      }

      var _proto = Home.prototype;

      _proto.componentWillMount = function componentWillMount() {
        var _this2 = this;

        this.setState({
          loggedIn: hasValidJWT()
        });

        if ('geolocation' in navigator) {
          getCoords(function (coords) {
            _this2.setState({
              coords: coords
            });
          });
        }
      };

      _proto.render = function render(_ref, _ref2) {
        var _this3 = this;

        var events = _ref.events;
        var query = _ref2.query,
            loggedIn = _ref2.loggedIn,
            coords = _ref2.coords;
        var matchingEvents = (events !== undefined ? events : []).filter(function (e) {
          return e.name.toLowerCase().includes(query.toLowerCase());
        });
        var sortedEvents = sortEvents(matchingEvents, coords);
        return h("div", {
          class: home
        }, h(components_header, {
          contents: h("div", {
            class: headerContents
          }, h("span", {
            class: navigationDrawerButtonContainer
          }, h("a", {
            class: navigationDrawerButton,
            href: "/leaderboard"
          }, h(components_icon, {
            fill: "#FFF",
            icon: "trophy"
          }))), h(search_input, {
            onInput: this.queryChanged,
            placeholder: "Search for events",
            value: query
          }), loggedIn ? h(components_button, {
            onClick: this.logout
          }, "Log Out") : h(components_button, {
            href: "/login"
          }, "Login"))
        }), events === undefined ? h(components_spinner, null) : events.length === 0 ? 'No matching events' : h(components_list, null, sortedEvents.map(function (e) {
          return h("li", {
            key: e.key
          }, h("a", {
            href: "/events/" + e.key
          }, e.shortName || e.name, h("div", {
            class: info
          }, eventTypeName(e.eventType) ? h("span", {
            class: _this3.eventTypeClass(e.eventType)
          }, eventTypeName(e.eventType)) : null, h(date_display, {
            date: e.parsedDate
          }))));
        })));
      };

      return Home;
    }(Component)
  });
});
// CONCATENATED MODULE: ./routes/leaderboard/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var leaderboard_style = ({"leaderboard":"leaderboard-uoYj","emoji":"emoji-3h08"});
const leaderboard = "leaderboard-uoYj";
const emoji = "emoji-3h08";
// CONCATENATED MODULE: ./routes/leaderboard/index.tsx








var leaderboard_Leaderboard = function Leaderboard() {
  return h(resolver, {
    data: {
      stats: getReporterStats()
    },
    render: function render(_ref) {
      var stats = _ref.stats;
      var sortedStats = sortReporterStats(stats) || [];
      return h("div", null, h(components_header, {
        title: "Leaderboard",
        back: "/"
      }), !sortedStats ? h(components_spinner, null) : h("table", {
        class: leaderboard
      }, h("tr", null, h("th", null), h("th", null, "Reporter"), h("th", null, "Reports")), sortedStats.map(function (stat, i) {
        return h("tr", null, h("td", {
          class: emoji
        }, i === 0 ? '👑' : '', i === stats.length - 1 && stats.length !== 1 ? '🙁' : ''), h("td", null, stat.reporter), h("td", null, stat.reports));
      })));
    }
  });
};

/* harmony default export */ var routes_leaderboard = (leaderboard_Leaderboard);
// CONCATENATED MODULE: ../node_modules/linkstate/dist/linkstate.es.js
function dlv(obj, key, def, p) {
	p = 0;
	key = key.split ? key.split('.') : key;
	while (obj && p<key.length) { obj = obj[key[p++]]; }
	return obj===undefined ? def : obj;
}

/** Create an Event handler function that sets a given state property.
 *	@param {Component} component	The component whose state should be updated
 *	@param {string} key				A dot-notated key path to update in the component's state
 *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
 *	@returns {function} linkedStateHandler
 */
function linkState(component, key, eventPath) {
	var path = key.split('.'),
		cache = component.__lsc || (component.__lsc = {});

	return cache[key+eventPath] || (cache[key+eventPath] = function(e) {
		var t = e && e.target || this,
			state = {},
			obj = state,
			v = typeof eventPath==='string' ? dlv(e, eventPath) : t.nodeName ? (t.type.match(/^che|rad/) ? t.checked : t.value) : e,
			i = 0;
		for ( ; i<path.length-1; i++) {
			obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
		}
		obj[path[i]] = v;
		component.setState(state);
	});
}

/* harmony default export */ var linkstate_es = (linkState);
//# sourceMappingURL=linkstate.es.js.map

// CONCATENATED MODULE: ./components/text-input/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var text_input_style = ({"input":"input-1dvX"});
const style_input = "input-1dvX";
// CONCATENATED MODULE: ./components/text-input/index.tsx



var text_input_TextInput = function TextInput(_ref) {
  var placeholder = _ref.placeholder,
      type = _ref.type,
      value = _ref.value,
      onInput = _ref.onInput,
      className = _ref.className;
  return h("input", Object.assign({
    class: style_input + " " + className
  }, {
    placeholder: placeholder,
    type: type,
    value: value,
    onInput: onInput
  }));
};

/* harmony default export */ var text_input = (text_input_TextInput);
// CONCATENATED MODULE: ./routes/login/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var login_style = ({"login":"login-34mo","err":"err-1Tmh"});
const login = "login-34mo";
const style_err = "err-1Tmh";
// CONCATENATED MODULE: ./routes/login/index.tsx
function login__inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }










var login_Login =
/*#__PURE__*/
function (_Component) {
  login__inheritsLoose(Login, _Component);

  function Login() {
    var _this;

    _this = _Component.apply(this, arguments) || this;

    _this.handleLogin = function (e, back) {
      e.preventDefault();
      authenticate(_this.state).then(function (jwt) {
        localStorage.setItem('jwt', jwt);
        route(back || '/');
      }).catch(function (err) {
        return _this.setState(function (state) {
          state.error = Number(err.message) === 401 ? 'Incorrect username or password.' : err.message;
          return state;
        });
      });
    };

    return _this;
  }

  var _proto = Login.prototype;

  _proto.render = function render(_ref, state) {
    var _this2 = this;

    var back = _ref.back;
    return h("div", {
      class: login
    }, h(components_header, {
      title: "Login",
      back: back || '/'
    }), h("div", null, state.error ? h("p", {
      class: style_err
    }, state.error) : null, h("form", {
      onSubmit: function onSubmit(e) {
        return _this2.handleLogin(e, back);
      }
    }, h(text_input, {
      placeholder: "Username",
      onInput: linkstate_es(this, 'username'),
      value: state.username
    }), h(text_input, {
      type: "password",
      placeholder: "Password",
      onInput: linkstate_es(this, 'password'),
      value: state.password
    }), h(components_button, {
      type: "submit",
      value: "Login"
    }))));
  };

  return Login;
}(Component);

/* harmony default export */ var routes_login = (login_Login);
// CONCATENATED MODULE: ./components/toggle/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var toggle_style = ({"toggle":"toggle-2Sp_"});
const toggle = "toggle-2Sp_";
// CONCATENATED MODULE: ./components/toggle/index.tsx



var toggle_Toggle = function Toggle(_ref) {
  var onChange = _ref.onChange,
      id = _ref.id,
      checked = _ref.checked;
  return h("div", {
    class: toggle
  }, h("input", {
    id: id,
    type: "checkbox",
    onChange: onChange,
    checked: checked
  }), h("label", {
    for: id
  }));
};

/* harmony default export */ var components_toggle = (toggle_Toggle);
// CONCATENATED MODULE: ./routes/admin/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var admin_style = ({"adminPanel":"adminPanel-2-1O","admin":"admin-3uL2","save":"save-1Pde","del":"del-28nn","success":"success-1t5V","a":"a-3SQw","failed":"failed-3wPg","admin-inner":"admin-inner-2poJ","adminInner":"admin-inner-2poJ"});
const style_adminPanel = "adminPanel-2-1O";
const admin = "admin-3uL2";
const save = "save-1Pde";
const del = "del-28nn";
const success = "success-1t5V";
const admin_style_a = "a-3SQw";
const failed = "failed-3wPg";
const adminInner = "admin-inner-2poJ";
// CONCATENATED MODULE: ./routes/admin/index.tsx
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function admin__inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }













var EditableUser = function EditableUser(username, isAdmin) {
  this.username = username;
  this.edit = {
    username: username,
    isAdmin: isAdmin,
    password: ''
  };
};

var admin_AdminPanel =
/*#__PURE__*/
function (_Component) {
  admin__inheritsLoose(AdminPanel, _Component);

  function AdminPanel() {
    return _Component.call(this) || this;
  }

  var _proto = AdminPanel.prototype;

  _proto.componentWillMount = function componentWillMount() {
    var _this = this;

    getUsers()(function (err, users) {
      return users ? _this.setState(function (state) {
        state.users = users.map(function (u) {
          return new EditableUser(u.username, u.isAdmin);
        });
        return state;
      }) : null;
    });
  };

  _proto.render = function render(_ref, _ref2) {
    var _this2 = this;

    _objectDestructuringEmpty(_ref);

    var users = _ref2.users;

    if (!hasValidJWT()) {
      route('/login');
      return;
    }

    var userInfo = getUserInfo();
    return !userInfo.isAdmin ? h("p", null, "You are not an admin.") : h("div", {
      class: style_adminPanel
    }, h(components_header, {
      title: "Admin Panel: " + userInfo.username,
      back: "/"
    }), !users ? h(components_spinner, null) : h("div", {
      class: adminInner
    }, h("table", null, h("tr", null, h("th", null, "Username"), h("th", null, "Password"), h("th", null, "Admin")), users.map(function (user, i) {
      var id = "user-" + i;
      return h("tr", {
        id: id
      }, h("td", null, h(text_input, {
        placeholder: "Username",
        value: user.edit.username,
        onInput: function onInput(evt) {
          return _this2.setState(function (state) {
            state.users[i].edit.username = evt.target.value;
            return state;
          });
        }
      })), h("td", null, h(text_input, {
        value: user.edit.password,
        type: "password",
        placeholder: "Password",
        onInput: function onInput(evt) {
          return _this2.setState(function (state) {
            state.users[i].edit.password = evt.target.value;
            return state;
          });
        }
      })), h("td", {
        class: admin
      }, h(components_toggle, {
        id: "toggle-" + i,
        checked: user.edit.isAdmin,
        onChange: function onChange(evt) {
          return _this2.setState(function (state) {
            state.users[i].edit.isAdmin = evt.target.checked;
            return state;
          });
        }
      })), h("td", {
        class: save
      }, h(components_button, {
        onClick: function onClick() {
          var elem = document.getElementById(id);
          setTimeout(function () {
            return elem.classList.remove(failed, success);
          }, 1200);
          var re = /[^A-Za-z0-9 ]/;

          if (!user.edit.username || re.exec(user.edit.username)) {
            elem.classList.add(failed);
            return;
          }

          try {
            if (user.username != '') {
              updateUser(user.username, {
                username: user.edit.username,
                isAdmin: user.edit.isAdmin,
                password: user.edit.password ? user.edit.password : undefined
              });
            } else {
              createUser(user.edit);
              user.username = user.edit.username;
            }

            elem.classList.add(success);
          } catch (ex) {
            elem.classList.add(failed);
          }
        }
      }, "Save")), h("td", {
        class: del
      }, h(components_button, {
        onClick: function onClick() {
          if (user.username) {
            deleteUser(user.username);
          }

          _this2.setState(function (state) {
            state.users.splice(i, 1);
          });
        }
      }, h(components_icon, {
        icon: "delete"
      }))));
    })), h(components_button, {
      onClick: function onClick() {
        return _this2.setState(function (state) {
          state.users.push(new EditableUser('', false));
          return state;
        });
      }
    }, "+")));
  };

  return AdminPanel;
}(Component);

/* harmony default export */ var routes_admin = (admin_AdminPanel);
// CONCATENATED MODULE: ./routes/event/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var event_style = ({"event":"event-12j2"});
const style_event = "event-12j2";
// CONCATENATED MODULE: ./routes/event/index.tsx










var event_Event = function Event(_ref) {
  var eventId = _ref.eventId;
  return h(resolver, {
    data: {
      event: getEvent(eventId)
    },
    render: function render(_ref2) {
      var event = _ref2.event;
      return h("div", {
        class: style_event
      }, h(components_header, {
        title: event && event.shortName || "Event " + eventId,
        back: "/"
      }), h(components_button, {
        href: "/events/" + eventId + "/analysis"
      }, "View Analysis"), typeof event === 'undefined' ? h(components_spinner, null) : event.matches === null || event.matches.length === 0 ? h("p", null, "No Matches") : h(components_list, null, event.matches.map(function (m) {
        m.time = new Date(m.actualTime || m.predictedTime);
        return m;
      }).sort(function (a, b) {
        return compareMatchKey(a.key, b.key);
      }).map(function (m) {
        var _parseMatchKey = parseMatchKey(m.key),
            matchKey = _parseMatchKey.matchKey;

        return h("li", {
          key: m.key
        }, h("a", {
          href: "/events/" + event.key + "/" + matchKey
        }, formatMatchKey(matchKey), h("span", null, formatTime(m.time))));
      })));
    }
  });
};

/* harmony default export */ var routes_event = (event_Event);
// CONCATENATED MODULE: ./routes/match/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var match_style = ({"match":"match-3O-F","alliance":"alliance-37l6","red":"red-J5HR","blue":"blue-1AR9","score":"score-2jMq","match-name":"match-name-XZZ6","matchName":"match-name-XZZ6","match-time":"match-time-PN7J","matchTime":"match-time-PN7J","navigation":"navigation-2pC1","navbar":"navbar-1UVS"});
const style_match = "match-3O-F";
const style_alliance = "alliance-37l6";
const red = "red-J5HR";
const blue = "blue-1AR9";
const style_score = "score-2jMq";
const matchName = "match-name-XZZ6";
const matchTime = "match-time-PN7J";
const navigation = "navigation-2pC1";
const navbar = "navbar-1UVS";
// CONCATENATED MODULE: ./components/robot-image/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var robot_image_style = ({"robot-image":"robot-image-2WWR","robotImage":"robot-image-2WWR","red":"red-2VqK","blue":"blue-Yf5C"});
const robotImage = "robot-image-2WWR";
const style_red = "red-2VqK";
const style_blue = "blue-Yf5C";
// CONCATENATED MODULE: ./components/robot-image/index.tsx



var robot_image_RobotImage = function RobotImage(_ref) {
  var team = _ref.team,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'blue' : _ref$color;
  return h("div", {
    class: robotImage + " " + (color === 'blue' ? style_blue : style_red),
    style: {
      backgroundImage: "url(https://api.pigmice.ga/photo/frc" + team + "), url(/assets/imgs/robot.jpg)"
    }
  }, h("span", null, team));
};

/* harmony default export */ var robot_image = (robot_image_RobotImage);
// CONCATENATED MODULE: ./routes/match/index.tsx











var match_Alliance = function Alliance(_ref) {
  var baseUrl = _ref.baseUrl,
      color = _ref.color,
      alliance = _ref.alliance,
      score = _ref.score;
  return h("a", {
    href: baseUrl + "/alliance/" + color,
    key: color,
    class: style_alliance + " " + (color === 'red' ? red : blue)
  }, alliance.map(function (team) {
    return h(robot_image, {
      team: formatTeamNumber(team),
      color: color,
      key: team
    });
  }), h("div", {
    class: style_score
  }, h("h2", null, "Score"), h("span", null, score)));
};

var match_Match = function Match(_ref2) {
  var eventId = _ref2.eventId,
      matchId = _ref2.matchId;
  return h(resolver, {
    data: {
      match: getMatch(eventId, matchId),
      event: getEvent(eventId)
    },
    render: function render(_ref3) {
      var match = _ref3.match,
          event = _ref3.event;
      var url = "/events/" + eventId + "/" + matchId;
      var eventName = event && event.shortName || eventId;
      var currentMatchIndex = event.matches.findIndex(function (_ref4) {
        var key = _ref4.key;
        return key === eventId + "_" + matchId;
      });
      var nextMatch = event.matches[currentMatchIndex + 1];
      var previousMatch = event.matches[currentMatchIndex - 1];
      var nextMatchKey = nextMatch && parseMatchKey(nextMatch.key).matchKey;
      var previousMatchKey = previousMatch && parseMatchKey(previousMatch.key).matchKey;
      return h("div", {
        class: style_match
      }, h(components_header, {
        title: matchId.toUpperCase() + " - " + eventName,
        back: "/events/" + eventId
      }), h("div", {
        class: matchName
      }, h("h2", null, formatMatchKey(matchId))), h("div", {
        class: matchTime
      }, h("h2", null, match ? formatTime(new Date(match.actualTime || match.predictedTime)) : 'Loading...'), h(components_button, {
        href: url + "/scout"
      }, "Scout")), match && h(match_Alliance, {
        score: match.redScore,
        color: "red",
        alliance: match.redAlliance,
        baseUrl: url
      }), match && h(match_Alliance, {
        score: match.blueScore,
        color: "blue",
        alliance: match.blueAlliance,
        baseUrl: url
      }), !match && h(components_spinner, null), h("div", {
        class: navbar
      }, previousMatchKey !== undefined ? h("a", {
        class: navigation,
        href: "/events/" + eventId + "/" + previousMatchKey,
        "data-disabled": previousMatchKey === undefined
      }, h(components_icon, {
        icon: "left"
      }), " Previous Match") : h("div", null), nextMatchKey !== undefined ? h("a", {
        class: navigation,
        href: "/events/" + eventId + "/" + nextMatchKey,
        "data-disabled": nextMatchKey === undefined
      }, "Next Match ", h(components_icon, {
        icon: "right"
      })) : h("div", null)));
    }
  });
};

/* harmony default export */ var routes_match = (match_Match);
// CONCATENATED MODULE: ./components/table/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var table_style = ({"table":"table-2bu7","statColumn":"statColumn-2fC_","note":"note-1qvW"});
const table = "table-2bu7";
const statColumn = "statColumn-2fC_";
const note = "note-1qvW";
// CONCATENATED MODULE: ./components/table/index.tsx
function table__inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var table_Table =
/*#__PURE__*/
function (_Component) {
  table__inheritsLoose(Table, _Component);

  function Table() {
    var _this;

    _this = _Component.call(this) || this;

    _this.sortBy = function (stat) {
      return function () {
        return _this.setState(function (state) {
          return {
            sortBy: stat,
            reversed: state.sortBy === stat ? !state.reversed : false
          };
        });
      };
    };

    _this.state = {
      sortBy: 'teamNumber',
      reversed: false
    };
    return _this;
  }

  var _proto = Table.prototype;

  _proto.render = function render(_ref, _ref2) {
    var _this2 = this;

    var analyses = _ref.analyses,
        schema = _ref.schema,
        eventKey = _ref.eventKey;
    var sortBy = _ref2.sortBy,
        reversed = _ref2.reversed;
    return h("div", {
      class: table
    }, h("table", null, h("tr", null, h("th", {
      key: "teamNumber",
      onClick: this.sortBy('teamNumber')
    }, h("div", null, h("span", null, sortBy === 'teamNumber' && (reversed ? ' ▲' : ' ▼'), "Team"))), schema && Object.keys(schema).map(function (stat) {
      return h("th", {
        key: stat,
        onClick: _this2.sortBy(stat)
      }, h("div", null, h("span", null, sortBy === stat && (reversed ? ' ▲' : ' ▼'), camelToTitle(stat))));
    }), h("th", {
      key: "notes"
    }, h("span", null, "Notes")), h("th", {
      key: "reports"
    }, h("span", null, "Reports"))), analyses.sort(function (a, b) {
      var v = sortBy === 'teamNumber' ? sortTeams(a.team, b.team) ? 1 : -1 : a.stats[sortBy] > b.stats[sortBy] ? 1 : -1;
      return reversed ? -v : v;
    }).map(function (analysis) {
      return h("tr", {
        key: analysis.team
      }, h("td", {
        key: "teamNumber"
      }, h("a", {
        href: "/events/" + eventKey + "/team/" + formatTeamNumber(analysis.team)
      }, formatTeamNumber(analysis.team))), schema && Object.keys(schema).map(function (stat) {
        var s = analysis.stats[stat];
        return h("td", {
          key: stat
        }, schema[stat] === 'number' ? toPrettyNumber(s) : toPercentage(s));
      }), h("td", {
        key: "notes"
      }, Object.keys(analysis.notes).map(function (key) {
        return h("span", {
          class: note
        }, analysis.notes[key]);
      })), h("td", {
        key: "reports"
      }, h("span", null, analysis.reports)));
    })));
  };

  return Table;
}(Component);

/* harmony default export */ var components_table = (table_Table);
// CONCATENATED MODULE: ./routes/analysis/alliance/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var alliance_style = ({"alliance-analysis":"alliance-analysis-1BX1","allianceAnalysis":"alliance-analysis-1BX1"});
const allianceAnalysis = "alliance-analysis-1BX1";
// CONCATENATED MODULE: ./routes/analysis/alliance/index.tsx









var alliance_AllianceAnalysis = function AllianceAnalysis(_ref) {
  var eventId = _ref.eventId,
      matchId = _ref.matchId,
      color = _ref.color;
  return h(resolver, {
    data: {
      data: getAllianceAnalysis(eventId, matchId, color),
      schema: getSchema()
    },
    render: function render(_ref2) {
      var data = _ref2.data,
          schema = _ref2.schema;
      return h("div", {
        class: allianceAnalysis
      }, h(components_header, {
        title: matchId.toUpperCase() + " - " + camelToTitle(color) + " Alliance",
        back: "/events/" + eventId + "/" + matchId
      }), !data ? h(components_spinner, null) : data.length === 0 ? h("p", null, "No reports have been submitted for this alliance yet.") : h(components_table, {
        eventKey: eventId,
        analyses: data,
        schema: schema
      }));
    }
  });
};

/* harmony default export */ var analysis_alliance = (alliance_AllianceAnalysis);
// CONCATENATED MODULE: ./routes/analysis/event/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var analysis_event_style = ({"event-analysis":"event-analysis-3t6x","eventAnalysis":"event-analysis-3t6x"});
const style_eventAnalysis = "event-analysis-3t6x";
// CONCATENATED MODULE: ./routes/analysis/event/index.tsx







var event_EventAnalysis = function EventAnalysis(_ref) {
  var eventId = _ref.eventId;
  return h(resolver, {
    data: {
      event: getEvent(eventId),
      eventAnalysis: getEventAnalysis(eventId),
      schema: getSchema()
    },
    render: function render(_ref2) {
      var event = _ref2.event,
          eventAnalysis = _ref2.eventAnalysis,
          schema = _ref2.schema;
      return h("div", {
        class: style_eventAnalysis
      }, h(components_header, {
        back: "/events/" + eventId,
        title: "Analysis - " + (event && event.shortName || eventId)
      }), schema && eventAnalysis && h(components_table, {
        eventKey: eventId,
        schema: schema,
        analyses: eventAnalysis
      }));
    }
  });
};

/* harmony default export */ var analysis_event = (event_EventAnalysis);
// CONCATENATED MODULE: ./components/chart/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var chart_style = ({"chart":"chart-2kOy","tooltip":"tooltip-11tB"});
const chart = "chart-2kOy";
const tooltip = "tooltip-11tB";
// CONCATENATED MODULE: ./components/chart/index.tsx




var chart_Chart = function Chart(_ref) {
  var reports = _ref.reports,
      stat = _ref.stat,
      fieldType = _ref.fieldType;
  var min = Math.min.apply(Math, reports.map(function (e) {
    return getNumber(e.stats[stat]);
  }));
  var max = Math.max.apply(Math, reports.map(function (e) {
    return getNumber(e.stats[stat]);
  }));

  if (max === min) {
    if (fieldType === 'bool') {
      if (max === 0) {
        return h("div", null, "Never");
      }

      if (max === 1) {
        return h("div", null, "Always");
      }
    }

    return h("div", null, min, " every match");
  }

  var lerpX = lerper(0, reports.length - 1, 20, 560);
  var lerpY = lerper(min, max, 475, 40);
  var textSize = lerp(640 / reports.length, 100, 34, 10, 8);
  return h("svg", {
    class: chart,
    viewBox: "0 0 640 480"
  }, h("polyline", {
    "stroke-width": "2",
    points: reports.map(function (report, i) {
      return lerpX(i) + "," + lerpY(getNumber(report.stats[stat]));
    }).join(' ')
  }), reports.map(function (report) {
    return h("text", {
      "text-anchor": "middle",
      x: "10",
      y: lerpY(getNumber(report.stats[stat]))
    }, getNumber(report.stats[stat]));
  }), "}}", h("line", {
    x1: "20",
    x2: "20",
    y1: "0",
    y2: "475",
    "stroke-width": "3"
  }), h("line", {
    x1: "20",
    x2: "640",
    y1: "475",
    y2: "475",
    "stroke-width": "3"
  }), reports.map(function (report, i) {
    return h("g", null, h("circle", {
      r: "4",
      stroke: "0.2",
      cx: lerpX(i),
      cy: lerpY(getNumber(report.stats[stat]))
    }), h("text", {
      class: tooltip,
      "font-size": textSize,
      x: lerpX(i),
      y: lerpY(getNumber(report.stats[stat])) - 7.5
    }, formatMatchKey(report.matchKey)));
  }));
};

/* harmony default export */ var components_chart = (chart_Chart);
// CONCATENATED MODULE: ./routes/analysis/team/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var team_style = ({"teamAnalysis":"teamAnalysis-1vha"});
const teamAnalysis = "teamAnalysis-1vha";
// CONCATENATED MODULE: ./routes/analysis/team/index.tsx









var team_TeamAnalysis = function TeamAnalysis(_ref) {
  var eventId = _ref.eventId,
      team = _ref.team;
  return h(resolver, {
    data: {
      event: getEvent(eventId),
      teamStats: getTeamStats(eventId, team),
      schema: getSchema()
    },
    render: function render(_ref2) {
      var event = _ref2.event,
          teamStats = _ref2.teamStats,
          schema = _ref2.schema;
      var sorted = teamStats === undefined ? [] : teamStats.sort(function (a, b) {
        return compareMatchKey(a.matchKey, b.matchKey);
      });
      return h("div", {
        class: teamAnalysis
      }, h(components_header, {
        back: "/events/" + eventId + "/analysis",
        title: team + " - " + (event && event.shortName || eventId)
      }), schema === undefined ? h(components_spinner, null) : h("div", null, Object.keys(schema).map(function (key) {
        return h("div", null, h("h1", null, camelToTitle(key)), teamStats === undefined || teamStats.length === 0 ? h(components_spinner, null) : h(components_chart, {
          reports: teamStats,
          stat: key,
          fieldType: schema[key]
        }));
      })));
    }
  });
};

/* harmony default export */ var analysis_team = (team_TeamAnalysis);
// CONCATENATED MODULE: ./routes/404/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var _04_style = ({"main404":"main404-15Ej"});
const main404 = "main404-15Ej";
// CONCATENATED MODULE: ./routes/404/index.tsx



var _04_Error404 = function Error404() {
  return h("div", {
    class: main404
  }, h("h1", null, "ERROR 404"), h("p", null, "The requested file could not be found."), h("video", {
    autoPlay: true,
    loop: true,
    type: "video/mp4",
    src: "/assets/videos/burning_robot_404.mp4"
  }));
};

/* harmony default export */ var _04 = (_04_Error404);
// CONCATENATED MODULE: ./components/number-picker/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var number_picker_style = ({"number-picker":"number-picker-3AFC","numberPicker":"number-picker-3AFC"});
const numberPicker = "number-picker-3AFC";
// CONCATENATED MODULE: ./components/number-picker/index.tsx
function number_picker__inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var number_picker_NumberPicker =
/*#__PURE__*/
function (_Component) {
  number_picker__inheritsLoose(NumberPicker, _Component);

  function NumberPicker(_ref) {
    var _this;

    var _ref$number = _ref.number,
        number = _ref$number === void 0 ? 0 : _ref$number;
    _this = _Component.call(this) || this;

    _this.increment = function () {
      _this.setState(function (state) {
        _this.props.onChange(++state.number);

        return state;
      });
    };

    _this.onInput = function (e) {
      var value = Number(e.target.value);

      _this.props.onChange(value);

      _this.setState({
        number: value
      });
    };

    _this.decrement = function () {
      _this.setState(function (state) {
        _this.props.onChange(--state.number);

        return state;
      });
    };

    _this.state = {
      number: number
    };
    return _this;
  }

  var _proto = NumberPicker.prototype;

  _proto.render = function render(_ref2, _ref3) {
    var id = _ref2.id,
        onChange = _ref2.onChange;
    var number = _ref3.number;
    return h("div", {
      class: numberPicker
    }, h("button", {
      onClick: this.decrement
    }, "-"), h(text_input, {
      type: "number",
      onInput: this.onInput,
      value: String(number)
    }), h("button", {
      onClick: this.increment
    }, "+"));
  };

  return NumberPicker;
}(Component);

/* harmony default export */ var number_picker = (number_picker_NumberPicker);
// CONCATENATED MODULE: ./components/team-picker/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var team_picker_style = ({"team-picker":"team-picker-2I0_","teamPicker":"team-picker-2I0_"});
const teamPicker = "team-picker-2I0_";
// CONCATENATED MODULE: ./components/team-picker/index.tsx




var team_picker_TeamPicker = function TeamPicker(_ref) {
  var _onChange = _ref.onChange,
      redAlliance = _ref.redAlliance,
      blueAlliance = _ref.blueAlliance,
      inputRef = _ref.inputRef;
  return h("label", {
    class: teamPicker
  }, h("span", null, "Team"), h("select", {
    ref: inputRef,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    }
  }, redAlliance.map(function (t) {
    return h("option", {
      value: t
    }, formatTeamNumber(t));
  }), blueAlliance.map(function (t) {
    return h("option", {
      value: t
    }, formatTeamNumber(t));
  })));
};

/* harmony default export */ var team_picker = (team_picker_TeamPicker);
// CONCATENATED MODULE: ./routes/scout/style.sss
// removed by extract-text-webpack-plugin
/* harmony default export */ var scout_style = ({"scout":"scout-1Lp-","scoutMain":"scoutMain-uIjf","fields":"fields-3DEg","notes":"notes-3UUZ"});
const scout = "scout-1Lp-";
const scoutMain = "scoutMain-uIjf";
const fields = "fields-3DEg";
const notes = "notes-3UUZ";
// CONCATENATED MODULE: ./routes/scout/index.tsx
function scout__inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }















var scout_Field = function Field(_ref) {
  var fieldType = _ref.fieldType,
      fieldName = _ref.fieldName,
      self = _ref.self;
  return h("label", {
    for: fieldName
  }, h("span", null, camelToTitle(fieldName.replace('auto', '').replace('teleop', ''))), fieldType === 'bool' ? h(components_toggle, {
    onChange: linkstate_es(self, "report." + fieldName, 'target.checked'),
    checked: self.state.report[fieldName],
    id: fieldName
  }) : fieldType === 'number' ? h(number_picker, {
    onChange: linkstate_es(self, "report." + fieldName),
    id: fieldName
  }) : h("div", null, "Unrecognized Field Type for ", fieldName));
};

var scout_Scout = function Scout(_ref2) {
  var eventId = _ref2.eventId,
      matchId = _ref2.matchId;

  if (!hasValidJWT()) {
    route("/login?back=/events/" + eventId + "/" + matchId + "/scout", true);
    return;
  }

  return h(resolver, {
    data: {
      event: getEvent(eventId),
      match: getMatch(eventId, matchId),
      schema: getSchema()
    },
    render:
    /*#__PURE__*/
    function (_Component) {
      scout__inheritsLoose(render, _Component);

      function render() {
        var _this;

        _this = _Component.call(this) || this;
        _this.teamPicker = null;

        _this.submit = function () {
          submitReport(_this.state.team || _this.teamPicker.value, eventId, matchId, _this.state.report, _this.state.notes !== '' ? _this.state.notes : undefined).then(function () {
            return route("/events/" + eventId + "/" + matchId);
          });
        };

        _this.changeTeam = function (team) {
          _this.setState({
            team: team
          });
        };

        _this.state = {
          report: {},
          team: '',
          notes: ''
        };
        return _this;
      }

      var _proto = render.prototype;

      _proto.render = function render(_ref3, _ref4) {
        var _this2 = this;

        var event = _ref3.event,
            match = _ref3.match,
            schema = _ref3.schema;
        var report = _ref4.report;
        var eventName = event && event.shortName || eventId;

        if (schema && Object.keys(report).length === 0) {
          this.setState(function (state) {
            Object.keys(schema).map(function (fieldName) {
              var fieldType = schema[fieldName];

              if (!state.report[fieldName]) {
                state.report[fieldName] = fieldType === 'bool' ? false : 0;
              }
            });
            return state;
          });
        }

        var sortedKeys = sortSchemaKeys(Object.keys(schema || []));
        return h("div", {
          class: scout
        }, h(components_header, {
          title: "Scout - " + matchId.toUpperCase() + " - " + eventName,
          back: "/events/" + eventId + "/" + matchId,
          verify: true
        }), h("div", {
          class: scoutMain
        }, match && h(team_picker, {
          onChange: this.changeTeam,
          redAlliance: match.redAlliance,
          blueAlliance: match.blueAlliance,
          inputRef: function inputRef(e) {
            return _this2.teamPicker = e;
          }
        }), ['auto', 'teleop', 'general'].map(function (sectionName) {
          return h("div", {
            class: fields
          }, h("h2", null, capitalize(sectionName)), sortedKeys[sectionName].map(function (fieldName) {
            return h(scout_Field, {
              fieldName: fieldName,
              fieldType: schema[fieldName],
              self: _this2
            });
          }));
        }), h(text_input, {
          placeholder: "Notes",
          value: this.state.notes,
          onInput: function onInput(e) {
            return _this2.setState(function (state) {
              state.notes = e.target.value;
              return state;
            });
          },
          className: notes
        }), h(components_button, {
          onClick: this.submit
        }, "Submit Report")));
      };

      return render;
    }(Component)
  });
};

/* harmony default export */ var routes_scout = (scout_Scout);
// CONCATENATED MODULE: ./components/app/index.tsx















var app_App = function App() {
  return h("div", {
    id: app
  }, h(preact_router_es_Router, null, h(Route, {
    path: "/",
    component: routes_home
  }), h(Route, {
    path: "/leaderboard",
    component: routes_leaderboard
  }), h(Route, {
    path: "/login",
    component: routes_login
  }), h(Route, {
    path: "/admin",
    component: routes_admin
  }), h(Route, {
    path: "/events/:eventId",
    component: routes_event
  }), h(Route, {
    path: "/events/:eventId/analysis",
    component: analysis_event
  }), h(Route, {
    path: "/events/:eventId/team/:team",
    component: analysis_team
  }), h(Route, {
    path: "/events/:eventId/:matchId",
    component: routes_match
  }), h(Route, {
    path: "/events/:eventId/:matchId/alliance/:color",
    component: analysis_alliance
  }), h(Route, {
    path: "/events/:eventId/:matchId/scout",
    component: routes_scout
  }), h(Route, {
    default: true,
    component: _04
  })));
};

/* harmony default export */ var components_app = (app_App);
// CONCATENATED MODULE: ./index.tsx
function index__asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }





preact_esm_render(h(components_app, null), document.body, document.getElementById('app'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error);
}

var syncRequests =
/*#__PURE__*/
function () {
  var _ref = index__asyncToGenerator(function* () {
    var requests = yield idb_keyval.get('cachedRequests');

    if (requests !== undefined) {
      yield Promise.all(requests.map(function (re) {
        return api_queryAPI(re.path, re.method, re.body);
      }));
    }

    yield idb_keyval.set('cachedRequests', []);
  });

  return function syncRequests() {
    return _ref.apply(this, arguments);
  };
}();

if (navigator.onLine) {
  syncRequests();
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ })
/******/ ]);
//# sourceMappingURL=scripts.js.map