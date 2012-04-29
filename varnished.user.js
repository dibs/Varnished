// ==UserScript==
// @namespace		varnished
// @namespace		varnished
// @include			*
// @author			denford
// @description		Adds a varnish state indicator to chrmome pages
// @version		0.1
// @match http://*/*
// @match https://*/*
// ==/UserScript==
// Usefull links:

/*global document, alert, window, $, console, XMLHttpRequest*/

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	'use strict';
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);

}


function init() {
	'use strict';
	var varnished,
		varnished_h1,
		varnished_p,
		varnished_cache,
		varnished_location,
		badge,
		cachex,
		cacheStat,
		varnex,
		headers,
		// location,
		req = new XMLHttpRequest();

	function addFont() {
		'use strict';
		var f = document.createElement("link");
		f.setAttribute("rel", "stylesheet");
		f.setAttribute("href", "http://fonts.googleapis.com/css?family=Ubuntu:400,700");
	}


	//get headers
	req.open('GET', document.location, false);
	req.send(null);
	headers = req.getAllResponseHeaders().toLowerCase();
	
	
	//is page varnish served?
	varnex = /via\: 1\.1\ varnish/;
	if (headers.search(varnex) === -1) {
		//not varnished, pack up and go home.
		return false;
	}
	
	console.log('##### HEADERS #####');
	console.log(headers);
	console.log('##### /HEADERS #####');


	//styles
	varnished = {
		'background':			'#FC0',
		'border':				'2px solid #fff',
		'width':				'150px',
		'-webkit-box-shadow':	'0px 2px 4px 1px rgba(0, 0, 0, 1)',
		'-webkit-transform':	'rotate(90deg)',
		'font-family':			'Ubuntu',
		'opacity':				'0.6',
		'position':				'fixed',
		'top':					'300px',
		'right':				'-50px',
		'height':				'50px'
	};
	varnished_h1 = {
		'font-size':			'30px',
		'color':				'#efefef',
		'padding':				'0',
		'margin':				'0',
		'line-height':			'30px',
		'text-align':			'center'
	};
	varnished_p = {
		'font-size':			'15px',
		'color':				'#efefef',
		'padding':				'0',
		'margin':				'0',
		'line-height':			'15px',
		'text-align':			'center'
	};
	varnished_cache = {
		'float':				'left',
		'text-align':			'left'
	};
	varnished_location = {
		'text-align':			'right'
	};
		
	addFont();

	//create the badge
	badge = $('<div />').addClass('varnished');

	//varnished. roll out the badge.
	$('html').append(badge);

	//embelish badge
	$('.varnished').append("<h1>Varnished</h1>");

	//style it up 
	$('.varnished').css(varnished);
	$('.varnished h1').css(varnished_h1);
	$('.varnished p').css(varnished_p);
	$('.varnished .cache').css(varnished_cache);
	$('.varnished .location').css(varnished_location);
	//is it cached?
	cachex = /x\-cacheable\:\ yes\:forced/;
	if (headers.search(cachex) === -1) {
		//console.log('NOT cached ' + headers.search(cachex));
		cacheStat = '#800';
	} else {
		//console.log('CACHED! ' + headers.search(cachex));
		cacheStat = '#080';
	}
	//which server is it coming from?
	cachex = /x\-cacheable\:\ yes\:forced/;
	if (headers.search(cachex) === -1) {
		//console.log('NOT cached ' + headers.search(cachex));
		$('.varnished').css({'background': '#FC0'});
	} else {
		//console.log('CACHED! ' + headers.search(cachex));
		$('.varnished').css({'background': '#080'});
	}
}

addJQuery(init);
