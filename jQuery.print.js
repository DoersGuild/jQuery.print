/*  jQuery.print, version 1.01
 *  (c) Sathvik Ponangi
 * Licence: CC-By (http://creativecommons.org/licenses/by/3.0/)
 *--------------------------------------------------------------------------*/

(function($) {
	// A nice closure for our definitions

	$.print = $.fn.print = function() {
		// Print a given set of elements

		var isNode = function(o) {
			/* http://stackoverflow.com/a/384380/937891 */
			return (typeof Node === "object" ? o instanceof Node : o
					&& typeof o === "object" && typeof o.nodeType === "number"
					&& typeof o.nodeName === "string");
		}

		var options, $this;

		if (isNode(this)) {
			// If `this` is a HTML element, i.e. for
			// $(selector).print()
			$this = $(this);
		} else {
			if (arguments.length > 0) {
				// $.print(selector,options)
				$this = $(arguments[0]);
				if (isNode($this[0])) {
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
			globalStyles : true,
			mediaPrint:false,
			stylesheet : null,
			rejectWindow : true,
			noPrintSelector : ".no-print",
			iframe : true,
			append : null,
			prepend : null
		}; // Default options
		options = $.extend(defaults, options); // Merge with user-options

		if (options.rejectWindow && $this[0] === window) {
			// Use document instead of window as it holds all HTML
			$this = $(document);
		}

		var styles = $("");
		if (options.globalStyles) {
			// Apply the stlyes from the current sheet to the printed page
			styles = $("style, link");
		} else if (options.mediaPrint) {
			// Apply the media-print stylesheet
			styles = $("link[media=print]");
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
		copy.append($(options.append).clone());
		copy.prepend($(options.prepend).clone());
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
				// Use the pop-up method if iframe fails for some reason
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
