import {MediaViewer} from "../viewers/MediaViewer";

export function setUpExplore(exploreMediaViewer,languageSelect, mediaItems) {
    const nextButton = document.getElementById("next-button-explore");
    const previousButton = document.getElementById("previous-button-explore");
    const objectCounter = document.getElementById("explore-object-counter");

    const resultsContainer = document.getElementById("explore-results");
    resultsContainer.hidden = false;

    let currentIndex = 0;

    function updateInfo() {
        objectCounter.textContent = (currentIndex + 1) + " / " + mediaItems.length;
    }

    async function changeObject(direction) {
        currentIndex = (currentIndex + direction + mediaItems.length) % mediaItems.length;
        updateInfo();
        nextButton.disabled = true;
        previousButton.disabled = true;
        nextButton.textContent = "Loading...";

        try {
            await exploreMediaViewer.displayMedia(mediaItems[currentIndex], languageSelect.value);
        }catch(error) {
            console.error("Failed to load media:", error);
        }finally {

            nextButton.disabled = false;
            previousButton.disabled = false;
            nextButton.textContent = "Weiter";

        }
    }

    nextButton.addEventListener("click", () => {
        changeObject(1).catch(console.error);
    });

    previousButton.addEventListener("click", () => {
        changeObject(-1).catch(console.error);
    });

    exploreMediaViewer.displayMedia(mediaItems[currentIndex]).catch(console.error);

    updateInfo();
}

