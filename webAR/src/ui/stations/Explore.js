import {searchMedia} from "../../vitrvr/VitrivrSearch";

const exploreTexts = {
    de: {
        eyebrow: "DIGITALE SAMMLUNG",
        title: "Weitere Objekte entdecken.",
        description: "Durchsuche das digitale Fasnachtsarchiv.",
        placeholder: "Wonach suchst du?",
        searchLabel: "Suchbegriff",
        search: "Suchen",
        previous: "← Zurück",
        next: "Weiter →",
        viewAR: "In AR ansehen",
        loading: "Lädt …",
        noResults: "Keine Ergebnisse gefunden.",
        searchFailed: "Suche fehlgeschlagen."
    },
    en: {
        eyebrow: "DIGITAL COLLECTION",
        title: "Discover more objects.",
        description: "Explore the digital Fasnacht archive.",
        placeholder: "What are you looking for?",
        searchLabel: "Search term",
        search: "Search",
        previous: "← Back",
        next: "Next →",
        viewAR: "View in AR",
        loading: "Loading...",
        noResults: "No results found.",
        searchFailed: "Search failed."
    }
};

export class Explore {

    constructor(mediaViewer) {
        this.mediaViewer = mediaViewer;
        this.languageSelect = document.getElementById("language-select");

        this.eyebrow = document.getElementById("explore-eyebrow");
        this.title = document.getElementById("explore-title");
        this.description = document.getElementById("explore-description");

        this.searchInput = document.getElementById("explore-search-input");
        this.searchButton = document.getElementById("explore-search-button");

        this.resultsContainer = document.getElementById("explore-results");
        this.objectCounter = document.getElementById("explore-object-counter");

        this.previousButton = document.getElementById("explore-previous-button");
        this.nextButton = document.getElementById("explore-next-button");
        this.arButton = document.getElementById("explore-open-ar-button");

        this.mediaItems = [];
        this.currentIndex = 0;
        this.isSearching = false;
        this.isLoading = false;
        this.status = null;

        this.languageSelect.addEventListener("change", () => {
            this.updateLanguage();
        });

        this.searchButton.addEventListener("click", () => {
            void this.search();
        });

        this.searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                void this.search();
            }
        });

        this.previousButton.addEventListener("click", () => {
            void this.changeObject(-1);
        });

        this.nextButton.addEventListener("click", () => {
            void this.changeObject(1);
        });

        this.updateLanguage();
    }

    updateLanguage() {
        const language = this.languageSelect.value;
        const texts = exploreTexts[language];

        this.eyebrow.textContent = texts.eyebrow;
        this.title.textContent = texts.title;

        this.description.textContent = this.status
            ? texts[this.status]
            : texts.description;

        this.searchInput.placeholder = texts.placeholder;
        this.searchInput.setAttribute("aria-label", texts.searchLabel);

        this.searchButton.textContent = this.isSearching
            ? texts.loading
            : texts.search;

        this.previousButton.textContent = texts.previous;

        this.nextButton.textContent = this.isLoading
            ? texts.loading
            : texts.next;

        this.arButton.textContent = texts.viewAR;
    }

    async search() {
        const searchText = this.searchInput.value.trim();

        if (!searchText || this.isSearching || this.isLoading) {
            return;
        }

        this.isSearching = true;
        this.status = null;
        this.searchButton.disabled = true;
        this.previousButton.disabled = true;
        this.nextButton.disabled = true;

        this.updateLanguage();

        try {
            this.mediaItems = await searchMedia(searchText);
            this.currentIndex = 0;

            if (this.mediaItems.length === 0) {
                this.resultsContainer.hidden = true;
                this.status = "noResults";
                return;
            }

            this.resultsContainer.hidden = false;

            await this.displayObject();

        } catch (error) {
            console.error("Search failed:", error);
            this.resultsContainer.hidden = true;
            this.status = "searchFailed";

        } finally {
            this.isSearching = false;
            this.searchButton.disabled = false;

            this.previousButton.disabled = this.mediaItems.length <= 1;
            this.nextButton.disabled = this.mediaItems.length <= 1;

            this.updateLanguage();
        }
    }

    async changeObject(direction) {
        if (this.mediaItems.length === 0 ||
            this.isLoading ||
            this.isSearching) {
            return;
        }

        this.currentIndex =
            (this.currentIndex + direction + this.mediaItems.length)
            % this.mediaItems.length;

        await this.displayObject();
    }

    async displayObject() {
        this.isLoading = true;

        this.previousButton.disabled = true;
        this.nextButton.disabled = true;
        this.searchButton.disabled = true;

        this.updateLanguage();
        this.updateInfo();

        try {
            await this.mediaViewer.displayMedia(
                this.mediaItems[this.currentIndex]
            );

        } catch (error) {
            console.error("Failed to load media:", error);

        } finally {
            this.isLoading = false;

            this.previousButton.disabled =
                this.isSearching || this.mediaItems.length <= 1;

            this.nextButton.disabled =
                this.isSearching || this.mediaItems.length <= 1;

            this.searchButton.disabled = this.isSearching;

            this.updateLanguage();
        }
    }

    updateInfo() {
        this.objectCounter.textContent =
            (this.currentIndex + 1) + " / " + this.mediaItems.length;
    }
}