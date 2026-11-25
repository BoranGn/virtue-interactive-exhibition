import {FasnachtCharacterQuiz} from "./ui/FasnachtCharacterQuiz.js";
import {MediaViewer} from "./viewers/MediaViewer";
import {setUpSearch} from "./vitrvr/VitrivrSearch";
import {ARViewer} from "./viewers/ARViewer";


import "@google/model-viewer";
import * as THREE from "three";

THREE.Cache.enabled = true;

const languageSelect = document.getElementById("language-select");

const welcomePage = document.getElementById("welcome-page");
const exhibitionPage = document.getElementById("exhibition-page");
const explorePage = document.getElementById("explore-page");


const params = new URLSearchParams(window.location.search);
const station = params.get("station");

welcomePage.hidden = true;
exhibitionPage.hidden = true;
explorePage.hidden = true;

switch (station) {
    case "larven": {
        exhibitionPage.hidden = false;

        const exhibitionARViewer = new ARViewer(
            "ar-model",
            "open-ar-button"
        );

        const exhibitionViewer = new MediaViewer(
            document.getElementById("viewer"),
            exhibitionARViewer
        );

        new FasnachtCharacterQuiz(exhibitionViewer);
        break;
    }

    case "archiv": {
        explorePage.hidden = false;

        const exploreARViewer = new ARViewer(
            "ar-model-explore",
            "open-ar-button-explore"
        );

        const exploreViewer = new MediaViewer(
            document.getElementById("explore-viewer"),
            exploreARViewer
        );

        setUpSearch(exploreViewer, languageSelect);
        break;
    }

    case "musik": {
        // TODO: Initialise music station
        welcomePage.hidden = false;
        break;
    }

    default: {
        welcomePage.hidden = false;
        break;
    }
}