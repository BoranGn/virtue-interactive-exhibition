import {GLTFLoader} from "three/addons/loaders/GLTFLoader";

const loader = new GLTFLoader();

 export async function loadModel(path){
    const gltf = await loader.loadAsync(path)

     return gltf.scene;
    }


