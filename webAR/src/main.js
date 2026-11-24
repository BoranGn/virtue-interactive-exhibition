import {LarvenQuiz} from "./ui/LarvenQuiz.js";
import {MediaViewer} from "./viewers/MediaViewer";
import {setUpSearch} from "./vitrvr/VitrivrSearch";
import {ARViewer} from "./viewers/ARViewer";


import "@google/model-viewer";
import * as THREE from "three";

THREE.Cache.enabled = true;

const languageSelect = document.getElementById("language-select");

const exhibitionPage = document.getElementById("exhibition-page");
const explorePage = document.getElementById("explore-page");

const params = new URLSearchParams(window.location.search);
const station = params.get("station") ?? "larven";

const exhibitionARViewer = new ARViewer(
    "ar-model",
    "open-ar-button"
);

const exploreARViewer = new ARViewer(
    "ar-model-explore",
    "open-ar-button-explore"
);

const exhibitionViewer = new MediaViewer(
    document.getElementById("viewer"),
    exhibitionARViewer
);

const exploreViewer = new MediaViewer(
    document.getElementById("explore-viewer"),
    exploreARViewer
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
    exhibitionButton.setAttribute("aria-current", isExhibition ? "page" : "false");
    exploreButton.setAttribute("aria-current", isExhibition ? "false" : "page");

    exhibitionButton.classList.toggle("active", isExhibition);
    exploreButton.classList.toggle("active", !isExhibition);
}


exhibitionButton.addEventListener("click", () => showPage("exhibition"));
exploreButton.addEventListener("click", () => showPage("explore"));


setUpExhibition(exhibitionViewer,languageSelect);
setUpSearch(exploreViewer,languageSelect);

console.log(languageSelect.value);