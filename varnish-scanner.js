// @author denfordberriman@gmail.com
// @description Adds a varnish state indicator to chrome pages

/*global document, alert, window, $, console, XMLHttpRequest*/
var count = 0,
	varnished = 0,
	notvarnished = 0,
	failed = 0;
/* Testing new code to listen to all requests */
function speakUp (headers) {
	console.dir(headers);
}



/* listen to all request responses */
// chrome.webRequest.onCompleted.addListener(function () {
// 	console.log('call speakUp');
// }, speakUp);


chrome.webRequest.onCompleted.addListener(function(details) {
    	//console.debug(details);
    	speakUp(HttpHeaders);
	}, {
    urls: ["<all_urls>"]
});
