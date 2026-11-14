import * as THREE from 'three';
import {SceneManager} from "./SceneManager";
import {createObjectScene} from "./viewers/ModelViewer";
import {createControls} from "./controls/Controls.js";
import {objects} from "./Objects.js"
import {setUpExhibition} from "./ui/Exhibition";
import scene from "three/addons/offscreen/scene";

//HTML elements
const languageSelect = document.getElementById("language-select");
const viewer = document.getElementById("viewer");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const exhibitionPage = document.getElementById("exhibition-page");
const explorePage = document.getElementById("explore-page");

const exhibitionButton = document.getElementById("show-exhibition");
const exploreButton = document.getElementById("show-explore");


//Scene
let currentLanguage = "en";
let activeScene = null;
let currentObject = objects[0];

//THREE.js
const renderer = new THREE.WebGLRenderer();
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
viewer.appendChild(renderer.domElement);
const sceneManager = new SceneManager(renderer);
const camera = new THREE.PerspectiveCamera(75, viewer.clientWidth / viewer.clientHeight, 0.1, 1000);
const controller = createControls(camera,renderer);

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


function setScene(objectScene) {
    sceneManager.setScene(objectScene.scene, objectScene.camera);
    activeScene = objectScene;

    controller.target.set(0, 0, 0);
    controller.update();
    controller.saveState();
}


async function createScene(object){
    try {
        const objectPath = object.path;
        const objectScene = await createObjectScene(camera, currentLanguage, objectPath);
        setScene(objectScene);
    }
    catch (error) {
        console.error("Failed to create scene:", error);}
}

setUpExhibition(createScene, languageSelect);

console.log(languageSelect.value);

function animate() {
    if (activeScene) {
        sceneManager.renderScene();
        controller.update();
    }
}
renderer.setAnimationLoop(animate);