# pick.js/dom

## Select

DOM Selector

```js

$("#selector"); // or
pick("#selector");

```

## get

Get one from picked elements

```js

pick("*").get();    // Get first element
pick("*").get(5);   // 5th element found

```

## each

For-each loop selected elements

```js

pick("*").each(function(elem) {
  elem.classList.add("test");   // Vanilla JS
  pick(elem).addClass("test2"); // Pick selector
});

```

## ready

Document ready event

```js

$(document).ready(function() {
   console.log("DOM Completed"); 
});

```

## load

Window load event

```js

$(window).load(function() {
    console.log('All assets are loaded: ' + new Date());
});

// or

$(window).on("load", function() {
    console.log('All assets are loaded: ' + new Date());
});

```

## on

Add event listener to elements selected

Please see reference for [DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp)


```js

// Single event
$("#clickButton").on("click", function() {
    alert("hi");
});

// Multiple events
$("#text").on("click mouseenter", function() {
   alert("boo");
});

```

## perform

Trigger an event(s)

```js

$("#clickButton").perform("click");

```

## addClass

Add class to selected element(s)

```js

$("#clickButton").perform("click").addClass("clicked");

```

## removeClass

Remove class to selected element(s)

```js

$("#clickButton").perform("click").removeClass("not-clicked");

```

## hasClass

Check if one of selected element(s) has the given class

```js

var clicked = $("#clickButton").hasClass("clicked");

```

## toggleClass

Toggle class in selected element(s)

```js

$("#tab-1").toggleClass("visible");

```

## replaceClass

Replace class name of selected element(s)

```js

$("#tab-1").replaceClass("visible", "hidden");

```


## attr

Retrieve attribute value of the first selected element

```js

var tab = $(".tab").attr("data-toggle");

```

## toggle

Hide or show selected element(s)


```js

$(".tab").toggle();

```

## show

Show selected element(s)

```js

$(".tab").show();

```

## hide

Hide selected element(s)

```js

$(".tab").hide();

```

## html

Retrieve outerHTML of the first selected element or set the innerHTML
of the selected elements

```js

// Get contents
var oldContents = $(".container").html();

// Set contents
 $('.container').html("Hello <b>World</b>!");


```

## empty

Clears innerHTML, innerText, or value

```js

$("text").empty();

```

## remove

Remove selected element(s)

```js

$("button").remove();

```

## prepend

Prepend adjacent to innerHTML

```js

$("button").prepend("[");

```

## append

Append adjacent to innerHTML

```js

$("button").append("]");

```

## text

Get innerText of first selected element or set innerText of selected element(s)

```js

// Get text
var msg = $("button").text();

// Set text
$("button").text("Click here");

```

## val

Get value of first selected element or set value of selected element(s)

```js

// Get value
var val = $("button").val();

// Set value
$("button").val("Clicked");

```

## width / height

Get width / height of first selected element

```js

var width = $("button").width();
var height = $("button").height();

```

## position

Get position of first selected element

```js

$("button").position();

// Object { left: 542, top: 152 }

```

## closest

Get closest elements using selector

```js

var inputs = $("button").closest("input");

```
## parent

Get parent element (using selector or not)

```js

var form = $("button").parent("form");
var container = $("button").parent();

```
## children

Get child elements

```js

var inputs = $("#form1").children("input");

```

## siblings

Get siblings

```js

var inputs = $("#name").siblings("input");

```

## find

Find an child element

```js

var inputs = $("#form1").find("input");

```
