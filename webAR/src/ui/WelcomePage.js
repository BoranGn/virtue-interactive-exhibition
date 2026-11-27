const welcomeTexts = {
    de: {
        title: "Willkommen bei VirtuLearn",
        description: "Entdecke die Basler Fasnacht an drei interaktiven Stationen.",
        masks: "Vieli Larve, vieli Gschichte",
        music: "D'Kläng vo de Fasnacht",
        archive: "Drey scheenste Dääg"
    },
    en: {
        title: "Welcome to VirtuLearn",
        description: "Discover Basler Fasnacht through three interactive stations.",
        masks: "Many Masks, Many Stories",
        music: "The Sounds of Fasnacht",
        archive: "The Three Most Beautiful Days"
    }
};

export class WelcomePage {
    constructor() {
        this.languageSelect = document.getElementById("language-select");

        this.title = document.getElementById("welcome-title");
        this.description = document.getElementById("welcome-description");

        this.masksLink = document.getElementById("masks-link");
        this.musicLink = document.getElementById("music-link");
        this.archiveLink = document.getElementById("archive-link");

        this.languageSelect.addEventListener("change", () => {
            this.updateLanguage();
        });

        this.updateLanguage();
    }

    updateLanguage() {
        const language = this.languageSelect.value;
        const texts = welcomeTexts[language];

        this.title.textContent = texts.title;
        this.description.textContent = texts.description;

        this.masksLink.textContent = texts.masks;
        this.musicLink.textContent = texts.music;
        this.archiveLink.textContent = texts.archive;
    }
}
