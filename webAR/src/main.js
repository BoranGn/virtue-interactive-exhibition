import * as THREE from 'three';
import {SceneManager} from "./SceneManager";
import {createObjectScene} from "./scenes/ObjectScene";
import {createControls} from "./controls/Controls.js";
import {objects} from "./Objects.js"

//HTML elements
const list = document.getElementById('object-list');
const languageSelect = document.getElementById("language-select");

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
            await selectButton(object);}
            catch(error){
                console.error("Error in loading object:", error);
            }
        })

        list.appendChild(button);
    });
}

async function selectButton(object) {
    const objectScene =  await createObjectScene(camera, object, currentLanguage);
    sceneManager.setScene(objectScene.scene, objectScene.camera);
    activeScene = objectScene;

    controller.target.set(0, 0, 0);
    controller.update();
    controller.saveState();
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