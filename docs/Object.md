# pick.js/object

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
