/*!
 * While In Use jQuery utility v0.0.1
 *
 * Copyright 2014 Rob Widmer
 * Released under the MIT license
 * http://github.com/rdubya/whileinuse
 */
(function($, window){
	'use strict';

	var internalSetTimeout = window.setTimeout, // Save a few bytes when minified
		$window = $(window); // Avoid wrapping the window object every time

	function listenOnce(func) {
		$window.one('mousemove touchstart', func);
	}

	$.whileInUse = function(action, interval) {
		var active = true; // Default this to true so it will always run the first time

		// Only create this function once so it is reused when the handler to register activity fires
		function markActive() {
			active = true;
		}

		// Only create this function once so it is reused when the handler for switching from inactive to active fires
		function executeAsync() {
			// asynchronously execute with a slight delay so a small mouse movement
			// only runs the action once and doesn't count as still being active
			// for the next interval
			internalSetTimeout(runner, 500);
		}

		function runner() {
			if (active) {
				active = false;

				// If the action returns false we will stop the interval
				// returning nothing or true will continue the interval
				if (action() != false) {
					internalSetTimeout(runner, interval);
					listenOnce(markActive);
				}
			} else {
				// No events have fired since the last execution
				// Set up a handler to restart the intervals when action happens
				listenOnce(executeAsync);
			}
		}

		internalSetTimeout(runner, interval);
	};
})(jQuery, window);
