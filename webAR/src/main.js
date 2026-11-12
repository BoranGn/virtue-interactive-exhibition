import * as THREE from 'three';
import {SceneManager} from "./SceneManager";
import {createObjectScene} from "./viewers/ModelViewer";
import {createControls} from "./controls/Controls.js";
import {objects} from "./Objects.js"
import scene from "three/addons/offscreen/scene";

//HTML elements
const list = document.getElementById('object-list');
const languageSelect = document.getElementById("language-select");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//Scene
let currentLanguage = "en";
let activeScene = null;

//THREE.js
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const sceneManager = new SceneManager(renderer);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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


function renderObjectList() {
    list.innerHTML = "";

    objects.forEach(object => {
        const button = document.createElement("button");

        button.textContent = object.translations[currentLanguage].name;
        console.log("Language:", currentLanguage);

        button.addEventListener("click", async () => {
            try{
            await createSceneBySelection();}
            catch(error){
                console.error("Error in loading object:", error);
            }
        })

        list.appendChild(button);
    });
}

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