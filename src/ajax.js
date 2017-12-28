/* global pick _ ActiveXObject */

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
 *     name: 'aldricffh'
 *   },
 *   headers: {
 *     sugar: "ae0z9iHQI+VnDCN7umgQBg==",
 *     "lollipop-gzip": true
 *   },
 *   success: function(data, status, statusText, headers) {
 *     _('#text').val(data);
 *   },
 *   error: function(status, statusText) {
 *     _('#text').val(status);
 *   }
 * });
 * 
 * @param   {Object}    config   Configuration object
 * 
 */
pick.ajax = function(config) {
  if (typeof config != "object") {
    console.log("%cpick.js [ajax]: %cincorrect parameter.", "color: red; font-weight: bold;", "color: black");
    return;
  }

  /**
   * config.url is required!!!
   */
  if (typeof config.url === typeof undefined) {
    console.log("%cpick.js [ajax]: %cno url to be openned.", "color: red; font-weight: bold;", "color: black");
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
    console.log("%cpick.js [ajax]: %cthis functionality wasn\"t supported by your browser.", "color: red; font-weight: bold;", "color: black");
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
        
        headers_map[header] = value;
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
