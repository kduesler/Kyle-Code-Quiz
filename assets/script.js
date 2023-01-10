//Questions variable//
const questions = [
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<javascript>", "<scripting>", "<js>"],
    answer: "<script>",
  },
  {
    title: "Where is the correct place to insert a JavaScript?",
    choices: [
      "Both the <head> section and the <body> section are correct",
      "The <head> section",
      "The <body> section",
      "The <header> section",
    ],
    answer: "Both the <head> section and the <body> section are correct",
  },
  {
    title: "How do you create a function in JavaScript?",
    choices: [
      "function = myFunction()",
      "function myFunction()",
      "function:myFunction()",
      "myFunction()",
    ],
    answer: "function myFunction()",
  },
  {
    title: "How do you call a function named 'myFunction?'",
    choices: [
      "call function myFunction()",
      "call myFunction()",
      "function = myFunction()",
      "myFunction()",
    ],
    answer: "myFunction()",
  },
  {
    title: "How do you write an IF statement in JavaScript?",
    choices: ["if i=5", "if(i==5)", "if i==5 then", "if i=5 then"],
    answer: "if(i==5)",
  },
];

let questionsEl = document.querySelector("#questions-div");
let choicesEl = document.querySelector("choices");
let currentQuestionIndex = 0;
let startScreenEl = document.querySelector("#startScreen");
let choice1 = document.querySelector("#choice1");
let choice2 = document.querySelector("#choice2");
let choice3 = document.querySelector("#choice3");
let choice4 = document.querySelector("#choice4");
let timeleft = 100;
let questionTitle = document.querySelector("#questionTitle");
let startButton = document.querySelector("#startButton");
let endScreenEl = document.querySelector("#end-screen");
let finalScoreEl = document.querySelector("#score");
let timerEl = document.querySelector("#time");


//start quiz button function//
let quizTimer;

function startQuiz() {
  //hide start screen//
  startScreenEl.classList.add("hide");
  questionsEl.classList.remove("hide");
  
  //timer code//
  quizTimer = setInterval(function () {
    if (timeleft <= 0) {
      timerEl.innerHTML = "Finished";
      timeleft = 0;
      clearInterval(quizTimer);
      endQuiz();
    } else {
      timerEl.innerHTML = timeleft + " seconds remaining";
    }
    timeleft -= 1;
  }, 1000);
  
  //call questions appear function//
  showQuestion();
}

//questions appear//

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  //show question//
  
  questionTitle.textContent = currentQuestion.title;
  
  //show choices//
  
  choice1.textContent = currentQuestion.choices[0];
  choice2.textContent = currentQuestion.choices[1];
  choice3.textContent = currentQuestion.choices[2];
  choice4.textContent = currentQuestion.choices[3];
  choice1.setAttribute("value", currentQuestion.choices[0]);
  choice2.setAttribute("value", currentQuestion.choices[1]);
  choice3.setAttribute("value", currentQuestion.choices[2]);
  choice4.setAttribute("value", currentQuestion.choices[3]);
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    timeleft -= 10;
    timerEl.innerHTML = timeleft;
  } else if (this.value === questions[currentQuestionIndex].answer) {
    currentQuestionIndex++;
    
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
}

// //Show end screen//

function endQuiz() {
  clearInterval(quizTimer);
  
  // show score//
  endScreenEl.removeAttribute("class");
  questionsEl.classList.add("hide");
  if (timeleft <= 0) {
    finalScoreEl.textContent = 0;
  } else {
    finalScoreEl.textContent = timeleft;
  }
}

const scoresForm = document.getElementById("scores-form");
const initialsInput = document.getElementById("initials-input");
const initialsSubmit = document.getElementById("initials-submit");
const scores = document.getElementById("scores")


let scoresStorage = localStorage.getItem("scores")
    ? JSON.parse(localStorage.getItem("scores"))
    : [];

    scoresForm.addEventListener("submit", (e) => {
        e.preventDefault();
        scoresStorage.push(initialsInput.value.concat(' ' + timeleft) );
        localStorage.setItem("scores", JSON.stringify(scoresStorage));
        listBuilder(initialsInput.value.concat(' ' + timeleft));
        initialsInput.value = "";
    })

    const listBuilder = (text) => {
        const score = document.createElement("li");
        score.innerHTML = text;
        scores.appendChild(score);
    }

    scoresStorage.forEach((score) => {
        listBuilder(score);
    })
    ;

    function startQuizAgain() {
      //hide start screen//
      startScreenEl.classList.add("hide");
      questionsEl.classList.remove("hide");
      endScreenEl.classList.add("hide");
      
      //timer code//
      quizTimer = setInterval(function () {
        if (timeleft <= 0) {
          timerEl.innerHTML = "Finished";
          timeleft = 0;
          clearInterval(quizTimer);
          endQuiz();
        } else {
          timerEl.innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
      }, 1000);
      
      //call questions appear function//
      showQuestion();
    }

//event listeners
startButton.onclick = startQuiz;
startButtonAgain.onclick = startQuizAgain;
choice1.onclick = questionClick;
choice2.onclick = questionClick;
choice3.onclick = questionClick;
choice4.onclick = questionClick;
