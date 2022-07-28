const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: 'What is the name of the main character of One Piece?',
        choice1: 'Monkey D. Luffy',
        choice2: 'Roronoa Zoro',
        choice3: 'Nami',
        choice4: 'Usopp',
        answer: 1,
    },

    {
        question: 'Who gave shanks the scar on his eye?',
        choice1: 'Dragon',
        choice2: 'Blackbeard',
        choice3: 'Shanks',
        choice4: 'Akainu',
        answer: 2,
    },

    {
        question: 'Who was the first recruit of the SH crew?',
        choice1: 'Monkey D. Luffy',
        choice2: 'Roronoa Zoro',
        choice3: 'Nami',
        choice4: 'Usopp',
        answer: 2,
    },


    {
        question: 'Who is the muscial singing pirate?',
        choice1: 'Monkey D. Luffy',
        choice2: 'Roronoa Zoro',
        choice3: 'Nami',
        choice4: 'Big Mom',
        answer: 4,
    },

]


const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // Return to the start page
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if (classToApply === 'correct') {
                incrementScore(SCORE_POINTS);
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        });


    })
}

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();