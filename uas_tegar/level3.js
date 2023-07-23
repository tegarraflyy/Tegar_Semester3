function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createQuestion() {
    const num1 = getRandomInt(1, 20);
    const num2 = getRandomInt(1, 20);
    const operator = getRandomOperator();
    let answer;
    
    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
    }

    return {
      question: `${num1} ${operator} ${num2} = ?`,
      options: generateRandomOptions(answer),
      answer: getCorrectOption(answer, operator)
    };
  }

  function getRandomOperator() {
    const operators = ["+", "-", "*"];
    const randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
  }

  function generateRandomOptions(answer) {
    const options = [];
    while (options.length < 4) {
      const randomNum = getRandomInt(1, 40);
      if (options.indexOf(randomNum) === -1 && randomNum !== answer) {
        options.push(randomNum);
      }
    }
    const randomIndex = Math.floor(Math.random() * 4);
    options.splice(randomIndex, 0, answer);
    return {
      A: options[0],
      B: options[1],
      C: options[2],
      D: options[3]
    };
  }

  function getCorrectOption(answer, operator) {
    const options = generateRandomOptions(answer);
    switch (operator) {
      case "+":
        return Object.keys(options).find(key => options[key] === answer);
      case "-":
        return Object.keys(options).find(key => options[key] === answer);
      case "*":
        return Object.keys(options).find(key => options[key] === answer);
    }
  }

  const quizQuestions = [];

  for (let i = 0; i < 10; i++) {
    quizQuestions.push(createQuestion());
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
    window.location.href = "level4.html";
  }