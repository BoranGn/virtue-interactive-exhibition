import * as THREE from 'three';
import {SceneManager} from "./SceneManager";
import {createObjectScene} from "./viewers/ModelViewer";
import {createControls} from "./controls/Controls.js";
import {objects} from "./Objects.js"
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

//THREE.js
const renderer = new THREE.WebGLRenderer();
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
viewer.appendChild(renderer.domElement);
const sceneManager = new SceneManager(renderer);
const camera = new THREE.PerspectiveCamera(75, window.clientWidth / window.clientHeight, 0.1, 1000);
const controller = createControls(camera,renderer);

searchButton.addEventListener("click", e => {
    const input = searchInput.value.trim();

    if (input === "") {
        alert("Please enter a valid input");
        return;
    }
    createSceneBySearch(searchInput.value)
})

languageSelect.addEventListener("change", () => {
    currentLanguage = languageSelect.value;
    renderObjectList();
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


async function createSceneBySearch(searchInput){
    const objectScene = await createObjectScene(camera, currentLanguage, searchInput);
    setScene(objectScene);
}

async function createSceneBySelection() {
    const objectScene =  await createObjectScene(camera, currentLanguage);
    setScene(objectScene);
}

renderObjectList();

console.log(languageSelect.value);

function animate() {
    if (activeScene) {
        sceneManager.renderScene();
        controller.update();
    }
}
renderer.setAnimationLoop(animate);