const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let counter=0;
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'

    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    counter++;
    console.log(counter);
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      {text: '<js>', correct: false },
      {text: '<javascript>', correct: false },
      { text: '<script>', correct: true },
      { text: '<scripting>', correct: false }
    ]
  },

  {
    question: 'What is the correct JavaScript syntax to change the content of a p tag with id "demo" ?',
    answers: [
      { text: 'document.getElementByName("p").innerHTML = "Hello World!";', correct: false },
      { text: 'document.getElementById("demo").innerHTML = "Hello World!";', correct: true },
      { text: '#demo.innerHTML = "Hello World!";', correct: false },
      { text: 'document.getElement("p").innerHTML = "Hello World!";', correct: false }
    ]
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [
      { text: 'Both the <head> section and the <body> section are correct', correct: true },
      { text: 'The <head> section', correct: false },
      { text: 'The <body> section', correct: false }
    ]
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: [
      { text: '<script href="xxx.js">', correct: false },
      { text: '<script src="xxx.js">', correct: true },
      { text: '<script name="xxx.js">', correct: false }
    ]
  },
  {
    question: 'The external JavaScript file must contain the <script> tag.',
    answers: [
      { text: 'True', correct: false },
      { text: 'false', correct: true }
    ]
  },

  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'msg("Hello World");', correct: false },
      { text: 'alert("Hello World");', correct: true },
      { text: 'alertBox("Hello World");', correct: false },
      { text: 'msgBox("Hello World");', correct: false }
    ]
  },

  {
    question: 'How do you create a function in JavaScript?',
    answers: [
      { text: '<script href="xxx.js">', correct: false },
      { text: '<script src="xxx.js">', correct: false },
      { text: 'function myFunction()', correct: true }
    ]
  },
]

