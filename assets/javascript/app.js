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
			question: "How do you create a function in JavaScript?",
			answers: [
				{text: "function: eatPizza()", isCorrect: false},
				{text: "function eatPizza()", isCorrect: true},
				{text: "function = eatPizza()", isCorrect: false}
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
		},
		{
			question: "Is JavaScript case-sensitive?",
			answers: [
				{text: "Yes", isCorrect: true},
				{text: "No", isCorrect: false}
			]
		},
		{
			question: "To see if three variables are all equal, we would use:",
			answers: [
				{text: "A = B = C", isCorrect: false},
				{text: "A === B === C", isCorrect: false},
				{text: "(A == B) && (B == C)", isCorrect: true},
				{text: "(A = B) && (B = C)", isCorrect: false}
			]
		},
		{ 
			question: "A property is the object-oriented equivalent of:",
			answers: [
				{text: "a function", isCorrect: false},
				{text: "a variable", isCorrect: true},
				{text: "a reserved word", isCorrect: false},
				{text: "an object", isCorrect: false}
			]	
		},
		{
			question: "Where is the correct place to insert a JavaScript?",
			answers: [
				{text: "Both the &lt;head&gt; and &lt;body&gt;", isCorrect: true},
				{text: "The &lt;head&gt; section", isCorrect: false},
				{text: "The &lt;body&gt; section", isCorrect: false}
			]
		},
		{
			question: "How does a FOR loop start?",
			answers: [
				{text: "for (i <= 5; i++)", isCorrect: false},
				{text: "for (i = 0; i <= 5)", isCorrect: false},
				{text: "for (i = 0; i <= 5; i++)", isCorrect: true},
				{text: "for i = 1 to 5", isCorrect: false}
			]
		},
		{
			question: "How do you generate a random number and round it up to the next integer?",
			answers: [
			 {text: "Math.floor(Math.random())", isCorrect: false},
			 {text: "Math.round(Math.random())", isCorrect: false},
			 {text: "Math.ceiling(Math.random())", isCorrect: false},
			 {text: "Math.ceil(Math.random())", isCorrect: true}
			]
		}
	];

	
	function generateHTML() {
		var timeRemainingText = "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
		var questionText = "<p class='questionText text-center'>" + questionArray[questionCounter].question + "</p>";
		gameHTML = timeRemainingText + questionText;
		$(".mainArea").html(gameHTML);
		for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-block text-center");
			answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
			answerButton.html(questionArray[questionCounter].answers[i].text);
			$(".mainArea").append(answerButton);
		}
	}

	function generateWin() {
		correct++;
		var correctAnswerText = "<p class='correctText text-center'>CORRECT!</p>";
		var imgHTML = "<img class='center-block imgCorrect' src='assets/images/check.png'>";
		gameHTML = correctAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/x.png'>";
		gameHTML = wrongAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000); 
	}

	function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/x.png'>";
		gameHTML =  timeOutText + imgHTML;
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
		var finishedText = "<p class='finishedText text-center'>Here's how you did!</p>";
		var summaryCorrectHTML = "<p class='summaryCorrect text-center'>Correct Answers: " + correct + "</p>";
		var summaryWrongHTML = "<p class='summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>";
		var summaryUnansweredHTML = "<p class='summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>";
		var resetButtonHTML = "<button class='resetButton btn btn-primary btn-lg btn-block text-center' type='button'>PLAY AGAIN</button>";
		gameHTML = finishedText + summaryCorrectHTML + summaryWrongHTML + summaryUnansweredHTML + resetButtonHTML;
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
		var initialText = "<p class='initialText text-center'>Test your knowledge of JavaScript fundamentals!</p> <p class='initialText text-center'>There are 10 questions total and you will have 20 seconds to answer each one. Good luck!</p>";
		var startButtonHTML = "<button class='startButton btn btn-primary btn-lg btn-block text-center' type='button'>Start Quiz</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
	}

	// When the start button is clicked:
	$("body").on("click", ".startButton", function(event){ 
		generateHTML();
		timer();
	});

	// When an answer is clicked:
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).attr("isCorrect");
		console.log(selectedAnswer);

		if (selectedAnswer === "true") { // evaluates if this is the correct answer
			clearInterval(clock);
		 	generateWin();
		} else { 	// then it's the wrong answer
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

