import * as THREE from 'three';
import {SceneManager} from "./SceneManager";
import {createDuckScene} from "./scenes/DuckScene";
import {objects} from "./Objects.js"

const list = document.getElementById('object-list');
const languageSelect = document.getElementById("language-select");

let currentLanguage = "en";

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

        list.appendChild(button);
    });
}

renderObjectList();

console.log(languageSelect.value);

const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const duckScene = await createDuckScene();


const sceneManager = new SceneManager(renderer);
sceneManager.setScene(duckScene.scene, duckScene.camera)

function animate(time) {
    duckScene.update(time);
    sceneManager.renderScene();
}
renderer.setAnimationLoop(animate);