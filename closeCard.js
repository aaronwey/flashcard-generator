// constructor for creating Cloze flashcards

var fs = require('fs');

function Cloze(cloze, phrase){
	this.cloze = cloze;
	this.phrae = phrase;
}

Cloze.prototype.printInfo = function(){
	console.log("Cloze: " + this.cloze + "\nPhrase: " + this.phrase +
		"\nThis card has been added to the database!");
};

module.exports = Cloze;