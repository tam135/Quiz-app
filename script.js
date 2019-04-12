//stores questions and answers
const DATA = [
    {
        question: "Which one of Daenery's dragon was killed by the night king?",
        answers: ["Viserion", "Drogon", "Rhaegal", "Aegon"],
        correctAnswer: "Viserion",
    },
    {
        question: "Which of these is not one of the Stark's direwolves name?",
        answers: ["Summer", "Lady", "Winter", "Shaggy Dog"],
        correctAnswer: "Winter",
    },
    {
        question: "The mountain is the nickname for which character?",
        answers: ["Sandor Clegane", "Gregor Clegane", "Clover Clegane", "Oberyn Martell"],
        correctAnswer: "Gregor Clegane",
    },
    {
        question: "Which character said: Any man who must say 'I am the King' is no true King.?",
        answers: ["The Hound", "Tywin Lannister", "Tyrion Lannister", "Bronn"],
        correctAnswer: "Tywin Lannister",
    },
    {
        question: "Which king did Jaime Lannister kill to be given the nickname 'The king slayer'?",
        answers: ["Aerys Targaryen", "Rhaegar Targaryen", "Aegon Targaryen", "Robert Baratheon"],
        correctAnswer: "Aerys Targaryen",
    },
    {
        question: "What job was Jon Snow assigned to in the Night's Watch?",
        answers: ["Ranger", "Watcher", "Builder", "Steward"],
        correctAnswer: "Steward",
    },
    {
        question: "What is Olenna Tyrell's nickname?",
        answers: ["Queen of Thorns", "Queen of Hearts", "Lady of the Roses", "Queen in Highgarden"],
        correctAnswer: "Queen of Thorns",
    },
    {
        question: "What is the surname given to bastards born in Dorne?",
        answers: ["	Stone", "Sand", "Rivers", "Waters"],
        correctAnswer: "Sand",
    },
    {
        question: "Who is known as 'The-King-Beyond-the-Wall'?",
        answers: ["The Night King", "Stannis Baratheon", "Tormund Giantsbane", "Mance Rayder"],
        correctAnswer: "Mancy Rayder",
    },
    {
        question: "Who was the Mad King's first born child?",
        answers: ["Viserys Targaryen", "Aemon Targaryen", "Aegon Targaryen", "Rhaegar Targaryen"],
        correctAnswer: "Rhaegar Targaryen",
    },
]

//shows current question and current score
let currentQuestion = 0;
let score = 0;

//template for questions and answers
function createQuestions() {
    const answersHTML = DATA[currentQuestion].answers.map(answer => `
    <label class="answerChoices">
      <input type="radio" 
      style=""
      class="option" value="${answer}" name="answerChoices" required>
    <span>${answer}</span>
    </label>
  `)
    return `
    <div class = "questionBox">
      <h1>${currentQuestion + 1}. ${DATA[currentQuestion].question}</h1>
    </div>
        <form>
        <fieldset class = "questionLayout">
          ${answersHTML.join('')}
          <h2 class = "scoreNumber">Score: ${score}/10 </h2>
      
          <button type="submit" class="submit-button">Check Answer</button>
        </fieldset>
        </form> `;

}

//renders the question and answers template onto page
function renderQuestion() {
    $('.questionPage').html(createQuestions());
}

//submits the selected answer
function submitButton() {
    $('body').on('submit', 'form', function (event) {
        event.preventDefault();
        evaluateAnswers()
    });
}

//checks if answer is correct or incorrect
function evaluateAnswers() {
    const selectedAnswer = $('input:checked').val();
    if (selectedAnswer === DATA[currentQuestion].correctAnswer) {
        correctAnswerDisplay();
        changeScore();
    } else {
        wrongAnswerDisplay();
    };
}

//image response to submitting a wrong answer
function wrongAnswerResponse() {
    return `
  <div class = "wrongAnswerPage">
    <img class = "imageGif" src = "https://media.giphy.com/media/l4FGpD4wCP6QoE3de/giphy.gif" alt = "wrong answer response gif">
    <h3>Wrong! Correct answer is: ${DATA[currentQuestion].correctAnswer}</h3>
    <button class="nextButton">Next!</button>
  </div>`
};

//display the image when wrong answer is submitted
function wrongAnswerDisplay() {
    $('.questionPage').html(wrongAnswerResponse());
}

//image response to submitting correct answer
function rightAnswerResponse() {
    return `
  <div class = "rightAnswerPage">
  <img class = "imageGif" src = "https://www.maxim.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_500/MTUwMDAzMjU5NjczNjgzNzM4/funny-game-thrones-gifs.webp" alt = "right answer response gif">
    <h2>Correct! You are a true fan!</h2>
    <button class="nextButton">Next!</button>
  </div>`
}

//displays the image when the correct answer is submitted
function correctAnswerDisplay() {
    $('.questionPage').html(rightAnswerResponse());
}

//handles the start quiz button
function handleStartButton() {
    $('.startQuiz').on('click', '.startButton', function () {
        $('.startQuiz').hide();
        $('.questionPage').css('display', 'block');
        $('.currentQuestion').text(1);
    });
}

//handles button to move onto next question
function handleNextButton() {
    $('main').on('click', '.nextButton', function (event) {
        if (currentQuestion === DATA.length - 1) {
            resultsPage()
        } else {
            updateQuestionNum();
            renderQuestion();
        }
    });
}

//restarts the quiz
function handleRestartButton() {
    $('main').on('click', '.restartButton', function (event) {
        window.location.reload();
    });
}

//displays results when finished
function resultsPage() {
    $('main').html(`
    <section class="resultsPage">
      <h2>Final Score: ${score} out of 10</h2>
      <button class ="restartButton">Take it again!</button>
    </section>
  `);
}

//update score after answering correctly
function changeScore() {
    score++;
}

//updates question number after each question
function updateQuestionNum() {
    currentQuestion++;
}


function loadQuiz() {
    handleStartButton();
    renderQuestion();
    submitButton();
    handleNextButton();
    handleRestartButton()
}

$(loadQuiz);


