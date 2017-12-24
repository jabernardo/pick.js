/**
 * Pick Object
 * 
 * @param   {String}    DOM Selector
 * @return  {Object}    window._.pick
 * 
 */
var _ = function(selector) {
  // Create new instance of `select`
  var ins = new window._.pick(selector);
  
  // Set count
  ins.length = ins._item.length;
  
  return ins;
};

/**
 * Select Item Object
 * 
 * @param   {String}    DOM Selector
 * 
 */
_.pick = function(selector) {
  if (typeof selector === "string") {
    this._item = document.querySelectorAll(selector);
  } else if (typeof selector === "object") {
    this._item = [selector];
  } else {
    return false;
  }
};

/**
 * Selected elements length
 * 
 * @var int length  Document count
 * 
 */
_.pick.length = 0;

/**
 * Register event
 * 
 * @param   {String}    selector    Selector
 * @param   {String}    event       Event type
 * @param   {function}  callback    Callback function
 * @return  {Object}
 * 
 */
_.pick.prototype.on = function(event, callback) {
  if (typeof callback !== "function") return;
  
  this._item.forEach(function(elem){
    event.split(" ").forEach(function(item) {
      if (typeof elem.addEventListener === "undefined") return;
      
      elem.addEventListener(item, callback, false);
    });
  });
  
  return this;
};

/**
 * Ready function
 * 
 * @param   {function}  fn  Function
 * @return  {Object}
 * 
 */
_.pick.prototype.ready = function(fn) {
  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  if (document.readyState === 'complete') {
      return fn();
  }

  // Otherwise, wait until document is loaded
  document.addEventListener('DOMContentLoaded', fn, false);
  
  return this;
};

/**
 * Add class
 * 
 * @param   {String}    name    Name of class
 * @return  {Object}
 * 
 */
_.pick.prototype.addClass = function(name) {
  this._item.forEach(function(elem) {
    if (typeof elem.getAttribute !== "undefined") {
      if (!elem.hasAttribute("class")) {
        elem.setAttribute("class", "");
      }
      
      var vals = elem.getAttribute("class") ? elem.getAttribute("class").split(" ") : [];
      vals.push(name);
      
      elem.setAttribute("class", vals.join(" "));
    }
  });
  
  return this;
};

/**
 * Remove class from element
 * 
 * @param   {String}    name    Class name
 * @return  {Object}
 * 
 */
_.pick.prototype.removeClass = function(name) {
  this._item.forEach(function(elem) {
    if (typeof elem.getAttribute !== "undefined") {
      if (!elem.hasAttribute("class")) {
        elem.setAttribute("class", "");
      }
      
      var vals = elem.getAttribute("class") ? elem.getAttribute("class").split(" ") : [];
      var vals_new = [];
      
      vals.forEach(function(v) {
        if (v !== name) {
          vals_new.push(v);
        }
      });
      
      elem.setAttribute("class", vals_new.join(" "));
    }
  });

  return this;
};

/**
 * Has class prototype
 * 
 * @param   {String}    name    Class name
 * @return  {Boolean}
 * 
 */
_.pick.prototype.hasClass = function(name) {
  var found = false;
  
  this._item.forEach(function(elem) {
    if (typeof elem.getAttribute !== "undefined") {
      if (!elem.hasAttribute("class")) {
        elem.setAttribute("class", "");
      }
      
      var vals = elem.getAttribute("class") ? elem.getAttribute("class").split(" ") : [];
      
      vals.forEach(function(v) {
        if (v === name) {
          found = true;
          return true;
        }
      });
    }
  });
  
  return found;
};

/**
 * Toggle class prototype
 * 
 * @param   {String}    name    Class name
 * @return  {Object}
 * 
 */
_.pick.prototype.toggleClass = function(name) {
  this._item.forEach(function(elem) {
    var found = false;
    
    if (typeof elem.getAttribute !== "undefined") {
      if (!elem.hasAttribute("class")) {
        elem.setAttribute("class", "");
      }
      
      var vals = elem.getAttribute("class") ? elem.getAttribute("class").split(" ") : [];
      var vals_new = [];
      
      vals.forEach(function(v) {
        if (v === name) {
          found = true;
        }
      });
      
      if (found) {
        vals.forEach(function(v) {
          if (v !== name) {
             vals_new.push(v);
          }
        });
      } else {
        vals_new = vals;
        vals_new.push(name);
      }
      
      elem.setAttribute("class", vals_new.join(" "));
    }
  });
  
  return this;
};

/**
 * Set or get attribute
 * 
 * @param   {String}    name    Attribute name
 * @param   {String}    val     Value to be set
 * @return  {Mixed}
 * 
 */
_.pick.prototype.attr = function(name, val) {
  if (typeof this._item[0] === "undefined" ||
      typeof this._item[0].getAttribute === "undefined") return null;
  
  if (typeof val !== "undefined") {
    if (typeof this._item[0].getAttribute !== "undefined") {
      this._item[0].setAttribute(name, val);
      return this;
    }
  }
  
  return this._item[0].getAttribute(name);
};

/**
 * Toggle display
 * 
 * @return  {Object}
 * 
 */
_.pick.prototype.toggle = function() {
  this._item.forEach(function(elem) {
    if (typeof elem.style !== "undefined") {
      if (elem.style.visibility === "visible" ||
        elem.style.visibility === "initial" ||
        elem.style.visibility === "") {
        elem.style.visibility = "hidden";
        elem.style.display = "none";
      } else {
        elem.style.visibility = "visible";
        elem.style.display = "initial";
      }
    }
  });

  return this;
};

/**
 * Show elemements selected
 * 
 * @return  {Object}
 * 
 */
_.pick.prototype.show = function() {
  var elem = this._item;
  
  for (var i = 0; i < elem.length; i++) {
    if (typeof elem[i].style !== "undefined") {
      elem[i].style.visibility = "visible";
      elem[i].style.display = "initial";
    }
  }
  
  return this;
};

/**
 * Hide elements selected
 * 
 * @return  {Object}
 * 
 */
_.pick.prototype.hide = function() {
  this._item.forEach(function(elem) {
    if (typeof elem.style !== "undefined") {
      elem.style.visibility = "hidden";
      elem.style.display = "none";
    }
  });
  
  return this;
};

/**
 * Get or set innerHTML
 * 
 * @param   {String}    str    HTML Code
 * @return  {Mixed}
 * 
 */
_.pick.prototype.html = function(str) {
  var elem = this._item;
  var iter = (typeof str !== "undefined") ? elem.length : 1;
  
  for (var i = 0; i < iter; i++) {
    if (typeof elem[i].innerHTML !== "undefined") {
      if (typeof str !== "undefined") {
        elem[i].innerHTML = str;
      } else {
        return elem[i].innerHTML;
      }
    }
  }
  
  return this;
};

/**
 * Get or set innerText
 * 
 * @param   {String}    str    innerText
 * @return  {Mixed}
 * 
 */
_.pick.prototype.text = function(str) {
  var elem = this._item;
  var iter = (typeof str !== "undefined") ? elem.length : 1;
  
  for (var i = 0; i < iter; i++) {
    if (typeof elem[i].innerText !== "undefined") {
      if (typeof str !== "undefined") {
        elem[i].innerText = str;
      } else {
        return elem[i].innerText;
      }
    }
  }
  
  return this;
};

/**
 * Get or set value
 * 
 * @param   {String}    str    Value
 * @return  {Mixed}
 * 
 */
_.pick.prototype.val = function(str) {
  var elem = this._item;
  var iter = (typeof str !== "undefined") ? elem.length : 1;
  
  for (var i = 0; i < iter; i++) {
    if (typeof elem[i].value !== "undefined") {
      if (typeof str !== "undefined") {
        elem[i].value = str;
      } else {
        return elem[i].value;
      }
    }
  }
  
  return this;
};
