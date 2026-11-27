import {FasnachtCharacterQuiz} from "./ui/stations/FasnachtCharacterQuiz.js";
import {MusicStation} from "./ui/stations/MusicStation.js";
import {MediaViewer} from "./viewers/MediaViewer";
import {setUpSearch} from "./vitrvr/VitrivrSearch";
import {ARViewer} from "./viewers/ar-viewers/ARViewer";


import '@google/model-viewer';

import * as THREE from "three";

THREE.Cache.enabled = true;

const languageSelect = document.getElementById("language-select");

const welcomePage = document.getElementById("welcome-page");
const exhibitionPage = document.getElementById("exhibition-page");
const explorePage = document.getElementById("explore-page");


const params = new URLSearchParams(window.location.search);
const station = params.get("station");

console.log("Hello");

console.log("Secure Context:", window.isSecureContext);

if (navigator.xr) {
    navigator.xr.isSessionSupported("immersive-ar")
        .then(supported => {
            console.log("WebXR AR supported:", supported);
        })
        .catch(error => {
            console.error("WebXR error:", error);
        });
} else {
    console.log("WebXR is not available");
}

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
        exhibitionPage.hidden = false;

        document.getElementById("larven-quiz").hidden = true;
        document.getElementById("music-station").hidden = false;

        const exhibitionARViewer = new ARViewer(
            "ar-model",
            "open-ar-button"
        );

        const exhibitionViewer = new MediaViewer(
            document.getElementById("viewer"),
            exhibitionARViewer
        );

        new MusicStation(exhibitionViewer);
        break;
    }

    default: {
        welcomePage.hidden = false;
        break;
    }
}