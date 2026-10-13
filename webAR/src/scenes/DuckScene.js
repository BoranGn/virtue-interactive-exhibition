import {loadModel} from "../loaders/ModelLoader";
import * as THREE from "three";

export async function createDuckScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const DuckPath = "/models/glbModels/EntenFasnacht.glb";
    const duck = await loadModel(DuckPath);
    scene.add(duck);

    function update(time) {
        duck.rotation.y = time / 2000;
    }

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
    scene.add(light);



    camera.position.z = 5;


    return { scene, camera, update };
}