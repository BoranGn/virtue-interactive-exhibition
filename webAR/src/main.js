import * as THREE from 'three';
import {createCube} from "./examples/cube";
import {SceneManager} from "./scenes/SceneManager";
import {createCubeScene} from "./scenes/ExampleCubeScene";
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const cubeScene = createCubeScene();


const sceneManager = new SceneManager(renderer);
sceneManager.setScene(cubeScene.scene, cubeScene.camera)

function animate(time) {
    cubeScene.update(time);
    sceneManager.renderScene();
}
renderer.setAnimationLoop(animate);