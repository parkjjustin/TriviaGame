
var unanswered = 0;
var answeredWrong =0;
var answeredCorrect = 0;
var triviaQuestions = 0;
var timeLeft = 11;

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
	$("#firstQuestion").html("<h4 id='question'>" + trivia[triviaQuestions].question  + "<h4>");
	for (var i = 0; i < trivia[triviaQuestions].options.length; i++) {
		$(".answers").append("<button class=\"options\" data-id="+i+">" + trivia[triviaQuestions].options[i] + "</button>")
	}

	$(".options").on ("click", function(){
		if ($(this).data("id") === trivia[triviaQuestions].answer){
			answeredCorrect++;
			console.log(answeredCorrect);
			endQuestion();
			answeredCorrectly();
			
		} else {
			answeredWrong++;
			console.log(answeredWrong);
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
		console.log(unanswered)
		
		} if (triviaQuestions === trivia.length){
			setTimeout(displayGameOver, 1500);
		}
};

function endQuestion (){
	clearInterval(timer);
	timeLeft = 11;
	setTimeout(displayTrivia, 1500)
};

function answeredCorrectly(){
	reset();
	$("#firstQuestion").append("<h2 class='correct'>Correct!</h2>");
	$(".answers").append("<img class='triviaImage' src=\'" + trivia[triviaQuestions].image + "\'>" )
	triviaQuestions++;
};
 
function answeredWrongly(){
	reset();
	$("#firstQuestion").append("<h2 class='wrong'>Wrong! The correct answer was</h2>" + trivia[triviaQuestions].options[trivia[triviaQuestions].answer] +"");
	$(".answers").append("<img class='triviaImage' src=\'" + trivia[triviaQuestions].image + "\'>" )
	triviaQuestions++;
};

function didntAnswer(){
	reset();
	$("#firstQuestion").append("<h2 class='wrong'>Time's up! The correct answer was</h2>" + trivia[triviaQuestions].options[trivia[triviaQuestions].answer] +"");
	$(".answers").append("<img class='triviaImage' src=\'" + trivia[triviaQuestions].image + "\'>" )
	triviaQuestions++;
};

function displayGameOver(){
	reset();
	$('#timer').remove();
	$("#firstQuestion").html("<h2 class='gameOver'>Game Over!</h2><h2 class='gameOver'>Correct: " + answeredCorrect + "</h2><h2 class='gameOver'>Wrong: " + answeredWrong + "</h2><h2 class='gameOver'>Unanswered: " + unanswered + "</h2>");
};

function reset(){
	$(".timerHeader").hide();
	$(".options").remove();
	$("#question").remove();
	$("#time").remove();
	$(".triviaImage").remove();
	timeLeft = 11;
};