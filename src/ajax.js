/* global pick $ ActiveXObject */

/**
 * Ajax Call
 * 
 * @example
 * 
 * pick.ajax({
 *   url: 'https://lmvc-jabernardo.c9users.io/test',
 *   method:'post',
 *   async: false,
 *   auth: {
 *     uid: 'aldrich',
 *     pwd: 'pwd1q2'
 *   },
 *   data: {
 *     name: 'aldrich'
 *   },
 *   headers: {
 *     sugar: "ae0z9iHQI+VnDCN7umgQBg==",
 *     "lollipop-gzip": true
 *   },
 *   success: function(data, status, statusText, headers) {
 *     $('#text').val(data);
 *   },
 *   error: function(status, statusText) {
 *     $('#text').val(status);
 *   }
 * });
 * 
 * @param   {Object}    config   Configuration object
 * 
 */
pick.ajax = function(config) {
  if (typeof config != "object") {
    console.error("%cpick.js [ajax]: %cincorrect parameter.", "color: red; font-weight: bold;", "color: black");
    return;
  }

  /**
   * config.url is required!!!
   */
  if (typeof config.url === typeof undefined) {
    console.error("%cpick.js [ajax]: %cno url to be openned.", "color: red; font-weight: bold;", "color: black");
    return;
  }

  /**
   * @var {String} method to be used (default is GET)
   */
  config.method = (typeof config.method !== typeof undefined) ? config.method.toUpperCase() : "GET";

  /**
   * @var {String} Callback method for success (default is anon func)
   */
  config.success = (typeof config.success === "function") ? config.success : function() {};

  /**
   * @var {String} Callback method for error (default is anon func)
   */
  config.error = (typeof config.error === "function") ? config.error : function() {};

  /**
   * @var {String} Converted data to URI form
   */
  config.dataURI = "";

  /**
   * @var {Boolean} Is request async? (default `true`)s
   */
  config.async = (typeof config.async === "boolean") ? config.async : true;

  /**
   * @var {Mixed} Authentication
   */
  config.auth = (typeof config.auth === "object") ? config.auth : false;

  // Url encode parameters so make sure everything was sent
  if (typeof config.data === "object") {
    var _parts = [];

    for (var v in config.data) {
      if (config.data.hasOwnProperty(v)) {
        _parts.push(encodeURIComponent(v) + "=" + encodeURIComponent(config.data[v]));
      }
    }

    config.dataURI = _parts.join("&");
  }
  /**
   * @var XHR Object (default is none)
   * 
   */
  var xhr_call = null;

  /**
   * Let"s check if ActiveXObject is available
   * 
   */
  if (typeof ActiveXObject !== typeof undefined) {
    xhr_call = new ActiveXObject("MSXML2.XMLHTTP.3.0");
  } else if (typeof XMLHttpRequest !== typeof undefined) {
    xhr_call = new XMLHttpRequest();
  } else {
    console.error("%cpick.js [ajax]: %cthis functionality wasn\"t supported by your browser.", "color: red; font-weight: bold;", "color: black");
    return;
  }

  // Initialize xhr call
  if (config.auth && 
      typeof config.auth.uid !== "undefined" &&
      typeof config.auth.pwd !== "undefined") {
    xhr_call.open(config.method, config.url, config.async, config.auth.uid, config.auth.pwd);
  } else {
    xhr_call.open(config.method, config.url, config.async);
  }

  if (config.dataURI) {
    // Set content type for url encoded parameters
    xhr_call.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }

  // Parse headers in config
  // { sugar: 'GH2BLMGPRcetXSuXjaZXFQ==' }
  if (typeof config.headers === "object") {
    for (var k in config.headers){
      if (config.headers.hasOwnProperty(k)) {
        xhr_call.setRequestHeader(k, config.headers[k]);
      }
    }
  }

  /**
   * Register onload function for xhr call
   * 
   * @return  {undefined}
   * 
   */
  xhr_call.onload = function() {
    if (xhr_call.status === 200) {
      var response = "";

      if (xhr_call.responseXML !== null) {
        response = xhr_call.responseXML;
      } else {
        try {
          response = JSON.parse(xhr_call.responseText);
        } catch (ex) {
          response = xhr_call.responseText;
        }
      }
      
      // Build-up response headers map
      var headers = xhr_call.getAllResponseHeaders().trim().split(/[\r\n]+/);
      var headers_map = {};
      
      headers.forEach(function (line) {
        var parts = line.split(': ');
        var header = parts.shift();
        var value = parts.join(': ');
        
        headers_map[header.toLowerCase()] = value;
      });
      
      // Success callback
      config.success(response, xhr_call.status, xhr_call.statusText, headers_map);
    } else {
      // Error callback
      config.error(xhr_call.status, xhr_call.statusText);
    }
  };

  // Send request ...
  xhr_call.send(config.dataURI);
};

/**
 * Synchronous data fetch using XHR call
 * 
 * @example
 * 
 * var news = $.fetch('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty');
 * 
 * @param {string} url URL to fetch
 * @param {object} data Data to submit
 * @return {mixed}
 * 
 */
pick.fetch = function(url, data) {
  var result = null;
  
  if (typeof data !== "undefined") {
    data = {};
  }
  
  pick.ajax({
    "url": url,
    "method": "GET",
    "data": data,
    "async": false,
    "success": function(data) {
      result = data;
    }
  });
  
  return result;
};

/**
 * GET Request
 * 
 * @param {string} url URL
 * @param {object} data Data to be sent
 * @param {function} callback Success callback
 * @return {undefined}
 * 
 */
pick.get = function(url, data, callback) {
  pick.ajax({
    "url": url,
    "method": "GET",
    "data": data,
    "success": callback,
    "error": function(status, statusText) {
      console.error("%cpick.js [ajax]: %cerror " + status, "color: red; font-weight: bold;", "color: black");
    }
  });
};

/**
 * POST Request
 * 
 * @param {string} url URL
 * @param {object} data Data to be sent
 * @param {function} callback Success callback
 * @return {undefined}
 * 
 */
pick.post = function(url, data, callback) {
  pick.ajax({
    "url": url,
    "method": "POST",
    "data": data,
    "success": callback,
    "error": function(status, statusText) {
      console.error("%cpick.js [ajax]: %cerror " + status, "color: red; font-weight: bold;", "color: black");
    }
  });
};

/**
 * Get Script
 * 
 * @param {string} url URL
 * @param {function} callback Callback
 * @return {undefined}
 * 
 */
pick.getScript = function(url, callback) {
  pick.ajax({
    "url": url,
    "method": "GET",
    "success": function(data, status, statusText, headers) {
      if (headers["content-type"] &&
          /(text|application)\/javascript/gi.test(headers["content-type"]) > -1) {
        (window.execScript ||
          function (data) {
            window["eval"].call(window, data);
            if (typeof callback === "function") {
              callback();
            }
        })(data);
      }
    },
    "error": function() {
      console.error("%cpick.js [ajax]: %cerror on getting external script.", "color: red; font-weight: bold;", "color: black");
    }
  });
};
