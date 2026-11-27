/**
 * Manages the interactive Fasnacht music station.
 *
 * Responsibilities:
 * - Present Clique- and Guggenmusik.
 * - Provide audio samples of both music styles.
 * - Allow users to select different Fasnacht instruments.
 * - Allow users to listen to those instruments.
 * - Display the selected instrument in the 3D/AR viewer.
 */


import {fasnachtInstruments} from "../../data/FasnachtInstruments.js";

const musicTexts = {
    de: {
        title: "D’Kläng vo de Fasnacht",
        instructions: "Entdecke die Instrumente der traditionellen Basler Cliquenmusik.",
        listen: "Anhören",
        viewInstrument: "Instrument ansehen",
        previous: "← Zurück",
        viewAR: "In AR ansehen",
        viewerHint: "Tippe auf das Instrument, um mehr zu erfahren.",
        pause: "Pause"
    },
    en: {
        title: "Sounds of Fasnacht",
        instructions: "Discover the instruments of traditional Basel clique music.",
        listen: "Listen",
        viewInstrument: "View instrument",
        previous: "← Back",
        viewAR: "View in AR",
        viewerHint: "Tap the instrument to learn more.",
        pause: "Pause"
    }
};

export class MusicStation {
    constructor(mediaViewer) {
        this.mediaViewer = mediaViewer;
        this.languageSelect = document.getElementById("language-select");

        this.musicContainer = document.getElementById("music-station");
        this.musicTitle = document.getElementById("music-title");
        this.musicInstructions = document.getElementById("music-instructions");

        this.piccoloTitle = document.getElementById("piccolo-title");
        this.piccoloDescription = document.getElementById("piccolo-description");
        this.piccoloListenButton = document.getElementById("piccolo-listen-button");
        this.piccoloViewButton = document.getElementById("piccolo-view-button");

        this.drumTitle = document.getElementById("drum-title");
        this.drumDescription = document.getElementById("drum-description");
        this.drumListenButton = document.getElementById("drum-listen-button");
        this.drumViewButton = document.getElementById("drum-view-button");

        this.viewerSection = document.getElementById("exhibition-viewer");
        this.viewerContainer = document.getElementById("viewer");
        this.objectTitle = document.getElementById("object-title");
        this.objectDescription = document.getElementById("object-description");

        this.previousButton = document.getElementById("previous-button");
        this.arButton = document.getElementById("open-ar-button");

        this.viewerHint = document.getElementById("viewer-hint");
        this.viewerHintText = document.querySelector(".viewer-hint-text");
        this.viewerAudioButton = document.getElementById("next-button");

        this.currentIndex = 0;
        this.currentView = "music";
        this.isLoading = false;

        this.audioPlayer = new Audio();
        this.currentAudioIndex = null;

        this.languageSelect.addEventListener("change", () => {
            this.updateLanguage();
        });

        this.piccoloListenButton.addEventListener("click", () => {
            void this.toggleAudio(1);
        });

        this.drumListenButton.addEventListener("click", () => {
            void this.toggleAudio(0);
        });

        this.piccoloViewButton.addEventListener("click", () => {
            void this.showInstrument(1);
        });

        this.drumViewButton.addEventListener("click", () => {
            void this.showInstrument(0);
        });

        this.viewerAudioButton.addEventListener("click", () => {
            void this.toggleAudio(this.currentIndex);
        });

        this.previousButton.addEventListener("click", () => {
            this.showMusicStation();
        });


        this.objectDescription.addEventListener("click", () => {
            this.showDescription();
        });

        this.viewerContainer.addEventListener("model-tap", () => {
            if (this.currentView === "viewer") {
                this.showDescription();
            }
        });

        this.audioPlayer.addEventListener("play", () => {
            this.updateAudioButtons();
        });

        this.audioPlayer.addEventListener("pause", () => {
            this.updateAudioButtons();
        });

        this.audioPlayer.addEventListener("ended", () => {
            this.stopAudio();
        });

        this.viewerSection.hidden = true;
        this.musicContainer.hidden = false;
        this.viewerAudioButton.hidden = true;

        this.updateLanguage();
    }

    updateLanguage() {
        const language = this.languageSelect.value;
        const texts = musicTexts[language];

        const piccolo = fasnachtInstruments[1].translations[language];
        const drum = fasnachtInstruments[0].translations[language];

        this.musicTitle.textContent = texts.title;
        this.musicInstructions.textContent = texts.instructions;

        this.piccoloTitle.textContent = piccolo.name;
        this.piccoloDescription.textContent = piccolo.description;

        this.drumTitle.textContent = drum.name;
        this.drumDescription.textContent = drum.description;

        this.piccoloViewButton.textContent = texts.viewInstrument;
        this.drumViewButton.textContent = texts.viewInstrument;

        this.previousButton.textContent = texts.previous;
        this.arButton.textContent = texts.viewAR;

        if (this.viewerHintText) {
            this.viewerHintText.textContent = texts.viewerHint;
        }

        if (this.currentView === "viewer") {
            this.updateInstrumentInformation();
        }

        this.updateAudioButtons();
    }

    async toggleAudio(index) {
        const instrument = fasnachtInstruments[index];

        if (!instrument.audio?.path) {
            return;
        }

        if (
            this.currentAudioIndex === index &&
            !this.audioPlayer.paused
        ) {
            this.audioPlayer.pause();
            return;
        }

        if (this.currentAudioIndex !== index) {
            this.audioPlayer.pause();
            this.audioPlayer.src = instrument.audio.path;
            this.currentAudioIndex = index;
        }

        try {
            await this.audioPlayer.play();
        } catch (error) {
            console.error("Could not play audio:", error);
            this.stopAudio();
        }
    }

    updateAudioButtons() {
        const texts = musicTexts[this.languageSelect.value] ?? musicTexts.de;

        const piccoloPlaying =
            this.currentAudioIndex === 1 &&
            !this.audioPlayer.paused;

        const drumPlaying =
            this.currentAudioIndex === 0 &&
            !this.audioPlayer.paused;

        this.piccoloListenButton.textContent =
            piccoloPlaying ? texts.pause : texts.listen;

        this.drumListenButton.textContent =
            drumPlaying ? texts.pause : texts.listen;

        const viewerAudioPlaying =
            this.currentAudioIndex === this.currentIndex &&
            !this.audioPlayer.paused;

        this.viewerAudioButton.textContent =
            viewerAudioPlaying ? texts.pause : texts.listen;
    }

    stopAudio() {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.currentAudioIndex = null;

        this.updateAudioButtons();
    }

    async showInstrument(index) {
        if (this.isLoading) {
            return;
        }

        const instrument = fasnachtInstruments[index];
        const language = this.languageSelect.value;

        this.isLoading = true;

        if (this.currentAudioIndex !== index) {
            this.stopAudio();
        }

        this.currentIndex = index;
        this.currentView = "viewer";

        this.musicContainer.hidden = true;
        this.viewerSection.hidden = false;

        this.objectDescription.hidden = true;
        this.viewerHint.hidden = false;
        this.viewerAudioButton.hidden = !instrument.audio?.path;

        this.updateInstrumentInformation();


        try {
            await this.mediaViewer.displayMedia(instrument, language);
        } catch (error) {
            console.error("Could not display instrument:", error);
        } finally {
            this.isLoading = false;
        }
    }

    updateInstrumentInformation() {
        const instrument = fasnachtInstruments[this.currentIndex];
        const language = this.languageSelect.value;

        this.objectTitle.textContent =
            instrument.translations[language].name;

        this.objectDescription.textContent =
            instrument.translations[language].description;

        this.updateAudioButtons();
    }

    showDescription() {
        this.objectDescription.hidden = !this.objectDescription.hidden;
        this.viewerHint.hidden = !this.objectDescription.hidden;
    }

    showMusicStation() {
        this.currentView = "music";

        this.viewerSection.hidden = true;
        this.musicContainer.hidden = false;

        this.viewerHint.hidden = true;
        this.viewerAudioButton.hidden = true;
    }
}
