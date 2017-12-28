/* global pick _ */

/**
 * Pick Constructor
 * 
 * @param   {String}    DOM Selector
 * @return  {Void}
 * 
 */
pick.fn = function(selector) {
  if (typeof selector === "string") {
    // If selector is string use `querySelectorAll` to get NodeList from document
    this.collection = document.querySelectorAll(selector);
  } else if (typeof selector === "object" &&
    selector !== null) {
    // Make sure that Object selectors can be iterated
    if (typeof selector.forEach === "undefined") {
      this.collection = [selector];
    } else {
      this.collection = selector;
    }
  } else {
    // Make an empty default set
    this.collection = [];
  }
};

/**
 * Register event
 * 
 * @example
 * 
 * _('button').on('click', function() {
 *    // events goes here...
 * });
 * 
 * @param   {String}    selector    Selector
 * @param   {String}    event       Event type
 * @param   {function}  callback    Callback function
 * @return  {Object}
 * 
 */
pick.fn.prototype.on = function(event, callback) {
  if (typeof callback !== "function") return;
  
  this.collection.forEach(function(elem){
    event.split(" ").forEach(function(item) {
      if (typeof elem.addEventListener === "undefined") return;
      
      elem.addEventListener(item, callback, false);
    });
  });
  
  return this;
};

/**
 * Perform event
 * 
 * @example
 * 
 * _('#clickButton').perform('click');
 * 
 * @param {String} event Event(s) name
 * @return {Object}
 * 
 */
pick.fn.prototype.perform = function(event) {
  if (typeof event !== "string") return;
  
  this.collection.forEach(function(elem){
    event.split(" ").forEach(function(event_token) {
      if (typeof elem.dispatchEvent === "undefined") return;
      
      var new_event = document.createEvent('HTMLEvents');
      new_event.initEvent(event_token, true, false);
      elem.dispatchEvent(new_event);
    });
  });
  
  return this;
};

/**
 * Ready function
 * 
 * @example
 * 
 * _(document).ready(function() {
 *    // events goes here...
 * });
 * 
 * @param   {function}  fn  Function
 * @return  {Object}
 * 
 */
pick.fn.prototype.ready = function(fn) {
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
 * @example
 * 
 * _('button').addClass('btn-medium');
 * 
 * @param   {String}    name    Name of class
 * @return  {Object}
 * 
 */
pick.fn.prototype.addClass = function(name) {
  this.collection.forEach(function(elem) {
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
 * @example
 * 
 * _('button').removeClass('btn-medium');
 * 
 * @param   {String}    name    Class name
 * @return  {Object}
 * 
 */
pick.fn.prototype.removeClass = function(name) {
  this.collection.forEach(function(elem) {
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
 * @example
 * 
 * _('button').hasClass('btn-medium');
 * 
 * @param   {String}    name    Class name
 * @return  {Boolean}
 * 
 */
pick.fn.prototype.hasClass = function(name) {
  var found = false;
  
  this.collection.forEach(function(elem) {
    if (typeof elem.getAttribute !== "undefined") {
      if (!elem.hasAttribute("class")) {
        elem.setAttribute("class", "");
      }
      
      var vals = elem.getAttribute("class") ? elem.getAttribute("class").split(" ") : [];
      
      found = vals.indexOf(name) >= 0 ? true : false;
    }
  });
  
  return found;
};

/**
 * Toggle class prototype
 * 
 * @example
 * 
 * _('button').toggleClass('btn-medium');
 * 
 * @param   {String}    name    Class name
 * @return  {Object}
 * 
 */
pick.fn.prototype.toggleClass = function(name) {
  this.collection.forEach(function(elem) {
    var found = false;
    
    if (typeof elem.getAttribute !== "undefined") {
      if (!elem.hasAttribute("class")) {
        elem.setAttribute("class", "");
      }
      
      var vals = elem.getAttribute("class") ? elem.getAttribute("class").split(" ") : [];
      var vals_new = [];
      
      found = vals.indexOf(name) >= 0 ? true : false;
      
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
 * @example
 * 
 * _('button').attr('value'); // Returns value of first element
 * _('button').attr('value', 'hello'); // Set value for first element
 * 
 * @param   {String}    name    Attribute name
 * @param   {String}    val     Value to be set
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.attr = function(name, val) {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].getAttribute === "undefined") return null;
  
  if (typeof val !== "undefined") {
    if (typeof this.collection[0].getAttribute !== "undefined") {
      this.collection[0].setAttribute(name, val);
      return this;
    }
  }
  
  return this.collection[0].getAttribute(name);
};

/**
 * Toggle display
 * 
 * @example
 * 
 * _('button').toggle(); // Hide or show selected elements
 * 
 * @return  {Object}
 * 
 */
pick.fn.prototype.toggle = function() {
  this.collection.forEach(function(elem) {
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
 * @example
 * 
 * _('button').show(); // Show selected elements
 * 
 * @return  {Object}
 * 
 */
pick.fn.prototype.show = function() {
  var elem = this.collection;
  
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
 * @example
 * 
 * _('button').hide(); // hide selected elements
 * 
 * @return  {Object}
 * 
 */
pick.fn.prototype.hide = function() {
  this.collection.forEach(function(elem) {
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
 * @example
 * 
 * _('.container').html(); // Gets HTML content of first element
 * _('.container').html("Hello <b>World</b>!"); // Set HTML content of selected elements
 * 
 * @param   {String}    str    HTML Code
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.html = function(str) {
  var elem = this.collection;
  var iter = elem.length;
  
  if (typeof str !== "undefined" &&
      elem.length !== 0) {
      iter = 1;
  }
  
  for (var i = 0; i < iter; i++) {
    if (typeof elem[i].innerHTML !== "undefined") {
      if (typeof str !== "undefined") {
        elem[i].innerHTML = str;
      } else {
        return elem[i].outerHTML;
      }
    }
  }
  
  return this;
};

/**
 * Empty contents
 * 
 * @example
 * 
 * _('.container').empty(); // Empty contents of selected element
 * 
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.empty = function() {
  var elem = this.collection;
  
  for (var i = 0; i < elem.length; i++) {
    if (typeof elem[i].innerHTML !== "undefined") {
      elem[i].innerHTML = "";
    }
    
    if (typeof elem[i].innerText !== "undefined") {
      elem[i].innerText = "";
    }
    
    if (typeof elem[i].value !== "undefined") {
      elem[i].value = "";
    }
  }
  
  return this;
};

/**
 * Remove element
 * 
 * @example
 * 
 * _('button').remove(); // remove elements selected
 * 
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.remove = function() {
  this.collection.forEach(function(elem) {
    if (typeof elem.remove !== "undefined") {
        elem.remove();
    }
  });
  
  return this;
};

/**
 * Prepend content to selected elements
 * 
 * @example
 * 
 * _('button').prepend('[START]'); // Prepend text to selected elements text
 * 
 * @param   {String}    str    HTML Code
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.prepend = function(str) {
  this.collection.forEach(function(elem) {
    if (typeof elem.innerHTML !== "undefined") {
        elem.insertAdjacentHTML("afterbegin", str);
    }
  });
  
  return this;
};


/**
 * Append content to selected elements
 * 
 * @example
 * 
 * _('button').append('[END]'); // Append text to selected element's text
 * 
 * @param   {String}    str    HTML Code
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.append = function(str) {
  this.collection.forEach(function(elem) {
    if (typeof elem.innerHTML !== "undefined") {
        elem.insertAdjacentHTML("beforeend", str);
    }
  });
  
  return this;
};

/**
 * Get or set innerText
 * 
 * @example
 * 
 * _('button').text('Click here'); // Change first element text
 * 
 * @param   {String}    str    innerText
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.text = function(str) {
  var elem = this.collection;
  var iter = elem.length;
  
  if (typeof str !== "undefined" &&
      elem.length !== 0) {
      iter = 1;
  }
  
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
 * @example
 * 
 * _('button').val(); // Get current value of first element
 * _('button').val('Submit'); // Set value of selected elements
 * 
 * @param   {String}    str    Value
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.val = function(str) {
  var elem = this.collection;
  var iter = elem.length;
  
  if (typeof str !== "undefined" &&
      elem.length !== 0) {
      iter = 1;
  }
  
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

/**
 * Get element height
 * 
 * @example
 * 
 * _('button').height(); // Get height of element of first element
 * 
 * @return  {Integer}
 * 
 */
pick.fn.prototype.height = function() {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].offsetHeight === "undefined") return null;
  
  return this.collection[0].offsetHeight;
};

/**
 * Get element width
 * 
 * @example
 * 
 * _('button').width(); // Get width of element of first element
 * 
 * @return  {Integer}
 * 
 */
pick.fn.prototype.width = function() {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].offsetWidth === "undefined") return null;
  
  return this.collection[0].offsetWidth;
};

/**
 * Get element position
 * 
 * @example
 * 
 * _('button').position(); // Returns offset position of first element
 * 
 * @return  {Object}
 * 
 */
pick.fn.prototype.position = function() {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].offsetLeft === "undefined") return null;
  
  return {
    left: this.collection[0].offsetLeft,
    top: this.collection[0].offsetTop
  };
};

/**
 * Closests
 * 
 * @example
 * 
 * _('button').closest('p'); // Get closest element
 * 
 * @param   {String}    selector  DOM selector
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.closest = function(selector) {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].closest === "undefined") return null;
  
  return _(this.collection[0].closest(selector));
};

/**
 * Parent
 * 
 * @example
 * 
 * _('button').parent(); // Get parent element
 * _('button').parent('div.container'); // Get parent using selector
 * 
 * @param   {String}    selector  DOM selector
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.parent = function(selector) {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].closest === "undefined") return null;
  
    if (typeof this.collection[0].closest !== "undefined") {
      if (typeof selector !== "undefined") {
        return _(this.collection[0].closest(selector));
      } else {
        return _(this.collection[0].parentElement);
      }
    }
  
  return null;
};

/**
 * Children
 * 
 * @example
 * 
 * _('button').children(); // Get child elements
 * _('button').children('span'); // Get child using selector
 * 
 * @param   {String}    selector  DOM selector
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.children = function(selector) {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].querySelectorAll === "undefined") return null;
  
    if (typeof this.collection[0].querySelectorAll !== "undefined") {
      if (typeof selector !== "undefined") {
        return _(this.collection[0].querySelectorAll(selector));
      } else {
        return _(this.collection[0].querySelectorAll("*"));
      }
    }
  
  return null;
};


/**
 * Siblings
 * 
 * @example
 * 
 * _('button').siblings(); // Get siblings
 * _('button').siblings('a'); // Get sibling using selector
 * 
 * @param   {String}    selector  DOM selector
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.siblings = function(selector) {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].parentElement === "undefined") return null;
  
  var r = [];
  var elem = this.collection[0];
  
  if (typeof selector === "undefined") {
    this.collection[0].parentElement.childNodes.forEach(function(e) {
      if (e !== elem) r.push(e);
    });
  } else {
    this.collection[0].parentElement.querySelectorAll(selector).forEach(function(e) {
      if (e !== elem) r.push(e);
    });
  }
  
  return _(r);
};

/**
 * Find
 * 
 * @example
 * 
 * _('button').find('a'); // Get child using selector
 * 
 * @param   {String}    selector  DOM selector
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.find = function(selector) {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].querySelectorAll === "undefined") return null;
  
  return _(this.collection[0].querySelectorAll(selector));
};
