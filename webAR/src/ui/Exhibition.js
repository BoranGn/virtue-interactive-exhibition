import {mediaItems} from "../MediaItems";
export function setUpExhibition(exhibitionMediaViewer, languageSelect) {
    const nextButton = document.getElementById("next-button");
    const previousButton = document.getElementById("previous-button");
    const objectTitle = document.getElementById("object-title");
    const objectCounter = document.getElementById("object-counter");


    let currentIndex = 0;

    function updateInfo() {
        const object = mediaItems[currentIndex];
        objectTitle.textContent = object.translations[languageSelect.value].name;
        objectCounter.textContent = (currentIndex + 1) + " / " + mediaItems.length;
    }

    async function changeObject(direction) {
        const nextIndex =
            (currentIndex + direction + mediaItems.length) % mediaItems.length;

        await exhibitionMediaViewer.displayMedia(mediaItems[nextIndex], languageSelect.value);

        currentIndex = nextIndex;
        updateInfo();
    }

    nextButton.addEventListener("click", () => {
        changeObject(1).catch(console.error);
    });

    previousButton.addEventListener("click", () => {
        changeObject(-1).catch(console.error);
    });

    languageSelect.addEventListener("change", updateInfo);

    exhibitionMediaViewer.displayMedia(mediaItems[currentIndex]).catch(console.error);
    updateInfo();
}