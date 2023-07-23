function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAdditionQuestion() {
  const num1 = getRandomInt(1, 20);
  const num2 = getRandomInt(1, 20);
  const answer = num1 + num2;

  // Buat urutan acak untuk opsi jawaban
  const optionOrder = ["A", "B", "C", "D"];
  for (let i = optionOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionOrder[i], optionOrder[j]] = [optionOrder[j], optionOrder[i]];
  }

  return {
    question: `${num1} + ${num2} = ?`,
    options: {
      [optionOrder[0]]: getRandomInt(1, 40),
      [optionOrder[1]]: getRandomInt(1, 40),
      [optionOrder[2]]: getRandomInt(1, 40),
      [optionOrder[3]]: answer
    },
    answer: optionOrder[3]
  };
}

const quizQuestions = [];

for (let i = 0; i < 10; i++) {
  quizQuestions.push(createAdditionQuestion());
}

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  document.getElementById("quiz-container").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const questionElement = document.getElementById("question");
  const optionAElement = document.getElementById("optionA");
  const optionBElement = document.getElementById("optionB");
  const optionCElement = document.getElementById("optionC");
  const optionDElement = document.getElementById("optionD");

  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionAElement.textContent = currentQuestion.options.A;
  optionBElement.textContent = currentQuestion.options.B;
  optionCElement.textContent = currentQuestion.options.C;
  optionDElement.textContent = currentQuestion.options.D;
}

function checkAnswer() {
  const options = document.getElementsByName("options");
  let userAnswer;

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      userAnswer = options[i].value;
      break;
    }
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (userAnswer === currentQuestion.answer) {
    score++;
    document.getElementById("result").textContent = "Jawaban Anda benar!";
  } else {
    document.getElementById("result").textContent = "Jawaban Anda salah. Jawaban yang benar adalah " + currentQuestion.options[currentQuestion.answer] + ".";
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  const popup = document.getElementById("popup");
  const finalScoreElement = document.getElementById("final-score");
  const totalQuestionsElement = document.getElementById("total-questions");

  finalScoreElement.textContent = score;
  totalQuestionsElement.textContent = quizQuestions.length;

  popup.style.display = "block";
}

function restartQuiz() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";

  currentQuestionIndex = 0;
  score = 0;
  quizQuestions.forEach((question, index) => {
    quizQuestions[index] = createQuestion();
  });
  showQuestion();
  document.getElementById("result").textContent = "";
  document.getElementById("quiz-container").style.display = "block";
}
  showQuestion(); {
  document.getElementById("result").textContent = "";
  document.getElementById("quiz-container").style.display = "block";
  }
function continueQuiz() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
  window.location.href = "level2.html";
}