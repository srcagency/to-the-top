# To the top

Show a link or button, when a user starts to scroll, that will take
them back to the top.

## Usage

```js
var ttt = require('to-the-top');

var t = ttt.byPixels(window, 1300);
var t = ttt.byPixelsToBottom(window, 1300);
var t = ttt.byPages(window, 1.5);	// show after 1.5 screen height

t.$ // a div DOM element you'll need to attach somewhere
```
