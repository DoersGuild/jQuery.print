/*  jQuery.print, version 0.1
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

	$.setupPrintLink = $.fn.setupPrintLink = function() {
		// Add a link to print a given set of elements

		/*
		 * Instructions: Set Class `to-print` for the element to be printed
		 * Class `print-link` for the element inside the to-print element, used
		 * as the print icon Class `no-print` for all those elements which
		 * shouldn't be printed
		 */

		var options, $this;

		if (this instanceof HTMLElement) {
			// If `this` is a HTML element, i.e. for
			// $(selector).setupPrintLink()
			$this = $(this);
		} else {
			if (arguments.length > 0) {
				// $.setupPrintLink(selector,options)
				$this = $(arguments[0]);
				if ($this[0] instanceof HTMLElement) {
					if (arguments.length > 1) {
						options = arguments[1];
					}
				} else {
					// $.setupPrintLink(options)
					options = arguments[0];
					$this = $(this);
				}
			} else {
				// $.setupPrintLink()
				$this = $(this);
			}
		}

		var defaults = {
			addGlobalStyles : true,
			stylesheet : null,
			rejectWindow : true,
			printSelector : ".to-print",
			noPrintSelector : ".no-print",
			printLinkSelector : ".print-link",
			removePrintLink : false,
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

		// var scripts = $("script"); //Un-Comment if you want scripts to be
		// included
		// scripts = (scripts.length > 0 && scripts.html());

		var selector = $this.find(options.printSelector);
		if (selector.length === 0) {
			selector = $this;
		}
		selector.each(function() {
			// Add a print link to each of the printSelector elements
			var copy = $this.clone();
			copy = $("<span/>").append(copy);
			// Don't display these elements in printed document
			copy.find(options.noPrintSelector).remove();
			if (options.removePrintLink) {
				copy.find(options.printLinkSelector).remove();
			}
			copy.append(styles.clone());
			copy.append(options.append);
			copy.prepend(options.prepend);
			var content = copy.html();
			copy.remove();
			var linkSelector = $(this).find(options.printLinkSelector);
			if (linkSelector.length === 0) {
				linkSelector = $(this);
			}
			linkSelector.on("click select", function() {
				// Set the elements matching printLinkSelector
				// to print on click/select
				var w;
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
			});
		});
		return this;
	};
})(jQuery);
