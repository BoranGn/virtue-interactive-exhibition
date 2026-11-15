import {mediaItems} from "../MediaItems";

export function setUpExhibition(createScene, languageSelect) {
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

        await createScene(mediaItems[nextIndex]);

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

    createScene(mediaItems[currentIndex]).catch(console.error);
    updateInfo();
}