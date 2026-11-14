import * as THREE from "three/addons";

const loader = new THREE.GLTFLoader();

 export async function loadModel(path){
    const gltf = await loader.loadAsync(path)

     return gltf.scene;
    }

