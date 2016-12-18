var unanswered = 0;
var answeredWrong =0;
var answeredCorrect = 0;
var triviaQuestions = 0;
var timeLeft = 10;

var trivia = [{

	question: "How many Pok\351mons does Eevee currently evolve to?",
	options: ["8", "6", "7", "9"],
	answer: 0,
	image: "assets/images/eevee.jpg"
	}, {

	question: "How many Pok\351mon types exist?",
	options: ["19", "18", "20", "21"],
	answer: 1,
	image: "assets/images/types.jpg"

	}, {
		
	question: "Which Pok\351mon was the first Pok\351mon created?",
	options: ["Pikachu", "Charmander", "Rhydon", "Bulbasaur"],
	answer: 2,
	image: "assets/images/rhydon.jpg"

	}, {
		
	question: "What was the default name for the main character of Pok\351mon Red and Blue?",
	options: ["Green", "Ashe", "Blue", "Red"],
	answer: 3,
	image: "assets/images/red.jpg"

	}, {

	question: "Which Pok\351mon is the heaviest Pok\351mon?",
	options: ["Mega Steelix", "Snorlax", "Primal Groudon", "Mega Rayquaza" ],
	answer: 2,
	image: "assets/images/groudon.jpg"

	}, {


	question: "Which Pok\351mon has the highest base stat?",
	options: ["Arceus", "Mega Mewtwo", "Mega Tyranitar", "Kyurem" ],
	answer: 1,
	image: "assets/images/mewtwo.jpg"
	}, {
	
	question: "What is Professor Oak's Japanese name?",
	options: ["Okido", "Okita", "Nani", "Ichigo" ],
	answer: 0,
	image: "assets/images/professor.jpg"
	
	}, {
	
	question: "How many times has Brock left the gang?",
	options: ["0", "1", "2", "3" ],
	answer: 2,
	image: "assets/images/brock.jpg"
	
	}]



$(".timerHeader").hide();

$("#startButton").on("click", function() {
	displayTrivia();
	$("#startButton").hide();
});

function displayTrivia(){
	reset();
	startGame();
	$(".timerHeader").show();
	$("#timer").html("<h4 id='time'>" + timeLeft + "</h4>");
	$("#firstQuestion").html("<h4 id='question'>" + trivia[triviaQuestions].question  + "<h4>");
	for (var i = 0; i < trivia[triviaQuestions].options.length; i++) {
		$(".answers").append("<button class=\"options\" data-id="+i+">" + trivia[triviaQuestions].options[i] + "</button>")
	}

	$(".options").on ("click", function(){
		if ($(this).data("id") === trivia[triviaQuestions].answer){
			answeredCorrect++;
			endQuestion();
			answeredCorrectly();
			
		} else {
			answeredWrong++;
			endQuestion();
			answeredWrongly();
			
		} if (triviaQuestions === trivia.length){
			setTimeout(displayGameOver, 1500);
		}
	});
}


function startGame() {
	timer = setInterval(stopWatch, 1000)
}

function stopWatch () {
 	timeLeft--;
	$("#timer").html("<h4 id='time'>" + timeLeft + "</h4>");
		if (timeLeft <= 0) {
		unanswered++;
		didntAnswer();
		endQuestion();
		
		} if (triviaQuestions === trivia.length){
			setTimeout(displayGameOver, 1500);
		}
};

function endQuestion (){
	clearInterval(timer);
	timeLeft = 10;
	setTimeout(displayTrivia, 1500)
};

function answeredCorrectly(){
	reset();
	$("#firstQuestion").append("<h4 class='correct'>Correct!</h4>");
	$(".answers").append("<img class='triviaImage' src=\'" + trivia[triviaQuestions].image + "\'>" )
	triviaQuestions++;
};
 
function answeredWrongly(){
	reset();
	$("#firstQuestion").append("<h4 class='wrong'>Wrong! The correct answer was " + trivia[triviaQuestions].options[trivia[triviaQuestions].answer] +"!</h4>");
	$(".answers").append("<img class='triviaImage' src=\'" + trivia[triviaQuestions].image + "\'>" )
	triviaQuestions++;
};

function didntAnswer(){
	reset();
	$("#firstQuestion").append("<h4 class='wrong'>Time's up! The correct answer was " + trivia[triviaQuestions].options[trivia[triviaQuestions].answer] +"!</h4>");
	$(".answers").append("<img class='triviaImage' src=\'" + trivia[triviaQuestions].image + "\'>" )
	triviaQuestions++;
};

function displayGameOver(){
	reset();
	$('#timer').hide();
	$("#firstQuestion").html("<h4 class='gameOver'>Game Over!</h4><h4 class='gameOver'>Correct: " + answeredCorrect + "</h4><h4 class='gameOver'>Wrong: " + answeredWrong + "</h4><h4 class='gameOver'>Unanswered: " + unanswered + "</h4>");
	$(".answers").html("<button id='playButton'>Play again</button>")
	triviaQuestions = 0;

	$("#playButton").on("click", function() {
	displayTrivia();
	$("#playButton").hide();
	$("#timer").show();
	unanswered = 0;
    answeredWrong =0;
    answeredCorrect = 0;
});

};


function reset(){
	clearInterval(timer);
	$(".timerHeader").hide();
	$(".options").remove();
	$("#question").remove();
	$("#time").remove();
	$(".triviaImage").remove();
	timeLeft = 10;
};