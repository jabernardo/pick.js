# pick.js/object

## Type Checkers

### is

```js

var k = {"a":1};
$.is(k, k); // true

```

### isEmpty

```js

$.isEmpty({}); // true

```

### isElement

```js

$.isElement($("*").get());

```

### isArray

```js

$.isArray([]); // true

```

### isObject

```js

$.isObject({}); // true

```

### isFunction

```js

$.isFunction(function() {}); // true

```

### isString

```js

$.isString(123); // false

```

### isNumber

```js

$.isNumber("123"); // false

```

### isBoolean

```js

$.isBoolean("true"); // false

```

### isDate

```js

$.isDate(new Date()); // true

```

### isRegExp

```js

$.isRegExp(/unknown/g); // true

```

### isError

```js

$.isError(new Error("Something went wrong")); // true

```

### isNaN

```js

$.isNaN(0/0); // true

```

### isNull

```js

$.isNull(null); // true

```

### isUndefined

```js

$.isUndefined(window.sample); // true

```

## extend

Extend an object

```js

pick.extend(obj, ext);

```

### Sample

```js

var a = {
    a: 1
};

var b = {
    b: 2
};

var c = pick.extend(a, b);

```

## clone

Clone object

```js

pick.clone(obj, deep);

```

### Example

```js

var a = {
    a: 1
};

// Normal copy
var b = pick.clone(a);

// Deep copy
var c = pick.clone(a, true);

```

## each

For-each implementation

```js

pick.each(array).do(function);


```

### do

Iterate's only to data

```js

pick.each("abc".split("")).do(function(o, i) {
    console.log(i + ' : ' + o);
});

```

### map

Return's new array mapping passed through iteration callback

```js

$.each([1, 2, 3]).map(function(num){ return num * 2; });

// Array [ 2, 4, 6 ]

```

### filter

Return's new array mapping passed through truth iteration callback

```js

$.each([1, 2, 3, 4, 5, 6]).filter( function(num){ return num % 2 == 0; });

```

### contains

Check if list contains value

```js

$.each([1, 2, 3, 4, 5, 6]).contains(3);

```
