import {setUpExhibition} from "./ui/Exhibition";
import {MediaViewer} from "./viewers/MediaViewer";

//HTML elements
const languageSelect = document.getElementById("language-select");
const viewer = document.getElementById("viewer");
const mediaViewer = new MediaViewer(viewer);

const exhibitionPage = document.getElementById("exhibition-page");
const explorePage = document.getElementById("explore-page");

const exhibitionButton = document.getElementById("show-exhibition");
const exploreButton = document.getElementById("show-explore");


//Scene
let currentLanguage = "en";

languageSelect.addEventListener("change", () => {
    currentLanguage = languageSelect.value;
});

function showPage(page) {
    const isExhibition = page === "exhibition";

    exhibitionPage.hidden = !isExhibition;
    explorePage.hidden = isExhibition;

    exhibitionButton.classList.toggle("active", isExhibition);
    exploreButton.classList.toggle("active", !isExhibition);
}

exhibitionButton.addEventListener("click", () => showPage("exhibition"));
exploreButton.addEventListener("click", () => showPage("explore"));


async function displayMedia(media) {
    try {
        console.log("Selected object:", media);

        await mediaViewer.displayMedia(media);
    } catch (error) {
        console.error("Failed to display media:", error);
        throw error;
    }
}
setUpExhibition(displayMedia, languageSelect);

console.log(languageSelect.value);