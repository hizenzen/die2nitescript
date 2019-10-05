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
// @downloadURL https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/Die2Nite_tools.user.js/download
// @updateURL   https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/Die2Nite_tools.user.js/download
// @require     https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/jquery.js/download
// @require     https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/jquery-ui.js/download
// @require     https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/farbtastic.js/download
// @require     https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/app.js/download
// @require     https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/mod_updateApps.js/download
// @require     https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/mod_scavengerCountdown.js/download
// @require     https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/mod_flashingEscortButton.js/download
// @require     https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/mod_ghoulHungerPercentages.js/download
// @require     https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/mod_devtools.js/download
// @resource    style.css https://sourceforge.net/projects/die2nitescript/files/Die2nitetools/style.css/download
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
