/**
 * Manages the interactive Fasnacht mask quiz.
 *
 * Responsibilities:
 * - Display verses and possible answers.
 * - Validate the user's answers.
 * - Navigate between quiz questions.
 * - Display the corresponding Fasnacht mask in the 3D/AR viewer.
 * - Allow users to restart the quiz.
 */


import { fasnachtCharacters } from "../../data/FasnachtCharacters.js";

const quizTexts = {
    de: {
        title: "Vieli Larve, vieli Gschichte",
        instructions: "Lies den Vers und wähle die passende Fasnachtsfigur.",
        previous: "← Zurück",
        next: "Weiter →",
        viewAR: "In AR ansehen",
        viewMask: "Larve ansehen",
        correct: "Richtig! Du hast die Fasnachtsfigur erkannt.",
        incorrect: "Leider falsch. Versuche es nochmals!",
        completed: "Quiz abgeschlossen!",
        restart: "Quiz wiederholen",
        viewerHint: "Schau dir die Larve genauer an …",
    },
    en: {
        title: "Many Masks, Many Stories",
        instructions: "Read the verse and find out which Fasnacht character is being described.",
        previous: "← Back",
        next: "Next →",
        viewAR: "View in AR",
        viewMask: "View mask",
        correct: "Correct! You recognised the Fasnacht character.",
        incorrect: "Not quite. Try again!",
        completed: "Quiz completed!",
        restart: "Restart quiz",
        viewerHint: "Take a closer look at the mask …"

    }
};

export class FasnachtCharacterQuiz {
    constructor(mediaViewer) {
        this.mediaViewer = mediaViewer;
        this.languageSelect = document.getElementById("language-select");

        this.quizContainer = document.getElementById("larven-quiz");
        this.quizTitle = document.getElementById("quiz-title");
        this.quizInstructions = document.getElementById("quiz-instructions");
        this.quizVerse = document.getElementById("quiz-verse");
        this.quizAnswers = document.getElementById("quiz-answers");
        this.quizFeedback = document.getElementById("quiz-feedback");
        this.quizCounter = document.getElementById("quiz-counter");
        this.quizPreviousButton = document.getElementById("quiz-previous-button");

        this.viewerSection = document.getElementById("exhibition-viewer");
        this.viewerContainer = document.getElementById("viewer");
        this.objectTitle = document.getElementById("object-title");
        this.objectCounter = document.getElementById("object-counter");
        this.objectDescription = document.getElementById("object-description");

        this.previousButton = document.getElementById("previous-button");
        this.nextButton = document.getElementById("next-button");
        this.arButton = document.getElementById("open-ar-button");

        this.viewerHint = document.getElementById("viewer-hint");
        this.viewerHintText = document.querySelector(".viewer-hint-text");

        this.currentIndex = 0;
        this.currentView = "quiz";
        this.solvedQuestions = new Set();

        this.answerOptions = [...fasnachtCharacters].sort(() => Math.random() - 0.5);
        this.questions = [...fasnachtCharacters].sort(() => Math.random() - 0.5);

        this.languageSelect.addEventListener("change", () => {
            this.updateLanguage();
        });

        this.quizPreviousButton.addEventListener("click", () => {
            this.previousQuestion();
        });

        this.previousButton.addEventListener("click", () => {
            this.renderQuestion();
        });

        this.nextButton.addEventListener("click", () => {
            this.nextQuestion();
        });

        this.objectDescription.addEventListener("pointerup", () => {
            this.showDescription();
        });

        this.viewerContainer.addEventListener("model-tap", () => {
            if (this.currentView === "viewer") {
                this.showDescription();
            }
        });

        this.viewerContainer.addEventListener("click", (event) => {
            if (
                this.currentView === "viewer" &&
                this.questions[this.currentIndex].type === "SOURCE:IMAGE" &&
                event.target.tagName === "IMG"
            ) {
                this.showDescription();
            }
        });

        this.viewerSection.hidden = true;
        this.updateLanguage();
    }

    updateLanguage() {
        const language = this.languageSelect.value;
        const texts = quizTexts[language];

        this.quizTitle.textContent = texts.title;
        this.quizInstructions.textContent = texts.instructions;

        this.quizPreviousButton.textContent = texts.previous;
        this.previousButton.textContent = texts.previous;
        this.nextButton.textContent = texts.next;
        this.arButton.textContent = texts.viewAR;
        this.viewerHintText.textContent = texts.viewerHint;

        if (this.currentView === "quiz") {
            this.renderQuestion();
        } else if (this.currentView === "viewer") {
            const character = this.questions[this.currentIndex];

            this.objectDescription.textContent = character.translations[language].description;
        } else {
            this.finishQuiz();
        }
    }

    renderQuestion() {
        const language = this.languageSelect.value;
        const texts = quizTexts[language];
        const character = this.questions[this.currentIndex];

        this.currentView = "quiz";

        this.quizContainer.hidden = false;
        this.viewerSection.hidden = true;
        this.viewerHint.hidden = true;

        this.quizVerse.textContent = character.translations[language].verse;

        this.quizAnswers.replaceChildren();
        this.quizFeedback.textContent = "";
        this.quizFeedback.className = "quiz-feedback";

        if (this.solvedQuestions.has(this.currentIndex)) {

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = texts.viewMask;

            button.addEventListener("click", () => {
                void this.showMask();
            });

            this.quizAnswers.appendChild(button);

        } else {

            this.answerOptions.forEach(option => {
                const button = document.createElement("button");

                button.type = "button";
                button.textContent = option.name;

                button.addEventListener("click", () => {
                    this.checkAnswer(option.id, button);
                });

                this.quizAnswers.appendChild(button);
            });
        }
        this.quizVerse.hidden = false;

        this.quizCounter.textContent = (this.currentIndex + 1) + "/" +  this.questions.length;

        this.quizPreviousButton.disabled =
            this.currentIndex === 0;
    }

    checkAnswer(selectedId, button) {
        const character = this.questions[this.currentIndex];
        const texts = quizTexts[this.languageSelect.value];

        if (selectedId === character.id) {

            this.solvedQuestions.add(this.currentIndex);

            this.quizFeedback.textContent = texts.correct;
            this.quizFeedback.className = "quiz-feedback correct";

             void this.showMask();

        } else {

            this.quizFeedback.textContent = texts.incorrect;
            this.quizFeedback.className = "quiz-feedback incorrect";

            button.disabled = true;
        }
    }

    async showMask() {
        const character = this.questions[this.currentIndex];
        const language = this.languageSelect.value;

        this.currentView = "viewer";

        this.quizContainer.hidden = true;
        this.viewerSection.hidden = false;

        this.objectTitle.textContent = character.name;
        this.objectCounter.textContent = (this.currentIndex + 1) + " / " + this.questions.length;

        this.objectDescription.textContent = character.translations[language].description;

        this.objectDescription.hidden = true;
        this.viewerHint.hidden = false;

        try {
            await this.mediaViewer.displayMedia(character, language);
        } catch (error) {
            console.error("Could not display mask:", error);
        }
    }

    showDescription() {
        this.objectDescription.hidden = !this.objectDescription.hidden;
        this.viewerHint.hidden = !this.objectDescription.hidden;
    }


    previousQuestion() {
        if (this.currentIndex === 0) {
            return;
        }

        this.currentIndex--;
        this.renderQuestion();
    }

    nextQuestion() {
        if (!this.solvedQuestions.has(this.currentIndex)) {
            return;
        }

        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.renderQuestion();
        } else {
            this.finishQuiz();
        }
    }

    finishQuiz() {
        const texts = quizTexts[this.languageSelect.value];

        this.currentView = "finished";

        this.viewerSection.hidden = true;
        this.quizContainer.hidden = false;

        this.quizTitle.textContent = texts.completed;
        this.quizInstructions.textContent = "";

        this.quizVerse.hidden = true;
        this.quizFeedback.textContent = "";
        this.quizAnswers.replaceChildren();

        this.quizCounter.textContent = "";
        this.quizPreviousButton.hidden = true;

        const restartButton = document.createElement("button");
        restartButton.type = "button";
        restartButton.textContent = texts.restart;

        restartButton.addEventListener("click", () => {
            this.restartQuiz();
        });

        this.quizAnswers.appendChild(restartButton);
    }

    restartQuiz() {
        this.currentIndex = 0;
        this.currentView = "quiz";
        this.solvedQuestions.clear();

        this.questions = [...fasnachtCharacters].sort(() => Math.random() - 0.5);
        this.answerOptions = [...fasnachtCharacters].sort(() => Math.random() - 0.5);

        this.quizPreviousButton.hidden = false;

        this.updateLanguage();
    }
}
