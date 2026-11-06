import {loadModel} from "../loaders/ModelLoader";
import {objects} from '../Objects.js'
import * as THREE from "three";

export async function createObjectScene(object) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const objectPath = object.path;
    const objectModel = await loadModel(objectPath);
    const box = new THREE.Box3().setFromObject(objectModel);
    const center = box.getCenter(new THREE.Vector3());
    objectModel.position.sub(center);
    scene.add(objectModel);

    function update(time) {
        objectModel.rotation.y = time / 2000;
    }

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
    scene.add(light);



    camera.position.z = 5;


    return { scene, camera, update };
}