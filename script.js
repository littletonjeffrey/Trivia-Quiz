var screen1El = document.getElementById("screen1");
var screen2El = document.getElementById("screen2");
var initialsEl = document.getElementById("initials");
var highScoreEl = document.getElementById("highScore");
var playersInitialsEl = document.getElementsByName("playersInitials")

var startBtn = document.getElementById('start-btn');
var submitBtn = document.getElementById('submit')

var questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
var score = 0;

let shuffledQuestions, currentQuestionIndex

var timerInterval
var secondsLeft = 60
var timeEl = document.getElementById('timer')

var playerScore = {
    player: playersInitialsEl.values.trim,
    recentScore: score
}

const questions = [
    {
        question: 'You see a treasure chest in an empty room of a dungeon.  What do you do?',
        answers: [
            { text: 'Open the chest', correct: false },
            { text: 'Feel over the chest for traps', correct: false },
            { text: 'Wait for the rogue to eventually get impatient and open the chest', correct: false },
            { text: 'Attack the chest, it might be a mimic', correct: true }
        ]
    },
    {
        question: 'After slaying a troll, what should you do?',
        answers: [
            { text: 'Burn the corpse with fire!', correct: true },
            { text: 'Stab it in the eye for good measure', correct: false },
            { text: 'Dump water on it before it regenerates', correct: false },
            { text: "Nice try, there aren't any trolls in D&D", correct: false }
        ]
    },
    {
        question: 'You wish to kill a lich, what should you do?',
        answers: [
            { text: "Cut it's head off", correct: false },
            { text: "Destroy it's phylactery", correct: true },
            { text: "Trick question, liches are invincible", correct: false },
            { text: "Stab it with a silvered weapon", correct: false }
        ]
    },
    {
        question: "It's your first D&D game and you're a huge fan of R.A. Salvatore, what character are you going to make?",
        answers: [
            { text: "A human fighter who is trying to reclaim his birthright as heir to the throne", correct: false },
            { text: "A tiefling warlock who is sensitive about others judging them based on appearance", correct: false },
            { text: "A drow ranger who defied an evil goddess and her cult than fleed the underdark", correct: true },
            { text: "A half-orc barbarian who feels doesn't feel accepted in the human world or orc lands", correct: false }
        ]
    },
    {
        question: 'What creature resembles the beholder who dreamt them into being?',
        answers: [
            { text: "Watcher", correct: false },
            { text: "Gazer", correct: true },
            { text: "Dreamkin", correct: false },
            { text: "Kruger", correct: false }
        ]
    },
    {
        question: 'What is the best edition of Dungeons & Dragons',
        answers: [
            { text: "2nd Edition/AD&D (You know, the one who's lore every other edition basically copies)", correct: true },
            { text: "3rd/3.5 (Play as whatever!  Want to be a bear that dual-wields magic pistols and rides a shark? There's a supplement for that", correct: true },
            { text: "4th Edition (I'm cool because I have an unpopular opinion and love combat tactics)", correct: true },
            { text: "5e (It's the best...also it's the only edition I've played)", correct: true }
        ]
    },
    {
        question: 'What should you never do while playing D&D?',
        answers: [
          { text: 'Cast "fireball"', correct: false },
          { text: "Check for traps", correct: false },
          { text: "Have fun", correct: false },
          { text: "Split the party", correct: true}
        ]
        },
]




function startGame() {
    console.log('Entering the Dungeon')
    secondsLeft = 60
    timeEl.classList.remove("hide")
    timer()
    startBtn.classList.add('hide')
    initialsEl.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    setNextQuestion()
}

function timer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            gameOver();
        }
    }, 1000
    )
}

function gameOver() {
    console.log(score)
    clearInterval(timerInterval)
    timeEl.classList.add('hide')
    questionContainerEl.classList.add('hide')
    initialsEl.classList.remove("hide")
    startBtn.innerText = "Try Again?"
    startBtn.classList.remove("hide")
}

function setNextQuestion() {
    resetTo()
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        showQuestion(shuffledQuestions[currentQuestionIndex])
    } else {
        gameOver()
    }
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)

    })
}
function resetTo() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
}
function selectAnswer(j) {
    const selectButton = j.target
    const correct = selectButton.dataset.correct
    if (correct) {
        console.log('correct')
        score = score + 100;
        console.log(score)
        currentQuestionIndex++
        setNextQuestion()
    } else {
        console.log('wrong')
        secondsLeft = secondsLeft - 5
        console.log(score)
        currentQuestionIndex++
        setNextQuestion()

    }
}

function highScoreMenu() {
    localStorage.setItem("playerScore", JSON.stringify(playerScore));
    var newEntry = JSON.parse(localstorage.getItem(playerScore))
    var newEntry = document.createElement('li');
    newEntry.appendChild(document.highScoreEl(playerScore));

    document.querySelector('ul').appendChild(newEntry);

    initialsEl.classList.add("hide")
    highScoreEl.classList.remove("hide")
}

startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', highScoreMenu)


