// ==UserScript==

// @name        Die2Nite tools(fixed)
// @version     1.2.2
// @author      Rulesy/edited by hiZENberg
// @description     originally made by rulesy, updated and fixed by hiZENberg
// @namespace   rulesy-die2nite
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceText
// @grant       GM_info
// @include     http://www.die2nite.com/*
// @downloadURL https://github.com/hizenzen/die2nitescript/blob/master/Die2Nite_tools.user.js
// @updateURL   https://github.com/hizenzen/die2nitescript/blob/master/Die2Nite_tools.user.js
// @require     https://github.com/hizenzen/die2nitescript/blob/master/jquery.js
// @require     https://github.com/hizenzen/die2nitescript/blob/master/jquery-ui.js
// @require     https://github.com/hizenzen/die2nitescript/blob/master/farbtastic.js
// @require     https://github.com/hizenzen/die2nitescript/blob/master/app.js
// @require     https://github.com/hizenzen/die2nitescript/blob/master/mod_updateApps.js
// @require     https://github.com/hizenzen/die2nitescript/blob/master/mod_scavengerCountdown.js
// @require     https://github.com/hizenzen/die2nitescript/blob/master/mod_flashingEscortButton.js
// @require     https://github.com/hizenzen/die2nitescript/blob/master/mod_ghoulHungerPercentages.js
// @require     https://github.com/hizenzen/die2nitescript/blob/master/mod_devtools.js
// @resource    style.css https://github.com/hizenzen/die2nitescript/blob/master/style.css
// @copyright 2018, hiZEN (https://openuserjs.org//users/hiZEN)
// @license MIT

// ==/UserScript==

// @todo		names alone are not enough to identify some items. need to use images as well
// @todo		add a reset button to the flashing escort button config page	
// @todo		stop dtd updating when camped, because topology is unavailable but required

var debugMode = true;

if (!debugMode) {
	delete modules.devtools;
}

window.log = function(data) {
	if (debugMode && this.console) {
		console.log(data);
	}
};

var remoteCssUrl = 'http://www.die2nitescript.co.nf/Die2Nite_tools/style.css';

// basic jquery mutation observer extension, fuck IE for now
$.fn.domChange = function(callback) {
		
	var mutations;
	var mutationObserver;
	var selector;
	
	app.mutationObservers = app.mutationObservers || {};
	
	selector = this.selector;

	// kill any existing observers for this selector
	if (app.mutationObservers[selector]) {
		app.mutationObservers[selector].disconnect();
	}
	
	mutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	
	app.mutationObservers[selector] = new mutationObserver(function() {
		// run once, might need to make this a variable later...
		this.disconnect();

		callback();
	});
	
	mutations = {
		attributes: true,
		characterData: true,
		childList: true
	};

	this.each(function() {
		app.mutationObservers[selector].observe(this, mutations);
	});
	
};

// bootstrap
window.setInterval(function() {
	if ($('#appsettings').length === 0 && window.location.hash !== '') {
		app.settings.init();
		app.init();
	}
}, 1000);
