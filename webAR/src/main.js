import {setUpExhibition} from "./ui/Exhibition";
import {MediaViewer} from "./viewers/MediaViewer";
import {setUpSearch} from "./vitrvr/VitrivrSearch";
import * as THREE from "three";

const languageSelect = document.getElementById("language-select");

const exhibitionPage = document.getElementById("exhibition-page");
const explorePage = document.getElementById("explore-page");

const exhibitionButton = document.getElementById("show-exhibition");
const exploreButton = document.getElementById("show-explore");

const exhibitionViewer = new MediaViewer(
    document.getElementById("viewer")
);

const exploreViewer = new MediaViewer(
    document.getElementById("explore-viewer")
);

THREE.Cache.enabled = true;

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


setUpExhibition(exhibitionViewer,languageSelect);
setUpSearch(exploreViewer,languageSelect);

console.log(languageSelect.value);