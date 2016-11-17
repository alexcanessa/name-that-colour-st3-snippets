'use strict';

const fs = require('fs');
const emptyDir = require('empty-dir');
const del = require('del');
const colours = JSON.parse(fs.readFileSync('colours.json', 'utf8'));

/**
 * Dasharize a stirng
 * 
 * @param  {String} string
 * 
 * @return {String}
 */
function dasharize(string) {
	return string
			.toLowerCase()
			.replace(/\s/g, '-')
			.replace(/\//g, '');
}

/**
 * Generate the snippet body
 * 
 * @param  {String} colourName
 * @param  {String} HEX
 * 
 * @return {String}
 */
function createColourBody(colourName, HEX) {

	return `
	<snippet>
	    <content><![CDATA[\\$color-${dasharize(colourName)}]]></content>
	    <tabTrigger>C-${HEX.toUpperCase()}</tabTrigger>
	    <scope>source.scss</scope>
	    <description>${colourName} Colour</description>
	</snippet>
	`;
}

/**
 * Initialise the module 
 */
function init() {
	del.sync(['./colours/*.sublime-snippet']);

	if (!emptyDir.sync('./colours')) {
		console.log('The delete task did not work');

		return;
	}

	for (let colour in colours) {
		let filename = `./colours/${dasharize(colour)}.sublime-snippet`;

		fs.writeFileSync(filename, createColourBody(colour, colours[colour]), 'utf8');
	}

	console.log('All done!');
}

init();