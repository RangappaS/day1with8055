const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["color", "font-color", "text-color", "foreground-color"],
        answer: "color"
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<style>", "<css>", "<link>"],
        answer: "<style>"
    },
    {
        question: "Which CSS property is used for controlling the layout of elements and their relationship to each other?",
        options: ["display", "position", "float", "flexbox"],
        answer: "display"
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuiz = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = ""; // Clear previous options

    currentQuiz.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(option, currentQuiz.answer));
        optionsElement.appendChild(button);
    });

    nextButton.style.display = "none"; // Hide next button until an answer is selected
}

function selectAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
    }
    // Disable all option buttons after selection
    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block"; // Show next button
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    nextButton.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.textContent = `${score}/${quizData.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = "none";
    questionElement.style.display = "block";
    optionsElement.style.display = "flex"; // Ensure options are visible again
    loadQuestion();
}

nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Initial load
loadQuestion();