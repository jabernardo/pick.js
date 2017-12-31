/* global pick $ */

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
