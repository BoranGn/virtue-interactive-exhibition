import {loadImage} from "../loaders/ImageLoader";
import * as THREE from "three";

export async function createImageScene(camera,currentLanguage, path) {
    const scene = new THREE.Scene();
    const image = await loadImage(path);

    scene.add(image);

    return { scene, camera };
}