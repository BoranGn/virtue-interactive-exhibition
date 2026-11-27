import {MediaViewer} from "./viewers/MediaViewer";
import {ARViewer} from "./viewers/ar-viewers/ARViewer";

import {WelcomePage} from "./ui/WelcomePage";
import {FasnachtCharacterQuiz} from "./ui/stations/FasnachtCharacterQuiz.js";
import {MusicStation} from "./ui/stations/MusicStation.js";
import {Explore} from "./ui/stations/Explore";


import '@google/model-viewer';
import * as THREE from "three";

THREE.Cache.enabled = true;


const welcomePage = document.getElementById("welcome-page");
const exhibitionPage = document.getElementById("exhibition-page");
const explorePage = document.getElementById("explore-page");


const params = new URLSearchParams(window.location.search);
const station = params.get("station");

welcomePage.hidden = true;
exhibitionPage.hidden = true;
explorePage.hidden = true;

switch (station) {
    case "masks": {
        exhibitionPage.hidden = false;

        const exhibitionARViewer = new ARViewer(
            "exhibition-ar-model",
            "exhibition-open-ar-button"
        );

        const exhibitionViewer = new MediaViewer(
            document.getElementById("exhibition-media-container"),
            exhibitionARViewer
        );

        new FasnachtCharacterQuiz(exhibitionViewer);
        break;
    }

    case "archive": {
        explorePage.hidden = false;

        const exploreARViewer = new ARViewer(
            "explore-ar-model",
            "explore-open-ar-button"
        );

        const exploreViewer = new MediaViewer(
            document.getElementById("explore-media-container"),
            exploreARViewer
        );

        new Explore(exploreViewer);
        break;
    }

    case "music": {
        exhibitionPage.hidden = false;

        document.getElementById("mask-quiz").hidden = true;
        document.getElementById("music-station").hidden = false;

        const exhibitionARViewer = new ARViewer(
            "exhibition-ar-model",
            "exhibition-open-ar-button"
        );

        const exhibitionViewer = new MediaViewer(
            document.getElementById("exhibition-media-container"),
            exhibitionARViewer
        );

        new MusicStation(exhibitionViewer);
        break;
    }

    default: {
        welcomePage.hidden = false;

        new WelcomePage();

        break;
    }
}