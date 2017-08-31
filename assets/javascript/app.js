$(document).ready(function() {

	var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
	var selecterAnswer;

	var questionArray = [
		{ 	
			question: "Inside which HTML element do we put the JavaScript code?",
			answers: [
				{text: "&lt;script&gt;", isCorrect: true},
				{text: "&lt;js&gt;", isCorrect: false},
				{text: "&lt;javascript&gt;", isCorrect: false},
				{text: "&lt;head&gt;", isCorrect: false}
			]
		},
		{	
			question: "What is the correct syntax for referring to an external script called 'bobsaget.js'?",
			answers: [
				{text: "&lt;script name='bobsaget.js'&gt;", isCorrect: false},
				{text: "&lt;script src='bobsaget.js'&gt;", isCorrect: true},
				{text: "&lt;script href='bobsaget.js'&gt;", isCorrect: false},
			]
		},
		{ 
			question: "How do you write an IF statement in JavaScript?",
			answers: [
				{text: "if i == 5 then", isCorrect: false},
				{text: "if i = 5", isCorrect: false},
				{text: "if i = 5 then", isCorrect: false},
				{text: "if (i == 5)", isCorrect: true}
			]
		}
	];

	
	function generateHTML() {
		var timeRemainingText = "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
		gameHTML = [timeRemainingText, "<p class='questionText text-center'>" + questionArray[questionCounter].question + "</p>"];
		for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
			gameHTML.push("<p class='answer text-center'>" + questionArray[questionCounter].answers[i].text + "</p>");
		}
		$(".mainArea").html(gameHTML.join(" "));
	}

	function generateWin() {
		correct++;
		var correctAnswerText = "<p class='correctText text-center'>CORRECT!</p>";
		gameHTML = correctAnswerText + "<img class='center-block imgCorrect' src='assets/images/check.png'>";
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
		gameHTML = wrongAnswerText + "<img class = 'center-block imgWrong' src = 'assets/images/x.png'>";
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000); 
	}

	function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		gameHTML =  timeOutText + "<img class = 'center-block imgWrong' src = 'assets/images/x.png'>";
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function timer() {
		clock = setInterval(twentySeconds, 1000);
		function twentySeconds() {
			if (counter === 0) {
				clearInterval(clock);
				generateLossAtTimeOut();
			} else if (counter > 0) {
				counter--;
			}
			$("#timer").html(counter);
		}
	}

	// function that generates html for the next screen, increments the question counter, and resets timer
	function nextDisplay() {
		if (questionCounter < questionArray.length - 1) {
			questionCounter++;
			generateHTML();
			counter = 20;
			timer();
		} else {
			finalScreen();
		}
	}

	function finalScreen() {
		gameHTML = "<p class='finishedText text-center'>Here's how you did!" + "</p>" 
			+ "<p class='summaryCorrect text-center'>Correct Answers: " + correct + "</p>" 
			+ "<p class='summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>" 
			+ "<p class='summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>" 
			+ "<p class='text-center resetButtonContainer'><a class='btn btn-primary btn-lg btn-block resetButton' href='#' role='button'>PLAY AGAIN</a></p>";
		$(".mainArea").html(gameHTML);
	}

	function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 20;
		generateHTML();
		timer();
	}

	// Function that creates the start button and initial screen
	function initialScreen() {
		startScreen = "<p class='initialText text-center'>Test your knowledge of JavaScript fundamentals!</p>"
			+ "<p class='initialText text-center'>There are 10 questions total and you will have 20 seconds to answer each one. Good luck!</p>"
			+ "<p class='text-center startButtonContainer'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startScreen);
	}

	// When the start button is clicked:
	$("body").on("click", ".start-button", function(event){ 
		generateHTML();
		timer();
	});

	// When an answer is clicked:
	$("body").on("click", ".answer", function(event){
		//answeredQuestion = true;
		selectedAnswer = $(this).val("isCorrect"); //figure out how to get value of isCorrect property
		console.log(selectedAnswer);

		if (selectedAnswer === true) {
			clearInterval(clock);
		 	generateWin();
		} else {
			clearInterval(clock);
			generateLoss();
		}

	}); 

	// When the Play Again button is clicked:
	$("body").on("click", ".resetButton", function(event){
		resetGame();
	}); 

	initialScreen();

});  

