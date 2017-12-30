# pick.js/ajax

## ajax

Create an asynchronous HTTP request

```js

pick.ajax(config); // Returns `undefined`

```

### Parameters

```js

var config = {
    // URL to send the request
    url: "https://lmvc-jabernardo.c9users.io/test",
    
    // HTTP Request method
    method:"post",
    
    // Is asynchonous? (defaults to `true`)
    async: false,
    
    // Authentication
    auth: {
        // Username
        uid: "aldrich",
        
        // Password
        pwd: "pwd1q2"
    },
    
    // Data to be sent
    data: {
        name: "aldrich"
    },
    
    // HTTP Request headers
    headers: {
        sugar: "ae0z9iHQI+VnDCN7umgQBg==",
        "lollipop-gzip": true
    },
    
    // Success callback
    // @param   {mixed}     Will be automatically converted to Object, XMLDocument, or text
    // @param   {string}    HTTP status
    // @param   {string}    HTTP status text
    // @param   {object}    Response headers in object format
    success: function(data, status, statusText, headers) {
        // Do something great here...
    },
    
    // Error callback
    // @param   {string}    HTTP status
    // @param   {string}    HTTP status text
    error: function(status, statusText) {
        // Just throw something here...
    }
};

```

### Example

```js

pick.ajax({
    url: "https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty",
    success: function(data) {
        alert("Ajax was success!!!");
    },
    error: function() {
        alert("Something went wrong!");
    }
});

```

## fetch

Fetch data from URL (synchronous ajax)

```js

pick.fetch(url); // Returns `object`, `XMLDocument`, or `string`; `null` if failed.

```

### Parameters

```js

var config = {
    // URL to fetch the data
    url: "https://lmvc-jabernardo.c9users.io/test",
    
    // Data to be sent
    data: {
        name: "testuser"
    }
};

```

### Example

```js

var news = _.fetch("https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty");

// Object { by: "dhouston", descendants: 71, id: 8863, kids: […], score: 110, time: 1175714200, title: "My YC app: Dropbox - Throw away your USB drive", type: "story", url: "http://www.getdropbox.com/u/2/screencast.html" }

```
