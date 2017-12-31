# pick.js/cookie

## cookie

Create, Get, and Remove cookies

```js

// Create cookie
$.cookie(name, value, expires, path);

// Get cookie
$.cookie(name);

// Remove cookie
$.cookie(name,  null);

```

### Parameters

```js

// Create cookie
// name - Cookie name
// value - Cookie value
// expires - Count of days before expiration (defaults `Session`)
// path - Cookie path (defaults `/`)
$.cookie(name, value, expires, path);

```

### Example

```js

// Create cookie
$.cookie('visited', '1');

// Get cookie
$.cookie('visited');

// Remove cookie
$.cookie('visited',  null);

```
