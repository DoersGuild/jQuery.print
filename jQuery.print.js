/*  jQuery.print, version 1.0
 *  (c) Sathvik Ponangi
 * Licence: CC-By (http://creativecommons.org/licenses/by/3.0/)
 *--------------------------------------------------------------------------*/

(function($) {
	// A nice closure for our definitions

	$.print = $.fn.print = function() {
		// Print a given set of elements

		var options, $this;

		if (this instanceof HTMLElement) {
			// If `this` is a HTML element, i.e. for
			// $(selector).print()
			$this = $(this);
		} else {
			if (arguments.length > 0) {
				// $.print(selector,options)
				$this = $(arguments[0]);
				if ($this[0] instanceof HTMLElement) {
					if (arguments.length > 1) {
						options = arguments[1];
					}
				} else {
					// $.print(options)
					options = arguments[0];
					$this = $(this);
				}
			} else {
				// $.print()
				$this = $(this);
			}
		}

		var defaults = {
			addGlobalStyles : true,
			stylesheet : null,
			rejectWindow : true,
			noPrintSelector : ".no-print",
			iframe : null,
			append : null,
			prepend : null
		}; // Default options
		options = $.extend(defaults, options); // Merge with user-options

		if (options.rejectWindow && $this[0] === window) {
			// Use document instead of window as it holds all HTML
			$this = $(document);
		}

		var styles = $("");
		if (options.addGlobalStyles) {
			// Apply the stlyes from the current sheet to the printed page
			styles = $("style, link");
		}
		if (options.stylesheet) {
			// Add a custom stylesheet if given
			styles = $.merge(styles, $('<link rel="stylesheet" href="'
					+ options.stylesheet + '">'));
		}

		var copy = $this.clone(); // Create a copy of the element to print
		copy = $("<span/>").append(copy);
		copy.find(options.noPrintSelector).remove();// Remove unwanted elements
		copy.append(styles.clone());
		copy.append(options.append);
		copy.prepend(options.prepend);
		var content = copy.html();
		copy.remove();

		var w, wdoc;
		if (options.iframe) {
			// Use an iframe for printing
			try {
				$iframe = $(options.iframe + "");
				var iframeCount = $iframe.length;
				if (iframeCount === 0) {
					// Create a new iFrame if none is given
					$iframe = $('<iframe/>').appendTo('body').hide();
				}
				w = $iframe[0];
				w = w.contentWindow || w.contentDocument;
				wdoc = w.document || w;
				wdoc.open();
				wdoc.write(content);
				w.print();
				if (iframeCount === 0) {
					// Destroy the iframe if created here
					$iframe.remove();
				}
			} catch (e) {
				w = window.open();
				w.document.write(content);
				w.print();
				w.close();
			}
		} else {
			// Use a new window for printing
			w = window.open();
			w.document.write(content);
			w.print();
			w.close();
		}
		return this;
	};

})(jQuery);
