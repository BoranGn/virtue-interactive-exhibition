import * as THREE from 'three';
import {SceneManager} from "./SceneManager";
import {createCubeScene} from "./scenes/ExampleCubeScene";
import {createDuckScene} from "./scenes/DuckScene";

const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const cubeScene = createCubeScene();
const duckScene = await createDuckScene();


const sceneManager = new SceneManager(renderer);
sceneManager.setScene(duckScene.scene, duckScene.camera)

function animate(time) {
    duckScene.update(time);
    sceneManager.renderScene();
}
renderer.setAnimationLoop(animate);