# jQuery Print Plugin

jQuery.print is a plugin for printing specific parts of a page

## Usage

Include it in your HTML after importing jQuery, like:

```html
	<script type="text/JavaScript" src="path/to/jquery.print.js" />
```
	
Use it like:

```js
	$("#myElementId").print(/*options*/);
```
	
or

```js
	$.print("#myElementId" /*, options*/);
```

You can submit the options object like:

```js
	$("#myElementId").print({
        	globalStyles: true,
        	mediaPrint: false,
        	stylesheet: null,
        	noPrintSelector: ".no-print",
        	iframe: true,
        	append: null,
        	prepend: null,
        	manuallyCopyFormValues: true,
        	deferred: $.Deferred(),
        	timeout: 750,
        	title: null,
        	doctype: '<!doctype html>'
	});
```

Currently this plugin supports the following options:

#### globalStyles

 - Default: `true`  
 - Acceptable-Values: Boolean  
 - Function: Whether or not the styles from the parent document should be included

#### mediaPrint

 - Default: `false`  
 - Acceptable-Values: Boolean  
 - Function: Whether or not link tags with media='print' should be included; Over-riden by the `globalStyles` option

#### stylesheet

 - Default: `null`
 - Acceptable-Values: URL-string
 - Function: URL of an external stylesheet to be included

#### noPrintSelector

 - Default: `".no-print"`
 - Acceptable-Values: Any valid `jQuery-selector`
 - Function: A selector for the items that are to be excluded from printing

#### iframe

 - Default: `true`, creates a hidden iframe if no-vaild iframe selector is passed
 - Acceptable-Values: Any valid `jQuery-selector` or Boolean
 - Function: Whether to print from an iframe instead of a pop-up window; can take the `jQuery-selector` of an existing iframe as value

#### append/prepend

 - Default: `null`
 - Acceptable-Values: Any valid `jQuery-selector` or HTML-text
 - Function: Adds custom HTML before (prepend) or after (append) the selected content

#### manuallyCopyFormValues

 - Default: `true`
 - Acceptable-Values: Boolean
 - Function: Should it copy user-updated form input values onto the printed markup (this is done by manually iterating over each form element)

#### deferred

 - Default: `$.Deferred()`
 - Acceptable-Values: Any valid `jQuery.Deferred` object
 - Function: A jQuery.Deferred object that is resolved once the print function is called. Can be used [to setup callbacks - see wiki](https://github.com/DoersGuild/jQuery.print/wiki/Using-the-deferred-option-to-set-up-a-callback-after-printing)

#### timeout

 - Default: `750`
 - Acceptable-Values: Time in Milliseconds for `setTimeout`
 - Function: To change the amount of max time to wait for the content, etc to load before printing the element from the new window/iframe created, as a fallback if the [`load` event](https://developer.mozilla.org/en-US/docs/Web/Events/load) for the new window/iframe has not fired yet
 
#### title

 - Default: `null`, uses the host page title
 - Acceptable-Values: Any single-line string
 - Function: To change the printed title

#### doctype

 - Default: `'<!doctype html>'`
 - Acceptable-Values: Any valid doctype string
 - Function: To prepend a doctype to the printed document frame
 
## Tested with

### jQuery
* [jQuery](http://jquery.com/) v. 1.7.2
* [jQuery](http://jquery.com/) v. 1.9.1
* [jQuery](http://jquery.com/) v. 2.2.0
* [jQuery](http://jquery.com/) v. 3.1.1

### Browsers
* Google Chrome - v 20, 26, 48, 55
* Internet Explorer - v 10, 11
* Firefox - v 35

## License
[CC-BY](http://creativecommons.org/licenses/by/3.0/).

## Demo
[jQuery.print/demo](http://doersguild.github.io/jQuery.print/demo/)

---------------------------------------
Like our [work](http://doersguild.com)? [Get in touch!](mailto:mail@doersguild.com)
