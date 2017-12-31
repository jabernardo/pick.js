# pick.js/dom

## Select

DOM Selector

```js

_("#selector"); // or
pick("#selector");

```

## ready

Document ready event

```js

_(document).ready(function() {
   console.log("DOM Completed"); 
});

```

## load

Window load event

```js

_(window).load(function() {
    console.log('All assets are loaded: ' + new Date());
});

// or

_(window).on("load", function() {
    console.log('All assets are loaded: ' + new Date());
});

```

## on

Add event listener to elements selected

Please see reference for [DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp)


```js

// Single event
_("#clickButton").on("click", function() {
    alert("hi");
});

// Multiple events
_("#text").on("click mouseenter", function() {
   alert("boo");
});

```

## perform

Trigger an event(s)

```js

_("#clickButton").perform("click");

```

## addClass

Add class to selected element(s)

```js

_("#clickButton").perform("click").addClass("clicked");

```

## removeClass

Remove class to selected element(s)

```js

_("#clickButton").perform("click").removeClass("not-clicked");

```

## hasClass

Check if one of selected element(s) has the given class

```js

var clicked = _("#clickButton").hasClass("clicked");

```

## toggleClass

Toggle class in selected element(s)

```js

_("#tab-1").toggleClass("visible");

```

## replaceClass

Replace class name of selected element(s)

```js

_("#tab-1").replaceClass("visible", "hidden");

```


## attr

Retrieve attribute value of the first selected element

```js

var tab = _(".tab").attr("data-toggle");

```

## toggle

Hide or show selected element(s)


```js

_(".tab").toggle();

```

## show

Show selected element(s)

```js

_(".tab").show();

```

## hide

Hide selected element(s)

```js

_(".tab").hide();

```

## html

Retrieve outerHTML of the first selected element or set the innerHTML
of the selected elements

```js

// Get contents
var oldContents = _(".container").html();

// Set contents
 _('.container').html("Hello <b>World</b>!");


```

## empty

Clears innerHTML, innerText, or value

```js

_("text").empty();

```

## remove

Remove selected element(s)

```js

_("button").remove();

```

## prepend

Prepend adjacent to innerHTML

```js

_("button").prepend("[");

```

## append

Append adjacent to innerHTML

```js

_("button").append("]");

```

## text

Get innerText of first selected element or set innerText of selected element(s)

```js

// Get text
var msg = _("button").text();

// Set text
_("button").text("Click here");

```

## val

Get value of first selected element or set value of selected element(s)

```js

// Get value
var val = _("button").val();

// Set value
_("button").val("Clicked");

```

## width / height

Get width / height of first selected element

```js

var width = _("button").width();
var height = _("button").height();

```

## position

Get position of first selected element

```js

_("button").position();

// Object { left: 542, top: 152 }

```

## closest

Get closest elements using selector

```js

var inputs = _("button").closest("input");

```
## parent

Get parent element (using selector or not)

```js

var form = _("button").parent("form");
var container = _("button").parent();

```
## children

Get child elements

```js

var inputs = _("#form1").children("input");

```

## siblings

Get siblings

```js

var inputs = _("#name").siblings("input");

```

## find

Find an child element

```js

var inputs = _("#form1").find("input");

```
