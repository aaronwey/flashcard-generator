var inquirer = require('inquirer');
var fs = require('fs');
var Basic = require('./basicCard');
var Cloze = require('./closeCard');

var action = process.argv[2];
var questions = [];
var clozeQuestions = [];

// function begin() {
    // switch (action) {
    //     case "basic":
    //         basic();
    //         break;

    //     case "cloze":
    //         cloze();
    //         break;

    //     default:
    //         console.log('please enter either "basic" or "cloze" to begin the flashcard app.');
    //         // begin();
    //         break;
    // };
// };
function start(){
inquirer.prompt([
		{
			type: 'list',
			name: 'flashType',
			message: 'Which type of flashcard would you like to create?',
			choices: ['basic', 'cloze', 'exit program']
		}
	]).then(function(ans){

		if (ans.flashType==='basic'){
			basic();
		}
		else if (ans.flashType==='cloze'){
			cloze();
		}
		else if (ans.flashType==='exit'){
			process.exit();
		}

	});
};

    function basic() {
        inquirer.prompt([{
                type: 'input',
                name: 'question',
                message: 'What is the question for this card?'

            },
            {
                type: 'input',
                name: 'answer',
                message: 'What is the answer for this card?'
            }
        ]).then(function(ans) {
            var newBasic = new Basic(ans.question, ans.answer);
            newBasic.printInfo();
            var newBasicStr = JSON.stringify(newBasic);
            questions.push(newBasicStr);
            fs.appendFile('basicFlashCard.txt', newBasicStr + '\n');
            return inquirer.prompt([{
                name: 'continue',
                message: 'add another flashcard?',
                type: 'confirm',
                default: true
            }]).then(function(ans) {
                if (ans.continue) {
                    basic();
                } else {
                    console.log('Current number of basic flashcard: ' + questions.length + '.');
                    start();
                }

            });
        });
    };

    function cloze() {
        inquirer.prompt([{
                type: 'input',
                name: 'cloze',
                message: 'What would you like hidden?'
            },
            {
                type: 'input',
                name: 'phrase',
                message: 'What text completes the question?'
            }
        ]).then(function(ans) {
            var newCloze = new Cloze(ans.cloze, ans.phrase);
            newCloze.printInfo();
            var newClozeStr = JSON.stringify(newCloze);
            clozeQuestions.push(newClozeStr);
            fs.appendFile('clozeFlashCard.txt', newClozeStr + '\n');
            return inquirer.prompt([{
                name: 'continue',
                message: 'add another flashcard?',
                type: 'confirm',
                default: true
            }]).then(function(ans) {
                if (ans.continue) {
                    cloze();
                } else {
                    console.log('Current number of cloze flashcards: ' + clozeQuestions.length + '.');
                    start();
                }

            });
        });
    };

 start();

