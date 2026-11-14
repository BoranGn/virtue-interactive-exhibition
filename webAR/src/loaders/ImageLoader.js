import * as THREE from "three";
const loader = new THREE.ImageLoader();

export async function loadImage(path) {
    const image = await loader.loadAsync(path);
    return image.scene;
}