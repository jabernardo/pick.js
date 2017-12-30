# pick.js/cookie

## cookie

Create, Get, and Remove cookies

```js

// Create cookie
_.cookie(name, value, expires, path);

// Get cookie
_.cookie(name);

// Remove cookie
_.cookie(name,  null);

```

### Parameters

```js

// Create cookie
// name - Cookie name
// value - Cookie value
// expires - Count of days before expiration (defaults `Session`)
// path - Cookie path (defaults `/`)
_.cookie(name, value, expires, path);

```

### Example

```js

// Create cookie
_.cookie('visited', '1');

// Get cookie

_.cookie('visited');

// Remove cookie

_.cookie('visited',  null);

```
