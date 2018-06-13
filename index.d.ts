/// <reference types="jquery" />

interface JQuery {
	print(config: IPrintConfig): void;
}

interface IPrintConfig {
	globalStyles?: boolean;
	mediaPrint?: boolean;
	stylesheet?: string;
	noPrintSelector?: string;
	iframe?: boolean;
	append?: string;
	prepend?: string;
	manuallyCopyFormValues?: boolean;
	deferred?: JQueryDeferred<any>;
	timeout?: number;
	title?: string;
	doctype?: string;
}
