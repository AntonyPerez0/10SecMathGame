$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
   var numberLimit = 10;


  var updateSelectedLimit = function () {
    $('#selected-limit').text(numberLimit);
  };


  $('#number-limit').on('input', function () {
    numberLimit = parseInt($(this).val());
    updateSelectedLimit();
    renderNewQuestion();
  });

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);

    if (score > highScore) {
      highScore = score;
      $('#highScore').text(highScore);
    }
  };

  var startGame = function () {
    if (!interval) {
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  var randomNumberGenerator = function () {
    return Math.ceil(Math.random() * numberLimit);
  };

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator();
    var num2 = randomNumberGenerator();

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };


  $('#user-input').on('keyup', function () {
    if (timeLeft === 0) {
      timeLeft = 10;
      updateScore(-score);
    }
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();
  updateSelectedLimit();
});
