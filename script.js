const quizData = [
    {
        question: 'What is the capital of Japan?',
        answers: [
            { text: 'Beijing', correct: false },
            { text: 'Tokyo', correct: true },
            { text: 'Seoul', correct: false },
            { text: 'Bangkok', correct: false }
        ]
    },
    {
        question: 'In which year did the Titanic sink?',
        answers: [
            { text: '1912', correct: true },
            { text: '1920', correct: false },
            { text: '1905', correct: false },
            { text: '1935', correct: false }
        ]
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        answers: [
            { text: 'Charles Dickens', correct: false },
            { text: 'William Shakespeare', correct: true },
            { text: 'Jane Austen', correct: false },
            { text: 'Mark Twain', correct: false }
        ]
    },
    {
        question: 'What is the largest mammal in the world?',
        answers: [
            { text: 'Elephant', correct: false },
            { text: 'Blue Whale', correct: true },
            { text: 'Giraffe', correct: false },
            { text: 'Hippopotamus', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Mars', correct: true },
            { text: 'Venus', correct: false },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'What is the currency of Canada?',
        answers: [
            { text: 'Dollar', correct: false },
            { text: 'Euro', correct: false },
            { text: 'Peso', correct: false },
            { text: 'Canadian Dollar', correct: true }
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: [
            { text: 'Pablo Picasso', correct: false },
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Michelangelo', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for gold?',
        answers: [
            { text: 'Go', correct: false },
            { text: 'Au', correct: true },
            { text: 'Ag', correct: false },
            { text: 'Ge', correct: false }
        ]
    },
    {
        question: 'How many continents are there in the world?',
        answers: [
            { text: '6', correct: false },
            { text: '7', correct: true },
            { text: '5', correct: false },
            { text: '8', correct: false }
        ]
    },
    {
        question: 'What is the main ingredient in guacamole?',
        answers: [
            { text: 'Tomatoes', correct: false },
            { text: 'Avocado', correct: true },
            { text: 'Onions', correct: false },
            { text: 'Peppers', correct: false }
        ]
    },
   
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score-display');

const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');

function updateProgressBar() {
  const progress = (currentQuestionIndex / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}


function startQuiz() {
    progressBarContainer.style.display = 'block';
    showQuestion();
    updateProgressBar();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;
    answerButtons.innerHTML = '';
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedAnswer) {
    // Check if the selected answer is correct
    if (selectedAnswer.correct) {
        score++;
    }
    // Disable all answer buttons and apply colors
    answerButtons.childNodes.forEach(button => {
        button.disabled = true;
        if (button === selectedAnswer) {
            button.classList.add(selectedAnswer.correct ? 'correct' : 'incorrect');
        } else {
            button.classList.add('disabled');
        }
    });

    // Show the Next button
    nextButton.style.display = 'block';

    
}




function nextQuestion() {
    // Enable answer buttons for the next question
    answerButtons.childNodes.forEach(button => {
        button.disabled = false;
    });

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < quizData.length) {
        // Check if this is the last question
        if (currentQuestionIndex === quizData.length - 1) {
            // Change button text for the last question
            nextButton.innerText = 'Finish';
        }
        // Show the next question
        showQuestion();
    } else {
        // Display score after Finish button is clicked
        updateScoreDisplay();
        document.getElementById('result-page').style.display = 'block';
        document.getElementById('quiz-container').style.display = 'none';
    }
    updateProgressBar();
}

function updateScoreDisplay() {
    scoreDisplay.innerText = score + '/10';
}

// Start the quiz when the page loads
startQuiz();

function restartQuiz() {
    // Reset variables
    currentQuestionIndex = 0;
    score = 0;

    // Clear result display
    scoreDisplay.innerText = '';

    // Hide result page and show quiz container
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';

    // Reset the Next button text
    nextButton.innerText = 'Next Question';

    // Start the quiz again
    startQuiz();
}
