'use strict';

var html = require('html-me');

module.exports = Thing;

Thing.byPixels = function( w /* window */, pixels, $ ){
	return new Thing(w, isActiveByPixels, pixels, $);
};

Thing.byPixelsToBottom = function( w /* window */, pixels, $ ){
	return new Thing(w, isActiveByPixelsToBottom, pixels, $);
};

Thing.byPages = function( w /* window */, pages, $ ){
	return new Thing(w, isActiveByPages, pages || 1, $);
};

function Thing( w /* window */, decidingFn, threshold, $ ){
	this.decidingFn = decidingFn;

	if (!$) {
		$ = this.$ = html.create('div');
		html.addClass($, 'to-the-top');
	}

	html.addEventListener($, 'click', function(){
		w.scroll(0, 0);
	});

	var active = this.active = false;

	var tick = function(){
		var curr = decidingFn(w, threshold);

		if (active === curr)
			return;

		active = curr;

		if (active)
			html.addClass($, 'active');
		else
			html.removeClass($, 'active');
	};

	tick();
	html.addEventListener(w.document, 'scroll', tick);
}

function isActiveByPages( w /* window */, pages ){
	return (w.pageYOffset / w.innerHeight > pages);
}

function isActiveByPixels( w /* window */, pixels ){
	return (w.pageYOffset > pixels);
}

function isActiveByPixelsToBottom( w /* window */, pixels ){
	return (w.pageYOffset + w.innerHeight > pixels);
}
