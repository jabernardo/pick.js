/* global pick _ */

/**
 * Cookie function
 * 
 * @example
 * 
 * // Get cookie
 * _.cookie('sample');
 * 
 * // Remove cookie
 * _.cookie('sample', null);
 * 
 * // Create cookie
 * * _.cookie('sample', 'hello world');
 * 
 * @param {string} name Cookie name
 * @param {string} value Value
 * @param {number} days Expiration date
 * @param {string} path (default `/``)
 * @return {mixed}
 * 
 */
pick.cookie = function(name, value, days, path) {
  // Get cookie
  if (typeof value === "undefined" &&
      typeof days === "undefined" &&
      typeof path === "undefined" &&
      typeof name === "string") {
    return pick.cookie.get(name);
  }
  
  // Remove cookie from current path
  if (value === null) {
    return pick.cookie.remove(name);
  }
  
  // Create cookie
  return pick.cookie.create(name, value, days, path);
};

/**
 * Create cookie
 * 
 * @example
 * 
 * pick.cookie.create("message", "hello world", 2);
 * 
 * @param {string} name Cookie name
 * @param {string} value Value
 * @param {number} days Expiration date
 * @param {string} path (default `/``)
 * @return {undefined}
 * 
 */
pick.cookie.create = function(name, value, days, path) {
  if (typeof name === "undefined" || typeof value === "undefined")
    return;
  
  var expires = "";
  
  if (typeof days === "number") {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString() + ";";
  }
  
  path = (typeof path === "string") ? path : "/";
  
  document.cookie = name + "=" + value + ";" + expires + "path=" + path;
};

/**
 * Get cookie from current path
 * 
 * @example
 * 
 * pick.cookie.remove('sample4');
 * 
 * @param   {string} name Cookie name
 * @return  {string}
 * 
 */
pick.cookie.get = function(name) {
  if (typeof name === "undefined")
    return;
  
  name = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  
  return null;
};

/**
 * Remove cookie
 * 
 * @example
 * 
 * console.log(pick.cookie.get('sample4'));
 * 
 * @param {string} name Cookie name
 * @param {string} path (default `/``)
 * @return {undefined}
 * 
 */
pick.cookie.remove = function(name, path) {
  if (typeof name === "undefined")
    return;
    
  path = (typeof path === "string") ? path : "/";
  
  pick.cookie.create(name, null, -1, path);
};
