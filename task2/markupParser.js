//import and export are JS reserved words so I have named the functions importString and exportString

$(() => {
	//initial boilerplate text
	const INITIAL_TEXT='this is the test {{input}}, {{input: some text here}}, {{textarea}}, {{textarea: some info with ":" sign}}';

	//fill the input textarea with any text that is being passed
	fillTemplate = (inputText) => $('.inputText').val(inputText);
	
	//fills the input textarea, converts the text and fills the result.
	importString = (userText) => {
		fillTemplate(userText);
		fillResult(convertString(userText));
	};
	
	//fill the results div with the converted text
	fillResult = (textAndMarkup) => $('.resultText').empty().append(textAndMarkup);

	
	//***Convert section***
	//placeholder array for the converted string
	let convertedString=[];
	//for each word in the string, call checkHTML, then pass the final result to fillResult() function, replacing double spaces. map idea is taken from https://www.codegrepper.com/code-examples/javascript/how+to+iterate+words+in+string+in+js
	convertString = (userString) => {
		console.log('converting text...')
		userString.split(' ').map(word =>
			convertedString.push(checkHTML(word))
		);
		fillResult($.parseHTML(convertedString.join(' ').replace(/  +/g, ' ')));
	};
	//if it's textarea or input, return it as html element. Two variables below are used to determine if it's opening or closing tag.
	//I was debating whether to do it with ifs or switch
	let inputOpeningTag=false;
	let textareaOpeningTag=false;
	checkHTML = (word) => {
		if(word.match('{{input}}'))
			return '<input>'
		if(word.match('{{textarea}}'))
			return '<textarea></textarea>'
		if(word.match('^{{input:')) {
			inputOpeningTag=true	
			return '<input value=\'' }
		if(word.match('}}') && inputOpeningTag===true) {
			inputOpeningTag=false
			return word.slice(0,-3)+'\'/>'}
		if(word.match('^{{textarea:')){
			textareaOpeningTag=true
			return '<textarea>'}
		if(word.match('}}') && textareaOpeningTag===true) {
			textareaOpeningTag=false
			return word.slice(0,-2)+'</textarea>'}			
		else 
			return word;
	};


	//***Export section***
	//log the converted string to console
	exportString = (textAndMarkup) => {
		console.log(encodeString(textAndMarkup))
	};
	//placeholder array for encoded string
	encodedString = [];
	//for each word in the html string, check if it's textarea or input element and encode accordingly
	encodeString = (textAndMarkup) => {
		console.log('encoding text...')
		textAndMarkup.split(' ').map(element => {
			encodedString.push(encodeHTML(element))
		})
		return encodedString.join(' ').replace(/  +/g, ' ');
	};

	//same concept as checkHTML function. check if element is textarea or input and return it in encoded format.
	let inputOpeningElement=false;
	let textareaOpeningElement=false;
	encodeHTML = (word) => {
		if(word.match('<input>'))
			return '{{input}}'
		if(word.match('<textarea></textarea>'))
			return '{{textarea}}'
		if(word.match('value=\"')) 
			return ''
		if(word.match('<input')) {
			inputOpeningElement=true	
			return '{{input:' }
		if(word.match('">') && inputOpeningElement===true) {
			inputOpeningElement=false
			return '}}'}
		if(word.match('^<textarea>')){
			textareaOpeningElement=true
			return '{{textarea:'}
		if(word.match('</textarea>$') && textareaOpeningElement===true) {
			textareaOpeningElement=false
			return word.slice(0,-11)+'}}'}			
		else 
			return word;
	};

	//fill the textarea with initial text.
	fillTemplate(INITIAL_TEXT);
	convertString($('.inputText').val());

	//handle the convert button
	$('.convertString').click(e => {
		e.preventDefault();
		convertString($('.inputText').val())
		convertedString=[];
	});

	//hande the export button
	$('.exportString').click(e => {
		e.preventDefault();
		exportString($('.resultText').html())
		encodedString=[];
	});
});