/* global pick $ HTMLElement NodeList */

/**
 * Check if 2 values are equal
 * 
 * @example
 * 
 * var k = {"a":1};
 * pick.is(k, k);
 * 
 * @param {object} obj First object
 * @param {object} other Second object
 * @return {boolean}
 * 
 */
pick.is = function(obj, other) {
  return Object.is(obj, other);
};

/**
 * Check if var is empty
 * 
 * @example
 * 
 * pick.isEmpty({}); // true
 * 
 * @param {object} obj Object to be check if empty
 * @return {boolean}
 * 
 */
pick.isEmpty = function(obj) {
  return Object.keys(obj).length === 0;
};

/**
 * Check if var is element
 * 
 * @example
 * 
 * $.isElement($("*").get());
 * 
 * @param {object} obj Object
 * @return {boolean}
 * 
 */
pick.isElement = function(obj) {
  return obj instanceof HTMLElement ||
    obj instanceof NodeList;
};

/**
 * Check if var is array
 * 
 * @example
 * 
 * pick.isArray([]);
 * 
 * @param {object} obj Object
 * @return {boolean}
 * 
 */
pick.isArray = function(obj) {
  return Array.isArray(obj);
};

/**
 * Check if var is object
 * 
 * @example
 * 
 * pick.isObject({});
 * 
 * @param {obj} obj Variable
 * @return {boolean}
 * 
 */
pick.isObject = function(obj) {
  return typeof obj === "object";
};

/**
 * Check if var is function
 * 
 * @example
 * 
 * pick.isFunction(function() {});
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isFunction = function(obj) {
  return typeof obj === "function";
};

/**
 * Check if var is string
 * 
 * @example
 * 
 * pick.isString(123); // false
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isString = function(obj) {
  return typeof obj === "string";
};

/**
 * Check if var is number
 * 
 * @example
 * 
 * pick.isNumber("123"); // false
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isNumber = function(obj) {
  return typeof obj === "number";
};

/**
 * Check if var is boolean
 * 
 * @example
 * 
 * pick.isBoolean("true"); // false
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isBoolean = function(obj) {
  return typeof obj === "boolean";
};

/**
 * Check if var is Date
 * 
 * @example
 * 
 * pick.isDate(new Date()); // true
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isDate = function(obj) {
  return obj instanceof Date;
};

/**
 * Check if var is RegExp
 * 
 * @example
 * 
 * pick.isRegExp(/unknown/g);
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isRegExp = function(obj) {
  return obj instanceof RegExp;
};

/**
 * Check if var is Error
 * 
 * @example
 * 
 * pick.isError(new Error("Something went wrong")); // true
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isError = function(obj) {
  return obj instanceof Error;
};

/**
 * Check if var is NaN
 * 
 * @example 
 * 
 * pick.isNaN(0/0); // true
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isNaN = function(obj) {
  return isNaN(obj);
};

/**
 * Check if var is null
 * 
 * @example
 * 
 * pick.isNull(null); // true
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isNull = function(obj) {
  return obj === null;
};

/**
 * Check if var is undefined
 * 
 * @example
 * 
 * pick.isUndefined(window.sample); // true
 * 
 * @param {object} obj Variable
 * @return {boolean}
 * 
 */
pick.isUndefined = function(obj) {
  return typeof obj === "undefined";
};

/**
 * Extend Object
 * 
 * @param {Object} obj Object to extend
 * @param {Object} ext Extension
 * @return {Object}
 * 
 */
pick.extend = function(obj, ext) {
  for (var i in ext) {
    if (ext.hasOwnProperty(i)) {
      obj[i] = ext[i];
    }
  }
   
  return obj;
};

/**
 * Clone
 * 
 * @param {Object} obj Object to clone
 * @return  {Object}
 * 
 */
pick.clone = function(obj, deep) {
  if (typeof obj !== "object") return {};
  
  if (deep === true) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch(ex) {
      return {};
    }
  }
   
  return Object.assign({}, obj);
};

/**
 * Each function
 * 
 * @example
 * 
 * $.each(['a', 'b', 'c'])
 * 
 * @param {Array} array Array
 * @return  {Object}
 * 
 */
pick.each = function(array) {
  if (!Array.isArray(array)) return null;
  
  return new pick.each.fn(array);
};

/**
 * Each Constructor
 * 
 * @param {Array} array Array
 * @return {null}
 * 
 */
pick.each.fn = function(array) {
  this.data = array;
};

/**
 * Each Do function
 * 
 * @example 
 * 
 * $.each(['a', 'b', 'c']).do(function(item, index) {
 *   console.log(item, index);
 * });
 * 
 * @param {function} name description
 * @return  {null}
 * 
 */
pick.each.fn.prototype.do = function(callback) {
  if (typeof callback !== "function") return;
  
  for (var i = 0; i < this.data.length; i++) {
    callback(this.data[i], i);
  }
  
  return;
};

/**
 * Map (Return's new array mapping passed through iteration callback)
 * 
 * @example
 * 
 * $.each([1, 2, 3]).map(function(num){ return num * 2; });
 * 
 * @param {function} callback Callback function
 * @return {array}
 * 
 */
pick.each.fn.prototype.map = function(callback) {
  if (typeof callback !== "function") return;
  
  var data = [];
  
  for (var i = 0; i < this.data.length; i++) {
    data.push(callback(this.data[i], i));
  }
  
  return data;
};


/**
 * Filter (Return's new array mapping passed through truth iteration callback)
 * 
 * @example
 * 
 * $.each([1, 2, 3, 4, 5, 6]).filter( function(num){ return num % 2 == 0; });
 * 
 * @param {function} callback Callback function
 * @return {array}
 * 
 */
pick.each.fn.prototype.filter = function(callback) {
  if (typeof callback !== "function") return;
  
  var data = [];
  
  for (var i = 0; i < this.data.length; i++) {
    if (callback(this.data[i], i)) {
      data.push(this.data[i]);
    }
  }
  
  return data;
};

/**
 * Check if list contains value
 * 
 * @example
 * 
 * $.each([1, 2, 3, 4, 5, 6]).contains(3);
 * 
 * @param {mixed} val Value to look for
 * @return {boolean}
 * 
 */
pick.each.fn.prototype.contains = function(val) {
  return this.data.indexOf(val) > -1 ? true : false;
};
