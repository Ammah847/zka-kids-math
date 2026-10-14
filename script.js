// ==========================================
// ZKA KIDS MATH
// Created by Zie Koutaptou Amamatou
// ==========================================

// 1. APPLICATION SETTINGS

let operation = "addition";
let difficulty = "easy";
let maxNumber = 10;
let correctAnswer = 0;

let score = Number(localStorage.getItem("zkaScore")) || 0;
let stars = Number(localStorage.getItem("zkaStars")) || 0;

let questionsAnswered = 0;
let answerSubmitted = false;
let soundEnabled = true;
let currentLanguage = "en";


// 2. TRANSLATIONS

const translations = {
    en: {
        welcome: "Welcome, young mathematician! 🎉",
        instruction: "Choose a calculation to practise.",
        chooseLanguage: "🌍 Choose your language:",
        difficultyTitle: "🎯 Choose Your Difficulty",

        easy: "🟢 Easy",
        medium: "🟡 Medium",
        hard: "🔴 Hard",

        addition: "➕ Addition",
        subtraction: "➖ Subtraction",
        multiplication: "✖️ Multiplication",
        division: "➗ Division",

        readQuestion: "🔊 Read Question",
        soundOn: "🔔 Sound: ON",
        soundOff: "🔕 Sound: OFF",

        checkAnswer: "Check Answer ✔",

        score: "🎁✨ Score:",
        stars: "🌟 Stars:",

        achievement:
            "🎯 Keep practising to earn your first reward!",

        correct:
            "🎉 Excellent! Your answer is correct! You earned a star! ⭐",

        incorrect:
            "Not quite! The correct answer is",

        enterAnswer:
            "Please enter an answer first!",

        validNumber:
            "Please enter a valid number!",

        greatJob:
            "🌟 Great job! Keep learning!",

        amazing:
            "🏆 Amazing! You have earned",

        starsWord: "stars!",

        footer:
            "Learn 🔑 Practise 🔑 Succeed 🏆",

        currentLevel:
            "Current Level:",

        voiceCorrect:
            "Excellent! You got it right!",

        voiceIncorrect:
            "Not quite! Try again!",

        unsupportedSpeech:
            "Sorry, your browser does not support speech."
    },

    fr: {
        welcome:
            "Bienvenue, jeune mathématicien ! 🎉",

        instruction:
            "Choisis un calcul pour t'entraîner.",

        chooseLanguage:
            "🌍 Choisis ta langue :",

        difficultyTitle:
            "🎯 Choisis ton niveau",

        easy:
            "🟢 Facile",

        medium:
            "🟡 Moyen",

        hard:
            "🔴 Difficile",

        addition:
            "➕ Addition",

        subtraction:
            "➖ Soustraction",

        multiplication:
            "✖️ Multiplication",

        division:
            "➗ Division",

        readQuestion:
            "🔊 Lire la question",

        soundOn:
            "🔔 Son : ACTIVÉ",

        soundOff:
            "🔕 Son : DÉSACTIVÉ",

        checkAnswer:
            "Vérifier la réponse ✔",

        score:
            "🎁✨ Score :",

        stars:
            "🌟 Étoiles :",

        achievement:
            "🎯 Continue à t'entraîner pour gagner ta première récompense !",

        correct:
            "🎉 Excellent ! Ta réponse est correcte ! Tu as gagné une étoile ! ⭐",

        incorrect:
            "Pas tout à fait ! La bonne réponse est",

        enterAnswer:
            "Entre d'abord une réponse !",

        validNumber:
            "Entre un nombre valide !",

        greatJob:
            "🌟 Bravo ! Continue à apprendre !",

        amazing:
            "🏆 Incroyable ! Tu as gagné",

        starsWord:
            "étoiles !",

        footer:
            "Apprendre 🔑 Pratiquer 🔑 Réussir 🏆",

        currentLevel:
            "Niveau actuel :",

        voiceCorrect:
            "Excellent ! Tu as trouvé la bonne réponse !",

        voiceIncorrect:
            "Pas tout à fait ! Essaie encore !",

        unsupportedSpeech:
            "Désolé, ton navigateur ne prend pas en charge la synthèse vocale."
    }
};


// 3. CHANGE THE LANGUAGE

function setLanguage(language) {
    if (!translations[language]) {
        return;
    }

    currentLanguage = language;

    const t = translations[currentLanguage];

    // Welcome section
    document.getElementById("welcomeTitle").textContent =
        t.welcome;

    document.getElementById("welcomeText").textContent =
        t.instruction;

    document.querySelector(
        ".language-selector label"
    ).textContent = t.chooseLanguage;

    // Difficulty heading
    document.querySelector(
        ".container h3"
    ).textContent = t.difficultyTitle;

    // Difficulty buttons
    const difficultyButtons =
        document.querySelectorAll("#difficultyMenu button");

    if (difficultyButtons.length >= 3) {
        difficultyButtons[0].textContent = t.easy;
        difficultyButtons[1].textContent = t.medium;
        difficultyButtons[2].textContent = t.hard;
    }

    // Mathematics operation buttons
    const operationButtons =
        document.querySelectorAll("#operationMenu button");

    if (operationButtons.length >= 4) {
        operationButtons[0].textContent = t.addition;
        operationButtons[1].textContent = t.subtraction;
        operationButtons[2].textContent = t.multiplication;
        operationButtons[3].textContent = t.division;
    }

    // Sound controls
    const soundControls =
        document.querySelectorAll(".sound-controls button");

    if (soundControls.length >= 1) {
        soundControls[0].textContent = t.readQuestion;
    }

    document.getElementById("soundButton").textContent =
        soundEnabled ? t.soundOn : t.soundOff;

    // Answer button
    document.querySelector(
        ".quiz > button"
    ).textContent = t.checkAnswer;

    // Score and stars labels
    document.getElementById("score").parentElement.firstChild.textContent =
        t.score + " ";

    document.getElementById("stars").parentElement.firstChild.textContent =
        t.stars + " ";

    // Footer
    document.querySelector("footer p").textContent =
        t.footer;

    // Difficulty label
    updateDifficultyLabel();

    // Clear feedback from the previous language
    document.getElementById("feedback").textContent = "";

    // Update the question using the selected language
    generateQuestion();
}


// 4. UPDATE THE DIFFICULTY LABEL

function updateDifficultyLabel() {
    const t = translations[currentLanguage];

    const levelNames = {
        easy: t.easy,
        medium: t.medium,
        hard: t.hard
    };

    document.getElementById("difficultyLabel").textContent =
        t.currentLevel + " " + levelNames[difficulty];
}


// 5. CHOOSE A DIFFICULTY

function setDifficulty(level) {
    difficulty = level;

    if (level === "easy") {
        maxNumber = 10;
    } else if (level === "medium") {
        maxNumber = 50;
    } else if (level === "hard") {
        maxNumber = 100;
    }

    updateDifficultyLabel();

    document.getElementById("feedback").textContent = "";

    generateQuestion();
}


// 6. CHOOSE A MATHEMATICS OPERATION

function startGame(selectedOperation) {
    operation = selectedOperation;

    document.getElementById("feedback").textContent = "";

    generateQuestion();
}


// 7. GENERATE A MATHEMATICS QUESTION

function generateQuestion() {
    let a = Math.floor(Math.random() * maxNumber) + 1;
    let b = Math.floor(Math.random() * maxNumber) + 1;

    answerSubmitted = false;

    const question = document.getElementById("question");

    if (operation === "addition") {
        correctAnswer = a + b;

        question.textContent = `${a} + ${b} = ?`;

    } else if (operation === "subtraction") {
        if (b > a) {
            [a, b] = [b, a];
        }

        correctAnswer = a - b;

        question.textContent = `${a} - ${b} = ?`;

    } else if (operation === "multiplication") {
        correctAnswer = a * b;

        question.textContent = `${a} × ${b} = ?`;

    } else if (operation === "division") {
        correctAnswer = a;

        const dividend = a * b;

        question.textContent = `${dividend} ÷ ${b} = ?`;
    }

    const answerInput = document.getElementById("answer");

    answerInput.value = "";
    answerInput.disabled = false;
}


// 8. CHECK THE STUDENT'S ANSWER

function checkAnswer() {
    const answerInput = document.getElementById("answer");
    const feedback = document.getElementById("feedback");
    const t = translations[currentLanguage];

    if (answerSubmitted) {
        return;
    }

    if (answerInput.value.trim() === "") {
        feedback.textContent = t.enterAnswer;
        feedback.style.color = "#b45309";
        return;
    }

    const userAnswer = Number(answerInput.value);

    if (!Number.isFinite(userAnswer)) {
        feedback.textContent = t.validNumber;
        feedback.style.color = "#b45309";
        return;
    }

    answerSubmitted = true;
    questionsAnswered++;

    if (userAnswer === correctAnswer) {
        score++;
        stars++;

        feedback.textContent = t.correct;
        feedback.style.color = "#15803d";

        speakFeedback(
            t.voiceCorrect,
            currentLanguage === "fr" ? "fr-FR" : "en-US"
        );

        document.getElementById("achievement").textContent =
            stars % 10 === 0
                ? `${t.amazing} ${stars} ${t.starsWord}`
                : t.greatJob;

    } else {
        feedback.textContent =
            `${t.incorrect} ${correctAnswer}.`;

        feedback.style.color = "#dc2626";

        speakFeedback(
            t.voiceIncorrect,
            currentLanguage === "fr" ? "fr-FR" : "en-US"
        );
    }

    // Update the score and stars
    document.getElementById("score").textContent = score;
    document.getElementById("stars").textContent = stars;

    // Save progress
    localStorage.setItem("zkaScore", score);
    localStorage.setItem("zkaStars", stars);

    // Generate the next question after two seconds
    setTimeout(function () {
        generateQuestion();
    }, 2000);
}


// 9. READ THE QUESTION ALOUD

function readQuestion() {
    if (!soundEnabled) {
        return;
    }

    if (!("speechSynthesis" in window)) {
        document.getElementById("feedback").textContent =
            translations[currentLanguage].unsupportedSpeech;

        return;
    }

    window.speechSynthesis.cancel();

    const question =
        document.getElementById("question").textContent;

    const spokenQuestion = question
        .replace("×", " multiplied by ")
        .replace("÷", " divided by ")
        .replace("+", " plus ")
        .replace("-", " minus ")
        .replace("=", " equals ")
        .replace("?", "");

    const speech = new SpeechSynthesisUtterance(spokenQuestion);

    speech.lang = currentLanguage === "fr" ? "fr-FR" : "en-US";
    speech.rate = 0.85;
    speech.pitch = 1.1;

    window.speechSynthesis.speak(speech);
}


// 10. TURN SOUND ON OR OFF

function toggleSound() {
    soundEnabled = !soundEnabled;

    const t = translations[currentLanguage];

    document.getElementById("soundButton").textContent =
        soundEnabled ? t.soundOn : t.soundOff;

    if (!soundEnabled && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}


// 11. SPEAK FEEDBACK

function speakFeedback(message, language) {
    if (!soundEnabled || !("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = language;
    speech.rate = 0.9;
    speech.pitch = 1.1;

    window.speechSynthesis.speak(speech);
}


// 12. LOAD THE APPLICATION

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("score").textContent = score;
    document.getElementById("stars").textContent = stars;

    document.getElementById("languageSelect").value = "en";

    updateDifficultyLabel();

    setLanguage("en");
});