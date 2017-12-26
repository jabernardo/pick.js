"uses strict";

var _, pick;

/**
 * Pick Object
 * 
 * @example
 * 
 * _('#clickButton')
 * 
 * @param   {String}    DOM Selector
 * @return  {Object}    window.pick.fn
 * 
 */
_ = pick = function(selector) {
  // Create new instance of `select`
  var ins = new pick.fn(selector);

  return ins;
};

/**
 * @var   {String}  Pick Version
 * 
 */
pick.version = "@VERSION";

/**
 * @var   {String}  Pick Author
 * 
 */
pick.author = "@AUTHOR";
