/* global pick $ Node NodeList HTMLElement */

/**
 * Pick Constructor
 * 
 * @param   {String}    selector DOM Selector
 * @return  {Void}
 * 
 */
pick.fn = function(selector) {
  if (typeof selector === "string") {
    // If selector is string use `querySelectorAll` to get NodeList from document
    try {
      this.collection = document.querySelectorAll(selector);
    } catch (Exception) {
      console.error("%cpick.js [dom]: %cinvalid selector.", "color: red; font-weight: bold;", "color: black");
    }
  } else if (selector instanceof NodeList ||
    selector === window ||
    selector === document ||
    selector instanceof HTMLElement ||
    (typeof selector === "object" && selector !== null && selector.hasOwnProperty("nodeName"))) {
    // Make sure that Object selectors can be iterated
    if (typeof selector.forEach === "undefined") {
      this.collection = [selector];
    } else {
      this.collection = selector;
    }
  } else {
    console.error("%cpick.js [dom]: %cinvalid selector.", "color: red; font-weight: bold;", "color: black");
  }
};

/**
 * @var {mixed} Collection
 * 
 */
pick.fn.prototype.collection = [];

/**
 * Get element from collection
 * 
 * @example
 * 
 * pick("#clickButton").get();
 * pick("*").get(2);
 * 
 * @param {number} index Element index
 * @return {mixed}
 * 
 */
pick.fn.prototype.get = function(index) {
  if (typeof this.collection === "object" &&
    typeof this.collection[index] !== "undefined") {
    return this.collection[index];
  }
  
  if (typeof this.collection === "object" &&
      typeof this.collection[0] !== "undefined" &&
      typeof index === "undefined") {
    return this.collection[0];
  }
  
  return null;
};

/**
 * Check if selected elements exists
 * 
 * @return  {boolean}
 * 
 */
pick.fn.prototype.exists = function() {
  return (this.collection.length) ? true : false;
};

/**
 * Each
 * 
 * @example
 * 
 * pick("*").each(function(elem) {
 *   elem.classList.add("test");
 *   pick(elem).addClass("test2");
 * });
 * 
 * @param {function} callback Callback function
 * @return {object}
 * 
 */
pick.fn.prototype.each = function(callback) {
  if (typeof callback !== "function") return null;
  
  this.collection.forEach(function(elem) {
      callback(elem);
  });
  
  return this;
};

/**
 * Get raw collection
 * 
 * @example
 * 
 * $("*").raw();
 * 
 * @return  {mixed}
 * 
 */
pick.fn.prototype.raw = function() {
  return this.collection;
};

/**
 * Register event
 * 
 * @example
 * 
 * $('button').on('click', function() {
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
 * $('#clickButton').perform('click');
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
 * Add class
 * 
 * @example
 * 
 * $('button').addClass('btn-medium');
 * 
 * @param   {String}    name    Name of class
 * @return  {Object}
 * 
 */
pick.fn.prototype.addClass = function(name) {
  this.collection.forEach(function(elem) {
    if (typeof elem.classList !== "undefined") {
      elem.classList.add(name);
    }
  });
  
  return this;
};

/**
 * Remove class from element
 * 
 * @example
 * 
 * $('button').removeClass('btn-medium');
 * 
 * @param   {String}    name    Class name
 * @return  {Object}
 * 
 */
pick.fn.prototype.removeClass = function(name) {
  this.collection.forEach(function(elem) {
    if (typeof elem.classList !== "undefined") {
      elem.classList.remove(name);
    }
  });

  return this;
};

/**
 * Has class prototype
 * 
 * @example
 * 
 * $('button').hasClass('btn-medium');
 * 
 * @param   {String}    name    Class name
 * @return  {Boolean}
 * 
 */
pick.fn.prototype.hasClass = function(name) {
  var found = false;
  
  this.collection.forEach(function(elem) {
    if (typeof elem.classList !== "undefined") {
      if (!found) {
        found = elem.classList.contains(name);
      }
    }
  });
  
  return found;
};

/**
 * Replace class
 *
 * @param {string} name Class name
 * @param {string} replacement Replacement class
 * @return {object}
 * 
 */
pick.fn.prototype.replaceClass = function(name, replacement) {
  this.collection.forEach(function(elem) {
    if (typeof elem.classList !== "undefined") {
      elem.classList.replace(name, replacement);
    }
  });
  
  return this;
};

/**
 * Toggle class prototype
 * 
 * @example
 * 
 * $('button').toggleClass('btn-medium');
 * 
 * @param   {String}    name    Class name
 * @return  {Object}
 * 
 */
pick.fn.prototype.toggleClass = function(name) {
  this.collection.forEach(function(elem) {
    if (typeof elem.classList !== "undefined") {
      elem.classList.toggle(name);
    }
  });
  
  return this;
};

/**
 * Set or get attribute
 * 
 * @example
 * 
 * $('button').attr('value'); // Returns value of first element
 * $('button').attr('value', 'hello'); // Set value for first element
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
 * $('button').toggle(); // Hide or show selected elements
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
 * $('button').show(); // Show selected elements
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
 * $('button').hide(); // hide selected elements
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
 * $('.container').html(); // Gets HTML content of first element
 * $('.container').html("Hello <b>World</b>!"); // Set HTML content of selected elements
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
 * $('.container').empty(); // Empty contents of selected element
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
 * $('button').remove(); // remove elements selected
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
 * $('button').prepend('[START]'); // Prepend text to selected elements text
 * 
 * @param   {String}    str    HTML Code
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.prepend = function(str) {
  this.collection.forEach(function(elem) {
    if (typeof elem.innerHTML !== "undefined") {
        if (str instanceof HTMLElement ||
            str instanceof Node) {
          elem.prepend(str);
        } else {
          elem.insertAdjacentHTML("afterbegin", str);
        }
    }
  });
  
  return this;
};


/**
 * Append content to selected elements
 * 
 * @example
 * 
 * $('button').append('[END]'); // Append text to selected element's text
 * 
 * @param   {Mixed}    str    HTML Code
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.append = function(str) {
  this.collection.forEach(function(elem) {
    if (typeof elem.innerHTML !== "undefined") {
        if (str instanceof HTMLElement ||
            str instanceof Node) {
          elem.append(str);
        } else {
          elem.insertAdjacentHTML("beforeend", str);
        }
    }
  });
  
  return this;
};

/**
 * Get or set innerText
 * 
 * @example
 * 
 * $('button').text('Click here'); // Change first element text
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
 * $('button').val(); // Get current value of first element
 * $('button').val('Submit'); // Set value of selected elements
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
 * $('button').height(); // Get height of element of first element
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
 * $('button').width(); // Get width of element of first element
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
 * $('button').position(); // Returns offset position of first element
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
 * $('button').closest('p'); // Get closest element
 * 
 * @param   {String}    selector  DOM selector
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.closest = function(selector) {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].closest === "undefined") return null;
  
  return $(this.collection[0].closest(selector));
};

/**
 * Parent
 * 
 * @example
 * 
 * $('button').parent(); // Get parent element
 * $('button').parent('div.container'); // Get parent using selector
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
        return $(this.collection[0].closest(selector));
      } else {
        return $(this.collection[0].parentElement);
      }
    }
  
  return null;
};

/**
 * Children
 * 
 * @example
 * 
 * $('button').children(); // Get child elements
 * $('button').children('span'); // Get child using selector
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
        return $(this.collection[0].querySelectorAll(selector));
      } else {
        return $(this.collection[0].querySelectorAll("*"));
      }
    }
  
  return null;
};


/**
 * Siblings
 * 
 * @example
 * 
 * $('button').siblings(); // Get siblings
 * $('button').siblings('a'); // Get sibling using selector
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
  
  return $(r);
};

/**
 * Find
 * 
 * @example
 * 
 * $('button').find('a'); // Get child using selector
 * 
 * @param   {String}    selector  DOM selector
 * @return  {Mixed}
 * 
 */
pick.fn.prototype.find = function(selector) {
  if (typeof this.collection[0] === "undefined" ||
      typeof this.collection[0].querySelectorAll === "undefined") return null;
  
  return $(this.collection[0].querySelectorAll(selector));
};
