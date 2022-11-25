const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which team did win the 2018 World Cup?",
    choice1: "Brazil",
    choice2: "France",
    choice3: "Germany",
    choice4: "England",
    answer: 2
  },
  {
    question:
      "Who is the all-time leading World Cup goalscorer??",
    choice1: "Miroslav Klose",
    choice2: "Robert Lewandowski",
    choice3: "Wayne Rooney",
    choice4: "Cristiano Ronaldo",
    answer: 1
  },
  {
    question: " Who won the Best Young Player Award in 2018?",
    choice1: "Pablo Gavi",
    choice2: "Erling Haaland",
    choice3: "Marcus Rashford",
    choice4: "Kylian Mbappe",
    answer: 4
  },
  {
    question: "How often is the FIFA world cup?",
    choice1: "every year",
    choice2: "every 2 years",
    choice3: "every 3 years",
    choice4: "every 4 years",
    answer: 4
  },
  {
    question: "Who is the only football player to have won 3 world cups?",
    choice1: "Pele",
    choice2: "Maradonna",
    choice3: "Fernando Torres",
    choice4: "Thomas Muller",
    answer: 1
  },
  {
    question: "Which football player was nicknamed 'The Divine Bald One'?",
    choice1: "Brad Friedel",
    choice2: "Bobby Charlton",
    choice3: "Fabien Barthez",
    choice4: "Thierry Henry",
    answer: 3
  },
  {
    question: "Which of the following is not a goalkeeper?",
    choice1: "Manuel Neuer",
    choice2: "Thibaut Courtois",
    choice3: "Antoine Griezmann",
    choice4: "Gianluigi Buffon",
    answer: 3
  },
  {
    question: "What was the only team to win the World Cup on penalty kicks?",
    choice1: "Italy",
    choice2: "France",
    choice3: "Germany",
    choice4: "Brazil",
    answer: 1
  },
  {
    question: "Which player scored a record 13 goals in a single tournament?",
    choice1: "Lionel Messi",
    choice2: "Just Fontaine",
    choice3: "Cristiano Ronaldo",
    choice4: "Robert Lewandoski",
    answer: 2
  },
  {
    question: "Which sports brand has supplied every World Cup since 1970 with balls?",
    choice1: "Adidas",
    choice2: "Nike",
    choice3: "Puma",
    choice4: "Umbro",
    answer: 1
  }
];




//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("../end/end.html"); // end of the game 
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter  * 10)-10}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"]; // taking custom attribute from an object 
    choice.innerText = currentQuestion["choice" + number];  // choice = user option '<js>'
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target; // reference to the 'e' object
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; // if condition true - class to apply = correct

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();