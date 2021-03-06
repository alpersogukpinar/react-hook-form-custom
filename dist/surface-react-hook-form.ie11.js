'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var iterators = {};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var isPure = true;

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode:  'pure' ,
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f$1
};

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$2
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var path = {};

var aFunction = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return NativeConstructor.apply(this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global_1);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var aFunction$1 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var html = getBuiltIn('document', 'documentElement');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

var defineProperty = objectDefineProperty.f;





var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!has(target, TO_STRING_TAG$2)) {
      defineProperty(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !toStringTagSupport) {
      createNonEnumerableProperty(target, 'toString', objectToString);
    }
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var redefine = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
};

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$1 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      iterators[TO_STRING_TAG] = returnThis$1;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if (( FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
  }
  iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
iterators.Arguments = iterators.Array;

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG$3) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
  }
  iterators[COLLECTION_NAME] = iterators.Array;
}

var entryVirtual = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

var values = entryVirtual('Array').values;

var values$1 = values;

var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

var values_1 = function (it) {
  var own = it.values;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.values)
    // eslint-disable-next-line no-prototype-builtins
    || DOMIterables.hasOwnProperty(classof(it)) ? values$1 : own;
};

var values$2 = values_1;

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process$1 = global_1.process;
var versions = process$1 && process$1.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var defineProperty$1 = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty$1(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

var $filter = arrayIteration.filter;



var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var filter = entryVirtual('Array').filter;

var ArrayPrototype$1 = Array.prototype;

var filter_1 = function (it) {
  var own = it.filter;
  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.filter) ? filter : own;
};

var filter$1 = filter_1;

var filter$2 = filter$1;

var $find = arrayIteration.find;



var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH$1 = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
_export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$1 }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var find = entryVirtual('Array').find;

var ArrayPrototype$2 = Array.prototype;

var find_1 = function (it) {
  var own = it.find;
  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.find) ? find : own;
};

var find$1 = find_1;

var find$2 = find$1;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$2 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$2(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$2(true)
};

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $reduce = arrayReduce.left;



var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH$2 = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH$2 }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var reduce = entryVirtual('Array').reduce;

var ArrayPrototype$3 = Array.prototype;

var reduce_1 = function (it) {
  var own = it.reduce;
  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.reduce) ? reduce : own;
};

var reduce$1 = reduce_1;

var reduce$2 = reduce$1;

var propertyIsEnumerable = objectPropertyIsEnumerable.f;

// `Object.{ entries, values }` methods implementation
var createMethod$3 = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!descriptors || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod$3(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod$3(false)
};

var $values = objectToArray.values;

// `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values
_export({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

var values$3 = path.Object.values;

var values$4 = values$3;

var values$5 = values$4;

var $every = arrayIteration.every;



var STRICT_METHOD$1 = arrayMethodIsStrict('every');
var USES_TO_LENGTH$3 = arrayMethodUsesToLength('every');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$3 }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var every = entryVirtual('Array').every;

var ArrayPrototype$4 = Array.prototype;

var every_1 = function (it) {
  var own = it.every;
  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.every) ? every : own;
};

var every$1 = every_1;

var every$2 = every$1;

var $map = arrayIteration.map;



var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH$4 = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$4 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var map = entryVirtual('Array').map;

var ArrayPrototype$5 = Array.prototype;

var map_1 = function (it) {
  var own = it.map;
  return it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.map) ? map : own;
};

var map$1 = map_1;

var map$2 = map$1;

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$4 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$4(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$4(true)
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$1(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$1(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

var nativePromiseConstructor = global_1.Promise;

var redefineAll = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else redefine(target, key, src[key], options);
  } return target;
};

var SPECIES$2 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$2]) {
    defineProperty(Constructor, SPECIES$2, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var ITERATOR$2 = wellKnownSymbol('iterator');
var ArrayPrototype$6 = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype$6[ITERATOR$2] === it);
};

var ITERATOR$3 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3]
    || it['@@iterator']
    || iterators[classof(it)];
};

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var iterate_1 = createCommonjsModule(function (module) {
var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};
});

var ITERATOR$4 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$4] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$4] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var SPECIES$3 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction(S);
};

var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

var location = global_1.location;
var set$1 = global_1.setImmediate;
var clear = global_1.clearImmediate;
var process$2 = global_1.process;
var MessageChannel = global_1.MessageChannel;
var Dispatch = global_1.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global_1.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set$1 || !clear) {
  set$1 = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classofRaw(process$2) == 'process') {
    defer = function (id) {
      process$2.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !engineIsIos) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = functionBindContext(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
    defer = post;
    global_1.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
    defer = function (id) {
      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task = {
  set: set$1,
  clear: clear
};

var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

var macrotask = task.set;


var MutationObserver$1 = global_1.MutationObserver || global_1.WebKitMutationObserver;
var process$3 = global_1.process;
var Promise$1 = global_1.Promise;
var IS_NODE = classofRaw(process$3) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process$3.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process$3.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver$1 && !engineIsIos) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver$1(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global_1, flush);
    };
  }
}

var microtask = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
var f$3 = function (C) {
  return new PromiseCapability(C);
};

var newPromiseCapability = {
	f: f$3
};

var promiseResolve = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var hostReportErrors = function (a, b) {
  var console = global_1.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var task$1 = task.set;










var SPECIES$4 = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState$2 = internalState.get;
var setInternalState$2 = internalState.set;
var getInternalPromiseState = internalState.getterFor(PROMISE);
var PromiseConstructor = nativePromiseConstructor;
var TypeError$1 = global_1.TypeError;
var document$2 = global_1.document;
var process$4 = global_1.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability$1 = newPromiseCapability.f;
var newGenericPromiseCapability = newPromiseCapability$1;
var IS_NODE$1 = classofRaw(process$4) == 'process';
var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper;

var FORCED = isForced_1(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (engineV8Version === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if ( !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$4] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify$1 = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$2.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global_1.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global_1['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE$1) {
          process$4.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task$1.call(global_1, function () {
    if (IS_NODE$1) {
      process$4.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify$1(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify$1(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState$2(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState$2(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE$1 ? process$4.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify$1(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState$2(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
_export({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability$1(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

_export({ target: PROMISE, stat: true, forced: isPure  }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve( this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate_1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate_1(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

// `Promise.allSettled` method
// https://github.com/tc39/proposal-promise-allSettled
_export({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapability.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate_1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (e) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: e };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
  nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
_export({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

var promise$1 = path.Promise;

var promise$2 = promise$1;

var promise$3 = promise$2;

var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

var keys$1 = path.Object.keys;

var keys$2 = keys$1;

var keys$3 = keys$2;

var $indexOf = arrayIncludes.indexOf;



var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$2 || !USES_TO_LENGTH$5 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var indexOf$1 = entryVirtual('Array').indexOf;

var ArrayPrototype$7 = Array.prototype;

var indexOf_1 = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype$7 || (it instanceof Array && own === ArrayPrototype$7.indexOf) ? indexOf$1 : own;
};

var indexOf$2 = indexOf_1;

var indexOf$3 = indexOf$2;

var $includes = arrayIncludes.includes;



var USES_TO_LENGTH$6 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
_export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$6 }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var includes = entryVirtual('Array').includes;

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

var MATCH$1 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$1] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var includes$1 = entryVirtual('String').includes;

var ArrayPrototype$8 = Array.prototype;
var StringPrototype = String.prototype;

var includes$2 = function (it) {
  var own = it.includes;
  if (it === ArrayPrototype$8 || (it instanceof Array && own === ArrayPrototype$8.includes)) return includes;
  if (typeof it === 'string' || it === StringPrototype || (it instanceof String && own === StringPrototype.includes)) {
    return includes$1;
  } return own;
};

var includes$3 = includes$2;

var includes$4 = includes$3;

var $forEach = arrayIteration.forEach;



var STRICT_METHOD$3 = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH$7 = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
var arrayForEach = (!STRICT_METHOD$3 || !USES_TO_LENGTH$7) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
  forEach: arrayForEach
});

var forEach = entryVirtual('Array').forEach;

var forEach$1 = forEach;

var ArrayPrototype$9 = Array.prototype;

var DOMIterables$1 = {
  DOMTokenList: true,
  NodeList: true
};

var forEach_1 = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype$9 || (it instanceof Array && own === ArrayPrototype$9.forEach)
    // eslint-disable-next-line no-prototype-builtins
    || DOMIterables$1.hasOwnProperty(classof(it)) ? forEach$1 : own;
};

var forEach$2 = forEach_1;

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
var defineProperty = objectDefineProperty.f;



var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;
});
var internalMetadata_1 = internalMetadata.REQUIRED;
var internalMetadata_2 = internalMetadata.fastKey;
var internalMetadata_3 = internalMetadata.getWeakData;
var internalMetadata_4 = internalMetadata.onFreeze;

var defineProperty$2 = objectDefineProperty.f;
var forEach$3 = arrayIteration.forEach;



var setInternalState$3 = internalState.set;
var internalStateGetterFor = internalState.getterFor;

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var exported = {};
  var Constructor;

  if (!descriptors || typeof NativeConstructor != 'function'
    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
  ) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else {
    Constructor = wrapper(function (target, iterable) {
      setInternalState$3(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
        type: CONSTRUCTOR_NAME,
        collection: new NativeConstructor()
      });
      if (iterable != undefined) iterate_1(iterable, target[ADDER], target, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    forEach$3(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
        createNonEnumerableProperty(Constructor.prototype, KEY, function (a, b) {
          var collection = getInternalState(this).collection;
          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
          var result = collection[KEY](a === 0 ? 0 : a, b);
          return IS_ADDER ? this : result;
        });
      }
    });

    IS_WEAK || defineProperty$2(Constructor.prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).collection.size;
      }
    });
  }

  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({ global: true, forced: true }, exported);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var defineProperty$3 = objectDefineProperty.f;








var fastKey = internalMetadata.fastKey;


var setInternalState$4 = internalState.set;
var internalStateGetterFor$1 = internalState.getterFor;

var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$4(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!descriptors) that.size = 0;
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (descriptors) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (descriptors) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (descriptors) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (descriptors) defineProperty$3(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$4(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
var es_set = collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var set$2 = path.Set;

var set$3 = set$2;

var set$4 = set$3;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var isUndefined = (function (val) {
  return val === undefined;
});

var isNullOrUndefined = (function (value) {
  return value === null || isUndefined(value);
});

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
_export({ target: 'Array', stat: true }, {
  isArray: isArray
});

var isArray$1 = path.Array.isArray;

var isArray$2 = isArray$1;

var isArray$3 = isArray$2;

var isArray$4 = (function (value) {
  return isArray$3(value);
});

var isObjectType = function (value) {
  return typeof value === 'object';
};
var isObject$1 = (function (value) {
  return !isNullOrUndefined(value) && !isArray$4(value) && isObjectType(value);
});

var isHTMLElement = (function (value) {
  return isObject$1(value) && value.nodeType === Node.ELEMENT_NODE;
});

var VALIDATION_MODE = {
  onBlur: 'onBlur',
  onChange: 'onChange',
  onSubmit: 'onSubmit'
};
var VALUE = 'value';
var UNDEFINED = 'undefined';
var EVENTS = {
  BLUR: 'blur',
  CHANGE: 'change',
  INPUT: 'input'
};
var INPUT_VALIDATION_RULES = {
  max: 'max',
  min: 'min',
  maxLength: 'maxLength',
  minLength: 'minLength',
  pattern: 'pattern',
  required: 'required',
  validate: 'validate'
};
var REGEX_IS_DEEP_PROP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var REGEX_IS_PLAIN_PROP = /^\w*$/;
var REGEX_PROP_NAME = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var REGEX_ESCAPE_CHAR = /\\(\\)?/g;

function attachEventListeners(_a) {
  var field = _a.field,
      handleChange = _a.handleChange,
      isRadioOrCheckbox = _a.isRadioOrCheckbox;
  var ref = field.ref;

  if (isHTMLElement(ref) && ref.addEventListener && handleChange) {
    ref.addEventListener(isRadioOrCheckbox ? EVENTS.CHANGE : EVENTS.INPUT, handleChange);
    ref.addEventListener(EVENTS.BLUR, handleChange);
  }
}

var $entries = objectToArray.entries;

// `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries
_export({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

var entries = path.Object.entries;

var entries$1 = entries;

var entries$2 = entries$1;

var isKey = (function (value) {
  return !isArray$4(value) && (REGEX_IS_PLAIN_PROP.test(value) || !REGEX_IS_DEEP_PROP.test(value));
});

var stringToPath = (function (string) {
  var result = [];
  string.replace(REGEX_PROP_NAME, function (match, number, quote, string) {
    result.push(quote ? string.replace(REGEX_ESCAPE_CHAR, '$1') : number || match);
  });
  return result;
});

function set$5(object, path, value) {
  var index = -1;
  var tempPath = isKey(path) ? [path] : stringToPath(path);
  var length = tempPath.length;
  var lastIndex = length - 1;

  while (++index < length) {
    var key = tempPath[index];
    var newValue = value;

    if (index !== lastIndex) {
      var objValue = object[key];
      newValue = isObject$1(objValue) || isArray$4(objValue) ? objValue : !isNaN(tempPath[index + 1]) ? [] : {};
    }

    object[key] = newValue;
    object = object[key];
  }

  return object;
}

var transformToNestObject = (function (data) {
  var _context;

  return reduce$2(_context = entries$2(data)).call(_context, function (previous, _a) {
    var _b;

    var _c = __read(_a, 2),
        key = _c[0],
        value = _c[1];

    if (!isKey(key)) {
      set$5(previous, key, value);
      return previous;
    }

    return __assign(__assign({}, previous), (_b = {}, _b[key] = value, _b));
  }, {});
});

var get$1 = (function (obj, path, defaultValue) {
  var _context, _context2;

  var result = reduce$2(_context = filter$2(_context2 = path.split(/[,[\].]+?/)).call(_context2, Boolean)).call(_context, function (result, key) {
    return isNullOrUndefined(result) ? result : result[key];
  }, obj);

  return isUndefined(result) || result === obj ? obj[path] || defaultValue : result;
});

var focusErrorField = (function (fields, fieldErrors) {
  for (var key in fields) {
    if (get$1(fieldErrors, key)) {
      var field = fields[key];

      if (field) {
        if (isHTMLElement(field.ref) && field.ref.focus) {
          field.ref.focus();
          break;
        } else if (field.options) {
          field.options[0].ref.focus();
          break;
        }
      }
    }
  }
});

var removeAllEventListeners = (function (ref, validateWithStateUpdate) {
  if (isHTMLElement(ref) && ref.removeEventListener) {
    ref.removeEventListener(EVENTS.INPUT, validateWithStateUpdate);
    ref.removeEventListener(EVENTS.CHANGE, validateWithStateUpdate);
    ref.removeEventListener(EVENTS.BLUR, validateWithStateUpdate);
  }
});

var isRadioInput = (function (element) {
  return !!element && element.type === 'radio';
});

var isCheckBoxInput = (function (element) {
  return !!element && element.type === 'checkbox';
});

function isDetached(element) {
  if (!element) {
    return true;
  }

  if (!(element instanceof HTMLElement) || element.nodeType === Node.DOCUMENT_NODE) {
    return false;
  }

  return isDetached(element.parentNode);
}

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH$8 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES$5 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$8 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$5];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var slice = entryVirtual('Array').slice;

var ArrayPrototype$a = Array.prototype;

var slice_1 = function (it) {
  var own = it.slice;
  return it === ArrayPrototype$a || (it instanceof Array && own === ArrayPrototype$a.slice) ? slice : own;
};

var slice$1 = slice_1;

var slice$2 = slice$1;

var isEmptyObject = (function (value) {
  return isObject$1(value) && !keys$3(value).length;
});

function castPath(value) {
  return isArray$4(value) ? value : stringToPath(value);
}

function baseGet(object, path) {
  var updatePath = isKey(path) ? [path] : castPath(path);
  var length = path.length;
  var index = 0;

  while (index < length) {
    object = isUndefined(object) ? index++ : object[updatePath[index++]];
  }

  return index == length ? object : undefined;
}

function baseSlice(array, start, end) {
  var index = -1;
  var length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end > length ? length : end;

  if (end < 0) {
    end += length;
  }

  length = start > end ? 0 : end - start;
  var result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

function parent(object, path) {
  return path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
}

function baseUnset(object, path) {
  var updatePath = isKey(path) ? [path] : castPath(path);
  var childObject = parent(object, updatePath);
  var key = updatePath[updatePath.length - 1];
  var result = !(childObject != null) || delete childObject[key];
  var previousObjRef = undefined;

  for (var k = 0; k < slice$2(updatePath).call(updatePath, 0, -1).length; k++) {
    var index = -1;
    var objectRef = undefined;

    var currentPaths = slice$2(updatePath).call(updatePath, 0, -(k + 1));

    var currentPathsLength = currentPaths.length - 1;

    if (k > 0) {
      previousObjRef = object;
    }

    while (++index < currentPaths.length) {
      var item = currentPaths[index];
      objectRef = objectRef ? objectRef[item] : object[item];

      if (currentPathsLength === index) {
        if (isObject$1(objectRef) && isEmptyObject(objectRef)) {
          previousObjRef ? delete previousObjRef[item] : delete object[item];
        } else if (isArray$4(objectRef) && !filter$2(objectRef).call(objectRef, function (data) {
          return isObject$1(data) && !isEmptyObject(data);
        }).length) {
          if (previousObjRef) {
            delete previousObjRef[item];
          }
        }
      }

      previousObjRef = objectRef;
    }
  }

  return result;
}

function unset(object, paths) {
  forEach$2(paths).call(paths, function (path) {
    baseUnset(object, path);
  });

  return object;
}

function findRemovedFieldAndRemoveListener(fields, handleChange, field, forceDelete) {
  if (!field) {
    return;
  }

  var ref = field.ref,
      _a = field.ref,
      name = _a.name,
      type = _a.type,
      mutationWatcher = field.mutationWatcher;

  if (!type) {
    delete fields[name];
    return;
  }

  var fieldValue = fields[name];

  if ((isRadioInput(ref) || isCheckBoxInput(ref)) && fieldValue) {
    var options_1 = fieldValue.options;

    if (isArray$4(options_1) && options_1.length) {
      var _context;

      forEach$2(_context = filter$2(options_1).call(options_1, Boolean)).call(_context, function (_a, index) {
        var ref = _a.ref,
            mutationWatcher = _a.mutationWatcher;

        if (ref && isDetached(ref) || forceDelete) {
          removeAllEventListeners(ref, handleChange);

          if (mutationWatcher) {
            mutationWatcher.disconnect();
          }

          unset(options_1, ["[" + index + "]"]);
        }
      });

      if (options_1 && !filter$2(options_1).call(options_1, Boolean).length) {
        delete fields[name];
      }
    } else {
      delete fields[name];
    }
  } else if (isDetached(ref) || forceDelete) {
    removeAllEventListeners(ref, handleChange);

    if (mutationWatcher) {
      mutationWatcher.disconnect();
    }

    delete fields[name];
  }
}

var nativeStartsWith = ''.startsWith;
var min$2 = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith');

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
_export({ target: 'String', proto: true, forced:  !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = String(requireObjectCoercible(this));
    notARegexp(searchString);
    var index = toLength(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

var startsWith = entryVirtual('String').startsWith;

var StringPrototype$1 = String.prototype;

var startsWith_1 = function (it) {
  var own = it.startsWith;
  return typeof it === 'string' || it === StringPrototype$1
    || (it instanceof String && own === StringPrototype$1.startsWith) ? startsWith : own;
};

var startsWith$1 = startsWith_1;

var startsWith$2 = startsWith$1;

var defaultReturn = {
  isValid: false,
  value: ''
};
var getRadioValue = (function (options) {
  var _context;

  return isArray$4(options) ? reduce$2(_context = filter$2(options).call(options, Boolean)).call(_context, function (previous, _a) {
    var _b = _a.ref,
        checked = _b.checked,
        value = _b.value;
    return checked ? {
      isValid: true,
      value: value
    } : previous;
  }, defaultReturn) : defaultReturn;
});

var getMultipleSelectValue = (function (options) {
  var _context, _context2;

  return map$2(_context = filter$2(_context2 = __spread(options)).call(_context2, function (_a) {
    var selected = _a.selected;
    return selected;
  })).call(_context, function (_a) {
    var value = _a.value;
    return value;
  });
});

var isFileInput = (function (element) {
  return !!element && element.type === 'file';
});

var isMultipleSelect = (function (element) {
  return !!element && element.type === 'select-multiple';
});

var isEmptyString = (function (value) {
  return value === '';
});

var defaultResult = {
  value: false,
  isValid: false
};
var validResult = {
  value: true,
  isValid: true
};
var getCheckboxValue = (function (options) {
  if (isArray$4(options)) {
    if (options.length > 1) {
      var _context;

      var values = map$2(_context = filter$2(options).call(options, function (_a) {
        var checked = _a.ref.checked;
        return checked;
      })).call(_context, function (_a) {
        var value = _a.ref.value;
        return value;
      });

      return {
        value: values,
        isValid: !!values.length
      };
    }

    var _a = options[0].ref,
        checked = _a.checked,
        value = _a.value,
        attributes = _a.attributes;
    return checked ? attributes && !isUndefined(attributes.value) ? isUndefined(value) || isEmptyString(value) ? validResult : {
      value: value,
      isValid: true
    } : validResult : defaultResult;
  }

  return defaultResult;
});

function getFieldValue(fields, ref) {
  var name = ref.name,
      value = ref.value;
  var field = fields[name];

  if (isFileInput(ref)) {
    return ref.files;
  }

  if (isRadioInput(ref)) {
    return field ? getRadioValue(field.options).value : '';
  }

  if (isMultipleSelect(ref)) {
    return getMultipleSelectValue(ref.options);
  }

  if (isCheckBoxInput(ref)) {
    return field ? getCheckboxValue(field.options).value : false;
  }

  return value;
}

var isString = (function (value) {
  return typeof value === 'string';
});

var getFieldsValues = (function (fields, search) {
  var output = {};
  var isSearchString = isString(search);
  var isSearchArray = isArray$4(search);
  var isNest = search && search.nest;

  var _loop_1 = function (name_1) {
    if (isUndefined(search) || isNest || isSearchString && startsWith$2(name_1).call(name_1, search) || isSearchArray && find$2(search).call(search, function (data) {
      return startsWith$2(name_1).call(name_1, data);
    })) {
      output[name_1] = getFieldValue(fields, fields[name_1].ref);
    }
  };

  for (var name_1 in fields) {
    _loop_1(name_1);
  }

  return output;
});

var compareObject = (function (objectA, objectB) {
  var _context;

  if (objectA === void 0) {
    objectA = {};
  }

  if (objectB === void 0) {
    objectB = {};
  }

  return reduce$2(_context = entries$2(objectA)).call(_context, function (previous, _a) {
    var _b = __read(_a, 2),
        key = _b[0],
        value = _b[1];

    return previous ? objectB[key] && objectB[key] === value : false;
  }, true);
});

var isSameError = (function (error, _a) {
  var type = _a.type,
      types = _a.types,
      message = _a.message;
  return isObject$1(error) && error.type === type && error.message === message && compareObject(error.types, types);
});

function shouldUpdateWithError(_a) {
  var errors = _a.errors,
      name = _a.name,
      error = _a.error,
      validFields = _a.validFields,
      fieldsWithValidation = _a.fieldsWithValidation;
  var isFieldValid = isEmptyObject(error);
  var isFormValid = isEmptyObject(errors);
  var currentFieldError = get$1(error, name);
  var existFieldError = get$1(errors, name);

  if (isFieldValid && validFields.has(name) || existFieldError && existFieldError.isManual) {
    return false;
  }

  if (isFormValid !== isFieldValid || !isFormValid && !existFieldError || isFieldValid && fieldsWithValidation.has(name) && !validFields.has(name)) {
    return true;
  }

  return currentFieldError && !isSameError(existFieldError, currentFieldError);
}

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$5 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$5(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$5(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$5(3)
};

var trim = stringTrim.trim;


var $parseFloat = global_1.parseFloat;
var FORCED$1 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
var numberParseFloat = FORCED$1 ? function parseFloat(string) {
  var trimmedString = trim(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
_export({ global: true, forced: parseFloat != numberParseFloat }, {
  parseFloat: numberParseFloat
});

var _parseFloat = path.parseFloat;

var _parseFloat$1 = _parseFloat;

var _parseFloat$2 = _parseFloat$1;

var slice$3 = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
var functionBind = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice$3.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice$3.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
_export({ target: 'Function', proto: true }, {
  bind: functionBind
});

var bind$1 = entryVirtual('Function').bind;

var FunctionPrototype = Function.prototype;

var bind_1 = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind$1 : own;
};

var bind$2 = bind_1;

var bind$3 = bind$2;

var isRegex = (function (value) {
  return value instanceof RegExp;
});

var getValueAndMessage = (function (validationData) {
  var isValueMessage = function (value) {
    return isObject$1(value) && !isRegex(value);
  };

  return isValueMessage(validationData) ? validationData : {
    value: validationData,
    message: ''
  };
});

var isFunction = (function (value) {
  return typeof value === 'function';
});

var isBoolean = (function (value) {
  return typeof value === 'boolean';
});

var isMessage = (function (value) {
  return isString(value) || isObject$1(value) && React.isValidElement(value);
});

function getValidateError(result, ref, type) {
  if (type === void 0) {
    type = 'validate';
  }

  if (isMessage(result) || isBoolean(result) && !result) {
    var message = isMessage(result) ? result : '';
    return {
      type: type,
      message: message,
      ref: ref
    };
  }
}

var appendErrors = (function (name, validateAllFieldCriteria, errors, type, message) {
  var _a;

  if (!validateAllFieldCriteria) {
    return {};
  }

  var error = errors[name];
  return __assign(__assign({}, error), {
    types: __assign(__assign({}, error && error.types ? error.types : {}), (_a = {}, _a[type] = message || true, _a))
  });
});

var validateField = (function (fieldsRef, validateAllFieldCriteria, _a) {
  var ref = _a.ref,
      _b = _a.ref,
      type = _b.type,
      value = _b.value,
      name = _b.name,
      options = _a.options,
      required = _a.required,
      maxLength = _a.maxLength,
      minLength = _a.minLength,
      min = _a.min,
      max = _a.max,
      pattern = _a.pattern,
      validate = _a.validate;
  return __awaiter(void 0, void 0, void 0, function () {
    var fields, error, isRadio, isCheckBox, isRadioOrCheckbox, isEmpty, appendErrorsCurry, getMinMaxMessage, _c, requiredValue, requiredMessage, exceedMax, exceedMin, _d, maxValue, maxMessage, _e, minValue, minMessage, valueNumber, valueDate, _f, maxLengthValue, maxLengthMessage, _g, minLengthValue, minLengthMessage, inputLength, exceedMax, exceedMin, _h, patternValue, patternMessage, fieldValue, validateRef, result, validateError, validationResult, _j, _k, _l, key, validateFunction, validateResult, validateError, e_1_1;

    var e_1, _m;

    return __generator(this, function (_o) {
      switch (_o.label) {
        case 0:
          fields = fieldsRef.current;
          error = {};
          isRadio = isRadioInput(ref);
          isCheckBox = isCheckBoxInput(ref);
          isRadioOrCheckbox = isRadio || isCheckBox;
          isEmpty = isEmptyString(value);
          appendErrorsCurry = bind$3(appendErrors).call(appendErrors, null, name, validateAllFieldCriteria, error);

          getMinMaxMessage = function (exceedMax, maxLengthMessage, minLengthMessage, maxType, minType) {
            if (maxType === void 0) {
              maxType = INPUT_VALIDATION_RULES.maxLength;
            }

            if (minType === void 0) {
              minType = INPUT_VALIDATION_RULES.minLength;
            }

            var message = exceedMax ? maxLengthMessage : minLengthMessage;
            error[name] = __assign({
              type: exceedMax ? maxType : minType,
              message: message,
              ref: ref
            }, exceedMax ? appendErrorsCurry(maxType, message) : appendErrorsCurry(minType, message));

            if (!validateAllFieldCriteria) {
              return error;
            }
          };

          if (required && (!isRadio && !isCheckBox && (isEmpty || isNullOrUndefined(value)) || isBoolean(value) && !value || isCheckBox && !getCheckboxValue(options).isValid || isRadio && !getRadioValue(options).isValid)) {
            _c = isMessage(required) ? {
              value: !!required,
              message: required
            } : getValueAndMessage(required), requiredValue = _c.value, requiredMessage = _c.message;

            if (requiredValue) {
              error[name] = __assign({
                type: INPUT_VALIDATION_RULES.required,
                message: requiredMessage,
                ref: isRadioOrCheckbox ? fields[name].options[0].ref : ref
              }, appendErrorsCurry(INPUT_VALIDATION_RULES.required, requiredMessage));

              if (!validateAllFieldCriteria) {
                return [2
                /*return*/
                , error];
              }
            }
          }

          if (!isNullOrUndefined(min) || !isNullOrUndefined(max)) {
            exceedMax = void 0;
            exceedMin = void 0;
            _d = getValueAndMessage(max), maxValue = _d.value, maxMessage = _d.message;
            _e = getValueAndMessage(min), minValue = _e.value, minMessage = _e.message;

            if (type === 'number' || !type && !isNaN(value)) {
              valueNumber = ref.valueAsNumber || _parseFloat$2(value);

              if (!isNullOrUndefined(maxValue)) {
                exceedMax = valueNumber > maxValue;
              }

              if (!isNullOrUndefined(minValue)) {
                exceedMin = valueNumber < minValue;
              }
            } else {
              valueDate = ref.valueAsDate || new Date(value);

              if (isString(maxValue)) {
                exceedMax = valueDate > new Date(maxValue);
              }

              if (isString(minValue)) {
                exceedMin = valueDate < new Date(minValue);
              }
            }

            if (exceedMax || exceedMin) {
              getMinMaxMessage(!!exceedMax, maxMessage, minMessage, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);

              if (!validateAllFieldCriteria) {
                return [2
                /*return*/
                , error];
              }
            }
          }

          if (isString(value) && !isEmpty && (maxLength || minLength)) {
            _f = getValueAndMessage(maxLength), maxLengthValue = _f.value, maxLengthMessage = _f.message;
            _g = getValueAndMessage(minLength), minLengthValue = _g.value, minLengthMessage = _g.message;
            inputLength = value.toString().length;
            exceedMax = !isNullOrUndefined(maxLengthValue) && inputLength > maxLengthValue;
            exceedMin = !isNullOrUndefined(minLengthValue) && inputLength < minLengthValue;

            if (exceedMax || exceedMin) {
              getMinMaxMessage(!!exceedMax, maxLengthMessage, minLengthMessage);

              if (!validateAllFieldCriteria) {
                return [2
                /*return*/
                , error];
              }
            }
          }

          if (pattern && !isEmpty) {
            _h = getValueAndMessage(pattern), patternValue = _h.value, patternMessage = _h.message;

            if (isRegex(patternValue) && !patternValue.test(value)) {
              error[name] = __assign({
                type: INPUT_VALIDATION_RULES.pattern,
                message: patternMessage,
                ref: ref
              }, appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, patternMessage));

              if (!validateAllFieldCriteria) {
                return [2
                /*return*/
                , error];
              }
            }
          }

          if (!validate) return [3
          /*break*/
          , 11];
          fieldValue = getFieldValue(fields, ref);
          validateRef = isRadioOrCheckbox && options ? options[0].ref : ref;
          if (!isFunction(validate)) return [3
          /*break*/
          , 2];
          return [4
          /*yield*/
          , validate(fieldValue)];

        case 1:
          result = _o.sent();
          validateError = getValidateError(result, validateRef);

          if (validateError) {
            error[name] = __assign(__assign({}, validateError), appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message));

            if (!validateAllFieldCriteria) {
              return [2
              /*return*/
              , error];
            }
          }

          return [3
          /*break*/
          , 11];

        case 2:
          if (!isObject$1(validate)) return [3
          /*break*/
          , 11];
          validationResult = {};
          _o.label = 3;

        case 3:
          _o.trys.push([3, 8, 9, 10]);

          _j = __values(entries$2(validate)), _k = _j.next();
          _o.label = 4;

        case 4:
          if (!!_k.done) return [3
          /*break*/
          , 7];
          _l = __read(_k.value, 2), key = _l[0], validateFunction = _l[1];

          if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
            return [3
            /*break*/
            , 7];
          }

          return [4
          /*yield*/
          , validateFunction(fieldValue)];

        case 5:
          validateResult = _o.sent();
          validateError = getValidateError(validateResult, validateRef, key);

          if (validateError) {
            validationResult = __assign(__assign({}, validateError), appendErrorsCurry(key, validateError.message));

            if (validateAllFieldCriteria) {
              error[name] = validationResult;
            }
          }

          _o.label = 6;

        case 6:
          _k = _j.next();
          return [3
          /*break*/
          , 4];

        case 7:
          return [3
          /*break*/
          , 10];

        case 8:
          e_1_1 = _o.sent();
          e_1 = {
            error: e_1_1
          };
          return [3
          /*break*/
          , 10];

        case 9:
          try {
            if (_k && !_k.done && (_m = _j.return)) _m.call(_j);
          } finally {
            if (e_1) throw e_1.error;
          }

          return [7
          /*endfinally*/
          ];

        case 10:
          if (!isEmptyObject(validationResult)) {
            error[name] = __assign({
              ref: validateRef
            }, validationResult);

            if (!validateAllFieldCriteria) {
              return [2
              /*return*/
              , error];
            }
          }

          _o.label = 11;

        case 11:
          return [2
          /*return*/
          , error];
      }
    });
  });
});

var parseErrorSchema = function (error, validateAllFieldCriteria) {
  var _context;

  var _a;

  return isArray$4(error.inner) ? reduce$2(_context = error.inner).call(_context, function (previous, _a) {
    var _b, _c, _d;

    var path = _a.path,
        message = _a.message,
        type = _a.type;
    return __assign(__assign({}, previous), previous[path] && validateAllFieldCriteria ? (_b = {}, _b[path] = appendErrors(path, validateAllFieldCriteria, previous, type, message), _b) : (_c = {}, _c[path] = previous[path] || __assign({
      message: message,
      type: type
    }, validateAllFieldCriteria ? {
      types: (_d = {}, _d[type] = message || true, _d)
    } : {}), _c));
  }, {}) : (_a = {}, _a[error.path] = {
    message: error.message,
    type: error.type
  }, _a);
};
function validateWithSchema(validationSchema, validateAllFieldCriteria, data, validationResolver, context) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, e_1;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (validationResolver) {
            return [2
            /*return*/
            , validationResolver(data, context)];
          }

          _b.label = 1;

        case 1:
          _b.trys.push([1, 3,, 4]);

          _a = {};
          return [4
          /*yield*/
          , validationSchema.validate(data, {
            abortEarly: false,
            context: context
          })];

        case 2:
          return [2
          /*return*/
          , (_a.values = _b.sent(), _a.errors = {}, _a)];

        case 3:
          e_1 = _b.sent();
          return [2
          /*return*/
          , {
            values: {},
            errors: transformToNestObject(parseErrorSchema(e_1, validateAllFieldCriteria))
          }];

        case 4:
          return [2
          /*return*/
          ];
      }
    });
  });
}

var getDefaultValue = (function (defaultValues, name, defaultValue) {
  return isUndefined(defaultValues[name]) ? get$1(defaultValues, name, defaultValue) : defaultValues[name];
});

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED$2 }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var concat = entryVirtual('Array').concat;

var ArrayPrototype$b = Array.prototype;

var concat_1 = function (it) {
  var own = it.concat;
  return it === ArrayPrototype$b || (it instanceof Array && own === ArrayPrototype$b.concat) ? concat : own;
};

var concat$1 = concat_1;

var concat$2 = concat$1;

function flatArray(list) {
  return reduce$2(list).call(list, function (a, b) {
    return concat$2(a).call(a, isArray$4(b) ? flatArray(b) : b);
  }, []);
}

var isPrimitive = (function (value) {
  return isNullOrUndefined(value) || !isObjectType(value);
});

var getPath = function (path, values) {
  var _context;

  var getInnerPath = function (value, key, isObject) {
    var pathWithIndex = isObject ? path + "." + key : path + "[" + key + "]";
    return isPrimitive(value) ? pathWithIndex : getPath(pathWithIndex, value);
  };

  return isArray$4(values) ? map$2(values).call(values, function (value, key) {
    return getInnerPath(value, key);
  }) : map$2(_context = entries$2(values)).call(_context, function (_a) {
    var _b = __read(_a, 2),
        key = _b[0],
        value = _b[1];

    return getInnerPath(value, key, true);
  });
};

var getPath$1 = (function (parentPath, value) {
  return flatArray(getPath(parentPath, value));
});

var assignWatchFields = (function (fieldValues, fieldName, watchFields, combinedDefaultValues) {
  var value;
  watchFields.add(fieldName);

  if (isEmptyObject(fieldValues)) {
    value = undefined;
  } else if (!isUndefined(fieldValues[fieldName])) {
    value = fieldValues[fieldName];
    watchFields.add(fieldName);
  } else {
    value = get$1(transformToNestObject(fieldValues), fieldName);

    if (!isUndefined(value)) {
      var _context;

      forEach$2(_context = getPath$1(fieldName, value)).call(_context, function (name) {
        return watchFields.add(name);
      });
    }
  }

  return isUndefined(value) ? isObject$1(combinedDefaultValues) ? getDefaultValue(combinedDefaultValues, fieldName) : combinedDefaultValues : value;
});

var skipValidation = (function (_a) {
  var isOnChange = _a.isOnChange,
      hasError = _a.hasError,
      isBlurEvent = _a.isBlurEvent,
      isOnSubmit = _a.isOnSubmit,
      isReValidateOnSubmit = _a.isReValidateOnSubmit,
      isOnBlur = _a.isOnBlur,
      isReValidateOnBlur = _a.isReValidateOnBlur,
      isSubmitted = _a.isSubmitted;
  return isOnChange && isBlurEvent || isOnSubmit && isReValidateOnSubmit || isOnSubmit && !isSubmitted || isOnBlur && !isBlurEvent && !hasError || isReValidateOnBlur && !isBlurEvent && hasError || isReValidateOnSubmit && isSubmitted;
});

var getFieldValueByName = (function (fields, name) {
  var results = transformToNestObject(getFieldsValues(fields));
  return name ? get$1(results, name, results) : results;
});

function getIsFieldsDifferent(referenceArray, differenceArray) {
  var isMatch = false;

  if (!isArray$4(referenceArray) || !isArray$4(differenceArray) || referenceArray.length !== differenceArray.length) {
    return true;
  }

  for (var i = 0; i < referenceArray.length; i++) {
    if (isMatch) {
      break;
    }

    var dataA = referenceArray[i];
    var dataB = differenceArray[i];

    if (isUndefined(dataB) || keys$3(dataA).length !== keys$3(dataB).length) {
      isMatch = true;
      break;
    }

    for (var key in dataA) {
      if (dataA[key] !== dataB[key]) {
        isMatch = true;
        break;
      }
    }
  }

  return isMatch;
}

var isMatchFieldArrayName = function (name, searchName) {
  return startsWith$2(name).call(name, searchName + "[");
};
var isNameInFieldArray = (function (names, name) {
  var _context;

  return reduce$2(_context = __spread(names)).call(_context, function (prev, current) {
    return isMatchFieldArrayName(name, current) ? true : prev;
  }, false);
});

var isFileListObject = (function (data) {
  return typeof FileList !== UNDEFINED && data instanceof FileList;
});

function onDomRemove(element, onDetachCallback) {
  var observer = new MutationObserver(function () {
    if (isDetached(element)) {
      observer.disconnect();
      onDetachCallback();
    }
  });
  observer.observe(window.document, {
    childList: true,
    subtree: true
  });
  return observer;
}

var modeChecker = (function (mode) {
  return {
    isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
    isOnBlur: mode === VALIDATION_MODE.onBlur,
    isOnChange: mode === VALIDATION_MODE.onChange
  };
});

var useRef = React.useRef,
    useState = React.useState,
    useCallback = React.useCallback,
    useEffect = React.useEffect;
function useForm(_a) {
  var _this = this;

  var _b = _a === void 0 ? {} : _a,
      _c = _b.mode,
      mode = _c === void 0 ? VALIDATION_MODE.onSubmit : _c,
      _d = _b.reValidateMode,
      reValidateMode = _d === void 0 ? VALIDATION_MODE.onChange : _d,
      validationSchema = _b.validationSchema,
      validationResolver = _b.validationResolver,
      validationContext = _b.validationContext,
      _e = _b.defaultValues,
      defaultValues = _e === void 0 ? {} : _e,
      _f = _b.submitFocusError,
      submitFocusError = _f === void 0 ? true : _f,
      validateCriteriaMode = _b.validateCriteriaMode;

  var fieldsRef = useRef({});
  var validateAllFieldCriteria = validateCriteriaMode === 'all';
  var errorsRef = useRef({});
  var touchedFieldsRef = useRef({});
  var watchFieldsRef = useRef(new set$4());
  var dirtyFieldsRef = useRef(new set$4());
  var fieldsWithValidationRef = useRef(new set$4());
  var validFieldsRef = useRef(new set$4());
  var isValidRef = useRef(true);
  var defaultRenderValuesRef = useRef({});
  var defaultValuesRef = useRef(defaultValues);
  var isUnMount = useRef(false);
  var isWatchAllRef = useRef(false);
  var isSubmittedRef = useRef(false);
  var isDirtyRef = useRef(false);
  var submitCountRef = useRef(0);
  var isSubmittingRef = useRef(false);
  var handleChangeRef = useRef();
  var resetFieldArrayFunctionRef = useRef({});
  var validationContextRef = useRef(validationContext);
  var fieldArrayNamesRef = useRef(new set$4());

  var _g = __read(useState(), 2),
      render = _g[1];

  var _h = useRef(modeChecker(mode)).current,
      isOnBlur = _h.isOnBlur,
      isOnSubmit = _h.isOnSubmit,
      isOnChange = _h.isOnChange;
  var isWindowUndefined = typeof window === UNDEFINED;
  var shouldValidateCallback = !!(validationSchema || validationResolver);
  var isWeb = typeof document !== UNDEFINED && !isWindowUndefined && !isUndefined(window.HTMLElement);
  var isProxyEnabled = isWeb && 'Proxy' in window;
  var readFormStateRef = useRef({
    dirty: !isProxyEnabled,
    dirtyFields: !isProxyEnabled,
    isSubmitted: isOnSubmit,
    submitCount: !isProxyEnabled,
    touched: !isProxyEnabled,
    isSubmitting: !isProxyEnabled,
    isValid: !isProxyEnabled
  });
  var _j = useRef(modeChecker(reValidateMode)).current,
      isReValidateOnBlur = _j.isOnBlur,
      isReValidateOnSubmit = _j.isOnSubmit;
  var reRender = useCallback(function () {
    if (!isUnMount.current) {
      render({});
    }
  }, []);
  var shouldRenderBaseOnError = useCallback(function (name, error, shouldRender, skipReRender) {
    var shouldReRender = shouldRender || shouldUpdateWithError({
      errors: errorsRef.current,
      error: error,
      name: name,
      validFields: validFieldsRef.current,
      fieldsWithValidation: fieldsWithValidationRef.current
    });

    if (isEmptyObject(error)) {
      if (fieldsWithValidationRef.current.has(name) || shouldValidateCallback) {
        validFieldsRef.current.add(name);
        shouldReRender = shouldReRender || get$1(errorsRef.current, name);
      }

      errorsRef.current = unset(errorsRef.current, [name]);
    } else {
      validFieldsRef.current.delete(name);
      shouldReRender = shouldReRender || !get$1(errorsRef.current, name);
      set$5(errorsRef.current, name, error[name]);
    }

    if (shouldReRender && !skipReRender) {
      reRender();
      return true;
    }
  }, [reRender, shouldValidateCallback]);
  var setFieldValue = useCallback(function (field, rawValue) {
    var ref = field.ref;
    var options = field.options;
    var type = ref.type;
    var value = isWeb && isHTMLElement(ref) && isNullOrUndefined(rawValue) ? '' : rawValue;

    if (isRadioInput(ref) && options) {
      forEach$2(options).call(options, function (_a) {
        var radioRef = _a.ref;
        return radioRef.checked = radioRef.value === value;
      });
    } else if (isFileInput(ref)) {
      if (isEmptyString(value) || isFileListObject(value)) {
        ref.files = value;
      } else {
        ref.value = value;
      }
    } else if (isMultipleSelect(ref)) {
      var _context;

      forEach$2(_context = __spread(ref.options)).call(_context, function (selectRef) {
        return selectRef.selected = includes$4(value).call(value, selectRef.value);
      });
    } else if (isCheckBoxInput(ref) && options) {
      options.length > 1 ? forEach$2(options).call(options, function (_a) {
        var checkboxRef = _a.ref;
        return checkboxRef.checked = includes$4(value).call(value, checkboxRef.value);
      }) : options[0].ref.checked = !!value;
    } else {
      ref.value = value;
    }

    return !!type;
  }, [isWeb]);

  var setDirty = function (name) {
    if (!fieldsRef.current[name] || !readFormStateRef.current.dirty && !readFormStateRef.current.dirtyFields) {
      return false;
    }

    var isFieldArray = isNameInFieldArray(fieldArrayNamesRef.current, name);
    var previousDirtyFieldsLength = dirtyFieldsRef.current.size;
    var isDirty = defaultRenderValuesRef.current[name] !== getFieldValue(fieldsRef.current, fieldsRef.current[name].ref);

    if (isFieldArray) {
      var fieldArrayName = name.substring(0, indexOf$3(name).call(name, '['));
      isDirty = getIsFieldsDifferent(getFieldValueByName(fieldsRef.current, fieldArrayName), get$1(defaultValuesRef.current, fieldArrayName));
    }

    var isDirtyChanged = (isFieldArray ? isDirtyRef.current : dirtyFieldsRef.current.has(name)) !== isDirty;

    if (isDirty) {
      dirtyFieldsRef.current.add(name);
    } else {
      dirtyFieldsRef.current.delete(name);
    }

    isDirtyRef.current = isFieldArray ? isDirty : !!dirtyFieldsRef.current.size;
    return readFormStateRef.current.dirty ? isDirtyChanged : previousDirtyFieldsLength !== dirtyFieldsRef.current.size;
  };

  var setDirtyAndTouchedFields = useCallback(function (fieldName) {
    if (setDirty(fieldName) || !get$1(touchedFieldsRef.current, fieldName) && readFormStateRef.current.touched) {
      return !!set$5(touchedFieldsRef.current, fieldName, true);
    }
  }, []);
  var setInternalValueBatch = useCallback(function (name, value, parentFieldName) {
    var isValueArray = isArray$4(value);

    for (var key in value) {
      var fieldName = "" + (parentFieldName || name) + (isValueArray ? "[" + key + "]" : "." + key);

      if (isObject$1(value[key])) {
        setInternalValueBatch(name, value[key], fieldName);
      }

      var field = fieldsRef.current[fieldName];

      if (field) {
        setFieldValue(field, value[key]);
        setDirtyAndTouchedFields(fieldName);
      }
    }
  }, [setFieldValue, setDirtyAndTouchedFields]);
  var setInternalValue = useCallback(function (name, value) {
    var field = fieldsRef.current[name];

    if (field) {
      setFieldValue(field, value);
      var output = setDirtyAndTouchedFields(name);

      if (isBoolean(output)) {
        return output;
      }
    } else if (!isPrimitive(value)) {
      setInternalValueBatch(name, value);
    }
  }, [setDirtyAndTouchedFields, setFieldValue, setInternalValueBatch]);
  var executeValidation = useCallback(function (name, skipReRender) {
    return __awaiter(_this, void 0, void 0, function () {
      var field, error;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            field = fieldsRef.current[name];

            if (!field) {
              return [2
              /*return*/
              , false];
            }

            return [4
            /*yield*/
            , validateField(fieldsRef, validateAllFieldCriteria, field)];

          case 1:
            error = _a.sent();
            shouldRenderBaseOnError(name, error, false, skipReRender);
            return [2
            /*return*/
            , isEmptyObject(error)];
        }
      });
    });
  }, [shouldRenderBaseOnError, validateAllFieldCriteria]);
  var executeSchemaValidation = useCallback(function (payload) {
    return __awaiter(_this, void 0, void 0, function () {
      var errors, previousFormIsValid;

      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , validateWithSchema(validationSchema, validateAllFieldCriteria, getFieldValueByName(fieldsRef.current), validationResolver, validationContextRef.current)];

          case 1:
            errors = _b.sent().errors;
            previousFormIsValid = isValidRef.current;
            isValidRef.current = isEmptyObject(errors);

            if (isArray$4(payload)) {
              forEach$2(payload).call(payload, function (name) {
                var error = get$1(errors, name);

                if (error) {
                  set$5(errorsRef.current, name, error);
                } else {
                  unset(errorsRef.current, [name]);
                }
              });

              reRender();
            } else {
              shouldRenderBaseOnError(payload, get$1(errors, payload) ? (_a = {}, _a[payload] = get$1(errors, payload), _a) : {}, previousFormIsValid !== isValidRef.current);
            }

            return [2
            /*return*/
            , isEmptyObject(errorsRef.current)];
        }
      });
    });
  }, [reRender, shouldRenderBaseOnError, validateAllFieldCriteria, validationResolver, validationSchema]);
  var triggerValidation = useCallback(function (payload) {
    return __awaiter(_this, void 0, void 0, function () {
      var fields, result;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            fields = payload || keys$3(fieldsRef.current);

            if (shouldValidateCallback) {
              return [2
              /*return*/
              , executeSchemaValidation(fields)];
            }

            if (!isArray$4(fields)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , promise$3.all(map$2(fields).call(fields, function (data) {
              return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return [4
                      /*yield*/
                      , executeValidation(data, true)];

                    case 1:
                      return [2
                      /*return*/
                      , _a.sent()];
                  }
                });
              });
            }))];

          case 1:
            result = _a.sent();
            reRender();
            return [2
            /*return*/
            , every$2(result).call(result, Boolean)];

          case 2:
            return [4
            /*yield*/
            , executeValidation(fields)];

          case 3:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  }, [executeSchemaValidation, executeValidation, reRender, shouldValidateCallback]);

  var isFieldWatched = function (name) {
    return isWatchAllRef.current || watchFieldsRef.current.has(name) || watchFieldsRef.current.has((name.match(/\w+/) || [])[0]);
  };

  function setValue(names, valueOrShouldValidate, shouldValidate) {
    var _context2;

    var shouldRender = false;
    var isMultiple = isArray$4(names);

    forEach$2(_context2 = isMultiple ? names : [names]).call(_context2, function (name) {
      var isStringFieldName = isString(name);
      shouldRender = setInternalValue(isStringFieldName ? name : keys$3(name)[0], isStringFieldName ? valueOrShouldValidate : values$5(name)[0]) || isMultiple ? true : isFieldWatched(name);
    });

    if (shouldRender || isMultiple) {
      reRender();
    }

    if (shouldValidate || isMultiple && valueOrShouldValidate) {
      triggerValidation(isMultiple ? undefined : names);
    }
  }

  handleChangeRef.current = handleChangeRef.current ? handleChangeRef.current : function (_a) {
    var type = _a.type,
        target = _a.target;
    return __awaiter(_this, void 0, void 0, function () {
      var name, fields, errors, field, currentError, error, isBlurEvent, shouldSkipValidation, shouldUpdateDirty, shouldUpdateState, errors_1, previousFormIsValid;

      var _b;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            name = target ? target.name : '';
            fields = fieldsRef.current;
            errors = errorsRef.current;
            field = fields[name];
            currentError = get$1(errors, name);

            if (!field) {
              return [2
              /*return*/
              ];
            }

            isBlurEvent = type === EVENTS.BLUR;
            shouldSkipValidation = skipValidation({
              hasError: !!currentError,
              isOnChange: isOnChange,
              isBlurEvent: isBlurEvent,
              isOnSubmit: isOnSubmit,
              isReValidateOnSubmit: isReValidateOnSubmit,
              isOnBlur: isOnBlur,
              isReValidateOnBlur: isReValidateOnBlur,
              isSubmitted: isSubmittedRef.current
            });
            shouldUpdateDirty = setDirty(name);
            shouldUpdateState = isFieldWatched(name) || shouldUpdateDirty;

            if (isBlurEvent && !get$1(touchedFieldsRef.current, name) && readFormStateRef.current.touched) {
              set$5(touchedFieldsRef.current, name, true);
              shouldUpdateState = true;
            }

            if (shouldSkipValidation) {
              return [2
              /*return*/
              , shouldUpdateState && reRender()];
            }

            if (!shouldValidateCallback) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , validateWithSchema(validationSchema, validateAllFieldCriteria, getFieldValueByName(fields), validationResolver, validationContextRef.current)];

          case 1:
            errors_1 = _c.sent().errors;
            previousFormIsValid = isValidRef.current;
            isValidRef.current = isEmptyObject(errors_1);
            error = get$1(errors_1, name) ? (_b = {}, _b[name] = get$1(errors_1, name), _b) : {};

            if (previousFormIsValid !== isValidRef.current) {
              shouldUpdateState = true;
            }

            return [3
            /*break*/
            , 4];

          case 2:
            return [4
            /*yield*/
            , validateField(fieldsRef, validateAllFieldCriteria, field)];

          case 3:
            error = _c.sent();
            _c.label = 4;

          case 4:
            if (!shouldRenderBaseOnError(name, error) && shouldUpdateState) {
              reRender();
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };
  var validateSchemaIsValid = useCallback(function (values) {
    if (values === void 0) {
      values = {};
    }

    var fieldValues = isEmptyObject(defaultValuesRef.current) ? getFieldsValues(fieldsRef.current) : defaultValuesRef.current;
    validateWithSchema(validationSchema, validateAllFieldCriteria, transformToNestObject(__assign(__assign({}, fieldValues), values)), validationResolver, validationContextRef.current).then(function (_a) {
      var errors = _a.errors;
      var previousFormIsValid = isValidRef.current;
      isValidRef.current = isEmptyObject(errors);

      if (previousFormIsValid !== isValidRef.current) {
        reRender();
      }
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [reRender, validateAllFieldCriteria, validationResolver]);

  var removeFieldEventListener = function (field, forceDelete) {
    if (!isUndefined(handleChangeRef.current) && field) {
      findRemovedFieldAndRemoveListener(fieldsRef.current, handleChangeRef.current, field, forceDelete);
    }
  };

  var removeFieldEventListenerAndRef = useCallback(function (field, forceDelete) {
    var _context3;

    if (!field || field && isNameInFieldArray(fieldArrayNamesRef.current, field.ref.name) && !forceDelete) {
      return;
    }

    removeFieldEventListener(field, forceDelete);
    var name = field.ref.name;
    errorsRef.current = unset(errorsRef.current, [name]);
    touchedFieldsRef.current = unset(touchedFieldsRef.current, [name]);
    defaultRenderValuesRef.current = unset(defaultRenderValuesRef.current, [name]);

    forEach$2(_context3 = [dirtyFieldsRef, fieldsWithValidationRef, validFieldsRef, watchFieldsRef]).call(_context3, function (data) {
      return data.current.delete(name);
    });

    if (readFormStateRef.current.isValid || readFormStateRef.current.touched) {
      reRender();

      if (shouldValidateCallback) {
        validateSchemaIsValid();
      }
    }
  }, [reRender, shouldValidateCallback, validateSchemaIsValid]);

  function clearError(name) {
    if (isUndefined(name)) {
      errorsRef.current = {};
    } else {
      unset(errorsRef.current, isArray$4(name) ? name : [name]);
    }

    reRender();
  }

  var setInternalError = function (_a) {
    var name = _a.name,
        type = _a.type,
        types = _a.types,
        message = _a.message,
        preventRender = _a.preventRender;
    var field = fieldsRef.current[name];

    if (!isSameError(errorsRef.current[name], {
      type: type,
      message: message,
      types: types
    })) {
      set$5(errorsRef.current, name, {
        type: type,
        types: types,
        message: message,
        ref: field ? field.ref : {},
        isManual: true
      });

      if (!preventRender) {
        reRender();
      }
    }
  };

  function setError(name, type, message) {
    if (type === void 0) {
      type = '';
    }

    if (isString(name)) {
      setInternalError(__assign({
        name: name
      }, isObject$1(type) ? {
        types: type,
        type: ''
      } : {
        type: type,
        message: message
      }));
    } else if (isArray$4(name)) {
      forEach$2(name).call(name, function (error) {
        return setInternalError(__assign(__assign({}, error), {
          preventRender: true
        }));
      });

      reRender();
    }
  }

  function watch(fieldNames, defaultValue) {
    var combinedDefaultValues = isUndefined(defaultValue) ? isUndefined(defaultValuesRef.current) ? {} : defaultValuesRef.current : defaultValue;
    var fieldValues = getFieldsValues(fieldsRef.current, fieldNames);
    var watchFields = watchFieldsRef.current;

    if (isString(fieldNames)) {
      return assignWatchFields(fieldValues, fieldNames, watchFields, combinedDefaultValues);
    }

    if (isArray$4(fieldNames)) {
      return reduce$2(fieldNames).call(fieldNames, function (previous, name) {
        var _a;

        return __assign(__assign({}, previous), (_a = {}, _a[name] = assignWatchFields(fieldValues, name, watchFields, combinedDefaultValues), _a));
      }, {});
    }

    isWatchAllRef.current = true;
    var result = !isEmptyObject(fieldValues) && fieldValues || defaultValue || defaultValuesRef.current;
    return fieldNames && fieldNames.nest ? transformToNestObject(result) : result;
  }

  function unregister(names) {
    if (!isEmptyObject(fieldsRef.current)) {
      var _context4;

      forEach$2(_context4 = isArray$4(names) ? names : [names]).call(_context4, function (fieldName) {
        return removeFieldEventListenerAndRef(fieldsRef.current[fieldName], true);
      });
    }
  }

  function registerFieldsRef(ref, validateOptions) {
    var _context5, _context6;

    if (validateOptions === void 0) {
      validateOptions = {};
    }

    if (!ref.name) {
      // eslint-disable-next-line no-console
      return console.warn('Missing name @', ref);
    }

    var name = ref.name,
        type = ref.type,
        value = ref.value;

    var fieldAttributes = __assign({
      ref: ref
    }, validateOptions);

    var fields = fieldsRef.current;
    var isRadioOrCheckbox = isRadioInput(ref) || isCheckBoxInput(ref);
    var currentField = fields[name];
    var isEmptyDefaultValue = true;
    var isFieldArray = false;
    var defaultValue;

    if (isRadioOrCheckbox ? currentField && isArray$4(currentField.options) && find$2(_context5 = filter$2(_context6 = currentField.options).call(_context6, Boolean)).call(_context5, function (_a) {
      var ref = _a.ref;
      return value === ref.value;
    }) : currentField) {
      fields[name] = __assign(__assign({}, currentField), validateOptions);
      return;
    }

    if (type) {
      var mutationWatcher = onDomRemove(ref, function () {
        return removeFieldEventListenerAndRef(fieldAttributes);
      });
      currentField = isRadioOrCheckbox ? __assign({
        options: __spread(currentField && currentField.options || [], [{
          ref: ref,
          mutationWatcher: mutationWatcher
        }]),
        ref: {
          type: type,
          name: name
        }
      }, validateOptions) : __assign(__assign({}, fieldAttributes), {
        mutationWatcher: mutationWatcher
      });
    } else {
      currentField = fieldAttributes;
    }

    fields[name] = currentField;

    if (!isEmptyObject(defaultValuesRef.current)) {
      defaultValue = getDefaultValue(defaultValuesRef.current, name);
      isEmptyDefaultValue = isUndefined(defaultValue);
      isFieldArray = isNameInFieldArray(fieldArrayNamesRef.current, name);

      if (!isEmptyDefaultValue && !isFieldArray) {
        setFieldValue(currentField, defaultValue);
      }
    }

    if (shouldValidateCallback && !isFieldArray && readFormStateRef.current.isValid) {
      validateSchemaIsValid();
    } else if (!isEmptyObject(validateOptions)) {
      fieldsWithValidationRef.current.add(name);

      if (!isOnSubmit && readFormStateRef.current.isValid) {
        validateField(fieldsRef, validateAllFieldCriteria, currentField).then(function (error) {
          var previousFormIsValid = isValidRef.current;

          if (isEmptyObject(error)) {
            validFieldsRef.current.add(name);
          } else {
            isValidRef.current = false;
          }

          if (previousFormIsValid !== isValidRef.current) {
            reRender();
          }
        });
      }
    }

    if (!defaultRenderValuesRef.current[name] && !(isFieldArray && isEmptyDefaultValue)) {
      defaultRenderValuesRef.current[name] = isEmptyDefaultValue ? getFieldValue(fields, currentField.ref) : defaultValue;
    }

    if (!type) {
      return;
    }

    var fieldToAttachListener = isRadioOrCheckbox && currentField.options ? currentField.options[currentField.options.length - 1] : currentField;
    attachEventListeners({
      field: fieldToAttachListener,
      isRadioOrCheckbox: isRadioOrCheckbox,
      handleChange: handleChangeRef.current
    });
  }

  function register(refOrValidationOptions, validationOptions) {
    if (isWindowUndefined) {
      return;
    }

    if (isString(refOrValidationOptions)) {
      registerFieldsRef({
        name: refOrValidationOptions
      }, validationOptions);
      return;
    }

    if (isObject$1(refOrValidationOptions) && 'name' in refOrValidationOptions) {
      registerFieldsRef(refOrValidationOptions, validationOptions);
      return;
    }

    return function (ref) {
      return ref && registerFieldsRef(ref, refOrValidationOptions);
    };
  }

  var handleSubmit = useCallback(function (callback) {
    return function (e) {
      return __awaiter(_this, void 0, void 0, function () {
        var fieldErrors, fieldValues, fields, _a, errors, values, _b, _c, field, ref, name_1, fieldError, e_1_1;

        var e_1, _d;

        return __generator(this, function (_e) {
          switch (_e.label) {
            case 0:
              if (e) {
                e.preventDefault();
                e.persist();
              }

              fieldErrors = {};
              fieldValues = {};
              fields = fieldsRef.current;

              if (readFormStateRef.current.isSubmitting) {
                isSubmittingRef.current = true;
                reRender();
              }

              _e.label = 1;

            case 1:
              _e.trys.push([1,, 14, 15]);

              if (!shouldValidateCallback) return [3
              /*break*/
              , 3];
              fieldValues = getFieldsValues(fields);
              return [4
              /*yield*/
              , validateWithSchema(validationSchema, validateAllFieldCriteria, transformToNestObject(fieldValues), validationResolver, validationContextRef.current)];

            case 2:
              _a = _e.sent(), errors = _a.errors, values = values$2(_a);
              errorsRef.current = errors;
              fieldErrors = errors;
              fieldValues = values;
              return [3
              /*break*/
              , 10];

            case 3:
              _e.trys.push([3, 8, 9, 10]);

              _b = __values(values$5(fields)), _c = _b.next();
              _e.label = 4;

            case 4:
              if (!!_c.done) return [3
              /*break*/
              , 7];
              field = _c.value;
              if (!field) return [3
              /*break*/
              , 6];
              ref = field.ref, name_1 = field.ref.name;
              return [4
              /*yield*/
              , validateField(fieldsRef, validateAllFieldCriteria, field)];

            case 5:
              fieldError = _e.sent();

              if (fieldError[name_1]) {
                set$5(fieldErrors, name_1, fieldError[name_1]);
                validFieldsRef.current.delete(name_1);
              } else {
                if (fieldsWithValidationRef.current.has(name_1)) {
                  validFieldsRef.current.add(name_1);
                }

                fieldValues[name_1] = getFieldValue(fields, ref);
              }

              _e.label = 6;

            case 6:
              _c = _b.next();
              return [3
              /*break*/
              , 4];

            case 7:
              return [3
              /*break*/
              , 10];

            case 8:
              e_1_1 = _e.sent();
              e_1 = {
                error: e_1_1
              };
              return [3
              /*break*/
              , 10];

            case 9:
              try {
                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
              } finally {
                if (e_1) throw e_1.error;
              }

              return [7
              /*endfinally*/
              ];

            case 10:
              if (!isEmptyObject(fieldErrors)) return [3
              /*break*/
              , 12];
              errorsRef.current = {};
              return [4
              /*yield*/
              , callback(transformToNestObject(fieldValues), e)];

            case 11:
              _e.sent();

              return [3
              /*break*/
              , 13];

            case 12:
              if (submitFocusError && isWeb) {
                focusErrorField(fields, fieldErrors);
              }

              errorsRef.current = fieldErrors;
              _e.label = 13;

            case 13:
              return [3
              /*break*/
              , 15];

            case 14:
              isSubmittedRef.current = true;
              isSubmittingRef.current = false;
              submitCountRef.current = submitCountRef.current + 1;
              reRender();
              return [7
              /*endfinally*/
              ];

            case 15:
              return [2
              /*return*/
              ];
          }
        });
      });
    };
  }, [isWeb, reRender, shouldValidateCallback, submitFocusError, validateAllFieldCriteria, validationResolver, validationSchema]);

  var resetRefs = function (_a) {
    var errors = _a.errors,
        dirty = _a.dirty,
        isSubmitted = _a.isSubmitted,
        touched = _a.touched,
        isValid = _a.isValid,
        submitCount = _a.submitCount;
    fieldsRef.current = {};

    if (!errors) {
      errorsRef.current = {};
    }

    if (!touched) {
      touchedFieldsRef.current = {};
    }

    if (!isValid) {
      validFieldsRef.current = new set$4();
      fieldsWithValidationRef.current = new set$4();
      isValidRef.current = true;
    }

    if (!dirty) {
      dirtyFieldsRef.current = new set$4();
      isDirtyRef.current = false;
    }

    if (!isSubmitted) {
      isSubmittedRef.current = false;
    }

    if (!submitCount) {
      submitCountRef.current = 0;
    }

    defaultRenderValuesRef.current = {};
    watchFieldsRef.current = new set$4();
    isWatchAllRef.current = false;
  };

  var reset = function (values, omitResetState) {
    var _context7;

    var e_2, _a;

    if (omitResetState === void 0) {
      omitResetState = {};
    }

    if (isWeb) {
      try {
        for (var _b = __values(values$5(fieldsRef.current)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var value = _c.value;

          if (value && isHTMLElement(value.ref) && value.ref.closest) {
            try {
              value.ref.closest('form').reset();
              break;
            } catch (_d) {}
          }
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
    }

    if (values) {
      defaultValuesRef.current = values;
    }

    forEach$2(_context7 = values$5(resetFieldArrayFunctionRef.current)).call(_context7, function (resetFieldArray) {
      return isFunction(resetFieldArray) && resetFieldArray();
    });

    resetRefs(omitResetState);
    reRender();
  };

  var getValues = function (payload) {
    var fieldValues = getFieldsValues(fieldsRef.current);
    var outputValues = isEmptyObject(fieldValues) ? defaultValuesRef.current : fieldValues;
    return payload && payload.nest ? transformToNestObject(outputValues) : outputValues;
  };

  useEffect(function () {
    return function () {
      var _context8;

      isUnMount.current = true;
      fieldsRef.current && process.env.NODE_ENV === 'production' && forEach$2(_context8 = values$5(fieldsRef.current)).call(_context8, function (field) {
        return removeFieldEventListenerAndRef(field, true);
      });
    };
  }, [removeFieldEventListenerAndRef]);

  if (!shouldValidateCallback) {
    isValidRef.current = validFieldsRef.current.size >= fieldsWithValidationRef.current.size && isEmptyObject(errorsRef.current);
  }

  var formState = {
    dirty: isDirtyRef.current,
    dirtyFields: dirtyFieldsRef.current,
    isSubmitted: isSubmittedRef.current,
    submitCount: submitCountRef.current,
    touched: touchedFieldsRef.current,
    isSubmitting: isSubmittingRef.current,
    isValid: isOnSubmit ? isSubmittedRef.current && isEmptyObject(errorsRef.current) : isValidRef.current
  };

  var control = __assign(__assign({
    register: register,
    unregister: unregister,
    removeFieldEventListener: removeFieldEventListener,
    getValues: getValues,
    setValue: setValue,
    reRender: reRender,
    triggerValidation: triggerValidation
  }, shouldValidateCallback ? {
    validateSchemaIsValid: validateSchemaIsValid
  } : {}), {
    formState: formState,
    mode: {
      isOnBlur: isOnBlur,
      isOnSubmit: isOnSubmit,
      isOnChange: isOnChange
    },
    reValidateMode: {
      isReValidateOnBlur: isReValidateOnBlur,
      isReValidateOnSubmit: isReValidateOnSubmit
    },
    errorsRef: errorsRef,
    touchedFieldsRef: touchedFieldsRef,
    fieldsRef: fieldsRef,
    resetFieldArrayFunctionRef: resetFieldArrayFunctionRef,
    validFieldsRef: validFieldsRef,
    dirtyFieldsRef: dirtyFieldsRef,
    fieldsWithValidationRef: fieldsWithValidationRef,
    watchFieldsRef: watchFieldsRef,
    fieldArrayNamesRef: fieldArrayNamesRef,
    isDirtyRef: isDirtyRef,
    readFormStateRef: readFormStateRef,
    defaultValuesRef: defaultValuesRef
  });

  return {
    watch: watch,
    control: control,
    handleSubmit: handleSubmit,
    setValue: useCallback(setValue, [reRender, setInternalValue, triggerValidation]),
    triggerValidation: triggerValidation,
    getValues: useCallback(getValues, []),
    reset: useCallback(reset, []),
    register: useCallback(register, [defaultValuesRef.current, defaultRenderValuesRef.current]),
    unregister: useCallback(unregister, []),
    clearError: useCallback(clearError, []),
    setError: useCallback(setError, []),
    errors: errorsRef.current,
    formState: isProxyEnabled ? new Proxy(formState, {
      get: function (obj, prop) {
        if (prop in obj) {
          readFormStateRef.current[prop] = true;
          return obj[prop];
        }

        return {};
      }
    }) : formState
  };
}

var FormGlobalContext = React.createContext(null);
function useFormContext() {
  return React.useContext(FormGlobalContext);
}
function FormContext(_a) {
  var children = _a.children,
      formState = _a.formState,
      errors = _a.errors,
      restMethods = __rest(_a, ["children", "formState", "errors"]);

  return React.createElement(FormGlobalContext.Provider, {
    value: __assign(__assign({}, restMethods), {
      formState: formState,
      errors: errors
    })
  }, children);
}

// `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now
_export({ target: 'Date', stat: true }, {
  now: function now() {
    return new Date().getTime();
  }
});

var now = path.Date.now;

var now$1 = now;

var now$2 = now$1;

var generateId = (function () {
  var d = typeof performance === UNDEFINED ? now$2() : performance.now() * 1000;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16 + d) % 16 | 0;
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
});

var appendId = function (value, keyName) {
  var _a;

  return __assign((_a = {}, _a[keyName] = generateId(), _a), isObject$1(value) ? value : {
    value: value
  });
};
var mapIds = function (data, keyName) {
  var _context;

  return map$2(_context = isArray$4(data) ? data : []).call(_context, function (value) {
    return appendId(value, keyName);
  });
};

var removeAt = function (data, index) {
  return __spread(slice$2(data).call(data, 0, index), slice$2(data).call(data, index + 1));
};

function removeAtIndexes(data, index) {
  var k = -1;

  while (++k < data.length) {
    if (indexOf$3(index).call(index, k) >= 0) {
      delete data[k];
    }
  }

  return filter$2(data).call(data, Boolean);
}

var removeArrayAt = (function (data, index) {
  return isUndefined(index) ? [] : isArray$4(index) ? removeAtIndexes(data, index) : removeAt(data, index);
});

var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH$9 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max$2 = Math.max;
var min$3 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$9 }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$3(max$2(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var splice = entryVirtual('Array').splice;

var ArrayPrototype$c = Array.prototype;

var splice_1 = function (it) {
  var own = it.splice;
  return it === ArrayPrototype$c || (it instanceof Array && own === ArrayPrototype$c.splice) ? splice : own;
};

var splice$1 = splice_1;

var splice$2 = splice$1;

var moveArrayAt = (function (data, from, to) {
  return isArray$4(data) ? splice$2(data).call(data, to, 0, splice$2(data).call(data, from, 1)[0]) : [];
});

var swapArrayAt = (function (fields, indexA, indexB) {
  if (isArray$4(fields)) {
    var temp = [fields[indexB], fields[indexA]];
    fields[indexA] = temp[0];
    fields[indexB] = temp[1];
  }
});

var prependAt = (function (data, value) {
  return __spread(isArray$4(value) ? value : [value || null], data);
});

var insertAt = (function (data, index, value) {
  return __spread(slice$2(data).call(data, 0, index), isArray$4(value) ? value : [value || null], slice$2(data).call(data, index));
});

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
var arrayFill = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

// `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
_export({ target: 'Array', proto: true }, {
  fill: arrayFill
});

var fill = entryVirtual('Array').fill;

var ArrayPrototype$d = Array.prototype;

var fill_1 = function (it) {
  var own = it.fill;
  return it === ArrayPrototype$d || (it instanceof Array && own === ArrayPrototype$d.fill) ? fill : own;
};

var fill$1 = fill_1;

var fill$2 = fill$1;

var fillEmptyArray = (function (value) {
  var _context;

  return isArray$4(value) ? fill$2(_context = Array(value.length)).call(_context, null) : undefined;
});

var useEffect$1 = React.useEffect,
    useCallback$1 = React.useCallback,
    useRef$1 = React.useRef,
    useState$1 = React.useState;
var useFieldArray = function (_a) {
  var control = _a.control,
      name = _a.name,
      _b = _a.keyName,
      keyName = _b === void 0 ? 'id' : _b;
  var methods = useFormContext();

  var _c = control || methods.control,
      resetFieldArrayFunctionRef = _c.resetFieldArrayFunctionRef,
      fieldArrayNamesRef = _c.fieldArrayNamesRef,
      reRender = _c.reRender,
      fieldsRef = _c.fieldsRef,
      getValues = _c.getValues,
      defaultValuesRef = _c.defaultValuesRef,
      removeFieldEventListener = _c.removeFieldEventListener,
      errorsRef = _c.errorsRef,
      dirtyFieldsRef = _c.dirtyFieldsRef,
      isDirtyRef = _c.isDirtyRef,
      touchedFieldsRef = _c.touchedFieldsRef,
      readFormStateRef = _c.readFormStateRef,
      watchFieldsRef = _c.watchFieldsRef,
      validFieldsRef = _c.validFieldsRef,
      fieldsWithValidationRef = _c.fieldsWithValidationRef,
      validateSchemaIsValid = _c.validateSchemaIsValid;

  var memoizedDefaultValues = useRef$1(get$1(defaultValuesRef.current, name, []));

  var _d = __read(useState$1(mapIds(memoizedDefaultValues.current, keyName)), 2),
      fields = _d[0],
      setField = _d[1];

  var allFields = useRef$1(fields);
  allFields.current = fields;

  var appendValueWithKey = function (value) {
    return map$2(value).call(value, function (v) {
      return appendId(v, keyName);
    });
  };

  var commonTasks = function (fieldsValues) {
    var _a;

    setField(fieldsValues);

    if (readFormStateRef.current.isValid && validateSchemaIsValid) {
      validateSchemaIsValid((_a = {}, _a[name] = fieldsValues, _a));
    }
  };

  var resetFields = function (flagOrFields) {
    if (readFormStateRef.current.dirty) {
      isDirtyRef.current = isUndefined(flagOrFields) ? true : getIsFieldsDifferent(flagOrFields, memoizedDefaultValues.current);
    }

    for (var key in fieldsRef.current) {
      if (isMatchFieldArrayName(key, name) && fieldsRef.current[key]) {
        removeFieldEventListener(fieldsRef.current[key], true);
      }
    }
  };

  var mapCurrentFieldsValueWithState = function () {
    var currentFieldsValue = getValues({
      nest: true
    })[name];

    if (isArray$4(currentFieldsValue)) {
      for (var i = 0; i < currentFieldsValue.length; i++) {
        allFields.current[i] = __assign(__assign({}, allFields.current[i]), currentFieldsValue[i]);
      }
    }
  };

  var append = function (value) {
    if (readFormStateRef.current.dirty) {
      isDirtyRef.current = true;
      reRender();
    }

    commonTasks(__spread(allFields.current, isArray$4(value) ? appendValueWithKey(value) : [appendId(value, keyName)]));
  };

  var prepend = function (value) {
    resetFields();
    commonTasks(prependAt(allFields.current, isArray$4(value) ? appendValueWithKey(value) : [appendId(value, keyName)]));

    if (errorsRef.current[name]) {
      errorsRef.current[name] = prependAt(errorsRef.current[name], fillEmptyArray(value));
    }

    if (readFormStateRef.current.touched && touchedFieldsRef.current[name]) {
      touchedFieldsRef.current[name] = prependAt(touchedFieldsRef.current[name], fillEmptyArray(value));
      reRender();
    }
  };

  var remove = function (index) {
    var shouldRender = false;

    if (!isUndefined(index)) {
      mapCurrentFieldsValueWithState();
    }

    resetFields(removeArrayAt(getFieldValueByName(fieldsRef.current, name), index));
    commonTasks(removeArrayAt(allFields.current, index));

    if (errorsRef.current[name]) {
      var _context;

      errorsRef.current[name] = removeArrayAt(errorsRef.current[name], index);

      if (!filter$2(_context = errorsRef.current[name]).call(_context, Boolean).length) {
        delete errorsRef.current[name];
      }
    }

    if (readFormStateRef.current.touched && touchedFieldsRef.current[name]) {
      touchedFieldsRef.current[name] = removeArrayAt(touchedFieldsRef.current[name], index);
      shouldRender = true;
    }

    if (readFormStateRef.current.dirty) {
      var _context2;

      forEach$2(_context2 = dirtyFieldsRef.current).call(_context2, function (dirtyField) {
        if (isUndefined(name) || startsWith$2(dirtyField).call(dirtyField, name + "[" + index + "]")) {
          dirtyFieldsRef.current.delete(dirtyField);
        }
      });

      shouldRender = true;
    }

    if (readFormStateRef.current.isValid && !validateSchemaIsValid) {
      var fieldIndex = -1;
      var isFound = false;
      var isIndexUndefined = isUndefined(index);

      while (fieldIndex++ < fields.length) {
        var _context3;

        var isLast = fieldIndex === fields.length - 1;
        var isCurrentIndex = indexOf$3(_context3 = isArray$4(index) ? index : [index]).call(_context3, fieldIndex) >= 0;

        if (isCurrentIndex || isIndexUndefined) {
          isFound = true;
        }

        if (!isFound) {
          continue;
        }

        for (var key in fields[fieldIndex]) {
          var currentFieldName = name + "[" + fieldIndex + "]." + key;

          if (isCurrentIndex || isLast || isIndexUndefined) {
            validFieldsRef.current.delete(currentFieldName);
            fieldsWithValidationRef.current.delete(currentFieldName);
          } else {
            var previousFieldName = name + "[" + (fieldIndex - 1) + "]." + key;

            if (validFieldsRef.current.has(currentFieldName)) {
              validFieldsRef.current.add(previousFieldName);
            }

            if (fieldsWithValidationRef.current.has(currentFieldName)) {
              fieldsWithValidationRef.current.add(previousFieldName);
            }
          }
        }
      }

      shouldRender = true;
    }

    if (shouldRender) {
      reRender();
    }
  };

  var insert = function (index, value) {
    mapCurrentFieldsValueWithState();
    resetFields(insertAt(getFieldValueByName(fieldsRef.current, name), index));
    commonTasks(insertAt(allFields.current, index, isArray$4(value) ? appendValueWithKey(value) : [appendId(value, keyName)]));

    if (errorsRef.current[name]) {
      errorsRef.current[name] = insertAt(errorsRef.current[name], index, fillEmptyArray(value));
    }

    if (readFormStateRef.current.touched && touchedFieldsRef.current[name]) {
      touchedFieldsRef.current[name] = insertAt(touchedFieldsRef.current[name], index, fillEmptyArray(value));
      reRender();
    }
  };

  var swap = function (indexA, indexB) {
    mapCurrentFieldsValueWithState();
    var fieldValues = getFieldValueByName(fieldsRef.current, name);
    swapArrayAt(fieldValues, indexA, indexB);
    resetFields(fieldValues);
    swapArrayAt(allFields.current, indexA, indexB);
    commonTasks(__spread(allFields.current));

    if (errorsRef.current[name]) {
      swapArrayAt(errorsRef.current[name], indexA, indexB);
    }

    if (readFormStateRef.current.touched && touchedFieldsRef.current[name]) {
      swapArrayAt(touchedFieldsRef.current[name], indexA, indexB);
      reRender();
    }
  };

  var move = function (from, to) {
    mapCurrentFieldsValueWithState();
    var fieldValues = getFieldValueByName(fieldsRef.current, name);
    moveArrayAt(fieldValues, from, to);
    resetFields(fieldValues);
    moveArrayAt(allFields.current, from, to);
    commonTasks(__spread(allFields.current));

    if (errorsRef.current[name]) {
      moveArrayAt(errorsRef.current[name], from, to);
    }

    if (readFormStateRef.current.touched && touchedFieldsRef.current[name]) {
      moveArrayAt(touchedFieldsRef.current[name], from, to);
      reRender();
    }
  };

  var reset = function () {
    resetFields();
    memoizedDefaultValues.current = get$1(defaultValuesRef.current, name, []);
    setField(mapIds(memoizedDefaultValues.current, keyName));
  };

  useEffect$1(function () {
    var e_1, _a;

    try {
      for (var _b = __values(watchFieldsRef.current), _c = _b.next(); !_c.done; _c = _b.next()) {
        var watchField = _c.value;

        if (startsWith$2(watchField).call(watchField, name)) {
          reRender();
          break;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  }, [fields, name, reRender, watchFieldsRef]);
  useEffect$1(function () {
    var resetFunctions = resetFieldArrayFunctionRef.current;
    var fieldArrayNames = fieldArrayNamesRef.current;
    fieldArrayNames.add(name);
    resetFunctions[name] = reset;
    return function () {
      resetFields();
      delete resetFunctions[name];
      fieldArrayNames.delete(name);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    swap: useCallback$1(swap, []),
    move: useCallback$1(move, []),
    prepend: useCallback$1(prepend, []),
    append: useCallback$1(append, []),
    remove: useCallback$1(remove, [fields]),
    insert: useCallback$1(insert, []),
    fields: fields
  };
};

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
  defineProperty: objectDefineProperty.f
});

var defineProperty_1 = createCommonjsModule(function (module) {
var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;
});

var defineProperty$4 = defineProperty_1;

var defineProperty$5 = defineProperty$4;

var getInputValue = (function (event, isCheckboxInput) {
  return isPrimitive(event) || !isObject$1(event.target) || isObject$1(event.target) && !event.type ? event : isCheckboxInput || isUndefined(event.target.value) ? event.target.checked : event.target.value;
});

var Controller = function (_a) {
  var _b, _c, _d, _e;

  var name = _a.name,
      rules = _a.rules,
      InnerComponent = _a.as,
      onBlur = _a.onBlur,
      onChange = _a.onChange,
      _f = _a.onChangeName,
      onChangeName = _f === void 0 ? VALIDATION_MODE.onChange : _f,
      _g = _a.onBlurName,
      onBlurName = _g === void 0 ? VALIDATION_MODE.onBlur : _g,
      valueName = _a.valueName,
      defaultValue = _a.defaultValue,
      control = _a.control,
      formatter = _a.formatter,
      rest = __rest(_a, ["name", "rules", "as", "onBlur", "onChange", "onChangeName", "onBlurName", "valueName", "defaultValue", "control", "formatter"]);

  var methods = useFormContext();

  var _h = control || methods.control,
      defaultValuesRef = _h.defaultValuesRef,
      setValue = _h.setValue,
      register = _h.register,
      unregister = _h.unregister,
      errorsRef = _h.errorsRef,
      removeFieldEventListener = _h.removeFieldEventListener,
      triggerValidation = _h.triggerValidation,
      _j = _h.mode,
      isOnSubmit = _j.isOnSubmit,
      isOnBlur = _j.isOnBlur,
      isOnChange = _j.isOnChange,
      _k = _h.reValidateMode,
      isReValidateOnBlur = _k.isReValidateOnBlur,
      isReValidateOnSubmit = _k.isReValidateOnSubmit,
      isSubmitted = _h.formState.isSubmitted,
      fieldsRef = _h.fieldsRef,
      fieldArrayNamesRef = _h.fieldArrayNamesRef;

  var _l = __read(React.useState(isUndefined(defaultValue) ? get$1(defaultValuesRef.current, name) : defaultValue), 2),
      value = _l[0],
      setInputStateValue = _l[1];

  var valueRef = React.useRef(value);
  var isCheckboxInput = isBoolean(value);

  var shouldValidate = function () {
    return !skipValidation({
      hasError: !!get$1(errorsRef.current, name),
      isOnBlur: isOnBlur,
      isOnSubmit: isOnSubmit,
      isOnChange: isOnChange,
      isReValidateOnBlur: isReValidateOnBlur,
      isReValidateOnSubmit: isReValidateOnSubmit,
      isSubmitted: isSubmitted
    });
  };

  var commonTask = function (event) {
    var data = getInputValue(event, isCheckboxInput);
    setInputStateValue(data);
    valueRef.current = data;
    return data;
  };

  var eventWrapper = function (event) {
    return function () {
      var arg = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
      }

      return setValue(name, commonTask(event(arg)), shouldValidate());
    };
  };

  var handleChange = function (event) {
    var data = commonTask(event);
    setValue(name, data, shouldValidate());
  };

  var registerField = function () {
    if (isNameInFieldArray(fieldArrayNamesRef.current, name) && fieldsRef.current[name]) {
      removeFieldEventListener(fieldsRef.current[name], true);
    }

    register(defineProperty$5({
      name: name
    }, VALUE, {
      set: function (data) {
        setInputStateValue(data);
        valueRef.current = data;
      },
      get: function () {
        return valueRef.current;
      }
    }), __assign({}, rules));
  };

  React.useEffect(function () {
    if (!fieldsRef.current[name]) {
      registerField();
      setInputStateValue(isUndefined(defaultValue) ? get$1(defaultValuesRef.current, name) : defaultValue);
    }
  });
  React.useEffect(function () {
    registerField();
    return function () {
      if (!isNameInFieldArray(fieldArrayNamesRef.current, name)) {
        unregister(name);
      }
    };
  }, [name]);
  React.useEffect(function () {
    registerField();
  }, [rules]);
  var shouldReValidateOnBlur = isOnBlur || isReValidateOnBlur;

  var props = __assign(__assign(__assign(__assign({
    name: name
  }, rest), onChange ? (_b = {}, _b[onChangeName] = eventWrapper(onChange), _b) : (_c = {}, _c[onChangeName] = handleChange, _c)), onBlur || shouldReValidateOnBlur ? (_d = {}, _d[onBlurName] = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (onBlur) {
      onBlur(args);
    }

    if (shouldReValidateOnBlur) {
      triggerValidation(name);
    }
  }, _d) : {}), (_e = {}, _e[valueName || (isCheckboxInput ? 'checked' : VALUE)] = formatter ? formatter(value) : value, _e));

  return React.isValidElement(InnerComponent) ? React.cloneElement(InnerComponent, props) : React.createElement(InnerComponent, props);
};

var ErrorMessage = function (_a) {
  var InnerComponent = _a.as,
      errors = _a.errors,
      name = _a.name,
      message = _a.message,
      children = _a.children,
      rest = __rest(_a, ["as", "errors", "name", "message", "children"]);

  var methods = useFormContext();
  var error = get$1(errors || methods.errors, name);

  if (!error) {
    return null;
  }

  var messageFromRegister = error.message,
      types = error.types;

  var props = __assign(__assign({}, InnerComponent ? rest : {}), {
    children: children ? children({
      message: messageFromRegister || message,
      messages: types
    }) : messageFromRegister || message
  });

  return InnerComponent ? React.isValidElement(InnerComponent) ? React.cloneElement(InnerComponent, props) : React.createElement(InnerComponent, props) : React.createElement(React.Fragment, __assign({}, props));
};

exports.Controller = Controller;
exports.ErrorMessage = ErrorMessage;
exports.FormContext = FormContext;
exports.useFieldArray = useFieldArray;
exports.useForm = useForm;
exports.useFormContext = useFormContext;
