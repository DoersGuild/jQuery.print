# jQuery Print Plugin

jQuery.print is a plugin for printing specific parts of a page

## Usage

Include it in your HTML after importing jQuery, like:
	<script type="text/JavaScript" src="path/to/jquery.print.js" />
	
Use it like:

	$("#myElementId").print(/*options*/);
	
or

	$.print("#myElementId" /*, options*/);
	
You can submit the options object like:

	$("#myElementId").print({
        globalStyles: true,
        mediaPrint: false,
        stylesheet: null,
        noPrintSelector: ".no-print",
        iframe: true,
        append: null,
        prepend: null,
        manuallyCopyFormValues: true,
        deferred: $.Deferred()
	});
	
Currently this plugin supports the following options:

####globalStyles

 - Default: `true`  
 - Acceptable-Values: Boolean  
 - Function: Whether or not the styles from the parent document should be included

####mediaPrint

 - Default: `false`  
 - Acceptable-Values: Boolean  
 - Function: Whether or not link tags with media='print' should be included; Over-riden by the `globalStyles` option

####stylesheet

 - Default: `null`
 - Acceptable-Values: URL-string
 - Function: URL of an external stylesheet to be included

####noPrintSelector

 - Default: `".no-print"`
 - Acceptable-Values: Any valid `jQuery-selector`
 - Function: A selector for the items that are to be excluded from printing

####iframe

 - Default: `true`, creates a hidden iframe if no-vaild iframe selector is passed
 - Acceptable-Values: Any valid `jQuery-selector` or Boolean
 - Function: Whether to print from an iframe instead of a pop-up window; can take the `jQuery-selector` of an existing iframe as value

####append/prepend

 - Default: `null`
 - Acceptable-Values: Any valid `jQuery-selector` or HTML-text
 - Function: Adds custom HTML before (prepend) or after (append) the selected content

####manuallyCopyFormValues

 - Default: `true`
 - Acceptable-Values: Boolean
 - Function: Should it copy user-updated form input values onto the printed markup (this is done by manually iterating over each form element)

####deferred

 - Default: `$.Deferred()`
 - Acceptable-Values: Any valid `jQuery.Deferred` object
 - Function: A jQuery.Deferred object that is resolved once the print function is called

## Tested with

### jQuery
* [jQuery](http://jquery.com/) v. 1.7.2
* [jQuery](http://jquery.com/) v. 1.9.1

### Browsers
* Google Chrome - v 20, 26
* Internet Explorer - v 10

## License
[CC-BY](http://creativecommons.org/licenses/by/3.0/).

## Demo
[jQuery.print/demo](http://doersguild.github.io/jQuery.print/demo/)

---------------------------------------
Like our [work](http://doersguild.com)? [Get in touch!](mailto:mail@doersguild.com)
