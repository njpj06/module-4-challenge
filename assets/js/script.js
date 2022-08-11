var quizStatus = true; // Know the status of the quiz. Quiz is not running = false , running = true
var questionNumber = 0; // This tracks the question answered.
var answerNumber = 0; // This tracks next answers to show
var score = 0;
var highScore = 50;
var finalAnswerCheck = 0; // If last answer was wrong it will be validated outside of the time interval and then display as enabled = 1
var checkTimes = 1;
var viewHighScoresBtnEl = document.getElementById("view-high-scores");
var startQuizBtnEl = document.getElementById("start-quiz"); // Start Quiz button Btn El
var answer1BtnEl = document.getElementById("answer1");
var answer2BtnEl = document.getElementById("answer2");
var answer3BtnEl = document.getElementById("answer3");
var answer4BtnEl = document.getElementById("answer4");
var submitScoreEl = document.getElementById("submitScore");
var questionsEl = document.getElementById("questions"); // Questions for the main Div
var mainDivEl = document.getElementById("mainDiv"); // Main div container for all elements except for header elements
var htmlTimeLeft = document.getElementById("timeLeft"); // Display counter at the html level.
var answerCorrectWrong = document.getElementById("answerCorrectWrong"); // Display counter at the html level.
var questionDisplayEl = document.createElement("questionDisplay"); // Display Question
var finalScoreDisplayEl = document.createElement("finalScoreDisplay"); // Display Question
var enterInitialsEl = document.createElement("enterInitials"); // Enter initials
var enterInitialsTextAreaEl = document.createElement("enterInitialsTextArea"); // TextArea
var button1234 = document.createElement("button"); // Test answer 1
var timeLeft = 75;

// Do not display anything that is not ready to be displayed
answer1BtnEl.style.display = "none";
answer2BtnEl.style.display = "none";
answer3BtnEl.style.display = "none";
answer4BtnEl.style.display = "none";
submitScoreEl.style.display = "none";
answerCorrectWrong.style.display = "none";
enterInitialsTextArea.style.display = "none";

var questionsObject = {
  correct: {
    0: "Commonly used datatypes DO NOT include?",
    1: "The condition in an if / else statement enclosed with ____.",
    2: "Arrays in JavaScript can be used to store _____.", // Button #4 for
    3: "A very useful tool used during development and debugging for printing content to the debugger is:", // Button #3
    4: "String values must be enclosed within _____ when being assigned to variables:",
  },
};
var answersObject = {
  answers: {
    0: {
      0: "Strings",
      1: "Boolean",
      2: "Alerts",
      3: "Numbers",
    },
    1: {
      0: "Parentheses",
      1: "Curly Brackets",
      2: "Quotes",
      3: "Square Brackets",
    },
    2: {
      // Button #3
      0: "Javascript",
      1: "Terminal/bash",
      2: "For loops",
      3: "Console.log",
    },
    3: {
      // Answer to question 5 --> Button #2
      0: "Commas",
      1: "Curly brackets",
      2: "Quotes",
      3: "Parentheses",
    },
    4: {
      // Button #4
      0: "Number of strings",
      1: "Other arrays",
      2: "Booleans",
      3: "All of the above",
    },
  },
};

htmlTimeLeft.textContent = timeLeft;

viewHighScoresBtnEl.addEventListener("click", function () {
  // View high scores

  var quizUsers = "";
  var substringTest = "";
  var highScores = "";

  for (var i = 0; i < localStorage.length; i++) {
    var checkUserValue = [];

    quizUsers = localStorage.getItem(localStorage.key(i));
    substringTest = quizUsers.substring(0, 4);
    if (substringTest == "quiz") {
      checkUserValue = quizUsers.split(",");
      var userName = checkUserValue[0];
      highScores +=
        "User " +
        userName.substring(4) +
        " high score is: " +
        checkUserValue[1] +
        "\n";
    }
  }
  window.alert(highScores);
});

submitScoreEl.addEventListener("click", function () {
  var quizLocalStorage = "quiz";
  var quizUserDetails = "";
  var value = [];

  //If good input the value will be assign properly.

  quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;
  value = [quizUserDetails, highScore];

  if (!localStorage.length) {
    localStorage.setItem("test", "test");
  }

  for (var i = 0; i < localStorage.length; i++) {
    var checkUser = "";
    var checkUserValue = [];

    quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;

    checkUser = localStorage.getItem(quizUserDetails);

    if (checkUser == null) {
      // New user, no need to split
      localStorage.setItem(quizUserDetails, value); // Value is equal to
      window.alert("Your score of " + highScore + " has been submitted!");
      break;
    } else if (checkUser != null) {
      checkUserValue = checkUser.split(","); // Split since the ojbect exist in local storage
    }

    if (
      quizUserDetails == checkUserValue[0] &&
      highScore == checkUserValue[1]
    ) {
      // Only insert if the current highScore is higher,
      // otherwise let the user know they had a higher score alreay
      localStorage.setItem(quizUserDetails, value); // Value is equal to
      window.alert(
        highScore +
          " " +
          "is the latest entry for user initial " +
          enterInitialsTextArea.value +
          ". Entry will not be added."
      );
      break;
    } else if (enterInitialsTextArea.value == "") {
      window.alert("Please enter an initial");
      break;
    } else if (
      quizUserDetails == checkUserValue[0] &&
      highScore > checkUserValue[1]
    ) {
      // New high score submitted!
      localStorage.setItem(quizUserDetails, value); // Value is equal to
      window.alert(
        "New high score of " +
          highScore +
          " has been submitted!.\nYour previous score was " +
          checkUserValue[1]
      );
      break;
    } else if (
      quizUserDetails == checkUserValue[0] &&
      highScore < checkUserValue[1]
    ) {
      localStorage.setItem(quizUserDetails, value);
      window.alert(
        "Your previous code of " +
          checkUserValue[1] +
          " was higher. Entry will not be added."
      );
      break;
    } else {
      // New entry all together
      localStorage.setItem(quizUserDetails, value); // Value is equal to
      window.alert("Your score of " + highScore + " has been submitted!");
      break;
    }
  }
});

answer1BtnEl.addEventListener("mouseover", function () {
  answerCorrectWrong.style.display = "none";
});

answer2BtnEl.addEventListener("mouseover", function () {
  answerCorrectWrong.style.display = "none";
});

answer3BtnEl.addEventListener("mouseover", function () {
  answerCorrectWrong.style.display = "none";
});

answer4BtnEl.addEventListener("mouseover", function () {
  answerCorrectWrong.style.display = "none";
});

submitScoreEl.addEventListener("mouseover", function () {
  answerCorrectWrong.style.display = "none";
});

startQuizBtnEl.addEventListener("click", function () {
  //debugger;
  startQuizBtnEl.style.display = "none";
  questionDisplay.style.display = "none";
  questionDisplay1.style.display = "none";
  finalScoreDisplay.style.display = "none";
  enterInitials.style.display = "none";
  score = 0; // Score is 0 again.
  timeLeft = 75;
  htmlTimeLeft.textContent = timeLeft;
  finalAnswerCheck = 0; // Check if last question and wrong.
  checkTimes = 1; // Check timer for funciton patch.

  var timeInterval = setInterval(function () {
    if (score === 1) {
      highScore -= 10;
    }

    score = 0; // move the score back to 0 to check for another wrong answer.

    if (timeLeft >= 1 && finalAnswerCheck !== 1) {
      //Assign text content to the question from our object
      questionDisplay.textContent = questionsObject.correct[questionNumber];

      questionDisplay.style.display = ""; // Allow the questions to be displayed
      answer1BtnEl.style.display = ""; // Allow our buttons to appear
      answer2BtnEl.style.display = "";
      answer3BtnEl.style.display = "";
      answer4BtnEl.style.display = "";

      //Display asnwers to the question
      answer1BtnEl.textContent = answersObject.answers[answerNumber][0];
      answer2BtnEl.textContent = answersObject.answers[answerNumber][1];
      answer3BtnEl.textContent = answersObject.answers[answerNumber][2];
      answer4BtnEl.textContent = answersObject.answers[answerNumber][3];

      gridContainer.appendChild(questionDisplayEl);
      gridContainer.appendChild(answer1BtnEl);
      gridContainer.appendChild(finalScoreDisplayEl);
      timeLeft -= 1;
      htmlTimeLeft.textContent = timeLeft;
      console.log("time left:" + timeLeft);

      answer1BtnEl.addEventListener("click", function () {
        if (
          questionDisplay.textContent ===
            "The condition in an if / else statement enclosed with ____." &&
          answer1BtnEl.textContent === "Parentheses"
        ) {
          console.log("Correct");
          // timeLeft += 1; // Add a second for a correct answer as it will take one second to move to the next question
          questionNumber = 2; // Move to the next question which is the third questions
          answerNumber = 4;
          answerCorrectWrong.style.display = "";
          answerCorrectWrong.textContent = "Correct!";
          answerCorrectWrong.style.borderTop = "solid #800080";
          answerCorrectWrongGrid.appendChild(answerCorrectWrong);
        } else {
          switch (answer1BtnEl.textContent) {
            case "Strings":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";

              score = 1; // Give user a 10+ score
              questionNumber = 1; // Move to the next question which is the second question
              answerNumber = 1;
              break;
            case "Number of strings":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";

              score = 1; // Give user a 10+ score
              questionNumber = 3; // Move to the next question which is the second question
              answerNumber = 2;
              break;
            case "Javascript":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";

              score = 1; // Give user a 10+ score
              questionNumber = 4; // Move to the next question which is the second question
              answerNumber = 3;
              break;
            case "Commas":
              console.log("Correct");
              //timeLeft += 1; // Add a second for a correct answer as it will take one second to move to the next question
              //questionNumber = 2; // Move to the next question
              //game over
              answerCorrectWrong.style.display = ""; // Enables text content on correct and wrong answers
              answerCorrectWrong.textContent = "Correct!";
              answerCorrectWrong.style.borderTop = "solid #800080";
              answerCorrectWrongGrid.appendChild(answerCorrectWrong);
              //window.alert("Game Over"); Game is over at this point.
              questionNumber = 0; // Game is over, no more questions to show.
              answerNumber = 0; // Game is over, no more answers to show.
              console.log("I'm here" + timeInterval);
              answer1BtnEl.style.display = "none";
              answer2BtnEl.style.display = "none";
              answer3BtnEl.style.display = "none";
              answer4BtnEl.style.display = "none";
              answerCorrectWrong.style.display = "none"; // When time is over correct or wrong will go away.
              startQuizBtnEl.style.display = "none"; // Remove Start Quiz button.
              //answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
              questionDisplay.textContent = "You have finished the quiz!";
              finalScoreDisplay.style.display = ""; // Allow display for final score
              enterInitials.style.display = ""; // Display Message Enter initials
              enterInitialsTextArea.style.display = ""; // Capture user score once submitted is clicked.
              finalAnswerCheck = 1; // Final Wrong
              lastQuestionWrong();
              finalScoreDisplay.textContent =
                "Your final score is: " + highScore; // Assign the latest high score.
              enterInitials.textContent = "Enter initials: ";
              submitScoreEl.style.display = "";
              submitScoreEl.textContent = "Submit";
              //Exit the quiz/timer.
              clearInterval(timeInterval);
              break;
          }
        }
      });

      answer2BtnEl.addEventListener("click", function () {
        if (
          questionDisplay.textContent ===
            "String values must be enclosed within _____ when being assigned to variables:" &&
          answer2BtnEl.textContent === "Curly brackets"
        ) {
          console.log("Correct");
          //timeLeft += 1; // Add a second for a correct answer as it will take one second to move to the next question
          //questionNumber = 2; // Move to the next question
          //game over
          answerCorrectWrong.style.display = ""; // Enables text content on correct and wrong answers
          answerCorrectWrong.textContent = "Correct!";
          answerCorrectWrong.style.borderTop = "solid #800080";
          answerCorrectWrongGrid.appendChild(answerCorrectWrong);
          //window.alert("Game Over"); Game is over at this point.
          questionNumber = 0; // Game is over, no more questions to show.
          answerNumber = 0; // Game is over, no more answers to show.
          console.log("I'm here" + timeInterval);
          answer1BtnEl.style.display = "none";
          answer2BtnEl.style.display = "none";
          answer3BtnEl.style.display = "none";
          answer4BtnEl.style.display = "none";
          answerCorrectWrong.style.display = "none"; // When time is over correct or wrong will go away.
          startQuizBtnEl.style.display = "none"; // Remove Start Quiz button.
          //answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
          questionDisplay.textContent = "You have finished the quiz!";
          finalScoreDisplay.style.display = ""; // Allow display for final score
          enterInitials.style.display = ""; // Display Message Enter initials
          enterInitialsTextArea.style.display = ""; // Capture user score once submitted is clicked.
          finalScoreDisplay.textContent = "Your final score is: " + highScore; // Assign the latest high score.
          enterInitials.textContent = "Enter initials: ";
          submitScoreEl.style.display = "";
          submitScoreEl.textContent = "Submit";
          //Exit the quiz/timer.
          clearInterval(timeInterval);
        } else {
          switch (answer2BtnEl.textContent) {
            case "Boolean":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";

              score = 1; // Give user a 10+ score
              questionNumber = 1; // Move to the next question which is the second question
              answerNumber = 1;
              break;
            case "Curly Brackets":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";

              score = 1; // Give user a 10+ score
              questionNumber = 2; // Move to the next question which is the second question
              answerNumber = 4;
              console.log(score);
              break;
            case "Other arrays":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";
              score = 1; // Give user a 10+ score
              questionNumber = 3; // Move to the next question which is the second question
              answerNumber = 2;
              break;
            case "Terminal/bash":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";
              score = 1; // Give user a 10+ score
              questionNumber = 4; // Move to the next question which is the second question
              answerNumber = 3;
              break;
          }
        }
      });

      answer3BtnEl.addEventListener("click", function () {
        if (
          questionDisplay.textContent ===
            "Commonly used datatypes DO NOT include?" &&
          answer3BtnEl.textContent === "Alerts"
        ) {
          console.log("Correct");
          //timeLeft += 1; // Add a second for a correct answer as it will take one second to move to the next question
          questionNumber = 1; // Move to the next question which is the second question
          answerNumber = 1;
          answerCorrectWrong.style.display = ""; // Enables text content on correct and wrong answers
          answerCorrectWrong.textContent = "Correct!";
          answerCorrectWrong.style.borderTop = "solid #800080";
          answerCorrectWrongGrid.appendChild(answerCorrectWrong);
        } else if (
          questionDisplay.textContent ===
            "A very useful tool used during development and debugging for printing content to the debugger is:" &&
          answer3BtnEl.textContent === "For loops"
        ) {
          console.log("Correct");
          //timeLeft += 1; // Add a second for a correct answer as it will take one second to move to the next question
          questionNumber = 4; // Move to the next question which  is the fifth question
          answerNumber = 3;
          answerCorrectWrong.style.display = ""; // Enables text content on correct and wrong answers
          answerCorrectWrong.textContent = "Correct!";
          answerCorrectWrong.style.borderTop = "solid #800080";
          answerCorrectWrongGrid.appendChild(answerCorrectWrong);
        } else if (
          questionDisplay.textContent ===
            "The condition in an if / else statement enclosed with ____." &&
          answer3BtnEl.textContent === "Quotes"
        ) {
          console.log("Inside the case now");
          answerCorrectWrong.style.display = "";
          answerCorrectWrong.textContent = "Wrong!";
          answerCorrectWrong.style.borderTop = "solid #800080";
          score = 1; // Give user a 10+ score
          questionNumber = 2; // Move to the next question which is the second question
          answerNumber = 4;
        } else {
          switch (answer3BtnEl.textContent) {
            case "Booleans":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";
              score = 1; // Give user a 10+ score
              questionNumber = 3; // Move to the next question which is the second question
              answerNumber = 2;
              break;
            case "Quotes":
              console.log("Inside the case now");
              score = 1; // Give user a 10+ score
              questionNumber = 0; // Game is over, no more questions to show.
              answerNumber = 0; // Game is over, no more answers to show.
              console.log("I'm here" + timeInterval);
              answer1BtnEl.style.display = "none";
              answer2BtnEl.style.display = "none";
              answer3BtnEl.style.display = "none";
              answer4BtnEl.style.display = "none";
              answerCorrectWrong.style.display = "none"; // When time is over correct or wrong will go away.
              startQuizBtnEl.style.display = "none"; // Remove Start Quiz button.
              //answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
              questionDisplay.textContent = "You have finished the quiz!";
              finalScoreDisplay.style.display = ""; // Allow display for final score
              enterInitials.style.display = ""; // Display Message Enter initials
              enterInitialsTextArea.style.display = ""; // Capture user score once submitted is clicked.
              finalAnswerCheck = 1; // Final Wrong
              lastQuestionWrong();
              finalScoreDisplay.textContent =
                "Your final score is: " + highScore; // Assign the latest high score.
              enterInitials.textContent = "Enter initials: ";
              submitScoreEl.style.display = "";
              submitScoreEl.textContent = "Submit";
              //Exit the quiz/timer.
              clearInterval(timeInterval);

              break;
          }
        }
      });

      answer4BtnEl.addEventListener("click", function () {
        if (
          questionDisplay.textContent ===
            "Arrays in JavaScript can be used to store _____." &&
          answer4BtnEl.textContent === "All of the above"
        ) {
          console.log("Correct");
          // timeLeft += 1; // Add a second for a correct answer as it will take one second to move to the next question
          //Game is overquestionNumber = 4; // Move to the next question
          questionNumber = 3; // Move to the next question which is the fourth question
          answerNumber = 2;
          answerCorrectWrong.style.display = ""; // Enables text content on correct and wrong answers
          answerCorrectWrong.textContent = "Correct!";
          answerCorrectWrong.style.borderTop = "solid #800080";
          answerCorrectWrongGrid.appendChild(answerCorrectWrong);
        } else {
          switch (answer4BtnEl.textContent) {
            case "Numbers":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";
              score = 1; // Give user a 10+ score
              questionNumber = 1; // Move to the next question which is the second question
              answerNumber = 1;
              break;
            case "Square Brackets":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";
              score = 1; // Give user a 10+ score
              questionNumber = 2; // Move to the next question which is the second question
              answerNumber = 4;
              break;
            case "Console.log":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";
              score = 1; // Give user a 10+ score
              questionNumber = 4; // Move to the next question which is the second question
              answerNumber = 3;
              break;
            case "Parentheses":
              console.log("Inside the case now");
              answerCorrectWrong.style.display = "";
              answerCorrectWrong.textContent = "Wrong!";
              answerCorrectWrong.style.borderTop = "solid #800080";
              score = 1; // Give user a 10+ score
              //questionNumber = 4; // Move to the next question which is the second question
              //answerNumber = 3;
              questionNumber = 0; // Game is over, no more questions to show.
              answerNumber = 0; // Game is over, no more answers to show.
              console.log("I'm here" + timeInterval);
              answer1BtnEl.style.display = "none";
              answer2BtnEl.style.display = "none";
              answer3BtnEl.style.display = "none";
              answer4BtnEl.style.display = "none";
              answerCorrectWrong.style.display = "none"; // When time is over correct or wrong will go away.
              startQuizBtnEl.style.display = "none"; // Remove Start Quiz button.
              //answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
              questionDisplay.textContent = "You have finished the quiz!";
              finalScoreDisplay.style.display = ""; // Allow display for final score
              enterInitials.style.display = ""; // Display Message Enter initials
              enterInitialsTextArea.style.display = ""; // Capture user score once submitted is clicked.
              finalAnswerCheck = 1; // Final Wrong
              lastQuestionWrong();
              finalScoreDisplay.textContent =
                "Your final score is: " + highScore; // Assign the latest high score.
              enterInitials.textContent = "Enter initials: ";
              submitScoreEl.style.display = "";
              submitScoreEl.textContent = "Submit";
              //Exit the quiz/timer.
              clearInterval(timeInterval);
              break;
          }
        }
      });
    } else if (timeLeft === 0) {
      console.log("I'm here" + timeInterval);
      questionNumber = 0; // Reset all questions
      answerNumber = 0; // Reset all possible answers.
      answer1BtnEl.style.display = "none";
      answer2BtnEl.style.display = "none";
      answer3BtnEl.style.display = "none";
      answer4BtnEl.style.display = "none";
      answerCorrectWrong.style.display = "none"; // When time is over correct or wrong will go away.
      //answerCorrectWrong.style.display=""; // Enables text content on correct and wrong answers
      questionDisplay.textContent =
        'Game Over! Try again by clicking on "Click Start Quiz"';
      startQuizBtnEl.style.display = "";
      clearInterval(timeInterval);
    }
  }, 1000);
});

function lastQuestionWrong() {
  if (finalAnswerCheck === 1 && checkTimes === 1) {
    highScore -= 10;
    checkTimes = 2;
    return highScore;
  }
}

(function () {
  var sec = 60;
  function startTimer() {
    console.log("timer suppose to go");
    var timer = setInterval(function () {
      sec--;
      document.getElementById("timerDisplay").innerHTML = "00:" + sec;
      if (sec < 0) {
        clearInterval(timer);
        alert("Time is up!");
      }
    }, 1000);
  }
  document.getElementById("incorrect").addEventListener("click", function () {
    sec -= 5;
    document.getElementById("timerDisplay").innerHTML = "00:" + sec;
  });
  startTimer();
})();
