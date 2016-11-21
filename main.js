var wordList = new Array("sausage","blubber","pencil","cloud","moon","water","computer","school","network","hammer","walking","violently","mediocre","literature","chair","two","window","cords","musical","zebra","xylophone","penguin","home","hyena","final","inkling","teacher","funner","website","banana","uncle","softly","megatron","tenting","awesome","awesomeness","attatch","blue","internet","bottle","tight","zone","tomato","prison","hydro","cleaning","telivision","send","frog","scoopula","book","zooming","falling","evily","gamer","lid","juice","monitor","captain","bonding","loudly","thudding","guitar","mandoin","shaving","hairy","soccer","water","racket","table","lately","media","desktop","flipper","club","flying","smooth","monster","purple","guardian","bold","hyperlink","presentation","world","national","comment","element","magic","lion","sand","crust","toast","jam","hunter","forest","foraging","silently","tawesomated","joshing","pong","amphibious","serendipity","cactus","donkey","boobie","pandemonium","sniveling","carnivorous","zombie","stinky","automobile","cavernous","thalweg","tentacle","eleventh","plethora","function","hemoglobin","pterodactyl","philanthropist","carnival","exothermic","molecular","syndicate","symbiotic","industrial","paradoxical","xenophobia","potassium","carbonated","involuntary","elliptical","reproduction","ethical","unanimous","longevity","souvenir","lycanthrope","affirmative","detonate","origami","fascination","hallucinations","procrastinate","irreplaceable","replicate","connection","tundra","abstract","bombastic","reverberate");
var currentWord;
var hangMan = new Array('hangman1.png','hangman2.png','hangman3.png','hangman4.png','hangman5.png','hangman6.png','hangman7.png') //array of images 
var guesses = ""; //String of letters guessed
var wrongGuesses = 0; //number of wrong guesses
var rightLetters = 0;
var score = 0;
var games = 0;

function updateScore() {
	if(typeof(Storage)!=="undefined") {
		// Code for localStorage/sessionStorage.
		localStorage.score = score;
		localStorage.games = games;
		
		if(games != 0) {
			$('#score').html('<p>You have won ' + score + ' games out of ' + games + '.');
		}
		else {
			$('#score').html('<p>Welcome to hangman! Meet your DOOM!</p>');
		}
	}
}

function addStrike() {
	wrongGuesses++;
	//update hangMan image to the next image in the array 
	//jquery attr accepts to params, the first one is the attribute you want to modify
	//the second is the value to modify it to
	
	//if you have exceeded the length of the array, and therefore guesses u lose.
	if(wrongGuesses == (hangMan.length-1)) {
		alert('YOU LOSE! The word was ' + currentWord);
		$('IMG').attr('src','images/' + hangMan[wrongGuesses]);
		games++;
		updateScore();
		showNewGame();
	}
	else if(wrongGuesses > hangMan.length) {
		alert('go home loser your drunk!');
	}
	else {
		$('IMG').attr('src','images/' + hangMan[wrongGuesses]);
	}
}

function showNewGame() {
	$('INPUT#newGame').css({"display":"block"});
}

$(document).ready(function() {
	//choose a random word
	currentWord = wordList[Math.floor(Math.random() * wordList.length)];
	//currentWord = wordList[5];
	//populate the UL with enough LI tags to account for all the letters
	for(var a = 0;a < currentWord.length;a++) {
		$('ASIDE.board UL').append('<li></li>')
	}

	$('BUTTON').click(function() {
		/**
			every time the person guesses we need to
			
		**/
		//1. retrieve the value of the guess (stored in #guess)
		var letter = $('#guess').val();
		if(letter.length != 1) {
			alert('You must enter exactly 1 letter!');
			return null;
		}
		//2. check against the current word (check for every instance of the letter)
		/**
			indexOf returns the position (FROM 0) of the first occurrence of the 
			string in a string, or -1 if it isn't in the string
			
			eg APPLE 
			
			indexOf('a') returns 0
			indexOf('v') returns -1 since it's not in the string "apple"
			
		**/
		//if the letter is present in the guessed list...
		if(guesses.indexOf(letter) >= 0) {
			addStrike();
			return 0;
		}
		/**
			IF (right)
				add the letter to the right spot in the list
				if all letters have been accurately guessed tell the user they won
				add points to score
		**/
		if(currentWord.indexOf(letter) >= 0) {
			for(var position = 0; position < currentWord.length; position++){
				if(currentWord[position] == letter){
					$('.board UL LI:nth-child(' + (position+1) + ')').append(letter);
					rightLetters++;
				}
			}
		}
		else {
			addStrike();
		}
		//add the letter that was just guessed to the list of guesses
		guesses += letter;
		$('#guesses').append('<li>' + letter + '</li>');
		if(rightLetters == currentWord.length) {
			alert('You Win!');
			score++;
			games++;
			updateScore();
			showNewGame()
		}
	});

		
	if(typeof(Storage)!=="undefined") {
		//has the user played before?
		if(typeof(localStorage.games) !== "undefined") {
			score = localStorage.score;
			games = localStorage.games;
		}
	}
	updateScore();
		
	$('INPUT#newGame').click(function() {
		location.reload();
	});
});
